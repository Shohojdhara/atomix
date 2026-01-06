/**
 * Theme Composition Utilities
 *
 * Simplified utilities for composing and merging DesignTokens.
 */

// ============================================================================
// Deep Merge Utility
// ============================================================================

/**
 * Check if value is an object
 */
function isObject(item: any): item is Record<string, any> {
    return item && typeof item === 'object' && !Array.isArray(item) && typeof item !== 'function';
}

/**
 * Deep merge multiple objects
 * Later objects override earlier ones
 */
export function deepMerge<T extends Record<string, unknown>>(...objects: Partial<T>[]): T {
    if (objects.length === 0) return {} as T;
    if (objects.length === 1) return objects[0] as T;

    const [target, ...sources] = objects;
    const result = { ...target } as T;

    for (const source of sources) {
        if (!source) continue;

        for (const key in source) {
            if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

            const targetValue = result[key];
            const sourceValue = source[key];

            if (isObject(targetValue) && isObject(sourceValue)) {
                // Recursively merge objects
                result[key] = deepMerge(targetValue as Record<string, unknown>, sourceValue as Record<string, unknown>) as T[Extract<keyof T, string>];
            } else {
                // Override with source value
                result[key] = sourceValue as T[Extract<keyof T, string>];
            }
        }
    }

    return result;
}

// ============================================================================
// DesignTokens Merging
// ============================================================================

import type { DesignTokens } from '../tokens/tokens';

/**
 * Merge multiple DesignTokens objects into a single DesignTokens object
 *
 * @param tokens - DesignTokens objects to merge
 * @returns Merged DesignTokens object
 *
 * @example
 * ```typescript
 * const baseTokens = { 'primary': '#000', 'spacing-4': '1rem' };
 * const customTokens = { 'secondary': '#fff', 'spacing-4': '1.5rem' };
 * const merged = mergeTheme(baseTokens, customTokens);
 * // Returns: { 'primary': '#000', 'secondary': '#fff', 'spacing-4': '1.5rem' }
 * ```
 */
export function mergeTheme(...tokens: Partial<DesignTokens>[]): Partial<DesignTokens> {
    return deepMerge({}, ...tokens);
}

/**
 * Extend DesignTokens with additional tokens
 *
 * @param baseTokens - Base DesignTokens to extend
 * @param extension - Additional DesignTokens to merge
 * @returns Extended DesignTokens object
 *
 * @example
 * ```typescript
 * const base = { 'primary': '#000' };
 * const extended = extendTheme(base, { 'secondary': '#fff' });
 * // Returns: { 'primary': '#000', 'secondary': '#fff' }
 * ```
 */
export function extendTheme(baseTokens: Partial<DesignTokens>, extension: Partial<DesignTokens>): Partial<DesignTokens> {
    return mergeTheme(baseTokens, extension);
}

export default {
    deepMerge,
    mergeTheme,
    extendTheme,
};
