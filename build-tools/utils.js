/**
 * @fileoverview Shared utilities for Atomix build tool integrations
 * Centralizes common functions used across Vite, Rollup, and Webpack plugins.
 * @module @shohojdhara/atomix/build-tools/utils
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// ─── Package Resolution ──────────────────────────────────────────────────────

/**
 * Resolve the root directory of the installed Atomix package.
 * Uses createRequire for ESM-safe resolution.
 * @returns {string | null} Absolute path to the Atomix package root, or null.
 */
export function resolveAtomixRoot() {
  try {
    return path.dirname(require.resolve('@shohojdhara/atomix/package.json'));
  } catch {
    return null;
  }
}

// ─── Theme Helpers ───────────────────────────────────────────────────────────

/**
 * Read the raw SCSS content of a theme.
 * @param {string} themeName - Theme directory name.
 * @param {string | null} atomixRoot - Atomix package root (from resolveAtomixRoot).
 * @returns {string} Theme SCSS content.
 * @throws {Error} If atomixRoot is null or the theme file doesn't exist.
 */
export function generateThemeCss(themeName, atomixRoot) {
  if (!atomixRoot) {
    throw new Error('Atomix package location not found');
  }

  const themePath = path.join(atomixRoot, 'themes', themeName, 'index.scss');

  if (!fs.existsSync(themePath)) {
    throw new Error(`Theme '${themeName}' not found at ${themePath}`);
  }

  return fs.readFileSync(themePath, 'utf-8');
}

/**
 * Prepend theme CSS to an existing stylesheet.
 * Falls back to a comment header if the theme can't be loaded.
 * @param {string} css - Original stylesheet content.
 * @param {string} themeName - Theme directory name.
 * @param {string | null} atomixRoot - Atomix package root.
 * @returns {string} Stylesheet with theme CSS prepended.
 */
export function applyThemeToCSS(css, themeName, atomixRoot) {
  try {
    const themeCss = generateThemeCss(themeName, atomixRoot);
    return `${themeCss}\n\n${css}`;
  } catch {
    return `/* Theme: ${themeName} - Error loading theme CSS */\n${css}`;
  }
}

/**
 * List all available theme directories.
 * Returns an empty array when the themes directory can't be read — never
 * returns hardcoded fallback values that would mask real errors.
 * @param {string | null} atomixPath - Atomix package root.
 * @returns {string[]} Theme directory names.
 */
export function getAvailableThemes(atomixPath) {
  if (!atomixPath) {
    return [];
  }

  try {
    const themesDir = path.join(atomixPath, 'themes');
    if (fs.existsSync(themesDir)) {
      return fs.readdirSync(themesDir)
        .filter(item => {
          try {
            return fs.statSync(path.join(themesDir, item)).isDirectory();
          } catch {
            return false;
          }
        });
    }
  } catch {
    // Intentionally empty — return empty array below.
  }

  return [];
}

/**
 * Generate a virtual module that exports a theme's CSS as a string.
 * @param {string} themeName - Theme directory name.
 * @param {string | null} atomixRoot - Atomix package root.
 * @returns {string} JavaScript module source code.
 */
export function generateThemeModule(themeName, atomixRoot) {
  try {
    const themeCss = generateThemeCss(themeName, atomixRoot);
    // Use JSON.stringify to safely embed the CSS string (handles backticks, etc.)
    return `// Generated theme module for "${themeName}"\nconst themeCss = ${JSON.stringify(themeCss)};\nexport default themeCss;\n`;
  } catch {
    return `// Error generating theme module for "${themeName}"\nexport default '/* Error loading theme */';\n`;
  }
}

// ─── Import Transform Helpers ────────────────────────────────────────────────

/**
 * Filter Atomix component imports to only keep selected components.
 * Strips import statements that reference unselected components.
 * @param {string} code - Source code.
 * @param {string[]} selectedComponents - Components to keep.
 * @param {boolean} includeAtoms - Whether to also keep Atom-prefixed imports.
 * @returns {string} Transformed source code.
 */
export function filterComponents(code, selectedComponents, includeAtoms) {
  const componentImportRegex = /import\s+{([^}]+)}\s+from\s+['"]@shohojdhara\/atomix\/components['"]/g;

  return code.replace(componentImportRegex, (match, importList) => {
    const imports = importList.split(',').map(i => i.trim()).filter(Boolean);
    const filteredImports = imports.filter(imp =>
      selectedComponents.includes(imp) ||
      (includeAtoms && imp.startsWith('Atom'))
    );

    if (filteredImports.length === 0) {
      return '';
    }

    return `import { ${filteredImports.join(', ')} } from '@shohojdhara/atomix/components'`;
  });
}

/**
 * Remove import statements that pull from any .../atoms path.
 * @param {string} code - Source code.
 * @returns {string} Source code without atom imports.
 */
export function removeAtomImports(code) {
  const atomImportRegex = /import\s+{[^}]*}\s+from\s+['"][^'"]*\/atoms['"];?\s*/g;
  return code.replace(atomImportRegex, '');
}

/**
 * Determine whether a file should be processed by an Atomix build tool.
 * Uses strict matching to avoid false positives on user files that happen
 * to contain the word "atomix".
 * @param {string} resourcePath - Absolute path to the file.
 * @param {string} source - File source code.
 * @returns {boolean} true if the file should be processed.
 */
export function shouldProcessFile(resourcePath, source) {
  // Files that explicitly import Atomix
  if (source.includes('@shohojdhara/atomix')) {
    return true;
  }

  // Files inside the Atomix node_modules installation
  if (resourcePath.includes('node_modules/@shohojdhara/atomix')) {
    return true;
  }

  return false;
}

// ─── Logger ──────────────────────────────────────────────────────────────────

/**
 * Create a prefixed logger that respects a verbose flag.
 * When verbose is false, only warnings and errors are emitted.
 * @param {string} prefix - Log prefix, e.g. "[Atomix Vite Plugin]".
 * @param {boolean} verbose - Whether to enable informational logging.
 * @returns {{ log: Function, warn: Function, error: Function }}
 */
export function createLogger(prefix, verbose = false) {
  return {
    log(message) {
      if (verbose) {
        console.log(`${prefix} ${message}`);
      }
    },
    warn(message) {
      console.warn(`${prefix} ${message}`);
    },
    error(message, err) {
      console.error(`${prefix} ${message}`, err || '');
    },
  };
}
