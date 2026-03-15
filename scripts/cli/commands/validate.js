/**
 * Atomix CLI Validate Command
 * Standalone audit tool for code and configuration quality
 */

import { logger } from '../utils/logger.js';
import { validateA11y, validateTokens, validatePerformance } from '../internal/validator.js';
import chalk from 'chalk';

/**
 * Action for the `atomix validate` command
 * @param {object} options - Command options
 */
export async function validateAction(options = {}) {
  const spinner = logger.spinner('Starting validation audit...').start();
  
  try {
    const a11yResults = await validateA11y();
    const tokenResults = await validateTokens();
    const performanceResults = await validatePerformance();

    spinner.stop();

    logger.box('Atomix Quality Audit', {
      borderColor: 'magenta',
      padding: 1,
      margin: 1
    });

    const allResults = [...a11yResults, ...tokenResults, ...performanceResults];
    let errors = 0;
    let warnings = 0;

    if (allResults.length === 0) {
      console.log(chalk.bold.green('✨ No issues found! Your project meets all quality criteria.'));
      return;
    }

    for (const result of allResults) {
      const icon = result.severity === 'error' ? chalk.red('❌') : chalk.yellow('⚠️');
      if (result.severity === 'error') errors++;
      else warnings++;

      console.log(`${icon} [${result.type.toUpperCase()}] ${chalk.bold(result.file)}: ${result.message}`);
    }

    console.log(chalk.bold(`\nSummary: ${errors} errors, ${warnings} warnings.`));

    if (errors > 0) {
      process.exit(1);
    }
  } catch (error) {
    spinner.fail('Validation failed');
    throw error;
  }
}
