import React, { useMemo, useRef } from 'react';
import type { AtomixGlassProps } from '../../lib/types/components';
import { ATOMIX_GLASS } from '../../lib/constants/components';
import { AtomixGlassContainer } from './AtomixGlassContainer';
import { useAtomixGlass } from '../../lib/composables/useAtomixGlass';

/**
 * AtomixGlass - A high-performance glass morphism component with liquid distortion effects
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
  // Ref for the outer wrapper div to apply CSS variables imperatively
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Refs for internal elements
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
    overLightConfig, // This is now static/base config
    globalMousePosition, // Static (unless prop changes)
    mouseOffset, // Static (unless prop changes)
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
  } = useAtomixGlass({
    glassRef,
    contentRef,
    wrapperRef, // Pass wrapperRef to hook
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
    blurAmount,
    saturation,
    padding,
    enableLiquidBlur,
  });

  // Calculate isOverLight independently from overLightConfig to prevent displacement changes on hover
  // overLightConfig recalculates with hover/active states, but displacement should remain stable
  const isOverLight = useMemo(() => overLightConfig?.isOverLight, [overLightConfig]);

  const shouldRenderOverLightLayers = enableOverLightLayers && isOverLight;

  // Calculate base style with transforms
  // Use CSS variable for transform to allow imperative updates
  const baseStyle = {
    ...style,
    ...(!effectiveDisableEffects && {
      transform: 'var(--atomix-glass-transform)',
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
  const positionStyles = useMemo(
    () => ({
      position: (style.position || 'absolute') as React.CSSProperties['position'],
      top: style.top || 0,
      left: style.left || 0,
    }),
    [style.position, style.top, style.left]
  );

  const adjustedSize = useMemo(
    () => ({
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
    }),
    [style.position, style.width, style.height, glassSize.width, glassSize.height]
  );

  // Helper function to render background layers
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
      style={{
        ...positionStyles,
        height: adjustedSize.height,
        width: adjustedSize.width,
        borderRadius: `${effectiveCornerRadius}px`,
        transform: baseStyle.transform,
      }}
    />
  );

  // Initial CSS variables (static values for initial render, updated imperatively by hook)
  // We can leave them empty or set minimal defaults, as the hook updates them on mount.
  // However, setting them here ensures SSR/initial render looks somewhat correct before hydration.
  // For simplicity and performance, we rely on the hook's initial effect.

  // We apply base CSS variables for layout that don't depend on mouse
  const staticVars = {
    '--atomix-glass-radius': `${effectiveCornerRadius}px`,
    '--atomix-glass-position': positionStyles.position,
    '--atomix-glass-top': positionStyles.top !== 'fixed' ? `${positionStyles.top}px` : '0',
    '--atomix-glass-left': positionStyles.left !== 'fixed' ? `${positionStyles.left}px` : '0',
    '--atomix-glass-width':
        style.position !== 'fixed' ? adjustedSize.width : `${adjustedSize.width}px`,
    '--atomix-glass-height':
        style.position !== 'fixed' ? adjustedSize.height : `${adjustedSize.height}px`,
    '--atomix-glass-border-width': 'var(--atomix-spacing-0-5, 0.09375rem)',
  } as React.CSSProperties;

  return (
    <div
      ref={wrapperRef}
      className={componentClassName}
      style={staticVars}
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
              : isOverLight
                ? displacementScale * ATOMIX_GLASS.CONSTANTS.MULTIPLIERS.OVER_LIGHT_DISPLACEMENT
                : displacementScale
        }
        blurAmount={effectiveDisableEffects ? 0 : blurAmount}
        saturation={
          effectiveHighContrast
            ? ATOMIX_GLASS.CONSTANTS.SATURATION.HIGH_CONTRAST
            : isOverLight
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
        isHovered={isHovered}
        isActive={isActive}
        overLight={isOverLight}
        overLightConfig={overLightConfig} // Pass base config
        onClick={onClick}
        mode={mode}
        transform={baseStyle.transform} // Passes 'var(--atomix-glass-transform)'
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
      {renderBackgroundLayer('dark')}
      {renderBackgroundLayer('black')}
      {shouldRenderOverLightLayers && (
        <>
          {/* Base and overlay layers - opacity and background set via CSS variables in SCSS */}
          <div className={ATOMIX_GLASS.BASE_LAYER_CLASS} />
          <div className={ATOMIX_GLASS.OVERLAY_LAYER_CLASS} />
          {/* Overlay highlight - opacity and background are dynamic, calculated inline */}
          <div
            className={ATOMIX_GLASS.OVERLAY_HIGHLIGHT_CLASS}
            style={{
              opacity: `var(--atomix-glass-overlay-highlight-opacity, 0)`,
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
