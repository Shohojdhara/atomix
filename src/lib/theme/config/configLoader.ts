
/**
 * Theme Configuration Loader
 *
 * Provides functions to load theme configurations from atomix.config.ts
 * Includes both sync and async versions, with automatic fallbacks
 */

import type { DesignTokens } from '../tokens/tokens';
import { createTokens } from '../tokens/tokens';
import { loadAtomixConfig as loadAtomixConfigStatic } from '../../config/loader';

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

  // Use static import - the function handles browser environment checks internally
  let config;
  
  try {
    config = loadAtomixConfigStatic({
      configPath: options?.configPath || 'atomix.config.ts',
      required: options?.required !== false,
    });
  } catch (error) {
    if (options?.required !== false) {
      throw new Error('Config loader module not available');
    }
    // Return empty tokens if config is not required
    return createTokens({});
  }

  if (!config?.theme) {
    return createTokens({});
  }

  // Extract tokens from config.theme structure
  // config.theme can have: { extend?: ThemeTokens, tokens?: ThemeTokens, themes?: ... }
  // We need to extract the actual DesignTokens (flat structure)
  const themeConfig = config.theme;
  
  // Check if theme is directly a flat object (DesignTokens format)
  // This handles the case where config.theme might be passed as DesignTokens directly
  if (themeConfig && typeof themeConfig === 'object' && !('extend' in themeConfig) && !('tokens' in themeConfig) && !('themes' in themeConfig)) {
    // It's likely already a flat DesignTokens object
    return createTokens(themeConfig as Partial<DesignTokens>);
  }
  
  // If theme has nested structure (extend/tokens/themes), we can't directly use it
  // Return empty tokens - the theme system will use defaults
  // TODO: Add proper conversion from ThemeTokens to DesignTokens if needed
  return createTokens({});
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

  // Use static import with runtime check
  // The function will handle browser environment checks internally
  let config;
  
  try {
    // loadAtomixConfig is synchronous, not async
    config = loadAtomixConfigStatic({
      configPath: options?.configPath || 'atomix.config.ts',
      required: options?.required !== false,
    });
  } catch (error) {
    if (options?.required !== false) {
      throw new Error('Config loader module not available');
    }
    // Return empty tokens if config is not required
    return createTokens({});
  }

  if (!config?.theme) {
    return createTokens({});
  }

  // Extract tokens from config.theme structure
  // config.theme can have: { extend?: ThemeTokens, tokens?: ThemeTokens, themes?: ... }
  // We need to extract the actual DesignTokens (flat structure)
  const themeConfig = config.theme;
  
  // Check if theme is directly a flat object (DesignTokens format)
  // This handles the case where config.theme might be passed as DesignTokens directly
  if (themeConfig && typeof themeConfig === 'object' && !('extend' in themeConfig) && !('tokens' in themeConfig) && !('themes' in themeConfig)) {
    // It's likely already a flat DesignTokens object
    return createTokens(themeConfig as Partial<DesignTokens>);
  }
  
  // If theme has nested structure (extend/tokens/themes), we can't directly use it
  // Return empty tokens - the theme system will use defaults
  // TODO: Add proper conversion from ThemeTokens to DesignTokens if needed
  return createTokens({});
}

