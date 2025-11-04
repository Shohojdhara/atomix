import React, {
  forwardRef,
  useId,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import type { CSSProperties } from 'react';
import type {
  DisplacementMode,
  MousePosition,
  GlassSize,
} from '../../lib/types/components';
import type { FragmentShaderType } from './shader-utils';
import {
  ShaderDisplacementGenerator,
  fragmentShaders,
} from './shader-utils';
import { GlassFilter } from './GlassFilter';
import {
  calculateElementCenter,
  calculateDistance,
  calculateMouseInfluence,
  clampBlur,
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
      if (!ref || typeof ref === 'function') return undefined;

      const element = (ref as React.RefObject<HTMLDivElement>).current;
      if (!element) return undefined;

      const timeoutId = setTimeout(() => {
        // Force reflow to ensure proper sizing
        element.offsetHeight;
      }, 0);

      return () => clearTimeout(timeoutId);
    }, [cornerRadius, glassSize.width, glassSize.height, ref]);

    const [rectCache, setRectCache] = useState<DOMRect | null>(null);

    useEffect(() => {
      if (!ref || typeof ref === 'function') return undefined;
      const element = (ref as React.RefObject<HTMLDivElement>).current;
      if (!element) return undefined;
      setRectCache(element.getBoundingClientRect());
    }, [ref, glassSize]);

    const liquidBlur = useMemo(() => {
      const defaultBlur = {
        baseBlur: blurAmount,
        edgeBlur: blurAmount * 1.25,
        centerBlur: blurAmount * 1.1,
        flowBlur: blurAmount * 1.2,
      };

      if (!enableLiquidBlur || !rectCache || !globalMousePosition.x || !globalMousePosition.y) {
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
    }, [
      enableLiquidBlur,
      blurAmount,
      globalMousePosition,
      mouseOffset,
      isHovered,
      isActive,
      rectCache,
    ]);

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

    const containerVars = useMemo(() => {
      const mx = mouseOffset?.x || 0;
      const my = mouseOffset?.y || 0;
      const scopedId = `gc-${filterId.replace(/:/g, '')}`;

      return {
        [`--${scopedId}-padding`]: padding,
        [`--${scopedId}-radius`]: `${cornerRadius}px`,
        [`--${scopedId}-backdrop`]: backdropStyle.backdropFilter,
        [`--${scopedId}-shadow`]: overLight
          ? [
              `inset 0 1px 0 rgba(255, 255, 255, ${0.4 + mx * 0.002})`,
              `inset 0 -1px 0 rgba(0, 0, 0, ${0.2 + Math.abs(my) * 0.001})`,
              `inset 0 0 20px rgba(0, 0, 0, ${0.08 + Math.abs(mx + my) * 0.001})`,
              `0 2px 12px rgba(0, 0, 0, ${0.12 + Math.abs(my) * 0.002})`,
            ].join(', ')
          : '0 0 20px rgba(0, 0, 0, 0.15) inset, 0 4px 8px rgba(0, 0, 0, 0.08) inset',
        [`--${scopedId}-shadow-opacity`]: effectiveDisableEffects ? 0 : 1,
        [`--${scopedId}-bg`]: overLight
          ? `linear-gradient(${180 + mx * 0.5}deg, rgba(255, 255, 255, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.05) 100%)`
          : 'none',
        [`--${scopedId}-text-shadow`]: overLight
          ? '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 8px rgba(0, 0, 0, 0.1)'
          : '0px 2px 12px rgba(0, 0, 0, 0.4)',
        '--gc-scoped-id': scopedId,
      } as React.CSSProperties;
    }, [
      filterId,
      padding,
      cornerRadius,
      backdropStyle,
      mouseOffset,
      overLight,
      effectiveDisableEffects,
    ]);

    const scopedId = `gc-${filterId.replace(/:/g, '')}`;

    return (
      <div
        ref={ref}
        className={`${ATOMIX_GLASS.CONTAINER_CLASS} ${className} ${active ? ATOMIX_GLASS.CLASSES.ACTIVE : ''}`}
        style={{ ...style, ...containerVars }}
        onClick={onClick}
      >
        <div
          className={ATOMIX_GLASS.INNER_CLASS}
          style={{
            position: 'relative',
            padding: `var(--${scopedId}-padding)`,
            borderRadius: `var(--${scopedId}-radius)`,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <div className={ATOMIX_GLASS.FILTER_CLASS}>
            <GlassFilter
              mode={mode}
              id={filterId}
              displacementScale={displacementScale}
              aberrationIntensity={aberrationIntensity}
              shaderMapUrl={shaderMapUrl}
            />
            <span
              className={ATOMIX_GLASS.FILTER_OVERLAY_CLASS}
              style={{
                backdropFilter: `var(--${scopedId}-backdrop)`,
                borderRadius: `var(--${scopedId}-radius)`,
                position: 'absolute',
                inset: '0',
              }}
            />

            {/* Enhanced Apple Liquid Glass Inner Shadow Layer */}
            <div
              className={ATOMIX_GLASS.FILTER_SHADOW_CLASS}
              style={{
                position: 'absolute',
                inset: '1.5px',
                borderRadius: `var(--${scopedId}-radius)`,
                pointerEvents: 'none',
                boxShadow: `var(--${scopedId}-shadow)`,
                opacity: `var(--${scopedId}-shadow-opacity)`,
                background: `var(--${scopedId}-bg)`,
              }}
            />
          </div>

          <div
            ref={contentRef}
            className={ATOMIX_GLASS.CONTENT_CLASS}
            style={{
              position: 'relative',
              ...(elasticity !== 0 && {
                zIndex: 4,
                textShadow: `var(--${scopedId}-text-shadow)`,
              }),
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

