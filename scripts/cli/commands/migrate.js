/**
 * Atomix CLI - Migrate Command
 * Handles migrations from Tailwind, Bootstrap, and other frameworks
 */

import { resolve } from 'path';
import { stat } from 'fs/promises';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';
import { migrateTailwind, migrateBootstrap } from '../migration-tools.js';
import { AtomixCLIError, ErrorCategory } from '../utils/error.js';

/**
 * Ensure source is a directory; throw AtomixCLIError otherwise
 */
async function ensureSourceIsDirectory(source) {
  const absolute = resolve(process.cwd(), source);
  let st;
  try {
    st = await stat(absolute);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new AtomixCLIError(
        `Source not found: ${source}`,
        ErrorCategory.INVALID_PATH,
        ['Source must be a directory. Pass the project root (e.g. . or ./my-app).', 'Check that the path exists.']
      );
    }
    throw err;
  }
  if (!st.isDirectory()) {
    throw new AtomixCLIError(
      `Source is not a directory: ${source}`,
      ErrorCategory.INVALID_PATH,
      ['Source must be the project root directory (e.g. . or ./my-tailwind-app).', 'Do not pass a file path (e.g. package.json).']
    );
  }
  return absolute;
}

/**
 * Migrate action handler
 */
export async function migrateAction(type, source, options) {
  await ensureSourceIsDirectory(source);

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
        throw new AtomixCLIError(
          `Unsupported migration type: ${type}. Use tailwind or bootstrap.`,
          ErrorCategory.VALIDATION,
          ['Example: atomix migrate tailwind .']
        );
    }

    // Display Migration Report
    displayMigrationReport(report);

  } catch (error) {
    if (error instanceof AtomixCLIError) throw error;
    throw new AtomixCLIError(
      error.message || 'Migration failed',
      ErrorCategory.FILESYSTEM,
      ['Check source path and permissions. Run with --dry-run to preview.']
    );
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
