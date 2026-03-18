import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { GlassParams, ResponsiveBreakpoint } from '../types/glass';

/**
 * Default responsive breakpoints configuration
 * 
 * These breakpoints are optimized for glass effect performance across device classes:
 * - Mobile: Reduced complexity for 60 FPS target
 * - Tablet: Balanced quality and performance
 * - Desktop: Full fidelity effects
 */
export const DEFAULT_BREAKPOINTS: Record<string, ResponsiveBreakpoint> = {
  mobile: {
    maxWidth: 640,
    params: {
      distortionOctaves: 3,
      displacementScale: 0.7,
      blurAmount: 0.8,
      animationSpeed: 0.8,
      chromaticIntensity: 0.5,
    },
  },
  tablet: {
    minWidth: 641,
    maxWidth: 1024,
    params: {
      distortionOctaves: 4,
      displacementScale: 0.85,
      blurAmount: 0.9,
      animationSpeed: 0.9,
      chromaticIntensity: 0.75,
    },
  },
  desktop: {
    minWidth: 1025,
    params: {
      distortionOctaves: 5,
      displacementScale: 1.0,
      blurAmount: 1.0,
      animationSpeed: 1.0,
      chromaticIntensity: 1.0,
    },
  },
};

/**
 * Device performance tier detection
 * 
 * Uses Device Memory API and Hardware Concurrency API to classify devices
 * into performance tiers for automatic quality adjustment.
 * 
 * @returns Performance tier classification
 */
const detectDevicePerformanceTier = (): 'low' | 'medium' | 'high' => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'high'; // Default to high for SSR
  }

  // Device Memory API (Chrome, Edge, Opera)
  // Returns RAM in GB: 0.25, 0.5, 1, 2, 4, 8
  const deviceMemory = (navigator as any).deviceMemory || 4;
  
  // Hardware Concurrency API (logical CPU cores)
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  
  // Low-end: ≤2GB RAM OR ≤2 CPU cores
  if (deviceMemory <= 2 || hardwareConcurrency <= 2) {
    return 'low';
  }
  
  // High-end: ≥4GB RAM AND ≥4 CPU cores
  if (deviceMemory >= 4 && hardwareConcurrency >= 4) {
    return 'high';
  }
  
  // Medium: Everything else
  return 'medium';
};

/**
 * Get performance-based quality adjustments
 * 
 * Further reduces quality parameters for low-end devices regardless of screen size.
 * This ensures smooth performance on devices with limited resources.
 * 
 * @param baseParams Base parameters from breakpoint
 * @param performanceTier Device performance tier
 * @returns Adjusted parameters
 */
const applyPerformanceAdjustments = (
  baseParams: GlassParams,
  performanceTier: 'low' | 'medium' | 'high'
): GlassParams => {
  if (performanceTier === 'high') {
    return baseParams; // No adjustment needed
  }

  const multiplier = performanceTier === 'low' ? 0.7 : 0.85;

  return {
    ...baseParams,
    distortionOctaves: Math.max(2, Math.round((baseParams.distortionOctaves || 5) * multiplier)),
    displacementScale: (baseParams.displacementScale || 1) * multiplier,
    blurAmount: (baseParams.blurAmount || 1) * multiplier,
    animationSpeed: (baseParams.animationSpeed || 1) * multiplier,
    chromaticIntensity: (baseParams.chromaticIntensity || 1) * multiplier,
  };
};

/**
 * Debounce utility for resize events
 * 
 * Prevents excessive recalculations during window resize.
 * 
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, wait);
  }, [func, wait]) as T;
};

/**
 * Hook options for responsive glass parameters
 */
interface UseResponsiveGlassOptions {
  /** Base glass parameters (before responsive scaling) */
  baseParams: GlassParams;
  
  /** Custom breakpoints (optional, uses defaults if not provided) */
  breakpoints?: Record<string, ResponsiveBreakpoint>;
  
  /** Enable/disable responsive system */
  enabled?: boolean;
  
  /** Enable performance-based adjustments */
  enablePerformanceAdjustment?: boolean;
  
  /** Debug mode - logs breakpoint changes */
  debug?: boolean;
}

/**
 * Return value from responsive glass hook
 */
interface UseResponsiveGlassReturn {
  /** Current responsive parameters based on breakpoint */
  responsiveParams: GlassParams;
  
  /** Current breakpoint name ('mobile', 'tablet', 'desktop', or 'custom') */
  currentBreakpoint: string;
  
  /** Current device performance tier */
  performanceTier: 'low' | 'medium' | 'high';
  
  /** Whether responsive system is active */
  isActive: boolean;
  
  /** Manually recalculate responsive parameters */
  recalculate: () => void;
}

/**
 * Calculate which breakpoint matches current screen width
 * 
 * @param width Current screen width
 * @param breakpoints Breakpoint definitions
 * @returns Matching breakpoint name and params
 */
const calculateBreakpoint = (
  width: number,
  breakpoints: Record<string, ResponsiveBreakpoint>
): { name: string; params: GlassParams } => {
  // Convert breakpoints to array and sort by minWidth descending
  const sortedBreakpoints = Object.entries(breakpoints)
    .filter(([_, bp]) => bp.minWidth !== undefined)
    .sort((a, b) => (b[1].minWidth || 0) - (a[1].minWidth || 0));

  // Find first breakpoint where width >= minWidth
  for (const [name, bp] of sortedBreakpoints) {
    if (width >= (bp.minWidth || 0)) {
      return { name, params: bp.params };
    }
  }

  // If no minWidth matched, check maxWidth breakpoints
  const maxWidthBreakpoints = Object.entries(breakpoints)
    .filter(([_, bp]) => bp.maxWidth !== undefined)
    .sort((a, b) => (a[1].maxWidth || Infinity) - (b[1].maxWidth || Infinity));

  for (const [name, bp] of maxWidthBreakpoints) {
    if (width <= (bp.maxWidth || Infinity)) {
      return { name, params: bp.params };
    }
  }

  // Fallback to first available breakpoint
  const entries = Object.entries(breakpoints);
  if (entries.length === 0) {
    // Ultimate fallback - return sensible defaults
    return { 
      name: 'desktop', 
      params: { distortionOctaves: 5, displacementScale: 1, blurAmount: 1 } 
    };
  }
  const firstEntry = entries[0];
  if (!firstEntry) {
    return { 
      name: 'desktop', 
      params: { distortionOctaves: 5, displacementScale: 1, blurAmount: 1 } 
    };
  }
  const [fallbackName, fallbackBreakpoint] = firstEntry;
  return { name: fallbackName, params: fallbackBreakpoint.params };
};

/**
 * Merge base parameters with breakpoint parameters
 * 
 * Applies multiplicative scaling for numeric values.
 * 
 * @param baseParams Base glass parameters
 * @param breakpointParams Breakpoint-specific parameters
 * @returns Merged parameters
 */
const mergeParams = (
  baseParams: GlassParams,
  breakpointParams: GlassParams
): GlassParams => {
  const result: GlassParams = { ...baseParams };

  // Apply scaling for specific properties
  const scaleProperties: (keyof GlassParams)[] = [
    'displacementScale',
    'blurAmount',
    'saturation',
    'aberrationIntensity',
    'animationSpeed',
    'chromaticIntensity',
  ];

  for (const prop of scaleProperties) {
    if (breakpointParams[prop] !== undefined && baseParams[prop] !== undefined) {
      (result as any)[prop] = (baseParams[prop] as number) * (breakpointParams[prop] as number);
    }
  }

  // Override properties that should be set directly (not scaled)
  const overrideProperties: (keyof GlassParams)[] = [
    'distortionOctaves',
    'distortionLacunarity',
    'distortionGain',
  ];

  for (const prop of overrideProperties) {
    if (breakpointParams[prop] !== undefined) {
      (result as any)[prop] = breakpointParams[prop];
    }
  }

  return result;
};

/**
 * Responsive Glass Parameters Hook
 * 
 * Automatically adjusts glass effect parameters based on:
 * 1. Screen size (mobile/tablet/desktop breakpoints)
 * 2. Device performance (RAM and CPU detection)
 * 3. Custom breakpoint configuration
 * 
 * Features:
 * - Debounced resize handling
 * - Performance-based quality adjustment
 * - Smooth parameter transitions
 * - Debug mode for development
 * 
 * @example
 * ```typescript
 * const { responsiveParams, currentBreakpoint } = useResponsiveGlass({
 *   baseParams: {
 *     distortionOctaves: 5,
 *     displacementScale: 20,
 *     blurAmount: 10,
 *   },
 *   debug: true,
 * });
 * ```
 * 
 * @param options Hook configuration options
 * @returns Responsive parameters and metadata
 */
export function useResponsiveGlass({
  baseParams,
  breakpoints = DEFAULT_BREAKPOINTS,
  enabled = true,
  enablePerformanceAdjustment = true,
  debug = false,
}: UseResponsiveGlassOptions): UseResponsiveGlassReturn {
  const [responsiveParams, setResponsiveParams] = useState<GlassParams>(baseParams);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('desktop');
  const [performanceTier, setPerformanceTier] = useState<'low' | 'medium' | 'high'>('high');
  const [isActive, setIsActive] = useState<boolean>(enabled);

  // Use refs to prevent unnecessary re-creations
  const baseParamsRef = useRef(baseParams);
  const breakpointsRef = useRef(breakpoints);
  
  // Update refs when props change
  baseParamsRef.current = baseParams;
  breakpointsRef.current = breakpoints;

  /**
   * Calculate and apply responsive parameters
   */
  const calculateParams = useCallback(() => {
    if (!enabled || typeof window === 'undefined') {
      setIsActive(false);
      setResponsiveParams(baseParamsRef.current);
      setCurrentBreakpoint('disabled');
      return;
    }

    setIsActive(true);

    // Get current screen width
    const width = window.innerWidth;

    // Determine current breakpoint
    const { name, params: breakpointParams } = calculateBreakpoint(width, breakpointsRef.current);
    setCurrentBreakpoint(name);

    // Merge base params with breakpoint params
    let mergedParams = mergeParams(baseParamsRef.current, breakpointParams);

    // Apply performance adjustments if enabled
    if (enablePerformanceAdjustment) {
      const tier = detectDevicePerformanceTier();
      setPerformanceTier(tier);
      mergedParams = applyPerformanceAdjustments(mergedParams, tier);

      if (debug) {
        console.log('[useResponsiveGlass] Performance Tier:', tier);
      }
    }

    setResponsiveParams(mergedParams);

    if (debug) {
      console.log('[useResponsiveGlass] Breakpoint:', {
        name,
        width,
        params: mergedParams,
        timestamp: new Date().toISOString(),
      });
    }
  }, [enabled, enablePerformanceAdjustment, debug]);

  /**
   * Debounced parameter calculation for resize events
   */
  const debouncedCalculate = useDebounce(calculateParams, 200);

  /**
   * Handle window resize
   */
  useEffect(() => {
    if (!enabled) return;

    // Initial calculation
    calculateParams();

    // Listen for resize events
    window.addEventListener('resize', debouncedCalculate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedCalculate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]); // calculateParams and debouncedCalculate are stable via useCallback and refs

  /**
   * Manual recalculation function
   */
  const recalculate = useCallback(() => {
    calculateParams();
  }, [calculateParams]);

  return {
    responsiveParams,
    currentBreakpoint,
    performanceTier,
    isActive,
    recalculate,
  };
}

/**
 * Utility function to get default breakpoints
 * Useful for documentation and debugging
 */
export function getDefaultBreakpoints(): Record<string, ResponsiveBreakpoint> {
  return { ...DEFAULT_BREAKPOINTS };
}

/**
 * Utility function to create custom breakpoints
 * 
 * @param customBreakpoints Partial breakpoint overrides
 * @returns Complete breakpoint configuration
 */
export function createBreakpoints(
  customBreakpoints: Partial<Record<string, ResponsiveBreakpoint>>
): Record<string, ResponsiveBreakpoint> {
  return {
    ...DEFAULT_BREAKPOINTS,
    ...customBreakpoints,
  } as Record<string, ResponsiveBreakpoint>;
}
