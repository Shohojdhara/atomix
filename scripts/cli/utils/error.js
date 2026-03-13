/**
 * Atomix CLI Error Class
 * Standardized error handling with actionable suggestions
 */

export class AtomixCLIError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {string} code - Unique error code (e.g., 'INVALID_PATH')
   * @param {string[]} suggestions - Specific steps to resolve the issue
   */
  constructor(message, code, suggestions = []) {
    super(message);
    this.name = 'AtomixCLIError';
    this.code = code;
    this.suggestions = suggestions;
  }
}

import chalk from 'chalk';

/**
 * Global CLI error handler
 * @param {Error} error - The error object to handle
 * @param {object} spinner - Optional ora spinner to stop
 */
export function handleCLIError(error, spinner = null) {
  if (spinner) {
    spinner.fail('Operation failed');
  }

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

  process.exit(1);
}
