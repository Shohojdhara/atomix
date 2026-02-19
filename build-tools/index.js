/**
 * @fileoverview Entry point for Atomix Build Tool Integrations
 * Provides a unified way to access build tool plugins/loaders
 * @module @shohojdhara/atomix/build-tools
 */

import fs from 'fs';
import path from 'path';

/** @typedef {import('./types').AtomixBuildToolOptions} AtomixBuildToolOptions */
/** @typedef {import('./types').BuildTool} BuildTool */

import vitePluginFn from './vite-plugin.js';
import webpackLoaderFn from './webpack-loader.js';
import rollupPluginFn from './rollup-plugin.js';

// Named re-exports
export { default as vitePlugin } from './vite-plugin.js';
export { default as webpackLoader } from './webpack-loader.js';
export { default as rollupPlugin } from './rollup-plugin.js';

/**
 * Gets the appropriate plugin/loader based on the detected build tool
 * @param {BuildTool} buildTool - Name of the build tool ('vite', 'webpack', 'rollup')
 * @param {AtomixBuildToolOptions} [options={}] - Options to pass to the plugin/loader
 * @returns {Function|null} The appropriate plugin/loader function or null if not found
 */
export function getIntegration(buildTool, options = {}) {
  switch (buildTool?.toLowerCase()) {
    case 'vite':
      return vitePluginFn(options);
    case 'webpack':
      // Webpack loaders work differently — return the loader function itself
      return webpackLoaderFn;
    case 'rollup':
      return rollupPluginFn(options);
    default:
      console.warn(`[Atomix Build Tools] Unsupported build tool: ${buildTool}`);
      return null;
  }
}

/**
 * Detects the build tool used in the current project
 * @returns {BuildTool} Detected build tool or null if not found
 */
export function detectBuildTool() {
  try {
    const pkgPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(pkgPath)) {
      return null;
    }

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };

    if (allDeps.vite) return 'vite';
    if (allDeps.webpack) return 'webpack';
    if (allDeps.rollup) return 'rollup';

    return null;
  } catch (e) {
    console.error('[Atomix Build Tools] Error detecting build tool:', e.message);
    return null;
  }
}

/**
 * Initialize the appropriate integration based on detected build tool
 * @param {AtomixBuildToolOptions} [options={}] - Options to pass to the plugin/loader
 * @returns {Function|null} The appropriate plugin/loader function or null if not found
 */
export function initAutoIntegration(options = {}) {
  const buildTool = detectBuildTool();
  if (!buildTool) {
    console.warn('[Atomix Build Tools] Could not detect build tool, please use specific integration');
    return null;
  }

  console.log(`[Atomix Build Tools] Detected build tool: ${buildTool}, initializing integration...`);
  return getIntegration(buildTool, options);
}

// Export helpers
export { getAvailableThemes } from './utils.js';