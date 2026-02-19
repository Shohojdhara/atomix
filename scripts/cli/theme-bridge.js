/**
 * Theme CLI Bridge
 *
 * Bridges the TypeScript theme devtools CLI (src/lib/theme/devtools/CLI.ts) with the main JavaScript CLI.
 *
 * @dependency ts-node
 * Theme subcommands (atomix theme validate|list|inspect|compare|export|create) run the TypeScript
 * theme CLI via ts-node. Ensure ts-node is installed in the project when using these commands:
 *   npm install --save-dev ts-node
 * If ts-node is missing, theme subcommands will fail; run `atomix doctor` to check availability.
 */

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Execute theme CLI command
 */
export async function executeThemeCommand(command, args = [], options = {}) {
  const spinner = options.spinner || ora(`Running theme ${command}...`).start();

  try {
    // Path to the theme CLI
    const themeCliPath = join(__dirname, '../../src/lib/theme/devtools/CLI.ts');

    // Use node with ts-node loader to execute TypeScript CLI
    // This approach is more robust for ESM environments than invoking ts-node binary directly

    return new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [
        '--loader',
        'ts-node/esm',
        '--experimental-specifier-resolution=node',
        themeCliPath,
        command,
        ...args
      ], {
        stdio: 'inherit',
        cwd: process.cwd(),
      });

      child.on('close', (code) => {
        if (code === 0) {
          spinner.succeed(chalk.green(`✓ Theme ${command} completed`));
          resolve();
        } else {
          spinner.fail(chalk.red(`✗ Theme ${command} failed`));
          reject(new Error(`Theme command failed with code ${code}`));
        }
      });

      child.on('error', (error) => {
        spinner.fail(chalk.red(`✗ Theme ${command} failed`));
        reject(error);
      });
    });
  } catch (error) {
    spinner.fail(chalk.red(`✗ Theme ${command} failed`));
    throw error;
  }
}

/**
 * Create theme CLI bridge
 */
export function createThemeCLIBridge() {
  return {
    /**
     * Validate theme configuration
     */
    async validate(options = {}) {
      const args = [];
      if (options.config) args.push('--config', options.config);
      if (options.strict) args.push('--strict');

      return executeThemeCommand('validate', args, options);
    },

    /**
     * List all themes
     */
    async list(options = {}) {
      return executeThemeCommand('list', [], options);
    },

    /**
     * Inspect a theme
     */
    async inspect(themeName, options = {}) {
      const args = ['--theme', themeName];
      if (options.json) args.push('--json');

      return executeThemeCommand('inspect', args, options);
    },

    /**
     * Compare two themes
     */
    async compare(theme1, theme2, options = {}) {
      const args = ['--theme1', theme1, '--theme2', theme2];

      return executeThemeCommand('compare', args, options);
    },

    /**
     * Export a theme
     */
    async export(themeName, options = {}) {
      const args = ['--theme', themeName];
      if (options.output) args.push('--output', options.output);

      return executeThemeCommand('export', args, options);
    },
  };
}

/**
 * Check if theme CLI is available
 */
export async function isThemeCLIAvailable() {
  try {
    const themeCliPath = join(__dirname, '../../src/lib/theme/devtools/CLI.ts');
    const { access } = await import('fs/promises');
    await access(themeCliPath);
    return true;
  } catch {
    return false;
  }
}

export default {
  createThemeCLIBridge,
  executeThemeCommand,
  isThemeCLIAvailable,
};

