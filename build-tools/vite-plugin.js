/**
 * @fileoverview Vite Plugin for Atomix Design System
 * Provides seamless integration of Atomix components and styles into Vite projects
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { Validator, ErrorHandler } from './error-handler.js';

const require = createRequire(import.meta.url);

/**
 * @typedef {Object} AtomixVitePluginOptions
 * @property {string} [theme='default'] - Theme to use
 * @property {string[]} [components=[]] - Specific components to include
 * @property {boolean} [optimizeCss=true] - Whether to optimize CSS
 * @property {boolean} [includeAtoms=false] - Whether to include atomic styles
 * @property {boolean} [verbose=false] - Enable verbose logging
 */

/**
 * Atomix Vite Plugin
 * @param {AtomixVitePluginOptions} options - Plugin options
 * @returns {import('vite').Plugin}
 */
export default function atomixVitePlugin(options = {}) {
  const {
    theme = 'default',
    components = [],
    optimizeCss = true,
    includeAtoms = false,
    verbose = false,
  } = options;

  let config;
  let atomixRoot;
  
  // Validate options with comprehensive validation
  try {
    Validator.validateOptions({ theme, components }, [], []);
  } catch (error) {
    throw ErrorHandler.withErrorHandling(() => { throw error; }, '[Atomix Vite Plugin] Option validation')();
  }
  
  if (verbose) {
    console.log(`[Atomix Vite Plugin] Initializing with theme: ${theme}`);
    if (components.length > 0) {
      console.log(`[Atomix Vite Plugin] Selected components: ${components.join(', ')}`);
    }
  }
  
  return {
    name: 'atomix',
    
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      
      // Try to resolve Atomix package location
      try {
        atomixRoot = path.dirname(require.resolve('@shohojdhara/atomix/package.json'));
        if (verbose) {
          console.log(`[Atomix Vite Plugin] Found Atomix at: ${atomixRoot}`);
        }
      } catch (e) {
        if (verbose) {
          console.warn('[Atomix Vite Plugin] Could not resolve Atomix package location');
        }
        atomixRoot = null;
      }
    },

    /**
     * Transform Atomix imports to optimize for production
     */
    async transform(code, id) {
      // Handle Atomix imports - more permissive matching
      const isAtomixFile = id.includes('@shohojdhara/atomix') || 
                          (atomixRoot && (
                            id.includes(atomixRoot) || 
                            id.includes('atomix')
                          )) ||
                          code.includes('@shohojdhara/atomix');
      
      if (isAtomixFile) {
        if (verbose) {
          console.log(`[Atomix Vite Plugin] Processing: ${id}`);
        }
        
        let transformedCode = code;
        
        // Apply component filtering if specified
        if (components.length > 0) {
          transformedCode = filterComponents(transformedCode, components, includeAtoms);
        }
        
        // Remove atom imports if not requested
        if (!includeAtoms) {
          transformedCode = removeAtomImports(transformedCode);
        }
        
        return {
          code: transformedCode,
          map: null,
        };
      }

      return null;
    },

    /**
     * Generate CSS imports for Atomix styles
     */
    configureServer(server) {
      // Inject theme CSS into dev server
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.includes('/atomix-theme.css')) {
          try {
            const themeCss = generateThemeCss(theme, atomixRoot);
            res.setHeader('Content-Type', 'text/css');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(themeCss);
            return;
          } catch (error) {
            if (verbose) {
              console.error('[Atomix Vite Plugin] Error serving theme CSS:', error);
            }
            res.statusCode = 500;
            res.end('Error serving theme CSS');
            return;
          }
        }
        next();
      });
    },

    /**
     * Generate CSS for production build
     */
    generateBundle(options, bundle) {
      if (!optimizeCss) return;
      
      // Process CSS files to optimize them
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
          try {
            // Add theme-specific processing if needed
            if (theme !== 'default') {
              chunk.source = addThemeVariables(chunk.source.toString(), theme, atomixRoot);
              if (verbose) {
                console.log(`[Atomix Vite Plugin] Applied theme ${theme} to ${fileName}`);
              }
            }
          } catch (error) {
            if (verbose) {
              console.error(`[Atomix Vite Plugin] Error processing CSS ${fileName}:`, error);
            }
          }
        }
      }
    },

    /**
     * Hook to handle Atomix-specific transformations
     */
    renderChunk(code, chunk) {
      // Add Atomix-specific transformations during rendering
      if (chunk.fileName.includes('atomix')) {
        if (verbose) {
          console.log(`[Atomix Vite Plugin] Rendering chunk: ${chunk.fileName}`);
        }
        return code;
      }
      return null; // Return null to skip transformation
    },
    
    /**
     * Build start hook
     */
    buildStart() {
      if (verbose) {
        console.log('[Atomix Vite Plugin] Build started');
      }
      
      // Validate theme exists
      if (theme !== 'default' && atomixRoot) {
        const themePath = path.join(atomixRoot, 'themes', theme);
        if (!fs.existsSync(themePath)) {
          this.warn(`[Atomix Vite Plugin] Theme '${theme}' not found. Available themes: default, dark-complementary, high-contrast, test-theme`);
        }
      }
    }
  };
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
 * Add theme-specific CSS variables to the stylesheet
 * @param {string} css - Original CSS content
 * @param {string} themeName - Name of the theme
 * @param {string|null} atomixRoot - Atomix root path
 * @returns {string} Modified CSS with theme variables
 */
function addThemeVariables(css, themeName, atomixRoot) {
  try {
    const themeCss = generateThemeCss(themeName, atomixRoot);
    return `${themeCss}\n\n${css}`;
  } catch (error) {
    // Fallback to adding a comment
    return `/* Theme: ${themeName} - Error loading theme CSS */\n${css}`;
  }
}

/**
 * Helper function to resolve Atomix package location
 * @returns {string|null} Atomix package location or null
 */
export function getAtomixPackageLocation() {
  try {
    return path.dirname(require.resolve('@shohojdhara/atomix/package.json'));
  } catch (e) {
    return null;
  }
}

/**
 * Get available themes
 * @param {string|null} atomixRoot - Atomix root path
 * @returns {string[]} List of available themes
 */
export function getAvailableThemes(atomixRoot) {
  if (!atomixRoot) {
    return ['default'];
  }
  
  const themesDir = path.join(atomixRoot, 'themes');
  
  try {
    if (fs.existsSync(themesDir)) {
      return fs.readdirSync(themesDir)
        .filter(item => fs.statSync(path.join(themesDir, item)).isDirectory());
    }
  } catch (e) {
    // Silently fail and return default
  }
  
  return ['default'];
}