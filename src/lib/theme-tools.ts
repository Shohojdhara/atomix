/**
 * Theme Tools for Library Users
 * 
 * Developer-friendly utilities for working with Atomix themes
 */

import { Theme, ThemeMetadata } from './theme/types';
import { createTheme } from './theme/createTheme';
import { extendTheme, mergeTheme } from './theme/composeTheme';
import { ComponentOverrideManager } from './theme/overrides/ComponentOverrides';
import { WhiteLabelManager } from './theme/whitelabel/WhiteLabelManager';
import { generateCSSVariables } from './theme/generateCSSVariables';

/**
 * Quick theme creator with sensible defaults
 */
export function quickTheme(name: string, primaryColor: string, secondaryColor?: string): Theme {
  return createTheme({
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
  return extendTheme(lightTheme, {
    name: `${lightTheme.name} Dark`,
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.7)',
      },
    },
  });
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
 * Apply overrides to theme easily
 */
export function applyOverrides(
  theme: Theme,
  overrides: Record<string, any>
): Theme {
  const manager = new ComponentOverrideManager(theme);
  
  Object.entries(overrides).forEach(([component, override]) => {
    manager.addOverride(component, override);
  });
  
  const overriddenTheme = manager.getThemeWithOverrides();
  if (!overriddenTheme) {
    throw new Error('Failed to get theme with overrides: theme was not set');
  }
  
  return overriddenTheme;
}

/**
 * Apply white label configuration
 */
export function applyWhiteLabel(
  theme: Theme,
  brand: {
    name: string;
    primaryColor: string;
    logo?: string;
  }
): Theme {
  const manager = new WhiteLabelManager(theme);
  
  manager.configure({
    brand: {
      name: brand.name,
      primaryColor: brand.primaryColor,
      logo: brand.logo,
    },
    themeOverrides: {
      palette: {
        primary: { main: brand.primaryColor },
      },
    },
  });
  
  const whiteLabeledTheme = manager.getWhiteLabeledTheme();
  if (!whiteLabeledTheme) {
    throw new Error('Failed to get white labeled theme: theme was not set');
  }
  
  return whiteLabeledTheme;
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

// Re-export commonly used functions
export { createTheme, extendTheme, mergeTheme };
export { generateCSSVariables };
export { ComponentOverrideManager } from './theme/overrides/ComponentOverrides';
export { WhiteLabelManager } from './theme/whitelabel/WhiteLabelManager';
export { RTLManager } from './theme/i18n/rtl';
export { ThemeAnalytics } from './theme/monitoring/ThemeAnalytics';
