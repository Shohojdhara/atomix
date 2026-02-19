import { Size, ThemeColor, BaseComponentProps } from './common';
import type { BadgeCSSVariable } from '../../constants/cssVariables';
import React, { ReactNode } from 'react';
import type { BadgeParts } from '../partProps';
import { AtomixGlassProps } from './atomixGlass';
import type { SlotProps, BadgeRootSlotProps, BadgeIconSlotProps, BadgeLabelSlotProps } from '../../patterns/slots';


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
   * @default 'primary'
   */
  variant?: ThemeColor;

  /**
   * Badge size
   * @default 'md'
   */
  size?: Size;

  /**
   * Optional icon
   */
  icon?: ReactNode;

  /**
   * Callback for dismissible badges (shows close button when provided)
   */
  onRemove?: () => void;

  /**
   * Accessible label for the badge
   */
  'aria-label'?: string;

  /**
   * Glass morphism effect for the badge
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Custom style for the badge
   */
  style?: React.CSSProperties;

  /**
   * Part-based styling for granular customization
   * @example
   * parts={{
   *   root: { className: 'custom-badge', style: { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' } },
   *   icon: { style: { fontSize: '18px' } },
   *   label: { className: 'badge-label' }
   * }}
   */
  parts?: BadgeParts;

  /**
   * CSS variable overrides for runtime customization
   * @example
   * cssVars={{
   *   '--atomix-badge-bg': '#FF0000',
   *   '--atomix-badge-border-radius': '20px'
   * }}
   */
  cssVars?: Partial<Record<BadgeCSSVariable, string | number>>;

  /**
   * Slot-based customization for complete control
   * @example
   * slots={{
   *   root: { render: (props) => <motion.span {...props} /> },
   *   icon: { component: CustomIcon }
   * }}
   */
  slots?: {
    root?: SlotProps<BadgeRootSlotProps>;
    icon?: SlotProps<BadgeIconSlotProps>;
    label?: SlotProps<BadgeLabelSlotProps>;
  };
}
