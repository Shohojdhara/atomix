/**
 * @fileoverview Entry point for Atomix Build Tool Integrations
 * Provides a unified way to access build tool plugins/loaders
 * @module @shohojdhara/atomix/build-tools
 */

/** @typedef {import('./types').AtomixBuildToolOptions} AtomixBuildToolOptions */
/** @typedef {import('./types').BuildTool} BuildTool */

export { default as vitePlugin } from './vite-plugin.js';
export { default as webpackLoader } from './webpack-loader.js';
export { default as rollupPlugin } from './rollup-plugin.js';

/**
 * Utility functions for build tool integration
 */

/**
 * Gets the appropriate plugin/loader based on the detected build tool
 * @param {BuildTool} buildTool - Name of the build tool ('vite', 'webpack', 'rollup')
 * @param {AtomixBuildToolOptions} [options={}] - Options to pass to the plugin/loader
 * @returns {Function|null} The appropriate plugin/loader function or null if not found
 */
export function getIntegration(buildTool, options = {}) {
  switch (buildTool.toLowerCase()) {
    case 'vite':
      return vitePlugin(options);
    case 'webpack':
      // Note: webpack loaders work differently than plugins
      return webpackLoader;
    case 'rollup':
      return rollupPlugin(options);
    default:
      console.warn(`Unsupported build tool: ${buildTool}`);
      return null;
  }
}

/**
 * Detects the build tool used in the current project
 * @returns {BuildTool} Detected build tool or null if not found
 */
export function detectBuildTool() {
  try {
    // Check for package.json to determine build tool
    const fs = require('fs');
    const path = require('path');
    
    // Get package.json from current working directory
    const pkgPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(pkgPath)) {
      return null;
    }
    
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    
    // Check for vite dependency
    if (
      (pkg.devDependencies && pkg.devDependencies.vite) || 
      (pkg.dependencies && pkg.dependencies.vite)
    ) {
      return 'vite';
    }
    
    // Check for webpack dependency
    if (
      (pkg.devDependencies && pkg.devDependencies.webpack) || 
      (pkg.dependencies && pkg.dependencies.webpack)
    ) {
      return 'webpack';
    }
    
    // Check for rollup dependency
    if (
      (pkg.devDependencies && pkg.devDependencies.rollup) || 
      (pkg.dependencies && pkg.dependencies.rollup)
    ) {
      return 'rollup';
    }
    
    return null;
  } catch (e) {
    console.error('Error detecting build tool:', e);
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
    console.warn('Could not detect build tool, please use specific integration');
    return null;
  }
  
  console.log(`Detected build tool: ${buildTool}, initializing integration...`);
  return getIntegration(buildTool, options);
}

// Export helpers
export { 
  getAvailableThemes 
} from './rollup-plugin.js';