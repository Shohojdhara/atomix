#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function cleanupClasses(content) {
  let cleaned = content;
  
  // Fix duplicate prefixes
  cleaned = cleaned.replace(/\bc-c-/g, 'c-');
  cleaned = cleaned.replace(/\bo-o-/g, 'o-');
  cleaned = cleaned.replace(/\bu-u-/g, 'u-');
  cleaned = cleaned.replace(/\bis-is-/g, 'is-');
  
  // Handle triple duplicates
  cleaned = cleaned.replace(/\bc-c-c-/g, 'c-');
  cleaned = cleaned.replace(/\bo-o-o-/g, 'o-');
  cleaned = cleaned.replace(/\bu-u-u-/g, 'u-');
  cleaned = cleaned.replace(/\bis-is-is-/g, 'is-');
  
  // Fix specific patterns
  cleaned = cleaned.replace(/\bu-d-u-d-flex/g, 'u-d-flex');
  cleaned = cleaned.replace(/\bu-d-u-flex/g, 'u-d-flex');
  cleaned = cleaned.replace(/\bu-d-u-flex-wrap/g, 'u-flex-wrap');
  cleaned = cleaned.replace(/\bu-u-d-flex/g, 'u-d-flex');
  cleaned = cleaned.replace(/\bu-u-d-block/g, 'u-d-block');
  
  // Fix button outline variants
  cleaned = cleaned.replace(/\bc-btn--outline-primary-primary/g, 'c-btn--outline-primary');
  cleaned = cleaned.replace(/\bc-btn--outline-primary-secondary/g, 'c-btn--outline-secondary');
  cleaned = cleaned.replace(/\bc-btn--outline-primary-success/g, 'c-btn--outline-success');
  cleaned = cleaned.replace(/\bc-btn--outline-primary-info/g, 'c-btn--outline-info');
  cleaned = cleaned.replace(/\bc-btn--outline-primary-warning/g, 'c-btn--outline-warning');
  cleaned = cleaned.replace(/\bc-btn--outline-primary-error/g, 'c-btn--outline-error');
  
  // Fix button variants with wrong modifiers
  cleaned = cleaned.replace(/\bc-btn--u-rounded/g, 'c-btn--rounded');
  
  // Fix data table classes
  cleaned = cleaned.replace(/\bc-data-c-data-table/g, 'c-data-table');
  cleaned = cleaned.replace(/\bc-data-c-data-c-data-table/g, 'c-data-table');
  cleaned = cleaned.replace(/\bc-data-c-data-c-data-c-data-table/g, 'c-data-table');
  
  // Fix utility class duplicates
  cleaned = cleaned.replace(/\bu-u-([a-z-]+)/g, 'u-$1');
  cleaned = cleaned.replace(/\bc-c-([a-z-]+)/g, 'c-$1');
  cleaned = cleaned.replace(/\bo-o-([a-z-]+)/g, 'o-$1');
  
  // Fix navbar classes
  cleaned = cleaned.replace(/\bc-c-navbar/g, 'c-navbar');
  cleaned = cleaned.replace(/\bc-c-hero/g, 'c-hero');
  cleaned = cleaned.replace(/\bc-c-card/g, 'c-card');
  cleaned = cleaned.replace(/\bc-c-btn/g, 'c-btn');
  cleaned = cleaned.replace(/\bc-c-badge/g, 'c-badge');
  
  // Fix grid classes
  cleaned = cleaned.replace(/\bo-o-grid/g, 'o-grid');
  cleaned = cleaned.replace(/\bo-grid__col o-o-o-grid__col/g, 'o-grid__col');
  cleaned = cleaned.replace(/\bo-o-o-grid__col/g, 'o-grid__col');
  
  return cleaned;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = cleanupClasses(content);
    
    if (cleaned !== content) {
      fs.writeFileSync(filePath, cleaned);
      console.log(`✅ Cleaned: ${filePath}`);
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

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🧹 Atomix Class Cleanup Tool

Usage:
  node cleanup-classes.js <directory>
  node cleanup-classes.js <file>

This tool cleans up duplicate prefixes and incorrect class names.
`);
    process.exit(1);
  }

  const target = args[0];
  
  if (!fs.existsSync(target)) {
    console.error(`❌ Path does not exist: ${target}`);
    process.exit(1);
  }

  console.log(`🧹 Starting cleanup for: ${target}\n`);

  const stats = fs.statSync(target);
  let totalFiles = 0;
  let cleanedFiles = 0;
  
  if (stats.isDirectory()) {
    const patterns = [
      `${target}/**/*.tsx`,
      `${target}/**/*.ts`,
      `${target}/**/*.jsx`,
      `${target}/**/*.js`,
      `${target}/**/*.html`
    ];

    patterns.forEach(pattern => {
      const files = glob.sync(pattern, { 
        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**'] 
      });
      
      files.forEach(file => {
        totalFiles++;
        if (processFile(file)) {
          cleanedFiles++;
        }
      });
    });
  } else if (stats.isFile()) {
    totalFiles = 1;
    if (processFile(target)) {
      cleanedFiles = 1;
    }
  }

  console.log(`\n📊 Cleanup Summary:`);
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files cleaned: ${cleanedFiles}`);
  console.log(`   Files unchanged: ${totalFiles - cleanedFiles}`);
  console.log(`\n✨ Cleanup complete!`);
}

if (require.main === module) {
  main();
}

module.exports = { cleanupClasses, processFile };