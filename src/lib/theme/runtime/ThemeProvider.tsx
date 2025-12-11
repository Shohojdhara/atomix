/**
 * Theme Provider
 * 
 * React context provider for theme management
 * Updated to use the new ThemeEngine architecture
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ThemeManager } from './ThemeManager';
import { ThemeContext } from '../ThemeContext';
import type { ThemeProviderProps, ThemeMetadata, Theme, ThemeLoadOptions } from '../types';
import { isJSTheme } from '../themeUtils';
import { getLogger } from '../errors';

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
 *     <ThemeProvider>
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

    const logger = useMemo(() => getLogger(), []);

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
            logger.error(
                'Failed to create ThemeManager',
                error instanceof Error ? error : new Error(String(error)),
                { themes: Object.keys(themesStable), defaultTheme }
            );
            // Return a minimal manager that won't crash
            return new ThemeManager({
                themes: {},
                defaultTheme,
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
        logger,
    ]);

    // State for React re-renders
    const [currentTheme, setCurrentTheme] = useState<string>(() => {
        if (typeof defaultTheme === 'string') {
            return defaultTheme;
        }
        if (isJSTheme(defaultTheme)) {
            return defaultTheme.name || 'js-theme';
        }
        return ''; // No default theme - use built-in styles
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

    // Track if we've initialized to prevent loops
    const initializedRef = useRef(false);

    // Update state when theme changes
    useEffect(() => {
        let isMounted = true;

        // Create stable handlers that use the current themeManager
        themeChangeHandlerRef.current = () => {
            if (!isMounted) return;
            setCurrentTheme(prev => {
                const current = themeManager.getTheme();
                // Prevent unnecessary updates
                if (current === prev) return prev;
                return current;
            });
            setActiveTheme(prev => {
                const current = themeManager.getActiveTheme();
                // Prevent unnecessary updates by comparing references
                if (current === prev) return prev;
                if (!current && !prev) return prev;
                return current;
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
            if (!isMounted) return;
            setCurrentTheme(prev => {
                const current = themeManager.getTheme();
                if (current === prev) return prev;
                return current;
            });
            setActiveTheme(prev => {
                const current = themeManager.getActiveTheme();
                if (current === prev) return prev;
                if (!current && !prev) return prev;
                return current;
            });
        };

        themeErrorHandlerRef.current = (err: Error) => {
            if (!isMounted) return;
            setError(err);
            setIsLoading(false);
        };

        // Wrapper functions that call the refs
        const onThemeChangeEvent = () => themeChangeHandlerRef.current?.();
        const onThemeLoadEvent = () => themeLoadHandlerRef.current?.();
        const onThemeErrorEvent = (err: Error) => themeErrorHandlerRef.current?.(err);

        // Set initial state only once on first mount
        // Use functional updates to avoid stale closures
        if (!initializedRef.current) {
            initializedRef.current = true;
            // Use functional updates to get current state and compare
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
                if (current.length !== prev.length) return current;
                const hasChanged = current.some((t, i) => t.name !== prev[i]?.name || t.class !== prev[i]?.class);
                return hasChanged ? current : prev;
            });
        }

        // Register event listeners
        themeManager.on('themeChange', onThemeChangeEvent);
        themeManager.on('themeLoad', onThemeLoadEvent);
        themeManager.on('themeError', onThemeErrorEvent);

        return () => {
            isMounted = false;
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
        setTheme: async (theme: string | Theme, options?: ThemeLoadOptions) => {
            setIsLoading(true);
            setError(null);
            try {
                await themeManager.setTheme(theme, options);
            } catch (err) {
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error);
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
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error);
            } finally {
                setIsLoading(false);
            }
        },
        themeManager: themeManager,
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
