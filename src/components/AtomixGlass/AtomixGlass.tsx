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
  enableOverLightLayers = ATOMIX_GLASS.DEFAULTS.ENABLE_OVER_LIGHT_LAYERS,
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

  // Use consistent overLight state from hook
  const isOverLight = overLightConfig.isOverLight;
  const shouldRenderOverLightLayers = enableOverLightLayers && isOverLight;

  // Memoize transition duration using design token pattern
  const transitionDuration = useMemo(
    () => (effectiveReducedMotion ? 'none' : 'var(--atomix-transition-duration, 0.2s) ease-out'),
    [effectiveReducedMotion]
  );

  // Calculate base style with transforms (only dynamic values)
  const baseStyle = useMemo(
    () => ({
      ...style,
      ...(elasticity !== 0 && {
        transform: transformStyle,
        willChange: effectiveDisableEffects ? 'auto' : 'transform',
      }),
    }),
    [
      style,
      transformStyle,
      effectiveDisableEffects,
      elasticity,
    ]
  );

  // Build className with state modifiers
  const componentClassName = useMemo(
    () => [
      ATOMIX_GLASS.BASE_CLASS,
      effectiveReducedMotion && `${ATOMIX_GLASS.BASE_CLASS}--reduced-motion`,
      effectiveHighContrast && `${ATOMIX_GLASS.BASE_CLASS}--high-contrast`,
      effectiveDisableEffects && `${ATOMIX_GLASS.BASE_CLASS}--disabled-effects`,
      className,
    ].filter(Boolean).join(' '),
    [effectiveReducedMotion, effectiveHighContrast, effectiveDisableEffects, className]
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

  // Memoize scopedId to avoid recalculation
  const scopedId = useMemo(() => `ag-${glassId.replace(/:/g, '')}`, [glassId]);

  // Memoize gradient calculations separately for better performance
  const gradientCalculations = useMemo(() => {
    const mx = mouseOffset.x;
    const my = mouseOffset.y;

    // Calculate gradient angles and stops (optimized)
    const borderGradientAngle = 135 + mx * 1.2;
    const borderStop1 = Math.max(10, 33 + my * 0.3);
    const borderStop2 = Math.min(90, 66 + my * 0.4);
    const borderOpacity1 = 0.12 + Math.abs(mx) * 0.008;
    const borderOpacity2 = 0.4 + Math.abs(mx) * 0.012;
    const borderOpacity3 = 0.32 + Math.abs(mx) * 0.008;
    const borderOpacity4 = 0.6 + Math.abs(mx) * 0.012;

    // Hover gradient positions
    const hover1X = 50 + mx / 2;
    const hover1Y = 50 + my / 2;
    const hover2X = 50 + mx / 1.5;
    const hover2Y = 50 + my / 1.5;
    const hover3X = 50 + mx;
    const hover3Y = 50 + my;

    // Base layer positions
    const baseX = 50 + mx * 0.5;
    const baseY = 50 + my * 0.5;

    return {
      isOverLight,
      mx,
      my,
      borderGradientAngle,
      borderStop1,
      borderStop2,
      borderOpacity1,
      borderOpacity2,
      borderOpacity3,
      borderOpacity4,
      hover1X,
      hover1Y,
      hover2X,
      hover2Y,
      hover3X,
      hover3Y,
      baseX,
      baseY,
    };
  }, [mouseOffset, isOverLight]);

  // Memoize opacity values separately
  const opacityValues = useMemo(() => {
    return {
      hover1: isHovered || isActive ? (isOverLight ? 0.4 : 0.4) : 0,
      hover2: isActive ? (isOverLight ? 0.5 : 0.5) : 0,
      hover3: isHovered ? (isOverLight ? 0.35 : 0.5) : isActive ? (isOverLight ? 0.6 : 1) : 0,
      base: isOverLight ? (overLightConfig.opacity || 0.4) : 0,
      over: isOverLight ? (overLightConfig.opacity || 0.4) * 1.1 : 0,
    };
  }, [isHovered, isActive, isOverLight, overLightConfig]);

  // Generate CSS variables for layers (only dynamic values)
  const glassVars = useMemo(() => {
    const {
      isOverLight,
      mx,
      my,
      borderGradientAngle,
      borderStop1,
      borderStop2,
      borderOpacity1,
      borderOpacity2,
      borderOpacity3,
      borderOpacity4,
      hover1X,
      hover1Y,
      hover2X,
      hover2Y,
      hover3X,
      hover3Y,
      baseX,
      baseY,
    } = gradientCalculations;

    // Use CSS custom properties for white/black colors where possible
    // Note: Dynamic rgba values in gradients remain for glass effect calculations
    const whiteColor = '255, 255, 255';
    const blackColor = '0, 0, 0';

    return {
      // Scoped CSS custom properties for dynamic values
      [`--ag-scoped-radius`]: `var(--${scopedId}-r)`,
      [`--ag-scoped-transform`]: `var(--${scopedId}-t)`,
      [`--ag-scoped-transition`]: effectiveReducedMotion ? 'none' : `var(--${scopedId}-tr)`,
      // Dynamic border positioning (for border layers)
      [`--${scopedId}-pos`]: positionStyles.position,
      [`--${scopedId}-top`]: positionStyles.top !== 'fixed' ? `${positionStyles.top}px` : '0',
      [`--${scopedId}-left`]: positionStyles.left !== 'fixed' ? `${positionStyles.left}px` : '0',
      [`--${scopedId}-w`]:
        baseStyle.position !== 'fixed' ? adjustedSize.width : `${adjustedSize.width}px`,
      [`--${scopedId}-h`]:
        baseStyle.position !== 'fixed' ? adjustedSize.height : `${adjustedSize.height}px`,
      [`--${scopedId}-r`]: `${effectiveCornerRadius}px`,
      [`--${scopedId}-t`]: baseStyle.transform || 'none',
      [`--${scopedId}-tr`]: effectiveReducedMotion ? 'none' : transitionDuration,
      [`--${scopedId}-blend`]: isOverLight ? 'multiply' : 'overlay',
      // Dynamic gradients and backgrounds
      [`--${scopedId}-b1`]: `linear-gradient(${borderGradientAngle}deg, rgba(${whiteColor}, 0) 0%, rgba(${whiteColor}, ${borderOpacity1}) ${borderStop1}%, rgba(${whiteColor}, ${borderOpacity2}) ${borderStop2}%, rgba(${whiteColor}, 0) 100%)`,
      [`--${scopedId}-b2`]: `linear-gradient(${borderGradientAngle}deg, rgba(${whiteColor}, 0) 0%, rgba(${whiteColor}, ${borderOpacity3}) ${borderStop1}%, rgba(${whiteColor}, ${borderOpacity4}) ${borderStop2}%, rgba(${whiteColor}, 0) 100%)`,
      [`--${scopedId}-h1-o`]: opacityValues.hover1,
      [`--${scopedId}-h1`]: isOverLight
        ? `radial-gradient(circle at ${hover1X}% ${hover1Y}%, rgba(${blackColor}, 0.3) 0%, rgba(${blackColor}, 0.1) 30%, rgba(${blackColor}, 0) 60%)`
        : `radial-gradient(circle at ${hover1X}% ${hover1Y}%, rgba(${whiteColor}, 0.5) 0%, rgba(${whiteColor}, 0) 50%)`,
      [`--${scopedId}-h2-o`]: opacityValues.hover2,
      [`--${scopedId}-h2`]: isOverLight
        ? `radial-gradient(circle at ${hover2X}% ${hover2Y}%, rgba(${blackColor}, 0.4) 0%, rgba(${blackColor}, 0.15) 40%, rgba(${blackColor}, 0) 80%)`
        : `radial-gradient(circle at ${hover2X}% ${hover2Y}%, rgba(${whiteColor}, 1) 0%, rgba(${whiteColor}, 0) 80%)`,
      [`--${scopedId}-h3-o`]: opacityValues.hover3,
      [`--${scopedId}-h3`]: isOverLight
        ? `radial-gradient(circle at ${hover3X}% ${hover3Y}%, rgba(${blackColor}, 0.5) 0%, rgba(${blackColor}, 0.2) 50%, rgba(${blackColor}, 0) 100%)`
        : `radial-gradient(circle at ${hover3X}% ${hover3Y}%, rgba(${whiteColor}, 1) 0%, rgba(${whiteColor}, 0) 100%)`,
      [`--${scopedId}-base-o`]: opacityValues.base,
      [`--${scopedId}-base`]: isOverLight
        ? `linear-gradient(135deg, rgba(${blackColor}, ${0.15 + mx * 0.003}) 0%, rgba(${blackColor}, ${0.1 + my * 0.002}) 50%, rgba(${blackColor}, ${0.18 + Math.abs(mx) * 0.004}) 100%)`
        : `rgba(${whiteColor}, 0.1)`,
      [`--${scopedId}-over-o`]: opacityValues.over,
      [`--${scopedId}-over`]: isOverLight
        ? `radial-gradient(circle at ${baseX}% ${baseY}%, rgba(${blackColor}, ${0.12 + Math.abs(mx) * 0.003}) 0%, rgba(${blackColor}, 0.06) 40%, rgba(${blackColor}, ${0.15 + Math.abs(my) * 0.003}) 100%)`
        : `rgba(${whiteColor}, 0.05)`,
      '--ag-scoped-id': scopedId,
    } as React.CSSProperties;
  }, [
    scopedId,
    positionStyles,
    adjustedSize,
    effectiveCornerRadius,
    baseStyle,
    effectiveReducedMotion,
    transitionDuration,
    gradientCalculations,
    opacityValues,
  ]);

  return (
    <div
      className={componentClassName}
      style={glassVars}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={onClick ? (tabIndex ?? 0) : tabIndex}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={onClick ? false : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      {Boolean(onClick) && (
        <>
          <div
            className={ATOMIX_GLASS.HOVER_1_CLASS}
            style={{
              opacity: `var(--${scopedId}-h1-o)`,
              background: `var(--${scopedId}-h1)`,
            }}
          />
          <div
            className={ATOMIX_GLASS.HOVER_2_CLASS}
            style={{
              opacity: `var(--${scopedId}-h2-o)`,
              background: `var(--${scopedId}-h2)`,
            }}
          />
          <div
            className={ATOMIX_GLASS.HOVER_3_CLASS}
            style={{
              opacity: `var(--${scopedId}-h3-o)`,
              background: `var(--${scopedId}-h3)`,
            }}
          />
        </>
      )}
      {shouldRenderOverLightLayers && (
        <>
          <div
            className={ATOMIX_GLASS.BASE_LAYER_CLASS}
            style={{
              opacity: opacityValues.base,
              background: `var(--${scopedId}-base)`,
            }}
          />
          <div
            className={ATOMIX_GLASS.OVERLAY_LAYER_CLASS}
            style={{
              opacity: opacityValues.over,
              background: `var(--${scopedId}-over)`,
            }}
          />
          <div
            className={`${ATOMIX_GLASS.OVERLAY_LAYER_CLASS}-highlight`}
            style={{
              opacity: opacityValues.over * 0.7,
              background: `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
            }}
          />
        </>
      )}
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
        overLight={overLightConfig.isOverLight}
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
              mixBlendMode: `var(--${scopedId}-blend)` as any,
              background: `var(--${scopedId}-b2)`,
            }}
          />
        </>
      )}
    </div>
  );
}

export default AtomixGlass;
