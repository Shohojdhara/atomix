/**
 * @fileoverview Webpack Loader for Atomix Design System
 * Provides integration of Atomix components and styles into Webpack projects
 */

import path from 'path';
import { createRequire } from 'module';
import {
  filterComponents,
  removeAtomImports,
  shouldProcessFile,
  createLogger,
} from './utils.js';
import { Validator } from './error-handler.js';

const require = createRequire(import.meta.url);

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
  const options = this.getOptions() || {};

  const {
    includeAtoms = false,
    components = [],
    verbose = false,
  } = options;

  const log = createLogger('[Atomix Webpack Loader]', verbose);

  // Validate options — throws AtomixBuildError on failure
  Validator.validateOptions({ components }, [], []);

  const resourcePath = this.resourcePath;

  log.log(`Processing: ${resourcePath}`);
  if (components.length > 0) {
    log.log(`Selected components: ${components.join(', ')}`);
  }

  // Determine if we should process this file (strict matching)
  if (!shouldProcessFile(resourcePath, source)) {
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

  log.log(`Transformation complete for: ${resourcePath}`);

  return transformedSource;
}

/**
 * Pitch loader function for preprocessing.
 * Runs before the source is processed.
 */
export function pitch() {
  const options = this.getOptions() || {};
  const { verbose = false } = options;

  const isAtomixFile =
    this.resourcePath.includes('node_modules/@shohojdhara/atomix') ||
    this.resourcePath.includes('@shohojdhara/atomix');

  if (!isAtomixFile) {
    return; // Skip processing
  }

  if (verbose) {
    console.log(`[Atomix Webpack Loader - Pitch] Will process: ${this.resourcePath}`);
  }
}

/**
 * Helper to get Atomix configuration from the project root.
 * @param {string} context - Project context path.
 * @returns {Object} Atomix configuration.
 */
export function getAtomixConfig(context) {
  try {
    const configPath = path.join(context, 'atomix.config.ts');
    const resolvedPath = require.resolve(configPath);

    // Clear module cache to get fresh config
    if (require.cache[resolvedPath]) {
      delete require.cache[resolvedPath];
    }

    return require(configPath);
  } catch {
    return {
      theme: 'default',
      optimize: true,
      includeAtoms: false,
      components: [],
    };
  }
}

// Re-export helper for external consumption
export { getAvailableThemes } from './utils.js';