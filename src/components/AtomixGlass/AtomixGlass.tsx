import {
  type CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { ShaderDisplacementGenerator, fragmentShaders } from './shader-utils';
import { displacementMap, polarDisplacementMap, prominentDisplacementMap } from './utils';
import { AtomixGlassProps } from '../../lib/types/components';

// Generate shader-based displacement map using shaderUtils
const generateShaderDisplacementMap = (width: number, height: number): string => {
  const generator = new ShaderDisplacementGenerator({
    width,
    height,
    fragment: fragmentShaders.liquidGlass,
  });

  const dataUrl = generator.updateShader();
  generator.destroy();

  return dataUrl;
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

/* ---------- SVG filter (edge-only displacement) ---------- */
const GlassFilter: React.FC<{
  id: string;
  displacementScale: number;
  aberrationIntensity: number;

  mode: 'standard' | 'polar' | 'prominent' | 'shader';
  shaderMapUrl?: string;
}> = ({ id, displacementScale, aberrationIntensity, mode, shaderMapUrl }) => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0 }} aria-hidden="true">
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

        {/* Create edge mask using the displacement map itself */}
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

        {/* Original undisplaced image for center */}
        <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

        {/* Red channel displacement with slight offset */}
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

        {/* Green channel displacement */}
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

        {/* Blue channel displacement with slight offset */}
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

        {/* Combine all channels with screen blend mode for chromatic aberration */}
        <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
        <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

        {/* Add slight blur to soften the aberration effect */}
        <feGaussianBlur
          in="RGB_COMBINED"
          stdDeviation={Math.max(0.1, 0.5 - aberrationIntensity * 0.1)}
          result="ABERRATED_BLURRED"
        />

        {/* Apply edge mask to aberration effect */}
        <feComposite
          in="ABERRATED_BLURRED"
          in2="EDGE_MASK"
          operator="in"
          result="EDGE_ABERRATION"
        />

        {/* Create inverted mask for center */}
        <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />

        {/* Combine edge aberration with clean center */}
        <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
      </filter>
    </defs>
  </svg>
);

/* ---------- Glass Container Component ---------- */
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
    onMouseLeave?: () => void;
    onMouseEnter?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    active?: boolean;
    overLight?: boolean;
    cornerRadius?: number;
    glassSize?: { width: number; height: number };
    onClick?: () => void;
    mode?: 'standard' | 'polar' | 'prominent' | 'shader';
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
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      active = false,
      overLight = false,
      cornerRadius = 20,
      glassSize = { width: 270, height: 69 },
      onClick,
      mode = 'standard',
    },
    ref
  ) => {
    const filterId = useId();
    const [shaderMapUrl, setShaderMapUrl] = useState<string>('');

    const isFirefox =
      typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');

    // Generate shader displacement map when in shader mode
    useEffect(() => {
      if (mode === 'shader') {
        const url = generateShaderDisplacementMap(glassSize.width, glassSize.height);
        setShaderMapUrl(url);
      }
    }, [mode, glassSize.width, glassSize.height]);

    const backdropStyle = {
      filter: `url(#${filterId})`,
      backdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
    };

    return (
      <div
        ref={ref}
        className={`c-glass-container ${className} ${active ? 'c-glass-container--active' : ''} ${Boolean(onClick) ? 'c-glass-container--clickable' : ''} ${overLight ? 'c-glass-container--over-light' : ''}`}
        style={style}
        onClick={onClick}
      >
        <GlassFilter
          mode={mode}
          id={filterId}
          displacementScale={displacementScale}
          aberrationIntensity={aberrationIntensity}
         
          shaderMapUrl={shaderMapUrl}
        />

        <div
          className="c-glass-container__glass"
          style={{
            borderRadius: `${cornerRadius}px`,
            position: 'relative',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {/* backdrop layer that gets wiggly */}
          <span
            className="c-glass-container__warp"
            style={{
              ...backdropStyle,
              position: 'absolute',
              inset: 1,
              zIndex: 0,
              borderRadius: `${cornerRadius}px`,
              overflow: 'hidden',
            }}
          />

          {/* user content stays sharp */}
          <div
            className="c-glass-container__content"
            style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: `${cornerRadius}px`,
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

/* ---------- Main AtomixGlass Component ---------- */
export const AtomixGlass = forwardRef<HTMLDivElement, AtomixGlassProps>(
  (
    {
      children,
  displacementScale = 70,
  blurAmount = 12,
  saturation = 180,
  aberrationIntensity = 2,
      elasticity = 0.15,
      cornerRadius = 20,
      globalMousePos: externalGlobalMousePos,
      mouseOffset: externalMouseOffset,
      mouseContainer = null,
      className = '',
      overLight = false,
      style = {},
      mode = 'standard',
      onClick,
      showBorderEffects = true,
      showHoverEffects = true,
    },
    ref
  ) => {
    const glassRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [glassSize, setGlassSize] = useState({ width: 270, height: 69 });
    const [internalGlobalMousePos, setInternalGlobalMousePos] = useState({ x: 0, y: 0 });
    const [internalMouseOffset, setInternalMouseOffset] = useState({ x: 0, y: 0 });

    // Use external mouse position if provided, otherwise use internal
    const globalMousePos = externalGlobalMousePos || internalGlobalMousePos;
    const mouseOffset = externalMouseOffset || internalMouseOffset;

    // Internal mouse tracking
    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        const container = mouseContainer?.current || glassRef.current;
        if (!container) {
          return;
        }

        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setInternalMouseOffset({
          x: ((e.clientX - centerX) / rect.width) * 100,
          y: ((e.clientY - centerY) / rect.height) * 100,
        });

        setInternalGlobalMousePos({
          x: e.clientX,
          y: e.clientY,
        });
      },
      [mouseContainer]
    );

    // Set up mouse tracking if no external mouse position is provided
    useEffect(() => {
      if (externalGlobalMousePos && externalMouseOffset) {
        // External mouse tracking is provided, don't set up internal tracking
        return;
      }

      const container = mouseContainer?.current || glassRef.current;
      if (!container) {
        return;
      }

      container.addEventListener('mousemove', handleMouseMove);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }, [handleMouseMove, mouseContainer, externalGlobalMousePos, externalMouseOffset]);

    // Calculate directional scaling based on mouse position
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

      // Calculate distance from mouse to pill edges (not center)
      const edgeDistanceX = Math.max(0, Math.abs(deltaX) - pillWidth / 2);
      const edgeDistanceY = Math.max(0, Math.abs(deltaY) - pillHeight / 2);
      const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY);

      // Activation zone: 200px from edges
      const activationZone = 200;

      // If outside activation zone, no effect
      if (edgeDistance > activationZone) {
        return 'scale(1)';
      }

      // Calculate fade-in factor (1 at edge, 0 at activation zone boundary)
      const fadeInFactor = 1 - edgeDistance / activationZone;

      // Normalize the deltas for direction
      const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (centerDistance === 0) {
        return 'scale(1)';
      }

      const normalizedX = deltaX / centerDistance;
      const normalizedY = deltaY / centerDistance;

      // Calculate stretch factors with fade-in
      const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity * fadeInFactor;

      // X-axis scaling: stretch horizontally when moving left/right, compress when moving up/down
      const scaleX =
        1 +
        Math.abs(normalizedX) * stretchIntensity * 0.3 -
        Math.abs(normalizedY) * stretchIntensity * 0.15;

      // Y-axis scaling: stretch vertically when moving up/down, compress when moving left/right
      const scaleY =
        1 +
        Math.abs(normalizedY) * stretchIntensity * 0.3 -
        Math.abs(normalizedX) * stretchIntensity * 0.15;

      return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
    }, [globalMousePos, elasticity, glassSize]);

    // Helper function to calculate fade-in factor based on distance from element edges
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

    // Helper function to calculate elastic translation
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

    // Update glass size whenever component mounts or window resizes
    useEffect(() => {
      const updateGlassSize = () => {
        if (glassRef.current) {
          const rect = glassRef.current.getBoundingClientRect();
          setGlassSize({ width: rect.width, height: rect.height });
        }
      };

      updateGlassSize();
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateGlassSize);
        return () => window.removeEventListener('resize', updateGlassSize);
      }
    }, []);

    const transformStyle = `translate(${calculateElasticTranslation().x}px, ${calculateElasticTranslation().y}px) ${isActive && Boolean(onClick) ? 'scale(0.96)' : calculateDirectionalScale()}`;

    const baseStyle = {
      position: 'relative' as const,
      ...style,
      transform: transformStyle,
      transition: 'all ease-out 0.2s',
    };

    const positionStyles = {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    return (
      <div
        className={`c-atomix-glass ${Boolean(onClick) ? 'c-atomix-glass--clickable' : ''} ${isActive ? 'c-atomix-glass--active' : ''} ${overLight ? 'c-atomix-glass--over-light' : ''}`}
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {/* Over light effect */}
        <div
          className={`c-atomix-glass__over-light ${overLight ? 'c-atomix-glass__over-light--active' : ''}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            borderRadius: `${cornerRadius}px`,
            transform: baseStyle.transform,
            transition: baseStyle.transition,
            backgroundColor: 'black',
            opacity: overLight ? 0.2 : 0,
            pointerEvents: 'none',
          }}
        />
        <div
          className={`c-atomix-glass__over-light-overlay ${overLight ? 'c-atomix-glass__over-light-overlay--active' : ''}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            borderRadius: `${cornerRadius}px`,
            transform: baseStyle.transform,
            transition: baseStyle.transition,
            backgroundColor: 'black',
            opacity: overLight ? 1 : 0,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />

        <GlassContainer
          ref={glassRef}
          className={className}
          style={{ ...baseStyle, position: 'relative', zIndex: 1 }}
          cornerRadius={cornerRadius}
          displacementScale={overLight ? displacementScale * 0.5 : displacementScale}
          blurAmount={blurAmount}
          saturation={saturation}
          aberrationIntensity={aberrationIntensity}
          glassSize={glassSize}
          mouseOffset={mouseOffset}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          active={isActive}
          overLight={overLight}
          onClick={onClick}
          mode={mode}
        >
          {children}
        </GlassContainer>


        {/* Border Effects */}
        {showBorderEffects && (
          <>
            <span
              className="c-atomix-glass__border"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                borderRadius: `${cornerRadius}px`,
                transform: baseStyle.transform,
                transition: baseStyle.transition,
                pointerEvents: 'none',
                mixBlendMode: 'screen',
                opacity: 0.2,
                zIndex:1,
                padding: '1.5px',
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
              } as React.CSSProperties}
            />
            <span
              className="c-atomix-glass__border-overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex:1,
                borderRadius: `${cornerRadius}px`,
                transform: baseStyle.transform,
                transition: baseStyle.transition,
                pointerEvents: 'none',
                mixBlendMode: 'overlay',
                padding: '1.5px',
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
              } as React.CSSProperties}
            />
          </>
        )}

        {/* Hover Effects */}
        {showHoverEffects && Boolean(onClick) && (
          <>
            <div
              className="c-atomix-glass__hover-effect"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                borderRadius: `${cornerRadius}px`,
                transform: baseStyle.transform,
                pointerEvents: 'none',
                transition: 'all 0.2s ease-out',
                opacity: isHovered || isActive ? 0.5 : 0,
                backgroundImage:
                  'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%)',
                mixBlendMode: 'overlay',
              }}
            />
            <div
              className="c-atomix-glass__active-effect"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                borderRadius: `${cornerRadius}px`,
                transform: baseStyle.transform,
                pointerEvents: 'none',
                transition: 'all 0.2s ease-out',
                opacity: isActive ? 0.5 : 0,
                backgroundImage:
                  'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 80%)',
                mixBlendMode: 'overlay',
              }}
            />
          </>
        )}
      </div>
    );
  }
);

AtomixGlass.displayName = 'AtomixGlass';

export default AtomixGlass;
