/**
 * Theme Manager
 * 
 * Core theme management class for the Atomix Design System.
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
} from './types';

import {
    isBrowser,
    isServer,
    loadThemeCSS,
    removeThemeCSS,
    removeAllThemeCSS,
    applyThemeAttributes,
    getCurrentThemeFromDOM,
    isThemeLoaded as checkThemeLoaded,
    validateThemeMetadata,
    isValidThemeName,
    createLocalStorageAdapter,
} from './utils';

import { isJSTheme } from './themeUtils';
import { generateCSSVariables, injectCSS, removeInjectedCSS } from './generateCSSVariables';

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

// ID for injected JS theme styles
const JS_THEME_STYLE_ID = 'atomix-js-theme-styles';

/**
 * ThemeManager class
 * 
 * Manages theme loading, switching, and persistence for Atomix Design System.
 * 
 * @example
 * ```typescript
 * const themeManager = new ThemeManager({
 *   themes: themesConfig.metadata,
 *   defaultTheme: 'shaj-default',
 * });
 * 
 * await themeManager.setTheme('flashtrade');
 * ```
 */
export class ThemeManager {
    private config: Required<Omit<ThemeManagerConfig, 'onThemeChange' | 'onError' | 'cdnPath' | 'defaultTheme'>> & {
        defaultTheme?: string | Theme;
        cdnPath: string | null;
        onThemeChange?: (theme: string | Theme) => void;
        onError?: (error: Error, themeName: string) => void;
    };

    private currentTheme: string | null = null;
    private activeTheme: Theme | null = null;
    private loadedThemes: Set<string> = new Set();
    private loadingThemes: Map<string, Promise<void>> = new Map();
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
        // Validate required config
        const hasThemes = config.themes && Object.keys(config.themes).length > 0;
        const hasDefaultThemeObject = config.defaultTheme && typeof config.defaultTheme !== 'string';

        if (!hasThemes && !hasDefaultThemeObject) {
            // For backward compatibility: require themes if no JS theme object is provided
            throw new Error('ThemeManager: themes configuration is required');
        }

        // Merge with defaults
        this.config = {
            ...DEFAULT_CONFIG,
            ...config,
            themes: config.themes || {},
            defaultTheme: config.defaultTheme || (config.themes && Object.keys(config.themes)[0]),
        } as any;

        // Default theme required if provided
        if (!this.config.defaultTheme) {
            console.warn('ThemeManager: No default theme provided.');
        }

        // Validate default theme exists (if string)
        if (typeof this.config.defaultTheme === 'string') {
            const defName = this.config.defaultTheme;
            if (!this.config.themes[defName]) {
                throw new Error(`ThemeManager: default theme "${defName}" not found in themes configuration`);
            }
        }

        // Initialize storage adapter
        this.storageAdapter = createLocalStorageAdapter();

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

        // Try to load theme from storage
        let initialTheme = this.config.defaultTheme;

        if (this.config.enablePersistence && this.storageAdapter.isAvailable()) {
            const storedTheme = this.storageAdapter.getItem(this.config.storageKey);
            if (storedTheme) {
                // If stored theme is a name in config.themes, use it
                if (typeof storedTheme === 'string' && this.config.themes[storedTheme]) {
                    initialTheme = storedTheme;
                } else if (typeof storedTheme === 'string') {
                    // Check if stored theme name matches a JS theme (defaultTheme as Theme object)
                    // This handles persistence of JS themes that aren't in config.themes
                    if (isJSTheme(this.config.defaultTheme)) {
                        const defaultThemeName = this.config.defaultTheme.name || 'custom-theme';
                        if (storedTheme === defaultThemeName) {
                            initialTheme = this.config.defaultTheme;
                        }
                    }
                }
            }
        }

        // Check if theme is already set in DOM (CSS themes)
        const domTheme = getCurrentThemeFromDOM(this.config.dataAttribute);
        if (domTheme && this.config.themes[domTheme]) {
            initialTheme = domTheme;
        }

        // Set initial theme synchronously
        if (initialTheme) {
            if (isJSTheme(initialTheme)) {
                // JS Theme
                this.activeTheme = initialTheme;
                this.currentTheme = initialTheme.name || 'custom-theme';
                try {
                    const css = generateCSSVariables(initialTheme);
                    injectCSS(css, JS_THEME_STYLE_ID);
                    applyThemeAttributes(this.currentTheme, this.config.dataAttribute);
                } catch (e) {
                    console.warn('Failed to apply initial JS theme:', e);
                }
            } else {
                // CSS Theme string
                this.currentTheme = initialTheme as string;
                applyThemeAttributes(this.currentTheme, this.config.dataAttribute);

                // Trigger load async
                this.preloadTheme(this.currentTheme).catch(err => {
                    console.warn('Failed to preload initial theme:', err);
                });
            }
        }

        // Preload themes if configured
        if (this.config.preload && this.config.preload.length > 0) {
            this.config.preload.forEach(themeName => {
                if (this.config.themes[themeName]) {
                    this.preloadTheme(themeName).catch(error => {
                        console.warn(`Failed to preload theme "${themeName}":`, error);
                    });
                }
            });
        }

        this.initialized = true;
    }

    /**
     * Get the current theme name
     * 
     * @returns Current theme name
     */
    public getTheme(): string {
        return this.currentTheme || (typeof this.config.defaultTheme === 'string' ? this.config.defaultTheme : 'unknown');
    }

    /**
     * Get the current active theme object (for JS themes)
     */
    public getActiveTheme(): Theme | null {
        return this.activeTheme;
    }

    /**
     * Get all available themes
     * 
     * @returns Array of theme metadata
     */
    public getAvailableThemes(): ThemeMetadata[] {
        return Object.entries(this.config.themes).map(([key, metadata]) => ({
            ...metadata,
            class: key,
        }));
    }

    /**
     * Get metadata for a specific theme
     * 
     * @param themeName - Name of the theme
     * @returns Theme metadata or null if not found
     */
    public getThemeMetadata(themeName: string): ThemeMetadata | null {
        const metadata = this.config.themes[themeName];
        return metadata ? { ...metadata, class: themeName } : null;
    }

    /**
     * Check if a theme is currently loaded
     * 
     * @param themeName - Name of the theme to check
     * @returns True if theme is loaded
     */
    public isThemeLoaded(themeName: string): boolean {
        if (isServer()) {
            return false;
        }
        return this.loadedThemes.has(themeName) || checkThemeLoaded(themeName);
    }

    /**
     * Validate a theme name
     * 
     * @param themeName - Theme name to validate
     * @returns True if theme exists and is valid
     */
    public validateTheme(themeName: string): boolean {
        if (!isValidThemeName(themeName)) {
            return false;
        }

        const metadata = this.config.themes[themeName];
        if (!metadata) {
            return false;
        }

        const validation = validateThemeMetadata(metadata);
        return validation.valid;
    }

    /**
     * Preload a theme without applying it
     * 
     * @param themeName - Name of the theme to preload
     * @returns Promise that resolves when theme is loaded
     */
    public async preloadTheme(themeName: string): Promise<void> {
        if (isServer()) {
            return Promise.resolve();
        }

        // Validate theme name format to prevent path injection
        if (!isValidThemeName(themeName)) {
            const error = new Error(`Invalid theme name: "${themeName}". Theme names must be lowercase alphanumeric with hyphens.`);
            this.emitError(error, themeName);
            throw error;
        }

        // Check if theme exists
        if (!this.config.themes[themeName]) {
            const error = new Error(`Theme "${themeName}" not found`);
            this.emitError(error, themeName);
            throw error;
        }

        // Check if already loaded
        if (this.isThemeLoaded(themeName)) {
            return Promise.resolve();
        }

        // Check if already loading
        if (this.loadingThemes.has(themeName)) {
            return this.loadingThemes.get(themeName)!;
        }

        // Load theme CSS
        const loadPromise = loadThemeCSS(
            themeName,
            this.config.basePath,
            this.config.useMinified,
            this.config.cdnPath
        )
            .then(() => {
                this.loadedThemes.add(themeName);
                this.loadingThemes.delete(themeName);
                this.emitLoad(themeName);
            })
            .catch(error => {
                this.loadingThemes.delete(themeName);
                this.emitError(error, themeName);
                throw error;
            });

        this.loadingThemes.set(themeName, loadPromise);
        return loadPromise;
    }

    /**
     * Set the current theme
     * 
     * @param themeOrName - Name of the theme or Theme object to set
     * @param options - Load options
     * @returns Promise that resolves when theme is applied
     */
    public async setTheme(
        themeOrName: string | Theme,
        options: ThemeLoadOptions = {}
    ): Promise<void> {
        if (isServer()) {
            return Promise.resolve();
        }

        const isJS = isJSTheme(themeOrName);
        let themeName: string;
        let themeObject: Theme | null = null;

        if (isJS) {
            themeObject = themeOrName as Theme;
            themeName = themeObject.name || 'custom-theme';
        } else {
            themeName = themeOrName as string;
            // Validate theme name format
            if (!isValidThemeName(themeName)) {
                const error = new Error(`Invalid theme name: "${themeName}". Theme names must be lowercase alphanumeric with hyphens.`);
                this.emitError(error, themeName);
                throw error;
            }
            // Validate theme exists in config
            if (!this.config.themes[themeName]) {
                const error = new Error(`Theme "${themeName}" not found`);
                this.emitError(error, themeName);
                throw error;
            }
        }

        const previousTheme = this.currentTheme;
        const isCurrentlyJS = this.activeTheme !== null;

        // Check if already current theme (and not forced)
        // Only return early if:
        // 1. Names match
        // 2. Not forced
        // 3. Both are the same type (both CSS or both JS)
        //    - If switching from JS to CSS or CSS to JS with same name, we need to proceed
        if (themeName === this.currentTheme && !options.force) {
            // If both are CSS themes, return early
            if (!isJS && !isCurrentlyJS) {
                return Promise.resolve();
            }
            // If both are JS themes with the same name, return early
            // (Note: We can't easily compare JS theme objects, but if name matches and both are JS, assume same)
            if (isJS && isCurrentlyJS) {
                return Promise.resolve();
            }
            // If switching between JS and CSS with same name, continue to switch implementations
        }

        try {
            if (isJS && themeObject) {
                // Handle JS Theme

                // 1. Generate CSS Variables
                const css = generateCSSVariables(themeObject);

                // 2. Inject CSS
                injectCSS(css, JS_THEME_STYLE_ID);

                // 3. Remove previous theme attribute? 
                // We might want to keep data-theme attribute if it helps selectors, 
                // but if the theme name matches, good.
                applyThemeAttributes(themeName, this.config.dataAttribute);

                const wasJS = !!this.activeTheme;
                // 4. Set active theme object
                this.activeTheme = themeObject;

                // 5. If we had a previous CSS theme loaded (and it wasn't a JS theme)
                if (previousTheme && !wasJS && options.removePrevious) {
                    // If previously we had a CSS theme, we should remove it.
                    // We can check if previousTheme was in availableThemes.
                    if (this.config.themes[previousTheme]) {
                        removeThemeCSS(previousTheme);
                        this.loadedThemes.delete(previousTheme);
                    }
                }

            } else {
                // Handle CSS Theme

                // 1. Clear any active JS theme
                if (this.activeTheme) {
                    removeInjectedCSS(JS_THEME_STYLE_ID);
                    this.activeTheme = null;
                }

                // 2. Load CSS if needed
                if (!this.isThemeLoaded(themeName) || options.force) {
                    await this.preloadTheme(themeName);
                }

                // 3. Remove previous theme CSS
                if (options.removePrevious && previousTheme && previousTheme !== themeName) {
                    removeThemeCSS(previousTheme);
                    this.loadedThemes.delete(previousTheme);
                }

                // 4. Apply attributes
                applyThemeAttributes(themeName, this.config.dataAttribute);
            }

            // Update current theme name
            this.currentTheme = themeName;

            // Persist (only if string name and in config?)
            // If it's a JS theme, we can't persist the object, but if it has a name, we might persist that
            // and expect the app to restore it (e.g. by re-creating it).
            if (this.config.enablePersistence && this.storageAdapter.isAvailable()) {
                // Only persist if it's a known theme string or we accept persisting names of JS custom themes
                // For now, let's persist whatever string we have.
                this.storageAdapter.setItem(this.config.storageKey, themeName);
            }

            // Emit change event
            this.emitThemeChange(previousTheme, themeName, this.activeTheme);

            // Callback
            if (this.config.onThemeChange) {
                this.config.onThemeChange(isJS ? (themeObject || themeName) : themeName);
            }

        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            this.emitError(err, themeName);

            if (this.config.onError) {
                this.config.onError(err, themeName);
            }

            // Fallback
            if (options.fallbackOnError && this.config.defaultTheme) {
                // Extract theme names consistently to avoid comparing string to Theme object
                const targetName = themeName; // themeName is already a string at this point
                const defName = isJSTheme(this.config.defaultTheme)
                    ? this.config.defaultTheme.name
                    : this.config.defaultTheme;

                // Only fallback if target theme is different from default theme
                if (targetName !== defName) {
                    const def = this.config.defaultTheme;
                    if (def && typeof def !== 'string') {
                        // recursively call set theme with default object
                        return this.setTheme(def, { ...options, fallbackOnError: false });
                    } else if (typeof def === 'string') {
                        return this.setTheme(def, { ...options, fallbackOnError: false });
                    }
                }
            }

            throw err;
        }
    }

    /**
     * Enable theme persistence
     * 
     * @param storageKey - Optional custom storage key
     */
    public enablePersistence(storageKey?: string): void {
        this.config.enablePersistence = true;
        if (storageKey) {
            this.config.storageKey = storageKey;
        }

        // Save current theme
        if (this.currentTheme && this.storageAdapter.isAvailable()) {
            this.storageAdapter.setItem(this.config.storageKey, this.currentTheme);
        }
    }

    /**
     * Disable theme persistence
     */
    public disablePersistence(): void {
        this.config.enablePersistence = false;

        // Clear stored theme
        if (this.storageAdapter.isAvailable()) {
            this.storageAdapter.removeItem(this.config.storageKey);
        }
    }

    /**
     * Clear all loaded themes
     */
    public clearThemes(): void {
        if (isServer()) {
            return;
        }

        removeAllThemeCSS();
        removeInjectedCSS(JS_THEME_STYLE_ID);
        this.loadedThemes.clear();
        this.loadingThemes.clear();
        this.activeTheme = null;
    }

    /**
     * Add event listener
     * 
     * @param event - Event name
     * @param callback - Callback function
     */
    public on(event: 'themeChange', callback: ThemeChangeCallback): void;
    public on(event: 'themeLoad', callback: ThemeLoadCallback): void;
    public on(event: 'themeError', callback: ThemeErrorCallback): void;
    public on(event: string, callback: any): void {
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
     * 
     * @param event - Event name
     * @param callback - Callback function to remove
     */
    public off(event: 'themeChange', callback: ThemeChangeCallback): void;
    public off(event: 'themeLoad', callback: ThemeLoadCallback): void;
    public off(event: 'themeError', callback: ThemeErrorCallback): void;
    public off(event: string, callback: any): void {
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
    private emitThemeChange(previousTheme: string | null, currentTheme: string, themeObject?: Theme | null): void {
        const event: ThemeChangeEvent = {
            previousTheme,
            currentTheme,
            themeObject,
            timestamp: Date.now(),
            source: 'user',
        };

        this.eventListeners.themeChange.forEach(callback => {
            try {
                callback(event);
            } catch (error) {
                console.error('Error in themeChange listener:', error);
            }
        });
    }

    /**
     * Emit theme load event
     */
    private emitLoad(themeName: string): void {
        this.eventListeners.themeLoad.forEach(callback => {
            try {
                callback(themeName);
            } catch (error) {
                console.error('Error in themeLoad listener:', error);
            }
        });
    }

    /**
     * Emit theme error event
     */
    private emitError(error: Error, themeName: string): void {
        this.eventListeners.themeError.forEach(callback => {
            try {
                callback(error, themeName);
            } catch (err) {
                console.error('Error in themeError listener:', err);
            }
        });
    }

    /**
     * Destroy the theme manager and clean up
     */
    public destroy(): void {
        this.clearThemes();
        this.eventListeners.themeChange = [];
        this.eventListeners.themeLoad = [];
        this.eventListeners.themeError = [];
        this.initialized = false;
        this.activeTheme = null;
    }
}

export default ThemeManager;
