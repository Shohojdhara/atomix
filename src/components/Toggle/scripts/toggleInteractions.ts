import Toggle from './index';
import { TOGGLE } from '../../../lib/constants/components';

/**
 * Apply hover effect to toggle
 * @param toggle - Toggle element
 */
export function applyHoverEffect(toggle: HTMLElement): void {
  const hoverClass = 'is-hovered';

  toggle.addEventListener('mouseenter', () => {
    toggle.classList.add(hoverClass);
  });

  toggle.addEventListener('mouseleave', () => {
    toggle.classList.remove(hoverClass);
  });
}

/**
 * Apply focus effect to toggle
 * @param toggle - Toggle element
 */
export function applyFocusEffect(toggle: HTMLElement): void {
  const focusClass = 'is-focused';
  const input = toggle.querySelector('input');

  if (input) {
    input.addEventListener('focus', () => {
      toggle.classList.add(focusClass);
    });

    input.addEventListener('blur', () => {
      toggle.classList.remove(focusClass);
    });
  }
}

/**
 * Initialize a single toggle with event listeners
 * @param toggle - Toggle element
 * @param onChange - Change callback
 */
export function initializeToggle(toggle: HTMLElement, onChange?: (checked: boolean) => void): void {
  const input = toggle.querySelector('input[type="checkbox"]') as HTMLInputElement;

  if (input) {
    input.addEventListener('change', () => {
      if (onChange) onChange(input.checked);
    });

    // Apply effects
    applyHoverEffect(toggle);
    applyFocusEffect(toggle);
  }
}

/**
 * Initialize all toggles on the page
 * @param selector - CSS selector for toggles
 * @returns Array of toggle instances
 */
export function initializeAllToggles(selector = '[data-component="toggle"]'): Toggle[] {
  const toggleInstances: Toggle[] = [];
  const toggleElements = document.querySelectorAll<HTMLElement>(selector);

  toggleElements.forEach(element => {
    try {
      const instance = new Toggle(element);
      toggleInstances.push(instance);
    } catch (error) {
      console.error('Error initializing toggle:', error);
    }
  });

  return toggleInstances;
}
