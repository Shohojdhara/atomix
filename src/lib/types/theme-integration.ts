/**
 * Theme System Integration Types
 * TypeScript definitions for integrating the theme system with build tools,
 * bundlers, testing frameworks, and external libraries
 */

import type { ThemeName, ThemeVariables } from './components.js';

// ============================================================================
// BUILD SYSTEM INTEGRATION
// ============================================================================

/**
 * Webpack plugin configuration for theme system
 */
export interface WebpackThemePluginConfig {
  /**
   * Source directory for theme files
   */
  themesDir: string;

  /**
   * Output directory for compiled themes
   */
  outputDir: string;

  /**
   * Whether to generate CSS files for each theme
   */
  generateCSS: boolean;

  /**
   * Whether to generate TypeScript declaration files
   */
  generateTypes: boolean;

  /**
   * Whether to minify the output
   */
  minify: boolean;

  /**
   * Whether to generate source maps
   */
  sourceMaps: boolean;

  /**
   * Custom CSS variable prefix
   */
  cssVariablePrefix?: string;

  /**
   * Themes to include in the build
   */
  includeThemes?: ThemeName[];

  /**
   * Themes to exclude from the build
   */
  excludeThemes?: ThemeName[];
}

/**
 * Rollup plugin configuration for theme system
 */
export interface RollupThemePluginConfig extends Omit<WebpackThemePluginConfig, 'sourceMaps'> {
  /**
   * Whether to generate source maps
   */
  sourcemap: boolean;

  /**
   * External dependencies to exclude from bundling
   */
  external?: string[];

  /**
   * Output format for theme bundles
   */
  format?: 'es' | 'cjs' | 'umd' | 'iife';
}

/**
 * Vite plugin configuration for theme system
 */
export interface ViteThemePluginConfig extends WebpackThemePluginConfig {
  /**
   * Whether to enable HMR for theme changes
   */
  hmr: boolean;

  /**
   * Dev server port for theme preview
   */
  devPort?: number;

  /**
   * Whether to optimize themes for production
   */
  optimize: boolean;
}

// ============================================================================
// TESTING INTEGRATION
// ============================================================================

/**
 * Jest configuration for theme testing
 */
export interface JestThemeConfig {
  /**
   * Mock theme provider for tests
   */
  mockThemeProvider: boolean;

  /**
   * Default theme for tests
   */
  defaultTestTheme: ThemeName;

  /**
   * Whether to mock CSS custom properties
   */
  mockCSSProperties: boolean;

  /**
   * Custom theme test utilities
   */
  testUtils?: {
    /**
     * Render component with theme
     */
    renderWithTheme: (component: React.ReactElement, theme?: ThemeName) => any;

    /**
     * Create theme test wrapper
     */
    createThemeWrapper: (theme?: ThemeName) => React.ComponentType;

    /**
     * Assert theme variables
     */
    expectThemeVariables: (element: HTMLElement, variables: Partial<ThemeVariables>) => void;
  };
}

/**
 * Cypress configuration for theme testing
 */
export interface CypressThemeConfig {
  /**
   * Commands for theme testing
   */
  commands: {
    /**
     * Set theme in Cypress tests
     */
    setTheme: (theme: ThemeName) => void;

    /**
     * Get current theme in tests
     */
    getCurrentTheme: () => Cypress.Chainable<ThemeName>;

    /**
     * Assert theme variables in DOM
     */
    assertThemeVariables: (variables: Partial<ThemeVariables>) => void;

    /**
     * Take screenshot with theme
     */
    screenshotWithTheme: (name: string, theme: ThemeName) => void;
  };

  /**
   * Theme-specific test data
   */
  testData: {
    /**
     * Available themes for testing
     */
    themes: ThemeName[];

    /**
     * Test color values
     */
    testColors: Record<string, string>;

    /**
     * Accessibility test configurations
     */
    a11yConfig: {
      contrastThreshold: number;
      colorBlindnessSimulation: boolean;
    };
  };
}

/**
 * Playwright configuration for theme testing
 */
export interface PlaywrightThemeConfig {
  /**
   * Theme fixtures for Playwright tests
   */
  fixtures: {
    /**
     * Theme page fixture
     */
    themePage: any; // Playwright Page with theme utilities

    /**
     * Theme context fixture
     */
    themeContext: {
      setTheme: (theme: ThemeName) => Promise<void>;
      getTheme: () => Promise<ThemeName>;
      waitForThemeChange: () => Promise<void>;
    };
  };

  /**
   * Visual regression testing configuration
   */
  visualRegression: {
    /**
     * Whether to enable visual testing
     */
    enabled: boolean;

    /**
     * Themes to test visually
     */
    themes: ThemeName[];

    /**
     * Viewport sizes for testing
     */
    viewports: Array<{ width: number; height: number }>;

    /**
     * Threshold for visual differences
     */
    threshold: number;
  };
}

// ============================================================================
// STORYBOOK INTEGRATION
// ============================================================================

/**
 * Storybook addon configuration for themes
 */
export interface StorybookThemeAddonConfig {
  /**
   * Available themes for Storybook
   */
  themes: Array<{
    name: ThemeName;
    title: string;
    icon?: string;
    description?: string;
  }>;

  /**
   * Default theme for stories
   */
  defaultTheme: ThemeName;

  /**
   * Whether to apply theme to entire canvas
   */
  applyToCanvas: boolean;

  /**
   * Whether to show theme selector in toolbar
   */
  showToolbar: boolean;

  /**
   * Whether to persist theme selection
   */
  persistSelection: boolean;

  /**
   * Custom CSS selector for theme container
   */
  themeSelector?: string;

  /**
   * Whether to enable theme transitions
   */
  enableTransitions: boolean;

  /**
   * Transition duration in milliseconds
   */
  transitionDuration: number;
}

/**
 * Storybook theme decorator function type
 */
export type StorybookThemeDecorator = (
  Story: React.ComponentType,
  context: {
    globals: { theme: ThemeName };
    parameters: any;
  }
) => React.ReactElement;

// ============================================================================
// DESIGN TOOLS INTEGRATION
// ============================================================================

/**
 * Figma plugin configuration for theme export
 */
export interface FigmaThemePluginConfig {
  /**
   * Figma API token
   */
  apiToken: string;

  /**
   * Figma file ID
   */
  fileId: string;

  /**
   * Node IDs for theme tokens
   */
  tokenNodes: string[];

  /**
   * Export format
   */
  exportFormat: 'json' | 'css' | 'scss' | 'ts';

  /**
   * Whether to include semantic tokens
   */
  includeSemanticTokens: boolean;

  /**
   * Custom token mapping
   */
  tokenMapping?: Record<string, string>;
}

/**
 * Sketch plugin configuration for theme export
 */
export interface SketchThemePluginConfig {
  /**
   * Sketch document path
   */
  documentPath: string;

  /**
   * Symbol library for themes
   */
  symbolLibrary: string;

  /**
   * Export settings
   */
  exportSettings: {
    format: 'json' | 'css' | 'scss';
    includeAssets: boolean;
    assetFormat: 'svg' | 'png' | 'jpg';
  };
}

// ============================================================================
// DOCUMENTATION INTEGRATION
// ============================================================================

/**
 * Docusaurus plugin configuration for theme documentation
 */
export interface DocusaurusThemePluginConfig {
  /**
   * Documentation source directory
   */
  docsDir: string;

  /**
   * Theme showcase component path
   */
  showcaseComponent: string;

  /**
   * Whether to generate theme pages automatically
   */
  autoGeneratePages: boolean;

  /**
   * Custom theme for documentation site
   */
  docTheme?: ThemeName;

  /**
   * Whether to include interactive examples
   */
  includeInteractiveExamples: boolean;
}

/**
 * Gitbook integration configuration
 */
export interface GitbookThemeConfig {
  /**
   * Gitbook space ID
   */
  spaceId: string;

  /**
   * API token for Gitbook
   */
  apiToken: string;

  /**
   * Theme documentation structure
   */
  structure: {
    /**
     * Main theme guide page
     */
    mainPage: string;

    /**
     * Individual theme pages
     */
    themePages: Record<ThemeName, string>;

    /**
     * Component documentation pages
     */
    componentPages: string[];
  };
}

// ============================================================================
// MONITORING AND ANALYTICS
// ============================================================================

/**
 * Theme analytics configuration
 */
export interface ThemeAnalyticsConfig {
  /**
   * Analytics provider
   */
  provider: 'google-analytics' | 'mixpanel' | 'amplitude' | 'custom';

  /**
   * Tracking ID or API key
   */
  trackingId: string;

  /**
   * Events to track
   */
  events: {
    /**
     * Track theme changes
     */
    themeChange: boolean;

    /**
     * Track theme loading performance
     */
    performance: boolean;

    /**
     * Track theme errors
     */
    errors: boolean;

    /**
     * Track user preferences
     */
    preferences: boolean;
  };

  /**
   * Custom event properties
   */
  customProperties?: Record<string, any>;

  /**
   * Sampling rate (0-1)
   */
  samplingRate?: number;
}

/**
 * Performance monitoring configuration
 */
export interface ThemePerformanceMonitorConfig {
  /**
   * Monitoring provider
   */
  provider: 'web-vitals' | 'lighthouse' | 'speedcurve' | 'custom';

  /**
   * API configuration
   */
  apiConfig: {
    endpoint: string;
    apiKey?: string;
    headers?: Record<string, string>;
  };

  /**
   * Metrics to monitor
   */
  metrics: {
    /**
     * Theme loading time
     */
    loadTime: boolean;

    /**
     * Theme application time
     */
    applyTime: boolean;

    /**
     * First contentful paint impact
     */
    fcp: boolean;

    /**
     * Largest contentful paint impact
     */
    lcp: boolean;

    /**
     * Cumulative layout shift
     */
    cls: boolean;
  };

  /**
   * Alert thresholds
   */
  thresholds: {
    loadTime: number;
    applyTime: number;
    fcp: number;
    lcp: number;
    cls: number;
  };
}

// ============================================================================
// EXPORT ALL INTEGRATION TYPES
// ============================================================================

export type {
  CypressThemeConfig,
  // Documentation types
  DocusaurusThemePluginConfig,
  // Design tools types
  FigmaThemePluginConfig,
  GitbookThemeConfig,
  // Testing types
  JestThemeConfig,
  PlaywrightThemeConfig,
  RollupThemePluginConfig,
  SketchThemePluginConfig,
  // Storybook types
  StorybookThemeAddonConfig,
  StorybookThemeDecorator,
  // Monitoring types
  ThemeAnalyticsConfig,
  ThemePerformanceMonitorConfig,
  ViteThemePluginConfig,
  // Build system types
  WebpackThemePluginConfig,
};
