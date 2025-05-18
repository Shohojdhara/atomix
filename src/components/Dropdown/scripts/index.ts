import { DROPDOWN } from '../../../lib/constants/components';
import {
  DropdownPosition,
  DropdownTrigger,
  DropdownOptions,
  handleTriggerClick,
  handleDocumentClick,
  handleTriggerMouseEnter,
  handleTriggerMouseLeave,
  handleEscapeKey,
  determineBestPosition,
  checkAndFlipPosition,
  calculateDropdownPosition,
  setPositionClass,
  handleKeyboardNavigation
} from './componentInteractions';

/**
 * Class representing a Dropdown component
 */
class Dropdown {
  private element: HTMLElement;
  private trigger: HTMLElement | null;
  private menuWrapper: HTMLElement | null;
  private menuInner: HTMLElement | null;
  private options: Required<DropdownOptions>;
  private isOpen: boolean;
  private currentPosition: DropdownPosition;
  private updateInterval: number | null;
  private timeoutRef: { current: number | null };

  /**
   * Creates an instance of Dropdown
   * @param element - The dropdown element
   * @param options - Configuration options
   */
  constructor(element: HTMLElement, options: DropdownOptions = {}) {
    this.element = element;
    this.trigger = null;
    this.menuWrapper = null;
    this.menuInner = null;
    this.isOpen = false;
    this.updateInterval = null;
    this.timeoutRef = { current: null };
    this.options = {
      placement: options.placement || DROPDOWN.DEFAULTS.PLACEMENT as DropdownPosition,
      trigger: options.trigger || DROPDOWN.DEFAULTS.TRIGGER as DropdownTrigger,
      offset: options.offset !== undefined ? options.offset : DROPDOWN.DEFAULTS.OFFSET,
      closeOnClickOutside: options.closeOnClickOutside !== undefined ? options.closeOnClickOutside : true,
      closeOnEscape: options.closeOnEscape !== undefined ? options.closeOnEscape : true,
      minWidth: options.minWidth || DROPDOWN.DEFAULTS.MIN_WIDTH,
      maxHeight: options.maxHeight || ''
    };
    
    // Initialize current position from options
    this.currentPosition = this.options.placement;

    this._initialize();
  }

  /**
   * Initialize the dropdown component
   */
  private _initialize(): void {
    // Find elements
    const id = this.element.id || `dropdown-${Math.random().toString(36).substring(2, 9)}`;
    this.element.id = id;
    
    this.trigger = this.element.querySelector('.c-dropdown__toggle') as HTMLElement;
    this.menuWrapper = this.element.querySelector('.c-dropdown__menu-wrapper') as HTMLElement;
    this.menuInner = this.element.querySelector('.c-dropdown__menu-inner') as HTMLElement;
    
    // Setup attributes
    if (this.trigger) {
      this.trigger.setAttribute('aria-haspopup', 'true');
      this.trigger.setAttribute('aria-expanded', 'false');
      this.trigger.setAttribute('aria-controls', id);
    }
    
    if (this.menuWrapper) {
      this.menuWrapper.setAttribute('role', 'menu');
      this.menuWrapper.setAttribute('aria-orientation', 'vertical');
      this.menuWrapper.setAttribute('aria-hidden', 'true');
      
      // Apply min-width and max-height using utility classes
      if (this.menuInner) {
        // Extract numeric value from minWidth and add utility class
        const minWidthValue = this.options.minWidth.replace(/[^0-9]/g, '');
        if (minWidthValue && this.options.minWidth !== DROPDOWN.DEFAULTS.MIN_WIDTH) {
          this.menuInner.classList.add(`u-mw-${minWidthValue}`);
        }
        
        // Extract numeric value from maxHeight and add utility class
        if (this.options.maxHeight) {
          const maxHeightValue = this.options.maxHeight.replace(/[^0-9]/g, '');
          if (maxHeightValue) {
            this.menuInner.classList.add(`u-mh-${maxHeightValue}`);
            this.menuInner.classList.add('u-overflow-y-auto');
          }
        }
      }
    }
    
    // Set initial position class
    if (this.menuWrapper) {
      setPositionClass(this.menuWrapper, this.currentPosition, false);
    }
    
    // Bind events
    this._bindEvents();
  }
  
  /**
   * Bind event listeners
   */
  private _bindEvents(): void {
    if (!this.trigger) return;
    
    if (this.options.trigger === 'click') {
      this.trigger.addEventListener('click', this._handleTriggerClick.bind(this));
      
      if (this.options.closeOnClickOutside) {
        document.addEventListener('click', this._handleDocumentClick.bind(this));
      }
    } else if (this.options.trigger === 'hover') {
      this.trigger.addEventListener('mouseenter', this._handleTriggerMouseEnter.bind(this));
      this.trigger.addEventListener('mouseleave', this._handleTriggerMouseLeave.bind(this));
      
      if (this.menuWrapper) {
        this.menuWrapper.addEventListener('mouseenter', this._handleMenuMouseEnter.bind(this));
        this.menuWrapper.addEventListener('mouseleave', this._handleMenuMouseLeave.bind(this));
      }
    }
    
    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', this._handleEscapeKey.bind(this));
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', this._handleKeyboardNavigation.bind(this));
    
    // Add resize and scroll handlers
    window.addEventListener('resize', this._updatePosition.bind(this));
    window.addEventListener('scroll', this._updatePosition.bind(this), { passive: true });
  }

  /**
   * Handle click on trigger
   */
  private _handleTriggerClick(event: Event): void {
    handleTriggerClick(this.isOpen, this.open.bind(this), this.close.bind(this), event);
  }

  /**
   * Handle document click for closing dropdown
   */
  private _handleDocumentClick(event: MouseEvent): void {
    if (!this.menuWrapper) return;
    
    handleDocumentClick(
      this.menuWrapper, 
      this.trigger, 
      this.isOpen, 
      this.close.bind(this), 
      event
    );
  }

  /**
   * Handle mouseenter on trigger
   */
  private _handleTriggerMouseEnter(): void {
    handleTriggerMouseEnter(this.open.bind(this), this.timeoutRef);
  }

  /**
   * Handle mouseleave on trigger
   */
  private _handleTriggerMouseLeave(): void {
    if (!this.menuWrapper) return;
    
    handleTriggerMouseLeave(this.menuWrapper, this.close.bind(this), this.timeoutRef);
  }
  
  /**
   * Handle mouseenter on menu
   */
  private _handleMenuMouseEnter(): void {
    if (this.timeoutRef.current !== null) {
      window.clearTimeout(this.timeoutRef.current);
      this.timeoutRef.current = null;
    }
  }
  
  /**
   * Handle mouseleave on menu
   */
  private _handleMenuMouseLeave(): void {
    this.close();
  }

  /**
   * Handle escape key
   */
  private _handleEscapeKey(event: KeyboardEvent): void {
    handleEscapeKey(this.isOpen, this.close.bind(this), event);
  }
  
  /**
   * Handle keyboard navigation
   */
  private _handleKeyboardNavigation(event: KeyboardEvent): void {
    if (!this.menuWrapper) return;
    
    handleKeyboardNavigation(event, this.menuWrapper, this.close.bind(this));
  }

  /**
   * Update dropdown position
   */
  private _updatePosition(): void {
    if (!this.isOpen || !this.trigger || !this.menuWrapper) return;
    
    const triggerRect = this.trigger.getBoundingClientRect();
    const dropdownRect = this.menuWrapper.getBoundingClientRect();
    
    // Check if menu should be repositioned
    this.currentPosition = checkAndFlipPosition(
      triggerRect,
      dropdownRect,
      this.options.placement,
      this.options.offset
    );
    
    // Apply position class
    setPositionClass(this.menuWrapper, this.currentPosition, false);
    
    // Calculate position
    const { top, left } = calculateDropdownPosition(
      triggerRect,
      dropdownRect,
      this.currentPosition,
      this.options.offset
    );
    
    // Apply position using utility classes where possible
    this.menuWrapper.classList.add('u-position-absolute');
    
    // We still need to use inline styles for exact positioning
    this.menuWrapper.style.top = `${top}px`;
    this.menuWrapper.style.left = `${left}px`;
  }

  /**
   * Open the dropdown
   */
  public open(): void {
    if (this.isOpen) return;
    
    // Update state
    this.isOpen = true;
    
    // Update DOM
    if (this.trigger) {
      this.trigger.setAttribute('aria-expanded', 'true');
    }
    
    if (this.menuWrapper) {
      this.menuWrapper.classList.add(DROPDOWN.CLASSES.IS_OPEN);
      this.menuWrapper.setAttribute('aria-hidden', 'false');
      
      // Calculate position
      this._updatePosition();
      
      // Setup periodic position updates
      this.updateInterval = window.setInterval(this._updatePosition.bind(this), 200);
    }
    
    // Trigger event
    this.element.dispatchEvent(new CustomEvent('dropdown:open'));
  }

  /**
   * Close the dropdown
   */
  public close(): void {
    if (!this.isOpen) return;
    
    // Update state
    this.isOpen = false;
    
    // Update DOM
    if (this.trigger) {
      this.trigger.setAttribute('aria-expanded', 'false');
    }
    
    if (this.menuWrapper) {
      this.menuWrapper.classList.remove(DROPDOWN.CLASSES.IS_OPEN);
      this.menuWrapper.setAttribute('aria-hidden', 'true');
    }
    
    // Clear interval
    if (this.updateInterval) {
      window.clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    
    // Trigger event
    this.element.dispatchEvent(new CustomEvent('dropdown:close'));
  }

  /**
   * Toggle the dropdown
   */
  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Destroy the dropdown component
   */
  public destroy(): void {
    // Remove event listeners
    if (this.trigger) {
      this.trigger.removeEventListener('click', this._handleTriggerClick.bind(this));
      this.trigger.removeEventListener('mouseenter', this._handleTriggerMouseEnter.bind(this));
      this.trigger.removeEventListener('mouseleave', this._handleTriggerMouseLeave.bind(this));
    }
    
    if (this.menuWrapper) {
      this.menuWrapper.removeEventListener('mouseenter', this._handleMenuMouseEnter.bind(this));
      this.menuWrapper.removeEventListener('mouseleave', this._handleMenuMouseLeave.bind(this));
    }
    
    document.removeEventListener('click', this._handleDocumentClick.bind(this));
    document.removeEventListener('keydown', this._handleEscapeKey.bind(this));
    document.removeEventListener('keydown', this._handleKeyboardNavigation.bind(this));
    
    window.removeEventListener('resize', this._updatePosition.bind(this));
    window.removeEventListener('scroll', this._updatePosition.bind(this));
    
    // Clear any timers
    if (this.updateInterval) {
      window.clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    
    if (this.timeoutRef.current !== null) {
      window.clearTimeout(this.timeoutRef.current);
      this.timeoutRef.current = null;
    }
    
    // Trigger event
    this.element.dispatchEvent(new CustomEvent('dropdown:destroy'));
  }
}

/**
 * Initialize all dropdowns in the document
 */
const initDropdowns = (): void => {
  const dropdowns = document.querySelectorAll(DROPDOWN.SELECTORS.DROPDOWN);
  
  dropdowns.forEach((element) => {
    // Skip if already initialized
    if ((element as any).__dropdown) return;
    
    // Get options from data attributes
    const placement = element.getAttribute(DROPDOWN.ATTRIBUTES.PLACEMENT) as DropdownPosition | null;
    const trigger = element.getAttribute(DROPDOWN.ATTRIBUTES.TRIGGER) as DropdownTrigger | null;
    
    // Create instance
    const instance = new Dropdown(element as HTMLElement, {
      placement: placement || undefined,
      trigger: trigger || undefined
    });
    
    // Store instance reference
    (element as any).__dropdown = instance;
  });
};

// Auto-initialize on DOM content loaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }
}

export default Dropdown;
export { initDropdowns }; 