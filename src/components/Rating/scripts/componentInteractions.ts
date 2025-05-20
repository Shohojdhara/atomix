/**
 * Class for handling Rating component interactions
 */
export default class Rating {
  element: HTMLElement;
  options: any;
  stars: NodeListOf<HTMLElement>;
  value: number;
  maxValue: number;
  allowHalf: boolean;
  readOnly: boolean;
  onChange: ((value: number) => void) | null;
  private _handleMouseMove: (e: MouseEvent) => void;
  private _handleMouseLeave: () => void;
  private _handleClick: (e: MouseEvent) => void;

  /**
   * Create a new Rating instance
   * @param element - The rating container element
   * @param options - Configuration options
   */
  constructor(element: HTMLElement, options: any = {}) {
    this.element = element;
    this.options = {
      value: 0,
      maxValue: 5,
      allowHalf: false,
      readOnly: false,
      size: 'md',
      color: null,
      onChange: null,
      ...options
    };

    this.stars = this.element.querySelectorAll('.c-rating__star');
    this.value = this.options.value;
    this.maxValue = this.options.maxValue;
    this.allowHalf = this.options.allowHalf;
    this.readOnly = this.options.readOnly;
    this.onChange = this.options.onChange;

    // Bind event handlers
    this._handleMouseMove = this.handleMouseMove.bind(this);
    this._handleMouseLeave = this.handleMouseLeave.bind(this);
    this._handleClick = this.handleClick.bind(this);

    this.init();
  }

  /**
   * Initialize the rating component
   */
  init() {
    if (!this.readOnly) {
      this.element.addEventListener('mousemove', this._handleMouseMove);
      this.element.addEventListener('mouseleave', this._handleMouseLeave);
      this.element.addEventListener('click', this._handleClick);
    }
  }

  /**
   * Handle mouse movement over stars
   * @param e - Mouse event
   */
  handleMouseMove(e: MouseEvent) {
    if (this.readOnly) return;

    const target = e.target as HTMLElement;
    const star = target.closest('.c-rating__star') as HTMLElement;
    
    if (!star) return;

    const rect = star.getBoundingClientRect();
    const starValue = parseInt(star.dataset.value || '0', 10);
    let hoverValue = starValue;

    // Handle half-star logic
    if (this.allowHalf) {
      const starCenter = rect.left + rect.width / 2;
      if (e.clientX < starCenter) {
        hoverValue -= 0.5;
      }
    }

    this.updateStarsDisplay(hoverValue, true);
  }

  /**
   * Handle mouse leaving the rating component
   */
  handleMouseLeave() {
    if (this.readOnly) return;
    this.updateStarsDisplay(this.value);
  }

  /**
   * Handle click on a star
   * @param e - Mouse event
   */
  handleClick(e: MouseEvent) {
    if (this.readOnly) return;

    const target = e.target as HTMLElement;
    const star = target.closest('.c-rating__star') as HTMLElement;
    
    if (!star) return;

    const rect = star.getBoundingClientRect();
    const starValue = parseInt(star.dataset.value || '0', 10);
    let newValue = starValue;

    // Handle half-star logic
    if (this.allowHalf) {
      const starCenter = rect.left + rect.width / 2;
      if (e.clientX < starCenter) {
        newValue -= 0.5;
      }
    }

    this.setValue(newValue);
  }

  /**
   * Set a new rating value
   * @param value - The new rating value
   */
  setValue(value: number) {
    this.value = Math.max(0, Math.min(value, this.maxValue));
    this.updateStarsDisplay(this.value);
    
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  /**
   * Update the visual display of stars
   * @param value - The value to display
   * @param isHover - Whether this is a hover state
   */
  updateStarsDisplay(value: number, isHover = false) {
    const roundedValue = this.allowHalf ? Math.floor(value * 2) / 2 : Math.round(value);
    
    this.stars.forEach((star, index) => {
      const starValue = index + 1;
      
      // Remove all state classes
      star.classList.remove('c-rating__star--full', 'c-rating__star--half');
      
      // Add appropriate classes based on value
      if (starValue <= roundedValue) {
        star.classList.add('c-rating__star--full');
      } else if (this.allowHalf && starValue - 0.5 === roundedValue) {
        star.classList.add('c-rating__star--half');
      }
    });
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    this.element.removeEventListener('mousemove', this._handleMouseMove);
    this.element.removeEventListener('mouseleave', this._handleMouseLeave);
    this.element.removeEventListener('click', this._handleClick);
  }
}
