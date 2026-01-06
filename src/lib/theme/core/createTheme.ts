/**
 * Core Theme Functions
 *
 * Simplified theme system using DesignTokens only.
 * Config-first approach: loads from atomix.config.ts when no input is provided.
 */

import type { DesignTokens } from '../tokens/tokens';
import type { GenerateCSSVariablesOptions } from '../generators/generateCSS';
import { createTokens } from '../tokens/tokens';
import { generateCSSVariables } from '../generators/generateCSS';
import { ThemeError, ThemeErrorCode } from '../errors/errors';

/**
 * Create theme CSS from DesignTokens
 *
 * **Config-First Approach**: If no input is provided, loads from `atomix.config.ts`.
 *
 * @param input - DesignTokens (partial) or undefined (loads from config)
 * @param options - CSS generation options (prefix is automatically read from config if not provided)
 * @returns CSS string with custom properties
 * @throws Error if config loading fails when no input is provided
 *
 * @example
 * ```typescript
 * // Loads from atomix.config.ts
 * const css = createTheme();
 *
 * // Using DesignTokens
 * const css = createTheme({
 *   'primary': '#7c3aed',
 *   'spacing-4': '1rem',
 * });
 *
 * // With custom options
 * const css = createTheme(undefined, { prefix: 'myapp', selector: ':root' });
 * ```
 */
export function createTheme(
  input?: Partial<DesignTokens>,
  options?: GenerateCSSVariablesOptions
): string {
  // Validate options if provided
  if (options?.prefix) {
    const prefixPattern = /^[a-z][a-z0-9-]*$/;
    if (!prefixPattern.test(options.prefix)) {
      throw new ThemeError(
        `Invalid CSS variable prefix: "${options.prefix}". Prefix must start with a lowercase letter and contain only lowercase letters, numbers, and hyphens (e.g., "atomix", "my-app").`,
        ThemeErrorCode.THEME_VALIDATION_FAILED,
        { prefix: options.prefix, pattern: prefixPattern.toString() }
      );
    }
  }

  // Validate selector if provided
  if (options?.selector) {
    // Basic validation - selector should be a valid CSS selector
    if (typeof options.selector !== 'string' || options.selector.trim().length === 0) {
      throw new ThemeError(
        `Invalid CSS selector: "${options.selector}". Selector must be a non-empty string (e.g., ":root", ".my-theme").`,
        ThemeErrorCode.THEME_VALIDATION_FAILED,
        { selector: options.selector }
      );
    }
  }

  // Determine tokens based on input
  let tokens: Partial<DesignTokens>;
  
  if (!input) {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      throw new ThemeError(
        'No input provided and config loading is not available in browser environment. Please provide tokens explicitly or use Node.js/SSR environment.',
        ThemeErrorCode.CONFIG_LOAD_FAILED,
        { environment: 'browser' }
      );
    }
    
    // Load from config when no input provided
    let loadThemeFromConfigSync: any;
    let loadAtomixConfig: any;
    
    try {
      const configLoaderModule = require('../config/configLoader');
      const loaderModule = require('../../config/loader');
      
      loadThemeFromConfigSync = configLoaderModule.loadThemeFromConfigSync;
      loadAtomixConfig = loaderModule.loadAtomixConfig;
      
      tokens = loadThemeFromConfigSync();
      
      // Get prefix from config if needed
      if (!options?.prefix) {
        try {
          const config = loadAtomixConfig({ configPath: 'atomix.config.ts', required: false });
          options = { ...options, prefix: config?.prefix || 'atomix' };
        } catch (error) {
          // If config loading fails, use default prefix
          options = { ...options, prefix: 'atomix' };
        }
      }
    } catch (error) {
      throw new ThemeError(
        'No input provided and config loading is not available in this environment. Please provide tokens explicitly.',
        ThemeErrorCode.CONFIG_LOAD_FAILED,
        { error: error instanceof Error ? error.message : String(error) }
      );
    }
  } else {
    // Validate input tokens structure
    if (typeof input !== 'object' || input === null || Array.isArray(input)) {
      throw new ThemeError(
        `Invalid tokens input. Expected an object with DesignTokens, but received: ${typeof input}.`,
        ThemeErrorCode.THEME_VALIDATION_FAILED,
        { inputType: typeof input }
      );
    }
    
    // Use DesignTokens directly
    tokens = input;
  }

  // Merge with defaults and generate CSS
  const allTokens = createTokens(tokens);

  // Get prefix from options or use default
  const prefix = options?.prefix ?? 'atomix';

  return generateCSSVariables(allTokens, { ...options, prefix });
}