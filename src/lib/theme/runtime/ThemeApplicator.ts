/**
 * Theme Applicator
 * 
 * Applies theme configurations to the DOM, including CSS variables,
 * component overrides, typography, spacing, and color palettes.
 * 
 * Uses the unified theme system for CSS generation and injection.
 */

import type { Theme, ThemeComponentOverrides, ComponentThemeOverride } from '../types';
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
   * Apply a complete theme configuration
   * 
   * Uses the unified theme system to convert Theme to DesignTokens and inject CSS.
   * Automatically respects atomix.config.ts when using DesignTokens.
   */
  applyTheme(theme: Theme | DesignTokens): void {
    // Clear previously applied variables
    this.clearAppliedVars();

    // Check if it's DesignTokens
    if (this.isDesignTokens(theme)) {
      // Direct DesignTokens - use unified theme system (with config support)
      this.applyDesignTokens(theme);
    } else {
      // Theme object - use createTheme which handles Theme objects
      // createTheme automatically converts Theme to DesignTokens internally
      const css = createTheme(theme, {
        selector: ':root',
        prefix: 'atomix',
      });
      injectCSS(css, this.styleId);
    }

    // Apply component overrides (only for Theme objects)
    if (!this.isDesignTokens(theme) && (theme as any).components) {
      this.applyComponentOverrides((theme as any).components);
    }
  }

  /**
   * Apply DesignTokens using unified theme system
   * 
   * Uses createTheme() which automatically loads from atomix.config.ts
   * if no tokens are provided, ensuring config is always respected.
   */
  private applyDesignTokens(tokens: Partial<DesignTokens>): void {
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
   * Check if object is DesignTokens
   */
  private isDesignTokens(obj: Theme | DesignTokens): obj is DesignTokens {
    // DesignTokens is a flat object with string keys, no nested structures
    return obj !== null &&
           typeof obj === 'object' &&
           !('palette' in obj) &&
           !('typography' in obj) &&
           !('__isJSTheme' in obj);
  }

  /**
   * Apply global CSS variables (for component overrides)
   */
  private applyGlobalCSSVars(vars: Record<string, string | number>): void {
    Object.entries(vars).forEach(([key, value]) => {
      this.root.style.setProperty(key, String(value));
    });
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
export function applyTheme(theme: Theme | DesignTokens): void {
  getThemeApplicator().applyTheme(theme);
}

/**
 * Remove theme using global applicator
 */
export function removeTheme(): void {
  getThemeApplicator().removeTheme();
}
