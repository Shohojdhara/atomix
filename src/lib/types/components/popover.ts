import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';


/**
 * Popover component properties
 */
export interface PopoverTriggerProps {
  /**
   * The element that will trigger the popover
   */
  children: ReactNode;

  /**
   * How the popover is triggered
   */
  trigger?: 'hover' | 'click';

  /**
   * Popover reference passed from PopoverContext
   */
  popoverId?: string;
}


export interface PopoverProps {
  /**
   * Content to be displayed in the popover
   */
  content: ReactNode;

  /**
   * The position of the popover relative to the trigger
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';

  /**
   * How the popover is triggered
   */
  trigger?: 'hover' | 'click';

  /**
   * Additional CSS class for the popover
   */
  className?: string;

  /**
   * Inline style for the popover
   */
  style?: React.CSSProperties;

  /**
   * Delay before showing the popover (in milliseconds)
   */
  delay?: number;

  /**
   * Offset from the trigger element (in pixels)
   */
  offset?: number;

  /**
   * Whether the popover should be open initially
   */
  defaultOpen?: boolean;

  /**
   * Controlled state of the popover
   */
  isOpen?: boolean;

  /**
   * Callback when the popover open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Whether to close the popover when clicking outside
   */
  closeOnClickOutside?: boolean;

  /**
   * Whether to close the popover when pressing escape key
   */
  closeOnEscape?: boolean;

  /**
   * Optional ID for the popover
   */
  id?: string;

  /**
   * Children content (removed in favor of using PopoverTrigger)
   */
  children?: ReactNode;

  /**
   * Glass morphism effect for the popover
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}
