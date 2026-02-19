import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';
import { BaseComponentProps } from './common';


/**
 * EdgePanel position options
 */
export type EdgePanelPosition = 'start' | 'end' | 'top' | 'bottom';


/**
 * EdgePanel animation mode options
 */
export type EdgePanelMode = 'slide' | 'push' | 'none';


/**
 * EdgePanel component properties
 */
export interface EdgePanelProps extends BaseComponentProps {
  /**
   * Title of the panel
   */
  title?: React.ReactNode;

  /**
   * Position of the panel
   * @default 'start'
   */
  position?: 'start' | 'end' | 'top' | 'bottom';

  /**
   * Animation mode
   * @default 'slide'
   */
  mode?: 'slide' | 'push' | 'none';

  /**
   * Whether the panel is open
   * @default false
   */
  isOpen?: boolean;

  /**
   * Callback when panel open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether to show backdrop
   * @default true
   */
  backdrop?: boolean;

  /**
   * Whether to close panel when clicking backdrop
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether to close panel when pressing Escape key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Glass effect configuration
   * @default undefined
   */
  glass?: boolean | AtomixGlassProps;

  /**
   * Children elements
   */
  children: React.ReactNode;
}
