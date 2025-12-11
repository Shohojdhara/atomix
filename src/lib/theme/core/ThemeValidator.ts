/**
 * Theme Validator
 * 
 * Runtime theme validation including color contrast and accessibility checks
 */

import type { Theme, ThemeMetadata } from '../types';
import { getContrastRatio, getLuminance } from '../themeUtils';

/**
 * Validation result
 */
export interface ValidationResult {
  /** Whether theme is valid */
  valid: boolean;
  /** Validation errors */
  errors: string[];
  /** Validation warnings */
  warnings: string[];
  /** Accessibility issues */
  a11yIssues: A11yIssue[];
}

/**
 * Accessibility issue
 */
export interface A11yIssue {
  /** Issue type */
  type: 'contrast' | 'color' | 'missing';
  /** Severity */
  severity: 'error' | 'warning';
  /** Issue message */
  message: string;
  /** Affected property */
  property?: string;
  /** Current value */
  value?: string;
  /** Recommended value */
  recommended?: string;
}

/**
 * Theme Validator
 * 
 * Validates themes for correctness and accessibility
 */
export class ThemeValidator {
  /**
   * Validate theme
   */
  validate(theme: Theme, metadata?: ThemeMetadata): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const a11yIssues: A11yIssue[] = [];

    // Validate palette
    const paletteResult = this.validatePalette(theme.palette, metadata);
    errors.push(...paletteResult.errors);
    warnings.push(...paletteResult.warnings);
    a11yIssues.push(...paletteResult.a11yIssues);

    // Validate typography
    const typographyResult = this.validateTypography(theme.typography);
    errors.push(...typographyResult.errors);
    warnings.push(...typographyResult.warnings);

    // Validate spacing
    const spacingResult = this.validateSpacing(theme.spacing);
    errors.push(...spacingResult.errors);
    warnings.push(...spacingResult.warnings);

    // Validate breakpoints
    const breakpointsResult = this.validateBreakpoints(theme.breakpoints);
    errors.push(...breakpointsResult.errors);
    warnings.push(...breakpointsResult.warnings);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      a11yIssues,
    };
  }

  /**
   * Validate palette
   */
  private validatePalette(
    palette: Theme['palette'],
    metadata?: ThemeMetadata
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const a11yIssues: A11yIssue[] = [];

    const contrastTarget = metadata?.a11y?.contrastTarget || 4.5;

    // Validate primary color contrast
    if (palette.primary) {
      const primaryContrast = this.checkContrast(
        palette.primary.main,
        palette.primary.contrastText || '#000000'
      );

      if (primaryContrast < contrastTarget) {
        const issue: A11yIssue = {
          type: 'contrast',
          severity: primaryContrast < 3 ? 'error' : 'warning',
          message: `Primary color contrast ratio (${primaryContrast.toFixed(2)}) is below target (${contrastTarget})`,
          property: 'palette.primary',
          value: palette.primary.main,
        };
        a11yIssues.push(issue);

        if (primaryContrast < 3) {
          errors.push(issue.message);
        } else {
          warnings.push(issue.message);
        }
      }
    }

    // Validate text colors on background
    if (palette.text && palette.background) {
      const textContrast = this.checkContrast(
        palette.background.default,
        palette.text.primary
      );

      if (textContrast < contrastTarget) {
        const issue: A11yIssue = {
          type: 'contrast',
          severity: textContrast < 3 ? 'error' : 'warning',
          message: `Text color contrast ratio (${textContrast.toFixed(2)}) is below target (${contrastTarget})`,
          property: 'palette.text.primary',
          value: palette.text.primary,
        };
        a11yIssues.push(issue);

        if (textContrast < 3) {
          errors.push(issue.message);
        } else {
          warnings.push(issue.message);
        }
      }
    }

    // Validate all color values are valid
    const colorKeys = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
    for (const key of colorKeys) {
      const color = palette[key];
      if (color) {
        if (!this.isValidColor(color.main)) {
          errors.push(`Invalid color value for ${key}.main: ${color.main}`);
        }
      }
    }

    return { valid: errors.length === 0, errors, warnings, a11yIssues };
  }

  /**
   * Validate typography
   */
  private validateTypography(typography: Theme['typography']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const a11yIssues: A11yIssue[] = [];

    if (!typography.fontFamily || typeof typography.fontFamily !== 'string') {
      errors.push('Typography must have a fontFamily');
    }

    if (!typography.fontSize || typeof typography.fontSize !== 'number' || typography.fontSize <= 0) {
      errors.push('Typography must have a valid fontSize');
    }

    // Check minimum font size for accessibility
    if (typography.fontSize && typography.fontSize < 12) {
      warnings.push('Font size is below recommended minimum (12px) for accessibility');
    }

    return { valid: errors.length === 0, errors, warnings, a11yIssues };
  }

  /**
   * Validate spacing
   */
  private validateSpacing(spacing: Theme['spacing']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const a11yIssues: A11yIssue[] = [];

    if (typeof spacing !== 'function') {
      errors.push('Spacing must be a function');
    } else {
      // Test spacing function
      try {
        const test = spacing(1);
        if (typeof test !== 'string') {
          errors.push('Spacing function must return a string');
        }
      } catch (error) {
        errors.push(`Spacing function error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return { valid: errors.length === 0, errors, warnings, a11yIssues };
  }

  /**
   * Validate breakpoints
   */
  private validateBreakpoints(breakpoints: Theme['breakpoints']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const a11yIssues: A11yIssue[] = [];

    if (!breakpoints.values) {
      errors.push('Breakpoints must have values');
    } else {
      const required = ['xs', 'sm', 'md', 'lg', 'xl'];
      for (const key of required) {
        if (typeof breakpoints.values[key] !== 'number') {
          errors.push(`Breakpoint ${key} must be a number`);
        }
      }

      // Check breakpoint order
      const values: number[] = [
        breakpoints.values.xs,
        breakpoints.values.sm,
        breakpoints.values.md,
        breakpoints.values.lg,
        breakpoints.values.xl,
      ].filter((v): v is number => typeof v === 'number');
      for (let i = 1; i < values.length; i++) {
        const current = values[i];
        const previous = values[i - 1];
        if (current != null && previous != null && current <= previous) {
          warnings.push(`Breakpoint values should be in ascending order`);
          break;
        }
      }
    }

    return { valid: errors.length === 0, errors, warnings, a11yIssues };
  }

  /**
   * Check color contrast ratio
   */
  private checkContrast(foreground: string, background: string): number {
    try {
      return getContrastRatio(foreground, background);
    } catch {
      return 0;
    }
  }

  /**
   * Check if color is valid
   */
  private isValidColor(color: string): boolean {
    // Hex
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)) {
      return true;
    }
    // RGB/RGBA
    if (/^rgba?\(/.test(color)) {
      return true;
    }
    // HSL/HSLA
    if (/^hsla?\(/.test(color)) {
      return true;
    }
    return false;
  }
}
