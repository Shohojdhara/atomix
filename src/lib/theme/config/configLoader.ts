
/**
 * Theme Configuration Loader
 *
 * Provides functions to load theme configurations from atomix.config.ts
 * Includes both sync and async versions, with automatic fallbacks
 */

import type { Theme } from '../types';
import type { DesignTokens } from '../tokens/tokens';
import { createTokens } from '../tokens/tokens';
import { themeToDesignTokens, createDesignTokensFromTheme } from '../adapters/themeAdapter';

/**
 * Load theme from config file (synchronous, Node.js only)
 * @param configPath - Path to config file (default: atomix.config.ts)
 * @returns DesignTokens from theme configuration
 * @throws Error if config loading is not available in browser environment
 */
export function loadThemeFromConfigSync(options?: { configPath?: string; required?: boolean }): DesignTokens {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    throw new Error('loadThemeFromConfigSync: Not available in browser environment. Config loading requires Node.js/SSR environment.');
  }

  // Use dynamic import to load the config loader
  // This allows bundlers to handle external dependencies properly
  let loadAtomixConfig: any;
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { loadAtomixConfig: loader } = require('../../config/loader');
    loadAtomixConfig = loader;
  } catch (error) {
    if (options?.required !== false) {
      throw new Error('Config loader module not available');
    }
    // Return empty tokens if config is not required
    return createTokens({});
  }

  const config = loadAtomixConfig({
    configPath: options?.configPath || 'atomix.config.ts',
    required: options?.required !== false,
  });

  if (!config?.theme) {
    return createTokens({});
  }

  if (isThemeObject(config.theme)) {
    return createDesignTokensFromTheme(config.theme);
  }

  return createTokens(config.theme);
}

/**
 * Load theme from config file (asynchronous)
 * @param configPath - Path to config file (default: atomix.config.ts)
 * @returns Promise resolving to DesignTokens from theme configuration
 */
export async function loadThemeFromConfig(options?: { configPath?: string; required?: boolean }): Promise<DesignTokens> {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    throw new Error('loadThemeFromConfig: Not available in browser environment. Config loading requires Node.js/SSR environment.');
  }

  // Dynamic import for config loader
  const { loadAtomixConfig } = await import('../../config/loader');
  
  const config = await loadAtomixConfig({
    configPath: options?.configPath || 'atomix.config.ts',
    required: options?.required !== false,
  });

  if (!config?.theme) {
    return createTokens({});
  }

  if (isThemeObject(config.theme)) {
    return createDesignTokensFromTheme(config.theme);
  }

  return createTokens(config.theme);
}

/**
 * Check if the provided object is a Theme object
 * @param theme - Object to check
 * @returns True if the object is a Theme object, false otherwise
 */
function isThemeObject(theme: any): theme is Theme {
  return typeof theme === 'object' && theme !== null;
}
