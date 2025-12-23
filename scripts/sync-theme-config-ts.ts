#!/usr/bin/env node

/**
 * Sync Theme Configuration (TypeScript Version)
 * 
 * This script generates:
 * 1. src/themes/themes.config.js from atomix.config.ts
 * 2. src/styles/03-generic/_generated-root.css with CSS custom properties
 * 
 * This ensures:
 * - Build-time config (themes.config.js) stays in sync with runtime config (atomix.config.ts)
 * - Prefix configuration is consistent across all systems
 * - Theme metadata is automatically extracted
 * - CSS custom properties are generated from config for external developer customization
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

// Import color utilities from theme system
// We need to use dynamic import since themeUtils uses ESM
let hexToRgb: (hex: string) => { r: number; g: number; b: number } | null;
let lighten: (color: string, amount?: number) => string;
let darken: (color: string, amount?: number) => string;
let alpha: (color: string, opacity: number) => string;
let emphasize: (color: string, coefficient?: number) => string;

// Load color utilities
async function loadColorUtilities() {
  try {
    const themeUtils = await import('../src/lib/theme/themeUtils.js');
    hexToRgb = themeUtils.hexToRgb;
    lighten = themeUtils.lighten;
    darken = themeUtils.darken;
    alpha = themeUtils.alpha;
    emphasize = themeUtils.emphasize;
  } catch (error) {
    console.warn('⚠️  Could not load theme utilities, using fallback implementations');
    // Fallback implementations
    hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      } : null;
    };
    lighten = (color: string, amount = 0.2) => color; // Fallback
    darken = (color: string, amount = 0.2) => color; // Fallback
    alpha = (color: string, opacity: number) => {
      const rgb = hexToRgb(color);
      return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : color;
    };
    emphasize = (color: string) => color; // Fallback
  }
}

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

// ============================================================================
// Token Generation Functions
// ============================================================================

/**
 * Generate a color scale from a base color (1-10 steps)
 * Creates lighter to darker variations matching SCSS pattern
 */
function generateColorScale(baseColor: string, colorName: string): Record<string, string> {
  const vars: Record<string, string> = {};
  const rgb = hexToRgb(baseColor);
  if (!rgb) return vars;

  // Generate 10-step scale
  // Steps 1-5: lighter variations
  // Step 6: base color (main)
  // Steps 7-10: darker variations
  for (let i = 1; i <= 10; i++) {
    let color: string;
    if (i < 6) {
      // Lighter: mix with white
      const mixRatio = (6 - i) / 5;
      color = lighten(baseColor, mixRatio * 0.8);
    } else if (i === 6) {
      // Base color
      color = baseColor;
    } else {
      // Darker: mix with black
      const mixRatio = (i - 6) / 4;
      color = darken(baseColor, mixRatio * 0.6);
    }
    vars[`--${prefix}-${colorName}-${i}`] = color;
  }

  return vars;
}

/**
 * Generate semantic tokens for a color
 */
function generateSemanticTokens(colorName: string, mainColor: string, scale: Record<string, string>): Record<string, string> {
  const vars: Record<string, string> = {};

  // Main color (flat structure, matches SCSS: --atomix-primary)
  vars[`--${prefix}-${colorName}`] = mainColor;

  // RGB for transparency support (matches SCSS: --atomix-primary-rgb)
  const rgb = hexToRgb(mainColor);
  if (rgb) {
    vars[`--${prefix}-${colorName}-rgb`] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  }

  // Semantic aliases
  vars[`--${prefix}-${colorName}-main`] = scale[`--${prefix}-${colorName}-6`] || mainColor;
  vars[`--${prefix}-${colorName}-light`] = scale[`--${prefix}-${colorName}-3`] || mainColor;
  vars[`--${prefix}-${colorName}-dark`] = scale[`--${prefix}-${colorName}-9`] || mainColor;

  // Hover state (matches SCSS: --atomix-primary-hover)
  vars[`--${prefix}-${colorName}-hover`] = scale[`--${prefix}-${colorName}-7`] || darken(mainColor, 0.1);

  // Text emphasis (matches SCSS: --atomix-primary-text-emphasis)
  vars[`--${prefix}-${colorName}-text-emphasis`] = emphasize(mainColor, 0.15);

  // Background subtle (matches SCSS: --atomix-primary-bg-subtle)
  vars[`--${prefix}-${colorName}-bg-subtle`] = alpha(mainColor, 0.1);

  // Border subtle (matches SCSS: --atomix-primary-border-subtle)
  vars[`--${prefix}-${colorName}-border-subtle`] = alpha(mainColor, 0.2);

  return vars;
}

/**
 * Generate CSS variables from config colors
 */
function generateColorTokens(colors: Record<string, any>): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [colorName, colorValue] of Object.entries(colors)) {
    if (!colorValue) continue;

    let mainColor: string;

    // Handle different color formats
    if (typeof colorValue === 'string') {
      mainColor = colorValue;
    } else if (typeof colorValue === 'object') {
      // PaletteColorOptions format: { main: '#...', light?: '#...', dark?: '#...' }
      if ('main' in colorValue) {
        mainColor = colorValue.main;
      } else if ('6' in colorValue) {
        // ColorScale format: { 1: '#...', 6: '#...', 10: '#...' }
        mainColor = colorValue[6] || colorValue.main;
      } else {
        continue; // Skip invalid formats
      }
    } else {
      continue; // Skip non-string, non-object values
    }

    // Generate color scale (1-10)
    const scale = generateColorScale(mainColor, colorName);
    Object.assign(vars, scale);

    // Generate semantic tokens
    const semantic = generateSemanticTokens(colorName, mainColor, scale);
    Object.assign(vars, semantic);
  }

  return vars;
}

/**
 * Generate typography tokens from config
 */
function generateTypographyTokens(typography: any): Record<string, string> {
  const vars: Record<string, string> = {};

  if (!typography || typeof typography !== 'object') return vars;

  // Font families
  if (typography.fontFamilies) {
    for (const [key, value] of Object.entries(typography.fontFamilies)) {
      if (key === 'sans') {
        vars[`--${prefix}-body-font-family`] = String(value);
        vars[`--${prefix}-font-sans-serif`] = String(value);
      } else if (key === 'mono') {
        vars[`--${prefix}-font-monospace`] = String(value);
      }
    }
  }

  // Font sizes
  if (typography.fontSizes) {
    for (const [key, value] of Object.entries(typography.fontSizes)) {
      const sizeValue = typeof value === 'string' ? value : `${value}px`;
      vars[`--${prefix}-font-size-${key}`] = sizeValue;
    }
  }

  // Font weights
  if (typography.fontWeights) {
    for (const [key, value] of Object.entries(typography.fontWeights)) {
      vars[`--${prefix}-font-weight-${key}`] = String(value);
    }
  }

  // Line heights
  if (typography.lineHeights) {
    for (const [key, value] of Object.entries(typography.lineHeights)) {
      vars[`--${prefix}-line-height-${key}`] = String(value);
    }
  }

  // Letter spacing
  if (typography.letterSpacings) {
    for (const [key, value] of Object.entries(typography.letterSpacings)) {
      vars[`--${prefix}-letter-spacing-${key}`] = String(value);
    }
  }

  return vars;
}

/**
 * Generate spacing tokens from config
 */
function generateSpacingTokens(spacing: Record<string, string>): Record<string, string> {
  const vars: Record<string, string> = {};

  if (!spacing || typeof spacing !== 'object') return vars;

  for (const [key, value] of Object.entries(spacing)) {
    vars[`--${prefix}-spacing-${key}`] = value;
  }

  return vars;
}

/**
 * Generate border radius tokens from config
 */
function generateBorderRadiusTokens(borderRadius: Record<string, string>): Record<string, string> {
  const vars: Record<string, string> = {};

  if (!borderRadius || typeof borderRadius !== 'object') return vars;

  for (const [key, value] of Object.entries(borderRadius)) {
    vars[`--${prefix}-border-radius-${key}`] = value;
  }

  return vars;
}

/**
 * Generate shadow tokens from config
 */
function generateShadowTokens(shadows: Record<string, string>): Record<string, string> {
  const vars: Record<string, string> = {};

  if (!shadows || typeof shadows !== 'object') return vars;

  for (const [key, value] of Object.entries(shadows)) {
    vars[`--${prefix}-box-shadow-${key}`] = value;
  }

  return vars;
}

/**
 * Generate CSS content from config
 */
function generateCSSContent(): string {
  const tokens: Record<string, string> = {};
  const extend = atomixConfig.theme?.extend || {};
  const tokensOverride = atomixConfig.theme?.tokens || {};

  // Use tokens if provided, otherwise use extend
  const configTokens = Object.keys(tokensOverride).length > 0 ? tokensOverride : extend;

  // Generate color tokens
  if (configTokens.colors) {
    Object.assign(tokens, generateColorTokens(configTokens.colors));
  }

  // Generate typography tokens
  if (configTokens.typography) {
    Object.assign(tokens, generateTypographyTokens(configTokens.typography));
  }

  // Generate spacing tokens
  if (configTokens.spacing) {
    Object.assign(tokens, generateSpacingTokens(configTokens.spacing));
  }

  // Generate border radius tokens
  if (configTokens.borderRadius) {
    Object.assign(tokens, generateBorderRadiusTokens(configTokens.borderRadius));
  }

  // Generate shadow tokens
  if (configTokens.shadows) {
    Object.assign(tokens, generateShadowTokens(configTokens.shadows));
  }

  // Convert to CSS string
  if (Object.keys(tokens).length === 0) {
    return `/* AUTO-GENERATED - DO NOT EDIT MANUALLY */
/* Generated on: ${new Date().toISOString()} */
/* No custom tokens found in atomix.config.ts */

:root {
  /* Add custom tokens to atomix.config.ts theme.extend to generate CSS variables here */
}
`;
  }

  const cssVariables = Object.entries(tokens)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `/* AUTO-GENERATED - DO NOT EDIT MANUALLY */
/* Generated on: ${new Date().toISOString()} */
/* This file is generated from atomix.config.ts */
/* Edit atomix.config.ts and run 'npm run sync:config' to regenerate */

:root {
${cssVariables}
}
`;
}

/**
 * Generate themes.config.js content
 */
function generateThemesConfigJS() {
  // Extract metadata from themes (both CSS and JS themes)
  const metadata: Record<string, any> = {};

  for (const [key, theme] of Object.entries(themeConfig.themes)) {
    // Handle both CSS and JS themes
    if (theme.type === 'css' || theme.type === 'js') {
      const themeMeta: any = {
        name: theme.name,
        type: theme.type || 'css',
        description: theme.description,
        author: theme.author,
        version: theme.version,
        tags: theme.tags,
        supportsDarkMode: theme.supportsDarkMode,
        status: theme.status || 'experimental',
        a11y: theme.a11y,
        color: theme.color,
        features: theme.features,
        dependencies: theme.dependencies,
        class: theme.class,
      };

      // Only include cssPath for CSS themes
      if (theme.type === 'css' && 'cssPath' in theme) {
        themeMeta.cssPath = (theme as any).cssPath;
      }

      metadata[key] = themeMeta;

      // Remove undefined values
      Object.keys(metadata[key]).forEach(k => {
        if (metadata[key][k] === undefined) {
          delete metadata[key][k];
        }
      });
    }
  }

  // Build configuration with defaults
  const buildConfig = {
    output: {
      directory: 'dist/themes',
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
    ...themeConfig.build,
  };

  // Runtime configuration with defaults
  const runtimeConfig = {
    basePath: '/themes',
    cdnPath: null,
    preload: [],
    lazy: false,
    defaultTheme: undefined,
    storageKey: 'atomix-theme',
    dataAttribute: 'data-atomix-theme',
    enablePersistence: true,
    useMinified: false,
    ...themeConfig.runtime,
  };

  // Integration configuration with defaults
  const integrationConfig = {
    cssVariables: {
      colorMode: '--color-mode',
    },
    classNames: {
      theme: 'data-theme',
      colorMode: 'data-color-mode',
    },
    ...themeConfig.integration,
  };

  // Format JavaScript object (remove quotes from keys, handle special values)
  const formatJSObject = (obj: any, indent: number = 2): string => {
    const spaces = ' '.repeat(indent);
    if (obj === null || obj === undefined) {
      return 'null';
    }
    if (typeof obj === 'string') {
      return `'${obj.replace(/'/g, "\\'")}'`;
    }
    if (typeof obj === 'number' || typeof obj === 'boolean') {
      return String(obj);
    }
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      const items = obj.map(item => `${spaces}  ${formatJSObject(item, indent + 2)}`).join(',\n');
      return `[\n${items}\n${spaces}]`;
    }
    if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      if (keys.length === 0) return '{}';
      const items = keys.map(key => {
        const value = formatJSObject(obj[key], indent + 2);
        return `${spaces}  ${key}: ${value}`;
      }).join(',\n');
      return `{\n${items}\n${spaces}}`;
    }
    return String(obj);
  };

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
  metadata: ${formatJSObject(metadata)},

  // Build configuration
  build: ${formatJSObject(buildConfig)},

  // Export configuration for package.json
  exports: {
    './themes/*': './dist/themes/*.css',
    './themes/*.min': './dist/themes/*.min.css',
  },

  // Theme integration settings
  integration: ${formatJSObject(integrationConfig)},

  // Runtime theme loading configuration
  runtime: ${formatJSObject(runtimeConfig)},

  // Theme dependencies (if a theme requires another theme to be loaded)
  dependencies: ${formatJSObject(themeConfig.dependencies || {})},
};`;
}

/**
 * Main function
 */
async function main() {
  console.log('🔄 Syncing theme configuration...\n');

  try {
    // Load color utilities
    console.log('📦 Loading color utilities...');
    await loadColorUtilities();
    console.log('  ✅ Color utilities loaded');

    // Generate themes.config.js
    console.log('\n📖 Reading atomix.config.ts...');
    console.log(`  ✅ Found ${Object.keys(themeConfig.themes).length} themes`);
    
    const extendColors = Object.keys(atomixConfig.theme?.extend?.colors || {}).length;
    const extendTypography = Object.keys(atomixConfig.theme?.extend?.typography || {}).length;
    const extendSpacing = Object.keys(atomixConfig.theme?.extend?.spacing || {}).length;
    
    if (extendColors > 0) {
      console.log(`  ✅ Found ${extendColors} custom color(s)`);
    }
    if (extendTypography > 0) {
      console.log(`  ✅ Found ${extendTypography} custom typography setting(s)`);
    }
    if (extendSpacing > 0) {
      console.log(`  ✅ Found ${extendSpacing} custom spacing value(s)`);
    }

    console.log('\n📝 Generating themes.config.js...');
    const jsContent = generateThemesConfigJS();

    // Write themes.config.js
    const themesConfigPath = path.join(__dirname, '../src/themes/themes.config.js');
    await fs.writeFile(themesConfigPath, jsContent, 'utf8');
    console.log('  ✅ Written to src/themes/themes.config.js');

    // Generate CSS tokens
    console.log('\n🎨 Generating CSS custom properties...');
    const cssContent = generateCSSContent();
    
    // Count generated variables
    const variableCount = (cssContent.match(/--/g) || []).length;
    
    // Write _generated-root.css
    const generatedRootPath = path.join(__dirname, '../src/styles/03-generic/_generated-root.css');
    await fs.writeFile(generatedRootPath, cssContent, 'utf8');
    console.log(`  ✅ Written to src/styles/03-generic/_generated-root.css`);
    console.log(`  ✅ Generated ${variableCount} CSS custom properties`);

    console.log('\n✨ Configuration sync complete!');
    console.log(`   themes.config.js has been updated from atomix.config.ts`);
    console.log(`   _generated-root.css has been generated with custom tokens`);
    console.log(`   Prefix: ${prefix}`);

  } catch (error: any) {
    console.error('\n💥 Sync failed:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run the sync
main();
