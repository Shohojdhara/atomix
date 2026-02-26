import type { CSSProperties } from 'react';
import type {
  GlassSize,
  MousePosition,
} from '../types/components';
import { ATOMIX_GLASS } from '../constants/components';
import { calculateMouseInfluence, clampBlur } from '../../components/AtomixGlass/glass-utils';

const { CONSTANTS } = ATOMIX_GLASS;

export interface ResolvedOverLightConfig {
  isOverLight: boolean;
  threshold: number;
  opacity: number;
  contrast: number;
  brightness: number;
  saturationBoost: number;
  shadowIntensity: number;
  borderOpacity: number;
}

interface CalculateGlassVarsOptions {
  mouseOffset: MousePosition;
  overLightConfig: ResolvedOverLightConfig;
  effectiveCornerRadius: number;
  transformStyle: string;
  adjustedSize: { width: string | number; height: string | number };
  positionStyles: { position: any; top: any; left: any };
  style: CSSProperties;
  isOverLight: boolean;
  isActive: boolean;
  isHovered: boolean;
}

export const calculateGlassVars = ({
  mouseOffset,
  overLightConfig,
  effectiveCornerRadius,
  transformStyle,
  adjustedSize,
  positionStyles,
  style,
  isOverLight,
  isActive,
  isHovered,
}: CalculateGlassVarsOptions): CSSProperties => {
  const mx = mouseOffset.x;
  const my = mouseOffset.y;
  const absMx = Math.abs(mx);
  const absMy = Math.abs(my);
  const GRADIENT = ATOMIX_GLASS.CONSTANTS.GRADIENT;

  // Gradient Values
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

  // Opacity Values
  const overLightOpacity = overLightConfig.opacity;
  const BASE_OVER_LIGHT_OPACITY = 0.4;
  const OVER_OPACITY_MULTIPLIER = 1.1;

  const opacityValues = {
    hover1: isHovered || isActive ? 0.5 : 0,
    hover2: isActive ? 0.5 : 0,
    hover3: isHovered ? 0.4 : isActive ? 0.8 : 0,
    base: isOverLight ? overLightOpacity || BASE_OVER_LIGHT_OPACITY : 0,
    over: isOverLight
      ? (overLightOpacity || BASE_OVER_LIGHT_OPACITY) * OVER_OPACITY_MULTIPLIER
      : 0,
  };

  const whiteColor = ATOMIX_GLASS.CONSTANTS.PALETTE.WHITE;
  const blackColor = ATOMIX_GLASS.CONSTANTS.PALETTE.BLACK;
  const configBorderOpacity = overLightConfig?.borderOpacity ?? 1;

  return {
    '--atomix-glass-radius': `${effectiveCornerRadius}px`,
    '--atomix-glass-transform': transformStyle || 'none',
    '--atomix-glass-position': positionStyles.position,
    '--atomix-glass-top': positionStyles.top !== 'fixed' ? `${positionStyles.top}px` : '0',
    '--atomix-glass-left': positionStyles.left !== 'fixed' ? `${positionStyles.left}px` : '0',
    '--atomix-glass-width':
      style.position !== 'fixed' ? adjustedSize.width : `${adjustedSize.width}px`,
    '--atomix-glass-height':
      style.position !== 'fixed' ? adjustedSize.height : `${adjustedSize.height}px`,
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
  } as CSSProperties;
};

interface CalculateContainerVarsOptions {
  mouseOffset: MousePosition;
  glassSize: GlassSize;
  padding: string;
  cornerRadius: number;
  overLightConfig: ResolvedOverLightConfig;
  isOverLight: boolean;
  effectiveDisableEffects: boolean;
  effectiveReducedMotion: boolean;
  enableLiquidBlur: boolean;
  blurAmount: number;
  saturation: number;
}

export const calculateContainerVars = ({
  mouseOffset,
  glassSize,
  padding,
  cornerRadius,
  overLightConfig,
  isOverLight,
  effectiveDisableEffects,
  effectiveReducedMotion,
  enableLiquidBlur,
  blurAmount,
  saturation,
}: CalculateContainerVarsOptions): CSSProperties => {
  // Pre-calculate static multipliers
  const EDGE_BLUR_MULTIPLIER = 1.25;
  const CENTER_BLUR_MULTIPLIER = 1.1;
  const FLOW_BLUR_MULTIPLIER = 1.2;
  const MOUSE_INFLUENCE_BLUR_FACTOR = 0.15;
  const EDGE_INTENSITY_MOUSE_FACTOR = 0.15;
  const CENTER_INTENSITY_MOUSE_FACTOR = 0.1;
  // Maximum blur multiplier relative to base — prevents runaway blur
  const MAX_BLUR_RELATIVE = 2;

  const defaultBlur = {
    baseBlur: blurAmount,
    edgeBlur: blurAmount * EDGE_BLUR_MULTIPLIER,
    centerBlur: blurAmount * CENTER_BLUR_MULTIPLIER,
    flowBlur: blurAmount * FLOW_BLUR_MULTIPLIER,
  };

  let liquidBlur = defaultBlur;

  if (
    enableLiquidBlur &&
    mouseOffset &&
    typeof mouseOffset.x === 'number' &&
    typeof mouseOffset.y === 'number' &&
    !isNaN(mouseOffset.x) &&
    !isNaN(mouseOffset.y)
  ) {
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

  const dynamicSaturation = saturation + (liquidBlur.baseBlur || 0) * 20;

  // Validate blur values before using them
  const validatedBaseBlur =
    typeof liquidBlur.baseBlur === 'number' && !isNaN(liquidBlur.baseBlur)
      ? liquidBlur.baseBlur
      : 0;
  const validatedEdgeBlur =
    typeof liquidBlur.edgeBlur === 'number' && !isNaN(liquidBlur.edgeBlur)
      ? liquidBlur.edgeBlur
      : 0;
  const validatedCenterBlur =
    typeof liquidBlur.centerBlur === 'number' && !isNaN(liquidBlur.centerBlur)
      ? liquidBlur.centerBlur
      : 0;
  const validatedFlowBlur =
    typeof liquidBlur.flowBlur === 'number' && !isNaN(liquidBlur.flowBlur)
      ? liquidBlur.flowBlur
      : 0;

  // Adaptive strategy: prefer single-pass blur for large areas or when effects are reduced
  const area = glassSize ? glassSize.width * glassSize.height : 0;
  const areaIsLarge = area > 180000; // ~600x300 threshold; tune as needed
  const devicePrefersPerformance = effectiveReducedMotion || effectiveDisableEffects;
  const useMultiPass = enableLiquidBlur && !devicePrefersPerformance && !areaIsLarge;

  let backdropFilter = `blur(${blurAmount}px) saturate(${saturation}%) contrast(1.05) brightness(1.05)`;

  if (useMultiPass) {
    const weightedBlur = clampBlur(
      validatedBaseBlur * 0.4 +
        validatedEdgeBlur * 0.25 +
        validatedCenterBlur * 0.15 +
        validatedFlowBlur * 0.2
    );

    backdropFilter = `blur(${weightedBlur}px) saturate(${Math.min(dynamicSaturation, 200)}%) contrast(${overLightConfig?.contrast || 1.05}) brightness(${overLightConfig?.brightness || 1.05})`;
  } else {
    // Single-pass fallback: stronger radius to match perceived blur of multi-pass
    const effectiveBlur = clampBlur(
      Math.max(
        validatedBaseBlur,
        validatedEdgeBlur * 0.8,
        validatedCenterBlur * 1.1,
        validatedFlowBlur * 0.9
      )
    );

    backdropFilter = `blur(${effectiveBlur}px) saturate(${Math.min(dynamicSaturation, 200)}%) contrast(${overLightConfig?.contrast || 1.05}) brightness(${overLightConfig?.brightness || 1.05})`;
  }

  const mx =
    mouseOffset && typeof mouseOffset.x === 'number' && !isNaN(mouseOffset.x) ? mouseOffset.x : 0;
  const my =
    mouseOffset && typeof mouseOffset.y === 'number' && !isNaN(mouseOffset.y) ? mouseOffset.y : 0;

  return {
    '--atomix-glass-container-width': `${glassSize?.width}`,
    '--atomix-glass-container-height': `${glassSize?.height}`,
    '--atomix-glass-container-padding': padding || '0 0',
    '--atomix-glass-container-radius': `${typeof cornerRadius === 'number' && !isNaN(cornerRadius) ? cornerRadius : 0}px`,
    '--atomix-glass-container-backdrop': backdropFilter,
    '--atomix-glass-container-shadow': isOverLight
      ? [
          `inset 0 1px 0 rgba(255, 255, 255, ${(0.4 + mx * 0.002) * (overLightConfig?.shadowIntensity || 1)})`,
          `inset 0 -1px 0 rgba(0, 0, 0, ${(0.2 + Math.abs(my) * 0.001) * (overLightConfig?.shadowIntensity || 1)})`,
          `inset 0 0 20px rgba(0, 0, 0, ${(0.08 + Math.abs(mx + my) * 0.001) * (overLightConfig?.shadowIntensity || 1)})`,
          `0 2px 12px rgba(0, 0, 0, ${(0.12 + Math.abs(my) * 0.002) * (overLightConfig?.shadowIntensity || 1)})`,
        ].join(', ')
      : '0 0 20px rgba(0, 0, 0, 0.15) inset, 0 4px 8px rgba(0, 0, 0, 0.08) inset',
    '--atomix-glass-container-shadow-opacity': effectiveDisableEffects ? 0 : 1,
    '--atomix-glass-container-bg': isOverLight
      ? `linear-gradient(${180 + mx * 0.5}deg, rgba(255, 255, 255, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.05) 100%)`
      : 'none',
    '--atomix-glass-container-text-shadow': isOverLight
      ? '0px 2px 12px rgba(0, 0, 0, 0)'
      : '0px 2px 12px rgba(0, 0, 0, 0.4)',
    '--atomix-glass-container-box-shadow': isOverLight
      ? '0px 16px 70px rgba(0, 0, 0, 0.75)'
      : '0px 12px 40px rgba(0, 0, 0, 0.25)',
  } as CSSProperties;
};
