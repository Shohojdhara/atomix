import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';
import { ThemeColor, BaseComponentProps } from './common';


/**
 * Callout component properties
 */
export interface CalloutProps extends BaseComponentProps {
  /**
   * Callout title
   */
  title?: ReactNode;

  /**
   * Callout content
   */
  children?: ReactNode;

  /**
   * Optional icon
   */
  icon?: ReactNode;

  /**
   * Callout variant
   */
  variant?: ThemeColor;

  /**
   * Optional close handler
   */
  onClose?: () => void;

  /**
   * Optional action buttons
   */
  actions?: ReactNode;

  /**
   * Display in compact (one-line) mode
   */
  compact?: boolean;

  /**
   * Display as toast notification
   */
  isToast?: boolean;

  /**
   * Glass morphism effect for the callout
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Custom style for the callout
   */
  style?: React.CSSProperties;
}
