/**
 * Migration Tools for Atomix Design System
 * Helps migrate from other design systems and CSS frameworks
 */

import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { join, extname, relative } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { validatePath, sanitizeInput } from './utils.js';
import {
  tailwindToAtomix,
  bootstrapToAtomix,
  scssVariableMigration
} from './mappings.js';



/**
 * Migrate Tailwind classes to Atomix
 */
export async function migrateTailwind(sourcePath, options = {}) {
  const sanitizedSource = sanitizeInput(sourcePath);
  const sourceValidation = validatePath(sanitizedSource);
  if (!sourceValidation.isValid) {
    throw new Error(sourceValidation.error);
  }
  const safeSource = sourceValidation.safePath;
  const spinner = ora('Migrating from Tailwind CSS...').start();
  const report = {
    filesProcessed: 0,
    classesReplaced: 0,
    warnings: [],
    errors: []
  };

  try {
    const files = await getAllFiles(safeSource, ['.jsx', '.tsx', '.js', '.ts', '.html']);

    for (const file of files) {
      spinner.text = `Processing ${relative(process.cwd(), file)}...`;

      try {
        let content = await readFile(file, 'utf8');
        const originalContent = content;
        let replacementCount = 0;

        // Replace className attributes
        content = content.replace(/className=["']([^"']+)["']/g, (match, classes) => {
          const classList = classes.split(' ');
          const newClasses = classList.map(cls => {
            const trimmed = cls.trim();
            if (tailwindToAtomix[trimmed]) {
              replacementCount++;
              return tailwindToAtomix[trimmed];
            }

            // Check for responsive prefixes
            for (const [prefix, replacement] of Object.entries(tailwindToAtomix)) {
              if (trimmed.startsWith(prefix)) {
                const rest = trimmed.substring(prefix.length);
                if (tailwindToAtomix[rest]) {
                  replacementCount++;
                  return replacement + tailwindToAtomix[rest];
                }
              }
            }

            // If no mapping found, keep original
            if (trimmed && !trimmed.startsWith('c-') && !trimmed.startsWith('u-') && !trimmed.startsWith('o-')) {
              report.warnings.push({
                file: relative(process.cwd(), file),
                class: trimmed,
                message: 'No Atomix equivalent found'
              });
            }

            return trimmed;
          });

          return `className="${newClasses.join(' ')}"`;
        });

        // Replace class attributes in HTML
        content = content.replace(/class=["']([^"']+)["']/g, (match, classes) => {
          const classList = classes.split(' ');
          const newClasses = classList.map(cls => {
            const trimmed = cls.trim();
            if (tailwindToAtomix[trimmed]) {
              replacementCount++;
              return tailwindToAtomix[trimmed];
            }
            return trimmed;
          });

          return `class="${newClasses.join(' ')}"`;
        });

        if (content !== originalContent) {
          if (options.dryRun) {
            console.log(chalk.yellow(`  Would update: ${file}`));
          } else {
            await writeFile(file, content, 'utf8');
            report.filesProcessed++;
            report.classesReplaced += replacementCount;
          }
        }

      } catch (error) {
        report.errors.push({
          file: relative(process.cwd(), file),
          error: error.message
        });
      }
    }

    spinner.succeed(chalk.green('Tailwind migration complete!'));

    return report;

  } catch (error) {
    spinner.fail(chalk.red('Migration failed'));
    throw error;
  }
}

/**
 * Migrate Bootstrap classes to Atomix
 */
export async function migrateBootstrap(sourcePath, options = {}) {
  const sanitizedSource = sanitizeInput(sourcePath);
  const sourceValidation = validatePath(sanitizedSource);
  if (!sourceValidation.isValid) {
    throw new Error(sourceValidation.error);
  }
  const safeSource = sourceValidation.safePath;
  const spinner = ora('Migrating from Bootstrap...').start();
  const report = {
    filesProcessed: 0,
    classesReplaced: 0,
    warnings: [],
    errors: []
  };

  try {
    const files = await getAllFiles(safeSource, ['.jsx', '.tsx', '.js', '.ts', '.html']);

    for (const file of files) {
      spinner.text = `Processing ${relative(process.cwd(), file)}...`;

      try {
        let content = await readFile(file, 'utf8');
        const originalContent = content;
        let replacementCount = 0;

        // Replace className/class attributes
        const classPattern = /(className|class)=["']([^"']+)["']/g;
        content = content.replace(classPattern, (match, attr, classes) => {
          const classList = classes.split(' ');
          const newClasses = classList.map(cls => {
            const trimmed = cls.trim();

            // Check direct mapping
            if (bootstrapToAtomix[trimmed]) {
              replacementCount++;
              return bootstrapToAtomix[trimmed];
            }

            // Check for col-{breakpoint}-{size} pattern
            const colPattern = /^col-(sm|md|lg|xl)-(\d+)$/;
            const colMatch = trimmed.match(colPattern);
            if (colMatch) {
              replacementCount++;
              return `c-grid__item c-grid__item--${colMatch[2]}`;
            }

            // Check for offset pattern
            const offsetPattern = /^offset-(sm|md|lg|xl)-(\d+)$/;
            const offsetMatch = trimmed.match(offsetPattern);
            if (offsetMatch) {
              replacementCount++;
              return `c-grid__item c-grid__item--offset-${offsetMatch[2]}`;
            }

            // If no mapping found, keep original
            if (trimmed && !trimmed.startsWith('c-') && !trimmed.startsWith('u-') && !trimmed.startsWith('o-')) {
              report.warnings.push({
                file: relative(process.cwd(), file),
                class: trimmed,
                message: 'No Atomix equivalent found'
              });
            }

            return trimmed;
          });

          return `${attr}="${newClasses.join(' ')}"`;
        });

        if (content !== originalContent) {
          if (options.dryRun) {
            console.log(chalk.yellow(`  Would update: ${file}`));
          } else {
            await writeFile(file, content, 'utf8');
            report.filesProcessed++;
            report.classesReplaced += replacementCount;
          }
        }

      } catch (error) {
        report.errors.push({
          file: relative(process.cwd(), file),
          error: error.message
        });
      }
    }

    spinner.succeed(chalk.green('Bootstrap migration complete!'));

    return report;

  } catch (error) {
    spinner.fail(chalk.red('Migration failed'));
    throw error;
  }
}

/**
 * Migrate SCSS variables to CSS custom properties
 */
export async function migrateSCSSVariables(sourcePath, options = {}) {
  const sanitizedSource = sanitizeInput(sourcePath);
  const sourceValidation = validatePath(sanitizedSource);
  if (!sourceValidation.isValid) {
    throw new Error(sourceValidation.error);
  }
  const safeSource = sourceValidation.safePath;
  const spinner = ora('Migrating SCSS variables to design tokens...').start();
  const report = {
    filesProcessed: 0,
    variablesReplaced: 0,
    warnings: [],
    errors: []
  };

  try {
    const files = await getAllFiles(safeSource, ['.scss', '.sass', '.css']);

    for (const file of files) {
      spinner.text = `Processing ${relative(process.cwd(), file)}...`;

      try {
        let content = await readFile(file, 'utf8');
        const originalContent = content;
        let replacementCount = 0;

        // Replace SCSS variables with CSS custom properties
        for (const [scssVar, cssVar] of Object.entries(scssVariableMigration)) {
          const regex = new RegExp(`\\${scssVar}(?![a-z-])`, 'g');
          const matches = content.match(regex);
          if (matches) {
            replacementCount += matches.length;
            content = content.replace(regex, cssVar);
          }
        }

        // Find remaining SCSS variables that weren't migrated
        const remainingVars = content.match(/\$[a-z-]+/gi);
        if (remainingVars) {
          remainingVars.forEach(varName => {
            if (!scssVariableMigration[varName]) {
              report.warnings.push({
                file: relative(process.cwd(), file),
                variable: varName,
                message: 'No design token equivalent found'
              });
            }
          });
        }

        if (content !== originalContent) {
          if (options.dryRun) {
            console.log(chalk.yellow(`  Would update: ${file}`));
          } else {
            await writeFile(file, content, 'utf8');
            report.filesProcessed++;
            report.variablesReplaced += replacementCount;
          }
        }

      } catch (error) {
        report.errors.push({
          file: relative(process.cwd(), file),
          error: error.message
        });
      }
    }

    spinner.succeed(chalk.green('SCSS variable migration complete!'));

    return report;

  } catch (error) {
    spinner.fail(chalk.red('Migration failed'));
    throw error;
  }
}

/**
 * Get all files recursively
 */
async function getAllFiles(dir, extensions = []) {
  const files = [];

  async function walk(currentPath) {
    const entries = await readdir(currentPath);

    for (const entry of entries) {
      const fullPath = join(currentPath, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        // Skip node_modules and hidden directories
        if (!entry.startsWith('.') && entry !== 'node_modules') {
          await walk(fullPath);
        }
      } else if (stats.isFile()) {
        const ext = extname(fullPath);
        if (extensions.length === 0 || extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  await walk(dir);
  return files;
}

/**
 * Display migration report
 */
export function displayMigrationReport(report) {
  console.log(chalk.bold('\n📊 Migration Report\n'));
  console.log(chalk.gray('='.repeat(50)));

  console.log(chalk.cyan(`Files processed: ${report.filesProcessed}`));
  console.log(chalk.cyan(`Classes/Variables replaced: ${report.classesReplaced || report.variablesReplaced}`));

  if (report.warnings.length > 0) {
    console.log(chalk.yellow(`\n⚠️  Warnings (${report.warnings.length}):\n`));

    // Group warnings by type
    const groupedWarnings = {};
    report.warnings.forEach(warning => {
      const key = warning.class || warning.variable;
      if (!groupedWarnings[key]) {
        groupedWarnings[key] = [];
      }
      groupedWarnings[key].push(warning.file);
    });

    Object.entries(groupedWarnings).forEach(([key, files]) => {
      console.log(chalk.yellow(`  • ${key}`));
      console.log(chalk.gray(`    Found in ${files.length} file(s)`));
      if (files.length <= 3) {
        files.forEach(file => console.log(chalk.gray(`      - ${file}`)));
      }
    });
  }

  if (report.errors.length > 0) {
    console.log(chalk.red(`\n❌ Errors (${report.errors.length}):\n`));
    report.errors.forEach(error => {
      console.log(chalk.red(`  • ${error.file}`));
      console.log(chalk.gray(`    ${error.error}`));
    });
  }

  console.log(chalk.gray('\n' + '='.repeat(50)));

  if (report.warnings.length > 0) {
    console.log(chalk.yellow('\n💡 Suggestions:'));
    console.log(chalk.gray('  1. Review unmapped classes/variables'));
    console.log(chalk.gray('  2. Create custom mappings for your specific needs'));
    console.log(chalk.gray('  3. Consider using Atomix utilities for better compatibility'));
  }

  console.log(chalk.green('\n✅ Migration complete!'));
  console.log(chalk.gray('Please review the changes and test your application.\n'));
}

export default {
  migrateTailwind,
  migrateBootstrap,
  migrateSCSSVariables,
  displayMigrationReport
};
