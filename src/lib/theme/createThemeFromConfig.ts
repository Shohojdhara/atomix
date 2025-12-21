/**
 * Create Theme from Atomix Config
 * 
 * Helper function to create a theme from atomix.config.ts,
 * similar to how Tailwind processes its config.
 * 
 * @example
 * ```typescript
 * import { createThemeFromConfig } from '@shohojdhara/atomix/theme';
 * import config from './atomix.config';
 * 
 * const theme = createThemeFromConfig(config);
 * ```
 */

import type { AtomixConfig } from '../config';
import { createTheme } from './createTheme';
import type { ThemeOptions } from './types';

/**
 * Convert config tokens to theme options
 */
function configToThemeOptions(config: AtomixConfig): ThemeOptions {
    const tokens = config.theme?.tokens || config.theme?.extend || {};
    const options: ThemeOptions = {};

    // Convert colors
    if (tokens.colors) {
        options.palette = {};
        
        // Handle primary color
        if (tokens.colors.primary) {
            const primary = tokens.colors.primary;
            if (typeof primary === 'string') {
                options.palette.primary = { main: primary };
            } else if (typeof primary === 'object' && 'main' in primary) {
                options.palette.primary = primary as any;
            } else if (typeof primary === 'object' && '6' in primary) {
                // Color scale format
                options.palette.primary = { main: (primary as any)[6] || (primary as any).main };
            }
        }

        // Handle other colors
        if (tokens.colors) {
            const colorKeys = ['secondary', 'error', 'warning', 'info', 'success'] as const;
            colorKeys.forEach((key) => {
                if (tokens.colors![key]) {
                    const color = tokens.colors![key];
                    if (typeof color === 'string') {
                        options.palette![key] = { main: color };
                    } else if (typeof color === 'object' && 'main' in color) {
                        options.palette![key] = color as any;
                    } else if (typeof color === 'object' && '6' in color) {
                        options.palette![key] = { main: (color as any)[6] || (color as any).main };
                    }
                }
            });
        }
    }

    // Convert typography
    if (tokens.typography) {
        options.typography = {};
        
        if (tokens.typography.fontFamilies?.sans) {
            options.typography.fontFamily = Array.isArray(tokens.typography.fontFamilies.sans)
                ? tokens.typography.fontFamilies.sans.join(', ')
                : tokens.typography.fontFamilies.sans;
        }
        
        if (tokens.typography.fontSizes) {
            // Map font sizes to theme typography
            const baseSize = tokens.typography.fontSizes.base || tokens.typography.fontSizes.md;
            if (baseSize) {
                const numericSize = parseFloat(String(baseSize).replace(/[^\d.]/g, ''));
                options.typography.fontSize = numericSize || 16;
            }
        }
    }

    // Convert spacing (if needed for theme spacing function)
    if (tokens.spacing) {
        // Spacing is handled via CSS variables, but we can set a base multiplier
        options.spacing = 4; // Default 4px base unit
    }

    // Convert border radius
    if (tokens.borderRadius) {
        options.borderRadius = {};
        Object.entries(tokens.borderRadius).forEach(([key, value]) => {
            options.borderRadius![key as keyof typeof options.borderRadius] = String(value);
        });
    }

    return options;
}

/**
 * Create a theme from Atomix configuration
 * 
 * This function converts atomix.config.ts format to a theme object
 * that can be used with ThemeProvider.
 * 
 * @param config - Atomix configuration object
 * @returns Theme object ready for use
 * 
 * @example
 * ```typescript
 * import { createThemeFromConfig } from '@shohojdhara/atomix/theme';
 * import config from './atomix.config';
 * 
 * const theme = createThemeFromConfig(config);
 * ```
 */
export function createThemeFromConfig(config: AtomixConfig) {
    const themeOptions = configToThemeOptions(config);
    
    // Create theme with options
    const theme = createTheme(themeOptions);
    
    // Apply prefix if specified
    if (config.prefix && config.prefix !== 'atomix') {
        // Note: Prefix is applied when generating CSS variables
        // The theme object itself doesn't store prefix
    }
    
    return theme;
}

export default createThemeFromConfig;

