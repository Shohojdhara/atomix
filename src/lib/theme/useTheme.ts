/**
 * useTheme Hook
 * 
 * React hook for accessing and managing theme state
 */

import { useContext, useCallback } from 'react';
import { ThemeContext } from './ThemeContext';
import type { UseThemeReturn, UseThemeOptions, ThemeLoadOptions } from './types';

/**
 * useTheme hook
 * 
 * Access theme context and manage theme state in React components.
 * Must be used within a ThemeProvider.
 * 
 * @param options - Hook options
 * @returns Theme state and methods
 * 
 * @example
 * ```tsx
 * function ThemeSwitcher() {
 *   const { theme, setTheme, availableThemes, isLoading } = useTheme();
 * 
 *   return (
 *     <select value={theme} onChange={(e) => setTheme(e.target.value)}>
 *       {availableThemes.map(t => (
 *         <option key={t.class} value={t.class}>{t.name}</option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
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
        async (themeName: string, themeOptions?: ThemeLoadOptions): Promise<void> => {
            await contextSetTheme(themeName, themeOptions);
            if (onChange) {
                onChange(themeName);
            }
        },
        [contextSetTheme, onChange]
    );

    return {
        theme,
        setTheme,
        availableThemes,
        isLoading,
        error,
        isThemeLoaded,
        preloadTheme,
    };
};

export default useTheme;
