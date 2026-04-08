/**
 * Theme System Exports
 *
 * Simplified theme system using DesignTokens only.
 *
 * @example
 * ```typescript
 * import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';
 *
 * // Using DesignTokens
 * const css = createTheme({ 'primary': '#7AFFD7', 'spacing-4': '1rem' });
 * injectTheme(css);
 *
 * // Or use with ThemeProvider
 * import { ThemeProvider } from '@shohojdhara/atomix/theme';
 * const tokens = { 'primary': '#7c3aed' };
 * <ThemeProvider defaultTheme={tokens}>...</ThemeProvider>
 * ```
 */

// ============================================================================
// Core Theme Functions
// ============================================================================

import {
  createTheme,
  deepMerge,
  mergeTheme,
  extendTheme,
  createThemeRegistry,
  registerTheme,
  unregisterTheme,
  hasTheme,
  getTheme,
  getAllThemes,
  getThemeIds,
  clearThemes,
  getThemeCount,
} from './core';

export {
  createTheme,
  deepMerge,
  mergeTheme,
  extendTheme,
  createThemeRegistry,
  registerTheme,
  unregisterTheme,
  hasTheme,
  getTheme,
  getAllThemes,
  getThemeIds,
  clearThemes,
  getThemeCount,
};

// ============================================================================
// Theme Injection and Management
// ============================================================================

import { injectCSS, removeCSS, isCSSInjected } from './utils/injectCSS';
export { injectCSS, removeCSS, isCSSInjected };

/**
 * Inject theme CSS into DOM
 */
export function injectTheme(css: string, id: string = 'atomix-theme'): void {
  injectCSS(css, id);
}

/**
 * Remove theme from DOM
 */
export function removeTheme(id: string = 'atomix-theme'): void {
  removeCSS(id);
}

// ============================================================================
// Token Utilities
// ============================================================================

import { createTokens, defaultTokens, type DesignTokens } from './tokens';
export { createTokens, defaultTokens, type DesignTokens };

// ============================================================================
// CSS Generation
// ============================================================================

import {
  generateCSSVariables,
  generateCSSVariablesForSelector,
  type GenerateCSSVariablesOptions,
} from './generators';

export {
  generateCSSVariables,
  generateCSSVariablesForSelector,
  type GenerateCSSVariablesOptions,
};

// ============================================================================
// Naming and Component Theming Utilities
// ============================================================================

import {
  generateClassName,
  generateCSSVariableName,
  normalizeThemeTokens,
  camelToKebab,
  themePropertyToCSSVar,
  type NamingOptions,
} from './utils/naming';

export {
  generateClassName,
  generateCSSVariableName,
  normalizeThemeTokens,
  camelToKebab,
  themePropertyToCSSVar,
  type NamingOptions,
};

import {
  getComponentThemeValue,
  generateComponentCSSVars,
  applyComponentTheme,
  useComponentTheme,
  type ComponentThemeOptions,
} from './utils/componentTheming';

export {
  getComponentThemeValue,
  generateComponentCSSVars,
  applyComponentTheme,
  useComponentTheme,
  type ComponentThemeOptions,
};

// ============================================================================
// Theme Utilities (Switching, Persistence, Colors)
// ============================================================================

import {
  // Theme Mode Switching
  switchTheme,
  toggleTheme,
  getCurrentTheme,
  getSystemTheme,
  initializeTheme,
  listenToSystemTheme,
  
  // Theme Persistence
  persistTheme,
  clearThemePreference,
  
  // Token Manipulation
  mergeTokens,
  overrideTokens,
  pickTokens,
  omitTokens,
  
  // Color Utilities
  hexToRgb,
  rgbToHex,
  getLuminance,
  getContrastRatio,
  isAccessible,
  getContrastText,
  lighten,
  darken,
  alpha,
  emphasize,
  createSpacing,
  
  // Types
  type ThemeMode,
  type ThemeSwitcherOptions,
  type ThemePersistenceOptions,
} from './utils/themeUtils';

export {
  switchTheme,
  toggleTheme,
  getCurrentTheme,
  getSystemTheme,
  initializeTheme,
  listenToSystemTheme,
  persistTheme,
  clearThemePreference,
  mergeTokens,
  overrideTokens,
  pickTokens,
  omitTokens,
  hexToRgb,
  rgbToHex,
  getLuminance,
  getContrastRatio,
  isAccessible,
  getContrastText,
  lighten,
  darken,
  alpha,
  emphasize,
  createSpacing,
  type ThemeMode,
  type ThemeSwitcherOptions,
  type ThemePersistenceOptions,
};

// ============================================================================
// React Integration
// ============================================================================

import { ThemeProvider } from './runtime/ThemeProvider';
import { useTheme } from './runtime/useTheme';
import { useThemeTokens } from './runtime/useThemeTokens';
import { ThemeContext } from './runtime/ThemeContext';
import { ThemeErrorBoundary, type ThemeErrorBoundaryProps } from './runtime/ThemeErrorBoundary';

export {
  ThemeProvider,
  useTheme,
  useThemeTokens,
  ThemeContext,
  ThemeErrorBoundary,
  type ThemeErrorBoundaryProps,
};

import {
  useThemeSwitcher,
  type UseThemeSwitcherOptions,
  type UseThemeSwitcherReturn,
} from './hooks/useThemeSwitcher';

export {
  useThemeSwitcher,
  type UseThemeSwitcherOptions,
  type UseThemeSwitcherReturn,
};

import { ThemeToggle, type ThemeToggleProps } from './components/ThemeToggle';
export { ThemeToggle, type ThemeToggleProps };

import { ThemeApplicator, getThemeApplicator, applyTheme } from './runtime/ThemeApplicator';
export { ThemeApplicator, getThemeApplicator, applyTheme };

// DevTools (for development and debugging)
export * from './devtools';

// Theme adapters
import { designTokensToCSSVars, configToTokens } from './adapters';
export { designTokensToCSSVars, configToTokens };

// Theme helpers
import { isDesignTokens } from './utils/themeHelpers';
export { isDesignTokens };

// Performance utilities
import {
  createPerformanceMonitor,
  usePerformanceMonitor,
  type PerformanceMetrics,
} from './utils/performanceMonitor';

export {
  createPerformanceMonitor,
  usePerformanceMonitor,
  type PerformanceMetrics,
};

// Responsive utilities
import {
  createResponsiveUtil,
  useResponsive,
} from './utils/responsive';

export {
  createResponsiveUtil,
  useResponsive,
};

// CSS variable utilities
import {
  mapSCSSTokensToCSSVars,
  applyCSSVariables,
  removeCSSVariables,
  getCSSVariable,
  cssVarsToStyle,
  mergeCSSVars,
  isValidCSSVariableName,
  extractComponentName,
  type CSSVariableConfig,
  type CSSVariableNamingOptions,
} from './adapters/cssVariableMapper';

export {
  mapSCSSTokensToCSSVars,
  applyCSSVariables,
  removeCSSVariables,
  getCSSVariable,
  cssVarsToStyle,
  mergeCSSVars,
  isValidCSSVariableName,
  extractComponentName,
  type CSSVariableConfig,
  type CSSVariableNamingOptions,
};

import { RTLManager, createRTLManager, isRTLLocale, getDirectionFromLocale, rtlCSS, type RTLConfig } from './i18n/rtl';
export { RTLManager, createRTLManager, isRTLLocale, getDirectionFromLocale, rtlCSS, type RTLConfig };

// Types
export type {
  ThemeChangeEvent,
  ThemeLoadOptions,
  ThemeValidationResult,
  ThemeProviderProps,
  ThemeContextValue,
  UseThemeReturn,
  ComponentThemeOverride,
  ThemeComponentOverrides,
  Theme,
} from './types';

/**
 * Main theme module interface
 */
export default {
  // Core
  createTheme,
  injectTheme,
  removeTheme,
  
  // Context and Provider
  ThemeProvider,
  useTheme,
  useThemeTokens,
  ThemeContext,
  ThemeErrorBoundary,
  
  // Adapters
  configToTokens,
  designTokensToCSSVars,
  
  // Theme Utils
  switchTheme,
  toggleTheme,
  getCurrentTheme,
  getSystemTheme,
  initializeTheme,
  listenToSystemTheme,
  persistTheme,
  clearThemePreference,
  
  // Token Manipulation
  mergeTokens,
  overrideTokens,
  pickTokens,
  omitTokens,
  
  // Color Utilities
  hexToRgb,
  rgbToHex,
  getLuminance,
  getContrastRatio,
  isAccessible,
  getContrastText,
  lighten,
  darken,
  alpha,
  emphasize,
  createSpacing,
  
  // Performance utilities
  createPerformanceMonitor,
  usePerformanceMonitor,
  
  // Responsive utilities
  createResponsiveUtil,
  useResponsive,
  
  // Components
  ThemeToggle,
  ThemeApplicator,
  applyTheme,
  getThemeApplicator,
  
  // Registry
  createThemeRegistry,
  registerTheme,
  unregisterTheme,
  hasTheme,
  getTheme,
  getAllThemes,
  getThemeIds,
  clearThemes,
  getThemeCount,
  
  // Composition
  deepMerge,
  mergeTheme,
  extendTheme,
  
  // Tokens
  createTokens,
  defaultTokens,
  
  // Generators
  generateCSSVariables,
  generateCSSVariablesForSelector,
  
  // Naming
  generateClassName,
  generateCSSVariableName,
  normalizeThemeTokens,
  camelToKebab,
  themePropertyToCSSVar,
  
  // Component Theming
  getComponentThemeValue,
  generateComponentCSSVars,
  applyComponentTheme,
  useComponentTheme,
  
  // Hooks
  useThemeSwitcher,
  
  // Helpers
  isDesignTokens,
  
  // CSS Variable Mapper
  mapSCSSTokensToCSSVars,
  applyCSSVariables,
  removeCSSVariables,
  getCSSVariable,
  cssVarsToStyle,
  mergeCSSVars,
  isValidCSSVariableName,
  extractComponentName,
  
  // Injection Utils
  injectCSS,
  removeCSS,
  isCSSInjected,
  
  // I18n
  RTLManager,
  createRTLManager,
  isRTLLocale,
  getDirectionFromLocale,
  rtlCSS,
};
