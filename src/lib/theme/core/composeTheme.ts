/**
 * Theme Composition Utilities
 *
 * Simplified utilities for composing, merging, and extending themes.
 */

import type { Theme, ThemeOptions } from '../types';
import { createThemeObject } from './createThemeObject';

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
// Theme Merging
// ============================================================================

/**
 * Merge multiple theme options into a single theme options object
 *
 * @param themes - Theme options to merge
 * @returns Merged theme options
 *
 * @example
 * ```typescript
 * const baseTheme = { palette: { primary: { main: '#000' } } };
 * const customTheme = { palette: { secondary: { main: '#fff' } } };
 * const merged = mergeTheme(baseTheme, customTheme);
 * ```
 */
export function mergeTheme(...themes: ThemeOptions[]): ThemeOptions {
    return deepMerge({}, ...themes);
}

/**
 * Extend an existing theme with new options
 *
 * @param baseTheme - Base theme to extend (can be Theme or ThemeOptions)
 * @param extension - Theme options to extend with
 * @returns New theme with extended options
 *
 * @example
 * ```typescript
 * const base = createTheme({ palette: { primary: { main: '#000' } } });
 * const extended = extendTheme(base, {
 *   palette: { secondary: { main: '#fff' } }
 * });
 * ```
 */
export function extendTheme(baseTheme: Theme | ThemeOptions, extension: ThemeOptions): Theme {
    // Convert baseTheme to ThemeOptions if it's a complete Theme
    const baseOptions: ThemeOptions = (baseTheme as Theme & { __isJSTheme?: boolean }).__isJSTheme
        ? { ...baseTheme } as ThemeOptions
        : baseTheme;

    // Merge and create new theme
    const merged = mergeTheme(baseOptions, extension);
    return createThemeObject(merged);
}

export default {
    deepMerge,
    mergeTheme,
    extendTheme,
};
