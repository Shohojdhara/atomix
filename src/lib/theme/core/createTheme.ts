/**
 * Core Theme Functions
 *
 * Unified theme system that handles both DesignTokens and Theme objects.
 * Config-first approach: loads from atomix.config.ts when no input is provided.
 * Config-first approach: loads advanced features from config when available.
 */

import type { DesignTokens } from '../tokens/tokens';
import type { Theme } from '../types';
import type { GenerateCSSVariablesOptions } from '../generators/generateCSS';
import { createTokens } from '../tokens/tokens';
import { generateCSSVariables } from '../generators/generateCSS';
import { themeToDesignTokens } from '../adapters/themeAdapter';
import { loadThemeFromConfigSync } from '../config/configLoader';
import { loadAtomixConfig } from '../../config/loader';

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
      // Use the imported function directly instead of require to avoid bundling issues
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
      // Convert Theme object to DesignTokens
      tokens = themeToDesignTokens(input as Theme);
    } else {
      // Use DesignTokens directly
      tokens = input as Partial<DesignTokens>;
    }
  }

  // Merge with defaults and generate CSS
  const allTokens = createTokens(tokens);

  // Get prefix from options, config, or use default
  const prefix = options?.prefix ?? configPrefix ?? 'atomix';

  return generateCSSVariables(allTokens, { ...options, prefix });
}

// Helper type guard function
function isThemeObject(obj: any): obj is Theme {
  return obj && typeof obj === 'object' && (
    obj.palette || 
    obj.typography || 
    obj.spacing || 
    obj.breakpoints ||
    obj.colors
  );
}

/**
 * Create theme CSS from tokens or Theme object (asynchronous version)
 * 
 * **Config-First Approach**: If no input is provided, loads from `atomix.config.ts`.
 * Config file is required for automatic loading.
 * 
 * @param input - DesignTokens (partial), Theme object, or undefined (loads from config)
 * @param options - CSS generation options (prefix is automatically read from config if not provided)
 * @returns Promise resolving to CSS string with custom properties
 * @throws Error if config loading fails when no input is provided
 * 
 * @example
 * ```typescript
 * // Loads from atomix.config.ts (config file required)
 * const css = await createThemeAsync();
 * 
 * // Using DesignTokens
 * const css = await createThemeAsync({
 *   'primary': '#7c3aed',
 *   'spacing-4': '1rem',
 * });
 * 
 * // Using Theme object
 * const theme = createThemeObject({ palette: { primary: { main: '#7c3aed' } } });
 * const css = await createThemeAsync(theme);
 * 
 * // With custom options
 * const css = await createThemeAsync(undefined, { prefix: 'myapp', selector: ':root' });
 * ```
 */
export async function createThemeAsync(
  input?: Partial<DesignTokens> | Theme,
  options?: GenerateCSSVariablesOptions
): Promise<string> {
  // Determine tokens based on input
  let tokens: Partial<DesignTokens>;
  
  if (!input) {
    // Load from config when no input provided
    if (typeof window !== 'undefined') {
      throw new Error('createTheme: No input provided and config loading is not available in browser environment. Please provide tokens explicitly or use Node.js/SSR environment.');
    }
    
    // Dynamically import config loaders in a way that prevents bundling in browser
    const { loadThemeFromConfigSync } = await import('../config/configLoader');
    const { loadAtomixConfig } = await import('../../config/loader');
    
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
  } else if (isThemeObject(input)) {
    // Convert Theme object to DesignTokens
    const { themeToDesignTokens } = await import('../adapters/themeAdapter');
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
