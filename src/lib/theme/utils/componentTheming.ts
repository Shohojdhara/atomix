/**
 * Component Theming Utilities
 * 
 * Provides consistent patterns for applying theme values to components
 * using DesignTokens and CSS variables
 */

import type { DesignTokens } from '../tokens/tokens';

export interface ComponentThemeOptions {
  component: string;
  variant?: string;
  size?: string;
  tokens?: Partial<DesignTokens>;
}

/**
 * Get a theme value for a specific component using CSS variables
 * This ensures all components access theme values consistently
 */
export function getComponentThemeValue(
  component: string,
  property: string,
  variant?: string,
  size?: string
): string {
  // Build CSS variable name following consistent pattern
  const parts = ['atomix', component];
  
  if (variant) {
    parts.push(variant);
  }
  
  if (size) {
    parts.push(size);
  }
  
  parts.push(property);
  
  const cssVarName = `--${parts.join('-')}`;
  const fallbackVarName = `--atomix-${property}`;
  
  // Return CSS variable reference with fallback
  return `var(${cssVarName}, var(${fallbackVarName}, initial))`;
}

/**
 * Generate component-specific CSS variables from DesignTokens
 */
export function generateComponentCSSVars(
  component: string,
  tokens?: Partial<DesignTokens>,
  variant?: string,
  size?: string
): Record<string, string> {
  const vars: Record<string, string> = {};
  
  if (!tokens) return vars;
  
  const prefixParts = ['atomix', component];
  
  if (variant) {
    prefixParts.push(variant);
  }
  
  if (size) {
    prefixParts.push(size);
  }
  
  const prefix = prefixParts.join('-');
  
  // Map common DesignTokens to component-specific CSS variables
  if (tokens.primary) {
    vars[`--${prefix}-color`] = tokens.primary;
  }
  if (tokens['primary-9']) {
    vars[`--${prefix}-color-hover`] = tokens['primary-9'];
  }
  if (tokens['body-color']) {
    vars[`--${prefix}-color-disabled`] = tokens['body-color'];
  }
  
  if (tokens['body-font-family']) {
    vars[`--${prefix}-font-family`] = tokens['body-font-family'];
  }
  if (tokens['body-font-size']) {
    vars[`--${prefix}-font-size`] = tokens['body-font-size'];
  }
  
  if (tokens['spacing-1']) {
    vars[`--${prefix}-spacing-sm`] = tokens['spacing-1'];
  }
  if (tokens['spacing-2']) {
    vars[`--${prefix}-spacing-md`] = tokens['spacing-2'];
  }
  if (tokens['spacing-4']) {
    vars[`--${prefix}-spacing-lg`] = tokens['spacing-4'];
  }
  
  return vars;
}

/**
 * Apply consistent theme to component style object using DesignTokens
 */
export function applyComponentTheme(
  component: string,
  style: React.CSSProperties = {},
  variant?: string,
  size?: string,
  tokens?: Partial<DesignTokens>
): React.CSSProperties {
  // If no tokens provided, return original style
  if (!tokens) {
    return style;
  }
  
  // Generate component-specific CSS variables
  const componentVars = generateComponentCSSVars(component, tokens, variant, size);
  
  // Merge with existing style
  return {
    ...componentVars,
    ...style,
  };
}

/**
 * Create a hook for consistent component theming
 */
export function useComponentTheme(
  component: string,
  variant?: string,
  size?: string,
  tokens?: Partial<DesignTokens>
): (property: string) => string {
  return (property: string) => {
    return getComponentThemeValue(component, property, variant, size);
  };
}