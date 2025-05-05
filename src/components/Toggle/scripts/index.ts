import { TOGGLE } from '../../../lib/constants/components';

/**
 * Interface for Toggle instance
 */
interface ToggleInstance {
  turnOn: () => void;
  turnOff: () => void;
  destroy: () => void;
}

/**
 * Class representing a Toggle component
 */
class Toggle implements ToggleInstance {
  private element: HTMLElement;
  private isOn: boolean;

  /**
   * Creates an instance of Toggle
   * @param element - The toggle container element
   */
  constructor(element: HTMLElement) {
    this.element = element;
    this.isOn = false;
    this._initialize();
  }

  /**
   * Initialize the toggle component
   */
  private _initialize(): void {
    this._bindEvents();
    // Check if toggle should be initially on
    if (this.element.classList.contains(TOGGLE.CLASSES.IS_ON)) {
      this.isOn = true;
    }
  }

  /**
   * Bind event listeners
   */
  private _bindEvents(): void {
    this.element.addEventListener('click', this._handleToggle.bind(this));
  }

  /**
   * Handle toggle click
   */
  private _handleToggle(): void {
    if (!this.isOn) {
      this.turnOn();
    } else {
      this.turnOff();
    }
  }

  /**
   * Turn on the toggle
   */
  public turnOn(): void {
    this.element.classList.add(TOGGLE.CLASSES.IS_ON);
    this.isOn = true;
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('toggle:on', { 
      bubbles: true 
    }));
  }

  /**
   * Turn off the toggle
   */
  public turnOff(): void {
    this.element.classList.remove(TOGGLE.CLASSES.IS_ON);
    this.isOn = false;
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('toggle:off', { 
      bubbles: true 
    }));
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    this.element.removeEventListener('click', this._handleToggle);
  }
}

/**
 * Initialize all toggles in the document
 * @returns Array of toggle instances
 */
export function initializeToggles(): ToggleInstance[] {
  const toggleInstances: ToggleInstance[] = [];
  const toggleElements = document.querySelectorAll<HTMLElement>(TOGGLE.SELECTORS.TOGGLE);

  if (!toggleElements.length) return toggleInstances;

  toggleElements.forEach((element) => {
    try {
      const instance = new Toggle(element);
      toggleInstances.push(instance);
    } catch (error) {
      console.error('Error initializing toggle:', error);
    }
  });

  return toggleInstances;
}

export default Toggle; 