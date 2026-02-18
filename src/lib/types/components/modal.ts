import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';


/**
 * Modal component props
 */
export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Whether the modal is open
   */
  isOpen?: boolean;

  /**
   * Callback when the modal's open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Callback when the modal is opened
   */
  onOpen?: () => void;

  /**
   * Callback when the modal is closed
   */
  onClose?: () => void;

  /**
   * Modal title displayed in the header
   */
  title?: React.ReactNode;

  /**
   * Modal subtitle displayed below the title
   */
  subtitle?: React.ReactNode;

  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Whether to close when backdrop is clicked
   */
  backdrop?: boolean;

  /**
   * Whether to close when the escape key is pressed
   */
  keyboard?: boolean;

  /**
   * Whether to show the close button
   */
  closeButton?: boolean;

  /**
   * Content for the modal footer
   */
  footer?: React.ReactNode;

  /**
   * Glass morphism effect for the modal
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}
