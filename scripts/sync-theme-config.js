#!/usr/bin/env node

/**
 * Sync Theme Configuration
 * 
 * This script generates src/themes/themes.config.js from theme.config.ts
 * to maintain a single source of truth for theme configuration.
 */

import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// File paths
const THEME_CONFIG_TS = join(__dirname, '../theme.config.ts');
const THEMES_CONFIG_JS = join(__dirname, '../src/themes/themes.config.js');

/**
 * Parse theme.config.ts to extract configuration
 * Note: This is a simplified parser that works with the current structure
 */
async function parseThemeConfigTS() {
  try {
    const content = await readFile(THEME_CONFIG_TS, 'utf8');

    // Extract themes object
    const themesMatch = content.match(/themes:\s*{([^}]+(?:{[^}]*}[^}]*)*[^}]+)}/s);
    if (!themesMatch) {
      throw new Error('Could not find themes configuration');
    }

    // Extract individual theme configurations
    const themes = {};
    const themeRegex = /['"]([^'"]+)['"]\s*:\s*{([^}]+(?:{[^}]*}[^}]*)*[^}]+)}/gs;
    let match;

    while ((match = themeRegex.exec(themesMatch[1])) !== null) {
      const [, themeName, themeConfig] = match;

      // Parse theme properties
      const theme = {
        name: extractValue(themeConfig, 'name'),
        description: extractValue(themeConfig, 'description'),
        author: extractValue(themeConfig, 'author'),
        version: extractValue(themeConfig, 'version'),
        tags: extractArray(themeConfig, 'tags'),
        supportsDarkMode: extractBoolean(themeConfig, 'supportsDarkMode'),
        status: extractValue(themeConfig, 'status'),
        color: extractValue(themeConfig, 'color'),
      };

      // Parse features if present
      const featuresMatch = themeConfig.match(/features:\s*\[([^\]]*)\]/s);
      if (featuresMatch) {
        theme.features = featuresMatch[1]
          .split(',')
          .map(f => f.trim().replace(/['"]/g, ''))
          .filter(f => f.length > 0);
      }

      // Parse a11y if present
      const a11yMatch = themeConfig.match(/a11y:\s*{([^}]*)}/);
      if (a11yMatch) {
        theme.a11y = {
          contrastTarget: extractNumber(a11yMatch[1], 'contrastTarget'),
          modes: extractArray(a11yMatch[1], 'modes'),
        };
      }

      themes[themeName] = theme;
    }

    // Extract build configuration
    const buildMatch = content.match(/build:\s*(defaultBuildConfig|{[^}]+})/);
    const build = buildMatch && buildMatch[1] === 'defaultBuildConfig'
      ? getDefaultBuildConfig()
      : parseBuildConfig(buildMatch?.[1]);

    // Extract runtime configuration  
    const runtimeMatch = content.match(/runtime:\s*(defaultRuntimeConfig|{[^}]+})/);
    const runtime = runtimeMatch && runtimeMatch[1] === 'defaultRuntimeConfig'
      ? getDefaultRuntimeConfig()
      : parseRuntimeConfig(runtimeMatch?.[1]);

    // Extract integration configuration
    const integrationMatch = content.match(/integration:\s*(defaultIntegrationConfig|{[^}]+})/);
    const integration = integrationMatch && integrationMatch[1] === 'defaultIntegrationConfig'
      ? getDefaultIntegrationConfig()
      : parseIntegrationConfig(integrationMatch?.[1]);

    return {
      themes,
      build,
      runtime,
      integration,
      dependencies: {},
    };
  } catch (error) {
    console.error('❌ Failed to parse theme.config.ts:', error.message);
    throw error;
  }
}

/**
 * Helper function to extract string values
 */
function extractValue(text, key) {
  const regex = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`);
  const match = text.match(regex);
  return match ? match[1] : undefined;
}

/**
 * Helper function to extract number values
 */
function extractNumber(text, key) {
  const regex = new RegExp(`${key}:\\s*(\\d+(?:\\.\\d+)?)`);
  const match = text.match(regex);
  return match ? parseFloat(match[1]) : undefined;
}

/**
 * Helper function to extract boolean values
 */
function extractBoolean(text, key) {
  const regex = new RegExp(`${key}:\\s*(true|false)`);
  const match = text.match(regex);
  return match ? match[1] === 'true' : undefined;
}

/**
 * Helper function to extract array values
 */
function extractArray(text, key) {
  const regex = new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`);
  const match = text.match(regex);
  if (!match) return undefined;

  return match[1]
    .split(',')
    .map(item => item.trim().replace(/['"]/g, ''))
    .filter(item => item.length > 0);
}

/**
 * Get default build configuration
 */
function getDefaultBuildConfig() {
  return {
    output: {
      directory: 'themes',
      formats: {
        expanded: '.css',
        compressed: '.min.css',
      },
    },
    sass: {
      style: 'expanded',
      sourceMap: true,
      loadPaths: ['src'],
    },
  };
}

/**
 * Get default runtime configuration
 */
function getDefaultRuntimeConfig() {
  return {
    basePath: '/themes',
    cdnPath: null,
    preload: [],
    lazy: true,
    defaultTheme: '',
    storageKey: 'atomix-theme',
    useMinified: "process.env.NODE_ENV === 'production'",
  };
}

/**
 * Get default integration configuration
 */
function getDefaultIntegrationConfig() {
  return {
    cssVariables: {
      colorMode: '--storybook-color-mode',
    },
    classNames: {
      theme: 'data-theme',
      colorMode: 'data-atomix-color-mode',
    },
  };
}

/**
 * Parse build configuration
 */
function parseBuildConfig(configText) {
  if (!configText) return getDefaultBuildConfig();
  // For now, return default config
  // A more sophisticated parser would be needed for complex objects
  return getDefaultBuildConfig();
}

/**
 * Parse runtime configuration
 */
function parseRuntimeConfig(configText) {
  if (!configText) return getDefaultRuntimeConfig();
  // For now, return default config
  // A more sophisticated parser would be needed for complex objects
  return getDefaultRuntimeConfig();
}

/**
 * Parse integration configuration
 */
function parseIntegrationConfig(configText) {
  if (!configText) return getDefaultIntegrationConfig();
  // For now, return default config
  // A more sophisticated parser would be needed for complex objects
  return getDefaultIntegrationConfig();
}

/**
 * Generate themes.config.js content
 */
function generateThemesConfigJS(config) {
  const { themes, build, runtime, integration, dependencies } = config;

  // Convert themes to metadata format
  const metadata = {};
  for (const [key, theme] of Object.entries(themes)) {
    metadata[key] = { ...theme };
    // Remove undefined values
    Object.keys(metadata[key]).forEach(k => {
      if (metadata[key][k] === undefined) {
        delete metadata[key][k];
      }
    });
  }

  return `/**
 * Theme Configuration
 *
 * This file is auto-generated from theme.config.ts
 * DO NOT EDIT MANUALLY - Edit theme.config.ts instead
 * 
 * Generated on: ${new Date().toISOString()}
 */

export const themesConfig = {
  // Theme metadata
  metadata: ${JSON.stringify(metadata, null, 4).replace(/"([^"]+)":/g, '$1:')},

  // Build configuration
  build: ${JSON.stringify(build, null, 4).replace(/"([^"]+)":/g, '$1:')},

  // Export configuration for package.json
  exports: {
    './themes/*': './dist/themes/*.css',
    './themes/*.min': './dist/themes/*.min.css',
  },

  // Theme integration settings
  integration: ${JSON.stringify(integration, null, 4).replace(/"([^"]+)":/g, '$1:')},

  // Runtime theme loading configuration
  runtime: ${JSON.stringify(runtime, null, 4).replace(/"([^"]+)":/g, '$1:').replace(/"process\.env\.NODE_ENV === 'production'"/g, "process.env.NODE_ENV === 'production'")},

  // Theme dependencies (if a theme requires another theme to be loaded)
  dependencies: ${JSON.stringify(dependencies, null, 4).replace(/"([^"]+)":/g, '$1:')},
};`;
}

/**
 * Main function
 */
async function main() {
  console.log('🔄 Syncing theme configuration...\n');

  try {
    // Parse theme.config.ts
    console.log('📖 Reading theme.config.ts...');
    const config = await parseThemeConfigTS();
    console.log(`  ✅ Found ${Object.keys(config.themes).length} themes`);

    // Generate themes.config.js
    console.log('\n📝 Generating themes.config.js...');
    const jsContent = generateThemesConfigJS(config);

    // Write to file
    await writeFile(THEMES_CONFIG_JS, jsContent, 'utf8');
    console.log('  ✅ Written to src/themes/themes.config.js');

    console.log('\n✨ Configuration sync complete!');
    console.log('   themes.config.js has been updated from theme.config.ts');

  } catch (error) {
    console.error('\n💥 Sync failed:', error.message);
    process.exit(1);
  }
}

// Run the sync
main();
