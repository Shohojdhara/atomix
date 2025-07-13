/**
 * Atomix Design System - Theme Types
 * Main TypeScript declaration file for the Shaj theme system
 *
 * This file provides all theme-related types for external consumption
 * and ensures proper TypeScript support for the theme system.
 */

// Re-export all types from the lib/types directory
export * from './lib/types/index.js';

// Additional global type declarations for theme system
declare global {
  interface Window {
    /**
     * Global Atomix theme registry
     */
    Atomix?: {
      /**
       * Theme manager instance
       */
      ThemeManager?: import('./lib/types/index.js').ThemeManager;

      /**
       * Available themes registry
       */
      themes?: Record<
        import('./lib/types/index.js').ThemeName,
        import('./lib/types/index.js').ThemeConfig
      >;

      /**
       * Current active theme
       */
      currentTheme?: import('./lib/types/index.js').ThemeName;

      /**
       * Theme utilities
       */
      themeUtils?: {
        /**
         * Apply theme to element
         */
        applyTheme: (element: HTMLElement, theme: import('./lib/types/index.js').ThemeName) => void;

        /**
         * Remove theme from element
         */
        removeTheme: (element: HTMLElement) => void;

        /**
         * Get theme variables
         */
        getThemeVariables: (
          theme: import('./lib/types/index.js').ThemeName
        ) => Partial<import('./lib/types/index.js').ThemeVariables>;

        /**
         * Validate theme
         */
        validateTheme: (
          theme: import('./lib/types/index.js').ThemeName
        ) => Promise<import('./lib/types/index.js').ThemeValidationResult>;
      };
    };
  }

  /**
   * CSS custom properties interface extension for theme variables
   */
  interface CSSStyleDeclaration {
    // Atomix theme CSS custom properties
    '--atomix-color-primary-50'?: string;
    '--atomix-color-primary-100'?: string;
    '--atomix-color-primary-200'?: string;
    '--atomix-color-primary-300'?: string;
    '--atomix-color-primary-400'?: string;
    '--atomix-color-primary-500'?: string;
    '--atomix-color-primary-600'?: string;
    '--atomix-color-primary-700'?: string;
    '--atomix-color-primary-800'?: string;
    '--atomix-color-primary-900'?: string;
    '--atomix-color-primary-950'?: string;

    '--atomix-color-secondary-50'?: string;
    '--atomix-color-secondary-100'?: string;
    '--atomix-color-secondary-200'?: string;
    '--atomix-color-secondary-300'?: string;
    '--atomix-color-secondary-400'?: string;
    '--atomix-color-secondary-500'?: string;
    '--atomix-color-secondary-600'?: string;
    '--atomix-color-secondary-700'?: string;
    '--atomix-color-secondary-800'?: string;
    '--atomix-color-secondary-900'?: string;
    '--atomix-color-secondary-950'?: string;

    '--atomix-color-neutral-50'?: string;
    '--atomix-color-neutral-100'?: string;
    '--atomix-color-neutral-200'?: string;
    '--atomix-color-neutral-300'?: string;
    '--atomix-color-neutral-400'?: string;
    '--atomix-color-neutral-500'?: string;
    '--atomix-color-neutral-600'?: string;
    '--atomix-color-neutral-700'?: string;
    '--atomix-color-neutral-800'?: string;
    '--atomix-color-neutral-900'?: string;
    '--atomix-color-neutral-950'?: string;

    '--atomix-color-success-50'?: string;
    '--atomix-color-success-500'?: string;
    '--atomix-color-success-600'?: string;
    '--atomix-color-success-700'?: string;

    '--atomix-color-warning-50'?: string;
    '--atomix-color-warning-500'?: string;
    '--atomix-color-warning-600'?: string;
    '--atomix-color-warning-700'?: string;

    '--atomix-color-error-50'?: string;
    '--atomix-color-error-500'?: string;
    '--atomix-color-error-600'?: string;
    '--atomix-color-error-700'?: string;

    '--atomix-color-info-50'?: string;
    '--atomix-color-info-500'?: string;
    '--atomix-color-info-600'?: string;
    '--atomix-color-info-700'?: string;

    '--atomix-color-background'?: string;
    '--atomix-color-surface'?: string;
    '--atomix-color-surface-variant'?: string;
    '--atomix-color-text'?: string;
    '--atomix-color-text-secondary'?: string;
    '--atomix-color-text-muted'?: string;

    '--atomix-font-family-primary'?: string;
    '--atomix-font-family-secondary'?: string;
    '--atomix-font-family-mono'?: string;
    '--atomix-font-size-base'?: string;
    '--atomix-line-height-base'?: string;

    '--atomix-spacing-unit'?: string;
    '--atomix-spacing-xs'?: string;
    '--atomix-spacing-sm'?: string;
    '--atomix-spacing-md'?: string;
    '--atomix-spacing-lg'?: string;
    '--atomix-spacing-xl'?: string;

    '--atomix-border-radius-sm'?: string;
    '--atomix-border-radius-base'?: string;
    '--atomix-border-radius-lg'?: string;
    '--atomix-border-radius-full'?: string;

    '--atomix-shadow-sm'?: string;
    '--atomix-shadow-base'?: string;
    '--atomix-shadow-lg'?: string;
    '--atomix-shadow-xl'?: string;

    '--atomix-transition-duration'?: string;
    '--atomix-transition-timing'?: string;
  }
}

// Module augmentation for React components to support theme props
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    /**
     * Atomix theme to apply to this element
     */
    'data-atomix-theme'?: import('./lib/types/index.js').ThemeName;

    /**
     * Whether to enable theme transitions for this element
     */
    'data-atomix-theme-transitions'?: boolean;
  }
}

// CSS Modules declaration for theme files
declare module '*.theme.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.theme.scss' {
  const classes: Record<string, string>;
  export default classes;
}

// SCSS variables declaration for theme files
declare module '*.theme.scss' {
  export const themeVariables: import('./lib/types/index.js').ThemeVariables;
}

// JSON theme files declaration
declare module '*.theme.json' {
  const theme: import('./lib/types/index.js').ThemeConfig;
  export default theme;
}

// Theme asset declarations
declare module '*.theme.woff2' {
  const fontUrl: string;
  export default fontUrl;
}

declare module '*.theme.woff' {
  const fontUrl: string;
  export default fontUrl;
}

declare module '*.theme.ttf' {
  const fontUrl: string;
  export default fontUrl;
}

declare module '*.theme.svg' {
  const iconUrl: string;
  export default iconUrl;
}

// Storybook global types for theme addon
declare module '@storybook/addons' {
  interface GlobalTypes {
    theme: {
      description: string;
      defaultValue: import('./lib/types/index.js').ThemeName;
      toolbar: {
        title: string;
        icon: string;
        items: Array<{
          value: import('./lib/types/index.js').ThemeName;
          title: string;
          icon?: string;
        }>;
        dynamicTitle: boolean;
      };
    };
  }
}

// Environment variables for theme system
declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Default theme for the application
     */
    ATOMIX_DEFAULT_THEME?: import('./lib/types/index.js').ThemeName;

    /**
     * Whether to enable theme debugging
     */
    ATOMIX_THEME_DEBUG?: 'true' | 'false';

    /**
     * Theme cache duration in milliseconds
     */
    ATOMIX_THEME_CACHE_DURATION?: string;

    /**
     * Whether to enable theme performance monitoring
     */
    ATOMIX_THEME_PERFORMANCE_MONITORING?: 'true' | 'false';

    /**
     * Theme CDN base URL
     */
    ATOMIX_THEME_CDN_URL?: string;

    /**
     * Theme API endpoint
     */
    ATOMIX_THEME_API_ENDPOINT?: string;
  }
}

// Export type-only imports for better tree-shaking
export type {
  // Component integration types
  ComponentThemeProps,
  CypressThemeConfig,
  DeepPartial,
  DocusaurusThemePluginConfig,
  FigmaThemePluginConfig,
  GitbookThemeConfig,
  JestThemeConfig,
  PartialThemeConfig,
  PlaywrightThemeConfig,
  RollupThemePluginConfig,
  SketchThemePluginConfig,
  StorybookThemeAddonConfig,
  StorybookThemeDecorator,
  ThemeAnalyticsConfig,
  ThemeAnimationKey,
  ThemeBorderRadiusKey,
  // Utility types
  ThemeCSSVariableKey,
  ThemeColorKey,
  ThemeComponentProps,
  ThemeConfig,
  ThemeContextValue,
  ThemeManagerOptions,
  // Core theme types
  ThemeName,
  ThemeOverride,
  // Performance types
  ThemePerformanceMetrics,
  ThemePerformanceMonitorConfig,
  // React integration types
  ThemeProviderProps,
  ThemeSelector,
  ThemeShadowKey,
  ThemeSpacingKey,
  ThemeSurfaceKey,
  ThemeTransformer,
  ThemeTypographyKey,
  ThemeValidationResult,
  ThemeValidator,
  ThemeVariables,
  UseThemeManagerConfig,
  UseThemeManagerReturn,
  UseThemeReturn,
  UseThemeTransitionConfig,
  UseThemeTransitionReturn,
  ViteThemePluginConfig,
  // Integration types
  WebpackThemePluginConfig,
  WithTheme,
} from './lib/types/index.js';
