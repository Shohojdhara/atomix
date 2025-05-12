import { HERO } from '../../../lib/constants/components';

/**
 * HeroOptions interface for the vanilla JS implementation
 */
export interface HeroOptions {
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  fullHeight?: boolean;
  centered?: boolean;
  className?: string;
}

/**
 * HeroInstance interface
 */
export interface HeroInstance {
  init(): void;
  destroy(): void;
}

/**
 * Default options for the Hero component
 */
const DEFAULT_OPTIONS: HeroOptions = {
  overlay: true,
  overlayOpacity: 0.5,
  fullHeight: false,
  centered: false
};

/**
 * Hero Class - Vanilla JS implementation
 */
export class Hero implements HeroInstance {
  private element: HTMLElement;
  private options: HeroOptions;

  /**
   * Constructor
   * @param element - DOM element or selector
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: HeroOptions = {}) {
    // Get element reference
    this.element = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (!this.element) {
      throw new Error('Hero: Element not found');
    }
    
    // Merge default options with provided options
    this.options = { ...DEFAULT_OPTIONS, ...options };
    
    // Initialize the component
    this.init();
  }

  /**
   * Initialize the hero component
   */
  public init(): void {
    // Apply classes and styles based on options
    if (this.options.fullHeight) {
      this.element.classList.add('c-hero--full-height');
    }
    
    if (this.options.centered) {
      this.element.classList.add('c-hero--centered');
    }
    
    if (this.options.className) {
      this.element.classList.add(this.options.className);
    }
    
    if (this.options.backgroundImage) {
      this.element.style.backgroundImage = `url(${this.options.backgroundImage})`;
    }
    
    // Set up overlay if needed
    if (this.options.overlay) {
      const overlay = document.createElement('div');
      overlay.className = 'c-hero__overlay';
      
      if (this.options.overlayOpacity !== undefined) {
        overlay.style.opacity = this.options.overlayOpacity.toString();
      }
      
      this.element.appendChild(overlay);
    }
  }

  /**
   * Destroy the hero component
   */
  public destroy(): void {
    // Remove added classes
    this.element.classList.remove('c-hero--full-height');
    this.element.classList.remove('c-hero--centered');
    
    if (this.options.className) {
      this.element.classList.remove(this.options.className);
    }
    
    // Remove background image
    if (this.options.backgroundImage) {
      this.element.style.backgroundImage = '';
    }
    
    // Remove overlay
    const overlay = this.element.querySelector('.c-hero__overlay');
    if (overlay) {
      this.element.removeChild(overlay);
    }
  }

  /**
   * Initialize all hero components in the document
   */
  public static initializeAll(selector = '[data-component="hero"]'): Hero[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => {
      return new Hero(element as HTMLElement);
    });
  }
}

/**
 * Initialize all hero components in the document
 */
export function initHeroes(): void {
  Hero.initializeAll();
}

// Automatically initialize heroes when the DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroes);
  } else {
    initHeroes();
  }
} 