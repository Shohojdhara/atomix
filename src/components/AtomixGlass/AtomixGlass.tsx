import React, { forwardRef, memo, useMemo, useRef } from 'react';
import type { AtomixGlassProps } from '../../lib/types/components';
import { ATOMIX_GLASS } from '../../lib/constants/components';
import { AtomixGlassContainer } from './AtomixGlassContainer';
import { useAtomixGlass } from '../../lib/composables/useAtomixGlass';
// Phase 3: Optimization & Adaptation
import { useResponsiveGlass } from '../../lib/composables/useResponsiveGlass';
import { usePerformanceMonitor } from '../../lib/composables/usePerformanceMonitor';
import { PerformanceDashboard } from './PerformanceDashboard';
import { getDevicePreset, MOBILE_OPTIMIZED_BREAKPOINTS } from '../../lib/composables/useResponsiveGlass.presets';

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
 * - Time-based animation system with FBM distortion
 * - Device preset optimization for performance/quality balance
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
 * <AtomixGlass borderRadius={20}>
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
 *
 * @example
 * // Performance-optimized for mobile devices
 * <AtomixGlass devicePreset="performance" disableResponsiveBreakpoints={false}>
 *   <div>Mobile-optimized glass effect</div>
 * </AtomixGlass>
 */

// ─── Type guard for the dev-only performance flag ────────────────────────────
declare global {
  interface Window {
    enablePerformanceMonitoring?: boolean;
  }
}

// Internal implementation with forwardRef
const AtomixGlassInner = forwardRef<HTMLDivElement, AtomixGlassProps>(function AtomixGlass(
  {
    children,
    displacementScale = ATOMIX_GLASS.DEFAULTS.DISPLACEMENT_SCALE,
    blurAmount = ATOMIX_GLASS.DEFAULTS.BLUR_AMOUNT,
    saturation = ATOMIX_GLASS.DEFAULTS.SATURATION,
    aberrationIntensity = ATOMIX_GLASS.DEFAULTS.ABERRATION_INTENSITY,
    elasticity = ATOMIX_GLASS.DEFAULTS.ELASTICITY,
    borderRadius,
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
    withoutEffects = false,
    withLiquidBlur = false,
    withBorder = true,
    withOverLightLayers = ATOMIX_GLASS.DEFAULTS.ENABLE_OVER_LIGHT_LAYERS,
    debugPerformance = false,
    debugOverLight = false,
    height,
    width,
    withTimeAnimation = false,
    animationSpeed = 1.0,
    withMultiLayerDistortion = false,
    distortionOctaves = 3,
    distortionLacunarity = 2.0,
    distortionGain = 0.5,
    distortionQuality = 'medium',
    devicePreset = 'balanced',
    disableResponsiveBreakpoints = false,
    ...rest
  },
  ref
) {
  const glassRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ── Layout hoisting ──────────────────────────────────────────────────────
  // When position is fixed/sticky the layout props must live on the ROOT
  // `.c-atomix-glass` element so that every decorative layer (borders,
  // backgrounds, hover effects) stays in the same stacking context.

  // Extract zIndex from style so it becomes the base for ALL internal
  // layers via --atomix-glass-base-z-index.  It must NOT be applied as a
  // real z-index on the root element — that would break the glass effect.
  const { zIndex: customZIndex, ...restStyle } = style;
  const isFixedOrSticky = restStyle.position === 'fixed' || restStyle.position === 'sticky';

  // Use composable hook for all state and logic
  const {
    isHovered,
    isActive,
    glassSize,
    effectiveBorderRadius,
    effectiveReducedMotion,
    effectiveHighContrast,
    effectiveWithoutEffects,
    overLightConfig,
    globalMousePosition,
    mouseOffset,
    transformStyle,
    getShaderTime,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
  } = useAtomixGlass({
    glassRef,
    contentRef,
    borderRadius,
    globalMousePosition: externalGlobalMousePosition,
    mouseOffset: externalMouseOffset,
    mouseContainer,
    overLight,
    reducedMotion,
    highContrast,
    withoutEffects,
    elasticity,
    onClick,
    debugOverLight,
    debugPerformance,
    children,
    blurAmount,
    saturation,
    withLiquidBlur,
    padding,
    style,
    isFixedOrSticky,
    // Phase 1: Animation System props
    withTimeAnimation,
    animationSpeed,
    withMultiLayerDistortion,
    distortionOctaves,
    distortionLacunarity,
    distortionGain,
    distortionQuality,
  });

  // ============================================================================
  // Phase 3: Optimization & Adaptation Systems
  // ============================================================================

  // Get device preset parameters - memoized to prevent recalculation
  const devicePresetParams = useMemo(() => {
    return getDevicePreset(devicePreset);
  }, [devicePreset]);

  // Responsive breakpoint system - automatically adjusts parameters based on viewport
  useResponsiveGlass({
    baseParams: {
      ...devicePresetParams,
      distortionOctaves: Math.round((displacementScale || ATOMIX_GLASS.DEFAULTS.DISPLACEMENT_SCALE) / 25),
      displacementScale: displacementScale || ATOMIX_GLASS.DEFAULTS.DISPLACEMENT_SCALE,
      blurAmount: blurAmount || ATOMIX_GLASS.DEFAULTS.BLUR_AMOUNT,
      saturation: saturation || ATOMIX_GLASS.DEFAULTS.SATURATION,
      aberrationIntensity: aberrationIntensity || ATOMIX_GLASS.DEFAULTS.ABERRATION_INTENSITY,
      animationSpeed: 1.0,
      chromaticIntensity: aberrationIntensity || ATOMIX_GLASS.DEFAULTS.ABERRATION_INTENSITY,
    },
    breakpoints: MOBILE_OPTIMIZED_BREAKPOINTS,
    enabled: !disableResponsiveBreakpoints && typeof window !== 'undefined',
    debug: false,
  });

  // Performance monitoring - tracks FPS, frame time, memory usage
  const { metrics: performanceMetrics, toggleMonitoring } = usePerformanceMonitor({
    enabled: false, // Toggled manually below
    debug: false,
    showOverlay: false,
  });

  // Auto-start performance monitoring only in development when flag is set
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && window.enablePerformanceMonitoring) {
      toggleMonitoring();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const isOverLight = useMemo(() => overLightConfig.isOverLight, [overLightConfig.isOverLight]);

  const shouldRenderOverLightLayers = withOverLightLayers && isOverLight;

  const rootLayoutStyle = useMemo<React.CSSProperties>(() => {
    if (!isFixedOrSticky) return {};
    const { position: p, top: t, left: l, right: r, bottom: b } = restStyle;
    return {
      ...(p && { position: p }),
      ...(t !== undefined && { top: t }),
      ...(l !== undefined && { left: l }),
      ...(r !== undefined && { right: r }),
      ...(b !== undefined && { bottom: b }),
    };
  }, [isFixedOrSticky, restStyle]);

  // Calculate base style with transforms
  // When layout is hoisted to the root, strip those props from the container
  const baseStyle = useMemo(() => {
    if (isFixedOrSticky) {
      const { position: _p, top: _t, left: _l, right: _r, bottom: _b, ...visualStyle } = restStyle;
      return {
        ...visualStyle,
        ...(!effectiveWithoutEffects && { transform: transformStyle }),
      };
    }
    return {
      ...restStyle,
      ...(!effectiveWithoutEffects && { transform: transformStyle }),
    };
  }, [isFixedOrSticky, restStyle, effectiveWithoutEffects, transformStyle]);

  // Build className with state modifiers
  const componentClassName = [
    ATOMIX_GLASS.BASE_CLASS,
    effectiveReducedMotion && `${ATOMIX_GLASS.BASE_CLASS}--reduced-motion`,
    effectiveHighContrast && `${ATOMIX_GLASS.BASE_CLASS}--high-contrast`,
    effectiveWithoutEffects && `${ATOMIX_GLASS.BASE_CLASS}--disabled-effects`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Calculate position and size styles for internal layers
  // When root is fixed/sticky, internal layers use absolute (relative to root)
  const positionStyles = useMemo(
    () => ({
      position: (isFixedOrSticky
        ? 'absolute'
        : restStyle.position || 'absolute') as React.CSSProperties['position'],
      top: isFixedOrSticky ? 0 : restStyle.top || 0,
      left: isFixedOrSticky ? 0 : restStyle.left || 0,
    }),
    [isFixedOrSticky, restStyle.position, restStyle.top, restStyle.left]
  );

  const adjustedSize = useMemo(() => {
    // Keep a reference to positionStyles to avoid unused-variable lint,
    // but sizing is driven by explicit width/height or measured size.
    const _position = positionStyles.position;

    const resolveLength = (value: string | number | undefined, measured: number): string => {
      if (value !== undefined) {
        return typeof value === 'number' ? `${value}px` : value;
      }
      if (measured > 0) {
        return `${measured}px`;
      }
      return '100%';
    };

    const effectiveWidth = width ?? restStyle.width;
    const effectiveHeight = height ?? restStyle.height;

    return {
      width: resolveLength(effectiveWidth, glassSize.width),
      height: resolveLength(effectiveHeight, glassSize.height),
    };
  }, [
    width,
    height,
    restStyle.width,
    restStyle.height,
    positionStyles.position,
    glassSize.width,
    glassSize.height,
  ]);

  // Memoize expensive gradient calculations
  const gradientValues = useMemo(() => {
    const mx = mouseOffset.x;
    const my = mouseOffset.y;
    const absMx = Math.abs(mx);
    const absMy = Math.abs(my);
    const GRADIENT = ATOMIX_GLASS.CONSTANTS.GRADIENT;

    return {
      borderGradientAngle: GRADIENT.BASE_ANGLE + mx * GRADIENT.ANGLE_MULTIPLIER,
      borderStop1: Math.max(
        GRADIENT.BORDER_STOP_1.MIN,
        GRADIENT.BORDER_STOP_1.BASE + my * GRADIENT.BORDER_STOP_1.MULTIPLIER
      ),
      borderStop2: Math.min(
        GRADIENT.BORDER_STOP_2.MAX,
        GRADIENT.BORDER_STOP_2.BASE + my * GRADIENT.BORDER_STOP_2.MULTIPLIER
      ),
      borderOpacities: [
        GRADIENT.BORDER_OPACITY.BASE_1 + absMx * GRADIENT.BORDER_OPACITY.MULTIPLIER_LOW,
        GRADIENT.BORDER_OPACITY.BASE_2 + absMx * GRADIENT.BORDER_OPACITY.MULTIPLIER_HIGH,
        GRADIENT.BORDER_OPACITY.BASE_3 + absMx * GRADIENT.BORDER_OPACITY.MULTIPLIER_LOW,
        GRADIENT.BORDER_OPACITY.BASE_4 + absMx * GRADIENT.BORDER_OPACITY.MULTIPLIER_HIGH,
      ],
      hoverPositions: {
        hover1: {
          x: GRADIENT.CENTER_POSITION + mx / GRADIENT.HOVER_POSITION.DIVISOR_1,
          y: GRADIENT.CENTER_POSITION + my / GRADIENT.HOVER_POSITION.DIVISOR_1,
        },
        hover2: {
          x: GRADIENT.CENTER_POSITION + mx / GRADIENT.HOVER_POSITION.DIVISOR_2,
          y: GRADIENT.CENTER_POSITION + my / GRADIENT.HOVER_POSITION.DIVISOR_2,
        },
        hover3: {
          x: GRADIENT.CENTER_POSITION + mx * GRADIENT.HOVER_POSITION.MULTIPLIER_3,
          y: GRADIENT.CENTER_POSITION + my * GRADIENT.HOVER_POSITION.MULTIPLIER_3,
        },
      },
      basePosition: {
        x: GRADIENT.CENTER_POSITION + mx * GRADIENT.BASE_LAYER_MULTIPLIER,
        y: GRADIENT.CENTER_POSITION + my * GRADIENT.BASE_LAYER_MULTIPLIER,
      },
      mx,
      my,
      absMx,
      absMy,
    };
  }, [mouseOffset.x, mouseOffset.y]);

  // Memoize opacity calculations
  const opacityValues = useMemo(() => {
    const overLightOpacity = overLightConfig.opacity;
    const BASE_OVER_LIGHT_OPACITY = 0.4;
    const OVER_OPACITY_MULTIPLIER = 1.1;

    return {
      hover1: isHovered || isActive ? 0.5 : 0,
      hover2: isActive ? 0.5 : 0,
      hover3: isHovered ? 0.4 : isActive ? 0.8 : 0,
      base: isOverLight ? overLightOpacity || BASE_OVER_LIGHT_OPACITY : 0,
      over: isOverLight
        ? (overLightOpacity || BASE_OVER_LIGHT_OPACITY) * OVER_OPACITY_MULTIPLIER
        : 0,
    };
  }, [isHovered, isActive, isOverLight, overLightConfig.opacity]);

  // Memoize CSS variables object
  const glassVars = useMemo(() => {
    const whiteColor = ATOMIX_GLASS.CONSTANTS.PALETTE.WHITE;
    const blackColor = ATOMIX_GLASS.CONSTANTS.PALETTE.BLACK;
    const {
      borderGradientAngle,
      borderStop1,
      borderStop2,
      borderOpacities,
      hoverPositions,
      basePosition,
      mx,
      my,
      absMx,
      absMy,
    } = gradientValues;

    const configBorderOpacity = overLightConfig?.borderOpacity ?? 1;

    return {
      ...(customZIndex !== undefined && { '--atomix-glass-base-z-index': customZIndex }),
      '--atomix-glass-radius': `${effectiveBorderRadius}px`,
      '--atomix-glass-transform': transformStyle || 'none',
      // Internal decorative layers are positioned relative to the root;
      '--atomix-glass-position': rootLayoutStyle.position,
      '--atomix-glass-top': `${isFixedOrSticky ? rootLayoutStyle.top : 0}px`,
      '--atomix-glass-left': `${isFixedOrSticky ? rootLayoutStyle.left : 0}px`,
      '--atomix-glass-width': adjustedSize.width,
      '--atomix-glass-height': adjustedSize.height,
      '--atomix-glass-border-width': 'var(--atomix-spacing-0-5, 0.09375rem)',
      '--atomix-glass-blend-mode': isOverLight ? 'multiply' : 'overlay',
      '--atomix-glass-border-gradient-1': `linear-gradient(${borderGradientAngle}deg, rgba(${whiteColor}, 0) 0%, rgba(${whiteColor}, ${(borderOpacities[0] ?? 1) * configBorderOpacity}) ${borderStop1}%, rgba(${whiteColor}, ${(borderOpacities[1] ?? 1) * configBorderOpacity}) ${borderStop2}%, rgba(${whiteColor}, 0) 100%)`,
      '--atomix-glass-border-gradient-2': `linear-gradient(${borderGradientAngle}deg, rgba(${whiteColor}, 0) 0%, rgba(${whiteColor}, ${(borderOpacities[2] ?? 1) * configBorderOpacity}) ${borderStop1}%, rgba(${whiteColor}, ${(borderOpacities[3] ?? 1) * configBorderOpacity}) ${borderStop2}%, rgba(${whiteColor}, 0) 100%)`,
      '--atomix-glass-hover-1-opacity': opacityValues.hover1,
      '--atomix-glass-hover-1-gradient': isOverLight
        ? `radial-gradient(circle at ${hoverPositions.hover1.x}% ${hoverPositions.hover1.y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_END}%)`
        : `radial-gradient(circle at ${hoverPositions.hover1.x}% ${hoverPositions.hover1.y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.WHITE_STOP}%)`,
      '--atomix-glass-hover-2-opacity': opacityValues.hover2,
      '--atomix-glass-hover-2-gradient': isOverLight
        ? `radial-gradient(circle at ${hoverPositions.hover2.x}% ${hoverPositions.hover2.y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_END}%)`
        : `radial-gradient(circle at ${hoverPositions.hover2.x}% ${hoverPositions.hover2.y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.WHITE_STOP}%)`,
      '--atomix-glass-hover-3-opacity': opacityValues.hover3,
      '--atomix-glass-hover-3-gradient': isOverLight
        ? `radial-gradient(circle at ${hoverPositions.hover3.x}% ${hoverPositions.hover3.y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_END}%)`
        : `radial-gradient(circle at ${hoverPositions.hover3.x}% ${hoverPositions.hover3.y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.WHITE_STOP}%)`,
      '--atomix-glass-base-opacity': opacityValues.base,
      '--atomix-glass-base-gradient': isOverLight
        ? `linear-gradient(${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.ANGLE}deg, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_START_BASE + mx * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_START_MULTIPLIER}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_BASE + my * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_MULTIPLIER}) ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_STOP}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_END_BASE + absMx * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_END_MULTIPLIER}) 100%)`
        : `rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.WHITE_OPACITY})`,
      '--atomix-glass-overlay-opacity': opacityValues.over,
      '--atomix-glass-overlay-gradient': isOverLight
        ? `radial-gradient(circle at ${basePosition.x}% ${basePosition.y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_START_BASE + absMx * ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_START_MULTIPLIER}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_MID_STOP}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_END_BASE + absMy * ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_END_MULTIPLIER}) 100%)`
        : `rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.WHITE_OPACITY})`,
      '--atomix-glass-overlay-highlight-opacity':
        opacityValues.over * ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.OPACITY_MULTIPLIER,
      '--atomix-glass-overlay-highlight-bg': `radial-gradient(circle at ${ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.POSITION_X}% ${ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.POSITION_Y}%, rgba(255, 255, 255, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.WHITE_OPACITY}) 0%, transparent ${ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.STOP}%)`,
    } as React.CSSProperties;
  }, [
    gradientValues,
    opacityValues,
    effectiveBorderRadius,
    transformStyle,
    adjustedSize,
    isOverLight,
    overLightConfig.borderOpacity,
    customZIndex,
    rootLayoutStyle,
    isFixedOrSticky,
  ]);

  // ─── Render helpers ──────────────────────────────────────────────────────

  const renderHoverLayers = () => (
    <>
      {/* Hover layers - opacity and background set via CSS variables in SCSS */}
      <div className={ATOMIX_GLASS.HOVER_1_CLASS} />
      <div className={ATOMIX_GLASS.HOVER_2_CLASS} />
      <div className={ATOMIX_GLASS.HOVER_3_CLASS} />
    </>
  );

  const renderBackgroundLayer = (layerType: 'dark' | 'black') => (
    <div
      className={[
        ATOMIX_GLASS.BACKGROUND_LAYER_CLASS,
        layerType === 'dark'
          ? ATOMIX_GLASS.BACKGROUND_LAYER_DARK_CLASS
          : ATOMIX_GLASS.BACKGROUND_LAYER_BLACK_CLASS,
        isOverLight
          ? ATOMIX_GLASS.BACKGROUND_LAYER_OVER_LIGHT_CLASS
          : ATOMIX_GLASS.BACKGROUND_LAYER_HIDDEN_CLASS,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );

  const renderOverLightLayers = () => (
    <>
      {/* Base and overlay layers - opacity and background set via CSS variables in SCSS */}
      <div className={ATOMIX_GLASS.BASE_LAYER_CLASS} />
      <div className={ATOMIX_GLASS.OVERLAY_LAYER_CLASS} />
      {/* Overlay highlight - opacity and background are dynamic, calculated inline */}
      <div className={ATOMIX_GLASS.OVERLAY_HIGHLIGHT_CLASS} />
    </>
  );

  const renderBorderElements = () => (
    <>
      {/* Border elements - all styles (static and dynamic via CSS variables) are in SCSS */}
      {/* Position, size, transform, transition, border-radius all use CSS variables set in glassVars */}
      <span className={ATOMIX_GLASS.BORDER_1_CLASS} />
      <span className={ATOMIX_GLASS.BORDER_2_CLASS} />
    </>
  );

  return (
    <div
      {...rest}
      ref={ref}
      className={componentClassName}
      style={{ ...glassVars }}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={onClick ? (tabIndex ?? 0) : tabIndex}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={onClick && effectiveWithoutEffects ? true : onClick ? false : undefined}
      aria-pressed={onClick && isActive ? true : onClick ? false : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      <AtomixGlassContainer
        ref={glassRef}
        contentRef={contentRef}
        className={className}
        style={{
          ...restStyle,
          ...(!isFixedOrSticky && {
            position: 'relative',
          }),
        }}
        borderRadius={effectiveBorderRadius}
        displacementScale={
          effectiveWithoutEffects
            ? 0
            : mode === 'shader'
              ? displacementScale * ATOMIX_GLASS.CONSTANTS.MULTIPLIERS.SHADER_DISPLACEMENT
              : isOverLight
                ? displacementScale * ATOMIX_GLASS.CONSTANTS.MULTIPLIERS.OVER_LIGHT_DISPLACEMENT
                : displacementScale
        }
        blurAmount={effectiveWithoutEffects ? 0 : blurAmount}
        saturation={
          effectiveHighContrast
            ? ATOMIX_GLASS.CONSTANTS.SATURATION.HIGH_CONTRAST
            : isOverLight
              ? saturation * overLightConfig.saturationBoost
              : saturation
        }
        aberrationIntensity={
          effectiveWithoutEffects
            ? 0
            : mode === 'shader'
              ? aberrationIntensity * ATOMIX_GLASS.CONSTANTS.MULTIPLIERS.SHADER_ABERRATION
              : aberrationIntensity
        }
        glassSize={glassSize}
        padding={padding}
        mouseOffset={effectiveWithoutEffects ? { x: 0, y: 0 } : mouseOffset}
        globalMousePosition={effectiveWithoutEffects ? { x: 0, y: 0 } : globalMousePosition}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        isHovered={isHovered}
        isActive={isActive}
        overLight={isOverLight}
        overLightConfig={{
          contrast: overLightConfig.contrast,
          brightness: overLightConfig.brightness,
          shadowIntensity: overLightConfig.shadowIntensity,
          borderOpacity: overLightConfig.borderOpacity,
        }}
        onClick={onClick}
        mode={mode}
        effectiveWithoutEffects={effectiveWithoutEffects}
        effectiveReducedMotion={effectiveReducedMotion}
        shaderVariant={shaderVariant}
        withLiquidBlur={withLiquidBlur}
        // Phase 1: Animation System props
        shaderTime={getShaderTime()}
        withTimeAnimation={withTimeAnimation}
        animationSpeed={animationSpeed}
        withMultiLayerDistortion={withMultiLayerDistortion}
        distortionOctaves={distortionOctaves}
        distortionLacunarity={distortionLacunarity}
        distortionGain={distortionGain}
        distortionQuality={distortionQuality}
      >
        {children}
      </AtomixGlassContainer>

      {Boolean(onClick) && renderHoverLayers()}

      {/* Background layers for over-light mode */}
      {/* Static styles (pointer-events) are in SCSS; will-change is managed via .u-glass-clean-root utility for backdrop-filter stability */}
      {renderBackgroundLayer('dark')}
      {renderBackgroundLayer('black')}
      {shouldRenderOverLightLayers && renderOverLightLayers()}

      {withBorder && renderBorderElements()}

      {/* Phase 3: Performance Monitoring Dashboard - Only in development with debugPerformance enabled */}
      {debugPerformance && performanceMetrics && (
        <PerformanceDashboard
          metrics={performanceMetrics}
          isVisible={true}
          onClose={() => {}} // No-op, dashboard always visible when debugPerformance is true
        />
      )}
    </div>
  );
});

AtomixGlassInner.displayName = 'AtomixGlass';

/**
 * AtomixGlass - wrapped with React.memo to prevent unnecessary re-renders.
 * Ref is forwarded to the root `<div>` element.
 */
export const AtomixGlass = memo(AtomixGlassInner);

export default AtomixGlass;
