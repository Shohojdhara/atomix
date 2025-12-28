/**
 * Theme Registry
 * 
 * Central registry for all themes with discovery and dependency management
 */

import type { Theme, ThemeMetadata } from '../types';
import type { ThemeDefinition, LoadedThemeConfig } from '../config/types';
import { loadThemeConfig } from '../config/loader';

/**
 * Registry entry
 */
interface RegistryEntry {
  /** Theme ID */
  id: string;
  /** Theme definition from config */
  definition: ThemeDefinition;
  /** Resolved theme object (for JS themes) */
  theme?: Theme;
  /** Whether theme is loaded */
  loaded: boolean;
  /** Loading promise (if currently loading) */
  loading?: Promise<Theme | void>;
  /** Dependencies */
  dependencies: string[];
  /** Dependent themes (themes that depend on this one) */
  dependents: string[];
}

/**
 * Theme Registry
 * 
 * Manages theme registration, discovery, and dependency resolution
 */
export class ThemeRegistry {
  private entries: Map<string, RegistryEntry> = new Map();
  private config: LoadedThemeConfig | null = null;
  private initialized: boolean = false;

  /**
   * Initialize registry from config
   */
  async initialize(config?: LoadedThemeConfig): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Load config if not provided
    if (!config) {
      try {
        this.config = loadThemeConfig();
      } catch (error) {
        // In browser environments, config loading will fail
        // Use empty config as fallback
        this.config = {
          themes: {},
          build: {
            output: { directory: 'themes', formats: { expanded: '.css', compressed: '.min.css' } },
            sass: { style: 'expanded', sourceMap: true, loadPaths: ['src'] },
          },
          runtime: {
            basePath: '',
            defaultTheme: undefined, // No default - use built-in styles
          },
          integration: {
            cssVariables: { colorMode: '--color-mode' },
            classNames: { theme: 'data-theme', colorMode: 'data-color-mode' },
          },
          dependencies: {},
          validated: false,
          errors: [],
          warnings: [],
          __tokens: {},
          __extend: {},
        };
      }
    } else {
      this.config = config;
    }

    // Register all themes from config
    for (const [themeId, definition] of Object.entries(this.config.themes)) {
      this.register(themeId, definition);
    }

    // Resolve dependencies
    this.resolveDependencies();

    this.initialized = true;
  }

  /**
   * Register a theme
   */
  register(themeId: string, definition: ThemeDefinition): void {
    // Get dependencies from config or definition
    const dependencies = 
      this.config?.dependencies?.[themeId] || 
      definition.dependencies || 
      [];

    const entry: RegistryEntry = {
      id: themeId,
      definition,
      loaded: false,
      dependencies: [...dependencies],
      dependents: [],
    };

    this.entries.set(themeId, entry);
  }

  /**
   * Get theme entry
   */
  get(themeId: string): RegistryEntry | undefined {
    return this.entries.get(themeId);
  }

  /**
   * Check if theme exists
   */
  has(themeId: string): boolean {
    return this.entries.has(themeId);
  }

  /**
   * Get all theme IDs
   */
  getAllIds(): string[] {
    return Array.from(this.entries.keys());
  }

  /**
   * Get all theme metadata
   */
  getAllMetadata(): ThemeMetadata[] {
    return Array.from(this.entries.values()).map(entry => ({
      id: entry.id,
      name: entry.definition.name,
      type: entry.definition.type,
      class: entry.definition.class,
      description: entry.definition.description,
      author: entry.definition.author,
      version: entry.definition.version,
      tags: entry.definition.tags,
      supportsDarkMode: entry.definition.supportsDarkMode,
      status: entry.definition.status,
      a11y: entry.definition.a11y,
      color: entry.definition.color,
      features: entry.definition.features,
      dependencies: entry.dependencies,
    }));
  }

  /**
   * Get theme definition
   */
  getDefinition(themeId: string): ThemeDefinition | undefined {
    return this.entries.get(themeId)?.definition;
  }

  /**
   * Check if a theme is loaded
   */
  isThemeLoaded(themeId: string): boolean {
    const entry = this.entries.get(themeId);
    return entry ? entry.loaded : false;
  }

  /**
   * Mark a theme as loaded
   */
  markLoaded(themeId: string, theme?: Theme): void {
    const entry = this.entries.get(themeId);
    if (entry) {
      entry.loaded = true;
      if (theme) {
        entry.theme = theme;
      }
    }
  }

  /**
   * Get theme object (for JS themes)
   */
  getTheme(themeId: string): Theme | undefined {
    const entry = this.entries.get(themeId);
    return entry?.loaded ? entry.theme : undefined;
  }

  /**
   * Get dependencies for a theme
   */
  getDependencies(themeId: string): string[] {
    return this.entries.get(themeId)?.dependencies || [];
  }

  /**
   * Get dependents for a theme (themes that depend on this one)
   */
  getDependents(themeId: string): string[] {
    return this.entries.get(themeId)?.dependents || [];
  }

  /**
   * Resolve all dependencies in correct order
   */
  resolveDependencyOrder(themeId: string): string[] {
    const resolved: string[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (id: string): void => {
      if (visiting.has(id)) {
        throw new Error(`Circular dependency detected involving theme: ${id}`);
      }
      if (visited.has(id)) {
        return;
      }

      visiting.add(id);
      const entry = this.entries.get(id);
      if (entry) {
        for (const dep of entry.dependencies) {
          if (!this.has(dep)) {
            throw new Error(`Theme "${id}" depends on non-existent theme: ${dep}`);
          }
          visit(dep);
        }
      }
      visiting.delete(id);
      visited.add(id);
      resolved.push(id);
    };

    visit(themeId);
    return resolved;
  }

  /**
   * Resolve dependencies and build dependency graph
   */
  private resolveDependencies(): void {
    // Build dependents map
    for (const entry of this.entries.values()) {
      for (const dep of entry.dependencies) {
        const depEntry = this.entries.get(dep);
        if (depEntry) {
          if (!depEntry.dependents.includes(entry.id)) {
            depEntry.dependents.push(entry.id);
          }
        }
      }
    }
  }

  /**
   * Validate all themes
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check for circular dependencies
    for (const themeId of this.entries.keys()) {
      try {
        this.resolveDependencyOrder(themeId);
      } catch (error) {
        errors.push(error instanceof Error ? error.message : String(error));
      }
    }

    // Check for missing dependencies
    for (const [themeId, entry] of this.entries.entries()) {
      for (const dep of entry.dependencies) {
        if (!this.has(dep)) {
          errors.push(`Theme "${themeId}" depends on non-existent theme: ${dep}`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Clear registry
   */
  clear(): void {
    this.entries.clear();
    this.config = null;
    this.initialized = false;
  }
}
