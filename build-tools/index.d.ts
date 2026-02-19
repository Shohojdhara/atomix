/// <reference path="./types.d.ts" />

import type { 
  AtomixBuildToolOptions, 
  BuildTool,
  AtomixVitePluginOptions,
  AtomixLoaderOptions,
  AtomixRollupPluginOptions
} from './types';

/**
 * Vite plugin for Atomix integration
 */
export declare function vitePlugin(options?: AtomixVitePluginOptions): any;

/**
 * Webpack loader for Atomix integration
 */
export declare const webpackLoader: any;

/**
 * Rollup plugin for Atomix integration
 */
export declare function rollupPlugin(options?: AtomixRollupPluginOptions): any;

/**
 * Gets the appropriate plugin/loader based on the detected build tool
 */
export declare function getIntegration(
  buildTool: BuildTool, 
  options?: AtomixBuildToolOptions
): any | null;

/**
 * Detects the build tool used in the current project
 */
export declare function detectBuildTool(): BuildTool;

/**
 * Initialize the appropriate integration based on detected build tool
 */
export declare function initAutoIntegration(options?: AtomixBuildToolOptions): any | null;

/**
 * Get available themes from Atomix installation
 */
export declare function getAvailableThemes(atomixPath?: string): string[];
