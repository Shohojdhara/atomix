/**
 * Atomix CLI Logger
 * Standardized logging with support for spinners and debug levels
 */

import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';

const DEBUG = process.env.ATOMIX_DEBUG === 'true';

export const logger = {
  /**
   * Log a debug message (only visible in debug mode)
   */
  debug: (message, data = null) => {
    if (DEBUG) {
      console.log(chalk.gray(`[DEBUG] ${message}`));
      if (data) {
        console.log(chalk.gray(JSON.stringify(data, null, 2)));
      }
    }
  },

  /**
   * Log an info message
   */
  info: (message) => {
    console.log(chalk.white(message));
  },

  /**
   * Log a success message
   */
  success: (message) => {
    console.log(chalk.green(`✓ ${message}`));
  },

  /**
   * Log a warning message
   */
  warn: (message) => {
    console.log(chalk.yellow(`! ${message}`));
  },

  /**
   * Log an error message
   */
  error: (message) => {
    console.error(chalk.bold.red(`\n❌ ${message}`));
  },

  /**
   * Create and return a spinner
   */
  spinner: (text) => {
    return ora({
      text,
      color: 'cyan'
    });
  },

  /**
   * Create a boxed message
   */
  box: (message, options = {}) => {
    console.log(boxen(message, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
      ...options
    }));
  }
};
