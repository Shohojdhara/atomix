/**
 * @file Container - Vanilla JavaScript implementation of the Container component
 * @description Provides DOM manipulation for responsive container layouts
 * @requires ../Grid.css (auto-generated)
 */

/**
 * Container component class for responsive content constraints
 */
export class Container {
  /**
   * Create a new Container instance
   * @param {Object} options - Container configuration options
   * @param {HTMLElement} options.element - The container element
   * @param {string} [options.className=''] - Additional CSS classes
   * @param {'fluid'|'sm'|'md'|'lg'|'xl'|'xxl'} [options.size] - Container size
   * @param {boolean} [options.noPadding=false] - Remove container padding
   */
  constructor(options) {
    this.element = options.element;
    this.options = {
      className: options.className || '',
      size: options.size,
      noPadding: options.noPadding || false,
      ...options
    };

    this.init();
  }

  /**
   * Initialize the container component
   */
  init() {
    this.updateClasses();
  }

  /**
   * Update CSS classes based on current options
   */
  updateClasses() {
    const classes = ['o-container'];

    if (this.options.size) {
      classes.push(`o-container--${this.options.size}`);
    }

    if (this.options.noPadding) {
      classes.push('o-container--no-padding');
    }

    if (this.options.className) {
      classes.push(this.options.className);
    }

    this.element.className = classes.join(' ');
  }

  /**
   * Update container options and refresh styling
   * @param {Object} newOptions - New configuration options
   */
  update(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.updateClasses();
  }

  /**
   * Set container size
   * @param {'fluid'|'sm'|'md'|'lg'|'xl'|'xxl'} size - Container size
   */
  setSize(size) {
    this.update({ size });
  }

  /**
   * Toggle padding
   * @param {boolean} noPadding - Whether to remove padding
   */
  setNoPadding(noPadding) {
    this.update({ noPadding });
  }

  /**
   * Reset container to default state
   */
  reset() {
    this.options = {
      className: '',
      size: undefined,
      noPadding: false
    };
    this.updateClasses();
  }

  /**
   * Destroy the container instance and clean up
   */
  destroy() {
    this.element.className = '';
    this.element = null;
  }
}

/**
 * Create a container instance for a DOM element
 * @param {HTMLElement} element - The DOM element to initialize as container
 * @param {Object} options - Container configuration options
 * @returns {Container} Container instance
 */
export function createContainer(element, options = {}) {
  return new Container({ element, ...options });
}

/**
 * Initialize container components on page load
 * @param {string} [selector='[data-container]'] - CSS selector for container elements
 * @param {Object} [defaultOptions={}] - Default container options
 */
export function initContainers(selector = '[data-container]', defaultOptions = {}) {
  const elements = document.querySelectorAll(selector);
  const containers = [];

  elements.forEach(element => {
    const options = {
      ...defaultOptions,
      ...(element.dataset.containerOptions ? JSON.parse(element.dataset.containerOptions) : {})
    };

    containers.push(createContainer(element, options));
  });

  return containers;
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initContainers();
});