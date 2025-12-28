/**
 * Core Theme Functions
 * 
 * Unified theme system that handles both DesignTokens and Theme objects.
 * Config-first approach: loads from atomix.config.ts when no input is provided.
 * Config file is required for automatic loading.
 */

import type { DesignTokens } from '../tokens/tokens';
import type { Theme } from '../types';
import type { GenerateCSSVariablesOptions } from '../generators/generateCSS';
import { createTokens } from '../tokens/tokens';
import { generateCSSVariables } from '../generators/generateCSS';
import { themeToDesignTokens } from '../adapters/themeAdapter';
import { loadThemeFromConfigSync } from '../config/configLoader';

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
  let tokens: Partial<DesignTokens>;
  let configPrefix: string | undefined;

  // If no input provided, load from config (required)
  if (!input) {
    const configTokens = loadThemeFromConfigSync();
    
    // Get prefix from config
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { loadAtomixConfig } = require('../../config/loader');
      const config = loadAtomixConfig({ configPath: 'atomix.config.ts', required: true });
      configPrefix = config?.prefix;
    } catch (error) {
      // Prefix loading failed, but tokens were loaded, so continue
    }
    
    tokens = configTokens;
  } else {
    // Check if it's a Theme object
    const isThemeObject = (input as any).__isJSTheme === true || 
      ((input as any).palette && (input as any).typography);

    if (isThemeObject) {
      // Convert Theme to DesignTokens
      tokens = themeToDesignTokens(input as Theme);
    } else {
      // Already DesignTokens
      tokens = input as Partial<DesignTokens>;
    }
  }

  // Merge with defaults and generate CSS
  const allTokens = createTokens(tokens);
  
  // Use prefix from config if not provided in options
  const finalOptions: GenerateCSSVariablesOptions = {
    ...options,
    prefix: options?.prefix ?? configPrefix ?? 'atomix',
  };
  
  return generateCSSVariables(allTokens, finalOptions);
}

