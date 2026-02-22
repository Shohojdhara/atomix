/**
 * Naming Utilities
 *
 * Provides consistent naming conventions across the theme system
 */

export interface NamingOptions {
  prefix?: string;
  component?: string;
  variant?: string;
  state?: string;
}

/**
 * Generate consistent CSS class names following BEM methodology
 */
export function generateClassName(
  block: string,
  element?: string,
  modifiers?: Record<string, boolean | string>
): string {
  let className = block;

  if (element) {
    className += `__${element}`;
  }

  if (modifiers) {
    Object.entries(modifiers).forEach(([key, value]) => {
      if (value) {
        className += `--${key}`;
        if (typeof value === 'string' && value !== key) {
          className += `-${value}`;
        }
      }
    });
  }

  return className;
}

/**
 * Generate consistent CSS variable names
 */
export function generateCSSVariableName(property: string, options: NamingOptions = {}): string {
  const { prefix = 'atomix', component, variant, state } = options;

  const parts = [prefix];

  if (component) {
    parts.push(component);
  }

  if (variant) {
    parts.push(variant);
  }

  if (state) {
    parts.push(state);
  }

  parts.push(property);

  return `--${parts.join('-')}`;
}

/**
 * Normalize theme tokens to consistent naming convention
 */
export function normalizeThemeTokens(tokens: Record<string, any>): Record<string, any> {
  const normalized: Record<string, any> = {};

  for (const [key, value] of Object.entries(tokens)) {
    if (typeof value === 'object' && value !== null) {
      // Recursively normalize nested objects
      normalized[key] = normalizeThemeTokens(value);
    } else {
      // Apply consistent naming transformation
      normalized[key] = value;
    }
  }

  return normalized;
}

/**
 * Convert camelCase to kebab-case for CSS custom properties
 */
export function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

/**
 * Convert theme property to CSS variable name
 */
export function themePropertyToCSSVar(propertyPath: string, prefix: string = 'atomix'): string {
  // Convert nested property paths to kebab-case
  const path = propertyPath
    .split('.')
    .map(part => camelToKebab(part))
    .join('-');

  return `--${prefix}-${path}`;
}
