import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  rgbToHex,
  getLuminance,
  getContrastRatio,
  getContrastText,
  lighten,
  darken,
  alpha,
  emphasize,
  createSpacing,
} from '../themeUtils';

describe('Theme Utils', () => {
  describe('hexToRgb', () => {
    it('should convert valid 6-digit hex codes', () => {
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should handle hex codes without hash', () => {
      expect(hexToRgb('ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('should return null for invalid hex codes', () => {
      expect(hexToRgb('invalid')).toBeNull();
      expect(hexToRgb('#xyz')).toBeNull();
      // Current implementation does NOT support 3-digit hex
      expect(hexToRgb('#fff')).toBeNull();
    });
  });

  describe('rgbToHex', () => {
    it('should convert RGB values to hex string', () => {
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
      expect(rgbToHex(0, 0, 0)).toBe('#000000');
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    });

    it('should clamp values to 0-255 range', () => {
      expect(rgbToHex(300, -50, 256)).toBe('#ff00ff');
    });

    it('should handle null/undefined values as 0', () => {
      // @ts-ignore
      expect(rgbToHex(null, undefined, 255)).toBe('#0000ff');
    });
  });

  describe('getLuminance', () => {
    it('should calculate luminance for standard colors', () => {
      expect(getLuminance('#000000')).toBe(0);
      expect(getLuminance('#ffffff')).toBe(1);
    });

    it('should return 0 for invalid colors', () => {
      expect(getLuminance('invalid')).toBe(0);
    });
  });

  describe('getContrastRatio', () => {
    it('should calculate contrast ratio between black and white', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBeCloseTo(21, 1);
    });

    it('should be commutative', () => {
      const r1 = getContrastRatio('#ffffff', '#000000');
      const r2 = getContrastRatio('#000000', '#ffffff');
      expect(r1).toBe(r2);
    });

    it('should return 1 for same colors', () => {
      expect(getContrastRatio('#ffffff', '#ffffff')).toBe(1);
    });
  });

  describe('getContrastText', () => {
    it('should return white for dark backgrounds', () => {
      expect(getContrastText('#000000')).toBe('#FFFFFF');
      expect(getContrastText('#333333')).toBe('#FFFFFF');
    });

    it('should return black for light backgrounds', () => {
      expect(getContrastText('#ffffff')).toBe('#000000');
      expect(getContrastText('#eeeeee')).toBe('#000000');
    });

    it('should respect custom threshold', () => {
      // Very strict threshold might force one or the other
      // But standard usage is tested above
      // Testing logic fallback:
      // If contrast with white < threshold AND contrast with black < threshold
      // it returns whichever has higher contrast.

      // Let's test a middle grey.
      // #808080.
      // Contrast with white: ~3.95
      // Contrast with black: ~5.32
      // Default threshold is 3.
      // 3.95 >= 3 -> returns white (checked first).
      // Wait, let's check code order:
      // if (contrastWithWhite >= threshold) return '#FFFFFF';

      expect(getContrastText('#808080', 3)).toBe('#FFFFFF');

      // If we raise threshold to 4.
      // Contrast white (3.95) < 4.
      // Contrast black (5.32) >= 4.
      // Returns black.
      expect(getContrastText('#808080', 4)).toBe('#000000');
    });
  });

  describe('lighten', () => {
    it('should lighten a color', () => {
      const result = lighten('#000000', 0.5); // Lighten black by 50%
      // black is 0, 0, 0.
      // lightenValue = val + (255 - val) * amount
      // 0 + 255 * 0.5 = 127.5 -> 128 (0x80)
      expect(result).toBe('#808080');
    });

    it('should return original color if invalid', () => {
      expect(lighten('invalid')).toBe('invalid');
    });
  });

  describe('darken', () => {
    it('should darken a color', () => {
      const result = darken('#ffffff', 0.5); // Darken white by 50%
      // white is 255.
      // darkenValue = val * (1 - amount)
      // 255 * 0.5 = 127.5 -> 128 (0x80)
      expect(result).toBe('#808080');
    });

    it('should return original color if invalid', () => {
      expect(darken('invalid')).toBe('invalid');
    });
  });

  describe('alpha', () => {
    it('should add alpha to hex color', () => {
      expect(alpha('#ffffff', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
    });

    it('should clamp opacity', () => {
      expect(alpha('#ffffff', 1.5)).toBe('rgba(255, 255, 255, 1)');
      expect(alpha('#ffffff', -0.5)).toBe('rgba(255, 255, 255, 0)');
    });

    it('should return original color if invalid', () => {
      expect(alpha('invalid', 0.5)).toBe('invalid');
    });
  });

  describe('emphasize', () => {
    it('should darken light colors', () => {
      // #ffffff luminance is 1 (> 0.5) -> darken
      const result = emphasize('#ffffff', 0.2);
      // darken #ffffff by 0.2
      // 255 * 0.8 = 204 (0xCC)
      expect(result).toBe('#cccccc');
    });

    it('should lighten dark colors', () => {
      // #000000 luminance is 0 (<= 0.5) -> lighten
      const result = emphasize('#000000', 0.2);
      // lighten #000000 by 0.2
      // 0 + 255 * 0.2 = 51 (0x33)
      expect(result).toBe('#333333');
    });
  });

  describe('createSpacing', () => {
    it('should use default spacing (4px)', () => {
      const spacing = createSpacing();
      expect(spacing(1)).toBe('4px');
      expect(spacing(2)).toBe('8px');
      expect(spacing(1, 2)).toBe('4px 8px');
    });

    it('should use numeric spacing multiplier', () => {
      const spacing = createSpacing(8);
      expect(spacing(1)).toBe('8px');
      expect(spacing(2)).toBe('16px');
    });

    it('should use array spacing', () => {
      const scale = [0, 4, 8, 16, 32];
      const spacing = createSpacing(scale);
      expect(spacing(1)).toBe('4px');
      expect(spacing(3)).toBe('16px');
      // fallback to value if index out of bounds?
      // Code: spacingInput[value] || value
      expect(spacing(10)).toBe('10px');
    });

    it('should use function spacing', () => {
      const customFn = (...values: number[]) => values.map(v => `${v}rem`).join(' ');
      const spacing = createSpacing(customFn);
      expect(spacing(1, 2)).toBe('1rem 2rem');
    });

    it('should handle no arguments', () => {
      const spacing = createSpacing();
      expect(spacing()).toBe('0px');
    });
  });
});
