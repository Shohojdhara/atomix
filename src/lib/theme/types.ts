/**
 * Theme Manager Type Definitions
 * 
 * TypeScript types and interfaces for the Atomix Design System theme management system.
 */

import type { ThemeManager as ThemeManagerType } from './runtime/ThemeManager';
import type { PartStyleProps } from '../types/partProps';

/**
 * Theme metadata interface matching themes.config.js structure
 */
export interface ThemeMetadata {
    /** Display name of the theme */
    name: string;
    /** Unique identifier/class name for the theme */
    class?: string;
    /** Theme description */
    description?: string;
    /** Theme author */
    author?: string;
    /** Theme version (semver) */
    version?: string;
    /** Theme tags for categorization */
    tags?: string[];
    /** Whether the theme supports dark mode */
    supportsDarkMode?: boolean;
    /** Theme status: stable, beta, experimental, deprecated */
    status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
    /** Accessibility information */
    a11y?: {
        /** Target contrast ratio */
        contrastTarget?: number;
        /** Supported color modes */
        modes?: string[];
    };
    /** Primary theme color (for UI display) */
    color?: string;
    /** Theme features list */
    features?: string[];
    /** Theme dependencies (other themes required) */
    dependencies?: string[];
}

/**
 * Theme manager configuration options
 */
export interface ThemeManagerConfig {
    /** Available themes metadata */
    themes: Record<string, ThemeMetadata>;
    /** Default theme to use */
    defaultTheme?: string | Theme;
    /** Base path for theme CSS files */
    basePath?: string;
    /** CDN path for theme CSS files (optional) */
    cdnPath?: string | null;
    /** Themes to preload on initialization */
    preload?: string[];
    /** Enable lazy loading of themes */
    lazy?: boolean;
    /** localStorage key for persistence */
    storageKey?: string;
    /** Data attribute name for theme */
    dataAttribute?: string;
    /** Enable persistence */
    enablePersistence?: boolean;
    /** Custom CSS file extension */
    cssExtension?: string;
    /** Use minified CSS files */
    useMinified?: boolean;
    /** Callback when theme changes */
    onThemeChange?: (theme: string | Theme) => void;
    /** Callback when theme load fails */
    onError?: (error: Error, themeName: string) => void;
    /** RTL configuration */
    rtl?: import('./i18n/rtl').RTLConfig;
}

/**
 * Theme change event payload
 */
export interface ThemeChangeEvent {
    /** Previous theme name */
    previousTheme: string | null;
    /** New theme name */
    currentTheme: string;
    /** Theme object (for JS themes) */
    themeObject?: Theme | null;
    /** Timestamp of the change */
    timestamp: number;
    /** Whether the change was from user action or system */
    source: 'user' | 'system' | 'storage';
}

/**
 * Theme load options
 */
export interface ThemeLoadOptions {
    /** Force reload even if already loaded */
    force?: boolean;
    /** Preload without applying */
    preload?: boolean;
    /** Remove previous theme CSS */
    removePrevious?: boolean;
    /** Custom CSS path override */
    customPath?: string;
    /** Fallback to default theme on error */
    fallbackOnError?: boolean;
}

/**
 * Theme validation result
 */
export interface ThemeValidationResult {
    /** Whether the theme is valid */
    valid: boolean;
    /** Validation errors */
    errors: string[];
    /** Validation warnings */
    warnings: string[];
}

/**
 * Theme manager event types
 */
export type ThemeManagerEvent = 'themeChange' | 'themeLoad' | 'themeError';

/**
 * Theme change callback function
 */
export type ThemeChangeCallback = (event: ThemeChangeEvent) => void;

/**
 * Theme load callback function
 */
export type ThemeLoadCallback = (themeName: string) => void;

/**
 * Theme error callback function
 */
export type ThemeErrorCallback = (error: Error, themeName: string) => void;

/**
 * Event listener map
 */
export interface ThemeEventListeners {
    themeChange: ThemeChangeCallback[];
    themeLoad: ThemeLoadCallback[];
    themeError: ThemeErrorCallback[];
}

/**
 * React hook options for useTheme
 */
export interface UseThemeOptions {
    /** Default theme (overrides ThemeProvider default) */
    defaultTheme?: string;
    /** Enable persistence for this hook instance */
    enablePersistence?: boolean;
    /** Custom storage key */
    storageKey?: string;
    /** Callback when theme changes */
    onChange?: (theme: string | Theme) => void;
}

/**
 * React hook return type for useTheme
 */
export interface UseThemeReturn {
    /** Current theme name */
    theme: string;
    /** Current active theme object (for JS themes) */
    activeTheme: Theme | null;
    /** Function to change theme */
    setTheme: (theme: string | Theme, options?: ThemeLoadOptions) => Promise<void>;
    /** Available themes */
    availableThemes: ThemeMetadata[];
    /** Whether a theme is currently loading */
    isLoading: boolean;
    /** Current error, if any */
    error: Error | null;
    /** Whether a specific theme is loaded */
    isThemeLoaded: (themeName: string) => boolean;
    /** Preload a theme */
    preloadTheme: (themeName: string) => Promise<void>;
}

/**
 * Component-level theme override configuration
 */
export interface ComponentThemeOverride {
  /** CSS variable overrides for the component */
  cssVars?: Record<string, string | number>;
  
  /** Default prop overrides */
  defaultProps?: Record<string, any>;
  
  /** Part-specific overrides */
  parts?: Record<string, {
    cssVars?: Record<string, string | number>;
    className?: string;
  }>;
  
  /** Variant overrides */
  variants?: Record<string, {
    cssVars?: Record<string, string | number>;
    className?: string;
  }>;
  
  /** Additional className for the component */
  className?: string;
}

/**
 * Theme component overrides for all components
 */
export interface ThemeComponentOverrides {
  Button?: ComponentThemeOverride;
  Card?: ComponentThemeOverride;
  Input?: ComponentThemeOverride;
  Modal?: ComponentThemeOverride;
  Dropdown?: ComponentThemeOverride;
  Badge?: ComponentThemeOverride;
  Tabs?: ComponentThemeOverride;
  Progress?: ComponentThemeOverride;
  Tooltip?: ComponentThemeOverride;
  Select?: ComponentThemeOverride;
  Checkbox?: ComponentThemeOverride;
  Radio?: ComponentThemeOverride;
  Textarea?: ComponentThemeOverride;
  FormGroup?: ComponentThemeOverride;
  Navbar?: ComponentThemeOverride;
  Accordion?: ComponentThemeOverride;
  DataTable?: ComponentThemeOverride;
  Avatar?: ComponentThemeOverride;
  List?: ComponentThemeOverride;
  Popover?: ComponentThemeOverride;
  Messages?: ComponentThemeOverride;
  Callout?: ComponentThemeOverride;
  Spinner?: ComponentThemeOverride;
  [key: string]: ComponentThemeOverride | undefined;
}

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
    /** Child components */
    children: React.ReactNode;
    /** Default theme */
    defaultTheme?: string | Theme;
    /** Available themes */
    themes?: Record<string, ThemeMetadata>;
    /** Base path for theme CSS */
    basePath?: string;
    /** CDN path for theme CSS */
    cdnPath?: string | null;
    /** Themes to preload */
    preload?: string[];
    /** Enable lazy loading */
    lazy?: boolean;
    /** localStorage key */
    storageKey?: string;
    /** Data attribute name */
    dataAttribute?: string;
    /** Enable persistence */
    enablePersistence?: boolean;
    /** Use minified CSS */
    useMinified?: boolean;
    /** Callback when theme changes */
    onThemeChange?: (theme: string | Theme) => void;
    /** Callback on error */
    onError?: (error: Error, themeName: string) => void;
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
    /** Current theme name */
    theme: string;
    /** Current active theme object (for JS themes) */
    activeTheme: Theme | null;
    /** Set theme function */
    setTheme: (theme: string | Theme, options?: ThemeLoadOptions) => Promise<void>;
    /** Available themes */
    availableThemes: ThemeMetadata[];
    /** Loading state */
    isLoading: boolean;
    /** Error state */
    error: Error | null;
    /** Check if theme is loaded */
    isThemeLoaded: (themeName: string) => boolean;
    /** Preload theme */
    preloadTheme: (themeName: string) => Promise<void>;
    /** Theme manager instance */
    themeManager: ThemeManagerType;
}

// ============================================================================
// createTheme System Types
// ============================================================================

/**
 * Color palette configuration for a single color
 */
export interface PaletteColor {
    /** Main color value */
    main: string;
    /** Light variant (auto-generated if not provided) */
    light?: string;
    /** Dark variant (auto-generated if not provided) */
    dark?: string;
    /** Contrast text color (auto-generated if not provided) */
    contrastText?: string;
}

/**
 * Palette configuration options for createTheme
 */
export interface PaletteOptions {
    /** Primary color configuration */
    primary?: Partial<PaletteColor> | string;
    /** Secondary color configuration */
    secondary?: Partial<PaletteColor> | string;
    /** Error color configuration */
    error?: Partial<PaletteColor> | string;
    /** Warning color configuration */
    warning?: Partial<PaletteColor> | string;
    /** Info color configuration */
    info?: Partial<PaletteColor> | string;
    /** Success color configuration */
    success?: Partial<PaletteColor> | string;
    /** Background colors */
    background?: {
        default?: string;
        paper?: string;
        subtle?: string;
    };
    /** Text colors */
    text?: {
        primary?: string;
        secondary?: string;
        disabled?: string;
    };
    /** Additional custom colors */
    [key: string]: any;
}

/**
 * Typography configuration options for createTheme
 */
export interface TypographyOptions {
    /** Font family */
    fontFamily?: string;
    /** Base font size in pixels */
    fontSize?: number;
    /** Font weight scale */
    fontWeightLight?: number;
    fontWeightRegular?: number;
    fontWeightMedium?: number;
    fontWeightSemiBold?: number;
    fontWeightBold?: number;
    /** Heading configurations */
    h1?: {
        fontSize?: string | number;
        fontWeight?: number;
        lineHeight?: number | string;
        letterSpacing?: string;
    };
    h2?: {
        fontSize?: string | number;
        fontWeight?: number;
        lineHeight?: number | string;
        letterSpacing?: string;
    };
    h3?: {
        fontSize?: string | number;
        fontWeight?: number;
        lineHeight?: number | string;
        letterSpacing?: string;
    };
    h4?: {
        fontSize?: string | number;
        fontWeight?: number;
        lineHeight?: number | string;
        letterSpacing?: string;
    };
    h5?: {
        fontSize?: string | number;
        fontWeight?: number;
        lineHeight?: number | string;
        letterSpacing?: string;
    };
    h6?: {
        fontSize?: string | number;
        fontWeight?: number;
        lineHeight?: number | string;
        letterSpacing?: string;
    };
    /** Body text configurations */
    body1?: {
        fontSize?: string | number;
        fontWeight?: number;
        lineHeight?: number | string;
    };
    body2?: {
        fontSize?: string | number;
        fontWeight?: number;
        lineHeight?: number | string;
    };
    /** Additional custom typography */
    [key: string]: any;
}

/**
 * Spacing function type
 */
export type SpacingFunction = (...values: number[]) => string;

/**
 * Spacing configuration options for createTheme
 */
export type SpacingOptions = number | number[] | SpacingFunction;

/**
 * Breakpoint values configuration
 */
export interface BreakpointValues {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    [key: string]: number | undefined;
}

/**
 * Breakpoints configuration options for createTheme
 */
export interface BreakpointsOptions {
    /** Breakpoint values in pixels */
    values?: BreakpointValues;
    /** Unit for breakpoints (default: 'px') */
    unit?: string;
}

/**
 * Shadow configuration
 */
export interface ShadowOptions {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    [key: string]: string | undefined;
}

/**
 * Transition configuration
 */
export interface TransitionOptions {
    /** Transition duration values */
    duration?: {
        shortest?: number;
        shorter?: number;
        short?: number;
        standard?: number;
        complex?: number;
        enteringScreen?: number;
        leavingScreen?: number;
    };
    /** Easing functions */
    easing?: {
        easeInOut?: string;
        easeOut?: string;
        easeIn?: string;
        sharp?: string;
    };
}

/**
 * Z-index configuration
 */
export interface ZIndexOptions {
    mobileStepper?: number;
    speedDial?: number;
    appBar?: number;
    drawer?: number;
    modal?: number;
    snackbar?: number;
    tooltip?: number;
    [key: string]: number | undefined;
}

/**
 * Border radius configuration
 */
export interface BorderRadiusOptions {
    /** Base border radius */
    base?: string | number;
    /** Small border radius */
    sm?: string | number;
    /** Medium border radius */
    md?: string | number;
    /** Large border radius */
    lg?: string | number;
    /** Extra large border radius */
    xl?: string | number;
    /** 2X large border radius */
    xxl?: string | number;
    /** 3X large border radius */
    '3xl'?: string | number;
    /** 4X large border radius */
    '4xl'?: string | number;
    /** Pill shape (fully rounded) */
    pill?: string | number;
    [key: string]: string | number | undefined;
}

/**
 * Custom theme properties for extension
 * Users can augment this interface via module augmentation
 */
export interface ThemeCustomProperties {
    [key: string]: any;
}

/**
 * Theme configuration options for createTheme
 * Extends ThemeMetadata to support both CSS and JS theme properties
 */
export interface ThemeOptions extends Partial<ThemeMetadata> {
    /** Color palette configuration */
    palette?: PaletteOptions;
    /** Typography configuration */
    typography?: TypographyOptions;
    /** Spacing configuration */
    spacing?: SpacingOptions;
    /** Breakpoints configuration */
    breakpoints?: BreakpointsOptions;
    /** Shadow configuration */
    shadows?: ShadowOptions;
    /** Transition configuration */
    transitions?: TransitionOptions;
    /** Z-index configuration */
    zIndex?: ZIndexOptions;
    /** Border radius configuration */
    borderRadius?: BorderRadiusOptions;
    /** Custom properties */
    custom?: ThemeCustomProperties;
}

/**
 * Complete theme object with computed values
 * Generated by createTheme function
 */
export interface Theme extends ThemeMetadata {
    /** Color palette with computed values */
    palette: {
        primary: PaletteColor;
        secondary: PaletteColor;
        error: PaletteColor;
        warning: PaletteColor;
        info: PaletteColor;
        success: PaletteColor;
        background: {
            default: string;
            paper: string;
            subtle: string;
        };
        text: {
            primary: string;
            secondary: string;
            disabled: string;
        };
        [key: string]: any;
    };
    /** Typography with computed values */
    typography: {
        fontFamily: string;
        fontSize: number;
        fontWeightLight: number;
        fontWeightRegular: number;
        fontWeightMedium: number;
        fontWeightSemiBold: number;
        fontWeightBold: number;
        h1: Required<NonNullable<TypographyOptions['h1']>>;
        h2: Required<NonNullable<TypographyOptions['h2']>>;
        h3: Required<NonNullable<TypographyOptions['h3']>>;
        h4: Required<NonNullable<TypographyOptions['h4']>>;
        h5: Required<NonNullable<TypographyOptions['h5']>>;
        h6: Required<NonNullable<TypographyOptions['h6']>>;
        body1: Required<NonNullable<TypographyOptions['body1']>>;
        body2: Required<NonNullable<TypographyOptions['body2']>>;
        [key: string]: any;
    };
    /** Spacing function */
    spacing: SpacingFunction;
    /** Breakpoints with computed values */
    breakpoints: {
        values: Required<BreakpointValues>;
        unit: string;
        up: (key: keyof BreakpointValues | number) => string;
        down: (key: keyof BreakpointValues | number) => string;
        between: (start: keyof BreakpointValues | number, end: keyof BreakpointValues | number) => string;
    };
    /** Shadows */
    shadows: Required<ShadowOptions>;
    /** Transitions */
    transitions: Required<TransitionOptions>;
    /** Z-index values */
    zIndex: Required<ZIndexOptions>;
    /** Border radius values */
    borderRadius: Required<BorderRadiusOptions>;
    /** Custom properties */
    custom: ThemeCustomProperties;
    /** Global CSS variables to apply */
    cssVars?: Record<string, string | number>;
    /** Indicates this is a JS theme (not CSS-only) */
    __isJSTheme: true;
}

/**
 * Storage adapter interface for custom storage implementations
 */
export interface StorageAdapter {
    /** Get item from storage */
    getItem(key: string): string | null;
    /** Set item in storage */
    setItem(key: string, value: string): void;
    /** Remove item from storage */
    removeItem(key: string): void;
    /** Check if storage is available */
    isAvailable(): boolean;
}
