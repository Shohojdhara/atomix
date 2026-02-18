import type { ButtonParts } from '../partProps';
import type { SlotProps, ButtonRootSlotProps, ButtonIconSlotProps, ButtonLabelSlotProps, ButtonSpinnerSlotProps } from '../../patterns/slots';
import { Size, Variant, BaseComponentProps } from './common';
import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';
import type { ButtonCSSVariable } from '../../constants/cssVariables';


/**
 * Button component properties
 */
export interface ButtonProps extends BaseComponentProps {
  /**
   * Button contents
   */
  label?: string;

  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Button variant
   * @default 'solid'
   */
  variant?: Variant;

  /**
   * Button size
   * @default 'md'
   */
  size?: Size;

  /**
   * Part-based styling (NEW)
   * Allows styling individual button parts
   */
  parts?: ButtonParts;

  /**
   * CSS variable overrides (NEW)
   * Runtime CSS custom property overrides
   */
  cssVars?: Partial<Record<ButtonCSSVariable, string | number>>;

  /**
   * Slot-based customization (NEW)
   * Complete control over rendering
   */
  slots?: {
    root?: SlotProps<ButtonRootSlotProps>;
    icon?: SlotProps<ButtonIconSlotProps>;
    label?: SlotProps<ButtonLabelSlotProps>;
    spinner?: SlotProps<ButtonSpinnerSlotProps>;
  };

  /**
   * Optional icon (ReactNode)
   */
  icon?: ReactNode;

  /**
   * Icon name from Phosphor Icons (simplified icon prop)
   * When provided, automatically creates an Icon component
   * @example iconName="Rocket" iconSize="sm"
   */
  iconName?: string;

  /**
   * Icon size (used with iconName prop)
   */
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Icon position (start or end)
   */
  iconPosition?: 'start' | 'end';

  /**
   * Icon only button
   */
  iconOnly?: boolean;

  /**
   * Make button fully rounded (pill shape)
   */
  rounded?: boolean;

  /**
   * Full width button (takes 100% of container width)
   */
  fullWidth?: boolean;

  /**
   * Block-level button (full width with block display)
   */
  block?: boolean;

  /**
   * Loading state - shows spinner and disables button
   */
  loading?: boolean;

  /**
   * Custom loading text (replaces label when loading)
   */
  loadingText?: string;

  /**
   * Active state
   */
  active?: boolean;

  /**
   * Selected state
   */
  selected?: boolean;

  /**
   * Button type attribute
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Glass morphism effect for the button
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Optional hover handler
   */
  onHover?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Optional focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;

  /**
   * Optional blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;

  /**
   * ARIA described by reference
   */
  'aria-describedby'?: string;

  /**
   * ARIA expanded state (for toggle buttons)
   */
  'aria-expanded'?: boolean;

  /**
   * ARIA controls reference
   */
  'aria-controls'?: string;

  /**
   * Tab index for keyboard navigation
   */
  tabIndex?: number;

  /**
   * Link URL - when provided, button renders as Next.js Link or anchor element
   * Automatically wraps with Next.js Link if available, otherwise uses anchor
   */
  href?: string;

  /**
   * Link target attribute (used with href)
   */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * Custom style for the button
   */
  style?: React.CSSProperties;
}


/**
 * ButtonGroup component properties
 */
export interface ButtonGroupProps extends BaseComponentProps {
  /**
   * ButtonGroup children (should be Button components)
   */
  children?: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Inline style for the component root element
   */
  style?: React.CSSProperties;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;

  /**
   * ARIA role for the button group
   */
  role?: string;
}
