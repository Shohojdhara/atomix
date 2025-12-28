/**
 * CSS Variable Generator
 * 
 * Generates CSS custom properties from theme objects and injects them into the DOM.
 * 
 * **Token Naming Alignment:**
 * This generator produces CSS variables that match the SCSS token naming pattern exactly:
 * - Colors: --atomix-primary, --atomix-primary-1 through --atomix-primary-10
 * - Spacing: --atomix-spacing-1, --atomix-spacing-4, etc.
 * - Typography: --atomix-font-size-base, --atomix-font-weight-normal, etc.
 * - Shadows: --atomix-box-shadow, --atomix-box-shadow-sm, etc.
 * 
 * All tokens follow the flat structure pattern used in SCSS (not nested like --atomix-palette-primary-main).
 * This ensures compatibility between SCSS themes and JavaScript themes.
 * 
 * @see src/styles/03-generic/_generic.root.scss for SCSS token definitions
 */

import type { Theme } from '../types';
import { isBrowser } from '../utils/domUtils';
import { hexToRgb, alpha, lighten, darken, emphasize } from '../utils/themeUtils';

// ============================================================================
// CSS Variable Generation
// ============================================================================

/**
 * Options for CSS variable generation
 */
export interface GenerateCSSVariablesOptions {
    /** CSS selector for the variables (default: ':root') */
    selector?: string;
    /** Whether to inject the CSS into the DOM */
    inject?: boolean;
    /** ID for the injected style element */
    styleId?: string;
    /** Prefix for CSS variables (default: 'atomix') */
    prefix?: string;
}

/**
 * Convert a nested object to flat CSS variable declarations
 */
function flattenObject(
    obj: Record<string, any>,
    prefix: string = '',
    result: Record<string, string> = {}
): Record<string, string> {
    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

        const value = obj[key];
        const newKey = prefix ? `${prefix}-${key}` : key;

        if (value && typeof value === 'object' && !Array.isArray(value)) {
            // Skip special objects like functions
            if (typeof value === 'function') continue;

            // Recursively flatten nested objects
            flattenObject(value, newKey, result);
        } else if (typeof value === 'string' || typeof value === 'number') {
            // Convert camelCase to kebab-case
            const kebabKey = newKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            result[kebabKey] = String(value);
        }
    }

    return result;
}

/**
 * Generate a color scale from a base color (1-10 steps)
 * Creates lighter to darker variations
 */
function generateColorScale(baseColor: string, prefix: string, colorName: string): Record<string, string> {
    const vars: Record<string, string> = {};
    const rgb = hexToRgb(baseColor);
    if (!rgb) return vars;

    // Generate 10-step scale
    // Steps 1-5: lighter variations
    // Step 6: base color
    // Steps 7-10: darker variations
    for (let i = 1; i <= 10; i++) {
        let color: string;
        if (i < 6) {
            // Lighter: mix with white
            const mixRatio = (6 - i) / 5;
            color = lighten(baseColor, mixRatio * 0.8);
        } else if (i === 6) {
            // Base color
            color = baseColor;
        } else {
            // Darker: mix with black
            const mixRatio = (i - 6) / 4;
            color = darken(baseColor, mixRatio * 0.6);
        }
        vars[`${prefix}-${colorName}-${i}`] = color;
    }

    return vars;
}

/**
 * Generate CSS variables from theme palette
 * 
 * Matches SCSS token naming pattern:
 * - --atomix-primary (main color)
 * - --atomix-primary-1 through --atomix-primary-10 (color scale)
 * - --atomix-primary-main (alias for primary-6)
 * - --atomix-primary-light (alias for primary-3)
 * - --atomix-primary-dark (alias for primary-9)
 */
function generatePaletteVariables(palette: Theme['palette'], prefix: string): Record<string, string> {
    const vars: Record<string, string> = {};

    // Primary, secondary, error, warning, info, success, light, dark
    const colorKeys = ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'light', 'dark'] as const;
    colorKeys.forEach((key) => {
        const color = palette[key];
        if (color && typeof color === 'object') {
            // Main color (flat structure, matches SCSS: --atomix-primary)
            vars[`${prefix}-${key}`] = color.main;

            // Generate RGB for transparency support (matches SCSS: --atomix-primary-rgb)
            const rgb = hexToRgb(color.main);
            if (rgb) {
                vars[`${prefix}-${key}-rgb`] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
            }

            // Generate full color scale (1-10) - matches SCSS: --atomix-primary-1 through --atomix-primary-10
            // Only for primary, secondary, error, warning, info, success (not for light/dark)
            if (key !== 'light' && key !== 'dark') {
                const colorScale = generateColorScale(color.main, prefix, key);
                Object.assign(vars, colorScale);
            } else {
                // For light/dark, use the provided values directly
                vars[`${prefix}-${key}-main`] = color.main;
                if (color.light) vars[`${prefix}-${key}-light`] = color.light;
                if (color.dark) vars[`${prefix}-${key}-dark`] = color.dark;
            }

            // Map dark variant to hover (matches SCSS: --atomix-primary-hover)
            if (color.dark) {
                vars[`${prefix}-${key}-hover`] = color.dark;
            }

            // Generate semantic color variants (matches SCSS patterns)
            // Text emphasis: emphasized version of the color for text (--atomix-primary-text-emphasis)
            vars[`${prefix}-${key}-text-emphasis`] = emphasize(color.main, 0.15);

            // Background subtle: very light version for backgrounds (--atomix-primary-bg-subtle)
            vars[`${prefix}-${key}-bg-subtle`] = alpha(color.main, 0.1);

            // Border subtle: light version for borders (--atomix-primary-border-subtle)
            vars[`${prefix}-${key}-border-subtle`] = alpha(color.main, 0.2);
        }
    });

    // Generate gray scale from text colors (matches SCSS: --atomix-gray-1 through --atomix-gray-10)
    // Use text.primary as base for gray scale
    if (palette.text?.primary) {
        const grayScale = generateColorScale(palette.text.primary, prefix, 'gray');
        Object.assign(vars, grayScale);
    }

    // Generate red, green, blue, yellow scales (matches SCSS: --atomix-red-1 through --atomix-red-10, etc.)
    // These are typically used for semantic colors but can be extended
    if (palette.error && typeof palette.error === 'object' && palette.error.main) {
        const redScale = generateColorScale(palette.error.main, prefix, 'red');
        Object.assign(vars, redScale);
    }
    if (palette.success && typeof palette.success === 'object' && palette.success.main) {
        const greenScale = generateColorScale(palette.success.main, prefix, 'green');
        Object.assign(vars, greenScale);
    }
    if (palette.info && typeof palette.info === 'object' && palette.info.main) {
        const blueScale = generateColorScale(palette.info.main, prefix, 'blue');
        Object.assign(vars, blueScale);
    }
    if (palette.warning && typeof palette.warning === 'object' && palette.warning.main) {
        const yellowScale = generateColorScale(palette.warning.main, prefix, 'yellow');
        Object.assign(vars, yellowScale);
    }

    // Background mappings to SCSS body variables (matches SCSS: --atomix-body-bg)
    if (palette.background) {
        vars[`${prefix}-body-bg`] = palette.background.default;
        
        // Generate background subtle variants (matches SCSS: --atomix-primary-bg-subtle, etc.)
        if (palette.background.default) {
            vars[`${prefix}-primary-bg-subtle`] = palette.background.default;
        }
        if (palette.background.paper) {
            vars[`${prefix}-secondary-bg-subtle`] = palette.background.paper;
            vars[`${prefix}-tertiary-bg-subtle`] = palette.background.paper;
        }
        if (palette.background.subtle) {
            vars[`${prefix}-invert-bg-subtle`] = palette.background.subtle;
        }
        
        // Brand bg subtle (uses primary color with alpha)
        if (palette.primary) {
            vars[`${prefix}-brand-bg-subtle`] = alpha(palette.primary.main, 0.1);
        }
    }

    // Text mappings to SCSS body variables (matches SCSS: --atomix-body-color, --atomix-primary-text-emphasis, etc.)
    if (palette.text) {
        vars[`${prefix}-body-color`] = palette.text.primary;
        
        // Generate text emphasis variants (matches SCSS pattern)
        if (palette.text.primary) {
            vars[`${prefix}-primary-text-emphasis`] = palette.text.primary;
        }
        if (palette.text.secondary) {
            vars[`${prefix}-secondary-text-emphasis`] = palette.text.secondary;
            vars[`${prefix}-tertiary-text-emphasis`] = palette.text.secondary;
        }
        if (palette.text.disabled) {
            vars[`${prefix}-disabled-text-emphasis`] = palette.text.disabled;
        }
        
        // Invert text emphasis (opposite of primary)
        if (palette.text.primary) {
            // Invert would be the opposite - for light themes, use dark; for dark themes, use light
            // This is a simplified approach - actual inversion depends on theme mode
            vars[`${prefix}-invert-text-emphasis`] = palette.text.primary;
        }
    }

    // Brand text emphasis (uses primary color) - matches SCSS: --atomix-brand-text-emphasis
    if (palette.primary) {
        vars[`${prefix}-brand-text-emphasis`] = palette.primary.main;
        // Brand border subtle - matches SCSS: --atomix-brand-border-subtle
        vars[`${prefix}-brand-border-subtle`] = alpha(palette.primary.main, 0.2);
    }
    
    // Light and dark border subtle (if light/dark colors exist) - matches SCSS pattern
    if (palette.light && typeof palette.light === 'object') {
        vars[`${prefix}-light-border-subtle`] = alpha(palette.light.main, 0.2);
    }
    if (palette.dark && typeof palette.dark === 'object') {
        vars[`${prefix}-dark-border-subtle`] = alpha(palette.dark.main, 0.2);
    }

    // Heading color (defaults to text primary) - matches SCSS: --atomix-heading-color
    if (palette.text) {
        vars[`${prefix}-heading-color`] = palette.text.primary;
    }

    // Link colors (defaults to primary color)
    if (palette.primary) {
        vars[`${prefix}-link-color`] = palette.primary.main;
        const linkRgb = hexToRgb(palette.primary.main);
        if (linkRgb) {
            vars[`${prefix}-link-color-rgb`] = `${linkRgb.r}, ${linkRgb.g}, ${linkRgb.b}`;
        }
        // Link hover color (slightly darker)
        vars[`${prefix}-link-hover-color`] = palette.primary.dark || darken(palette.primary.main, 0.1);
        const linkHoverRgb = hexToRgb(palette.primary.dark || darken(palette.primary.main, 0.1));
        if (linkHoverRgb) {
            vars[`${prefix}-link-hover-color-rgb`] = `${linkHoverRgb.r}, ${linkHoverRgb.g}, ${linkHoverRgb.b}`;
        }
        // Link decoration (default: none, matching tokens list)
        vars[`${prefix}-link-decoration`] = 'none';
    }

    // Border color (defaults to subtle gray)
    if (palette.text) {
        vars[`${prefix}-border-color`] = alpha(palette.text.primary, 0.1);
        vars[`${prefix}-border-color-translucent`] = alpha(palette.text.primary, 0.15);
    }

    // Focus border color (defaults to primary)
    if (palette.primary) {
        vars[`${prefix}-focus-border-color`] = palette.primary.main;
    }

    // Form validation colors
    if (palette.success) {
        vars[`${prefix}-form-valid-color`] = palette.success.main;
        vars[`${prefix}-form-valid-border-color`] = alpha(palette.success.main, 0.3);
    }
    if (palette.error) {
        vars[`${prefix}-form-invalid-color`] = palette.error.main;
        vars[`${prefix}-form-invalid-border-color`] = alpha(palette.error.main, 0.3);
    }

    // Code/highlight colors
    // Highlight background (defaults to subtle yellow)
    if (palette.warning) {
        vars[`${prefix}-highlight-bg`] = alpha(palette.warning.main, 0.2);
    } else {
        vars[`${prefix}-highlight-bg`] = 'rgba(255, 235, 59, 0.2)';
    }

    // Code color (defaults to text secondary)
    if (palette.text) {
        vars[`${prefix}-code-color`] = palette.text.secondary;
    }

    // Generate gradient tokens for all colors
    // Gradients use the color scale (lighter to darker variations)
    const gradientColors = ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'light', 'dark'] as const;
    gradientColors.forEach((key) => {
        const color = palette[key];
        if (color && typeof color === 'object') {
            // Generate gradient using color scale steps
            // Use steps 1, 3, 5 from the color scale for a smooth gradient
            const color1 = lighten(color.main, 0.6);
            const color2 = lighten(color.main, 0.3);
            const color3 = color.main;
            vars[`${prefix}-${key}-gradient`] = `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`;
        }
    });
    
    // Default gradient (uses gray scale)
    if (palette.text?.primary) {
        const gray1 = lighten(palette.text.primary, 0.8);
        const gray2 = lighten(palette.text.primary, 0.6);
        const gray3 = lighten(palette.text.primary, 0.4);
        vars[`${prefix}-gradient`] = `linear-gradient(135deg, ${gray1}, ${gray2}, ${gray3})`;
    }

    return vars;
}

/**
 * Generate CSS variables from theme typography
 * 
 * Matches SCSS token naming pattern:
 * - --atomix-body-font-family
 * - --atomix-body-font-size
 * - --atomix-font-weight-normal
 * - --atomix-line-height-base
 */
function generateTypographyVariables(
    typography: Theme['typography'],
    prefix: string
): Record<string, string> {
    const vars: Record<string, string> = {};

    // Font family (matches SCSS: --atomix-body-font-family, --atomix-font-sans-serif, --atomix-font-monospace)
    vars[`${prefix}-body-font-family`] = typography.fontFamily;
    vars[`${prefix}-font-sans-serif`] = typography.fontFamily;
    vars[`${prefix}-font-monospace`] = 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

    // Root font size (matches SCSS: --atomix-root-font-size)
    // Typically 16px, but can be customized
    const rootFontSize = typography.fontSize || 16;
    vars[`${prefix}-root-font-size`] = `${rootFontSize}px`;

    // Base font size (matches SCSS: --atomix-body-font-size)
    const baseFontSize = typography.fontSize;
    vars[`${prefix}-body-font-size`] = `${baseFontSize}px`;

    // Base font weight (matches SCSS: --atomix-body-font-weight)
    vars[`${prefix}-body-font-weight`] = String(typography.fontWeightRegular);

    // Font weight scale (matches SCSS: --atomix-font-weight-light, --atomix-font-weight-normal, etc.)
    vars[`${prefix}-font-weight-light`] = String(typography.fontWeightLight ?? 300);
    vars[`${prefix}-font-weight-normal`] = String(typography.fontWeightRegular ?? 400);
    vars[`${prefix}-font-weight-medium`] = String(typography.fontWeightMedium ?? 500);
    vars[`${prefix}-font-weight-semibold`] = String(typography.fontWeightSemiBold ?? 600);
    vars[`${prefix}-font-weight-bold`] = String(typography.fontWeightBold ?? 700);
    // Optional font weights (may not be in theme, but exist in design tokens)
    if ('fontWeightHeavy' in typography) {
        vars[`${prefix}-font-weight-heavy`] = String((typography as any).fontWeightHeavy || 800);
    }
    if ('fontWeightBlack' in typography) {
        vars[`${prefix}-font-weight-black`] = String((typography as any).fontWeightBlack || 900);
    }

    // Base line height (matches SCSS: --atomix-body-line-height)
    const baseLineHeight = typeof typography.body1?.lineHeight === 'number'
        ? typography.body1.lineHeight
        : parseFloat(String(typography.body1?.lineHeight || 1.2));
    vars[`${prefix}-body-line-height`] = String(baseLineHeight);

    // Line height scale (matches SCSS: --atomix-line-height-base, --atomix-line-height-sm, --atomix-line-height-lg)
    vars[`${prefix}-line-height-base`] = String(baseLineHeight);
    vars[`${prefix}-line-height-sm`] = String(1.43);
    vars[`${prefix}-line-height-lg`] = String(1.56);

    // Extended font size scale (matches SCSS: --atomix-font-size-xs, --atomix-font-size-sm, etc.)
    const fontSizeXs = baseFontSize * 0.75; // 12px if base is 16px
    const fontSizeSm = baseFontSize * 0.875; // 14px if base is 16px
    const fontSizeMd = baseFontSize * 1; // 16px if base is 16px (same as base)
    const fontSizeLg = baseFontSize * 1.125; // 18px if base is 16px
    const fontSizeXl = baseFontSize * 1.5; // 24px if base is 16px
    const fontSize2xl = baseFontSize * 2; // 32px if base is 16px

    vars[`${prefix}-font-size-xs`] = `${fontSizeXs}px`;
    vars[`${prefix}-font-size-sm`] = `${fontSizeSm}px`;
    vars[`${prefix}-font-size-md`] = `${fontSizeMd}px`;
    vars[`${prefix}-font-size-lg`] = `${fontSizeLg}px`;
    vars[`${prefix}-font-size-xl`] = `${fontSizeXl}px`;
    vars[`${prefix}-font-size-2xl`] = `${fontSize2xl}px`;

    // Display font size (matches SCSS: --atomix-display-1)
    if ('display1' in typography) {
        const display1 = (typography as any).display1;
        vars[`${prefix}-display-1`] = typeof display1 === 'string' ? display1 : `${display1}px`;
    }

    // Letter spacing for headings (matches SCSS: --atomix-letter-spacing-h1, etc.)
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    headings.forEach((heading) => {
        const headingConfig = typography[heading];
        if (headingConfig?.letterSpacing) {
            vars[`${prefix}-letter-spacing-${heading}`] = String(headingConfig.letterSpacing);
        }
    });

    return vars;
}

/**
 * Generate CSS variables from theme shadows
 * 
 * Matches SCSS token naming pattern:
 * - --atomix-box-shadow (base, mapped from md)
 * - --atomix-box-shadow-xs, --atomix-box-shadow-sm, --atomix-box-shadow-lg, --atomix-box-shadow-xl
 * - --atomix-box-shadow-inset
 */
function generateShadowVariables(shadows: Theme['shadows'], prefix: string): Record<string, string> {
    const vars: Record<string, string> = {};

    // Map JS shadow keys to SCSS variables (matches SCSS pattern exactly)
    if (shadows.md) vars[`${prefix}-box-shadow`] = shadows.md; // Map md to base
    if (shadows.xs) vars[`${prefix}-box-shadow-xs`] = shadows.xs;
    if (shadows.sm) vars[`${prefix}-box-shadow-sm`] = shadows.sm;
    if (shadows.lg) vars[`${prefix}-box-shadow-lg`] = shadows.lg;
    if (shadows.xl) vars[`${prefix}-box-shadow-xl`] = shadows.xl;

    // Inset shadow (matches SCSS: --atomix-box-shadow-inset)
    if (shadows.inset) {
        vars[`${prefix}-box-shadow-inset`] = shadows.inset;
    } else if (shadows.sm) {
        // Generate inset shadow from sm shadow
        vars[`${prefix}-box-shadow-inset`] = shadows.sm.replace(/^0\s/, 'inset ');
    }

    return vars;
}

/**
 * Generate CSS variables from theme transitions
 */
function generateTransitionVariables(
    transitions: Theme['transitions'],
    prefix: string
): Record<string, string> {
    const vars: Record<string, string> = {};

    // Map JS transition durations to SCSS equivalents (in seconds to match design tokens)
    const durationFast = transitions.duration.shortest || 150;
    const durationBase = transitions.duration.standard || 300;
    const durationSlow = transitions.duration.complex || 500;
    const durationSlower = 700; // Default value for slower duration
    const easingBase = transitions.easing.easeInOut || 'cubic-bezier(0.23, 1, 0.32, 1)';

    vars[`${prefix}-transition-duration-fast`] = `${durationFast / 1000}s`;
    vars[`${prefix}-transition-duration-base`] = `${durationBase / 1000}s`;
    vars[`${prefix}-transition-duration-slow`] = `${durationSlow / 1000}s`;
    vars[`${prefix}-transition-duration-slower`] = `${durationSlower / 1000}s`;

    // Map easing functions
    vars[`${prefix}-easing-base`] = easingBase;
    vars[`${prefix}-easing-ease-in-out`] = transitions.easing.easeInOut || 'cubic-bezier(0.4, 0, 0.2, 1)';
    vars[`${prefix}-easing-ease-out`] = transitions.easing.easeOut || 'cubic-bezier(0, 0, 0.2, 1)';
    vars[`${prefix}-easing-ease-in`] = transitions.easing.easeIn || 'cubic-bezier(0.4, 0, 1, 1)';
    vars[`${prefix}-easing-ease-linear`] = 'linear';

    // Generate full transition strings
    vars[`${prefix}-transition-fast`] = `all ${durationFast / 1000}s ${easingBase}`;
    vars[`${prefix}-transition-base`] = `all ${durationBase / 1000}s ${easingBase}`;
    vars[`${prefix}-transition-slow`] = `all ${durationSlow / 1000}s ${easingBase}`;

    return vars;
}

/**
 * Generate CSS variables from theme z-index
 */
function generateZIndexVariables(zIndex: Theme['zIndex'], prefix: string): Record<string, string> {
    const vars: Record<string, string> = {};

    // Generate z-index scale (matching tokens list)
    vars[`${prefix}-z-n1`] = '-1';
    vars[`${prefix}-z-0`] = '0';
    vars[`${prefix}-z-1`] = '1';
    vars[`${prefix}-z-2`] = '2';
    vars[`${prefix}-z-3`] = '3';
    vars[`${prefix}-z-4`] = '4';
    vars[`${prefix}-z-5`] = '5';

    // Map to SCSS z-layers (semantic z-index values)
    if (zIndex.mobileStepper) vars[`${prefix}-z-dropdown`] = String(zIndex.mobileStepper);
    if (zIndex.appBar) vars[`${prefix}-z-sticky`] = String(zIndex.appBar);
    vars[`${prefix}-z-fixed`] = '1030'; // Default fixed
    if (zIndex.modal) vars[`${prefix}-z-modal`] = String(zIndex.modal);
    if (zIndex.speedDial) vars[`${prefix}-z-popover`] = String(zIndex.speedDial);
    if (zIndex.tooltip) vars[`${prefix}-z-tooltip`] = String(zIndex.tooltip);
    if (zIndex.drawer) vars[`${prefix}-z-drawer`] = String(zIndex.drawer);

    // Keep original mappings if needed or remove if strictly aligning
    if (zIndex.snackbar) vars[`${prefix}-z-snackbar`] = String(zIndex.snackbar);

    return vars;
}

/**
 * Generate CSS variables from theme breakpoints
 */
function generateBreakpointVariables(
    breakpoints: Theme['breakpoints'],
    prefix: string
): Record<string, string> {
    const vars: Record<string, string> = {};

    Object.entries(breakpoints.values).forEach(([key, value]) => {
        vars[`${prefix}-breakpoint-${key}`] = `${value}${breakpoints.unit}`;
    });

    return vars;
}

/**
 * Generate CSS variables from theme spacing
 */
function generateSpacingVariables(
    spacing: Theme['spacing'],
    prefix: string
): Record<string, string> {
    const vars: Record<string, string> = {};

    // Generate spacing scale based on design system tokens
    // Note: Some spacing values like px-6, px-10, etc. are generated from the spacing function
    // and should match the actual design system spacing scale
    // Values are multipliers for the spacing base unit (default 4px)
    const spacingScale: Record<string, number> = {
        '0': 0,
        '1': 1,        // 4px (1 × 4 = 4px)
        'px-6': 1.5,   // 6px (1.5 × 4 = 6px)
        '2': 2,        // 8px (2 × 4 = 8px)
        'px-10': 2.5,  // 10px (2.5 × 4 = 10px)
        '3': 3,        // 12px (3 × 4 = 12px)
        'px-14': 3.5,  // 14px (3.5 × 4 = 14px)
        '4': 4,        // 16px (4 × 4 = 16px)
        '5': 5,        // 20px (5 × 4 = 20px)
        'px-22': 5.5,  // 22px (5.5 × 4 = 22px)
        '6': 6,        // 24px (6 × 4 = 24px)
        '7': 7,        // 28px (7 × 4 = 28px)
        'px-30': 7.5,  // 30px (7.5 × 4 = 30px)
        '8': 8,        // 32px (8 × 4 = 32px)
        '9': 9,        // 36px (9 × 4 = 36px)
        '10': 10,      // 40px (10 × 4 = 40px)
        '11': 11,      // 44px (11 × 4 = 44px)
        '12': 12,      // 48px (12 × 4 = 48px)
        '14': 14,      // 56px (14 × 4 = 56px)
        '16': 16,      // 64px (16 × 4 = 64px)
        '20': 20,      // 80px (20 × 4 = 80px)
        '24': 24,      // 96px (24 × 4 = 96px)
        '28': 28,      // 112px (28 × 4 = 112px)
        '32': 32,      // 128px (32 × 4 = 128px)
        '36': 36,      // 144px (36 × 4 = 144px)
        '40': 40,      // 160px (40 × 4 = 160px)
        '44': 44,      // 176px (44 × 4 = 176px)
        '48': 48,      // 192px (48 × 4 = 192px)
        '52': 52,      // 208px (52 × 4 = 208px)
        '56': 56,      // 224px (56 × 4 = 224px)
        '60': 60,      // 240px (60 × 4 = 240px)
        '64': 64,      // 256px (64 × 4 = 256px)
        '72': 72,      // 288px (72 × 4 = 288px)
        '80': 80,      // 320px (80 × 4 = 320px)
        '90': 90,      // 360px (90 × 4 = 360px)
        '200': 200,    // 800px (200 × 4 = 800px)
    };

    // Generate spacing variables
    // Use the spacing function to calculate values
    Object.entries(spacingScale).forEach(([key, multiplier]) => {
        const spacingValue = spacing(multiplier);
        // Extract numeric value and convert to rem if needed
        const match = spacingValue.match(/([\d.]+)px/);
        if (match && match[1]) {
            const pxValue = parseFloat(match[1]);
            const remValue = pxValue / 16; // Convert px to rem (assuming 16px base)
            vars[`${prefix}-spacing-${key}`] = `${remValue}rem`;
        } else {
            vars[`${prefix}-spacing-${key}`] = spacingValue;
        }
    });

    return vars;
}

/**
 * Generate border-related CSS variables
 */
function generateBorderVariables(
    palette: Theme['palette'],
    prefix: string
): Record<string, string> {
    const vars: Record<string, string> = {};

    // Border width
    vars[`${prefix}-border-width`] = '1px';

    // Border style
    vars[`${prefix}-border-style`] = 'solid';

    // Border color (already generated in palette, but ensure it exists)
    if (!vars[`${prefix}-border-color`] && palette.text) {
        vars[`${prefix}-border-color`] = alpha(palette.text.primary, 0.1);
    }

    return vars;
}

/**
 * Generate border radius CSS variables
 */
function generateBorderRadiusVariables(
    borderRadius: Theme['borderRadius'],
    prefix: string
): Record<string, string> {
    const vars: Record<string, string> = {};

    // Convert values to string with proper units
    const formatValue = (value: string | number | undefined, defaultValue: string): string => {
        if (value === undefined) return defaultValue;
        if (typeof value === 'number') return `${value}px`;
        return String(value);
    };

    // Base border radius (maps to spacing-2 = 8px)
    vars[`${prefix}-border-radius`] = formatValue(borderRadius.base, '0.5rem');

    // Small border radius (maps to spacing-1 = 4px)
    vars[`${prefix}-border-radius-sm`] = formatValue(borderRadius.sm, '0.25rem');

    // Large border radius (maps to spacing-2.5 = 10px)
    vars[`${prefix}-border-radius-lg`] = formatValue(borderRadius.lg, '0.625rem');

    // Extra large border radius (maps to spacing-3 = 12px)
    vars[`${prefix}-border-radius-xl`] = formatValue(borderRadius.xl, '0.75rem');

    // 2X large border radius (maps to spacing-4 = 16px)
    vars[`${prefix}-border-radius-xxl`] = formatValue(borderRadius.xxl, '1rem');

    // 3X large border radius (maps to spacing-6 = 24px)
    vars[`${prefix}-border-radius-3xl`] = formatValue(borderRadius['3xl'], '1.5rem');

    // 4X large border radius (maps to spacing-8 = 32px)
    vars[`${prefix}-border-radius-4xl`] = formatValue(borderRadius['4xl'], '2rem');

    // Pill shape (fully rounded, maps to spacing-200 = 800px)
    vars[`${prefix}-border-radius-pill`] = formatValue(borderRadius.pill, '50rem');

    return vars;
}

/**
 * Generate focus ring CSS variables
 */
function generateFocusRingVariables(
    palette: Theme['palette'],
    prefix: string
): Record<string, string> {
    const vars: Record<string, string> = {};

    // Focus ring properties
    vars[`${prefix}-focus-ring-width`] = '3px';
    vars[`${prefix}-focus-ring-offset`] = '2px';
    vars[`${prefix}-focus-ring-opacity`] = '0.25';

    return vars;
}

/**
 * Generate CSS custom properties from a theme object
 * 
 * @param theme - Theme object created with createTheme
 * @param options - Generation options
 * @returns CSS string with custom properties
 */
export function generateCSSVariables(
    theme: Theme,
    options: GenerateCSSVariablesOptions = {}
): string {
    const {
        selector = ':root',
        inject = false,
        styleId = 'atomix-theme-variables',
        prefix = 'atomix',
    } = options;

    const variables: Record<string, string> = {};

    // Generate variables from each theme section
    Object.assign(variables, generatePaletteVariables(theme.palette, prefix));
    Object.assign(variables, generateTypographyVariables(theme.typography, prefix));
    Object.assign(variables, generateShadowVariables(theme.shadows, prefix));
    Object.assign(variables, generateTransitionVariables(theme.transitions, prefix));
    Object.assign(variables, generateZIndexVariables(theme.zIndex, prefix));
    Object.assign(variables, generateBreakpointVariables(theme.breakpoints, prefix));
    Object.assign(variables, generateSpacingVariables(theme.spacing, prefix));
    Object.assign(variables, generateBorderVariables(theme.palette, prefix));
    Object.assign(variables, generateBorderRadiusVariables(theme.borderRadius, prefix));
    Object.assign(variables, generateFocusRingVariables(theme.palette, prefix));

    // Add custom properties if present
    if (theme.custom && Object.keys(theme.custom).length > 0) {
        const customVars = flattenObject(theme.custom, `${prefix}-custom`);
        Object.assign(variables, customVars);
    }

    // Convert to CSS string
    const cssVariables = Object.entries(variables)
        .map(([key, value]) => `  --${key}: ${value};`)
        .join('\n');

    const css = `${selector} {\n${cssVariables}\n}`;

    // Inject into DOM if requested
    if (inject && isBrowser()) {
        injectCSS(css, styleId);
    }

    return css;
}

/**
 * Inject CSS into the DOM
 * 
 * @param css - CSS string to inject
 * @param styleId - ID for the style element
 */
export function injectCSS(css: string, styleId: string = 'atomix-theme-variables'): void {
    if (!isBrowser()) return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.setAttribute('data-atomix-theme-vars', 'true');
        document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
}

/**
 * Remove injected CSS from the DOM
 * 
 * @param styleId - ID of the style element to remove
 */
export function removeInjectedCSS(styleId: string = 'atomix-theme-variables'): void {
    if (!isBrowser()) return;

    const styleElement = document.getElementById(styleId);
    if (styleElement) {
        styleElement.remove();
    }
}

/**
 * Generate CSS variables for a specific theme section
 * 
 * @param theme - Theme object
 * @param section - Theme section to generate variables for
 * @param options - Generation options
 * @returns CSS string with custom properties for the section
 */
export function generateSectionVariables(
    theme: Theme,
    section: 'palette' | 'typography' | 'shadows' | 'transitions' | 'zIndex' | 'breakpoints' | 'spacing' | 'borders' | 'borderRadius' | 'focusRing',
    options: GenerateCSSVariablesOptions = {}
): string {
    const { selector = ':root', prefix = 'atomix' } = options;

    let variables: Record<string, string> = {};

    switch (section) {
        case 'palette':
            variables = generatePaletteVariables(theme.palette, prefix);
            break;
        case 'typography':
            variables = generateTypographyVariables(theme.typography, prefix);
            break;
        case 'shadows':
            variables = generateShadowVariables(theme.shadows, prefix);
            break;
        case 'transitions':
            variables = generateTransitionVariables(theme.transitions, prefix);
            break;
        case 'zIndex':
            variables = generateZIndexVariables(theme.zIndex, prefix);
            break;
        case 'breakpoints':
            variables = generateBreakpointVariables(theme.breakpoints, prefix);
            break;
        case 'spacing':
            variables = generateSpacingVariables(theme.spacing, prefix);
            break;
        case 'borders':
            variables = generateBorderVariables(theme.palette, prefix);
            break;
        case 'borderRadius':
            variables = generateBorderRadiusVariables(theme.borderRadius, prefix);
            break;
        case 'focusRing':
            variables = generateFocusRingVariables(theme.palette, prefix);
            break;
    }

    const cssVariables = Object.entries(variables)
        .map(([key, value]) => `  --${key}: ${value};`)
        .join('\n');

    return `${selector} {\n${cssVariables}\n}`;
}

export default generateCSSVariables;
