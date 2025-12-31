/**
 * Theme Naming Utility
 * 
 * Provides consistent naming conventions for CSS classes, CSS variables,
 * and JavaScript properties throughout the theme system.
 */

export class ThemeNaming {
  private static prefix = 'atomix';

  /**
   * Set the global prefix for all theme tokens
   * @param newPrefix - New prefix to use
   */
  static setPrefix(newPrefix: string): void {
    this.prefix = newPrefix;
  }

  /**
   * Get the current prefix
   */
  static getPrefix(): string {
    return this.prefix;
  }

  /**
   * Convert camelCase to kebab-case for CSS variables
   * @param str - String to convert
   */
  static camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  /**
   * Convert kebab-case to camelCase for JavaScript properties
   * @param str - String to convert
   */
  static kebabToCamel(str: string): string {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  /**
   * Create a CSS variable name
   * @param token - Token name in camelCase
   */
  static cssVar(token: string): string {
    return `--${this.prefix}-${this.camelToKebab(token)}`;
  }

  /**
   * Create a BEM CSS class name
   * @param block - Block name
   * @param element - Element name (optional)
   * @param modifier - Modifier name (optional)
   */
  static bemClass(block: string, element?: string, modifier?: string): string {
    let className = `c-${block}`;

    if (element) {
      className += `__${element}`;
    }

    if (modifier) {
      className += `--${modifier}`;
    }

    return className;
  }

  /**
   * Create a variant class name
   * @param component - Component name
   * @param variant - Variant name
   */
  static variantClass(component: string, variant: string): string {
    return `c-${component}--${variant}`;
  }

  /**
   * Create a size class name
   * @param component - Component name
   * @param size - Size name
   */
  static sizeClass(component: string, size: string): string {
    return `c-${component}--${size}`;
  }

  /**
   * Create a state class name
   * @param component - Component name
   * @param state - State name
   */
  static stateClass(component: string, state: string): string {
    return `c-${component}--${state}`;
  }

  /**
   * Create a utility class name
   * @param utility - Utility name
   */
  static utilityClass(utility: string): string {
    return `u-${utility}`;
  }

  /**
   * Create a layout class name
   * @param layout - Layout name
   */
  static layoutClass(layout: string): string {
    return `l-${layout}`;
  }

  /**
   * Create an object class name
   * @param object - Object name
   */
  static objectClass(object: string): string {
    return `o-${object}`;
  }
}

// Export constants for common naming patterns
export const THEME_NAMING = {
  PREFIX: 'atomix',
  CSS_VAR: ThemeNaming.cssVar,
  BEM_CLASS: ThemeNaming.bemClass,
  VARIANT_CLASS: ThemeNaming.variantClass,
  SIZE_CLASS: ThemeNaming.sizeClass,
  STATE_CLASS: ThemeNaming.stateClass,
  UTILITY_CLASS: ThemeNaming.utilityClass,
  LAYOUT_CLASS: ThemeNaming.layoutClass,
  OBJECT_CLASS: ThemeNaming.objectClass,
  CAMEL_TO_KEBAB: ThemeNaming.camelToKebab,
  KEBAB_TO_CAMEL: ThemeNaming.kebabToCamel,
};
