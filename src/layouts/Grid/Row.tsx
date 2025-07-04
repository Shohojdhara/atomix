import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered within the row
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
 * Row component for creating rows within a Grid or Container.
 * Uses the CSS row classes defined in _objects.grid.scss.
 *
 * @example
 * ```tsx
 * <Container>
 *   <Row justifyContent="between" alignItems="center">
 *     <GridCol md={6}>Column content</GridCol>
 *     <GridCol md={6}>Column content</GridCol>
 *   </Row>
 * </Container>
 * ```
 */
export const Row = forwardRef<HTMLDivElement, RowProps>(
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

Row.displayName = 'Row';

export default Row;