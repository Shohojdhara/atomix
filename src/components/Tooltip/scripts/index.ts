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
export interface TooltipOptions {
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
export interface TooltipInstance {
  show: () => void;
  hide: () => void;
  destroy: () => void;
  isInitialized: () => boolean;
  isVisible: () => boolean;
  getElement: () => HTMLElement | null;
  getTriggerElement: () => HTMLElement | null;
  getPosition: () => string;
  setPosition: (position: string) => void;
}

/**
 * Class representing a Tooltip component
 */
export class Tooltip implements TooltipInstance {
  private selector: string | Element;
  private $element: HTMLElement | null;
  private $trigger: HTMLElement | null;
  private $content: HTMLElement | null;
  private options: TooltipOptions;
  private timeout: number | null;
  private hideTimeout: number | null;
  private isActive: boolean = false;

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
   * Handle trigger mouseenter or focus event
   */
  private _handleTriggerEnter(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    
    if (this.timeout) return;
    
    this.timeout = window.setTimeout(() => {
      this.show();
      this.timeout = null;
    }, this.options.delay);
  }

  /**
   * Handle trigger mouseleave or blur event
   */
  private _handleTriggerLeave(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    
    this.hideTimeout = window.setTimeout(() => {
      this.hide();
      this.hideTimeout = null;
    }, this.options.delay);
  }

  /**
   * Handle trigger click event
   */
  private _handleTriggerClick(): void {
    if (this.$element && this.$element.classList.contains(this.options.activeClass)) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Check if tooltip is initialized
   */
  public isInitialized(): boolean {
    return !!this.$element && !!this.$trigger;
  }

  /**
   * Check if tooltip is currently visible
   */
  public isVisible(): boolean {
    return this.isActive;
  }

  /**
   * Get tooltip element
   */
  public getElement(): HTMLElement | null {
    return this.$element;
  }

  /**
   * Get trigger element
   */
  public getTriggerElement(): HTMLElement | null {
    return this.$trigger;
  }

  /**
   * Get current position
   */
  public getPosition(): string {
    return this.options.position;
  }

  /**
   * Set tooltip position
   */
  public setPosition(position: string): void {
    if (this.options.position !== position) {
      this.options.position = position;
      this._setPosition();
    }
  }

  /**
   * Show the tooltip
   */
  public show(): void {
    if (!this.$element) return;
    
    // Dispatch custom event before showing
    const showEvent = new CustomEvent('tooltip:show', {
      bubbles: true,
      cancelable: true,
      detail: { tooltip: this }
    });
    
    this.$element.dispatchEvent(showEvent);
    
    // If event was canceled, don't show
    if (showEvent.defaultPrevented) return;
    
    this.$element.classList.add(this.options.activeClass);
    this.isActive = true;
  }

  /**
   * Hide the tooltip
   */
  public hide(): void {
    if (!this.$element) return;
    
    // Dispatch custom event before hiding
    const hideEvent = new CustomEvent('tooltip:hide', {
      bubbles: true,
      cancelable: true,
      detail: { tooltip: this }
    });
    
    this.$element.dispatchEvent(hideEvent);
    
    // If event was canceled, don't hide
    if (hideEvent.defaultPrevented) return;
    
    this.$element.classList.remove(this.options.activeClass);
    this.isActive = false;
  }

  /**
   * Destroy the tooltip
   */
  public destroy(): void {
    if (!this.$trigger) return;
    
    // Remove event listeners
    if (this.options.trigger === 'hover') {
      this.$trigger.removeEventListener('mouseenter', this._handleTriggerEnter.bind(this));
      this.$trigger.removeEventListener('mouseleave', this._handleTriggerLeave.bind(this));
    } else if (this.options.trigger === 'click') {
      this.$trigger.removeEventListener('click', this._handleTriggerClick.bind(this));
    }
    
    this.$trigger.removeEventListener('focus', this._handleTriggerEnter.bind(this));
    this.$trigger.removeEventListener('blur', this._handleTriggerLeave.bind(this));
    
    // Clear timeouts
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    
    // Hide tooltip
    if (this.$element) {
      this.$element.classList.remove(this.options.activeClass);
    }
  }

  /**
   * Initialize all tooltips in the document
   * @param selector - CSS selector for tooltip elements
   * @param options - Custom options
   */
  public static initializeAll(selector = TOOLTIP.SELECTORS.TOOLTIP, options = {}): Tooltip[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => new Tooltip(element, options));
  }
}

/**
 * Initialize all tooltips in the document
 * @param selector - CSS selector for tooltip elements
 * @param options - Custom options
 */
export function initializeTooltips(selector = TOOLTIP.SELECTORS.TOOLTIP, options = {}): TooltipInstance[] {
  return Tooltip.initializeAll(selector, options);
} 