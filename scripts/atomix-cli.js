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

// Action Modules
import { initAction } from './cli/commands/init.js';
import { generateAction } from './cli/commands/generate.js';
import { buildThemeAction } from './cli/commands/build-theme.js';

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
  .hook('preAction', (thisCommand) => {
    if (thisCommand.opts().debug) {
      process.env.ATOMIX_DEBUG = 'true';
      logger.debug('Debug mode enabled');
    }
  });

/**
 * Project Initialization
 */
program
  .command('init')
  .description('Initialize a new Atomix design system project')
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
 * Theme Building
 */
program
  .command('build-theme <path>')
  .description('Build a custom theme from SCSS')
  .option('-o, --output <path>', 'Output directory', './dist')
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

// Run program
program.parseAsync(process.argv).catch(async (error) => {
  await handleCLIError(error);
});
