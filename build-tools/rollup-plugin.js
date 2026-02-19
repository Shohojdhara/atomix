/**
 * @fileoverview Rollup Plugin for Atomix Design System
 * Provides integration of Atomix components and styles into Rollup projects
 */

import fs from 'fs';
import path from 'path';
import {
  resolveAtomixRoot,
  filterComponents,
  removeAtomImports,
  generateThemeCss,
  applyThemeToCSS,
  getAvailableThemes,
  generateThemeModule,
  createLogger,
} from './utils.js';
import { Validator } from './error-handler.js';

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
    verbose = false,
  } = options;

  const log = createLogger('[Atomix Rollup Plugin]', verbose);
  let atomixRoot = null;

  // Validate options — throws AtomixBuildError on failure
  Validator.validateOptions({ theme, components }, [], []);

  log.log(`Initializing with theme: ${theme}`);
  if (components.length > 0) {
    log.log(`Selected components: ${components.join(', ')}`);
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

      // Resolve Atomix package location
      atomixRoot = resolveAtomixRoot();
      if (atomixRoot) {
        log.log(`Found Atomix at: ${atomixRoot}`);
      } else if (verbose) {
        this.warn('[Atomix Rollup Plugin] Could not resolve Atomix package location');
      }

      // Validate that requested components exist
      if (components.length > 0 && atomixRoot) {
        validateComponentsExist(components, atomixRoot, this);
      }

      // Validate theme exists
      if (theme !== 'default' && atomixRoot) {
        const themePath = path.join(atomixRoot, 'themes', theme);
        if (!fs.existsSync(themePath)) {
          const available = getAvailableThemes(atomixRoot);
          this.warn(`[Atomix Rollup Plugin] Theme '${theme}' not found. Available themes: ${available.join(', ') || 'none detected'}`);
        }
      }
    },

    /**
     * Transform Atomix imports to optimize for production
     */
    transform(code, id) {
      const isAtomixFile =
        id.includes('@shohojdhara/atomix') ||
        (atomixRoot && id.includes(atomixRoot)) ||
        code.includes('@shohojdhara/atomix');

      if (!isAtomixFile) {
        return null;
      }

      log.log(`Processing: ${id}`);

      let transformedCode = code;

      if (optimize) {
        if (components.length > 0) {
          transformedCode = filterComponents(transformedCode, components, includeAtoms);
        }

        if (!includeAtoms) {
          transformedCode = removeAtomImports(transformedCode);
        }
      }

      return {
        code: transformedCode,
        map: null,
      };
    },

    /**
     * Resolve import paths for Atomix components
     */
    resolveId(importee, _importer) {
      if (!importee.startsWith('@shohojdhara/atomix/')) {
        return null;
      }

      log.log(`Resolving: ${importee}`);

      // Handle theme imports
      if (importee === '@shohojdhara/atomix/theme' || importee === '@shohojdhara/atomix/themes') {
        if (atomixRoot) {
          const themePath = path.join(atomixRoot, 'themes', theme, 'index.scss');
          if (fs.existsSync(themePath)) {
            return themePath;
          }
        }
        return importee;
      }

      // Handle component imports
      if (importee.includes('/components/') && optimize && components.length > 0) {
        log.log(`Component import detected: ${importee}`);
      }

      return null;
    },

    /**
     * Load virtual modules
     */
    load(id) {
      if (id.includes('virtual:atomix-theme')) {
        log.log('Loading virtual theme module');
        return generateThemeModule(theme, atomixRoot);
      }

      if (id.includes('.atomix-theme.css')) {
        try {
          return generateThemeCss(theme, atomixRoot);
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

      for (const fileName in bundle) {
        const chunk = bundle[fileName];

        if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
          if (chunk.fileName.includes('atomix')) {
            try {
              chunk.source = applyThemeToCSS(chunk.source.toString(), theme, atomixRoot);
              log.log(`Applied theme ${theme} to ${fileName}`);
            } catch (error) {
              if (verbose) {
                this.warn(`[Atomix Rollup Plugin] Error applying theme to ${fileName}: ${error.message}`);
              }
            }
          }
        }
      }
    },
  };
}

/**
 * Validate that requested components exist on disk.
 * @param {string[]} components - Requested components.
 * @param {string} atomixRoot - Atomix root path.
 * @param {import('rollup').PluginContext} context - Rollup plugin context.
 */
function validateComponentsExist(components, atomixRoot, context) {
  const componentsDir = path.join(atomixRoot, 'src', 'components');

  if (!fs.existsSync(componentsDir)) {
    context.warn('[Atomix Rollup Plugin] Could not find components directory');
    return;
  }

  try {
    const availableComponents = fs.readdirSync(componentsDir)
      .filter(item => {
        try {
          return fs.statSync(path.join(componentsDir, item)).isDirectory();
        } catch {
          return false;
        }
      });

    const missingComponents = components.filter(comp => !availableComponents.includes(comp));

    if (missingComponents.length > 0) {
      const available = availableComponents.slice(0, 10).join(', ');
      const suffix = availableComponents.length > 10 ? '...' : '';
      context.warn(`[Atomix Rollup Plugin] Requested components not found: ${missingComponents.join(', ')}. Available: ${available}${suffix}`);
    }
  } catch {
    context.warn('[Atomix Rollup Plugin] Error validating components');
  }
}

// Re-export helpers for external consumption
export { resolveAtomixRoot as getAtomixPackageLocation, getAvailableThemes } from './utils.js';