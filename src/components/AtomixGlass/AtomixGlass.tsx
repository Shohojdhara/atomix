import React, { useMemo, useRef, useEffect } from 'react';
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

  // Calculate base style with transforms
  const baseStyle = {
    ...style,
    ...(elasticity !== 0 && !effectiveDisableEffects && {
      transform: transformStyle,
    }),
  };

  // Build className with state modifiers
  const componentClassName = [
    ATOMIX_GLASS.BASE_CLASS,
    effectiveReducedMotion && `${ATOMIX_GLASS.BASE_CLASS}--reduced-motion`,
    effectiveHighContrast && `${ATOMIX_GLASS.BASE_CLASS}--high-contrast`,
    effectiveDisableEffects && `${ATOMIX_GLASS.BASE_CLASS}--disabled-effects`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Calculate position and size styles
  const positionStyles = {
    position: (style.position || 'absolute') as React.CSSProperties['position'],
    top: style.top || 0,
    left: style.left || 0,
  };

  const adjustedSize = {
    width:
      style.position !== 'fixed'
        ? '100%'
        : style.width
          ? style.width
          : Math.max(glassSize.width, 0),
    height:
      style.position !== 'fixed'
        ? '100%'
        : style.height
          ? style.height
          : Math.max(glassSize.height, 0),
  };

  // Calculate gradient values directly without excessive memoization
  const mx = mouseOffset.x;
  const my = mouseOffset.y;

  // Calculate gradient angles and stops
  const GRADIENT = ATOMIX_GLASS.CONSTANTS.GRADIENT;
  const borderGradientAngle = GRADIENT.BASE_ANGLE + mx * GRADIENT.ANGLE_MULTIPLIER;
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

  // Calculate opacity values
  const overLightOpacity = overLightConfig.opacity;
  const BASE_OVER_LIGHT_OPACITY = 0.4; // Default opacity value
  const OVER_OPACITY_MULTIPLIER = 1.1; // Dynamic multiplier for overlay

  const opacityValues = {
    hover1: isHovered || isActive ? 0.5 : 0,
    hover2: isActive ? 0.5 : 0,
    hover3: isHovered ? 0.4 : isActive ? 0.8 : 0,
    base: isOverLight ? overLightOpacity || BASE_OVER_LIGHT_OPACITY : 0,
    over: isOverLight ? (overLightOpacity || BASE_OVER_LIGHT_OPACITY) * OVER_OPACITY_MULTIPLIER : 0,
  };

  // Generate CSS variables for layers
  const whiteColor = '255, 255, 255'; // Default white RGB
  const blackColor = '0, 0, 0'; // Default black RGB

  const glassVars = {
    // Standard CSS custom properties for dynamic values
    '--atomix-glass-radius': `${effectiveCornerRadius}px`,
    '--atomix-glass-transform': transformStyle || 'none',
    '--atomix-glass-position': positionStyles.position,
    '--atomix-glass-top': positionStyles.top !== 'fixed' ? `${positionStyles.top}px` : '0',
    '--atomix-glass-left': positionStyles.left !== 'fixed' ? `${positionStyles.left}px` : '0',
    '--atomix-glass-width':
      style.position !== 'fixed' ? adjustedSize.width : `${adjustedSize.width}px`,
    '--atomix-glass-height':
      style.position !== 'fixed' ? adjustedSize.height : `${adjustedSize.height}px`,
    // Border width: Use spacing token for consistency
    '--atomix-glass-border-width': 'var(--atomix-spacing-0-5, 0.09375rem)',
    '--atomix-glass-blend-mode': isOverLight ? 'multiply' : 'overlay',
    // Dynamic gradients and backgrounds
    '--atomix-glass-border-gradient-1': `linear-gradient(${borderGradientAngle}deg, rgba(${whiteColor}, 0) 0%, rgba(${whiteColor}, ${borderOpacity1}) ${borderStop1}%, rgba(${whiteColor}, ${borderOpacity2}) ${borderStop2}%, rgba(${whiteColor}, 0) 100%)`,
    '--atomix-glass-border-gradient-2': `linear-gradient(${borderGradientAngle}deg, rgba(${whiteColor}, 0) 0%, rgba(${whiteColor}, ${borderOpacity3}) ${borderStop1}%, rgba(${whiteColor}, ${borderOpacity4}) ${borderStop2}%, rgba(${whiteColor}, 0) 100%)`,
    '--atomix-glass-hover-1-opacity': opacityValues.hover1,
    '--atomix-glass-hover-1-gradient': isOverLight
      ? `radial-gradient(circle at ${hover1X}% ${hover1Y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_END}%)`
      : `radial-gradient(circle at ${hover1X}% ${hover1Y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.WHITE_STOP}%)`,
    '--atomix-glass-hover-2-opacity': opacityValues.hover2,
    '--atomix-glass-hover-2-gradient': isOverLight
      ? `radial-gradient(circle at ${hover2X}% ${hover2Y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_END}%)`
      : `radial-gradient(circle at ${hover2X}% ${hover2Y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.WHITE_STOP}%)`,
    '--atomix-glass-hover-3-opacity': opacityValues.hover3,
    '--atomix-glass-hover-3-gradient': isOverLight
      ? `radial-gradient(circle at ${hover3X}% ${hover3Y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_END}%)`
      : `radial-gradient(circle at ${hover3X}% ${hover3Y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.WHITE_STOP}%)`,
    '--atomix-glass-base-opacity': opacityValues.base,
    '--atomix-glass-base-gradient': isOverLight
      ? `linear-gradient(${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.ANGLE}deg, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_START_BASE + mx * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_START_MULTIPLIER}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_BASE + my * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_MULTIPLIER}) ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_STOP}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_END_BASE + Math.abs(mx) * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_END_MULTIPLIER}) 100%)`
      : `rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.WHITE_OPACITY})`,
    '--atomix-glass-overlay-opacity': opacityValues.over,
    '--atomix-glass-overlay-gradient': isOverLight
      ? `radial-gradient(circle at ${baseX}% ${baseY}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_START_BASE + Math.abs(mx) * ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_START_MULTIPLIER}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_MID_STOP}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_END_BASE + Math.abs(my) * ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_END_MULTIPLIER}) 100%)`
      : `rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.WHITE_OPACITY})`,
  } as React.CSSProperties;

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
