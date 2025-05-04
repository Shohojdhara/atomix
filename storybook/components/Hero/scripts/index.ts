import { HERO } from '../../../lib/constants/components';

/**
 * Hero instance interface
 */
interface HeroInstance {
  /**
   * Initialize the hero component
   */
  init(): void;
}

/**
 * Class representing a Hero component
 */
class Hero implements HeroInstance {
  private $hero: HTMLElement;

  /**
   * Creates an instance of Hero
   * @param element - The hero element
   */
  constructor(element: HTMLElement) {
    this.$hero = element;
    this.init();
  }

  /**
   * Initialize the hero component
   */
  init(): void {
    // Add initialization logic if needed
  }
}

/**
 * Initialize all hero components in the document
 */
export function initHeroes(): void {
  const heroes = document.querySelectorAll(HERO.SELECTORS.HERO);
  
  heroes.forEach((hero) => {
    new Hero(hero as HTMLElement);
  });
}

// Automatically initialize heroes when the DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroes);
  } else {
    initHeroes();
  }
} 