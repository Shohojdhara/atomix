/**
 * @fileoverview Rollup Plugin for Atomix Design System
 * Provides integration of Atomix components and styles into Rollup projects
 */

import fs from 'fs';
import path from 'path';
import { Validator, ErrorHandler } from './error-handler.js';

/**
 * @typedef {Object} AtomixRollupPluginOptions
 * @property {string} [theme='default'] - Theme to use
 * @property {string[]} [components=[]] - Specific components to include
 * @property {boolean} [optimize=true] - Whether to optimize imports
 * @property {boolean} [includeAtoms=false] - Whether to include atoms
 * @property {boolean} [verbose=false] - Enable verbose logging
 */

/**
 * Atomix Rollup Plugin
 * @param {AtomixRollupPluginOptions} options - Plugin options
 * @returns {import('rollup').Plugin}
 */
export default function atomixRollupPlugin(options = {}) {
  const {
    theme = 'default',
    components = [],
    optimize = true,
    includeAtoms = false,
    verbose = false
  } = options;

  // Validate options with comprehensive validation
  try {
    Validator.validateOptions({ theme, components }, [], []);
  } catch (error) {
    throw ErrorHandler.withErrorHandling(() => { throw error; }, '[Atomix Rollup Plugin] Option validation')();
  }

  let atomixRoot = null;

  if (verbose) {
    console.log(`[Atomix Rollup Plugin] Initializing with theme: ${theme}`);
    if (components.length > 0) {
      console.log(`[Atomix Rollup Plugin] Selected components: ${components.join(', ')}`);
    }
  }

  return {
    name: 'atomix',

    /**
     * Plugin initialization
     */
    buildStart() {
      if (verbose) {
        this.warn(`Starting build with Atomix plugin (theme: ${theme})`);
      }

      // Try to resolve Atomix package location
      try {
        atomixRoot = path.dirname(require.resolve('@shohojdhara/atomix/package.json'));
        if (verbose) {
          console.log(`[Atomix Rollup Plugin] Found Atomix at: ${atomixRoot}`);
        }
      } catch (e) {
        if (verbose) {
          this.warn('[Atomix Rollup Plugin] Could not resolve Atomix package location');
        }
      }

      // Validate that requested components exist
      if (components.length > 0 && atomixRoot) {
        validateComponents(components, atomixRoot, this);
      }

      // Validate theme exists
      if (theme !== 'default' && atomixRoot) {
        const themePath = path.join(atomixRoot, 'themes', theme);
        if (!fs.existsSync(themePath)) {
          this.warn(`[Atomix Rollup Plugin] Theme '${theme}' not found. Available themes: ${getAvailableThemes(atomixRoot).join(', ')}`);
        }
      }
    },

    /**
     * Transform Atomix imports to optimize for production
     */
    transform(code, id) {
      // More comprehensive file detection
      const isAtomixFile = id.includes('@shohojdhara/atomix') || 
                          (atomixRoot && (
                            id.includes(atomixRoot) || 
                            id.includes('atomix')
                          )) ||
                          code.includes('@shohojdhara/atomix');

      if (!isAtomixFile) {
        return null;
      }

      if (verbose) {
        console.log(`[Atomix Rollup Plugin] Processing: ${id}`);
      }

      let transformedCode = code;

      if (optimize) {
        // Apply component filtering if specified
        if (components.length > 0) {
          transformedCode = filterComponents(transformedCode, components, includeAtoms);
        }

        // Remove atom imports if not requested
        if (!includeAtoms) {
          transformedCode = removeAtomImports(transformedCode);
        }
      }

      return {
        code: transformedCode,
        map: null // We're not generating sourcemaps for this transformation
      };
    },

    /**
     * Resolve import paths for Atomix components
     */
    resolveId(importee, importer) {
      // Handle special Atomix import paths
      if (importee.startsWith('@shohojdhara/atomix/')) {
        if (verbose) {
          console.log(`[Atomix Rollup Plugin] Resolving: ${importee}`);
        }

        // Handle theme imports
        if (importee === '@shohojdhara/atomix/theme' || importee === '@shohojdhara/atomix/themes') {
          if (atomixRoot) {
            const themePath = path.join(atomixRoot, 'themes', theme, 'index.scss');
            if (fs.existsSync(themePath)) {
              return themePath;
            }
          }
          // Fallback to default theme
          return importee;
        }

        // Handle component imports
        if (importee.includes('/components/') && optimize && components.length > 0) {
          // In a real implementation, we would validate that requested components exist
          // and potentially resolve to specific files
          if (verbose) {
            console.log(`[Atomix Rollup Plugin] Component import detected: ${importee}`);
          }
        }
      }

      return null;
    },

    /**
     * Load virtual modules
     */
    load(id) {
      // Handle virtual theme modules
      if (id.includes('virtual:atomix-theme')) {
        if (verbose) {
          console.log(`[Atomix Rollup Plugin] Loading virtual theme module`);
        }
        return generateThemeModule(theme, atomixRoot);
      }

      // Handle theme CSS loading
      if (id.includes('.atomix-theme.css')) {
        try {
          const themeCss = generateThemeCss(theme, atomixRoot);
          return themeCss;
        } catch (error) {
          if (verbose) {
            this.warn(`[Atomix Rollup Plugin] Error loading theme CSS: ${error.message}`);
          }
          return `/* Error loading theme: ${theme} */`;
        }
      }

      return null;
    },

    /**
     * Generate bundle
     */
    generateBundle(outputOptions, bundle) {
      if (!optimize) return;

      // Process bundle to optimize Atomix assets
      for (const fileName in bundle) {
        const chunk = bundle[fileName];

        // Process CSS assets
        if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
          if (chunk.fileName.includes('atomix')) {
            try {
              // Apply theme-specific modifications to CSS
              chunk.source = applyThemeToCSS(chunk.source.toString(), theme, atomixRoot);
              if (verbose) {
                console.log(`[Atomix Rollup Plugin] Applied theme ${theme} to ${fileName}`);
              }
            } catch (error) {
              if (verbose) {
                this.warn(`[Atomix Rollup Plugin] Error applying theme to ${fileName}: ${error.message}`);
              }
            }
          }
        }
      }
    }
  };
}

/**
 * Validate that requested components exist
 * @param {string[]} components - Requested components
 * @param {string} atomixRoot - Atomix root path
 * @param {import('rollup').PluginContext} context - Rollup plugin context
 */
function validateComponents(components, atomixRoot, context) {
  const componentsDir = path.join(atomixRoot, 'src', 'components');
  
  if (!fs.existsSync(componentsDir)) {
    context.warn('[Atomix Rollup Plugin] Could not find components directory');
    return;
  }
  
  try {
    const availableComponents = fs.readdirSync(componentsDir)
      .filter(item => fs.statSync(path.join(componentsDir, item)).isDirectory());
    
    const missingComponents = components.filter(comp => !availableComponents.includes(comp));
    
    if (missingComponents.length > 0) {
      context.warn(`[Atomix Rollup Plugin] Requested components not found: ${missingComponents.join(', ')}. Available: ${availableComponents.slice(0, 10).join(', ')}${availableComponents.length > 10 ? '...' : ''}`);
    }
  } catch (e) {
    context.warn('[Atomix Rollup Plugin] Error validating components');
  }
}

/**
 * Filter components based on user selection
 * @param {string} code - Source code
 * @param {string[]} selectedComponents - Components to include
 * @param {boolean} includeAtoms - Whether to include atoms
 * @returns {string} Filtered code
 */
function filterComponents(code, selectedComponents, includeAtoms) {
  // Remove component imports that aren't in the selected list
  const componentImportRegex = /import\s+{([^}]+)}\s+from\s+['"]@shohojdhara\/atomix\/components['"]/g;
  
  return code.replace(componentImportRegex, (match, importList) => {
    const imports = importList.split(',').map(i => i.trim());
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
 * Remove atom imports if not requested
 * @param {string} code - Source code
 * @returns {string} Code with atom imports removed
 */
function removeAtomImports(code) {
  const atomImportRegex = /import\s+{[^}]*}\s+from\s+['"][^'"]*\/atoms['"]/g;
  return code.replace(atomImportRegex, '');
}

/**
 * Generate theme CSS
 * @param {string} themeName - Theme name
 * @param {string|null} atomixRoot - Atomix root path
 * @returns {string} Theme CSS content
 */
function generateThemeCss(themeName, atomixRoot) {
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
 * Generate a theme-specific module
 * @param {string} themeName - Name of the theme
 * @param {string|null} atomixRoot - Atomix root path
 * @returns {string} Theme module code
 */
function generateThemeModule(themeName, atomixRoot) {
  try {
    const themeCss = generateThemeCss(themeName, atomixRoot);
    return `
      // Generated theme module for "${themeName}"
      const themeCss = \`${themeCss.replace(/`/g, '\`')}\`;
      export default themeCss;
    `;
  } catch (error) {
    return `
      // Error generating theme module for "${themeName}"
      export default '/* Error loading theme */';
    `;
  }
}

/**
 * Apply theme-specific modifications to CSS
 * @param {string} css - Original CSS
 * @param {string} themeName - Name of the theme
 * @param {string|null} atomixRoot - Atomix root path
 * @returns {string} Modified CSS
 */
function applyThemeToCSS(css, themeName, atomixRoot) {
  try {
    const themeCss = generateThemeCss(themeName, atomixRoot);
    return `${themeCss}\n\n${css}`;
  } catch (error) {
    // Fallback to adding a comment
    return `/* Theme: ${themeName} - Error loading theme CSS */\n${css}`;
  }
}

/**
 * Helper to get available themes
 * @param {string} atomixPath - Path to Atomix installation
 * @returns {string[]} List of available themes
 */
export function getAvailableThemes(atomixPath) {
  if (!atomixPath) {
    return ['default', 'dark-complementary', 'high-contrast', 'test-theme'];
  }
  
  try {
    const themesDir = path.join(atomixPath, 'themes');
    if (fs.existsSync(themesDir)) {
      return fs.readdirSync(themesDir)
        .filter(item => fs.statSync(path.join(themesDir, item)).isDirectory());
    }
  } catch (e) {
    // Error reading themes directory
    console.error('[Atomix Rollup Plugin] Could not read themes directory:', e);
  }
  
  return ['default', 'dark-complementary', 'high-contrast', 'test-theme'];
}

/**
 * Get Atomix package location
 * @returns {string|null} Atomix package location or null
 */
export function getAtomixPackageLocation() {
  try {
    return path.dirname(require.resolve('@shohojdhara/atomix/package.json'));
  } catch (e) {
    return null;
  }
}