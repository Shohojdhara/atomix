/**
 * @fileoverview Vite Plugin for Atomix Design System
 * Provides seamless integration of Atomix components and styles into Vite projects
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
  createLogger,
} from './utils.js';
import { Validator } from './error-handler.js';

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

  const log = createLogger('[Atomix Vite Plugin]', verbose);
  let atomixRoot = null;

  // Validate options — throws AtomixBuildError on failure
  Validator.validateOptions({ theme, components }, [], []);

  log.log(`Initializing with theme: ${theme}`);
  if (components.length > 0) {
    log.log(`Selected components: ${components.join(', ')}`);
  }

  return {
    name: 'atomix',

    configResolved(_resolvedConfig) {
      atomixRoot = resolveAtomixRoot();
      if (atomixRoot) {
        log.log(`Found Atomix at: ${atomixRoot}`);
      } else {
        log.warn('Could not resolve Atomix package location');
      }
    },

    /**
     * Transform Atomix imports to optimize for production
     */
    async transform(code, id) {
      const isAtomixFile =
        id.includes('@shohojdhara/atomix') ||
        (atomixRoot && id.includes(atomixRoot)) ||
        code.includes('@shohojdhara/atomix');

      if (!isAtomixFile) {
        return null;
      }

      log.log(`Processing: ${id}`);

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
    },

    /**
     * Inject theme CSS into dev server
     */
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.includes('/atomix-theme.css')) {
          try {
            const themeCss = generateThemeCss(theme, atomixRoot);
            res.setHeader('Content-Type', 'text/css');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(themeCss);
            return;
          } catch (error) {
            log.error('Error serving theme CSS:', error);
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
    generateBundle(outputOptions, bundle) {
      if (!optimizeCss) return;

      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
          try {
            if (theme !== 'default') {
              chunk.source = applyThemeToCSS(chunk.source.toString(), theme, atomixRoot);
              log.log(`Applied theme ${theme} to ${fileName}`);
            }
          } catch (error) {
            log.error(`Error processing CSS ${fileName}:`, error);
          }
        }
      }
    },

    /**
     * Build start hook
     */
    buildStart() {
      log.log('Build started');

      // Validate theme exists
      if (theme !== 'default' && atomixRoot) {
        const themePath = path.join(atomixRoot, 'themes', theme);
        if (!fs.existsSync(themePath)) {
          const available = getAvailableThemes(atomixRoot);
          this.warn(`[Atomix Vite Plugin] Theme '${theme}' not found. Available themes: ${available.join(', ') || 'none detected'}`);
        }
      }
    },
  };
}

// Re-export helpers for external consumption
export { resolveAtomixRoot as getAtomixPackageLocation, getAvailableThemes } from './utils.js';