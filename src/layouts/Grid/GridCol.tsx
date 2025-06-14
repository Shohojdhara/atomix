import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface GridColProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered within the column
   */
  children: ReactNode;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Number of columns to span at extra small breakpoint (default)
   */
  xs?: number | 'auto';
  /**
   * Number of columns to span at small breakpoint
   */
  sm?: number | 'auto';
  /**
   * Number of columns to span at medium breakpoint
   */
  md?: number | 'auto';
  /**
   * Number of columns to span at large breakpoint
   */
  lg?: number | 'auto';
  /**
   * Number of columns to span at extra large breakpoint
   */
  xl?: number | 'auto';
  /**
   * Number of columns to span at extra extra large breakpoint
   */
  xxl?: number | 'auto';
  /**
   * Offset at extra small breakpoint
   */
  offsetXs?: number;
  /**
   * Offset at small breakpoint
   */
  offsetSm?: number;
  /**
   * Offset at medium breakpoint
   */
  offsetMd?: number;
  /**
   * Offset at large breakpoint
   */
  offsetLg?: number;
  /**
   * Offset at extra large breakpoint
   */
  offsetXl?: number;
  /**
   * Offset at extra extra large breakpoint
   */
  offsetXxl?: number;
}

/**
 * GridCol component for creating columns within a Grid.
 * Uses the CSS grid column classes defined in _objects.grid.scss.
 */
export const GridCol = forwardRef<HTMLDivElement, GridColProps>(
  (
    {
      children,
      className = '',
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      offsetXs,
      offsetSm,
      offsetMd,
      offsetLg,
      offsetXl,
      offsetXxl,
      ...props
    },
    ref
  ) => {
    // If no specific size is provided, use auto class
    const isDefaultAuto = !xs && !sm && !md && !lg && !xl && !xxl;
    const classes = isDefaultAuto ? ['o-grid__col', 'o-grid__col--auto'] : ['o-grid__col'];

    // Add column size classes based on the exact SCSS pattern
    // For xs (default breakpoint), the infix is empty
    if (xs) {
      if (xs === 'auto') {
        classes.push('o-grid__col--auto');
      } else {
        classes.push(`o-grid__col--${xs}`);
      }
    }

    // For other breakpoints, the infix includes the dash
    if (sm) {
      if (sm === 'auto') {
        classes.push('o-grid__col--sm-auto');
      } else {
        classes.push(`o-grid__col--sm-${sm}`);
      }
    }

    if (md) {
      if (md === 'auto') {
        classes.push('o-grid__col--md-auto');
      } else {
        classes.push(`o-grid__col--md-${md}`);
      }
    }

    if (lg) {
      if (lg === 'auto') {
        classes.push('o-grid__col--lg-auto');
      } else {
        classes.push(`o-grid__col--lg-${lg}`);
      }
    }

    if (xl) {
      if (xl === 'auto') {
        classes.push('o-grid__col--xl-auto');
      } else {
        classes.push(`o-grid__col--xl-${xl}`);
      }
    }

    if (xxl) {
      if (xxl === 'auto') {
        classes.push('o-grid__col--xxl-auto');
      } else {
        classes.push(`o-grid__col--xxl-${xxl}`);
      }
    }

    // Add offset classes based on the exact SCSS pattern
    if (offsetXs) classes.push(`o-grid__offset--${offsetXs}`);
    if (offsetSm) classes.push(`o-grid__offset--sm-${offsetSm}`);
    if (offsetMd) classes.push(`o-grid__offset--md-${offsetMd}`);
    if (offsetLg) classes.push(`o-grid__offset--lg-${offsetLg}`);
    if (offsetXl) classes.push(`o-grid__offset--xl-${offsetXl}`);
    if (offsetXxl) classes.push(`o-grid__offset--xxl-${offsetXxl}`);

    if (className) classes.push(className);

    return (
      <div ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </div>
    );
  }
);

GridCol.displayName = 'GridCol';
