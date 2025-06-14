import Card from './index';
import { CARD } from '../../../lib/constants/components';

/**
 * Apply hover effect to card
 * @param card - Card element
 */
export function applyHoverEffect(card: HTMLElement): void {
  const hoverClass = 'is-hovered';

  card.addEventListener('mouseenter', () => {
    card.classList.add(hoverClass);
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove(hoverClass);
  });
}

/**
 * Apply focus effect to card
 * @param card - Card element
 */
export function applyFocusEffect(card: HTMLElement): void {
  const focusClass = 'is-focused';

  // Make card focusable if it isn't already
  if (!card.getAttribute('tabindex')) {
    card.setAttribute('tabindex', '0');
  }

  card.addEventListener('focus', () => {
    card.classList.add(focusClass);
  });

  card.addEventListener('blur', () => {
    card.classList.remove(focusClass);
  });
}

/**
 * Make card clickable
 * @param card - Card element
 * @param onClick - Click handler
 */
export function makeCardClickable(card: HTMLElement, onClick: () => void): void {
  // Make card focusable if it isn't already
  if (!card.getAttribute('tabindex')) {
    card.setAttribute('tabindex', '0');
  }

  // Add role for accessibility
  card.setAttribute('role', 'button');

  // Add click handler
  card.addEventListener('click', onClick);

  // Add keyboard handler for accessibility
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  });

  // Add visual feedback
  applyHoverEffect(card);
  applyFocusEffect(card);
}

/**
 * Apply elevation effect on hover
 * @param card - Card element
 * @param elevationClass - CSS class for elevation effect
 */
export function applyElevationEffect(card: HTMLElement, elevationClass = 'is-elevated'): void {
  card.addEventListener('mouseenter', () => {
    card.classList.add(elevationClass);
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove(elevationClass);
  });
}

/**
 * Apply flip effect to card
 * @param card - Card element
 * @param frontSelector - Selector for front side of card
 * @param backSelector - Selector for back side of card
 * @param trigger - Trigger type: 'click' or 'hover'
 */
export function applyFlipEffect(
  card: HTMLElement,
  frontSelector = '.c-card--front',
  backSelector = '.c-card--back',
  trigger = 'click'
): void {
  const flipClass = 'is-flipped';
  const frontElement = card.querySelector(frontSelector);
  const backElement = card.querySelector(backSelector);

  if (!frontElement || !backElement) {
    console.error('Card flip effect requires both front and back elements');
    return;
  }

  // Add necessary styling for flip effect
  card.style.perspective = '1000px';
  card.style.transformStyle = 'preserve-3d';

  [frontElement, backElement].forEach(el => {
    if (el) {
      (el as HTMLElement).style.backfaceVisibility = 'hidden';
      (el as HTMLElement).style.position = 'absolute';
      (el as HTMLElement).style.top = '0';
      (el as HTMLElement).style.left = '0';
      (el as HTMLElement).style.width = '100%';
      (el as HTMLElement).style.height = '100%';
      (el as HTMLElement).style.transition = 'transform 0.6s';
    }
  });

  (backElement as HTMLElement).style.transform = 'rotateY(180deg)';

  if (trigger === 'click') {
    card.addEventListener('click', () => {
      card.classList.toggle(flipClass);
      if (card.classList.contains(flipClass)) {
        (frontElement as HTMLElement).style.transform = 'rotateY(180deg)';
        (backElement as HTMLElement).style.transform = 'rotateY(0)';
      } else {
        (frontElement as HTMLElement).style.transform = 'rotateY(0)';
        (backElement as HTMLElement).style.transform = 'rotateY(180deg)';
      }
    });
  } else if (trigger === 'hover') {
    card.addEventListener('mouseenter', () => {
      card.classList.add(flipClass);
      (frontElement as HTMLElement).style.transform = 'rotateY(180deg)';
      (backElement as HTMLElement).style.transform = 'rotateY(0)';
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove(flipClass);
      (frontElement as HTMLElement).style.transform = 'rotateY(0)';
      (backElement as HTMLElement).style.transform = 'rotateY(180deg)';
    });
  }
}

/**
 * Initialize all cards on the page
 * @param selector - CSS selector for cards
 * @returns Array of card instances
 */
export function initializeAllCards(selector = '[data-component="card"]'): Card[] {
  const cardInstances: Card[] = [];
  const cardElements = document.querySelectorAll<HTMLElement>(selector);

  cardElements.forEach(element => {
    try {
      const instance = new Card(element);
      cardInstances.push(instance);
    } catch (error) {
      console.error('Error initializing card:', error);
    }
  });

  return cardInstances;
}
