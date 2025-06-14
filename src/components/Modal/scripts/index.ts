// Modal component implementation based on the old JS code
import { MODAL } from '../../../lib/constants/components';
import {
  handleModalCloseClick,
  handleModalKeydown,
  handleBackdropClick,
} from './modalInteractions';

export type ModalOptions = {
  openSelector?: string;
  closeSelector?: string;
  dialogSelector?: string;
  backdropSelector?: string;
  backdrop?: boolean;
  keyboard?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: (isOpen: boolean) => void;
};

/**
 * Modal Component for vanilla JS implementations
 */
class Modal {
  selector: string | HTMLElement;
  $element: HTMLElement;
  options: ModalOptions;
  isOpen: boolean = false;
  $closeButtons: NodeListOf<Element>;
  $backdrop: HTMLElement | null = null;
  $dialog: HTMLElement | null = null;
  $openButtons: NodeListOf<Element>;
  _keydownHandler: ((event: KeyboardEvent) => void) | null = null;
  _documentClickHandler: ((event: MouseEvent) => void) | null = null;

  /**
   * Create a new Modal instance
   * @param selector - CSS selector or HTMLElement for the modal
   * @param options - Configuration options
   */
  constructor(selector: string | HTMLElement, options: ModalOptions = {}) {
    this.selector = selector;
    this.$element =
      typeof selector === 'string'
        ? (document.querySelector(selector as string) as HTMLElement)
        : selector;

    if (!this.$element) {
      throw new Error(`Modal element not found: ${selector}`);
    }

    // Merge default options with user options and data attributes
    this.options = this._mergeOptions(options);

    // Initialize elements
    this.$closeButtons = this.$element.querySelectorAll(
      this.options.closeSelector || MODAL.SELECTORS.CLOSE_BUTTONS
    );
    this.$backdrop = this.$element.querySelector(
      this.options.backdropSelector || MODAL.SELECTORS.BACKDROP
    );
    this.$dialog = this.$element.querySelector(
      this.options.dialogSelector || MODAL.SELECTORS.DIALOG
    );
    this.$openButtons = document.querySelectorAll(
      this.options.openSelector || MODAL.SELECTORS.OPEN_BUTTON
    );

    // Initialize the modal
    this._initialize();

    // Store reference to this instance on the element
    (this.$element as any).modalInstance = this;

    return this;
  }

  /**
   * Merge options from defaults, constructor options, and data attributes
   */
  private _mergeOptions(options: ModalOptions): ModalOptions {
    const dataOptions: ModalOptions = {};

    // Extract options from data attributes
    if (this.$element) {
      if (this.$element.dataset.backdrop !== undefined) {
        dataOptions.backdrop = this.$element.dataset.backdrop === 'true';
      }

      if (this.$element.dataset.keyboard !== undefined) {
        dataOptions.keyboard = this.$element.dataset.keyboard === 'true';
      }

      if (this.$element.dataset.size) {
        dataOptions.size = this.$element.dataset.size as 'sm' | 'md' | 'lg' | 'xl';
      }

      if (this.$element.dataset.openSelector) {
        dataOptions.openSelector = this.$element.dataset.openSelector;
      }

      if (this.$element.dataset.closeSelector) {
        dataOptions.closeSelector = this.$element.dataset.closeSelector;
      }
    }

    // Merge defaults with passed options and data attributes
    return {
      ...MODAL.DEFAULT_OPTIONS,
      ...options,
      ...dataOptions,
    };
  }

  /**
   * Initialize the modal
   */
  private _initialize(): void {
    // Apply size class if specified
    if (this.options.size) {
      this.$element.classList.add(`c-modal--${this.options.size}`);
    }

    // Check initial state
    this.isOpen = this.$element.classList.contains(MODAL.CLASSES.IS_OPEN);

    // Bind events
    this._bindEvents();

    // Initialize targets if modal has ID
    if (this.$element.id) {
      this._setupTargetButtons();
    }
  }

  /**
   * Bind all event listeners
   */
  private _bindEvents(): void {
    // Button click events
    this.$closeButtons.forEach(button => {
      button.addEventListener('click', this.close.bind(this));
    });

    this.$openButtons.forEach(button => {
      button.addEventListener('click', this.open.bind(this));
    });

    // Backdrop click
    if (this.options.backdrop && this.$backdrop) {
      this.$backdrop.addEventListener('click', e => {
        if (e.target === this.$backdrop) {
          this.close();
        }
      });
    }

    // Keyboard events
    if (this.options.keyboard) {
      this._keydownHandler = e => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      };
      document.addEventListener('keydown', this._keydownHandler);
    }
  }

  /**
   * Set up buttons that target this modal using data-target attribute
   */
  private _setupTargetButtons(): void {
    if (!this.$element.id) return;

    const targetSelector = `[data-target="#${this.$element.id}"]`;
    const targetButtons = document.querySelectorAll(targetSelector);

    targetButtons.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        this.open();
      });
    });
  }

  /**
   * Open the modal
   */
  open(): void {
    if (this.isOpen) return;

    // Display the modal
    this.$element.style.display = 'block';

    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      this.$element.classList.add(MODAL.CLASSES.IS_OPEN);
      this.isOpen = true;

      // Focus the first focusable element inside modal
      this._trapFocus();

      // Call the onOpen callback if provided
      if (typeof this.options.onOpen === 'function') {
        this.options.onOpen();
      }

      // Call the onToggle callback if provided
      if (typeof this.options.onToggle === 'function') {
        this.options.onToggle(true);
      }

      // Dispatch custom event
      this.$element.dispatchEvent(
        new CustomEvent('modal:open', {
          bubbles: true,
          detail: { instance: this },
        })
      );
    });
  }

  /**
   * Close the modal
   */
  close(): void {
    if (!this.isOpen) return;

    this.$element.classList.remove(MODAL.CLASSES.IS_OPEN);
    this.isOpen = false;

    // Call the onClose callback if provided
    if (typeof this.options.onClose === 'function') {
      this.options.onClose();
    }

    // Call the onToggle callback if provided
    if (typeof this.options.onToggle === 'function') {
      this.options.onToggle(false);
    }

    // Dispatch custom event
    this.$element.dispatchEvent(
      new CustomEvent('modal:close', {
        bubbles: true,
        detail: { instance: this },
      })
    );

    // Wait for animation to complete before hiding
    const onTransitionEnd = () => {
      if (!this.isOpen) {
        this.$element.style.display = 'none';
      }

      if (this.$backdrop) {
        this.$backdrop.removeEventListener('transitionend', onTransitionEnd);
      }
    };

    if (this.$backdrop) {
      this.$backdrop.addEventListener('transitionend', onTransitionEnd);
    } else {
      // Fallback timeout if no backdrop
      setTimeout(onTransitionEnd, 300);
    }
  }

  /**
   * Toggle the modal's open/closed state
   */
  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Focus trap for accessibility
   */
  private _trapFocus(): void {
    if (!this.$dialog) return;

    // Find the first focusable element
    const focusableElements = this.$dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }

  /**
   * Destroy the modal instance and remove event listeners
   */
  destroy(): void {
    // Remove event listeners
    this.$closeButtons.forEach(button => {
      button.removeEventListener('click', this.close);
    });

    this.$openButtons.forEach(button => {
      button.removeEventListener('click', this.open);
    });

    if (this.$backdrop) {
      this.$backdrop.removeEventListener('click', this.close);
    }

    if (this._keydownHandler) {
      document.removeEventListener('keydown', this._keydownHandler);
    }

    // Remove data-modal reference
    delete (this.$element as any).modalInstance;

    // Dispatch destroy event
    this.$element.dispatchEvent(
      new CustomEvent('modal:destroy', {
        bubbles: true,
        detail: { instance: this },
      })
    );
  }
}

/**
 * Initialize all modals matching a selector
 * @param selector - CSS selector to find modals
 * @param options - Default options for all modals
 * @returns Array of initialized Modal instances
 */
export function initializeModals(
  selector = MODAL.SELECTORS.MODAL,
  options: ModalOptions = {}
): Modal[] {
  const instances: Modal[] = [];
  const elements = document.querySelectorAll(selector);

  if (!elements.length) return instances;

  elements.forEach(element => {
    // Skip if already initialized
    if ((element as any).modalInstance) return;

    try {
      const instance = new Modal(element as HTMLElement, options);
      instances.push(instance);
    } catch (error) {
      console.error('Failed to initialize modal:', error);
    }
  });

  return instances;
}

/**
 * Get a modal instance from an element
 * @param element - Modal element or selector
 * @returns Modal instance or null
 */
export function getModalInstance(element: string | HTMLElement): Modal | null {
  const el = typeof element === 'string' ? document.querySelector(element) : element;

  if (!el) return null;

  return (el as any).modalInstance || null;
}

export default Modal;
