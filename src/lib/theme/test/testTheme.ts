/**
 * Test Theme
 * 
 * Comprehensive test theme demonstrating both DesignTokens and Theme object approaches.
 * This file can be used for testing the theme system, adapters, and generators.
 */

import type { DesignTokens } from '../tokens/tokens';
import type { Theme, ThemeOptions } from '../types';
import { createTheme } from '../core/createTheme';
import { createThemeObject } from '../core/createThemeObject';
import { themeToDesignTokens, createDesignTokensFromTheme } from '../adapters/themeAdapter';

// ============================================================================
// Test Theme 1: Using DesignTokens (Recommended - Flat Structure)
// ============================================================================

/**
 * Test theme using DesignTokens (flat structure)
 * 
 * This is the recommended approach for most use cases.
 * DesignTokens directly map to CSS variables.
 */
export const testThemeTokens: Partial<DesignTokens> = {
  // Primary colors
  'primary': '#7AFFD7',
  'primary-3': '#B3FFE9',
  'primary-6': '#7AFFD7',
  'primary-9': '#00E6C3',
  'primary-rgb': '122, 255, 215',

  // Secondary colors
  'secondary': '#FF6B9D',
  'secondary-rgb': '255, 107, 157',

  // Semantic colors
  'success': '#1AFF85',
  'success-rgb': '26, 255, 133',
  'error': '#FF1A1A',
  'error-rgb': '255, 26, 26',
  'warning': '#FFB800',
  'warning-rgb': '255, 184, 0',
  'info': '#1A9FFF',
  'info-rgb': '26, 159, 255',

  // Background colors
  'body-bg': '#000000',
  'primary-bg-subtle': '#0A0A0A',
  'secondary-bg-subtle': '#1A1A1A',
  'tertiary-bg-subtle': '#2A2A2A',

  // Text colors
  'body-color': '#FFFFFF',
  'heading-color': '#FFFFFF',
  'primary-text-emphasis': '#FFFFFF',
  'secondary-text-emphasis': 'rgba(255, 255, 255, 0.8)',
  'disabled-text-emphasis': 'rgba(255, 255, 255, 0.5)',

  // Typography
  'body-font-family': '"Inter", "Roboto", sans-serif',
  'font-sans-serif': '"Inter", "Roboto", sans-serif',
  'body-font-size': '16px',
  'body-font-weight': '400',
  'font-weight-light': '300',
  'font-weight-normal': '400',
  'font-weight-medium': '500',
  'font-weight-semibold': '600',
  'font-weight-bold': '700',
  'line-height-base': '1.5',

  // Spacing
  'spacing-1': '4px',
  'spacing-2': '8px',
  'spacing-3': '12px',
  'spacing-4': '16px',
  'spacing-5': '20px',
  'spacing-6': '24px',
  'spacing-8': '32px',

  // Border radius
  'border-radius-sm': '4px',
  'border-radius': '6px',
  'border-radius-lg': '8px',
  'border-radius-xl': '12px',

  // Shadows
  'box-shadow-xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
  'box-shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
  'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
  'box-shadow-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
  'box-shadow-xl': '0 20px 25px rgba(0, 0, 0, 0.15)',

  // Z-index
  'z-dropdown': '1000',
  'z-sticky': '1020',
  'z-fixed': '1030',
  'z-modal-backdrop': '1040',
  'z-modal': '1050',
  'z-popover': '1060',
  'z-tooltip': '1070',

  // Transitions
  'transition-duration-fast': '150ms',
  'transition-duration-base': '200ms',
  'transition-duration-slow': '300ms',
  'easing-ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'easing-ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  'easing-ease-in': 'cubic-bezier(0.4, 0, 1, 1)',

  // Breakpoints
  'breakpoint-xs': '0',
  'breakpoint-sm': '576px',
  'breakpoint-md': '768px',
  'breakpoint-lg': '992px',
  'breakpoint-xl': '1200px',
  'breakpoint-xxl': '1400px',
};

/**
 * Generate CSS from DesignTokens
 */
export function generateTestThemeCSS(): string {
  return createTheme(testThemeTokens);
}

// ============================================================================
// Test Theme 2: Using Theme Object (Advanced - Nested Structure)
// ============================================================================

/**
 * Test theme using Theme object (nested structure)
 * 
 * This approach provides more structure and computed values.
 * Useful for advanced use cases that need theme composition.
 */
export const testThemeOptions: ThemeOptions = {
  name: 'Test Theme',
  description: 'A comprehensive test theme for the Atomix theme system',
  version: '1.0.0',
  status: 'experimental',
  supportsDarkMode: true,

  palette: {
    primary: {
      main: '#7AFFD7',
      light: '#B3FFE9',
      dark: '#00E6C3',
    },
    secondary: {
      main: '#FF6B9D',
      light: '#FFB3D1',
      dark: '#FF1A5C',
    },
    success: {
      main: '#1AFF85',
      light: '#4DFF9F',
      dark: '#00E66B',
    },
    error: {
      main: '#FF1A1A',
      light: '#FF6666',
      dark: '#E60000',
    },
    warning: {
      main: '#FFB800',
      light: '#FFD966',
      dark: '#E6A600',
    },
    info: {
      main: '#1A9FFF',
      light: '#66C2FF',
      dark: '#0080E6',
    },
    background: {
      default: '#000000',
      subtle: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
  },

  spacing: 4, // Base spacing unit in pixels (multiplier)

  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
  },

  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 200,
      standard: 300,
      complex: 300,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
};

/**
 * Create Theme object from options
 */
export function createTestThemeObject(): Theme {
  return createThemeObject(testThemeOptions);
}

/**
 * Generate CSS from Theme object (uses adapter internally)
 */
export function generateTestThemeCSSFromObject(): string {
  const theme = createTestThemeObject();
  return createTheme(theme); // createTheme accepts both formats
}

// ============================================================================
// Test Theme 3: Minimal Test Theme
// ============================================================================

/**
 * Minimal test theme for quick testing
 */
export const minimalTestTheme: Partial<DesignTokens> = {
  'primary': '#7AFFD7',
  'body-bg': '#000000',
  'body-color': '#FFFFFF',
  'body-font-family': '"Inter", sans-serif',
};

/**
 * Generate minimal CSS
 */
export function generateMinimalTestThemeCSS(): string {
  return createTheme(minimalTestTheme);
}

// ============================================================================
// Test Utilities
// ============================================================================

/**
 * Test theme adapter conversion
 * 
 * Converts Theme object to DesignTokens and back to verify adapter works correctly.
 */
export function testThemeAdapter(): {
  theme: Theme;
  tokens: Partial<DesignTokens>;
  fullTokens: DesignTokens;
} {
  const theme = createTestThemeObject();
  const tokens = themeToDesignTokens(theme);
  const fullTokens = createDesignTokensFromTheme(theme);

  return {
    theme,
    tokens,
    fullTokens,
  };
}

/**
 * Compare CSS output from both approaches
 * 
 * Verifies that DesignTokens and Theme object produce similar CSS output.
 */
export function compareThemeOutputs(): {
  fromTokens: string;
  fromTheme: string;
  tokens: Partial<DesignTokens>;
  themeTokens: Partial<DesignTokens>;
} {
  const fromTokens = generateTestThemeCSS();
  const fromTheme = generateTestThemeCSSFromObject();
  
  const theme = createTestThemeObject();
  const themeTokens = themeToDesignTokens(theme);

  return {
    fromTokens,
    fromTheme,
    tokens: testThemeTokens,
    themeTokens,
  };
}

/**
 * Test theme composition
 * 
 * Tests extending a base theme with customizations.
 */
export function testThemeComposition(): Theme {
  const baseTheme = createTestThemeObject();
  
  // Extend with custom options
  const extendedTheme = createThemeObject(
    {
      palette: {
        primary: {
          main: '#FF00FF', // Override primary color
        },
      },
    },
    testThemeOptions // Base theme
  );

  return extendedTheme;
}

// ============================================================================
// Export all test themes
// ============================================================================

export const testThemes = {
  tokens: testThemeTokens,
  options: testThemeOptions,
  minimal: minimalTestTheme,
  generateCSS: generateTestThemeCSS,
  generateCSSFromObject: generateTestThemeCSSFromObject,
  generateMinimalCSS: generateMinimalTestThemeCSS,
  testAdapter: testThemeAdapter,
  compareOutputs: compareThemeOutputs,
  testComposition: testThemeComposition,
};

