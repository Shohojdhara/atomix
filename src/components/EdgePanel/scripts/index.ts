import { EDGE_PANEL } from '../../../lib/constants/components';

/**
 * Interface for EdgePanel instance
 */
interface EdgePanelInstance {
  openPanel: () => void;
  closePanel: () => void;
  destroy: () => void;
}

/**
 * Get transform value for a given position
 * @param position - Panel position
 * @returns CSS transform value
 */
function getTransformValue(position: string): string {
  const validPositions = ['start', 'end', 'top', 'bottom'] as const;
  type Position = typeof validPositions[number];
  
  // Type guard to check if position is valid
  const isValidPosition = (pos: string): pos is Position => 
    validPositions.includes(pos as Position);
  
  if (isValidPosition(position)) {
    return EDGE_PANEL.TRANSFORM_VALUES[position];
  }
  
  // Default to start if position is invalid
  return EDGE_PANEL.TRANSFORM_VALUES.start;
}

/**
 * Class representing an EdgePanel component
 */
class EdgePanel implements EdgePanelInstance {
  private $panel: HTMLElement;
  private $container: HTMLElement | null = null;
  private $backdrop: HTMLElement | null = null;
  private $closeButton: HTMLElement | null = null;
  private $trigger: HTMLElement | null = null;
  private isOpen: boolean = false;
  private position: string;
  private mode: string;
  private closeOnBackdropClick: boolean;
  private closeOnEscape: boolean;
  private hasBackdrop: boolean;
  private animationDuration: number = EDGE_PANEL.ANIMATION_DURATION;
  private resizeHandler: (() => void) | null = null;

  /**
   * Creates an instance of EdgePanel
   * @param element - The panel container element
   */
  constructor(element: HTMLElement | string) {
    this.$panel = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element;
      
    if (!this.$panel) {
      throw new Error('EdgePanel: Panel element not found');
    }
    
    this.position = this.$panel.dataset.position || 'start';
    this.mode = this.$panel.dataset.mode || 'slide';
    this.closeOnBackdropClick = this.$panel.dataset.closeOnBackdropClick !== 'false';
    this.closeOnEscape = this.$panel.dataset.closeOnEscape !== 'false';
    this.hasBackdrop = this.$panel.dataset.backdrop !== 'false';
    
    this._initialize();
  }

  /**
   * Initialize the edge panel component
   */
  private _initialize(): void {
    this._initializeElements();
    if (!this._validateElements()) return;
    this._setInitialStyles();
    this._bindEvents();
  }

  /**
   * Initialize DOM elements
   */
  private _initializeElements(): void {
    this.$container = this.$panel.querySelector(EDGE_PANEL.SELECTORS.CONTAINER);
    this.$backdrop = this.$panel.querySelector(EDGE_PANEL.SELECTORS.BACKDROP);
    this.$closeButton = this.$panel.querySelector(EDGE_PANEL.SELECTORS.CLOSE);
    
    // Find potential external trigger button(s)
    const panelId = this.$panel.id;
    if (panelId) {
      this.$trigger = document.querySelector(`[data-target="#${panelId}"]`);
    }
  }

  /**
   * Validate required elements exist
   * @returns Whether all required elements exist
   */
  private _validateElements(): boolean {
    if (!this.$container) {
      console.warn('EdgePanel: Container element not found', this.$panel);
      return false;
    }
    return true;
  }

  /**
   * Set initial styles for the panel
   */
  private _setInitialStyles(): void {
    if (!this.$container) return;
    
    this.$panel.style.display = 'none';
    
    if (this.mode === 'slide' || this.mode === 'push') {
      const transform = getTransformValue(this.position);
      this.$container.style.transform = transform;
    }
    
    if (!this.hasBackdrop && this.$backdrop) {
      this.$backdrop.style.display = 'none';
    }
  }

  /**
   * Bind event listeners
   */
  private _bindEvents(): void {
    if (this.$trigger) {
      this.$trigger.addEventListener('click', this._handleTriggerClick.bind(this));
    }
    
    if (this.$closeButton) {
      this.$closeButton.addEventListener('click', this._handleCloseClick.bind(this));
    }
    
    if (this.$backdrop && this.closeOnBackdropClick) {
      this.$backdrop.addEventListener('click', this._handleBackdropClick.bind(this));
    }
    
    if (this.closeOnEscape) {
      document.addEventListener('keydown', this._handleEscapeKey.bind(this));
    }
    
    if (this.mode === 'push') {
      this.resizeHandler = this._handleResize.bind(this);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  /**
   * Handle trigger button click
   */
  private _handleTriggerClick(event: Event): void {
    event.preventDefault();
    this.openPanel();
  }

  /**
   * Handle close button click
   */
  private _handleCloseClick(event: Event): void {
    event.preventDefault();
    this.closePanel();
  }

  /**
   * Handle backdrop click
   */
  private _handleBackdropClick(event: Event): void {
    if (event.target === this.$backdrop) {
      this.closePanel();
    }
  }

  /**
   * Handle escape key press
   */
  private _handleEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen) {
      this.closePanel();
    }
  }

  /**
   * Handle window resize
   */
  private _handleResize(): void {
    if (this.isOpen && this.mode === 'push') {
      this._adjustBodyPadding();
    }
  }

  /**
   * Adjust body padding when using push mode
   */
  private _adjustBodyPadding(): void {
    if (!this.$container) return;
    
    const size = this.position === 'top' || this.position === 'bottom'
      ? this.$container.clientHeight
      : this.$container.clientWidth;
    
    // Map position to CSS padding property
    let paddingProperty: string;
    switch (this.position) {
      case 'start':
        paddingProperty = 'paddingLeft';
        break;
      case 'end':
        paddingProperty = 'paddingRight';
        break;
      default:
        // For top/bottom, capitalize first letter
        paddingProperty = `padding${this.position.charAt(0).toUpperCase() + this.position.slice(1)}`;
    }
    
    document.body.style[paddingProperty as any] = `${size}px`;
    document.body.classList.add('is-pushed');
  }

  /**
   * Reset body padding
   */
  private _resetBodyPadding(): void {
    // Map position to CSS padding property
    let paddingProperty: string;
    switch (this.position) {
      case 'start':
        paddingProperty = 'paddingLeft';
        break;
      case 'end':
        paddingProperty = 'paddingRight';
        break;
      default:
        // For top/bottom, capitalize first letter
        paddingProperty = `padding${this.position.charAt(0).toUpperCase() + this.position.slice(1)}`;
    }
    
    document.body.style[paddingProperty as any] = '';
    document.body.classList.remove('is-pushed');
  }

  /**
   * Open the panel
   */
  public openPanel(): void {
    if (this.isOpen) return;
    
    // First display the panel
    this.$panel.style.display = 'block';
    
    // Force a reflow before animations (skip for 'none' mode)
    if (this.mode !== 'none') {
      void this.$panel.offsetHeight;
    }
    
    // Add the open class to the panel
    this.$panel.classList.add(EDGE_PANEL.CLASSES.IS_OPEN);
    document.body.classList.add('is-edgepanel-open');
    
    // Add animation class to container
    if (this.$container) {
      // Only add animation if not in 'none' mode
      if (this.mode !== 'none') {
        // Add animation class first
        this.$container.classList.add('is-animating');
        
        // Remove animation class after animation completes
        const container = this.$container; // Capture for use in setTimeout
        setTimeout(() => {
          if (container) {
            container.classList.remove('is-animating');
          }
        }, this.animationDuration);
      }
      
      // Set transform immediately
      this.$container.style.transform = 'translate(0)';
    }
    
    if (this.mode === 'push') {
      this._adjustBodyPadding();
    }
    
    this.isOpen = true;
    
    // Fire a custom event
    this.$panel.dispatchEvent(new CustomEvent('edgepanel:open', { bubbles: true }));
  }

  /**
   * Close the panel
   */
  public closePanel(): void {
    if (!this.isOpen) return;
    
    if (this.$container) {
      // Only add animation class if not in 'none' mode
      if (this.mode !== 'none' && (this.mode === 'slide' || this.mode === 'push')) {
        // Add the animation out class first
        this.$container.classList.add('is-animating-out');
        
        // Remove animation class after animation completes
        const container = this.$container;
        setTimeout(() => {
          if (container) {
            container.classList.remove('is-animating-out');
          }
        }, this.animationDuration);
      }
      
      // Set transform
      this.$container.style.transform = getTransformValue(this.position);
    }
    
    this.$panel.classList.remove(EDGE_PANEL.CLASSES.IS_OPEN);
    
    if (this.mode === 'push') {
      this._resetBodyPadding();
    }
    
    // Fire a custom event
    this.$panel.dispatchEvent(new CustomEvent('edgepanel:close', { bubbles: true }));
    
    // Wait for animation to complete before hiding
    const hideDelay = this.mode === 'none' ? 0 : this.animationDuration;
    
    setTimeout(() => {
      document.body.classList.remove('is-edgepanel-open');
      this.$panel.style.display = 'none';
      this.isOpen = false;
    }, hideDelay);
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    if (this.$trigger) {
      this.$trigger.removeEventListener('click', this._handleTriggerClick.bind(this));
    }
    
    if (this.$closeButton) {
      this.$closeButton.removeEventListener('click', this._handleCloseClick.bind(this));
    }
    
    if (this.$backdrop && this.closeOnBackdropClick) {
      this.$backdrop.removeEventListener('click', this._handleBackdropClick.bind(this));
    }
    
    document.removeEventListener('keydown', this._handleEscapeKey.bind(this));
    
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    
    if (this.isOpen) {
      document.body.classList.remove('is-edgepanel-open');
      if (this.mode === 'push') {
        this._resetBodyPadding();
      }
    }
  }
}

/**
 * Initialize all edge panels in the document
 * @returns Array of edge panel instances
 */
export function initializeEdgePanels(): EdgePanelInstance[] {
  const panelInstances: EdgePanelInstance[] = [];
  const $panels = document.querySelectorAll<HTMLElement>(EDGE_PANEL.SELECTORS.PANEL);

  if (!$panels.length) return panelInstances;

  $panels.forEach(($panel) => {
    try {
      // Skip if already initialized
      if (($panel as any).edgePanelInstance) return;
      
      const instance = new EdgePanel($panel);
      // Store instance on DOM element for reference
      ($panel as any).edgePanelInstance = instance;
      panelInstances.push(instance);
    } catch (error) {
      console.error('Error initializing edge panel:', error);
    }
  });

  return panelInstances;
}

// Export constants for use in HTML
export const SELECTORS = EDGE_PANEL.SELECTORS;
export const CLASSES = EDGE_PANEL.CLASSES;
export const POSITIONS = {
  START: 'start',
  END: 'end',
  TOP: 'top',
  BOTTOM: 'bottom'
};
export const MODES = {
  SLIDE: 'slide',
  PUSH: 'push',
  NONE: 'none'
};

// Export component interactions
export * from './edgePanelInteractions';

export default EdgePanel; 