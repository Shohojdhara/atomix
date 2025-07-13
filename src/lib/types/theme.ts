/**
 * Theme System Types
 * Comprehensive TypeScript definitions for the Shaj theme system
 */

// Re-export theme types from components.ts for convenience
export type {
  AnimationConfig,
  BorderRadiusConfig,
  ColorScale,
  ComponentThemeProps,
  SemanticColor,
  ShadowConfig,
  SpacingConfig,
  SurfaceColorConfig,
  ThemeColorConfig,
  ThemeConfig,
  ThemeContextValue,
  ThemeGeneratorOptions,
  ThemeManagerOptions,
  ThemeName,
  ThemeValidationResult,
  ThemeVariables,
  TypographyConfig,
  UseThemeReturn,
} from './components.js';

// Import base types
import type { ThemeConfig, ThemeManagerOptions, ThemeName, ThemeVariables } from './components.js';

// ============================================================================
// EXTENDED THEME TYPES
// ============================================================================

/**
 * Theme event types for the theme manager
 */
export type ThemeEvent = 'theme-changed' | 'theme-loaded' | 'theme-error' | 'theme-validated';

/**
 * Theme event data interface
 */
export interface ThemeEventData {
  type: ThemeEvent;
  theme: ThemeName;
  previousTheme?: ThemeName;
  data?: any;
  timestamp: number;
}

/**
 * Theme event listener interface
 */
export interface ThemeEventListener {
  (event: ThemeEventData): void;
}

/**
 * Advanced theme manager options
 */
export interface AdvancedThemeManagerOptions extends ThemeManagerOptions {
  /**
   * CSS attribute to use for theme switching
   */
  themeAttribute?: string;

  /**
   * Callback when theme changes
   */
  onThemeChange?: (theme: ThemeName, previousTheme?: ThemeName) => void;

  /**
   * Callback when theme loading fails
   */
  onThemeError?: (error: Error, theme: ThemeName) => void;

  /**
   * Enable theme event system
   */
  enableEvents?: boolean;

  /**
   * Custom CSS variable prefix
   */
  cssVariablePrefix?: string;

  /**
   * Enable theme debugging
   */
  debug?: boolean;

  /**
   * Custom theme loader function
   */
  themeLoader?: (theme: ThemeName) => Promise<ThemeConfig>;

  /**
   * Theme cache configuration
   */
  cache?: {
    enabled: boolean;
    maxAge: number;
    storage: 'memory' | 'localStorage' | 'sessionStorage';
  };
}

/**
 * Theme state interface for state management
 */
export interface ThemeState {
  /**
   * Current active theme
   */
  currentTheme: ThemeName;

  /**
   * Previously active theme
   */
  previousTheme?: ThemeName;

  /**
   * Available themes
   */
  availableThemes: ThemeName[];

  /**
   * Loading state
   */
  isLoading: boolean;

  /**
   * Error state
   */
  error: string | null;

  /**
   * Theme configurations cache
   */
  themeConfigs: Map<ThemeName, ThemeConfig>;

  /**
   * System color scheme preference
   */
  systemPreference: 'light' | 'dark' | null;

  /**
   * Whether theme persistence is enabled
   */
  persistenceEnabled: boolean;

  /**
   * Theme manager initialization status
   */
  isInitialized: boolean;
}

/**
 * Theme action types for state management
 */
export type ThemeAction =
  | { type: 'SET_THEME'; payload: ThemeName }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_THEME_CONFIG'; payload: { theme: ThemeName; config: ThemeConfig } }
  | { type: 'REMOVE_THEME_CONFIG'; payload: ThemeName }
  | { type: 'SET_AVAILABLE_THEMES'; payload: ThemeName[] }
  | { type: 'SET_SYSTEM_PREFERENCE'; payload: 'light' | 'dark' | null }
  | { type: 'SET_PERSISTENCE'; payload: boolean }
  | { type: 'INITIALIZE'; payload: Partial<ThemeState> }
  | { type: 'RESET' };

/**
 * Theme reducer function type
 */
export type ThemeReducer = (state: ThemeState, action: ThemeAction) => ThemeState;

/**
 * Theme hook configuration
 */
export interface UseThemeConfig {
  /**
   * Theme manager instance to use
   */
  manager?: any; // ThemeManager type will be defined in implementation

  /**
   * Whether to subscribe to theme changes
   */
  subscribe?: boolean;

  /**
   * Whether to initialize theme on mount
   */
  autoInit?: boolean;

  /**
   * Default theme to use if none is set
   */
  fallbackTheme?: ThemeName;

  /**
   * Whether to respect system preferences
   */
  respectSystemPreference?: boolean;
}

/**
 * Theme CSS injection options
 */
export interface ThemeCSSOptions {
  /**
   * Target element to inject CSS into
   */
  target?: HTMLElement | string;

  /**
   * CSS injection method
   */
  method?: 'style-tag' | 'css-variables' | 'css-classes';

  /**
   * Whether to minify the CSS
   */
  minify?: boolean;

  /**
   * Custom CSS template
   */
  template?: string;

  /**
   * CSS scope selector
   */
  scope?: string;

  /**
   * Whether to include source maps
   */
  sourceMaps?: boolean;
}

/**
 * Theme performance metrics
 */
export interface ThemePerformanceMetrics {
  /**
   * Theme loading time in milliseconds
   */
  loadTime: number;

  /**
   * Theme application time in milliseconds
   */
  applyTime: number;

  /**
   * Number of CSS variables applied
   */
  variableCount: number;

  /**
   * Memory usage for theme data
   */
  memoryUsage: number;

  /**
   * Cache hit rate
   */
  cacheHitRate: number;

  /**
   * Theme bundle size in bytes
   */
  bundleSize: number;
}

/**
 * Theme analytics data
 */
export interface ThemeAnalytics {
  /**
   * Theme usage statistics
   */
  usage: Record<
    ThemeName,
    {
      count: number;
      lastUsed: Date;
      averageSessionTime: number;
    }
  >;

  /**
   * Performance metrics
   */
  performance: ThemePerformanceMetrics;

  /**
   * User preferences
   */
  preferences: {
    favoriteThemes: ThemeName[];
    systemPreferenceUsage: number;
    customizations: number;
  };

  /**
   * Error tracking
   */
  errors: Array<{
    theme: ThemeName;
    error: string;
    timestamp: Date;
    userAgent: string;
  }>;
}

/**
 * Theme builder configuration for custom theme creation
 */
export interface ThemeBuilderConfig {
  /**
   * Base theme to extend
   */
  baseTheme: ThemeName;

  /**
   * Custom theme name
   */
  name: string;

  /**
   * Theme display name
   */
  displayName: string;

  /**
   * Theme description
   */
  description: string;

  /**
   * Color customizations
   */
  colors: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    text?: string;
  };

  /**
   * Typography customizations
   */
  typography?: {
    fontFamily?: string;
    fontSize?: string;
    lineHeight?: string;
    fontWeight?: string;
  };

  /**
   * Spacing customizations
   */
  spacing?: {
    unit?: string;
    scale?: number;
  };

  /**
   * Border radius customizations
   */
  borderRadius?: {
    small?: string;
    medium?: string;
    large?: string;
  };

  /**
   * Shadow customizations
   */
  shadows?: {
    small?: string;
    medium?: string;
    large?: string;
  };

  /**
   * Animation customizations
   */
  animations?: {
    duration?: string;
    easing?: string;
  };

  /**
   * Whether to generate dark mode variant
   */
  generateDarkMode?: boolean;

  /**
   * Custom CSS rules to include
   */
  customCSS?: string;

  /**
   * Theme metadata
   */
  metadata?: {
    author?: string;
    version?: string;
    tags?: string[];
    license?: string;
  };
}

/**
 * Theme export options
 */
export interface ThemeExportOptions {
  /**
   * Export format
   */
  format: 'css' | 'scss' | 'json' | 'js' | 'ts';

  /**
   * Whether to include all themes or specific ones
   */
  themes?: ThemeName[] | 'all';

  /**
   * Whether to minify the output
   */
  minify?: boolean;

  /**
   * Whether to include source maps
   */
  sourceMaps?: boolean;

  /**
   * Output file name pattern
   */
  fileNamePattern?: string;

  /**
   * Whether to include metadata
   */
  includeMetadata?: boolean;

  /**
   * Custom template for output
   */
  template?: string;

  /**
   * Whether to tree-shake unused variables
   */
  treeShake?: boolean;
}

/**
 * Theme import options
 */
export interface ThemeImportOptions {
  /**
   * Source format
   */
  format: 'css' | 'scss' | 'json' | 'js' | 'ts';

  /**
   * Whether to validate the imported theme
   */
  validate?: boolean;

  /**
   * Whether to merge with existing themes
   */
  merge?: boolean;

  /**
   * Custom parser for the input
   */
  parser?: (input: string) => ThemeConfig;

  /**
   * Whether to auto-generate missing properties
   */
  autoGenerate?: boolean;

  /**
   * Transformation rules to apply
   */
  transformations?: Array<{
    from: string;
    to: string;
    type: 'rename' | 'convert' | 'scale';
  }>;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Utility type to make all theme properties optional for partial updates
 */
export type PartialThemeConfig = Partial<ThemeConfig>;

/**
 * Utility type to extract theme color names
 */
export type ThemeColorName = keyof ThemeConfig['colors'];

/**
 * Utility type to extract surface color names
 */
export type SurfaceColorName = keyof ThemeConfig['surfaces']['light'];

/**
 * Utility type for theme CSS variable names
 */
export type ThemeCSSVariable = keyof ThemeVariables;

/**
 * Utility type for theme validation levels
 */
export type ValidationLevel = 'error' | 'warning' | 'info';

/**
 * Utility type for theme comparison results
 */
export interface ThemeComparison {
  theme1: ThemeName;
  theme2: ThemeName;
  differences: Array<{
    property: string;
    value1: any;
    value2: any;
    type: 'added' | 'removed' | 'changed';
  }>;
  similarity: number; // 0-1 scale
  recommendations: string[];
}

/**
 * Utility type for theme migration data
 */
export interface ThemeMigration {
  from: string; // version
  to: string; // version
  theme: ThemeName;
  changes: Array<{
    type: 'property-renamed' | 'property-removed' | 'property-added' | 'value-changed';
    property: string;
    oldValue?: any;
    newValue?: any;
    migration?: string; // migration instructions
  }>;
  breaking: boolean;
  automated: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default theme manager options
 */
export const DEFAULT_THEME_OPTIONS: Required<AdvancedThemeManagerOptions> = {
  defaultTheme: 'shaj-default',
  enablePersistence: true,
  storageKey: 'atomix-theme',
  respectSystemPreference: true,
  enableTransitions: true,
  transitionDuration: 300,
  rootSelector: ':root',
  preloadThemes: false,
  validateThemes: true,
  themeAttribute: 'data-theme',
  onThemeChange: () => {},
  onThemeError: () => {},
  enableEvents: true,
  cssVariablePrefix: '--atomix',
  debug: false,
  themeLoader: undefined,
  cache: {
    enabled: true,
    maxAge: 3600000, // 1 hour
    storage: 'localStorage',
  },
};

/**
 * Available theme names
 */
export const AVAILABLE_THEMES: readonly ThemeName[] = [
  'shaj-default',
  'shaj-ocean',
  'shaj-sunset',
  'shaj-forest',
  'shaj-midnight',
  'shaj-pastel',
] as const;

/**
 * Theme validation rules
 */
export const THEME_VALIDATION_RULES = {
  requiredProperties: [
    'name',
    'displayName',
    'description',
    'colors',
    'surfaces',
    'typography',
    'spacing',
    'borderRadius',
    'shadows',
    'animations',
  ],
  colorScales: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  minContrastRatio: 4.5,
  maxVariableCount: 500,
  maxBundleSize: 1024 * 1024, // 1MB
} as const;
