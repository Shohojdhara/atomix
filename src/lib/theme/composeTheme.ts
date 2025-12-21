/**
 * Theme Composition Utilities
 * 
 * Utilities for composing, merging, and extending themes.
 */

import type { Theme, ThemeOptions } from './types';
import { createTheme } from './createTheme';

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
            if (!source.hasOwnProperty(key)) continue;

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
    return createTheme(merged);
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

// ============================================================================
// Theme Variants
// ============================================================================

/**
 * Create light and dark variants from a base theme
 * 
 * @param baseTheme - Base theme options
 * @returns Object with light and dark theme variants
 * 
 * @example
 * ```typescript
 * const { light, dark } = createThemeVariants({
 *   palette: { primary: { main: '#7AFFD7' } }
 * });
 * ```
 */
export function createThemeVariants(baseTheme: ThemeOptions): {
    light: Theme;
    dark: Theme;
} {
    // Light theme (use base as-is or with light adjustments)
    const lightTheme = createTheme({
        ...baseTheme,
        name: `${baseTheme.name || 'Custom'} Light`,
        supportsDarkMode: false,
    });

    // Dark theme (invert colors)
    const darkTheme = createTheme({
        ...baseTheme,
        name: `${baseTheme.name || 'Custom'} Dark`,
        supportsDarkMode: true,
        palette: {
            ...baseTheme.palette,
            background: {
                default: '#121212',
                subtle: '#2A2A2A',
                ...baseTheme.palette?.background,
            },
            text: {
                primary: 'rgba(255, 255, 255, 0.87)',
                secondary: 'rgba(255, 255, 255, 0.6)',
                disabled: 'rgba(255, 255, 255, 0.38)',
                ...baseTheme.palette?.text,
            },
        },
    });

    return { light: lightTheme, dark: darkTheme };
}

// ============================================================================
// Theme Overrides
// ============================================================================

/**
 * Create a theme with specific overrides
 * 
 * @param baseTheme - Base theme
 * @param overrides - Specific overrides to apply
 * @returns New theme with overrides
 * 
 * @example
 * ```typescript
 * const theme = overrideTheme(baseTheme, {
 *   'palette.primary.main': '#FF0000',
 *   'typography.fontSize': 16,
 * });
 * ```
 */
export function overrideTheme(
    baseTheme: Theme | ThemeOptions,
    overrides: Record<string, any>
): Theme {
    const baseOptions: ThemeOptions = (baseTheme as any).__isJSTheme
        ? extractThemeOptions(baseTheme as Theme)
        : (baseTheme as ThemeOptions);

    // Convert dot notation overrides to nested object
    const nestedOverrides: any = {};
    for (const [path, value] of Object.entries(overrides)) {
        const keys = path.split('.');
        let current = nestedOverrides;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i] as string;
            if (typeof key !== 'string' || key === '') {
                throw new Error('Invalid override key in theme override: ' + String(key));
            }
            if (typeof current !== 'object' || current === null) {
                throw new Error('Cannot set override for path due to non-object path segment');
            }
            if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
                current[key] = {};
            }
            current = current[key] as Record<string, any>;
        }

        const lastKey = keys[keys.length - 1] as string;
        if (typeof lastKey === 'string') {
            current[lastKey] = value;
        }

    }

    return createTheme(deepMerge(baseOptions, nestedOverrides));
}

// ============================================================================
// Theme Composition Helpers
// ============================================================================

/**
 * Compose multiple themes by merging them in order
 * 
 * @param themes - Themes to compose (later themes override earlier ones)
 * @returns Composed theme
 * 
 * @example
 * ```typescript
 * const theme = composeThemes(
 *   baseTheme,
 *   brandTheme,
 *   customizationTheme
 * );
 * ```
 */
export function composeThemes(...themes: (Theme | ThemeOptions)[]): Theme {
    const options = themes.map((theme) =>
        (theme as any).__isJSTheme ? extractThemeOptions(theme as Theme) : (theme as ThemeOptions)
    );

    return createTheme(mergeTheme(...options));
}

/**
 * Create a theme preset with common configurations
 * 
 * @param preset - Preset name
 * @param customizations - Additional customizations
 * @returns Theme with preset applied
 */
export function createThemePreset(
    preset: 'minimal' | 'modern' | 'classic' | 'vibrant',
    customizations?: ThemeOptions
): Theme {
    const presets: Record<string, ThemeOptions> = {
        minimal: {
            name: 'Minimal',
            palette: {
                primary: { main: '#000000' },
                secondary: { main: '#FFFFFF' },
                background: {
                    default: '#FFFFFF',
                    subtle: '#FAFAFA',
                },
            },
            typography: {
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            },
        },
        modern: {
            name: 'Modern',
            palette: {
                primary: { main: '#7AFFD7' },
                secondary: { main: '#FF5733' },
                background: {
                    default: '#FAFAFA',
                    subtle: '#F5F5F5',
                },
            },
            typography: {
                fontFamily: '"Inter", "Roboto", sans-serif',
            },
        },
        classic: {
            name: 'Classic',
            palette: {
                primary: { main: '#1976D2' },
                secondary: { main: '#DC004E' },
                background: {
                    default: '#FFFFFF',
                    subtle: '#EEEEEE',
                },
            },
            typography: {
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            },
        },
        vibrant: {
            name: 'Vibrant',
            palette: {
                primary: { main: '#FF6B6B' },
                secondary: { main: '#4ECDC4' },
                background: {
                    default: '#FFF8F0',
                    subtle: '#FFF0E0',
                },
            },
            typography: {
                fontFamily: '"Poppins", "Roboto", sans-serif',
            },
        },
    };

    const basePreset: ThemeOptions = (presets[preset] ?? presets['modern']) as ThemeOptions;
    const customThemeOptions: ThemeOptions = customizations ?? ({} as ThemeOptions);
    return createTheme(mergeTheme(basePreset, customThemeOptions));
}

export default {
    deepMerge,
    mergeTheme,
    extendTheme,
    createThemeVariants,
    overrideTheme,
    composeThemes,
    createThemePreset,
};
