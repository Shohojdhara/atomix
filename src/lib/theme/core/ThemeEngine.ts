/**
 * Theme Engine
 * 
 * Core engine for unified CSS and JS theme support
 */

import type { Theme } from '../types';
import type { ThemeDefinition } from '../config/types';
import { ThemeRegistry } from './ThemeRegistry';
import { ThemeCache } from './ThemeCache';
import { ThemeValidator } from './ThemeValidator';
import { isBrowser, isServer, loadThemeCSS, removeThemeCSS, applyThemeAttributes } from '../utils';
import { generateCSSVariables, injectCSS, removeInjectedCSS } from '../generateCSSVariables';
import { isJSTheme } from '../themeUtils';

/**
 * Theme change event
 */
export interface ThemeChangeEvent {
  /** Previous theme ID */
  previousTheme: string | null;
  /** Current theme ID */
  currentTheme: string;
  /** Theme object (for JS themes) */
  themeObject?: Theme | null;
  /** Timestamp */
  timestamp: number;
  /** Source of change */
  source: 'user' | 'system' | 'storage';
}

/**
 * Theme load options
 */
export interface ThemeLoadOptions {
  /** Force reload even if already loaded */
  force?: boolean;
  /** Preload without applying */
  preload?: boolean;
  /** Remove previous theme CSS */
  removePrevious?: boolean;
  /** Custom CSS path override */
  customPath?: string;
  /** Fallback to default theme on error */
  fallbackOnError?: boolean;
}

/**
 * Event listener types
 */
export type ThemeChangeListener = (event: ThemeChangeEvent) => void;
export type ThemeLoadListener = (themeId: string) => void;
export type ThemeErrorListener = (error: Error, themeId: string) => void;

/**
 * Theme Engine Configuration
 */
export interface ThemeEngineConfig {
  /** Base path for CSS themes */
  basePath?: string;
  /** CDN path for CSS themes */
  cdnPath?: string | null;
  /** Use minified CSS */
  useMinified?: boolean;
  /** Data attribute name */
  dataAttribute?: string;
  /** Enable caching */
  enableCache?: boolean;
  /** Cache configuration */
  cacheConfig?: {
    maxSize?: number;
    ttl?: number;
  };
}

/**
 * Theme Engine
 * 
 * Unified engine for managing CSS and JS themes
 */
export class ThemeEngine {
  private registry: ThemeRegistry;
  private cache: ThemeCache;
  private validator: ThemeValidator;
  private config: Required<Omit<ThemeEngineConfig, 'cdnPath'>> & {
    cdnPath: string | null;
  };

  private currentTheme: string | null = null;
  private activeTheme: Theme | null = null;
  private loadedThemes: Set<string> = new Set();
  private loadingThemes: Map<string, Promise<void>> = new Map();

  private changeListeners: ThemeChangeListener[] = [];
  private loadListeners: ThemeLoadListener[] = [];
  private errorListeners: ThemeErrorListener[] = [];

  constructor(config: ThemeEngineConfig = {}) {
    this.registry = new ThemeRegistry();
    this.cache = new ThemeCache(config.cacheConfig);
    this.validator = new ThemeValidator();

    this.config = {
      basePath: config.basePath || '/themes',
      cdnPath: config.cdnPath ?? null,
      useMinified: config.useMinified ?? false,
      dataAttribute: config.dataAttribute || 'data-theme',
      enableCache: config.enableCache ?? true,
      cacheConfig: config.cacheConfig ?? {
        maxSize: 10,
        ttl: 0,
      },
    };
  }

  /**
   * Initialize engine with theme registry
   */
  async initialize(): Promise<void> {
    await this.registry.initialize();
  }

  /**
   * Get current theme ID
   */
  getCurrentTheme(): string | null {
    return this.currentTheme;
  }

  /**
   * Get active theme object
   */
  getActiveTheme(): Theme | null {
    return this.activeTheme;
  }

  /**
   * Check if theme is loaded
   */
  isThemeLoaded(themeId: string): boolean {
    return this.loadedThemes.has(themeId);
  }

  /**
   * Load and apply theme
   */
  async setTheme(themeId: string | Theme, options: ThemeLoadOptions = {}): Promise<void> {
    const {
      force = false,
      preload = false,
      removePrevious = true,
      fallbackOnError = true,
    } = options;

    // Handle Theme object directly
    if (typeof themeId !== 'string') {
      if (isJSTheme(themeId)) {
        await this.applyJSTheme(themeId, removePrevious);
        return;
      } else {
        throw new Error('Invalid theme object provided');
      }
    }

    // Check if theme exists
    if (!this.registry.has(themeId)) {
      const error = new Error(`Theme "${themeId}" not found in registry`);
      this.emitError(error, themeId);
      if (fallbackOnError && this.currentTheme) {
        // Try to revert to current theme
        return;
      }
      throw error;
    }

    // Check if already loaded and not forcing
    if (!force && this.isThemeLoaded(themeId) && !preload) {
      if (this.currentTheme !== themeId) {
        await this.applyTheme(themeId, removePrevious);
      }
      return;
    }

    // Check if already loading
    const existingLoad = this.loadingThemes.get(themeId);
    if (existingLoad) {
      await existingLoad;
      if (!preload && this.currentTheme !== themeId) {
        await this.applyTheme(themeId, removePrevious);
      }
      return;
    }

    // Start loading
    const loadPromise = this.loadTheme(themeId, options);
    this.loadingThemes.set(themeId, loadPromise);

    try {
      await loadPromise;
      this.loadingThemes.delete(themeId);

      if (!preload) {
        await this.applyTheme(themeId, removePrevious);
      }
    } catch (error) {
      this.loadingThemes.delete(themeId);
      this.emitError(error instanceof Error ? error : new Error(String(error)), themeId);
      if (fallbackOnError && this.currentTheme) {
        // Try to revert
        return;
      }
      throw error;
    }
  }

  /**
   * Load theme (CSS or JS)
   */
  private async loadTheme(themeId: string, options: ThemeLoadOptions): Promise<void> {
    const definition = this.registry.getDefinition(themeId);
    if (!definition) {
      throw new Error(`Theme definition not found: ${themeId}`);
    }

    if (definition.type === 'css') {
      await this.loadCSSTheme(themeId, definition, options);
    } else {
      await this.loadJSTheme(themeId, definition);
    }

    this.loadedThemes.add(themeId);
    this.emitLoad(themeId);
  }

  /**
   * Load CSS theme
   */
  private async loadCSSTheme(
    themeId: string,
    definition: ThemeDefinition,
    options: ThemeLoadOptions
  ): Promise<void> {
    // Check cache
    if (this.config.enableCache) {
      const cached = this.cache.getCSS(themeId);
      if (cached?.loaded) {
        return;
      }
    }

    if (isServer()) {
      return;
    }

    const cssPath = options.customPath || 
                   (definition.type === 'css' && definition.cssPath) ||
                   `${this.config.basePath}/${themeId}${this.config.useMinified ? '.min' : ''}.css`;

    const fullPath = this.config.cdnPath || cssPath;

    // Mark as loading
    if (this.config.enableCache) {
      this.cache.setCSS(themeId, { loading: Promise.resolve(), loaded: false });
    }

    try {
      await loadThemeCSS(fullPath, getThemeLinkId(themeId));
      
      if (this.config.enableCache) {
        this.cache.setCSS(themeId, { loaded: true, loading: null });
      }
    } catch (error) {
      if (this.config.enableCache) {
        this.cache.delete(themeId);
      }
      throw error;
    }
  }

  /**
   * Load JS theme
   */
  private async loadJSTheme(themeId: string, definition: ThemeDefinition): Promise<void> {
    if (definition.type !== 'js') {
      return;
    }

    // Check cache
    if (this.config.enableCache) {
      const cached = this.cache.getJS(themeId);
      if (cached) {
        this.registry.setTheme(themeId, cached.theme);
        return;
      }
    }

    // Create theme
    const theme = definition.createTheme();

    // Validate theme
    const metadata = this.registry.get(themeId);
    const validation = this.validator.validate(theme, {
      ...definition,
      name: themeId,
    });

    if (!validation.valid && validation.errors.length > 0) {
      console.warn(`Theme validation errors for "${themeId}":`, validation.errors);
    }

    // Cache and register
    if (this.config.enableCache) {
      this.cache.setJS(themeId, theme);
    }
    this.registry.setTheme(themeId, theme);
  }

  /**
   * Apply theme (set as active)
   */
  private async applyTheme(themeId: string, removePrevious: boolean): Promise<void> {
    const previousTheme = this.currentTheme;

    // Remove previous theme if requested
    if (removePrevious && previousTheme && previousTheme !== themeId) {
      await this.removeTheme(previousTheme);
    }

    const definition = this.registry.getDefinition(themeId);
    if (!definition) {
      throw new Error(`Theme definition not found: ${themeId}`);
    }

    if (definition.type === 'css') {
      await this.applyCSSTheme(themeId);
    } else {
      const theme = this.registry.getTheme(themeId);
      if (theme) {
        await this.applyJSTheme(theme, false);
      }
    }

    this.currentTheme = themeId;
    this.emitChange({
      previousTheme,
      currentTheme: themeId,
      themeObject: this.activeTheme,
      timestamp: Date.now(),
      source: 'user',
    });
  }

  /**
   * Apply CSS theme
   */
  private async applyCSSTheme(themeId: string): Promise<void> {
    if (isServer()) {
      return;
    }

    const definition = this.registry.getDefinition(themeId);
    const className = definition?.class || themeId;

    applyThemeAttributes(this.config.dataAttribute, className);
    this.activeTheme = null;
  }

  /**
   * Apply JS theme
   */
  private async applyJSTheme(theme: Theme, removePrevious: boolean): Promise<void> {
    if (isServer()) {
      return;
    }

    // Remove previous JS theme CSS
    if (removePrevious) {
      removeInjectedCSS('atomix-js-theme-styles');
    }

    // Generate and inject CSS variables
    const css = generateCSSVariables(theme, {
      selector: ':root',
      prefix: 'atomix',
    });

    injectCSS(css, 'atomix-js-theme-styles');

    // Apply data attribute
    const themeId = theme.name || 'js-theme';
    applyThemeAttributes(this.config.dataAttribute, themeId);

    this.activeTheme = theme;
    this.currentTheme = themeId;
  }

  /**
   * Remove theme
   */
  private async removeTheme(themeId: string): Promise<void> {
    const definition = this.registry.getDefinition(themeId);
    if (!definition) {
      return;
    }

    if (definition.type === 'css') {
      if (isBrowser()) {
        removeThemeCSS(getThemeLinkId(themeId));
      }
    } else {
      if (isBrowser()) {
        removeInjectedCSS('atomix-js-theme-styles');
      }
    }
  }

  /**
   * Preload theme
   */
  async preloadTheme(themeId: string): Promise<void> {
    await this.setTheme(themeId, { preload: true });
  }

  /**
   * Get registry
   */
  getRegistry(): ThemeRegistry {
    return this.registry;
  }

  /**
   * Get cache
   */
  getCache(): ThemeCache {
    return this.cache;
  }

  /**
   * Add change listener
   */
  on(event: 'change', listener: ThemeChangeListener): void;
  on(event: 'load', listener: ThemeLoadListener): void;
  on(event: 'error', listener: ThemeErrorListener): void;
  on(event: string, listener: any): void {
    if (event === 'change') {
      this.changeListeners.push(listener);
    } else if (event === 'load') {
      this.loadListeners.push(listener);
    } else if (event === 'error') {
      this.errorListeners.push(listener);
    }
  }

  /**
   * Remove listener
   */
  off(event: 'change', listener: ThemeChangeListener): void;
  off(event: 'load', listener: ThemeLoadListener): void;
  off(event: 'error', listener: ThemeErrorListener): void;
  off(event: string, listener: any): void {
    if (event === 'change') {
      this.changeListeners = this.changeListeners.filter(l => l !== listener);
    } else if (event === 'load') {
      this.loadListeners = this.loadListeners.filter(l => l !== listener);
    } else if (event === 'error') {
      this.errorListeners = this.errorListeners.filter(l => l !== listener);
    }
  }

  /**
   * Emit change event
   */
  private emitChange(event: ThemeChangeEvent): void {
    for (const listener of this.changeListeners) {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in theme change listener:', error);
      }
    }
  }

  /**
   * Emit load event
   */
  private emitLoad(themeId: string): void {
    for (const listener of this.loadListeners) {
      try {
        listener(themeId);
      } catch (error) {
        console.error('Error in theme load listener:', error);
      }
    }
  }

  /**
   * Emit error event
   */
  private emitError(error: Error, themeId: string): void {
    for (const listener of this.errorListeners) {
      try {
        listener(error, themeId);
      } catch (err) {
        console.error('Error in theme error listener:', err);
      }
    }
  }
}

/**
 * Helper to get theme link ID
 */
function getThemeLinkId(themeName: string): string {
  return `atomix-theme-${themeName}`;
}
