/**
 * Theme Builder
 * 
 * Fluent API for building theme configurations with type safety and validation.
 */

import type { Theme, ThemeComponentOverrides, ComponentThemeOverride } from '../types';

/**
 * Theme builder class with fluent API
 */
export class ThemeBuilder {
  private theme: Partial<Theme> = {};

  /**
   * Set theme name
   */
  setName(name: string): this {
    this.theme.name = name;
    return this;
  }

  /**
   * Set global CSS variables
   */
  setCSSVars(vars: Record<string, string | number>): this {
    this.theme.cssVars = { ...this.theme.cssVars, ...vars };
    return this;
  }

  /**
   * Add a single CSS variable
   */
  addCSSVar(key: string, value: string | number): this {
    if (!this.theme.cssVars) {
      this.theme.cssVars = {};
    }
    this.theme.cssVars[key] = value;
    return this;
  }

  /**
   * Set typography configuration
   */
  setTypography(typography: Theme['typography']): this {
    this.theme.typography = typography;
    return this;
  }

  /**
   * Set font family
   */
  setFontFamily(fontFamily: string): this {
    if (!this.theme.typography) {
      this.theme.typography = {};
    }
    this.theme.typography.fontFamily = fontFamily;
    return this;
  }

  /**
   * Set font sizes
   */
  setFontSizes(fontSize: Record<string, string>): this {
    if (!this.theme.typography) {
      this.theme.typography = {};
    }
    this.theme.typography.fontSize = fontSize;
    return this;
  }

  /**
   * Set font weights
   */
  setFontWeights(fontWeight: Record<string, number>): this {
    if (!this.theme.typography) {
      this.theme.typography = {};
    }
    this.theme.typography.fontWeight = fontWeight;
    return this;
  }

  /**
   * Set line heights
   */
  setLineHeights(lineHeight: Record<string, number>): this {
    if (!this.theme.typography) {
      this.theme.typography = {};
    }
    this.theme.typography.lineHeight = lineHeight;
    return this;
  }

  /**
   * Set spacing system
   */
  setSpacing(spacing: Record<string, string | number>): this {
    this.theme.spacing = spacing;
    return this;
  }

  /**
   * Set color palette
   */
  setPalette(palette: Theme['palette']): this {
    this.theme.palette = palette;
    return this;
  }

  /**
   * Set a specific color scale
   */
  setColorScale(
    colorName: keyof NonNullable<Theme['palette']>,
    scale: NonNullable<Theme['palette']>[typeof colorName]
  ): this {
    if (!this.theme.palette) {
      this.theme.palette = {};
    }
    this.theme.palette[colorName] = scale;
    return this;
  }

  /**
   * Override a component's configuration
   */
  overrideComponent<C extends keyof ThemeComponentOverrides>(
    component: C,
    override: ThemeComponentOverrides[C]
  ): this {
    if (!this.theme.components) {
      this.theme.components = {};
    }
    this.theme.components[component] = override;
    return this;
  }

  /**
   * Set component CSS variables
   */
  setComponentCSSVars<C extends keyof ThemeComponentOverrides>(
    component: C,
    vars: Record<string, string | number>
  ): this {
    if (!this.theme.components) {
      this.theme.components = {};
    }
    if (!this.theme.components[component]) {
      this.theme.components[component] = {} as any;
    }
    const componentOverride = this.theme.components[component] as ComponentThemeOverride;
    componentOverride.cssVars = { ...componentOverride.cssVars, ...vars };
    return this;
  }

  /**
   * Set component default props
   */
  setComponentDefaultProps<C extends keyof ThemeComponentOverrides>(
    component: C,
    defaultProps: Record<string, any>
  ): this {
    if (!this.theme.components) {
      this.theme.components = {};
    }
    if (!this.theme.components[component]) {
      this.theme.components[component] = {} as any;
    }
    const componentOverride = this.theme.components[component] as ComponentThemeOverride;
    componentOverride.defaultProps = { ...componentOverride.defaultProps, ...defaultProps };
    return this;
  }

  /**
   * Set component part styles
   */
  setComponentPart<C extends keyof ThemeComponentOverrides>(
    component: C,
    partName: string,
    partConfig: {
      cssVars?: Record<string, string | number>;
      className?: string;
    }
  ): this {
    if (!this.theme.components) {
      this.theme.components = {};
    }
    if (!this.theme.components[component]) {
      this.theme.components[component] = {} as any;
    }
    const componentOverride = this.theme.components[component] as ComponentThemeOverride;
    if (!componentOverride.parts) {
      componentOverride.parts = {};
    }
    componentOverride.parts[partName] = partConfig;
    return this;
  }

  /**
   * Set component variant styles
   */
  setComponentVariant<C extends keyof ThemeComponentOverrides>(
    component: C,
    variantName: string,
    variantConfig: {
      cssVars?: Record<string, string | number>;
      className?: string;
    }
  ): this {
    if (!this.theme.components) {
      this.theme.components = {};
    }
    if (!this.theme.components[component]) {
      this.theme.components[component] = {} as any;
    }
    const componentOverride = this.theme.components[component] as ComponentThemeOverride;
    if (!componentOverride.variants) {
      componentOverride.variants = {};
    }
    componentOverride.variants[variantName] = variantConfig;
    return this;
  }

  /**
   * Merge with another theme
   */
  merge(otherTheme: Partial<Theme>): this {
    // Deep merge logic
    if (otherTheme.name) this.theme.name = otherTheme.name;
    
    if (otherTheme.cssVars) {
      this.theme.cssVars = { ...this.theme.cssVars, ...otherTheme.cssVars };
    }

    if (otherTheme.typography) {
      this.theme.typography = {
        ...this.theme.typography,
        ...otherTheme.typography,
        fontSize: {
          ...this.theme.typography?.fontSize,
          ...otherTheme.typography.fontSize,
        },
        fontWeight: {
          ...this.theme.typography?.fontWeight,
          ...otherTheme.typography.fontWeight,
        },
        lineHeight: {
          ...this.theme.typography?.lineHeight,
          ...otherTheme.typography.lineHeight,
        },
      };
    }

    if (otherTheme.spacing) {
      this.theme.spacing = { ...this.theme.spacing, ...otherTheme.spacing };
    }

    if (otherTheme.palette) {
      this.theme.palette = {
        ...this.theme.palette,
        ...otherTheme.palette,
      };
    }

    if (otherTheme.components) {
      this.theme.components = {
        ...this.theme.components,
        ...otherTheme.components,
      };
    }

    return this;
  }

  /**
   * Clone the current builder
   */
  clone(): ThemeBuilder {
    const newBuilder = new ThemeBuilder();
    newBuilder.theme = JSON.parse(JSON.stringify(this.theme));
    return newBuilder;
  }

  /**
   * Build and return the theme
   */
  build(): Theme {
    if (!this.theme.name) {
      throw new Error('Theme name is required. Use setName() to set it.');
    }

    return this.theme as Theme;
  }

  /**
   * Build without validation (returns partial theme)
   */
  buildPartial(): Partial<Theme> {
    return { ...this.theme };
  }

  /**
   * Reset the builder
   */
  reset(): this {
    this.theme = {};
    return this;
  }

  /**
   * Get current theme state
   */
  getTheme(): Partial<Theme> {
    return { ...this.theme };
  }
}

/**
 * Create a new theme builder
 */
export function createThemeBuilder(): ThemeBuilder {
  return new ThemeBuilder();
}

/**
 * Create a theme from a base theme
 */
export function extendTheme(baseTheme: Theme): ThemeBuilder {
  const builder = new ThemeBuilder();
  builder.merge(baseTheme);
  return builder;
}

/**
 * Quick theme creation helper
 */
export function createTheme(config: {
  name: string;
  cssVars?: Record<string, string | number>;
  typography?: Theme['typography'];
  spacing?: Record<string, string | number>;
  palette?: Theme['palette'];
  components?: ThemeComponentOverrides;
}): Theme {
  const builder = new ThemeBuilder();
  
  builder.setName(config.name);
  
  if (config.cssVars) {
    builder.setCSSVars(config.cssVars);
  }
  
  if (config.typography) {
    builder.setTypography(config.typography);
  }
  
  if (config.spacing) {
    builder.setSpacing(config.spacing);
  }
  
  if (config.palette) {
    builder.setPalette(config.palette);
  }
  
  if (config.components) {
    Object.entries(config.components).forEach(([component, override]) => {
      builder.overrideComponent(component as any, override as any);
    });
  }
  
  return builder.build();
}
