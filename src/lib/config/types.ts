/**
 * Configuration Types
 * 
 * Type definitions for the Atomix configuration system.
 */

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
 * Theme tokens structure - maps to CSS custom properties
 */
export type ThemeTokens = {
  [K in DesignTokenCategory]?: Record<string, DesignTokenValue>;
} & {
  // Allow any additional token categories
  [key: string]: Record<string, DesignTokenValue> | undefined;
};

/**
 * Theme definition - specifies how a theme is defined
 */
export interface ThemeDefinition {
  /** Theme identifier */
  id: string;
  /** Display name */
  name: string;
  /** Theme type */
  type: 'css' | 'js';
  /** CSS class to apply (for CSS themes) */
  class?: string;
  /** Description */
  description?: string;
}

/**
 * CSS-based theme definition
 */
export interface CSSThemeDefinition extends ThemeDefinition {
  type: 'css';
  /** Path to CSS file */
  css: string;
}

/**
 * JavaScript-based theme definition
 */
export interface JSThemeDefinition extends ThemeDefinition {
  type: 'js';
  /** Function to generate theme */
  generate: () => Record<string, string>;
}

/**
 * Build configuration (internal use)
 */
export interface BuildConfig {
  /** Output directory for built themes */
  outputDir?: string;
  /** Whether to minify output */
  minify?: boolean;
  /** Additional files to include */
  include?: string[];
  /** Files to exclude */
  exclude?: string[];
}

/**
 * Runtime configuration (internal use)
 */
export interface RuntimeConfig {
  /** Storage key for theme persistence */
  storageKey?: string;
  /** Default theme to apply */
  defaultTheme?: string;
  /** Whether to enable theme switching */
  enableSwitching?: boolean;
  /** Animation duration for theme transitions */
  transitionDuration?: number;
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
    
    /** 
     * CLI Plugins
     * 
     * Register external or local plugins to extend CLI functionality.
     */
    plugins?: Array<string | { name: string; options?: Record<string, any> }>;

    /** 
     * Token Engine Configuration
     * 
     * Configure design token providers for bi-directional sync.
     */
    tokenEngine?: {
        providers: {
            [key: string]: {
                type: 'figma' | 'json' | 'custom';
                options: Record<string, any>;
            };
        };
        sync: {
            pull: boolean;
            push: boolean;
        };
    };

    /** 
     * AI Configuration
     * 
     * Configure AI-assisted scaffolding.
     */
    ai?: {
        provider: 'openai' | 'anthropic';
        model: string;
        apiKey?: string;
    };

    /** 
     * Telemetry Configuration
     * 
     * Configure performance and telemetry tracking.
     */
    telemetry?: {
        enabled: boolean;
        anonymize: boolean;
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