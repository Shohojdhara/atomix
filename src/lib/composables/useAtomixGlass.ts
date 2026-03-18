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
  calculateElementCenter,
  calculateMouseInfluence,
  extractBorderRadiusFromChildren,
  extractBorderRadiusFromDOMElement,
  validateGlassSize,
  lerp,
} from '../../components/AtomixGlass/glass-utils';
import { updateAtomixGlassStyles } from './useAtomixGlassStyles';
// Phase 1: Time-Based Animation System
import {
  createAnimationLoop,
  createFBMEngine,
  getFBMConfigForQuality,
  liquidGlassWithTime,
} from '../../components/AtomixGlass/animation-system';

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
  isFixedOrSticky?: boolean;
  // Phase 1: Time-Based Animation System
  withLiquidBlur?: boolean;
  animationQuality?: 'low' | 'medium' | 'high';
  timeSpeed?: number;
  noiseAmplitude?: number;
  noiseFrequency?: number;
  displacementStrength?: number;
  // Phase 1: Animation props (from AtomixGlassProps)
  withTimeAnimation?: boolean;
  animationSpeed?: number;
  withMultiLayerDistortion?: boolean;
  distortionOctaves?: number;
  distortionLacunarity?: number;
  distortionGain?: number;
  distortionQuality?: 'low' | 'medium' | 'high' | 'ultra';
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
  transformStyle: string;

  // Phase 1: Animation System - Shader time control
  getShaderTime: () => number;
  applyTimeBasedDistortion: (uv: { x: number; y: number }) => { x: number; y: number };

  // Event handlers
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

import { useGlassSize } from './atomix-glass/useGlassSize';

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
  children,
  blurAmount,
  saturation,
  padding,
  withLiquidBlur,
  isFixedOrSticky = false,
  // Phase 1: Animation System Props
  withTimeAnimation = ATOMIX_GLASS.DEFAULTS.WITH_TIME_ANIMATION,
  animationSpeed = ATOMIX_GLASS.DEFAULTS.ANIMATION_SPEED,
  withMultiLayerDistortion = ATOMIX_GLASS.DEFAULTS.WITH_MULTI_LAYER_DISTORTION,
  distortionOctaves = ATOMIX_GLASS.DEFAULTS.DISTORTION_OCTAVES,
  distortionLacunarity = ATOMIX_GLASS.DEFAULTS.DISTORTION_LACUNARITY,
  distortionGain = ATOMIX_GLASS.DEFAULTS.DISTORTION_GAIN,
  distortionQuality = ATOMIX_GLASS.DEFAULTS.DISTORTION_QUALITY,
}: UseAtomixGlassOptions): UseAtomixGlassReturn {
  // State
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Mouse tracking refs
  const cachedRectRef = useRef<DOMRect | null>(null);
  const internalGlobalMousePositionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const internalMouseOffsetRef = useRef<MousePosition>({ x: 0, y: 0 });

  // ── Lerp smoothing refs ───────────────────────────────────────────────
  // Target positions that raw mouse events write to;
  // the lerp loop continuously interpolates the "current" refs toward these.
  const targetMouseOffsetRef = useRef<MousePosition>({ x: 0, y: 0 });
  const targetGlobalMousePositionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const lerpRafRef = useRef<number | null>(null);
  const lerpActiveRef = useRef(false);

  const [dynamicBorderRadius, setDynamicCornerRadius] = useState<number>(
    CONSTANTS.DEFAULT_CORNER_RADIUS
  );
  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState(false);
  const [userPrefersHighContrast, setUserPrefersHighContrast] = useState(false);
  const [detectedOverLight, setDetectedOverLight] = useState(false);

  // ============================================================================
  // Phase 1: Time-Based Animation System (Feature 1.1)
  // ============================================================================

  // Animation state refs
  const animationFrameIdRef = useRef<number | null>(null);
  const animationStartTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);
  const shaderTimeRef = useRef<number>(0);

  /**
   * Get FBM configuration based on quality preset or custom values
   */
  const fbmConfig = useMemo(() => {
    // If quality preset is provided, use it as base
    const preset = getFBMConfigForQuality(distortionQuality);
    
    // Override with custom values if provided
    return {
      octaves: distortionOctaves ?? preset.octaves,
      lacunarity: distortionLacunarity ?? preset.lacunarity,
      gain: distortionGain ?? preset.gain,
    };
  }, [distortionQuality, distortionOctaves, distortionLacunarity, distortionGain]);

  /**
   * Create FBM engine for multi-layer distortion
   */
  const fbmEngine = useMemo(() => {
    if (!withMultiLayerDistortion) return null;
    return createFBMEngine(fbmConfig);
  }, [withMultiLayerDistortion, fbmConfig]);

  /**
   * Determine effective animation settings
   */
  const effectiveReducedMotion = useMemo(
    () => reducedMotion || userPrefersReducedMotion,
    [reducedMotion, userPrefersReducedMotion]
  );

  const effectiveWithTimeAnimation = useMemo(() => {
    return withTimeAnimation && !effectiveReducedMotion;
  }, [withTimeAnimation, effectiveReducedMotion]);

  /**
   * Animation loop for time-based effects
   */
  useEffect(() => {
    if (!effectiveWithTimeAnimation || typeof window === 'undefined') {
      return undefined;
    }

    let lastFrameTime = performance.now();

    /**
     * Animation frame handler
     */
    const animate = (currentTime: number) => {
      // Calculate delta time
      const deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;

      // Apply animation speed multiplier
      const scaledDelta = deltaTime * animationSpeed;
      elapsedTimeRef.current += scaledDelta;
      shaderTimeRef.current = elapsedTimeRef.current;

      // Continue animation loop
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationStartTimeRef.current = performance.now();
    animationFrameIdRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [effectiveWithTimeAnimation, animationSpeed]);

  /**
   * Get current shader time for animations
   */
  const getShaderTime = useCallback(() => {
    return shaderTimeRef.current;
  }, []);

  /**
   * Apply time-based distortion to UV coordinates
   */
  const applyTimeBasedDistortion = useCallback(
    (uv: { x: number; y: number }): { x: number; y: number } => {
      if (!effectiveWithTimeAnimation || !fbmEngine) {
        return uv;
      }

      const time = shaderTimeRef.current;
      
      // Apply liquid glass distortion with time
      return liquidGlassWithTime(uv, time, fbmConfig);
    },
    [effectiveWithTimeAnimation, fbmEngine, fbmConfig]
  );

  // Memoized derived values
  const effectiveBorderRadius = useMemo(() => {
    if (borderRadius !== undefined) {
      const result = Math.max(0, borderRadius);
      return result;
    }
    const result = Math.max(0, dynamicBorderRadius);
    return result;
  }, [borderRadius, dynamicBorderRadius]);

  const { glassSize } = useGlassSize({ 
    glassRef, 
    effectiveBorderRadius, 
    cachedRectRef 
  });


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

  // Media query detection for reduced motion and high contrast
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

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

    mediaQueryReducedMotion.addEventListener('change', handleReducedMotionChange);
    mediaQueryHighContrast.addEventListener('change', handleHighContrastChange);

    return () => {
      mediaQueryReducedMotion.removeEventListener('change', handleReducedMotionChange);
      mediaQueryHighContrast.removeEventListener('change', handleHighContrastChange);
    };
  }, []);

  // Background detection for overLight auto-detect
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

    return undefined;
  }, [overLight, glassRef]);

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

  const overLightConfig = useMemo(() => {
    const isOverLight = getEffectiveOverLight();
    const hoverIntensity = isHovered ? 1.4 : 1;
    const activeIntensity = isActive ? 1.6 : 1;

    // More robust overlight configuration with better defaults and clamping
    const baseOpacity = isOverLight
      ? Math.min(0.6, Math.max(0.2, 0.5 * hoverIntensity * activeIntensity))
      : 0;

    const baseConfig = {
      isOverLight,
      threshold: 0.7,
      opacity: baseOpacity,
      contrast: 1.4,
      brightness: 0.9,
      saturationBoost: 1.3, // Fixed value — dynamic saturation amplifies perceived displacement
      shadowIntensity: 0.9,
      borderOpacity: 0.7,
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

      const finalConfig = {
        ...baseConfig,
        threshold: validatedThreshold,
        opacity: validatedOpacity * hoverIntensity * activeIntensity,
        contrast: validatedContrast,
        brightness: validatedBrightness,
        saturationBoost: validatedSaturationBoost,
      };

      if (
        (typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') &&
        debugOverLight
      ) {
        console.log('[AtomixGlass] OverLight Config:', {
          isOverLight,
          config: {
            threshold: finalConfig.threshold.toFixed(3),
            opacity: finalConfig.opacity.toFixed(3),
            contrast: finalConfig.contrast.toFixed(3),
            brightness: finalConfig.brightness.toFixed(3),
            saturationBoost: finalConfig.saturationBoost.toFixed(3),
            shadowIntensity: finalConfig.shadowIntensity.toFixed(3),
            borderOpacity: finalConfig.borderOpacity.toFixed(3),
          },
          input: {
            threshold: objConfig.threshold,
            opacity: objConfig.opacity,
            contrast: objConfig.contrast,
            brightness: objConfig.brightness,
            saturationBoost: objConfig.saturationBoost,
          },
          timestamp: new Date().toISOString(),
        });
      }

      return finalConfig;
    }

    if (
      (typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') &&
      debugOverLight
    ) {
      console.log('[AtomixGlass] OverLight Config:', {
        isOverLight,
        configType: typeof overLight === 'boolean' ? (overLight ? 'true' : 'false') : overLight,
        config: {
          threshold: baseConfig.threshold.toFixed(3),
          opacity: baseConfig.opacity.toFixed(3),
          contrast: baseConfig.contrast.toFixed(3),
          brightness: baseConfig.brightness.toFixed(3),
          saturationBoost: baseConfig.saturationBoost.toFixed(3),
          shadowIntensity: baseConfig.shadowIntensity.toFixed(3),
          borderOpacity: baseConfig.borderOpacity.toFixed(3),
        },
        timestamp: new Date().toISOString(),
      });
    }

    return baseConfig;
  }, [
    overLight,
    getEffectiveOverLight,
    isHovered,
    isActive,
    validateConfigValue,
    debugOverLight,
  ]);

  // Transform calculation (static base for React render)
  // Mouse interactions are purely handled by imperative updates in the RAF lerp loop to prevent re-renders
  const transformStyle = useMemo(() => {
    return effectiveWithoutEffects || (isActive && Boolean(onClick)) ? 'scale(0.98)' : 'scale(1)';
  }, [effectiveWithoutEffects, isActive, onClick]);

  // Mouse tracking
  const updateRectRef = useRef<number | null>(null);

  // Derived values for imperative updates (we can use memoized ones or re-calculate)
  // Since updateAtomixGlassStyles is called imperatively, we pass current refs and state


  // Handle mouse position updates
  // ── Raw mouse handler — writes to TARGET refs only ──────────────────
  // The lerp loop (below) reads the targets and incrementally
  // moves the "current" refs toward them for liquid smoothing.
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

      // Write raw target — the lerp loop will smoothly pursue it
      targetMouseOffsetRef.current = {
        x: ((globalPos.x - center.x) / rect.width) * 100,
        y: ((globalPos.y - center.y) / rect.height) * 100,
      };
      targetGlobalMousePositionRef.current = globalPos;
    },
    [
      mouseContainer,
      glassRef,
      externalGlobalMousePosition,
      externalMouseOffset,
      effectiveWithoutEffects,
    ]
  );

  // ── Lerp animation loop ─────────────────────────────────────────────
  // Continuously interpolates the current offset toward the target.
  // Produces the signature liquid / viscous feel.
  const startLerpLoop = useCallback(() => {
    if (lerpActiveRef.current) return;
    lerpActiveRef.current = true;

    const LERP_T = CONSTANTS.LERP_FACTOR; // 0.08 – lower = more viscous
    const EPSILON = 0.05; // Stop iterating when close enough

    const tick = () => {
      if (!lerpActiveRef.current) return;

      const cur = internalMouseOffsetRef.current;
      const tgt = targetMouseOffsetRef.current;

      const dx = tgt.x - cur.x;
      const dy = tgt.y - cur.y;

      // If we're close enough, snap and park
      if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) {
        internalMouseOffsetRef.current = { ...tgt };
        internalGlobalMousePositionRef.current = { ...targetGlobalMousePositionRef.current };
      } else {
        internalMouseOffsetRef.current = {
          x: lerp(cur.x, tgt.x, LERP_T),
          y: lerp(cur.y, tgt.y, LERP_T),
        };
        const curG = internalGlobalMousePositionRef.current;
        const tgtG = targetGlobalMousePositionRef.current;
        internalGlobalMousePositionRef.current = {
          x: lerp(curG.x, tgtG.x, LERP_T),
          y: lerp(curG.y, tgtG.y, LERP_T),
        };
      }

      // Imperative style update with the smoothed values
      updateAtomixGlassStyles(
        wrapperRef?.current || null,
        glassRef.current,
        {
          mouseOffset: internalMouseOffsetRef.current,
          globalMousePosition: internalGlobalMousePositionRef.current,
          glassSize,
          isHovered,
          isActive,
          isOverLight: overLightConfig.isOverLight,
          baseOverLightConfig: overLightConfig,
          effectiveBorderRadius,
          effectiveWithoutEffects,
          effectiveReducedMotion,
          elasticity,
          directionalScale: isActive && Boolean(onClick) ? 'scale(0.96)' : 'scale(1)',
          onClick,
          withLiquidBlur,
          blurAmount,
          saturation,
          padding,
          isFixedOrSticky,
        }
      );

      lerpRafRef.current = requestAnimationFrame(tick);
    };

    lerpRafRef.current = requestAnimationFrame(tick);
  }, [
    glassRef,
    wrapperRef,
    glassSize,
    isHovered,
    isActive,
    overLightConfig,
    effectiveBorderRadius,
    effectiveWithoutEffects,
    effectiveReducedMotion,
    elasticity,
    onClick,
    withLiquidBlur,
    blurAmount,
    saturation,
    padding,
    isFixedOrSticky,
  ]);

  const stopLerpLoop = useCallback(() => {
    lerpActiveRef.current = false;
    if (lerpRafRef.current !== null) {
      cancelAnimationFrame(lerpRafRef.current);
      lerpRafRef.current = null;
    }
  }, []);

  // Subscribe to shared mouse tracker
  useEffect(() => {
    if (externalGlobalMousePosition && externalMouseOffset) {
      return undefined;
    }

    if (effectiveWithoutEffects) {
      return undefined;
    }

    const unsubscribe = globalMouseTracker.subscribe(handleGlobalMousePosition);

    // Start the lerp loop — it will smoothly chase the target
    startLerpLoop();

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
      stopLerpLoop();
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
    startLerpLoop,
    stopLerpLoop,
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
            isOverLight: overLightConfig.isOverLight,
            baseOverLightConfig: overLightConfig,
            effectiveBorderRadius,
            effectiveWithoutEffects,
            effectiveReducedMotion,
            elasticity,
            directionalScale: isActive && Boolean(onClick) ? 'scale(0.96)' : 'scale(1)',
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
    overLightConfig,
    effectiveBorderRadius,
    effectiveWithoutEffects,
    effectiveReducedMotion,
    elasticity,
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
    transformStyle,
    getShaderTime,
    applyTimeBasedDistortion,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
  };
}