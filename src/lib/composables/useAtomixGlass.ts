import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  AtomixGlassProps,
  DisplacementMode,
  GlassSize,
  MousePosition,
  OverLightConfig,
  OverLightObjectConfig,
} from '../types/components';
import { ATOMIX_GLASS } from '../constants/components';
import {
  calculateDistance,
  calculateElementCenter,
  calculateMouseInfluence,
  extractBorderRadiusFromChildren,
  extractBorderRadiusFromDOMElement,
  validateGlassSize,
} from '../../components/AtomixGlass/glass-utils';

const { CONSTANTS } = ATOMIX_GLASS;

interface UseAtomixGlassOptions extends Omit<AtomixGlassProps, 'children'> {
  glassRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
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
  cornerRadius,
  globalMousePosition: externalGlobalMousePosition,
  mouseOffset: externalMouseOffset,
  mouseContainer,
  overLight = false,
  reducedMotion = false,
  highContrast = false,
  disableEffects = false,
  elasticity = 0.05,
  onClick,
  debugCornerRadius = false,
  enablePerformanceMonitoring = false,
  children,
}: UseAtomixGlassOptions): UseAtomixGlassReturn {
  // State
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [glassSize, setGlassSize] = useState<GlassSize>({ width: 270, height: 69 });
  const [internalGlobalMousePosition, setInternalGlobalMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [internalMouseOffset, setInternalMouseOffset] = useState<MousePosition>({ x: 0, y: 0 });
  const [dynamicCornerRadius, setDynamicCornerRadius] = useState<number>(
    CONSTANTS.DEFAULT_CORNER_RADIUS
  );
  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState(false);
  const [userPrefersHighContrast, setUserPrefersHighContrast] = useState(false);
  const [detectedOverLight, setDetectedOverLight] = useState(false);

  // Memoized derived values
  const effectiveCornerRadius = useMemo(() => {
    if (cornerRadius !== undefined) {
      const result = Math.max(0, cornerRadius);
      if (debugCornerRadius) {
        console.log('[AtomixGlass] Using manual cornerRadius prop:', result);
      }
      return result;
    }

    const result = Math.max(0, dynamicCornerRadius);
    if (debugCornerRadius) {
      console.log('[AtomixGlass] Using dynamic cornerRadius:', result);
    }
    return result;
  }, [cornerRadius, dynamicCornerRadius, debugCornerRadius]);

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

  const globalMousePosition = useMemo(
    () => externalGlobalMousePosition || internalGlobalMousePosition,
    [externalGlobalMousePosition, internalGlobalMousePosition]
  );

  const mouseOffset = useMemo(
    () => externalMouseOffset || internalMouseOffset,
    [externalMouseOffset, internalMouseOffset]
  );

  // Extract border-radius from children
  useEffect(() => {
    const extractRadius = () => {
      try {
        let extractedRadius: number | null = null;
        let extractionSource = 'default';

        if (contentRef.current) {
          const firstChild = contentRef.current.firstElementChild as HTMLElement;
          if (firstChild) {
            const domRadius = extractBorderRadiusFromDOMElement(firstChild);
            if (domRadius !== null && domRadius > 0) {
              extractedRadius = domRadius;
              extractionSource = 'DOM element';
            }
          }
        }

        if (extractedRadius === null) {
          const childRadius = extractBorderRadiusFromChildren(children);
          if (childRadius > 0 && childRadius !== CONSTANTS.DEFAULT_CORNER_RADIUS) {
            extractedRadius = childRadius;
            extractionSource = 'React children';
          }
        }

        if (extractedRadius !== null && extractedRadius > 0) {
          setDynamicCornerRadius(extractedRadius);

          if (debugCornerRadius) {
            console.log('[AtomixGlass] Corner radius extracted:', {
              value: extractedRadius,
              source: extractionSource,
              timestamp: new Date().toISOString(),
            });
          }
        } else if (debugCornerRadius) {
          console.log(
            '[AtomixGlass] No corner radius found, using default:',
            CONSTANTS.DEFAULT_CORNER_RADIUS
          );
        }
      } catch (error) {
        if (debugCornerRadius) {
          console.error('[AtomixGlass] Error extracting corner radius:', error);
        }
      }
    };

    extractRadius();
    const timeoutId = setTimeout(extractRadius, 100);
    return () => clearTimeout(timeoutId);
  }, [children, debugCornerRadius, contentRef]);

  // Media query handlers
  useEffect(() => {
    if (overLight === 'auto' && glassRef.current) {
      try {
        const element = glassRef.current;
        let totalLuminance = 0;
        let validSamples = 0;

        let currentElement = element.parentElement;
        while (currentElement && validSamples < 3) {
          const computedStyle = window.getComputedStyle(currentElement);
          const bgColor = computedStyle.backgroundColor;

          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            const rgb = bgColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const r = Number(rgb[0]) || 0;
              const g = Number(rgb[1]) || 0;
              const b = Number(rgb[2]) || 0;
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              totalLuminance += luminance;
              validSamples++;
            }
          }
          currentElement = currentElement.parentElement;
        }

        if (validSamples > 0) {
          const avgLuminance = totalLuminance / validSamples;
          let threshold = 0.7;
          if (typeof overLight === 'object' && overLight !== null && overLight !== 'auto') {
            const objConfig = overLight as OverLightObjectConfig;
            threshold = objConfig.threshold || 0.7;
          }
          setDetectedOverLight(avgLuminance > threshold);
        }
      } catch (error) {
        console.warn('AtomixGlass: Error detecting background brightness:', error);
      }
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
  }, [overLight, glassRef]);

  // Mouse tracking
  const mouseMoveThrottleRef = useRef<number | null>(null);
  const lastMouseEventRef = useRef<MouseEvent | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      lastMouseEventRef.current = e;

      if (mouseMoveThrottleRef.current === null) {
        mouseMoveThrottleRef.current = requestAnimationFrame(() => {
          const event = lastMouseEventRef.current;
          if (!event) {
            mouseMoveThrottleRef.current = null;
            return;
          }

          const container = mouseContainer?.current || glassRef.current;
          if (!container) {
            mouseMoveThrottleRef.current = null;
            return;
          }

          const startTime = enablePerformanceMonitoring ? performance.now() : 0;

          const rect = container.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            mouseMoveThrottleRef.current = null;
            return;
          }

          const center = calculateElementCenter(rect);

          setInternalMouseOffset({
            x: ((event.clientX - center.x) / rect.width) * 100,
            y: ((event.clientY - center.y) / rect.height) * 100,
          });

          setInternalGlobalMousePosition({
            x: event.clientX,
            y: event.clientY,
          });

          if (enablePerformanceMonitoring) {
            const endTime = performance.now();
            const duration = endTime - startTime;
            if (duration > 5) {
              console.warn(`AtomixGlass: Mouse tracking took ${duration.toFixed(2)}ms`);
            }
          }

          mouseMoveThrottleRef.current = null;
        });
      }
    },
    [mouseContainer, glassRef, enablePerformanceMonitoring]
  );

  useEffect(() => {
    if (externalGlobalMousePosition && externalMouseOffset) {
      return undefined;
    }

    if (effectiveDisableEffects) {
      return undefined;
    }

    const container = mouseContainer?.current || glassRef.current;
    if (!container) {
      return undefined;
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (mouseMoveThrottleRef.current) {
        cancelAnimationFrame(mouseMoveThrottleRef.current);
        mouseMoveThrottleRef.current = null;
      }
    };
  }, [
    handleMouseMove,
    mouseContainer,
    glassRef,
    externalGlobalMousePosition,
    externalMouseOffset,
    effectiveDisableEffects,
  ]);

  // Transform calculations
  const calculateDirectionalScale = useCallback(() => {
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
  }, [globalMousePosition, elasticity, glassSize, glassRef]);

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
      validateGlassSize(size) && size.width <= CONSTANTS.MAX_SIZE && size.height <= CONSTANTS.MAX_SIZE;

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

        const cornerRadiusOffset = Math.max(0, Math.min(effectiveCornerRadius * 0.1, 10));
        const newSize: GlassSize = {
          width: Math.round(rect.width + cornerRadiusOffset),
          height: Math.round(rect.height + cornerRadiusOffset),
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
    let fallbackInterval: NodeJS.Timeout | null = null;

    const hasResizeObserver = typeof ResizeObserver !== 'undefined';

    if (hasResizeObserver && isValidElement(glassRef.current)) {
      try {
        resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target === glassRef.current) {
              updateGlassSize(false);
              break;
            }
          }
        });
        resizeObserver.observe(glassRef.current);
      } catch {
        fallbackInterval = setInterval(
          () => isValidElement(glassRef.current) && updateGlassSize(false),
          100
        );
      }
    } else {
      fallbackInterval = setInterval(
        () => isValidElement(glassRef.current) && updateGlassSize(false),
        100
      );
    }

    window.addEventListener('resize', debouncedResizeHandler, { passive: true });

    return () => {
      clearTimeout(initialTimeoutId);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      if (fallbackInterval) clearInterval(fallbackInterval);
      window.removeEventListener('resize', debouncedResizeHandler);
      resizeObserver?.disconnect();
    };
  }, [effectiveCornerRadius, glassRef]);

  // OverLight config
  const getEffectiveOverLight = useCallback(() => {
    if (typeof overLight === 'boolean') return overLight;
    if (overLight === 'auto') return detectedOverLight;
    return detectedOverLight;
  }, [overLight, detectedOverLight]);

  const overLightConfig = useMemo(() => {
    const isOverLight = getEffectiveOverLight();
    const mouseInfluence = calculateMouseInfluence(mouseOffset);
    const hoverIntensity = isHovered ? 1.3 : 1;
    const activeIntensity = isActive ? 1.5 : 1;

    const baseConfig = {
      isOverLight,
      threshold: 0.7,
      opacity: 0.4 * hoverIntensity * activeIntensity,
      contrast: 1.3 + mouseInfluence * 0.2,
      brightness: 0.9 + mouseInfluence * 0.1,
      saturationBoost: 1.2 + mouseInfluence * 0.3,
      shadowIntensity: 0.8 + mouseInfluence * 0.4,
      borderOpacity: 0.6 + mouseInfluence * 0.2,
    };

    if (typeof overLight === 'object' && overLight !== null) {
      const objConfig = overLight as OverLightObjectConfig;
      return {
        ...baseConfig,
        threshold: objConfig.threshold || baseConfig.threshold,
        opacity: (objConfig.opacity || 0.4) * hoverIntensity * activeIntensity,
        contrast: (objConfig.contrast || 1.3) + mouseInfluence * 0.2,
      };
    }

    return baseConfig;
  }, [overLight, getEffectiveOverLight, mouseOffset, isHovered, isActive]);

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
    handleMouseMove,
    handleKeyDown,
  };
}

