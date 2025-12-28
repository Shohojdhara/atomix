/**
 * Config Loader
 * 
 * Load design tokens from atomix.config.ts and convert to flat token format.
 */

import type { DesignTokens } from '../tokens/tokens';
import type { AtomixConfig, ThemeTokens } from '../../config';

/**
 * Convert nested config tokens to flat DesignTokens format
 * 
 * Handles conversion from atomix.config.ts structure to flat tokens.
 * Maps config structure to actual DesignTokens key names.
 */
function flattenConfigTokens(
  tokens: ThemeTokens,
  prefix: string = 'atomix'
): Partial<DesignTokens> {
  const flat: Partial<DesignTokens> = {};

  // Colors
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Simple color: 'primary': '#7AFFD7'
        // Map directly to DesignTokens keys (e.g., 'primary', 'secondary', 'error')
        // Only map if it's a valid semantic color key
        if (['primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark'].includes(key)) {
          flat[key as keyof DesignTokens] = value;
        }
      } else if (value && typeof value === 'object') {
        // Color scale or palette
        if ('main' in value) {
          // PaletteColorOptions: { main: '#7AFFD7', light?: '#...', dark?: '#...' }
          const palette = value as { main: string; light?: string; dark?: string };
          const baseKey = key as keyof DesignTokens;
          
          // Map main to base color (e.g., primary, secondary, error)
          if (['primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark'].includes(key)) {
            flat[baseKey] = palette.main;
            
            // Map light/dark to appropriate scale values
            // light typically maps to step 3, dark to step 9
            if (palette.light) {
              flat[`${key}-3` as keyof DesignTokens] = palette.light;
            }
            if (palette.dark) {
              flat[`${key}-9` as keyof DesignTokens] = palette.dark;
            }
          }
        } else {
          // Color scale: { 1: '#fff', 2: '#eee', ..., 6: '#main', ... }
          // Or full scale: { 1: '#...', 2: '#...', ..., 10: '#...' }
          Object.entries(value).forEach(([scaleKey, scaleValue]) => {
            if (typeof scaleValue === 'string') {
              // Map scale keys to DesignTokens format
              if (scaleKey === 'main' || scaleKey === '6') {
                // Main color maps to base key (e.g., 'primary')
                if (['primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark'].includes(key)) {
                  flat[key as keyof DesignTokens] = scaleValue;
                }
                // Also map to step 6 if it's a scale color
                if (['primary', 'red', 'green', 'blue', 'yellow', 'gray'].includes(key)) {
                  flat[`${key}-6` as keyof DesignTokens] = scaleValue;
                }
              } else {
                // Map scale numbers (1-10) to DesignTokens format
                const scaleNum = parseInt(scaleKey, 10);
                if (!isNaN(scaleNum) && scaleNum >= 1 && scaleNum <= 10) {
                  flat[`${key}-${scaleKey}` as keyof DesignTokens] = scaleValue;
                }
              }
            }
          });
        }
      }
    });
  }

  // Spacing
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      flat[`spacing-${key}` as keyof DesignTokens] = String(value);
    });
  }

  // Border Radius
  if (tokens.borderRadius) {
    Object.entries(tokens.borderRadius).forEach(([key, value]) => {
      // Map to DesignTokens format
      if (key === 'sm' || key === 'base' || key === '') {
        flat['border-radius-sm' as keyof DesignTokens] = String(value);
      } else if (key === 'md' || key === 'default') {
        flat['border-radius' as keyof DesignTokens] = String(value);
      } else if (key === 'lg') {
        flat['border-radius-lg' as keyof DesignTokens] = String(value);
      } else {
        flat[`border-radius-${key}` as keyof DesignTokens] = String(value);
      }
    });
  }

  // Typography
  if (tokens.typography) {
    // Font Families
    if (tokens.typography.fontFamilies) {
      Object.entries(tokens.typography.fontFamilies).forEach(([key, value]) => {
        // Map to DesignTokens format
        if (key === 'sans' || key === 'base') {
          flat['font-sans-serif' as keyof DesignTokens] = String(value);
          flat['body-font-family' as keyof DesignTokens] = String(value);
        } else if (key === 'mono') {
          flat['font-monospace' as keyof DesignTokens] = String(value);
        } else {
          flat[`font-family-${key}` as keyof DesignTokens] = String(value);
        }
      });
    }

    // Font Sizes
    if (tokens.typography.fontSizes) {
      Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
        flat[`font-size-${key}` as keyof DesignTokens] = String(value);
      });
    }

    // Font Weights
    if (tokens.typography.fontWeights) {
      Object.entries(tokens.typography.fontWeights).forEach(([key, value]) => {
        flat[`font-weight-${key}` as keyof DesignTokens] = String(value);
      });
    }

    // Line Heights
    if (tokens.typography.lineHeights) {
      Object.entries(tokens.typography.lineHeights).forEach(([key, value]) => {
        if (key === 'base' || key === 'default') {
          flat['line-height-base' as keyof DesignTokens] = String(value);
        } else {
          flat[`line-height-${key}` as keyof DesignTokens] = String(value);
        }
      });
    }
  }

  // Shadows
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      flat[`shadow-${key}` as keyof DesignTokens] = String(value);
    });
  }

  // Z-Index
  if (tokens.zIndex) {
    Object.entries(tokens.zIndex).forEach(([key, value]) => {
      flat[`z-index-${key}` as keyof DesignTokens] = String(value);
    });
  }

  // Transitions
  if (tokens.transitions) {
    if (tokens.transitions.durations) {
      Object.entries(tokens.transitions.durations).forEach(([key, value]) => {
        flat[`transition-${key}` as keyof DesignTokens] = String(value);
      });
    }
  }

  return flat;
}

/**
 * Load theme tokens from atomix.config.ts
 * 
 * Loads atomix.config.ts and extracts theme tokens.
 * Config file is required - throws error if not found.
 * 
 * @param configPath - Optional custom config path (default: 'atomix.config.ts')
 * @returns Partial DesignTokens from config
 * @throws Error if config file is not found or cannot be loaded
 * 
 * @example
 * ```typescript
 * const tokens = await loadThemeFromConfig();
 * const css = createTheme(tokens);
 * injectTheme(css);
 * ```
 */
export async function loadThemeFromConfig(
  configPath: string = 'atomix.config.ts'
): Promise<Partial<DesignTokens>> {
  // In browser environments, config loading is not supported
  if (typeof window !== 'undefined') {
    throw new Error('loadThemeFromConfig: Not available in browser environment. Config loading requires Node.js/SSR environment.');
  }

  // Load config using the existing loader (required)
  const { loadAtomixConfig } = await import('../../config/loader');
  const config = loadAtomixConfig({ configPath, required: true });

  if (!config || !config.theme) {
    throw new Error(`Config file ${configPath} does not contain theme configuration.`);
  }

  // Extract tokens from config
  const tokens = config.theme.tokens || config.theme.extend || {};

  if (Object.keys(tokens).length === 0) {
    throw new Error(`Config file ${configPath} has empty theme configuration.`);
  }

  // Convert nested structure to flat tokens
  return flattenConfigTokens(tokens, config.prefix || 'atomix');
}

/**
 * Load theme tokens from atomix.config.ts (synchronous version)
 * 
 * Synchronous version that uses require() instead of dynamic import.
 * Only works in Node.js environment.
 * Config file is required - throws error if not found.
 * 
 * @param configPath - Optional custom config path
 * @returns Partial DesignTokens from config
 * @throws Error if config file is not found or cannot be loaded
 */
export function loadThemeFromConfigSync(
  configPath: string = 'atomix.config.ts'
): Partial<DesignTokens> {
  // In browser environments, config loading is not supported
  if (typeof window !== 'undefined') {
    throw new Error('loadThemeFromConfigSync: Not available in browser environment. Config loading requires Node.js/SSR environment.');
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { loadAtomixConfig } = require('../../config/loader');
  const config = loadAtomixConfig({ configPath, required: true });

  if (!config || !config.theme) {
    throw new Error(`Config file ${configPath} does not contain theme configuration.`);
  }

  // Extract tokens from config
  const tokens = config.theme.tokens || config.theme.extend || {};

  if (Object.keys(tokens).length === 0) {
    throw new Error(`Config file ${configPath} has empty theme configuration.`);
  }

  // Convert nested structure to flat tokens
  return flattenConfigTokens(tokens, config.prefix || 'atomix');
}

