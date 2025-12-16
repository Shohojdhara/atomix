/**
 * Theme Applicator
 * 
 * Applies theme configurations to the DOM, including CSS variables,
 * component overrides, typography, spacing, and color palettes.
 */

import { applyCSSVariables, removeCSSVariables } from '../cssVariableMapper';
import type { Theme, ThemeComponentOverrides, ComponentThemeOverride } from '../types';

/**
 * Theme applicator class for runtime theme application
 */
export class ThemeApplicator {
  private appliedVars: Set<string> = new Set();
  private root: HTMLElement;

  constructor(root: HTMLElement = document.documentElement) {
    this.root = root;
  }

  /**
   * Apply a complete theme configuration
   */
  applyTheme(theme: Theme): void {
    // Clear previously applied variables
    this.clearAppliedVars();

    // Apply global CSS variables
    if (theme.cssVars) {
      this.applyGlobalCSSVars(theme.cssVars);
    }

    // Apply typography system
    if (theme.typography) {
      this.applyTypography(theme.typography);
    }

    // Apply spacing system
    if (theme.spacing) {
      this.applySpacing(theme.spacing);
    }

    // Apply color palette
    if (theme.palette) {
      this.applyPalette(theme.palette);
    }

    // Apply component overrides
    if (theme.components) {
      this.applyComponentOverrides(theme.components);
    }
  }

  /**
   * Apply global CSS variables
   */
  private applyGlobalCSSVars(vars: Record<string, string | number>): void {
    Object.entries(vars).forEach(([key, value]) => {
      this.root.style.setProperty(key, String(value));
      this.appliedVars.add(key);
    });
  }

  /**
   * Apply typography system
   */
  private applyTypography(typography: Theme['typography']): void {
    if (!typography) return;

    const vars: Record<string, string | number> = {};

    if (typography.fontFamily) {
      vars['--atomix-font-family'] = typography.fontFamily;
    }

    if (typography.fontSize) {
      Object.entries(typography.fontSize).forEach(([key, value]) => {
        vars[`--atomix-font-size-${key}`] = value;
      });
    }

    if (typography.fontWeight) {
      Object.entries(typography.fontWeight).forEach(([key, value]) => {
        vars[`--atomix-font-weight-${key}`] = value;
      });
    }

    if (typography.lineHeight) {
      Object.entries(typography.lineHeight).forEach(([key, value]) => {
        vars[`--atomix-line-height-${key}`] = value;
      });
    }

    this.applyGlobalCSSVars(vars);
  }

  /**
   * Apply spacing system
   */
  private applySpacing(spacing: Record<string, string | number>): void {
    const vars: Record<string, string | number> = {};

    Object.entries(spacing).forEach(([key, value]) => {
      vars[`--atomix-space-${key}`] = value;
    });

    this.applyGlobalCSSVars(vars);
  }

  /**
   * Apply color palette
   */
  private applyPalette(palette: Theme['palette']): void {
    if (!palette) return;

    const vars: Record<string, string | number> = {};

    Object.entries(palette).forEach(([colorName, colorScale]) => {
      if (colorScale) {
        Object.entries(colorScale).forEach(([shade, value]) => {
          if (value) {
            vars[`--atomix-color-${colorName}-${shade}`] = value;
          }
        });
      }
    });

    this.applyGlobalCSSVars(vars);
  }

  /**
   * Apply component-level overrides
   */
  private applyComponentOverrides(overrides: ThemeComponentOverrides): void {
    Object.entries(overrides).forEach(([componentName, override]) => {
      if (override) {
        this.applyComponentOverride(componentName, override);
      }
    });
  }

  /**
   * Apply override for a specific component
   */
  private applyComponentOverride(
    componentName: string,
    override: ComponentThemeOverride
  ): void {
    const vars: Record<string, string | number> = {};
    const componentKey = componentName.toLowerCase();

    // Apply component-level CSS variables
    if (override.cssVars) {
      Object.entries(override.cssVars).forEach(([key, value]) => {
        // If key doesn't start with --, add component prefix
        const varKey = key.startsWith('--')
          ? key
          : `--atomix-${componentKey}-${key}`;
        vars[varKey] = value;
      });
    }

    // Apply part-specific CSS variables
    if (override.parts) {
      Object.entries(override.parts).forEach(([partName, partOverride]) => {
        if (partOverride.cssVars) {
          Object.entries(partOverride.cssVars).forEach(([key, value]) => {
            const varKey = key.startsWith('--')
              ? key
              : `--atomix-${componentKey}-${partName}-${key}`;
            vars[varKey] = value;
          });
        }
      });
    }

    // Apply variant-specific CSS variables
    if (override.variants) {
      Object.entries(override.variants).forEach(([variantName, variantOverride]) => {
        if (variantOverride.cssVars) {
          Object.entries(variantOverride.cssVars).forEach(([key, value]) => {
            const varKey = key.startsWith('--')
              ? key
              : `--atomix-${componentKey}-${variantName}-${key}`;
            vars[varKey] = value;
          });
        }
      });
    }

    this.applyGlobalCSSVars(vars);
  }

  /**
   * Clear all applied CSS variables
   */
  private clearAppliedVars(): void {
    removeCSSVariables(Array.from(this.appliedVars), this.root);
    this.appliedVars.clear();
  }

  /**
   * Get all currently applied variables
   */
  getAppliedVars(): string[] {
    return Array.from(this.appliedVars);
  }

  /**
   * Remove theme application
   */
  removeTheme(): void {
    this.clearAppliedVars();
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
export function applyTheme(theme: Theme): void {
  getThemeApplicator().applyTheme(theme);
}

/**
 * Remove theme using global applicator
 */
export function removeTheme(): void {
  getThemeApplicator().removeTheme();
}
