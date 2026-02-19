// Import types
import type {
  AtomixBuildToolOptions,
  BuildTool,
  AtomixVitePluginOptions,
  AtomixLoaderOptions,
  AtomixRollupPluginOptions,
} from './types.js';

// Declare exactly what index.js exports

/**
 * Vite plugin for Atomix integration
 * Exported as default from ./vite-plugin.js and re-exported as named export
 */
export declare function vitePlugin(options?: AtomixVitePluginOptions): any;

/**
 * Webpack loader for Atomix integration
 * Exported as default from ./webpack-loader.js and re-exported as named export
 */
export declare const webpackLoader: any;

/**
 * Rollup plugin for Atomix integration
 * Exported as default from ./rollup-plugin.js and re-exported as named export
 */
export declare function rollupPlugin(options?: AtomixRollupPluginOptions): any;

/**
 * Gets the appropriate plugin/loader based on the detected build tool
 * Defined directly in index.js
 */
export declare function getIntegration(
  buildTool: BuildTool,
  options?: AtomixBuildToolOptions
): any | null;

/**
 * Detects the build tool used in the current project
 * Defined directly in index.js
 */
export declare function detectBuildTool(): BuildTool;

/**
 * Initialize the appropriate integration based on detected build tool
 * Defined directly in index.js
 */
export declare function initAutoIntegration(options?: AtomixBuildToolOptions): any | null;

/**
 * Get available themes from Atomix installation
 * Re-exported from ./rollup-plugin.js
 */
export declare function getAvailableThemes(atomixPath?: string): string[];
