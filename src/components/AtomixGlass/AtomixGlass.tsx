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
 * - Automatic light/dark theme detection via overLight prop
 * - Accessibility and performance optimizations
 * - Multiple displacement modes (standard, polar, prominent, shader)
 * - Design token integration for consistent theming
 * - Focus ring support for keyboard navigation
 * - Responsive breakpoints for mobile optimization
 * - Enhanced ARIA attributes for screen readers
 *
 * Design System Compliance:
 * - Uses design tokens for opacity, spacing, and colors
 * - Follows BEM methodology for class naming
 * - Implements focus-ring mixin for accessibility
 * - Supports reduced motion and high contrast preferences
 *
 * @example
 * // Basic usage with dynamic border-radius extraction
 * <AtomixGlass>
 *   <div style={{ borderRadius: '12px' }}>Content with 12px radius</div>
 * </AtomixGlass>
 *
 * @example
 * // Manual border-radius override
 * <AtomixGlass cornerRadius={20}>
 *   <div>Content with 20px glass radius</div>
 * </AtomixGlass>
 *
 * @example
 * // Interactive glass with click handler
 * <AtomixGlass onClick={() => console.log('Clicked')} aria-label="Glass card">
 *   <div>Clickable content</div>
 * </AtomixGlass>
 *
 * @example
 * // OverLight - Boolean mode (explicit control)
 * <AtomixGlass overLight={true}>
 *   <div>Content on light background</div>
 * </AtomixGlass>
 *
 * @example
 * // OverLight - Auto-detection mode
 * <AtomixGlass overLight="auto">
 *   <div>Content with auto-detected background</div>
 * </AtomixGlass>
 *
 * @example
 * // OverLight - Object config with custom settings
 * <AtomixGlass 
 *   overLight={{
 *     threshold: 0.8,
 *     opacity: 0.6,
 *     contrast: 1.8,
 *     brightness: 1.0,
 *     saturationBoost: 1.5
 *   }}
 * >
 *   <div>Content with custom overLight config</div>
 * </AtomixGlass>
 *
 * @example
 * // Debug mode for overLight detection
 * <AtomixGlass overLight="auto" debugOverLight={true}>
 *   <div>Content with debug logging enabled</div>
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
  debugOverLight = false,
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
    debugOverLight,
    enablePerformanceMonitoring,
    children,
  });

  // Use consistent overLight state from hook
  const isOverLight = overLightConfig.isOverLight;
  const shouldRenderOverLightLayers = enableOverLightLayers && isOverLight;


  // Calculate base style with transforms (only dynamic values)
  const baseStyle = useMemo(
    () => ({
      ...style,
      ...(elasticity !== 0 && !effectiveDisableEffects && {
        transform: transformStyle,
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

  // Read opacity design tokens from CSS custom properties
  const opacityValues = useMemo(() => {
    // Get opacity values from CSS custom properties with fallbacks
    // These align with design tokens: --atomix-opacity-50, --atomix-opacity-40, etc.
    let opacity50 = 0.5;
    let opacity40 = 0.4;
    let opacity80 = 0.8;
    let opacity0 = 0;

    // Try to read from CSS custom properties if available (SSR-safe)
    if (typeof window !== 'undefined' && glassRef.current) {
      try {
        const computedStyle = window.getComputedStyle(glassRef.current);
        const opacity50Value = computedStyle.getPropertyValue('--atomix-opacity-50').trim();
        const opacity40Value = computedStyle.getPropertyValue('--atomix-opacity-40').trim();
        const opacity80Value = computedStyle.getPropertyValue('--atomix-opacity-80').trim();
        const opacity0Value = computedStyle.getPropertyValue('--atomix-opacity-0').trim();

        if (opacity50Value) opacity50 = parseFloat(opacity50Value) || 0.5;
        if (opacity40Value) opacity40 = parseFloat(opacity40Value) || 0.4;
        if (opacity80Value) opacity80 = parseFloat(opacity80Value) || 0.8;
        if (opacity0Value) opacity0 = parseFloat(opacity0Value) || 0;
      } catch (error) {
        // Fallback to defaults if reading fails
      }
    }

    const BASE_OVER_LIGHT_OPACITY = opacity40; // Uses design token
    const OVER_OPACITY_MULTIPLIER = 1.1; // Dynamic multiplier for overlay
    
    return {
      hover1: isHovered || isActive ? opacity50 : opacity0,
      hover2: isActive ? opacity50 : opacity0,
      hover3: isHovered ? opacity40 : isActive ? opacity80 : opacity0,
      base: isOverLight ? overLightOpacity || BASE_OVER_LIGHT_OPACITY : opacity0,
      over: isOverLight ? (overLightOpacity || BASE_OVER_LIGHT_OPACITY) * OVER_OPACITY_MULTIPLIER : opacity0,
    };
  }, [isHovered, isActive, isOverLight, overLightOpacity, glassRef]);

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
    // RGB color values for rgba() functions
    // Note: CSS doesn't support rgba(var(--rgb), opacity) syntax, so we use direct values
    // These values align with design tokens: --atomix-white-rgb and --atomix-black-rgb
    // The actual RGB values are defined in SCSS and should match these fallbacks
    // TODO: Consider reading from CSS custom properties if browser support improves
    const whiteColor = '255, 255, 255'; // Matches --atomix-white-rgb design token
    const blackColor = '0, 0, 0'; // Matches --atomix-black-rgb design token

    return {
      // Standard CSS custom properties for dynamic values
      '--atomix-glass-radius': `${effectiveCornerRadius}px`,
      '--atomix-glass-transform': baseStyleTransform || 'none',
      '--atomix-glass-position': positionStylesPosition,
      '--atomix-glass-top': positionStylesTop !== 'fixed' ? `${positionStylesTop}px` : '0',
      '--atomix-glass-left': positionStylesLeft !== 'fixed' ? `${positionStylesLeft}px` : '0',
      '--atomix-glass-width':
        baseStylePosition !== 'fixed' ? adjustedSizeWidth : `${adjustedSizeWidth}px`,
      '--atomix-glass-height':
        baseStylePosition !== 'fixed' ? adjustedSizeHeight : `${adjustedSizeHeight}px`,
      // Border width: Use spacing token for consistency
      '--atomix-glass-border-width': 'var(--atomix-spacing-0-5, 0.09375rem)',
      '--atomix-glass-blend-mode': gradientIsOverLight ? 'multiply' : 'overlay',
      // Dynamic gradients and backgrounds
      // Note: RGB values use design token-aligned constants (white: 255,255,255; black: 0,0,0)
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
      aria-disabled={onClick && effectiveDisableEffects ? true : onClick ? false : undefined}
      aria-pressed={onClick && isActive ? true : onClick ? false : undefined}
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
