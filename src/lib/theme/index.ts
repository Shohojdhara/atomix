/**
 * Theme Module Entry Point
 * 
 * Exports all theme management utilities for the Atomix Design System
 */

// Core theme manager
export { ThemeManager } from './ThemeManager';
export { default as ThemeManagerDefault } from './ThemeManager';

// React integration
export { ThemeProvider } from './ThemeProvider';
export { default as ThemeProviderDefault } from './ThemeProvider';
export { useTheme } from './useTheme';
export { default as useThemeDefault } from './useTheme';
export { ThemeContext } from './ThemeContext';
export { default as ThemeContextDefault } from './ThemeContext';

// Types
export type {
    ThemeMetadata,
    ThemeManagerConfig,
    ThemeChangeEvent,
    ThemeLoadOptions,
    ThemeValidationResult,
    ThemeManagerEvent,
    ThemeChangeCallback,
    ThemeLoadCallback,
    ThemeErrorCallback,
    ThemeEventListeners,
    UseThemeOptions,
    UseThemeReturn,
    ThemeProviderProps,
    ThemeContextValue,
    StorageAdapter,
} from './types';

// Utilities
export {
    isBrowser,
    isServer,
    getThemeLinkId,
    buildThemePath,
    loadThemeCSS,
    removeThemeCSS,
    removeAllThemeCSS,
    applyThemeAttributes,
    removeThemeAttributes,
    getCurrentThemeFromDOM,
    getSystemTheme,
    isThemeLoaded,
    validateThemeMetadata,
    isValidThemeName,
    createLocalStorageAdapter,
    debounce,
} from './utils';
