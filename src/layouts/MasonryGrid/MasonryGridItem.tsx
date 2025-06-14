import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface MasonryGridItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered within the masonry grid item
   */
  children: ReactNode;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * MasonryGridItem component for creating items within a MasonryGrid.
 * Each item will be positioned optimally by the parent MasonryGrid component.
 *
 * @example
 * ```tsx
 * <MasonryGrid>
 *   <MasonryGridItem>Item 1</MasonryGridItem>
 *   <MasonryGridItem>Item 2</MasonryGridItem>
 * </MasonryGrid>
 * ```
 */
export const MasonryGridItem = forwardRef<HTMLDivElement, MasonryGridItemProps>(
  ({ children, className = '', ...props }, ref) => {
    const classes = ['o-masonry-grid__item-inner'];

    if (className) {
      classes.push(className);
    }

    return (
      <div ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </div>
    );
  }
);

MasonryGridItem.displayName = 'MasonryGridItem';
