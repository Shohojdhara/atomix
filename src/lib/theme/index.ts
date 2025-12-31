/**
 * Theme System Exports
 * 
 * Unified theme system - handles both DesignTokens and Theme objects.
 * 
 * @example
 * ```typescript
 * import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';
 * 
 * // Using DesignTokens (recommended - flat structure)
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

// Unified createTheme (handles both DesignTokens and Theme objects)
export { createTheme } from './core';

// Theme object creation
export { createThemeObject } from './core';

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
import { saveCSSFile, saveCSSFileSync } from './generators/cssFile';

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

/**
 * Save theme to CSS file
 */
export async function saveTheme(css: string, filePath: string): Promise<void> {
  await saveCSSFile(css, filePath);
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


// ============================================================================
// Config Loader
// ============================================================================

export {
  loadThemeFromConfig,
  loadThemeFromConfigSync,
} from './config/configLoader';

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

// Theme adapter (converts between Theme and DesignTokens)
export {
  themeToDesignTokens,
  designTokensToCSSVars,
  createDesignTokensFromTheme,
  designTokensToTheme,
} from './adapters';

// Theme helpers (utilities for working with themes and DesignTokens)
export {
  getDesignTokensFromTheme,
  isDesignTokens,
  isThemeObject,
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
  Theme,
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
} from './adapters/cssVariableMapper';

export type { RTLConfig } from './i18n/rtl';