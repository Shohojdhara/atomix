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

// Export loader functions
export { loadAtomixConfig, resolveConfigPath } from './loader';

export default AtomixConfig;
