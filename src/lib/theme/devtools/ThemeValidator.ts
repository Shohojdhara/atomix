/**
 * Theme Validator
 *
 * Runtime theme validation including color contrast and accessibility checks
 */

import type { Theme, ThemeMetadata } from '../types';
import { getContrastRatio, getLuminance } from '../utils/themeUtils';

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

    // Validate transitions
    const transitionsResult = this.validateTransitions(theme.transitions);
    errors.push(...transitionsResult.errors);
    warnings.push(...transitionsResult.warnings);

    // Validate z-index
    const zIndexResult = this.validateZIndex(theme.zIndex);
    errors.push(...zIndexResult.errors);
    warnings.push(...zIndexResult.warnings);

    // Validate border radius
    const borderRadiusResult = this.validateBorderRadius(theme.borderRadius);
    errors.push(...borderRadiusResult.errors);
    warnings.push(...borderRadiusResult.warnings);

    // Validate custom properties
    const customResult = this.validateCustom(theme.custom);
    errors.push(...customResult.errors);
    warnings.push(...customResult.warnings);

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
  private validatePalette(palette: Theme['palette'], metadata?: ThemeMetadata): ValidationResult {
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
      const textContrast = this.checkContrast(palette.background.default, palette.text.primary);

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

    if (
      !typography.fontSize ||
      typeof typography.fontSize !== 'number' ||
      typography.fontSize <= 0
    ) {
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
        errors.push(
          `Spacing function error: ${error instanceof Error ? error.message : String(error)}`
        );
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

  /**
   * Validate transitions
   */
  private validateTransitions(transitions: Theme['transitions']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const a11yIssues: A11yIssue[] = [];

    if (!transitions) {
      errors.push('Transitions configuration is required');
      return { valid: false, errors, warnings, a11yIssues };
    }

    // Validate duration values
    if (transitions.duration) {
      const durationKeys: (keyof NonNullable<typeof transitions.duration>)[] = [
        'shortest',
        'shorter',
        'short',
        'standard',
        'complex',
        'enteringScreen',
        'leavingScreen',
      ];

      for (const key of durationKeys) {
        const duration = transitions.duration[key];
        if (duration !== undefined) {
          if (typeof duration !== 'number' || duration < 0) {
            errors.push(`Transition duration ${key} must be a non-negative number`);
          } else if (duration > 10000) {
            warnings.push(
              `Transition duration ${key} (${duration}ms) exceeds recommended maximum (10000ms)`
            );
          }
        }
      }
    }

    // Validate easing functions
    if (transitions.easing) {
      const easingKeys: (keyof NonNullable<typeof transitions.easing>)[] = [
        'easeInOut',
        'easeOut',
        'easeIn',
        'sharp',
      ];

      const validEasingPattern =
        /^(linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier\([^)]+\)|steps\([^)]+\))$/i;

      for (const key of easingKeys) {
        const easing = transitions.easing[key];
        if (easing !== undefined) {
          if (typeof easing !== 'string') {
            errors.push(`Transition easing ${key} must be a string`);
          } else if (!validEasingPattern.test(easing)) {
            warnings.push(
              `Transition easing ${key} may not be a valid CSS easing function: ${easing}`
            );
          }
        }
      }
    }

    return { valid: errors.length === 0, errors, warnings, a11yIssues };
  }

  /**
   * Validate z-index
   */
  private validateZIndex(zIndex: Theme['zIndex']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const a11yIssues: A11yIssue[] = [];

    if (!zIndex) {
      errors.push('Z-index configuration is required');
      return { valid: false, errors, warnings, a11yIssues };
    }

    const numericEntries = Object.entries(zIndex).filter(
      ([, value]) => typeof value === 'number'
    ) as Array<[string, number]>;

    for (const [key, value] of Object.entries(zIndex)) {
      if (value !== undefined) {
        if (typeof value !== 'number') {
          errors.push(`Z-index ${key} must be a number, got ${typeof value}`);
        } else if (value < 0) {
          errors.push(`Z-index ${key} must be non-negative, got ${value}`);
        } else if (value > 10000) {
          warnings.push(`Z-index ${key} (${value}) exceeds recommended maximum (10000)`);
        }
      }
    }

    for (let i = 0; i < numericEntries.length; i++) {
      for (let j = i + 1; j < numericEntries.length; j++) {
        const entryA = numericEntries[i];
        const entryB = numericEntries[j];
        if (!entryA || !entryB) continue;
        const [keyA, valueA] = entryA;
        const [keyB, valueB] = entryB;
        const diff = Math.abs(valueA - valueB);
        if (diff < 10 && diff > 0) {
          warnings.push(
            `Z-index values ${keyA} (${valueA}) and ${keyB} (${valueB}) are very close, potential layering conflicts`
          );
        }
      }
    }

    return { valid: errors.length === 0, errors, warnings, a11yIssues };
  }

  /**
   * Validate border radius
   */
  private validateBorderRadius(borderRadius: Theme['borderRadius']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const a11yIssues: A11yIssue[] = [];

    if (!borderRadius) {
      errors.push('Border radius configuration is required');
      return { valid: false, errors, warnings, a11yIssues };
    }

    // Common border radius keys
    const radiusKeys: (keyof typeof borderRadius)[] = [
      'base',
      'sm',
      'md',
      'lg',
      'xl',
      'xxl',
      '3xl',
      '4xl',
      'pill',
    ];

    for (const key of radiusKeys) {
      const value = borderRadius[key];
      if (value !== undefined) {
        let numValue: number;

        if (typeof value === 'number') {
          numValue = value;
        } else if (typeof value === 'string') {
          // Parse string values like "4px", "0.5rem", etc.
          const match = value.match(/^([\d.]+)(px|rem|em|%)?$/);
          if (!match) {
            errors.push(`Border radius ${key} has invalid format: ${value}`);
            continue;
          }
          const [, numStr] = match;
          if (!numStr) {
            errors.push(`Border radius ${key} has invalid numeric value: ${value}`);
            continue;
          }
          numValue = parseFloat(numStr);
        } else {
          errors.push(`Border radius ${key} must be a number or string, got ${typeof value}`);
          continue;
        }

        if (numValue < 0) {
          errors.push(`Border radius ${key} must be non-negative, got ${numValue}`);
        } else if (numValue > 1000) {
          warnings.push(`Border radius ${key} (${value}) exceeds recommended maximum (1000px)`);
        }
      }
    }

    return { valid: errors.length === 0, errors, warnings, a11yIssues };
  }

  /**
   * Validate custom properties
   */
  private validateCustom(custom: Theme['custom']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const a11yIssues: A11yIssue[] = [];

    if (!custom || typeof custom !== 'object') {
      return { valid: true, errors, warnings, a11yIssues };
    }

    // Check for circular references and validate structure
    const visited = new WeakSet();
    const maxDepth = 10;
    let currentDepth = 0;

    const validateObject = (obj: any, path: string = 'custom'): void => {
      if (currentDepth > maxDepth) {
        warnings.push(
          `Custom property path ${path} exceeds maximum depth (${maxDepth}), potential circular reference`
        );
        return;
      }

      if (obj === null || typeof obj !== 'object') {
        return;
      }

      if (visited.has(obj)) {
        warnings.push(`Circular reference detected in custom property path: ${path}`);
        return;
      }

      visited.add(obj);
      currentDepth++;

      try {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = `${path}.${key}`;

          // Validate property name
          if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
            warnings.push(
              `Custom property name "${key}" in ${path} does not follow naming conventions (should be valid identifier)`
            );
          }

          // Validate value type
          if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            validateObject(value, currentPath);
          }
        }
      } finally {
        currentDepth--;
        visited.delete(obj);
      }
    };

    validateObject(custom);

    return { valid: errors.length === 0, errors, warnings, a11yIssues };
  }
}
