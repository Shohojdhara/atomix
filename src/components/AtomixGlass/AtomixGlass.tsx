import {
  type CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useMemo,
} from 'react';
import { ShaderDisplacementGenerator, fragmentShaders } from './shader-utils';
import { displacementMap, polarDisplacementMap, prominentDisplacementMap } from './utils';

const generateShaderDisplacementMap = (width: number, height: number): string => {
  try {
    const generator = new ShaderDisplacementGenerator({
      width,
      height,
      fragment: fragmentShaders.liquidGlass,
    });

    const dataUrl = generator.updateShader();
    generator.destroy();

    return dataUrl;
  } catch (error) {
    return displacementMap;
  }
};

const getMap = (mode: 'standard' | 'polar' | 'prominent' | 'shader', shaderMapUrl?: string) => {
  switch (mode) {
    case 'standard':
      return displacementMap;
    case 'polar':
      return polarDisplacementMap;
    case 'prominent':
      return prominentDisplacementMap;
    case 'shader':
      return shaderMapUrl || displacementMap;
    default:
      throw new Error(`Invalid mode: ${mode}`);
  }
};

const GlassFilter: React.FC<{
  id: string;
  displacementScale: number;
  aberrationIntensity: number;
  width: number;
  height: number;
  mode: 'standard' | 'polar' | 'prominent' | 'shader';
  shaderMapUrl?: string;
}> = ({ id, displacementScale, aberrationIntensity, width, height, mode, shaderMapUrl }) => (
  <svg style={{ position: 'absolute', width, height, inset: 0 }} aria-hidden="true">
    <defs>
      <radialGradient id={`${id}-edge-mask`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="black" stopOpacity="0" />
        <stop
          offset={`${Math.max(30, 80 - aberrationIntensity * 2)}%`}
          stopColor="black"
          stopOpacity="0"
        />
        <stop offset="100%" stopColor="white" stopOpacity="1" />
      </radialGradient>
      <filter id={id} x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
        <feImage
          id="feimage"
          x="0"
          y="0"
          width="100%"
          height="100%"
          result="DISPLACEMENT_MAP"
          href={getMap(mode, shaderMapUrl)}
          preserveAspectRatio="xMidYMid slice"
        />

        <feColorMatrix
          in="DISPLACEMENT_MAP"
          type="matrix"
          values="0.3 0.3 0.3 0 0
                 0.3 0.3 0.3 0 0
                 0.3 0.3 0.3 0 0
                 0 0 0 1 0"
          result="EDGE_INTENSITY"
        />
        <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
          <feFuncA type="discrete" tableValues={`0 ${aberrationIntensity * 0.05} 1`} />
        </feComponentTransfer>

        <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          scale={displacementScale * (mode === 'shader' ? 1 : -1)}
          xChannelSelector="R"
          yChannelSelector="B"
          result="RED_DISPLACED"
        />
        <feColorMatrix
          in="RED_DISPLACED"
          type="matrix"
          values="1 0 0 0 0
                 0 0 0 0 0
                 0 0 0 0 0
                 0 0 0 1 0"
          result="RED_CHANNEL"
        />

        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          scale={displacementScale * ((mode === 'shader' ? 1 : -1) - aberrationIntensity * 0.05)}
          xChannelSelector="R"
          yChannelSelector="B"
          result="GREEN_DISPLACED"
        />
        <feColorMatrix
          in="GREEN_DISPLACED"
          type="matrix"
          values="0 0 0 0 0
                 0 1 0 0 0
                 0 0 0 0 0
                 0 0 0 1 0"
          result="GREEN_CHANNEL"
        />

        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          scale={displacementScale * ((mode === 'shader' ? 1 : -1) - aberrationIntensity * 0.1)}
          xChannelSelector="R"
          yChannelSelector="B"
          result="BLUE_DISPLACED"
        />
        <feColorMatrix
          in="BLUE_DISPLACED"
          type="matrix"
          values="0 0 0 0 0
                 0 0 0 0 0
                 0 0 1 0 0
                 0 0 0 1 0"
          result="BLUE_CHANNEL"
        />

        <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
        <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

        <feGaussianBlur
          in="RGB_COMBINED"
          stdDeviation={Math.max(0.1, 0.5 - aberrationIntensity * 0.1)}
          result="ABERRATED_BLURRED"
        />

        <feComposite
          in="ABERRATED_BLURRED"
          in2="EDGE_MASK"
          operator="in"
          result="EDGE_ABERRATION"
        />

        <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />

        <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
      </filter>
    </defs>
  </svg>
);

const GlassContainer = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
    displacementScale?: number;
    blurAmount?: number;
    saturation?: number;
    aberrationIntensity?: number;
    mouseOffset?: { x: number; y: number };
    globalMousePos?: { x: number; y: number };
    onMouseLeave?: () => void;
    onMouseEnter?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    active?: boolean;
    isHovered?: boolean;
    isActive?: boolean;
    overLight?: boolean;
    cornerRadius?: number;
    padding?: string;
    glassSize?: { width: number; height: number };

    onClick?: () => void;
    mode?: 'standard' | 'polar' | 'prominent' | 'shader';
    transform?: string;
  }>
>(
  (
    {
      children,
      className = '',
      style,
      displacementScale = 25,
      blurAmount = 12,
      saturation = 180,
      aberrationIntensity = 2,
      mouseOffset = { x: 0, y: 0 },
      globalMousePos = { x: 0, y: 0 },
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      active = false,
      isHovered = false,
      isActive = false,
      overLight = false,
      cornerRadius = 0,
      padding = '0 0',
      glassSize = { width: 0, height: 0 },
      onClick,
      mode = 'standard',
      transform = 'none',
    },
    ref
  ) => {
    const filterId = useId();
    const [shaderMapUrl, setShaderMapUrl] = useState<string>('');

    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

    useEffect(() => {
      if (mode === 'shader' && glassSize.width > 0 && glassSize.height > 0) {
        try {
          const url = generateShaderDisplacementMap(glassSize.width, glassSize.height);
          setShaderMapUrl(url);
        } catch (error) {
          console.warn('Failed to generate shader displacement map:', error);
        }
      }
    }, [mode, glassSize.width, glassSize.height]);

    useEffect(() => {
      if (!ref || typeof ref === 'function') return;

      const element = (ref as React.RefObject<HTMLDivElement>).current;
      if (!element) return;

      const timeoutId = setTimeout(() => {
        try {
          element.offsetHeight;
        } catch (error) {
          console.warn('AtomixGlass: Error in GlassContainer size sync:', error);
        }
      }, 0);

      return () => clearTimeout(timeoutId);
    }, [cornerRadius, glassSize.width, glassSize.height]);

    const liquidBlur = useMemo(() => {
      if (!ref || !globalMousePos.x || !globalMousePos.y) {
        return {
          baseBlur: blurAmount,
          edgeBlur: blurAmount * 0.5,
          centerBlur: blurAmount * 0.2,
          flowBlur: blurAmount * 0.3,
        };
      }

      const rect = (ref as React.RefObject<HTMLDivElement>).current?.getBoundingClientRect();
      if (!rect) {
        return {
          baseBlur: blurAmount,
          edgeBlur: blurAmount * 0.5,
          centerBlur: blurAmount * 0.2,
          flowBlur: blurAmount * 0.3,
        };
      }
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = globalMousePos.x - centerX;
      const deltaY = globalMousePos.y - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
      const normalizedDistance = Math.min(distance / maxDistance, 1);

      const mouseInfluence =
        Math.sqrt(mouseOffset.x * mouseOffset.x + mouseOffset.y * mouseOffset.y) / 100;

      const baseBlur = blurAmount + mouseInfluence * blurAmount * 0.4;

      const edgeIntensity = normalizedDistance * 1.5 + mouseInfluence * 0.3;
      const edgeBlur = baseBlur * (0.8 + edgeIntensity * 0.6);

      const centerIntensity = (1 - normalizedDistance) * 0.3 + mouseInfluence * 0.2;
      const centerBlur = baseBlur * (0.3 + centerIntensity * 0.4);

      const flowDirection = Math.atan2(deltaY, deltaX);
      const flowIntensity = Math.sin(flowDirection + mouseInfluence * Math.PI) * 0.5 + 0.5;
      const flowBlur = baseBlur * (0.4 + flowIntensity * 0.6);

      const hoverMultiplier = isHovered ? 1.2 : 1;
      const activeMultiplier = isActive ? 1.4 : 1;
      const stateMultiplier = hoverMultiplier * activeMultiplier;

      return {
        baseBlur: Math.max(0.1, baseBlur * stateMultiplier),
        edgeBlur: Math.max(0.1, edgeBlur * stateMultiplier),
        centerBlur: Math.max(0.1, centerBlur * stateMultiplier),
        flowBlur: Math.max(0.1, flowBlur * stateMultiplier),
      };
    }, [blurAmount, globalMousePos, mouseOffset, isHovered, isActive, ref]);

    const backdropStyle = useMemo(() => {
      const dynamicSaturation = saturation + liquidBlur.baseBlur * 20;

      const blurLayers = [
        `blur(${liquidBlur.baseBlur}px)`,
        `blur(${liquidBlur.edgeBlur}px)`,
        `blur(${liquidBlur.centerBlur}px)`,
        `blur(${liquidBlur.flowBlur}px)`,
      ];

      return {
        filter: `url(#${filterId})`,
        backdropFilter: `${blurLayers.join(' ')} saturate(${Math.min(dynamicSaturation, 200)}%)`,
      };
    }, [filterId, liquidBlur, saturation]);

    return (
      <div
        ref={ref}
        className={` ${className} ${active ? 'active' : ''}`}
        style={style}
        onClick={onClick}
      >
        <div
          className="glass"
          style={{
            position: 'relative',
            padding,
            borderRadius: `${cornerRadius}px`,
            transition: 'all 0.2s ease-out',
            boxShadow: overLight
              ? '0px 16px 70px rgba(0, 0, 0, 0.75)'
              : '0px 12px 40px rgba(0, 0, 0, 0.25)',
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <GlassFilter
            mode={mode}
            id={filterId}
            displacementScale={displacementScale}
            aberrationIntensity={aberrationIntensity}
            width={glassSize.width}
            height={glassSize.height}
            shaderMapUrl={shaderMapUrl}
          />
          <span
            className="glass__warp"
            style={
              {
                ...backdropStyle,
                borderRadius: `${cornerRadius}px`,
                position: 'absolute',
                inset: '0',
              } as CSSProperties
            }
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              textShadow: overLight
                ? '0px 2px 12px rgba(0, 0, 0, 0)'
                : '0px 2px 12px rgba(0, 0, 0, 0.4)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

GlassContainer.displayName = 'GlassContainer';

interface AtomixGlassProps {
  children: React.ReactNode;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  cornerRadius?: number;
  globalMousePos?: { x: number; y: number };
  mouseOffset?: { x: number; y: number };
  mouseContainer?: React.RefObject<HTMLElement | null> | null;
  className?: string;
  padding?: string;
  style?: React.CSSProperties;
  overLight?: boolean;
  mode?: 'standard' | 'polar' | 'prominent' | 'shader';
  onClick?: () => void;

  /**
   * Accessibility props
   */
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;

  /**
   * Performance and accessibility options
   */
  reducedMotion?: boolean;
  highContrast?: boolean;
  disableEffects?: boolean;

  /**
   * Performance monitoring
   */
  enablePerformanceMonitoring?: boolean;
}

export function AtomixGlass({
  children,
  displacementScale = 70,
  blurAmount = 0.0625,
  saturation = 140,
  aberrationIntensity = 2,
  elasticity = 0.15,
  cornerRadius = 20,
  globalMousePos: externalGlobalMousePos,
  mouseOffset: externalMouseOffset,
  mouseContainer = null,
  className = '',
  padding = '0 0',
  overLight = false,
  style = {},
  mode = 'standard',
  onClick,

  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role,
  tabIndex,

  reducedMotion = false,
  highContrast = false,
  disableEffects = false,

  enablePerformanceMonitoring = false,
}: AtomixGlassProps) {
  const glassRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [glassSize, setGlassSize] = useState({ width: 270, height: 69 });
  const [internalGlobalMousePos, setInternalGlobalMousePos] = useState({ x: 0, y: 0 });
  const [internalMouseOffset, setInternalMouseOffset] = useState({ x: 0, y: 0 });

  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState(false);
  const [userPrefersHighContrast, setUserPrefersHighContrast] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      console.warn('AtomixGlass: matchMedia not supported, using default preferences');
      return;
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
        if (mediaQueryReducedMotion.removeEventListener) {
          mediaQueryReducedMotion.removeEventListener('change', handleReducedMotionChange);
          mediaQueryHighContrast.removeEventListener('change', handleHighContrastChange);
        } else if (mediaQueryReducedMotion.removeListener) {
          mediaQueryReducedMotion.removeListener(handleReducedMotionChange);
          mediaQueryHighContrast.removeListener(handleHighContrastChange);
        }
      };
    } catch (error) {
      console.warn('AtomixGlass: Error setting up media queries:', error);
    }
  }, []);

  const effectiveReducedMotion = reducedMotion || userPrefersReducedMotion;
  const effectiveHighContrast = highContrast || userPrefersHighContrast;
  const effectiveDisableEffects = disableEffects || effectiveReducedMotion;

  const globalMousePos = externalGlobalMousePos || internalGlobalMousePos;
  const mouseOffset = externalMouseOffset || internalMouseOffset;

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

          try {
            const startTime = enablePerformanceMonitoring ? performance.now() : 0;

            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            setInternalMouseOffset({
              x: ((event.clientX - centerX) / rect.width) * 100,
              y: ((event.clientY - centerY) / rect.height) * 100,
            });

            setInternalGlobalMousePos({
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
          } catch (error) {
            console.warn('AtomixGlass: Error in mouse tracking:', error);
          } finally {
            mouseMoveThrottleRef.current = null;
          }
        });
      }
    },
    [mouseContainer]
  );

  useEffect(() => {
    if (externalGlobalMousePos && externalMouseOffset) {
      return;
    }

    if (effectiveDisableEffects) {
      return;
    }

    const container = mouseContainer?.current || glassRef.current;
    if (!container) {
      return;
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
    externalGlobalMousePos,
    externalMouseOffset,
    effectiveDisableEffects,
  ]);

  const calculateDirectionalScale = useCallback(() => {
    if (!globalMousePos.x || !globalMousePos.y || !glassRef.current) {
      return 'scale(1)';
    }

    const rect = glassRef.current.getBoundingClientRect();
    const pillCenterX = rect.left + rect.width / 2;
    const pillCenterY = rect.top + rect.height / 2;
    const pillWidth = glassSize.width;
    const pillHeight = glassSize.height;

    const deltaX = globalMousePos.x - pillCenterX;
    const deltaY = globalMousePos.y - pillCenterY;

    const edgeDistanceX = Math.max(0, Math.abs(deltaX) - pillWidth / 2);
    const edgeDistanceY = Math.max(0, Math.abs(deltaY) - pillHeight / 2);
    const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY);

    const activationZone = 200;

    if (edgeDistance > activationZone) {
      return 'scale(1)';
    }

    const fadeInFactor = 1 - edgeDistance / activationZone;

    const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
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
  }, [globalMousePos, elasticity, glassSize]);

  const calculateFadeInFactor = useCallback(() => {
    if (!globalMousePos.x || !globalMousePos.y || !glassRef.current) {
      return 0;
    }

    const rect = glassRef.current.getBoundingClientRect();
    const pillCenterX = rect.left + rect.width / 2;
    const pillCenterY = rect.top + rect.height / 2;
    const pillWidth = glassSize.width;
    const pillHeight = glassSize.height;

    const edgeDistanceX = Math.max(0, Math.abs(globalMousePos.x - pillCenterX) - pillWidth / 2);
    const edgeDistanceY = Math.max(0, Math.abs(globalMousePos.y - pillCenterY) - pillHeight / 2);
    const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY);

    const activationZone = 200;
    return edgeDistance > activationZone ? 0 : 1 - edgeDistance / activationZone;
  }, [globalMousePos, glassSize]);

  const calculateElasticTranslation = useCallback(() => {
    if (!glassRef.current) {
      return { x: 0, y: 0 };
    }

    const fadeInFactor = calculateFadeInFactor();
    const rect = glassRef.current.getBoundingClientRect();
    const pillCenterX = rect.left + rect.width / 2;
    const pillCenterY = rect.top + rect.height / 2;

    return {
      x: (globalMousePos.x - pillCenterX) * elasticity * 0.1 * fadeInFactor,
      y: (globalMousePos.y - pillCenterY) * elasticity * 0.1 * fadeInFactor,
    };
  }, [globalMousePos, elasticity, calculateFadeInFactor]);

  useEffect(() => {
    const isValidElement = (element: HTMLElement | null): element is HTMLElement => {
      return element !== null && element instanceof HTMLElement && element.isConnected;
    };

    let rafId: number | null = null;
    let lastSize = { width: 0, height: 0 };
    let lastCornerRadius = cornerRadius;

    const updateGlassSize = (forceUpdate = false): void => {
      try {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
          try {
            if (!isValidElement(glassRef.current)) {
              console.warn('AtomixGlass: Element not available for size calculation');
              return;
            }

            const rect = glassRef.current.getBoundingClientRect();

            if (rect.width <= 0 || rect.height <= 0) {
              console.warn('AtomixGlass: Invalid dimensions detected', {
                width: rect.width,
                height: rect.height,
              });
              return;
            }

            const cornerRadiusOffset = Math.max(0, cornerRadius * 0.1);
            const newSize = {
              width: Math.round(rect.width + cornerRadiusOffset),
              height: Math.round(rect.height + cornerRadiusOffset),
            };

            const cornerRadiusChanged = lastCornerRadius !== cornerRadius;
            const dimensionsChanged =
              newSize.width !== lastSize.width || newSize.height !== lastSize.height;

            if (forceUpdate || cornerRadiusChanged || dimensionsChanged) {
              lastSize = newSize;
              lastCornerRadius = cornerRadius;
              setGlassSize(newSize);

              if (enablePerformanceMonitoring && (cornerRadiusChanged || dimensionsChanged)) {
                console.log('AtomixGlass: Size updated', {
                  newSize,
                  cornerRadius,
                  cornerRadiusChanged,
                  dimensionsChanged,
                });
              }
            }
          } catch (error) {
            console.error('AtomixGlass: Error updating glass size:', error);
          } finally {
            rafId = null;
          }
        });
      } catch (error) {
        console.error('AtomixGlass: Error in updateGlassSize:', error);
      }
    };

    let resizeTimeoutId: NodeJS.Timeout | null = null;
    const debouncedResizeHandler = (): void => {
      if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId);
      }
      resizeTimeoutId = setTimeout(updateGlassSize, 16);
    };

    try {
      updateGlassSize(true);
    } catch (error) {
      console.error('AtomixGlass: Error in initial size update:', error);
    }

    let resizeObserver: ResizeObserver | null = null;
    let fallbackInterval: NodeJS.Timeout | null = null;

    try {
      const hasResizeObserver =
        typeof ResizeObserver !== 'undefined' &&
        typeof ResizeObserver.prototype.observe === 'function';

      if (hasResizeObserver && isValidElement(glassRef.current)) {
        try {
          resizeObserver = new ResizeObserver(entries => {
            try {
              for (const entry of entries) {
                if (entry.target === glassRef.current) {
                  updateGlassSize();
                  break;
                }
              }
            } catch (error) {
              console.error('AtomixGlass: Error in ResizeObserver callback:', error);
            }
          });

          resizeObserver.observe(glassRef.current);
        } catch (resizeObserverError) {
          console.warn(
            'AtomixGlass: ResizeObserver creation failed, using fallback:',
            resizeObserverError
          );
          fallbackInterval = setInterval(() => {
            if (isValidElement(glassRef.current)) {
              updateGlassSize();
            }
          }, 100);
        }
      } else {
        console.warn('AtomixGlass: ResizeObserver not supported, using fallback polling');
        fallbackInterval = setInterval(() => {
          if (isValidElement(glassRef.current)) {
            updateGlassSize();
          }
        }, 100);
      }
    } catch (error) {
      console.error('AtomixGlass: Error setting up ResizeObserver:', error);
      fallbackInterval = setInterval(() => {
        if (isValidElement(glassRef.current)) {
          updateGlassSize();
        }
      }, 100);
    }

    window.addEventListener('resize', debouncedResizeHandler, { passive: true });

    return () => {
      try {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }

        if (resizeTimeoutId) {
          clearTimeout(resizeTimeoutId);
          resizeTimeoutId = null;
        }

        window.removeEventListener('resize', debouncedResizeHandler);

        if (resizeObserver) {
          try {
            if (isValidElement(glassRef.current)) {
              resizeObserver.unobserve(glassRef.current);
            }
            resizeObserver.disconnect();
          } catch (error) {
            console.error('AtomixGlass: Error cleaning up ResizeObserver:', error);
          }
          resizeObserver = null;
        }

        if (fallbackInterval) {
          clearInterval(fallbackInterval);
          fallbackInterval = null;
        }
      } catch (error) {
        console.error('AtomixGlass: Error in cleanup:', error);
      }
    };
  }, [cornerRadius, enablePerformanceMonitoring]);

  useEffect(() => {
    if (!glassRef.current) return;

    const timeoutId = setTimeout(() => {
      try {
        const rect = glassRef.current?.getBoundingClientRect();
        if (rect && rect.width > 0 && rect.height > 0) {
          const cornerRadiusOffset = Math.max(0, cornerRadius * 0.1);
          const newSize = {
            width: Math.round(rect.width + cornerRadiusOffset),
            height: Math.round(rect.height + cornerRadiusOffset),
          };
          setGlassSize(newSize);

          if (enablePerformanceMonitoring) {
            console.log('AtomixGlass: Corner radius change triggered size update', {
              cornerRadius,
              newSize,
            });
          }
        }
      } catch (error) {
        console.warn('AtomixGlass: Error in corner radius size update:', error);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [cornerRadius, enablePerformanceMonitoring]);

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

  const baseStyle = useMemo(
    () => ({
      ...style,
      transform: transformStyle,
      transition: effectiveReducedMotion ? 'none' : 'all ease-out 0.2s',
      willChange: effectiveDisableEffects ? 'auto' : 'transform',
      ...(effectiveHighContrast && {
        border: '2px solid currentColor',
        outline: '2px solid transparent',
        outlineOffset: '2px',
      }),
    }),
    [style, transformStyle, effectiveReducedMotion, effectiveDisableEffects, effectiveHighContrast]
  );

  const positionStyles = useMemo(
    () => ({
      position: (baseStyle.position || 'absolute') as React.CSSProperties['position'],
      top: baseStyle.top || 0,
      left: baseStyle.left || 0,
    }),
    [baseStyle]
  );

  const getCurrentElementSize = useCallback(() => {
    if (!glassRef.current) {
      return { width: 0, height: 0 };
    }

    try {
      const rect = glassRef.current.getBoundingClientRect();
      return {
        width: Math.max(rect.width, 0),
        height: Math.max(rect.height, 0),
      };
    } catch (error) {
      console.warn('AtomixGlass: Error getting current element size:', error);
      return { width: 0, height: 0 };
    }
  }, []);

  const getTransformedSize = useCallback(() => {
    const currentSize = getCurrentElementSize();

    if (effectiveDisableEffects || currentSize.width === 0 || currentSize.height === 0) {
      return currentSize;
    }

    let scaleX = 1;
    let scaleY = 1;

    const simpleScaleMatch = directionalScale.match(/scale\(([^)]+)\)/);
    if (simpleScaleMatch && simpleScaleMatch[1]) {
      const scaleValue = parseFloat(simpleScaleMatch[1]);
      scaleX = scaleValue;
      scaleY = scaleValue;
    } else {
      const scaleXMatch = directionalScale.match(/scaleX\(([^)]+)\)/);
      if (scaleXMatch && scaleXMatch[1]) {
        scaleX = parseFloat(scaleXMatch[1]);
      }

      const scaleYMatch = directionalScale.match(/scaleY\(([^)]+)\)/);
      if (scaleYMatch && scaleYMatch[1]) {
        scaleY = parseFloat(scaleYMatch[1]);
      }
    }

    const transformedSize = {
      width: currentSize.width * scaleX,
      height: currentSize.height * scaleY,
    };

    if (enablePerformanceMonitoring && (scaleX !== 1 || scaleY !== 1)) {
      console.log('AtomixGlass: Scale transformation detected', {
        directionalScale,
        scaleX,
        scaleY,
        originalSize: currentSize,
        transformedSize,
      });
    }

    return transformedSize;
  }, [
    getCurrentElementSize,
    directionalScale,
    effectiveDisableEffects,
    enablePerformanceMonitoring,
  ]);

  const borderLayer1Style = useMemo(() => {
    const transformedSize = getTransformedSize();
    const borderWidth = 1.5;

    const adjustedSize = {
      width: transformedSize.width > 0 ? transformedSize.width : Math.max(glassSize.width, 0),
      height: transformedSize.height > 0 ? transformedSize.height : Math.max(glassSize.height, 0),
    };

    return {
      ...positionStyles,
      position: 'absolute' as React.CSSProperties['position'],
      inset: '0',
      borderRadius: `${Math.max(0, cornerRadius)}px`,
      transform: baseStyle.transform,
      transition: effectiveReducedMotion ? 'none' : baseStyle.transition,
      overflow: 'hidden',
      pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
      mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'],
      opacity: 0.2,
      padding: `${borderWidth}px`,
      boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
      zIndex: 4,
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      boxShadow:
        '0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35)',
      background: `linear-gradient(
        ${135 + mouseOffset.x * 1.2}deg,
        rgba(255, 255, 255, 0.0) 0%,
        rgba(255, 255, 255, ${0.12 + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
        rgba(255, 255, 255, ${0.4 + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
        rgba(255, 255, 255, 0.0) 100%
      )`,
    };
  }, [
    positionStyles,
    glassSize,
    cornerRadius,
    baseStyle,
    mouseOffset,
    effectiveReducedMotion,
    getTransformedSize,
  ]);

  const borderLayer2Style = useMemo(() => {
    const transformedSize = getTransformedSize();
    const borderWidth = 1.5;

    const adjustedSize = {
      width: transformedSize.width > 0 ? transformedSize.width : Math.max(glassSize.width, 0),
      height: transformedSize.height > 0 ? transformedSize.height : Math.max(glassSize.height, 0),
    };

    return {
      ...positionStyles,
      position: 'absolute' as React.CSSProperties['position'],
      inset: '0',
      borderRadius: `${Math.max(0, cornerRadius)}px`,
      transform: baseStyle.transform,
      transition: effectiveReducedMotion ? 'none' : baseStyle.transition,
      overflow: 'hidden',
      pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
      zIndex: 5,
      mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
      padding: `${borderWidth}px`,
      boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      boxShadow:
        '0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35)',
      background: `linear-gradient(
        ${135 + mouseOffset.x * 1.2}deg,
        rgba(255, 255, 255, 0.0) 0%,
        rgba(255, 255, 255, ${0.32 + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
        rgba(255, 255, 255, ${0.6 + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
        rgba(255, 255, 255, 0.0) 100%
      )`,
    };
  }, [
    positionStyles,
    glassSize,
    cornerRadius,
    baseStyle,
    mouseOffset,
    effectiveReducedMotion,
    getTransformedSize,
  ]);

  const hoverEffect1Style = useMemo(() => {
    return {
      ...positionStyles,
      position: 'absolute' as React.CSSProperties['position'],
      inset: '0',
      borderRadius: `${Math.max(0, cornerRadius)}px`,
      transform: baseStyle.transform,
      pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
      transition: effectiveReducedMotion ? 'none' : 'all 0.2s ease-out',
      opacity: isHovered || isActive ? 0.5 : 0,
      background: `radial-gradient(
        circle at ${50 + mouseOffset.x / 2}% ${50 + mouseOffset.y / 2}%,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 255, 255, 0) 50%
      )`,
      mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
    };
  }, [
    positionStyles,
    cornerRadius,
    baseStyle,
    isHovered,
    isActive,
    mouseOffset,
    effectiveReducedMotion,
  ]);

  const hoverEffect2Style = useMemo(() => {
    return {
      ...positionStyles,
      position: 'absolute' as React.CSSProperties['position'],
      inset: '0',
      borderRadius: `${Math.max(0, cornerRadius)}px`,
      overflow: 'hidden',
      transform: baseStyle.transform,
      pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
      transition: effectiveReducedMotion ? 'none' : 'all 0.2s ease-out',
      opacity: isActive ? 0.5 : 0,
      background: `radial-gradient(
        circle at ${50 + mouseOffset.x / 1.5}% ${50 + mouseOffset.y / 1.5}%,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 80%
      )`,
      mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
    };
  }, [positionStyles, cornerRadius, baseStyle, isActive, mouseOffset, effectiveReducedMotion]);

  const hoverEffect3Style = useMemo(() => {
    return {
      ...positionStyles,
      position: 'absolute' as React.CSSProperties['position'],
      inset: '0',
      transform: baseStyle.transform,
      borderRadius: `${Math.max(0, cornerRadius)}px`,
      pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
      transition: effectiveReducedMotion ? 'none' : 'all 0.2s ease-out',
      opacity: isHovered ? 0.4 : isActive ? 0.8 : 0,
      background: `radial-gradient(
        circle at ${50 + mouseOffset.x}% ${50 + mouseOffset.y}%,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      )`,
      mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
    };
  }, [
    positionStyles,
    cornerRadius,
    baseStyle,
    isHovered,
    isActive,
    mouseOffset,
    effectiveReducedMotion,
  ]);

  return (
    <div
      style={{ ...positionStyles, position: 'relative' }}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={onClick ? (tabIndex ?? 0) : tabIndex}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={onClick ? false : undefined}
      onKeyDown={
        onClick
          ? e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div
        className={`u-bg-dark ${overLight ? 'u-opacity-50' : 'u-opacity-0'}`}
        style={{
          ...positionStyles,
          height: glassSize.height,
          width: glassSize.width,
          borderRadius: `${cornerRadius}px`,
          transform: baseStyle.transform,
          transition: baseStyle.transition,
          willChange: 'transform',
        }}
      />
      <div
        className={`u-bg-black ${overLight ? 'u-opacity-25' : 'u-opacity-0'}`}
        style={{
          ...positionStyles,
          height: glassSize.height,
          width: glassSize.width,
          borderRadius: `${cornerRadius}px`,
          transform: baseStyle.transform,
          transition: baseStyle.transition,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      <GlassContainer
        ref={glassRef}
        className={className}
        style={{
          ...baseStyle,
          transform: baseStyle.transform,
        }}
        cornerRadius={cornerRadius}
        displacementScale={
          effectiveDisableEffects ? 0 : overLight ? displacementScale * 0.5 : displacementScale
        }
        blurAmount={effectiveDisableEffects ? 0 : blurAmount}
        saturation={effectiveHighContrast ? 200 : saturation}
        aberrationIntensity={effectiveDisableEffects ? 0 : aberrationIntensity}
        glassSize={glassSize}
        padding={padding}
        mouseOffset={effectiveDisableEffects ? { x: 0, y: 0 } : mouseOffset}
        globalMousePos={effectiveDisableEffects ? { x: 0, y: 0 } : globalMousePos}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        active={isActive}
        isHovered={isHovered}
        isActive={isActive}
        overLight={overLight}
        onClick={onClick}
        mode={effectiveDisableEffects ? 'standard' : mode}
        transform={baseStyle.transform}
      >
        {children}
      </GlassContainer>

      <span style={borderLayer1Style} />

      <span style={borderLayer2Style} />

      {Boolean(onClick) && (
        <>
          <div style={hoverEffect1Style} />
          <div style={hoverEffect2Style} />
          <div style={hoverEffect3Style} />
        </>
      )}
    </div>
  );
}

export default AtomixGlass;
