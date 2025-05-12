import { CARD } from '../../../lib/constants/components';

/**
 * CardOptions interface for the vanilla JS implementation
 */
export interface CardOptions {
  title?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  icon?: string;
  header?: string;
  footer?: string;
  actions?: HTMLElement[];
  row?: boolean;
  flat?: boolean;
  active?: boolean;
  className?: string;
  onClick?: (event: MouseEvent) => void;
  children?: HTMLElement | HTMLElement[] | string;
}

/**
 * CardInstance interface
 */
export interface CardInstance {
  destroy: () => void;
}

/**
 * Default options for the Card component
 */
const DEFAULT_OPTIONS: CardOptions = {
  title: '',
  text: '',
  image: '',
  imageAlt: '',
  icon: '',
  header: '',
  footer: '',
  actions: [],
  row: false,
  flat: false,
  active: false,
  className: '',
  onClick: undefined,
  children: undefined
};

/**
 * Card Class - Vanilla JS implementation
 */
export default class Card implements CardInstance {
  // DOM element
  private element: HTMLElement;
  
  // Options
  private options: CardOptions;

  // DOM references
  private headerElement: HTMLElement | null = null;
  private bodyElement: HTMLElement | null = null;
  private imageElement: HTMLImageElement | null = null;
  private iconElement: HTMLElement | null = null;
  private titleElement: HTMLElement | null = null;
  private textElement: HTMLElement | null = null;
  private actionsElement: HTMLElement | null = null;
  private footerElement: HTMLElement | null = null;

  /**
   * Constructor
   * @param element - DOM element or selector
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: Partial<CardOptions> = {}) {
    // Get element reference
    this.element = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (!this.element) {
      throw new Error('Card: element not found');
    }
    
    // Merge default options with provided options
    this.options = { ...DEFAULT_OPTIONS, ...options };
    
    // Initialize the component
    this._initialize();
  }

  /**
   * Initialize the card component
   * @private
   */
  private _initialize(): void {
    // Clear element
    this.element.innerHTML = '';

    // Add base class
    this.element.classList.add(CARD.CLASSES.BASE);

    // Add variant classes
    if (this.options.row) {
      this.element.classList.add(CARD.CLASSES.ROW);
    }

    if (this.options.flat) {
      this.element.classList.add(CARD.CLASSES.FLAT);
    }

    if (this.options.active) {
      this.element.classList.add(CARD.CLASSES.ACTIVE);
    }

    if (this.options.className) {
      this.options.className.split(' ').forEach(cls => {
        if (cls) this.element.classList.add(cls);
      });
    }

    // Create the structure
    this._createStructure();
    
    // Bind events
    this._bindEvents();
  }

  /**
   * Create component structure
   * @private
   */
  private _createStructure(): void {
    // Create header if provided
    if (this.options.header) {
      this.headerElement = document.createElement('div');
      this.headerElement.className = CARD.SELECTORS.HEADER.substring(1);
      this.headerElement.innerHTML = this.options.header;
      this.element.appendChild(this.headerElement);
    }

    // Create image if provided
    if (this.options.image) {
      this.imageElement = document.createElement('img');
      this.imageElement.className = CARD.SELECTORS.IMAGE.substring(1);
      this.imageElement.src = this.options.image;
      this.imageElement.alt = this.options.imageAlt || '';
      this.element.appendChild(this.imageElement);
    }
    
    // Create icon if provided
    if (this.options.icon) {
      this.iconElement = document.createElement('div');
      this.iconElement.className = CARD.SELECTORS.ICON.substring(1);
      this.iconElement.innerHTML = this.options.icon;
      this.element.appendChild(this.iconElement);
    }

    // Create body
    this.bodyElement = document.createElement('div');
    this.bodyElement.className = CARD.SELECTORS.BODY.substring(1);
    this.element.appendChild(this.bodyElement);

    // Create title if provided
    if (this.options.title) {
      this.titleElement = document.createElement('h3');
      this.titleElement.className = CARD.SELECTORS.TITLE.substring(1);
      this.titleElement.innerHTML = this.options.title;
      this.bodyElement.appendChild(this.titleElement);
    }

    // Create text if provided
    if (this.options.text) {
      this.textElement = document.createElement('p');
      this.textElement.className = CARD.SELECTORS.TEXT.substring(1);
      this.textElement.innerHTML = this.options.text;
      this.bodyElement.appendChild(this.textElement);
    }
    
    // Add children content if provided
    if (this.options.children && this.bodyElement) {
      if (typeof this.options.children === 'string') {
        // If children is a string, add it as innerHTML
        const childrenContainer = document.createElement('div');
        childrenContainer.innerHTML = this.options.children;
        this.bodyElement.appendChild(childrenContainer);
      } else if (this.options.children instanceof HTMLElement) {
        // If children is a single HTMLElement
        this.bodyElement.appendChild(this.options.children);
      } else if (Array.isArray(this.options.children)) {
        // If children is an array of HTMLElements
        this.options.children.forEach(child => {
          if (child instanceof HTMLElement && this.bodyElement) {
            this.bodyElement.appendChild(child);
          }
        });
      }
    }

    // Create actions if provided
    if (this.options.actions && this.options.actions.length > 0) {
      this.actionsElement = document.createElement('div');
      this.actionsElement.className = CARD.SELECTORS.ACTIONS.substring(1);
      
      this.options.actions.forEach(action => {
        if (this.actionsElement && action) {
          this.actionsElement.appendChild(action);
        }
      });
      
      this.bodyElement.appendChild(this.actionsElement);
    }

    // Create footer if provided
    if (this.options.footer) {
      this.footerElement = document.createElement('div');
      this.footerElement.className = CARD.SELECTORS.FOOTER.substring(1);
      this.footerElement.innerHTML = this.options.footer;
      this.element.appendChild(this.footerElement);
    }
  }

  /**
   * Bind event listeners
   * @private
   */
  private _bindEvents(): void {
    if (typeof this.options.onClick === 'function') {
      this.element.addEventListener('click', this.options.onClick);
    }
  }

  /**
   * Update card with new options
   * @param options - New configuration options
   * @public
   */
  public update(options: Partial<CardOptions>): void {
    this.options = { ...this.options, ...options };
    this._initialize();
  }

  /**
   * Destroy the card component
   * Clean up event listeners and DOM
   * @public
   */
  public destroy(): void {
    if (typeof this.options.onClick === 'function') {
      this.element.removeEventListener('click', this.options.onClick);
    }
    
    this.element.innerHTML = '';
    this.element.classList.remove(
      CARD.CLASSES.BASE,
      CARD.CLASSES.ROW,
      CARD.CLASSES.FLAT,
      CARD.CLASSES.ACTIVE
    );
    
    if (this.options.className) {
      this.options.className.split(' ').forEach(cls => {
        if (cls) this.element.classList.remove(cls);
      });
    }
  }

  /**
   * Initialize all Card components on the page
   * @param selector - CSS selector for card elements
   * @returns Array of Card instances
   * @static
   */
  public static initializeAll(selector = '[data-component="card"]'): Card[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => {
      // Try to get options from data attributes
      const options: CardOptions = {};
      
      // Get title
      const title = element.getAttribute('data-title');
      if (title) options.title = title;
      
      // Get text
      const text = element.getAttribute('data-text');
      if (text) options.text = text;
      
      // Get image
      const image = element.getAttribute('data-image');
      if (image) options.image = image;
      
      // Get imageAlt
      const imageAlt = element.getAttribute('data-image-alt');
      if (imageAlt) options.imageAlt = imageAlt;
      
      // Get icon
      const icon = element.getAttribute('data-icon');
      if (icon) options.icon = icon;
      
      // Get row
      const row = element.getAttribute('data-row');
      options.row = row === 'true';
      
      // Get flat
      const flat = element.getAttribute('data-flat');
      options.flat = flat === 'true';
      
      // Get active
      const active = element.getAttribute('data-active');
      options.active = active === 'true';
      
      // Get className
      const className = element.getAttribute('data-class-name');
      if (className) options.className = className;
      
      return new Card(element as HTMLElement, options);
    });
  }
} 