import React, { forwardRef, useId, useRef, useState, useEffect, useMemo } from 'react';
import type {
  DisplacementMode,
  MousePosition,
  GlassSize,
  AtomixGlassProps,
} from '../../lib/types/components';
import useForkRef from '../../lib/utils/useForkRef';
import { mergeClassNames } from '../../lib/utils/componentUtils';
import type { FragmentShaderType, ShaderOptions, Vec2 } from './shader-utils';
import { GlassFilter } from './GlassFilter';
import {
  getCachedShader,
  getShaderAnimationTargetFps,
  setCachedShader,
  toSafeNumber,
  validateGlassSize,
} from './glass-utils';
import { ATOMIX_GLASS } from '../../lib/constants/components';



/** Minimal interface for dynamically loaded shader displacement generators. */
interface ShaderGenerator {
  updateShader(): string;
  destroy(): void;
}

/** Fragment shader signature; must match `shader-utils.ts`. */
type FragmentShaderFn = (uv: Vec2, mousePosition?: Vec2) => Vec2;

interface ShaderUtilsModule {
  ShaderDisplacementGenerator: new (opts: ShaderOptions) => ShaderGenerator;
  fragmentShaders: Record<string, FragmentShaderFn>;
}

interface AtomixGlassContainerProps
  extends Pick<
    AtomixGlassProps,
    | 'withTimeAnimation'
    | 'animationSpeed'
    | 'withMultiLayerDistortion'
    | 'distortionOctaves'
    | 'distortionLacunarity'
    | 'distortionGain'
    | 'distortionQuality'
  > {
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
  isActive?: boolean;
  overLight?: boolean;
  overLightConfig?: {
    contrast?: number;
    brightness?: number;
    shadowIntensity?: number;
    borderOpacity?: number;
  };
  borderRadius?: number;

  glassSize?: GlassSize;
  onClick?: () => void;
  mode?: DisplacementMode;
  transform?: string;
  effectiveWithoutEffects?: boolean;
  effectiveReducedMotion?: boolean;
  shaderVariant?: FragmentShaderType;
  withLiquidBlur?: boolean;
  isFixedOrSticky?: boolean;
  elasticity?: number;

  contentRef?: React.RefObject<HTMLDivElement | null>;
  children?: React.ReactNode;
}

/**
 * Internal glass surface that owns backdrop-filter, SVG distortion, and content.
 *
 * Layout and stacking styles are applied via the `style` prop from the parent.
 * The root wrapper supplies CSS custom properties only.
 */
export const AtomixGlassContainer = forwardRef<HTMLDivElement, AtomixGlassContainerProps>(
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
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      isActive = false,
      overLight = false,
      overLightConfig = {},
      borderRadius = 0,

      glassSize = { width: 0, height: 0 },
      onClick,
      mode = 'standard',
      effectiveWithoutEffects = false,
      effectiveReducedMotion = false,
      shaderVariant = 'liquidGlass',
      withLiquidBlur = false,
      isFixedOrSticky = false,
      withTimeAnimation = false,
      animationSpeed = 1.0,
      withMultiLayerDistortion = false,
      distortionOctaves = 3,
      distortionLacunarity = 2.0,
      distortionGain = 0.5,
      distortionQuality = 'medium',

      contentRef,
    },
    ref
  ) => {
    // React 18 useId — stable, unique, and SSR-safe (no module-level counter)
    const rawId = useId();
    const filterId = useMemo(() => `atomix-glass-filter-${rawId.replace(/:/g, '')}`, [rawId]);
    const containerRef = useForkRef(ref, null);

    const [shaderMapUrl, setShaderMapUrl] = useState<string>('');
    const shaderGeneratorRef = useRef<ShaderGenerator | null>(null);
    const shaderUtilsRef = useRef<ShaderUtilsModule | null>(null);

    const shaderDebounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const shaderUpdateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const animationFrameRef = useRef<number | null>(null);

    // Lazy load shader utilities only when shader mode is needed
    useEffect(() => {
      if (mode === 'shader') {
        // Dynamic import shader utilities with animation support
        import('./shader-utils')
          .then(shaderUtils => {
            shaderUtilsRef.current = {
              ShaderDisplacementGenerator: shaderUtils.ShaderDisplacementGenerator,
              fragmentShaders: shaderUtils.fragmentShaders,
            };
          })
          .catch(error => {
            console.warn(
              'AtomixGlassContainer: Error loading shader utilities',
              String(error).replace(/[\r\n]/g, '')
            );
          });
      } else {
        // Clear shader utils when not in shader mode to free memory
        shaderUtilsRef.current = null;
      }
    }, [mode]);

    // Generate shader map with debouncing and caching
    useEffect(() => {
      // Enhanced validation for shader mode
      if (mode === 'shader' && glassSize && validateGlassSize(glassSize)) {
        // Create cache key from size and variant
        const cacheKey = `${glassSize.width}x${glassSize.height}-${shaderVariant}`;

        // Check shared cache first
        const cachedUrl = getCachedShader(cacheKey);
        if (cachedUrl) {
          setShaderMapUrl(cachedUrl);
          return;
        }

        // Clear any pending debounce
        if (shaderDebounceTimeoutRef.current) {
          clearTimeout(shaderDebounceTimeoutRef.current);
        }

        // Debounce shader generation to avoid blocking on rapid size changes
        const generateShader = () => {
          if (!shaderUtilsRef.current) {
            // Shader utils not loaded yet, retry after a short delay
            shaderDebounceTimeoutRef.current = setTimeout(generateShader, 100);
            return;
          }

          try {
            const { ShaderDisplacementGenerator, fragmentShaders } = shaderUtilsRef.current;
            shaderGeneratorRef.current?.destroy();
            const selectedShader = (fragmentShaders[shaderVariant] ??
              fragmentShaders.liquidGlass) as FragmentShaderFn;
            shaderGeneratorRef.current = new ShaderDisplacementGenerator({
              width: glassSize.width,
              height: glassSize.height,
              fragment: selectedShader,
            });

            shaderUpdateTimeoutRef.current = setTimeout(() => {
              const url = shaderGeneratorRef.current?.updateShader() ?? '';
              if (url) {
                setCachedShader(cacheKey, url);
              }
              setShaderMapUrl(url);
            }, 100);
          } catch (error) {
            console.warn('AtomixGlassContainer: Error generating shader map', error);
            setShaderMapUrl(''); // Fallback to empty string
          }
        };

        // Debounce with 500ms delay to reduce frequency
        shaderDebounceTimeoutRef.current = setTimeout(generateShader, 500);
      } else {
        // Not in shader mode, clear URL
        setShaderMapUrl('');
      }

      // Cleanup function with error handling
      return () => {
        if (shaderDebounceTimeoutRef.current) {
          clearTimeout(shaderDebounceTimeoutRef.current);
          shaderDebounceTimeoutRef.current = null;
        }
        if (shaderUpdateTimeoutRef.current) {
          clearTimeout(shaderUpdateTimeoutRef.current);
          shaderUpdateTimeoutRef.current = null;
        }
        try {
          shaderGeneratorRef.current?.destroy();
        } catch (error) {
          console.warn('AtomixGlassContainer: Error during shader cleanup', error);
        } finally {
          shaderGeneratorRef.current = null;
        }
      };
    }, [mode, glassSize, shaderVariant]);

    useEffect(() => {
      // Only run animations in shader mode with time animation enabled
      if (
        mode !== 'shader' ||
        !withTimeAnimation ||
        effectiveReducedMotion ||
        effectiveWithoutEffects
      ) {
        // Cancel any existing animation frame
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }

      const targetFps = getShaderAnimationTargetFps({
        distortionQuality,
        animationSpeed,
        withMultiLayerDistortion,
        distortionOctaves,
        distortionLacunarity,
        distortionGain,
      });
      const frameInterval = 1000 / targetFps;
      let lastUpdate = 0;
      let isCancelled = false;

      const animate = (currentTime: number) => {
        if (isCancelled) {
          return;
        }

        if (currentTime - lastUpdate >= frameInterval && shaderGeneratorRef.current) {
          lastUpdate = currentTime;
          try {
            const animatedShaderUrl = shaderGeneratorRef.current.updateShader();
            if (animatedShaderUrl) {
              setShaderMapUrl(animatedShaderUrl);
            }
          } catch (error) {
            console.warn('AtomixGlassContainer: Error in animation loop', error);
          }
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      // Start animation loop
      animationFrameRef.current = requestAnimationFrame(animate);

      // Cleanup animation on unmount or dependency change
      return () => {
        isCancelled = true;
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    }, [
      mode,
      withTimeAnimation,
      animationSpeed,
      displacementScale,
      withMultiLayerDistortion,
      distortionOctaves,
      distortionLacunarity,
      distortionGain,
      distortionQuality,
      effectiveReducedMotion,
      effectiveWithoutEffects,
      glassSize,
    ]);

    // Removed forced reflow to avoid layout thrash and potential feedback sizing loops





    const containerVars = useMemo(() => {
      try {
        return {
          '--atomix-glass-container-radius': `${typeof borderRadius === 'number' && !isNaN(borderRadius) ? borderRadius : 0}px`,
        } as React.CSSProperties;
      } catch (error) {
        console.warn('AtomixGlassContainer: Error generating container variables', error);
        return {
          '--atomix-glass-container-radius': '0px',
        } as React.CSSProperties;
      }
    }, [borderRadius]);

    return (
      <div
        ref={containerRef}
        className={mergeClassNames(
          ATOMIX_GLASS.CONTAINER_CLASS,
          className,
          isActive && ATOMIX_GLASS.CLASSES.ACTIVE,
          overLight && ATOMIX_GLASS.CLASSES.OVER_LIGHT
        )}
        style={{ ...style, ...containerVars }}
        onClick={onClick}
      >
        <div
          className={ATOMIX_GLASS.INNER_CLASS}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <div className={ATOMIX_GLASS.FILTER_CLASS}>
            <GlassFilter
              blurAmount={blurAmount}
              mode={mode}
              id={filterId}
              displacementScale={toSafeNumber(displacementScale)}
              aberrationIntensity={toSafeNumber(aberrationIntensity)}
              shaderMapUrl={shaderMapUrl}
            />
            {/* Enhanced Apple Liquid Glass Inner Shadow Layer */}
            <div
              className={ATOMIX_GLASS.FILTER_OVERLAY_CLASS}
              style={{
                filter: `url(#${filterId})`,
              }}
            />
            <div className={ATOMIX_GLASS.FILTER_SHADOW_CLASS} />
          </div>

          <div
            ref={contentRef}
            className={ATOMIX_GLASS.CONTENT_CLASS}
            style={{
              transform: 'var(--atomix-glass-child-parallax, none)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

AtomixGlassContainer.displayName = 'AtomixGlassContainer';
