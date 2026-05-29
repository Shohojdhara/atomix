import React, { forwardRef, memo, useMemo, useRef } from 'react';
import type { AtomixGlassProps } from '../../lib/types/components';
import { ATOMIX_GLASS } from '../../lib/constants/components';
import { mergeClassNames } from '../../lib/utils/componentUtils';
import useForkRef from '../../lib/utils/useForkRef';
import { AtomixGlassContainer } from './AtomixGlassContainer';
import {
  buildGlassRootCssVariables,
  getGlassInternalPositionStyles,
  isGlassFixedOrSticky,
  resolveGlassAdjustedSize,
  resolveGlassContainerEffects,
} from './glass-utils';
import { useAtomixGlass } from '../../lib/composables/useAtomixGlass';
import { useResponsiveGlass } from '../../lib/composables/useResponsiveGlass';
import { usePerformanceMonitor } from '../../lib/composables/usePerformanceMonitor';
import {
  getDevicePreset,
  MOBILE_OPTIMIZED_BREAKPOINTS,
} from '../../lib/composables/useResponsiveGlass.presets';

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
 * Style architecture:
 * - Root (`.c-atomix-glass`): CSS custom properties for layer geometry and motion.
 * - Container (`.c-atomix-glass__container`): layout, z-index, and backdrop-filter.
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

/** Internal implementation; ref is forwarded to the root wrapper element. */
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
    border,
    withBorder = true,
    debugBorderRadius = false,
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
    isFixedOrSticky: propsIsFixedOrSticky,
    ...rest
  },
  ref
) {
  const glassRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const internalWrapperRef = useRef<HTMLDivElement>(null);
  const mergedRef = useForkRef(ref, internalWrapperRef);

  /**
   * Style partitioning for backdrop-filter compatibility.
   * - Root (`.c-atomix-glass`): CSS custom properties only (`glassVars`).
   * - Container (`.c-atomix-glass__container`): layout, stacking, and visual styles.
   * Backdrop sampling occurs on `__filter-overlay` inside the container; layout
   * properties must not be applied to the root or the effect will not render correctly.
   */
  const { zIndex: customZIndex, ...restStyle } = style;
  const isFixedOrSticky = isGlassFixedOrSticky(propsIsFixedOrSticky, restStyle.position);

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
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
    resolvedBorder,
  } = useAtomixGlass({
    glassRef,
    contentRef,
    wrapperRef: internalWrapperRef,
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
    border,
    withBorder,
    debugBorderRadius,

    style,
    isFixedOrSticky,
  });


  const devicePresetParams = useMemo(() => {
    return getDevicePreset(devicePreset);
  }, [devicePreset]);

  useResponsiveGlass({
    baseParams: {
      ...devicePresetParams,
      distortionOctaves: Math.round(
        (displacementScale || ATOMIX_GLASS.DEFAULTS.DISPLACEMENT_SCALE) / 25
      ),
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

  usePerformanceMonitor({
    enabled: debugPerformance,
    debug: false,
    showOverlay: false,
  });

  const isOverLight = useMemo(() => overLightConfig.isOverLight, [overLightConfig.isOverLight]);

  const shouldRenderOverLightLayers = withOverLightLayers && isOverLight;

  const containerStyle = useMemo(
    () => ({
      ...restStyle,
      ...(customZIndex !== undefined && { zIndex: customZIndex }),
    }),
    [restStyle, customZIndex]
  );

  const componentClassName = mergeClassNames(
    ATOMIX_GLASS.BASE_CLASS,
    effectiveReducedMotion && `${ATOMIX_GLASS.BASE_CLASS}--reduced-motion`,
    effectiveHighContrast && `${ATOMIX_GLASS.BASE_CLASS}--high-contrast`,
    effectiveWithoutEffects && `${ATOMIX_GLASS.BASE_CLASS}--disabled-effects`,
    className
  );

  const positionStyles = useMemo(
    () => getGlassInternalPositionStyles(isFixedOrSticky, restStyle),
    [isFixedOrSticky, restStyle]
  );

  const adjustedSize = useMemo(
    () =>
      resolveGlassAdjustedSize({
        width,
        height,
        restStyle,
        glassSize,
        isFixedOrSticky,
      }),
    [width, height, restStyle, glassSize, isFixedOrSticky]
  );

  const glassVars = useMemo(
    () =>
      buildGlassRootCssVariables({
        effectiveBorderRadius,
        transformStyle,
        adjustedSize,
        isOverLight,
        customZIndex,
        isFixedOrSticky,
        positionStyles,
        restStyle,
        borderWidth: resolvedBorder.width,
      }),
    [
      effectiveBorderRadius,
      transformStyle,
      adjustedSize,
      isOverLight,
      customZIndex,
      isFixedOrSticky,
      positionStyles,
      restStyle,
      resolvedBorder.width,
    ]
  );

  const containerEffects = useMemo(
    () =>
      resolveGlassContainerEffects({
        displacementScale,
        blurAmount,
        saturation,
        aberrationIntensity,
        mode,
        effectiveWithoutEffects,
        effectiveHighContrast,
        isOverLight,
        saturationBoost: overLightConfig.saturationBoost,
        mouseOffset,
        globalMousePosition,
      }),
    [
      displacementScale,
      blurAmount,
      saturation,
      aberrationIntensity,
      mode,
      effectiveWithoutEffects,
      effectiveHighContrast,
      isOverLight,
      overLightConfig.saturationBoost,
      mouseOffset,
      globalMousePosition,
    ]
  );

  const renderHoverLayers = () => (
    <>
      <div aria-hidden="true" className={ATOMIX_GLASS.HOVER_1_CLASS} />
      <div aria-hidden="true" className={ATOMIX_GLASS.HOVER_2_CLASS} />
      <div aria-hidden="true" className={ATOMIX_GLASS.HOVER_3_CLASS} />
    </>
  );

  const backgroundLayerTypes = ['dark', 'black'] as const;
  const renderBackgroundLayer = (layerType: (typeof backgroundLayerTypes)[number]) => (
    <div
      aria-hidden="true"
      className={mergeClassNames(
        ATOMIX_GLASS.BACKGROUND_LAYER_CLASS,
        layerType === 'dark'
          ? ATOMIX_GLASS.BACKGROUND_LAYER_DARK_CLASS
          : ATOMIX_GLASS.BACKGROUND_LAYER_BLACK_CLASS,
        isOverLight
          ? ATOMIX_GLASS.BACKGROUND_LAYER_OVER_LIGHT_CLASS
          : ATOMIX_GLASS.BACKGROUND_LAYER_HIDDEN_CLASS
      )}
    />
  );

  const renderOverLightLayers = () => (
    <>
      <div aria-hidden="true" className={ATOMIX_GLASS.BASE_LAYER_CLASS} />
      <div aria-hidden="true" className={ATOMIX_GLASS.OVERLAY_LAYER_CLASS} />
      <div aria-hidden="true" className={ATOMIX_GLASS.OVERLAY_HIGHLIGHT_CLASS} />
    </>
  );

  const renderBorderElements = () => (
    <>
      <span aria-hidden="true" className={ATOMIX_GLASS.BORDER_BACKDROP_CLASS} />
      <span aria-hidden="true" className={ATOMIX_GLASS.BORDER_1_CLASS} />
      <span aria-hidden="true" className={ATOMIX_GLASS.BORDER_2_CLASS} />
    </>
  );

  return (
    <div
      {...rest}
      ref={mergedRef}
      className={componentClassName}
      style={glassVars}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={onClick ? (tabIndex ?? 0) : tabIndex}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={onClick && effectiveWithoutEffects ? true : onClick ? false : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      <AtomixGlassContainer
        ref={glassRef}
        contentRef={contentRef}
        className={className}
        style={containerStyle as React.CSSProperties}
        borderRadius={effectiveBorderRadius}
        displacementScale={containerEffects.displacementScale}
        blurAmount={containerEffects.blurAmount}
        saturation={containerEffects.saturation}
        aberrationIntensity={containerEffects.aberrationIntensity}
        glassSize={glassSize}
        mouseOffset={containerEffects.mouseOffset}
        globalMousePosition={containerEffects.globalMousePosition}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
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
        isFixedOrSticky={isFixedOrSticky}
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

      {backgroundLayerTypes.map(layerType => (
        <React.Fragment key={layerType}>{renderBackgroundLayer(layerType)}</React.Fragment>
      ))}
      {shouldRenderOverLightLayers && renderOverLightLayers()}

      {resolvedBorder.enabled && renderBorderElements()}
    </div>
  );
});

AtomixGlassInner.displayName = 'AtomixGlass';

/** Memoized public export. Ref targets the root `.c-atomix-glass` wrapper. */
export const AtomixGlass = memo(AtomixGlassInner);

export default AtomixGlass;
