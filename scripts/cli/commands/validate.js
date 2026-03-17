/**
 * Atomix CLI Validate Command
 * Standalone audit tool for code and configuration quality
 */

import { logger } from '../utils/logger.js';
import { validateA11y, validateTokens, validatePerformance, validateComponent } from '../internal/validator.js';
import { validateComponentName } from '../utils/validation.js';
import { hookManager } from '../internal/hooks.js';
import { telemetry } from '../utils/telemetry.js';
import { AtomixCLIError, ErrorCategory } from '../utils/error.js';
import chalk from 'chalk';

/**
 * Action for the `atomix validate` command
 * @param {object} options - Command options
 * @param {string} [subcommand] - When 'component', run component-scoped validation
 * @param {string} [name] - Component name for validate component <name>
 */
export async function validateAction(options = {}, subcommand, name) {
  if (subcommand === 'component' && name) {
    return runComponentValidation(name);
  }

  const spinner = logger.spinner('Starting validation audit...').start();

  try {
    const a11yResults = await validateA11y();
    const tokenResults = await validateTokens();
    const performanceResults = await validatePerformance();
    
    // Phase 4: CLI Performance Budget check
    const telemetryLogs = await telemetry.getLogs();
    const cliPerformanceIssues = validateCLIPerformance(telemetryLogs);

    spinner.stop();

    // Collect all results into a unified report
    let report = {
      valid: true,
      issues: [],
      rawResults: {
        a11y: a11yResults,
        tokens: tokenResults,
        performance: performanceResults,
        cli: cliPerformanceIssues
      }
    };

    // Populate initial issues from standard validators
    const allResults = [...a11yResults, ...tokenResults, ...performanceResults, ...cliPerformanceIssues];
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
      throw new AtomixCLIError(
        `Validation failed with ${errors} error(s) and ${warnings} warning(s).`,
        ErrorCategory.VALIDATION,
        ['Fix the reported issues and run atomix validate again.']
      );
    }
  } catch (error) {
    spinner.fail('Validation failed');
    throw error;
  }
}

/**
 * Validate CLI performance against a budget
 */
function validateCLIPerformance(logs) {
  if (logs.length === 0) return [];
  
  const issues = [];
  const BUDGET_MS = 2000;
  const byCommand = {};

  logs.forEach(log => {
    if (!byCommand[log.command]) {
      byCommand[log.command] = { durations: [] };
    }
    byCommand[log.command].durations.push(log.duration);
  });

  for (const [name, data] of Object.entries(byCommand)) {
    data.durations.sort((a, b) => a - b);
    const p95Index = Math.floor(data.durations.length * 0.95);
    const p95 = data.durations[p95Index];

    if (p95 > BUDGET_MS) {
      issues.push({
        type: 'performance',
        severity: 'warning',
        file: `cli:${name}`,
        message: `CLI Performance budget exceeded (P95: ${p95}ms, Budget: ${BUDGET_MS}ms)`
      });
    }
  }

  return issues;
}

/**
 * Run validation for a single component and print component-scoped report
 * @param {string} name - Component name (PascalCase)
 */
async function runComponentValidation(name) {
  const nameValidation = await validateComponentName(name);
  if (!nameValidation.isValid) {
    throw new AtomixCLIError(
      nameValidation.error || `Invalid component name: ${name}`,
      ErrorCategory.VALIDATION,
      ['Use PascalCase (e.g. Button, Card). See atomix validate --help.']
    );
  }

  const spinner = logger.spinner(`Validating component ${name}...`).start();
  try {
    const report = await validateComponent(name);
    spinner.stop();

    logger.box(`Component: ${report.component}`, {
      borderColor: 'magenta',
      padding: 1,
      margin: 1
    });

    if (report.issues.length === 0) {
      console.log(chalk.bold.green(`✨ No issues found for ${report.component}.`));
      return;
    }

    let errors = 0;
    let warnings = 0;
    for (const r of report.issues) {
      const icon = r.severity === 'error' ? chalk.red('❌') : chalk.yellow('⚠️');
      if (r.severity === 'error') errors++;
      else warnings++;
      console.log(`${icon} [${r.type}] ${chalk.bold(r.file)}: ${r.message}`);
    }
    console.log(chalk.bold(`\nSummary: ${errors} errors, ${warnings} warnings.`));
    if (!report.valid) {
      throw new AtomixCLIError(
        `Component validation failed with ${errors} error(s) and ${warnings} warning(s).`,
        ErrorCategory.VALIDATION,
        ['Fix the reported issues and run atomix validate component <Name> again.']
      );
    }
  } catch (error) {
    spinner.fail('Validation failed');
    throw error;
  }
}
