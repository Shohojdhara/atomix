import React, { forwardRef, useRef, useState, useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { DisplacementMode, MousePosition, GlassSize } from '../../lib/types/components';
import type { FragmentShaderType } from './shader-utils';
import { GlassFilter } from './GlassFilter';
import { validateGlassSize } from './glass-utils';
import { ATOMIX_GLASS } from '../../lib/constants/components';

// Module-level counter for deterministic ID generation
let idCounter = 0;

// Module-level shared shader cache with LRU eviction
const MAX_CACHE_SIZE = 15;
interface ShaderCacheEntry {
  url: string;
  timestamp: number;
}
const sharedShaderCache = new Map<string, ShaderCacheEntry>();

const getCachedShader = (key: string): string | null => {
  const entry = sharedShaderCache.get(key);
  if (entry) {
    entry.timestamp = Date.now();
    return entry.url;
  }
  return null;
};

const setCachedShader = (key: string, url: string): void => {
  if (sharedShaderCache.size >= MAX_CACHE_SIZE) {
    const entries = Array.from(sharedShaderCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    const oldestEntry = entries[0];
    if (oldestEntry) {
      sharedShaderCache.delete(oldestEntry[0]);
    }
  }
  sharedShaderCache.set(key, { url, timestamp: Date.now() });
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
  isHovered?: boolean;
  isActive?: boolean;
  overLight?: boolean;
  overLightConfig?: {
    contrast?: number;
    brightness?: number;
    shadowIntensity?: number;
    borderOpacity?: number;
  };
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

export const AtomixGlassContainer = forwardRef<HTMLDivElement, AtomixGlassContainerProps>(
  (
    {
      children,
      className = '',
      style,
      displacementScale = 25,
      blurAmount = 0.0625,
      aberrationIntensity = 2,
      // mouseOffset and globalMousePosition are now unused for rendering logic
      // but kept in signature for compatibility/completeness if needed
      mouseOffset,
      overLight = false,
      glassSize = { width: 0, height: 0 },
      onClick,
      mode = 'standard',
      isActive = false,
      shaderVariant = 'liquidGlass',
      elasticity = 0,
      contentRef,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
    },
    ref
  ) => {
    const filterId = useMemo(() => {
      return `atomix-glass-filter-${++idCounter}`;
    }, []);

    const [shaderMapUrl, setShaderMapUrl] = useState<string>('');
    const shaderGeneratorRef = useRef<any>(null);
    const shaderUtilsRef = useRef<{
      ShaderDisplacementGenerator: any;
      fragmentShaders: any;
    } | null>(null);

    const shaderDebounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      if (mode === 'shader') {
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
        shaderUtilsRef.current = null;
      }
    }, [mode]);

    useEffect(() => {
      if (
        mode === 'shader' &&
        glassSize &&
        validateGlassSize(glassSize) &&
        shaderUtilsRef.current
      ) {
        const cacheKey = `${glassSize.width}x${glassSize.height}-${shaderVariant}`;
        const cachedUrl = getCachedShader(cacheKey);
        if (cachedUrl) {
          setShaderMapUrl(cachedUrl);
          return;
        }

        if (shaderDebounceTimeoutRef.current) {
          clearTimeout(shaderDebounceTimeoutRef.current);
        }

        const generateShader = () => {
          if (!shaderUtilsRef.current) {
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

            setTimeout(() => {
              const url = shaderGeneratorRef.current?.updateShader() || '';
              setCachedShader(cacheKey, url);
              setShaderMapUrl(url);
            }, 100);
          } catch (error) {
            console.warn('AtomixGlassContainer: Error generating shader map', error);
            setShaderMapUrl('');
          }
        };

        shaderDebounceTimeoutRef.current = setTimeout(generateShader, 500);
      } else {
        setShaderMapUrl('');
      }

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

    const setForceNoTransition = (el: HTMLElement | null) => {
      if (el) {
        el.style.setProperty('transition-duration', '0s', 'important');
        el.style.setProperty('animation-duration', '0s', 'important');
        el.style.setProperty('transition-delay', '0s', 'important');
      }
    };

    return (
      <div
        ref={el => {
          setForceNoTransition(el);
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        className={`${ATOMIX_GLASS.CONTAINER_CLASS} ${className} ${isActive ? ATOMIX_GLASS.CLASSES.ACTIVE : ''} ${overLight ? ATOMIX_GLASS.CLASSES.OVER_LIGHT : ''}`}
        style={style}
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
          <div
            className={ATOMIX_GLASS.FILTER_CLASS}
            style={{ zIndex: 1, position: 'absolute', inset: 0 }}
          >
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
            <div
              ref={setForceNoTransition}
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
                zIndex: elasticity > 0 ? 100 : 2,
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
