import React, { forwardRef, useId, useRef, useState, useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import type {
  DisplacementMode,
  MousePosition,
  GlassSize,
  AtomixGlassProps,
} from '../../lib/types/components';
import type { FragmentShaderType, ShaderOptions, Vec2 } from './shader-utils';
import { GlassFilter } from './GlassFilter';
import {
  calculateMouseInfluence,
  clampBlur,
  validateGlassSize,
  getCachedShader,
  setCachedShader,
} from './glass-utils';
import { ATOMIX_GLASS } from '../../lib/constants/components';

const { CONSTANTS } = ATOMIX_GLASS;

// ─── Blur multiplier constants (module-level, never change at runtime) ────────
const EDGE_BLUR_MULTIPLIER = 1.25;
const CENTER_BLUR_MULTIPLIER = 1.1;
const FLOW_BLUR_MULTIPLIER = 1.2;
const MOUSE_INFLUENCE_BLUR_FACTOR = 0.15;
const EDGE_INTENSITY_MULTIPLIER = 1.5;
const EDGE_INTENSITY_MOUSE_FACTOR = 0.15;
const CENTER_INTENSITY_DISTANCE_FACTOR = 0.3;
const CENTER_INTENSITY_MOUSE_FACTOR = 0.1;
/** Maximum blur multiplier relative to base — prevents runaway blur. */
const MAX_BLUR_RELATIVE = 2;

// ─── Shader utility types ─────────────────────────────────────────────────────

interface ShaderGenerator {
  updateShader(): string;
  destroy(): void;
}

/** Fragment shader function — signature matches shader-utils.ts */
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
  isHovered?: boolean;
  isActive?: boolean;
  overLight?: boolean;
  overLightConfig?: {
    contrast?: number;
    brightness?: number;
    shadowIntensity?: number;
    borderOpacity?: number;
  };
  borderRadius?: number;
  padding?: string;
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

  // Phase 1: Animation System props
  shaderTime?: number;

  contentRef?: React.RefObject<HTMLDivElement | null>;
  children?: React.ReactNode;
}

/**
 * AtomixGlassContainer - Internal container component for glass effects
 * Handles the visual glass morphism layer with filters and backdrop effects
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
      padding = '0 0',
      glassSize = { width: 0, height: 0 },
      onClick,
      mode = 'standard',
      effectiveWithoutEffects = false,
      effectiveReducedMotion = false,
      shaderVariant = 'liquidGlass',
      withLiquidBlur = false,
      isFixedOrSticky = false,

      // Phase 1: Animation System props
      shaderTime,
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

    const [shaderMapUrl, setShaderMapUrl] = useState<string>('');
    const shaderGeneratorRef = useRef<ShaderGenerator | null>(null);
    const shaderUtilsRef = useRef<ShaderUtilsModule | null>(null);

    const shaderDebounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const shaderUpdateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Phase 1: Animation frame ref for continuous shader updates
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

    // Phase 1: Time-Based Animation Loop - Continuous shader regeneration
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

      const baseFps =
        distortionQuality === 'ultra'
          ? 60
          : distortionQuality === 'high'
            ? 30
            : distortionQuality === 'medium'
              ? 24
              : 20;
      const effectiveSpeed = Math.max(0.5, Math.min(2, animationSpeed || 1));
      const complexity = withMultiLayerDistortion
        ? Math.max(
            1,
            (distortionOctaves || 3) / 3 +
              Math.max(0, (distortionLacunarity || 2) - 2) * 0.25 +
              Math.max(0, (distortionGain || 0.5) - 0.5)
          )
        : 1;
      const targetFps = Math.max(
        12,
        Math.min(60, Math.round((baseFps * effectiveSpeed) / complexity))
      );
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

    const [rectCache, setRectCache] = useState<DOMRect | null>(null);

    useEffect(() => {
      if (!ref || typeof ref === 'function') return undefined;
      const element = (ref as React.RefObject<HTMLDivElement>).current;
      if (!element) return undefined;

      try {
        setRectCache(element.getBoundingClientRect());
      } catch (error) {
        console.warn('AtomixGlassContainer: Error getting element bounds', error);
        setRectCache(null);
      }

      return undefined;
    }, [ref, glassSize]);

    const liquidBlur = useMemo(() => {
      const defaultBlur = {
        baseBlur: blurAmount,
        edgeBlur: blurAmount * EDGE_BLUR_MULTIPLIER,
        centerBlur: blurAmount * CENTER_BLUR_MULTIPLIER,
        flowBlur: blurAmount * FLOW_BLUR_MULTIPLIER,
      };

      // Enhanced validation for liquid blur
      if (
        !withLiquidBlur ||
        !rectCache ||
        !mouseOffset ||
        typeof mouseOffset.x !== 'number' ||
        typeof mouseOffset.y !== 'number' ||
        isNaN(mouseOffset.x) ||
        isNaN(mouseOffset.y)
      ) {
        return defaultBlur;
      }

      try {
        const mouseInfluence = calculateMouseInfluence(mouseOffset);
        const maxBlur = blurAmount * MAX_BLUR_RELATIVE;

        const baseBlur = Math.min(
          maxBlur,
          blurAmount + mouseInfluence * blurAmount * MOUSE_INFLUENCE_BLUR_FACTOR
        );
        const edgeIntensity = mouseInfluence * EDGE_INTENSITY_MOUSE_FACTOR;
        const edgeBlur = Math.min(maxBlur, baseBlur * (0.8 + edgeIntensity * 0.4));
        const centerIntensity = mouseInfluence * CENTER_INTENSITY_MOUSE_FACTOR;
        const centerBlur = Math.min(maxBlur, baseBlur * (0.3 + centerIntensity * 0.3));
        const flowBlur = Math.min(maxBlur, baseBlur * FLOW_BLUR_MULTIPLIER);

        // NOTE: hover/active multipliers intentionally omitted here —
        // they belong on opacity layers, not the blur filter itself.
        return {
          baseBlur: clampBlur(baseBlur),
          edgeBlur: clampBlur(edgeBlur),
          centerBlur: clampBlur(centerBlur),
          flowBlur: clampBlur(flowBlur),
        };
      } catch (error) {
        console.warn('AtomixGlassContainer: Error calculating liquid blur', error);
        return defaultBlur;
      }
    }, [withLiquidBlur, blurAmount, mouseOffset, rectCache]);

    const backdropStyle = useMemo(() => {
      try {
        const dynamicSaturation = saturation + (liquidBlur.baseBlur || 0) * 20;

        // Validate blur values before using them
        const validatedBaseBlur =
          typeof liquidBlur.baseBlur === 'number' && !isNaN(liquidBlur.baseBlur)
            ? liquidBlur.baseBlur
            : 0;
        const validatedEdgeBlur =
          typeof liquidBlur.edgeBlur === 'number' && !isNaN(liquidBlur.edgeBlur)
            ? liquidBlur.edgeBlur
            : 0;
        const validatedCenterBlur =
          typeof liquidBlur.centerBlur === 'number' && !isNaN(liquidBlur.centerBlur)
            ? liquidBlur.centerBlur
            : 0;
        const validatedFlowBlur =
          typeof liquidBlur.flowBlur === 'number' && !isNaN(liquidBlur.flowBlur)
            ? liquidBlur.flowBlur
            : 0;

        // Adaptive strategy: prefer single-pass blur for large areas or when effects are reduced
        const area = rectCache ? rectCache.width * rectCache.height : 0;
        const areaIsLarge = area > 180000; // ~600x300 threshold; tune as needed
        const devicePrefersPerformance = effectiveReducedMotion || effectiveWithoutEffects;
        const useMultiPass = withLiquidBlur && !devicePrefersPerformance && !areaIsLarge;

        if (useMultiPass) {
          // Use a single weighted-average blur instead of stacking multiple
          // blur() calls. CSS blur() is additive — stacking 4 passes
          // causes the perceived blur to compound far beyond any single value.
          const weightedBlur = clampBlur(
            validatedBaseBlur * 0.4 +
              validatedEdgeBlur * 0.25 +
              validatedCenterBlur * 0.15 +
              validatedFlowBlur * 0.2
          );

          return {
            backdropFilter: `blur(${weightedBlur}px) saturate(${Math.min(dynamicSaturation, 200)}%) contrast(${overLightConfig?.contrast || 1}) brightness(${overLightConfig?.brightness || 1})`,
          };
        }

        // Single-pass fallback: stronger radius to match perceived blur of multi-pass
        const effectiveBlur = clampBlur(
          Math.max(
            validatedBaseBlur,
            validatedEdgeBlur * 0.8,
            validatedCenterBlur * 1.1,
            validatedFlowBlur * 0.9
          )
        );

        return {
          backdropFilter: `blur(${effectiveBlur}px) saturate(${Math.min(dynamicSaturation, 200)}%) contrast(${overLightConfig?.contrast || 1.05}) brightness(${overLightConfig?.brightness || 1.05})`,
        };
      } catch (error) {
        console.warn('AtomixGlassContainer: Error calculating backdrop style', error);
        return {
          backdropFilter: `blur(${blurAmount}px) saturate(${saturation}%) contrast(1.05) brightness(1.05)`,
        };
      }
    }, [
      liquidBlur,
      saturation,
      blurAmount,
      rectCache,
      effectiveReducedMotion,
      effectiveWithoutEffects,
      withLiquidBlur,
      overLightConfig,
    ]);

    const containerVars = useMemo(() => {
      try {
        // Safe extraction of mouse offset values
        const mx =
          mouseOffset && typeof mouseOffset.x === 'number' && !isNaN(mouseOffset.x)
            ? mouseOffset.x
            : 0;
        const my =
          mouseOffset && typeof mouseOffset.y === 'number' && !isNaN(mouseOffset.y)
            ? mouseOffset.y
            : 0;
        return {
          '--atomix-glass-container-radius': `${typeof borderRadius === 'number' && !isNaN(borderRadius) ? borderRadius : 0}px`,
          '--atomix-glass-container-backdrop': backdropStyle?.backdropFilter || 'none',
          '--atomix-glass-container-shadow': overLight
            ? [
                `inset 0 1px 0 rgba(255, 255, 255, ${(0.4 + mx * 0.002) * (overLightConfig?.shadowIntensity || 1)})`,
                `inset 0 -1px 0 rgba(0, 0, 0, ${(0.2 + Math.abs(my) * 0.001) * (overLightConfig?.shadowIntensity || 1)})`,
                `inset 0 0 20px rgba(0, 0, 0, ${(0.08 + Math.abs(mx + my) * 0.001) * (overLightConfig?.shadowIntensity || 1)})`,
                `0 2px 12px rgba(0, 0, 0, ${(0.12 + Math.abs(my) * 0.002) * (overLightConfig?.shadowIntensity || 1)})`,
              ].join(', ')
            : '0 0 20px rgba(0, 0, 0, 0.15) inset, 0 4px 8px rgba(0, 0, 0, 0.08) inset',
          '--atomix-glass-container-shadow-opacity': effectiveWithoutEffects ? 0 : 1,
          // Background and shadow values use design token-aligned RGB values
          '--atomix-glass-container-bg': overLight
            ? `linear-gradient(${180 + mx * 0.5}deg, rgba(255, 255, 255, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.05) 100%)`
            : 'none',
          '--atomix-glass-container-text-shadow': overLight
            ? '0px 1px 2px rgba(255, 255, 255, 0.15)'
            : '0px 2px 12px rgba(0, 0, 0, 0.4)',
          '--atomix-glass-container-box-shadow': overLight
            ? '0px 16px 70px rgba(0, 0, 0, 0.75)'
            : '0px 12px 40px rgba(0, 0, 0, 0.25)',
        } as React.CSSProperties;
      } catch (error) {
        console.warn('AtomixGlassContainer: Error generating container variables', error);
        return {
          '--atomix-glass-container-padding': '0 0',
          '--atomix-glass-container-radius': '0px',
          '--atomix-glass-container-backdrop': 'none',
          '--atomix-glass-container-shadow': 'none',
          '--atomix-glass-container-shadow-opacity': 1,
          '--atomix-glass-container-bg': 'none',
          '--atomix-glass-container-text-shadow': 'none',
        } as React.CSSProperties;
      }
    }, [
      borderRadius,
      backdropStyle,
      mouseOffset,
      overLight,
      effectiveWithoutEffects,
      overLightConfig,
    ]);

    return (
      <div
        ref={el => {
          // Handle forwarded ref
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        className={`${ATOMIX_GLASS.CONTAINER_CLASS} ${className} ${isActive ? ATOMIX_GLASS.CLASSES.ACTIVE : ''} ${overLight ? ATOMIX_GLASS.CLASSES.OVER_LIGHT : ''}`}
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
              displacementScale={
                typeof displacementScale === 'number' && !isNaN(displacementScale)
                  ? displacementScale
                  : 0
              }
              aberrationIntensity={
                typeof aberrationIntensity === 'number' && !isNaN(aberrationIntensity)
                  ? aberrationIntensity
                  : 0
              }
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
              willChange: 'transform',
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
