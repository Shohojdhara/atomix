/**
 * Theme CSS Build Configuration
 * 
 * Generates individual CSS files for each theme defined in themes.config.js
 * Supports both expanded and minified versions
 */

import postcss from 'rollup-plugin-postcss';
import { createStylesPostcssConfig } from './postcss.js';
import { cleanup } from '../plugins/cleanup.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load themes configuration
 */
function loadThemesConfig() {
  try {
    const configPath = path.join(__dirname, '../../src/themes/themes.config.js');
    // Use dynamic import for ESM module
    // For now, we'll use a synchronous approach with fs
    const configContent = fs.readFileSync(configPath, 'utf8');
    // Extract themes metadata using regex (since we can't easily eval ESM)
    // This is a simplified approach - in production, you might want to use a proper ESM loader
    const metadataMatch = configContent.match(/metadata:\s*({[\s\S]*?}),/);
    const themes = {};
    
    if (metadataMatch) {
      try {
        // Try to parse the metadata object
        const metadataStr = metadataMatch[1].replace(/(\w+):/g, '"$1":');
        const metadata = JSON.parse(metadataStr);
        Object.assign(themes, metadata);
      } catch (e) {
        // If parsing fails, try to extract theme names from the config
        const themeNameMatches = configContent.matchAll(/(['"])([^'"]+)\1:\s*{/g);
        for (const match of themeNameMatches) {
          if (match[2] && !['metadata', 'build', 'exports', 'integration', 'runtime', 'dependencies', 'prefix'].includes(match[2])) {
            themes[match[2]] = { name: match[2] };
          }
        }
      }
    }
    
    return themes;
  } catch (error) {
    console.warn('⚠️  Could not load themes.config.js, no theme builds will be generated');
    return {};
  }
}

/**
 * Resolve theme SCSS entry file path
 * Tries multiple possible locations
 */
function resolveThemeEntry(themeName) {
  const possiblePaths = [
    // Standard theme directory structure
    `src/themes/${themeName}/index.scss`,
    `src/themes/${themeName}.scss`,
    // Alternative locations
    `themes/${themeName}/index.scss`,
    `themes/${themeName}.scss`,
  ];

  for (const themePath of possiblePaths) {
    const fullPath = path.join(__dirname, '../../', themePath);
    if (fs.existsSync(fullPath)) {
      return themePath;
    }
  }

  return null;
}

/**
 * Create a theme build configuration
 * 
 * @param {string} themeName - Name of the theme
 * @param {object} themeMetadata - Theme metadata from config
 * @param {boolean} minify - Whether to minify the output
 * @returns {Object|null} Rollup build configuration or null if theme file not found
 */
function createThemeBuild(themeName, themeMetadata, minify = false) {
  // Try to resolve theme entry file
  const themeEntry = resolveThemeEntry(themeName);
  
  if (!themeEntry) {
    // Theme file doesn't exist yet - return null to skip
    return null;
  }

  const outputFile = minify
    ? `dist/themes/${themeName}.min.css`
    : `dist/themes/${themeName}.css`;

  return {
    input: themeEntry,
    output: {
      file: `.${themeName}.${minify ? 'min.' : ''}css.tmp.js`,
      format: 'es',
    },
    plugins: [
      postcss(createStylesPostcssConfig(outputFile, minify)),
      cleanup(`.${themeName}.${minify ? 'min.' : ''}css.tmp.js`),
    ],
  };
}

/**
 * Generate all theme build configurations
 * 
 * @returns {Array} Array of Rollup build configurations
 */
export function generateThemeBuilds() {
  const themes = loadThemesConfig();
  const builds = [];

  for (const [themeName, themeMetadata] of Object.entries(themes)) {
    // Skip if not a CSS theme
    if (themeMetadata.type && themeMetadata.type !== 'css') {
      continue;
    }

    // Create both expanded and minified builds
    const expandedBuild = createThemeBuild(themeName, themeMetadata, false);
    const minifiedBuild = createThemeBuild(themeName, themeMetadata, true);

    if (expandedBuild) {
      builds.push(expandedBuild);
    }
    if (minifiedBuild) {
      builds.push(minifiedBuild);
    }
  }

  return builds;
}

/**
 * Default export: the function itself
 * This is used by rollup.config.build.js
 */
export default generateThemeBuilds;

