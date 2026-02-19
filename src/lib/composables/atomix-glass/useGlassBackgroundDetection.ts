import React, { useEffect, useState } from 'react';
import type { OverLightConfig, OverLightObjectConfig } from '../../types/components';

// Module-level shared background detection cache using WeakMap
// Automatically cleaned up when elements are removed from DOM
interface BackgroundDetectionCacheEntry {
  result: boolean;
  timestamp: number;
  config: OverLightConfig;
  threshold: number;
}

const backgroundDetectionCache = new WeakMap<HTMLElement, BackgroundDetectionCacheEntry>();

/**
 * Compare two OverLightConfig values for equality
 * Handles primitives (boolean, 'auto') and objects with deep comparison
 */
const compareOverLightConfig = (
  config1: OverLightConfig,
  config2: OverLightConfig
): boolean => {
  // Primitive comparison for boolean and 'auto'
  if (typeof config1 !== 'object' || config1 === null) {
    return config1 === config2;
  }

  // Both must be objects at this point
  if (typeof config2 !== 'object' || config2 === null) {
    return false;
  }

  const obj1 = config1 as OverLightObjectConfig;
  const obj2 = config2 as OverLightObjectConfig;

  // Deep comparison of object properties
  // Compare all defined properties (threshold, opacity, contrast, brightness, saturationBoost)
  const props: (keyof OverLightObjectConfig)[] = [
    'threshold',
    'opacity',
    'contrast',
    'brightness',
    'saturationBoost',
  ];

  for (const prop of props) {
    const val1 = obj1[prop];
    const val2 = obj2[prop];

    // If both are undefined, they're equal for this property
    if (val1 === undefined && val2 === undefined) {
      continue;
    }

    // If one is undefined and the other isn't, they're different
    if (val1 === undefined || val2 === undefined) {
      return false;
    }

    // Compare numeric values (handle NaN and floating point precision)
    if (typeof val1 === 'number' && typeof val2 === 'number') {
      // Use Number.isNaN for proper NaN comparison
      if (Number.isNaN(val1) && Number.isNaN(val2)) {
        continue;
      }
      if (Number.isNaN(val1) || Number.isNaN(val2)) {
        return false;
      }
      // Compare with small epsilon for floating point numbers
      if (Math.abs(val1 - val2) > Number.EPSILON) {
        return false;
      }
    } else if (val1 !== val2) {
      return false;
    }
  }

  return true;
};

/**
 * Get cached background detection result
 */
const getCachedBackgroundDetection = (
  parentElement: HTMLElement | null,
  overLightConfig: OverLightConfig
): boolean | null => {
  if (!parentElement) {
    return null;
  }

  const cached = backgroundDetectionCache.get(parentElement);
  if (cached && compareOverLightConfig(cached.config, overLightConfig)) {
    // Update timestamp for LRU-like behavior (though WeakMap doesn't support LRU)
    cached.timestamp = Date.now();
    return cached.result;
  }

  return null;
};

/**
 * Set cached background detection result
 */
const setCachedBackgroundDetection = (
  parentElement: HTMLElement | null,
  overLightConfig: OverLightConfig,
  result: boolean,
  threshold: number
): void => {
  if (!parentElement) {
    return;
  }

  backgroundDetectionCache.set(parentElement, {
    result,
    timestamp: Date.now(),
    config: overLightConfig,
    threshold,
  });
};

interface UseGlassBackgroundDetectionProps {
  glassRef: React.RefObject<HTMLDivElement>;
  overLight: OverLightConfig;
  debugOverLight?: boolean;
}

export function useGlassBackgroundDetection({
  glassRef,
  overLight,
  debugOverLight = false,
}: UseGlassBackgroundDetectionProps) {
  const [detectedOverLight, setDetectedOverLight] = useState(false);

  // Background detection
  useEffect(() => {
    // Only run auto-detection for 'auto' mode or object config (which uses auto-detection)
    const shouldDetect = (overLight === 'auto' || (typeof overLight === 'object' && overLight !== null));

    if (shouldDetect && glassRef.current) {
      const element = glassRef.current;
      const parentElement = element.parentElement;

      // Check shared cache: skip detection if parent unchanged and config unchanged
      const cachedResult = getCachedBackgroundDetection(parentElement, overLight);
      if (cachedResult !== null) {
        setDetectedOverLight(cachedResult);
        return;
      }

      const timeoutId = setTimeout(() => {
        try {
          if (!element) {
            setDetectedOverLight(false);
            return;
          }

          // Validate window context
          if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
            setDetectedOverLight(false);
            return;
          }

          let totalLuminance = 0;
          let validSamples = 0;
          let hasValidBackground = false;

          let currentElement = element.parentElement;
          let depth = 0;
          const maxDepth = 20;
          const maxSamples = 10;

          // Limit traversal depth to prevent infinite loops and performance issues
          while (currentElement && validSamples < maxSamples && depth < maxDepth) {
            try {
              const computedStyle = window.getComputedStyle(currentElement);
              if (!computedStyle) {
                currentElement = currentElement.parentElement;
                depth++;
                continue;
              }

              const bgColor = computedStyle.backgroundColor;
              const bgImage = computedStyle.backgroundImage;

              // Check for solid color backgrounds
              if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && bgColor !== 'initial' && bgColor !== 'none') {
                const rgb = bgColor.match(/\d+/g);
                if (rgb && rgb.length >= 3) {
                  const r = Number(rgb[0]);
                  const g = Number(rgb[1]);
                  const b = Number(rgb[2]);

                  // Validate RGB values are valid numbers
                  if (!isNaN(r) && !isNaN(g) && !isNaN(b) &&
                    isFinite(r) && isFinite(g) && isFinite(b) &&
                    r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
                    // Only consider if it's not pure black or very dark
                    if (r > 10 || g > 10 || b > 10) {
                      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                      if (!isNaN(luminance) && isFinite(luminance)) {
                        totalLuminance += luminance;
                        validSamples++;
                        hasValidBackground = true;
                      }
                    }
                  }
                }
              }

              // Check for image backgrounds
              if (bgImage && bgImage !== 'none' && bgImage !== 'initial') {
                // For image backgrounds, assume medium luminance
                totalLuminance += 0.5;
                validSamples++;
                hasValidBackground = true;
              }
            } catch (styleError) {
              // Silently continue if getting computed style fails for this element
              if (typeof process === 'undefined' || process.env?.NODE_ENV === 'development') {
                console.debug('AtomixGlass: Error getting computed style for element:', styleError);
              }
            }

            // Move to parent element for next iteration
            if (currentElement) {
              currentElement = currentElement.parentElement;
              depth++;
            } else {
              break; // Exit loop if currentElement becomes null
            }
          }

          // More conservative detection with better error handling
          if (hasValidBackground && validSamples > 0) {
            const avgLuminance = totalLuminance / validSamples;
            if (!isNaN(avgLuminance) && isFinite(avgLuminance)) {
              let threshold = 0.7; // Conservative threshold for overlight

              // If overLight is an object, use its threshold property with validation
              if (typeof overLight === 'object' && overLight !== null) {
                const objConfig = overLight as OverLightObjectConfig;
                if (objConfig.threshold !== undefined) {
                  const configThreshold = typeof objConfig.threshold === 'number' &&
                    !isNaN(objConfig.threshold) &&
                    isFinite(objConfig.threshold)
                    ? objConfig.threshold
                    : 0.7;
                  threshold = Math.min(0.9, Math.max(0.1, configThreshold));
                }
              }

              const isOverLightDetected = avgLuminance > threshold;

              // Cache the result in shared cache
              setCachedBackgroundDetection(element.parentElement, overLight, isOverLightDetected, threshold);

              setDetectedOverLight(isOverLightDetected);

              // Debug logging
              // if (process.env.NODE_ENV !== 'production' && debugOverLight) {
              //   console.log('[AtomixGlass] OverLight Detection:', {
              //     avgLuminance: avgLuminance.toFixed(3),
              //     threshold: threshold.toFixed(3),
              //     detected: isOverLightDetected,
              //     validSamples,
              //     totalLuminance: totalLuminance.toFixed(3),
              //     configType: typeof overLight === 'object' ? 'object' : typeof overLight,
              //     timestamp: new Date().toISOString(),
              //   });
              // }
            } else {
              // Invalid luminance calculation, default to false
              const result = false;
              const threshold = typeof overLight === 'object' && overLight !== null
                ? (overLight as OverLightObjectConfig).threshold || 0.7
                : 0.7;
              setCachedBackgroundDetection(element.parentElement, overLight, result, threshold);
              setDetectedOverLight(result);
            }
          } else {
            // Default to false if no valid background found
            const result = false;
            const threshold = typeof overLight === 'object' && overLight !== null
              ? (overLight as OverLightObjectConfig).threshold || 0.7
              : 0.7;
            setCachedBackgroundDetection(element.parentElement, overLight, result, threshold);
            setDetectedOverLight(result);
          }
        } catch (error) {
          // Enhanced error logging with context
          if (typeof process === 'undefined' || process.env?.NODE_ENV === 'development') {
            console.warn('AtomixGlass: Error detecting background brightness:', error);
          }
          const result = false;
          if (element && element.parentElement) {
            const threshold = typeof overLight === 'object' && overLight !== null
              ? (overLight as OverLightObjectConfig).threshold || 0.7
              : 0.7;
            setCachedBackgroundDetection(element.parentElement, overLight, result, threshold);
          }
          setDetectedOverLight(result);
        }
      }, 150);

      return () => clearTimeout(timeoutId);
    } else if (typeof overLight === 'boolean') {
      // For boolean values, disable auto-detection
      // Cache is automatically managed by WeakMap (no manual clearing needed)
      setDetectedOverLight(false);

      // Debug logging for boolean mode
      // if (process.env.NODE_ENV !== 'production' && debugOverLight) {
      //   console.log('[AtomixGlass] OverLight Mode: boolean', {
      //     value: overLight,
      //     autoDetection: false,
      //     timestamp: new Date().toISOString(),
      //   });
      // }
    }
  }, [overLight, glassRef, debugOverLight]);

  return { detectedOverLight };
}
