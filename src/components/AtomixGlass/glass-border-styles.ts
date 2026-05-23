import { ATOMIX_GLASS } from '../../lib/constants/components';
import { smoothstep } from './glass-utils';
import type { GlassBorderConfig } from '../../lib/types/components';
import type { MousePosition } from '../../lib/types/components';

const { BORDER, CONSTANTS } = ATOMIX_GLASS;
const BORDER_GRADIENT = BORDER.GRADIENT;
const WHITE = CONSTANTS.PALETTE.WHITE;

/** Resolved border configuration after normalizing props. */
export interface ResolvedGlassBorderConfig {
  enabled: boolean;
  width: string;
  opacityMultiplier: number;
  animated: boolean;
}

/**
 * Formats border width for CSS custom properties.
 */
export function formatGlassBorderWidth(value: string | number | undefined): string {
  if (value === undefined) {
    return BORDER.DEFAULT_WIDTH;
  }
  return typeof value === 'number' ? `${value}px` : value;
}

/**
 * Resolves `border` and legacy `withBorder` into a single configuration object.
 */
export function normalizeBorderConfig(
  border?: boolean | GlassBorderConfig,
  withBorder?: boolean
): ResolvedGlassBorderConfig {
  const legacyDefault = withBorder ?? true;

  if (border === undefined) {
    return {
      enabled: legacyDefault,
      width: BORDER.DEFAULT_WIDTH,
      opacityMultiplier: 1,
      animated: true,
    };
  }

  if (typeof border === 'boolean') {
    return {
      enabled: border,
      width: BORDER.DEFAULT_WIDTH,
      opacityMultiplier: 1,
      animated: true,
    };
  }

  return {
    enabled: border.enabled ?? legacyDefault,
    width: formatGlassBorderWidth(border.width),
    opacityMultiplier: border.opacity ?? 1,
    animated: border.animated !== false,
  };
}

export interface BuildGlassBorderCssVarsParams {
  mouseOffset: MousePosition;
  mouseVelocity: MousePosition;
  elasticVelocity: MousePosition;
  borderOpacity: number;
  opacityMultiplier?: number;
  tensionFactor?: number;
}

/**
 * Builds animated chromatic rim CSS variables for border layers 1 and 2.
 * When empty, SCSS static conic/linear fallbacks apply.
 */
export function buildGlassBorderCssVars(
  params: BuildGlassBorderCssVarsParams
): Record<string, string> {
  const {
    mouseOffset,
    mouseVelocity,
    elasticVelocity,
    borderOpacity,
    opacityMultiplier = 1,
    tensionFactor = 0,
  } = params;

  const mx = mouseOffset.x;
  const my = mouseOffset.y;
  const absMx = Math.abs(mx);

  const velocityRotation =
    (mouseVelocity.x + elasticVelocity.x) * BORDER_GRADIENT.VELOCITY_ANGLE_MULTIPLIER;
  const borderGradientAngle =
    BORDER_GRADIENT.BASE_ANGLE + mx * BORDER_GRADIENT.ANGLE_MULTIPLIER + velocityRotation;

  const chromaticOffset = BORDER_GRADIENT.CHROMATIC_OFFSET;
  const angleR = borderGradientAngle - chromaticOffset;
  const angleB = borderGradientAngle + chromaticOffset;

  const borderStop1 = Math.max(
    BORDER_GRADIENT.STOP_1.MIN,
    BORDER_GRADIENT.STOP_1.BASE + my * BORDER_GRADIENT.STOP_1.MULTIPLIER
  );
  const borderStop2 = Math.min(
    BORDER_GRADIENT.STOP_2.MAX,
    BORDER_GRADIENT.STOP_2.BASE + my * BORDER_GRADIENT.STOP_2.MULTIPLIER
  );

  const tensionGlow = 1 + tensionFactor * 0.5;
  const opacities = BORDER_GRADIENT.OPACITY;
  const borderOpacities = [
    (opacities.BASE_1 + absMx * opacities.MULTIPLIER_LOW) * tensionGlow,
    (opacities.BASE_2 + absMx * opacities.MULTIPLIER_HIGH) * tensionGlow,
    (opacities.BASE_3 + absMx * opacities.MULTIPLIER_LOW) * tensionGlow,
    (opacities.BASE_4 + absMx * opacities.MULTIPLIER_HIGH) * tensionGlow,
  ];

  const configBorderOpacity = borderOpacity * opacityMultiplier;

  const gradient1 = `linear-gradient(${angleB}deg, rgba(${WHITE}, 0) 0%, rgba(${WHITE}, ${(borderOpacities[0] ?? 1) * configBorderOpacity}) ${borderStop1}%, rgba(${WHITE}, ${(borderOpacities[1] ?? 1) * configBorderOpacity}) ${borderStop2}%, rgba(${WHITE}, 0) 100%)`;
  const gradient2 = `linear-gradient(${angleR}deg, rgba(${WHITE}, 0) 0%, rgba(${WHITE}, ${(borderOpacities[2] ?? 1) * configBorderOpacity}) ${borderStop1}%, rgba(${WHITE}, ${(borderOpacities[3] ?? 1) * configBorderOpacity}) ${borderStop2}%, rgba(${WHITE}, 0) 100%)`;

  return {
    [BORDER.GRADIENT_CSS_VARS.GRADIENT_1]: gradient1,
    [BORDER.GRADIENT_CSS_VARS.GRADIENT_2]: gradient2,
  };
}

/**
 * Computes tension factor from elastic translation magnitude (0–1).
 */
export function computeBorderTensionFactor(elasticTranslation: MousePosition): number {
  const magnitude = Math.hypot(elasticTranslation.x, elasticTranslation.y);
  return smoothstep(magnitude / 80);
}
