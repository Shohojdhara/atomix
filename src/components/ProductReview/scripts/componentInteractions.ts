/**
 * Class for handling ProductReview component interactions
 */
export default class ProductReview {
  element: HTMLElement;
  options: any;
  ratingElement: HTMLElement | null;
  textareaElement: HTMLElement | null;
  submitButton: HTMLElement | null;
  formElement: HTMLFormElement | null;
  onSubmit: ((rating: number, comment: string) => void) | null;

  /**
   * Create a new ProductReview instance
   * @param element - The product review container element
   * @param options - Configuration options
   */
  constructor(element: HTMLElement, options: any = {}) {
    this.element = element;
    this.options = {
      productName: '',
      productImage: null,
      initialRating: 0,
      maxRating: 5,
      allowHalf: true,
      ratingColor: 'warning',
      onSubmit: null,
      ...options,
    };

    this.ratingElement = this.element.querySelector('.c-rating');
    this.textareaElement = this.element.querySelector('.c-product-review__textarea');
    this.submitButton = this.element.querySelector('.c-product-review__actions .c-btn');
    this.formElement = this.element.querySelector('.c-product-review__form') as HTMLFormElement;
    this.onSubmit = this.options.onSubmit;

    this.init();
  }

  /**
   * Initialize the product review component
   */
  init() {
    if (this.formElement) {
      this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Add any additional initialization logic here
    this.setupAccessibility();
  }

  /**
   * Set up accessibility features
   */
  setupAccessibility() {
    // Add ARIA attributes for better accessibility
    if (this.ratingElement) {
      this.ratingElement.setAttribute('role', 'radiogroup');
      this.ratingElement.setAttribute('aria-label', 'Rating');

      const stars = this.ratingElement.querySelectorAll('.c-rating__star');
      stars.forEach((star, index) => {
        star.setAttribute('role', 'radio');
        star.setAttribute('aria-label', `${index + 1} star${index === 0 ? '' : 's'}`);
      });
    }

    if (this.textareaElement) {
      this.textareaElement.setAttribute('aria-required', 'false');
    }
  }

  /**
   * Handle form submission
   * @param e - Submit event
   */
  handleSubmit(e: Event) {
    e.preventDefault();

    if (!this.ratingElement || !this.textareaElement) return;

    const rating = parseFloat(this.ratingElement.getAttribute('data-value') || '0');
    const comment = (this.textareaElement as HTMLTextAreaElement).value;

    if (this.onSubmit && rating > 0) {
      this.onSubmit(rating, comment);
    }

    // Show success state
    this.showSuccessState();
  }

  /**
   * Show the success state after submission
   */
  showSuccessState() {
    // This will be handled by React state in the component
    // But we could add additional logic here if needed
  }

  /**
   * Reset the form
   */
  reset() {
    if (this.ratingElement) {
      this.ratingElement.setAttribute('data-value', '0');

      const stars = this.ratingElement.querySelectorAll('.c-rating__star');
      stars.forEach(star => {
        star.classList.remove('c-rating__star--full', 'c-rating__star--half');
      });
    }

    if (this.textareaElement) {
      (this.textareaElement as HTMLTextAreaElement).value = '';
    }
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    if (this.formElement) {
      this.formElement.removeEventListener('submit', this.handleSubmit.bind(this));
    }

    // Clean up any other event listeners
  }
}
