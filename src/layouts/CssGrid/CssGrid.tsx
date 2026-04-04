import React, { forwardRef, HTMLAttributes, ReactNode, CSSProperties } from 'react';

export interface CssGridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered within the CSS Grid
   */
  children: ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Grid template columns definition
   */
  templateColumns?: string;
  
  /**
   * Grid template rows definition
   */
  templateRows?: string;
  
  /**
   * Grid template areas definition
   */
  templateAreas?: string;
  
  /**
   * Auto-placement algorithm
   */
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  
  /**
   * Gap between grid items
   */
  gap?: string | number;
  
  /**
   * Column gap
   */
  columnGap?: string | number;
  
  /**
   * Row gap
   */
  rowGap?: string | number;
  
  /**
   * Justify items (align items along row axis)
   */
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  
  /**
   * Align items (align items along column axis)
   */
  alignItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  
  /**
   * Justify content (grid container alignment along row axis)
   */
  justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  
  /**
   * Align content (grid container alignment along column axis)
   */
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  
  /**
   * Responsive column count
   */
  columns?: number | ResponsiveColumns;
  
  /**
   * Minimum column width with auto-fit/auto-fill
   */
  minColumnWidth?: string;
}

export interface ResponsiveColumns {
  /**
   * Extra small screen columns
   */
  xs?: number;
  
  /**
   * Small screen columns
   */
  sm?: number;
  
  /**
   * Medium screen columns
   */
  md?: number;
  
  /**
   * Large screen columns
   */
  lg?: number;
  
  /**
   * Extra large screen columns
   */
  xl?: number;
  
  /**
   * Extra extra large screen columns
   */
  xxl?: number;
}

/**
 * CssGrid component for modern CSS Grid layouts with advanced features
 * Provides native CSS Grid support with template areas, auto-placement, and responsive design
 *
 * @example
 * ```tsx
 * // Basic grid
 * <CssGrid columns={3} gap="1rem">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </CssGrid>
 * 
 * // Template areas
 * <CssGrid 
 *   templateAreas={`
 *     "header header header"
 *     "sidebar content content"
 *     "footer footer footer"
 *   `}
 *   gap="1rem"
 * >
 *   <div style={{ gridArea: "header" }}>Header</div>
 *   <div style={{ gridArea: "sidebar" }}>Sidebar</div>
 *   <div style={{ gridArea: "content" }}>Content</div>
 *   <div style={{ gridArea: "footer" }}>Footer</div>
 * </CssGrid>
 * ```
 */
export const CssGrid = forwardRef<HTMLDivElement, CssGridProps>(
  ({
    children,
    className = '',
    templateColumns,
    templateRows,
    templateAreas,
    autoFlow,
    gap,
    columnGap,
    rowGap,
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
    columns,
    minColumnWidth,
    style,
    ...props
  }, ref) => {
    const gridStyle: CSSProperties = {
      display: 'grid',
      ...style
    };

    // Set grid template columns based on columns prop
    if (columns) {
      if (typeof columns === 'number') {
        gridStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      } else {
        // Handle responsive columns through CSS classes
      }
    }

    // Apply grid template definitions
    if (templateColumns) gridStyle.gridTemplateColumns = templateColumns;
    if (templateRows) gridStyle.gridTemplateRows = templateRows;
    if (templateAreas) gridStyle.gridTemplateAreas = templateAreas;
    if (autoFlow) gridStyle.gridAutoFlow = autoFlow;

    // Apply gaps
    if (gap) gridStyle.gap = typeof gap === 'number' ? `${gap}px` : gap;
    if (columnGap) gridStyle.columnGap = typeof columnGap === 'number' ? `${columnGap}px` : columnGap;
    if (rowGap) gridStyle.rowGap = typeof rowGap === 'number' ? `${rowGap}px` : rowGap;

    // Apply alignment properties
    if (justifyItems) gridStyle.justifyItems = justifyItems;
    if (alignItems) gridStyle.alignItems = alignItems;
    if (justifyContent) gridStyle.justifyContent = justifyContent;
    if (alignContent) gridStyle.alignContent = alignContent;

    // Handle min column width with auto-fit/auto-fill
    if (minColumnWidth && !templateColumns) {
      gridStyle.gridTemplateColumns = `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`;
    }

    const classes = ['o-css-grid'];
    if (className) classes.push(className);

    return (
      <div 
        ref={ref} 
        className={classes.join(' ')} 
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CssGrid.displayName = 'CssGrid';

export default CssGrid;