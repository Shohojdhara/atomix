/**
 * Theme Provider
 * 
 * React context provider for theme management
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps, ThemeMetadata, Theme, ThemeLoadOptions, ThemeChangeEvent } from '../types';
import type { DesignTokens } from '../tokens/tokens';
import { isJSTheme } from '../utils/themeUtils';
import { getLogger } from '../errors/errors';
import { ThemeRegistry } from '../core/ThemeRegistry';
import { ThemeApplicator } from './ThemeApplicator';
import { createTheme } from '../core/createTheme';
import { injectCSS, removeCSS } from '../utils/injectCSS';
import { loadThemeFromConfigSync } from '../config/configLoader';
import {
    isServer,
    createLocalStorageAdapter,
    loadThemeCSS,
    removeThemeCSS,
    applyThemeAttributes,
    getThemeLinkId,
    buildThemePath,
    isThemeLoaded as checkThemeLoaded,
} from '../utils/domUtils';
import {
    DEFAULT_STORAGE_KEY,
    DEFAULT_DATA_ATTRIBUTE,
    DEFAULT_BASE_PATH,
} from '../constants/constants';

/**
 * ThemeProvider component
 * 
 * Provides theme context to child components and manages theme state.
 * 
 * **Config-First Approach**: If `defaultTheme` is not provided, loads from `atomix.config.ts`.
 * Config file is required when `defaultTheme` is not provided.
 * 
 * @example
 * ```tsx
 * import { ThemeProvider } from '@shohojdhara/atomix/theme';
 * 
 * // Loads from atomix.config.ts (config file required)
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * 
 * // Provide explicit theme (bypasses config)
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="dark">
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    defaultTheme,
    themes = {},
    basePath = '/themes',
    cdnPath = null,
    preload = [],
    lazy = true,
    storageKey = 'atomix-theme',
    dataAttribute = 'data-theme',
    enablePersistence = true,
    useMinified = false,
    onThemeChange,
    onError,
}) => {
    // Store callbacks in refs to avoid recreating when they change
    const onThemeChangeRef = useRef(onThemeChange);
    const onErrorRef = useRef(onError);

    // Update refs when callbacks change
    useEffect(() => {
        onThemeChangeRef.current = onThemeChange;
        onErrorRef.current = onError;
    }, [onThemeChange, onError]);

    // Create stable wrapper functions that read from refs
    const handleThemeChange = useCallback((theme: string | Theme) => {
        onThemeChangeRef.current?.(theme);
    }, []);

    const handleError = useCallback((error: Error, themeName: string) => {
        onErrorRef.current?.(error, themeName);
    }, []);

    // Stabilize themes object reference to prevent unnecessary recreations
    const themesRef = useRef(themes);
    const themesStable = useMemo(() => {
        // Only update if themes object actually changed (shallow comparison)
        const currentKeys = Object.keys(themes);
        const prevKeys = Object.keys(themesRef.current);
        
        if (currentKeys.length !== prevKeys.length) {
            themesRef.current = themes;
            return themes;
        }
        
        const hasChanged = currentKeys.some(key => themes[key] !== themesRef.current[key]);
        if (hasChanged) {
            themesRef.current = themes;
            return themes;
        }
        
        return themesRef.current;
    }, [themes]);

    const logger = useMemo(() => getLogger(), []);

    // Initialize registry
    const registry = useMemo(() => {
        const reg = new ThemeRegistry();
        // Register themes from props
        if (themesStable && Object.keys(themesStable).length > 0) {
            for (const [themeId, metadata] of Object.entries(themesStable)) {
                if (!reg.has(themeId)) {
                    reg.register(themeId, {
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
        return reg;
    }, [themesStable]);

    // Initialize storage adapter
    const storageAdapter = useMemo(() => createLocalStorageAdapter(), []);

    // Initialize theme applicator for JS themes
    const themeApplicator = useMemo(() => {
        if (isServer()) return null;
        return new ThemeApplicator();
    }, []);

    // Get initial default theme (with config loading)
    const initialDefaultTheme = useMemo(() => {
        // Check storage first
        if (enablePersistence && storageAdapter.isAvailable()) {
            const stored = storageAdapter.getItem(storageKey);
            if (stored) {
                return stored;
            }
        }
        
        // If defaultTheme is provided, use it
        if (defaultTheme !== undefined && defaultTheme !== null) {
            return defaultTheme;
        }
        
        // Load from atomix.config.ts (required)
        const configTokens = loadThemeFromConfigSync();
        if (configTokens && Object.keys(configTokens).length > 0) {
            return configTokens;
        }
        
        // Config is required - this will be caught in useEffect
        return null;
    }, [enablePersistence, storageAdapter, storageKey, defaultTheme]);

    // State for React re-renders
    const [currentTheme, setCurrentTheme] = useState<string>(() => {
        if (typeof initialDefaultTheme === 'string') {
            return initialDefaultTheme;
        }
        if (isJSTheme(initialDefaultTheme)) {
            return initialDefaultTheme.name || 'js-theme';
        }
        if (initialDefaultTheme && typeof initialDefaultTheme === 'object' && !isJSTheme(initialDefaultTheme)) {
            // It's DesignTokens from config
            return 'config-theme';
        }
        return ''; // No default theme - use built-in styles
    });

    const [activeTheme, setActiveTheme] = useState<Theme | null>(() => {
        if (isJSTheme(initialDefaultTheme)) {
            return initialDefaultTheme;
        }
        return null;
    });

    const [availableThemes, setAvailableThemes] = useState<ThemeMetadata[]>(() => {
        const metadata = registry.getAllMetadata();
        // Filter out id and type fields that aren't in ThemeMetadata
        return metadata.map(meta => ({
            name: meta.name || '',
            class: meta.class,
            description: meta.description,
            author: meta.author,
            version: meta.version,
            tags: meta.tags,
            supportsDarkMode: meta.supportsDarkMode,
            status: meta.status,
            a11y: meta.a11y,
            color: meta.color,
            features: meta.features,
            dependencies: meta.dependencies,
        }));
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Track loaded themes
    const loadedThemesRef = useRef<Set<string>>(new Set());
    const previousThemeRef = useRef<string | null>(null);

    // Get default theme (with automatic config loading)
    const getDefaultTheme = useCallback((): string | Theme | DesignTokens | Partial<DesignTokens> | null => {
        // Check storage first
        if (enablePersistence && storageAdapter.isAvailable()) {
            const stored = storageAdapter.getItem(storageKey);
            if (stored) {
                return stored;
            }
        }
        
        // If defaultTheme is provided, use it
        if (defaultTheme !== undefined && defaultTheme !== null) {
            return defaultTheme;
        }
        
        // Load from atomix.config.ts (required)
        // Config file must exist - throws error if not found
        const configTokens = loadThemeFromConfigSync();
        if (configTokens && Object.keys(configTokens).length > 0) {
            // Return config tokens as Partial<DesignTokens>
            return configTokens;
        }
        
        throw new Error('ThemeProvider: atomix.config.ts is required when defaultTheme is not provided.');
    }, [enablePersistence, storageAdapter, storageKey, defaultTheme]);

    // Apply JS theme (supports both Theme and DesignTokens)
    const applyJSTheme = useCallback(async (theme: Theme | DesignTokens | Partial<DesignTokens>, removePrevious: boolean = true): Promise<void> => {
        if (isServer() || !themeApplicator) {
            return;
        }

        if (removePrevious) {
            // Remove previous theme
            removeCSS('atomix-theme');
            
            // Also remove any existing CSS variables
            if (activeTheme && activeTheme.cssVars) {
                Object.keys(activeTheme.cssVars).forEach(key => {
                    document.documentElement.style.removeProperty(key);
                });
            }
        }

        // Check if it's DesignTokens
        const isDesignTokens = theme !== null &&
            typeof theme === 'object' &&
            !('palette' in theme) &&
            !('typography' in theme) &&
            !('__isJSTheme' in theme);

        if (isDesignTokens) {
            // Use unified theme system for DesignTokens
            const css = createTheme(theme as Partial<DesignTokens>);
            injectCSS(css, 'atomix-theme');
        } else {
            // Use ThemeApplicator for Theme objects
            themeApplicator?.applyTheme(theme as Theme);
        }
    }, [activeTheme, themeApplicator]);

    // Set theme function (supports string, Theme, or DesignTokens)
    const setTheme = useCallback(async (theme: string | Theme | DesignTokens | Partial<DesignTokens>, options?: ThemeLoadOptions): Promise<void> => {
        const { removePrevious = true, fallbackOnError = true, customPath } = options || {};

        setIsLoading(true);
        setError(null);

        try {
            // Handle Theme or DesignTokens object directly
            if (typeof theme !== 'string') {
                // Check if it's DesignTokens
                const isDesignTokens = theme !== null &&
                    typeof theme === 'object' &&
                    !('palette' in theme) &&
                    !('typography' in theme) &&
                    !('__isJSTheme' in theme);

                if (isDesignTokens) {
                    // Handle DesignTokens using unified theme system
                    await applyJSTheme(theme as DesignTokens, removePrevious);
                    const themeName = 'design-tokens-theme';
                    previousThemeRef.current = currentTheme;
                    setCurrentTheme(themeName);
                    setActiveTheme(null); // DesignTokens don't have Theme object

                    // Emit change event
                    const event: ThemeChangeEvent = {
                        previousTheme: previousThemeRef.current,
                        currentTheme: themeName,
                        themeObject: null,
                        timestamp: Date.now(),
                        source: 'user',
                    };
                    handleThemeChange(themeName);

                    // Persist to storage
                    if (enablePersistence && storageAdapter.isAvailable()) {
                        storageAdapter.setItem(storageKey, themeName);
                    }

                    setIsLoading(false);
                    return;
                } else if (isJSTheme(theme)) {
                    // Handle Theme object
                    await applyJSTheme(theme, removePrevious);
                    const themeName = theme.name || 'js-theme';
                    previousThemeRef.current = currentTheme;
                    setCurrentTheme(themeName);
                    setActiveTheme(theme);

                    // Emit change event
                    const event: ThemeChangeEvent = {
                        previousTheme: previousThemeRef.current,
                        currentTheme: themeName,
                        themeObject: theme,
                        timestamp: Date.now(),
                        source: 'user',
                    };
                    handleThemeChange(theme);

                    // Persist to storage
                    if (enablePersistence && storageAdapter.isAvailable()) {
                        storageAdapter.setItem(storageKey, themeName);
                    }

                    setIsLoading(false);
                    return;
                } else {
                    const error = new Error('Invalid theme object provided');
                    handleError(error, 'js-theme');
                    setError(error);
                    setIsLoading(false);
                    throw error;
                }
            }

            // Check if theme exists
            if (!registry.has(theme)) {
                const error = new Error(`Theme "${theme}" not found in registry`);
                handleError(error, theme);
                setError(error);
                if (fallbackOnError && currentTheme) {
                    setIsLoading(false);
                    return;
                }
                setIsLoading(false);
                throw error;
            }

            // Load theme CSS if needed
            const themePath = customPath || buildThemePath(
                theme,
                basePath,
                useMinified,
                cdnPath || undefined
            );

            const linkId = getThemeLinkId(theme);
            
            // Remove previous theme if requested
            if (removePrevious && previousThemeRef.current && previousThemeRef.current !== theme) {
                removeThemeCSS(previousThemeRef.current);
            }

            // Load CSS if not already loaded
            if (!checkThemeLoaded(theme)) {
                await loadThemeCSS(themePath, linkId);
                loadedThemesRef.current.add(theme);
            }

            // Apply theme attributes
            applyThemeAttributes(dataAttribute, theme);

            // Update state
            previousThemeRef.current = currentTheme;
            setCurrentTheme(theme);
            setActiveTheme(null); // CSS themes don't have active theme object

            // Emit change event
            const event: ThemeChangeEvent = {
                previousTheme: previousThemeRef.current,
                currentTheme: theme,
                timestamp: Date.now(),
                source: 'user',
            };
            handleThemeChange(theme);

            // Persist to storage
            if (enablePersistence && storageAdapter.isAvailable()) {
                storageAdapter.setItem(storageKey, theme);
            }

            setIsLoading(false);
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            handleError(error, typeof theme === 'string' ? theme : 'js-theme');
            setError(error);
            setIsLoading(false);
            throw err;
        }
    }, [
        registry,
        basePath,
        cdnPath,
        useMinified,
        dataAttribute,
        enablePersistence,
        storageAdapter,
        storageKey,
        currentTheme,
        activeTheme,
        applyJSTheme,
        handleThemeChange,
        handleError,
    ]);

    // Preload theme
    const preloadTheme = useCallback(async (themeName: string): Promise<void> => {
        if (isServer() || checkThemeLoaded(themeName)) {
            return;
        }

        setIsLoading(true);
        try {
            if (!registry.has(themeName)) {
                throw new Error(`Theme "${themeName}" not found in registry`);
            }

            const themePath = buildThemePath(
                themeName,
                basePath,
                useMinified,
                cdnPath || undefined
            );
            const linkId = getThemeLinkId(themeName);

            await loadThemeCSS(themePath, linkId);
            loadedThemesRef.current.add(themeName);
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            handleError(error, themeName);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [registry, basePath, cdnPath, useMinified, handleError]);

    // Check if theme is loaded
    const isThemeLoaded = useCallback((themeName: string): boolean => {
        return checkThemeLoaded(themeName);
    }, []);

    // Initialize default theme on mount
    useEffect(() => {
        if (isServer()) return;

        const initDefaultTheme = async () => {
            // Use the initial default theme we computed
            const defaultThemeValue = initialDefaultTheme;
            
            if (defaultThemeValue) {
                try {
                    // Check if it's DesignTokens from config
                    const isDesignTokens = defaultThemeValue !== null &&
                        typeof defaultThemeValue === 'object' &&
                        !('palette' in defaultThemeValue) &&
                        !('typography' in defaultThemeValue) &&
                        !('__isJSTheme' in defaultThemeValue) &&
                        typeof defaultThemeValue !== 'string';

                    if (isDesignTokens) {
                        // Apply config tokens directly
                        await applyJSTheme(defaultThemeValue as DesignTokens, false);
                        
                        // Update state and emit events
                        setCurrentTheme('config-theme');
                        setActiveTheme(null);
                        
                        // Emit change event
                        const event: ThemeChangeEvent = {
                            previousTheme: null,
                            currentTheme: 'config-theme',
                            themeObject: null,
                            timestamp: Date.now(),
                            source: 'system',
                        };
                        handleThemeChange('config-theme');
                        
                        // Persist to storage
                        if (enablePersistence && storageAdapter.isAvailable()) {
                            storageAdapter.setItem(storageKey, 'config-theme');
                        }
                    } else {
                        // Handle string or Theme object
                        await setTheme(defaultThemeValue, { removePrevious: false, fallbackOnError: true });
                    }
                } catch (err) {
                    const error = err instanceof Error ? err : new Error(String(err));
                    logger.error(`Failed to load theme from config`, error, {
                        theme: defaultThemeValue,
                    });
                    handleError(error, 'config-theme');
                    setError(error);
                    throw error;
                }
            }
        };

        initDefaultTheme();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount - initialDefaultTheme is stable

    // Preload themes
    useEffect(() => {
        if (isServer() || !preload || preload.length === 0) return;

        const preloadThemes = async () => {
            for (const themeName of preload) {
                if (!checkThemeLoaded(themeName)) {
                    try {
                        await preloadTheme(themeName);
                    } catch (err) {
                        // Silently fail for preload
                        logger.warn(`Failed to preload theme "${themeName}"`, {
                            error: err instanceof Error ? err.message : String(err),
                        });
                    }
                }
            }
        };

        preloadThemes();
    }, [preload, preloadTheme, logger]);

    // Context value
    const contextValue = useMemo(() => ({
        theme: currentTheme,
        activeTheme,
        setTheme,
        availableThemes,
        isLoading,
        error,
        isThemeLoaded,
        preloadTheme,
    }), [
        currentTheme,
        activeTheme,
        setTheme,
        availableThemes,
        isLoading,
        error,
        isThemeLoaded,
        preloadTheme,
    ]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
