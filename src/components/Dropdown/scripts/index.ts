import { DROPDOWN } from '../../../lib/constants/components';
import {
  DropdownPosition,
  DropdownTrigger,
  DropdownOptions,
  TimerRef
} from './componentInteractions';

/**
 * Class representing a Dropdown component
 */
class Dropdown {
  private element: HTMLElement;
  private trigger: HTMLElement | null;
  private menuWrapper: HTMLElement | null;
  private menuInner: HTMLElement | null;
  private menu: HTMLElement | null;
  private options: Required<DropdownOptions>;
  private isOpen: boolean;
  private timeoutRef: { current: number | null };
  private animating: boolean;

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
    this.menu = null;
    this.isOpen = false;
    this.timeoutRef = { current: null };
    this.animating = false;
    
    // Set default options
    this.options = {
      placement: options.placement || DROPDOWN.DEFAULTS.PLACEMENT as DropdownPosition,
      trigger: options.trigger || DROPDOWN.DEFAULTS.TRIGGER as DropdownTrigger,
      offset: options.offset !== undefined ? options.offset : DROPDOWN.DEFAULTS.OFFSET,
      closeOnClickOutside: options.closeOnClickOutside !== undefined ? options.closeOnClickOutside : true,
      closeOnEscape: options.closeOnEscape !== undefined ? options.closeOnEscape : true,
      minWidth: options.minWidth?.toString() || DROPDOWN.DEFAULTS.MIN_WIDTH.toString(),
      maxHeight: options.maxHeight || ''
    };

    this._initialize();
  }

  /**
   * Initialize the dropdown component
   */
  private _initialize(): void {
    // Generate unique ID if not already set
    const id = this.element.id || `dropdown-${Math.random().toString(36).substring(2, 9)}`;
    this.element.id = id;
    
    // Add proper CSS class based on trigger type
    if (this.options.trigger === 'click') {
      this.element.classList.add('c-dropdown--onclick');
    } else {
      this.element.classList.remove('c-dropdown--onclick');
    }
    
    // Find trigger element
    this.trigger = this.element.querySelector('.c-dropdown__trigger') || 
                  this.element.querySelector('.c-dropdown__toggle');
    
    // Find or create menu structure
    this._setupMenuStructure(id);
    
    // Setup ARIA attributes
    this._setupAriaAttributes(id);
    
    // Apply styles to menu
    this._applyStyles();
    
    // Bind events
    this._bindEvents();
  }
  
  /**
   * Set up menu structure
   */
  private _setupMenuStructure(id: string): void {
    this.menuWrapper = this.element.querySelector('.c-dropdown__menu-wrapper');
    
    if (!this.menuWrapper) {
      // Create menu wrapper 
      this.menuWrapper = document.createElement('div');
      this.menuWrapper.className = 'c-dropdown__menu-wrapper';
      this.menuWrapper.classList.add(`c-dropdown__menu-wrapper--${this.options.placement}`);
      
      // Create inner wrapper
      this.menuInner = document.createElement('div');
      this.menuInner.className = 'c-dropdown__menu-inner';
      
      // Handle existing menu or create new one
      const existingMenu = this.element.querySelector('.c-dropdown__menu');
      
      if (existingMenu) {
        this.menu = existingMenu as HTMLElement;
        this.menuInner.appendChild(existingMenu);
      } else {
        this.menu = document.createElement('ul');
        this.menu.className = 'c-dropdown__menu';
        this.menuInner.appendChild(this.menu);
      }
      
      this.menuWrapper.appendChild(this.menuInner);
      this.element.appendChild(this.menuWrapper);
    } else {
      // Find existing menu elements
      this.menuInner = this.menuWrapper.querySelector('.c-dropdown__menu-inner');
      this.menu = this.menuWrapper.querySelector('.c-dropdown__menu');
      
      if (!this.menuInner) {
        this.menuInner = document.createElement('div');
        this.menuInner.className = 'c-dropdown__menu-inner';
        
        if (this.menu) {
          this.menuInner.appendChild(this.menu);
        } else {
          this.menu = document.createElement('ul');
          this.menu.className = 'c-dropdown__menu';
          this.menuInner.appendChild(this.menu);
        }
        
        this.menuWrapper.appendChild(this.menuInner);
      } else if (!this.menu) {
        this.menu = document.createElement('ul');
        this.menu.className = 'c-dropdown__menu';
        this.menuInner.appendChild(this.menu);
      }
    }
    
    // Add proper role to menu items
    if (this.menu) {
      const menuItems = this.menu.querySelectorAll('button, a');
      menuItems.forEach(item => {
        if (!item.getAttribute('role')) {
          item.setAttribute('role', 'menuitem');
        }
        
        if (!item.getAttribute('tabindex')) {
          item.setAttribute('tabindex', '0');
        }
        
        // Add proper class if missing
        if (!item.classList.contains('c-dropdown__menu-item')) {
          item.classList.add('c-dropdown__menu-item');
        }
      });
    }
  }
  
  /**
   * Setup ARIA attributes 
   */
  private _setupAriaAttributes(id: string): void {
    if (this.trigger) {
      this.trigger.setAttribute('aria-haspopup', 'menu');
      this.trigger.setAttribute('aria-expanded', 'false');
      this.trigger.setAttribute('aria-controls', id);
      this.trigger.setAttribute('tabindex', '0');
    }
    
    if (this.menuWrapper) {
      this.menuWrapper.setAttribute('role', 'menu');
      this.menuWrapper.setAttribute('aria-orientation', 'vertical');
      this.menuWrapper.setAttribute('aria-hidden', 'true');
      this.menuWrapper.id = id;
    }
  }
  
  /**
   * Apply styles to menu
   */
  private _applyStyles(): void {
    if (!this.menuInner) return;
    
    // Apply minWidth
    if (this.options.minWidth) {
      const minWidthStr = String(this.options.minWidth);
      this.menuInner.style.minWidth = minWidthStr.includes('px') 
        ? minWidthStr 
        : `${minWidthStr}px`;
    }
    
    // Apply maxHeight
    if (this.options.maxHeight) {
      this.menuInner.style.maxHeight = this.options.maxHeight.includes('px')
        ? this.options.maxHeight
        : `${this.options.maxHeight}px`;
      
      this.menuInner.style.overflowY = 'auto';
    }
  }
  
  /**
   * Bind event listeners
   */
  private _bindEvents(): void {
    if (!this.trigger) return;
    
    // Click or hover events based on trigger type
    if (this.options.trigger === 'click') {
      this.trigger.addEventListener('click', this._handleTriggerClick);
      
      if (this.options.closeOnClickOutside) {
        document.addEventListener('click', this._handleDocumentClick);
      }
    } else if (this.options.trigger === 'hover') {
      this.trigger.addEventListener('mouseenter', this._handleTriggerMouseEnter);
      this.trigger.addEventListener('mouseleave', this._handleTriggerMouseLeave);
      
      if (this.menuWrapper) {
        this.menuWrapper.addEventListener('mouseenter', this._handleMenuMouseEnter);
        this.menuWrapper.addEventListener('mouseleave', this._handleMenuMouseLeave);
      }
    }
    
    // Keyboard event handlers
    this.trigger.addEventListener('keydown', this._handleTriggerKeyDown);
    
    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', this._handleEscapeKey);
    }
    
    if (this.menuWrapper) {
      this.menuWrapper.addEventListener('keydown', this._handleMenuKeyDown);
      this.menuWrapper.addEventListener('animationend', this._handleAnimationEnd);
    }
  }

  /**
   * Handle animation end events
   */
  private _handleAnimationEnd = (event: AnimationEvent): void => {
    if (event.target === this.menuWrapper) {
      this.animating = false;
      
      if (!this.isOpen && this.menuWrapper) {
        this.menuWrapper.setAttribute('aria-hidden', 'true');
      }
    }
  }

  /**
   * Handle click on trigger
   */
  private _handleTriggerClick = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
    
    this.toggle();
  }
  
  /**
   * Handle keydown on trigger
   */
  private _handleTriggerKeyDown = (event: KeyboardEvent): void => {
    if ((event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') && !this.isOpen) {
      event.preventDefault();
      this.open();
    } else if (event.key === 'Escape' && this.isOpen) {
      event.preventDefault();
      this.close();
    }
  }

  /**
   * Handle document click
   */
  private _handleDocumentClick = (event: MouseEvent): void => {
    if (!this.isOpen) return;
    
    const target = event.target as Node;
    
    if (this.element && !this.element.contains(target)) {
      this.close();
    }
  }

  /**
   * Handle mouseenter on trigger
   */
  private _handleTriggerMouseEnter = (): void => {
    if (this.timeoutRef.current !== null) {
      window.clearTimeout(this.timeoutRef.current);
      this.timeoutRef.current = null;
    }
    
    this.open();
  }

  /**
   * Handle mouseleave on trigger
   */
  private _handleTriggerMouseLeave = (): void => {
    if (!this.menuWrapper) return;
    
    this.timeoutRef.current = window.setTimeout(() => {
      if (!this.menuWrapper?.matches(':hover')) {
        this.close();
      }
      this.timeoutRef.current = null;
    }, 150);
  }
  
  /**
   * Handle mouseenter on menu
   */
  private _handleMenuMouseEnter = (): void => {
    if (this.timeoutRef.current !== null) {
      window.clearTimeout(this.timeoutRef.current);
      this.timeoutRef.current = null;
    }
  }
  
  /**
   * Handle mouseleave on menu
   */
  private _handleMenuMouseLeave = (): void => {
    if (this.options.trigger === 'hover') {
      this.close();
    }
  }

  /**
   * Handle escape key
   */
  private _handleEscapeKey = (event: KeyboardEvent): void => {
    if (this.isOpen && event.key === 'Escape') {
      event.preventDefault();
      this.close();
      this.trigger?.focus();
    }
  }
  
  /**
   * Handle keyboard navigation
   */
  private _handleMenuKeyDown = (event: KeyboardEvent): void => {
    if (!this.menuWrapper || !this.isOpen) return;
    
    const focusableItems = Array.from(
      this.menuWrapper.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])')
    );
    
    if (!focusableItems.length) return;
    
    const currentIndex = focusableItems.findIndex(item => item === document.activeElement);
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex < focusableItems.length - 1) {
          focusableItems[currentIndex + 1].focus();
        } else {
          focusableItems[0].focus();
        }
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex > 0) {
          focusableItems[currentIndex - 1].focus();
        } else {
          focusableItems[focusableItems.length - 1].focus();
        }
        break;
        
      case 'Home':
        event.preventDefault();
        focusableItems[0].focus();
        break;
        
      case 'End':
        event.preventDefault();
        focusableItems[focusableItems.length - 1].focus();
        break;
    }
  }

  /**
   * Focus the first menu item
   */
  private _focusFirstMenuItem(): void {
    if (!this.menuWrapper) return;
    
    const firstItem = this.menuWrapper.querySelector<HTMLElement>('[role="menuitem"]');
    
    if (firstItem) {
      requestAnimationFrame(() => {
        firstItem.focus();
      });
    }
  }

  /**
   * Open the dropdown
   */
  public open(): void {
    if (this.isOpen) return;
    
    this.isOpen = true;
    this.animating = true;
    
    if (this.trigger) {
      this.trigger.setAttribute('aria-expanded', 'true');
    }
    
    if (this.menuWrapper) {
      this.menuWrapper.setAttribute('aria-hidden', 'false');
      this.menuWrapper.classList.add('is-open');
      
      if (this.animating) {
        this.menuWrapper.classList.add('is-animating');
      }
    }
    
    this._focusFirstMenuItem();
    
    this.element.dispatchEvent(new CustomEvent('dropdown:open', { 
      bubbles: true,
      detail: { dropdown: this }
    }));
  }

  /**
   * Close the dropdown
   */
  public close(): void {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.animating = true;
    
    if (this.trigger) {
      this.trigger.setAttribute('aria-expanded', 'false');
    }
    
    if (this.menuWrapper) {
      this.menuWrapper.classList.remove('is-open');
      
      if (this.animating) {
        this.menuWrapper.classList.add('is-animating');
      }
    }
    
    this.element.dispatchEvent(new CustomEvent('dropdown:close', { 
      bubbles: true,
      detail: { dropdown: this }
    }));
  }

  /**
   * Toggle the dropdown
   */
  public toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  /**
   * Update dropdown options
   */
  public update(options: Partial<DropdownOptions>): void {
    // Update options
    Object.assign(this.options, options);
    
    // Update trigger type class if needed
    if (options.trigger !== undefined) {
      if (options.trigger === 'click') {
        this.element.classList.add('c-dropdown--onclick');
      } else {
        this.element.classList.remove('c-dropdown--onclick');
      }
    }
    
    // Update placement class if needed
    if (options.placement && this.menuWrapper) {
      // Remove existing placement classes
      Array.from(this.menuWrapper.classList)
        .filter(cls => cls.startsWith('c-dropdown__menu-wrapper--'))
        .forEach(cls => this.menuWrapper?.classList.remove(cls));
      
      // Add new placement class
      this.menuWrapper.classList.add(`c-dropdown__menu-wrapper--${options.placement}`);
    }
    
    // Apply updated styles
    this._applyStyles();
  }

  /**
   * Destroy the dropdown instance
   */
  public destroy(): void {
    // Remove event listeners
    if (this.trigger) {
      this.trigger.removeEventListener('click', this._handleTriggerClick);
      this.trigger.removeEventListener('mouseenter', this._handleTriggerMouseEnter);
      this.trigger.removeEventListener('mouseleave', this._handleTriggerMouseLeave);
      this.trigger.removeEventListener('keydown', this._handleTriggerKeyDown);
    }
    
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleEscapeKey);
    
    if (this.menuWrapper) {
      this.menuWrapper.removeEventListener('mouseenter', this._handleMenuMouseEnter);
      this.menuWrapper.removeEventListener('mouseleave', this._handleMenuMouseLeave);
      this.menuWrapper.removeEventListener('keydown', this._handleMenuKeyDown);
      this.menuWrapper.removeEventListener('animationend', this._handleAnimationEnd);
    }
    
    // Close if open
    if (this.isOpen) {
      this.close();
    }
    
    // Clear timeouts
    if (this.timeoutRef.current !== null) {
      window.clearTimeout(this.timeoutRef.current);
      this.timeoutRef.current = null;
    }
    
    // Remove reference
    // @ts-ignore: Custom property
    this.element._dropdown = null;
  }
}

/**
 * Initialize all dropdowns in the document
 */
const initializeDropdowns = (): Dropdown[] => {
  const dropdownElements = Array.from(document.querySelectorAll(DROPDOWN.SELECTORS.DROPDOWN));
  
  return dropdownElements.map(element => {
    // Skip already initialized dropdowns
    // @ts-ignore: Custom property
    if (element._dropdown instanceof Dropdown) {
      // @ts-ignore: Custom property
      return element._dropdown;
    }
    
    const options: DropdownOptions = {
      placement: (element as HTMLElement).dataset.dropdownPlacement as DropdownPosition,
      trigger: (element as HTMLElement).dataset.dropdownTrigger as DropdownTrigger,
      offset: (element as HTMLElement).dataset.dropdownOffset ? 
        Number((element as HTMLElement).dataset.dropdownOffset) : 
        undefined,
      closeOnClickOutside: (element as HTMLElement).dataset.dropdownCloseOnClickOutside !== 'false',
      closeOnEscape: (element as HTMLElement).dataset.dropdownCloseOnEscape !== 'false',
      minWidth: (element as HTMLElement).dataset.dropdownMinWidth || undefined,
      maxHeight: (element as HTMLElement).dataset.dropdownMaxHeight || undefined
    };
    
    const dropdown = new Dropdown(element as HTMLElement, options);
    
    // Store instance on element
    // @ts-ignore: Custom property
    (element as HTMLElement)._dropdown = dropdown;
    
    return dropdown;
  });
};

/**
 * Create a dropdown instance for a specific element
 */
const createDropdown = (element: HTMLElement | string, options: DropdownOptions = {}): Dropdown => {
  const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
  
  if (!el) {
    throw new Error(`Dropdown target not found: ${element}`);
  }
  
  // @ts-ignore: Custom property
  if (el._dropdown instanceof Dropdown) {
    // @ts-ignore: Custom property
    return el._dropdown;
  }
  
  const dropdown = new Dropdown(el, options);
  
  // Store instance on element
  // @ts-ignore: Custom property
  el._dropdown = dropdown;
  
  return dropdown;
};

export { Dropdown, initializeDropdowns, createDropdown };

// Auto-initialize if DOM is loaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initializeDropdowns, 1);
  } else {
    document.addEventListener('DOMContentLoaded', initializeDropdowns);
  }
} 