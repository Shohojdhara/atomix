/**
 * @file Grid - Vanilla JavaScript implementation of the Grid component
 * @description Provides DOM manipulation for grid layouts with responsive alignment controls
 * @requires ../Grid.css (auto-generated)
 */

/**
 * Grid component class for responsive layout management
 */
export class Grid {
  /**
   * Create a new Grid instance
   * @param {Object} options - Grid configuration options
   * @param {HTMLElement} options.element - The container element
   * @param {string} [options.className=''] - Additional CSS classes
   * @param {'start'|'end'|'center'|'between'|'around'|'evenly'} [options.justifyContent] - Horizontal alignment
   * @param {'start'|'end'|'center'|'baseline'|'stretch'} [options.alignItems] - Vertical alignment
   * @param {boolean} [options.noGutters=false] - Remove gutters between columns
   * @param {'row'|'column'|'row-reverse'|'column-reverse'} [options.direction] - Flex direction
   * @param {'nowrap'|'wrap'|'wrap-reverse'} [options.wrap] - Flex wrap behavior
   */
  constructor(options) {
    this.element = options.element;
    this.options = {
      className: options.className || '',
      justifyContent: options.justifyContent,
      alignItems: options.alignItems,
      noGutters: options.noGutters || false,
      direction: options.direction,
      wrap: options.wrap,
      ...options
    };

    this.init();
  }

  /**
   * Initialize the grid component
   */
  init() {
    this.updateClasses();
  }

  /**
   * Update CSS classes based on current options
   */
  updateClasses() {
    const classes = ['o-grid'];

    if (this.options.justifyContent) {
      classes.push(`u-justify-content-${this.options.justifyContent}`);
    }

    if (this.options.alignItems) {
      classes.push(`u-align-items-${this.options.alignItems}`);
    }

    if (this.options.noGutters) {
      classes.push('o-grid--no-gutters');
    }

    if (this.options.direction) {
      classes.push(`u-flex-direction-${this.options.direction}`);
    }

    if (this.options.wrap) {
      classes.push(`u-flex-wrap-${this.options.wrap}`);
    }

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
    this.updateClasses();
  }

  /**
   * Set horizontal alignment
   * @param {'start'|'end'|'center'|'between'|'around'|'evenly'} alignment - Horizontal alignment
   */
  setJustifyContent(alignment) {
    this.update({ justifyContent: alignment });
  }

  /**
   * Set vertical alignment
   * @param {'start'|'end'|'center'|'baseline'|'stretch'} alignment - Vertical alignment
   */
  setAlignItems(alignment) {
    this.update({ alignItems: alignment });
  }

  /**
   * Toggle gutters
   * @param {boolean} noGutters - Whether to remove gutters
   */
  setNoGutters(noGutters) {
    this.update({ noGutters });
  }

  /**
   * Set flex direction
   * @param {'row'|'column'|'row-reverse'|'column-reverse'} direction - Flex direction
   */
  setDirection(direction) {
    this.update({ direction });
  }

  /**
   * Set flex wrap behavior
   * @param {'nowrap'|'wrap'|'wrap-reverse'} wrap - Wrap behavior
   */
  setWrap(wrap) {
    this.update({ wrap });
  }

  /**
   * Reset grid to default state
   */
  reset() {
    this.options = {
      className: '',
      justifyContent: undefined,
      alignItems: undefined,
      noGutters: false,
      direction: undefined,
      wrap: undefined
    };
    this.updateClasses();
  }

  /**
   * Destroy the grid instance and clean up
   */
  destroy() {
    this.element.className = '';
    this.element = null;
  }
}

/**
 * Create a grid instance for a DOM element
 * @param {HTMLElement} element - The DOM element to initialize as grid
 * @param {Object} options - Grid configuration options
 * @returns {Grid} Grid instance
 */
export function createGrid(element, options = {}) {
  return new Grid({ element, ...options });
}

/**
 * Initialize grid components on page load
 * @param {string} [selector='[data-grid]'] - CSS selector for grid elements
 * @param {Object} [defaultOptions={}] - Default grid options
 */
export function initGrids(selector = '[data-grid]', defaultOptions = {}) {
  const elements = document.querySelectorAll(selector);
  const grids = [];

  elements.forEach(element => {
    const options = {
      ...defaultOptions,
      ...(element.dataset.gridOptions ? JSON.parse(element.dataset.gridOptions) : {})
    };

    grids.push(createGrid(element, options));
  });

  return grids;
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initGrids();
});