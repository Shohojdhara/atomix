/**
 * Theme Helper Functions
 *
 * Utility functions for working with DesignTokens
 */

import type { DesignTokens } from '../tokens/tokens';

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
  const hasDesignTokenKeys = keys.some(
    key => /^[a-z]+(-[a-z0-9]+)*$/.test(key) && typeof obj[key] === 'string'
  );

  return hasDesignTokenKeys;
}
