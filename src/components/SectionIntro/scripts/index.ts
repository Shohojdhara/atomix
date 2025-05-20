import { SECTION_INTRO } from '../../../lib/constants/components';

/**
 * Interface for SectionIntro options
 */
interface SectionIntroOptions {
  alignment?: 'left' | 'center' | 'right';
  backgroundImageSrc?: string;
  showOverlay?: boolean;
  size?: 'sm' | 'md' | 'lg';
  skeleton?: boolean;
  [key: string]: any;
}

/**
 * Interface for SectionIntro instance
 */
interface SectionIntroInstance {
  destroy: () => void;
}

/**
 * Default options for the SectionIntro component
 */
const DEFAULT_OPTIONS: SectionIntroOptions = {
  alignment: 'left',
  showOverlay: false,
  size: 'md',
  skeleton: false
};

/**
 * Class representing a SectionIntro component
 */
class SectionIntro implements SectionIntroInstance {
  private selector: string | Element;
  private $element: HTMLElement | null;
  private options: SectionIntroOptions;

  /**
   * Creates an instance of SectionIntro
   * @param selector - CSS selector string or DOM Element
   * @param options - Custom options to override defaults
   */
  constructor(selector: string | Element, options = {}) {
    this.selector = selector || SECTION_INTRO.SELECTORS.SECTION_INTRO;
    this.$element =
      typeof selector === 'string'
        ? document.querySelector<HTMLElement>(selector)
        : selector as HTMLElement;
    this.options = { ...DEFAULT_OPTIONS, ...options } as SectionIntroOptions;
    this._initialize();
  }

  /**
   * Initialize the section intro component
   */
  private _initialize(): void {
    if (!this.$element) return;

    // Apply alignment classes if needed
    if (this.options.alignment === 'center' && !this.$element.classList.contains(SECTION_INTRO.CLASSES.CENTER)) {
      this.$element.classList.add(SECTION_INTRO.CLASSES.CENTER);
    }

    // Apply size classes if specified
    if (this.options.size === 'sm' && !this.$element.classList.contains(SECTION_INTRO.CLASSES.SMALL)) {
      this.$element.classList.add(SECTION_INTRO.CLASSES.SMALL);
    } else if (this.options.size === 'lg' && !this.$element.classList.contains(SECTION_INTRO.CLASSES.LARGE)) {
      this.$element.classList.add(SECTION_INTRO.CLASSES.LARGE);
    }

    // Add background image if provided
    if (this.options.backgroundImageSrc) {
      let bgElement = this.$element.querySelector('.c-sectionintro__bg');
      
      // Create background element if it doesn't exist
      if (!bgElement) {
        bgElement = document.createElement('div');
        bgElement.className = 'c-sectionintro__bg';
        
        const imgElement = document.createElement('img');
        imgElement.className = 'c-sectionintro__bg-image';
        imgElement.src = this.options.backgroundImageSrc;
        imgElement.alt = 'Background';
        
        bgElement.appendChild(imgElement);
        
        // Add overlay if needed
        if (this.options.showOverlay) {
          const overlayElement = document.createElement('div');
          overlayElement.className = 'c-sectionintro__overlay';
          bgElement.appendChild(overlayElement);
        }
        
        // Insert at the beginning of the element
        this.$element.insertBefore(bgElement, this.$element.firstChild);
      }
    }
  }

  /**
   * Clean up event listeners and remove added elements
   */
  public destroy(): void {
    if (!this.$element) return;
    
    // Remove alignment classes
    this.$element.classList.remove(SECTION_INTRO.CLASSES.CENTER);
    
    // Remove size classes
    this.$element.classList.remove(SECTION_INTRO.CLASSES.SMALL);
    this.$element.classList.remove(SECTION_INTRO.CLASSES.LARGE);
    
    // Remove background if it was dynamically added
    if (this.options.backgroundImageSrc) {
      const bgElement = this.$element.querySelector('.c-sectionintro__bg');
      if (bgElement) {
        this.$element.removeChild(bgElement);
      }
    }
  }
}

/**
 * Initialize all section intros in the document
 * @param {string|Element} selector - CSS selector string or DOM Element
 * @param {Object} options - Custom options to override defaults
 * @returns {SectionIntroInstance[]} Array of SectionIntro instances
 */
export function initializeSectionIntros(selector = SECTION_INTRO.SELECTORS.SECTION_INTRO, options = {}): SectionIntroInstance[] {
  const sectionIntroInstances: SectionIntroInstance[] = [];
  const sectionIntroElements = document.querySelectorAll<HTMLElement>(typeof selector === 'string' ? selector : SECTION_INTRO.SELECTORS.SECTION_INTRO);

  if (!sectionIntroElements.length) return sectionIntroInstances;

  sectionIntroElements.forEach((element) => {
    try {
      const instance = new SectionIntro(element, options);
      sectionIntroInstances.push(instance);
    } catch (error) {
      console.error('Error initializing section intro:', error);
    }
  });

  return sectionIntroInstances;
}

export default SectionIntro;
