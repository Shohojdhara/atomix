/**
 * Core Theme Engine
 * 
 * Core theme creation, composition, and registry functionality
 */

export { createTheme } from './createTheme';
export { deepMerge, mergeTheme, extendTheme } from './composeTheme';

// Simplified Theme Registry API
export { 
  createThemeRegistry,
  registerTheme,
  unregisterTheme,
  hasTheme,
  getTheme,
  getAllThemes,
  getThemeIds,
  clearThemes,
  getThemeCount,
  type ThemeRegistry,
  type ThemeMetadata
} from './ThemeRegistry';
