/**
 * useTheme Hook
 *
 * React hook for accessing theme context
 */

import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { UseThemeReturn } from '../types';

/**
 * useTheme hook
 *
 * Access theme context and theme management functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme, availableThemes } = useTheme();
 *
 *   return (
 *     <div>
 *       <p>Current theme: {theme}</p>
 *       <button onClick={() => setTheme('dark-theme')}>
 *         Switch to Dark
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {
    theme: context.theme,
    activeTokens: context.activeTokens,
    setTheme: context.setTheme,
    availableThemes: context.availableThemes,
    isLoading: context.isLoading,
    error: context.error,
    isThemeLoaded: context.isThemeLoaded,
    preloadTheme: context.preloadTheme,
  };
}

export default useTheme;
