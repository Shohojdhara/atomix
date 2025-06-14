import { POPOVER } from '../../../lib/constants/components';

/**
 * Type for popover position
 */
export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Interface for popover options
 */
export interface PopoverOptions {
  position?: PopoverPosition | 'auto';
  trigger?: 'hover' | 'click';
  offset?: number;
  delay?: number;
}

/**
 * Handle trigger click event
 */
export const handleTriggerClick = (
  isOpen: boolean,
  open: () => void,
  close: () => void,
  event?: Event
): void => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (isOpen) {
    close();
  } else {
    open();
  }
};

/**
 * Handle document click for closing popover
 */
export const handleDocumentClick = (
  element: HTMLElement,
  trigger: HTMLElement | null,
  isOpen: boolean,
  close: () => void,
  event: MouseEvent
): void => {
  if (!isOpen) return;

  const target = event.target as Node;
  if (!element.contains(target) && trigger && !trigger.contains(target)) {
    close();
  }
};

/**
 * Handle mouseenter on trigger
 */
export const handleTriggerMouseEnter = (
  open: () => void,
  delay: number,
  timeoutRef: { current: number | null }
): void => {
  if (timeoutRef.current !== null) {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }

  if (delay > 0) {
    timeoutRef.current = window.setTimeout(() => {
      open();
    }, delay);
  } else {
    open();
  }
};

/**
 * Handle mouseleave on trigger
 */
export const handleTriggerMouseLeave = (
  element: HTMLElement,
  close: () => void,
  timeoutRef: { current: number | null }
): void => {
  if (timeoutRef.current !== null) {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }

  timeoutRef.current = window.setTimeout(() => {
    if (!element.matches(':hover')) {
      close();
    }
  }, 100);
};

/**
 * Handle escape key to close popover
 */
export const handleEscapeKey = (isOpen: boolean, close: () => void, event: KeyboardEvent): void => {
  if (isOpen && event.key === 'Escape') {
    close();
  }
};

/**
 * Determine the best position based on available space
 */
export const determineBestPosition = (triggerRect: DOMRect): PopoverPosition => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Calculate space available in each direction
  const spaceTop = triggerRect.top;
  const spaceBottom = viewportHeight - triggerRect.bottom;
  const spaceLeft = triggerRect.left;
  const spaceRight = viewportWidth - triggerRect.right;

  // Find position with most space
  const spaces = [
    { position: 'top', space: spaceTop },
    { position: 'right', space: spaceRight },
    { position: 'bottom', space: spaceBottom },
    { position: 'left', space: spaceLeft },
  ];

  // Sort by available space (descending)
  spaces.sort((a, b) => b.space - a.space);

  // Select position with most space
  return spaces[0].position as PopoverPosition;
};

/**
 * Check if there's enough space in the preferred position and determine if it needs to flip
 */
export const checkAndFlipPosition = (
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  position: PopoverPosition | 'auto',
  offset: number
): PopoverPosition => {
  if (position === 'auto') return 'top';

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Space available in each direction
  const spaceTop = triggerRect.top;
  const spaceBottom = viewportHeight - triggerRect.bottom;
  const spaceLeft = triggerRect.left;
  const spaceRight = viewportWidth - triggerRect.right;

  // Check if preferred position has enough space, flip if not
  switch (position) {
    case 'top':
      if (spaceTop < popoverRect.height + offset && spaceBottom >= popoverRect.height + offset) {
        return 'bottom';
      }
      return 'top';
    case 'bottom':
      if (spaceBottom < popoverRect.height + offset && spaceTop >= popoverRect.height + offset) {
        return 'top';
      }
      return 'bottom';
    case 'left':
      if (spaceLeft < popoverRect.width + offset && spaceRight >= popoverRect.width + offset) {
        return 'right';
      }
      return 'left';
    case 'right':
      if (spaceRight < popoverRect.width + offset && spaceLeft >= popoverRect.width + offset) {
        return 'left';
      }
      return 'right';
  }
};

/**
 * Calculate popover position based on trigger position and specified placement
 */
export const calculatePopoverPosition = (
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  position: PopoverPosition,
  offset: number
): { top: number; left: number } => {
  let top = 0;
  let left = 0;

  // Calculate position based on the determined position
  switch (position) {
    case 'top':
      top = triggerRect.top - popoverRect.height - offset;
      left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
      break;
    case 'bottom':
      top = triggerRect.bottom + offset;
      left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
      break;
    case 'left':
      top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
      left = triggerRect.left - popoverRect.width - offset;
      break;
    case 'right':
      top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
      left = triggerRect.right + offset;
      break;
  }

  // Constrain to viewport boundaries
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (left < 0) {
    left = 5;
  } else if (left + popoverRect.width > viewportWidth) {
    left = viewportWidth - popoverRect.width - 5;
  }

  if (top < 0) {
    top = 5;
  } else if (top + popoverRect.height > viewportHeight) {
    top = viewportHeight - popoverRect.height - 5;
  }

  // Add scroll position to convert viewport coordinates to absolute position
  return {
    top: top + window.scrollY,
    left: left + window.scrollX,
  };
};

/**
 * Position the arrow based on current position
 */
export const positionArrow = (arrow: HTMLElement, position: PopoverPosition): void => {
  if (!arrow) return;

  // Reset arrow position
  arrow.style.top = '';
  arrow.style.right = '';
  arrow.style.bottom = '';
  arrow.style.left = '';
  arrow.style.transform = '';

  // Position arrow based on current position
  switch (position) {
    case 'top':
      arrow.style.bottom = '-6px';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%) rotate(45deg)';
      break;
    case 'bottom':
      arrow.style.top = '-6px';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%) rotate(45deg)';
      break;
    case 'left':
      arrow.style.top = '50%';
      arrow.style.right = '-6px';
      arrow.style.transform = 'translateY(-50%) rotate(45deg)';
      break;
    case 'right':
      arrow.style.top = '50%';
      arrow.style.left = '-6px';
      arrow.style.transform = 'translateY(-50%) rotate(45deg)';
      break;
  }
};

/**
 * Set the position class on the element
 */
export const setPositionClass = (
  element: HTMLElement,
  position: PopoverPosition,
  isAuto: boolean
): void => {
  // Remove all position classes first
  Object.values(POPOVER.CLASSES).forEach(className => {
    if (className.startsWith('c-popover--') && className !== POPOVER.CLASSES.IS_OPEN) {
      element.classList.remove(className);
    }
  });

  // Add the current position class
  const positionClass = POPOVER.CLASSES[position.toUpperCase() as keyof typeof POPOVER.CLASSES];
  if (positionClass) {
    element.classList.add(positionClass);
  }

  // Add auto class if auto positioning is enabled
  if (isAuto) {
    element.classList.add(POPOVER.CLASSES.AUTO);
  }
};
