/**
 * Theme Helper Functions
 * 
 * Utility functions for working with themes and DesignTokens
 */

import type { Theme } from '../types';
import type { DesignTokens } from '../tokens/tokens';
import { createDesignTokensFromTheme } from '../adapters/themeAdapter';

/**
 * Get DesignTokens from current theme
 * 
 * Converts a Theme object to DesignTokens. Useful when you need to
 * work with DesignTokens but have a Theme object.
 * 
 * @param theme - Theme object to convert
 * @returns DesignTokens object
 * 
 * @example
 * ```typescript
 * // If you have a Theme object, convert it to DesignTokens
 * const tokens = getDesignTokensFromTheme(theme);
 * // Now you can use tokens with unified theme system
 * const css = createTheme(tokens);
 * ```
 */
export function getDesignTokensFromTheme(theme: Theme | null): DesignTokens | null {
  if (!theme) return null;
  return createDesignTokensFromTheme(theme);
}

/**
 * Check if a value is DesignTokens
 * 
 * Type guard to check if an object is DesignTokens format.
 * 
 * @param value - Value to check
 * @returns True if value is DesignTokens
 */
export function isDesignTokens(value: unknown): value is DesignTokens {
  if (!value || typeof value !== 'object') return false;
  
  // DesignTokens is a flat object with string keys, no nested structures
  const obj = value as Record<string, unknown>;
  
  // Check for absence of Theme-specific properties
  if ('palette' in obj || 'typography' in obj || '__isJSTheme' in obj) {
    return false;
  }
  
  // Check if it has DesignTokens-like structure (flat string keys)
  const keys = Object.keys(obj);
  if (keys.length === 0) return false;
  
  // Check if keys look like DesignTokens (kebab-case, no nesting)
  const hasDesignTokenKeys = keys.some(key => 
    /^[a-z]+(-[a-z0-9]+)*$/.test(key) && 
    typeof obj[key] === 'string'
  );
  
  return hasDesignTokenKeys;
}

/**
 * Check if a value is a Theme object
 * 
 * Type guard to check if an object is a Theme.
 * 
 * @param value - Value to check
 * @returns True if value is Theme
 */
export function isThemeObject(value: unknown): value is Theme {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return '__isJSTheme' in obj || ('palette' in obj && 'typography' in obj);
}

