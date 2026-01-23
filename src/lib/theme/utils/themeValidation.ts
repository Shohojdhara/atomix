/**
 * Theme Validation Utilities
 *
 * Comprehensive validation utilities for DesignTokens objects.
 * Includes color format validation, accessibility checks, and required properties verification.
 */

import type { ThemeValidationResult } from '../types';
import type { DesignTokens } from '../tokens';
import { getLogger, ThemeError, ThemeErrorCode } from '../errors';
import { defaultTokens } from '../tokens/tokens';

const logger = getLogger();

/**
 * Color format validation patterns
 */
const COLOR_PATTERNS = {
  /** Hex color: #RGB, #RRGGBB, #RRGGBBAA */
  hex: /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/,
  /** RGB color: rgb(r, g, b) or rgb(r, g, b, a) */
  rgb: /^rgb\(\s*(\d{1,3}(?:\.\d+)?)\s*,\s*(\d{1,3}(?:\.\d+)?)\s*,\s*(\d{1,3}(?:\.\d+)?)\s*(?:,\s*([01]?\.?\d+))?\s*\)$/,
  /** RGBA color: rgba(r, g, b, a) */
  rgba: /^rgba\(\s*(\d{1,3}(?:\.\d+)?)\s*,\s*(\d{1,3}(?:\.\d+)?)\s*,\s*(\d{1,3}(?:\.\d+)?)\s*,\s*([01]?\.?\d+)\s*\)$/,
  /** HSL color: hsl(h, s%, l%) */
  hsl: /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/,
  /** HSLA color: hsla(h, s%, l%, a) */
  hsla: /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([01]?\.?\d+)\s*\)$/,
};

/**
 * Required color tokens that must be present in DesignTokens
 */
const REQUIRED_COLOR_TOKENS = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
  'light',
  'dark',
];

/**
 * Required text emphasis tokens
 */
const REQUIRED_TEXT_EMPHASIS_TOKENS = [
  'primary-text-emphasis',
  'secondary-text-emphasis',
  'tertiary-text-emphasis',
  'disabled-text-emphasis',
];

/**
 * Accessibility-critical text/background combinations to validate
 */
const ACCESSIBILITY_CHECKS = [
  {
    text: 'primary-text-emphasis',
    background: 'primary-bg-subtle',
    name: 'Primary text on subtle background',
  },
  {
    text: 'secondary-text-emphasis',
    background: 'secondary-bg-subtle',
    name: 'Secondary text on subtle background',
  },
  {
    text: 'error-text-emphasis',
    background: 'error-bg-subtle',
    name: 'Error text on subtle background',
  },
  {
    text: 'success-text-emphasis',
    background: 'success-bg-subtle',
    name: 'Success text on subtle background',
  },
];

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = COLOR_PATTERNS.hex.exec(hex);
  if (!result || !result[1]) return null;

  const digits = result[1];
  let r: number, g: number, b: number;

  switch (digits.length) {
    case 3: // #RGB
      r = parseInt((digits[0] ?? '0') + (digits[0] ?? '0'), 16);
      g = parseInt((digits[1] ?? '0') + (digits[1] ?? '0'), 16);
      b = parseInt((digits[2] ?? '0') + (digits[2] ?? '0'), 16);
      break;
    case 4: // #RGBA (ignore alpha)
      r = parseInt((digits[0] ?? '0') + (digits[0] ?? '0'), 16);
      g = parseInt((digits[1] ?? '0') + (digits[1] ?? '0'), 16);
      b = parseInt((digits[2] ?? '0') + (digits[2] ?? '0'), 16);
      break;
    case 6: // #RRGGBB
      r = parseInt(digits.slice(0, 2), 16);
      g = parseInt(digits.slice(2, 4), 16);
      b = parseInt(digits.slice(4, 6), 16);
      break;
    case 8: // #RRGGBBAA (ignore alpha)
      r = parseInt(digits.slice(0, 2), 16);
      g = parseInt(digits.slice(2, 4), 16);
      b = parseInt(digits.slice(4, 6), 16);
      break;
    default:
      return null;
  }

  return { r, g, b };
}

/**
 * Parse RGB/RGBA color string to RGB values
 */
function rgbToRgb(rgb: string): { r: number; g: number; b: number } | null {
  const match = rgb.match(COLOR_PATTERNS.rgb) || rgb.match(COLOR_PATTERNS.rgba);
  if (!match) return null;

  const r = parseInt(match[1] ?? '0', 10);
  const g = parseInt(match[2] ?? '0', 10);
  const b = parseInt(match[3] ?? '0', 10);

  // Validate RGB ranges
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return null;
  }

  return { r, g, b };
}

/**
 * Parse HSL/HSLA color string to RGB values
 */
function hslToRgb(hsl: string): { r: number; g: number; b: number } | null {
  const match = hsl.match(COLOR_PATTERNS.hsl) || hsl.match(COLOR_PATTERNS.hsla);
  if (!match) return null;

  let h = parseInt(match[1] ?? '0', 10) / 360;
  let s = parseInt(match[2] ?? '0', 10) / 100;
  let l = parseInt(match[3] ?? '0', 10) / 100;

  // Validate HSL ranges
  if (h < 0 || h > 1 || s < 0 || s > 1 || l < 0 || l > 1) {
    return null;
  }

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Convert any valid color format to RGB values
 */
export function colorToRgb(color: string): { r: number; g: number; b: number } | null {
  // Try hex first
  if (COLOR_PATTERNS.hex.test(color)) {
    return hexToRgb(color);
  }

  // Try RGB/RGBA
  if (color.startsWith('rgb')) {
    return rgbToRgb(color);
  }

  // Try HSL/HSLA
  if (color.startsWith('hsl')) {
    return hslToRgb(color);
  }

  return null;
}

/**
 * Validate that a color string is in a valid format (hex, rgb, hsl, etc.)
 * Includes validation of value ranges for RGB and HSL
 */
export function validateColorFormat(color: string): boolean {
  // Check hex first (regex is sufficient)
  if (COLOR_PATTERNS.hex.test(color)) {
    return true;
  }

  // Check RGB/RGBA with value validation
  if (COLOR_PATTERNS.rgb.test(color) || COLOR_PATTERNS.rgba.test(color)) {
    const rgb = rgbToRgb(color);
    return rgb !== null;
  }

  // Check HSL/HSLA with value validation
  if (COLOR_PATTERNS.hsl.test(color) || COLOR_PATTERNS.hsla.test(color)) {
    const hsl = hslToRgb(color);
    return hsl !== null;
  }

  return false;
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG guidelines: https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const normalize = (val: number) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
}

/**
 * Calculate contrast ratio between two colors (supports multiple formats)
 */
export function getContrastRatioBetweenColors(color1: string, color2: string): number | null {
  const rgb1 = colorToRgb(color1);
  const rgb2 = colorToRgb(color2);

  if (!rgb1 || !rgb2) {
    return null;
  }

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * AA requires 4.5:1 for normal text, 3:1 for large text
 */
export function validateContrastRatio(
  foreground: string,
  background: string,
  isLargeText = false
): { valid: boolean; ratio: number; requiredRatio: number } {
  const ratio = getContrastRatioBetweenColors(foreground, background);

  if (ratio === null) {
    return { valid: false, ratio: 0, requiredRatio: isLargeText ? 3 : 4.5 };
  }

  const requiredRatio = isLargeText ? 3 : 4.5;

  return {
    valid: ratio >= requiredRatio,
    ratio,
    requiredRatio,
  };
}

/**
 * Validate all color formats in DesignTokens
 */
export function validateColorFormats(tokens: Partial<DesignTokens>): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Define tokens that should be validated as colors
  // Only validate tokens that are intended to be actual colors, not gradients, font weights, etc.
  const colorTokenKeys = new Set([
    // Base colors
    'primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark',
    // Text emphasis
    'primary-text-emphasis', 'secondary-text-emphasis', 'tertiary-text-emphasis',
    'disabled-text-emphasis', 'invert-text-emphasis', 'brand-text-emphasis',
    'error-text-emphasis', 'success-text-emphasis', 'warning-text-emphasis',
    'info-text-emphasis', 'light-text-emphasis', 'dark-text-emphasis',
    // Background subtle
    'primary-bg-subtle', 'secondary-bg-subtle', 'tertiary-bg-subtle', 'invert-bg-subtle',
    'brand-bg-subtle', 'error-bg-subtle', 'success-bg-subtle', 'warning-bg-subtle',
    'info-bg-subtle', 'light-bg-subtle', 'dark-bg-subtle',
    // Border subtle
    'primary-border-subtle', 'secondary-border-subtle', 'success-border-subtle',
    'error-border-subtle', 'warning-border-subtle', 'info-border-subtle',
    'brand-border-subtle', 'light-border-subtle', 'dark-border-subtle',
    // Hover states
    'primary-hover', 'secondary-hover', 'light-hover', 'dark-hover',
    'error-hover', 'success-hover', 'warning-hover', 'info-hover',
    // Colors from scales (primary, red, green, blue, yellow)
    ...Array.from({ length: 10 }, (_, i) => [
      `primary-${i + 1}`, `red-${i + 1}`, `green-${i + 1}`, `blue-${i + 1}`, `yellow-${i + 1}`
    ]).flat(),
    // Gray scale
    ...Array.from({ length: 10 }, (_, i) => `gray-${i + 1}`),
    // Body colors
    'body-color', 'heading-color',
    // Link colors
    'link-color', 'link-hover-color',
    // Highlight & code
    'highlight-bg', 'code-color',
    // Border colors
    'border-color', 'border-color-translucent',
    // Focus ring
    'focus-border-color',
    // Form validation
    'form-valid-color', 'form-valid-border-color',
    'form-invalid-color', 'form-invalid-border-color',
  ]);

  for (const key of colorTokenKeys) {
    if (!(key in tokens)) continue; // Skip if token not present

    const value = (tokens as any)[key];
    if (typeof value !== 'string') {
      errors.push(`Token '${key}' must be a string, got ${typeof value}`);
      continue;
    }

    if (!validateColorFormat(value)) {
      errors.push(`Token '${key}' has invalid color format: '${value}'`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate that all required tokens are present
 */
export function validateRequiredTokens(tokens: Partial<DesignTokens>): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required color tokens
  for (const token of REQUIRED_COLOR_TOKENS) {
    if (!(token in tokens)) {
      errors.push(`Required color token '${token}' is missing`);
    }
  }

  // Check required text emphasis tokens
  for (const token of REQUIRED_TEXT_EMPHASIS_TOKENS) {
    if (!(token in tokens)) {
      errors.push(`Required text emphasis token '${token}' is missing`);
    }
  }

  // Check for RGB versions of base colors
  for (const token of REQUIRED_COLOR_TOKENS) {
    const rgbToken = `${token}-rgb`;
    if (!(rgbToken in tokens)) {
      warnings.push(`RGB version of '${token}' token '${rgbToken}' is missing`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate accessibility contrast ratios
 */
export function validateAccessibility(tokens: Partial<DesignTokens>): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const check of ACCESSIBILITY_CHECKS) {
    const textColor = (tokens as any)[check.text];
    const bgColor = (tokens as any)[check.background];

    if (!textColor || !bgColor) {
      warnings.push(`Cannot validate contrast for ${check.name}: missing tokens`);
      continue;
    }

    const contrast = validateContrastRatio(textColor, bgColor);

    if (!contrast.valid) {
      const level = contrast.requiredRatio === 3 ? 'large text (AA)' : 'normal text (AA)';
      errors.push(
        `${check.name}: contrast ratio ${contrast.ratio.toFixed(2)}:1 is below required ${contrast.requiredRatio}:1 for ${level}`
      );
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validation options
 */
export interface ValidationOptions {
  /** Skip accessibility contrast validation */
  skipAccessibility?: boolean;
  /** Skip color format validation */
  skipColorValidation?: boolean;
  /** Skip required token validation */
  skipRequiredTokens?: boolean;
}

/**
 * Comprehensive validation of DesignTokens
 */
export function validateDesignTokens(tokens: Partial<DesignTokens>, options: ValidationOptions = {}): ThemeValidationResult {
  const results = [];

  if (!options.skipRequiredTokens) {
    results.push(validateRequiredTokens(tokens));
  }

  if (!options.skipColorValidation) {
    results.push(validateColorFormats(tokens));
  }

  if (!options.skipAccessibility) {
    results.push(validateAccessibility(tokens));
  }

  const allErrors = results.flatMap(r => r.errors);
  const allWarnings = results.flatMap(r => r.warnings);

  const valid = allErrors.length === 0;

  // Log validation results
  if (!valid) {
    logger.error(
      'DesignTokens validation failed',
      new Error(`Validation failed with ${allErrors.length} errors and ${allWarnings.length} warnings`),
      {
        errors: allErrors,
        warnings: allWarnings,
        tokenCount: Object.keys(tokens).length,
      }
    );
  } else if (allWarnings.length > 0) {
    logger.warn(
      `DesignTokens validation passed with ${allWarnings.length} warnings`,
      { warnings: allWarnings }
    );
  } else {
    logger.debug('DesignTokens validation passed');
  }

  return {
    valid,
    errors: allErrors,
    warnings: allWarnings,
  };
}

/**
 * Safely validate and merge partial tokens with defaults
 */
export function validateAndMergeTokens(partialTokens?: Partial<DesignTokens>): {
  tokens: DesignTokens;
  validation: ThemeValidationResult;
} {
  const merged = { ...defaultTokens, ...partialTokens };
  const validation = validateDesignTokens(merged);

  return {
    tokens: merged,
    validation,
  };
}