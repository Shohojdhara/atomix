/**
 * @file GridCol - Vanilla JavaScript implementation of the GridCol component
 * @description Provides DOM manipulation for grid columns with responsive sizing and offset controls
 * @requires ../Grid.css (auto-generated)
 */

/**
 * Grid column component class for responsive column management
 */
export class GridCol {
  /**
   * Create a new GridCol instance
   * @param {Object} options - Grid column configuration options
   * @param {HTMLElement} options.element - The column element
   * @param {string} [options.className=''] - Additional CSS classes
   * @param {number|'auto'|boolean} [options.xs] - Extra small breakpoint size
   * @param {number|'auto'|boolean} [options.sm] - Small breakpoint size
   * @param {number|'auto'|boolean} [options.md] - Medium breakpoint size
   * @param {number|'auto'|boolean} [options.lg] - Large breakpoint size
   * @param {number|'auto'|boolean} [options.xl] - Extra large breakpoint size
   * @param {number|'auto'|boolean} [options.xxl] - Extra extra large breakpoint size
   * @param {number} [options.offsetXs] - Extra small offset
   * @param {number} [options.offsetSm] - Small offset
   * @param {number} [options.offsetMd] - Medium offset
   * @param {number} [options.offsetLg] - Large offset
   * @param {number} [options.offsetXl] - Extra large offset
   * @param {number} [options.offsetXxl] - Extra extra large offset
   * @param {boolean} [options.grow] - Flex grow property
   * @param {boolean} [options.shrink] - Flex shrink property
   * @param {string} [options.basis] - Flex basis property
   * @param {'start'|'end'|'center'|'baseline'|'stretch'} [options.align] - Column alignment
   */
  constructor(options) {
    this.element = options.element;
    this.options = {
      className: options.className || '',
      xs: options.xs,
      sm: options.sm,
      md: options.md,
      lg: options.lg,
      xl: options.xl,
      xxl: options.xxl,
      offsetXs: options.offsetXs,
      offsetSm: options.offsetSm,
      offsetMd: options.offsetMd,
      offsetLg: options.offsetLg,
      offsetXl: options.offsetXl,
      offsetXxl: options.offsetXxl,
      grow: options.grow,
      shrink: options.shrink,
      basis: options.basis,
      align: options.align,
      ...options
    };

    this.init();
  }

  /**
   * Initialize the grid column component
   */
  init() {
    this.updateClasses();
  }

  /**
   * Process responsive column sizing prop
   * @param {number|'auto'|boolean} value - The prop value
   * @param {string} breakpoint - The breakpoint name
   * @returns {string|null} CSS class or null
   */
  processResponsiveProp(value, breakpoint) {
    if (value === undefined || value === false) {
      return null;
    }

    // Handle boolean values
    if (value === true) {
      return breakpoint === 'xs' ? 'o-grid__col--auto' : `o-grid__col--${breakpoint}-auto`;
    }

    // Handle string/number values
    if (breakpoint === 'xs') {
      return value === 'auto' ? 'o-grid__col--auto' : `o-grid__col--${value}`;
    } else {
      return value === 'auto' ? `o-grid__col--${breakpoint}-auto` : `o-grid__col--${breakpoint}-${value}`;
    }
  }

  /**
   * Update CSS classes based on current options
   */
  updateClasses() {
    const isDefaultAuto = !this.options.xs && !this.options.sm && !this.options.md && 
                         !this.options.lg && !this.options.xl && !this.options.xxl;
    
    const classes = isDefaultAuto ? ['o-grid__col', 'o-grid__col--auto'] : ['o-grid__col'];

    // Add column size classes
    const sizeClasses = [
      this.processResponsiveProp(this.options.xs, 'xs'),
      this.processResponsiveProp(this.options.sm, 'sm'),
      this.processResponsiveProp(this.options.md, 'md'),
      this.processResponsiveProp(this.options.lg, 'lg'),
      this.processResponsiveProp(this.options.xl, 'xl'),
      this.processResponsiveProp(this.options.xxl, 'xxl')
    ];

    sizeClasses.forEach(cls => {
      if (cls) classes.push(cls);
    });

    // Add offset classes
    if (this.options.offsetXs) classes.push(`o-grid__offset--${this.options.offsetXs}`);
    if (this.options.offsetSm) classes.push(`o-grid__offset--sm-${this.options.offsetSm}`);
    if (this.options.offsetMd) classes.push(`o-grid__offset--md-${this.options.offsetMd}`);
    if (this.options.offsetLg) classes.push(`o-grid__offset--lg-${this.options.offsetLg}`);
    if (this.options.offsetXl) classes.push(`o-grid__offset--xl-${this.options.offsetXl}`);
    if (this.options.offsetXxl) classes.push(`o-grid__offset--xxl-${this.options.offsetXxl}`);

    // Add flex properties
    if (this.options.grow !== undefined) {
      classes.push(this.options.grow ? 'u-flex-grow-1' : 'u-flex-grow-0');
    }

    if (this.options.shrink !== undefined) {
      classes.push(this.options.shrink ? 'u-flex-shrink-1' : 'u-flex-shrink-0');
    }

    if (this.options.basis) {
      classes.push(`u-flex-basis-${this.options.basis}`);
    }

    if (this.options.align) {
      classes.push(`u-align-self-${this.options.align}`);
    }

    if (this.options.className) {
      classes.push(this.options.className);
    }

    this.element.className = classes.join(' ');
  }

  /**
   * Update column options and refresh styling
   * @param {Object} newOptions - New configuration options
   */
  update(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.updateClasses();
  }

  /**
   * Set column size for a specific breakpoint
   * @param {string} breakpoint - Breakpoint name (xs, sm, md, lg, xl, xxl)
   * @param {number|'auto'|boolean} size - Column size
   */
  setSize(breakpoint, size) {
    this.update({ [breakpoint]: size });
  }

  /**
   * Set column offset for a specific breakpoint
   * @param {string} breakpoint - Breakpoint name (xs, sm, md, lg, xl, xxl)
   * @param {number} offset - Offset value
   */
  setOffset(breakpoint, offset) {
    this.update({ [`offset${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`]: offset });
  }

  /**
   * Set flex grow property
   * @param {boolean} grow - Whether to grow
   */
  setGrow(grow) {
    this.update({ grow });
  }

  /**
   * Set flex shrink property
   * @param {boolean} shrink - Whether to shrink
   */
  setShrink(shrink) {
    this.update({ shrink });
  }

  /**
   * Set flex basis property
   * @param {string} basis - Flex basis value
   */
  setBasis(basis) {
    this.update({ basis });
  }

  /**
   * Set column alignment
   * @param {'start'|'end'|'center'|'baseline'|'stretch'} align - Alignment value
   */
  setAlign(align) {
    this.update({ align });
  }

  /**
   * Reset column to default state
   */
  reset() {
    this.options = {
      className: '',
      xs: undefined,
      sm: undefined,
      md: undefined,
      lg: undefined,
      xl: undefined,
      xxl: undefined,
      offsetXs: undefined,
      offsetSm: undefined,
      offsetMd: undefined,
      offsetLg: undefined,
      offsetXl: undefined,
      offsetXxl: undefined,
      grow: undefined,
      shrink: undefined,
      basis: undefined,
      align: undefined
    };
    this.updateClasses();
  }

  /**
   * Destroy the column instance and clean up
   */
  destroy() {
    this.element.className = '';
    this.element = null;
  }
}

/**
 * Create a grid column instance for a DOM element
 * @param {HTMLElement} element - The DOM element to initialize as grid column
 * @param {Object} options - Grid column configuration options
 * @returns {GridCol} Grid column instance
 */
export function createGridCol(element, options = {}) {
  return new GridCol({ element, ...options });
}

/**
 * Initialize grid columns on page load
 * @param {string} [selector='[data-grid-col]'] - CSS selector for grid column elements
 * @param {Object} [defaultOptions={}] - Default grid column options
 */
export function initGridCols(selector = '[data-grid-col]', defaultOptions = {}) {
  const elements = document.querySelectorAll(selector);
  const columns = [];

  elements.forEach(element => {
    const options = {
      ...defaultOptions,
      ...(element.dataset.gridColOptions ? JSON.parse(element.dataset.gridColOptions) : {})
    };

    columns.push(createGridCol(element, options));
  });

  return columns;
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initGridCols();
});