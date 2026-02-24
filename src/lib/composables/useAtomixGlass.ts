import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  AtomixGlassProps,
  DisplacementMode,
  GlassSize,
  MousePosition,
  OverLightConfig,
  OverLightObjectConfig,
} from '../types/components';
import { ATOMIX_GLASS } from '../constants/components';
import { globalMouseTracker } from './shared-mouse-tracker';
import {
  calculateDistance,
  calculateElementCenter,
  calculateMouseInfluence,
  extractBorderRadiusFromChildren,
  extractBorderRadiusFromDOMElement,
  validateGlassSize,
} from '../../components/AtomixGlass/glass-utils';
import { calculateGlassVars, calculateContainerVars } from './glass-styles';

const { CONSTANTS } = ATOMIX_GLASS;

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
const compareOverLightConfig = (config1: OverLightConfig, config2: OverLightConfig): boolean => {
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

interface UseAtomixGlassOptions extends Omit<AtomixGlassProps, 'children'> {
  glassRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  blurAmount?: number;
  saturation?: number;
  enableLiquidBlur?: boolean;
  padding?: string;
  style?: React.CSSProperties;
}

interface UseAtomixGlassReturn {
  // State
  isHovered: boolean;
  isActive: boolean;
  glassSize: GlassSize;
  dynamicCornerRadius: number;
  effectiveCornerRadius: number;
  effectiveReducedMotion: boolean;
  effectiveHighContrast: boolean;
  effectiveDisableEffects: boolean;
  detectedOverLight: boolean;
  globalMousePosition: MousePosition;
  mouseOffset: MousePosition;

  // OverLight config
  overLightConfig: {
    isOverLight: boolean;
    threshold: number;
    opacity: number;
    contrast: number;
    brightness: number;
    saturationBoost: number;
    shadowIntensity: number;
    borderOpacity: number;
  };

  // Transform calculations
  elasticTranslation: { x: number; y: number };
  directionalScale: string;
  transformStyle: string;

  // Event handlers
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Composable hook for AtomixGlass component logic
 * Manages all state, calculations, and event handlers
 */
export function useAtomixGlass({
  glassRef,
  contentRef,
  cornerRadius,
  globalMousePosition: externalGlobalMousePosition,
  mouseOffset: externalMouseOffset,
  mouseContainer,
  overLight = ATOMIX_GLASS.DEFAULTS.OVER_LIGHT,
  reducedMotion = false,
  highContrast = false,
  disableEffects = false,
  elasticity = 0.05,
  onClick,
  debugCornerRadius = false,
  debugOverLight = false,
  children,
  blurAmount = ATOMIX_GLASS.DEFAULTS.BLUR_AMOUNT,
  saturation = ATOMIX_GLASS.DEFAULTS.SATURATION,
  enableLiquidBlur = false,
  padding = ATOMIX_GLASS.DEFAULTS.PADDING,
  style = {},
}: UseAtomixGlassOptions): UseAtomixGlassReturn {
  // State
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [glassSize, setGlassSize] = useState<GlassSize>({ width: 270, height: 69 });

  // Use refs instead of state for high-frequency mouse updates
  const globalMousePositionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const mouseOffsetRef = useRef<MousePosition>({ x: 0, y: 0 });

  const [dynamicCornerRadius, setDynamicCornerRadius] = useState<number>(
    CONSTANTS.DEFAULT_CORNER_RADIUS
  );
  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState(false);
  const [userPrefersHighContrast, setUserPrefersHighContrast] = useState(false);
  const [detectedOverLight, setDetectedOverLight] = useState(false);

  // Refs for callbacks
  const isHoveredRef = useRef(isHovered);
  const isActiveRef = useRef(isActive);
  useEffect(() => {
    isHoveredRef.current = isHovered;
    isActiveRef.current = isActive;
  }, [isHovered, isActive]);

  // Memoized derived values
  const effectiveCornerRadius = useMemo(() => {
    if (cornerRadius !== undefined) {
      const result = Math.max(0, cornerRadius);
      return result;
    }

    const result = Math.max(0, dynamicCornerRadius);
    return result;
  }, [cornerRadius, dynamicCornerRadius]);

  const effectiveReducedMotion = useMemo(
    () => reducedMotion || userPrefersReducedMotion,
    [reducedMotion, userPrefersReducedMotion]
  );

  const effectiveHighContrast = useMemo(
    () => highContrast || userPrefersHighContrast,
    [highContrast, userPrefersHighContrast]
  );

  const effectiveDisableEffects = useMemo(
    () => disableEffects || effectiveReducedMotion,
    [disableEffects, effectiveReducedMotion]
  );

  // We return the ref value for initial render, but subsequent updates won't trigger re-render
  // Consumers should rely on the imperative updates to the DOM
  const globalMousePosition = externalGlobalMousePosition || globalMousePositionRef.current;
  const mouseOffset = externalMouseOffset || mouseOffsetRef.current;

  // Extract border-radius from children
  useEffect(() => {
    const extractRadius = () => {
      try {
        let extractedRadius: number | null = null;

        if (contentRef.current) {
          const firstChild = contentRef.current.firstElementChild as HTMLElement;
          if (firstChild) {
            const domRadius = extractBorderRadiusFromDOMElement(firstChild);
            if (domRadius !== null && domRadius > 0) {
              extractedRadius = domRadius;
            }
          }
        }

        if (extractedRadius === null) {
          const childRadius = extractBorderRadiusFromChildren(children);
          if (childRadius > 0 && childRadius !== CONSTANTS.DEFAULT_CORNER_RADIUS) {
            extractedRadius = childRadius;
          }
        }

        if (extractedRadius !== null && extractedRadius > 0) {
          setDynamicCornerRadius(extractedRadius);
        }
      } catch (error) {
        if (
          (typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') &&
          debugCornerRadius
        ) {
          console.error('[AtomixGlass] Error extracting corner radius:', error);
        }
      }
    };

    extractRadius();
    const timeoutId = setTimeout(extractRadius, 100);
    return () => clearTimeout(timeoutId);
  }, [children, debugCornerRadius, contentRef]);

  // Media query handlers and background detection
  useEffect(() => {
    // Only run auto-detection for 'auto' mode or object config (which uses auto-detection)
    const shouldDetect =
      overLight === 'auto' || (typeof overLight === 'object' && overLight !== null);

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
              if (
                bgColor &&
                bgColor !== 'rgba(0, 0, 0, 0)' &&
                bgColor !== 'transparent' &&
                bgColor !== 'initial' &&
                bgColor !== 'none'
              ) {
                const rgb = bgColor.match(/\d+/g);
                if (rgb && rgb.length >= 3) {
                  const r = Number(rgb[0]);
                  const g = Number(rgb[1]);
                  const b = Number(rgb[2]);

                  // Validate RGB values are valid numbers
                  if (
                    !isNaN(r) &&
                    !isNaN(g) &&
                    !isNaN(b) &&
                    isFinite(r) &&
                    isFinite(g) &&
                    isFinite(b) &&
                    r >= 0 &&
                    r <= 255 &&
                    g >= 0 &&
                    g <= 255 &&
                    b >= 0 &&
                    b <= 255
                  ) {
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
                  const configThreshold =
                    typeof objConfig.threshold === 'number' &&
                    !isNaN(objConfig.threshold) &&
                    isFinite(objConfig.threshold)
                      ? objConfig.threshold
                      : 0.7;
                  threshold = Math.min(0.9, Math.max(0.1, configThreshold));
                }
              }

              const isOverLightDetected = avgLuminance > threshold;

              // Cache the result in shared cache
              setCachedBackgroundDetection(
                element.parentElement,
                overLight,
                isOverLightDetected,
                threshold
              );

              setDetectedOverLight(isOverLightDetected);
            } else {
              // Invalid luminance calculation, default to false
              const result = false;
              const threshold =
                typeof overLight === 'object' && overLight !== null
                  ? (overLight as OverLightObjectConfig).threshold || 0.7
                  : 0.7;
              setCachedBackgroundDetection(element.parentElement, overLight, result, threshold);
              setDetectedOverLight(result);
            }
          } else {
            // Default to false if no valid background found
            const result = false;
            const threshold =
              typeof overLight === 'object' && overLight !== null
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
            const threshold =
              typeof overLight === 'object' && overLight !== null
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
      setDetectedOverLight(false);
    }

    if (typeof window.matchMedia !== 'function') {
      return undefined;
    }

    try {
      const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const mediaQueryHighContrast = window.matchMedia('(prefers-contrast: high)');

      setUserPrefersReducedMotion(mediaQueryReducedMotion.matches);
      setUserPrefersHighContrast(mediaQueryHighContrast.matches);

      const handleReducedMotionChange = (e: MediaQueryListEvent) => {
        setUserPrefersReducedMotion(e.matches);
      };

      const handleHighContrastChange = (e: MediaQueryListEvent) => {
        setUserPrefersHighContrast(e.matches);
      };

      if (mediaQueryReducedMotion.addEventListener) {
        mediaQueryReducedMotion.addEventListener('change', handleReducedMotionChange);
        mediaQueryHighContrast.addEventListener('change', handleHighContrastChange);
      } else if (mediaQueryReducedMotion.addListener) {
        mediaQueryReducedMotion.addListener(handleReducedMotionChange);
        mediaQueryHighContrast.addListener(handleHighContrastChange);
      }

      return () => {
        try {
          if (mediaQueryReducedMotion.removeEventListener) {
            mediaQueryReducedMotion.removeEventListener('change', handleReducedMotionChange);
            mediaQueryHighContrast.removeEventListener('change', handleHighContrastChange);
          } else if (mediaQueryReducedMotion.removeListener) {
            mediaQueryReducedMotion.removeListener(handleReducedMotionChange);
            mediaQueryHighContrast.removeListener(handleHighContrastChange);
          }
        } catch (cleanupError) {
          console.error('AtomixGlass: Error cleaning up media query listeners:', cleanupError);
        }
      };
    } catch (error) {
      console.error('AtomixGlass: Error setting up media queries:', error);
      return undefined;
    }
  }, [overLight, glassRef, debugOverLight]);

  // OverLight config helpers
  const getEffectiveOverLight = useCallback(() => {
    if (typeof overLight === 'boolean') {
      return overLight;
    }
    if (overLight === 'auto') {
      return detectedOverLight;
    }
    if (typeof overLight === 'object' && overLight !== null) {
      return detectedOverLight;
    }
    return false;
  }, [overLight, detectedOverLight]);

  const validateConfigValue = useCallback(
    (value: unknown, min: number, max: number, defaultValue: number): number => {
      if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
        return defaultValue;
      }
      return Math.min(max, Math.max(min, value));
    },
    []
  );

  const calculateOverLightConfig = (currentMouseOffset: MousePosition) => {
    const isOverLight = getEffectiveOverLight();
    const mouseInfluence = calculateMouseInfluence(currentMouseOffset);
    const hoverIntensity = isHoveredRef.current ? 1.4 : 1;
    const activeIntensity = isActiveRef.current ? 1.6 : 1;

    const baseOpacity = isOverLight
      ? Math.min(0.6, Math.max(0.2, 0.5 * hoverIntensity * activeIntensity))
      : 0;

    const baseConfig = {
      isOverLight,
      threshold: 0.7,
      opacity: baseOpacity,
      contrast: Math.min(1.6, Math.max(1.0, 1.4 + mouseInfluence * 0.1)),
      brightness: Math.min(1.1, Math.max(0.8, 0.9 + mouseInfluence * 0.05)),
      saturationBoost: 1.3,
      shadowIntensity: Math.min(1.2, Math.max(0.5, 0.9 + mouseInfluence * 0.2)),
      borderOpacity: Math.min(1.0, Math.max(0.3, 0.7 + mouseInfluence * 0.1)),
    };

    if (typeof overLight === 'object' && overLight !== null) {
      const objConfig = overLight as OverLightObjectConfig;

      const validatedThreshold = validateConfigValue(
        objConfig.threshold,
        0.1,
        1.0,
        baseConfig.threshold
      );
      const validatedOpacity = validateConfigValue(objConfig.opacity, 0.1, 1.0, baseConfig.opacity);
      const validatedContrast = validateConfigValue(
        objConfig.contrast,
        0.5,
        2.5,
        baseConfig.contrast
      );
      const validatedBrightness = validateConfigValue(
        objConfig.brightness,
        0.5,
        2.0,
        baseConfig.brightness
      );
      const validatedSaturationBoost = validateConfigValue(
        objConfig.saturationBoost,
        0.5,
        3.0,
        baseConfig.saturationBoost
      );

      return {
        ...baseConfig,
        threshold: validatedThreshold,
        opacity: validatedOpacity * hoverIntensity * activeIntensity,
        contrast: Math.min(1.6, validatedContrast + mouseInfluence * 0.1),
        brightness: Math.min(1.1, validatedBrightness + mouseInfluence * 0.05),
        saturationBoost: validatedSaturationBoost,
      };
    }

    return baseConfig;
  };

  const overLightConfig = useMemo(() => {
    return calculateOverLightConfig(mouseOffset);
  }, [
    overLight,
    getEffectiveOverLight,
    mouseOffset,
    isHovered,
    isActive,
    validateConfigValue,
    debugOverLight,
  ]);

  // Mouse tracking using shared global tracker
  // Cache bounding rect to avoid repeated getBoundingClientRect calls
  const cachedRectRef = useRef<DOMRect | null>(null);
  const updateRectRef = useRef<number | null>(null);

  // Handle mouse position updates from shared tracker
  const handleGlobalMousePosition = useCallback(
    (globalPos: MousePosition) => {
      if (externalGlobalMousePosition && externalMouseOffset) {
        // External mouse position provided, skip internal tracking
        return;
      }

      if (effectiveDisableEffects) {
        return;
      }

      const container = mouseContainer?.current || glassRef.current;
      if (!container) {
        return;
      }

      // Use cached rect if available, otherwise get new one
      let rect = cachedRectRef.current;
      if (!rect || rect.width === 0 || rect.height === 0) {
        rect = container.getBoundingClientRect();
        cachedRectRef.current = rect;
      }

      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      const center = calculateElementCenter(rect);

      // Calculate offset relative to this container
      const newOffset = {
        x: ((globalPos.x - center.x) / rect.width) * 100,
        y: ((globalPos.y - center.y) / rect.height) * 100,
      };

      // Direct DOM manipulation instead of state updates to improve performance
      globalMousePositionRef.current = globalPos;
      mouseOffsetRef.current = newOffset;

      // Calculate derived values for styles
      const currentOverLightConfig = calculateOverLightConfig(newOffset);
      const isOverLight = currentOverLightConfig.isOverLight;

      // Helper for transform
      const calculateDirectionalScale = (): string => {
        const isOverLightActive =
          overLight === true ||
          (overLight === 'auto' && detectedOverLight) ||
          (typeof overLight === 'object' && overLight !== null && detectedOverLight);

        if (isOverLightActive) {
          return 'scale(1)';
        }

        if (!globalPos.x || !globalPos.y || !glassRef.current || !validateGlassSize(glassSize)) {
          return 'scale(1)';
        }

        const deltaX = globalPos.x - center.x;
        const deltaY = globalPos.y - center.y;
        const edgeDistanceX = Math.max(0, Math.abs(deltaX) - glassSize.width / 2);
        const edgeDistanceY = Math.max(0, Math.abs(deltaY) - glassSize.height / 2);
        const edgeDistance = calculateDistance(
          { x: edgeDistanceX, y: edgeDistanceY },
          { x: 0, y: 0 }
        );

        if (edgeDistance > CONSTANTS.ACTIVATION_ZONE) {
          return 'scale(1)';
        }

        const fadeInFactor = 1 - edgeDistance / CONSTANTS.ACTIVATION_ZONE;
        const centerDistance = calculateDistance(globalPos, center);

        if (centerDistance === 0) {
          return 'scale(1)';
        }

        const normalizedX = deltaX / centerDistance;
        const normalizedY = deltaY / centerDistance;
        const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity * fadeInFactor;

        const scaleX =
          1 +
          Math.abs(normalizedX) * stretchIntensity * 0.3 -
          Math.abs(normalizedY) * stretchIntensity * 0.15;
        const scaleY =
          1 +
          Math.abs(normalizedY) * stretchIntensity * 0.3 -
          Math.abs(normalizedX) * stretchIntensity * 0.15;

        return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
      };

      const calculateElasticTranslation = () => {
        const fadeInFactor = (() => {
          const deltaX = globalPos.x - center.x;
          const deltaY = globalPos.y - center.y;
          const edgeDistanceX = Math.max(0, Math.abs(deltaX) - glassSize.width / 2);
          const edgeDistanceY = Math.max(0, Math.abs(deltaY) - glassSize.height / 2);
          const edgeDistance = calculateDistance(
            { x: edgeDistanceX, y: edgeDistanceY },
            { x: 0, y: 0 }
          );

          return edgeDistance > CONSTANTS.ACTIVATION_ZONE
            ? 0
            : 1 - edgeDistance / CONSTANTS.ACTIVATION_ZONE;
        })();

        return {
          x: (globalPos.x - center.x) * elasticity * 0.1 * fadeInFactor,
          y: (globalPos.y - center.y) * elasticity * 0.1 * fadeInFactor,
        };
      };

      const elasticTranslation = calculateElasticTranslation();
      const directionalScale = calculateDirectionalScale();

      const transformStyle = effectiveDisableEffects
        ? isActiveRef.current && Boolean(onClick)
          ? 'scale(0.98)'
          : 'scale(1)'
        : `translate(${elasticTranslation.x}px, ${elasticTranslation.y}px) ${isActiveRef.current && Boolean(onClick) ? 'scale(0.96)' : directionalScale}`;

      // Update positionStyles (static part mostly)
      const positionStyles = {
        position: (style.position || 'absolute') as React.CSSProperties['position'],
        top: style.top || 0,
        left: style.left || 0,
      };

      const adjustedSize = {
        width:
          style.position !== 'fixed'
            ? '100%'
            : style.width
              ? style.width
              : Math.max(glassSize.width, 0),
        height:
          style.position !== 'fixed'
            ? '100%'
            : style.height
              ? style.height
              : Math.max(glassSize.height, 0),
      };

      const glassVars = calculateGlassVars({
        mouseOffset: newOffset,
        overLightConfig: currentOverLightConfig,
        effectiveCornerRadius,
        transformStyle,
        adjustedSize,
        positionStyles,
        style,
        isOverLight,
        isActive: isActiveRef.current,
        isHovered: isHoveredRef.current,
      });

      const containerVars = calculateContainerVars({
        mouseOffset: newOffset,
        glassSize,
        padding,
        cornerRadius: effectiveCornerRadius,
        overLightConfig: currentOverLightConfig,
        isOverLight,
        effectiveDisableEffects,
        effectiveReducedMotion,
        enableLiquidBlur,
        blurAmount,
        saturation,
      });

      // Apply styles to elements
      if (glassRef.current) {
        // Apply transform to container (since it's the one receiving the transform in AtomixGlass)
        // Actually, AtomixGlassContainer receives baseStyle which includes transform.
        glassRef.current.style.transform = transformStyle;

        // Apply container vars to container
        Object.entries(containerVars).forEach(([key, value]) => {
          if (value !== undefined) {
            glassRef.current!.style.setProperty(key, String(value));
          }
        });

        // Apply glass vars to wrapper (parent)
        const wrapper = glassRef.current.parentElement;
        if (wrapper) {
          Object.entries(glassVars).forEach(([key, value]) => {
            if (value !== undefined) {
              wrapper.style.setProperty(key, String(value));
            }
          });
        }
      }
    },
    [
      mouseContainer,
      glassRef,
      externalGlobalMousePosition,
      externalMouseOffset,
      effectiveDisableEffects,
      glassSize,
      overLight,
      detectedOverLight,
      elasticity,
      validateConfigValue,
      getEffectiveOverLight,
      effectiveCornerRadius,
      style,
      padding,
      effectiveReducedMotion,
      enableLiquidBlur,
      blurAmount,
      saturation,
      isActive, // Re-bind if isActive changes, but isActiveRef is used inside.
      isHovered, // Same
    ]
  );

  // Subscribe to shared mouse tracker
  useEffect(() => {
    if (externalGlobalMousePosition && externalMouseOffset) {
      // External mouse position provided, don't subscribe
      return undefined;
    }

    if (effectiveDisableEffects) {
      // Effects disabled, don't subscribe
      return undefined;
    }

    // Subscribe to shared tracker
    const unsubscribe = globalMouseTracker.subscribe(handleGlobalMousePosition);

    // Update cached rect when container size changes
    const updateRect = () => {
      if (updateRectRef.current !== null) {
        cancelAnimationFrame(updateRectRef.current);
      }
      updateRectRef.current = requestAnimationFrame(() => {
        const container = mouseContainer?.current || glassRef.current;
        if (container) {
          cachedRectRef.current = container.getBoundingClientRect();
        }
        updateRectRef.current = null;
      });
    };

    // Use ResizeObserver to update cached rect when container size changes
    const container = mouseContainer?.current || glassRef.current;
    let resizeObserver: ResizeObserver | null = null;

    if (container && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateRect);
      resizeObserver.observe(container);
    }

    return () => {
      unsubscribe();
      if (updateRectRef.current !== null) {
        cancelAnimationFrame(updateRectRef.current);
        updateRectRef.current = null;
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [
    handleGlobalMousePosition,
    mouseContainer,
    glassRef,
    externalGlobalMousePosition,
    externalMouseOffset,
    effectiveDisableEffects,
  ]);

  // Transform calculations
  const calculateDirectionalScale = useCallback(() => {
    // Disable directional scaling if overLight is active (to prevent zooming/distorting the premium glass effect)
    const isOverLightActive =
      overLight === true ||
      (overLight === 'auto' && detectedOverLight) ||
      (typeof overLight === 'object' && overLight !== null && detectedOverLight);

    if (isOverLightActive) {
      return 'scale(1)';
    }

    if (
      !globalMousePosition.x ||
      !globalMousePosition.y ||
      !glassRef.current ||
      !validateGlassSize(glassSize)
    ) {
      return 'scale(1)';
    }

    const rect = glassRef.current.getBoundingClientRect();
    const center = calculateElementCenter(rect);
    const deltaX = globalMousePosition.x - center.x;
    const deltaY = globalMousePosition.y - center.y;

    const edgeDistanceX = Math.max(0, Math.abs(deltaX) - glassSize.width / 2);
    const edgeDistanceY = Math.max(0, Math.abs(deltaY) - glassSize.height / 2);
    const edgeDistance = calculateDistance({ x: edgeDistanceX, y: edgeDistanceY }, { x: 0, y: 0 });

    if (edgeDistance > CONSTANTS.ACTIVATION_ZONE) {
      return 'scale(1)';
    }

    const fadeInFactor = 1 - edgeDistance / CONSTANTS.ACTIVATION_ZONE;
    const centerDistance = calculateDistance(globalMousePosition, center);

    if (centerDistance === 0) {
      return 'scale(1)';
    }

    const normalizedX = deltaX / centerDistance;
    const normalizedY = deltaY / centerDistance;
    const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity * fadeInFactor;

    const scaleX =
      1 +
      Math.abs(normalizedX) * stretchIntensity * 0.3 -
      Math.abs(normalizedY) * stretchIntensity * 0.15;
    const scaleY =
      1 +
      Math.abs(normalizedY) * stretchIntensity * 0.3 -
      Math.abs(normalizedX) * stretchIntensity * 0.15;

    return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
  }, [globalMousePosition, elasticity, glassSize, glassRef, overLight, detectedOverLight]);

  const calculateFadeInFactor = useCallback(() => {
    if (
      !globalMousePosition.x ||
      !globalMousePosition.y ||
      !glassRef.current ||
      !validateGlassSize(glassSize)
    ) {
      return 0;
    }

    const rect = glassRef.current.getBoundingClientRect();
    const center = calculateElementCenter(rect);

    const edgeDistanceX = Math.max(
      0,
      Math.abs(globalMousePosition.x - center.x) - glassSize.width / 2
    );
    const edgeDistanceY = Math.max(
      0,
      Math.abs(globalMousePosition.y - center.y) - glassSize.height / 2
    );
    const edgeDistance = calculateDistance({ x: edgeDistanceX, y: edgeDistanceY }, { x: 0, y: 0 });

    return edgeDistance > CONSTANTS.ACTIVATION_ZONE
      ? 0
      : 1 - edgeDistance / CONSTANTS.ACTIVATION_ZONE;
  }, [globalMousePosition, glassSize, glassRef]);

  const calculateElasticTranslation = useCallback(() => {
    if (!glassRef.current) {
      return { x: 0, y: 0 };
    }

    const fadeInFactor = calculateFadeInFactor();
    const rect = glassRef.current.getBoundingClientRect();
    const center = calculateElementCenter(rect);

    return {
      x: (globalMousePosition.x - center.x) * elasticity * 0.1 * fadeInFactor,
      y: (globalMousePosition.y - center.y) * elasticity * 0.1 * fadeInFactor,
    };
  }, [globalMousePosition, elasticity, calculateFadeInFactor, glassRef]);

  const elasticTranslation = useMemo(() => {
    if (effectiveDisableEffects) {
      return { x: 0, y: 0 };
    }
    return calculateElasticTranslation();
  }, [calculateElasticTranslation, effectiveDisableEffects]);

  const directionalScale = useMemo(() => {
    if (effectiveDisableEffects) {
      return 'scale(1)';
    }
    return calculateDirectionalScale();
  }, [calculateDirectionalScale, effectiveDisableEffects]);

  const transformStyle = useMemo(() => {
    if (effectiveDisableEffects) {
      return isActive && Boolean(onClick) ? 'scale(0.98)' : 'scale(1)';
    }
    return `translate(${elasticTranslation.x}px, ${elasticTranslation.y}px) ${isActive && Boolean(onClick) ? 'scale(0.96)' : directionalScale}`;
  }, [elasticTranslation, isActive, onClick, directionalScale, effectiveDisableEffects]);

  // Size management
  useEffect(() => {
    const isValidElement = (element: HTMLElement | null): element is HTMLElement =>
      element !== null && element instanceof HTMLElement && element.isConnected;

    const validateSize = (size: GlassSize): boolean =>
      validateGlassSize(size) &&
      size.width <= CONSTANTS.MAX_SIZE &&
      size.height <= CONSTANTS.MAX_SIZE;

    let rafId: number | null = null;
    let lastSize = { width: 0, height: 0 };
    let lastCornerRadius = effectiveCornerRadius;

    const updateGlassSize = (forceUpdate = false): void => {
      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (!isValidElement(glassRef.current)) {
          rafId = null;
          return;
        }

        const rect = glassRef.current.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
          rafId = null;
          return;
        }

        // Measure actual rendered size without artificial offsets to avoid feedback loops
        const newSize: GlassSize = {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };

        const cornerRadiusChanged = lastCornerRadius !== effectiveCornerRadius;
        const dimensionsChanged =
          Math.abs(newSize.width - lastSize.width) > 1 ||
          Math.abs(newSize.height - lastSize.height) > 1;

        if ((forceUpdate || cornerRadiusChanged || dimensionsChanged) && validateSize(newSize)) {
          lastSize = newSize;
          lastCornerRadius = effectiveCornerRadius;
          setGlassSize(newSize);
        }

        rafId = null;
      });
    };

    let resizeTimeoutId: NodeJS.Timeout | null = null;
    const debouncedResizeHandler = (): void => {
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(() => updateGlassSize(false), 16);
    };

    const initialTimeoutId = setTimeout(() => updateGlassSize(true), 0);

    let resizeObserver: ResizeObserver | null = null;
    let resizeDebounceTimeout: NodeJS.Timeout | null = null;

    // ResizeObserver has 98%+ browser support, no need for fallback
    if (typeof ResizeObserver !== 'undefined' && isValidElement(glassRef.current)) {
      try {
        resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target === glassRef.current) {
              // Update cached rect when size changes
              if (glassRef.current) {
                cachedRectRef.current = glassRef.current.getBoundingClientRect();
              }
              // Debounce resize updates to match RAF timing (16ms)
              if (resizeDebounceTimeout) clearTimeout(resizeDebounceTimeout);
              resizeDebounceTimeout = setTimeout(() => updateGlassSize(false), 16);
              break;
            }
          }
        });
        resizeObserver.observe(glassRef.current);
      } catch (error) {
        console.warn('AtomixGlass: ResizeObserver not available, using window resize only', error);
      }
    }

    window.addEventListener('resize', debouncedResizeHandler, { passive: true });

    return () => {
      clearTimeout(initialTimeoutId);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      if (resizeDebounceTimeout) clearTimeout(resizeDebounceTimeout);
      window.removeEventListener('resize', debouncedResizeHandler);
      resizeObserver?.disconnect();
    };
  }, [effectiveCornerRadius, glassRef]);

  // Event handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleMouseDown = useCallback(() => setIsActive(true), []);
  const handleMouseUp = useCallback(() => setIsActive(false), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return {
    // State
    isHovered,
    isActive,
    glassSize,
    dynamicCornerRadius,
    effectiveCornerRadius,
    effectiveReducedMotion,
    effectiveHighContrast,
    effectiveDisableEffects,
    detectedOverLight,
    globalMousePosition,
    mouseOffset,

    // OverLight config
    overLightConfig,

    // Transform calculations
    elasticTranslation,
    directionalScale,
    transformStyle,

    // Event handlers
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
  };
}
