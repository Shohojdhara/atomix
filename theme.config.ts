/**
 * Atomix Theme Configuration
 * 
 * Global configuration file for the Atomix Design System theme system.
 * This file defines all available themes, build settings, runtime configuration,
 * and integration settings.
 * 
 * @example
 * ```typescript
 * import { loadThemeConfig } from '@shohojdhara/atomix/theme/config';
 * const config = loadThemeConfig();
 * ```
 */

import type { Theme } from './src/lib/theme/types';
import { createTheme } from './src/lib/theme/createTheme';

/**
 * CSS Theme Definition
 * Defines a theme that is loaded from a CSS file
 */
export interface CSSThemeDefinition {
  /** Theme type identifier */
  type: 'css';
  /** Display name of the theme */
  name: string;
  /** Unique identifier/class name for the theme */
  class?: string;
  /** Theme description */
  description?: string;
  /** Theme author */
  author?: string;
  /** Theme version (semver) */
  version?: string;
  /** Theme tags for categorization */
  tags?: string[];
  /** Whether the theme supports dark mode */
  supportsDarkMode?: boolean;
  /** Theme status: stable, beta, experimental, deprecated */
  status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
  /** Accessibility information */
  a11y?: {
    /** Target contrast ratio */
    contrastTarget?: number;
    /** Supported color modes */
    modes?: string[];
  };
  /** Primary theme color (for UI display) */
  color?: string;
  /** Theme features list */
  features?: string[];
  /** Theme dependencies (other themes required) */
  dependencies?: string[];
  /** Custom CSS file path (optional, defaults to theme name) */
  cssPath?: string;
}

/**
 * JavaScript Theme Definition
 * Defines a theme created programmatically using createTheme
 */
export interface JSThemeDefinition {
  /** Theme type identifier */
  type: 'js';
  /** Display name of the theme */
  name: string;
  /** Unique identifier/class name for the theme */
  class?: string;
  /** Theme description */
  description?: string;
  /** Theme author */
  author?: string;
  /** Theme version (semver) */
  version?: string;
  /** Theme tags for categorization */
  tags?: string[];
  /** Whether the theme supports dark mode */
  supportsDarkMode?: boolean;
  /** Theme status: stable, beta, experimental, deprecated */
  status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
  /** Accessibility information */
  a11y?: {
    /** Target contrast ratio */
    contrastTarget?: number;
    /** Supported color modes */
    modes?: string[];
  };
  /** Primary theme color (for UI display) */
  color?: string;
  /** Theme features list */
  features?: string[];
  /** Theme dependencies (other themes required) */
  dependencies?: string[];
  /** Function that creates the theme object */
  createTheme: () => Theme;
}

/**
 * Theme definition (CSS or JS)
 */
export type ThemeDefinition = CSSThemeDefinition | JSThemeDefinition;

/**
 * Build configuration
 */
export interface BuildConfig {
  /** Output directory for compiled themes */
  output: {
    /** Output directory path */
    directory: string;
    /** Output file formats */
    formats: {
      /** Expanded format extension */
      expanded: string;
      /** Compressed format extension */
      compressed: string;
    };
  };
  /** Sass compilation settings */
  sass: {
    /** Output style */
    style: 'expanded' | 'compressed' | 'compact' | 'nested';
    /** Generate source maps */
    sourceMap: boolean;
    /** Additional load paths */
    loadPaths: string[];
  };
}

/**
 * Runtime configuration
 */
export interface RuntimeConfig {
  /** Base path for theme CSS files (relative to public directory) */
  basePath: string;
  /** Optional CDN path for theme files */
  cdnPath?: string | null;
  /** Themes to preload on initialization */
  preload?: string[];
  /** Enable lazy loading of themes */
  lazy?: boolean;
  /** Default theme name */
  defaultTheme: string;
  /** localStorage key for theme persistence */
  storageKey?: string;
  /** Data attribute name for theme */
  dataAttribute?: string;
  /** Enable persistence */
  enablePersistence?: boolean;
  /** Use minified CSS files in production */
  useMinified?: boolean;
}

/**
 * Integration configuration
 */
export interface IntegrationConfig {
  /** CSS variables for theme integration */
  cssVariables: {
    /** Color mode variable name */
    colorMode?: string;
    /** Additional custom variables */
    [key: string]: string | undefined;
  };
  /** Attribute names used for theme and color mode */
  classNames: {
    /** Theme attribute name */
    theme: string;
    /** Color mode attribute name */
    colorMode: string;
  };
}

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
  /** Available themes */
  themes: Record<string, ThemeDefinition>;
  /** Build configuration */
  build: BuildConfig;
  /** Runtime configuration */
  runtime: RuntimeConfig;
  /** Integration settings */
  integration: IntegrationConfig;
  /** Theme dependencies mapping */
  dependencies?: Record<string, string[]>;
}

/**
 * Default build configuration
 */
const defaultBuildConfig: BuildConfig = {
  output: {
    directory: 'themes',
    formats: {
      expanded: '.css',
      compressed: '.min.css',
    },
  },
  sass: {
    style: 'expanded',
    sourceMap: true,
    loadPaths: ['src'],
  },
};

/**
 * Default runtime configuration
 */
const defaultRuntimeConfig: RuntimeConfig = {
  basePath: '/themes',
  cdnPath: null,
  preload: ['shaj-default'],
  lazy: true,
  defaultTheme: 'shaj-default',
  storageKey: 'atomix-theme',
  dataAttribute: 'data-theme',
  enablePersistence: true,
  useMinified: process.env.NODE_ENV === 'production',
};

/**
 * Default integration configuration
 */
const defaultIntegrationConfig: IntegrationConfig = {
  cssVariables: {
    colorMode: '--storybook-color-mode',
  },
  classNames: {
    theme: 'data-theme',
    colorMode: 'data-atomix-color-mode',
  },
};

/**
 * Theme configuration
 * 
 * This is the main configuration object that defines all themes,
 * build settings, runtime behavior, and integration options.
 */
const themeConfig: ThemeConfig = {
  themes: {
    'shaj-default': {
      type: 'css',
      name: 'Shaj Default',
      description: 'The default theme for the Atomix Design System',
      author: 'Shohoj Dhara',
      version: '1.0.0',
      tags: ['default', 'light'],
      supportsDarkMode: true,
      status: 'stable',
      a11y: { contrastTarget: 4.5, modes: ['light', 'dark'] },
      color: '#3b82f6',
    },
    boomdevs: {
      type: 'css',
      name: 'BoomDevs',
      description: 'BoomDevs theme for the Atomix Design System',
      author: 'BoomDevs Team',
      version: '1.0.0',
      tags: ['dark', 'modern'],
      supportsDarkMode: true,
      status: 'beta',
      a11y: { contrastTarget: 4.5, modes: ['light', 'dark'] },
      color: '#8b5cf6',
    },
    esrar: {
      type: 'css',
      name: 'Esrar',
      description: 'Esrar theme for the Atomix Design System',
      author: 'Esrar Team',
      version: '1.0.0',
      tags: ['light', 'minimal'],
      supportsDarkMode: true,
      status: 'beta',
      a11y: { contrastTarget: 4.5, modes: ['light', 'dark'] },
      color: '#10b981',
    },
    mashroom: {
      type: 'css',
      name: 'Mashroom',
      description: 'Mashroom theme for the Atomix Design System',
      author: 'Mashroom Team',
      version: '1.0.0',
      tags: ['dark', 'contrast'],
      supportsDarkMode: true,
      status: 'beta',
      a11y: { contrastTarget: 4.5, modes: ['light', 'dark'] },
      color: '#f59e0b',
    },
    applemix: {
      type: 'css',
      name: 'Applemix',
      description: 'Apple Mac OS 2026 Liquid Glass inspired theme with morphism effects',
      author: 'Atomix Design System',
      version: '1.0.0',
      tags: ['glass', 'apple', 'modern', 'liquid', 'morphism'],
      supportsDarkMode: true,
      features: [
        'Liquid glass morphism effects',
        'Apple-inspired color palette',
        'Chromatic aberration effects',
        'Smooth animations and transitions',
        'AtomixGlass component integration',
        'Comprehensive component overrides',
        'Light and dark mode support',
      ],
      status: 'experimental',
      a11y: { contrastTarget: 4.5, modes: ['light', 'dark'] },
      color: '#f5f5f5',
    },
    flashtrade: {
      type: 'css',
      name: 'Flash Trade',
      description: 'Professional dark crypto perpetuals trading platform theme inspired by flash.trade',
      author: 'Atomix Design System',
      version: '1.1.0',
      tags: ['dark', 'crypto', 'trading', 'glass', 'modern', 'decentralized', 'defi'],
      supportsDarkMode: true,
      features: [
        'Ultra-dark trading interface aesthetic matching flash.trade',
        'Bright cyan (#06b6d4) primary color for brand consistency',
        'High contrast for financial data readability',
        'Trading-focused color palette (green for long/profit, red for short/loss)',
        'Glass morphism effects for modern UI depth',
        'Optimized Inter typography for trading information',
        'Fast animations for real-time data updates',
        'Professional navbar with asset selector bar',
        'Trading cards with hover effects and glass morphism',
        'Comprehensive button styles for trading actions',
        'Price change badges with glow effects',
        'Responsive mobile-first design',
        'AtomixGlass component integration',
      ],
      status: 'stable',
      a11y: { contrastTarget: 4.5, modes: ['dark'] },
      color: '#06b6d4',
    },
  },
  build: defaultBuildConfig,
  runtime: defaultRuntimeConfig,
  integration: defaultIntegrationConfig,
  dependencies: {},
};

/**
 * Helper function to define theme configuration with type safety
 * 
 * @param config - Theme configuration object
 * @returns The configuration object with proper typing
 */
export function defineThemeConfig(config: ThemeConfig): ThemeConfig {
  return config;
}

/**
 * Default export of theme configuration
 */
export default themeConfig;
