/**
 * Theme Adapter
 *
 * Converts between Theme objects and DesignTokens.
 */

import type { Theme } from '../types';
import type { DesignTokens } from '../tokens/tokens';
import { createTokens } from '../tokens/tokens';
import { hexToRgb } from '../utils/themeUtils';

/**
 * Convert Theme object to DesignTokens
 *
 * Extracts values from a Theme object and converts them to flat DesignTokens format.
 *
 * @param theme - Theme object to convert
 * @returns Partial DesignTokens object
 *
 * @example
 * ```typescript
 * const theme = createTheme({ palette: { primary: { main: '#7c3aed' } } });
 * const tokens = themeToDesignTokens(theme);
 * // Returns: { 'primary': '#7c3aed', ... }
 * ```
 */
export function themeToDesignTokens(theme: Theme): Partial<DesignTokens> {
  const tokens: Partial<DesignTokens> = {};

  // Convert palette colors
  if (theme.palette) {
    // Primary colors
    if (theme.palette.primary) {
      tokens['primary'] = theme.palette.primary.main;
      if (theme.palette.primary.light) {
        tokens['primary-3'] = theme.palette.primary.light;
      }
      if (theme.palette.primary.dark) {
        tokens['primary-9'] = theme.palette.primary.dark;
      }
      // Extract RGB if available
      if (theme.palette.primary.main) {
        const rgb = hexToRgb(theme.palette.primary.main);
        if (rgb) {
          tokens['primary-rgb'] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
        }
      }
    }

    // Secondary colors
    if (theme.palette.secondary) {
      tokens['secondary'] = theme.palette.secondary.main;
      if (theme.palette.secondary.light) {
        tokens['gray-1'] = theme.palette.secondary.light;
      }
      if (theme.palette.secondary.dark) {
        tokens['gray-3'] = theme.palette.secondary.dark;
      }
      const rgb = hexToRgb(theme.palette.secondary.main);
      if (rgb) {
        tokens['secondary-rgb'] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
      }
    }

    // Error colors
    if (theme.palette.error) {
      tokens['error'] = theme.palette.error.main;
      tokens['red-6'] = theme.palette.error.main;
      if (theme.palette.error.light) {
        tokens['red-4'] = theme.palette.error.light;
      }
      if (theme.palette.error.dark) {
        tokens['red-9'] = theme.palette.error.dark;
      }
      const rgb = hexToRgb(theme.palette.error.main);
      if (rgb) {
        tokens['error-rgb'] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
      }
    }

    // Success colors
    if (theme.palette.success) {
      tokens['success'] = theme.palette.success.main;
      tokens['green-6'] = theme.palette.success.main;
      if (theme.palette.success.light) {
        tokens['green-4'] = theme.palette.success.light;
      }
      if (theme.palette.success.dark) {
        tokens['green-9'] = theme.palette.success.dark;
      }
      const rgb = hexToRgb(theme.palette.success.main);
      if (rgb) {
        tokens['success-rgb'] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
      }
    }

    // Warning colors
    if (theme.palette.warning) {
      tokens['warning'] = theme.palette.warning.main;
      tokens['yellow-6'] = theme.palette.warning.main;
      if (theme.palette.warning.light) {
        tokens['yellow-4'] = theme.palette.warning.light;
      }
      if (theme.palette.warning.dark) {
        tokens['yellow-9'] = theme.palette.warning.dark;
      }
      const rgb = hexToRgb(theme.palette.warning.main);
      if (rgb) {
        tokens['warning-rgb'] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
      }
    }

    // Info colors
    if (theme.palette.info) {
      tokens['info'] = theme.palette.info.main;
      tokens['blue-6'] = theme.palette.info.main;
      if (theme.palette.info.light) {
        tokens['blue-4'] = theme.palette.info.light;
      }
      if (theme.palette.info.dark) {
        tokens['blue-9'] = theme.palette.info.dark;
      }
      const rgb = hexToRgb(theme.palette.info.main);
      if (rgb) {
        tokens['info-rgb'] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
      }
    }

    // Background colors
    if (theme.palette.background) {
      tokens['body-bg'] = theme.palette.background.default;
      tokens['primary-bg-subtle'] = theme.palette.background.default;
      tokens['secondary-bg-subtle'] = theme.palette.background.paper;
      tokens['tertiary-bg-subtle'] = theme.palette.background.subtle;
    }

    // Text colors
    if (theme.palette.text) {
      tokens['body-color'] = theme.palette.text.primary;
      tokens['heading-color'] = theme.palette.text.primary;
      tokens['primary-text-emphasis'] = theme.palette.text.primary;
      tokens['secondary-text-emphasis'] = theme.palette.text.secondary;
      tokens['disabled-text-emphasis'] = theme.palette.text.disabled;
    }
  }

  // Convert typography
  if (theme.typography) {
    tokens['body-font-family'] = theme.typography.fontFamily;
    tokens['font-sans-serif'] = theme.typography.fontFamily;
    tokens['body-font-size'] = `${theme.typography.fontSize}px`;
    tokens['body-font-weight'] = String(theme.typography.fontWeightRegular);

    // Font weights
    tokens['font-weight-light'] = String(theme.typography.fontWeightLight);
    tokens['font-weight-normal'] = String(theme.typography.fontWeightRegular);
    tokens['font-weight-medium'] = String(theme.typography.fontWeightMedium);
    tokens['font-weight-semibold'] = String(theme.typography.fontWeightSemiBold);
    tokens['font-weight-bold'] = String(theme.typography.fontWeightBold);

    // Line heights
    if (theme.typography.h1?.lineHeight) {
      tokens['line-height-base'] = String(theme.typography.h1.lineHeight);
    }
  }

  // Convert spacing (if available as object)
  if (
    theme.spacing &&
    typeof theme.spacing === 'object' &&
    !('__isSpacingFunction' in theme.spacing)
  ) {
    const spacing = theme.spacing as Record<string, string | number>;
    Object.entries(spacing).forEach(([key, value]) => {
      tokens[`spacing-${key}` as keyof DesignTokens] = String(value);
    });
  }

  // Convert border radius
  if (theme.borderRadius) {
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      const tokenKey =
        key === 'sm'
          ? 'border-radius-sm'
          : key === 'md'
            ? 'border-radius'
            : key === 'lg'
              ? 'border-radius-lg'
              : key === 'xl'
                ? 'border-radius-xl'
                : key === 'xxl'
                  ? 'border-radius-xxl'
                  : `border-radius-${key}`;
      tokens[tokenKey as keyof DesignTokens] = String(value);
    });
  }

  // Convert shadows
  if (theme.shadows) {
    Object.entries(theme.shadows).forEach(([key, value]) => {
      const tokenKey =
        key === 'xs'
          ? 'box-shadow-xs'
          : key === 'sm'
            ? 'box-shadow-sm'
            : key === 'md'
              ? 'box-shadow'
              : key === 'lg'
                ? 'box-shadow-lg'
                : key === 'xl'
                  ? 'box-shadow-xl'
                  : `box-shadow-${key}`;
      tokens[tokenKey as keyof DesignTokens] = String(value);
    });
  }

  // Convert z-index
  if (theme.zIndex) {
    Object.entries(theme.zIndex).forEach(([key, value]) => {
      tokens[`z-${key}` as keyof DesignTokens] = String(value);
    });
  }

  // Convert transitions
  if (theme.transitions) {
    if (theme.transitions.duration) {
      Object.entries(theme.transitions.duration).forEach(([key, value]) => {
        tokens[`transition-duration-${key}` as keyof DesignTokens] = String(value);
      });
    }
    if (theme.transitions.easing) {
      Object.entries(theme.transitions.easing).forEach(([key, value]) => {
        tokens[`easing-${key}` as keyof DesignTokens] = String(value);
      });
    }
  }

  // Convert breakpoints
  if (theme.breakpoints?.values) {
    Object.entries(theme.breakpoints.values).forEach(([key, value]) => {
      tokens[`breakpoint-${key}` as keyof DesignTokens] = String(value);
    });
  }

  // Merge any existing cssVars from theme
  if (theme.cssVars) {
    Object.entries(theme.cssVars).forEach(([key, value]) => {
      // Remove --atomix- prefix if present
      const cleanKey = key.replace(/^--atomix-/, '').replace(/^--/, '');
      tokens[cleanKey as keyof DesignTokens] = String(value);
    });
  }

  return tokens;
}

/**
 * Convert DesignTokens to Theme-compatible CSS variables
 *
 * @param tokens - DesignTokens object
 * @returns CSS variables object compatible with Theme.cssVars
 */
export function designTokensToCSSVars(tokens: Partial<DesignTokens>): Record<string, string> {
  const cssVars: Record<string, string> = {};

  Object.entries(tokens).forEach(([key, value]) => {
    if (value !== undefined) {
      cssVars[`--atomix-${key}`] = String(value);
    }
  });

  return cssVars;
}

/**
 * Create DesignTokens from Theme with defaults
 *
 * Converts a Theme to DesignTokens and merges with default tokens.
 *
 * @param theme - Theme object to convert
 * @returns Complete DesignTokens object
 */
export function createDesignTokensFromTheme(theme: Theme): DesignTokens {
  const partialTokens = themeToDesignTokens(theme);
  return createTokens(partialTokens);
}

/**
 * Create a minimal Theme object from DesignTokens
 *
 * @param tokens - DesignTokens to convert
 * @returns Minimal Theme object with cssVars populated
 */
export function designTokensToTheme(tokens: Partial<DesignTokens>): Partial<Theme> {
  const cssVars = designTokensToCSSVars(tokens);

  return {
    name: 'Design Tokens Theme',
    cssVars,
    __isJSTheme: true,
  } as Partial<Theme>;
}
