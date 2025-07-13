import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type {
  ThemeChangeCallback,
  ThemeContextValue,
  ThemeName,
  ThemePerformanceMetrics,
  ThemeValidationResult,
  ThemeVariables,
  UseThemeReturn,
  UseThemeTransitionConfig,
  UseThemeTransitionReturn,
} from '../types/index.js';

// Theme context (to be implemented)
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

/**
 * Main theme hook for accessing and managing themes
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const {
    currentTheme,
    previousTheme,
    availableThemes,
    themeConfig,
    isLoading,
    error,
    isInitialized,
    setTheme: contextSetTheme,
    getThemeVariables,
    isThemeAvailable,
    getThemeMetadata,
    validateTheme,
    applyThemeToElement,
    removeThemeFromElement,
    getCSSVariable,
    setCSSVariable,
    subscribe,
    getPerformanceMetrics,
  } = context;

  // Enhanced theme management functions
  const toggleTheme = useCallback(
    (themeA: ThemeName, themeB: ThemeName) => {
      const nextTheme = currentTheme === themeA ? themeB : themeA;
      contextSetTheme(nextTheme);
    },
    [currentTheme, contextSetTheme]
  );

  const cycleTheme = useCallback(() => {
    const currentIndex = availableThemes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    const nextTheme = availableThemes[nextIndex];
    contextSetTheme(nextTheme);
  }, [currentTheme, availableThemes, contextSetTheme]);

  const resetTheme = useCallback(() => {
    // Reset to the first available theme (typically default)
    if (availableThemes.length > 0) {
      contextSetTheme(availableThemes[0]);
    }
  }, [availableThemes, contextSetTheme]);

  const getSystemPreference = useCallback((): 'light' | 'dark' | null => {
    if (typeof window === 'undefined') return null;

    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }

    return null;
  }, []);

  const matchesSystemPreference = useCallback((): boolean => {
    const systemPref = getSystemPreference();
    if (!systemPref || !themeConfig) return false;

    // Simple heuristic: check if theme name contains 'dark' or 'light'
    // This could be enhanced with theme metadata
    const themeName = currentTheme.toLowerCase();

    if (systemPref === 'dark') {
      return themeName.includes('dark') || themeName.includes('midnight');
    } else {
      return !themeName.includes('dark') && !themeName.includes('midnight');
    }
  }, [currentTheme, themeConfig, getSystemPreference]);

  return {
    // Context values
    currentTheme,
    previousTheme,
    availableThemes,
    themeConfig,
    isLoading,
    error,
    isInitialized,
    setTheme: contextSetTheme,
    getThemeVariables,
    isThemeAvailable,
    getThemeMetadata,
    validateTheme,
    applyThemeToElement,
    removeThemeFromElement,
    getCSSVariable,
    setCSSVariable,
    subscribe,
    getPerformanceMetrics,

    // Enhanced functions
    toggleTheme,
    cycleTheme,
    resetTheme,
    getSystemPreference,
    matchesSystemPreference,
  };
}

/**
 * Hook for managing theme transitions
 */
export function useThemeTransition(
  config: UseThemeTransitionConfig = {}
): UseThemeTransitionReturn {
  const {
    duration = 300,
    easing = 'ease-in-out',
    elements = [],
    properties = ['background-color', 'color', 'border-color'],
    disableOnLoad = true,
    onTransitionStart,
    onTransitionEnd,
  } = config;

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionsEnabled, setTransitionsEnabled] = useState(!disableOnLoad);
  const [transitionDuration, setTransitionDuration] = useState(duration);

  const { currentTheme, subscribe } = useTheme();

  const startTransition = useCallback(
    async (toTheme: ThemeName): Promise<void> => {
      if (!transitionsEnabled) return;

      setIsTransitioning(true);
      onTransitionStart?.(currentTheme, toTheme);

      // Apply transition styles to elements
      const targetElements = elements
        .map(el => (el instanceof HTMLElement ? el : el.current))
        .filter(Boolean) as HTMLElement[];

      targetElements.forEach(element => {
        if (element) {
          element.style.transition = `${properties.join(', ')} ${transitionDuration}ms ${easing}`;
        }
      });

      // Wait for transition to complete
      await new Promise(resolve => setTimeout(resolve, transitionDuration));

      // Clean up transition styles
      targetElements.forEach(element => {
        if (element) {
          element.style.transition = '';
        }
      });

      setIsTransitioning(false);
      onTransitionEnd?.(toTheme);
    },
    [
      transitionsEnabled,
      currentTheme,
      elements,
      properties,
      transitionDuration,
      easing,
      onTransitionStart,
      onTransitionEnd,
    ]
  );

  const enableTransitions = useCallback(() => {
    setTransitionsEnabled(true);
  }, []);

  const disableTransitions = useCallback(() => {
    setTransitionsEnabled(false);
  }, []);

  const getTransitionDuration = useCallback(() => {
    return transitionDuration;
  }, [transitionDuration]);

  return {
    isTransitioning,
    startTransition,
    enableTransitions,
    disableTransitions,
    getTransitionDuration,
    setTransitionDuration,
  };
}

/**
 * Hook for theme performance monitoring
 */
export function useThemePerformance(): ThemePerformanceMetrics | null {
  const { getPerformanceMetrics } = useTheme();
  const [metrics, setMetrics] = useState<ThemePerformanceMetrics | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      try {
        const currentMetrics = getPerformanceMetrics();
        setMetrics(currentMetrics);
      } catch (error) {
        console.warn('Failed to get theme performance metrics:', error);
        setMetrics(null);
      }
    };

    updateMetrics();

    // Update metrics periodically
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, [getPerformanceMetrics]);

  return metrics;
}

/**
 * Hook for theme validation
 */
export function useThemeValidation(theme?: ThemeName): ThemeValidationResult | null {
  const { currentTheme, validateTheme } = useTheme();
  const [validationResult, setValidationResult] = useState<ThemeValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const targetTheme = theme || currentTheme;

  useEffect(() => {
    let isMounted = true;

    const validateCurrentTheme = async () => {
      setIsValidating(true);

      try {
        const result = await validateTheme(targetTheme);
        if (isMounted) {
          setValidationResult(result);
        }
      } catch (error) {
        console.warn('Theme validation failed:', error);
        if (isMounted) {
          setValidationResult(null);
        }
      } finally {
        if (isMounted) {
          setIsValidating(false);
        }
      }
    };

    validateCurrentTheme();

    return () => {
      isMounted = false;
    };
  }, [targetTheme, validateTheme]);

  return validationResult;
}

/**
 * Hook for subscribing to theme changes
 */
export function useThemeSubscription(callback: ThemeChangeCallback): void {
  const { subscribe } = useTheme();

  useEffect(() => {
    const unsubscribe = subscribe(callback);
    return unsubscribe;
  }, [subscribe, callback]);
}

/**
 * Hook for getting theme-aware CSS variables
 */
export function useThemeVariables(): Partial<ThemeVariables> {
  const { getThemeVariables } = useTheme();

  return useMemo(() => {
    return getThemeVariables();
  }, [getThemeVariables]);
}

/**
 * Hook for applying theme to specific elements
 */
export function useThemeElement(elementRef: React.RefObject<HTMLElement>, theme?: ThemeName): void {
  const { currentTheme, applyThemeToElement, removeThemeFromElement } = useTheme();
  const targetTheme = theme || currentTheme;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    applyThemeToElement(element, targetTheme);

    return () => {
      removeThemeFromElement(element);
    };
  }, [elementRef, targetTheme, applyThemeToElement, removeThemeFromElement]);
}
