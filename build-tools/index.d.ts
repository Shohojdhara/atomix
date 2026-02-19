// Import types
import type {
  AtomixBuildToolOptions,
  BuildTool,
  AtomixVitePluginOptions,
  AtomixLoaderOptions,
  AtomixRollupPluginOptions,
  VitePluginResult,
  RollupPluginResult,
} from './types.js';

// ─── Plugin Exports ──────────────────────────────────────────────────────────

/** Vite plugin for Atomix integration */
export declare function vitePlugin(options?: AtomixVitePluginOptions): VitePluginResult;

/** Webpack loader for Atomix integration (exported as the loader function itself) */
export declare const webpackLoader: (source: string) => string;

/** Rollup plugin for Atomix integration */
export declare function rollupPlugin(options?: AtomixRollupPluginOptions): RollupPluginResult;

// ─── Utility Exports ─────────────────────────────────────────────────────────

/**
 * Gets the appropriate plugin/loader based on the detected build tool.
 * Returns the instantiated plugin for Vite/Rollup, or the loader function for Webpack.
 */
export declare function getIntegration(
  buildTool: BuildTool,
  options?: AtomixBuildToolOptions
): VitePluginResult | RollupPluginResult | typeof webpackLoader | null;

/** Detects the build tool used in the current project by reading package.json */
export declare function detectBuildTool(): BuildTool;

/** Initialize the appropriate integration based on detected build tool */
export declare function initAutoIntegration(
  options?: AtomixBuildToolOptions
): VitePluginResult | RollupPluginResult | typeof webpackLoader | null;

/** Get available themes from Atomix installation */
export declare function getAvailableThemes(atomixPath?: string | null): string[];
