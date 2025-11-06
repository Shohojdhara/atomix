import React, { useMemo, useRef } from 'react';
import type { AtomixGlassProps, GlassSize } from '../../lib/types/components';
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
    [style, transformStyle, effectiveDisableEffects, elasticity]
  );

  // Build className with state modifiers
  const componentClassName = useMemo(
    () =>
      [
        ATOMIX_GLASS.BASE_CLASS,
        effectiveReducedMotion && `${ATOMIX_GLASS.BASE_CLASS}--reduced-motion`,
        effectiveHighContrast && `${ATOMIX_GLASS.BASE_CLASS}--high-contrast`,
        effectiveDisableEffects && `${ATOMIX_GLASS.BASE_CLASS}--disabled-effects`,
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [effectiveReducedMotion, effectiveHighContrast, effectiveDisableEffects, className]
  );

  // Calculate position and size styles
  // Optimize: only depend on specific baseStyle properties used
  const baseStylePosition = baseStyle.position;
  const baseStyleTop = baseStyle.top;
  const baseStyleLeft = baseStyle.left;

  const positionStyles = useMemo(
    () => ({
      position: (baseStylePosition || 'absolute') as React.CSSProperties['position'],
      top: baseStyleTop || 0,
      left: baseStyleLeft || 0,
    }),
    [baseStylePosition, baseStyleTop, baseStyleLeft]
  );

  // Optimize: only depend on specific baseStyle properties used
  const baseStyleWidth = baseStyle.width;
  const baseStyleHeight = baseStyle.height;
  const glassSizeWidth = glassSize.width;
  const glassSizeHeight = glassSize.height;

  const adjustedSize = useMemo(
    () => ({
      width:
        baseStylePosition !== 'fixed'
          ? '100%'
          : baseStyleWidth
            ? baseStyleWidth
            : Math.max(glassSizeWidth, 0),
      height:
        baseStylePosition !== 'fixed'
          ? '100%'
          : baseStyleHeight
            ? baseStyleHeight
            : Math.max(glassSizeHeight, 0),
    }),
    [baseStylePosition, baseStyleWidth, baseStyleHeight, glassSizeWidth, glassSizeHeight]
  );



  // Memoize gradient calculations separately for better performance
  // Extract mouse position values for dependency optimization
  const mouseOffsetX = mouseOffset.x;
  const mouseOffsetY = mouseOffset.y;

  const gradientCalculations = useMemo(() => {
    const mx = mouseOffsetX;
    const my = mouseOffsetY;
    const { GRADIENT } = ATOMIX_GLASS.CONSTANTS;

    // Calculate gradient angles and stops (optimized)
    const borderGradientAngle =
      GRADIENT.BASE_ANGLE + mx * GRADIENT.ANGLE_MULTIPLIER;
    const borderStop1 = Math.max(
      GRADIENT.BORDER_STOP_1.MIN,
      GRADIENT.BORDER_STOP_1.BASE + my * GRADIENT.BORDER_STOP_1.MULTIPLIER
    );
    const borderStop2 = Math.min(
      GRADIENT.BORDER_STOP_2.MAX,
      GRADIENT.BORDER_STOP_2.BASE + my * GRADIENT.BORDER_STOP_2.MULTIPLIER
    );
    const borderOpacity1 =
      GRADIENT.BORDER_OPACITY.BASE_1 +
      Math.abs(mx) * GRADIENT.BORDER_OPACITY.MULTIPLIER_LOW;
    const borderOpacity2 =
      GRADIENT.BORDER_OPACITY.BASE_2 +
      Math.abs(mx) * GRADIENT.BORDER_OPACITY.MULTIPLIER_HIGH;
    const borderOpacity3 =
      GRADIENT.BORDER_OPACITY.BASE_3 +
      Math.abs(mx) * GRADIENT.BORDER_OPACITY.MULTIPLIER_LOW;
    const borderOpacity4 =
      GRADIENT.BORDER_OPACITY.BASE_4 +
      Math.abs(mx) * GRADIENT.BORDER_OPACITY.MULTIPLIER_HIGH;

    // Hover gradient positions
    const hover1X = GRADIENT.CENTER_POSITION + mx / GRADIENT.HOVER_POSITION.DIVISOR_1;
    const hover1Y = GRADIENT.CENTER_POSITION + my / GRADIENT.HOVER_POSITION.DIVISOR_1;
    const hover2X = GRADIENT.CENTER_POSITION + mx / GRADIENT.HOVER_POSITION.DIVISOR_2;
    const hover2Y = GRADIENT.CENTER_POSITION + my / GRADIENT.HOVER_POSITION.DIVISOR_2;
    const hover3X = GRADIENT.CENTER_POSITION + mx * GRADIENT.HOVER_POSITION.MULTIPLIER_3;
    const hover3Y = GRADIENT.CENTER_POSITION + my * GRADIENT.HOVER_POSITION.MULTIPLIER_3;

    // Base layer positions
    const baseX = GRADIENT.CENTER_POSITION + mx * GRADIENT.BASE_LAYER_MULTIPLIER;
    const baseY = GRADIENT.CENTER_POSITION + my * GRADIENT.BASE_LAYER_MULTIPLIER;

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
  }, [mouseOffsetX, mouseOffsetY, isOverLight]);

  // Memoize opacity values separately - using design token values where applicable
  // Optimize: extract overLightConfig.opacity to avoid depending on whole object
  const overLightOpacity = overLightConfig.opacity;

  const opacityValues = useMemo(() => {
    // Design token opacity values: 0.5 = opacity-50, 0.4 = opacity-40, 0.8 = opacity-80
    const OPACITY_50 = 0.5; // var(--atomix-opacity-50, 0.5)
    const OPACITY_40 = 0.4; // var(--atomix-opacity-40, 0.4)
    const OPACITY_80 = 0.8; // var(--atomix-opacity-80, 0.8)
    const OPACITY_0 = 0; // var(--atomix-opacity-0, 0)
    const BASE_OVER_LIGHT_OPACITY = 0.4; // var(--atomix-opacity-40, 0.4)
    const OVER_OPACITY_MULTIPLIER = 1.1; // Dynamic multiplier for overlay
    
    return {
      hover1: isHovered || isActive ? OPACITY_50 : OPACITY_0,
      hover2: isActive ? OPACITY_50 : OPACITY_0,
      hover3: isHovered ? OPACITY_40 : isActive ? OPACITY_80 : OPACITY_0,
      base: isOverLight ? overLightOpacity || BASE_OVER_LIGHT_OPACITY : OPACITY_0,
      over: isOverLight ? (overLightOpacity || BASE_OVER_LIGHT_OPACITY) * OVER_OPACITY_MULTIPLIER : OPACITY_0,
    };
  }, [isHovered, isActive, isOverLight, overLightOpacity]);

  // Generate CSS variables for layers (only dynamic values)
  // Optimize: extract specific properties from objects to minimize dependencies
  const gradientIsOverLight = gradientCalculations.isOverLight;
  const gradientMx = gradientCalculations.mx;
  const gradientMy = gradientCalculations.my;
  const gradientBorderGradientAngle = gradientCalculations.borderGradientAngle;
  const gradientBorderStop1 = gradientCalculations.borderStop1;
  const gradientBorderStop2 = gradientCalculations.borderStop2;
  const gradientBorderOpacity1 = gradientCalculations.borderOpacity1;
  const gradientBorderOpacity2 = gradientCalculations.borderOpacity2;
  const gradientBorderOpacity3 = gradientCalculations.borderOpacity3;
  const gradientBorderOpacity4 = gradientCalculations.borderOpacity4;
  const gradientHover1X = gradientCalculations.hover1X;
  const gradientHover1Y = gradientCalculations.hover1Y;
  const gradientHover2X = gradientCalculations.hover2X;
  const gradientHover2Y = gradientCalculations.hover2Y;
  const gradientHover3X = gradientCalculations.hover3X;
  const gradientHover3Y = gradientCalculations.hover3Y;
  const gradientBaseX = gradientCalculations.baseX;
  const gradientBaseY = gradientCalculations.baseY;

  const positionStylesPosition = positionStyles.position;
  const positionStylesTop = positionStyles.top;
  const positionStylesLeft = positionStyles.left;

  const adjustedSizeWidth = adjustedSize.width;
  const adjustedSizeHeight = adjustedSize.height;

  const baseStyleTransform = baseStyle.transform;
  const opacityValuesHover1 = opacityValues.hover1;
  const opacityValuesHover2 = opacityValues.hover2;
  const opacityValuesHover3 = opacityValues.hover3;
  const opacityValuesBase = opacityValues.base;
  const opacityValuesOver = opacityValues.over;

  const glassVars = useMemo(() => {
    // Use CSS custom properties for white/black colors
    // Note: Dynamic rgba values in gradients use RGB values for glass effect calculations
    // These align with design tokens: --atomix-white-rgb and --atomix-black-rgb
    const whiteColor = '255, 255, 255'; // Matches --atomix-white / --atomix-white-rgb
    const blackColor = '0, 0, 0'; // Matches --atomix-black / --atomix-black-rgb

    return {
      // Standard CSS custom properties for dynamic values
      '--atomix-glass-radius': `${effectiveCornerRadius}px`,
      '--atomix-glass-transform': baseStyleTransform || 'none',
      '--atomix-glass-transition': effectiveReducedMotion ? 'none' : transitionDuration,
      '--atomix-glass-position': positionStylesPosition,
      '--atomix-glass-top': positionStylesTop !== 'fixed' ? `${positionStylesTop}px` : '0',
      '--atomix-glass-left': positionStylesLeft !== 'fixed' ? `${positionStylesLeft}px` : '0',
      '--atomix-glass-width':
        baseStylePosition !== 'fixed' ? adjustedSizeWidth : `${adjustedSizeWidth}px`,
      '--atomix-glass-height':
        baseStylePosition !== 'fixed' ? adjustedSizeHeight : `${adjustedSizeHeight}px`,
      // Border width: 1.5px (matches original implementation)
      '--atomix-glass-border-width': '1.5px',
      '--atomix-glass-blend-mode': gradientIsOverLight ? 'multiply' : 'overlay',
      // Dynamic gradients and backgrounds
      '--atomix-glass-border-gradient-1': `linear-gradient(${gradientBorderGradientAngle}deg, rgba(${whiteColor}, 0) 0%, rgba(${whiteColor}, ${gradientBorderOpacity1}) ${gradientBorderStop1}%, rgba(${whiteColor}, ${gradientBorderOpacity2}) ${gradientBorderStop2}%, rgba(${whiteColor}, 0) 100%)`,
      '--atomix-glass-border-gradient-2': `linear-gradient(${gradientBorderGradientAngle}deg, rgba(${whiteColor}, 0) 0%, rgba(${whiteColor}, ${gradientBorderOpacity3}) ${gradientBorderStop1}%, rgba(${whiteColor}, ${gradientBorderOpacity4}) ${gradientBorderStop2}%, rgba(${whiteColor}, 0) 100%)`,
      '--atomix-glass-hover-1-opacity': opacityValuesHover1,
      '--atomix-glass-hover-1-gradient': gradientIsOverLight
        ? `radial-gradient(circle at ${gradientHover1X}% ${gradientHover1Y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_END}%)`
        : `radial-gradient(circle at ${gradientHover1X}% ${gradientHover1Y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.WHITE_STOP}%)`,
      '--atomix-glass-hover-2-opacity': opacityValuesHover2,
      '--atomix-glass-hover-2-gradient': gradientIsOverLight
        ? `radial-gradient(circle at ${gradientHover2X}% ${gradientHover2Y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_END}%)`
        : `radial-gradient(circle at ${gradientHover2X}% ${gradientHover2Y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.WHITE_STOP}%)`,
      '--atomix-glass-hover-3-opacity': opacityValuesHover3,
      '--atomix-glass-hover-3-gradient': gradientIsOverLight
        ? `radial-gradient(circle at ${gradientHover3X}% ${gradientHover3Y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_END}%)`
        : `radial-gradient(circle at ${gradientHover3X}% ${gradientHover3Y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.WHITE_STOP}%)`,
      '--atomix-glass-base-opacity': opacityValuesBase,
      '--atomix-glass-base-gradient': gradientIsOverLight
        ? `linear-gradient(${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.ANGLE}deg, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_START_BASE + gradientMx * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_START_MULTIPLIER}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_BASE + gradientMy * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_MULTIPLIER}) ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_STOP}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_END_BASE + Math.abs(gradientMx) * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_END_MULTIPLIER}) 100%)`
        : `rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.WHITE_OPACITY})`,
      '--atomix-glass-overlay-opacity': opacityValuesOver,
      '--atomix-glass-overlay-gradient': gradientIsOverLight
        ? `radial-gradient(circle at ${gradientBaseX}% ${gradientBaseY}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_START_BASE + Math.abs(gradientMx) * ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_START_MULTIPLIER}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_MID_STOP}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_END_BASE + Math.abs(gradientMy) * ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_END_MULTIPLIER}) 100%)`
        : `rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.WHITE_OPACITY})`,
    } as React.CSSProperties;
  }, [
    // Position styles - only specific properties
    positionStylesPosition,
    positionStylesTop,
    positionStylesLeft,
    // Adjusted size - only specific properties
    adjustedSizeWidth,
    adjustedSizeHeight,
    // Base style - only transform property
    baseStyleTransform,
    baseStylePosition,
    // Other values
    effectiveCornerRadius,
    effectiveReducedMotion,
    transitionDuration,
    // Gradient calculations - extracted properties
    gradientIsOverLight,
    gradientMx,
    gradientMy,
    gradientBorderGradientAngle,
    gradientBorderStop1,
    gradientBorderStop2,
    gradientBorderOpacity1,
    gradientBorderOpacity2,
    gradientBorderOpacity3,
    gradientBorderOpacity4,
    gradientHover1X,
    gradientHover1Y,
    gradientHover2X,
    gradientHover2Y,
    gradientHover3X,
    gradientHover3Y,
    gradientBaseX,
    gradientBaseY,
    // Opacity values - extracted properties
    opacityValuesHover1,
    opacityValuesHover2,
    opacityValuesHover3,
    opacityValuesBase,
    opacityValuesOver,
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
              ? displacementScale * ATOMIX_GLASS.CONSTANTS.MULTIPLIERS.SHADER_DISPLACEMENT
              : overLightConfig.isOverLight
                ? displacementScale * ATOMIX_GLASS.CONSTANTS.MULTIPLIERS.OVER_LIGHT_DISPLACEMENT
                : displacementScale
        }
        blurAmount={effectiveDisableEffects ? 0 : blurAmount}
        saturation={
          effectiveHighContrast
            ? ATOMIX_GLASS.CONSTANTS.SATURATION.HIGH_CONTRAST
            : overLightConfig.isOverLight
              ? saturation * overLightConfig.saturationBoost
              : saturation
        }
        aberrationIntensity={
          effectiveDisableEffects
            ? 0
            : mode === 'shader'
              ? aberrationIntensity * ATOMIX_GLASS.CONSTANTS.MULTIPLIERS.SHADER_ABERRATION
              : aberrationIntensity
        }
        glassSize={{width: adjustedSizeWidth, height: adjustedSizeHeight} as any}
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
       {Boolean(onClick) && (
        <>
          {/* Hover layers - opacity and background set via CSS variables in SCSS */}
          <div className={ATOMIX_GLASS.HOVER_1_CLASS} />
          <div className={ATOMIX_GLASS.HOVER_2_CLASS} />
          <div className={ATOMIX_GLASS.HOVER_3_CLASS} />
        </>
      )}

      {/* Background layers for over-light mode */}
      {/* Static styles (pointer-events, will-change) are in SCSS */}
      <div
        className={[
          ATOMIX_GLASS.BACKGROUND_LAYER_CLASS,
          ATOMIX_GLASS.BACKGROUND_LAYER_DARK_CLASS,
          isOverLight
            ? ATOMIX_GLASS.BACKGROUND_LAYER_OVER_LIGHT_CLASS
            : ATOMIX_GLASS.BACKGROUND_LAYER_HIDDEN_CLASS,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          ...positionStyles,
          height: adjustedSize.height,
          width: adjustedSize.width,
          borderRadius: `${effectiveCornerRadius}px`,
          transform: baseStyle.transform,
          transition: baseStyle.transition,
        }}
      />
      <div
        className={[
          ATOMIX_GLASS.BACKGROUND_LAYER_CLASS,
          ATOMIX_GLASS.BACKGROUND_LAYER_BLACK_CLASS,
          isOverLight
            ? ATOMIX_GLASS.BACKGROUND_LAYER_OVER_LIGHT_CLASS
            : ATOMIX_GLASS.BACKGROUND_LAYER_HIDDEN_CLASS,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          ...positionStyles,
          height: adjustedSize.height,
          width: adjustedSize.width,
          borderRadius: `${effectiveCornerRadius}px`,
          transform: baseStyle.transform,
          transition: baseStyle.transition,
        }}
      />
      {shouldRenderOverLightLayers && (
        <>
          {/* Base and overlay layers - opacity and background set via CSS variables in SCSS */}
          <div className={ATOMIX_GLASS.BASE_LAYER_CLASS} />
          <div className={ATOMIX_GLASS.OVERLAY_LAYER_CLASS} />
          {/* Overlay highlight - opacity and background are dynamic, calculated inline */}
          <div
            className={ATOMIX_GLASS.OVERLAY_HIGHLIGHT_CLASS}
            style={{
              opacity:
                opacityValues.over *
                ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.OPACITY_MULTIPLIER,
              background: `radial-gradient(circle at ${ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.POSITION_X}% ${ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.POSITION_Y}%, rgba(255, 255, 255, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.WHITE_OPACITY}) 0%, transparent ${ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.STOP}%)`,
            }}
          />
        </>
      )}
      {enableBorderEffect && (
        <>
          {/* Border elements - all styles (static and dynamic via CSS variables) are in SCSS */}
          {/* Position, size, transform, transition, border-radius all use CSS variables set in glassVars */}
          <span className={ATOMIX_GLASS.BORDER_1_CLASS} />
          <span className={ATOMIX_GLASS.BORDER_2_CLASS} />
        </>
      )}
    </div>
  );
}

export default AtomixGlass;
