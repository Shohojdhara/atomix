/**
 * Theme Manager
 * 
 * Core theme management class for the Atomix Design System.
 * Handles theme loading, switching, persistence, and events.
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
    private config: Required<Omit<ThemeManagerConfig, 'onThemeChange' | 'onError' | 'cdnPath'>> & {
        cdnPath: string | null;
        onThemeChange?: (theme: string) => void;
        onError?: (error: Error, themeName: string) => void;
    };

    private currentTheme: string | null = null;
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
        if (!config.themes || Object.keys(config.themes).length === 0) {
            throw new Error('ThemeManager: themes configuration is required');
        }

        // Merge with defaults
        this.config = {
            ...DEFAULT_CONFIG,
            ...config,
            themes: config.themes,
            defaultTheme: config.defaultTheme || Object.keys(config.themes)[0],
        } as Required<Omit<ThemeManagerConfig, 'onThemeChange' | 'onError' | 'cdnPath'>> & {
            cdnPath: string | null;
            onThemeChange?: (theme: string) => void;
            onError?: (error: Error, themeName: string) => void;
        };

        // Validate default theme exists
        if (!this.config.themes[this.config.defaultTheme]) {
            throw new Error(`ThemeManager: default theme "${this.config.defaultTheme}" not found in themes configuration`);
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
            if (storedTheme && this.config.themes[storedTheme]) {
                initialTheme = storedTheme;
            }
        }

        // Check if theme is already set in DOM
        const domTheme = getCurrentThemeFromDOM(this.config.dataAttribute);
        if (domTheme && this.config.themes[domTheme]) {
            initialTheme = domTheme;
        }

        // Set initial theme
        this.currentTheme = initialTheme;

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
        return this.currentTheme || this.config.defaultTheme;
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
     * @param themeName - Name of the theme to set
     * @param options - Load options
     * @returns Promise that resolves when theme is applied
     */
    public async setTheme(
        themeName: string,
        options: ThemeLoadOptions = {}
    ): Promise<void> {
        if (isServer()) {
            return Promise.resolve();
        }

        // Validate theme name format to prevent path injection
        if (!isValidThemeName(themeName)) {
            const error = new Error(`Invalid theme name: "${themeName}". Theme names must be lowercase alphanumeric with hyphens.`);
            this.emitError(error, themeName);
            throw error;
        }

        // Validate theme exists
        if (!this.config.themes[themeName]) {
            const error = new Error(`Theme "${themeName}" not found`);
            this.emitError(error, themeName);
            throw error;
        }

        // Check if already current theme
        if (themeName === this.currentTheme && !options.force) {
            return Promise.resolve();
        }

        const previousTheme = this.currentTheme;

        try {
            // Load theme CSS if not already loaded
            if (!this.isThemeLoaded(themeName) || options.force) {
                await this.preloadTheme(themeName);
            }

            // Remove previous theme CSS if requested
            if (options.removePrevious && previousTheme && previousTheme !== themeName) {
                removeThemeCSS(previousTheme);
                this.loadedThemes.delete(previousTheme);
            }

            // Apply theme attributes
            applyThemeAttributes(themeName, this.config.dataAttribute);

            // Update current theme
            this.currentTheme = themeName;

            // Persist to storage
            if (this.config.enablePersistence && this.storageAdapter.isAvailable()) {
                this.storageAdapter.setItem(this.config.storageKey, themeName);
            }

            // Emit theme change event
            this.emitThemeChange(previousTheme, themeName);

            // Call config callback
            if (this.config.onThemeChange) {
                this.config.onThemeChange(themeName);
            }
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            this.emitError(err, themeName);

            if (this.config.onError) {
                this.config.onError(err, themeName);
            }

            // Fallback to default theme if requested
            if (options.fallbackOnError && themeName !== this.config.defaultTheme) {
                console.warn(`Failed to load theme "${themeName}", falling back to default theme "${this.config.defaultTheme}"`);
                return this.setTheme(this.config.defaultTheme, { ...options, fallbackOnError: false });
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
        this.loadedThemes.clear();
        this.loadingThemes.clear();
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
    private emitThemeChange(previousTheme: string | null, currentTheme: string): void {
        const event: ThemeChangeEvent = {
            previousTheme,
            currentTheme,
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
    }
}

export default ThemeManager;
