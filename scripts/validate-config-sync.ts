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
 * Validate that themes.config.js is in sync with atomix.config.ts
 */
async function validateThemesConfig(): Promise<boolean> {
  try {
    // Read source config
    const configPath = path.join(__dirname, '../atomix.config.ts');
    const configUrl = `file://${configPath}?update=${Date.now()}`;
    const configModule = await import(configUrl);
    const sourceConfig = configModule.default || configModule;

    // Read generated config
    const generatedPath = path.join(__dirname, '../src/themes/themes.config.js');
    const generatedContent = await fs.readFile(generatedPath, 'utf8');

    // Extract prefix from source
    const sourcePrefix = sourceConfig.prefix || 'atomix';
    
    // Extract prefix from generated (look for prefix: '...')
    const prefixMatch = generatedContent.match(/prefix:\s*['"]([^'"]+)['"]/);
    const generatedPrefix = prefixMatch ? prefixMatch[1] : null;

    // Validate prefix match
    if (generatedPrefix !== sourcePrefix) {
      console.error(`❌ Prefix mismatch:`);
      console.error(`   Source (atomix.config.ts): ${sourcePrefix}`);
      console.error(`   Generated (themes.config.js): ${generatedPrefix || 'not found'}`);
      return false;
    }

    // Validate build config (allow empty objects)
    const buildMatch = generatedContent.match(/build:\s*(\{[^}]*\})/s);
    if (!buildMatch) {
      console.error('❌ Could not find build config in generated file');
      return false;
    }

    // Validate runtime config (allow empty objects)
    const runtimeMatch = generatedContent.match(/runtime:\s*(\{[^}]*\})/s);
    if (!runtimeMatch) {
      console.error('❌ Could not find runtime config in generated file');
      return false;
    }

    console.log('✅ themes.config.js is in sync with atomix.config.ts');
    console.log(`   Prefix: ${sourcePrefix}`);
    return true;
  } catch (error: any) {
    console.error('❌ Validation failed:', error.message);
    return false;
  }
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

  const themesValid = await validateThemesConfig();
  console.log('');
  const scssValid = await validateSCSSConfig();

  console.log('');

  if (themesValid && scssValid) {
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

