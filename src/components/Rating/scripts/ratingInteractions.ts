import Rating from './index';
// RatingOptions is used in other functions in this file

/**
 * Event handlers and utility functions for Rating component
 */

/**
 * Handle keyboard navigation for rating stars
 * @param event Keyboard event
 * @param container Rating container element
 */
export function handleKeyboardNavigation(event: KeyboardEvent, container: HTMLElement): void {
  if (!container) return;

  const stars = container.querySelectorAll<HTMLElement>('.c-rating__star');
  if (!stars.length) return;

  const currentIndex = Array.from(stars).findIndex(item => item === document.activeElement);
  let nextIndex = -1;

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault();
      nextIndex = currentIndex < stars.length - 1 ? currentIndex + 1 : 0;
      break;

    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : stars.length - 1;
      break;

    case 'Home':
      event.preventDefault();
      nextIndex = 0;
      break;

    case 'End':
      event.preventDefault();
      nextIndex = stars.length - 1;
      break;

    case ' ':
    case 'Enter':
      event.preventDefault();
      if (currentIndex >= 0 && stars[currentIndex]) {
        stars[currentIndex].click();
      }
      break;
  }

  if (nextIndex >= 0 && stars[nextIndex]) {
    stars[nextIndex].focus();
  }
}

/**
 * Enhance a rating with keyboard navigation
 * @param rating Rating instance
 */
export function enhanceWithKeyboardNavigation(rating: Rating): void {
  const element = rating.element;
  if (!element) return;

  element.addEventListener('keydown', (e: KeyboardEvent) => {
    handleKeyboardNavigation(e, element);
  });

  // Make stars focusable
  const stars = element.querySelectorAll<HTMLElement>('.c-rating__star');
  stars.forEach(star => {
    if (!star.hasAttribute('tabindex')) {
      star.setAttribute('tabindex', '0');
    }
    star.setAttribute('role', 'button');
    star.setAttribute(
      'aria-label',
      `Rate ${Array.from(stars).indexOf(star) + 1} out of ${stars.length}`
    );
  });
}

/**
 * Initialize ratings with data attributes
 */
export function initFromDataAttributes(): Rating[] {
  const instances: Rating[] = [];

  document.querySelectorAll('[data-rating]').forEach(element => {
    const el = element as HTMLElement;

    // Parse options from data attributes
    const options: Record<string, any> = {};

    // Value
    if (el.dataset.value) {
      options.value = parseFloat(el.dataset.value);
    }

    // Max value
    if (el.dataset.maxValue) {
      options.maxValue = parseFloat(el.dataset.maxValue);
    }

    // Allow half
    if (el.dataset.allowHalf !== undefined) {
      options.allowHalf = el.dataset.allowHalf === 'true';
    }

    // Read only
    if (el.dataset.readOnly !== undefined) {
      options.readOnly = el.dataset.readOnly === 'true';
    }

    // Size
    if (el.dataset.size) {
      options.size = el.dataset.size;
    }

    // Color
    if (el.dataset.color) {
      options.color = el.dataset.color;
    }

    const instance = new Rating(el, options);
    instances.push(instance);

    // Enhance with keyboard navigation
    enhanceWithKeyboardNavigation(instance);
  });

  return instances;
}

/**
 * Get a Rating instance from an element
 * @param element Element or selector
 */
export function getInstance(element: string | HTMLElement): Rating | null {
  const el = typeof element === 'string' ? document.querySelector(element) : element;

  if (!el) return null;

  // Use a stored reference if exists
  return (el as any)._rating || null;
}

/**
 * Dispose all Rating instances
 */
export function disposeAll(): void {
  document.querySelectorAll('[data-rating]').forEach(element => {
    const instance = getInstance(element as HTMLElement);
    if (instance) {
      instance.destroy();
    }
  });
}
