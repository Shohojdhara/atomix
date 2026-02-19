import React, { ReactNode } from 'react';


/**
 * Common component size options
 */
export type Size = 'sm' | 'md' | 'lg';


// ============================================================================
// THEME SYSTEM TYPES
// ============================================================================

/**
 * Available theme variants in the Shaj theme system
 */
export type ThemeName = string;


// ============================================================================
// END THEME SYSTEM TYPES
// ============================================================================

/**
 * Theme color variants
 */
export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'invert'
  | 'brand'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';


/**
 * Component variant including theme colors and outline variants
 */
export type Variant = ThemeColor | `outline-${ThemeColor}` | 'link';


/**
 * Base component properties interface
 */
export interface BaseComponentProps {
  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Component disabled state
   */
  disabled?: boolean;

  /**
   * Component children
   */
  children?: ReactNode;

  /**
   * Inline style for the component root element
   */
  style?: React.CSSProperties;
}


/**
 * CSS class state modifiers
 */
export type StateModifier =
  | 'is-open'
  | 'is-closed'
  | 'is-active'
  | 'is-disabled'
  | 'is-loading'
  | 'is-selected'
  | 'is-animating'
  | 'is-hovered';


/**
 * Icon position options
 */
export type IconPosition = 'left' | 'right';


/**
 * Icon size options
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';


/**
 * Icon weight/style options
 */
export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';


/**
 * Phosphor icon type - excludes internal Phosphor exports
 */
export type PhosphorIconsType = Exclude<
  keyof typeof import('@phosphor-icons/react'),
  'IconContext' | 'IconBase' | 'createIcon' | 'default' | 'SSR'
>;
