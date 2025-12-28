/**
 * Theme Adapters
 * 
 * Adapters for converting between Theme objects and DesignTokens
 */

export {
  themeToDesignTokens,
  designTokensToCSSVars,
  createDesignTokensFromTheme,
  designTokensToTheme,
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

