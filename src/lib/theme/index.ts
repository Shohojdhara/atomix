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

// Create theme CSS from DesignTokens
export { createTheme } from './core';

// Theme composition
export { deepMerge, mergeTheme, extendTheme } from './core';

// Simplified Theme Registry
export {
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

// ============================================================================
// Theme Injection and Management
// ============================================================================

import { injectCSS, removeCSS, isCSSInjected } from './utils/injectCSS';
// File saving utilities removed to prevent bundling Node.js modules in browser

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

export { createTokens, defaultTokens, type DesignTokens } from './tokens';

// ============================================================================
// CSS Generation
// ============================================================================

export {
  generateCSSVariables,
  generateCSSVariablesForSelector,
  type GenerateCSSVariablesOptions,
} from './generators';

// ============================================================================
// Naming and Component Theming Utilities
// ============================================================================

export {
  generateClassName,
  generateCSSVariableName,
  normalizeThemeTokens,
  camelToKebab,
  themePropertyToCSSVar,
  type NamingOptions,
} from './utils/naming';

export {
  getComponentThemeValue,
  generateComponentCSSVars,
  applyComponentTheme,
  useComponentTheme,
  type ComponentThemeOptions,
} from './utils/componentTheming';

// ============================================================================
// Injection Utilities
// ============================================================================

export { injectCSS, removeCSS, isCSSInjected } from './utils/injectCSS';


// Config loader removed to prevent bundling Node.js modules in browser

// ============================================================================
// React Integration
// ============================================================================

// Core React components and hooks
export { ThemeProvider } from './runtime/ThemeProvider';
export { useTheme } from './runtime/useTheme';
export { useThemeTokens } from './runtime/useThemeTokens';
export { ThemeContext } from './runtime/ThemeContext';
export { ThemeErrorBoundary } from './runtime/ThemeErrorBoundary';

// Theme application
export { ThemeApplicator, getThemeApplicator, applyTheme } from './runtime/ThemeApplicator';

// DevTools (for development and debugging)
export * from './devtools';

// CSS variable utilities
export { designTokensToCSSVars } from './adapters';

// Theme helpers (utilities for working with DesignTokens)
export {
  isDesignTokens,
} from './utils/themeHelpers';

// CSS variable utilities
export {
  mapSCSSTokensToCSSVars,
  applyCSSVariables,
  removeCSSVariables,
  getCSSVariable,
  cssVarsToStyle,
  mergeCSSVars,
  isValidCSSVariableName,
  extractComponentName,
} from './adapters/cssVariableMapper';

// RTL Support
export { RTLManager } from './i18n/rtl';


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
} from './types';

// Note: Theme type is deprecated - use DesignTokens instead
// Keeping for backward compatibility with devtools and internal use only
export type { Theme } from './types';

export type { ThemeErrorBoundaryProps } from './runtime/ThemeErrorBoundary';

export type {
  CSSVariableConfig,
  CSSVariableNamingOptions,
} from './adapters/cssVariableMapper';

export type { RTLConfig } from './i18n/rtl';