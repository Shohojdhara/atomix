import React, { useId, useMemo, useRef } from 'react';
import type { AtomixGlassProps } from '../../lib/types/components';
import { ATOMIX_GLASS } from '../../lib/constants/components';
import { AtomixGlassContainer } from './AtomixGlassContainer';
import { useAtomixGlass } from '../../lib/composables/useAtomixGlass';

/**
 * AtomixGlass - A high-performance glass morphism component with liquid distortion effects
 *
 * Features:
 * - Hardware-accelerated glass effects with SVG filters
 * - Mouse-responsive liquid distortion
 * - Dynamic border-radius extraction from children CSS properties
 * - Automatic light/dark theme detection
 * - Accessibility and performance optimizations
 * - Multiple displacement modes (standard, polar, prominent, shader)
 *
 * @example
 * // Dynamic border-radius extraction
 * <AtomixGlass>
 *   <div style={{ borderRadius: '12px' }}>Content with 12px radius</div>
 * </AtomixGlass>
 *
 * @example
 * // Manual border-radius override
 * <AtomixGlass cornerRadius={20}>
 *   <div>Content with 20px glass radius</div>
 * </AtomixGlass>
 */
export function AtomixGlass({
  children,
  displacementScale = ATOMIX_GLASS.DEFAULTS.DISPLACEMENT_SCALE,
  blurAmount = ATOMIX_GLASS.DEFAULTS.BLUR_AMOUNT,
  saturation = ATOMIX_GLASS.DEFAULTS.SATURATION,
  aberrationIntensity = ATOMIX_GLASS.DEFAULTS.ABERRATION_INTENSITY,
  elasticity = ATOMIX_GLASS.DEFAULTS.ELASTICITY,
  cornerRadius,
  globalMousePosition: externalGlobalMousePosition,
  mouseOffset: externalMouseOffset,
  mouseContainer = null,
  className = '',
  padding = ATOMIX_GLASS.DEFAULTS.PADDING,
  overLight = ATOMIX_GLASS.DEFAULTS.OVER_LIGHT,
  style = {},
  mode = ATOMIX_GLASS.DEFAULTS.MODE,
  onClick,
  shaderVariant = 'liquidGlass',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role,
  tabIndex,
  reducedMotion = false,
  highContrast = false,
  disableEffects = false,
  enableLiquidBlur = false,
  enableBorderEffect = true,
  enableOverLightLayers = false,
  enablePerformanceMonitoring = false,
  debugCornerRadius = false,
}: AtomixGlassProps) {
  const glassRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Use composable hook for all state and logic
  const {
    isHovered,
    isActive,
    glassSize,
    effectiveCornerRadius,
    effectiveReducedMotion,
    effectiveHighContrast,
    effectiveDisableEffects,
    overLightConfig,
    globalMousePosition,
    mouseOffset,
    transformStyle,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
  } = useAtomixGlass({
    glassRef,
    contentRef,
    cornerRadius,
    globalMousePosition: externalGlobalMousePosition,
    mouseOffset: externalMouseOffset,
    mouseContainer,
    overLight,
    reducedMotion,
    highContrast,
    disableEffects,
    elasticity,
    onClick,
    debugCornerRadius,
    enablePerformanceMonitoring,
    children,
  });

  // Calculate base style with transforms
  const baseStyle = useMemo(
    () => ({
      ...style,
      ...(elasticity !== 0 && {
        transform: transformStyle,
        transition: effectiveReducedMotion ? 'none' : 'all ease-out 0.2s',
        willChange: effectiveDisableEffects ? 'auto' : 'transform',
      }),
      ...(effectiveHighContrast && {
        border: '2px solid currentColor',
        outline: '2px solid transparent',
        outlineOffset: '2px',
      }),
    }),
    [
      style,
      transformStyle,
      effectiveReducedMotion,
      effectiveDisableEffects,
      effectiveHighContrast,
      elasticity,
    ]
  );

  // Calculate position and size styles
  const positionStyles = useMemo(
    () => ({
      position: (baseStyle.position || 'absolute') as React.CSSProperties['position'],
      top: baseStyle.top || 0,
      left: baseStyle.left || 0,
    }),
    [baseStyle]
  );

  const adjustedSize = useMemo(
    () => ({
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
    }),
    [baseStyle, glassSize]
  );

  // Generate CSS variables for layers
  const glassId = useId();
  const glassVars = useMemo(() => {
    const isOverLight = overLightConfig?.isOverLight ?? false;
    const mx = mouseOffset.x;
    const my = mouseOffset.y;
    const scopedId = `ag-${glassId.replace(/:/g, '')}`;

    return {
      [`--${scopedId}-pos`]: positionStyles.position,
      [`--${scopedId}-top`]: positionStyles.top !== 'fixed' ? `${positionStyles.top}px` : '0',
      [`--${scopedId}-left`]: positionStyles.left !== 'fixed' ? `${positionStyles.left}px` : '0',
      [`--${scopedId}-w`]:
        baseStyle.position !== 'fixed' ? adjustedSize.width : `${adjustedSize.width}px`,
      [`--${scopedId}-h`]:
        baseStyle.position !== 'fixed' ? adjustedSize.height : `${adjustedSize.height}px`,
      [`--${scopedId}-r`]: `${effectiveCornerRadius}px`,
      [`--${scopedId}-t`]: baseStyle.transform,
      [`--${scopedId}-tr`]: effectiveReducedMotion ? 'none' : baseStyle.transition,
      [`--${scopedId}-blend`]: isOverLight ? 'multiply' : 'overlay',
      [`--${scopedId}-b1`]: `linear-gradient(${135 + mx * 1.2}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${0.12 + Math.abs(mx) * 0.008}) ${Math.max(10, 33 + my * 0.3)}%, rgba(255,255,255,${0.4 + Math.abs(mx) * 0.012}) ${Math.min(90, 66 + my * 0.4)}%, rgba(255,255,255,0) 100%)`,
      [`--${scopedId}-b2`]: `linear-gradient(${135 + mx * 1.2}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${0.32 + Math.abs(mx) * 0.008}) ${Math.max(10, 33 + my * 0.3)}%, rgba(255,255,255,${0.6 + Math.abs(mx) * 0.012}) ${Math.min(90, 66 + my * 0.4)}%, rgba(255,255,255,0) 100%)`,
      [`--${scopedId}-h1-o`]: isHovered || isActive ? (isOverLight ? 0.3 : 0.5) : 0,
      [`--${scopedId}-h1`]: isOverLight
        ? `radial-gradient(circle at ${50 + mx / 2}% ${50 + my / 2}%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0) 60%)`
        : `radial-gradient(circle at ${50 + mx / 2}% ${50 + my / 2}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%)`,
      [`--${scopedId}-h2-o`]: isActive ? (isOverLight ? 0.4 : 0.5) : 0,
      [`--${scopedId}-h2`]: isOverLight
        ? `radial-gradient(circle at ${50 + mx / 1.5}% ${50 + my / 1.5}%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 80%)`
        : `radial-gradient(circle at ${50 + mx / 1.5}% ${50 + my / 1.5}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)`,
      [`--${scopedId}-h3-o`]: isHovered
        ? isOverLight
          ? 0.25
          : 0.4
        : isActive
          ? isOverLight
            ? 0.5
            : 0.8
          : 0,
      [`--${scopedId}-h3`]: isOverLight
        ? `radial-gradient(circle at ${50 + mx}% ${50 + my}%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)`
        : `radial-gradient(circle at ${50 + mx}% ${50 + my}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)`,
      [`--${scopedId}-base-o`]: isOverLight ? overLightConfig.opacity : 0,
      [`--${scopedId}-base`]: isOverLight
        ? `linear-gradient(135deg, rgba(0,0,0,${0.12 + mx * 0.002}) 0%, rgba(0,0,0,${0.08 + my * 0.001}) 50%, rgba(0,0,0,${0.15 + Math.abs(mx) * 0.003}) 100%)`
        : 'rgba(255,255,255,0.1)',
      [`--${scopedId}-over-o`]: isOverLight ? overLightConfig.opacity * 0.9 : 0,
      [`--${scopedId}-over`]: isOverLight
        ? `radial-gradient(circle at ${50 + mx * 0.5}% ${50 + my * 0.5}%, rgba(0,0,0,${0.08 + Math.abs(mx) * 0.002}) 0%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,${0.12 + Math.abs(my) * 0.002}) 100%)`
        : 'rgba(255,255,255,0.05)',
      '--ag-scoped-id': scopedId,
    } as React.CSSProperties;
  }, [
    glassId,
    positionStyles,
    adjustedSize,
    effectiveCornerRadius,
    baseStyle,
    effectiveReducedMotion,
    mouseOffset,
    isHovered,
    isActive,
    overLightConfig,
  ]);

  const scopedId = `ag-${glassId.replace(/:/g, '')}`;

  return (
    <div
      className={`${ATOMIX_GLASS.BASE_CLASS} ${className}`}
      style={{ ...positionStyles, position: 'relative', ...glassVars }}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={onClick ? (tabIndex ?? 0) : tabIndex}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={onClick ? false : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      <AtomixGlassContainer
        ref={glassRef}
        contentRef={contentRef}
        className={className}
        style={baseStyle}
        cornerRadius={effectiveCornerRadius}
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
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
        elasticity={elasticity}
        enableLiquidBlur={enableLiquidBlur}
      >
        {children}
      </AtomixGlassContainer>
      {enableBorderEffect && (
        <>
          <span
            className={ATOMIX_GLASS.BORDER_1_CLASS}
            style={{
              position: `var(--${scopedId}-pos)` as any,
              top: `var(--${scopedId}-top)`,
              left: `var(--${scopedId}-left)`,
              width: `var(--${scopedId}-w)`,
              height: `var(--${scopedId}-h)`,
              borderRadius: `var(--${scopedId}-r)`,
              transform: `var(--${scopedId}-t)`,
              transition: `var(--${scopedId}-tr)`,
              background: `var(--${scopedId}-b1)`,
            }}
          />
          <span
            className={ATOMIX_GLASS.BORDER_2_CLASS}
            style={{
              position: `var(--${scopedId}-pos)` as any,
              top: `var(--${scopedId}-top)`,
              left: `var(--${scopedId}-left)`,
              width: `var(--${scopedId}-w)`,
              height: `var(--${scopedId}-h)`,
              borderRadius: `var(--${scopedId}-r)`,
              transform: `var(--${scopedId}-t)`,
              transition: `var(--${scopedId}-tr)`,
              mixBlendMode: `var(--${scopedId}-blend)` as any,
              background: `var(--${scopedId}-b2)`,
            }}
          />
        </>
      )}
      {Boolean(onClick) && (
        <>
          <div
            className={ATOMIX_GLASS.HOVER_1_CLASS}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: `var(--${scopedId}-r)`,
              transform: `var(--${scopedId}-t)`,
              transition: `var(--${scopedId}-tr)`,
              mixBlendMode: `var(--${scopedId}-blend)` as any,
              opacity: `var(--${scopedId}-h1-o)`,
              background: `var(--${scopedId}-h1)`,
            }}
          />
          <div
            className={ATOMIX_GLASS.HOVER_2_CLASS}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: `var(--${scopedId}-r)`,
              transform: `var(--${scopedId}-t)`,
              transition: `var(--${scopedId}-tr)`,
              mixBlendMode: `var(--${scopedId}-blend)` as any,
              opacity: `var(--${scopedId}-h2-o)`,
              background: `var(--${scopedId}-h2)`,
            }}
          />
          <div
            className={ATOMIX_GLASS.HOVER_3_CLASS}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: `var(--${scopedId}-r)`,
              transform: `var(--${scopedId}-t)`,
              transition: `var(--${scopedId}-tr)`,
              mixBlendMode: `var(--${scopedId}-blend)` as any,
              opacity: `var(--${scopedId}-h3-o)`,
              background: `var(--${scopedId}-h3)`,
            }}
          />
        </>
      )}
      {enableOverLightLayers && (
        <>
          <div
            className={ATOMIX_GLASS.BASE_LAYER_CLASS}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: `var(--${scopedId}-r)`,
              transform: `var(--${scopedId}-t)`,
              transition: `var(--${scopedId}-tr)`,
              opacity: `var(--${scopedId}-base-o)`,
              background: `var(--${scopedId}-base)`,
            }}
          />
          <div
            className={ATOMIX_GLASS.OVERLAY_LAYER_CLASS}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: `var(--${scopedId}-r)`,
              transform: `var(--${scopedId}-t)`,
              transition: `var(--${scopedId}-tr)`,
              opacity: `var(--${scopedId}-over-o)`,
              background: `var(--${scopedId}-over)`,
            }}
          />
        </>
      )}
    </div>
  );
}

export default AtomixGlass;

