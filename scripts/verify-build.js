#!/usr/bin/env node

/**
 * Build Verification Script
 * 
 * Verifies that all expected build outputs exist and are valid.
 * This helps catch build issues early and prevents regressions.
 */

import { existsSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = join(__dirname, '..');
const distDir = join(projectRoot, 'dist');

// Expected build outputs
const expectedFiles = [
  // Main entry points
  'index.js',
  'index.esm.js',
  'index.min.js',
  'index.d.ts',
  
  // CSS files
  'atomix.css',
  'atomix.css.map',
  'atomix.min.css',
  'atomix.min.css.map',
  
  // Entry point builds
  'theme.js',
  'theme.d.ts',
  'charts.js',
  'charts.d.ts',
  'forms.js',
  'forms.d.ts',
  'layout.js',
  'layout.d.ts',
  'heavy.js',
  'heavy.d.ts',
  'core.js',
  'core.d.ts',
];

// Size thresholds (in bytes)
const sizeThresholds = {
  'index.js': { min: 1000, max: 500000 }, // 1KB - 500KB
  'index.esm.js': { min: 1000, max: 500000 },
  'index.min.js': { min: 500, max: 300000 }, // 500B - 300KB
  'atomix.css': { min: 1000, max: 2000000 }, // 1KB - 2MB
  'atomix.min.css': { min: 500, max: 1000000 }, // 500B - 1MB
};

let hasErrors = false;
const errors = [];
const warnings = [];

console.log('🔍 Verifying build outputs...\n');

// Check if dist directory exists
if (!existsSync(distDir)) {
  console.error('❌ dist/ directory does not exist!');
  console.error('   Run "npm run build" first.');
  process.exit(1);
}

// Check each expected file
for (const file of expectedFiles) {
  const filePath = join(distDir, file);
  
  if (!existsSync(filePath)) {
    errors.push(`Missing file: ${file}`);
    hasErrors = true;
    continue;
  }
  
  // Check file size
  const stats = statSync(filePath);
  const size = stats.size;
  
  if (size === 0) {
    errors.push(`Empty file: ${file}`);
    hasErrors = true;
    continue;
  }
  
  // Check size thresholds
  if (sizeThresholds[file]) {
    const { min, max } = sizeThresholds[file];
    if (size < min) {
      warnings.push(`File ${file} is smaller than expected (${size} bytes < ${min} bytes)`);
    } else if (size > max) {
      warnings.push(`File ${file} is larger than expected (${size} bytes > ${max} bytes)`);
    }
  }
  
  console.log(`✅ ${file} (${(size / 1024).toFixed(2)} KB)`);
}

// Check for source maps
const sourceMapFiles = expectedFiles.filter(f => f.endsWith('.map'));
for (const file of sourceMapFiles) {
  const filePath = join(distDir, file);
  if (!existsSync(filePath)) {
    warnings.push(`Source map missing: ${file}`);
  }
}

// Print results
console.log('\n' + '='.repeat(50));

if (errors.length > 0) {
  console.error('\n❌ Errors found:');
  errors.forEach(error => console.error(`   - ${error}`));
}

if (warnings.length > 0) {
  console.warn('\n⚠️  Warnings:');
  warnings.forEach(warning => console.warn(`   - ${warning}`));
}

if (!hasErrors && warnings.length === 0) {
  console.log('\n✅ All build outputs verified successfully!');
  process.exit(0);
} else if (!hasErrors) {
  console.log('\n✅ Build outputs exist, but some warnings were found.');
  process.exit(0);
} else {
  console.error('\n❌ Build verification failed!');
  process.exit(1);
}

