/**
 * Configuration Types
 *
 * Type definitions for the Atomix configuration system.
 */

import type { Theme } from '../theme/types';

/**
 * Design token categories
 */
export type DesignTokenCategory =
  | 'colors'
  | 'spacing'
  | 'typography'
  | 'borderRadius'
  | 'shadows'
  | 'zIndex'
  | 'transitions'
  | 'breakpoints';

/**
 * Design token value types
 */
export type DesignTokenValue = string | number;

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
 * Build configuration
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
 * Runtime configuration
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
 * Integration settings
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
 * CLI component generator defaults
 */
export interface GeneratorConfig {
  /** Default output directory for generated components */
  outputPath?: string;
  /** Override detected framework */
  framework?: 'react' | 'next' | 'vanilla';
  /** Per-feature defaults */
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
 */
export interface AtomixConfig {
  prefix?: string;
  plugins?: (string | PluginConfig)[];
  tokenEngine?: TokenEngineConfig;
  ai?: {
    provider?: 'openai' | 'anthropic';
    model?: string;
    apiKey?: string;
    temperature?: number;
    maxTokens?: number;
    rateLimit?: {
      requests: number;
      windowMs: number;
    };
  };
  telemetry?: {
    enabled?: boolean;
    path?: string;
    anonymize?: boolean;
  };
  generator?: GeneratorConfig;
  interactiveEffects?: InteractiveEffectsConfig;
  optimization?: OptimizationConfig;
  visualPolish?: VisualPolishConfig;
  theme?: {
    extend?: ThemeTokens;
    tokens?: ThemeTokens;
    themes?: Record<string, ThemeDefinition>;
  };
  /** @internal Build configuration */
  build?: BuildConfig;
  /** @internal Runtime configuration */
  runtime?: RuntimeConfig;
  /** @internal Integration settings */
  integration?: IntegrationConfig;
  /** @internal Theme dependencies mapping */
  dependencies?: Record<string, string[]>;
}

/**
 * Helper function to define Atomix configuration with type safety
 */
export function defineConfig(config: AtomixConfig): AtomixConfig {
  return config;
}