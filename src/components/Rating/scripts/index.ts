import type { RatingProps, Size, ThemeColor } from '../../../lib/types/components';

/**
 * Rating component class for vanilla JavaScript implementation
 */
export type RatingOptions = Pick<
  RatingProps,
  'value' | 'defaultValue' | 'maxValue' | 'allowHalf' | 'readOnly' | 'size' | 'color' | 'onChange'
>;

// Define default options
const DEFAULTS = {
  value: 0,
  maxValue: 5,
  allowHalf: false,
  readOnly: false,
  size: 'md' as Size,
};

/**
 * Rating component class for vanilla JavaScript implementation
 */
export default class Rating {
  element: HTMLElement;
  options: RatingOptions;
  stars: NodeListOf<HTMLElement> | null = null;
  private _currentValue: number;
  private _boundHandleMouseEnter: (event: MouseEvent) => void;
  private _boundHandleMouseLeave: (event: MouseEvent) => void;
  private _boundHandleClick: (event: MouseEvent) => void;
  private _boundHandleKeyDown: (event: KeyboardEvent) => void;

  /**
   * Create a new Rating instance
   * @param element - The element to attach the rating to
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: RatingOptions = {}) {
    this.element =
      typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;
    if (!this.element) {
      throw new Error('Rating: Element not found');
    }

    this.options = { ...DEFAULTS, ...options };
    this._currentValue = this.options.value || 0;

    // Bind event handlers to this instance
    this._boundHandleMouseEnter = this._handleMouseEnter.bind(this);
    this._boundHandleMouseLeave = this._handleMouseLeave.bind(this);
    this._boundHandleClick = this._handleClick.bind(this);
    this._boundHandleKeyDown = this._handleKeyDown.bind(this);

    // Store reference to instance on element
    (this.element as any)._rating = this;

    this._init();
  }

  /**
   * Initialize the component
   */
  private _init(): void {
    // Set data attributes
    this.element.setAttribute('data-max-value', String(this.options.maxValue));
    this.element.setAttribute('data-allow-half', String(this.options.allowHalf));
    this.element.setAttribute('data-readonly', String(this.options.readOnly));

    // Set ARIA attributes
    if (this.options.readOnly) {
      this.element.setAttribute('role', 'img');
      this.element.setAttribute(
        'aria-label',
        `Rating: ${this._currentValue} out of ${this.options.maxValue} stars`
      );
    } else {
      this.element.setAttribute('role', 'radiogroup');
    }

    // Add CSS classes
    if (this.options.size && this.options.size !== 'md') {
      this.element.classList.add(`c-rating--${this.options.size}`);
    }

    if (this.options.color) {
      this.element.classList.add(`c-rating--${this.options.color}`);
    }

    // Get all stars
    this.stars = this.element.querySelectorAll('.c-rating__star');

    // Set initial state
    this._updateStars();

    // Bind events if not read-only
    if (!this.options.readOnly) {
      this._bindEvents();
    }

    // Dispatch init event
    this.element.dispatchEvent(
      new CustomEvent('rating:init', {
        bubbles: true,
        detail: { instance: this },
      })
    );
  }

  /**
   * Bind event listeners
   */
  private _bindEvents(): void {
    if (!this.stars) return;

    // Add event listeners to each star
    this.stars.forEach(star => {
      star.addEventListener('mouseenter', this._boundHandleMouseEnter);
      star.addEventListener('click', this._boundHandleClick);
      star.addEventListener('keydown', this._boundHandleKeyDown);

      // Make stars focusable
      star.setAttribute('tabindex', '0');
      star.setAttribute('role', 'button');
    });

    // Add mouseleave to the container
    this.element.addEventListener('mouseleave', this._boundHandleMouseLeave);
  }

  /**
   * Handle mouse enter on a star
   */
  private _handleMouseEnter(event: MouseEvent): void {
    if (this.options.readOnly) return;

    const target = event.currentTarget as HTMLElement;
    const value = Number(target.getAttribute('data-value'));

    this._highlightStars(value);
  }

  /**
   * Handle mouse leave from rating component
   */
  private _handleMouseLeave(): void {
    if (this.options.readOnly) return;

    this._updateStars();
  }

  /**
   * Handle click on a star
   */
  private _handleClick(event: MouseEvent): void {
    if (this.options.readOnly) return;

    const target = event.currentTarget as HTMLElement;
    const value = Number(target.getAttribute('data-value'));

    this.setValue(value);

    if (this.options.onChange) {
      this.options.onChange(value);
    }
  }

  /**
   * Handle keyboard navigation
   */
  private _handleKeyDown(event: KeyboardEvent): void {
    if (this.options.readOnly) return;

    const target = event.currentTarget as HTMLElement;
    const index = Number(target.getAttribute('data-value'));
    const step = this.options.allowHalf ? 0.5 : 1;
    let newValue = this._currentValue;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(this.options.maxValue || 5, this._currentValue + step);
        event.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(0, this._currentValue - step);
        event.preventDefault();
        break;
      case 'Home':
        newValue = 0;
        event.preventDefault();
        break;
      case 'End':
        newValue = this.options.maxValue || 5;
        event.preventDefault();
        break;
      case ' ':
      case 'Enter':
        newValue = index;
        event.preventDefault();
        break;
      default:
        return;
    }

    if (newValue !== this._currentValue) {
      this.setValue(newValue);

      if (this.options.onChange) {
        this.options.onChange(newValue);
      }
    }
  }

  /**
   * Update star appearance based on current value
   */
  private _updateStars(): void {
    if (!this.stars) return;

    const roundedValue = this.options.allowHalf
      ? Math.floor(this._currentValue * 2) / 2
      : Math.round(this._currentValue);

    this.stars.forEach(star => {
      const starValue = Number(star.getAttribute('data-value'));
      const isFullStar = starValue <= Math.floor(roundedValue);
      const isHalfStar = this.options.allowHalf && starValue - 0.5 === roundedValue;

      // Remove existing classes
      star.classList.remove('c-rating__star--full', 'c-rating__star--half');

      // Add appropriate classes
      if (isFullStar) {
        star.classList.add('c-rating__star--full');
      } else if (isHalfStar) {
        star.classList.add('c-rating__star--half');
      }

      // Update ARIA attributes
      star.setAttribute('aria-checked', isFullStar || isHalfStar ? 'true' : 'false');
    });

    // Update container ARIA label if read-only
    if (this.options.readOnly) {
      this.element.setAttribute(
        'aria-label',
        `Rating: ${roundedValue} out of ${this.options.maxValue} stars`
      );
    }

    // Update data attribute
    this.element.setAttribute('data-value', String(roundedValue));
  }

  /**
   * Temporarily highlight stars up to a value
   */
  private _highlightStars(value: number): void {
    if (!this.stars) return;

    this.stars.forEach(star => {
      const starValue = Number(star.getAttribute('data-value'));

      // Remove existing classes
      star.classList.remove('c-rating__star--full', 'c-rating__star--half');

      // Add full class if star value is less than or equal to hovered value
      if (starValue <= value) {
        star.classList.add('c-rating__star--full');
      }
    });
  }

  /**
   * Get current rating value
   */
  public getValue(): number {
    return this._currentValue;
  }

  /**
   * Set the rating value
   * @param value - The new rating value
   */
  public setValue(value: number): void {
    // Clamp value between 0 and maxValue
    const clampedValue = Math.max(0, Math.min(value, this.options.maxValue || 5));

    // Update current value
    this._currentValue = clampedValue;

    // Update visual state
    this._updateStars();

    // Dispatch change event
    this.element.dispatchEvent(
      new CustomEvent('rating:change', {
        bubbles: true,
        detail: { value: clampedValue },
      })
    );
  }

  /**
   * Update component options
   * @param options Partial options to update
   */
  public updateOptions(options: Partial<RatingOptions>): void {
    // Update options
    this.options = { ...this.options, ...options };

    // Re-initialize component with new options
    this._init();
  }

  /**
   * Destroy the rating component and remove event listeners
   */
  public destroy(): void {
    if (this.stars) {
      // Remove event listeners from stars
      this.stars.forEach(star => {
        star.removeEventListener('mouseenter', this._boundHandleMouseEnter);
        star.removeEventListener('click', this._boundHandleClick);
        star.removeEventListener('keydown', this._boundHandleKeyDown);
      });
    }

    // Remove event listener from container
    this.element.removeEventListener('mouseleave', this._boundHandleMouseLeave);

    // Remove reference from element
    delete (this.element as any)._rating;
  }
}
