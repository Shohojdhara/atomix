/**
 * Migration Tools for Atomix Design System
 * Helps migrate from other design systems and CSS frameworks
 */

import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { join, extname, relative } from 'path';
import chalk from 'chalk';
import ora from 'ora';

/**
 * Tailwind to Atomix mapping
 */
const tailwindToAtomix = {
  // Colors
  'bg-primary': 'c-bg-primary',
  'text-primary': 'c-text-primary',
  'border-primary': 'c-border-primary',
  
  // Spacing
  'p-0': 'u-p-0',
  'p-1': 'u-p-1',
  'p-2': 'u-p-2',
  'p-3': 'u-p-3',
  'p-4': 'u-p-4',
  'p-5': 'u-p-5',
  'p-6': 'u-p-6',
  'p-8': 'u-p-8',
  
  'm-0': 'u-m-0',
  'm-1': 'u-m-1',
  'm-2': 'u-m-2',
  'm-3': 'u-m-3',
  'm-4': 'u-m-4',
  'm-auto': 'u-m-auto',
  
  // Flexbox
  'flex': 'u-flex',
  'flex-row': 'u-flex-row',
  'flex-col': 'u-flex-column',
  'items-center': 'u-items-center',
  'justify-center': 'u-justify-center',
  'justify-between': 'u-justify-between',
  'gap-1': 'u-gap-1',
  'gap-2': 'u-gap-2',
  'gap-4': 'u-gap-4',
  
  // Display
  'hidden': 'u-hidden',
  'block': 'u-block',
  'inline-block': 'u-inline-block',
  'inline': 'u-inline',
  'grid': 'u-grid',
  
  // Typography
  'text-xs': 'u-text-xs',
  'text-sm': 'u-text-sm',
  'text-base': 'u-text-base',
  'text-lg': 'u-text-lg',
  'text-xl': 'u-text-xl',
  'text-2xl': 'u-text-2xl',
  'font-bold': 'u-font-bold',
  'font-semibold': 'u-font-semibold',
  'font-normal': 'u-font-normal',
  
  // Border
  'border': 'u-border',
  'border-2': 'u-border-2',
  'rounded': 'u-rounded',
  'rounded-md': 'u-rounded-md',
  'rounded-lg': 'u-rounded-lg',
  'rounded-full': 'u-rounded-full',
  
  // Components
  'btn': 'c-btn',
  'btn-primary': 'c-btn c-btn-primary',
  'btn-secondary': 'c-btn c-btn-secondary',
  'card': 'c-card',
  'badge': 'c-badge',
  'alert': 'c-alert',
  'input': 'c-input',
  'select': 'c-select',
  'checkbox': 'c-checkbox',
  'radio': 'c-radio',
  
  // Responsive prefixes
  'sm:': '@sm:',
  'md:': '@md:',
  'lg:': '@lg:',
  'xl:': '@xl:',
  
  // States
  'hover:': ':hover ',
  'focus:': ':focus ',
  'active:': ':active ',
  'disabled:': ':disabled '
};

/**
 * Bootstrap to Atomix mapping
 */
const bootstrapToAtomix = {
  // Components
  'btn': 'c-btn',
  'btn-primary': 'c-btn c-btn-primary',
  'btn-secondary': 'c-btn c-btn-secondary',
  'btn-success': 'c-btn c-btn-success',
  'btn-danger': 'c-btn c-btn-error',
  'btn-warning': 'c-btn c-btn-warning',
  'btn-info': 'c-btn c-btn-info',
  'btn-lg': 'c-btn c-btn-lg',
  'btn-sm': 'c-btn c-btn-sm',
  
  'card': 'c-card',
  'card-header': 'c-card__header',
  'card-body': 'c-card__body',
  'card-footer': 'c-card__footer',
  'card-title': 'c-card__title',
  'card-text': 'c-card__text',
  
  'alert': 'c-alert',
  'alert-primary': 'c-alert c-alert-primary',
  'alert-success': 'c-alert c-alert-success',
  'alert-danger': 'c-alert c-alert-error',
  'alert-warning': 'c-alert c-alert-warning',
  
  'badge': 'c-badge',
  'badge-primary': 'c-badge c-badge-primary',
  'badge-secondary': 'c-badge c-badge-secondary',
  
  'form-control': 'c-input',
  'form-select': 'c-select',
  'form-check': 'c-form-check',
  'form-check-input': 'c-checkbox',
  'form-label': 'c-label',
  
  'modal': 'c-modal',
  'modal-dialog': 'c-modal__dialog',
  'modal-content': 'c-modal__content',
  'modal-header': 'c-modal__header',
  'modal-body': 'c-modal__body',
  'modal-footer': 'c-modal__footer',
  
  // Grid
  'container': 'o-container',
  'container-fluid': 'o-container-fluid',
  'row': 'o-row',
  'col': 'o-col',
  'col-sm': 'o-col-sm',
  'col-md': 'o-col-md',
  'col-lg': 'o-col-lg',
  'col-xl': 'o-col-xl',
  
  // Utilities
  'd-none': 'u-hidden',
  'd-block': 'u-block',
  'd-inline': 'u-inline',
  'd-inline-block': 'u-inline-block',
  'd-flex': 'u-flex',
  'd-grid': 'u-grid',
  
  'text-center': 'u-text-center',
  'text-left': 'u-text-left',
  'text-right': 'u-text-right',
  'text-justify': 'u-text-justify',
  
  'text-primary': 'u-text-primary',
  'text-success': 'u-text-success',
  'text-danger': 'u-text-error',
  'text-warning': 'u-text-warning',
  'text-muted': 'u-text-muted',
  
  'bg-primary': 'u-bg-primary',
  'bg-success': 'u-bg-success',
  'bg-danger': 'u-bg-error',
  'bg-warning': 'u-bg-warning',
  
  'p-0': 'u-p-0',
  'p-1': 'u-p-1',
  'p-2': 'u-p-2',
  'p-3': 'u-p-3',
  'p-4': 'u-p-4',
  'p-5': 'u-p-5',
  
  'm-0': 'u-m-0',
  'm-1': 'u-m-1',
  'm-2': 'u-m-2',
  'm-3': 'u-m-3',
  'm-4': 'u-m-4',
  'm-5': 'u-m-5',
  'm-auto': 'u-m-auto',
  
  'rounded': 'u-rounded',
  'rounded-circle': 'u-rounded-full',
  'border': 'u-border',
  
  'w-25': 'u-w-25',
  'w-50': 'u-w-50',
  'w-75': 'u-w-75',
  'w-100': 'u-w-100',
  'h-25': 'u-h-25',
  'h-50': 'u-h-50',
  'h-75': 'u-h-75',
  'h-100': 'u-h-100'
};

/**
 * SCSS Variable Migration
 */
const scssVariableMigration = {
  // Colors
  '$primary': 'var(--atomix-color-primary)',
  '$secondary': 'var(--atomix-color-secondary)',
  '$success': 'var(--atomix-color-success)',
  '$danger': 'var(--atomix-color-error)',
  '$warning': 'var(--atomix-color-warning)',
  '$info': 'var(--atomix-color-info)',
  '$light': 'var(--atomix-color-light)',
  '$dark': 'var(--atomix-color-dark)',
  
  // Spacing
  '$spacer': 'var(--atomix-space-4)',
  '$spacing-xs': 'var(--atomix-space-1)',
  '$spacing-sm': 'var(--atomix-space-2)',
  '$spacing-md': 'var(--atomix-space-4)',
  '$spacing-lg': 'var(--atomix-space-6)',
  '$spacing-xl': 'var(--atomix-space-8)',
  
  // Typography
  '$font-family-base': 'var(--atomix-font-family-base)',
  '$font-size-base': 'var(--atomix-font-size-base)',
  '$font-weight-normal': 'var(--atomix-font-weight-normal)',
  '$font-weight-bold': 'var(--atomix-font-weight-bold)',
  '$line-height-base': 'var(--atomix-line-height-base)',
  
  // Border
  '$border-radius': 'var(--atomix-radius-md)',
  '$border-width': 'var(--atomix-border-width)',
  '$border-color': 'var(--atomix-color-border)'
};

/**
 * Migrate Tailwind classes to Atomix
 */
export async function migrateTailwind(sourcePath, options = {}) {
  const spinner = ora('Migrating from Tailwind CSS...').start();
  const report = {
    filesProcessed: 0,
    classesReplaced: 0,
    warnings: [],
    errors: []
  };
  
  try {
    const files = await getAllFiles(sourcePath, ['.jsx', '.tsx', '.js', '.ts', '.html']);
    
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
  const spinner = ora('Migrating from Bootstrap...').start();
  const report = {
    filesProcessed: 0,
    classesReplaced: 0,
    warnings: [],
    errors: []
  };
  
  try {
    const files = await getAllFiles(sourcePath, ['.jsx', '.tsx', '.js', '.ts', '.html']);
    
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
              return `o-col-${colMatch[1]}-${colMatch[2]}`;
            }
            
            // Check for offset pattern
            const offsetPattern = /^offset-(sm|md|lg|xl)-(\d+)$/;
            const offsetMatch = trimmed.match(offsetPattern);
            if (offsetMatch) {
              replacementCount++;
              return `o-offset-${offsetMatch[1]}-${offsetMatch[2]}`;
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
  const spinner = ora('Migrating SCSS variables to design tokens...').start();
  const report = {
    filesProcessed: 0,
    variablesReplaced: 0,
    warnings: [],
    errors: []
  };
  
  try {
    const files = await getAllFiles(sourcePath, ['.scss', '.sass', '.css']);
    
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
  console.log(chalk.gray('=' .repeat(50)));
  
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
  
  console.log(chalk.gray('\n' + '=' .repeat(50)));
  
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
