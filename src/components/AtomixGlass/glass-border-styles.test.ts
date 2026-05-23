import { describe, expect, it } from 'vitest';
import { ATOMIX_GLASS } from '../../lib/constants/components';
import {
  buildGlassBorderCssVars,
  formatGlassBorderWidth,
  normalizeBorderConfig,
} from './glass-border-styles';

describe('normalizeBorderConfig', () => {
  it('defaults to enabled when border and withBorder are omitted', () => {
    expect(normalizeBorderConfig()).toEqual({
      enabled: true,
      width: '0.5px',
      opacityMultiplier: 1,
      animated: true,
    });
  });

  it('respects legacy withBorder=false', () => {
    expect(normalizeBorderConfig(undefined, false).enabled).toBe(false);
  });

  it('border object overrides withBorder', () => {
    expect(
      normalizeBorderConfig({ enabled: true, width: 1, opacity: 0.5, animated: false }, false)
    ).toEqual({
      enabled: true,
      width: '1px',
      opacityMultiplier: 0.5,
      animated: false,
    });
  });
});

describe('formatGlassBorderWidth', () => {
  it('formats numbers as px', () => {
    expect(formatGlassBorderWidth(2)).toBe('2px');
  });
});

describe('buildGlassBorderCssVars', () => {
  it('returns static gradients at zero mouse offset', () => {
    const vars = buildGlassBorderCssVars({
      mouseOffset: { x: 0, y: 0 },
      mouseVelocity: { x: 0, y: 0 },
      elasticVelocity: { x: 0, y: 0 },
      borderOpacity: ATOMIX_GLASS.BORDER.DARK.opacity,
      opacityMultiplier: 1,
      tensionFactor: 0,
    });

    expect(vars[ATOMIX_GLASS.BORDER.GRADIENT_CSS_VARS.GRADIENT_1]).toContain('linear-gradient');
    expect(vars[ATOMIX_GLASS.BORDER.GRADIENT_CSS_VARS.GRADIENT_2]).toContain('linear-gradient');
    expect(vars[ATOMIX_GLASS.BORDER.GRADIENT_CSS_VARS.GRADIENT_1]).toContain(
      `${ATOMIX_GLASS.BORDER.GRADIENT.BASE_ANGLE + ATOMIX_GLASS.BORDER.GRADIENT.CHROMATIC_OFFSET}deg`
    );
  });
});
