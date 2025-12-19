/**
 * Atomix Configuration System
 * 
 * Centralized configuration schema for the Atomix Design System.
 * Supports Tailwind-like token definitions and theme registration.
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
 */
export interface AtomixConfig {
    /** Theme configuration and registration */
    theme?: {
        /** Extend the default tokens */
        extend?: ThemeTokens;
        /** Override the default tokens entirely */
        tokens?: ThemeTokens;
        /** Registered themes (migrated from theme.config.ts) */
        themes?: Record<string, ThemeDefinition>;
    };
    /** Build configuration (migrated from theme.config.ts) */
    build?: BuildConfig;
    /** Runtime configuration (migrated from theme.config.ts) */
    runtime?: RuntimeConfig;
    /** Integration settings (migrated from theme.config.ts) */
    integration?: IntegrationConfig;
    /** Theme dependencies mapping (migrated from theme.config.ts) */
    dependencies?: Record<string, string[]>;
}

/**
 * Helper function to define Atomix configuration with type safety
 * 
 * @param config - Atomix configuration object
 * @returns The configuration object
 */
export function defineConfig(config: AtomixConfig): AtomixConfig {
    return config;
}

export default AtomixConfig;
