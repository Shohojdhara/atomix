#!/usr/bin/env node

/**
 * Sync Theme Configuration (TypeScript Version)
 * 
 * This script generates src/themes/themes.config.js from atomix.config.ts
 * to maintain a single source of truth for theme configuration.
 * 
 * This ensures:
 * - Build-time config (themes.config.js) stays in sync with runtime config (atomix.config.ts)
 * - Prefix configuration is consistent across all systems
 * - Theme metadata is automatically extracted
 * 
 * Run with: npm run sync:config
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ESM compatibility: Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the actual atomix config
// Note: With ESM, we use .js extension even though the file is .ts
import atomixConfig from '../atomix.config.js';

// Get prefix from config (default: 'atomix')
const prefix = atomixConfig.prefix || 'atomix';

// Alias for compatibility with existing script logic
const themeConfig = {
  themes: atomixConfig.theme?.themes || {},
  build: atomixConfig.build || {},
  runtime: atomixConfig.runtime || {},
  integration: atomixConfig.integration || {},
  dependencies: atomixConfig.dependencies || {},
  prefix: prefix, // Include prefix in config
};

/**
 * Generate themes.config.js content
 */
function generateThemesConfigJS() {
  // Extract metadata from themes
  const metadata: Record<string, any> = {};

  for (const [key, theme] of Object.entries(themeConfig.themes)) {
    if (theme.type === 'css') {
      metadata[key] = {
        name: theme.name,
        description: theme.description,
        author: theme.author,
        version: theme.version,
        tags: theme.tags,
        supportsDarkMode: theme.supportsDarkMode,
        status: theme.status,
        a11y: theme.a11y,
        color: theme.color,
        features: theme.features,
      };

      // Remove undefined values
      Object.keys(metadata[key]).forEach(k => {
        if (metadata[key][k] === undefined) {
          delete metadata[key][k];
        }
      });
    }
  }

  return `/**
 * Theme Configuration
 *
 * This file is auto-generated from atomix.config.ts
 * DO NOT EDIT MANUALLY - Edit atomix.config.ts instead
 * Run 'npm run sync:config' to regenerate
 * 
 * Generated on: ${new Date().toISOString()}
 */

export const themesConfig = {
  // CSS variable prefix (from atomix.config.ts)
  prefix: '${prefix}',
  
  // Theme metadata
  metadata: ${JSON.stringify(metadata, null, 4).replace(/"([^"]+)":/g, '$1:')},

  // Build configuration
  build: ${JSON.stringify(themeConfig.build, null, 4).replace(/"([^"]+)":/g, '$1:')},

  // Export configuration for package.json
  exports: {
    './themes/*': './dist/themes/*.css',
    './themes/*.min': './dist/themes/*.min.css',
  },

  // Theme integration settings
  integration: ${JSON.stringify(themeConfig.integration, null, 4).replace(/"([^"]+)":/g, '$1:')},

  // Runtime theme loading configuration
  runtime: ${JSON.stringify(themeConfig.runtime, null, 4)
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/false/g, 'process.env.NODE_ENV === \'production\'')},

  // Theme dependencies (if a theme requires another theme to be loaded)
  dependencies: ${JSON.stringify(themeConfig.dependencies || {}, null, 4).replace(/"([^"]+)":/g, '$1:')},
};`;
}

/**
 * Main function
 */
async function main() {
  console.log('🔄 Syncing theme configuration...\n');

  try {
    // Generate themes.config.js
    console.log('📖 Reading theme.config.ts...');
    console.log(`  ✅ Found ${Object.keys(themeConfig.themes).length} themes`);

    console.log('\n📝 Generating themes.config.js...');
    const jsContent = generateThemesConfigJS();

    // Write to file
    const outputPath = path.join(__dirname, '../src/themes/themes.config.js');
    await fs.writeFile(outputPath, jsContent, 'utf8');
    console.log('  ✅ Written to src/themes/themes.config.js');

    console.log('\n✨ Configuration sync complete!');
    console.log(`   themes.config.js has been updated from atomix.config.ts`);
    console.log(`   Prefix: ${prefix}`);

  } catch (error: any) {
    console.error('\n💥 Sync failed:', error.message);
    process.exit(1);
  }
}

// Run the sync
main();
