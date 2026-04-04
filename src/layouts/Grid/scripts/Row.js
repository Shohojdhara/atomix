/**
 * @file Row - Vanilla JavaScript implementation of the Row component
 * @description Provides DOM manipulation for grid rows with alignment controls
 * @requires ../Grid.css (auto-generated)
 */

/**
 * Row component class for responsive row management
 */
export class Row {
  /**
   * Create a new Row instance
   * @param {Object} options - Row configuration options
   * @param {HTMLElement} options.element - The row element
   * @param {string} [options.className=''] - Additional CSS classes
   * @param {'start'|'end'|'center'|'between'|'around'|'evenly'} [options.justifyContent] - Horizontal alignment
   * @param {'start'|'end'|'center'|'baseline'|'stretch'} [options.alignItems] - Vertical alignment
   * @param {boolean} [options.noGutters=false] - Remove gutters between columns
   */
  constructor(options) {
    this.element = options.element;
    this.options = {
      className: options.className || '',
      justifyContent: options.justifyContent,
      alignItems: options.alignItems,
      noGutters: options.noGutters || false,
      ...options
    };

    this.init();
  }

  /**
   * Initialize the row component
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

    if (this.options.className) {
      classes.push(this.options.className);
    }

    this.element.className = classes.join(' ');
  }

  /**
   * Update row options and refresh styling
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
   * Reset row to default state
   */
  reset() {
    this.options = {
      className: '',
      justifyContent: undefined,
      alignItems: undefined,
      noGutters: false
    };
    this.updateClasses();
  }

  /**
   * Destroy the row instance and clean up
   */
  destroy() {
    this.element.className = '';
    this.element = null;
  }
}

/**
 * Create a row instance for a DOM element
 * @param {HTMLElement} element - The DOM element to initialize as row
 * @param {Object} options - Row configuration options
 * @returns {Row} Row instance
 */
export function createRow(element, options = {}) {
  return new Row({ element, ...options });
}

/**
 * Initialize row components on page load
 * @param {string} [selector='[data-row]'] - CSS selector for row elements
 * @param {Object} [defaultOptions={}] - Default row options
 */
export function initRows(selector = '[data-row]', defaultOptions = {}) {
  const elements = document.querySelectorAll(selector);
  const rows = [];

  elements.forEach(element => {
    const options = {
      ...defaultOptions,
      ...(element.dataset.rowOptions ? JSON.parse(element.dataset.rowOptions) : {})
    };

    rows.push(createRow(element, options));
  });

  return rows;
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initRows();
});