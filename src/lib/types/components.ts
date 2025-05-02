import { ReactNode } from 'react';

/**
 * Common component size options
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Theme color variants
 */
export type ThemeColor = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

/**
 * Component variant including theme colors and outline variants
 */
export type Variant = 
  | ThemeColor 
  | `outline-${ThemeColor}`
  | 'link';

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
 * Button component properties
 */
export interface ButtonProps extends BaseComponentProps {
  /**
   * Button contents
   */
  label: string;
  
  /**
   * Optional click handler
   */
  onClick?: () => void;
  
  /**
   * Button variant
   */
  variant?: Variant;
  
  /**
   * Button size
   */
  size?: Size;
  
  /**
   * Optional icon
   */
  icon?: ReactNode;
  
  /**
   * Icon only button
   */
  iconOnly?: boolean;
  
  /**
   * Make button fully rounded (pill shape)
   */
  rounded?: boolean;
}

/**
 * Badge component properties
 */
export interface BadgeProps extends BaseComponentProps {
  /**
   * Badge text content
   */
  label: string;
  
  /**
   * Badge color variant
   */
  variant?: ThemeColor;
  
  /**
   * Badge size
   */
  size?: Size;
  
  /**
   * Optional icon
   */
  icon?: ReactNode;
}

/**
 * Accordion component properties
 */
export interface AccordionProps extends BaseComponentProps {
  /**
   * Title of the accordion
   */
  title: string;
  
  /**
   * Content to be shown when accordion is expanded
   */
  children: ReactNode;
  
  /**
   * Whether the accordion is initially open
   */
  defaultOpen?: boolean;
  
  /**
   * Position of the icon (right or left)
   */
  iconPosition?: IconPosition;
  
  /**
   * Custom icon for the accordion
   */
  icon?: ReactNode;
}

/**
 * Accordion state
 */
export interface AccordionState {
  /**
   * Whether the accordion is open
   */
  isOpen: boolean;
  
  /**
   * Current panel height CSS value
   */
  panelHeight: string;
}

/**
 * Common element ref types
 */
export interface ElementRefs {
  panelRef?: React.RefObject<HTMLDivElement>;
  contentRef?: React.RefObject<HTMLDivElement>;
  buttonRef?: React.RefObject<HTMLButtonElement>;
} 