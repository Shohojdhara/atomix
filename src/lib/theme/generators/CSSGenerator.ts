/**
 * CSS Generator
 * 
 * Optimized CSS variable generation from theme objects
 */

import type { Theme } from '../types';

/**
 * CSS generation options
 */
export interface CSSGeneratorOptions {
  /** CSS selector (default: ':root') */
  selector?: string;
  /** CSS variable prefix (default: 'atomix') */
  prefix?: string;
  /** Include comments */
  includeComments?: boolean;
  /** Minify output */
  minify?: boolean;
  /** Custom property formatter */
  formatProperty?: (path: string[], value: any) => string;
}

/**
 * CSS Generator
 * 
 * Generates optimized CSS custom properties from theme objects
 */
export class CSSGenerator {
  private options: Required<Omit<CSSGeneratorOptions, 'formatProperty'>> & {
    formatProperty?: CSSGeneratorOptions['formatProperty'];
  };

  constructor(options: CSSGeneratorOptions = {}) {
    this.options = {
      selector: options.selector || ':root',
      prefix: options.prefix || 'atomix',
      includeComments: options.includeComments ?? true,
      minify: options.minify ?? false,
      formatProperty: options.formatProperty,
    };
  }

  /**
   * Generate CSS from theme
   */
  generate(theme: Theme): string {
    const variables = this.extractVariables(theme);
    return this.formatCSS(variables);
  }

  /**
   * Extract CSS variables from theme
   */
  private extractVariables(theme: Theme): Map<string, string> {
    const variables = new Map<string, string>();

    // Palette
    this.extractPalette(theme.palette, variables);

    // Typography
    this.extractTypography(theme.typography, variables);

    // Spacing (generate common values)
    this.extractSpacing(theme.spacing, variables);

    // Breakpoints
    this.extractBreakpoints(theme.breakpoints, variables);

    // Shadows
    this.extractShadows(theme.shadows, variables);

    // Transitions
    this.extractTransitions(theme.transitions, variables);

    // Z-index
    this.extractZIndex(theme.zIndex, variables);

    // Border radius
    this.extractBorderRadius(theme.borderRadius, variables);

    // Custom properties
    this.extractCustom(theme.custom, variables);

    return variables;
  }

  /**
   * Extract palette variables
   */
  private extractPalette(palette: Theme['palette'], variables: Map<string, string>): void {
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;

    for (const color of colors) {
      const colorObj = palette[color];
      if (colorObj) {
        variables.set(`palette-${color}-main`, colorObj.main);
        if (colorObj.light) variables.set(`palette-${color}-light`, colorObj.light);
        if (colorObj.dark) variables.set(`palette-${color}-dark`, colorObj.dark);
        if (colorObj.contrastText) variables.set(`palette-${color}-contrast-text`, colorObj.contrastText);
      }
    }

    // Background
    if (palette.background) {
      variables.set('background-default', palette.background.default);
      variables.set('background-paper', palette.background.paper);
      variables.set('background-subtle', palette.background.subtle);
    }

    // Text
    if (palette.text) {
      variables.set('text-primary', palette.text.primary);
      variables.set('text-secondary', palette.text.secondary);
      variables.set('text-disabled', palette.text.disabled);
    }
  }

  /**
   * Extract typography variables
   */
  private extractTypography(typography: Theme['typography'], variables: Map<string, string>): void {
    variables.set('font-family', typography.fontFamily);
    variables.set('font-size', `${typography.fontSize}px`);

    // Font weights
    if (typography.fontWeightLight) variables.set('font-weight-light', String(typography.fontWeightLight));
    if (typography.fontWeightRegular) variables.set('font-weight-regular', String(typography.fontWeightRegular));
    if (typography.fontWeightMedium) variables.set('font-weight-medium', String(typography.fontWeightMedium));
    if (typography.fontWeightSemiBold) variables.set('font-weight-semibold', String(typography.fontWeightSemiBold));
    if (typography.fontWeightBold) variables.set('font-weight-bold', String(typography.fontWeightBold));

    // Headings
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    for (const heading of headings) {
      const h = typography[heading];
      if (h) {
        if (h.fontSize) variables.set(`typography-${heading}-font-size`, String(h.fontSize));
        if (h.fontWeight) variables.set(`typography-${heading}-font-weight`, String(h.fontWeight));
        if (h.lineHeight) variables.set(`typography-${heading}-line-height`, String(h.lineHeight));
      }
    }

    // Body
    if (typography.body1) {
      if (typography.body1.fontSize) variables.set('typography-body1-font-size', String(typography.body1.fontSize));
      if (typography.body1.fontWeight) variables.set('typography-body1-font-weight', String(typography.body1.fontWeight));
      if (typography.body1.lineHeight) variables.set('typography-body1-line-height', String(typography.body1.lineHeight));
    }

    if (typography.body2) {
      if (typography.body2.fontSize) variables.set('typography-body2-font-size', String(typography.body2.fontSize));
      if (typography.body2.fontWeight) variables.set('typography-body2-font-weight', String(typography.body2.fontWeight));
      if (typography.body2.lineHeight) variables.set('typography-body2-line-height', String(typography.body2.lineHeight));
    }
  }

  /**
   * Extract spacing variables
   */
  private extractSpacing(spacing: Theme['spacing'], variables: Map<string, string>): void {
    // Generate common spacing values
    for (let i = 0; i <= 12; i++) {
      try {
        const value = spacing(i);
        variables.set(`spacing-${i}`, value);
      } catch {
        // Ignore errors
      }
    }
  }

  /**
   * Extract breakpoint variables
   */
  private extractBreakpoints(breakpoints: Theme['breakpoints'], variables: Map<string, string>): void {
    const keys = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    for (const key of keys) {
      const value = breakpoints.values[key];
      if (value !== undefined) {
        variables.set(`breakpoint-${key}`, `${value}px`);
      }
    }
  }

  /**
   * Extract shadow variables
   */
  private extractShadows(shadows: Theme['shadows'], variables: Map<string, string>): void {
    const keys = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    for (const key of keys) {
      const shadow = shadows[key];
      if (shadow) {
        variables.set(`shadow-${key}`, shadow);
      }
    }
  }

  /**
   * Extract transition variables
   */
  private extractTransitions(transitions: Theme['transitions'], variables: Map<string, string>): void {
    if (transitions.duration) {
      const durations = ['shortest', 'shorter', 'short', 'standard', 'complex'] as const;
      for (const key of durations) {
        const value = transitions.duration[key];
        if (value !== undefined) {
          variables.set(`transition-duration-${key}`, `${value}ms`);
        }
      }
    }

    if (transitions.easing) {
      const easings = ['easeInOut', 'easeOut', 'easeIn', 'sharp'] as const;
      for (const key of easings) {
        const value = transitions.easing[key];
        if (value) {
          variables.set(`transition-easing-${key}`, value);
        }
      }
    }
  }

  /**
   * Extract z-index variables
   */
  private extractZIndex(zIndex: Theme['zIndex'], variables: Map<string, string>): void {
    const keys = ['mobileStepper', 'speedDial', 'appBar', 'drawer', 'modal', 'snackbar', 'tooltip'] as const;
    for (const key of keys) {
      const value = zIndex[key];
      if (value !== undefined) {
        variables.set(`z-index-${key}`, String(value));
      }
    }
  }

  /**
   * Extract border radius variables
   */
  private extractBorderRadius(borderRadius: Theme['borderRadius'], variables: Map<string, string>): void {
    const keys = ['base', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', 'pill'] as const;
    for (const key of keys) {
      const value = borderRadius[key];
      if (value !== undefined) {
        variables.set(`border-radius-${key}`, String(value));
      }
    }
  }

  /**
   * Extract custom properties
   */
  private extractCustom(custom: Theme['custom'], variables: Map<string, string>): void {
    for (const [key, value] of Object.entries(custom)) {
      if (value !== undefined && value !== null) {
        variables.set(`custom-${key}`, String(value));
      }
    }
  }

  /**
   * Format CSS from variables
   */
  private formatCSS(variables: Map<string, string>): string {
    const { selector, prefix, includeComments, minify } = this.options;
    const indent = minify ? '' : '  ';
    const newline = minify ? '' : '\n';
    const space = minify ? '' : ' ';

    let css = '';

    if (includeComments && !minify) {
      css += `/* Atomix Theme CSS Variables */${newline}`;
      css += `/* Generated from theme configuration */${newline}${newline}`;
    }

    css += `${selector}${space}{${newline}`;

    for (const [key, value] of variables.entries()) {
      const property = this.formatPropertyName(key);
      css += `${indent}--${prefix}-${property}:${space}${value};${newline}`;
    }

    css += `}${newline}`;

    return css;
  }

  /**
   * Format property name
   */
  private formatPropertyName(key: string): string {
    if (this.options.formatProperty) {
      return this.options.formatProperty(key.split('-'), key);
    }
    return key;
  }
}

/**
 * Generate CSS variables from theme
 * 
 * @param theme - Theme object
 * @param options - Generation options
 * @returns CSS string
 */
export function generateCSS(theme: Theme, options: CSSGeneratorOptions = {}): string {
  const generator = new CSSGenerator(options);
  return generator.generate(theme);
}
