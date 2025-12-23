#!/usr/bin/env node

/**
 * Build Test Script
 * 
 * Automated tests to prevent build regressions.
 * Tests that build completes without errors and outputs are valid.
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = join(__dirname, '..');

console.log('🧪 Running build tests...\n');

let hasErrors = false;

// Test 1: Build completes without errors
console.log('Test 1: Build completes without errors...');
try {
  execSync('npm run clean', { cwd: projectRoot, stdio: 'inherit' });
  execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
  console.log('✅ Build completed successfully\n');
} catch (error) {
  console.error('❌ Build failed!\n');
  hasErrors = true;
}

// Test 2: Type checking passes
console.log('Test 2: Type checking passes...');
try {
  execSync('npm run typecheck', { cwd: projectRoot, stdio: 'inherit' });
  console.log('✅ Type checking passed\n');
} catch (error) {
  console.error('❌ Type checking failed!\n');
  hasErrors = true;
}

// Test 3: Critical files exist
console.log('Test 3: Critical files exist...');
const criticalFiles = [
  'dist/index.js',
  'dist/index.esm.js',
  'dist/index.d.ts',
  'dist/atomix.css',
];
let allFilesExist = true;
for (const file of criticalFiles) {
  const filePath = join(projectRoot, file);
  if (!existsSync(filePath)) {
    console.error(`❌ Missing: ${file}`);
    allFilesExist = false;
  }
}
if (allFilesExist) {
  console.log('✅ All critical files exist\n');
} else {
  hasErrors = true;
}

// Test 4: Source maps exist
console.log('Test 4: Source maps exist...');
const sourceMapFiles = [
  'dist/atomix.css.map',
];
let allSourceMapsExist = true;
for (const file of sourceMapFiles) {
  const filePath = join(projectRoot, file);
  if (!existsSync(filePath)) {
    console.warn(`⚠️  Missing: ${file}`);
    allSourceMapsExist = false;
  }
}
if (allSourceMapsExist) {
  console.log('✅ All source maps exist\n');
} else {
  console.warn('⚠️  Some source maps are missing\n');
}

// Print summary
console.log('='.repeat(50));
if (hasErrors) {
  console.error('\n❌ Build tests failed!');
  process.exit(1);
} else {
  console.log('\n✅ All build tests passed!');
  process.exit(0);
}

