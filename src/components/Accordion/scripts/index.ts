import { ACCORDION } from '../../../lib/constants/components';
// For backward compatibility, using local constants
// import { SELECTORS, CLASSES, ATTRIBUTES, CSS_VARS } from './constants';

/**
 * Interface for Accordion instance
 */
interface AccordionInstance {
  destroy: () => void;
}

/**
 * Class representing an Accordion component
 */
class Accordion implements AccordionInstance {
  private $accordion: HTMLElement;
  private $toggler: HTMLButtonElement | null = null;
  private $panel: HTMLElement | null = null;
  private $body: HTMLElement | null = null;
  private _resizeObserver: ResizeObserver | null = null;

  /**
   * Creates an instance of Accordion
   * @param element - The accordion container element
   */
  constructor(element: HTMLElement) {
    this.$accordion = element;
    this._initialize();
  }

  /**
   * Initialize the accordion component
   */
  private _initialize(): void {
    this._initializeElements();
    if (!this._validateElements()) return;
    this._setupAccessibility();
    this._bindEvents();
    this._initializeState();
    this._observeResizing();
  }

  /**
   * Initialize DOM elements
   */
  private _initializeElements(): void {
    let $toggler = this.$accordion.querySelector(ACCORDION.SELECTORS.HEADER) as HTMLElement | null;
    this.$panel = this.$accordion.querySelector(ACCORDION.SELECTORS.PANEL);
    this.$body = this.$accordion.querySelector(ACCORDION.SELECTORS.BODY);

    if ($toggler && $toggler.tagName !== 'BUTTON') {
      const $button = document.createElement('button');
      $button.className = $toggler.className;
      $button.innerHTML = $toggler.innerHTML;
      $toggler.parentNode?.replaceChild($button, $toggler);
      $toggler = $button;
    }

    this.$toggler = $toggler as HTMLButtonElement;
  }

  /**
   * Validate required elements exist
   * @returns Whether all required elements exist
   */
  private _validateElements(): boolean {
    if (!this.$toggler || !this.$panel || !this.$body) {
      console.warn('Accordion: Missing required elements', this.$accordion);
      return false;
    }
    return true;
  }

  /**
   * Set up accessibility attributes
   */
  private _setupAccessibility(): void {
    const panelId = `accordion-${Math.random().toString(36).slice(2, 11)}`;

    this.$toggler?.setAttribute(ACCORDION.ATTRIBUTES.ARIA_EXPANDED, 'false');
    this.$toggler?.setAttribute(ACCORDION.ATTRIBUTES.ARIA_CONTROLS, panelId);

    this.$panel?.setAttribute(ACCORDION.ATTRIBUTES.ROLE, 'region');
    if (this.$panel) this.$panel.id = panelId;
    this.$panel?.setAttribute(ACCORDION.ATTRIBUTES.ARIA_HIDDEN, 'true');
  }

  /**
   * Bind event listeners
   */
  private _bindEvents(): void {
    this.$toggler?.addEventListener('click', this._handleToggle.bind(this));
    this.$toggler?.addEventListener('keydown', this._handleKeydown.bind(this));
  }

  /**
   * Initialize initial state
   */
  private _initializeState(): void {
    if (this.$accordion.classList.contains(ACCORDION.CLASSES.IS_OPEN)) {
      this._setExpandedState(true);
      this._updatePanelHeight();
    }
  }

  /**
   * Observe resizing of accordion content
   */
  private _observeResizing(): void {
    if (!this.$body) return;
    
    this._resizeObserver = new ResizeObserver(() => {
      if (this.$accordion.classList.contains(ACCORDION.CLASSES.IS_OPEN)) {
        this._updatePanelHeight();
      }
    });

    this._resizeObserver.observe(this.$body);
  }

  /**
   * Handle toggle click
   * @param event - Click event
   */
  private _handleToggle(event?: Event): void {
    event?.preventDefault();
    const isOpen = this.$accordion.classList.contains(ACCORDION.CLASSES.IS_OPEN);
    this._setExpandedState(!isOpen);
  }

  /**
   * Handle keyboard event
   * @param event - Keyboard event
   */
  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleToggle(event);
    }
  }

  /**
   * Set expanded state
   * @param isExpanded - Whether accordion is expanded
   */
  private _setExpandedState(isExpanded: boolean): void {
    this.$toggler?.setAttribute(ACCORDION.ATTRIBUTES.ARIA_EXPANDED, isExpanded.toString());
    this.$panel?.setAttribute(ACCORDION.ATTRIBUTES.ARIA_HIDDEN, (!isExpanded).toString());

    if (isExpanded) {
      this.$accordion.classList.add(ACCORDION.CLASSES.IS_OPEN);
      this._updatePanelHeight();
    } else {
      this.$accordion.classList.remove(ACCORDION.CLASSES.IS_OPEN);
      this.$panel?.style.setProperty(ACCORDION.CSS_VARS.PANEL_HEIGHT, '0px');
    }
  }

  /**
   * Update panel height based on content
   */
  private _updatePanelHeight(): void {
    if (this.$panel && this.$body) {
      this.$panel.style.setProperty(
        ACCORDION.CSS_VARS.PANEL_HEIGHT,
        `${this.$body.clientHeight}px`
      );
    }
  }

  /**
   * Clean up event listeners and observers
   */
  public destroy(): void {
    this._resizeObserver?.disconnect();
    this.$toggler?.removeEventListener('click', this._handleToggle);
    this.$toggler?.removeEventListener('keydown', this._handleKeydown);
  }
}

/**
 * Initialize all accordions in the document
 * @returns Array of accordion instances
 */
export function initializeAccordions(): AccordionInstance[] {
  const accordionInstances: AccordionInstance[] = [];
  const $accordions = document.querySelectorAll<HTMLElement>(ACCORDION.SELECTORS.ACCORDION);

  if (!$accordions.length) return accordionInstances;

  $accordions.forEach(($accordion) => {
    try {
      const instance = new Accordion($accordion);
      accordionInstances.push(instance);
    } catch (error) {
      console.error('Error initializing accordion:', error);
    }
  });

  return accordionInstances;
}

// Export constants for backward compatibility
export const SELECTORS = ACCORDION.SELECTORS;
export const CLASSES = ACCORDION.CLASSES;
export const ATTRIBUTES = ACCORDION.ATTRIBUTES;
export const CSS_VARS = ACCORDION.CSS_VARS;

// Export component interactions
export * from './accordionInteractions';

export default Accordion; 