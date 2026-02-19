import { BaseComponentProps, IconPosition } from './common';
import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';


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

  /**
   * Whether the accordion is open
   */
  isOpen?: boolean;

  /**
   * Whether the accordion is disabled
   */
  disabled?: boolean;

  /**
   * Callback called when the open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * @deprecated Use onOpenChange instead
   * Optional open handler
   */
  onOpen?: () => void;

  /**
   * @deprecated Use onOpenChange instead
   * Optional close handler
   */
  onClose?: () => void;
  /**
   * Glass morphism effect for the accordion
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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
  panelRef?: React.RefObject<HTMLDivElement | null>;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}
