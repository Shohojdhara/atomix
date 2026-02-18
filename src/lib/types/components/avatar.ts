import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';
import { Size, BaseComponentProps } from './common';


/**
 * Avatar size options
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';


/**
 * Avatar component properties
 */
export interface AvatarProps extends BaseComponentProps {
  /**
   * Avatar image source URL
   */
  src?: string;

  /**
   * Alt text for the avatar image
   */
  alt?: string;

  /**
   * Initials to display when no image is available
   */
  initials?: string;

  /**
   * Icon to display when no image or initials are available
   */
  icon?: ReactNode;

  /**
   * Size variant for the avatar
   */
  size?: AvatarSize;

  /**
   * Whether to make the avatar circular
   */
  circle?: boolean;

  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Glass morphism effect for the avatar
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Custom style for the avatar
   */
  style?: React.CSSProperties;
}


/**
 * Avatar Group component properties
 */
export interface AvatarGroupProps extends BaseComponentProps {
  /**
   * Child Avatar components
   */
  children: ReactNode;

  /**
   * Maximum number of avatars to display before showing a "+X" indicator
   */
  max?: number;

  /**
   * Whether to display avatars in a stacked formation
   */
  stacked?: boolean;

  /**
   * Custom text for the "more" indicator
   */
  moreText?: string;

  /**
   * Glass morphism effect for the avatar group
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}
