/**
 * Advanced Theme System Types
 * Extended TypeScript definitions for advanced theme system features
 */

import type { ReactNode, RefObject } from 'react';
import type {
  ThemeConfig,
  ThemeManagerOptions,
  ThemeName,
  ThemeValidationResult,
  ThemeVariables,
} from './components.js';

// ============================================================================
// REACT CONTEXT TYPES
// ============================================================================

/**
 * Theme context provider props
 */
export interface ThemeProviderProps {
  /**
   * Child components
   */
  children: ReactNode;

  /**
   * Default theme to use
   */
  defaultTheme?: ThemeName;

  /**
   * Theme manager configuration options
   */
  options?: ThemeManagerOptions;

  /**
   * Custom theme configurations to register
   */
  customThemes?: Record<string, ThemeConfig>;

  /**
   * Whether to force a specific theme (useful for testing)
   */
  forceTheme?: ThemeName;

  /**
   * Callback when theme initialization completes
   */
  onInitialized?: (theme: ThemeName) => void;

  /**
   * Callback when theme loading fails
   */
  onError?: (error: Error) => void;
}

/**
 * Theme context value interface
 */
export interface ThemeContextValue {
  /**
   * Currently active theme
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
   * Current theme configuration
   */
  themeConfig: ThemeConfig | null;

  /**
   * Theme loading state
   */
  isLoading: boolean;

  /**
   * Theme error state
   */
  error: string | null;

  /**
   * Whether the theme system is initialized
   */
  isInitialized: boolean;

  /**
   * Set the active theme
   */
  setTheme: (theme: ThemeName) => Promise<void>;

  /**
   * Get theme variables for the current theme
   */
  getThemeVariables: () => Partial<ThemeVariables>;

  /**
   * Check if a theme is available
   */
  isThemeAvailable: (theme: ThemeName) => boolean;

  /**
   * Get theme metadata
   */
  getThemeMetadata: (theme: ThemeName) => ThemeConfig['metadata'] | null;

  /**
   * Validate a theme configuration
   */
  validateTheme: (theme: ThemeName) => Promise<ThemeValidationResult>;

  /**
   * Apply theme to a specific element
   */
  applyThemeToElement: (element: HTMLElement, theme?: ThemeName) => void;

  /**
   * Remove theme from a specific element
   */
  removeThemeFromElement: (element: HTMLElement) => void;

  /**
   * Get CSS custom property value
   */
  getCSSVariable: (property: keyof ThemeVariables) => string;

  /**
   * Set CSS custom property value
   */
  setCSSVariable: (property: keyof ThemeVariables, value: string) => void;

  /**
   * Subscribe to theme changes
   */
  subscribe: (callback: ThemeChangeCallback) => () => void;

  /**
   * Get theme performance metrics
   */
  getPerformanceMetrics: () => ThemePerformanceMetrics;
}

// ============================================================================
// HOOK TYPES
// ============================================================================

/**
 * Theme change callback function
 */
export type ThemeChangeCallback = (
  newTheme: ThemeName,
  previousTheme?: ThemeName,
  context?: ThemeContextValue
) => void;

/**
 * useTheme hook return type
 */
export interface UseThemeReturn extends ThemeContextValue {
  /**
   * Toggle between two specific themes
   */
  toggleTheme: (themeA: ThemeName, themeB: ThemeName) => void;

  /**
   * Cycle through available themes
   */
  cycleTheme: () => void;

  /**
   * Reset to default theme
   */
  resetTheme: () => void;

  /**
   * Get theme preference from system
   */
  getSystemPreference: () => 'light' | 'dark' | null;

  /**
   * Check if current theme matches system preference
   */
  matchesSystemPreference: () => boolean;
}

/**
 * useThemeManager hook configuration
 */
export interface UseThemeManagerConfig {
  /**
   * Whether to auto-initialize the theme manager
   */
  autoInit?: boolean;

  /**
   * Default theme to use
   */
  defaultTheme?: ThemeName;

  /**
   * Whether to respect system preferences
   */
  respectSystemPreference?: boolean;

  /**
   * Whether to enable persistence
   */
  enablePersistence?: boolean;

  /**
   * Custom storage key for persistence
   */
  storageKey?: string;

  /**
   * Callback when theme changes
   */
  onThemeChange?: ThemeChangeCallback;

  /**
   * Callback when initialization completes
   */
  onInitialized?: (theme: ThemeName) => void;

  /**
   * Callback when errors occur
   */
  onError?: (error: Error) => void;
}

/**
 * useThemeManager hook return type
 */
export interface UseThemeManagerReturn {
  /**
   * Theme manager instance
   */
  manager: ThemeManager | null;

  /**
   * Current theme state
   */
  theme: ThemeName;

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
   * Initialization state
   */
  isInitialized: boolean;

  /**
   * Set theme function
   */
  setTheme: (theme: ThemeName) => Promise<void>;

  /**
   * Initialize the theme manager
   */
  initialize: () => Promise<void>;

  /**
   * Destroy the theme manager
   */
  destroy: () => void;
}

/**
 * useThemeTransition hook configuration
 */
export interface UseThemeTransitionConfig {
  /**
   * Transition duration in milliseconds
   */
  duration?: number;

  /**
   * Transition easing function
   */
  easing?: string;

  /**
   * Elements to apply transition to
   */
  elements?: (HTMLElement | RefObject<HTMLElement>)[];

  /**
   * CSS properties to transition
   */
  properties?: string[];

  /**
   * Whether to disable transitions on initial load
   */
  disableOnLoad?: boolean;

  /**
   * Callback when transition starts
   */
  onTransitionStart?: (from: ThemeName, to: ThemeName) => void;

  /**
   * Callback when transition ends
   */
  onTransitionEnd?: (theme: ThemeName) => void;
}

/**
 * useThemeTransition hook return type
 */
export interface UseThemeTransitionReturn {
  /**
   * Whether a transition is currently active
   */
  isTransitioning: boolean;

  /**
   * Start a theme transition
   */
  startTransition: (toTheme: ThemeName) => Promise<void>;

  /**
   * Enable transitions
   */
  enableTransitions: () => void;

  /**
   * Disable transitions
   */
  disableTransitions: () => void;

  /**
   * Get transition duration
   */
  getTransitionDuration: () => number;

  /**
   * Set transition duration
   */
  setTransitionDuration: (duration: number) => void;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Theme CSS variable keys
 */
export type ThemeCSSVariableKey = keyof ThemeVariables;

/**
 * Theme color property keys
 */
export type ThemeColorKey = keyof ThemeConfig['colors'];

/**
 * Theme surface property keys
 */
export type ThemeSurfaceKey = keyof ThemeConfig['surfaces']['light'];

/**
 * Theme typography property keys
 */
export type ThemeTypographyKey = keyof ThemeConfig['typography'];

/**
 * Theme spacing property keys
 */
export type ThemeSpacingKey = keyof ThemeConfig['spacing'];

/**
 * Theme border radius property keys
 */
export type ThemeBorderRadiusKey = keyof ThemeConfig['borderRadius'];

/**
 * Theme shadow property keys
 */
export type ThemeShadowKey = keyof ThemeConfig['shadows'];

/**
 * Theme animation property keys
 */
export type ThemeAnimationKey = keyof ThemeConfig['animations'];

/**
 * Deep partial type for theme configurations
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Partial theme configuration
 */
export type PartialThemeConfig = DeepPartial<ThemeConfig>;

/**
 * Theme override configuration
 */
export type ThemeOverride = {
  [K in ThemeName]?: PartialThemeConfig;
};

/**
 * Theme selector function type
 */
export type ThemeSelector<T> = (theme: ThemeConfig) => T;

/**
 * Theme validator function type
 */
export type ThemeValidator = (config: ThemeConfig) => ThemeValidationResult;

/**
 * Theme transformer function type
 */
export type ThemeTransformer = (config: ThemeConfig) => ThemeConfig;

// ============================================================================
// PERFORMANCE TYPES
// ============================================================================

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
   * Memory usage for theme data in bytes
   */
  memoryUsage: number;

  /**
   * Cache hit rate (0-1)
   */
  cacheHitRate: number;

  /**
   * Theme bundle size in bytes
   */
  bundleSize: number;

  /**
   * Number of DOM mutations during theme application
   */
  domMutations: number;

  /**
   * Time to first paint after theme change
   */
  timeToFirstPaint: number;

  /**
   * Time to largest contentful paint after theme change
   */
  timeToLCP: number;
}

/**
 * Theme performance monitor configuration
 */
export interface ThemePerformanceMonitorConfig {
  /**
   * Whether to enable performance monitoring
   */
  enabled?: boolean;

  /**
   * Sampling rate (0-1)
   */
  sampleRate?: number;

  /**
   * Buffer size for metrics
   */
  bufferSize?: number;

  /**
   * Whether to report metrics to console
   */
  reportToConsole?: boolean;

  /**
   * Custom metrics reporter function
   */
  reporter?: (metrics: ThemePerformanceMetrics) => void;
}

// ============================================================================
// COMPONENT INTEGRATION TYPES
// ============================================================================

/**
 * Component theme props interface
 */
export interface ComponentThemeProps {
  /**
   * Theme override for this component instance
   */
  theme?: ThemeName;

  /**
   * Whether to use theme transitions
   */
  enableThemeTransitions?: boolean;

  /**
   * Custom theme variables to apply
   */
  themeVariables?: Partial<ThemeVariables>;

  /**
   * Theme variant to apply
   */
  themeVariant?: 'light' | 'dark' | 'auto';

  /**
   * Whether to inherit theme from parent
   */
  inheritTheme?: boolean;
}

/**
 * Theme-aware component props
 */
export type WithTheme<T = {}> = T & ComponentThemeProps;

/**
 * Theme component wrapper props
 */
export interface ThemeComponentProps extends ComponentThemeProps {
  /**
   * Child components
   */
  children: ReactNode;

  /**
   * CSS class name to apply
   */
  className?: string;

  /**
   * HTML element to render as
   */
  as?: keyof JSX.IntrinsicElements;

  /**
   * Additional props to pass to the element
   */
  elementProps?: Record<string, any>;
}

// ============================================================================
// STORYBOOK INTEGRATION TYPES
// ============================================================================

/**
 * Storybook theme decorator configuration
 */
export interface StorybookThemeDecoratorConfig {
  /**
   * Available themes for the toolbar
   */
  themes: Array<{
    name: ThemeName;
    title: string;
    icon?: string;
  }>;

  /**
   * Default theme for stories
   */
  defaultTheme?: ThemeName;

  /**
   * Whether to apply theme to the entire canvas
   */
  applyToCanvas?: boolean;

  /**
   * CSS selector for the theme container
   */
  themeSelector?: string;

  /**
   * Whether to persist theme selection
   */
  persistSelection?: boolean;
}

/**
 * Storybook theme toolbar configuration
 */
export interface StorybookThemeToolbarConfig {
  /**
   * Toolbar title
   */
  title: string;

  /**
   * Toolbar description
   */
  description?: string;

  /**
   * Default value
   */
  defaultValue: ThemeName;

  /**
   * Available options
   */
  options: Record<ThemeName, string>;

  /**
   * Option icons
   */
  icons?: Record<ThemeName, string>;
}

// ============================================================================
// THEME MANAGER CLASS TYPE
// ============================================================================

/**
 * Theme manager class interface
 */
export interface ThemeManager {
  /**
   * Initialize the theme manager
   */
  initialize(): Promise<void>;

  /**
   * Set the active theme
   */
  setTheme(theme: ThemeName): Promise<void>;

  /**
   * Get the current theme
   */
  getCurrentTheme(): ThemeName;

  /**
   * Get available themes
   */
  getAvailableThemes(): ThemeName[];

  /**
   * Get theme configuration
   */
  getThemeConfig(theme: ThemeName): ThemeConfig | null;

  /**
   * Register a new theme
   */
  registerTheme(config: ThemeConfig): void;

  /**
   * Unregister a theme
   */
  unregisterTheme(theme: ThemeName): void;

  /**
   * Validate a theme
   */
  validateTheme(theme: ThemeName): Promise<ThemeValidationResult>;

  /**
   * Apply theme to element
   */
  applyThemeToElement(element: HTMLElement, theme?: ThemeName): void;

  /**
   * Remove theme from element
   */
  removeThemeFromElement(element: HTMLElement): void;

  /**
   * Subscribe to theme changes
   */
  subscribe(callback: ThemeChangeCallback): () => void;

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): ThemePerformanceMetrics;

  /**
   * Destroy the theme manager
   */
  destroy(): void;
}

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

export type {
  // Component integration types
  ComponentThemeProps,
  DeepPartial,
  PartialThemeConfig,
  // Storybook integration types
  StorybookThemeDecoratorConfig,
  StorybookThemeToolbarConfig,
  ThemeAnimationKey,
  ThemeBorderRadiusKey,
  // Hook types
  ThemeChangeCallback,
  ThemeColorKey,
  ThemeComponentProps,
  ThemeContextValue,
  // Utility types
  ThemeCSSVariableKey,
  // Theme manager class
  ThemeManager,
  ThemeOverride,
  // Performance types
  ThemePerformanceMetrics,
  ThemePerformanceMonitorConfig,
  // Context types
  // ThemeProviderProps, // Temporarily commented due to duplicate export error
  ThemeSelector,
  ThemeShadowKey,
  ThemeSpacingKey,
  ThemeSurfaceKey,
  ThemeTransformer,
  ThemeTypographyKey,
  ThemeValidator,
  UseThemeManagerConfig,
  UseThemeManagerReturn,
  UseThemeReturn,
  UseThemeTransitionConfig,
  UseThemeTransitionReturn,
  WithTheme,
};
