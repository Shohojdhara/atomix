/**
 * Theme Tools for Library Users
 * 
 * Developer-friendly utilities for working with Atomix themes
 */

import { Theme, ThemeMetadata } from './theme/types';
import { createThemeObject } from './theme/core/createThemeObject';
import { extendTheme, mergeTheme } from './theme/core/composeTheme';
import { generateCSSVariables } from './theme/generators/generateCSSVariables';

/**
 * Quick theme creator with sensible defaults
 */
export function quickTheme(name: string, primaryColor: string, secondaryColor?: string): Theme {
  return createThemeObject({
    name,
    palette: {
      primary: { main: primaryColor },
      secondary: secondaryColor ? { main: secondaryColor } : undefined,
    },
  });
}

/**
 * Create a dark theme variant from a light theme
 */
export function createDarkVariant(lightTheme: Theme): Theme {
  // We'll extend the theme by merging the new properties with the existing theme
  const darkVariant: Partial<Theme> = {
    name: `${lightTheme.name} Dark`,
    palette: {
      mode: 'dark',
      primary: lightTheme.palette?.primary, // Preserve original primary
      secondary: lightTheme.palette?.secondary, // Preserve original secondary
      error: lightTheme.palette?.error, // Preserve original error
      warning: lightTheme.palette?.warning, // Preserve original warning
      info: lightTheme.palette?.info, // Preserve original info
      success: lightTheme.palette?.success, // Preserve original success
      background: {
        default: '#121212',
        paper: '#1e1e1e', // Added missing paper property
        subtle: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.38)', // Added missing disabled property
      },
    },
  };
  
  // Create a new theme by extending the light theme with the dark variant
  const extendedTheme: Theme = {
    ...lightTheme,
    ...darkVariant,
    palette: {
      ...lightTheme.palette,
      ...darkVariant.palette,
      background: {
        ...lightTheme.palette?.background,
        ...darkVariant.palette?.background,
      },
      text: {
        ...lightTheme.palette?.text,
        ...darkVariant.palette?.text,
      },
    },
  };
  
  return extendedTheme;
}

/**
 * Validate theme structure
 */
export function validateTheme(theme: Theme): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!theme.name) {
    errors.push('Theme must have a name');
  }

  if (!theme.palette) {
    errors.push('Theme must have a palette');
  }

  if (theme.palette && !theme.palette.primary) {
    errors.push('Theme palette must have a primary color');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate CSS string from theme
 */
export function themeToCSS(theme: Theme, selector = ':root'): string {
  return generateCSSVariables(theme, {
    selector,
    prefix: 'atomix',
  });
}

/**
 * Get theme metadata
 */
export function getThemeMetadata(theme: Theme): ThemeMetadata {
  return {
    name: theme.name || 'Custom Theme',
    description: theme.description,
    author: theme.author,
    version: theme.version || '1.0.0',
    tags: theme.tags || [],
    supportsDarkMode: theme.palette?.mode === 'dark',
    status: 'stable',
    color: theme.palette?.primary?.main || '#7AFFD7',
  };
}

/**
 * Check if theme supports dark mode
 */
export function supportsDarkMode(theme: Theme): boolean {
  return theme.palette?.mode === 'dark' ||
    theme.supportsDarkMode === true ||
    Boolean(theme.a11y?.modes?.includes('dark'));
}

/**
 * Export theme as JSON
 */
export function exportTheme(theme: Theme): string {
  return JSON.stringify(theme, null, 2);
}

/**
 * Import theme from JSON
 */
export function importTheme(json: string): Theme {
  try {
    return JSON.parse(json) as Theme;
  } catch (error) {
    throw new Error('Invalid theme JSON');
  }
}

// Note: createTheme, extendTheme, mergeTheme, and generateCSSVariables
// are already exported from './theme' module. Import them directly from there.
// This file only exports theme-tools specific utilities.