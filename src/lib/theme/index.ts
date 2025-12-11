/**
 * Theme Module Entry Point
 * 
 * Exports all theme management utilities for the Atomix Design System
 */

// Runtime system
export { ThemeManager } from './runtime/ThemeManager';
export { ThemeProvider } from './runtime/ThemeProvider';
export { ThemeErrorBoundary } from './runtime/ThemeErrorBoundary';
export { useTheme } from './runtime/useTheme';
export { ThemeContext } from './ThemeContext';
export type { ThemeErrorBoundaryProps } from './runtime/ThemeErrorBoundary';

// createTheme System
export { createTheme } from './createTheme';

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


// Error handling
export {
    ThemeError,
    ThemeErrorCode,
    ThemeLogger,
    LogLevel,
    getLogger,
    setLogger,
    createLogger,
} from './errors';
export type {
    LoggerConfig,
} from './errors';

// Constants
export {
    DEFAULT_STORAGE_KEY,
    DEFAULT_DATA_ATTRIBUTE,
    DEFAULT_BASE_PATH,
    DEFAULT_STYLE_ID,
    DEFAULT_CACHE_CONFIG,
    DEFAULT_ENGINE_CACHE_CONFIG,
    THEME_LINK_ID_PREFIX,
    CSS_EXTENSIONS,
    DEFAULT_CONFIG_PATH,
    VALIDATION_THRESHOLDS,
    DEFAULT_THEME_METADATA,
    RTL_LOCALES,
    DEFAULT_RTL_CONFIG,
    DEFAULT_ANALYTICS_CONFIG,
    DEFAULT_LOGGER_CONFIG,
    ENV_DEFAULTS,
    DEFAULT_INTEGRATION_CLASS_NAMES,
    DEFAULT_INTEGRATION_CSS_VARIABLES,
    DEFAULT_BUILD_OUTPUT_DIR,
    DEFAULT_SASS_CONFIG,
} from './constants';

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

// Internationalization (i18n)
export {
    RTLManager,
    createRTLManager,
    isRTLLocale,
    getDirectionFromLocale,
    rtlCSS,
} from './i18n';
export type { RTLConfig } from './i18n';

// Theme Studio
export { ThemeStudio } from './studio';
export type { ThemeStudioProps } from './studio';

// Monitoring and Analytics
export {
    ThemeAnalytics,
    createThemeAnalytics,
    getGlobalAnalytics,
    setGlobalAnalytics,
} from './monitoring';
export type {
    ThemeAnalyticsEvent,
    ThemeAnalyticsEventData,
    PerformanceMetric,
    AnalyticsConfig,
} from './monitoring';

// Component Overrides
export {
    ComponentOverrideManager,
    createComponentOverrideManager,
    createComponentOverride,
} from './overrides';
export type {
    ComponentOverride,
    ComponentOverrides,
    OverrideOptions,
} from './overrides';

// White Label
export {
    WhiteLabelManager,
    createWhiteLabelManager,
} from './whitelabel';
export type {
    BrandConfig,
    WhiteLabelConfig,
} from './whitelabel';

