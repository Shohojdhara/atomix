/**
 * Component Theming Utilities
 * 
 * Provides consistent patterns for applying theme values to components
 */

import type { Theme } from '../types';

export interface ComponentThemeOptions {
  component: string;
  variant?: string;
  size?: string;
  theme: Theme;
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
 * Generate component-specific CSS variables from theme
 */
export function generateComponentCSSVars(
  component: string,
  theme: Theme,
  variant?: string,
  size?: string
): Record<string, string> {
  const vars: Record<string, string> = {};
  
  // This is a simplified implementation - in a real system you'd have more
  // sophisticated logic to extract component-specific values from the theme
  const prefixParts = ['atomix', component];
  
  if (variant) {
    prefixParts.push(variant);
  }
  
  if (size) {
    prefixParts.push(size);
  }
  
  const prefix = prefixParts.join('-');
  
  // Add common component properties
  if (theme.palette) {
    vars[`--${prefix}-color`] = theme.palette.primary?.main || '#7c3aed';
    vars[`--${prefix}-color-hover`] = theme.palette.primary?.dark || '#5b21b6';
    vars[`--${prefix}-color-active`] = theme.palette.primary?.main || '#7c3aed';
    vars[`--${prefix}-color-disabled`] = theme.palette.text?.disabled || '#9ca3af';
  }
  
  if (theme.typography) {
    vars[`--${prefix}-font-family`] = theme.typography.fontFamily || 'Inter, sans-serif';
    vars[`--${prefix}-font-size`] = theme.typography.fontSize ? `${theme.typography.fontSize}px` : '16px';
  }
  
  if (theme.spacing) {
    const spacing = typeof theme.spacing === 'function' ? theme.spacing : (val: number) => val * 8;
    vars[`--${prefix}-spacing-unit`] = `${spacing(1)}px`;
    vars[`--${prefix}-spacing-sm`] = `${spacing(0.5)}px`;
    vars[`--${prefix}-spacing-md`] = `${spacing(1)}px`;
    vars[`--${prefix}-spacing-lg`] = `${spacing(2)}px`;
  }
  
  return vars;
}

/**
 * Apply consistent theme to component style object
 */
export function applyComponentTheme(
  component: string,
  style: React.CSSProperties = {},
  variant?: string,
  size?: string,
  theme?: Theme
): React.CSSProperties {
  // If no theme provided, return original style
  if (!theme) {
    return style;
  }
  
  // Generate component-specific CSS variables
  const componentVars = generateComponentCSSVars(component, theme, variant, size);
  
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
  theme?: Theme
): (property: string) => string {
  return (property: string) => {
    return getComponentThemeValue(component, property, variant, size);
  };
}