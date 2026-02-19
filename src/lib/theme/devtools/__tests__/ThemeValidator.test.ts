import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeValidator } from '../ThemeValidator';
import { createTestThemeObject } from '../../test/testTheme';
import type { Theme, ThemeMetadata } from '../../types';

describe('ThemeValidator', () => {
  let validator: ThemeValidator;
  let validTheme: Theme;

  beforeEach(() => {
    validator = new ThemeValidator();
    validTheme = createTestThemeObject();
  });

  it('should validate a correct theme', () => {
    const result = validator.validate(validTheme);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  describe('validatePalette', () => {
    it('should detect invalid color values', () => {
      const invalidTheme = { ...validTheme };
      invalidTheme.palette.primary.main = 'invalid-color';

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid color value for primary.main: invalid-color');
    });

    it('should detect low contrast for primary color', () => {
      const lowContrastTheme = { ...validTheme };
      // White on white
      lowContrastTheme.palette.primary.main = '#FFFFFF';
      lowContrastTheme.palette.primary.contrastText = '#FFFFFF';

      const result = validator.validate(lowContrastTheme);
      // Depending on strictness, this might be error or warning.
      // In validatePalette:
      // if (primaryContrast < 3) errors.push(...)
      // else warnings.push(...)

      // Contrast of #FFFFFF on #FFFFFF is 1.
      // So it should be an error.
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Primary color contrast ratio'))).toBe(true);
      expect(result.a11yIssues).toHaveLength(1);
      expect(result.a11yIssues[0].type).toBe('contrast');
    });

    it('should detect low contrast for text on background', () => {
      const lowContrastTheme = { ...validTheme };
      // Black text on black background
      lowContrastTheme.palette.background.default = '#000000';
      lowContrastTheme.palette.text.primary = '#000000';

      const result = validator.validate(lowContrastTheme);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Text color contrast ratio'))).toBe(true);
      expect(result.a11yIssues.some(i => i.property === 'palette.text.primary')).toBe(true);
    });
  });

  describe('validateTypography', () => {
    it('should require fontFamily', () => {
      const invalidTheme = { ...validTheme };
      // @ts-expect-error Testing runtime validation
      invalidTheme.typography.fontFamily = undefined;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Typography must have a fontFamily');
    });

    it('should require valid fontSize', () => {
      const invalidTheme = { ...validTheme };
      invalidTheme.typography.fontSize = -1;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Typography must have a valid fontSize');
    });

    it('should warn for small fontSize', () => {
      const warningTheme = { ...validTheme };
      warningTheme.typography.fontSize = 10;

      const result = validator.validate(warningTheme);
      expect(result.warnings).toContain('Font size is below recommended minimum (12px) for accessibility');
    });
  });

  describe('validateSpacing', () => {
    it('should require spacing to be a function', () => {
      const invalidTheme = { ...validTheme };
      // @ts-expect-error Testing runtime validation
      invalidTheme.spacing = 'not-a-function';

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Spacing must be a function');
    });

    it('should ensure spacing function returns string', () => {
      const invalidTheme = { ...validTheme };
      // @ts-expect-error Testing runtime validation
      invalidTheme.spacing = () => 123;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Spacing function must return a string');
    });

    it('should handle spacing function errors', () => {
      const invalidTheme = { ...validTheme };
      invalidTheme.spacing = () => { throw new Error('Test error'); };

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Spacing function error: Test error');
    });
  });

  describe('validateBreakpoints', () => {
    it('should require breakpoints values', () => {
      const invalidTheme = { ...validTheme };
      // @ts-expect-error Testing runtime validation
      invalidTheme.breakpoints.values = undefined;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Breakpoints must have values');
    });

    it('should require numeric breakpoint values', () => {
      const invalidTheme = { ...validTheme };
      // @ts-expect-error Testing runtime validation
      invalidTheme.breakpoints.values.md = 'not-a-number';

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Breakpoint md must be a number');
    });

    it('should warn if breakpoints are not in ascending order', () => {
      const warningTheme = { ...validTheme };
      warningTheme.breakpoints.values = {
        ...warningTheme.breakpoints.values,
        sm: 100,
        xs: 200, // xs > sm
      };

      const result = validator.validate(warningTheme);
      expect(result.warnings).toContain('Breakpoint values should be in ascending order');
    });
  });

  describe('validateTransitions', () => {
    it('should require transitions configuration', () => {
      const invalidTheme = { ...validTheme };
      // @ts-expect-error Testing runtime validation
      invalidTheme.transitions = undefined;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Transitions configuration is required');
    });

    it('should validate transition durations', () => {
      const invalidTheme = { ...validTheme };
      invalidTheme.transitions.duration.short = -100;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Transition duration short must be a non-negative number');
    });

    it('should warn for excessive transition durations', () => {
      const warningTheme = { ...validTheme };
      warningTheme.transitions.duration.complex = 20000;

      const result = validator.validate(warningTheme);
      expect(result.warnings[0]).toContain('Transition duration complex (20000ms) exceeds recommended maximum (10000ms)');
    });

    it('should validate easing functions', () => {
      const invalidTheme = { ...validTheme };
      // @ts-expect-error Testing runtime validation
      invalidTheme.transitions.easing.easeInOut = 123;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Transition easing easeInOut must be a string');
    });

    it('should warn for invalid easing functions', () => {
        const warningTheme = { ...validTheme };
        warningTheme.transitions.easing.easeInOut = 'invalid-easing';

        const result = validator.validate(warningTheme);
        expect(result.warnings[0]).toContain('Transition easing easeInOut may not be a valid CSS easing function: invalid-easing');
      });
  });

  describe('validateZIndex', () => {
    it('should require zIndex configuration', () => {
      const invalidTheme = { ...validTheme };
      // @ts-expect-error Testing runtime validation
      invalidTheme.zIndex = undefined;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Z-index configuration is required');
    });

    it('should validate zIndex values are numbers', () => {
      const invalidTheme = { ...validTheme };
      // @ts-expect-error Testing runtime validation
      invalidTheme.zIndex.modal = 'high';

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Z-index modal must be a number, got string');
    });

    it('should validate zIndex values are non-negative', () => {
      const invalidTheme = { ...validTheme };
      invalidTheme.zIndex.modal = -1;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Z-index modal must be non-negative, got -1');
    });

    it('should warn for excessive zIndex values', () => {
      const warningTheme = { ...validTheme };
      warningTheme.zIndex.modal = 20000;

      const result = validator.validate(warningTheme);
      expect(result.warnings[0]).toContain('Z-index modal (20000) exceeds recommended maximum (10000)');
    });

    it('should warn for close zIndex values', () => {
      const warningTheme = { ...validTheme };
      warningTheme.zIndex.modal = 1000;
      warningTheme.zIndex.tooltip = 1005; // Diff < 10

      const result = validator.validate(warningTheme);
      expect(result.warnings.some(w => w.includes('potential layering conflicts'))).toBe(true);
    });
  });

  describe('validateBorderRadius', () => {
    it('should require borderRadius configuration', () => {
      const invalidTheme = { ...validTheme };
      // @ts-expect-error Testing runtime validation
      invalidTheme.borderRadius = undefined;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Border radius configuration is required');
    });

    it('should validate borderRadius format', () => {
      const invalidTheme = { ...validTheme };
      invalidTheme.borderRadius.sm = 'invalid';

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Border radius sm has invalid format: invalid');
    });

    it('should validate numeric borderRadius', () => {
      const invalidTheme = { ...validTheme };
      invalidTheme.borderRadius.sm = -5;

      const result = validator.validate(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Border radius sm must be non-negative, got -5');
    });

    it('should warn for excessive borderRadius', () => {
        const warningTheme = { ...validTheme };
        warningTheme.borderRadius.lg = 1005;

        const result = validator.validate(warningTheme);
        expect(result.warnings[0]).toContain('Border radius lg (1005) exceeds recommended maximum (1000px)');
      });
  });

  describe('validateCustom', () => {
    it('should detect circular references', () => {
      const warningTheme = { ...validTheme };
      const circular: any = {};
      circular.self = circular;
      warningTheme.custom = { circular };

      const result = validator.validate(warningTheme);
      expect(result.warnings.some(w => w.includes('Circular reference detected'))).toBe(true);
    });

    it('should validate custom property names', () => {
        const warningTheme = { ...validTheme };
        warningTheme.custom = { 'invalid-name': 'value' };

        const result = validator.validate(warningTheme);
        expect(result.warnings.some(w => w.includes('does not follow naming conventions'))).toBe(true);
    });

    it('should detect excessive depth', () => {
        const warningTheme = { ...validTheme };
        let current = warningTheme.custom = {};
        for (let i = 0; i < 15; i++) {
            // @ts-expect-error Dynamic assignment
            current.child = {};
            // @ts-expect-error Dynamic assignment
            current = current.child;
        }

        const result = validator.validate(warningTheme);
        expect(result.warnings.some(w => w.includes('exceeds maximum depth'))).toBe(true);
    });
  });
});
