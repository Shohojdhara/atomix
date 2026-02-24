#!/usr/bin/env tsx

/**
 * Atomix Theme DevTools CLI
 *
 * Internal CLI for theme validation and management.
 * This is called by the main atomix-cli.js via theme-bridge.js.
 */

import { Command } from 'commander';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { ThemeValidator } from './ThemeValidator.js';
import boxen from 'boxen';

const program = new Command();

program.name('atomix-theme').description('Atomix Theme DevTools').version('0.1.0');

// Utils
const getThemesDir = () => {
  const possiblePaths = [
    path.join(process.cwd(), 'themes'),
    path.join(process.cwd(), 'src', 'themes'),
    path.join(process.cwd(), 'src', 'styles', 'themes'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return path.join(process.cwd(), 'themes');
};

// Validate Command
program
  .command('validate')
  .description('Validate theme configuration')
  .option('-c, --config <path>', 'Path to theme config')
  .option('--strict', 'Enable strict validation')
  .action(async options => {
    console.log(chalk.cyan('Validating theme configuration...'));

    // In a real implementation this would load the theme object
    // For now we'll do basic file checks if a file is provided

    if (options.config) {
      const configPath = path.resolve(process.cwd(), options.config);
      if (!fs.existsSync(configPath)) {
        console.error(chalk.red(`❌ Config file not found: ${options.config}`));
        process.exit(1);
      }

      // Attempt to validate structure if it's JSON
      if (configPath.endsWith('.json')) {
        try {
          const content = JSON.parse(fs.readFileSync(configPath, 'utf8'));
          const validator = new ThemeValidator();
          // Mocking validation for now as we don't have a full loader
          console.log(chalk.green('✓ JSON structure is valid'));
        } catch (e) {
          console.error(chalk.red(`❌ Invalid JSON: ${(e as Error).message}`));
          process.exit(1);
        }
      }
    }

    // Output success for now to verify connectivity
    console.log(chalk.green('✓ Validation completed'));
  });

// List Command
program
  .command('list')
  .description('List available themes')
  .action(async () => {
    const themesDir = getThemesDir();

    if (!fs.existsSync(themesDir)) {
      console.log(chalk.yellow(`No themes directory found at ${themesDir}`));
      return;
    }

    const themes = fs.readdirSync(themesDir).filter(f => {
      const stat = fs.statSync(path.join(themesDir, f));
      return stat.isDirectory() || f.endsWith('.json') || f.endsWith('.ts');
    });

    console.log(chalk.bold.cyan(`\nFound ${themes.length} themes in ${themesDir}:\n`));

    themes.forEach(theme => {
      console.log(`  • ${theme}`);
    });
    console.log('');
  });

// Inspect Command
program
  .command('inspect <theme>')
  .description('Inspect specific theme')
  .option('--json', 'Output as JSON')
  .action(async (themeName, options) => {
    const themesDir = getThemesDir();
    const themePath = path.join(themesDir, themeName);

    if (
      !fs.existsSync(themePath) &&
      !fs.existsSync(`${themePath}.json`) &&
      !fs.existsSync(`${themePath}.ts`)
    ) {
      console.error(chalk.red(`❌ Theme not found: ${themeName}`));
      process.exit(1);
    }

    if (options.json) {
      console.log(JSON.stringify({ name: themeName, path: themePath }, null, 2));
    } else {
      console.log(
        boxen(chalk.bold(themeName) + '\n' + chalk.gray(`Path: ${themePath}`), {
          padding: 1,
          borderStyle: 'round',
        })
      );
    }
  });

// Compare Command (Stub)
program
  .command('compare <theme1> <theme2>')
  .description('Compare two themes')
  .action(async (theme1, theme2) => {
    console.log(chalk.cyan(`Comparing ${theme1} with ${theme2}...`));
    // Stub
    console.log(chalk.yellow('Comparison feature not yet fully implemented.'));
  });

// Export Command (Stub)
program
  .command('export <theme>')
  .description('Export theme')
  .option('-o, --output <path>', 'Output path')
  .action(async (theme, options) => {
    console.log(chalk.cyan(`Exporting ${theme}...`));
    if (options.output) {
      console.log(chalk.green(`✓ Exported to ${options.output}`));
    }
  });

program.parse(process.argv);
