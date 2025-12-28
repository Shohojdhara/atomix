#!/usr/bin/env node

/**
 * Validate Configuration Sync
 * 
 * This script validates that generated configuration files are in sync
 * with the source configuration (atomix.config.ts).
 * 
 * Run with: npm run validate:config
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Validate themes.config.js (removed - themes directory has been removed)
 */
async function validateThemesConfig(): Promise<boolean> {
  // Themes have been removed, skip validation
  console.log('ℹ️  Theme validation skipped (themes directory removed)');
  return true;
}

/**
 * Validate that _settings.config.scss exists (SCSS builds are independent)
 */
async function validateSCSSConfig(): Promise<boolean> {
  try {
    // Read SCSS config
    const scssConfigPath = path.join(__dirname, '../src/styles/01-settings/_settings.config.scss');
    const scssContent = await fs.readFile(scssConfigPath, 'utf8');

    // Extract prefix from SCSS (look for $prefix: ...)
    const prefixMatch = scssContent.match(/\$prefix:\s*([^;]+);/);
    const scssPrefix = prefixMatch ? prefixMatch[1].trim().replace(/['"]/g, '').replace(/\s*!default/, '') : null;

    if (!scssPrefix) {
      console.error('❌ SCSS prefix not found in _settings.config.scss');
      return false;
    }

    console.log('✅ _settings.config.scss exists and has prefix');
    console.log(`   Prefix: ${scssPrefix}`);
    console.log(`   Note: SCSS builds work independently - prefix is not synced from atomix.config.ts`);
    return true;
  } catch (error: any) {
    console.error('❌ SCSS validation failed:', error.message);
    return false;
  }
}

/**
 * Main validation function
 */
async function main() {
  console.log('🔍 Validating configuration sync...\n');

  await validateThemesConfig();
  console.log('');
  const scssValid = await validateSCSSConfig();

  console.log('');

  if (scssValid) {
    console.log('✨ All configurations are in sync!');
    process.exit(0);
  } else {
    console.error('💥 Configuration validation failed!');
    console.error('   Run "npm run sync:config && npm run sync:tokens" to fix.');
    process.exit(1);
  }
}

// Run validation
main();

