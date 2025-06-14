import { CalloutInteractions } from './CalloutInteractions';

/**
 * Callout component class for vanilla JS implementation
 */
export class Callout {
  private element: HTMLElement;
  private closeButton: HTMLElement | null;
  private config: {
    onClose?: () => void;
  };

  /**
   * Create a new Callout instance
   * @param element - The callout element
   * @param options - Configuration options
   */
  constructor(element: HTMLElement, options: { onClose?: () => void } = {}) {
    this.element = element;
    this.closeButton = element.querySelector('.c-callout__close-btn');
    this.config = {
      onClose: options.onClose,
    };

    this._initialize();
  }

  /**
   * Initialize the callout component
   */
  private _initialize(): void {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this._handleClose.bind(this));
    }
  }

  /**
   * Handle close button click
   */
  private _handleClose(): void {
    this.close();

    if (this.config.onClose) {
      this.config.onClose();
    }

    // Dispatch custom event
    this.element.dispatchEvent(
      new CustomEvent('atomix:callout:close', {
        bubbles: true,
      })
    );
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
      }
    }, 300); // Match the transition duration in CSS
  }

  /**
   * Show the callout
   */
  public show(): void {
    this.element.classList.remove('is-hide');
  }

  /**
   * Update callout content
   * @param options - Content options
   */
  public update(options: { title?: string; content?: string; variant?: string }): void {
    const titleElement = this.element.querySelector('.c-callout__title');
    const contentElement = this.element.querySelector('.c-callout__text');

    if (options.title && titleElement) {
      titleElement.textContent = options.title;
    }

    if (options.content && contentElement) {
      contentElement.textContent = options.content;
    }

    if (options.variant) {
      // Remove existing variant classes
      const variantClasses = Array.from(this.element.classList).filter(
        cls =>
          cls.startsWith('c-callout--') && !['c-callout--oneline', 'c-callout--toast'].includes(cls)
      );

      variantClasses.forEach(cls => this.element.classList.remove(cls));

      // Add new variant class
      this.element.classList.add(`c-callout--${options.variant}`);
    }
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    if (this.closeButton) {
      this.closeButton.removeEventListener('click', this._handleClose.bind(this));
    }
  }

  /**
   * Initialize all callout elements on the page
   */
  public static initializeAll(options: { onClose?: () => void } = {}): Callout[] {
    const callouts: Callout[] = [];
    const elements = document.querySelectorAll('.c-callout');

    elements.forEach(element => {
      callouts.push(new Callout(element as HTMLElement, options));
    });

    return callouts;
  }
}

export { CalloutInteractions };
