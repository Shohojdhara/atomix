/**
 * Atomix CLI Error Class
 * Standardized error handling with actionable suggestions
 */

/**
 * Common CLI Error Categories
 */
export const ErrorCategory = {
  CONFIG: 'CONFIG_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  GENERATION: 'GENERATION_ERROR',
  ENVIRONMENT: 'ENVIRONMENT_ERROR',
  FILESYSTEM: 'FILESYSTEM_ERROR',
  INVALID_PATH: 'INVALID_PATH'
};

/**
 * Suggestions for common error codes
 */
const COMMON_SUGGESTIONS = {
  [ErrorCategory.CONFIG]: [
    'Run `atomix init` to create a new configuration file.',
    'Check if `atomix.config.ts` has syntax errors.',
    'Ensure you have exported the configuration correctly.'
  ],
  [ErrorCategory.ENVIRONMENT]: [
    'Run `atomix doctor` to check your environment health.',
    'Ensure Node.js version is >=18.0.0.',
    'Check if all peer dependencies are installed.'
  ],
  [ErrorCategory.FILESYSTEM]: [
    'Check if you have write permissions for the target directory.',
    'Ensure the path provided is valid and within the project root.',
    'Verify if the file exists and is not locked by another process.'
  ],
  [ErrorCategory.INVALID_PATH]: [
    'Source must be a directory. Pass the project root (e.g. . or ./my-app).',
    'Do not pass a file path (e.g. package.json).'
  ]
};

export class AtomixCLIError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {string} code - Unique error code (e.g., ErrorCategory.CONFIG)
   * @param {string[]} suggestions - Specific steps to resolve the issue
   */
  constructor(message, code, suggestions = []) {
    super(message);
    this.name = 'AtomixCLIError';
    this.code = code;
    this.suggestions = suggestions.length > 0 ? suggestions : (COMMON_SUGGESTIONS[code] || []);
  }
}

import chalk from 'chalk';
import { telemetry } from './telemetry.js';

/**
 * Global CLI error handler
 * @param {Error} error - The error object to handle
 * @param {object} spinner - Optional ora spinner to stop
 */
export async function handleCLIError(error, spinner = null) {
  if (spinner) {
    spinner.fail('Operation failed');
  }

  // Log failure to telemetry
  await telemetry.stop(false, { error: error.message, code: error.code });

  console.error(chalk.bold.red(`\n❌ ${error.message}`));

  if (error instanceof AtomixCLIError && error.suggestions && error.suggestions.length > 0) {
    console.log(chalk.yellow('\n💡 Suggestions:'));
    error.suggestions.forEach((suggestion, index) => {
      console.log(chalk.gray(`   ${index + 1}. ${suggestion}`));
    });
  }

  if (process.env.ATOMIX_DEBUG === 'true' && error.stack) {
    console.error(chalk.gray('\nStack trace:'));
    console.error(chalk.gray(error.stack));
  }

  // Single exit point for CLI failure; commands should throw, not call process.exit(1).
  process.exit(1);
}
