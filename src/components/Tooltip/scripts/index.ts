import { TOOLTIP } from '../../../lib/constants/components';

/**
 * Default options for the tooltip component
 */
const DEFAULT_OPTIONS = {
  trigger: TOOLTIP.DEFAULTS.TRIGGER,
  position: TOOLTIP.DEFAULTS.POSITION,
  offset: TOOLTIP.DEFAULTS.OFFSET,
  delay: TOOLTIP.DEFAULTS.DELAY,
  activeClass: TOOLTIP.CLASSES.IS_ACTIVE,
  contentIdAttr: TOOLTIP.ATTRIBUTES.CONTENT_ID,
  positionAttr: TOOLTIP.ATTRIBUTES.POSITION,
  triggerAttr: TOOLTIP.ATTRIBUTES.TRIGGER
};

/**
 * Interface for Tooltip options
 */
interface TooltipOptions {
  trigger: string;
  position: string;
  offset: number;
  delay: number;
  activeClass: string;
  contentIdAttr: string;
  positionAttr: string;
  triggerAttr: string;
  [key: string]: any;
}

/**
 * Interface for Tooltip instance
 */
interface TooltipInstance {
  show: () => void;
  hide: () => void;
  destroy: () => void;
  isInitialized: () => boolean;
}

/**
 * Class representing a Tooltip component
 */
class Tooltip implements TooltipInstance {
  private selector: string | Element;
  private $element: HTMLElement | null;
  private $trigger: HTMLElement | null;
  private $content: HTMLElement | null;
  private options: TooltipOptions;
  private timeout: number | null;
  private hideTimeout: number | null;

  /**
   * Creates an instance of Tooltip
   * @param selector - CSS selector string or DOM Element
   * @param options - Custom options to override defaults
   */
  constructor(selector: string | Element, options = {}) {
    this.selector = selector || TOOLTIP.SELECTORS.TOOLTIP;
    this.$element = 
      typeof selector === 'string' 
        ? document.querySelector<HTMLElement>(selector)
        : selector as HTMLElement;
    this.options = { ...DEFAULT_OPTIONS, ...options } as TooltipOptions;
    this.timeout = null;
    this.hideTimeout = null;
    this.$trigger = null;
    this.$content = null;
    this._initialize();
  }

  /**
   * Initialize the tooltip component
   */
  private _initialize(): void {
    if (!this.$element) return;

    this._initializeElements();
    this._setPosition();
    this._bindEvents();
  }

  /**
   * Initialize DOM elements
   */
  private _initializeElements(): void {
    if (!this.$element) return;
    
    // Find the parent container that wraps both trigger and tooltip
    const parentContainer = this.$element.parentElement;
    if (!parentContainer) return;
    
    // Find the trigger as a sibling or within the same parent container
    this.$trigger = parentContainer.querySelector<HTMLElement>(TOOLTIP.SELECTORS.TRIGGER);
    this.$content = this.$element.querySelector<HTMLElement>(TOOLTIP.SELECTORS.CONTENT);
    
    // Check for custom position from data attribute
    const customPosition = this.$element.getAttribute(this.options.positionAttr);
    if (customPosition) {
      this.options.position = customPosition;
    }
    
    // Check for custom trigger from data attribute
    const customTrigger = this.$element.getAttribute(this.options.triggerAttr);
    if (customTrigger) {
      this.options.trigger = customTrigger;
    }
  }

  /**
   * Set tooltip position
   */
  private _setPosition(): void {
    if (!this.$content || !this.$element) return;
    
    // Reset any existing position classes
    this.$element.classList.remove(
      TOOLTIP.CLASSES.TOP, 
      TOOLTIP.CLASSES.BOTTOM, 
      TOOLTIP.CLASSES.LEFT, 
      TOOLTIP.CLASSES.RIGHT, 
      TOOLTIP.CLASSES.TOP_LEFT, 
      TOOLTIP.CLASSES.TOP_RIGHT, 
      TOOLTIP.CLASSES.BOTTOM_LEFT, 
      TOOLTIP.CLASSES.BOTTOM_RIGHT
    );
    
    // Add the appropriate position class
    switch (this.options.position) {
      case 'top':
        this.$element.classList.add(TOOLTIP.CLASSES.TOP);
        break;
      case 'bottom':
        this.$element.classList.add(TOOLTIP.CLASSES.BOTTOM);
        break;
      case 'left':
        this.$element.classList.add(TOOLTIP.CLASSES.LEFT);
        break;
      case 'right':
        this.$element.classList.add(TOOLTIP.CLASSES.RIGHT);
        break;
      case 'top-left':
        this.$element.classList.add(TOOLTIP.CLASSES.TOP_LEFT);
        break;
      case 'top-right':
        this.$element.classList.add(TOOLTIP.CLASSES.TOP_RIGHT);
        break;
      case 'bottom-left':
        this.$element.classList.add(TOOLTIP.CLASSES.BOTTOM_LEFT);
        break;
      case 'bottom-right':
        this.$element.classList.add(TOOLTIP.CLASSES.BOTTOM_RIGHT);
        break;
      default:
        this.$element.classList.add(TOOLTIP.CLASSES.TOP);
    }
    
    // Calculate offset based on position
    const offset = this.options.offset;
    
    switch (this.options.position) {
      case 'top':
      case 'top-left':
      case 'top-right':
        this.$element.style.bottom = `${offset}px`;
        break;
      case 'bottom':
      case 'bottom-left':
      case 'bottom-right':
        this.$element.style.top = `${offset}px`;
        break;
      case 'left':
        this.$element.style.right = `${offset}px`;
        break;
      case 'right':
        this.$element.style.left = `${offset}px`;
        break;
      default:
        this.$element.style.bottom = `${offset}px`;
    }
  }

  /**
   * Bind event listeners
   */
  private _bindEvents(): void {
    if (!this.$trigger) return;
    
    if (this.options.trigger === 'hover') {
      this.$trigger.addEventListener('mouseenter', this._handleTriggerEnter.bind(this));
      this.$trigger.addEventListener('mouseleave', this._handleTriggerLeave.bind(this));
    } else if (this.options.trigger === 'click') {
      this.$trigger.addEventListener('click', this._handleTriggerClick.bind(this));
    }
    
    // Handle focus for accessibility
    this.$trigger.addEventListener('focus', this._handleTriggerEnter.bind(this));
    this.$trigger.addEventListener('blur', this._handleTriggerLeave.bind(this));
  }

  /**
   * Handle trigger enter event
   */
  private _handleTriggerEnter(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    this.timeout = window.setTimeout(() => {
      this.show();
    }, this.options.delay);
  }

  /**
   * Handle trigger leave event
   */
  private _handleTriggerLeave(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.hide();
  }

  /**
   * Handle trigger click event
   */
  private _handleTriggerClick(): void {
    if (this.$element?.classList.contains(this.options.activeClass)) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Check if tooltip is properly initialized
   * @returns Whether the tooltip is initialized
   */
  public isInitialized(): boolean {
    return this.$element !== null;
  }

  /**
   * Show the tooltip
   */
  public show(): void {
    // Clear any pending hide timeouts
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    
    if (this.$element) {
      // Show tooltip
      this.$element.style.opacity = '1';
      this.$element.style.visibility = 'visible';
      this.$element.classList.add(this.options.activeClass);
      this._setPosition();
    }
  }

  /**
   * Hide the tooltip
   */
  public hide(): void {
    if (!this.$element) return;
    
    this.$element.classList.remove(this.options.activeClass);
    
    // Wait for animation to complete before hiding
    this.hideTimeout = window.setTimeout(() => {
      if (this.$element && !this.$element.classList.contains(this.options.activeClass)) {
        this.$element.style.opacity = '0';
        this.$element.style.visibility = 'hidden';
      }
    }, 200); // Match the transition duration in CSS
  }

  /**
   * Clean up event listeners and timeouts
   */
  public destroy(): void {
    if (this.$trigger) {
      this.$trigger.removeEventListener('mouseenter', this._handleTriggerEnter);
      this.$trigger.removeEventListener('mouseleave', this._handleTriggerLeave);
      this.$trigger.removeEventListener('click', this._handleTriggerClick);
      this.$trigger.removeEventListener('focus', this._handleTriggerEnter);
      this.$trigger.removeEventListener('blur', this._handleTriggerLeave);
    }
    
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
}

/**
 * Initialize tooltips on the page
 * @param {string|Element} selector - CSS selector string or DOM Element
 * @param {Object} options - Custom options to override defaults
 * @returns {TooltipInstance[]} Array of Tooltip instances
 */
export function initializeTooltips(selector = TOOLTIP.SELECTORS.TOOLTIP, options = {}): TooltipInstance[] {
  const elements = typeof selector === 'string' 
    ? document.querySelectorAll<HTMLElement>(selector) 
    : [selector as HTMLElement];
    
  const instances = Array.from(elements).map(element => {
    return new Tooltip(element, options);
  });
  
  return instances.filter(instance => instance.isInitialized());
}

export default Tooltip; 