import {
  AtomixVitePluginOptions,
  AtomixRollupPluginOptions,
  AtomixLoaderOptions,
  AtomixBuildToolOptions,
  BuildTool
} from './types';

export * from './types';

/**
 * Atomix Vite Plugin
 */
export function vitePlugin(options?: AtomixVitePluginOptions): any;

/**
 * Atomix Webpack Loader
 */
export function webpackLoader(source: string): string;

/**
 * Atomix Rollup Plugin
 */
export function rollupPlugin(options?: AtomixRollupPluginOptions): any;

/**
 * Gets the appropriate plugin/loader based on the detected build tool
 */
export function getIntegration(buildTool: BuildTool, options?: AtomixBuildToolOptions): any;

/**
 * Detects the build tool used in the current project
 */
export function detectBuildTool(): BuildTool;

/**
 * Initialize the appropriate integration based on detected build tool
 */
export function initAutoIntegration(options?: AtomixBuildToolOptions): any;

/**
 * Get available themes
 */
export function getAvailableThemes(atomixRoot?: string): string[];
