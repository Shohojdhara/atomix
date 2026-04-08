/**
 * Theme Utilities
 * 
 * Helper functions for common theme operations including:
 * - Theme switching (dark/light mode)
 * - Theme persistence (localStorage)
 * - System preference detection
 * - Smooth transitions
 * - Color manipulation
 */

import type { DesignTokens } from '../tokens';
import type { SpacingFunction, SpacingOptions } from '../types';
import { injectCSS, removeCSS } from '../utils/injectCSS';
import { deepMerge } from '../core/composeTheme';

// ============================================================================
// Type Definitions
// ============================================================================

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeSwitcherOptions {
  /** CSS selector for root element (default: ':root') */
  selector?: string;
  /** Storage key for theme persistence (default: 'atomix-theme') */
  storageKey?: string;
  /** Enable smooth transitions (default: true) */
  enableTransition?: boolean;
  /** Transition duration in ms (default: 300) */
  transitionDuration?: number;
}

export interface ThemePersistenceOptions {
  /** Storage key (default: 'atomix-theme') */
  storageKey?: string;
  /** Storage type (default: 'localStorage') */
  storageType?: 'localStorage' | 'sessionStorage';
}

// ============================================================================
// Theme Mode Switching
// ============================================================================

/**
 * Switch between light and dark themes
 * 
 * Automatically toggles a class on the root element and persists the choice.
 * 
 * @param mode - Theme mode ('light', 'dark', or 'system')
 * @param options - Configuration options
 * 
 * @example
 * ```typescript
 * import { switchTheme } from '@shohojdhara/atomix/theme/utils';
 * 
 * // Switch to dark mode
 * switchTheme('dark');
 * 
 * // Toggle between light/dark
 * const current = getCurrentTheme();
 * switchTheme(current === 'dark' ? 'light' : 'dark');
 * ```
 */
export function switchTheme(
  mode: ThemeMode,
  options: ThemeSwitcherOptions = {}
): void {
  const {
    selector = ':root',
    storageKey = 'atomix-theme',
    enableTransition = true,
    transitionDuration = 300,
  } = options;

  // Determine actual mode (resolve 'system')
  const resolvedMode = mode === 'system' ? getSystemTheme() : mode;

  // Get root element
  const root = selector === ':root' ? document.documentElement : document.querySelector(selector);
  if (!root) return;

  // Add transition class if enabled
  if (enableTransition) {
    const htmlRoot = root as HTMLElement;
    htmlRoot.style.transition = `all ${transitionDuration}ms ease-in-out`;
    
    // Remove transition after it completes
    setTimeout(() => {
      htmlRoot.style.transition = '';
    }, transitionDuration);
  }

  // Apply theme class
  root.classList.remove('atomix-theme-light', 'atomix-theme-dark');
  root.classList.add(`atomix-theme-${resolvedMode}`);

  // Set data attribute for CSS selectors
  root.setAttribute('data-theme', resolvedMode);

  // Persist choice
  persistTheme(resolvedMode, { storageKey });

  // Dispatch custom event for listeners
  window.dispatchEvent(new CustomEvent('atomix-theme-change', { 
    detail: { mode: resolvedMode } 
  }));
}

/**
 * Toggle between light and dark themes
 * 
 * @param options - Configuration options
 * @returns The new theme mode
 * 
 * @example
 * ```typescript
 * const newMode = toggleTheme();
 * console.log('Switched to:', newMode);
 * ```
 */
export function toggleTheme(options: ThemeSwitcherOptions = {}): ThemeMode {
  const current = getCurrentTheme(options.storageKey);
  const next = current === 'dark' ? 'light' : 'dark';
  switchTheme(next, options);
  return next;
}

/**
 * Get current theme mode
 * 
 * @param storageKey - Storage key (default: 'atomix-theme')
 * @returns Current theme mode or 'light' if not set
 */
export function getCurrentTheme(storageKey: string = 'atomix-theme'): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem(storageKey);
  return (stored as ThemeMode) || 'light';
}

/**
 * Get system theme preference
 * 
 * @returns 'dark' if system prefers dark mode, 'light' otherwise
 */
export function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/**
 * Initialize theme based on saved preference or system preference
 * 
 * Call this once at app startup.
 * 
 * @param options - Configuration options
 * @returns The initialized theme mode
 * 
 * @example
 * ```typescript
 * // In your app entry point
 * import { initializeTheme } from '@shohojdhara/atomix/theme/utils';
 * 
 * const theme = initializeTheme();
 * console.log('Theme initialized:', theme);
 * ```
 */
export function initializeTheme(options: ThemeSwitcherOptions = {}): ThemeMode {
  const saved = getCurrentTheme(options.storageKey);
  
  // If no saved preference, use system preference
  if (!saved || saved === 'system') {
    const system = getSystemTheme();
    switchTheme(system, options);
    return system;
  }
  
  // Use saved preference
  switchTheme(saved, options);
  return saved;
}

/**
 * Listen for system theme changes
 * 
 * @param callback - Function to call when system theme changes
 * @returns Cleanup function to stop listening
 * 
 * @example
 * ```typescript
 * const cleanup = listenToSystemTheme((mode) => {
 *   console.log('System theme changed to:', mode);
 *   switchTheme(mode);
 * });
 * 
 * // Later, when component unmounts
 * cleanup();
 * ```
 */
export function listenToSystemTheme(callback: (mode: ThemeMode) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };
  
  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }
  
  // Fallback for older browsers
  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}

// ============================================================================
// Theme Persistence
// ============================================================================

/**
 * Save theme preference to storage
 * 
 * @param mode - Theme mode to save
 * @param options - Persistence options
 */
export function persistTheme(
  mode: ThemeMode,
  options: ThemePersistenceOptions = {}
): void {
  if (typeof window === 'undefined') return;
  
  const {
    storageKey = 'atomix-theme',
    storageType = 'localStorage',
  } = options;
  
  const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
  storage.setItem(storageKey, mode);
}

/**
 * Clear saved theme preference
 * 
 * @param options - Persistence options
 */
export function clearThemePreference(options: ThemePersistenceOptions = {}): void {
  if (typeof window === 'undefined') return;
  
  const {
    storageKey = 'atomix-theme',
    storageType = 'localStorage',
  } = options;
  
  const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
  storage.removeItem(storageKey);
}

// ============================================================================
// Theme Tokens Manipulation
// ============================================================================

/**
 * Merge multiple token sets
 * 
 * Deep merges token objects, with later tokens overriding earlier ones.
 * 
 * @param tokens - Token objects to merge
 * @returns Merged tokens
 * 
 * @example
 * ```typescript
 * const merged = mergeTokens(
 *   baseTokens,
 *   { colors: { primary: { main: '#custom' } } }
 * );
 * ```
 */
export function mergeTokens(...tokens: Array<Partial<DesignTokens>>): Partial<DesignTokens> {
  return tokens.reduce((acc, current) => {
    return deepMerge(acc, current);
  }, {} as Partial<DesignTokens>);
}

/**
 * Override specific tokens
 * 
 * Creates a new token object with specific overrides.
 * 
 * @param base - Base tokens
 * @param overrides - Tokens to override
 * @returns New tokens with overrides applied
 * 
 * @example
 * ```typescript
 * const customized = overrideTokens(defaultTokens, {
 *   colors: {
 *     primary: { main: '#ff0000' }
 *   }
 * });
 * ```
 */
export function overrideTokens(
  base: Partial<DesignTokens>,
  overrides: Partial<DesignTokens>
): Partial<DesignTokens> {
  return deepMerge({ ...base }, overrides as any);
}

/**
 * Pick specific token categories
 * 
 * Extracts only the specified categories from tokens.
 * 
 * @param tokens - Source tokens
 * @param categories - Categories to pick
 * @returns Tokens with only selected categories
 * 
 * @example
 * ```typescript
 * const colorTokens = pickTokens(allTokens, ['colors']);
 * ```
 */
export function pickTokens(
  tokens: Partial<DesignTokens>,
  categories: Array<keyof DesignTokens>
): Partial<DesignTokens> {
  const result: Partial<DesignTokens> = {};
  
  categories.forEach(category => {
    if (tokens[category]) {
      result[category] = tokens[category];
    }
  });
  
  return result;
}

/**
 * Omit specific token categories
 * 
 * Removes specified categories from tokens.
 * 
 * @param tokens - Source tokens
 * @param categories - Categories to omit
 * @returns Tokens without omitted categories
 * 
 * @example
 * ```typescript
 * const withoutColors = omitTokens(allTokens, ['colors']);
 * ```
 */
export function omitTokens(
  tokens: Partial<DesignTokens>,
  categories: Array<keyof DesignTokens>
): Partial<DesignTokens> {
  const result = { ...tokens };
  
  categories.forEach(category => {
    delete result[category];
  });
  
  return result;
}

// ============================================================================
// Color Utilities
// ============================================================================

/**
 * Convert hex color to RGB
 * 
 * @param hex - Hex color (with or without #)
 * @returns RGB object { r, g, b }
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Handle shorthand hex
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  
  // Validate
  if (hex.length !== 6) return null;
  
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Convert RGB to hex
 * 
 * @param r - Red (0-255)
 * @param g - Green (0-255)
 * @param b - Blue (0-255)
 * @returns Hex color with #
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Calculate luminance of a color
 * 
 * Used for determining contrast ratios.
 * 
 * @param hex - Hex color
 * @returns Luminance value (0-1)
 */
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}

/**
 * Calculate contrast ratio between two colors
 * 
 * @param hex1 - First hex color
 * @param hex2 - Second hex color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if text color passes WCAG AA standard
 * 
 * @param textColor - Text color hex
 * @param backgroundColor - Background color hex
 * @param size - Font size ('small' or 'large')
 * @returns true if passes WCAG AA
 */
export function isAccessible(
  textColor: string,
  backgroundColor: string,
  size: 'small' | 'large' = 'small'
): boolean {
  const ratio = getContrastRatio(textColor, backgroundColor);
  
  // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
  const minimumRatio = size === 'large' ? 3 : 4.5;
  
  return ratio >= minimumRatio;
}

/**
 * Get appropriate text color (black or white) for a background
 * 
 * @param backgroundColor - Background hex color
 * @param threshold - Contrast threshold (default: 3)
 * @returns '#000000' or '#FFFFFF'
 */
export function getContrastText(backgroundColor: string, threshold: number = 3): string {
  const contrastWithWhite = getContrastRatio(backgroundColor, '#FFFFFF');
  if (contrastWithWhite >= threshold) {
    return '#FFFFFF';
  }
  return '#000000';
}

/**
 * Lighten a color
 * 
 * @param hex - Base hex color
 * @param amount - Amount to lighten (0-1)
 * @returns Lightened hex color
 */
export function lighten(hex: string, amount: number = 0): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  // Use amount directly as factor (0-1)
  const factor = Math.max(0, Math.min(1, amount));
  
  const r = Math.round(rgb.r + (255 - rgb.r) * factor);
  const g = Math.round(rgb.g + (255 - rgb.g) * factor);
  const b = Math.round(rgb.b + (255 - rgb.b) * factor);
  
  return rgbToHex(Math.min(255, r), Math.min(255, g), Math.min(255, b));
}

/**
 * Darken a color
 * 
 * @param hex - Base hex color
 * @param amount - Amount to darken (0-1)
 * @returns Darkened hex color
 */
export function darken(hex: string, amount: number = 0): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  // Use amount directly as factor (0-1)
  const factor = Math.max(0, Math.min(1, amount));
  
  const r = Math.round(rgb.r * (1 - factor));
  const g = Math.round(rgb.g * (1 - factor));
  const b = Math.round(rgb.b * (1 - factor));
  
  return rgbToHex(Math.max(0, r), Math.max(0, g), Math.max(0, b));
}

/**
 * Add alpha to a color
 * 
 * @param hex - Hex color
 * @param opacity - Opacity value (0-1)
 * @returns RGBA color string
 */
export function alpha(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const validOpacity = Math.max(0, Math.min(1, opacity));
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${validOpacity})`;
}

/**
 * Emphasize a color (lighten if dark, darken if light)
 * 
 * @param hex - Hex color
 * @param amount - Amount to emphasize (0-1)
 * @returns Emphasized hex color
 */
export function emphasize(hex: string, amount: number = 0.15): string {
  const luminance = getLuminance(hex);
  return luminance > 0.5 ? darken(hex, amount) : lighten(hex, amount);
}

/**
 * Create a spacing utility
 * 
 * @param spacingInput - Spacing configuration
 * @returns Spacing function
 */
export function createSpacing(spacingInput: SpacingOptions = 4): SpacingFunction {
  return (...values: number[]): string => {
    if (values.length === 0) {
      return typeof spacingInput === 'number' ? `0px` : '0px';
    }

    if (typeof spacingInput === 'function') {
      return spacingInput(...values);
    }

    return values
      .map(value => {
        if (typeof spacingInput === 'number') {
          return `${value * spacingInput}px`;
        }
        if (Array.isArray(spacingInput)) {
          const scaled = spacingInput[value];
          return typeof scaled === 'number' ? `${scaled}px` : `${value}px`;
        }
        return `${value}px`;
      })
      .join(' ');
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if value is an object
 */
function isObject(item: any): item is object {
  return item && typeof item === 'object' && !Array.isArray(item);
}
