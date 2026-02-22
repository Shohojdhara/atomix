/**
 * CSS Variable Mapper
 *
 * Utilities for generating and managing CSS custom properties from SCSS tokens
 * and component configurations.
 */

/**
 * Configuration for generating CSS variables for a component
 */
export interface CSSVariableConfig {
  /** Component name (e.g., 'button', 'card') */
  component: string;
  /** Base properties for the component */
  properties: Record<string, string | number>;
  /** Part-specific properties (e.g., icon, label) */
  parts?: Record<string, Record<string, string | number>>;
  /** State-specific properties (e.g., hover, active, disabled) */
  states?: Record<string, Record<string, string | number>>;
  /** Variant-specific properties (e.g., primary, secondary) */
  variants?: Record<string, Record<string, string | number>>;
}

/**
 * CSS variable naming options
 */
export interface CSSVariableNamingOptions {
  /** Prefix for all variables (default: 'atomix') */
  prefix?: string;
  /** Separator between parts (default: '-') */
  separator?: string;
  /** Whether to include component name in variable (default: true) */
  includeComponent?: boolean;
}

/**
 * Generate CSS variable name from parts
 *
 * @example
 * generateCSSVariableName('button', 'bg', { prefix: 'atomix' })
 * // Returns: '--atomix-button-bg'
 */
export function generateCSSVariableName(
  component: string,
  property: string,
  options: CSSVariableNamingOptions = {}
): string {
  const { prefix = 'atomix', separator = '-', includeComponent = true } = options;

  const parts = [prefix];

  if (includeComponent) {
    parts.push(component);
  }

  parts.push(property);

  return `--${parts.join(separator)}`;
}

/**
 * Generate CSS variables object from configuration
 *
 * @example
 * const vars = generateComponentCSSVars({
 *   component: 'button',
 *   properties: { bg: '#000', color: '#fff' }
 * })
 * // Returns: { '--atomix-button-bg': '#000', '--atomix-button-color': '#fff' }
 */
export function generateComponentCSSVars(
  config: CSSVariableConfig,
  options: CSSVariableNamingOptions = {}
): Record<string, string> {
  const vars: Record<string, string> = {};
  const { component, properties, parts, states, variants } = config;

  // Base properties
  Object.entries(properties).forEach(([key, value]) => {
    const varName = generateCSSVariableName(component, key, options);
    vars[varName] = String(value);
  });

  // Part properties
  if (parts) {
    Object.entries(parts).forEach(([partName, partProps]) => {
      Object.entries(partProps).forEach(([key, value]) => {
        const varName = generateCSSVariableName(component, `${partName}-${key}`, options);
        vars[varName] = String(value);
      });
    });
  }

  // State properties
  if (states) {
    Object.entries(states).forEach(([stateName, stateProps]) => {
      Object.entries(stateProps).forEach(([key, value]) => {
        const varName = generateCSSVariableName(component, `${stateName}-${key}`, options);
        vars[varName] = String(value);
      });
    });
  }

  // Variant properties
  if (variants) {
    Object.entries(variants).forEach(([variantName, variantProps]) => {
      Object.entries(variantProps).forEach(([key, value]) => {
        const varName = generateCSSVariableName(component, `${variantName}-${key}`, options);
        vars[varName] = String(value);
      });
    });
  }

  return vars;
}

/**
 * Map SCSS tokens to CSS custom properties
 *
 * @example
 * const tokens = { '$primary-color': '#7AFFD7', '$spacing-md': '16px' }
 * const vars = mapSCSSTokensToCSSVars(tokens)
 * // Returns: { '--primary-color': '#7AFFD7', '--spacing-md': '16px' }
 */
export function mapSCSSTokensToCSSVars(
  tokens: Record<string, any>,
  options: CSSVariableNamingOptions = {}
): Record<string, string> {
  const vars: Record<string, string> = {};
  const { prefix = 'atomix', separator = '-' } = options;

  Object.entries(tokens).forEach(([key, value]) => {
    // Remove $ prefix from SCSS variables
    const cleanKey = key.startsWith('$') ? key.slice(1) : key;

    // Convert underscores to separators
    const normalizedKey = cleanKey.replace(/_/g, separator);

    // Generate variable name
    const varName = `--${prefix}${separator}${normalizedKey}`;

    vars[varName] = String(value);
  });

  return vars;
}

/**
 * Apply CSS variables to an element
 *
 * @param vars - CSS variables to apply
 * @param element - Target element (defaults to document.documentElement)
 */
export function applyCSSVariables(
  vars: Record<string, string | number>,
  element?: HTMLElement
): void {
  if (typeof window === 'undefined') {
    return; // SSR safety
  }

  const target = element || document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    target.style.setProperty(key, String(value));
  });
}

/**
 * Remove CSS variables from an element
 *
 * @param varNames - Variable names to remove
 * @param element - Target element (defaults to document.documentElement)
 */
export function removeCSSVariables(varNames: string[], element?: HTMLElement): void {
  if (typeof window === 'undefined') {
    return; // SSR safety
  }

  const target = element || document.documentElement;
  varNames.forEach(varName => {
    target.style.removeProperty(varName);
  });
}

/**
 * Get CSS variable value from an element
 *
 * @param varName - Variable name to get
 * @param element - Target element (defaults to document.documentElement)
 * @returns Variable value or null if not found
 */
export function getCSSVariable(varName: string, element?: HTMLElement): string | null {
  if (typeof window === 'undefined') {
    return null; // SSR safety
  }

  const target = element || document.documentElement;
  return getComputedStyle(target).getPropertyValue(varName).trim() || null;
}

/**
 * Convert CSS variable object to inline style object
 *
 * @example
 * const vars = { '--atomix-button-bg': '#000' }
 * const style = cssVarsToStyle(vars)
 * // Returns: { '--atomix-button-bg': '#000' } as React.CSSProperties
 */
export function cssVarsToStyle(vars: Record<string, string | number>): React.CSSProperties {
  return Object.entries(vars).reduce((acc, [key, value]) => {
    (acc as any)[key] = typeof value === 'number' ? `${value}px` : value;
    return acc;
  }, {} as React.CSSProperties);
}

/**
 * Merge multiple CSS variable objects
 * Later objects override earlier ones
 */
export function mergeCSSVars(
  ...varObjects: Array<Record<string, string | number> | undefined>
): Record<string, string | number> {
  return varObjects.reduce<Record<string, string | number>>((acc, vars) => {
    if (vars) {
      Object.assign(acc, vars);
    }
    return acc;
  }, {});
}

/**
 * Validate CSS variable name format
 */
export function isValidCSSVariableName(name: string): boolean {
  return /^--[a-z0-9-]+$/.test(name);
}

/**
 * Extract component name from CSS variable name
 *
 * @example
 * extractComponentName('--atomix-button-bg')
 * // Returns: 'button'
 */
export function extractComponentName(varName: string, prefix: string = 'atomix'): string | null {
  const regex = new RegExp(`^--${prefix}-([a-z0-9]+)-`);
  const match = varName.match(regex);
  return match ? (match[1] ?? null) : null;
}
