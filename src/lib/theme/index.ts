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

// createTheme System
export { createTheme } from './createTheme';
export { default as createThemeDefault } from './createTheme';

// CSS Variable Generation
export {
    generateCSSVariables,
    injectCSS,
    removeInjectedCSS,
    generateSectionVariables,
} from './generateCSSVariables';
export type { GenerateCSSVariablesOptions } from './generateCSSVariables';

// Theme Composition
export {
    deepMerge,
    mergeTheme,
    extendTheme,
    createThemeVariants,
    overrideTheme,
    composeThemes,
    createThemePreset,
} from './composeTheme';

// Theme Utilities
export {
    hexToRgb,
    rgbToHex,
    getLuminance,
    getContrastRatio,
    getContrastText,
    lighten,
    darken,
    alpha,
    emphasize,
    createSpacing,
    spacing,
    getThemeValue,
    isJSTheme,
    breakpointUp,
    breakpointDown,
    breakpointBetween,
    getTypography,
    remToPx,
    pxToRem,
    getShadow,
    createTransition,
    getTransitionDuration,
    getTransitionEasing,
    getZIndex,
} from './themeUtils';

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
    // createTheme System Types
    PaletteColor,
    PaletteOptions,
    TypographyOptions,
    SpacingOptions,
    SpacingFunction,
    BreakpointValues,
    BreakpointsOptions,
    ShadowOptions,
    TransitionOptions,
    ZIndexOptions,
    ThemeCustomProperties,
    ThemeOptions,
    Theme,
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

