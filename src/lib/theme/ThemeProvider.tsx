/**
 * Theme Provider
 * 
 * React context provider for theme management
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ThemeManager } from './ThemeManager';
import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps, ThemeMetadata, Theme } from './types';
import { isJSTheme } from './themeUtils';

/**
 * ThemeProvider component
 * 
 * Provides theme context to child components and manages theme state.
 * 
 * @example
 * ```tsx
 * import { ThemeProvider } from '@shohojdhara/atomix/theme';
 * import { themesConfig } from '@shohojdhara/atomix/themes/themes.config';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider
 *       themes={themesConfig.metadata}
 *       defaultTheme="shaj-default"
 *     >
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    defaultTheme = 'shaj-default',
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
    // Store callbacks in refs to avoid recreating ThemeManager when they change
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

    // Initialize theme manager (only recreate when config changes, not callbacks)
    const themeManager = useMemo(() => {
        try {
            return new ThemeManager({
                themes: themesStable,
                defaultTheme,
                basePath,
                cdnPath,
                preload,
                lazy,
                storageKey,
                dataAttribute,
                enablePersistence,
                useMinified,
                onThemeChange: handleThemeChange,
                onError: handleError,
            });
        } catch (error) {
            console.error('Failed to initialize ThemeManager:', error);
            // Return a minimal fallback manager
            const fallbackThemes: Record<string, ThemeMetadata> = {};
            let fallbackDefault: string | Theme | undefined = defaultTheme;

            if (typeof defaultTheme === 'string') {
                // If defaultTheme is a string, add it to fallback themes
                fallbackThemes[defaultTheme] = { name: defaultTheme };
            } else if (defaultTheme && typeof defaultTheme === 'object') {
                // If defaultTheme is a Theme object, add it to fallback themes map
                // so it can be looked up by name later (e.g., getThemeMetadata, validateTheme)
                const themeName = defaultTheme.name || 'custom-theme';
                // Extract ThemeMetadata properties from Theme object (Theme extends ThemeMetadata)
                // Use themeName (with fallback) instead of defaultTheme.name directly to ensure name is always a string
                fallbackThemes[themeName] = {
                    name: themeName,
                    class: defaultTheme.class,
                    description: defaultTheme.description,
                    author: defaultTheme.author,
                    version: defaultTheme.version,
                    tags: defaultTheme.tags,
                    supportsDarkMode: defaultTheme.supportsDarkMode,
                    status: defaultTheme.status,
                    a11y: defaultTheme.a11y,
                    color: defaultTheme.color,
                    features: defaultTheme.features,
                    dependencies: defaultTheme.dependencies,
                };
                // Keep the Theme object as defaultTheme for ThemeManager
                fallbackDefault = defaultTheme;
            } else {
                // If defaultTheme is undefined, create a minimal fallback theme
                // to prevent ThemeManager from throwing an error
                const fallbackThemeName = 'fallback-theme';
                fallbackThemes[fallbackThemeName] = { name: fallbackThemeName };
                fallbackDefault = fallbackThemeName;
            }

            try {
                return new ThemeManager({
                    themes: fallbackThemes,
                    defaultTheme: fallbackDefault,
                    basePath,
                    cdnPath,
                    preload,
                    lazy,
                    storageKey,
                    dataAttribute,
                    enablePersistence,
                    useMinified,
                    onThemeChange: handleThemeChange,
                    onError: handleError,
                });
            } catch (fallbackError) {
                // If even the fallback fails, log and throw
                console.error('Failed to create fallback ThemeManager:', fallbackError);
                throw new Error(
                    'ThemeManager initialization failed. Please provide a valid themes configuration or defaultTheme.'
                );
            }
        }
    }, [
        themesStable,
        defaultTheme,
        basePath,
        cdnPath,
        preload,
        lazy,
        storageKey,
        dataAttribute,
        enablePersistence,
        useMinified,
        handleThemeChange,
        handleError,
    ]);

    // State
    const [currentTheme, setCurrentTheme] = useState<string>(themeManager.getTheme());
    const [activeTheme, setActiveTheme] = useState<Theme | null>(themeManager.getActiveTheme());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    // Get available themes
    const availableThemes = useMemo<ThemeMetadata[]>(
        () => themeManager.getAvailableThemes(),
        [themeManager]
    );

    // Set theme function
    const setTheme = useCallback(
        async (themeOrName: string | Theme, options?: { fallbackOnError?: boolean }): Promise<void> => {
            setIsLoading(true);
            setError(null);

            try {
                await themeManager.setTheme(themeOrName, options);
                setCurrentTheme(themeManager.getTheme());
                setActiveTheme(themeManager.getActiveTheme());
            } catch (err) {
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error);

                // If fallback is enabled and it's safe to fallback
                if (options?.fallbackOnError && defaultTheme) {
                    // Avoid infinite loops if fallback is same as current attempt
                    const targetName = isJSTheme(themeOrName) ? themeOrName.name : themeOrName;
                    const defName = isJSTheme(defaultTheme) ? defaultTheme.name : defaultTheme;

                    if (targetName !== defName) {
                        try {
                            await themeManager.setTheme(defaultTheme, { fallbackOnError: false });
                            setCurrentTheme(themeManager.getTheme());
                            setActiveTheme(themeManager.getActiveTheme());
                            setError(null);
                            return;
                        } catch (fallbackErr) {
                            // If fallback also fails, throw original error
                            throw error;
                        }
                    }
                }

                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        [themeManager, defaultTheme]
    );

    // Check if theme is loaded
    const isThemeLoaded = useCallback(
        (themeName: string): boolean => {
            return themeManager.isThemeLoaded(themeName);
        },
        [themeManager]
    );

    // Preload theme
    const preloadTheme = useCallback(
        async (themeName: string): Promise<void> => {
            try {
                await themeManager.preloadTheme(themeName);
            } catch (err) {
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error);
                throw error;
            }
        },
        [themeManager]
    );

    // Listen for theme changes
    useEffect(() => {
        const handleThemeChange = () => {
            setCurrentTheme(themeManager.getTheme());
            setActiveTheme(themeManager.getActiveTheme());
        };

        themeManager.on('themeChange', handleThemeChange);

        return () => {
            themeManager.off('themeChange', handleThemeChange);
        };
    }, [themeManager]);

    // Track the last themeManager instance we initialized
    const initializedManagerRef = useRef<ThemeManager | null>(null);

    // Load initial theme (once per themeManager instance)
    useEffect(() => {
        // Skip if we've already initialized this exact themeManager instance
        if (initializedManagerRef.current === themeManager) {
            return;
        }

        // Mark this themeManager as initialized synchronously before async work
        // This prevents race conditions where the effect runs again before async completes
        initializedManagerRef.current = themeManager;

        let isMounted = true;

        const loadInitialTheme = async () => {
            setIsLoading(true);
            try {
                // If currentTheme is set (from config/storage), use it.
                // If activeTheme is set (from config default), use it.
                const current = themeManager.getTheme();
                const active = themeManager.getActiveTheme();

                // Only load if theme is not already loaded
                const isAlreadyLoaded = themeManager.isThemeLoaded(current) || (active && themeManager.isThemeLoaded(active.name || ''));
                
                if (!isAlreadyLoaded) {
                    // If we have an active object, or a name, ensure it's "set" (loaded).
                    if (active) {
                        await themeManager.setTheme(active, { removePrevious: false });
                    } else if (current) {
                        await themeManager.setTheme(current, { removePrevious: false });
                    }
                }

                // Update state even if theme was already loaded
                if (isMounted) {
                    setCurrentTheme(themeManager.getTheme());
                    setActiveTheme(themeManager.getActiveTheme());
                }
            } catch (err) {
                const error = err instanceof Error ? err : new Error(String(err));
                if (isMounted) {
                    setError(error);
                    console.error('Failed to load initial theme:', error);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadInitialTheme();

        return () => {
            isMounted = false;
        };
    }, [themeManager]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            themeManager.destroy();
        };
    }, [themeManager]);

    // Context value
    const contextValue = useMemo(
        () => ({
            theme: currentTheme,
            activeTheme,
            setTheme,
            availableThemes,
            isLoading,
            error,
            isThemeLoaded,
            preloadTheme,
            themeManager,
        }),
        [
            currentTheme,
            activeTheme,
            setTheme,
            availableThemes,
            isLoading,
            error,
            isThemeLoaded,
            preloadTheme,
            themeManager,
        ]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
