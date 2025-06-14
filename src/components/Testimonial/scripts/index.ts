import { TESTIMONIAL } from '../../../lib/constants/components';

/**
 * Interface for Testimonial options
 */
interface TestimonialOptions {
  size?: 'sm' | 'lg' | '';
  skeleton?: boolean;
  [key: string]: any;
}

/**
 * Interface for Testimonial instance
 */
interface TestimonialInstance {
  destroy: () => void;
}

/**
 * Default options for the Testimonial component
 */
const DEFAULT_OPTIONS: TestimonialOptions = {
  size: '',
  skeleton: false,
};

/**
 * Class representing a Testimonial component
 */
class Testimonial implements TestimonialInstance {
  private selector: string | Element;
  private $element: HTMLElement | null;
  private options: TestimonialOptions;

  /**
   * Creates an instance of Testimonial
   * @param selector - CSS selector string or DOM Element
   * @param options - Custom options to override defaults
   */
  constructor(selector: string | Element, options = {}) {
    this.selector = selector || TESTIMONIAL.SELECTORS.TESTIMONIAL;
    this.$element =
      typeof selector === 'string'
        ? document.querySelector<HTMLElement>(selector)
        : (selector as HTMLElement);
    this.options = { ...DEFAULT_OPTIONS, ...options } as TestimonialOptions;
    this._initialize();
  }

  /**
   * Initialize the testimonial component
   */
  private _initialize(): void {
    if (!this.$element) return;

    // Apply size classes if specified
    if (
      this.options.size === 'sm' &&
      !this.$element.classList.contains(TESTIMONIAL.CLASSES.SMALL)
    ) {
      this.$element.classList.add(TESTIMONIAL.CLASSES.SMALL);
    } else if (
      this.options.size === 'lg' &&
      !this.$element.classList.contains(TESTIMONIAL.CLASSES.LARGE)
    ) {
      this.$element.classList.add(TESTIMONIAL.CLASSES.LARGE);
    }
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    // No specific cleanup needed for testimonial component
  }
}

/**
 * Initialize all testimonials in the document
 * @param {string|Element} selector - CSS selector string or DOM Element
 * @param {Object} options - Custom options to override defaults
 * @returns {TestimonialInstance[]} Array of Testimonial instances
 */
export function initializeTestimonials(
  selector = TESTIMONIAL.SELECTORS.TESTIMONIAL,
  options = {}
): TestimonialInstance[] {
  const testimonialInstances: TestimonialInstance[] = [];
  const testimonialElements = document.querySelectorAll<HTMLElement>(
    typeof selector === 'string' ? selector : TESTIMONIAL.SELECTORS.TESTIMONIAL
  );

  if (!testimonialElements.length) return testimonialInstances;

  testimonialElements.forEach(element => {
    try {
      const instance = new Testimonial(element, options);
      testimonialInstances.push(instance);
    } catch (error) {
      console.error('Error initializing testimonial:', error);
    }
  });

  return testimonialInstances;
}

export default Testimonial;
