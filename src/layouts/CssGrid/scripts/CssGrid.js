/**
 * @file CssGrid - Vanilla JavaScript implementation of the CssGrid component
 * @description Provides DOM manipulation for modern CSS Grid layouts
 * @requires ../CssGrid.css (auto-generated)
 */

/**
 * CSS Grid component class for modern grid layouts
 */
export class CssGrid {
  /**
   * Create a new CssGrid instance
   * @param {Object} options - CSS Grid configuration options
   * @param {HTMLElement} options.element - The container element
   * @param {string} [options.className=''] - Additional CSS classes
   * @param {string} [options.templateColumns] - Grid template columns definition
   * @param {string} [options.templateRows] - Grid template rows definition
   * @param {string} [options.templateAreas] - Grid template areas definition
   * @param {'row'|'column'|'dense'|'row dense'|'column dense'} [options.autoFlow] - Auto-placement algorithm
   * @param {string|number} [options.gap] - Gap between grid items
   * @param {string|number} [options.columnGap] - Column gap
   * @param {string|number} [options.rowGap] - Row gap
   * @param {'start'|'end'|'center'|'stretch'} [options.justifyItems] - Justify items
   * @param {'start'|'end'|'center'|'stretch'|'baseline'} [options.alignItems] - Align items
   * @param {'start'|'end'|'center'|'stretch'|'space-around'|'space-between'|'space-evenly'} [options.justifyContent] - Justify content
   * @param {'start'|'end'|'center'|'stretch'|'space-around'|'space-between'|'space-evenly'} [options.alignContent] - Align content
   * @param {number|Object} [options.columns] - Responsive column count
   * @param {string} [options.minColumnWidth] - Minimum column width
   */
  constructor(options) {
    this.element = options.element;
    this.options = {
      className: options.className || '',
      templateColumns: options.templateColumns,
      templateRows: options.templateRows,
      templateAreas: options.templateAreas,
      autoFlow: options.autoFlow,
      gap: options.gap,
      columnGap: options.columnGap,
      rowGap: options.rowGap,
      justifyItems: options.justifyItems,
      alignItems: options.alignItems,
      justifyContent: options.justifyContent,
      alignContent: options.alignContent,
      columns: options.columns,
      minColumnWidth: options.minColumnWidth,
      ...options
    };

    this.init();
  }

  /**
   * Initialize the CSS Grid component
   */
  init() {
    this.applyStyles();
  }

  /**
   * Apply CSS Grid styles based on options
   */
  applyStyles() {
    const style = this.element.style;
    
    // Reset base styles
    style.display = 'grid';
    
    // Apply template definitions
    if (this.options.templateColumns) {
      style.gridTemplateColumns = this.options.templateColumns;
    }
    
    if (this.options.templateRows) {
      style.gridTemplateRows = this.options.templateRows;
    }
    
    if (this.options.templateAreas) {
      style.gridTemplateAreas = this.options.templateAreas;
    }
    
    if (this.options.autoFlow) {
      style.gridAutoFlow = this.options.autoFlow;
    }
    
    // Apply gaps
    if (this.options.gap !== undefined) {
      style.gap = typeof this.options.gap === 'number' 
        ? `${this.options.gap}px` 
        : this.options.gap;
    }
    
    if (this.options.columnGap !== undefined) {
      style.columnGap = typeof this.options.columnGap === 'number'
        ? `${this.options.columnGap}px`
        : this.options.columnGap;
    }
    
    if (this.options.rowGap !== undefined) {
      style.rowGap = typeof this.options.rowGap === 'number'
        ? `${this.options.rowGap}px`
        : this.options.rowGap;
    }
    
    // Apply alignment properties
    if (this.options.justifyItems) {
      style.justifyItems = this.options.justifyItems;
    }
    
    if (this.options.alignItems) {
      style.alignItems = this.options.alignItems;
    }
    
    if (this.options.justifyContent) {
      style.justifyContent = this.options.justifyContent;
    }
    
    if (this.options.alignContent) {
      style.alignContent = this.options.alignContent;
    }
    
    // Handle column configuration
    if (this.options.columns) {
      if (typeof this.options.columns === 'number') {
        style.gridTemplateColumns = `repeat(${this.options.columns}, 1fr)`;
      }
    }
    
    // Handle min column width with auto-fit/auto-fill
    if (this.options.minColumnWidth && !this.options.templateColumns) {
      style.gridTemplateColumns = `repeat(auto-fit, minmax(${this.options.minColumnWidth}, 1fr))`;
    }
    
    // Add CSS classes
    const classes = ['o-css-grid'];
    if (this.options.className) {
      classes.push(this.options.className);
    }
    
    this.element.className = classes.join(' ');
  }

  /**
   * Update grid options and refresh styling
   * @param {Object} newOptions - New configuration options
   */
  update(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.applyStyles();
  }

  /**
   * Set grid template columns
   * @param {string} templateColumns - Template columns definition
   */
  setTemplateColumns(templateColumns) {
    this.update({ templateColumns });
  }

  /**
   * Set grid template rows
   * @param {string} templateRows - Template rows definition
   */
  setTemplateRows(templateRows) {
    this.update({ templateRows });
  }

  /**
   * Set grid template areas
   * @param {string} templateAreas - Template areas definition
   */
  setTemplateAreas(templateAreas) {
    this.update({ templateAreas });
  }

  /**
   * Set grid gap
   * @param {string|number} gap - Gap value
   */
  setGap(gap) {
    this.update({ gap });
  }

  /**
   * Set number of columns
   * @param {number} columns - Number of columns
   */
  setColumns(columns) {
    this.update({ columns });
  }

  /**
   * Add a child element to the grid
   * @param {HTMLElement} child - Child element to add
   * @param {Object} [options] - Grid item options
   * @param {number} [options.column] - Column position
   * @param {number} [options.row] - Row position
   * @param {string} [options.area] - Grid area name
   */
  addChild(child, options = {}) {
    if (options.column) {
      child.style.gridColumn = String(options.column);
    }
    
    if (options.row) {
      child.style.gridRow = String(options.row);
    }
    
    if (options.area) {
      child.style.gridArea = options.area;
    }
    
    this.element.appendChild(child);
  }

  /**
   * Reset grid to default state
   */
  reset() {
    this.options = {
      className: '',
      templateColumns: undefined,
      templateRows: undefined,
      templateAreas: undefined,
      autoFlow: undefined,
      gap: undefined,
      columnGap: undefined,
      rowGap: undefined,
      justifyItems: undefined,
      alignItems: undefined,
      justifyContent: undefined,
      alignContent: undefined,
      columns: undefined,
      minColumnWidth: undefined
    };
    
    this.applyStyles();
  }

  /**
   * Destroy the grid instance and clean up
   */
  destroy() {
    this.element.style.cssText = '';
    this.element.className = '';
    this.element = null;
  }
}

/**
 * Create a CSS Grid instance for a DOM element
 * @param {HTMLElement} element - The DOM element to initialize as CSS Grid
 * @param {Object} options - CSS Grid configuration options
 * @returns {CssGrid} CSS Grid instance
 */
export function createCssGrid(element, options = {}) {
  return new CssGrid({ element, ...options });
}

/**
 * Initialize CSS Grid components on page load
 * @param {string} [selector='[data-css-grid]'] - CSS selector for CSS Grid elements
 * @param {Object} [defaultOptions={}] - Default CSS Grid options
 */
export function initCssGrids(selector = '[data-css-grid]', defaultOptions = {}) {
  const elements = document.querySelectorAll(selector);
  const grids = [];

  elements.forEach(element => {
    const options = {
      ...defaultOptions,
      ...(element.dataset.cssGridOptions ? JSON.parse(element.dataset.cssGridOptions) : {})
    };

    grids.push(createCssGrid(element, options));
  });

  return grids;
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initCssGrids();
});