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
  xs?: number | 'auto' | boolean;
  /**
   * Number of columns to span at small breakpoint
   */
  sm?: number | 'auto' | boolean;
  /**
   * Number of columns to span at medium breakpoint
   */
  md?: number | 'auto' | boolean;
  /**
   * Number of columns to span at large breakpoint
   */
  lg?: number | 'auto' | boolean;
  /**
   * Number of columns to span at extra large breakpoint
   */
  xl?: number | 'auto' | boolean;
  /**
   * Number of columns to span at extra extra large breakpoint
   */
  xxl?: number | 'auto' | boolean;
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
  /**
   * Flex grow property
   */
  grow?: boolean;
  /**
   * Flex shrink property
   */
  shrink?: boolean;
  /**
   * Flex basis property
   */
  basis?: string;
  /**
   * Alignment of the column
   */
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
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
      grow,
      shrink,
      basis,
      align,
      ...props
    },
    ref
  ) => {
    // If no specific size is provided, use auto class
    const isDefaultAuto = !xs && !sm && !md && !lg && !xl && !xxl;
    const classes = isDefaultAuto ? ['o-grid__col', 'o-grid__col--auto'] : ['o-grid__col'];

    // Helper function to process responsive props
    const processResponsiveProp = (
      value: number | 'auto' | boolean | undefined,
      breakpoint: string
    ) => {
      if (value === undefined) return;

      // Handle boolean values
      if (value === true) {
        classes.push(breakpoint === 'xs' ? 'o-grid__col--auto' : `o-grid__col--${breakpoint}-auto`);
        return;
      }

      if (value === false) {
        // False means don't apply any class for this breakpoint
        return;
      }

      // Handle string/number values
      if (breakpoint === 'xs') {
        if (value === 'auto') {
          classes.push('o-grid__col--auto');
        } else {
          classes.push(`o-grid__col--${value}`);
        }
      } else {
        if (value === 'auto') {
          classes.push(`o-grid__col--${breakpoint}-auto`);
        } else {
          classes.push(`o-grid__col--${breakpoint}-${value}`);
        }
      }
    };

    // Add column size classes based on the exact SCSS pattern
    processResponsiveProp(xs, 'xs');
    processResponsiveProp(sm, 'sm');
    processResponsiveProp(md, 'md');
    processResponsiveProp(lg, 'lg');
    processResponsiveProp(xl, 'xl');
    processResponsiveProp(xxl, 'xxl');

    // Add offset classes based on the exact SCSS pattern
    if (offsetXs) classes.push(`o-grid__offset--${offsetXs}`);
    if (offsetSm) classes.push(`o-grid__offset--sm-${offsetSm}`);
    if (offsetMd) classes.push(`o-grid__offset--md-${offsetMd}`);
    if (offsetLg) classes.push(`o-grid__offset--lg-${offsetLg}`);
    if (offsetXl) classes.push(`o-grid__offset--xl-${offsetXl}`);
    if (offsetXxl) classes.push(`o-grid__offset--xxl-${offsetXxl}`);

    // Add flex properties
    if (grow !== undefined) {
      classes.push(grow ? 'u-flex-grow-1' : 'u-flex-grow-0');
    }

    if (shrink !== undefined) {
      classes.push(shrink ? 'u-flex-shrink-1' : 'u-flex-shrink-0');
    }

    if (basis) {
      classes.push(`u-flex-basis-${basis}`);
    }

    if (align) {
      classes.push(`u-align-self-${align}`);
    }

    if (className) classes.push(className);

    return (
      <div ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </div>
    );
  }
);

GridCol.displayName = 'GridCol';
export default GridCol;
