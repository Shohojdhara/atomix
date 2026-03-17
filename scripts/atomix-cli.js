#!/usr/bin/env node

/**
 * Atomix CLI Orchestrator
 * Design System Development Tools - Modular Edition
 */

import { program } from 'commander';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { logger } from './cli/utils/logger.js';
import { handleCLIError } from './cli/utils/error.js';
import { telemetry } from './cli/utils/telemetry.js';
import chalk from 'chalk';

// Action Modules
import { initAction } from './cli/commands/init.js';
import { generateAction } from './cli/commands/generate.js';
import { buildThemeAction } from './cli/commands/build-theme.js';
import { doctorAction } from './cli/commands/doctor.js';
import { validateAction } from './cli/commands/validate.js';
import { tokensAction } from './cli/commands/tokens.js';
import { migrateAction } from './cli/commands/migrate.js';
import { benchmarkAction } from './cli/commands/benchmark.js';
import { cleanAction } from './cli/commands/clean.js';
import { themeBridgeAction } from './cli/commands/theme-bridge.js';
import { configLoader } from './cli/internal/config-loader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Package info
const packageJson = JSON.parse(
  await readFile(join(__dirname, '../package.json'), 'utf8')
);

program
  .name('atomix')
  .description('Atomix Design System CLI - Modular Edition')
  .version(packageJson.version)
  .option('-d, --debug', 'Enable debug mode', false)
  .option('--dry-run', 'Preview changes without modifying files', false)
  .hook('preAction', async (thisCommand) => {
    // Load config
    await configLoader.load();

    if (thisCommand.opts().debug) {
      process.env.ATOMIX_DEBUG = 'true';
      logger.debug('Debug mode enabled');
    }
    if (thisCommand.opts().dryRun) {
      process.env.ATOMIX_DRY_RUN = 'true';
      logger.info(chalk.yellow('⚠️ Dry-run mode enabled. No files will be modified.'));
    }

    // Start telemetry
    const fullCommand = thisCommand.name() === 'atomix' 
      ? thisCommand.args[0] || 'atomix' 
      : thisCommand.name();
    telemetry.start(fullCommand);
  })
  .hook('postAction', async (thisCommand) => {
    // Stop telemetry
    await telemetry.stop(true);
  });

/**
 * Environment Diagnostics
 */
program
  .command('doctor')
  .description('Verify the environment and project health. Use --explain to list what each check does.')
  .option('--explain', 'Print short descriptions for each doctor check and exit')
  .action(async (options) => {
    try {
      await doctorAction(options);
    } catch (error) {
      await handleCLIError(error);
    }
  });

/**
 * Code & Config Validation
 */
program
  .command('validate [subcommand] [name]')
  .description('Audit project quality (A11y, Tokens, Performance). Use "validate component <Name>" for component-scoped audit. Run build first for performance analysis (requires dist/).')
  .action(async (subcommand, name, options) => {
    try {
      await validateAction(options, subcommand, name);
    } catch (error) {
      await handleCLIError(error);
    }
  });

/**
 * Design Token Management
 */
program
  .command('tokens <subcommand>')
  .description('Manage design tokens (list, export, pull, push). For pull/push, --provider is required (configure tokenEngine.providers in atomix.config; types: figma, style-dictionary, w3c).')
  .option('-f, --format <format>', 'Export format (css|scss|json)', 'css')
  .option('-o, --output <path>', 'Output directory', './tokens')
  .option('-p, --provider <provider>', 'Token provider name (required for pull and push)')
  .action(async (subcommand, options) => {
    try {
      await tokensAction(subcommand, options);
    } catch (error) {
      await handleCLIError(error);
    }
  });

/**
 * Project Initialization
 */
program
  .command('init')
  .description('Initialize a new Atomix design system project. For CI/scripts use --type <react|nextjs|vanilla> or --yes.')
  .option('-y, --yes', 'Use default choices (non-interactive)')
  .option('-t, --type <type>', 'Project type: react, nextjs, or vanilla (skips prompt when set)')
  .action(async (options) => {
    try {
      await initAction(options);
    } catch (error) {
      await handleCLIError(error);
    }
  });

/**
 * Resource Generation
 */
program
  .command('generate <type> <name>')
  .alias('g')
  .description('Generate components, tokens, or themes')
  .option('-i, --interactive', 'Interactive mode', false)
  .option('-p, --path <path>', 'Output path', './src/components')
  .option('--prompt <prompt>', 'AI prompt for generating component')
  .option('--complexity <level>', 'Complexity (simple|medium|complex)', 'medium')
  .option('--validate', 'Validate after generation', true)
  .action(async (type, name, options) => {
    try {
      await generateAction(type, name, options);
    } catch (error) {
      await handleCLIError(error);
    }
  });

/**
 * Migration Tools
 */
program
  .command('migrate <type> <source>')
  .description('Migrate from other frameworks (tailwind|bootstrap). <source> is the project root directory (e.g. . or ./my-tailwind-app).')
  .option('-p, --preview', 'Preview side-by-side diff before applying', false)
  .action(async (type, source, options) => {
    try {
      await migrateAction(type, source, options);
    } catch (error) {
      await handleCLIError(error);
    }
  });

/**
 * Performance & Benchmarking
 */
program
  .command('benchmark')
  .description('Profile CLI performance and show metrics. Benchmark collects metrics from previous CLI runs.')
  .action(async (options) => {
    try {
      await benchmarkAction(options);
    } catch (error) {
      await handleCLIError(error);
    }
  });

/**
 * Build Artifact Cleanup
 */
program
  .command('clean')
  .description('Clean build artifacts and cache files. Use --dry-run to preview, --all to include node_modules.')
  .option('--all', 'Include node_modules in cleanup', false)
  .option('--cache', 'Only clean cache directories', false)
  .option('--verbose', 'Show detailed output', false)
  .action(async (options) => {
    try {
      await cleanAction(options);
    } catch (error) {
      await handleCLIError(error);
    }
  });

/**
 * Theme Building
 */
program
  .command('build-theme <path>')
  .description('Build a custom theme from SCSS. Default output is ./dist (may overwrite app build; use -o dist-theme for custom themes).')
  .option('-o, --output <path>', 'Output directory (default: ./dist)', './dist')
  .option('-m, --minify', 'Minify CSS', true)
  .option('-s, --sourcemap', 'Generate source maps', false)
  .option('-w, --watch', 'Watch mode', false)
  .option('--analyze', 'Analyze bundle', false)
  .action(async (themePath, options) => {
    try {
      await buildThemeAction(themePath, options);
    } catch (error) {
      await handleCLIError(error);
    }
  });

/**
 * Theme Bridge - Sync Design Tokens with Theme Providers
 */
program
  .command('theme-bridge [source]')
  .description('Sync design tokens with theme providers (Tailwind, CSS-in-JS, CSS Variables)')
  .option('-o, --output <dir>', 'Output directory for theme files', './src/theme')
  .option('-f, --format <format>', 'Theme format (tailwind, emotion, styled-components, vanilla-extract, css-variables, all)', 'all')
  .option('--prefix <prefix>', 'CSS variable prefix', 'atomix')
  .option('--selector <selector>', 'CSS selector for variables', ':root')
  .option('--no-typescript', 'Skip TypeScript type generation')
  .option('--validate', 'Validate generated theme files')
  .option('--dry-run', 'Show what would be generated without writing files')
  .action(async (source, options) => {
    try {
      await themeBridgeAction(source, options);
    } catch (error) {
      await handleCLIError(error);
    }
  });

// Run program
program.parseAsync(process.argv).catch(async (error) => {
  await handleCLIError(error);
});
