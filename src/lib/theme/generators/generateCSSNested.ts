/**
 * CSS Variable Generator for Nested Tokens
 *
 * Generates CSS custom properties from nested token structures.
 */

import type { DesignTokens } from '../tokens/tokens';
import { generateCSSVariables } from './generateCSS';
import { ThemeNaming } from '../../utils/themeNaming';

/**
 * Options for CSS variable generation with nested support
 */
export interface GenerateNestedCSSVariablesOptions {
  /** CSS selector for the variables (default: ':root') */
  selector?: string;
  /** Prefix for CSS variables (default: 'atomix') */
  prefix?: string;
  /** Separator for nested tokens (default: '-') */
  separator?: string;
  /** Whether to flatten nested objects (default: true) */
  flatten?: boolean;
}

/**
 * Generate CSS variables from nested token structure
 *
 * Converts nested token object to CSS custom properties.
 * Supports both nested objects and flat token structures.
 *
 * @param tokens - Design tokens object (can be nested)
 * @param options - Generation options
 * @returns CSS string with custom properties
 *
 * @example
 * ```typescript
 * const tokens = {
 *   color: {
 *     primary: '#7c3aed',
 *     secondary: '#10b981',
 *   },
 *   spacing: {
 *     small: '0.5rem',
 *     medium: '1rem',
 *   },
 * };
 *
 * const css = generateNestedCSSVariables(tokens);
 * // Returns: ":root {
  --atomix-color-primary: #7c3aed;
  --atomix-color-secondary: #10b981;
  --atomix-spacing-small: 0.5rem;
  --atomix-spacing-medium: 1rem;
}"
 * ```
 */
export function generateNestedCSSVariables(
  tokens: DesignTokens,
  options: GenerateNestedCSSVariablesOptions = {}
): string {
  const {
    selector = ':root',
    prefix = 'atomix',
    separator = '-',
    flatten = true,
  } = options;

  // Flatten nested token structure
  const flattened = flatten ? flattenTokens(tokens, separator) : tokens;

  // Generate CSS variables using the original function
  // Cast to DesignTokens since generateCSSVariables filters out undefined values
  return generateCSSVariables(flattened as DesignTokens, { selector, prefix });
}

/**
 * Flatten nested token structure
 *
 * @param tokens - Token object (can be nested)
 * @param separator - Separator for nested keys
 * @returns Flattened token object
 */
function flattenTokens(tokens: DesignTokens, separator: string): Partial<DesignTokens> {
  const result: Partial<DesignTokens> = {};

  for (const [key, value] of Object.entries(tokens)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively flatten nested objects
      const flattened = flattenTokens(value, separator);

      // Combine keys with separator
      for (const [nestedKey, nestedValue] of Object.entries(flattened)) {
        const newKey = `${key}${separator}${nestedKey}`;
        result[newKey] = nestedValue;
      }
    } else {
      // Direct value
      result[key] = value;
    }
  }

  return result;
}

/**
 * Generate CSS variables with custom selector for nested tokens
 *
 * @param tokens - Design tokens object
 * @param selector - CSS selector (e.g., '[data-theme="dark"]')
 * @param prefix - CSS variable prefix
 * @param separator - Separator for nested keys
 * @returns CSS string
 *
 * @example
 * ```typescript
 * const css = generateNestedCSSVariablesForSelector(
 *   tokens,
 *   '[data-theme="dark"]',
 *   'atomix',
 *   '-'
 * );
 * ```
 */
export function generateNestedCSSVariablesForSelector(
  tokens: DesignTokens,
  selector: string,
  prefix: string = 'atomix',
  separator: string = '-'
): string {
  return generateNestedCSSVariables(tokens, { selector, prefix, separator });
}
