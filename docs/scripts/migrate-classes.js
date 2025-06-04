#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Class name mappings from old to new Atomix classes
const classMappings = {
  // Components
  'btn': 'c-btn',
  'btn--primary': 'c-btn--primary',
  'btn--secondary': 'c-btn--secondary',
  'btn--outline': 'c-btn--outline-primary',
  'btn--ghost': 'c-btn--outline-secondary',
  'btn--link': 'c-btn--link',
  'btn--sm': 'c-btn--sm',
  'btn--lg': 'c-btn--lg',
  'btn--rounded': 'c-btn--rounded',
  'btn--icon-only': 'c-btn--icon',
  'btn__icon': 'c-btn__icon',
  
  'card': 'c-card',
  'card__header': 'c-card__header',
  'card__body': 'c-card__body',
  'card__title': 'c-card__title',
  'card__text': 'c-card__text',
  'card__actions': 'c-card__actions',
  'card__icon': 'c-card__icon',
  'card--row': 'c-card--row',
  'card--flat': 'c-card--flat',
  
  'navbar': 'c-navbar',
  'navbar__brand': 'c-navbar__brand',
  'navbar__toggle': 'c-navbar__toggler',
  'navbar__collapse': 'c-navbar__collapse',
  'navbar__container': 'c-navbar__container',
  
  'nav': 'c-nav',
  'nav__item': 'c-nav__item',
  'nav__link': 'c-nav__link',
  'nav__dropdown': 'c-nav__dropdown-menu',
  
  'badge': 'c-badge',
  'badge--primary': 'c-badge--primary',
  'badge--secondary': 'c-badge--secondary',
  'badge--success': 'c-badge--success',
  'badge--warning': 'c-badge--warning',
  'badge--error': 'c-badge--error',
  'badge--sm': 'c-badge--sm',
  'badge--lg': 'c-badge--lg',
  
  'modal': 'c-modal',
  'modal__backdrop': 'c-modal__backdrop',
  'modal__dialog': 'c-modal__dialog',
  'modal__content': 'c-modal__content',
  'modal__header': 'c-modal__header',
  'modal__body': 'c-modal__body',
  'modal__footer': 'c-modal__footer',
  'modal__close': 'c-modal__close',
  
  'form': 'c-form',
  'form-group': 'c-form-group',
  'form-group__label': 'c-form-group__label',
  'form-group__field': 'c-form-group__field',
  'form-group__helper': 'c-form-group__helper',
  
  'input': 'c-input',
  'input--sm': 'c-input--sm',
  'input--lg': 'c-input--lg',
  'input--textarea': 'c-input--textarea',
  
  'dropdown': 'c-dropdown',
  'dropdown__toggle': 'c-dropdown__toggle',
  'dropdown__menu': 'c-dropdown__menu',
  'dropdown__item': 'c-dropdown__menu-item',
  'dropdown__divider': 'c-dropdown__divider',
  
  'table': 'c-data-table',
  'table__header': 'c-data-table__header',
  'table__row': 'c-data-table__row',
  'table__cell': 'c-data-table__cell',
  'table__header-cell': 'c-data-table__header-cell',
  'table--striped': 'c-data-table--striped',
  'table--bordered': 'c-data-table--bordered',
  
  'hero': 'c-hero',
  'hero__content': 'c-hero__content',
  'hero__title': 'c-hero__title',
  'hero__subtitle': 'c-hero__subtitle',
  'hero__text': 'c-hero__text',
  'hero__actions': 'c-hero__actions',
  
  // Layout objects
  'container': 'o-container',
  'container-fluid': 'o-container-fluid',
  'container-sm': 'o-container-sm',
  'container-md': 'o-container-md',
  'container-lg': 'o-container-lg',
  'container-xl': 'o-container-xl',
  'container-xxl': 'o-container-xxl',
  
  'grid': 'o-grid',
  'grid__col': 'o-grid__col',
  'grid--no-gutters': 'o-grid--no-gutters',
  
  // Utilities - Display
  'd-block': 'u-d-block',
  'd-inline': 'u-d-inline',
  'd-inline-block': 'u-d-inline-block',
  'd-flex': 'u-d-flex',
  'd-inline-flex': 'u-d-inline-flex',
  'd-grid': 'u-d-grid',
  'd-none': 'u-d-none',
  
  // Utilities - Flexbox
  'flex': 'u-d-flex',
  'flex-row': 'u-flex-row',
  'flex-column': 'u-flex-column',
  'flex-wrap': 'u-flex-wrap',
  'flex-nowrap': 'u-flex-nowrap',
  'justify-content-start': 'u-justify-content-start',
  'justify-content-center': 'u-justify-content-center',
  'justify-content-end': 'u-justify-content-end',
  'justify-content-between': 'u-justify-content-between',
  'align-items-start': 'u-align-items-start',
  'align-items-center': 'u-align-items-center',
  'align-items-end': 'u-align-items-end',
  
  // Utilities - Text
  'text-left': 'u-text-start',
  'text-center': 'u-text-center',
  'text-right': 'u-text-end',
  'text-sm': 'u-fs-sm',
  'text-lg': 'u-fs-lg',
  'text-xl': 'u-fs-1',
  'font-bold': 'u-fw-bold',
  'font-medium': 'u-fw-medium',
  'text-primary': 'u-text-primary',
  'text-secondary': 'u-text-secondary',
  'text-muted': 'u-text-secondary',
  
  // Utilities - Background
  'bg-primary': 'u-bg-primary',
  'bg-secondary': 'u-bg-secondary',
  'bg-white': 'u-bg-white',
  'bg-gray-100': 'u-bg-secondary-subtle',
  'bg-gray-200': 'u-bg-tertiary-subtle',
  
  // Utilities - Borders
  'border': 'u-border',
  'border-0': 'u-border-0',
  'border-top': 'u-border-t',
  'border-primary': 'u-border-primary',
  'rounded': 'u-rounded',
  'rounded-sm': 'u-rounded-sm',
  'rounded-lg': 'u-rounded-lg',
  'rounded-full': 'u-rounded-circle',
  
  // Utilities - Position
  'position-relative': 'u-position-relative',
  'position-absolute': 'u-position-absolute',
  'position-fixed': 'u-position-fixed',
  'top-0': 'u-top-0',
  'bottom-0': 'u-bottom-0',
  'left-0': 'u-start-0',
  'right-0': 'u-end-0',
  
  // Utilities - Width/Height
  'w-100': 'u-w-100',
  'w-50': 'u-w-50',
  'h-100': 'u-h-100',
  'min-vh-100': 'u-min-vh-100',
  
  // Utilities - Shadow
  'shadow': 'u-shadow',
  'shadow-sm': 'u-shadow-sm',
  'shadow-lg': 'u-shadow-lg',
  
  // State classes
  'active': 'is-active',
  'open': 'is-open',
  'closed': 'is-closed',
  'disabled': 'is-disabled',
  'focused': 'is-focused',
  'loading': 'is-loading',
  'expanded': 'is-expanded',
  'collapsed': 'is-collapsed'
};

// Generate spacing utilities
for (let i = 0; i <= 20; i++) {
  classMappings[`m-${i}`] = `u-m-${i}`;
  classMappings[`mt-${i}`] = `u-mt-${i}`;
  classMappings[`mb-${i}`] = `u-mb-${i}`;
  classMappings[`ml-${i}`] = `u-ms-${i}`;
  classMappings[`mr-${i}`] = `u-me-${i}`;
  classMappings[`mx-${i}`] = `u-mx-${i}`;
  classMappings[`my-${i}`] = `u-my-${i}`;
  classMappings[`p-${i}`] = `u-p-${i}`;
  classMappings[`pt-${i}`] = `u-pt-${i}`;
  classMappings[`pb-${i}`] = `u-pb-${i}`;
  classMappings[`pl-${i}`] = `u-ps-${i}`;
  classMappings[`pr-${i}`] = `u-pe-${i}`;
  classMappings[`px-${i}`] = `u-px-${i}`;
  classMappings[`py-${i}`] = `u-py-${i}`;
  classMappings[`gap-${i}`] = `u-gap-${i}`;
}

// Generate grid column utilities
for (let i = 1; i <= 12; i++) {
  classMappings[`grid__col--${i}`] = `o-grid__col--${i}`;
  classMappings[`grid__col--sm-${i}`] = `o-grid__col--sm-${i}`;
  classMappings[`grid__col--md-${i}`] = `o-grid__col--md-${i}`;
  classMappings[`grid__col--lg-${i}`] = `o-grid__col--lg-${i}`;
  classMappings[`grid__col--xl-${i}`] = `o-grid__col--xl-${i}`;
  classMappings[`grid__col--xxl-${i}`] = `o-grid__col--xxl-${i}`;
  
  classMappings[`grid__offset--${i}`] = `o-grid__offset--${i}`;
  classMappings[`grid__offset--sm-${i}`] = `o-grid__offset--sm-${i}`;
  classMappings[`grid__offset--md-${i}`] = `o-grid__offset--md-${i}`;
  classMappings[`grid__offset--lg-${i}`] = `o-grid__offset--lg-${i}`;
  classMappings[`grid__offset--xl-${i}`] = `o-grid__offset--xl-${i}`;
  classMappings[`grid__offset--xxl-${i}`] = `o-grid__offset--xxl-${i}`;
}

function cleanDuplicatePrefixes(content) {
  // Fix duplicate prefixes caused by multiple migrations
  return content
    .replace(/\bc-c-/g, 'c-')
    .replace(/\bo-o-/g, 'o-')
    .replace(/\bu-u-/g, 'u-')
    .replace(/\bis-is-/g, 'is-')
    // Handle longer duplicates
    .replace(/\bc-c-c-/g, 'c-')
    .replace(/\bo-o-o-/g, 'o-')
    .replace(/\bu-u-u-/g, 'u-')
    .replace(/\bis-is-is-/g, 'is-')
    // Handle specific duplicate patterns
    .replace(/\bu-u-d-u-d-flex/g, 'u-d-flex')
    .replace(/\bu-u-d-u-flex/g, 'u-d-flex')
    .replace(/\bc-c-btn--outline-primary-primary/g, 'c-btn--outline-primary')
    .replace(/\bc-c-btn--outline-primary-secondary/g, 'c-btn--outline-secondary')
    .replace(/\bc-c-c-btn--outline-primary-primary/g, 'c-btn--outline-primary')
    .replace(/\bc-c-c-badge--([a-z]+)/g, 'c-badge--$1')
    .replace(/\bc-c-c-btn--([a-z-]+)/g, 'c-btn--$1')
    .replace(/\bc-c-card--([a-z-]+)/g, 'c-card--$1')
    .replace(/\bo-o-o-grid__col--([a-z0-9-]+)/g, 'o-grid__col--$1')
    .replace(/\bu-u-([a-z-]+)/g, 'u-$1')
    .replace(/\bc-c-([a-z-]+)/g, 'c-$1')
    .replace(/\bo-o-([a-z-]+)/g, 'o-$1');
}

function migrateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    let hasChanges = false;

    // First, clean any existing duplicate prefixes
    newContent = cleanDuplicatePrefixes(newContent);

    // Replace class names in className attributes
    Object.entries(classMappings).forEach(([oldClass, newClass]) => {
      // Skip if the new class already exists to prevent double replacement
      if (newContent.includes(newClass)) return;
      
      // Match className="..." patterns with word boundaries
      const classNameRegex = new RegExp(`(className\\s*=\\s*["'\`][^"'\`]*\\b)${oldClass}(\\b[^"'\`]*["'\`])`, 'g');
      if (classNameRegex.test(newContent)) {
        newContent = newContent.replace(classNameRegex, `$1${newClass}$2`);
        hasChanges = true;
      }

      // Match class="..." patterns (for HTML files) with word boundaries
      const classRegex = new RegExp(`(class\\s*=\\s*["'\`][^"'\`]*\\b)${oldClass}(\\b[^"'\`]*["'\`])`, 'g');
      if (classRegex.test(newContent)) {
        newContent = newContent.replace(classRegex, `$1${newClass}$2`);
        hasChanges = true;
      }
    });

    // Final cleanup of any remaining duplicates
    const finalContent = cleanDuplicatePrefixes(newContent);
    if (finalContent !== content) {
      hasChanges = true;
      newContent = finalContent;
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Migrated: ${filePath}`);
      return true;
    } else {
      console.log(`⏸️  No changes: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function migrateDirectory(directory) {
  const patterns = [
    `${directory}/**/*.tsx`,
    `${directory}/**/*.ts`,
    `${directory}/**/*.jsx`,
    `${directory}/**/*.js`,
    `${directory}/**/*.html`,
    `${directory}/**/*.vue`,
    `${directory}/**/*.svelte`
  ];

  let totalFiles = 0;
  let migratedFiles = 0;

  patterns.forEach(pattern => {
    const files = glob.sync(pattern, { 
      ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**'] 
    });
    
    files.forEach(file => {
      totalFiles++;
      if (migrateFile(file)) {
        migratedFiles++;
      }
    });
  });

  console.log(`\n📊 Migration Summary:`);
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files with changes: ${migratedFiles}`);
  console.log(`   Files unchanged: ${totalFiles - migratedFiles}`);
}

// CLI usage
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🔄 Atomix Class Migration Tool

Usage:
  node migrate-classes.js <directory>
  node migrate-classes.js <file>

Examples:
  node migrate-classes.js src/
  node migrate-classes.js src/components/Button.tsx
  node migrate-classes.js .

This tool will automatically replace old class names with new Atomix class names.
It supports .tsx, .ts, .jsx, .js, .html, .vue, and .svelte files.
`);
    process.exit(1);
  }

  const target = args[0];
  
  if (!fs.existsSync(target)) {
    console.error(`❌ Path does not exist: ${target}`);
    process.exit(1);
  }

  console.log(`🚀 Starting Atomix class migration for: ${target}\n`);

  const stats = fs.statSync(target);
  
  if (stats.isDirectory()) {
    migrateDirectory(target);
  } else if (stats.isFile()) {
    migrateFile(target);
  } else {
    console.error(`❌ Invalid target: ${target}`);
    process.exit(1);
  }

  console.log(`\n✨ Migration complete!`);
}

if (require.main === module) {
  main();
}

module.exports = { migrateFile, migrateDirectory, classMappings };