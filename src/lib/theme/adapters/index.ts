/**
 * Theme Adapters
 * 
 * Adapters for working with DesignTokens and CSS variables
 */

export {
  designTokensToCSSVars,
} from './themeAdapter';

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

export type {
  CSSVariableConfig,
  CSSVariableNamingOptions,
} from './cssVariableMapper';

