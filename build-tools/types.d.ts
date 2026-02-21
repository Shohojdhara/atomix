/**
 * Type definitions for Atomix Build Tool Integrations
 */

// ─── Plugin Option Interfaces ────────────────────────────────────────────────

/** Options for the Vite plugin */
export interface AtomixVitePluginOptions {
  /** Theme to use (default: 'default') */
  theme?: string;
  /** Specific components to include (default: all) */
  components?: string[];
  /** Whether to optimize CSS (default: true) */
  optimizeCss?: boolean;
  /** Whether to include atomic styles (default: false) */
  includeAtoms?: boolean;
  /** Enable verbose logging (default: false) */
  verbose?: boolean;
}

/** Options for the Webpack loader */
export interface AtomixLoaderOptions {
  /** Whether to include atomic styles (default: false) */
  includeAtoms?: boolean;
  /** Specific components to include (default: all) */
  components?: string[];
  /** Enable verbose logging (default: false) */
  verbose?: boolean;
  /** Theme to use (default: 'default') */
  theme?: string;
}

/** Options for the Rollup plugin */
export interface AtomixRollupPluginOptions {
  /** Theme to use (default: 'default') */
  theme?: string;
  /** Specific components to include (default: all) */
  components?: string[];
  /** Whether to optimize imports (default: true) */
  optimize?: boolean;
  /** Whether to include atoms (default: false) */
  includeAtoms?: boolean;
  /** Enable verbose logging (default: false) */
  verbose?: boolean;
}

/** Generic options accepted by `getIntegration` / `initAutoIntegration` */
export interface AtomixBuildToolOptions {
  /** Theme to use */
  theme?: string;
  /** Specific components to include */
  components?: string[];
  /** Whether to optimize */
  optimize?: boolean;
  /** Whether to include atomic styles */
  includeAtoms?: boolean;
  /** Enable verbose logging */
  verbose?: boolean;
}

// ─── Plugin Return Types ─────────────────────────────────────────────────────

/** Shape of the object returned by the Vite plugin factory */
export interface VitePluginResult {
  name: string;
  configResolved?(config: unknown): void;
  transform?(code: string, id: string): Promise<TransformResult | null>;
  configureServer?(server: unknown): void;
  generateBundle?(options: unknown, bundle: Record<string, unknown>): void;
  buildStart?(): void;
}

/** Shape of the object returned by the Rollup plugin factory */
export interface RollupPluginResult {
  name: string;
  buildStart?(): void;
  transform?(code: string, id: string): TransformResult | null;
  resolveId?(importee: string, importer?: string): string | null;
  load?(id: string): string | null;
  generateBundle?(options: unknown, bundle: Record<string, unknown>): void;
}

// ─── Theme Types ─────────────────────────────────────────────────────────────

export interface ThemeConfig {
  /** Theme name */
  name: string;
  /** Theme CSS custom properties */
  variables: Record<string, string>;
  /** Theme CSS content */
  css: string;
}

// ─── Component Types ─────────────────────────────────────────────────────────

export interface ComponentInfo {
  /** Component name */
  name: string;
  /** Component path */
  path: string;
  /** Whether component is available */
  available: boolean;
}

// ─── Build Tool Detection ────────────────────────────────────────────────────

export type BuildTool = 'vite' | 'webpack' | 'rollup' | null;

export interface BuildToolDetectionResult {
  /** Detected build tool */
  tool: BuildTool;
  /** Confidence level (0-1) */
  confidence: number;
  /** Detection method used */
  method: string;
}

// ─── Transform Result ────────────────────────────────────────────────────────

export interface TransformResult {
  /** Transformed code */
  code: string;
  /** Source map (null when not generated) */
  map: null | object;
}

// ─── Error Types ─────────────────────────────────────────────────────────────

export interface AtomixBuildError extends Error {
  /** Error code */
  code: string;
  /** Additional error details */
  details?: Record<string, unknown>;
  /** Suggested solutions */
  suggestions?: string[];
}

// ─── Utility Types ───────────────────────────────────────────────────────────

export interface Logger {
  log(message: string): void;
  warn(message: string): void;
  error(message: string, err?: unknown): void;
}

// ─── Configuration ───────────────────────────────────────────────────────────

export interface AtomixConfig {
  /** Theme configuration */
  theme: string;
  /** Optimization settings */
  optimize: boolean;
  /** Include atoms */
  includeAtoms: boolean;
  /** Component list */
  components: string[];
  /** Build tool specific settings */
  buildTools: {
    vite?: Partial<AtomixVitePluginOptions>;
    webpack?: Partial<AtomixLoaderOptions>;
    rollup?: Partial<AtomixRollupPluginOptions>;
  };
}
