/**
 * Component Customization Hook
 *
 * Merges theme-level component overrides with component-level props
 * for comprehensive customization support.
 */

import { useMemo } from 'react';
import { useTheme } from '../theme/runtime/useTheme';
import type { ComponentPartsMap } from '../types/partProps';
import type { ComponentCSSVariables } from '../constants/cssVariables';
import { mergeCSSVars } from '../theme/adapters/cssVariableMapper';
import { mergePartStyles } from '../types/partProps';
import { mergeClassNames } from '../utils/componentUtils';

/**
 * Component names that support customization
 */
export type ComponentName = keyof ComponentPartsMap;

/**
 * Props for a customizable component
 */
export interface CustomizableComponentProps<T extends ComponentName> {
  /** CSS variable overrides */
  cssVars?: T extends keyof ComponentCSSVariables
    ? Partial<Record<ComponentCSSVariables[T], string | number>>
    : Record<string, string | number>;
  /** Part-based styling */
  parts?: ComponentPartsMap[T];
  /** Additional className */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Result of component customization
 */
export interface ComponentCustomization<T extends ComponentName> {
  /** Merged CSS variables */
  cssVars: Record<string, string | number>;
  /** Merged part styles */
  parts: ComponentPartsMap[T];
  /** Merged className */
  className: string;
  /** Merged inline styles */
  style: React.CSSProperties;
  /** CSS variable style object for inline application */
  cssVarStyle: React.CSSProperties;
}

/**
 * Hook to merge theme overrides with component props
 *
 * @example
 * function Button(props: ButtonProps) {
 *   const customization = useComponentCustomization('Button', props);
 *
 *   return (
 *     <button
 *       className={customization.className}
 *       style={customization.style}
 *     >
 *       {props.children}
 *     </button>
 *   );
 * }
 */
export function useComponentCustomization<T extends ComponentName>(
  component: T,
  props: CustomizableComponentProps<T>
): ComponentCustomization<T> {
  const { theme } = useTheme();

  // Merge CSS variables
  const cssVars = useMemo(() => {
    const themeVars = (theme as any)?.components?.[component]?.cssVars || {};
    const propVars = props.cssVars || {};
    return mergeCSSVars(themeVars, propVars as any);
  }, [theme, component, props.cssVars]);

  // Merge parts
  const parts = useMemo(() => {
    const themeParts = (theme as any)?.components?.[component]?.parts || {};
    const propParts = (props.parts || {}) as Record<string, any>;

    const merged: Record<string, any> = {};
    const allPartNames = new Set([...Object.keys(themeParts), ...Object.keys(propParts)]);

    allPartNames.forEach(partName => {
      merged[partName] = mergePartStyles(themeParts[partName] as any, propParts[partName] as any);
    });

    return merged as ComponentPartsMap[T];
  }, [theme, component, props.parts]);

  // Merge className
  const className = useMemo(() => {
    const themeClassName = (theme as any)?.components?.[component]?.className || '';
    const propClassName = props.className || '';
    return [themeClassName, propClassName].filter(Boolean).join(' ');
  }, [theme, component, props.className]);

  // Merge styles
  const style = useMemo(() => {
    return { ...props.style };
  }, [props.style]);

  // Convert CSS vars to style object
  const cssVarStyle = useMemo(() => {
    return Object.entries(cssVars).reduce((acc, [key, value]) => {
      (acc as any)[key] = typeof value === 'number' ? `${value}px` : value;
      return acc;
    }, {} as React.CSSProperties);
  }, [cssVars]);

  return {
    cssVars,
    parts,
    className,
    style,
    cssVarStyle,
  };
}

/**
 * Hook to get default props from theme
 */
export function useComponentDefaultProps<T extends ComponentName>(
  component: T
): Record<string, any> {
  const { theme } = useTheme();

  return useMemo(() => {
    return (theme as any)?.components?.[component]?.defaultProps || {};
  }, [theme, component]);
}

/**
 * Hook to merge default props with provided props
 */
export function useMergedProps<T extends Record<string, any>>(
  defaultProps: T,
  props: Partial<T>
): T {
  return useMemo(() => {
    return { ...defaultProps, ...props };
  }, [defaultProps, props]);
}

/**
 * Utility to apply CSS variables to style object
 */
export function applyCSSVarsToStyle(
  cssVars: Record<string, string | number>,
  baseStyle?: React.CSSProperties
): React.CSSProperties {
  const cssVarStyle = Object.entries(cssVars).reduce((acc, [key, value]) => {
    (acc as any)[key] = typeof value === 'number' ? `${value}px` : value;
    return acc;
  }, {} as React.CSSProperties);

  return { ...cssVarStyle, ...baseStyle };
}
