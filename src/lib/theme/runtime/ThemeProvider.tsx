/**
 * Theme Provider
 * 
 * React context provider for theme management with separated concerns
 * Updated to use the new simplified theme system
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps, Theme, ThemeLoadOptions } from '../types';
import { isJSTheme } from '../utils/themeUtils';
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
 * - JS Theme objects
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
  const handleThemeChange = useCallback((theme: string | Theme) => {
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
        console.warn('Failed to load theme from config, using default');
      }
    }

    // Default fallback
    return 'default';
  }, [defaultTheme, enablePersistence, storageKey]);

  // State for current theme
  const [currentTheme, setCurrentTheme] = useState<string | Theme>(() => initialDefaultTheme);
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Track loaded themes
  const loadedThemesRef = useRef<Set<string>>(new Set());
  const themePromisesRef = useRef<Record<string, Promise<void>>>({});

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
  }, [currentTheme, storageKey, enablePersistence]);

  // Function to set theme with proper type handling
  const setTheme = useCallback(async (
    theme: string | Theme | import('../tokens').DesignTokens | Partial<import('../tokens').DesignTokens>,
    options?: ThemeLoadOptions
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let themeName: string;
      let themeObj: Theme | null = null;
      
      if (typeof theme === 'string') {
        themeName = theme;
      } else {
        // If it's a Theme object or DesignTokens, we need to process it
        if (isJSTheme(theme)) {
          themeObj = theme as Theme;
          // For JS themes, we use a generic name
          themeName = 'js-theme';
          setActiveTheme(themeObj);
        } else {
          // For DesignTokens, we might create a theme from tokens
          themeName = 'tokens-theme';
          // Create theme from tokens if needed
        }
      }

      // If it's a string theme name, load the associated CSS
      if (typeof theme === 'string' && themes[theme]) {
        // Check if theme is already loading
        if (themePromisesRef.current[theme]) {
          await themePromisesRef.current[theme];
          setCurrentTheme(theme);
          setActiveTheme(null);
          handleThemeChange(theme);
          return;
        }

        // Load CSS theme
        const themeLoadPromise = new Promise<void>(async (resolve, reject) => {
          try {
            const themeMetadata = themes[theme];
            
            if (themeMetadata) {
              // Build CSS path using utility function
              const cssPath = buildThemePath(
                theme,
                basePath,
                useMinified,
                cdnPath
              );
              
              // Remove any previously loaded theme CSS
              removeCSS(`theme-${String(currentTheme)}`);
              
              // Inject new theme CSS
              await injectCSS(cssPath, `theme-${theme}`);
              loadedThemesRef.current.add(theme);
              
              setCurrentTheme(theme);
              setActiveTheme(null);
              handleThemeChange(theme);
              resolve();
            } else {
              throw new Error(`Theme metadata not found for theme: ${theme}`);
            }
          } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setError(error);
            handleError(error, String(theme));
            reject(error);
          }
        });

        themePromisesRef.current[theme] = themeLoadPromise;
        await themeLoadPromise;
      } else if (themeObj) {
        // For JS themes, set them directly
        setCurrentTheme(themeName);
        setActiveTheme(themeObj);
        handleThemeChange(themeObj);
      } else {
        // For string theme that isn't in our themes record, just set the name
        setCurrentTheme(themeName);
        setActiveTheme(null);
        handleThemeChange(themeName);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      handleError(error, String(theme));
    } finally {
      setIsLoading(false);
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
    } ;
  }, []);

  // Theme context value
  const contextValue = useMemo(() => ({
    theme: typeof currentTheme === 'string' ? currentTheme : 'js-theme',
    activeTheme,
    setTheme,
    availableThemes: Object.entries(themes).map(([name, metadata]) => ({
      ...metadata
    })),
    isLoading,
    error,
    isThemeLoaded,
    preloadTheme,
    themeManager,
  }), [
    currentTheme, 
    activeTheme, 
    setTheme, 
    themes, 
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