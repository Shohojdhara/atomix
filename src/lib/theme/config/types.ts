/**
 * Theme Configuration Types
 * 
 * Type definitions for the theme configuration system
 */

import type {
  AtomixConfig,
  BuildConfig,
  RuntimeConfig,
  IntegrationConfig,
  ThemeDefinition,
  CSSThemeDefinition,
  JSThemeDefinition,
} from '../../config';

/**
 * Configuration loader options
 */
export interface ConfigLoaderOptions {
  /** Path to theme config file (default: 'theme.config.ts') */
  configPath?: string;
  /** Enable validation */
  validate?: boolean;
  /** Environment-specific overrides */
  env?: 'development' | 'production' | 'test';
}

/**
 * Loaded and validated theme configuration
 */
export interface LoadedThemeConfig {
  /** Registered themes */
  themes: Record<string, ThemeDefinition>;
  /** Build configuration */
  build: BuildConfig;
  /** Runtime configuration */
  runtime: RuntimeConfig;
  /** Integration settings */
  integration: IntegrationConfig;
  /** Theme dependencies mapping */
  dependencies: Record<string, string[]>;
  /** Whether config was validated */
  validated: boolean;
  /** Validation errors (if any) */
  errors?: string[];
  /** Validation warnings (if any) */
  warnings?: string[];
  /** Internal tokens (for generator) */
  __tokens?: any;
  /** Internal extensions (for generator) */
  __extend?: any;
}

/**
 * Theme metadata extracted from config
 */
export interface ThemeMetadata {
  /** Theme identifier */
  id: string;
  /** Display name */
  name: string;
  /** Theme type */
  type: 'css' | 'js';
  /** Class name for CSS themes */
  class?: string;
  /** Description */
  description?: string;
  /** Author */
  author?: string;
  /** Version */
  version?: string;
  /** Tags */
  tags?: string[];
  /** Supports dark mode */
  supportsDarkMode?: boolean;
  /** Status */
  status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
  /** Accessibility info */
  a11y?: {
    contrastTarget?: number;
    modes?: string[];
  };
  /** Primary color */
  color?: string;
  /** Features */
  features?: string[];
  /** Dependencies */
  dependencies?: string[];
}

/**
 * Configuration validation result
 */
export interface ConfigValidationResult {
  /** Whether config is valid */
  valid: boolean;
  /** Validation errors */
  errors: string[];
  /** Validation warnings */
  warnings: string[];
}

export type {
  AtomixConfig,
  ThemeDefinition,
  CSSThemeDefinition,
  JSThemeDefinition,
  BuildConfig,
  RuntimeConfig,
  IntegrationConfig,
};
