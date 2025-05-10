import { BREADCRUMB } from '../../../lib/constants/components';

/**
 * BreadcrumbItem interface for the vanilla JS implementation
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
  icon?: string; // Icon name from Phosphor Icons
  onClick?: (event: MouseEvent) => void;
}

/**
 * BreadcrumbOptions interface for the vanilla JS implementation
 */
export interface BreadcrumbOptions {
  items?: BreadcrumbItem[];
  divider?: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * BreadcrumbInstance interface
 */
export interface BreadcrumbInstance {
  update: (options: Partial<BreadcrumbOptions>) => void;
  destroy: () => void;
}

/**
 * Default options for the Breadcrumb component
 */
const DEFAULT_OPTIONS: BreadcrumbOptions = {
  items: [],
  divider: BREADCRUMB.DEFAULTS.DIVIDER,
  className: '',
  ariaLabel: 'Breadcrumb'
};

/**
 * Create a Phosphor icon SVG element
 * @param name - Icon name
 * @param size - Icon size in pixels
 * @returns SVG element as HTML string
 */
function createPhosphorIcon(name: string, size: number = 16): string {
  // This is a simplified version - in a real implementation, you would have a more complete set of icons
  // or use a library to generate the SVG paths
  const iconPaths: Record<string, string> = {
    House: 'M240 121.6V240h-48v-72a24 24 0 0 0-24-24h-80a24 24 0 0 0-24 24v72H16V121.6a16 16 0 0 1 5.4-12L111.4 29a16 16 0 0 1 21.2 0l90 80.6a16 16 0 0 1 5.4 12Z',
    Package: 'M223.68 66.15 135.68 18a15.88 15.88 0 0 0-15.36 0l-88 48.13a16 16 0 0 0-8.32 14v95.64a16 16 0 0 0 8.32 14l88 48.17a15.88 15.88 0 0 0 15.36 0l88-48.17a16 16 0 0 0 8.32-14V80.18a16 16 0 0 0-8.32-14.03ZM128 32.59l74.12 40.55-32 17.56-74.12-40.55ZM96 68.08l73.56 40.23-32.04 17.53L64 85.64ZM40 95.83l72 39.39v79.23l-72-39.4Zm144 79.22v-79.23l72-39.39v79.22Z',
    Folder: 'M216 72h-84.7L104.4 44.2A16.05 16.05 0 0 0 92.7 40H40a16 16 0 0 0-16 16v144.3a15.91 15.91 0 0 0 15.9 15.7h176.2a15.91 15.91 0 0 0 15.9-15.7V88a16 16 0 0 0-16-16Z',
    Tag: 'M246.15 128.6 183.06 65.5l.09-24.21A16.05 16.05 0 0 0 167 25.14l-24.1.09L79.4 88.85a16 16 0 0 0 0 22.63l67.26 67.27a16 16 0 0 0 22.63 0l76.86-76.86a16 16 0 0 0 0-23.29ZM160 152l-56-56 56-56 56 56Zm-16-72a16 16 0 1 1-16 16 16 16 0 0 1 16-16Z'
  };

  const path = iconPaths[name] || '';
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" fill="currentColor" viewBox="0 0 256 256">
    <path d="${path}"></path>
  </svg>`;
}

/**
 * Breadcrumb Class - Vanilla JS implementation
 */
export default class Breadcrumb implements BreadcrumbInstance {
  // DOM element
  private element: HTMLElement;
  
  // Options
  private options: BreadcrumbOptions;

  // DOM references
  private navElement: HTMLElement;
  private listElement: HTMLOListElement;

  /**
   * Constructor
   * @param element - DOM element or selector
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: Partial<BreadcrumbOptions> = {}) {
    // Get element reference
    this.element = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (!this.element) {
      throw new Error('Breadcrumb: element not found');
    }
    
    // Merge default options with provided options
    this.options = { ...DEFAULT_OPTIONS, ...options };
    
    // Ensure items is always an array
    if (!this.options.items) {
      this.options.items = [];
    }
    
    // Initialize DOM elements
    this.navElement = document.createElement('nav');
    this.listElement = document.createElement('ol');
    
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
    this.listElement.className = [
      BREADCRUMB.CLASSES.BASE,
      this.options.className || ''
    ].filter(Boolean).join(' ');
    
    // Add items
    const items = this.options.items || [];
    if (items.length > 0) {
      items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        
        // Create list item
        const listItem = document.createElement('li');
        listItem.className = [
          BREADCRUMB.CLASSES.ITEM,
          item.active || isLast ? BREADCRUMB.CLASSES.ACTIVE : ''
        ].filter(Boolean).join(' ');
        
        // Create link or span
        let linkElement: HTMLAnchorElement | HTMLSpanElement;
        
        if (item.href && !item.active) {
          linkElement = document.createElement('a');
          (linkElement as HTMLAnchorElement).href = item.href;
          
          if (typeof item.onClick === 'function') {
            (linkElement as HTMLAnchorElement).addEventListener('click', item.onClick as EventListener);
          }
        } else {
          linkElement = document.createElement('span');
        }
        
        linkElement.className = BREADCRUMB.CLASSES.LINK;
        
        // Add icon if provided
        if (item.icon) {
          const iconElement = document.createElement('span');
          iconElement.className = 'c-breadcrumb__icon';
          iconElement.style.marginRight = '4px';
          iconElement.innerHTML = createPhosphorIcon(item.icon, 16);
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
        if (item.onClick) {
          // No need to remove event listeners as we're removing the elements
        }
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
          console.error('Breadcrumb: Error parsing items data attribute', e);
        }
      }
      
      return new Breadcrumb(element as HTMLElement, options);
    });
  }
} 