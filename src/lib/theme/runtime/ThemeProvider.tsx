/**
 * Theme Provider
 * 
 * React context provider for theme management with separated concerns
 * Updated to use the new simplified theme system
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps, ThemeLoadOptions } from '../types';
import type { DesignTokens } from '../tokens/tokens';
import { createTokens } from '../tokens/tokens';
import { getLogger } from '../errors';
import { createTheme } from '../core';
import { injectCSS, removeCSS } from '../utils/injectCSS';
import {
  isServer,
  createLocalStorageAdapter,
  applyThemeAttributes,
  buildThemePath,
} from '../utils/domUtils';
import {
  DEFAULT_STORAGE_KEY,
  DEFAULT_DATA_ATTRIBUTE,
  DEFAULT_BASE_PATH,
} from '../constants/constants';

/**
 * Theme Provider
 *
 * React context provider for theme management with separated concerns.
 * Simplified version focusing on core functionality:
 * - String-based themes (CSS files)
 * - DesignTokens (dynamic themes)
 * - Persistence via localStorage
 *
 * Falls back to 'default' theme if no configuration is found.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme,
  themes = {},
  basePath = DEFAULT_BASE_PATH,
  cdnPath = null,
  useMinified = false,
  storageKey = DEFAULT_STORAGE_KEY,
  dataAttribute = DEFAULT_DATA_ATTRIBUTE,
  enablePersistence = true,
  onThemeChange,
  onError,
}) => {
  // Store callbacks in refs to avoid recreating when they change
  const onThemeChangeRef = useRef(onThemeChange);
  const onErrorRef = useRef(onError);

  // Update ref when callback changes
  useEffect(() => {
    onThemeChangeRef.current = onThemeChange;
    onErrorRef.current = onError;
  }, [onThemeChange, onError]);

  // Create stable wrapper functions that read from ref
  const handleThemeChange = useCallback((theme: string | DesignTokens) => {
    onThemeChangeRef.current?.(theme);
  }, []);

  const handleError = useCallback((error: Error, themeName: string) => {
    onErrorRef.current?.(error, themeName);
  }, []);

  // Initialize storage adapter
  const storageAdapter = useMemo(() => createLocalStorageAdapter(), []);

  // Get initial default theme
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

    // Try to load from atomix.config.ts as fallback, but only in Node.js/SSR environments
    if (typeof window === 'undefined') {
      try {
        // Dynamically import the config loader to avoid bundling issues in browser
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { loadThemeFromConfigSync } = require('../config/configLoader');

        const configTokens = loadThemeFromConfigSync();
        if (configTokens && Object.keys(configTokens).length > 0) {
          // For simplicity, we'll treat config tokens as a special theme name
          return 'config-theme';
        }
      } catch (error) {
        // Failed to load theme from config, using default
      }
    }

    // Default fallback
    return 'default';
  }, [defaultTheme, enablePersistence, storageKey]);

  // Initialize state - handle both string and DesignTokens for defaultTheme
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    if (typeof initialDefaultTheme === 'string') {
      return initialDefaultTheme;
    }
    // If it's DesignTokens, we'll handle it in useEffect
    return 'tokens-theme';
  });

  const [activeTokens, setActiveTokens] = useState<DesignTokens | null>(() => {
    // If defaultTheme is DesignTokens, store them
    if (defaultTheme && typeof defaultTheme !== 'string') {
      return createTokens(defaultTheme);
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Track loaded themes
  const loadedThemesRef = useRef<Set<string>>(new Set());
  const themePromisesRef = useRef<Record<string, Promise<void>>>({});
  // AbortController for cancelling in-flight theme loads
  const abortControllerRef = useRef<AbortController | null>(null);

  // Handle initial DesignTokens defaultTheme
  useEffect(() => {
    if (defaultTheme && typeof defaultTheme !== 'string' && activeTokens && !isServer()) {
      // If defaultTheme is DesignTokens, inject CSS on mount
      const css = createTheme(defaultTheme);
      injectCSS(css, 'theme-tokens-theme');
    }
  }, [defaultTheme, activeTokens]); // Run when defaultTheme or activeTokens change

  // Apply initial theme attributes to document element
  useEffect(() => {
    if (!isServer()) {
      applyThemeAttributes(String(currentTheme), dataAttribute);
    }
  }, [currentTheme, dataAttribute]);

  // Handle theme persistence
  useEffect(() => {
    if (enablePersistence && storageAdapter.isAvailable()) {
      storageAdapter.setItem(storageKey, String(currentTheme));
    }
  }, [currentTheme, storageKey, enablePersistence, storageAdapter]);

  // Cleanup: Remove completed promises and abort controllers on unmount
  useEffect(() => {
    return () => {
      // Cancel any in-flight theme loads
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }

      // Clean up completed promises (keep only pending ones)
      // In practice, completed promises are automatically garbage collected,
      // but we can clear the ref to be explicit
      const pendingPromises: Record<string, Promise<void>> = {};
      Object.entries(themePromisesRef.current).forEach(([key, promise]) => {
        // Check if promise is still pending (this is a best-effort cleanup)
        // In practice, we rely on garbage collection for completed promises
        pendingPromises[key] = promise;
      });
      // Clear all on unmount
      themePromisesRef.current = {};
    };
  }, []);

  // Function to set theme with proper type handling
  const setTheme = useCallback(async (
    theme: string | DesignTokens | Partial<DesignTokens>,
    options?: ThemeLoadOptions
  ) => {
    // Cancel previous theme load if in progress
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this theme load
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setError(null);

    try {
      let themeName: string;

      if (typeof theme === 'string') {
        themeName = theme;
      } else {
        // Check if aborted before processing
        if (abortController.signal.aborted) {
          return;
        }

        // For DesignTokens, create CSS and inject it
        const { createTheme } = await import('../core');
        const css = createTheme(theme);
        const themeId = 'tokens-theme';

        // Check if aborted after async operation
        if (abortController.signal.aborted) {
          return;
        }

        // Remove any previously loaded theme CSS
        removeCSS(`theme-${currentTheme}`);

        // Inject new theme CSS
        injectCSS(css, `theme-${themeId}`);

        // Store tokens for reference
        const fullTokens = createTokens(theme);

        // Check if aborted before state update
        if (abortController.signal.aborted) {
          return;
        }

        setActiveTokens(fullTokens);
        setCurrentTheme(themeId);
        handleThemeChange(fullTokens);
        setIsLoading(false);
        return;
      }

      // If it's a string theme name, load the associated CSS
      if (typeof theme === 'string' && themes[theme]) {
        // Check if theme is already loading
        if (themePromisesRef.current[theme]) {
          try {
            await themePromisesRef.current[theme];
            // Check if aborted
            if (abortController.signal.aborted) {
              return;
            }
            setCurrentTheme(theme);
            setActiveTokens(null);
            handleThemeChange(theme);
            setIsLoading(false);
            return;
          } catch {
            // If previous load failed, continue with new load
          }
        }

        // Load CSS theme
        const themeLoadPromise = new Promise<void>(async (resolve, reject) => {
          try {
            // Check if aborted
            if (abortController.signal.aborted) {
              resolve();
              return;
            }

            const themeMetadata = themes[theme];

            if (themeMetadata) {
              // Build CSS path using utility function
              const cssPath = buildThemePath(
                theme,
                basePath,
                useMinified,
                cdnPath
              );

              // Check if aborted
              if (abortController.signal.aborted) {
                resolve();
                return;
              }

              // Load CSS file (using loadThemeCSS from domUtils)
              const { loadThemeCSS } = await import('../utils/domUtils');
              await loadThemeCSS(cssPath, `theme-${theme}`);

              // Check if aborted after async operation
              if (abortController.signal.aborted) {
                resolve();
                return;
              }

              // Remove any previously loaded theme CSS
              removeCSS(`theme-${String(currentTheme)}`);

              loadedThemesRef.current.add(theme);

              setCurrentTheme(theme);
              setActiveTokens(null);
              handleThemeChange(theme);
              resolve();
            } else {
              throw new Error(`Theme metadata not found for theme: ${theme}`);
            }
          } catch (err) {
            // Don't reject if aborted
            if (abortController.signal.aborted) {
              resolve();
              return;
            }

            const error = err instanceof Error ? err : new Error(String(err));
            setError(error);
            handleError(error, String(theme));
            reject(error);
          }
        });

        themePromisesRef.current[theme] = themeLoadPromise;

        try {
          await themeLoadPromise;
        } catch {
          // Error already handled in promise
        }

        // Clean up completed promise after a delay to prevent memory leak
        setTimeout(() => {
          if (themePromisesRef.current[theme] === themeLoadPromise) {
            delete themePromisesRef.current[theme];
          }
        }, 1000);
      } else {
        // Check if aborted
        if (abortController.signal.aborted) {
          return;
        }

        // For string theme that isn't in our themes record, just set the name
        setCurrentTheme(themeName);
        setActiveTokens(null);
        handleThemeChange(themeName);
      }
    } catch (err) {
      // Don't set error if aborted
      if (abortController.signal.aborted) {
        return;
      }

      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      handleError(error, String(theme));
    } finally {
      // Only update loading state if not aborted
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [themes, currentTheme, handleThemeChange, handleError, basePath, useMinified, cdnPath]);

  // Check if theme is loaded
  const isThemeLoaded = useCallback((themeName: string) => {
    return loadedThemesRef.current.has(themeName);
  }, []);

  // Preload theme function
  const preloadTheme = useCallback(async (themeName: string) => {
    if (!themes[themeName] || isThemeLoaded(themeName)) {
      return;
    }

    setIsLoading(true);
    try {
      // Build CSS path using utility function
      const cssPath = buildThemePath(
        themeName,
        basePath,
        useMinified,
        cdnPath
      );

      // Preload CSS by fetching it
      await fetch(cssPath);
      loadedThemesRef.current.add(themeName);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      handleError(error, themeName);
    } finally {
      setIsLoading(false);
    }
  }, [themes, isThemeLoaded, handleError, basePath, useMinified, cdnPath]);

  // Create a mock theme manager instance for the context
  const themeManager = useMemo(() => {
    // This would normally be a real ThemeManager instance
    // For now, we'll create a mock implementation that satisfies the type
    return {
      // Mock implementation - in a real app this would be a full ThemeManager
    };
  }, []);

  // Memoize available themes to prevent unnecessary recalculations
  const availableThemes = useMemo(() =>
    Object.entries(themes).map(([name, metadata]) => ({
      ...metadata,
      name: name, // Ensure name is set from the key
    })),
    [themes]
  );

  // Theme context value
  const contextValue = useMemo(() => ({
    theme: currentTheme,
    activeTokens,
    setTheme,
    availableThemes,
    isLoading,
    error,
    isThemeLoaded,
    preloadTheme,
    themeManager,
  }), [
    currentTheme,
    activeTokens,
    setTheme,
    availableThemes, // Use memoized value
    isLoading,
    error,
    isThemeLoaded,
    preloadTheme,
    themeManager
  ]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};