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
import {
  ShaderDisplacementGenerator,
  fragmentShaders,
  type FragmentShaderType,
} from './shader-utils';
import { displacementMap, polarDisplacementMap, prominentDisplacementMap } from './utils';

// Types
type DisplacementMode = 'standard' | 'polar' | 'prominent' | 'shader';
type MousePosition = { x: number; y: number };
type GlassSize = { width: number; height: number };
type OverLightConfig =
  | boolean
  | 'auto'
  | { threshold?: number; opacity?: number; contrast?: number };
type OverLightObjectConfig = { threshold?: number; opacity?: number; contrast?: number };

// Constants
const ACTIVATION_ZONE = 200;
const MIN_BLUR = 0.1;
const MOUSE_INFLUENCE_DIVISOR = 100;
const EDGE_FADE_PIXELS = 2;

// Helper functions with validation
const calculateDistance = (pos1: MousePosition, pos2: MousePosition): number => {
  if (
    !pos1 ||
    !pos2 ||
    typeof pos1.x !== 'number' ||
    typeof pos1.y !== 'number' ||
    typeof pos2.x !== 'number' ||
    typeof pos2.y !== 'number'
  ) {
    return 0;
  }
  const deltaX = pos1.x - pos2.x;
  const deltaY = pos1.y - pos2.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};

const calculateElementCenter = (rect: DOMRect | null): MousePosition => {
  if (!rect) {
    return { x: 0, y: 0 };
  }
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

const calculateMouseInfluence = (mouseOffset: MousePosition): number => {
  if (!mouseOffset || typeof mouseOffset.x !== 'number' || typeof mouseOffset.y !== 'number') {
    return 0;
  }
  return (
    Math.sqrt(mouseOffset.x * mouseOffset.x + mouseOffset.y * mouseOffset.y) /
    MOUSE_INFLUENCE_DIVISOR
  );
};

const clampBlur = (value: number): number => {
  if (typeof value !== 'number' || isNaN(value)) {
    return MIN_BLUR;
  }
  return Math.max(MIN_BLUR, value);
};

const validateGlassSize = (size: GlassSize): boolean => {
  return (
    size &&
    typeof size.width === 'number' &&
    typeof size.height === 'number' &&
    size.width > 0 &&
    size.height > 0
  );
};

const generateShaderDisplacementMap = (
  width: number,
  height: number,
  mousePosition?: MousePosition
): string => {
  try {
    const generator = new ShaderDisplacementGenerator({
      width,
      height,
      fragment: fragmentShaders.liquidGlass,
    });

    const dataUrl = generator.updateShader(mousePosition);
    generator.destroy();

    return dataUrl;
  } catch (error) {
    console.warn('AtomixGlass: Failed to generate shader displacement map:', error);
    return displacementMap;
  }
};

const getDisplacementMap = (mode: DisplacementMode, shaderMapUrl?: string): string => {
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
      console.warn('AtomixGlass: Invalid displacement mode');
      return displacementMap;
  }
};

interface GlassFilterProps {
  id: string;
  displacementScale: number;
  aberrationIntensity: number;
  mode: DisplacementMode;
  shaderMapUrl?: string;
}

const GlassFilter: React.FC<GlassFilterProps> = ({
  id,
  displacementScale,
  aberrationIntensity,
  mode,
  shaderMapUrl,
}) => (
  <svg
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      inset: 0,
      visibility: 'hidden',
      opacity: 0,
    }}
    aria-hidden="true"
  >
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
          href={getDisplacementMap(mode, shaderMapUrl)}
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
          scale={displacementScale * ((mode === 'shader' ? 1 : -1) - aberrationIntensity * 0.02)}
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
          scale={displacementScale * ((mode === 'shader' ? 1 : -1) - aberrationIntensity * 0.03)}
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

interface GlassContainerProps {
  className?: string;
  style?: React.CSSProperties;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  mouseOffset?: MousePosition;
  globalMousePosition?: MousePosition;
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
  glassSize?: GlassSize;
  onClick?: () => void;
  mode?: DisplacementMode;
  transform?: string;
  effectiveDisableEffects?: boolean;
  effectiveReducedMotion?: boolean;
  shaderVariant?: FragmentShaderType;
  children?: React.ReactNode;
}

const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  (
    {
      children,
      className = '',
      style,
      displacementScale = 25,
      blurAmount = 0.0625,
      saturation = 180,
      aberrationIntensity = 2,
      mouseOffset = { x: 0, y: 0 },
      globalMousePosition = { x: 0, y: 0 },
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
      effectiveDisableEffects = false,
      effectiveReducedMotion = false,
      shaderVariant = 'liquidGlass',
    },
    ref
  ) => {
    const filterId = useId();
    const [shaderMapUrl, setShaderMapUrl] = useState<string>('');
    const shaderGeneratorRef = useRef<ShaderDisplacementGenerator | null>(null);

    // Generate initial shader map when mode/size/variant changes
    useEffect(() => {
      if (mode === 'shader' && glassSize.width > 0 && glassSize.height > 0) {
        shaderGeneratorRef.current?.destroy();
        const selectedShader = fragmentShaders[shaderVariant] || fragmentShaders.liquidGlass;
        shaderGeneratorRef.current = new ShaderDisplacementGenerator({
          width: glassSize.width,
          height: glassSize.height,
          fragment: selectedShader,
        });
        const url = shaderGeneratorRef.current.updateShader();
        setShaderMapUrl(url);
      }
      return () => {
        shaderGeneratorRef.current?.destroy();
        shaderGeneratorRef.current = null;
      };
    }, [mode, glassSize.width, glassSize.height, shaderVariant]);

    useEffect(() => {
      if (!ref || typeof ref === 'function') return;

      const element = (ref as React.RefObject<HTMLDivElement>).current;
      if (!element) return;

      const timeoutId = setTimeout(() => {
        // Force reflow to ensure proper sizing
        element.offsetHeight;
      }, 0);

      return () => clearTimeout(timeoutId);
    }, [cornerRadius, glassSize.width, glassSize.height]);

    const [rectCache, setRectCache] = useState<DOMRect | null>(null);

    useEffect(() => {
      if (!ref || typeof ref === 'function') return;
      const element = (ref as React.RefObject<HTMLDivElement>).current;
      if (!element) return;
      setRectCache(element.getBoundingClientRect());
    }, [ref, glassSize]);

    const liquidBlur = useMemo(() => {
      const defaultBlur = {
        baseBlur: blurAmount,
        edgeBlur: blurAmount * 1.25,
        centerBlur: blurAmount * 1.1,
        flowBlur: blurAmount * 1.2,
      };

      if (!rectCache || !globalMousePosition.x || !globalMousePosition.y) {
        return defaultBlur;
      }

      const center = calculateElementCenter(rectCache);
      const distance = calculateDistance(globalMousePosition, center);
      const maxDistance =
        Math.sqrt(rectCache.width * rectCache.width + rectCache.height * rectCache.height) / 2;
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      const mouseInfluence = calculateMouseInfluence(mouseOffset);

      const baseBlur = blurAmount + mouseInfluence * blurAmount * 0.4;
      const edgeIntensity = normalizedDistance * 1.5 + mouseInfluence * 0.3;
      const edgeBlur = baseBlur * (0.8 + edgeIntensity * 0.6);
      const centerIntensity = (1 - normalizedDistance) * 0.3 + mouseInfluence * 0.2;
      const centerBlur = baseBlur * (0.3 + centerIntensity * 0.4);
      const deltaX = globalMousePosition.x - center.x;
      const deltaY = globalMousePosition.y - center.y;
      const flowDirection = Math.atan2(deltaY, deltaX);
      const flowIntensity = Math.sin(flowDirection + mouseInfluence * Math.PI) * 0.5 + 0.5;
      const flowBlur = baseBlur * (0.4 + flowIntensity * 0.6);

      const hoverMultiplier = isHovered ? 1.2 : 1;
      const activeMultiplier = isActive ? 1.4 : 1;
      const stateMultiplier = hoverMultiplier * activeMultiplier;

      return {
        baseBlur: clampBlur(baseBlur * stateMultiplier),
        edgeBlur: clampBlur(edgeBlur * stateMultiplier),
        centerBlur: clampBlur(centerBlur * stateMultiplier),
        flowBlur: clampBlur(flowBlur * stateMultiplier),
      };
    }, [blurAmount, globalMousePosition, mouseOffset, isHovered, isActive, rectCache]);

    const backdropStyle = useMemo(() => {
      const dynamicSaturation = saturation + liquidBlur.baseBlur * 20;

      const blurLayers = [
        `blur(${liquidBlur.baseBlur}px)`,
        `blur(${liquidBlur.edgeBlur}px)`,
        `blur(${liquidBlur.centerBlur}px)`,
        `blur(${liquidBlur.flowBlur}px)`,
      ];

      return {
        backdropFilter: `${blurLayers.join(' ')} saturate(${Math.min(dynamicSaturation, 200)}%) url(#${filterId})`,
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

          {/* Enhanced Apple Liquid Glass Inner Shadow Layer */}
          <div
            style={{
              position: 'absolute',
              inset: '1px',
              borderRadius: `${cornerRadius}px`,
              pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
              zIndex: 5,
              boxShadow: overLight
                ? [
                    `inset 0 1px 0 rgba(255, 255, 255, ${0.4 + (mouseOffset?.x || 0) * 0.002})`,
                    `inset 0 -1px 0 rgba(0, 0, 0, ${0.2 + Math.abs(mouseOffset?.y || 0) * 0.001})`,
                    `inset 0 0 20px rgba(0, 0, 0, ${0.08 + Math.abs((mouseOffset?.x || 0) + (mouseOffset?.y || 0)) * 0.001})`,
                    `0 2px 12px rgba(0, 0, 0, ${0.12 + Math.abs(mouseOffset?.y || 0) * 0.002})`,
                  ].join(', ')
                : [
                    '0 0 20px rgba(0, 0, 0, 0.15) inset',
                    '0 4px 8px rgba(0, 0, 0, 0.08) inset',
                  ].join(', '),
              opacity: effectiveDisableEffects ? 0 : 1,
              // transition: effectiveReducedMotion ? 'none' : 'all 0.2s ease-out',
              background: overLight
                ? `linear-gradient(${180 + (mouseOffset?.x || 0) * 0.5}deg,
                    rgba(255, 255, 255, 0.1) 0%,
                    transparent 20%,
                    transparent 80%,
                    rgba(0, 0, 0, 0.05) 100%)`
                : 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 4,
              textShadow: overLight
                ? `0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 8px rgba(0, 0, 0, 0.1)`
                : '0px 2px 12px rgba(0, 0, 0, 0.4)',
              // filter: overLight ? `brightness(${0.95}) contrast(${1.1})` : 'none',
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
  globalMousePosition?: MousePosition;
  mouseOffset?: MousePosition;
  mouseContainer?: React.RefObject<HTMLElement | null> | null;
  className?: string;
  padding?: string;
  style?: React.CSSProperties;
  overLight?: OverLightConfig;
  mode?: DisplacementMode;
  onClick?: () => void;

  // Shader variant selection
  shaderVariant?: FragmentShaderType;

  // Accessibility props
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;

  // Performance and accessibility options
  reducedMotion?: boolean;
  highContrast?: boolean;
  disableEffects?: boolean;

  // Performance monitoring
  enablePerformanceMonitoring?: boolean;
}

/**
 * AtomixGlass - A high-performance glass morphism component with liquid distortion effects
 *
 * Features:
 * - Hardware-accelerated glass effects with SVG filters
 * - Mouse-responsive liquid distortion
 * - Automatic light/dark theme detection
 * - Accessibility and performance optimizations
 * - Multiple displacement modes (standard, polar, prominent, shader)
 */
export function AtomixGlass({
  children,
  displacementScale = 20,
  blurAmount = 1,
  saturation = 140,
  aberrationIntensity = 2.5,
  elasticity = 0.05,
  cornerRadius = 16,
  globalMousePosition: externalGlobalMousePosition,
  mouseOffset: externalMouseOffset,
  mouseContainer = null,
  className = '',
  padding = '0 0',
  overLight = false,
  style = {},
  mode = 'standard',
  onClick,
  shaderVariant = 'liquidGlass',
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
  const [glassSize, setGlassSize] = useState<GlassSize>({ width: 270, height: 69 });
  const [internalGlobalMousePosition, setInternalGlobalMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [internalMouseOffset, setInternalMouseOffset] = useState<MousePosition>({ x: 0, y: 0 });

  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState(false);
  const [userPrefersHighContrast, setUserPrefersHighContrast] = useState(false);
  const [detectedOverLight, setDetectedOverLight] = useState(false);

  // Memoized derived values for performance
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

  useEffect(() => {
    // Enhanced auto-detect light background with multiple sampling points
    if (overLight === 'auto' && glassRef.current) {
      try {
        const element = glassRef.current;
        const rect = element.getBoundingClientRect();

        let totalLuminance = 0;
        let validSamples = 0;

        // Check parent elements and computed styles
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

        // Use canvas sampling as fallback for complex backgrounds
        if (validSamples === 0 && typeof document !== 'undefined') {
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = 1;
              canvas.height = 1;

              // Sample the background at element position
              const imageData = ctx.getImageData(0, 0, 1, 1);
              const r = imageData.data[0] || 0;
              const g = imageData.data[1] || 0;
              const b = imageData.data[2] || 0;
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              totalLuminance = luminance;
              validSamples = 1;
            }
          } catch (canvasError) {
            // Canvas sampling failed, use default
          }
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
  }, []);

  // Derived values are now memoized above

  const globalMousePosition = useMemo(
    () => externalGlobalMousePosition || internalGlobalMousePosition,
    [externalGlobalMousePosition, internalGlobalMousePosition]
  );
  const mouseOffset = useMemo(
    () => externalMouseOffset || internalMouseOffset,
    [externalMouseOffset, internalMouseOffset]
  );

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
    [mouseContainer, enablePerformanceMonitoring]
  );

  useEffect(() => {
    if (externalGlobalMousePosition && externalMouseOffset) {
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
    externalGlobalMousePosition,
    externalMouseOffset,
    effectiveDisableEffects,
  ]);

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

    if (edgeDistance > ACTIVATION_ZONE) {
      return 'scale(1)';
    }

    const fadeInFactor = 1 - edgeDistance / ACTIVATION_ZONE;
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
  }, [globalMousePosition, elasticity, glassSize]);

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

    return edgeDistance > ACTIVATION_ZONE ? 0 : 1 - edgeDistance / ACTIVATION_ZONE;
  }, [globalMousePosition, glassSize]);

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
  }, [globalMousePosition, elasticity, calculateFadeInFactor]);

  useEffect(() => {
    const isValidElement = (element: HTMLElement | null): element is HTMLElement =>
      element !== null && element instanceof HTMLElement && element.isConnected;

    const validateSize = (size: GlassSize): boolean =>
      validateGlassSize(size) && size.width <= 4096 && size.height <= 4096;

    let rafId: number | null = null;
    let lastSize = { width: 0, height: 0 };
    let lastCornerRadius = cornerRadius;

    const updateGlassSize = (forceUpdate = false): void => {
      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (!isValidElement(glassRef.current)) return;

        const rect = glassRef.current.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const cornerRadiusOffset = Math.max(0, cornerRadius * 0.1);
        const newSize: GlassSize = {
          width: Math.round(rect.width + cornerRadiusOffset),
          height: Math.round(rect.height + cornerRadiusOffset),
        };

        const cornerRadiusChanged = lastCornerRadius !== cornerRadius;
        const dimensionsChanged =
          newSize.width !== lastSize.width || newSize.height !== lastSize.height;

        if ((forceUpdate || cornerRadiusChanged || dimensionsChanged) && validateSize(newSize)) {
          lastSize = newSize;
          lastCornerRadius = cornerRadius;
          setGlassSize(newSize);
        }

        rafId = null;
      });
    };

    let resizeTimeoutId: NodeJS.Timeout | null = null;
    const debouncedResizeHandler = (): void => {
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(updateGlassSize, 16);
    };

    updateGlassSize(true);

    let resizeObserver: ResizeObserver | null = null;
    let fallbackInterval: NodeJS.Timeout | null = null;

    const hasResizeObserver = typeof ResizeObserver !== 'undefined';

    if (hasResizeObserver && isValidElement(glassRef.current)) {
      try {
        resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target === glassRef.current) {
              updateGlassSize();
              break;
            }
          }
        });
        resizeObserver.observe(glassRef.current);
      } catch {
        fallbackInterval = setInterval(
          () => isValidElement(glassRef.current) && updateGlassSize(),
          100
        );
      }
    } else {
      fallbackInterval = setInterval(
        () => isValidElement(glassRef.current) && updateGlassSize(),
        100
      );
    }

    window.addEventListener('resize', debouncedResizeHandler, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      if (fallbackInterval) clearInterval(fallbackInterval);
      window.removeEventListener('resize', debouncedResizeHandler);
      resizeObserver?.disconnect();
    };
  }, [cornerRadius, enablePerformanceMonitoring]);

  useEffect(() => {
    if (!glassRef.current) return;

    const timeoutId = setTimeout(() => {
      if (!glassRef.current) return;

      const rect = glassRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const cornerRadiusOffset = Math.max(0, cornerRadius * 0.1);
        setGlassSize({
          width: Math.round(rect.width + cornerRadiusOffset),
          height: Math.round(rect.height + cornerRadiusOffset),
        });
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [cornerRadius]);

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

  const adjustedSize = {
    width:
      baseStyle.position !== 'fixed'
        ? '100%'
        : baseStyle.width
          ? baseStyle.width
          : Math.max(glassSize.width, 0),
    height:
      baseStyle.position !== 'fixed'
        ? '100%'
        : baseStyle.height
          ? baseStyle.height
          : Math.max(glassSize.height, 0),
  };

  const cssVars = useMemo(() => ({
    '--atomix-glass-position': positionStyles.position,
    '--atomix-glass-top': positionStyles.top,
    '--atomix-glass-left': positionStyles.left,
    '--atomix-glass-width': adjustedSize.width,
    '--atomix-glass-height': adjustedSize.height,
    '--atomix-glass-radius': `${Math.max(0, cornerRadius)}px`,
    '--atomix-glass-transform': baseStyle.transform,
    '--atomix-glass-transition': effectiveReducedMotion ? 'none' : baseStyle.transition,
    '--atomix-glass-mouse-x': mouseOffset.x,
    '--atomix-glass-mouse-y': mouseOffset.y,
  } as React.CSSProperties), [positionStyles, adjustedSize, cornerRadius, baseStyle, effectiveReducedMotion, mouseOffset]);



  const hoverVars = useMemo(() => {
    const isOverLight = overLightConfig?.isOverLight;
    return {
      '--atomix-glass-hover-opacity': isHovered || isActive ? (isOverLight ? 0.3 : 0.5) : 0,
      '--atomix-glass-hover-bg': isOverLight
        ? `radial-gradient(circle at ${50 + mouseOffset.x / 2}% ${50 + mouseOffset.y / 2}%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 0) 60%)`
        : `radial-gradient(circle at ${50 + mouseOffset.x / 2}% ${50 + mouseOffset.y / 2}%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%)`,
      '--atomix-glass-hover-blend': isOverLight ? 'multiply' : 'overlay',
    } as React.CSSProperties;
  }, [isHovered, isActive, mouseOffset, overLightConfig]);

  const activeVars = useMemo(() => {
    const isOverLight = overLightConfig?.isOverLight;
    return {
      '--atomix-glass-active-opacity': isActive ? (isOverLight ? 0.4 : 0.5) : 0,
      '--atomix-glass-active-bg': isOverLight
        ? `radial-gradient(circle at ${50 + mouseOffset.x / 1.5}% ${50 + mouseOffset.y / 1.5}%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 80%)`
        : `radial-gradient(circle at ${50 + mouseOffset.x / 1.5}% ${50 + mouseOffset.y / 1.5}%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 80%)`,
      '--atomix-glass-active-blend': isOverLight ? 'multiply' : 'overlay',
    } as React.CSSProperties;
  }, [isActive, mouseOffset, overLightConfig]);

  const hoverActiveVars = useMemo(() => {
    const isOverLight = overLightConfig?.isOverLight;
    return {
      '--atomix-glass-hover-active-opacity': isHovered ? (isOverLight ? 0.25 : 0.4) : isActive ? (isOverLight ? 0.5 : 0.8) : 0,
      '--atomix-glass-hover-active-bg': isOverLight
        ? `radial-gradient(circle at ${50 + mouseOffset.x}% ${50 + mouseOffset.y}%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%)`
        : `radial-gradient(circle at ${50 + mouseOffset.x}% ${50 + mouseOffset.y}%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)`,
      '--atomix-glass-hover-active-blend': isOverLight ? 'multiply' : 'overlay',
    } as React.CSSProperties;
  }, [isHovered, isActive, mouseOffset, overLightConfig]);

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
      <GlassContainer
        ref={glassRef}
        className={className}
        style={{
          ...baseStyle,
          transform: baseStyle.transform,
        }}
        cornerRadius={cornerRadius}
        displacementScale={
          effectiveDisableEffects
            ? 0
            : mode === 'shader'
              ? displacementScale * 0.8
              : overLightConfig.isOverLight
                ? displacementScale * 0.6
                : displacementScale
        }
        blurAmount={effectiveDisableEffects ? 0 : blurAmount}
        saturation={
          effectiveHighContrast
            ? 200
            : overLightConfig.isOverLight
              ? saturation * overLightConfig.saturationBoost
              : saturation
        }
        aberrationIntensity={
          effectiveDisableEffects
            ? 0
            : mode === 'shader'
              ? aberrationIntensity * 0.7
              : aberrationIntensity
        }
        glassSize={glassSize}
        padding={padding}
        mouseOffset={effectiveDisableEffects ? { x: 0, y: 0 } : mouseOffset}
        globalMousePosition={effectiveDisableEffects ? { x: 0, y: 0 } : globalMousePosition}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        active={isActive}
        isHovered={isHovered}
        isActive={isActive}
        overLight={overLightConfig?.isOverLight || false}
        onClick={onClick}
        mode={mode}
        transform={baseStyle.transform}
        effectiveDisableEffects={effectiveDisableEffects}
        effectiveReducedMotion={effectiveReducedMotion}
        shaderVariant={shaderVariant}
      >
        {children}
      </GlassContainer>
      <span className="atomix-glass__border-layer-1" style={cssVars} />
      <span className="atomix-glass__border-layer-2" style={cssVars} />

      {Boolean(onClick) && (
        <>
          <div className="atomix-glass__hover-effect-1" style={{ ...cssVars, ...hoverVars }} />
          <div className="atomix-glass__hover-effect-2" style={{ ...cssVars, ...activeVars }} />
          <div className="atomix-glass__hover-effect-3" style={{ ...cssVars, ...hoverActiveVars }} />
        </>
      )}
      <div
        className="atomix-glass__base-layer"
        style={{
          ...cssVars,
          '--atomix-glass-base-bg': overLightConfig.isOverLight
            ? `linear-gradient(135deg, rgba(0, 0, 0, ${0.12 + mouseOffset.x * 0.002}) 0%, rgba(0, 0, 0, ${0.08 + mouseOffset.y * 0.001}) 50%, rgba(0, 0, 0, ${0.15 + Math.abs(mouseOffset.x) * 0.003}) 100%)`
            : 'rgba(255, 255, 255, 0.1)',
          '--atomix-glass-base-opacity': overLightConfig.isOverLight ? overLightConfig.opacity : 0,
        } as React.CSSProperties}
      />
      <div
        className="atomix-glass__overlay-layer"
        style={{
          ...cssVars,
          '--atomix-glass-overlay-bg': overLightConfig.isOverLight
            ? `radial-gradient(circle at ${50 + mouseOffset.x * 0.5}% ${50 + mouseOffset.y * 0.5}%, rgba(0, 0, 0, ${0.08 + Math.abs(mouseOffset.x) * 0.002}) 0%, rgba(0, 0, 0, 0.04) 40%, rgba(0, 0, 0, ${0.12 + Math.abs(mouseOffset.y) * 0.002}) 100%)`
            : 'rgba(255, 255, 255, 0.05)',
          '--atomix-glass-overlay-opacity': overLightConfig.isOverLight ? overLightConfig.opacity * 0.9 : 0,
        } as React.CSSProperties}
      />
    </div>
  );
}

export default AtomixGlass;
