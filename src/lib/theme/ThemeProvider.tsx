/**
 * Theme Provider
 * 
 * React context provider for theme management
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeManager } from './ThemeManager';
import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps, ThemeMetadata } from './types';

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
    // Initialize theme manager
    const themeManager = useMemo(() => {
        try {
            return new ThemeManager({
                themes,
                defaultTheme,
                basePath,
                cdnPath,
                preload,
                lazy,
                storageKey,
                dataAttribute,
                enablePersistence,
                useMinified,
                onThemeChange,
                onError,
            });
        } catch (error) {
            console.error('Failed to initialize ThemeManager:', error);
            // Return a minimal fallback manager
            return new ThemeManager({
                themes: { [defaultTheme]: { name: defaultTheme } },
                defaultTheme,
            });
        }
    }, [
        themes,
        defaultTheme,
        basePath,
        cdnPath,
        preload,
        lazy,
        storageKey,
        dataAttribute,
        enablePersistence,
        useMinified,
        onThemeChange,
        onError,
    ]);

    // State
    const [currentTheme, setCurrentTheme] = useState<string>(themeManager.getTheme());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    // Get available themes
    const availableThemes = useMemo<ThemeMetadata[]>(
        () => themeManager.getAvailableThemes(),
        [themeManager]
    );

    // Set theme function
    const setTheme = useCallback(
        async (themeName: string, options?: { fallbackOnError?: boolean }): Promise<void> => {
            setIsLoading(true);
            setError(null);

            try {
                await themeManager.setTheme(themeName, options);
                setCurrentTheme(themeName);
            } catch (err) {
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error);
                
                // If fallback is enabled and theme is not default, try to fallback
                if (options?.fallbackOnError && themeName !== defaultTheme) {
                    try {
                        await themeManager.setTheme(defaultTheme, { fallbackOnError: false });
                        setCurrentTheme(defaultTheme);
                        setError(null);
                        return;
                    } catch (fallbackErr) {
                        // If fallback also fails, throw original error
                        throw error;
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
        };

        themeManager.on('themeChange', handleThemeChange);

        return () => {
            themeManager.off('themeChange', handleThemeChange);
        };
    }, [themeManager]);

    // Load initial theme
    useEffect(() => {
        const loadInitialTheme = async () => {
            setIsLoading(true);
            try {
                await themeManager.setTheme(themeManager.getTheme());
            } catch (err) {
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error);
                console.error('Failed to load initial theme:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialTheme();
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
