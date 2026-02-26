import { ATOMIX_GLASS } from '../constants/components';
import { calculateDistance, calculateElementCenter, calculateMouseInfluence, validateGlassSize, clampBlur } from '../../components/AtomixGlass/glass-utils';
import type { GlassSize, MousePosition, OverLightObjectConfig } from '../types/components';

/**
 * Updates the styles of the AtomixGlass wrapper and container elements imperatively
 * to avoid React re-renders on mouse movement.
 */
export const updateAtomixGlassStyles = (
  wrapperElement: HTMLElement | null,
  containerElement: HTMLElement | null,
  params: {
    mouseOffset: MousePosition;
    globalMousePosition: MousePosition;
    glassSize: GlassSize;
    isHovered: boolean;
    isActive: boolean;
    isOverLight: boolean;
    baseOverLightConfig: {
      opacity: number;
      borderOpacity: number;
      contrast: number;
      brightness: number;
      shadowIntensity: number;
      saturationBoost: number;
    };
    effectiveCornerRadius: number;
    effectiveDisableEffects: boolean;
    effectiveReducedMotion: boolean;
    elasticity: number;
    directionalScale: string;
    onClick?: () => void;
    enableLiquidBlur?: boolean;
    blurAmount?: number;
    saturation?: number;
    padding?: string;
  }
) => {
  if (!wrapperElement && !containerElement) return;

  const {
    mouseOffset,
    globalMousePosition,
    glassSize,
    isHovered,
    isActive,
    isOverLight,
    baseOverLightConfig,
    effectiveCornerRadius,
    effectiveDisableEffects,
    effectiveReducedMotion,
    elasticity,
    directionalScale,
    onClick,
    enableLiquidBlur,
    blurAmount = ATOMIX_GLASS.DEFAULTS.BLUR_AMOUNT,
    saturation = ATOMIX_GLASS.DEFAULTS.SATURATION,
    padding = ATOMIX_GLASS.DEFAULTS.PADDING,
  } = params;

  // Calculate mouse influence
  const mouseInfluence = calculateMouseInfluence(mouseOffset);
  const hoverIntensity = isHovered ? 1.4 : 1;
  const activeIntensity = isActive ? 1.6 : 1;

  // Calculate dynamic OverLight config
  const overLightConfig = {
      opacity: baseOverLightConfig.opacity * hoverIntensity * activeIntensity,
      contrast: Math.min(1.6, baseOverLightConfig.contrast + mouseInfluence * 0.1),
      brightness: Math.min(1.1, baseOverLightConfig.brightness + mouseInfluence * 0.05),
      shadowIntensity: Math.min(1.2, Math.max(0.5, baseOverLightConfig.shadowIntensity + mouseInfluence * 0.2)),
      borderOpacity: Math.min(1.0, Math.max(0.3, baseOverLightConfig.borderOpacity + mouseInfluence * 0.1)),
      saturationBoost: baseOverLightConfig.saturationBoost
  };

  // Calculate elastic translation
  let elasticTranslation = { x: 0, y: 0 };
  if (!effectiveDisableEffects && wrapperElement) {
    const rect = wrapperElement.getBoundingClientRect();
    const center = calculateElementCenter(rect);

    // Calculate fade in factor
    let fadeInFactor = 0;
    if (globalMousePosition.x && globalMousePosition.y && validateGlassSize(glassSize)) {
      const edgeDistanceX = Math.max(0, Math.abs(globalMousePosition.x - center.x) - glassSize.width / 2);
      const edgeDistanceY = Math.max(0, Math.abs(globalMousePosition.y - center.y) - glassSize.height / 2);
      const edgeDistance = calculateDistance({ x: edgeDistanceX, y: edgeDistanceY }, { x: 0, y: 0 });
      fadeInFactor = edgeDistance > ATOMIX_GLASS.CONSTANTS.ACTIVATION_ZONE ? 0 : 1 - edgeDistance / ATOMIX_GLASS.CONSTANTS.ACTIVATION_ZONE;
    }

    elasticTranslation = {
        x: (globalMousePosition.x - center.x) * elasticity * 0.1 * fadeInFactor,
        y: (globalMousePosition.y - center.y) * elasticity * 0.1 * fadeInFactor,
    };
  }

  const transformStyle = effectiveDisableEffects
      ? isActive && Boolean(onClick) ? 'scale(0.98)' : 'scale(1)'
      : `translate(${elasticTranslation.x}px, ${elasticTranslation.y}px) ${isActive && Boolean(onClick) ? 'scale(0.96)' : directionalScale}`;

  // Update Wrapper Styles (glassVars)
  if (wrapperElement) {
    const mx = mouseOffset.x;
    const my = mouseOffset.y;
    const absMx = Math.abs(mx);
    const absMy = Math.abs(my);
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
    const borderOpacities = [
      GRADIENT.BORDER_OPACITY.BASE_1 + absMx * GRADIENT.BORDER_OPACITY.MULTIPLIER_LOW,
      GRADIENT.BORDER_OPACITY.BASE_2 + absMx * GRADIENT.BORDER_OPACITY.MULTIPLIER_HIGH,
      GRADIENT.BORDER_OPACITY.BASE_3 + absMx * GRADIENT.BORDER_OPACITY.MULTIPLIER_LOW,
      GRADIENT.BORDER_OPACITY.BASE_4 + absMx * GRADIENT.BORDER_OPACITY.MULTIPLIER_HIGH,
    ];

    const configBorderOpacity = overLightConfig.borderOpacity;
    const whiteColor = ATOMIX_GLASS.CONSTANTS.PALETTE.WHITE;
    const blackColor = ATOMIX_GLASS.CONSTANTS.PALETTE.BLACK;

    const hoverPositions = {
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
      };

    const basePosition = {
        x: GRADIENT.CENTER_POSITION + mx * GRADIENT.BASE_LAYER_MULTIPLIER,
        y: GRADIENT.CENTER_POSITION + my * GRADIENT.BASE_LAYER_MULTIPLIER,
    };

    const opacityValues = {
        hover1: isHovered || isActive ? 0.5 : 0,
        hover2: isActive ? 0.5 : 0,
        hover3: isHovered ? 0.4 : isActive ? 0.8 : 0,
        base: isOverLight ? overLightConfig.opacity : 0,
        over: isOverLight ? overLightConfig.opacity * 1.1 : 0,
    };

    const style = wrapperElement.style;

    style.setProperty('--atomix-glass-transform', transformStyle || 'none');

    // Gradients
    style.setProperty('--atomix-glass-border-gradient-1', `linear-gradient(${borderGradientAngle}deg, rgba(${whiteColor}, 0) 0%, rgba(${whiteColor}, ${(borderOpacities[0] ?? 1) * configBorderOpacity}) ${borderStop1}%, rgba(${whiteColor}, ${(borderOpacities[1] ?? 1) * configBorderOpacity}) ${borderStop2}%, rgba(${whiteColor}, 0) 100%)`);
    style.setProperty('--atomix-glass-border-gradient-2', `linear-gradient(${borderGradientAngle}deg, rgba(${whiteColor}, 0) 0%, rgba(${whiteColor}, ${(borderOpacities[2] ?? 1) * configBorderOpacity}) ${borderStop1}%, rgba(${whiteColor}, ${(borderOpacities[3] ?? 1) * configBorderOpacity}) ${borderStop2}%, rgba(${whiteColor}, 0) 100%)`);

    // Hover gradients
    style.setProperty('--atomix-glass-hover-1-gradient', isOverLight
        ? `radial-gradient(circle at ${hoverPositions.hover1.x}% ${hoverPositions.hover1.y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.BLACK_END}%)`
        : `radial-gradient(circle at ${hoverPositions.hover1.x}% ${hoverPositions.hover1.y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_1.WHITE_STOP}%)`);

    style.setProperty('--atomix-glass-hover-2-gradient', isOverLight
        ? `radial-gradient(circle at ${hoverPositions.hover2.x}% ${hoverPositions.hover2.y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.BLACK_END}%)`
        : `radial-gradient(circle at ${hoverPositions.hover2.x}% ${hoverPositions.hover2.y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_2.WHITE_STOP}%)`);

    style.setProperty('--atomix-glass-hover-3-gradient', isOverLight
        ? `radial-gradient(circle at ${hoverPositions.hover3.x}% ${hoverPositions.hover3.y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_START}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_STOP}%, rgba(${blackColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.BLACK_END}%)`
        : `radial-gradient(circle at ${hoverPositions.hover3.x}% ${hoverPositions.hover3.y}%, rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.WHITE_START}) 0%, rgba(${whiteColor}, 0) ${ATOMIX_GLASS.CONSTANTS.GRADIENT_OPACITY.HOVER_3.WHITE_STOP}%)`);

    style.setProperty('--atomix-glass-base-gradient', isOverLight
        ? `linear-gradient(${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.ANGLE}deg, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_START_BASE + mx * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_START_MULTIPLIER}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_BASE + my * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_MULTIPLIER}) ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_STOP}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_END_BASE + absMx * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_END_MULTIPLIER}) 100%)`
        : `rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.WHITE_OPACITY})`);

    style.setProperty('--atomix-glass-overlay-gradient', isOverLight
        ? `radial-gradient(circle at ${basePosition.x}% ${basePosition.y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_START_BASE + absMx * ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_START_MULTIPLIER}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_MID_STOP}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_END_BASE + absMy * ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_END_MULTIPLIER}) 100%)`
        : `rgba(${whiteColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.WHITE_OPACITY})`);

    // Opacities
    style.setProperty('--atomix-glass-hover-1-opacity', opacityValues.hover1.toString());
    style.setProperty('--atomix-glass-hover-2-opacity', opacityValues.hover2.toString());
    style.setProperty('--atomix-glass-hover-3-opacity', opacityValues.hover3.toString());
    style.setProperty('--atomix-glass-base-opacity', opacityValues.base.toString());
    style.setProperty('--atomix-glass-overlay-opacity', opacityValues.over.toString());
    style.setProperty('--atomix-glass-overlay-highlight-opacity', (opacityValues.over * ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.OPACITY_MULTIPLIER).toString());

    // Other
    style.setProperty('--atomix-glass-blend-mode', isOverLight ? 'multiply' : 'overlay');
    style.setProperty('--atomix-glass-radius', `${effectiveCornerRadius}px`);
  }

  // Update Container Styles (containerVars)
  if (containerElement) {
    const mx = mouseOffset.x;
    const my = mouseOffset.y;

    // Constants for blur calculation
    const EDGE_BLUR_MULTIPLIER = 1.25;
    const CENTER_BLUR_MULTIPLIER = 1.1;
    const FLOW_BLUR_MULTIPLIER = 1.2;
    const MOUSE_INFLUENCE_BLUR_FACTOR = 0.15;
    const EDGE_INTENSITY_MOUSE_FACTOR = 0.15;
    const CENTER_INTENSITY_MOUSE_FACTOR = 0.1;
    const MAX_BLUR_RELATIVE = 2;

    const rect = containerElement.getBoundingClientRect();

    let liquidBlur = {
        baseBlur: blurAmount,
        edgeBlur: blurAmount * EDGE_BLUR_MULTIPLIER,
        centerBlur: blurAmount * CENTER_BLUR_MULTIPLIER,
        flowBlur: blurAmount * FLOW_BLUR_MULTIPLIER,
    };

    if (enableLiquidBlur && rect) {
        const mouseInfluence = calculateMouseInfluence(mouseOffset);
        const maxBlur = blurAmount * MAX_BLUR_RELATIVE;

        const baseBlur = Math.min(
          maxBlur,
          blurAmount + mouseInfluence * blurAmount * MOUSE_INFLUENCE_BLUR_FACTOR
        );
        const edgeIntensity = mouseInfluence * EDGE_INTENSITY_MOUSE_FACTOR;
        const edgeBlur = Math.min(maxBlur, baseBlur * (0.8 + edgeIntensity * 0.4));
        const centerIntensity = mouseInfluence * CENTER_INTENSITY_MOUSE_FACTOR;
        const centerBlur = Math.min(maxBlur, baseBlur * (0.3 + centerIntensity * 0.3));
        const flowBlur = Math.min(maxBlur, baseBlur * FLOW_BLUR_MULTIPLIER);

        liquidBlur = {
          baseBlur: clampBlur(baseBlur),
          edgeBlur: clampBlur(edgeBlur),
          centerBlur: clampBlur(centerBlur),
          flowBlur: clampBlur(flowBlur),
        };
    }

    // Backdrop filter
    let backdropFilterString = `blur(${blurAmount}px) saturate(${saturation}%) contrast(1.05) brightness(1.05)`;

    const dynamicSaturation = saturation + (liquidBlur.baseBlur || 0) * 20;
    const area = rect ? rect.width * rect.height : 0;
    const areaIsLarge = area > 180000;
    const devicePrefersPerformance = effectiveReducedMotion || effectiveDisableEffects;
    const useMultiPass = enableLiquidBlur && !devicePrefersPerformance && !areaIsLarge;

    if (useMultiPass) {
        const weightedBlur = clampBlur(
            liquidBlur.baseBlur * 0.4 +
            liquidBlur.edgeBlur * 0.25 +
            liquidBlur.centerBlur * 0.15 +
            liquidBlur.flowBlur * 0.2
        );
        backdropFilterString = `blur(${weightedBlur}px) saturate(${Math.min(dynamicSaturation, 200)}%) contrast(${overLightConfig.contrast}) brightness(${overLightConfig.brightness})`;
    } else {
        const effectiveBlur = clampBlur(
          Math.max(
            liquidBlur.baseBlur,
            liquidBlur.edgeBlur * 0.8,
            liquidBlur.centerBlur * 1.1,
            liquidBlur.flowBlur * 0.9
          )
        );
        backdropFilterString = `blur(${effectiveBlur}px) saturate(${Math.min(dynamicSaturation, 200)}%) contrast(${overLightConfig.contrast}) brightness(${overLightConfig.brightness})`;
    }

    // Container variables
    const style = containerElement.style;

    style.setProperty('--atomix-glass-container-width', `${glassSize.width}`);
    style.setProperty('--atomix-glass-container-height', `${glassSize.height}`);
    style.setProperty('--atomix-glass-container-padding', padding);
    style.setProperty('--atomix-glass-container-radius', `${effectiveCornerRadius}px`);

    style.setProperty('--atomix-glass-container-backdrop', backdropFilterString);

    // Shadows
    style.setProperty('--atomix-glass-container-shadow', isOverLight
        ? [
            `inset 0 1px 0 rgba(255, 255, 255, ${(0.4 + mx * 0.002) * (overLightConfig.shadowIntensity || 1)})`,
            `inset 0 -1px 0 rgba(0, 0, 0, ${(0.2 + Math.abs(my) * 0.001) * (overLightConfig.shadowIntensity || 1)})`,
            `inset 0 0 20px rgba(0, 0, 0, ${(0.08 + Math.abs(mx + my) * 0.001) * (overLightConfig.shadowIntensity || 1)})`,
            `0 2px 12px rgba(0, 0, 0, ${(0.12 + Math.abs(my) * 0.002) * (overLightConfig.shadowIntensity || 1)})`,
          ].join(', ')
        : '0 0 20px rgba(0, 0, 0, 0.15) inset, 0 4px 8px rgba(0, 0, 0, 0.08) inset');

    style.setProperty('--atomix-glass-container-shadow-opacity', effectiveDisableEffects ? '0' : '1');

    style.setProperty('--atomix-glass-container-bg', isOverLight
        ? `linear-gradient(${180 + mx * 0.5}deg, rgba(255, 255, 255, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.05) 100%)`
        : 'none');

    style.setProperty('--atomix-glass-container-text-shadow', isOverLight
        ? '0px 2px 12px rgba(0, 0, 0, 0)'
        : '0px 2px 12px rgba(0, 0, 0, 0.4)');

    style.setProperty('--atomix-glass-container-box-shadow', isOverLight
        ? '0px 16px 70px rgba(0, 0, 0, 0.75)'
        : '0px 12px 40px rgba(0, 0, 0, 0.25)');
  }
};