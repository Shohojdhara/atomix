/**
 * Theme Provider
 * 
 * React context provider for theme management
 * Updated to use the new ThemeEngine architecture
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ThemeManager } from './ThemeManager';
import { ThemeContext } from '../ThemeContext';
import type { ThemeProviderProps, ThemeMetadata, Theme } from '../types';
import { isJSTheme } from '../themeUtils';

/**
 * ThemeProvider component
 * 
 * Provides theme context to child components and manages theme state.
 * Uses the new ThemeEngine-based ThemeManager.
 * 
 * @example
 * ```tsx
 * import { ThemeProvider } from '@shohojdhara/atomix/theme';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="shaj-default">
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
            console.error('Failed to create ThemeManager:', error);
            // Return a minimal manager that won't crash
            return new ThemeManager({
                themes: {},
                defaultTheme: typeof defaultTheme === 'string' ? defaultTheme : 'shaj-default',
                basePath,
                storageKey,
                enablePersistence: false,
            });
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

    // State for React re-renders
    const [currentTheme, setCurrentTheme] = useState<string>(() => {
        if (typeof defaultTheme === 'string') {
            return defaultTheme;
        }
        if (isJSTheme(defaultTheme)) {
            return defaultTheme.name || 'js-theme';
        }
        return 'shaj-default';
    });

    const [activeTheme, setActiveTheme] = useState<Theme | null>(() => {
        if (isJSTheme(defaultTheme)) {
            return defaultTheme;
        }
        return null;
    });

    const [availableThemes, setAvailableThemes] = useState<ThemeMetadata[]>(() => {
        return themeManager.getAvailableThemes();
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Use refs to store stable event handlers
    const themeChangeHandlerRef = useRef<() => void>();
    const themeLoadHandlerRef = useRef<() => void>();
    const themeErrorHandlerRef = useRef<(err: Error) => void>();

    // Update state when theme changes
    useEffect(() => {
        // Create stable handlers that use the current themeManager
        themeChangeHandlerRef.current = () => {
            setCurrentTheme(prev => {
                const current = themeManager.getTheme();
                return current !== prev ? current : prev;
            });
            setActiveTheme(prev => {
                const current = themeManager.getActiveTheme();
                return current !== prev ? current : prev;
            });
            setAvailableThemes(prev => {
                const current = themeManager.getAvailableThemes();
                // Only update if actually different
                if (current.length !== prev.length) return current;
                // Compare by name since ThemeMetadata doesn't have id
                const hasChanged = current.some((t, i) => t.name !== prev[i]?.name || t.class !== prev[i]?.class);
                return hasChanged ? current : prev;
            });
        };

        themeLoadHandlerRef.current = () => {
            setCurrentTheme(prev => {
                const current = themeManager.getTheme();
                return current !== prev ? current : prev;
            });
            setActiveTheme(prev => {
                const current = themeManager.getActiveTheme();
                return current !== prev ? current : prev;
            });
        };

        themeErrorHandlerRef.current = (err: Error) => {
            setError(err);
            setIsLoading(false);
        };

        // Wrapper functions that call the refs
        const onThemeChangeEvent = () => themeChangeHandlerRef.current?.();
        const onThemeLoadEvent = () => themeLoadHandlerRef.current?.();
        const onThemeErrorEvent = (err: Error) => themeErrorHandlerRef.current?.(err);

        // Set initial state only once (synchronously, don't trigger events)
        const initialTheme = themeManager.getTheme();
        const initialActiveTheme = themeManager.getActiveTheme();
        const initialAvailableThemes = themeManager.getAvailableThemes();
        
        // Only set if different from current state to avoid unnecessary updates
        setCurrentTheme(prev => prev !== initialTheme ? initialTheme : prev);
        setActiveTheme(prev => prev !== initialActiveTheme ? initialActiveTheme : prev);
        setAvailableThemes(prev => {
            if (prev.length !== initialAvailableThemes.length) return initialAvailableThemes;
            const hasChanged = initialAvailableThemes.some((t, i) => t.name !== prev[i]?.name || t.class !== prev[i]?.class);
            return hasChanged ? initialAvailableThemes : prev;
        });

        // Register event listeners
        themeManager.on('themeChange', onThemeChangeEvent);
        themeManager.on('themeLoad', onThemeLoadEvent);
        themeManager.on('themeError', onThemeErrorEvent);

        return () => {
            themeManager.off('themeChange', onThemeChangeEvent);
            themeManager.off('themeLoad', onThemeLoadEvent);
            themeManager.off('themeError', onThemeErrorEvent);
        };
    }, [themeManager]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            themeManager.destroy();
        };
    }, [themeManager]);

    // Context value
    const contextValue = useMemo(() => ({
        theme: currentTheme,
        activeTheme,
        setTheme: async (theme: string | Theme, options?: any) => {
            setIsLoading(true);
            setError(null);
            try {
                await themeManager.setTheme(theme, options);
            } catch (err) {
                setError(err instanceof Error ? err : new Error(String(err)));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        availableThemes,
        isLoading,
        error,
        isThemeLoaded: (themeName: string) => themeManager.isThemeLoaded(themeName),
        preloadTheme: async (themeName: string) => {
            setIsLoading(true);
            try {
                await themeManager.preloadTheme(themeName);
            } catch (err) {
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setIsLoading(false);
            }
        },
        themeManager: themeManager as any as import('../types').ThemeContextValue['themeManager'], // Type compatibility
    }), [
        currentTheme,
        activeTheme,
        availableThemes,
        isLoading,
        error,
        themeManager,
    ]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
