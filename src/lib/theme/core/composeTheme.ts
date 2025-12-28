/**
 * Theme Composition Utilities
 * 
 * Utilities for composing, merging, and extending themes.
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
export function deepMerge<T extends Record<string, any>>(...objects: Partial<T>[]): T {
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
                result[key] = deepMerge(targetValue as any, sourceValue as any) as any;
            } else {
                // Override with source value
                result[key] = sourceValue as any;
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
    // If baseTheme is a complete Theme, extract the options
    const baseOptions: ThemeOptions = (baseTheme as any).__isJSTheme
        ? extractThemeOptions(baseTheme as Theme)
        : (baseTheme as ThemeOptions);

    const merged = mergeTheme(baseOptions, extension);
    return createThemeObject(merged);
}

/**
 * Extract theme options from a complete Theme object
 */
function extractThemeOptions(theme: Theme): ThemeOptions {
    return {
        name: theme.name,
        class: theme.class,
        description: theme.description,
        author: theme.author,
        version: theme.version,
        tags: theme.tags,
        supportsDarkMode: theme.supportsDarkMode,
        status: theme.status,
        a11y: theme.a11y,
        color: theme.color,
        features: theme.features,
        dependencies: theme.dependencies,
        palette: {
            primary: theme.palette.primary,
            secondary: theme.palette.secondary,
            error: theme.palette.error,
            warning: theme.palette.warning,
            info: theme.palette.info,
            success: theme.palette.success,
            background: theme.palette.background,
            text: theme.palette.text,
        },
        typography: {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            fontWeightLight: theme.typography.fontWeightLight,
            fontWeightRegular: theme.typography.fontWeightRegular,
            fontWeightMedium: theme.typography.fontWeightMedium,
            fontWeightSemiBold: theme.typography.fontWeightSemiBold,
            fontWeightBold: theme.typography.fontWeightBold,
            h1: theme.typography.h1,
            h2: theme.typography.h2,
            h3: theme.typography.h3,
            h4: theme.typography.h4,
            h5: theme.typography.h5,
            h6: theme.typography.h6,
            body1: theme.typography.body1,
            body2: theme.typography.body2,
        },
        shadows: theme.shadows,
        transitions: theme.transitions,
        zIndex: theme.zIndex,
        custom: theme.custom,
    };
}

export default {
    deepMerge,
    mergeTheme,
    extendTheme,
};
