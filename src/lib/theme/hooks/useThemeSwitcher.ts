/**
 * useThemeSwitcher Hook
 * 
 * React hook for managing theme switching with persistence and system preference detection.
 * Provides an easy-to-use API for dark/light mode toggling.
 * 
 * @example
 * ```tsx
 * import { useThemeSwitcher } from '@shohojdhara/atomix/theme';
 * 
 * function ThemeToggle() {
 *   const { mode, toggle, setMode, isDark } = useThemeSwitcher();
 *   
 *   return (
 *     <button onClick={toggle}>
 *       {isDark ? '☀️ Light' : '🌙 Dark'}
 *     </button>
 *   );
 * }
 * ```
 */

import { useState, useEffect, useCallback } from 'react';
import {
  switchTheme,
  toggleTheme,
  getCurrentTheme,
  getSystemTheme,
  initializeTheme,
  listenToSystemTheme,
  type ThemeMode,
  type ThemeSwitcherOptions,
} from '../utils/themeUtils';

export interface UseThemeSwitcherOptions extends ThemeSwitcherOptions {
  /** Initial theme mode (default: 'system') */
  initialMode?: ThemeMode;
  /** Automatically sync with system preference (default: false) */
  syncWithSystem?: boolean;
}

export interface UseThemeSwitcherReturn {
  /** Current theme mode */
  mode: ThemeMode;
  /** Whether current theme is dark */
  isDark: boolean;
  /** Whether current theme is light */
  isLight: boolean;
  /** Toggle between light and dark */
  toggle: () => ThemeMode;
  /** Set specific theme mode */
  setMode: (mode: ThemeMode) => void;
  /** Reset to system preference */
  resetToSystem: () => void;
  /** Clear saved preference */
  clearPreference: () => void;
}

/**
 * Hook for managing theme switching
 * 
 * @param options - Configuration options
 * @returns Theme switcher controls
 */
export function useThemeSwitcher(options: UseThemeSwitcherOptions = {}): UseThemeSwitcherReturn {
  const {
    initialMode = 'system',
    syncWithSystem = false,
    storageKey = 'atomix-theme',
    enableTransition = true,
    transitionDuration = 300,
  } = options;

  // State for current mode
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return initialMode;
    
    // Check for saved preference first
    const saved = getCurrentTheme(storageKey);
    if (saved && saved !== 'system') return saved;
    
    // Fall back to initial mode or system
    return initialMode === 'system' ? getSystemTheme() : initialMode;
  });

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialize with proper theme application
    initializeTheme({
      storageKey,
      enableTransition,
      transitionDuration,
    });
    
    // Update state to match initialized theme
    setModeState(getCurrentTheme(storageKey));
  }, [storageKey, enableTransition, transitionDuration]);

  // Listen for system theme changes if enabled
  useEffect(() => {
    if (!syncWithSystem) return;
    
    const cleanup = listenToSystemTheme((newMode) => {
      setModeState(newMode);
      switchTheme(newMode, {
        storageKey,
        enableTransition,
        transitionDuration,
      });
    });
    
    return cleanup;
  }, [syncWithSystem, storageKey, enableTransition, transitionDuration]);

  // Toggle theme
  const toggle = useCallback((): ThemeMode => {
    const newMode = toggleTheme({
      storageKey,
      enableTransition,
      transitionDuration,
    });
    setModeState(newMode);
    return newMode;
  }, [storageKey, enableTransition, transitionDuration]);

  // Set specific mode
  const setMode = useCallback((newMode: ThemeMode) => {
    switchTheme(newMode, {
      storageKey,
      enableTransition,
      transitionDuration,
    });
    setModeState(newMode);
  }, [storageKey, enableTransition, transitionDuration]);

  // Reset to system preference
  const resetToSystem = useCallback(() => {
    const systemMode = getSystemTheme();
    switchTheme(systemMode, {
      storageKey,
      enableTransition,
      transitionDuration,
    });
    setModeState(systemMode);
  }, [storageKey, enableTransition, transitionDuration]);

  // Clear saved preference
  const clearPreference = useCallback(() => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    mode,
    isDark: mode === 'dark',
    isLight: mode === 'light',
    toggle,
    setMode,
    resetToSystem,
    clearPreference,
  };
}
