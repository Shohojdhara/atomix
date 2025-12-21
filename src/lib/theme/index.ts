/**
 * Theme System Exports
 * 
 * Central export point for all theme-related functionality
 */

// Core theme system
export { ThemeProvider } from './runtime/ThemeProvider';
export { useTheme } from './runtime/useTheme';
export { ThemeContext } from './ThemeContext';
export { ThemeManager } from './runtime/ThemeManager';
export { ThemeErrorBoundary } from './runtime/ThemeErrorBoundary';

// Theme creation
export { createTheme } from './createTheme';
export { createThemeFromConfig } from './createThemeFromConfig';

// Theme utilities
export { quickTheme, createDarkVariant, validateTheme, themeToCSS, exportTheme, importTheme } from '../theme-tools';

// DevTools (for development and debugging)
export * from './devtools';

// Theme application
export { ThemeApplicator, getThemeApplicator, applyTheme, removeTheme } from './runtime/ThemeApplicator';

// CSS variable utilities
export {
  generateCSSVariableName,
  generateComponentCSSVars,
  mapSCSSTokensToCSSVars,
  applyCSSVariables,
  removeCSSVariables,
  getCSSVariable,
  cssVarsToStyle,
  mergeCSSVars,
  isValidCSSVariableName,
  extractComponentName,
} from './cssVariableMapper';

// RTL Support
export { RTLManager } from './i18n/rtl';

// Types
export type {
  Theme,
  ThemeMetadata,
  ThemeManagerConfig,
  ThemeChangeEvent,
  ThemeLoadOptions,
  ThemeValidationResult,
  ThemeProviderProps,
  ThemeContextValue,
  UseThemeReturn,
  ComponentThemeOverride,
  ThemeComponentOverrides,
} from './types';

export type { ThemeErrorBoundaryProps } from './runtime/ThemeErrorBoundary';

export type {
  CSSVariableConfig,
  CSSVariableNamingOptions,
} from './cssVariableMapper';

export type { RTLConfig } from './i18n/rtl';
