/**
 * createThemeObject - Create a theme object with computed values
 * 
 * Similar to Material-UI's createTheme, this function accepts theme configuration
 * options and returns a complete theme object with computed values.
 * 
 * NOTE: For most use cases, use the simple theme system's `createTheme` instead,
 * which generates CSS from DesignTokens. This function is for advanced use cases
 * that need the full Theme object structure.
 * 
 * @example
 * ```typescript
 * const theme = createThemeObject({
 *   palette: {
 *     primary: { main: '#7AFFD7' },
 *     secondary: { main: '#FF5733' },
 *   },
 *   typography: {
 *     fontFamily: 'Inter, sans-serif',
 *   },
 * });
 * ```
 */

import type {
    Theme,
    ThemeOptions,
    PaletteColor,
    PaletteOptions,
    TypographyOptions,
    SpacingOptions,
    SpacingFunction,
    BreakpointsOptions,
    ShadowOptions,
    TransitionOptions,
    ZIndexOptions,
    BorderRadiusOptions,
} from '../types';
import { hexToRgb, getLuminance, getContrastText, lighten, darken, createSpacing } from '../utils/themeUtils';
import { deepMerge } from './composeTheme';

// ============================================================================
// Default Theme Values
// ============================================================================

const DEFAULT_PALETTE: Theme['palette'] = {
    primary: {
        main: '#7c3aed', // Primary-6
        light: '#d0b2f5', // Primary-3
        dark: '#3c1583', // Primary-9
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#f3f4f6', // Gray-2
        light: '#ffffff', // Gray-1
        dark: '#e5e7eb', // Gray-3
        contrastText: '#1f2937', // Gray-9
    },
    error: {
        main: '#ef4444', // Red-6
        light: '#fca5a5', // Red-4
        dark: '#991b1b', // Red-9
        contrastText: '#ffffff',
    },
    warning: {
        main: '#eab308', // Yellow-6
        light: '#fde047', // Yellow-4
        dark: '#854d0e', // Yellow-9
        contrastText: '#000000',
    },
    info: {
        main: '#3b82f6', // Blue-6
        light: '#93c5fd', // Blue-4
        dark: '#1e40af', // Blue-9
        contrastText: '#ffffff',
    },
    success: {
        main: '#22c55e', // Green-6
        light: '#86efac', // Green-4
        dark: '#166534', // Green-9
        contrastText: '#ffffff',
    },
    background: {
        default: '#ffffff', // Primary-bg
        paper: '#f3f4f6', // Secondary-bg
        subtle: '#d1d5db', // Gray-4 (Tertiary-bg)
    },
    text: {
        primary: '#111827', // Gray-10
        secondary: '#374151', // Gray-8
        disabled: '#9ca3af', // Gray-5
    },
};

const DEFAULT_TYPOGRAPHY: Theme['typography'] = {
    fontFamily: '"Roboto", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    fontSize: 16, // 1rem
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    fontWeightHeavy: 800,
    fontWeightBlack: 900,
    h1: {
        fontSize: '2.5rem', // 40px
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-1px',
    },
    h2: {
        fontSize: '2rem', // 32px
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-1px',
    },
    h3: {
        fontSize: '1.5rem', // 24px
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-1px',
    },
    h4: {
        fontSize: '1.25rem', // 20px
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.5px',
    },
    h5: {
        fontSize: '1.125rem', // 18px
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.5px',
    },
    h6: {
        fontSize: '1rem', // 16px
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.5px',
    },
    body1: {
        fontSize: '1rem', // 16px
        fontWeight: 400,
        lineHeight: 1.2,
    },
    body2: {
        fontSize: '0.875rem', // 14px
        fontWeight: 400,
        lineHeight: 1.2,
    },
};

const DEFAULT_BREAKPOINTS: Theme['breakpoints'] = {
    values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1440,
    },
    unit: 'px',
    up: (key) => {
        const value = typeof key === 'number' ? key : DEFAULT_BREAKPOINTS.values[key] || 0;
        return `@media (min-width:${value}${DEFAULT_BREAKPOINTS.unit})`;
    },
    down: (key) => {
        const value = typeof key === 'number' ? key : DEFAULT_BREAKPOINTS.values[key] || 0;
        return `@media (max-width:${value - 0.05}${DEFAULT_BREAKPOINTS.unit})`;
    },
    between: (start, end) => {
        const startValue = typeof start === 'number' ? start : DEFAULT_BREAKPOINTS.values[start] || 0;
        const endValue = typeof end === 'number' ? end : DEFAULT_BREAKPOINTS.values[end] || 0;
        return `@media (min-width:${startValue}${DEFAULT_BREAKPOINTS.unit}) and (max-width:${endValue - 0.05}${DEFAULT_BREAKPOINTS.unit})`;
    },
};

const DEFAULT_SHADOWS: Theme['shadows'] = {
    xs: '0px 1px 2px 0px rgba(45, 54, 67, 0.04), 0px 2px 4px 0px rgba(45, 54, 67, 0.08)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.075)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.175)',
    xl: '0px 16px 64px -8px rgba(45, 54, 67, 0.14)',
    inset: 'inset 0 1px 2px rgba(0, 0, 0, 0.075)',
};

const DEFAULT_TRANSITIONS: Theme['transitions'] = {
    duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
    },
    easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
};

const DEFAULT_ZINDEX: Theme['zIndex'] = {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1020,
    drawer: 1070,
    modal: 1040,
    snackbar: 1080,
    tooltip: 1060,
};

const DEFAULT_BORDER_RADIUS: Theme['borderRadius'] = {
    base: '0.5rem',    // 8px (spacing-2)
    sm: '0.25rem',     // 4px (spacing-1)
    md: '0.25rem',     // 4px (spacing-1)
    lg: '0.625rem',    // 10px (spacing-2.5)
    xl: '0.75rem',     // 12px (spacing-3)
    xxl: '1rem',       // 16px (spacing-4)
    '3xl': '1.5rem',   // 24px (spacing-6)
    '4xl': '2rem',     // 32px (spacing-8)
    pill: '50rem',     // 800px (spacing-200)
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create a complete palette color from partial configuration
 */
function createPaletteColor(color: Partial<PaletteColor> | string): PaletteColor {
    if (typeof color === 'string') {
        return {
            main: color,
            light: lighten(color),
            dark: darken(color),
            contrastText: getContrastText(color),
        };
    }

    return {
        main: color.main || '#000000',
        light: color.light || lighten(color.main || '#000000'),
        dark: color.dark || darken(color.main || '#000000'),
        contrastText: color.contrastText || getContrastText(color.main || '#000000'),
    };
}


/**
 * Create breakpoints object
 */
function createBreakpoints(breakpointsInput?: BreakpointsOptions): Theme['breakpoints'] {
    const values = {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1440,
        ...breakpointsInput?.values,
    };

    const unit = breakpointsInput?.unit || 'px';

    return {
        values,
        unit,
        up: (key) => {
            const value = typeof key === 'number' ? key : (values[key as keyof typeof values] ?? 0);
            return `@media (min-width:${value}${unit})`;
        },
        down: (key) => {
            const value = typeof key === 'number' ? key : (values[key as keyof typeof values] ?? 0);
            return `@media (max-width:${value - 0.05}${unit})`;
        },
        between: (start, end) => {
            const startValue = typeof start === 'number' ? start : (values[start as keyof typeof values] ?? 0);
            const endValue = typeof end === 'number' ? end : (values[end as keyof typeof values] ?? 0);
            return `@media (min-width:${startValue}${unit}) and (max-width:${endValue - 0.05}${unit})`;
        },
    };
}

// ============================================================================
// Main createTheme Function
// ============================================================================

/**
 * Create a theme object with computed values
 * 
 * @param options - Theme configuration options
 * @returns Complete theme object
 */
export function createThemeObject(...options: ThemeOptions[]): Theme {
    // Merge all options by spreading them into a single object
    const mergedOptions = options.reduce((acc, option) => {
        // Cast option to any to avoid strict typing during merge
        const opt = option as any;
        return deepMerge(acc, opt || {}) as any;
    }, {} as any);

    // Create palette
    const palette: Theme['palette'] = {
        primary: createPaletteColor(mergedOptions.palette?.primary || DEFAULT_PALETTE.primary),
        secondary: createPaletteColor(mergedOptions.palette?.secondary || DEFAULT_PALETTE.secondary),
        error: createPaletteColor(mergedOptions.palette?.error || DEFAULT_PALETTE.error),
        warning: createPaletteColor(mergedOptions.palette?.warning || DEFAULT_PALETTE.warning),
        info: createPaletteColor(mergedOptions.palette?.info || DEFAULT_PALETTE.info),
        success: createPaletteColor(mergedOptions.palette?.success || DEFAULT_PALETTE.success),
        // Handle light and dark colors if provided
        ...(mergedOptions.palette?.light && {
            light: createPaletteColor(mergedOptions.palette.light),
        }),
        ...(mergedOptions.palette?.dark && {
            dark: createPaletteColor(mergedOptions.palette.dark),
        }),
        background: {
            default: mergedOptions.palette?.background?.default || DEFAULT_PALETTE.background.default,
            subtle: mergedOptions.palette?.background?.subtle || DEFAULT_PALETTE.background.subtle,
        },
        text: {
            primary: mergedOptions.palette?.text?.primary || DEFAULT_PALETTE.text.primary,
            secondary: mergedOptions.palette?.text?.secondary || DEFAULT_PALETTE.text.secondary,
            disabled: mergedOptions.palette?.text?.disabled || DEFAULT_PALETTE.text.disabled,
        },
    };

    // Create typography
    const typography: Theme['typography'] = deepMerge(
        { ...DEFAULT_TYPOGRAPHY } as Partial<Theme['typography']>,
        (mergedOptions.typography || {}) as Partial<Theme['typography']>
    ) as Theme['typography'];

    // Create spacing
    const spacing = createSpacing(mergedOptions.spacing);

    // Create breakpoints
    const breakpoints = createBreakpoints(mergedOptions.breakpoints);

    // Create shadows
    const shadows: Theme['shadows'] = deepMerge({ ...DEFAULT_SHADOWS }, mergedOptions.shadows || {});

    // Create transitions
    const transitions: Theme['transitions'] = deepMerge(
        { ...DEFAULT_TRANSITIONS } as Partial<Theme['transitions']>,
        (mergedOptions.transitions || {}) as Partial<Theme['transitions']>
    ) as Theme['transitions'];

    // Create z-index
    const zIndex: Theme['zIndex'] = deepMerge({ ...DEFAULT_ZINDEX }, mergedOptions.zIndex || {});

    // Create border radius
    const borderRadius: Theme['borderRadius'] = deepMerge(
        { ...DEFAULT_BORDER_RADIUS },
        mergedOptions.borderRadius || {}
    );

    // Create theme object
    const theme: Theme = {
        // Metadata
        name: mergedOptions.name || 'Custom Theme',
        class: mergedOptions.class,
        description: mergedOptions.description,
        author: mergedOptions.author,
        version: mergedOptions.version || '1.0.0',
        tags: mergedOptions.tags,
        supportsDarkMode: mergedOptions.supportsDarkMode,
        status: mergedOptions.status || 'experimental',
        a11y: mergedOptions.a11y,
        color: mergedOptions.color || palette.primary.main,
        features: mergedOptions.features,
        dependencies: mergedOptions.dependencies,

        // Theme configuration
        palette,
        typography,
        spacing,
        breakpoints,
        shadows,
        transitions,
        zIndex,
        borderRadius,
        custom: mergedOptions.custom || {},

        // Mark as JS theme
        __isJSTheme: true,
    };

    return theme;
}

export default createThemeObject;
