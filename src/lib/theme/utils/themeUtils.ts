/**
 * Theme Utilities
 * 
 * Helper utilities for working with themes, including color manipulation,
 * spacing helpers, and theme value accessors.
 */

import type { SpacingFunction, SpacingOptions } from '../types';

// ============================================================================
// Color Manipulation Utilities
// ============================================================================

/**
 * Convert hex color to RGB object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1]!, 16),
            g: parseInt(result[2]!, 16),
            b: parseInt(result[3]!, 16),
        }
        : null;
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (val: number) => {
        const hex = Math.round(Math.max(0, Math.min(255, val)))
            .toString(16)
            .padStart(2, '0');
        return hex;
    };
    return `#${toHex(r ?? 0)}${toHex(g ?? 0)}${toHex(b ?? 0)}`;
}

/**
 * Calculate relative luminance of a color
 * Used for determining contrast ratios
 */
export function getLuminance(color: string): number {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;

    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r ?? 0, g ?? 0, b ?? 0].map((c) => {
        const val = c / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * (rs ?? 0) + 0.7152 * (gs ?? 0) + 0.0722 * (bs ?? 0);
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(foreground: string, background: string): number {
    const lumA = getLuminance(foreground);
    const lumB = getLuminance(background);
    return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

/**
 * Get appropriate contrast text color (black or white) for a background color
 */
export function getContrastText(background: string, threshold: number = 3): string {
    const contrastWithWhite = getContrastRatio('#FFFFFF', background);
    const contrastWithBlack = getContrastRatio('#000000', background);

    if (contrastWithWhite >= threshold) {
        return '#FFFFFF';
    }
    if (contrastWithBlack >= threshold) {
        return '#000000';
    }

    // Default to white if neither meets threshold
    return contrastWithWhite > contrastWithBlack ? '#FFFFFF' : '#000000';
}

/**
 * Lighten a color by a given amount
 * 
 * @param color - Hex color string
 * @param amount - Amount to lighten (0-1), default 0.2
 * @returns Lightened hex color
 */
export function lighten(color: string, amount: number = 0.2): string {
    const rgb = hexToRgb(color);
    if (!rgb) return color;

    const { r, g, b } = rgb;
    const lightenValue = (val: number) => Math.min(255, Math.round(val + (255 - val) * amount));

    return rgbToHex(lightenValue(r), lightenValue(g), lightenValue(b));
}

/**
 * Darken a color by a given amount
 * 
 * @param color - Hex color string
 * @param amount - Amount to darken (0-1), default 0.2
 * @returns Darkened hex color
 */
export function darken(color: string, amount: number = 0.2): string {
    const rgb = hexToRgb(color);
    if (!rgb) return color;

    const { r, g, b } = rgb;
    const darkenValue = (val: number) => Math.max(0, Math.round(val * (1 - amount)));

    return rgbToHex(darkenValue(r), darkenValue(g), darkenValue(b));
}

/**
 * Add alpha (opacity) to a color
 * 
 * @param color - Hex color string
 * @param opacity - Opacity value (0-1)
 * @returns RGBA color string
 */
export function alpha(color: string, opacity: number): string {
    const rgb = hexToRgb(color);
    if (!rgb) return color;

    const { r, g, b } = rgb;
    const clampedOpacity = Math.max(0, Math.min(1, opacity));

    return `rgba(${r}, ${g}, ${b}, ${clampedOpacity})`;
}

/**
 * Emphasize a color (lighten if dark, darken if light)
 * 
 * @param color - Hex color string
 * @param coefficient - Amount to emphasize (0-1), default 0.15
 * @returns Emphasized hex color
 */
export function emphasize(color: string, coefficient: number = 0.15): string {
    const luminance = getLuminance(color);
    return luminance > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

// ============================================================================
// Spacing Utilities
// ============================================================================

/**
 * Create a spacing function from various input types
 * 
 * @param spacingInput - Spacing configuration (number, array, or function), default 4
 * @returns Spacing function
 */
export function createSpacing(spacingInput: SpacingOptions = 4): SpacingFunction {
    // If it's already a function, return it
    if (typeof spacingInput === 'function') {
        return spacingInput;
    }

    // If it's a number, create a function that multiplies by that number
    if (typeof spacingInput === 'number') {
        return (...values: number[]) => {
            if (values.length === 0) return '0px';
            return values.map((value) => `${value * spacingInput}px`).join(' ');
        };
    }

    // If it's an array, use it as a scale
    if (Array.isArray(spacingInput)) {
        return (...values: number[]) => {
            if (values.length === 0) return '0px';
            return values.map((value) => `${spacingInput[value] || value}px`).join(' ');
        };
    }

    // Default to 4px base
    return (...values: number[]) => {
        if (values.length === 0) return '0px';
        return values.map((value) => `${value * 4}px`).join(' ');
    };
}

