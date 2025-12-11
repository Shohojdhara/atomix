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
import { RTLManager, type RTLConfig } from '../i18n/rtl';
import { ThemeError, ThemeErrorCode, getLogger } from '../errors';
import {
  DEFAULT_STORAGE_KEY,
  DEFAULT_DATA_ATTRIBUTE,
  DEFAULT_BASE_PATH,
} from '../constants';

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: Partial<ThemeManagerConfig> = {
  basePath: DEFAULT_BASE_PATH,
  cdnPath: null,
  lazy: true,
  storageKey: DEFAULT_STORAGE_KEY,
  dataAttribute: DEFAULT_DATA_ATTRIBUTE,
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
 *   // No defaultTheme - uses built-in styles
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
  private rtlManager?: RTLManager;
  private logger = getLogger();

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
    } as Required<Omit<ThemeManagerConfig, 'onThemeChange' | 'onError' | 'cdnPath' | 'defaultTheme'>> & {
      defaultTheme?: string | Theme;
      cdnPath: string | null;
      onThemeChange?: (theme: string | Theme) => void;
      onError?: (error: Error, themeName: string) => void;
    };

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

    // Initialize RTL manager if configured
    if (config.rtl) {
      this.rtlManager = new RTLManager(config.rtl);
    }

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

      // Load default theme only if specified
      const defaultTheme = this.getDefaultTheme();
      if (defaultTheme) {
        // Check if theme exists in registry before attempting to load
        const themeId = typeof defaultTheme === 'string' ? defaultTheme : (defaultTheme.name || '');
        if (this.engine.getRegistry().has(themeId)) {
          this.setTheme(defaultTheme, { removePrevious: false, fallbackOnError: true }).catch((error) => {
            // Only log error once, don't spam console
            if (error instanceof Error && !error.message.includes('previously failed')) {
              this.logger.warn(`Failed to load default theme "${themeId}"`, {
                themeId,
                error: error.message,
              });
            }
          });
        } else {
          // Theme not in registry, log warning but don't try to load
          this.logger.warn(`Default theme "${themeId}" not found in registry. Using built-in styles.`, {
            themeId,
          });
        }
      }
      // If no default theme, use built-in styles (no theme CSS loaded)
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
    return this.currentTheme || (typeof this.config.defaultTheme === 'string' ? this.config.defaultTheme : '');
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
  on(event: ThemeManagerEvent, callback: ThemeChangeCallback | ThemeLoadCallback | ThemeErrorCallback): void {
    if (event === 'themeChange') {
      this.eventListeners.themeChange.push(callback as ThemeChangeCallback);
    } else if (event === 'themeLoad') {
      this.eventListeners.themeLoad.push(callback as ThemeLoadCallback);
    } else if (event === 'themeError') {
      this.eventListeners.themeError.push(callback as ThemeErrorCallback);
    }
  }

  /**
   * Remove event listener
   */
  off(event: 'themeChange', callback: ThemeChangeCallback): void;
  off(event: 'themeLoad', callback: ThemeLoadCallback): void;
  off(event: 'themeError', callback: ThemeErrorCallback): void;
  off(event: ThemeManagerEvent, callback: ThemeChangeCallback | ThemeLoadCallback | ThemeErrorCallback): void {
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
  private emitThemeChange(event: ThemeChangeEvent): void {
    for (const callback of this.eventListeners.themeChange) {
      try {
        callback(event);
      } catch (error) {
        this.logger.error(
          'Error in theme change callback',
          error instanceof Error ? error : new Error(String(error)),
          { event }
        );
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
        this.logger.error(
          'Error in theme load callback',
          error instanceof Error ? error : new Error(String(error)),
          { themeName }
        );
      }
    }
  }

  /**
   * Emit theme error event
   */
  private emitThemeError(error: Error, themeName: string): void {
    const themeError = error instanceof ThemeError 
      ? error 
      : new ThemeError(
          error.message,
          ThemeErrorCode.THEME_LOAD_FAILED,
          { themeName, originalError: error.message }
        );

    if (this.config.onError) {
      try {
        this.config.onError(error, themeName);
      } catch (err) {
        this.logger.error(
          'Error in onError callback',
          err instanceof Error ? err : new Error(String(err)),
          { themeName }
        );
      }
    }

    for (const callback of this.eventListeners.themeError) {
      try {
        callback(error, themeName);
      } catch (err) {
        this.logger.error(
          'Error in theme error callback',
          err instanceof Error ? err : new Error(String(err)),
          { themeName }
        );
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
   * Get RTL manager
   */
  getRTLManager(): RTLManager | undefined {
    return this.rtlManager;
  }

  /**
   * Set RTL direction
   */
  setDirection(direction: 'ltr' | 'rtl'): void {
    this.rtlManager?.setDirection(direction);
  }

  /**
   * Get current direction
   */
  getDirection(): 'ltr' | 'rtl' {
    return this.rtlManager?.getDirection() || 'ltr';
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

    // Destroy RTL manager
    this.rtlManager?.destroy();

    // Clear engine listeners
    this.initialized = false;
  }
}

/**
 * Theme manager event type
 */
type ThemeManagerEvent = 'themeChange' | 'themeLoad' | 'themeError';
