import React, { ReactNode } from 'react';
import { Size, Variant, BaseComponentProps } from './common';


export type listvariant = 'dash' | 'number' | 'text';

/**
 * List component properties
 */
export interface ListProps extends BaseComponentProps {
  children?: ReactNode;
  /**
   * List items
   */
  items?: ReactNode[];

  /**
   * List variant
   */
  variant?: listvariant;

  /**
   * List size
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether the list is ordered
   */
  ordered?: boolean;

  /**
   * Whether to display list items inline
   */
  inline?: boolean;
}


/**
 * List group component properties
 */
export interface ListGroupProps extends BaseComponentProps {
  /**
   * List group children
   */
  children?: ReactNode;

  /**
   * List group variant
   */
  variant?: Variant;

  /**
   * List group size
   */
  size?: Size;
}
