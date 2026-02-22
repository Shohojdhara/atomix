import { useCallback } from 'react';
import { useTheme } from './useTheme';
import type { DesignTokens } from '../tokens/tokens';

/**
 * Standardized hook for accessing theme tokens in components
 *
 * Provides consistent access to theme values using CSS custom properties
 * and DesignTokens.
 */
type ThemeTokens = {
  theme: string;
  activeTokens: DesignTokens | null;
  getToken: (tokenName: string, fallback?: string) => string;
  colors: {
    primary: string;
    secondary: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  typography: {
    fontFamily: Record<string, string>;
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
  };
  shadows: Record<string, string>;
  transitions: Record<string, string>;
};

export function useThemeTokens(): ThemeTokens {
  const { theme, activeTokens } = useTheme();

  // Helper function to get CSS variable value
  const getToken = useCallback((tokenName: string, fallback?: string) => {
    if (typeof window === 'undefined') return fallback || '';

    const cssVarName = `--atomix-${tokenName}`;
    const computedStyle = getComputedStyle(document.documentElement);
    return computedStyle.getPropertyValue(cssVarName).trim() || fallback || '';
  }, []);

  // Return unified API for accessing theme values
  // Note: For SSR or direct token access, use activeTokens directly
  return <ThemeTokens>{
    theme,
    activeTokens,
    getToken,
    // Commonly used tokens with fallbacks
    colors: {
      primary: getToken('primary', '#3b82f6'),
      secondary: getToken('secondary', '#10b981'),
      error: getToken('error', '#ef4444'),
      success: getToken('success', '#22c55e'),
      warning: getToken('warning', '#eab308'),
      info: getToken('info', '#3b82f6'),
      light: getToken('light', '#f9fafb'),
      dark: getToken('dark', '#111827'),
    },
    spacing: {
      1: getToken('spacing-1', '0.25rem'),
      2: getToken('spacing-2', '0.5rem'),
      3: getToken('spacing-3', '0.75rem'),
      4: getToken('spacing-4', '1rem'),
      5: getToken('spacing-5', '1.25rem'),
      6: getToken('spacing-6', '1.5rem'),
      8: getToken('spacing-8', '2rem'),
      10: getToken('spacing-10', '2.5rem'),
      12: getToken('spacing-12', '3rem'),
      16: getToken('spacing-16', '4rem'),
      20: getToken('spacing-20', '5rem'),
    },
    borderRadius: {
      sm: getToken('border-radius-sm', '0.25rem'),
      md: getToken('border-radius-md', '0.5rem'),
      lg: getToken('border-radius-lg', '0.75rem'),
      xl: getToken('border-radius-xl', '1rem'),
      full: getToken('border-radius-full', '9999px'),
    },
    typography: {
      fontFamily: {
        sans: getToken('font-sans-serif', 'Inter, system-ui, sans-serif'),
        serif: getToken('font-serif', 'Georgia, serif'),
        mono: getToken('font-monospace', 'Fira Code, monospace'),
      },
      fontSize: {
        xs: getToken('font-size-xs', '0.75rem'),
        sm: getToken('font-size-sm', '0.875rem'),
        md: getToken('font-size-md', '1rem'),
        lg: getToken('font-size-lg', '1.125rem'),
        xl: getToken('font-size-xl', '1.25rem'),
        '2xl': getToken('font-size-2xl', '1.5rem'),
        '3xl': getToken('font-size-3xl', '1.875rem'),
        '4xl': getToken('font-size-4xl', '2.25rem'),
      },
      fontWeight: {
        light: getToken('font-weight-light', '300'),
        normal: getToken('font-weight-normal', '400'),
        medium: getToken('font-weight-medium', '500'),
        semibold: getToken('font-weight-semibold', '600'),
        bold: getToken('font-weight-bold', '700'),
      },
    },
    shadows: {
      sm: getToken('box-shadow-sm', '0 1px 2px 0 rgba(0, 0, 0, 0.05)'),
      md: getToken('box-shadow-md', '0 4px 6px -1px rgba(0, 0, 0, 0.1)'),
      lg: getToken('box-shadow-lg', '0 10px 15px -3px rgba(0, 0, 0, 0.1)'),
      xl: getToken('box-shadow-xl', '0 20px 25px -5px rgba(0, 0, 0, 0.1)'),
      inset: getToken('box-shadow-inset', 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'),
    },
    transitions: {
      fast: getToken('transition-fast', '150ms'),
      base: getToken('transition-base', '200ms'),
      slow: getToken('transition-slow', '300ms'),
    },
  };
}
