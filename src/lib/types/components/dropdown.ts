import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';
import { ThemeColor, BaseComponentProps } from './common';


/**
 * The trigger method for the dropdown menu
 */
export type DropdownTrigger = 'click' | 'hover';


/**
 * The placement of the dropdown menu
 */
export type DropdownPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'top-start'
  | 'top-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';


/**
 * Dropdown component properties
 */
export interface DropdownProps extends BaseComponentProps {
  /**
   * Dropdown trigger element
   */
  children: ReactNode;

  /**
   * Dropdown menu content
   */
  menu: ReactNode;

  /**
   * How the dropdown is triggered
   */
  trigger?: DropdownTrigger;

  /**
   * The placement of the dropdown menu
   */
  placement?: DropdownPlacement;

  /**
   * Whether the dropdown is initially open
   */
  defaultOpen?: boolean;

  /**
   * Controlled state of the dropdown
   */
  isOpen?: boolean;

  /**
   * Callback when the dropdown open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Offset from the trigger element (in pixels)
   */
  offset?: number;

  /**
   * Whether the dropdown should be closed when clicking outside
   */
  closeOnClickOutside?: boolean;

  /**
   * Whether the dropdown should be closed when pressing escape key
   */
  closeOnEscape?: boolean;

  /**
   * Max height for the dropdown menu
   */
  maxHeight?: string;

  /**
   * Min width for the dropdown menu
   */
  minWidth?: string | number;

  /**
   * Color variant for the dropdown trigger
   */
  variant?: ThemeColor;

  /**
   * Optional ID for the dropdown
   */
  id?: string;

  /**
   * Glass morphism effect for the dropdown menu
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}


/**
 * Dropdown menu item properties
 */
export interface DropdownItemProps extends BaseComponentProps {
  /**
   * Item content
   */
  children: ReactNode;

  /**
   * Item href
   */
  href?: string;

  /**
   * Whether item is active
   */
  active?: boolean;

  /**
   * Whether item is disabled
   */
  disabled?: boolean;

  /**
   * Item icon
   */
  icon?: ReactNode;

  /**
   * Item click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;

  /**
   * Optional custom link component
   */
  LinkComponent?: React.ElementType;
}


/**
 * Dropdown divider properties
 */
export interface DropdownDividerProps {
  /**
   * Additional CSS class names
   */
  className?: string;
}


/**
 * Dropdown header properties
 */
export interface DropdownHeaderProps {
  /**
   * Header content
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}
