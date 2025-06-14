/**
 * Class for handling callout interactions
 */
export class CalloutInteractions {
  private static instances: Map<string, CalloutInteractions> = new Map();
  private element: HTMLElement;
  private id: string;
  private autoHideTimeout: number | null = null;
  private config: {
    autoHide: boolean;
    autoHideDelay: number;
    onClose?: () => void;
    position?: ToastPosition;
  };

  /**
   * Available toast positions
   */
  public static ToastPositions = {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    TOP_CENTER: 'top-center',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_CENTER: 'bottom-center',
  } as const;

  /**
   * Create a new CalloutInteractions instance
   * @param element - The callout element
   * @param options - Configuration options
   */
  constructor(
    element: HTMLElement,
    options: {
      autoHide?: boolean;
      autoHideDelay?: number;
      onClose?: () => void;
      position?: ToastPosition;
    } = {}
  ) {
    this.element = element;
    this.id = element.id || `callout-${Math.random().toString(36).substring(2, 9)}`;

    if (!element.id) {
      element.id = this.id;
    }

    this.config = {
      autoHide: options.autoHide ?? false,
      autoHideDelay: options.autoHideDelay ?? 5000, // Default 5 seconds
      onClose: options.onClose,
      position: options.position ?? CalloutInteractions.ToastPositions.TOP_RIGHT,
    };

    this._initialize();
    CalloutInteractions.instances.set(this.id, this);
  }

  /**
   * Initialize the callout interactions
   */
  private _initialize(): void {
    // Add hover pause functionality for toast callouts
    if (this.element.classList.contains('c-callout--toast')) {
      this.element.addEventListener('mouseenter', this._pauseAutoHide.bind(this));
      this.element.addEventListener('mouseleave', this._resumeAutoHide.bind(this));

      // Add keyboard support for toast callouts
      this.element.addEventListener('keydown', this._handleKeyDown.bind(this));

      // Make sure toast is focusable
      if (this.element.tabIndex < 0) {
        this.element.tabIndex = 0;
      }
    }

    // Set up auto-hide if configured
    if (this.config.autoHide) {
      this._startAutoHideTimer();
    }
  }

  /**
   * Handle keyboard events
   */
  private _handleKeyDown(event: KeyboardEvent): void {
    // Close on Escape key
    if (event.key === 'Escape') {
      this.close();
      event.preventDefault();
    }
  }

  /**
   * Start the auto-hide timer
   */
  private _startAutoHideTimer(): void {
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }

    this.autoHideTimeout = window.setTimeout(() => {
      this.close();
    }, this.config.autoHideDelay);
  }

  /**
   * Pause the auto-hide timer (on hover)
   */
  private _pauseAutoHide(): void {
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
      this.autoHideTimeout = null;
    }
  }

  /**
   * Resume the auto-hide timer (on mouse leave)
   */
  private _resumeAutoHide(): void {
    if (this.config.autoHide) {
      this._startAutoHideTimer();
    }
  }

  /**
   * Close the callout
   */
  public close(): void {
    this.element.classList.add('is-hide');

    // Remove from DOM after animation completes
    setTimeout(() => {
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
        CalloutInteractions.instances.delete(this.id);

        if (this.config.onClose) {
          this.config.onClose();
        }

        // Dispatch custom event
        document.dispatchEvent(
          new CustomEvent('atomix:callout:closed', {
            detail: { id: this.id },
          })
        );
      }
    }, 300); // Match the transition duration in CSS
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }

    this.element.removeEventListener('mouseenter', this._pauseAutoHide.bind(this));
    this.element.removeEventListener('mouseleave', this._resumeAutoHide.bind(this));
    this.element.removeEventListener('keydown', this._handleKeyDown.bind(this));

    CalloutInteractions.instances.delete(this.id);
  }

  /**
   * Get the toast container for a specific position
   */
  private static _getToastContainer(
    position: ToastPosition = CalloutInteractions.ToastPositions.TOP_RIGHT
  ): HTMLElement {
    const containerId = `atomix-toast-container-${position}`;
    let container = document.getElementById(containerId);

    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.className = `c-callout-container c-callout-container--${position}`;
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('role', 'status');
      document.body.appendChild(container);

      // Apply positioning styles
      container.style.position = 'fixed';
      container.style.zIndex = '9999';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '8px';

      // Position the container based on position value
      switch (position) {
        case CalloutInteractions.ToastPositions.TOP_RIGHT:
          container.style.top = '20px';
          container.style.right = '20px';
          container.style.alignItems = 'flex-end';
          break;
        case CalloutInteractions.ToastPositions.TOP_LEFT:
          container.style.top = '20px';
          container.style.left = '20px';
          container.style.alignItems = 'flex-start';
          break;
        case CalloutInteractions.ToastPositions.TOP_CENTER:
          container.style.top = '20px';
          container.style.left = '50%';
          container.style.transform = 'translateX(-50%)';
          container.style.alignItems = 'center';
          break;
        case CalloutInteractions.ToastPositions.BOTTOM_RIGHT:
          container.style.bottom = '20px';
          container.style.right = '20px';
          container.style.alignItems = 'flex-end';
          break;
        case CalloutInteractions.ToastPositions.BOTTOM_LEFT:
          container.style.bottom = '20px';
          container.style.left = '20px';
          container.style.alignItems = 'flex-start';
          break;
        case CalloutInteractions.ToastPositions.BOTTOM_CENTER:
          container.style.bottom = '20px';
          container.style.left = '50%';
          container.style.transform = 'translateX(-50%)';
          container.style.alignItems = 'center';
          break;
      }
    }

    return container;
  }

  /**
   * Create a toast notification
   * @param options - Toast options
   */
  public static createToast(options: {
    title: string;
    content?: string;
    variant?: string;
    icon?: string;
    autoHide?: boolean;
    autoHideDelay?: number;
    onClose?: () => void;
    position?: ToastPosition;
  }): CalloutInteractions {
    // Get the appropriate toast container
    const position = options.position || CalloutInteractions.ToastPositions.TOP_RIGHT;
    const toastContainer = this._getToastContainer(position);

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `c-callout c-callout--toast ${options.variant ? `c-callout--${options.variant}` : 'c-callout--primary'}`;
    toast.id = `toast-${Math.random().toString(36).substring(2, 9)}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.tabIndex = 0; // Make focusable

    // Create toast content
    let iconHtml = '';
    if (options.icon) {
      iconHtml = `<div class="c-callout__icon">${options.icon}</div>`;
    }

    toast.innerHTML = `
      <div class="c-callout__content">
        ${iconHtml}
        <div class="c-callout__message">
          <div class="c-callout__title">${options.title}</div>
          ${options.content ? `<div class="c-callout__text">${options.content}</div>` : ''}
        </div>
      </div>
      <button class="c-callout__close-btn" aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    // Add to container
    toastContainer.appendChild(toast);

    // Initialize interactions
    const interaction = new CalloutInteractions(toast, {
      autoHide: options.autoHide ?? true,
      autoHideDelay: options.autoHideDelay ?? 5000,
      onClose: options.onClose,
      position,
    });

    // Add close button event listener
    const closeButton = toast.querySelector('.c-callout__close-btn');
    if (closeButton) {
      closeButton.addEventListener('click', () => interaction.close());
    }

    // Focus the toast for accessibility
    setTimeout(() => toast.focus(), 100);

    return interaction;
  }

  /**
   * Initialize all callout elements on the page
   */
  public static initializeAll(
    options: {
      autoHide?: boolean;
      autoHideDelay?: number;
      onClose?: () => void;
    } = {}
  ): CalloutInteractions[] {
    const interactions: CalloutInteractions[] = [];
    const elements = document.querySelectorAll('.c-callout');

    elements.forEach(element => {
      if (!CalloutInteractions.instances.has((element as HTMLElement).id)) {
        interactions.push(new CalloutInteractions(element as HTMLElement, options));
      }
    });

    return interactions;
  }

  /**
   * Clear all toast notifications
   */
  public static clearAllToasts(): void {
    // Get all toast containers
    const containers = document.querySelectorAll('[id^="atomix-toast-container-"]');

    containers.forEach(container => {
      const toasts = container.querySelectorAll('.c-callout--toast');
      toasts.forEach(toast => {
        const id = (toast as HTMLElement).id;
        const instance = CalloutInteractions.instances.get(id);

        if (instance) {
          instance.close();
        } else {
          // If no instance, remove directly
          container.removeChild(toast);
        }
      });
    });
  }
}

// Type for toast positions
type ToastPosition =
  (typeof CalloutInteractions.ToastPositions)[keyof typeof CalloutInteractions.ToastPositions];
