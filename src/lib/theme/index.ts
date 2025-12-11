/**
 * Theme Module Entry Point
 * 
 * Exports all theme management utilities for the Atomix Design System
 */

// Runtime system
export { ThemeManager } from './runtime/ThemeManager';
export { ThemeProvider } from './runtime/ThemeProvider';
export { useTheme } from './runtime/useTheme';
export { ThemeContext } from './ThemeContext';

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

// Configuration system
export {
    loadThemeConfig,
    clearConfigCache,
    getCachedConfig,
    reloadThemeConfig,
    validateConfig,
} from './config';
export type {
    ConfigLoaderOptions,
    LoadedThemeConfig,
    ConfigValidationResult,
    ThemeMetadata as ConfigThemeMetadata,
} from './config/types';

// Core engine
export {
    ThemeEngine,
    ThemeRegistry,
    ThemeCache,
    ThemeValidator,
} from './core';
export type {
    ThemeChangeEvent,
    ThemeLoadOptions,
    ThemeChangeListener,
    ThemeLoadListener,
    ThemeErrorListener,
    ThemeEngineConfig,
    ValidationResult,
    A11yIssue,
} from './core';

// Generators
export {
    CSSGenerator,
    generateCSS,
    TypeGenerator,
    generateTypes,
    ConfigGenerator,
    generateConfigTemplate,
} from './generators';
export type {
    CSSGeneratorOptions,
    TypeGeneratorOptions,
    ConfigGeneratorOptions,
} from './generators';

// Developer tools
export {
    ThemeCLI,
    createCLI,
    runCLI,
    ThemePreview,
    ThemeInspector,
} from './devtools';
export type {
    CLICommand,
    ThemePreviewProps,
    ThemeInspectorProps,
} from './devtools';

// Font System
export {
    generateGoogleFontsUrl,
    preloadThemeFonts,
    loadThemeFonts,
    getFontFallbackStack,
    themeFontConfigs,
} from './font-loader';
export type {
    FontConfig,
    ThemeFonts,
} from './font-loader';

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

