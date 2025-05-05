import { STEPS } from '../../../lib/constants/components';

/**
 * Interface for Steps options
 */
interface StepsOptions {
  activeIndex?: number;
  vertical?: boolean;
  [key: string]: any;
}

/**
 * Interface for Steps instance
 */
interface StepsInstance {
  setActive: (index: number) => void;
  next: () => void;
  previous: () => void;
  destroy: () => void;
}

/**
 * Default options for the Steps component
 */
const DEFAULT_OPTIONS: StepsOptions = {
  activeIndex: 0,
  vertical: false
};

/**
 * Class representing a Steps component
 */
class Steps implements StepsInstance {
  private selector: string | Element;
  private $element: HTMLElement | null;
  private options: StepsOptions;
  private $items: NodeListOf<HTMLElement> | null;
  private activeIndex: number;

  /**
   * Creates an instance of Steps
   * @param selector - CSS selector string or DOM Element
   * @param options - Custom options to override defaults
   */
  constructor(selector: string | Element, options = {}) {
    this.selector = selector || STEPS.SELECTORS.STEPS;
    this.$element =
      typeof selector === 'string'
        ? document.querySelector<HTMLElement>(selector)
        : selector as HTMLElement;
    this.options = { ...DEFAULT_OPTIONS, ...options } as StepsOptions;
    this.$items = null;
    this.activeIndex = this.options.activeIndex || 0;
    this._initialize();
  }

  /**
   * Initialize the steps component
   */
  private _initialize(): void {
    if (!this.$element) return;

    this._initializeElements();
    
    // Set vertical mode if specified
    if (this.options.vertical && !this.$element.classList.contains(STEPS.CLASSES.VERTICAL)) {
      this.$element.classList.add(STEPS.CLASSES.VERTICAL);
    }
    
    this.setActive(this.activeIndex);
  }

  /**
   * Initialize DOM elements
   */
  private _initializeElements(): void {
    if (!this.$element) return;
    
    this.$items = this.$element.querySelectorAll<HTMLElement>(STEPS.SELECTORS.ITEM);
  }

  /**
   * Sets the active step
   * @param index - The index of the step to make active
   */
  public setActive(index: number): void {
    if (!this.$items || index < 0 || index >= this.$items.length) return;
    
    // Update all items
    this.$items.forEach((item, i) => {
      if (i < index) {
        // Steps before active are completed
        item.classList.add(STEPS.CLASSES.ACTIVE);
        item.classList.add(STEPS.CLASSES.COMPLETED);
      } else if (i === index) {
        // Current step is active but not completed
        item.classList.add(STEPS.CLASSES.ACTIVE);
        item.classList.remove(STEPS.CLASSES.COMPLETED);
      } else {
        // Future steps are neither active nor completed
        item.classList.remove(STEPS.CLASSES.ACTIVE);
        item.classList.remove(STEPS.CLASSES.COMPLETED);
      }
    });
    
    this.activeIndex = index;
  }

  /**
   * Moves to the next step
   */
  public next(): void {
    if (this.activeIndex < (this.$items?.length || 0) - 1) {
      this.setActive(this.activeIndex + 1);
    }
  }

  /**
   * Moves to the previous step
   */
  public previous(): void {
    if (this.activeIndex > 0) {
      this.setActive(this.activeIndex - 1);
    }
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    // No specific cleanup needed for steps component
  }
}

/**
 * Initialize all steps in the document
 * @param {string|Element} selector - CSS selector string or DOM Element
 * @param {Object} options - Custom options to override defaults
 * @returns {StepsInstance[]} Array of Steps instances
 */
export function initializeSteps(selector = STEPS.SELECTORS.STEPS, options = {}): StepsInstance[] {
  const stepsInstances: StepsInstance[] = [];
  const stepsElements = document.querySelectorAll<HTMLElement>(selector);

  if (!stepsElements.length) return stepsInstances;

  stepsElements.forEach((element) => {
    try {
      const instance = new Steps(element, options);
      stepsInstances.push(instance);
    } catch (error) {
      console.error('Error initializing steps:', error);
    }
  });

  return stepsInstances;
}

export default Steps; 