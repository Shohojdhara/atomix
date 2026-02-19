import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';


/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  /**
   * Item label text
   */
  label: string;

  /**
   * Optional URL for the breadcrumb item
   */
  href?: string;

  /**
   * Whether this item is active/current
   */
  active?: boolean;

  /**
   * Icon name from Phosphor Icons or ReactNode
   */
  icon?: string | ReactNode;

  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Custom style for the breadcrumb item
   */
  style?: React.CSSProperties;

  /**
   * Additional className
   */
  className?: string;
}


/**
 * Breadcrumb options interface (for vanilla JS)
 */
export interface BreadcrumbOptions {
  /**
   * Array of breadcrumb items
   */
  items?: BreadcrumbItem[];

  /**
   * Divider character or string between items
   */
  divider?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Accessible label for the breadcrumb navigation
   */
  'aria-label'?: string;

  /**
   * Glass morphism effect for the breadcrumb
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}


/**
 * Breadcrumb instance interface
 */
export interface BreadcrumbInstance {
  /**
   * Update the breadcrumb with new options
   */
  update: (options: Partial<BreadcrumbOptions>) => void;

  /**
   * Destroy the breadcrumb component
   */
  destroy: () => void;
}
