/**
 * Core Theme Functions
 *
 * Simplified theme system that handles both DesignTokens and Theme objects.
 * Config-first approach: loads from atomix.config.ts when no input is provided.
 * Config file is required for automatic loading.
 */

import type { DesignTokens } from '../tokens/tokens';
import type { Theme } from '../types';
import type { GenerateCSSVariablesOptions } from '../generators/generateCSS';
import { createTokens } from '../tokens/tokens';
import { generateCSSVariables } from '../generators/generateCSS';
import { themeToDesignTokens } from '../adapters/themeAdapter';

/**
 * Create theme CSS from tokens or Theme object
 *
 * **Config-First Approach**: If no input is provided, loads from `atomix.config.ts`.
 * Config file is required for automatic loading.
 *
 * @param input - DesignTokens (partial), Theme object, or undefined (loads from config)
 * @param options - CSS generation options (prefix is automatically read from config if not provided)
 * @returns CSS string with custom properties
 * @throws Error if config loading fails when no input is provided
 *
 * @example
 * ```typescript
 * // Loads from atomix.config.ts (config file required)
 * const css = createTheme();
 *
 * // Using DesignTokens
 * const css = createTheme({
 *   'primary': '#7c3aed',
 *   'spacing-4': '1rem',
 * });
 *
 * // Using Theme object
 * const theme = createThemeObject({ palette: { primary: { main: '#7c3aed' } } });
 * const css = createTheme(theme);
 *
 * // With custom options
 * const css = createTheme(undefined, { prefix: 'myapp', selector: ':root' });
 * ```
 */
export function createTheme(
  input?: Partial<DesignTokens> | Theme,
  options?: GenerateCSSVariablesOptions
): string {
  // Determine tokens based on input
  let tokens: Partial<DesignTokens>;
  
  if (!input) {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      throw new Error('createTheme: No input provided and config loading is not available in browser environment. Please provide tokens explicitly or use Node.js/SSR environment.');
    }
    
    // Load from config when no input provided
    // Using dynamic import in a way that's more compatible with bundlers
    let loadThemeFromConfigSync: any;
    let loadAtomixConfig: any;
    
    try {
      // Use dynamic require but only in Node.js environments
      // This approach allows bundlers to properly handle external dependencies
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
      throw new Error('createTheme: No input provided and config loading is not available in this environment. Please provide tokens explicitly.');
    }
  } else if (isThemeObject(input)) {
    // Convert Theme object to DesignTokens
    tokens = themeToDesignTokens(input);
  } else {
    // Use DesignTokens directly
    tokens = input;
  }

  // Merge with defaults and generate CSS
  const allTokens = createTokens(tokens);

  // Get prefix from options or use default
  const prefix = options?.prefix ?? 'atomix';

  return generateCSSVariables(allTokens, { ...options, prefix });
}

// Helper functions to simplify main function
function isThemeObject(input: any): input is Theme {
  return input?.__isJSTheme === true || (input?.palette && input?.typography);
}