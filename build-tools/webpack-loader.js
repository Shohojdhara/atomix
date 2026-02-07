/**
 * @fileoverview Webpack Loader for Atomix Design System
 * Provides integration of Atomix components and styles into Webpack projects
 */

import path from 'path';
import { Validator, ErrorHandler, AtomixBuildError } from './error-handler.js';

/**
 * @typedef {Object} AtomixLoaderOptions
 * @property {boolean} [includeAtoms=false] - Whether to include atomic styles
 * @property {string[]} [components=[]] - Specific components to include
 * @property {boolean} [excludeUnnecessaryStyles=true] - Remove unused styles
 * @property {boolean} [verbose=false] - Enable verbose logging
 * @property {string} [theme='default'] - Theme to use
 */

/**
 * Webpack loader to process Atomix components and optimize imports
 * @param {string} source - Source code to transform
 * @returns {string} Transformed source code
 */
export default function atomixLoader(source) {
  // Get loader options
  const options = this.getOptions() || {};
  
  const {
    includeAtoms = false,
    components = [],
    excludeUnnecessaryStyles = true,
    verbose = false,
    theme = 'default'
  } = options;
  
  // Validate options with comprehensive validation
  try {
    Validator.validateOptions({ components }, [], []);
  } catch (error) {
    throw ErrorHandler.withErrorHandling(() => { throw error; }, '[Atomix Webpack Loader] Option validation')();
  }
  
  const resourcePath = this.resourcePath;
  
  if (verbose) {
    console.log(`[Atomix Webpack Loader] Processing: ${resourcePath}`);
    if (components.length > 0) {
      console.log(`[Atomix Webpack Loader] Selected components: ${components.join(', ')}`);
    }
  }
  
  // Determine if we should process this file
  const shouldProcess = shouldProcessFile(resourcePath, source);
  
  if (!shouldProcess) {
    return source;
  }
  
  let transformedSource = source;
  
  // Apply component filtering if specified
  if (components.length > 0) {
    transformedSource = filterComponents(transformedSource, components, includeAtoms);
  }
  
  // Remove atom imports if not requested
  if (!includeAtoms) {
    transformedSource = removeAtomImports(transformedSource);
  }
  
  // Optimize styles if requested
  if (excludeUnnecessaryStyles) {
    transformedSource = optimizeStyles(transformedSource);
  }
  
  if (verbose) {
    console.log(`[Atomix Webpack Loader] Transformation complete for: ${resourcePath}`);
  }
  
  return transformedSource;
}

/**
 * Determine if a file should be processed by the loader
 * @param {string} resourcePath - Path to the resource
 * @param {string} source - Source code content
 * @returns {boolean} Whether to process the file
 */
function shouldProcessFile(resourcePath, source) {
  // Process files that contain Atomix imports
  if (source.includes('@shohojdhara/atomix')) {
    return true;
  }
  
  // Process files in Atomix node_modules
  if (resourcePath.includes('node_modules/@shohojdhara/atomix')) {
    return true;
  }
  
  // Process files that explicitly mention atomix
  if (resourcePath.includes('atomix')) {
    return true;
  }
  
  return false;
}

/**
 * Filter components based on user selection
 * @param {string} source - Source code
 * @param {string[]} selectedComponents - Components to include
 * @param {boolean} includeAtoms - Whether to include atoms
 * @returns {string} Filtered source code
 */
function filterComponents(source, selectedComponents, includeAtoms) {
  // Match import statements from @shohojdhara/atomix/components
  const componentImportRegex = /import\s+{([^}]+)}\s+from\s+['"]@shohojdhara\/atomix\/components['"]/g;
  
  return source.replace(componentImportRegex, (match, importList) => {
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
 * @param {string} source - Source code
 * @returns {string} Source code with atom imports removed
 */
function removeAtomImports(source) {
  // Remove import statements from atomix/atoms
  const atomImportRegex = /import\s+{[^}]*}\s+from\s+['"][^'"]*\/atoms['"];?\s*/g;
  return source.replace(atomImportRegex, '');
}

/**
 * Optimize styles by removing unnecessary CSS imports
 * @param {string} source - Source code
 * @returns {string} Optimized source code
 */
function optimizeStyles(source) {
  // Remove CSS imports that are not needed
  const cssImportRegex = /import\s+['"][^'"]*\.css['"];?\s*/g;
  
  // More sophisticated optimization could be implemented here
  // For now, we'll just return the source as-is
  return source;
}

/**
 * Pitch loader function for preprocessing
 * Runs before the source is processed
 */
export function pitch() {
  const options = this.getOptions() || {};
  const { verbose = false } = options;
  
  // Check if this is a file we want to process
  const shouldProcess = this.resourcePath.includes('atomix') || 
                       this.resourcePath.includes('@shohojdhara/atomix');
  
  if (!shouldProcess) {
    return; // Skip processing
  }
  
  if (verbose) {
    console.log(`[Atomix Webpack Loader - Pitch] Will process: ${this.resourcePath}`);
  }
}

/**
 * Helper to get Atomix configuration
 * @param {string} context - Project context path
 * @returns {Object} Atomix configuration
 */
export function getAtomixConfig(context) {
  try {
    // Look for atomix.config.ts or similar in the project root
    const configPath = path.join(context, 'atomix.config.ts');
    
    // Clear cache to get fresh config
    const resolvedPath = require.resolve(configPath);
    if (require.cache[resolvedPath]) {
      delete require.cache[resolvedPath];
    }
    
    return require(configPath);
  } catch (e) {
    // Config file doesn't exist, return defaults
    return {
      theme: 'default',
      optimize: true,
      includeAtoms: false,
      components: []
    };
  }
}

/**
 * Get available themes
 * @param {string} context - Project context path
 * @returns {string[]} List of available themes
 */
export function getAvailableThemes(context) {
  try {
    const themesDir = path.join(context, 'node_modules', '@shohojdhara', 'atomix', 'themes');
    
    if (require('fs').existsSync(themesDir)) {
      return require('fs').readdirSync(themesDir)
        .filter(item => require('fs').statSync(path.join(themesDir, item)).isDirectory());
    }
  } catch (e) {
    // Return default themes if unable to read
  }
  
  return ['default', 'dark-complementary', 'high-contrast', 'test-theme'];
}