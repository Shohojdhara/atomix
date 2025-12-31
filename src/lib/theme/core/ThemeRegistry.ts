/**
 * Theme Metadata interface
 */
export interface ThemeMetadata {
  name: string;
  class: string;
  description?: string;
  version?: string;
  [key: string]: any;
}

/**
 * Theme Registry type - a record of theme IDs to metadata
 */
export type ThemeRegistry = Record<string, ThemeMetadata>;

/**
 * Create a new theme registry
 */
export function createThemeRegistry(): ThemeRegistry {
  return {};
}

/**
 * Register a theme
 * @param registry - Theme registry object
 * @param id - Theme identifier
 * @param metadata - Theme metadata
 */
export function registerTheme(registry: ThemeRegistry, id: string, metadata: ThemeMetadata): void {
  registry[id] = metadata;
}

/**
 * Unregister a theme
 * @param registry - Theme registry object
 * @param id - Theme identifier
 */
export function unregisterTheme(registry: ThemeRegistry, id: string): boolean {
  const exists = id in registry;
  delete registry[id];
  return exists;
}

/**
 * Check if a theme is registered
 * @param registry - Theme registry object
 * @param id - Theme identifier
 */
export function hasTheme(registry: ThemeRegistry, id: string): boolean {
  return id in registry;
}

/**
 * Get theme metadata
 * @param registry - Theme registry object
 * @param id - Theme identifier
 */
export function getTheme(registry: ThemeRegistry, id: string): ThemeMetadata | undefined {
  return registry[id];
}

/**
 * Get all registered theme metadata
 * @param registry - Theme registry object
 */
export function getAllThemes(registry: ThemeRegistry): ThemeMetadata[] {
  return Object.values(registry);
}

/**
 * Get all registered theme IDs
 * @param registry - Theme registry object
 */
export function getThemeIds(registry: ThemeRegistry): string[] {
  return Object.keys(registry);
}

/**
 * Clear all registered themes
 * @param registry - Theme registry object
 */
export function clearThemes(registry: ThemeRegistry): void {
  Object.keys(registry).forEach(key => delete registry[key]);
}

/**
 * Get the number of registered themes
 * @param registry - Theme registry object
 */
export function getThemeCount(registry: ThemeRegistry): number {
  return Object.keys(registry).length;
}
