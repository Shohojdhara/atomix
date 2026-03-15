/**
 * Atomix CLI - Migrate Command
 * Handles migrations from Tailwind, Bootstrap, and other frameworks
 */

import chalk from 'chalk';
import { logger } from '../utils/logger.js';
import { migrateTailwind, migrateBootstrap } from '../migration-tools.js';

/**
 * Migrate action handler
 */
export async function migrateAction(type, source, options) {
  logger.info(chalk.blue(`🚀 Starting migration: ${type} from ${source}...`));

  try {
    let report;

    switch (type.toLowerCase()) {
      case 'tailwind':
        report = await migrateTailwind(source, options);
        break;
      case 'bootstrap':
        report = await migrateBootstrap(source, options);
        break;
      default:
        logger.error(`Unsupported migration type: ${type}`);
        process.exit(1);
    }

    // Display Migration Report
    displayMigrationReport(report);

  } catch (error) {
    logger.error(`Migration failed: ${error.message}`);
    if (process.env.ATOMIX_DEBUG) {
      console.error(error);
    }
    process.exit(1);
  }
}

/**
 * Display migration report in a clean format
 */
function displayMigrationReport(report) {
  console.log('\n' + chalk.bold.underline('Migration Report'));
  console.log(`${chalk.green('✔')} Files processed: ${report.filesProcessed}`);
  console.log(`${chalk.green('✔')} Classes replaced: ${report.classesReplaced}`);

  if (report.warnings.length > 0) {
    console.log('\n' + chalk.yellow.bold('Warnings:'));
    const uniqueWarnings = [...new Set(report.warnings.map(w => `${w.file}: ${w.class}`))];
    uniqueWarnings.slice(0, 10).forEach(w => console.log(`  ${chalk.yellow('!')} ${w}`));
    if (uniqueWarnings.length > 10) {
      console.log(`  ... and ${uniqueWarnings.length - 10} more`);
    }
  }

  if (report.errors.length > 0) {
    console.log('\n' + chalk.red.bold('Errors:'));
    report.errors.slice(0, 10).forEach(e => console.log(`  ${chalk.red('✘')} ${e.file}: ${e.error}`));
    if (report.errors.length > 10) {
      console.log(`  ... and ${report.errors.length - 10} more`);
    }
  }

  console.log('\n' + chalk.green.bold('Migration completed successfully! 🎉'));
}
