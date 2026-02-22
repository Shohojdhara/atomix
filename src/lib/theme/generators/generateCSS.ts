/**
 * CSS Variable Generator
 *
 * Generates CSS custom properties from design tokens.
 */

import type { DesignTokens } from '../tokens/tokens';

/**
 * Options for CSS variable generation
 */
export interface GenerateCSSVariablesOptions {
  /** CSS selector for the variables (default: ':root') */
  selector?: string;
  /** Prefix for CSS variables (default: 'atomix') */
  prefix?: string;
}

/**
 * Generate CSS variables from tokens
 *
 * Converts flat token object to CSS custom properties.
 *
 * @param tokens - Design tokens object
 * @param options - Generation options
 * @returns CSS string with custom properties
 *
 * @example
 * ```typescript
 * const tokens = {
 *   'primary': '#7c3aed',
 *   'spacing-4': '1rem',
 * };
 *
 * const css = generateCSSVariables(tokens);
 * // Returns: ":root {\n  --atomix-primary: #7c3aed;\n  --atomix-spacing-4: 1rem;\n}"
 * ```
 */
export function generateCSSVariables(
  tokens: DesignTokens,
  options: GenerateCSSVariablesOptions = {}
): string {
  const { selector = ':root', prefix = 'atomix' } = options;

  // Filter out undefined values and generate CSS variables
  const variables = Object.entries(tokens)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      // Convert token key to CSS variable name
      // 'color-primary' -> '--atomix-color-primary'
      const varName = `--${prefix}-${key}`;
      return `  ${varName}: ${value};`;
    })
    .join('\n');

  // Return formatted CSS
  return `${selector} {\n${variables}\n}`;
}

/**
 * Generate CSS variables with custom selector
 *
 * Useful for theme-specific selectors like `[data-theme="dark"]`
 *
 * @param tokens - Design tokens object
 * @param selector - CSS selector (e.g., '[data-theme="dark"]')
 * @param prefix - CSS variable prefix
 * @returns CSS string
 *
 * @example
 * ```typescript
 * const css = generateCSSVariablesForSelector(
 *   tokens,
 *   '[data-theme="dark"]',
 *   'atomix'
 * );
 * ```
 */
export function generateCSSVariablesForSelector(
  tokens: DesignTokens,
  selector: string,
  prefix: string = 'atomix'
): string {
  return generateCSSVariables(tokens, { selector, prefix });
}
