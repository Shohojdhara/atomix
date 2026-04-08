/**
 * Atomix Configuration System
 *
 * Tailwind-like configuration for customizing the Atomix Design System.
 *
 * External developers can create `atomix.config.ts` in their project root
 * to customize design tokens, similar to Tailwind's tailwind.config.js
 *
 * @example
 * ```typescript
 * // atomix.config.ts (in your project)
 * import { defineConfig } from '@shohojdhara/atomix/config';
 *
 * export default defineConfig({
 *   theme: {
 *     extend: {
 *       colors: {
 *         primary: { main: '#7AFFD7' },
 *       },
 *     },
 *   },
 * });
 * ```
 */

import type { Theme } from '../theme/types';

/**
 * Color Scale (1-10)
 */
export interface ColorScale {
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  5?: string;
  6?: string;
  7?: string;
  8?: string;
  9?: string;
  10?: string;
  [key: string]: string | undefined;
}

/**
 * Palette Color Options
 */
export interface PaletteColorOptions {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

/**
 * Interactive Effect Configuration
 */
export interface InteractiveEffectsConfig {
  /** Vortex & flow field effects */
  vortex?: {
    enabled?: boolean;
    strength?: number;
    radius?: number;
    decay?: number;
    curlNoise?: boolean;
    velocityTracking?: boolean;
  };
  
  /** Chromatic aberration effects */
  chromaticAberration?: {
    enabled?: boolean;
    mode?: 'longitudinal' | 'lateral' | 'hybrid';
    redShift?: number;
    greenShift?: number;
    blueShift?: number;
    edgeOnly?: boolean;
    edgeThreshold?: number;
  };
  
  /** Mouse interaction settings */
  mouseInteraction?: {
    sensitivity?: number;
    trailEffect?: boolean;
    pressureSensitivity?: boolean;
  };
  
  /** Animation speed controls */
  animationSpeed?: {
    base?: number;
    timeMultiplier?: number;
  };
}

/**
 * Optimization Configuration
 */
export interface OptimizationConfig {
  /** Responsive breakpoint system */
  responsive?: {
    breakpoints?: {
      mobile?: string;
      tablet?: string;
      desktop?: string;
      wide?: string;
    };
    /** Device-aware parameter scaling */
    deviceScaling?: {
      mobile?: number;
      tablet?: number;
      desktop?: number;
    };
  };
  
  /** Performance monitoring */
  performance?: {
    enabled?: boolean;
    fpsTarget?: number;
    autoScaling?: boolean;
    monitorDashboard?: boolean;
  };
  
  /** Auto-scaling logic based on device capabilities */
  autoScaling?: {
    enabled?: boolean;
    qualityThresholds?: {
      lowEnd?: number;
      midRange?: number;
      highEnd?: number;
    };
  };
}

/**
 * Visual Polish Configuration
 */
export interface VisualPolishConfig {
  /** Advanced border effects */
  borders?: {
    iridescentGlow?: boolean;
    shimmerEffect?: boolean;
    beveledEdges?: boolean;
    pulsingGlow?: boolean;
  };
  
  /** Content-aware blur */
  contentAwareBlur?: {
    enabled?: boolean;
    depthDetection?: boolean;
    edgePreservation?: boolean;
    variableRadius?: boolean;
  };
  
  /** Holographic effect modes */
  holographicEffects?: {
    enabled?: boolean;
    rainbowDiffraction?: boolean;
    scanlineAnimation?: boolean;
    gridOverlay?: boolean;
    dataStream?: boolean;
    pulseRings?: boolean;
  };
}

/**
 * Design Tokens Schema (Tailwind-like)
 */
export interface ThemeTokens {
  /** Color palette */
  colors?: Record<string, string | PaletteColorOptions | ColorScale | Record<string, string>>;
  /** Spacing scale */
  spacing?: Record<string, string>;
  /** Border radius scale */
  borderRadius?: Record<string, string>;
  /** Typography scale and settings */
  typography?: {
    fontFamilies?: Record<string, string>;
    fontSizes?: Record<string, string>;
    fontWeights?: Record<string, string | number>;
    lineHeights?: Record<string, string | number>;
    letterSpacings?: Record<string, string>;
  };
  /** Shadow scale */
  shadows?: Record<string, string>;
  /** Z-index scale */
  zIndex?: Record<string, string | number>;
  /** Breakpoints scale */
  breakpoints?: Record<string, string | number>;
  /** Transitions settings */
  transitions?: {
    durations?: Record<string, string>;
    easings?: Record<string, string>;
  };
}

/**
 * CSS Theme Definition
 */
export interface CSSThemeDefinition {
  type: 'css';
  name: string;
  class?: string;
  description?: string;
  author?: string;
  version?: string;
  tags?: string[];
  supportsDarkMode?: boolean;
  status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
  a11y?: {
    contrastTarget?: number;
    modes?: string[];
  };
  color?: string;
  features?: string[];
  dependencies?: string[];
  cssPath?: string;
}

/**
 * JavaScript Theme Definition
 */
export interface JSThemeDefinition {
  type: 'js';
  name: string;
  class?: string;
  description?: string;
  author?: string;
  version?: string;
  tags?: string[];
  supportsDarkMode?: boolean;
  status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
  a11y?: {
    contrastTarget?: number;
    modes?: string[];
  };
  color?: string;
  features?: string[];
  dependencies?: string[];
  createTheme: () => Theme;
}

/**
 * Theme Definition (CSS or JS)
 */
export type ThemeDefinition = CSSThemeDefinition | JSThemeDefinition;

/**
 * Build configuration (migrated from theme.config.ts)
 */
export interface BuildConfig {
  output?: {
    directory?: string;
    formats?: {
      expanded?: string;
      compressed?: string;
    };
  };
  sass?: {
    style?: 'expanded' | 'compressed';
    sourceMap?: boolean;
    loadPaths?: string[];
  };
}

/**
 * Runtime configuration (migrated from theme.config.ts)
 */
export interface RuntimeConfig {
  basePath?: string;
  cdnPath?: string | null;
  preload?: string[];
  lazy?: boolean;
  defaultTheme?: string;
  storageKey?: string;
  dataAttribute?: string;
  enablePersistence?: boolean;
  useMinified?: boolean;
}

/**
 * Integration settings (migrated from theme.config.ts)
 */
export interface IntegrationConfig {
  cssVariables?: Record<string, string>;
  classNames?: {
    theme?: string;
    colorMode?: string;
  };
}

/**
 * Plugin Configuration
 */
export interface PluginConfig {
  name: string;
  options?: Record<string, any>;
}

/**
 * Token Provider Configuration
 */
export interface TokenProviderConfig {
  type: 'figma' | 'style-dictionary' | 'w3c' | string;
  options?: Record<string, any>;
}

/**
 * Token Engine Configuration
 */
export interface TokenEngineConfig {
  providers?: Record<string, TokenProviderConfig>;
  sync?: {
    pull?: boolean;
    push?: boolean;
    onBuild?: boolean;
  };
}

/**
 * CLI component generator defaults (merged before CLI flags; flags win).
 */
export interface GeneratorConfig {
  /** Default output directory for generated components */
  outputPath?: string;
  /** Override detected framework */
  framework?: 'react' | 'next' | 'vanilla';
  /** Per-feature defaults (CLI --no-* flags override) */
  features?: {
    storybook?: boolean;
    hook?: boolean;
    styles?: boolean;
    tests?: boolean;
  };
  /** Composable hooks directory relative to project root */
  hookOutputDir?: string;
  /** Story file: side-effect import for global Atomix styles */
  storybookCssImport?: string;
  /** Barrel file strategy for new components */
  barrel?: 'index' | 'none';
}

/**
 * Atomix Configuration Interface
 *
 * Tailwind-like configuration for external developers.
 * Focus on theme customization - build/runtime configs are internal only.
 */
export interface AtomixConfig {
  /**
   * CSS variable prefix (default: 'atomix')
   *
   * Change this to customize all CSS variable names.
   * Example: prefix: 'myapp' → --myapp-primary instead of --atomix-primary
   */
  prefix?: string;

  /**
   * Plugins to extend CLI functionality
   */
  plugins?: (string | PluginConfig)[];

  /**
   * Universal Token Engine configuration
   */
  tokenEngine?: TokenEngineConfig;

  /**
   * AI-Assisted Scaffolding configuration
   */
  ai?: {
    /** AI provider (default: 'openai') */
    provider?: 'openai' | 'anthropic';
    /** LLM model to use */
    model?: string;
    /** API key for the provider */
    apiKey?: string;
    /** Temperature for AI creativity (0.0-1.0, default: 0.7) */
    temperature?: number;
    /** Maximum tokens per AI response (default: 4000) */
    maxTokens?: number;
    /** Rate limiting configuration */
    rateLimit?: {
      /** Maximum requests allowed */
      requests: number;
      /** Time window in milliseconds */
      windowMs: number;
    };
  };

  /**
   * Performance & Telemetry (Phase 4)
   */
  telemetry?: {
    /** Enable local telemetry logging (default: false) */
    enabled?: boolean;
    /** Output path for telemetry logs (default: '.atomix/telemetry.json') */
    path?: string;
    /** Anonymize telemetry data (default: true) */
    anonymize?: boolean;
  };

  /**
   * `atomix generate` defaults (CLI overrides these)
   */
  generator?: GeneratorConfig;

  // Advanced Features Configuration
  /** Phase 2: Interactive Effects Configuration */
  interactiveEffects?: InteractiveEffectsConfig;
  
  /** Phase 3: Optimization Configuration */
  optimization?: OptimizationConfig;
  
  /** Phase 4: Visual Polish Configuration */
  visualPolish?: VisualPolishConfig;

  /**
   * Theme customization (Tailwind-like)
   *
   * Use `extend` to add or override design tokens.
   * Use `tokens` to completely replace the default token system (advanced).
   */
  theme?: {
    /**
     * Extend the default design tokens
     *
     * This is the recommended way to customize Atomix.
     * Your values will override or extend the base tokens.
     */
    extend?: ThemeTokens;

    /**
     * Override the default tokens entirely (advanced)
     *
     * Use with caution - this replaces the entire token system.
     * Most users should use `extend` instead.
     */
    tokens?: ThemeTokens;

    /**
     * Register custom themes (optional)
     *
     * Define CSS or JavaScript themes that can be loaded dynamically.
     */
    themes?: Record<string, ThemeDefinition>;
  };

  // Internal configurations (for library development only)
  // These are not needed for external developers
  /** @internal Build configuration (internal use only) */
  build?: BuildConfig;
  /** @internal Runtime configuration (internal use only) */
  runtime?: RuntimeConfig;
  /** @internal Integration settings (internal use only) */
  integration?: IntegrationConfig;
  /** @internal Theme dependencies mapping (internal use only) */
  dependencies?: Record<string, string[]>;
}

/**
 * Helper function to define Atomix configuration with type safety
 *
 * @param config - Atomix configuration object
 * @returns The configuration object
 */
/**
 * Helper function to define Atomix configuration with type safety
 *
 * Similar to Tailwind's defineConfig, provides autocomplete and type checking.
 *
 * @param config - Atomix configuration object
 * @returns The configuration object
 *
 * @example
 * ```typescript
 * import { defineConfig } from '@shohojdhara/atomix/config';
 *
 * export default defineConfig({
 *   theme: {
 *     extend: {
 *       colors: {
 *         primary: { main: '#7AFFD7' },
 *       },
 *     },
 *   },
 * });
 * ```
 */
export function defineConfig(config: AtomixConfig): AtomixConfig {
  return config;
}

// Re-export only types that are NOT defined locally in this file
export type { DesignTokenCategory, DesignTokenValue } from './types';

// Export the config loader functions
export { 
  loadAtomixConfig, 
  resolveConfigPath 
} from './loader';

// Export the validator
export { 
  validateConfiguration, 
  printConfigReport,
  type ValidationResult 
} from './validator';


