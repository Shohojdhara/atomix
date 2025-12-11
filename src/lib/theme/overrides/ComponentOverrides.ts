/**
 * Component Override System
 * 
 * Provides a comprehensive system for overriding component styles and behavior
 */

import type { Theme, ThemeOptions } from '../types';
import { createTheme } from '../createTheme';
import { deepMerge } from '../composeTheme';

/**
 * Component override configuration
 */
export interface ComponentOverride {
  /** Component name */
  component: string;
  /** Style overrides */
  styleOverrides?: Record<string, any>;
  /** Default props */
  defaultProps?: Record<string, any>;
  /** CSS class overrides */
  classOverrides?: Record<string, string>;
  /** CSS variable overrides */
  cssVariableOverrides?: Record<string, string>;
}

/**
 * Component override map
 */
export type ComponentOverrides = Record<string, ComponentOverride>;

/**
 * Override options
 */
export interface OverrideOptions {
  /** Merge with existing overrides */
  merge?: boolean;
  /** Validate overrides */
  validate?: boolean;
}

/**
 * Component Override Manager
 * 
 * Manages component-level overrides for themes
 */
export class ComponentOverrideManager {
  private overrides: ComponentOverrides = {};
  private theme: Theme | null = null;

  constructor(theme?: Theme) {
    if (theme) {
      this.theme = theme;
    }
  }

  /**
   * Set theme
   */
  setTheme(theme: Theme): void {
    this.theme = theme;
  }

  /**
   * Get theme with overrides applied
   */
  getThemeWithOverrides(): Theme | null {
    if (!this.theme) {
      return null;
    }

    // Apply overrides to theme
    const overriddenTheme = this.applyOverrides(this.theme);
    return overriddenTheme;
  }

  /**
   * Add component override
   */
  addOverride(
    component: string,
    override: Omit<ComponentOverride, 'component'>,
    options: OverrideOptions = {}
  ): void {
    const { merge = true } = options;

    if (merge && this.overrides[component]) {
      // Merge with existing override
      this.overrides[component] = {
        ...this.overrides[component],
        ...override,
        styleOverrides: {
          ...this.overrides[component].styleOverrides,
          ...override.styleOverrides,
        },
        defaultProps: {
          ...this.overrides[component].defaultProps,
          ...override.defaultProps,
        },
        classOverrides: {
          ...this.overrides[component].classOverrides,
          ...override.classOverrides,
        },
        cssVariableOverrides: {
          ...this.overrides[component].cssVariableOverrides,
          ...override.cssVariableOverrides,
        },
      };
    } else {
      // Replace override
      this.overrides[component] = {
        component,
        ...override,
      };
    }
  }

  /**
   * Remove component override
   */
  removeOverride(component: string): void {
    delete this.overrides[component];
  }

  /**
   * Get component override
   */
  getOverride(component: string): ComponentOverride | undefined {
    return this.overrides[component];
  }

  /**
   * Get all overrides
   */
  getAllOverrides(): ComponentOverrides {
    return { ...this.overrides };
  }

  /**
   * Clear all overrides
   */
  clearOverrides(): void {
    this.overrides = {};
  }

  /**
   * Apply overrides to theme
   */
  private applyOverrides(theme: Theme): Theme {
    if (Object.keys(this.overrides).length === 0) {
      return theme;
    }

    // Create theme options with component overrides
    const themeOptions: ThemeOptions = {
      ...theme,
      custom: {
        ...theme.custom,
        componentOverrides: this.overrides,
      },
    };

    return createTheme(themeOptions);
  }

  /**
   * Get CSS variables for component overrides
   */
  getComponentCSSVariables(component: string): Record<string, string> {
    const override = this.overrides[component];
    if (!override || !override.cssVariableOverrides) {
      return {};
    }

    const variables: Record<string, string> = {};
    for (const [key, value] of Object.entries(override.cssVariableOverrides)) {
      variables[`--atomix-${component}-${key}`] = value;
    }

    return variables;
  }

  /**
   * Get all CSS variables for overrides
   */
  getAllCSSVariables(): Record<string, string> {
    const variables: Record<string, string> = {};
    
    for (const component of Object.keys(this.overrides)) {
      const componentVars = this.getComponentCSSVariables(component);
      Object.assign(variables, componentVars);
    }

    return variables;
  }

  /**
   * Export overrides as JSON
   */
  exportOverrides(): string {
    return JSON.stringify(this.overrides, null, 2);
  }

  /**
   * Import overrides from JSON
   */
  importOverrides(json: string, options: OverrideOptions = {}): void {
    try {
      const imported = JSON.parse(json) as ComponentOverrides;
      const { merge = false } = options;

      if (merge) {
        // Merge with existing
        this.overrides = deepMerge(this.overrides, imported) as ComponentOverrides;
      } else {
        // Replace
        this.overrides = imported;
      }
    } catch (error) {
      throw new Error(`Failed to import overrides: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Create component override manager
 */
export function createComponentOverrideManager(theme?: Theme): ComponentOverrideManager {
  return new ComponentOverrideManager(theme);
}

/**
 * Helper to create component override
 */
export function createComponentOverride(
  component: string,
  override: Omit<ComponentOverride, 'component'>
): ComponentOverride {
  return {
    component,
    ...override,
  };
}
