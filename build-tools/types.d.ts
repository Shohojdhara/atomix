/**
 * Type definitions for Atomix Build Tool Integrations
 */

// Vite Plugin Types
export interface AtomixVitePluginOptions {
  /** Theme to use */
  theme?: string;
  /** Specific components to include */
  components?: string[];
  /** Whether to optimize CSS */
  optimizeCss?: boolean;
  /** Whether to include atomic styles */
  includeAtoms?: boolean;
  /** Enable verbose logging */
  verbose?: boolean;
}

// Webpack Loader Types
export interface AtomixLoaderOptions {
  /** Whether to include atomic styles */
  includeAtoms?: boolean;
  /** Specific components to include */
  components?: string[];
  /** Remove unused styles */
  excludeUnnecessaryStyles?: boolean;
  /** Enable verbose logging */
  verbose?: boolean;
  /** Theme to use */
  theme?: string;
}

// Rollup Plugin Types
export interface AtomixRollupPluginOptions {
  /** Theme to use */
  theme?: string;
  /** Specific components to include */
  components?: string[];
  /** Whether to optimize imports */
  optimize?: boolean;
  /** Whether to include atoms */
  includeAtoms?: boolean;
  /** Enable verbose logging */
  verbose?: boolean;
}

// Generic Types
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

// Theme-related types
export interface ThemeConfig {
  /** Theme name */
  name: string;
  /** Theme variables */
  variables: Record<string, string>;
  /** Theme CSS content */
  css: string;
}

export interface AvailableThemes {
  /** List of available theme names */
  themes: string[];
  /** Default theme name */
  default: string;
}

// Component-related types
export interface ComponentInfo {
  /** Component name */
  name: string;
  /** Component path */
  path: string;
  /** Whether component is available */
  available: boolean;
}

export interface ComponentsList {
  /** Available components */
  available: ComponentInfo[];
  /** Requested components */
  requested: string[];
  /** Missing components */
  missing: string[];
}

// Build tool detection types
export type BuildTool = 'vite' | 'webpack' | 'rollup' | null;

export interface BuildToolDetectionResult {
  /** Detected build tool */
  tool: BuildTool;
  /** Confidence level (0-1) */
  confidence: number;
  /** Detection method used */
  method: string;
}

// Plugin return types
export interface TransformResult {
  /** Transformed code */
  code: string;
  /** Source map */
  map: null | object;
}

export interface ResolveIdResult {
  /** Resolved ID */
  id: string | null;
  /** External flag */
  external?: boolean;
}

// Configuration types
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

// Utility types
export interface Logger {
  log(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}

export interface FileProcessor {
  /** Process file content */
  process(content: string, filePath: string): string;
  /** Validate file */
  validate(filePath: string): boolean;
}

// Error types
export interface AtomixBuildError extends Error {
  /** Error code */
  code: string;
  /** Error details */
  details?: Record<string, any>;
  /** Suggested solutions */
  suggestions?: string[];
}

// Module augmentation for build tools
declare module 'vite' {
  interface Plugin {
    atomix?: {
      processImports?(code: string, id: string): string;
      getThemeCss?(theme: string): string;
    };
  }
}

declare module 'webpack' {
  interface LoaderContext {
    atomix?: {
      filterComponents?(source: string, options: AtomixLoaderOptions): string;
      getAvailableThemes?(): string[];
    };
  }
}

declare module 'rollup' {
  interface PluginContext {
    atomix?: {
      validateComponents?(components: string[]): void;
      applyTheme?(css: string, theme: string): string;
    };
  }
}

// Global augmentation
declare global {
  namespace AtomixBuildTools {
    /** Get available themes */
    function getAvailableThemes(atomixPath?: string): string[];
    
    /** Get Atomix package location */
    function getAtomixPackageLocation(): string | null;
    
    /** Detect build tool */
    function detectBuildTool(): BuildTool;
    
    /** Initialize auto integration */
    function initAutoIntegration(options?: AtomixBuildToolOptions): any;
    
    /** Get integration for specific build tool */
    function getIntegration(buildTool: BuildTool, options?: AtomixBuildToolOptions): any;
  }
}

