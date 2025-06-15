import { NAVBAR } from '../../../lib/constants/components';

/**
 * Default options for Navbar component
 */
const DEFAULTS = {
  collapsible: true,
  expanded: false,
  position: 'static',
  backdrop: false,
  keyboard: true,
  autoClose: true,
};

/**
 * Navbar component class for vanilla JavaScript implementation
 * Provides responsive navigation functionality with collapsible mobile menu
 *
 * @example
 * ```js
 * // Initialize a navbar
 * const navbar = new Navbar('.c-navbar', {
 *   collapsible: true,
 *   autoClose: true
 * });
 *
 * // Control programmatically
 * navbar.expand();
 * navbar.collapse();
 * ```
 */
export default class Navbar {
  private element: HTMLElement;
  private options: any;
  private toggler: HTMLButtonElement | null = null;
  private collapseElement: HTMLElement | null = null;
  private isExpanded: boolean = false;
  private resizeHandler: () => void;

  /**
   * Create a new Navbar instance
   * @param element - The navbar element or selector
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: any = {}) {
    this.element =
      typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;

    if (!this.element) {
      throw new Error('Navbar element not found');
    }

    this.options = { ...DEFAULTS, ...options };
    this.resizeHandler = this._handleResize.bind(this);
    this._init();
  }

  /**
   * Initialize the navbar component
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
    this.toggler = this.element.querySelector(NAVBAR.SELECTORS.TOGGLER);
    this.collapseElement = this.element.querySelector(NAVBAR.SELECTORS.COLLAPSE);
  }

  /**
   * Bind event listeners
   * @private
   */
  private _bindEvents(): void {
    if (this.toggler) {
      this.toggler.addEventListener('click', this._handleToggleClick.bind(this));
    }

    if (this.options.keyboard) {
      document.addEventListener('keydown', this._handleKeydown.bind(this));
    }

    // Handle window resize for responsive behavior
    window.addEventListener('resize', this.resizeHandler);

    // Auto-close on outside click if enabled
    if (this.options.autoClose) {
      document.addEventListener('click', this._handleOutsideClick.bind(this));
    }
  }

  /**
   * Set initial component state
   * @private
   */
  private _setInitialState(): void {
    this.isExpanded = this.options.expanded || false;
    this._updateExpandedState();
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
    if (event.key === 'Escape' && this.isExpanded) {
      this.collapse();
    }
  }

  /**
   * Handle window resize
   * @private
   */
  private _handleResize(): void {
    // Auto-collapse on desktop breakpoint
    if (window.innerWidth >= 768 && this.isExpanded) {
      this.collapse();
    }
  }

  /**
   * Handle clicks outside the navbar
   * @private
   */
  private _handleOutsideClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.isExpanded && !this.element.contains(target)) {
      this.collapse();
    }
  }

  /**
   * Update the expanded state and DOM
   * @private
   */
  private _updateExpandedState(): void {
    if (this.toggler) {
      this.toggler.setAttribute('aria-expanded', this.isExpanded.toString());
    }

    if (this.collapseElement) {
      if (this.isExpanded) {
        this.collapseElement.classList.add('is-expanded');
      } else {
        this.collapseElement.classList.remove('is-expanded');
      }
    }

    // Dispatch custom event
    const eventType = this.isExpanded ? 'navbar:expanded' : 'navbar:collapsed';
    const customEvent = new CustomEvent(eventType, {
      detail: { navbar: this, expanded: this.isExpanded },
    });
    this.element.dispatchEvent(customEvent);
  }

  /**
   * Expand the navbar collapse
   */
  public expand(): void {
    if (this.isExpanded) return;

    this.isExpanded = true;
    this._updateExpandedState();
  }

  /**
   * Collapse the navbar collapse
   */
  public collapse(): void {
    if (!this.isExpanded) return;

    this.isExpanded = false;
    this._updateExpandedState();
  }

  /**
   * Toggle the navbar collapse state
   */
  public toggle(): void {
    if (this.isExpanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  /**
   * Get the current expanded state
   * @returns Whether the navbar is expanded
   */
  public isOpen(): boolean {
    return this.isExpanded;
  }

  /**
   * Update navbar options
   * @param newOptions - New options to merge
   */
  public updateOptions(newOptions: Partial<typeof DEFAULTS>): void {
    this.options = { ...this.options, ...newOptions };
  }

  /**
   * Destroy the navbar instance and clean up
   */
  public destroy(): void {
    // Remove event listeners
    if (this.toggler) {
      this.toggler.removeEventListener('click', this._handleToggleClick);
    }

    document.removeEventListener('keydown', this._handleKeydown);
    window.removeEventListener('resize', this.resizeHandler);
    document.removeEventListener('click', this._handleOutsideClick);

    // Reset DOM state
    if (this.collapseElement) {
      this.collapseElement.classList.remove('is-expanded');
    }

    if (this.toggler) {
      this.toggler.removeAttribute('aria-expanded');
    }

    // Clear references
    this.element = null as any;
    this.toggler = null;
    this.collapse = null;
  }
}
