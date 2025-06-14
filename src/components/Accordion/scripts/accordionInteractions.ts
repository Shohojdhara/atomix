import Accordion, { initializeAccordions } from './index';
import { ACCORDION } from '../../../lib/constants/components';
import { addClass, removeClass } from '../../../lib/utils/dom';

/**
 * Apply custom enter animation to accordion
 * @param accordion - Accordion element
 */
export function applyEnterAnimation(accordion: HTMLElement): void {
  const header = accordion.querySelector(ACCORDION.SELECTORS.HEADER) as HTMLElement;

  if (!header) return;

  header.addEventListener('click', () => {
    const isOpen = accordion.classList.contains(ACCORDION.CLASSES.IS_OPEN);

    if (isOpen) {
      addClass(accordion, ACCORDION.CLASSES.IS_ANIMATING);
      setTimeout(() => {
        removeClass(accordion, ACCORDION.CLASSES.IS_ANIMATING);
      }, 300); // Match your CSS transition duration
    }
  });
}

/**
 * Initialize accordions with custom behavior
 * @returns Array of accordion instances
 */
export function initializeAccordionsWithCustomBehavior(): Accordion[] {
  const instances = initializeAccordions() as Accordion[];

  // Get all accordion elements
  const accordions = document.querySelectorAll<HTMLElement>(ACCORDION.SELECTORS.ACCORDION);

  // Apply custom animations to each accordion
  accordions.forEach(accordion => {
    applyEnterAnimation(accordion);
  });

  return instances;
}

/**
 * Opens all accordions on the page
 */
export function openAllAccordions(): void {
  const accordions = document.querySelectorAll<HTMLElement>(ACCORDION.SELECTORS.ACCORDION);

  accordions.forEach(accordion => {
    const header = accordion.querySelector(ACCORDION.SELECTORS.HEADER) as HTMLButtonElement;
    if (header && !accordion.classList.contains(ACCORDION.CLASSES.IS_OPEN)) {
      header.click();
    }
  });
}

/**
 * Closes all accordions on the page
 */
export function closeAllAccordions(): void {
  const accordions = document.querySelectorAll<HTMLElement>(ACCORDION.SELECTORS.ACCORDION);

  accordions.forEach(accordion => {
    const header = accordion.querySelector(ACCORDION.SELECTORS.HEADER) as HTMLButtonElement;
    if (header && accordion.classList.contains(ACCORDION.CLASSES.IS_OPEN)) {
      header.click();
    }
  });
}
