import { RIVER } from '../../../lib/constants/components';

/**
 * Interface for River options
 */
interface RiverOptions {
  center?: boolean;
  breakout?: boolean;
  reverse?: boolean;
  backgroundImageSrc?: string;
  showOverlay?: boolean;
  contentWidth?: string;
  [key: string]: any;
}

/**
 * Interface for River instance
 */
interface RiverInstance {
  init(): void;
  destroy(): void;
}

/**
 * Default options for the River component
 */
const DEFAULT_OPTIONS: RiverOptions = {
  center: false,
  breakout: false,
  reverse: false,
  showOverlay: true,
};

/**
 * Class representing a River component
 */
class River implements RiverInstance {
  private $element: HTMLElement;
  private options: RiverOptions;

  /**
   * Creates an instance of River
   * @param element - The river element
   * @param options - Custom options to override defaults
   */
  constructor(element: HTMLElement, options = {}) {
    this.$element = element;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.init();
  }

  /**
   * Initialize the river component
   */
  init(): void {
    if (this.options.contentWidth) {
      this.$element.style.setProperty(RIVER.ATTRIBUTES.CONTENT_WIDTH, this.options.contentWidth);
    }

    // Add background image if provided
    if (this.options.backgroundImageSrc) {
      this.setupBackgroundImage();
    }
  }

  /**
   * Setup background image
   */
  private setupBackgroundImage(): void {
    if (!this.$element || !this.options.backgroundImageSrc) return;

    // Check if background already exists
    let $bg = this.$element.querySelector(RIVER.SELECTORS.BG);

    if (!$bg) {
      // Create background container
      $bg = document.createElement('div');
      $bg.className = RIVER.SELECTORS.BG.replace('.', '');

      // Create background image
      const $bgImage = document.createElement('img');
      $bgImage.src = this.options.backgroundImageSrc;
      $bgImage.alt = 'Background';
      $bgImage.className = RIVER.SELECTORS.BG_IMAGE.replace('.', '');
      $bg.appendChild($bgImage);

      // Create overlay if needed
      if (this.options.showOverlay) {
        const $overlay = document.createElement('div');
        $overlay.className = RIVER.SELECTORS.OVERLAY.replace('.', '');
        $bg.appendChild($overlay);
      }

      // Add background to the element (as first child)
      if (this.$element.firstChild) {
        this.$element.insertBefore($bg, this.$element.firstChild);
      } else {
        this.$element.appendChild($bg);
      }
    }
  }

  /**
   * Clean up component
   */
  destroy(): void {
    // Remove any event listeners or cleanup here
  }
}

/**
 * Initialize all river components in the document
 * @param selector - CSS selector string or DOM Element
 * @param options - Custom options to override defaults
 * @returns Array of River instances
 */
export function initializeRivers(selector = RIVER.SELECTORS.RIVER, options = {}): RiverInstance[] {
  const riverInstances: RiverInstance[] = [];
  const riverElements = document.querySelectorAll<HTMLElement>(
    typeof selector === 'string' ? selector : RIVER.SELECTORS.RIVER
  );

  if (!riverElements.length) return riverInstances;

  riverElements.forEach(element => {
    try {
      const instance = new River(element, options);
      riverInstances.push(instance);
    } catch (error) {
      console.error('Error initializing river:', error);
    }
  });

  return riverInstances;
}

export default River;
