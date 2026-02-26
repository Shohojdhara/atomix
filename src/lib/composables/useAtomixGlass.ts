import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  AtomixGlassProps,
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
import { updateAtomixGlassStyles } from './useAtomixGlassStyles';

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

interface UseAtomixGlassOptions extends Omit<AtomixGlassProps, 'children'> {
  glassRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

interface UseAtomixGlassReturn {
  // State
  isHovered: boolean;
  isActive: boolean;
  glassSize: GlassSize;
  dynamicBorderRadius: number;
  effectiveBorderRadius: number;
  effectiveReducedMotion: boolean;
  effectiveHighContrast: boolean;
  effectiveWithoutEffects: boolean;
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
  handleMouseMove: (e: MouseEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Composable hook for AtomixGlass component logic
 * Manages all state, calculations, and event handlers
 */
export function useAtomixGlass({
  glassRef,
  contentRef,
  wrapperRef,
  borderRadius,
  globalMousePosition: externalGlobalMousePosition,
  mouseOffset: externalMouseOffset,
  mouseContainer,
  overLight = ATOMIX_GLASS.DEFAULTS.OVER_LIGHT,
  reducedMotion = false,
  highContrast = false,
  withoutEffects = false,
  elasticity = 0.05,
  onClick,
  debugBorderRadius = false,
  debugOverLight = false,
  debugPerformance = false,
  children,
  blurAmount,
  saturation,
  padding,
  withLiquidBlur,
}: UseAtomixGlassOptions): UseAtomixGlassReturn {
  // State
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [glassSize, setGlassSize] = useState<GlassSize>({ width: 270, height: 69 });

  // Use refs for mouse position to avoid re-renders
  const internalGlobalMousePositionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const internalMouseOffsetRef = useRef<MousePosition>({ x: 0, y: 0 });

  const [dynamicBorderRadius, setDynamicCornerRadius] = useState<number>(
    CONSTANTS.DEFAULT_CORNER_RADIUS
  );
  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState(false);
  const [userPrefersHighContrast, setUserPrefersHighContrast] = useState(false);
  const [detectedOverLight, setDetectedOverLight] = useState(false);

  // Memoized derived values
  const effectiveBorderRadius = useMemo(() => {
    if (borderRadius !== undefined) {
      const result = Math.max(0, borderRadius);
      return result;
    }
    const result = Math.max(0, dynamicBorderRadius);
    return result;
  }, [borderRadius, dynamicBorderRadius]);

  const effectiveReducedMotion = useMemo(
    () => reducedMotion || userPrefersReducedMotion,
    [reducedMotion, userPrefersReducedMotion]
  );

  const effectiveHighContrast = useMemo(
    () => highContrast || userPrefersHighContrast,
    [highContrast, userPrefersHighContrast]
  );

  const effectiveWithoutEffects = useMemo(
    () => withoutEffects || effectiveReducedMotion,
    [withoutEffects, effectiveReducedMotion]
  );

  // Return static/initial values for rendering, but internal updates use refs
  const globalMousePosition = externalGlobalMousePosition || internalGlobalMousePositionRef.current;
  const mouseOffset = externalMouseOffset || internalMouseOffsetRef.current;

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
        if ((typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') && debugBorderRadius) {
          console.error('[AtomixGlass] Error extracting corner radius:', error);
        }
      }
    };

    extractRadius();
    const timeoutId = setTimeout(extractRadius, 100);
    return () => clearTimeout(timeoutId);
  }, [children, debugBorderRadius, contentRef]);

  // Media query handlers and background detection
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

                  if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
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

              if (bgImage && bgImage !== 'none' && bgImage !== 'initial') {
                totalLuminance += 0.5;
                validSamples++;
                hasValidBackground = true;
              }
            } catch (styleError) {
                // Silently continue
            }

            if (currentElement) {
              currentElement = currentElement.parentElement;
              depth++;
            } else {
              break;
            }
          }

          if (hasValidBackground && validSamples > 0) {
            const avgLuminance = totalLuminance / validSamples;
            if (!isNaN(avgLuminance) && isFinite(avgLuminance)) {
              let threshold = 0.7;

              if (typeof overLight === 'object' && overLight !== null) {
                const objConfig = overLight as OverLightObjectConfig;
                if (objConfig.threshold !== undefined) {
                    const configThreshold = typeof objConfig.threshold === 'number' && !isNaN(objConfig.threshold) ? objConfig.threshold : 0.7;
                  threshold = Math.min(0.9, Math.max(0.1, configThreshold));
                }
              }

              const isOverLightDetected = avgLuminance > threshold;
              setCachedBackgroundDetection(element.parentElement, overLight, isOverLightDetected, threshold);
              setDetectedOverLight(isOverLightDetected);
            } else {
              const result = false;
              const threshold = typeof overLight === 'object' && overLight !== null
                ? (overLight as OverLightObjectConfig).threshold || 0.7
                : 0.7;
              setCachedBackgroundDetection(element.parentElement, overLight, result, threshold);
              setDetectedOverLight(result);
            }
          } else {
            const result = false;
            const threshold = typeof overLight === 'object' && overLight !== null
              ? (overLight as OverLightObjectConfig).threshold || 0.7
              : 0.7;
            setCachedBackgroundDetection(element.parentElement, overLight, result, threshold);
            setDetectedOverLight(result);
          }
        } catch (error) {
          const result = false;
          setDetectedOverLight(result);
        }
      }, 150);

      return () => clearTimeout(timeoutId);
    } else if (typeof overLight === 'boolean') {
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
            // cleanup
        } catch (cleanupError) {
          // ignore
        }
      };
    } catch (error) {
      return undefined;
    }
  }, [overLight, glassRef, debugOverLight]);

  /**
   * Get effective overLight value based on configuration
   */
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

  /**
   * Validate and clamp a numeric config value
   */
  const validateConfigValue = useCallback(
    (value: unknown, min: number, max: number, defaultValue: number): number => {
      if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
        return defaultValue;
      }
      return Math.min(max, Math.max(min, value));
    },
    []
  );

  // Calculate Base OverLight Config (without mouse influence)
  const baseOverLightConfig = useMemo(() => {
    const isOverLight = getEffectiveOverLight();
    // Use static mouse influence for base config
    const mouseInfluence = 0;

    const baseOpacity = isOverLight ? Math.min(0.6, Math.max(0.2, 0.5)) : 0;

    const baseConfig = {
      isOverLight,
      threshold: 0.7,
      opacity: baseOpacity,
      contrast: 1, // Base contrast
      brightness: 1, // Base brightness
      saturationBoost: 1.3,
      shadowIntensity: 0.9,
      borderOpacity: 0.7,
    };

    if (typeof overLight === 'object' && overLight !== null) {
      const objConfig = overLight as OverLightObjectConfig;

      const validatedThreshold = validateConfigValue(objConfig.threshold, 0.1, 1.0, baseConfig.threshold);
      const validatedOpacity = validateConfigValue(objConfig.opacity, 0.1, 1.0, baseConfig.opacity);
      const validatedContrast = validateConfigValue(objConfig.contrast, 0.5, 2.5, baseConfig.contrast);
      const validatedBrightness = validateConfigValue(objConfig.brightness, 0.5, 2.0, baseConfig.brightness);
      const validatedSaturationBoost = validateConfigValue(objConfig.saturationBoost, 0.5, 3.0, baseConfig.saturationBoost);

      return {
        ...baseConfig,
        threshold: validatedThreshold,
        opacity: validatedOpacity,
        contrast: validatedContrast,
        brightness: validatedBrightness,
        saturationBoost: validatedSaturationBoost,
      };
    }

    return baseConfig;
  }, [overLight, getEffectiveOverLight, validateConfigValue]);

  // Calculate Effective OverLight Config (for component return value, static mouse influence for initial render)
  const overLightConfig = useMemo(() => {
    const mouseInfluence = calculateMouseInfluence(mouseOffset);
    const hoverIntensity = isHovered ? 1.4 : 1;
    const activeIntensity = isActive ? 1.6 : 1;

    return {
        isOverLight: baseOverLightConfig.isOverLight,
        threshold: baseOverLightConfig.threshold,
        opacity: baseOverLightConfig.opacity * hoverIntensity * activeIntensity,
        contrast: Math.min(1.6, baseOverLightConfig.contrast + mouseInfluence * 0.1),
        brightness: Math.min(1.1, baseOverLightConfig.brightness + mouseInfluence * 0.05),
        saturationBoost: baseOverLightConfig.saturationBoost,
        shadowIntensity: Math.min(1.2, Math.max(0.5, baseOverLightConfig.shadowIntensity + mouseInfluence * 0.2)),
        borderOpacity: Math.min(1.0, Math.max(0.3, baseOverLightConfig.borderOpacity + mouseInfluence * 0.1)),
    };
  }, [baseOverLightConfig, mouseOffset, isHovered, isActive]);

  // Mouse tracking
  const cachedRectRef = useRef<DOMRect | null>(null);
  const updateRectRef = useRef<number | null>(null);

  // Derived values for imperative updates (we can use memoized ones or re-calculate)
  // Since updateAtomixGlassStyles is called imperatively, we pass current refs and state

  // Transform calculations for initial render
  const calculateDirectionalScale = useCallback(() => {
    const isOverLightActive = baseOverLightConfig.isOverLight;

    if (isOverLightActive) {
      return 'scale(1)';
    }

    if (!globalMousePosition.x || !globalMousePosition.y || !glassRef.current || !validateGlassSize(glassSize)) {
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

    const scaleX = 1 + Math.abs(normalizedX) * stretchIntensity * 0.3 - Math.abs(normalizedY) * stretchIntensity * 0.15;
    const scaleY = 1 + Math.abs(normalizedY) * stretchIntensity * 0.3 - Math.abs(normalizedX) * stretchIntensity * 0.15;

    return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
  }, [globalMousePosition, elasticity, glassSize, glassRef, baseOverLightConfig]);

  const calculateFadeInFactor = useCallback(() => {
    if (!globalMousePosition.x || !globalMousePosition.y || !glassRef.current || !validateGlassSize(glassSize)) {
      return 0;
    }

    const rect = glassRef.current.getBoundingClientRect();
    const center = calculateElementCenter(rect);

    const edgeDistanceX = Math.max(0, Math.abs(globalMousePosition.x - center.x) - glassSize.width / 2);
    const edgeDistanceY = Math.max(0, Math.abs(globalMousePosition.y - center.y) - glassSize.height / 2);
    const edgeDistance = calculateDistance({ x: edgeDistanceX, y: edgeDistanceY }, { x: 0, y: 0 });

    return edgeDistance > CONSTANTS.ACTIVATION_ZONE ? 0 : 1 - edgeDistance / CONSTANTS.ACTIVATION_ZONE;
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
    if (effectiveWithoutEffects) {
      return { x: 0, y: 0 };
    }
    return calculateElasticTranslation();
  }, [calculateElasticTranslation, effectiveWithoutEffects]);

  const directionalScale = useMemo(() => {
    if (effectiveWithoutEffects) {
      return 'scale(1)';
    }
    return calculateDirectionalScale();
  }, [calculateDirectionalScale, effectiveWithoutEffects]);

  const transformStyle = useMemo(() => {
    if (effectiveWithoutEffects) {
      return isActive && Boolean(onClick) ? 'scale(0.98)' : 'scale(1)';
    }
    return `translate(${elasticTranslation.x}px, ${elasticTranslation.y}px) ${isActive && Boolean(onClick) ? 'scale(0.96)' : directionalScale}`;
  }, [elasticTranslation, isActive, onClick, directionalScale, effectiveWithoutEffects]);

  // Handle mouse position updates
  const handleGlobalMousePosition = useCallback(
    (globalPos: MousePosition) => {
      if (externalGlobalMousePosition && externalMouseOffset) {
        return;
      }

      if (effectiveWithoutEffects) {
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

      // Store in refs instead of state
      internalMouseOffsetRef.current = newOffset;
      internalGlobalMousePositionRef.current = globalPos;

      // Imperative style update
      updateAtomixGlassStyles(
        wrapperRef?.current || null,
        glassRef.current,
        {
            mouseOffset: newOffset,
            globalMousePosition: globalPos,
            glassSize,
            isHovered,
            isActive,
            isOverLight: baseOverLightConfig.isOverLight,
            baseOverLightConfig,
            effectiveBorderRadius,
            effectiveWithoutEffects,
            effectiveReducedMotion,
            elasticity,
            directionalScale: isActive && Boolean(onClick) ? 'scale(0.96)' : 'scale(1)', // Simplified directional scale for fast path
            onClick,
            withLiquidBlur,
            blurAmount,
            saturation,
            padding,
        }
      );
    },
    [
      mouseContainer,
      glassRef,
      wrapperRef,
      externalGlobalMousePosition,
      externalMouseOffset,
      effectiveWithoutEffects,
      glassSize,
      isHovered,
      isActive,
      baseOverLightConfig,
      effectiveBorderRadius,
      effectiveReducedMotion,
      elasticity,
      onClick,
      withLiquidBlur,
      blurAmount,
      saturation,
      padding
    ]
  );

  // Subscribe to shared mouse tracker
  useEffect(() => {
    if (externalGlobalMousePosition && externalMouseOffset) {
      return undefined;
    }

    if (effectiveWithoutEffects) {
      return undefined;
    }

    const unsubscribe = globalMouseTracker.subscribe(handleGlobalMousePosition);

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
    effectiveWithoutEffects,
  ]);

  // Also call updateStyles on other state changes (hover, active, etc)
  useEffect(() => {
    updateAtomixGlassStyles(
        wrapperRef?.current || null,
        glassRef.current,
        {
            mouseOffset: externalMouseOffset || internalMouseOffsetRef.current,
            globalMousePosition: externalGlobalMousePosition || internalGlobalMousePositionRef.current,
            glassSize,
            isHovered,
            isActive,
            isOverLight: baseOverLightConfig.isOverLight,
            baseOverLightConfig,
            effectiveBorderRadius,
            effectiveWithoutEffects,
            effectiveReducedMotion,
            elasticity,
            directionalScale,
            onClick,
            withLiquidBlur,
            blurAmount,
            saturation,
            padding,
        }
      );
  }, [
    isHovered,
    isActive,
    glassSize,
    baseOverLightConfig,
    effectiveBorderRadius,
    effectiveWithoutEffects,
    effectiveReducedMotion,
    elasticity,
    directionalScale,
    wrapperRef,
    glassRef,
    externalMouseOffset,
    externalGlobalMousePosition,
    withLiquidBlur,
    blurAmount,
    saturation,
    padding,
    onClick
  ]);

  // Event handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleMouseDown = useCallback(() => setIsActive(true), []);
  const handleMouseUp = useCallback(() => setIsActive(false), []);

  const handleMouseMove = useCallback((_e: MouseEvent) => {
    // Mouse tracking handled by shared global tracker
  }, []);

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
    isHovered,
    isActive,
    glassSize,
    dynamicBorderRadius,
    effectiveBorderRadius,
    effectiveReducedMotion,
    effectiveHighContrast,
    effectiveWithoutEffects,
    detectedOverLight,
    globalMousePosition, // This is now static (refs or props) unless prop changes
    mouseOffset,         // This is now static (refs or props) unless prop changes
    overLightConfig,
    elasticTranslation,
    directionalScale,
    transformStyle,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleKeyDown,
  };
}