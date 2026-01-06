/**
 * Theme Applicator
 * 
 * Applies theme configurations to the DOM, including CSS variables,
 * component overrides, typography, spacing, and color palettes.
 * 
 * Uses the unified theme system for CSS generation and injection.
 */

import type { DesignTokens } from '../tokens/tokens';
import { createTheme } from '../core/createTheme';
import { injectCSS, removeCSS } from '../utils/injectCSS';

/**
 * Theme applicator class for runtime theme application
 * 
 * Uses the unified theme system for efficient CSS variable generation and injection.
 */
export class ThemeApplicator {
  private root: HTMLElement;
  private styleId: string = 'atomix-theme-applicator';

  constructor(root: HTMLElement = document.documentElement) {
    this.root = root;
  }

  /**
   * Apply a complete theme configuration using DesignTokens
   * 
   * Uses the unified theme system to generate and inject CSS.
   * Automatically respects atomix.config.ts when using DesignTokens.
   */
  applyTheme(tokens: Partial<DesignTokens>): void {
    // Clear previously applied variables
    this.clearAppliedVars();

    // Use createTheme() which handles config loading automatically
    // If tokens is empty, it will load from config
    const css = createTheme(tokens, {
      selector: ':root',
      prefix: 'atomix', // Can be overridden by config
    });

    // Inject CSS into DOM
    injectCSS(css, this.styleId);
  }

  /**
   * Apply global CSS variables
   */
  private applyGlobalCSSVars(vars: Record<string, string | number>): void {
    Object.entries(vars).forEach(([key, value]) => {
      this.root.style.setProperty(key, String(value));
    });
  }

  /**
   * Clear all applied CSS variables
   */
  private clearAppliedVars(): void {
    removeCSS(this.styleId);
  }

  /**
   * Remove theme application
   */
  removeTheme(): void {
    this.clearAppliedVars();
    removeCSS(this.styleId);
  }

  /**
   * Update specific CSS variables without clearing all
   */
  updateCSSVars(vars: Record<string, string | number>): void {
    this.applyGlobalCSSVars(vars);
  }
}

/**
 * Global theme applicator instance
 */
let globalApplicator: ThemeApplicator | null = null;

/**
 * Get or create global theme applicator
 */
export function getThemeApplicator(): ThemeApplicator {
  if (!globalApplicator) {
    globalApplicator = new ThemeApplicator();
  }
  return globalApplicator;
}

/**
 * Apply theme using global applicator
 */
export function applyTheme(tokens: Partial<DesignTokens>): void {
  getThemeApplicator().applyTheme(tokens);
}

/**
 * Remove theme using global applicator
 */
export function removeTheme(): void {
  getThemeApplicator().removeTheme();
}
