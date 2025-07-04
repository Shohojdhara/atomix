import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered within the grid
   */
  children: ReactNode;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Control the horizontal alignment of items
   */
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  /**
   * Control the vertical alignment of items
   */
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  /**
   * No gutters between columns
   */
  noGutters?: boolean;
}

/**
 * Grid component for creating responsive layouts.
 * Uses the CSS grid system defined in _objects.grid.scss.
 *
 * @example
 * ```tsx
 * <Grid>
 *   <GridCol sm={6} md={4} lg={3}>Column content</GridCol>
 *   <GridCol sm={6} md={4} lg={3}>Column content</GridCol>
 *   <GridCol sm={6} md={4} lg={3}>Column content</GridCol>
 * </Grid>
 * ```
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, className = '', justifyContent, alignItems, noGutters, ...props }, ref) => {
    const classes = ['o-grid'];

    if (justifyContent) {
      classes.push(`u-justify-content-${justifyContent}`);
    }

    if (alignItems) {
      classes.push(`u-align-items-${alignItems}`);
    }

    if (noGutters) {
      classes.push('o-grid--no-gutters');
    }

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

Grid.displayName = 'Grid';
export default Grid;