/**
 * Theme Manager Type Definitions
 * 
 * TypeScript types and interfaces for the Atomix Design System theme management system.
 */

import type { ThemeManager as ThemeManagerType } from './ThemeManager';

/**
 * Theme metadata interface matching themes.config.js structure
 */
export interface ThemeMetadata {
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
}

/**
 * Theme manager configuration options
 */
export interface ThemeManagerConfig {
    /** Available themes metadata */
    themes: Record<string, ThemeMetadata>;
    /** Default theme to use */
    defaultTheme?: string;
    /** Base path for theme CSS files */
    basePath?: string;
    /** CDN path for theme CSS files (optional) */
    cdnPath?: string | null;
    /** Themes to preload on initialization */
    preload?: string[];
    /** Enable lazy loading of themes */
    lazy?: boolean;
    /** localStorage key for persistence */
    storageKey?: string;
    /** Data attribute name for theme */
    dataAttribute?: string;
    /** Enable persistence */
    enablePersistence?: boolean;
    /** Custom CSS file extension */
    cssExtension?: string;
    /** Use minified CSS files */
    useMinified?: boolean;
    /** Callback when theme changes */
    onThemeChange?: (theme: string) => void;
    /** Callback when theme load fails */
    onError?: (error: Error, themeName: string) => void;
}

/**
 * Theme change event payload
 */
export interface ThemeChangeEvent {
    /** Previous theme name */
    previousTheme: string | null;
    /** New theme name */
    currentTheme: string;
    /** Timestamp of the change */
    timestamp: number;
    /** Whether the change was from user action or system */
    source: 'user' | 'system' | 'storage';
}

/**
 * Theme load options
 */
export interface ThemeLoadOptions {
    /** Force reload even if already loaded */
    force?: boolean;
    /** Preload without applying */
    preload?: boolean;
    /** Remove previous theme CSS */
    removePrevious?: boolean;
    /** Custom CSS path override */
    customPath?: string;
    /** Fallback to default theme on error */
    fallbackOnError?: boolean;
}

/**
 * Theme validation result
 */
export interface ThemeValidationResult {
    /** Whether the theme is valid */
    valid: boolean;
    /** Validation errors */
    errors: string[];
    /** Validation warnings */
    warnings: string[];
}

/**
 * Theme manager event types
 */
export type ThemeManagerEvent = 'themeChange' | 'themeLoad' | 'themeError';

/**
 * Theme change callback function
 */
export type ThemeChangeCallback = (event: ThemeChangeEvent) => void;

/**
 * Theme load callback function
 */
export type ThemeLoadCallback = (themeName: string) => void;

/**
 * Theme error callback function
 */
export type ThemeErrorCallback = (error: Error, themeName: string) => void;

/**
 * Event listener map
 */
export interface ThemeEventListeners {
    themeChange: ThemeChangeCallback[];
    themeLoad: ThemeLoadCallback[];
    themeError: ThemeErrorCallback[];
}

/**
 * React hook options for useTheme
 */
export interface UseThemeOptions {
    /** Default theme (overrides ThemeProvider default) */
    defaultTheme?: string;
    /** Enable persistence for this hook instance */
    enablePersistence?: boolean;
    /** Custom storage key */
    storageKey?: string;
    /** Callback when theme changes */
    onChange?: (theme: string) => void;
}

/**
 * React hook return type for useTheme
 */
export interface UseThemeReturn {
    /** Current theme name */
    theme: string;
    /** Function to change theme */
    setTheme: (theme: string, options?: ThemeLoadOptions) => Promise<void>;
    /** Available themes */
    availableThemes: ThemeMetadata[];
    /** Whether a theme is currently loading */
    isLoading: boolean;
    /** Current error, if any */
    error: Error | null;
    /** Whether a specific theme is loaded */
    isThemeLoaded: (themeName: string) => boolean;
    /** Preload a theme */
    preloadTheme: (themeName: string) => Promise<void>;
}

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
    /** Child components */
    children: React.ReactNode;
    /** Default theme */
    defaultTheme?: string;
    /** Available themes */
    themes?: Record<string, ThemeMetadata>;
    /** Base path for theme CSS */
    basePath?: string;
    /** CDN path for theme CSS */
    cdnPath?: string | null;
    /** Themes to preload */
    preload?: string[];
    /** Enable lazy loading */
    lazy?: boolean;
    /** localStorage key */
    storageKey?: string;
    /** Data attribute name */
    dataAttribute?: string;
    /** Enable persistence */
    enablePersistence?: boolean;
    /** Use minified CSS */
    useMinified?: boolean;
    /** Callback when theme changes */
    onThemeChange?: (theme: string) => void;
    /** Callback on error */
    onError?: (error: Error, themeName: string) => void;
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
    /** Current theme */
    theme: string;
    /** Set theme function */
    setTheme: (theme: string, options?: ThemeLoadOptions) => Promise<void>;
    /** Available themes */
    availableThemes: ThemeMetadata[];
    /** Loading state */
    isLoading: boolean;
    /** Error state */
    error: Error | null;
    /** Check if theme is loaded */
    isThemeLoaded: (themeName: string) => boolean;
    /** Preload theme */
    preloadTheme: (themeName: string) => Promise<void>;
    /** Theme manager instance */
    themeManager: ThemeManagerType;
}

/**
 * Storage adapter interface for custom storage implementations
 */
export interface StorageAdapter {
    /** Get item from storage */
    getItem(key: string): string | null;
    /** Set item in storage */
    setItem(key: string, value: string): void;
    /** Remove item from storage */
    removeItem(key: string): void;
    /** Check if storage is available */
    isAvailable(): boolean;
}
