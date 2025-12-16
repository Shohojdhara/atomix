/**
 * Theme System Exports
 * 
 * Central export point for all theme-related functionality
 */

// Core theme system
export { ThemeProvider } from './runtime/ThemeProvider';
export { useTheme } from './runtime/useTheme';
export { ThemeContext } from './ThemeContext';

// Theme building
export { ThemeBuilder, createThemeBuilder, extendTheme, createTheme } from './builders/ThemeBuilder';

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

export type {
  CSSVariableConfig,
  CSSVariableNamingOptions,
} from './cssVariableMapper';
