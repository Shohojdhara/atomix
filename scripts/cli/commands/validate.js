/**
 * Atomix CLI Validate Command
 * Standalone audit tool for code and configuration quality
 */

import { logger } from '../utils/logger.js';
import { validateA11y, validateTokens, validatePerformance } from '../internal/validator.js';
import { hookManager } from '../internal/hooks.js';
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

    // Collect all results into a unified report
    let report = {
      valid: true,
      issues: [],
      rawResults: {
        a11y: a11yResults,
        tokens: tokenResults,
        performance: performanceResults
      }
    };

    // Populate initial issues from standard validators
    const allResults = [...a11yResults, ...tokenResults, ...performanceResults];
    for (const res of allResults) {
      report.issues.push({
        type: res.type,
        severity: res.severity,
        file: res.file,
        message: res.message
      });
      if (res.severity === 'error') report.valid = false;
    }

    // Trigger plugin hooks for custom validation
    report = await hookManager.trigger('onValidate', report);

    logger.box('Atomix Quality Audit', {
      borderColor: 'magenta',
      padding: 1,
      margin: 1
    });

    if (report.issues.length === 0 && report.valid) {
      console.log(chalk.bold.green('✨ No issues found! Your project meets all quality criteria.'));
      return;
    }

    let errors = 0;
    let warnings = 0;

    for (const result of report.issues) {
      // Handle both object-based issues (standard) and string-based issues (simple plugin hooks)
      const isObject = typeof result === 'object';
      const severity = isObject ? (result.severity || 'error') : 'error';
      const type = isObject ? (result.type || 'PLUGIN') : 'PLUGIN';
      const file = isObject ? (result.file || 'N/A') : 'N/A';
      const message = isObject ? result.message : result;

      const icon = severity === 'error' ? chalk.red('❌') : chalk.yellow('⚠️');
      if (severity === 'error') errors++;
      else warnings++;

      console.log(`${icon} [${type.toUpperCase()}] ${chalk.bold(file)}: ${message}`);
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
