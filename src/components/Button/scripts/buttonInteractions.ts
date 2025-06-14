import { useButton } from '../../../lib/composables/useButton';
import { addClass, removeClass } from '../../../lib/utils/dom';

/**
 * Apply hover effect to button
 * @param button - Button element
 */
export function applyHoverEffect(button: HTMLButtonElement): void {
  const hoverClass = 'is-hovered';

  button.addEventListener('mouseenter', () => {
    if (!button.disabled) {
      addClass(button, hoverClass);
    }
  });

  button.addEventListener('mouseleave', () => {
    removeClass(button, hoverClass);
  });
}

/**
 * Apply active/pressed effect to button
 * @param button - Button element
 */
export function applyActiveEffect(button: HTMLButtonElement): void {
  const activeClass = 'is-active';

  button.addEventListener('mousedown', () => {
    if (!button.disabled) {
      addClass(button, activeClass);
    }
  });

  button.addEventListener('mouseup', () => {
    removeClass(button, activeClass);
  });

  button.addEventListener('mouseleave', () => {
    removeClass(button, activeClass);
  });
}

/**
 * Initialize button functionality
 * @param button - Button element
 * @param options - Button options
 */
export function initializeButton(
  button: HTMLButtonElement,
  options?: {
    onClick?: () => void;
    enableHoverEffect?: boolean;
    enableActiveEffect?: boolean;
  }
): void {
  const { onClick, enableHoverEffect = true, enableActiveEffect = true } = options || {};
  const { handleClick } = useButton();

  // Set up click handler with disabled state check
  if (onClick) {
    button.addEventListener('click', handleClick(onClick));
  }

  // Apply interaction effects
  if (enableHoverEffect) {
    applyHoverEffect(button);
  }

  if (enableActiveEffect) {
    applyActiveEffect(button);
  }
}
