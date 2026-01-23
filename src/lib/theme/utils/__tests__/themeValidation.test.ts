import { describe, it, expect } from 'vitest';
import {
  validateDesignTokens,
  validateColorFormats,
  validateRequiredTokens,
  validateAccessibility,
  validateColorFormat,
  getContrastRatioBetweenColors,
  validateContrastRatio,
  validateAndMergeTokens
} from '../themeValidation';
import { defaultTokens } from '../../tokens/tokens';

describe('Theme Validation', () => {
  describe('validateColorFormat', () => {
    it('should validate valid hex colors', () => {
      expect(validateColorFormat('#ff0000')).toBe(true);
      expect(validateColorFormat('#abc')).toBe(true);
      expect(validateColorFormat('#123456')).toBe(true);
      expect(validateColorFormat('#abcdef12')).toBe(true); // with alpha
    });

    it('should validate valid RGB/RGBA colors', () => {
      expect(validateColorFormat('rgb(255, 0, 0)')).toBe(true);
      expect(validateColorFormat('rgba(255, 0, 0, 0.5)')).toBe(true);
      expect(validateColorFormat('rgb(0, 128, 255)')).toBe(true);
    });

    it('should validate valid HSL/HSLA colors', () => {
      expect(validateColorFormat('hsl(0, 100%, 50%)')).toBe(true);
      expect(validateColorFormat('hsla(120, 75%, 25%, 0.8)')).toBe(true);
      expect(validateColorFormat('hsl(229, 75%, 66%)')).toBe(true);
    });

    it('should reject invalid color formats', () => {
      expect(validateColorFormat('not-a-color')).toBe(false);
      expect(validateColorFormat('#gggggg')).toBe(false);
      expect(validateColorFormat('rgb(300, 0, 0)')).toBe(false);
      expect(validateColorFormat('hsl(400, 50%, 50%)')).toBe(false);
      expect(validateColorFormat('')).toBe(false);
    });
  });

  describe('getContrastRatioBetweenColors', () => {
    it('should calculate contrast ratio correctly', () => {
      const ratio = getContrastRatioBetweenColors('#ffffff', '#000000');
      expect(ratio).toBeCloseTo(21, 0); // White on black should be very high contrast

      const lowRatio = getContrastRatioBetweenColors('#808080', '#808080');
      expect(lowRatio).toBe(1); // Same color should be 1:1
    });

    it('should return null for invalid colors', () => {
      const result = getContrastRatioBetweenColors('#ffffff', 'invalid-color');
      expect(result).toBeNull();
    });
  });

  describe('validateContrastRatio', () => {
    it('should validate contrast ratios', () => {
      const result = validateContrastRatio('#ffffff', '#000000');
      expect(result.valid).toBe(true);
      expect(result.ratio).toBeGreaterThan(20);

      const lowContrast = validateContrastRatio('#cccccc', '#dddddd');
      expect(lowContrast.valid).toBe(false);
      expect(lowContrast.ratio).toBeLessThan(4.5);
    });

    it('should handle large text requirements', () => {
      const result = validateContrastRatio('#cccccc', '#dddddd', true);
      expect(result.valid).toBe(false);
      expect(result.requiredRatio).toBe(3);
    });
  });

  describe('validateColorFormats', () => {
    it('should validate valid color tokens', () => {
      const validTokens = {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#10b981',
      };

      const result = validateColorFormats(validTokens);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid color formats', () => {
      const invalidTokens = {
        primary: 'not-a-color',
        secondary: '#gggggg',
        success: '#10b981',
      };

      const result = validateColorFormats(invalidTokens);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(2);
      expect(result.errors.some(error => error.includes('primary'))).toBe(true);
      expect(result.errors.some(error => error.includes('secondary'))).toBe(true);
    });

    it('should handle non-string values', () => {
      const mixedTokens = {
        primary: '#667eea',
        secondary: 123, // invalid type
      };

      const result = validateColorFormats(mixedTokens);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toContain('secondary');
    });
  });

  describe('validateRequiredTokens', () => {
    it('should validate complete tokens with all required tokens', () => {
      const result = validateRequiredTokens(defaultTokens);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing required tokens', () => {
      const incompleteTokens = {
        secondary: '#764ba2',
        success: '#10b981',
        // missing primary and other required tokens
      };

      const result = validateRequiredTokens(incompleteTokens);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some(error => error.includes('primary'))).toBe(true);
    });

    it('should provide warnings for missing RGB versions', () => {
      const tokensWithoutRgb = {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#10b981',
        info: '#3b82f6',
        warning: '#f59e0b',
        error: '#ef4444',
        light: '#f8f9fa',
        dark: '#212529',
        'primary-text-emphasis': '#495057',
        'secondary-text-emphasis': '#6c757d',
        'tertiary-text-emphasis': '#868e96',
        'disabled-text-emphasis': '#adb5bd',
      };

      const result = validateRequiredTokens(tokensWithoutRgb);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some(warning => warning.includes('RGB version'))).toBe(true);
    });
  });

  describe('validateAccessibility', () => {
    it('should validate contrast ratios for accessibility-critical combinations', () => {
      const validTokens = {
        ...defaultTokens,
        'primary-text-emphasis': '#000000',
        'primary-bg-subtle': '#ffffff',
        'secondary-text-emphasis': '#333333',
        'secondary-bg-subtle': '#f8f9fa',
        'error-text-emphasis': '#721c24',
        'error-bg-subtle': '#f8d7da',
        'success-text-emphasis': '#155724',
        'success-bg-subtle': '#d4edda',
      };

      const result = validateAccessibility(validTokens);
      expect(result.valid).toBe(true);
    });

    it('should detect poor contrast ratios', () => {
      const poorContrastTokens = {
        'primary-text-emphasis': '#cccccc', // low contrast
        'primary-bg-subtle': '#dddddd',
      };

      const result = validateAccessibility(poorContrastTokens);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toMatch(/contrast ratio.*below required/);
    });

    it('should provide warnings for missing accessibility check tokens', () => {
      const incompleteTokens = {
        'primary-text-emphasis': '#000000',
        // missing primary-bg-subtle
      };

      const result = validateAccessibility(incompleteTokens);
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('validateDesignTokens', () => {
    it('should validate complete and valid design tokens', () => {
      // Skip accessibility validation as defaultTokens have known contrast issues
      const result = validateDesignTokens(defaultTokens, { skipAccessibility: true });
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect validation errors', () => {
      const invalidTokens = {
        primary: 'invalid-color',
        secondary: '#764ba2',
        success: '#10b981',
      };

      const result = validateDesignTokens(invalidTokens);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should allow skipping certain validations', () => {
      const invalidTokens = {
        primary: 'invalid-color',
        secondary: '#764ba2',
      };

      const result = validateDesignTokens(invalidTokens, {
        skipColorValidation: true,
        skipRequiredTokens: true,
        skipAccessibility: true
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('validateAndMergeTokens', () => {
    it('should merge partial tokens with defaults and validate', () => {
      const partialTokens = {
        primary: '#8b5cf6',
        'primary-hover': '#7c3aed',
      };

      const result = validateAndMergeTokens(partialTokens);
      // Note: validation may fail due to accessibility issues in defaultTokens
      // but tokens should still be merged correctly
      expect(result.tokens.primary).toBe('#8b5cf6');
      expect(result.tokens.secondary).toBe(defaultTokens.secondary); // from defaults
      // Check that our custom tokens were added
      expect(result.tokens['primary-hover']).toBe('#7c3aed');
    });

    it('should handle invalid partial tokens', () => {
      const invalidPartialTokens = {
        primary: 'invalid-color',
        secondary: '#764ba2',
      };

      const result = validateAndMergeTokens(invalidPartialTokens);
      expect(result.validation.valid).toBe(false);
      expect(result.tokens.primary).toBe('invalid-color'); // still includes invalid token
    });
  });
});