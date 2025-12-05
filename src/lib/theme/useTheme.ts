/**
 * useTheme Hook
 * 
 * React hook for accessing and managing theme state
 */

import { useContext, useCallback } from 'react';
import { ThemeContext } from './ThemeContext';
import type { UseThemeReturn, UseThemeOptions, ThemeLoadOptions, Theme } from './types';

/**
 * useTheme hook
 * 
 * Access theme context and manage theme state in React components.
 * Must be used within a ThemeProvider.
 */
export const useTheme = (options: UseThemeOptions = {}): UseThemeReturn => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'useTheme must be used within a ThemeProvider. ' +
            'Wrap your component tree with <ThemeProvider> to use this hook.'
        );
    }

    const {
        theme,
        activeTheme,
        setTheme: contextSetTheme,
        availableThemes,
        isLoading,
        error,
        isThemeLoaded,
        preloadTheme,
    } = context;

    // Extract onChange callback to avoid dependency on entire options object
    const onChange = options?.onChange;

    // Wrap setTheme to call onChange callback if provided
    const setTheme = useCallback(
        async (themeOrName: string | Theme, themeOptions?: ThemeLoadOptions): Promise<void> => {
            await contextSetTheme(themeOrName, themeOptions);
            if (onChange) {
                onChange(themeOrName);
            }
        },
        [contextSetTheme, onChange]
    );

    return {
        theme,
        activeTheme,
        setTheme,
        availableThemes,
        isLoading,
        error,
        isThemeLoaded,
        preloadTheme,
    };
};

export default useTheme;
