/**
 * createTheme - Create a theme object with computed values
 * 
 * Similar to Material-UI's createTheme, this function accepts theme configuration
 * options and returns a complete theme object with computed values.
 * 
 * @example
 * ```typescript
 * const theme = createTheme({
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
} from './types';

// ============================================================================
// Default Theme Values
// ============================================================================

const DEFAULT_PALETTE: Theme['palette'] = {
    primary: {
        main: '#7AFFD7',
        light: '#A3FFE5',
        dark: '#00E6C3',
        contrastText: '#000000',
    },
    secondary: {
        main: '#FF5733',
        light: '#FF8A65',
        dark: '#C62828',
        contrastText: '#FFFFFF',
    },
    error: {
        main: '#F44336',
        light: '#E57373',
        dark: '#D32F2F',
        contrastText: '#FFFFFF',
    },
    warning: {
        main: '#FF9800',
        light: '#FFB74D',
        dark: '#F57C00',
        contrastText: '#000000',
    },
    info: {
        main: '#2196F3',
        light: '#64B5F6',
        dark: '#1976D2',
        contrastText: '#FFFFFF',
    },
    success: {
        main: '#4CAF50',
        light: '#81C784',
        dark: '#388E3C',
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#FFFFFF',
        paper: '#F5F5F5',
        subtle: '#FAFAFA',
    },
    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
        disabled: 'rgba(0, 0, 0, 0.38)',
    },
};

const DEFAULT_TYPOGRAPHY: Theme['typography'] = {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01562em',
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.00833em',
    },
    h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '0em',
    },
    h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '0.00735em',
    },
    h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0em',
    },
    h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
    },
    body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
    },
    body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.43,
    },
};

const DEFAULT_BREAKPOINTS: Theme['breakpoints'] = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
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
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inset: 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.1), inset 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
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
 * Deep merge two objects
 */
function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (!source.hasOwnProperty(key)) continue;
            const sourceValue = source[key];
            if (isObject(sourceValue)) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key] as any, sourceValue as any);
            } else {
                Object.assign(target, { [key]: sourceValue });
            }
        }
    }

    return deepMerge(target, ...sources);
}

/**
 * Check if value is an object
 */
function isObject(item: any): item is Record<string, any> {
    return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result || !result[1] || !result[2] || !result[3]) {
        return null;
    }
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };
}

/**
 * Calculate relative luminance
 */
function getLuminance(color: string): number {
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
 * Get contrast text color (black or white) based on background
 */
function getContrastText(background: string): string {
    const luminance = getLuminance(background);
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Lighten a color
 */
function lighten(color: string, amount: number = 0.2): string {
    const rgb = hexToRgb(color);
    if (!rgb) return color;

    const { r, g, b } = rgb;
    const lightenValue = (val: number) => Math.min(255, Math.round(val + (255 - val) * amount));

    const newR = lightenValue(r ?? 0).toString(16).padStart(2, '0');
    const newG = lightenValue(g ?? 0).toString(16).padStart(2, '0');
    const newB = lightenValue(b ?? 0).toString(16).padStart(2, '0');

    return `#${newR}${newG}${newB}`;
}

/**
 * Darken a color
 */
function darken(color: string, amount: number = 0.2): string {
    const rgb = hexToRgb(color);
    if (!rgb) return color;

    const { r, g, b } = rgb;
    const darkenValue = (val: number) => Math.max(0, Math.round(val * (1 - amount)));

    const newR = darkenValue(r ?? 0).toString(16).padStart(2, '0');
    const newG = darkenValue(g ?? 0).toString(16).padStart(2, '0');
    const newB = darkenValue(b ?? 0).toString(16).padStart(2, '0');

    return `#${newR}${newG}${newB}`;
}

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
 * Create spacing function
 */
function createSpacing(spacingInput: SpacingOptions = 4): SpacingFunction {
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

/**
 * Create breakpoints object
 */
function createBreakpoints(breakpointsInput?: BreakpointsOptions): Theme['breakpoints'] {
    const values = {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
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
export function createTheme(...options: ThemeOptions[]): Theme {
    // Merge all options
    const mergedOptions = options.reduce((acc, option) => deepMerge(acc, option), {} as ThemeOptions);

    // Create palette
    const palette: Theme['palette'] = {
        primary: createPaletteColor(mergedOptions.palette?.primary || DEFAULT_PALETTE.primary),
        secondary: createPaletteColor(mergedOptions.palette?.secondary || DEFAULT_PALETTE.secondary),
        error: createPaletteColor(mergedOptions.palette?.error || DEFAULT_PALETTE.error),
        warning: createPaletteColor(mergedOptions.palette?.warning || DEFAULT_PALETTE.warning),
        info: createPaletteColor(mergedOptions.palette?.info || DEFAULT_PALETTE.info),
        success: createPaletteColor(mergedOptions.palette?.success || DEFAULT_PALETTE.success),
        background: {
            default: mergedOptions.palette?.background?.default || DEFAULT_PALETTE.background.default,
            paper: mergedOptions.palette?.background?.paper || DEFAULT_PALETTE.background.paper,
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
        { ...DEFAULT_TYPOGRAPHY } as any,
        (mergedOptions.typography || {}) as any
    ) as Theme['typography'];

    // Create spacing
    const spacing = createSpacing(mergedOptions.spacing);

    // Create breakpoints
    const breakpoints = createBreakpoints(mergedOptions.breakpoints);

    // Create shadows
    const shadows: Theme['shadows'] = deepMerge({ ...DEFAULT_SHADOWS }, mergedOptions.shadows || {});

    // Create transitions
    const transitions: Theme['transitions'] = deepMerge(
        { ...DEFAULT_TRANSITIONS },
        mergedOptions.transitions || {}
    );

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

export default createTheme;
