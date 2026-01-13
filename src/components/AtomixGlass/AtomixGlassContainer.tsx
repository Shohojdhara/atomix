import React, { forwardRef, useRef, useState, useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { DisplacementMode, MousePosition, GlassSize } from '../../lib/types/components';
import type { FragmentShaderType } from './shader-utils';
import { GlassFilter } from './GlassFilter';
import {
  calculateElementCenter,
  calculateDistance,
  calculateMouseInfluence,
  clampBlur,
  validateGlassSize,
} from './glass-utils';
import { ATOMIX_GLASS } from '../../lib/constants/components';

const { CONSTANTS } = ATOMIX_GLASS;

// Module-level counter for deterministic ID generation
let idCounter = 0;

// Module-level shared shader cache with LRU eviction
const MAX_CACHE_SIZE = 15;
interface ShaderCacheEntry {
  url: string;
  timestamp: number;
}
const sharedShaderCache = new Map<string, ShaderCacheEntry>();

/**
 * Get cached shader URL, updating access timestamp
 */
const getCachedShader = (key: string): string | null => {
  const entry = sharedShaderCache.get(key);
  if (entry) {
    // Update access timestamp for LRU
    entry.timestamp = Date.now();
    return entry.url;
  }
  return null;
};

/**
 * Set cached shader URL with LRU eviction
 */
const setCachedShader = (key: string, url: string): void => {
  // Evict oldest entries if at capacity
  if (sharedShaderCache.size >= MAX_CACHE_SIZE) {
    const entries = Array.from(sharedShaderCache.entries());
    // Sort by timestamp (oldest first)
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    // Remove oldest entry
    const oldestEntry = entries[0];
    if (oldestEntry) {
      sharedShaderCache.delete(oldestEntry[0]);
    }
  }
  sharedShaderCache.set(key, { url, timestamp: Date.now() });

  // Development mode: log cache size
  if (typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') {
    if (sharedShaderCache.size >= MAX_CACHE_SIZE * 0.8) {
      console.log(`AtomixGlass: Shader cache size: ${String(sharedShaderCache.size).replace(/[\r\n]/g, '')}/${String(MAX_CACHE_SIZE).replace(/[\r\n]/g, '')}`);
    }
  }
};

interface AtomixGlassContainerProps {
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
  enableLiquidBlur?: boolean;
  elasticity?: number;
  contentRef?: React.RefObject<HTMLDivElement>;
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
      effectiveDisableEffects = false,
      effectiveReducedMotion = false,
      shaderVariant = 'liquidGlass',
      enableLiquidBlur = false,
      elasticity = 0,
      contentRef,
    },
    ref
  ) => {
    // Generate a stable, deterministic ID for SSR compatibility
    // Use a module-level counter that's consistent across server and client
    const filterId = useMemo(() => {
      return `atomix-glass-filter-${++idCounter}`;
    }, []);

    const [shaderMapUrl, setShaderMapUrl] = useState<string>('');
    const shaderGeneratorRef = useRef<any>(null);
    const shaderUtilsRef = useRef<{
      ShaderDisplacementGenerator: any;
      fragmentShaders: any;
    } | null>(null);

    // Use shared module-level cache (no per-instance cache needed)
    const shaderDebounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Lazy load shader utilities only when shader mode is needed
    useEffect(() => {
      if (mode === 'shader') {
        // Dynamic import shader utilities
        import('./shader-utils').then((shaderUtils) => {
          shaderUtilsRef.current = {
            ShaderDisplacementGenerator: shaderUtils.ShaderDisplacementGenerator,
            fragmentShaders: shaderUtils.fragmentShaders,
          };
        }).catch((error) => {
          console.warn('AtomixGlassContainer: Error loading shader utilities', String(error).replace(/[\r\n]/g, ''));
        });
      } else {
        // Clear shader utils when not in shader mode to free memory
        shaderUtilsRef.current = null;
      }
    }, [mode]);

    // Generate shader map with debouncing and caching
    useEffect(() => {
      // Enhanced validation for shader mode
      if (mode === 'shader' && glassSize && validateGlassSize(glassSize) && shaderUtilsRef.current) {
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
            const selectedShader = fragmentShaders[shaderVariant] || fragmentShaders.liquidGlass;
            shaderGeneratorRef.current = new ShaderDisplacementGenerator({
              width: glassSize.width,
              height: glassSize.height,
              fragment: selectedShader,
            });

            // Defer shader generation with longer delay to avoid blocking
            setTimeout(() => {
              const url = shaderGeneratorRef.current?.updateShader() || '';
              setCachedShader(cacheKey, url);
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
        try {
          shaderGeneratorRef.current?.destroy();
        } catch (error) {
          console.warn('AtomixGlassContainer: Error during shader cleanup', error);
        } finally {
          shaderGeneratorRef.current = null;
        }
      };
    }, [mode, glassSize, shaderVariant]);

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

    // Pre-calculate static multipliers outside useMemo
    const EDGE_BLUR_MULTIPLIER = 1.25;
    const CENTER_BLUR_MULTIPLIER = 1.1;
    const FLOW_BLUR_MULTIPLIER = 1.2;
    const MOUSE_INFLUENCE_BLUR_FACTOR = 0.4;
    const EDGE_INTENSITY_MULTIPLIER = 1.5;
    const EDGE_INTENSITY_MOUSE_FACTOR = 0.3;
    const CENTER_INTENSITY_DISTANCE_FACTOR = 0.3;
    const CENTER_INTENSITY_MOUSE_FACTOR = 0.2;

    const liquidBlur = useMemo(() => {
      const defaultBlur = {
        baseBlur: blurAmount,
        edgeBlur: blurAmount * EDGE_BLUR_MULTIPLIER,
        centerBlur: blurAmount * CENTER_BLUR_MULTIPLIER,
        flowBlur: blurAmount * FLOW_BLUR_MULTIPLIER,
      };

      // Enhanced validation for liquid blur
      if (
        !enableLiquidBlur ||
        !rectCache ||
        !globalMousePosition ||
        typeof globalMousePosition.x !== 'number' ||
        typeof globalMousePosition.y !== 'number' ||
        isNaN(globalMousePosition.x) ||
        isNaN(globalMousePosition.y)
      ) {
        return defaultBlur;
      }

      try {
        // Cache center and distance calculations
        const center = calculateElementCenter(rectCache);
        const distance = calculateDistance(globalMousePosition, center);
        const maxDistance =
          Math.sqrt(rectCache.width * rectCache.width + rectCache.height * rectCache.height) / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const mouseInfluence = calculateMouseInfluence(mouseOffset);

        const baseBlur = blurAmount + mouseInfluence * blurAmount * MOUSE_INFLUENCE_BLUR_FACTOR;
        const edgeIntensity = normalizedDistance * EDGE_INTENSITY_MULTIPLIER + mouseInfluence * EDGE_INTENSITY_MOUSE_FACTOR;
        const edgeBlur = baseBlur * (0.8 + edgeIntensity * 0.6);
        const centerIntensity = (1 - normalizedDistance) * CENTER_INTENSITY_DISTANCE_FACTOR + mouseInfluence * CENTER_INTENSITY_MOUSE_FACTOR;
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
      } catch (error) {
        console.warn('AtomixGlassContainer: Error calculating liquid blur', error);
        return defaultBlur;
      }
    }, [
      enableLiquidBlur,
      blurAmount,
      globalMousePosition,
      mouseOffset,
      isHovered,
      isActive,
      rectCache,
      style,
      glassSize,
    ]);

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
        const devicePrefersPerformance = effectiveReducedMotion || effectiveDisableEffects;
        const useMultiPass = enableLiquidBlur && !devicePrefersPerformance && !areaIsLarge;

        if (useMultiPass) {
          const blurLayers = [
            `blur(${validatedBaseBlur}px)`,
            `blur(${validatedEdgeBlur}px)`,
            `blur(${validatedCenterBlur}px)`,
            `blur(${validatedFlowBlur}px)`,
          ];

          return {
            backdropFilter: `${blurLayers.join(' ')} saturate(${Math.min(dynamicSaturation, 200)}%) contrast(1.05) brightness(1.05)`,
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
          backdropFilter: `blur(${effectiveBlur}px) saturate(${Math.min(dynamicSaturation, 200)}%) contrast(1.05) brightness(1.05)`,
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
      effectiveDisableEffects,
      enableLiquidBlur,
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
          '--atomix-glass-container-width': `${glassSize?.width}`,
          '--atomix-glass-container-height': `${glassSize?.height}`,
          '--atomix-glass-container-padding': padding || '0 0',
          '--atomix-glass-container-radius': `${typeof cornerRadius === 'number' && !isNaN(cornerRadius) ? cornerRadius : 0}px`,
          '--atomix-glass-container-backdrop': backdropStyle?.backdropFilter || 'none',
          '--atomix-glass-container-shadow': overLight
            ? [
              `inset 0 1px 0 rgba(255, 255, 255, ${0.4 + mx * 0.002})`,
              `inset 0 -1px 0 rgba(0, 0, 0, ${0.2 + Math.abs(my) * 0.001})`,
              `inset 0 0 20px rgba(0, 0, 0, ${0.08 + Math.abs(mx + my) * 0.001})`,
              `0 2px 12px rgba(0, 0, 0, ${0.12 + Math.abs(my) * 0.002})`,
            ].join(', ')
            : '0 0 20px rgba(0, 0, 0, 0.15) inset, 0 4px 8px rgba(0, 0, 0, 0.08) inset',
          '--atomix-glass-container-shadow-opacity': effectiveDisableEffects ? 0 : 1,
          // Background and shadow values use design token-aligned RGB values
          '--atomix-glass-container-bg': overLight
            ? `linear-gradient(${180 + mx * 0.5}deg, rgba(255, 255, 255, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.05) 100%)`
            : 'none',
          '--atomix-glass-container-text-shadow': overLight
            ? '0px 2px 12px rgba(0, 0, 0, 0)'
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
      glassSize,
      padding,
      cornerRadius,
      backdropStyle,
      mouseOffset,
      overLight,
      effectiveDisableEffects,
    ]);

    return (
      <div
        ref={ref}
        className={`${ATOMIX_GLASS.CONTAINER_CLASS} ${className} ${active ? ATOMIX_GLASS.CLASSES.ACTIVE : ''} ${overLight ? ATOMIX_GLASS.CLASSES.OVER_LIGHT : ''}`}
        style={{ ...style, ...containerVars }}
        onClick={onClick}
      >
        <div
          className={ATOMIX_GLASS.INNER_CLASS}
          style={
            {
              padding: `var(--atomix-glass-container-padding)`,
              boxShadow: `var(--atomix-glass-container-box-shadow)`,
            } as CSSProperties
          }
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
              style={
                {
                  filter: `url(#${filterId})`,
                  backdropFilter: `var(--atomix-glass-container-backdrop)`,
                  borderRadius: `var(--atomix-glass-container-radius)`,
                } as CSSProperties
              }
            />
            <div
              className={ATOMIX_GLASS.FILTER_SHADOW_CLASS}
              style={
                {
                  boxShadow: `var(--atomix-glass-container-shadow)`,
                  opacity: `var(--atomix-glass-container-shadow-opacity)`,
                  background: `var(--atomix-glass-container-bg)`,
                  borderRadius: `var(--atomix-glass-container-radius)`,
                } as CSSProperties
              }
            />
          </div>

          <div
            ref={contentRef}
            className={ATOMIX_GLASS.CONTENT_CLASS}
            style={
              {
                position: 'relative',
                textShadow: `var(--atomix-glass-container-text-shadow)`,
                ...(elasticity > 0 ? { zIndex: 100 } : {}),
              } as CSSProperties
            }
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

AtomixGlassContainer.displayName = 'AtomixGlassContainer';