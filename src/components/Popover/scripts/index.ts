import { POPOVER } from '../../../lib/constants/components';
import {
  PopoverPosition,
  PopoverOptions,
  handleTriggerClick,
  handleDocumentClick,
  handleTriggerMouseEnter,
  handleTriggerMouseLeave,
  handleEscapeKey,
  determineBestPosition,
  checkAndFlipPosition,
  calculatePopoverPosition,
  positionArrow,
  setPositionClass
} from './componentInteractions';

/**
 * Class representing a Popover component
 */
class Popover {
  private element: HTMLElement;
  private trigger: HTMLElement | null;
  private content: HTMLElement | null;
  private contentInner: HTMLElement | null;
  private arrow: HTMLElement | null;
  private options: PopoverOptions;
  private isOpen: boolean;
  private timeout: number | null;
  private currentPosition: PopoverPosition;
  private updateInterval: number | null;
  private timeoutRef: { current: number | null };

  /**
   * Creates an instance of Popover
   * @param element - The popover container element
   * @param options - Configuration options
   */
  constructor(element: HTMLElement, options: PopoverOptions = {}) {
    this.element = element;
    this.trigger = null;
    this.content = null;
    this.contentInner = null;
    this.arrow = null;
    this.isOpen = false;
    this.timeout = null;
    this.updateInterval = null;
    this.timeoutRef = { current: null };
    this.options = {
      position: options.position || POPOVER.DEFAULTS.POSITION as PopoverPosition | 'auto',
      trigger: options.trigger || POPOVER.DEFAULTS.TRIGGER as 'hover' | 'click',
      offset: options.offset !== undefined ? options.offset : POPOVER.DEFAULTS.OFFSET,
      delay: options.delay !== undefined ? options.delay : POPOVER.DEFAULTS.DELAY
    };
    
    // Initialize current position from options (will be recalculated if auto)
    this.currentPosition = this.options.position === 'auto' 
      ? 'top' // default fallback
      : this.options.position as PopoverPosition;

    this._initialize();
  }

  /**
   * Initialize the popover component
   */
  private _initialize(): void {
    // Find elements
    this.trigger = document.querySelector(`[data-popover-id="${this.element.id}"]`);
    this.content = this.element.querySelector(POPOVER.SELECTORS.CONTENT);
    this.contentInner = this.element.querySelector(POPOVER.SELECTORS.CONTENT_INNER);
    
    // Create arrow element if needed
    this.arrow = document.createElement('div');
    this.arrow.className = POPOVER.SELECTORS.ARROW.slice(1); // Remove leading dot
    this.content?.appendChild(this.arrow);
    
    // Set initial position class
    this._setPositionClass();
    
    // Bind events
    this._bindEvents();
  }
  
  /**
   * Set the position class on the element
   */
  private _setPositionClass(): void {
    setPositionClass(
      this.element,
      this.currentPosition,
      this.options.position === 'auto'
    );
  }

  /**
   * Bind event listeners
   */
  private _bindEvents(): void {
    if (!this.trigger) return;
    
    if (this.options.trigger === 'click') {
      this.trigger.addEventListener('click', this._handleTriggerClick.bind(this));
      document.addEventListener('click', this._handleDocumentClick.bind(this));
      document.addEventListener('keydown', this._handleEscapeKey.bind(this));
    } else if (this.options.trigger === 'hover') {
      this.trigger.addEventListener('mouseenter', this._handleTriggerMouseEnter.bind(this));
      this.trigger.addEventListener('mouseleave', this._handleTriggerMouseLeave.bind(this));
      this.element.addEventListener('mouseenter', this._handlePopoverMouseEnter.bind(this));
      this.element.addEventListener('mouseleave', this._handlePopoverMouseLeave.bind(this));
    }
    
    window.addEventListener('resize', this._updatePosition.bind(this));
    window.addEventListener('scroll', this._updatePosition.bind(this), { passive: true });
    
    // Also update position periodically to handle any dynamic content changes
    this.updateInterval = window.setInterval(this._updatePosition.bind(this), 200);
  }

  /**
   * Handle click on trigger
   */
  private _handleTriggerClick(event: Event): void {
    handleTriggerClick(this.isOpen, this.open.bind(this), this.close.bind(this), event);
  }

  /**
   * Handle document click for closing popover
   */
  private _handleDocumentClick(event: MouseEvent): void {
    handleDocumentClick(this.element, this.trigger, this.isOpen, this.close.bind(this), event);
  }

  /**
   * Handle mouseenter on trigger
   */
  private _handleTriggerMouseEnter(): void {
    handleTriggerMouseEnter(this.open.bind(this), this.options.delay || 0, this.timeoutRef);
  }

  /**
   * Handle mouseleave on trigger
   */
  private _handleTriggerMouseLeave(): void {
    handleTriggerMouseLeave(this.element, this.close.bind(this), this.timeoutRef);
  }

  /**
   * Handle mouseenter on popover
   */
  private _handlePopoverMouseEnter(): void {
    if (this.timeoutRef.current !== null) {
      window.clearTimeout(this.timeoutRef.current);
      this.timeoutRef.current = null;
    }
  }

  /**
   * Handle mouseleave on popover
   */
  private _handlePopoverMouseLeave(): void {
    this.close();
  }

  /**
   * Handle escape key
   */
  private _handleEscapeKey(event: KeyboardEvent): void {
    handleEscapeKey(this.isOpen, this.close.bind(this), event);
  }

  /**
   * Update popover position
   */
  private _updatePosition(): void {
    if (!this.isOpen || !this.trigger) return;
    
    const triggerRect = this.trigger.getBoundingClientRect();
    const popoverRect = this.element.getBoundingClientRect();
    const offset = this.options.offset || 0;
    
    // If auto positioning is enabled, determine best position
    if (this.options.position === 'auto') {
      this.currentPosition = determineBestPosition(triggerRect);
    } else {
      // Check if there's enough space in the current position,
      // flip to opposite side if needed
      this.currentPosition = checkAndFlipPosition(
        triggerRect,
        popoverRect,
        this.options.position as PopoverPosition | 'auto',
        offset
      );
    }
    
    // Calculate position
    const { top, left } = calculatePopoverPosition(
      triggerRect,
      popoverRect,
      this.currentPosition,
      offset
    );
    
    // Apply position using absolute positioning to follow when scrolling
    this.element.style.position = 'absolute';
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;
    
    // Update position class and arrow
    this._setPositionClass();
    
    // Position arrow
    if (this.arrow) {
      positionArrow(this.arrow, this.currentPosition);
    }
  }

  /**
   * Open the popover
   */
  public open(): void {
    if (this.isOpen) return;
    
    this.element.classList.add(POPOVER.CLASSES.IS_OPEN);
    this.isOpen = true;
    
    // Update position right away
    this._updatePosition();
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('popover:open', { 
      bubbles: true 
    }));
  }

  /**
   * Close the popover
   */
  public close(): void {
    if (!this.isOpen) return;
    
    this.element.classList.remove(POPOVER.CLASSES.IS_OPEN);
    this.isOpen = false;
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('popover:close', { 
      bubbles: true 
    }));
  }

  /**
   * Toggle popover open/closed state
   */
  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    if (this.trigger) {
      if (this.options.trigger === 'click') {
        this.trigger.removeEventListener('click', this._handleTriggerClick);
      } else if (this.options.trigger === 'hover') {
        this.trigger.removeEventListener('mouseenter', this._handleTriggerMouseEnter);
        this.trigger.removeEventListener('mouseleave', this._handleTriggerMouseLeave);
      }
    }
    
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleEscapeKey);
    
    this.element.removeEventListener('mouseenter', this._handlePopoverMouseEnter);
    this.element.removeEventListener('mouseleave', this._handlePopoverMouseLeave);
    
    window.removeEventListener('resize', this._updatePosition);
    window.removeEventListener('scroll', this._updatePosition);
    
    if (this.timeout !== null) {
      window.clearTimeout(this.timeout);
    }
    
    if (this.timeoutRef.current !== null) {
      window.clearTimeout(this.timeoutRef.current);
    }
    
    if (this.updateInterval !== null) {
      window.clearInterval(this.updateInterval);
    }
  }
}

/**
 * Initialize all popovers on the page
 */
const initPopovers = (): void => {
  const popovers = document.querySelectorAll(POPOVER.SELECTORS.POPOVER);
  
  popovers.forEach((element: Element) => {
    const popover = element as HTMLElement;
    // Get configuration from data attributes
    const position = popover.getAttribute(POPOVER.ATTRIBUTES.POSITION) as PopoverPosition | 'auto' || POPOVER.DEFAULTS.POSITION;
    const trigger = popover.getAttribute(POPOVER.ATTRIBUTES.TRIGGER) as 'hover' | 'click' || POPOVER.DEFAULTS.TRIGGER;
    const offset = parseInt(popover.getAttribute('data-popover-offset') || String(POPOVER.DEFAULTS.OFFSET), 10);
    const delay = parseInt(popover.getAttribute('data-popover-delay') || String(POPOVER.DEFAULTS.DELAY), 10);
    
    // Initialize popover
    new Popover(popover, { position, trigger, offset, delay });
  });
};

// Initialize on DOMContentLoaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopovers);
  } else {
    initPopovers();
  }
}

export default Popover;
export { initPopovers }; 