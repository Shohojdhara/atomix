/**
 * Theme Manager
 * 
 * Core theme management class for the Atomix Design System.
 * Rewritten to use the new ThemeEngine architecture.
 * Handles theme loading, switching, persistence, and events.
 * Supports both CSS-based themes and JavaScript-based themes.
 */

import type {
  ThemeManagerConfig,
  ThemeMetadata,
  ThemeChangeEvent,
  ThemeLoadOptions,
  ThemeEventListeners,
  ThemeChangeCallback,
  ThemeLoadCallback,
  ThemeErrorCallback,
  StorageAdapter,
  Theme,
} from '../types';

import {
  isBrowser,
  isServer,
  createLocalStorageAdapter,
} from '../utils';

import { ThemeEngine, type ThemeEngineConfig } from '../core/ThemeEngine';
import { loadThemeConfig } from '../config/loader';
import { isJSTheme } from '../themeUtils';

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: Partial<ThemeManagerConfig> = {
  basePath: '/themes',
  cdnPath: null,
  lazy: true,
  storageKey: 'atomix-theme',
  dataAttribute: 'data-theme',
  enablePersistence: true,
  useMinified: false,
  preload: [],
};

/**
 * ThemeManager class
 * 
 * Manages theme loading, switching, and persistence for Atomix Design System.
 * Uses the new ThemeEngine architecture for unified CSS/JS theme support.
 * 
 * @example
 * ```typescript
 * const themeManager = new ThemeManager({
 *   defaultTheme: 'shaj-default',
 * });
 * 
 * await themeManager.setTheme('flashtrade');
 * ```
 */
export class ThemeManager {
  private engine: ThemeEngine;
  private config: Required<Omit<ThemeManagerConfig, 'onThemeChange' | 'onError' | 'cdnPath' | 'defaultTheme'>> & {
    defaultTheme?: string | Theme;
    cdnPath: string | null;
    onThemeChange?: (theme: string | Theme) => void;
    onError?: (error: Error, themeName: string) => void;
  };

  private currentTheme: string | null = null;
  private activeTheme: Theme | null = null;
  private eventListeners: ThemeEventListeners = {
    themeChange: [],
    themeLoad: [],
    themeError: [],
  };
  private storageAdapter: StorageAdapter;
  private initialized: boolean = false;

  /**
   * Create a new ThemeManager instance
   * 
   * @param config - Theme manager configuration
   */
  constructor(config: ThemeManagerConfig) {
    // Merge with defaults
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      themes: config.themes || {},
      defaultTheme: config.defaultTheme,
    } as any;

    // Initialize storage adapter
    this.storageAdapter = createLocalStorageAdapter();

    // Create theme engine
    const engineConfig: ThemeEngineConfig = {
      basePath: this.config.basePath,
      cdnPath: this.config.cdnPath,
      useMinified: this.config.useMinified,
      dataAttribute: this.config.dataAttribute,
      enableCache: true,
    };

    this.engine = new ThemeEngine(engineConfig);

    // Set up engine event listeners
    this.engine.on('change', (event) => {
      this.currentTheme = event.currentTheme;
      this.activeTheme = event.themeObject || null;
      this.emitThemeChange(event);
    });

    this.engine.on('load', (themeId) => {
      this.emitThemeLoad(themeId);
    });

    this.engine.on('error', (error, themeId) => {
      this.emitThemeError(error, themeId);
    });

    // Initialize theme manager
    this.initialize();
  }

  /**
   * Initialize the theme manager
   */
  private initialize(): void {
    if (this.initialized || isServer()) {
      return;
    }

    // Initialize engine
    this.engine.initialize().then(() => {
      // Register themes from config if provided
      // This allows themes to be passed via ThemeManager config
      // even if theme.config.ts fails to load
      if (this.config.themes && Object.keys(this.config.themes).length > 0) {
        const registry = this.engine.getRegistry();
        for (const [themeId, metadata] of Object.entries(this.config.themes)) {
          // Only register if not already registered (from theme.config.ts)
          if (!registry.has(themeId)) {
            // Convert ThemeMetadata to CSSThemeDefinition
            registry.register(themeId, {
              type: 'css',
              name: metadata.name,
              class: metadata.class || themeId,
              description: metadata.description,
              author: metadata.author,
              version: metadata.version,
              tags: metadata.tags,
              supportsDarkMode: metadata.supportsDarkMode,
              status: metadata.status,
              a11y: metadata.a11y,
              color: metadata.color,
              features: metadata.features,
              dependencies: metadata.dependencies,
            });
          }
        }
      }

      // Load default theme
      const defaultTheme = this.getDefaultTheme();
      if (defaultTheme) {
        this.setTheme(defaultTheme, { removePrevious: false }).catch((error) => {
          console.error('Failed to load default theme:', error);
        });
      }
    });

    this.initialized = true;
  }

  /**
   * Get default theme
   */
  private getDefaultTheme(): string | Theme | null {
    // Check storage first
    if (this.config.enablePersistence && this.storageAdapter.isAvailable()) {
      const stored = this.storageAdapter.getItem(this.config.storageKey);
      if (stored) {
        try {
          // Try to parse as theme name
          if (this.engine.getRegistry().has(stored)) {
            return stored;
          }
        } catch {
          // Ignore parse errors
        }
      }
    }

    // Use config default
    return this.config.defaultTheme || null;
  }

  /**
   * Set theme
   */
  async setTheme(theme: string | Theme, options?: ThemeLoadOptions): Promise<void> {
    await this.engine.setTheme(theme, options);

    // Persist to storage
    if (this.config.enablePersistence && this.storageAdapter.isAvailable()) {
      const themeId = typeof theme === 'string' ? theme : (theme.name || 'js-theme');
      this.storageAdapter.setItem(this.config.storageKey, themeId);
    }

    // Call config callback
    if (this.config.onThemeChange) {
      this.config.onThemeChange(theme);
    }
  }

  /**
   * Get current theme
   */
  getTheme(): string {
    return this.currentTheme || this.config.defaultTheme as string || '';
  }

  /**
   * Get active theme object (for JS themes)
   */
  getActiveTheme(): Theme | null {
    return this.activeTheme || this.engine.getActiveTheme();
  }

  /**
   * Get available themes
   */
  getAvailableThemes(): ThemeMetadata[] {
    return this.engine.getRegistry().getAllMetadata();
  }

  /**
   * Check if theme is loaded
   */
  isThemeLoaded(themeName: string): boolean {
    return this.engine.isThemeLoaded(themeName);
  }

  /**
   * Preload theme
   */
  async preloadTheme(themeName: string): Promise<void> {
    await this.engine.preloadTheme(themeName);
  }

  /**
   * Add event listener
   */
  on(event: 'themeChange', callback: ThemeChangeCallback): void;
  on(event: 'themeLoad', callback: ThemeLoadCallback): void;
  on(event: 'themeError', callback: ThemeErrorCallback): void;
  on(event: ThemeManagerEvent, callback: any): void {
    if (event === 'themeChange') {
      this.eventListeners.themeChange.push(callback);
    } else if (event === 'themeLoad') {
      this.eventListeners.themeLoad.push(callback);
    } else if (event === 'themeError') {
      this.eventListeners.themeError.push(callback);
    }
  }

  /**
   * Remove event listener
   */
  off(event: 'themeChange', callback: ThemeChangeCallback): void;
  off(event: 'themeLoad', callback: ThemeLoadCallback): void;
  off(event: 'themeError', callback: ThemeErrorCallback): void;
  off(event: ThemeManagerEvent, callback: any): void {
    if (event === 'themeChange') {
      this.eventListeners.themeChange = this.eventListeners.themeChange.filter(cb => cb !== callback);
    } else if (event === 'themeLoad') {
      this.eventListeners.themeLoad = this.eventListeners.themeLoad.filter(cb => cb !== callback);
    } else if (event === 'themeError') {
      this.eventListeners.themeError = this.eventListeners.themeError.filter(cb => cb !== callback);
    }
  }

  /**
   * Emit theme change event
   */
  private emitThemeChange(event: any): void {
    const themeChangeEvent: ThemeChangeEvent = {
      previousTheme: event.previousTheme,
      currentTheme: event.currentTheme,
      themeObject: event.themeObject,
      timestamp: event.timestamp,
      source: event.source,
    };

    for (const callback of this.eventListeners.themeChange) {
      try {
        callback(themeChangeEvent);
      } catch (error) {
        console.error('Error in theme change callback:', error);
      }
    }
  }

  /**
   * Emit theme load event
   */
  private emitThemeLoad(themeName: string): void {
    for (const callback of this.eventListeners.themeLoad) {
      try {
        callback(themeName);
      } catch (error) {
        console.error('Error in theme load callback:', error);
      }
    }
  }

  /**
   * Emit theme error event
   */
  private emitThemeError(error: Error, themeName: string): void {
    if (this.config.onError) {
      this.config.onError(error, themeName);
    }

    for (const callback of this.eventListeners.themeError) {
      try {
        callback(error, themeName);
      } catch (err) {
        console.error('Error in theme error callback:', err);
      }
    }
  }

  /**
   * Get engine instance (for advanced usage)
   */
  getEngine(): ThemeEngine {
    return this.engine;
  }

  /**
   * Destroy theme manager
   */
  destroy(): void {
    // Remove all listeners
    this.eventListeners = {
      themeChange: [],
      themeLoad: [],
      themeError: [],
    };

    // Clear engine listeners
    // Note: ThemeEngine doesn't have a destroy method yet, but we can add one if needed
    this.initialized = false;
  }
}

/**
 * Theme manager event type
 */
type ThemeManagerEvent = 'themeChange' | 'themeLoad' | 'themeError';
