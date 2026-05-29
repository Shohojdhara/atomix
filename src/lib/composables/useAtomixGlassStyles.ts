import { ATOMIX_GLASS } from '../constants/components';
import {
  buildGlassBorderCssVars,
  computeBorderTensionFactor,
} from '../../components/AtomixGlass/glass-border-styles';
import {
  calculateMouseInfluence,
  getInteractionIntensity,
  validateGlassSize,
  clampBlur,
  smoothstep,
  softClamp,
} from '../../components/AtomixGlass/glass-utils';
import type { GlassSize, MousePosition } from '../types/components';

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
    effectiveBorderRadius: number;
    effectiveWithoutEffects: boolean;
    effectiveReducedMotion: boolean;
    elasticity: number;
    elasticTranslation: MousePosition;
    directionalScale: { x: number; y: number };
    elasticVelocity: MousePosition;
    mouseVelocity: MousePosition;
    scaleBase: number;
    onClick?: () => void;
    withLiquidBlur?: boolean;
    blurAmount?: number;
    saturation?: number;

    isFixedOrSticky?: boolean;
    borderAnimated?: boolean;
    borderOpacityMultiplier?: number;
  }
) => {
  if (!wrapperElement && !containerElement) return;
  if (!validateGlassSize(params.glassSize)) return;
  const {
    mouseOffset,
    globalMousePosition,
    glassSize,
    isHovered,
    isActive,
    isOverLight,
    baseOverLightConfig,
    effectiveBorderRadius,
    effectiveWithoutEffects,
    effectiveReducedMotion,
    elasticity,
    elasticTranslation,
    elasticVelocity,
    mouseVelocity,
    directionalScale,
    scaleBase,
    onClick,
    withLiquidBlur,
    blurAmount = ATOMIX_GLASS.DEFAULTS.BLUR_AMOUNT,
    saturation = ATOMIX_GLASS.DEFAULTS.SATURATION,

    isFixedOrSticky = false,
    borderAnimated = true,
    borderOpacityMultiplier = 1,
  } = params;

  // Calculate mouse influence
  const mouseInfluence = calculateMouseInfluence(mouseOffset);
  const { hoverIntensity, activeIntensity } = getInteractionIntensity(isHovered, isActive);

  // Calculate dynamic OverLight config
  const overLightConfig = {
    opacity: baseOverLightConfig.opacity * hoverIntensity * activeIntensity,
    contrast: Math.min(1.6, baseOverLightConfig.contrast + mouseInfluence * 0.1),
    brightness: Math.min(1.1, baseOverLightConfig.brightness + mouseInfluence * 0.05),
    shadowIntensity: Math.min(
      1.2,
      Math.max(0.5, baseOverLightConfig.shadowIntensity + mouseInfluence * 0.2)
    ),
    borderOpacity: Math.min(
      1.0,
      Math.max(0.3, baseOverLightConfig.borderOpacity + mouseInfluence * 0.1)
    ),
    saturationBoost: baseOverLightConfig.saturationBoost,
  };

  const scaleX = directionalScale.x * scaleBase;
  const scaleY = directionalScale.y * scaleBase;

  const transformStyle = effectiveWithoutEffects
    ? `scale(${scaleBase})`
    : `translate(${elasticTranslation.x}px, ${elasticTranslation.y}px) scaleX(${scaleX}) scaleY(${scaleY})`;

  // ── Apple Liquid Depth Refinements ───────────────────────────────
  const tensionFactor = computeBorderTensionFactor(elasticTranslation);

  // Subtle lighting boost on stretch
  const lightingContrast = Math.min(1.8, overLightConfig.contrast + tensionFactor * 0.2);
  const lightingBrightness = Math.min(1.2, overLightConfig.brightness + tensionFactor * 0.1);

  // Update Wrapper Styles (glassVars)
  if (wrapperElement) {
    const mx = mouseOffset.x;
    const my = mouseOffset.y;
    const absMx = Math.abs(mx);
    const absMy = Math.abs(my);
    const GRADIENT = ATOMIX_GLASS.CONSTANTS.GRADIENT;
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

    // Opacity is either 0 (hidden) or 1 (visible) — actual visual intensity is
    // encoded in each gradient's rgba alpha.  The typed @property CSS vars
    // transition these 0→1 values smoothly via CSS (no JS animation needed).
    const opacityValues = {
      // hover-1: ambient highlight glow — present on hover and during press
      hover1: isHovered || isActive ? 1 : 0,
      // hover-2: press depth shadow — only fires on active (mousedown)
      hover2: isActive ? 1 : 0,
      // hover-3: global soft-light surface shift — half-strength on hover, full on press
      hover3: isActive ? 1 : isHovered ? 0.55 : 0,
      // Dark chrome: faint smoky tint; over-light keeps stronger fill
      base: isOverLight ? overLightConfig.opacity : 0.14,
      over: isOverLight ? overLightConfig.opacity * 1.1 : 0.1,
    };

    const style = wrapperElement.style;
    style.setProperty('--atomix-glass-transform', transformStyle || 'none');

    // Parallax for content (liquid refraction feel)
    const parallaxFactor = 0.38 + tensionFactor * 0.12;
    style.setProperty(
      '--atomix-glass-child-parallax',
      `translate(${elasticTranslation.x * -parallaxFactor}px, ${elasticTranslation.y * -parallaxFactor}px)`
    );

    style.setProperty('--atomix-glass-contrast', lightingContrast.toString());
    style.setProperty('--atomix-glass-brightness', lightingBrightness.toString());

    // ── Chromatic Rim Lighting ──────────────────────────────────────
    const borderVars = ATOMIX_GLASS.BORDER.GRADIENT_CSS_VARS;
    if (borderAnimated && !effectiveWithoutEffects) {
      const borderCssVars = buildGlassBorderCssVars({
        mouseOffset,
        mouseVelocity,
        elasticVelocity,
        borderOpacity: overLightConfig.borderOpacity,
        opacityMultiplier: borderOpacityMultiplier,
        tensionFactor,
      });
      style.setProperty(borderVars.GRADIENT_1, borderCssVars[borderVars.GRADIENT_1] ?? '');
      style.setProperty(borderVars.GRADIENT_2, borderCssVars[borderVars.GRADIENT_2] ?? '');
    } else {
      style.removeProperty(borderVars.GRADIENT_1);
      style.removeProperty(borderVars.GRADIENT_2);
    }

    // Hover gradients — cursor-relative radial positions for realistic light tracking.
    // hover-1: white overlay highlight following cursor (works on both dark + light)
    style.setProperty(
      '--atomix-glass-hover-1-gradient',
      `radial-gradient(65% 55% at ${hoverPositions.hover1.x}% ${hoverPositions.hover1.y}%, rgba(${whiteColor}, 0.24) 0%, rgba(${whiteColor}, 0.06) 45%, rgba(${whiteColor}, 0) 72%)`
    );

    // hover-2: press depth — darkens at cursor with multiply blend, isOverLight uses stronger black
    style.setProperty(
      '--atomix-glass-hover-2-gradient',
      isOverLight
        ? `radial-gradient(60% 50% at ${hoverPositions.hover2.x}% ${hoverPositions.hover2.y}%, rgba(${blackColor}, 0.22) 0%, rgba(${blackColor}, 0.06) 50%, rgba(${blackColor}, 0) 72%)`
        : `radial-gradient(60% 50% at ${hoverPositions.hover2.x}% ${hoverPositions.hover2.y}%, rgba(${blackColor}, 0.18) 0%, rgba(${blackColor}, 0.04) 50%, rgba(${blackColor}, 0) 72%)`
    );

    // hover-3: full-surface soft-light tint; linear gradient angled with cursor X
    style.setProperty(
      '--atomix-glass-hover-3-gradient',
      `linear-gradient(${150 + mx * 0.3}deg, rgba(${whiteColor}, ${isOverLight ? 0.08 : 0.12}) 0%, rgba(${whiteColor}, 0.04) 55%, rgba(${whiteColor}, 0) 100%)`
    );

    style.setProperty(
      '--atomix-glass-base-gradient',
      isOverLight
        ? `linear-gradient(${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.ANGLE}deg, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_START_BASE + mx * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_START_MULTIPLIER}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_BASE + my * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_MULTIPLIER}) ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_MID_STOP}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_END_BASE + absMx * ATOMIX_GLASS.CONSTANTS.BASE_GRADIENT.BLACK_END_MULTIPLIER}) 100%)`
        : `linear-gradient(180deg, rgba(${blackColor}, 0.42) 0%, rgba(${blackColor}, 0.22) 55%, rgba(${blackColor}, 0.12) 100%)`
    );

    style.setProperty(
      '--atomix-glass-overlay-gradient',
      isOverLight
        ? `radial-gradient(circle at ${basePosition.x}% ${basePosition.y}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_START_BASE + absMx * ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_START_MULTIPLIER}) 0%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_MID}) ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_MID_STOP}%, rgba(${blackColor}, ${ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_END_BASE + absMy * ATOMIX_GLASS.CONSTANTS.OVERLAY_GRADIENT.BLACK_END_MULTIPLIER}) 100%)`
        : `radial-gradient(120% 80% at 50% 0%, rgba(${whiteColor}, 0.14) 0%, rgba(${whiteColor}, 0) 55%)`
    );

    // Opacities
    style.setProperty('--atomix-glass-hover-1-opacity', opacityValues.hover1.toString());
    style.setProperty('--atomix-glass-hover-2-opacity', opacityValues.hover2.toString());
    style.setProperty('--atomix-glass-hover-3-opacity', opacityValues.hover3.toString());
    style.setProperty('--atomix-glass-base-opacity', opacityValues.base.toString());
    style.setProperty('--atomix-glass-overlay-opacity', opacityValues.over.toString());
    style.setProperty(
      '--atomix-glass-overlay-highlight-opacity',
      (opacityValues.over * ATOMIX_GLASS.CONSTANTS.OVERLAY_HIGHLIGHT.OPACITY_MULTIPLIER).toString()
    );

    // Other
    style.setProperty('--atomix-glass-blend-mode', isOverLight ? 'multiply' : 'overlay');
    style.setProperty('--atomix-glass-radius', `${effectiveBorderRadius}px`);
  }

  // Update Container Styles (containerVars)
  if (containerElement) {
    const mx = mouseOffset.x;
    const my = mouseOffset.y;

    // Constants for blur calculation
    const EDGE_BLUR_MULTIPLIER = 0.5;
    const CENTER_BLUR_MULTIPLIER = 0.2;
    const FLOW_BLUR_MULTIPLIER = 0.3;
    const MOUSE_INFLUENCE_BLUR_FACTOR = 0.4;
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

    if (withLiquidBlur && rect) {
      const mouseInfluence = calculateMouseInfluence(mouseOffset);
      const maxBlur = blurAmount * MAX_BLUR_RELATIVE;

      const baseBlur = softClamp(
        blurAmount + mouseInfluence * blurAmount * MOUSE_INFLUENCE_BLUR_FACTOR,
        maxBlur
      );
      const edgeIntensity = mouseInfluence * EDGE_INTENSITY_MOUSE_FACTOR;
      const edgeBlur = softClamp(baseBlur * (0.8 + edgeIntensity * 0.4), maxBlur);
      const centerIntensity = mouseInfluence * CENTER_INTENSITY_MOUSE_FACTOR;
      const centerBlur = softClamp(baseBlur * (0.3 + centerIntensity * 0.3), maxBlur);
      const flowBlur = softClamp(baseBlur * FLOW_BLUR_MULTIPLIER, maxBlur);

      liquidBlur = {
        baseBlur: clampBlur(baseBlur),
        edgeBlur: clampBlur(edgeBlur),
        centerBlur: clampBlur(centerBlur),
        flowBlur: clampBlur(flowBlur),
      };
    }

    // Backdrop filter
    const tensionSaturation = tensionFactor * 40;
    const dynamicSaturation = saturation + tensionSaturation + (liquidBlur.baseBlur || 0) * 15;
    let backdropFilterString = '';
    const area = rect ? rect.width * rect.height : 0;
    const areaIsLarge = area > 180000;
    const devicePrefersPerformance = effectiveReducedMotion || effectiveWithoutEffects;
    const useMultiPass = withLiquidBlur && !devicePrefersPerformance && !areaIsLarge;

    if (useMultiPass) {
      const weightedBlur = clampBlur(
        liquidBlur.baseBlur * 0.4 +
          liquidBlur.edgeBlur * 0.25 +
          liquidBlur.centerBlur * 0.15 +
          liquidBlur.flowBlur * 0.2
      );
      backdropFilterString = `blur(${weightedBlur}px) saturate(${Math.min(dynamicSaturation, 250)}%) contrast(${lightingContrast}) brightness(${lightingBrightness})`;
    } else {
      const effectiveBlur = clampBlur(
        Math.max(
          liquidBlur.baseBlur,
          liquidBlur.edgeBlur * 0.8,
          liquidBlur.centerBlur * 1.1,
          liquidBlur.flowBlur * 0.9
        )
      );
      backdropFilterString = `blur(${effectiveBlur}px) saturate(${Math.min(dynamicSaturation, 250)}%) contrast(${lightingContrast}) brightness(${lightingBrightness})`;
    }

    // Container variables
    const style = containerElement.style;


    style.setProperty('--atomix-glass-container-radius', `${effectiveBorderRadius}px`);

    style.setProperty('--atomix-glass-container-backdrop', backdropFilterString);

    // Shadows
    style.setProperty(
      '--atomix-glass-container-shadow',
      isOverLight
        ? [
            `inset 0 1px 0 rgba(255, 255, 255, ${(0.35 + mx * 0.002) * (overLightConfig.shadowIntensity || 1)})`,
            `inset 0 -1px 0 rgba(0, 0, 0, ${(0.15 + Math.abs(my) * 0.001) * (overLightConfig.shadowIntensity || 1)})`,
            `inset 0 0 20px rgba(0, 0, 0, ${(0.06 + Math.abs(mx + my) * 0.001) * (overLightConfig.shadowIntensity || 1)})`,
            `0 2px 12px rgba(0, 0, 0, ${(0.08 + Math.abs(my) * 0.002) * (overLightConfig.shadowIntensity || 1)})`,
          ].join(', ')
        : ATOMIX_GLASS.CONSTANTS.CONTAINER_SHADOW.LIGHT
    );

    style.setProperty(
      '--atomix-glass-container-shadow-opacity',
      effectiveWithoutEffects ? '0' : '1'
    );

    style.setProperty(
      '--atomix-glass-container-bg',
      isOverLight
        ? `linear-gradient(${180 + mx * 0.5}deg, rgba(255, 255, 255, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.05) 100%)`
        : 'none'
    );

    style.setProperty(
      '--atomix-glass-container-text-shadow',
      isOverLight ? '0px 1px 2px rgba(255, 255, 255, 0.15)' : '0px 2px 12px rgba(0, 0, 0, 0.4)'
    );

    style.setProperty(
      '--atomix-glass-container-box-shadow',
      isOverLight
        ? '0px 16px 70px rgba(0, 0, 0, 0.75)'
        : '0 8px 32px rgba(0, 0, 0, 0.32), 0 2px 8px rgba(0, 0, 0, 0.18)'
    );
  }
};
