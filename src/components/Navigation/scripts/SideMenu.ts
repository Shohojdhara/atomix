import { SIDE_MENU } from '../../../lib/constants/components';

/**
 * Default options for SideMenu component
 */
const DEFAULTS = {
  collapsible: true,
  open: false,
  title: '',
  toggleIcon: '▶',
  keyboard: true,
  autoOpen: true, // Auto-open on desktop
};

/**
 * SideMenu component class for vanilla JavaScript implementation
 * Provides collapsible side navigation functionality with responsive behavior
 *
 * @example
 * ```js
 * // Initialize a side menu
 * const sideMenu = new SideMenu('.c-side-menu', {
 *   collapsible: true,
 *   autoOpen: true
 * });
 *
 * // Control programmatically
 * sideMenu.open();
 * sideMenu.close();
 * sideMenu.toggle();
 * ```
 */
export default class SideMenu {
  private element: HTMLElement;
  private options: any;
  private toggler: HTMLElement | null = null;
  private wrapper: HTMLElement | null = null;
  private inner: HTMLElement | null = null;
  private togglerIcon: HTMLElement | null = null;
  private isOpen: boolean = false;
  private resizeHandler: () => void;

  /**
   * Create a new SideMenu instance
   * @param element - The side menu element or selector
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: any = {}) {
    this.element =
      typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;

    if (!this.element) {
      throw new Error('SideMenu element not found');
    }

    this.options = { ...DEFAULTS, ...options };
    this.resizeHandler = this._handleResize.bind(this);
    this._init();
  }

  /**
   * Initialize the side menu component
   * @private
   */
  private _init(): void {
    this._findElements();
    this._bindEvents();
    this._setInitialState();
  }

  /**
   * Find required DOM elements
   * @private
   */
  private _findElements(): void {
    this.toggler = this.element.querySelector(SIDE_MENU.SELECTORS.TOGGLER);
    this.wrapper = this.element.querySelector(SIDE_MENU.SELECTORS.WRAPPER);
    this.inner = this.element.querySelector(SIDE_MENU.SELECTORS.INNER);
    this.togglerIcon = this.element.querySelector(SIDE_MENU.SELECTORS.TOGGLER_ICON);
  }

  /**
   * Bind event listeners
   * @private
   */
  private _bindEvents(): void {
    if (this.toggler) {
      this.toggler.addEventListener('click', this._handleToggleClick.bind(this));
    }

    if (this.options.keyboard && this.toggler) {
      this.toggler.addEventListener('keydown', this._handleKeydown.bind(this));
    }

    // Handle window resize for responsive behavior
    window.addEventListener('resize', this.resizeHandler);
  }

  /**
   * Set initial component state
   * @private
   */
  private _setInitialState(): void {
    this.isOpen = this.options.open || false;
    this._handleResize(); // Set initial responsive state
  }

  /**
   * Handle toggle button click
   * @private
   */
  private _handleToggleClick(event: Event): void {
    event.preventDefault();
    this.toggle();
  }

  /**
   * Handle keyboard events
   * @private
   */
  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  /**
   * Handle window resize for responsive behavior
   * @private
   */
  private _handleResize(): void {
    const isMobile = window.innerWidth < 768; // MD breakpoint

    if (!this.options.collapsible) {
      // Always open if not collapsible
      this._updateOpenState(true, false);
      return;
    }

    if (!isMobile && this.options.autoOpen) {
      // Auto-open on desktop
      this._updateOpenState(true, false);

      // Reset wrapper height on desktop
      if (this.wrapper) {
        this.wrapper.style.height = 'auto';
      }
    } else if (isMobile) {
      // Set proper height for mobile animation
      this._updateWrapperHeight();
    }
  }

  /**
   * Update wrapper height for mobile animation
   * @private
   */
  private _updateWrapperHeight(): void {
    if (!this.wrapper || !this.inner) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile && this.options.collapsible) {
      if (this.isOpen) {
        this.wrapper.style.height = `${this.inner.scrollHeight}px`;
      } else {
        this.wrapper.style.height = '0px';
      }
    } else {
      this.wrapper.style.height = 'auto';
    }
  }

  /**
   * Update the open state and DOM
   * @private
   */
  private _updateOpenState(newState: boolean, animate: boolean = true): void {
    this.isOpen = newState;

    // Update toggler aria-expanded
    if (this.toggler) {
      this.toggler.setAttribute('aria-expanded', this.isOpen.toString());
    }

    // Update wrapper aria-hidden
    if (this.wrapper) {
      this.wrapper.setAttribute('aria-hidden', (!this.isOpen).toString());
    }

    // Update CSS classes
    if (this.isOpen) {
      this.element.classList.add(SIDE_MENU.CLASSES.IS_OPEN);
    } else {
      this.element.classList.remove(SIDE_MENU.CLASSES.IS_OPEN);
    }

    // Update wrapper height for mobile
    if (animate) {
      this._updateWrapperHeight();
    }

    // Dispatch custom event
    const eventType = this.isOpen ? 'sidemenu:opened' : 'sidemenu:closed';
    const customEvent = new CustomEvent(eventType, {
      detail: { sideMenu: this, open: this.isOpen },
    });
    this.element.dispatchEvent(customEvent);
  }

  /**
   * Open the side menu
   */
  public open(): void {
    if (this.isOpen) return;
    this._updateOpenState(true);
  }

  /**
   * Close the side menu
   */
  public close(): void {
    if (!this.isOpen) return;
    this._updateOpenState(false);
  }

  /**
   * Toggle the side menu open state
   */
  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Get the current open state
   * @returns Whether the side menu is open
   */
  public isOpened(): boolean {
    return this.isOpen;
  }

  /**
   * Update side menu options
   * @param newOptions - New options to merge
   */
  public updateOptions(newOptions: Partial<typeof DEFAULTS>): void {
    this.options = { ...this.options, ...newOptions };

    // Re-apply responsive behavior if autoOpen changed
    if ('autoOpen' in newOptions) {
      this._handleResize();
    }
  }

  /**
   * Set active menu item
   * @param selector - Selector for the menu item to activate
   */
  public setActiveItem(selector: string): void {
    // Remove active class from all items
    const allItems = this.element.querySelectorAll(SIDE_MENU.SELECTORS.LINK);
    allItems.forEach(item => {
      item.classList.remove(SIDE_MENU.CLASSES.ACTIVE);
      item.removeAttribute('aria-current');
    });

    // Add active class to selected item
    const activeItem = this.element.querySelector(selector);
    if (activeItem) {
      activeItem.classList.add(SIDE_MENU.CLASSES.ACTIVE);
      activeItem.setAttribute('aria-current', 'page');
    }
  }

  /**
   * Get all menu items
   * @returns Array of menu item elements
   */
  public getMenuItems(): HTMLElement[] {
    return Array.from(this.element.querySelectorAll(SIDE_MENU.SELECTORS.LINK));
  }

  /**
   * Destroy the side menu instance and clean up
   */
  public destroy(): void {
    // Remove event listeners
    if (this.toggler) {
      this.toggler.removeEventListener('click', this._handleToggleClick);
      this.toggler.removeEventListener('keydown', this._handleKeydown);
    }

    window.removeEventListener('resize', this.resizeHandler);

    // Reset DOM state
    this.element.classList.remove(SIDE_MENU.CLASSES.IS_OPEN);

    if (this.wrapper) {
      this.wrapper.style.height = '';
      this.wrapper.removeAttribute('aria-hidden');
    }

    if (this.toggler) {
      this.toggler.removeAttribute('aria-expanded');
    }

    // Clear references
    this.element = null as any;
    this.toggler = null;
    this.wrapper = null;
    this.inner = null;
    this.togglerIcon = null;
  }
}
