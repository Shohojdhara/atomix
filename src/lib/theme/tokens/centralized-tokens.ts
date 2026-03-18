/**
 * Centralized Design Token Library
 * 
 * This file serves as the single source of truth for all design tokens 
 * in the Atomix Design System. It consolidates colors, typography, 
 * spacing, shadows, and animations.
 */

import { DesignTokens } from './tokens';

export const COLORS = {
  primary: '#7c3aed',
  secondary: '#64748b',
  success: '#22c55e',
  info: '#3b82f6',
  warning: '#eab308',
  error: '#ef4444',
  light: '#f8fafc',
  dark: '#0f172a',
  gray: {
    1: '#f8fafc',
    2: '#f1f5f9',
    3: '#e2e8f0',
    4: '#cbd5e1',
    5: '#94a3b8',
    6: '#64748b',
    7: '#475569',
    8: '#334155',
    9: '#1e293b',
    10: '#0f172a',
  },
};

export const TYPOGRAPHY = {
  fontFamily: {
    base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Fira Code', 'JetBrains Mono', monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

export const SPACING = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
};

export const SHADOWS = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/**
 * Helper to convert centralized tokens to the DesignTokens interface format
 */
export function getDesignTokens(): Partial<DesignTokens> {
  // This would map the nested structure to the flat structure expected by the system
  return {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    success: COLORS.success,
    info: COLORS.info,
    warning: COLORS.warning,
    error: COLORS.error,
    'body-font-family': TYPOGRAPHY.fontFamily.base,
    'body-font-size': TYPOGRAPHY.fontSize.base,
    // ... more mappings
  };
}
