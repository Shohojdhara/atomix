import React, { forwardRef, useId, useRef, useState, useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { DisplacementMode, MousePosition, GlassSize } from '../../lib/types/components';
import type { FragmentShaderType } from './shader-utils';
import { ShaderDisplacementGenerator, fragmentShaders } from './shader-utils';
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
    const filterId = useId();
    const [shaderMapUrl, setShaderMapUrl] = useState<string>('');
    const shaderGeneratorRef = useRef<ShaderDisplacementGenerator | null>(null);

    // Generate initial shader map when mode/size/variant changes
    useEffect(() => {
      // Enhanced validation for shader mode
      if (mode === 'shader' && glassSize && validateGlassSize(glassSize)) {
        try {
          shaderGeneratorRef.current?.destroy();
          const selectedShader = fragmentShaders[shaderVariant] || fragmentShaders.liquidGlass;
          shaderGeneratorRef.current = new ShaderDisplacementGenerator({
            width: glassSize.width,
            height: glassSize.height,
            fragment: selectedShader,
          });
          const url = shaderGeneratorRef.current.updateShader();
          setShaderMapUrl(url);
        } catch (error) {
          console.warn('AtomixGlassContainer: Error generating shader map', error);
          setShaderMapUrl(''); // Fallback to empty string
        }
      }

      // Cleanup function with error handling
      return () => {
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

    const liquidBlur = useMemo(() => {
      const defaultBlur = {
        baseBlur: blurAmount,
        edgeBlur: blurAmount * 1.25,
        centerBlur: blurAmount * 1.1,
        flowBlur: blurAmount * 1.2,
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
      filterId,
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
          style={{
            padding: `var(--atomix-glass-container-padding)`,
            boxShadow: `var(--atomix-glass-container-box-shadow)`,
          }}
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
              backdropFilter: `var(--atomix-glass-container-backdrop)`,
              borderRadius: `var(--atomix-glass-radius)`,
            }}
            />

            <div
              className={ATOMIX_GLASS.FILTER_SHADOW_CLASS}
            style={{
              boxShadow: `var(--atomix-glass-container-shadow)`,
              opacity: `var(--atomix-glass-container-shadow-opacity)`,
              background: `var(--atomix-glass-container-bg)`,
              borderRadius: `var(--atomix-glass-radius)`,
            }}
            />
          </div>

          <div
            ref={contentRef}
            className={ATOMIX_GLASS.CONTENT_CLASS}
            style={{
              position: 'relative',
              
              textShadow: `var(--atomix-glass-container-text-shadow)`,
              ...(elasticity > 0 ? { zIndex: 100 } : {}),
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
