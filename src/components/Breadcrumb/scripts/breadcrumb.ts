import { useBreadcrumb } from '../../../lib/composables/useBreadcrumb';
import { BreadcrumbItem, BreadcrumbOptions, BreadcrumbInstance } from './types';
import { BREADCRUMB } from '../../../lib/constants/components';
import { createIconElement } from '../../../lib/utils/icons';

/**
 * Default options for the Breadcrumb component
 */
const DEFAULT_OPTIONS: BreadcrumbOptions = {
  items: [],
  divider: BREADCRUMB.DEFAULTS.DIVIDER,
  className: '',
  ariaLabel: 'Breadcrumb',
};

/**
 * Breadcrumb Class - Vanilla JS implementation
 */
export default class Breadcrumb implements BreadcrumbInstance {
  // DOM element
  private element: HTMLElement;

  // Options
  private options: BreadcrumbOptions;

  // DOM references
  private navElement: HTMLElement = document.createElement('nav');
  private listElement: HTMLOListElement = document.createElement('ol');

  // Composables
  private breadcrumbUtils = useBreadcrumb();

  /**
   * Constructor
   * @param element - DOM element or selector
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: Partial<BreadcrumbOptions> = {}) {
    // Get element reference
    this.element =
      typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;

    if (!this.element) {
      throw new Error('Breadcrumb: element not found');
    }

    // Merge default options with provided options
    this.options = { ...DEFAULT_OPTIONS, ...options };

    // Ensure items is always an array
    if (!this.options.items) {
      this.options.items = [];
    }

    // Initialize the component
    this._initialize();
  }

  /**
   * Initialize the component
   * @private
   */
  private _initialize(): void {
    // Clear element
    this.element.innerHTML = '';

    // Reset DOM elements
    this.navElement = document.createElement('nav');
    this.listElement = document.createElement('ol');

    // Create structure
    this._createStructure();

    // Append to DOM
    this.element.appendChild(this.navElement);
  }

  /**
   * Create component structure
   * @private
   */
  private _createStructure(): void {
    // Create navigation element
    if (this.options.ariaLabel) {
      this.navElement.setAttribute('aria-label', this.options.ariaLabel);
    }

    // Create list element
    this.listElement.className = this.breadcrumbUtils.generateBreadcrumbClass(this.options);

    // Add items
    const items = this.options.items || [];
    if (items.length > 0) {
      items.forEach((item, index) => {
        const isLast = index === items.length - 1;

        // Create list item
        const listItem = document.createElement('li');
        listItem.className = this.breadcrumbUtils.generateItemClass(item, isLast);

        // Create link or span
        let linkElement: HTMLAnchorElement | HTMLSpanElement;

        if (this.breadcrumbUtils.isItemLink(item, isLast)) {
          linkElement = document.createElement('a');
          (linkElement as HTMLAnchorElement).href = item.href || '#';

          if (typeof item.onClick === 'function') {
            (linkElement as HTMLAnchorElement).addEventListener(
              'click',
              item.onClick as EventListener
            );
          }
        } else {
          linkElement = document.createElement('span');
        }

        linkElement.className = BREADCRUMB.CLASSES.LINK;

        // Add icon if provided
        if (item.icon) {
          const iconElement = createIconElement(item.icon, 16, 'c-breadcrumb__icon');
          iconElement.style.marginRight = '4px';
          linkElement.appendChild(iconElement);
        }

        // Add label text
        const labelText = document.createTextNode(item.label);
        linkElement.appendChild(labelText);

        listItem.appendChild(linkElement);
        this.listElement.appendChild(listItem);
      });
    }

    this.navElement.appendChild(this.listElement);
  }

  /**
   * Update the breadcrumb with new options
   * @public
   */
  public update(options: Partial<BreadcrumbOptions>): void {
    // Update options
    this.options = { ...this.options, ...options };

    // Ensure items is always an array
    if (!this.options.items) {
      this.options.items = [];
    }

    // Re-initialize
    this._initialize();
  }

  /**
   * Destroy the breadcrumb component
   * @public
   */
  public destroy(): void {
    // Remove event listeners
    if (this.options.items) {
      this.options.items.forEach(item => {
        // No need to remove event listeners as we're removing the elements
      });
    }

    // Remove DOM elements
    this.element.innerHTML = '';
  }

  /**
   * Initialize all breadcrumb components on the page
   * @public
   * @static
   */
  public static initializeAll(selector = '[data-component="breadcrumb"]'): Breadcrumb[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => {
      // Try to get options from data attributes
      const options: BreadcrumbOptions = {};

      // Get aria label
      const ariaLabel = element.getAttribute('data-aria-label');
      if (ariaLabel) options.ariaLabel = ariaLabel;

      // Get class name
      const className = element.getAttribute('data-class-name');
      if (className) options.className = className;

      // Get divider
      const divider = element.getAttribute('data-divider');
      if (divider) options.divider = divider;

      // Get items from data attribute
      const itemsAttr = element.getAttribute('data-items');
      if (itemsAttr) {
        try {
          options.items = JSON.parse(itemsAttr);
        } catch (e) {
          console.error('Invalid JSON in data-items attribute', e);
        }
      }

      return new Breadcrumb(element as HTMLElement, options);
    });
  }
}
