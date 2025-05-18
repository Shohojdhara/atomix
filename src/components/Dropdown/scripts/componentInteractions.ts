import { DROPDOWN } from '../../../lib/constants/components';

/**
 * Dropdown position types
 */
export type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

/**
 * Dropdown trigger types
 */
export type DropdownTrigger = 'click' | 'hover';

/**
 * Dropdown options interface
 */
export interface DropdownOptions {
  placement?: DropdownPosition;
  trigger?: DropdownTrigger;
  offset?: number;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  minWidth?: string;
  maxHeight?: string;
}

/**
 * Handle click on trigger element
 */
export const handleTriggerClick = (
  isOpen: boolean, 
  open: () => void, 
  close: () => void, 
  event: Event
): void => {
  event.preventDefault();
  event.stopPropagation();
  
  isOpen ? close() : open();
};

/**
 * Handle document click for closing dropdown when clicking outside
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
  
  if (
    element && 
    trigger && 
    !element.contains(target) && 
    !trigger.contains(target)
  ) {
    close();
  }
};

/**
 * Handle mouseenter on trigger
 */
export const handleTriggerMouseEnter = (
  open: () => void,
  timeoutRef: { current: number | null }
): void => {
  if (timeoutRef.current !== null) {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }
  
  open();
};

/**
 * Handle mouseleave on trigger
 */
export const handleTriggerMouseLeave = (
  element: HTMLElement,
  close: () => void,
  timeoutRef: { current: number | null }
): void => {
  // Add slight delay before closing to allow moving to the dropdown
  timeoutRef.current = window.setTimeout(() => {
    // Only close if the mouse isn't over the dropdown
    if (!element.matches(':hover')) {
      close();
    }
    timeoutRef.current = null;
  }, 150);
};

/**
 * Handle escape key press
 */
export const handleEscapeKey = (
  isOpen: boolean,
  close: () => void,
  event: KeyboardEvent
): void => {
  if (isOpen && event.key === 'Escape') {
    close();
  }
};

/**
 * Determine the best position for the dropdown
 */
export const determineBestPosition = (
  triggerRect: DOMRect
): DropdownPosition => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Vertical position (top or bottom)
  const hasSpaceBelow = triggerRect.bottom + 200 < viewportHeight;
  const hasSpaceAbove = triggerRect.top - 200 > 0;
  
  // Horizontal position (start or end)
  const hasSpaceRight = triggerRect.right + 200 < viewportWidth;
  const hasSpaceLeft = triggerRect.left - 200 > 0;
  
  // Determine best position
  if (hasSpaceBelow) {
    return hasSpaceRight ? 'bottom-start' : 'bottom-end';
  } else if (hasSpaceAbove) {
    return hasSpaceRight ? 'top-start' : 'top-end';
  } else if (hasSpaceRight) {
    return 'right-start';
  } else if (hasSpaceLeft) {
    return 'left-start';
  }
  
  // Default fallback
  return 'bottom-start';
};

/**
 * Check if the dropdown fits in the requested position and flip if needed
 */
export const checkAndFlipPosition = (
  triggerRect: DOMRect,
  dropdownRect: DOMRect,
  position: DropdownPosition,
  offset: number
): DropdownPosition => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  let newPosition = position;
  
  // Check vertical positions and flip if needed
  if (position.startsWith('bottom') && triggerRect.bottom + dropdownRect.height + offset > viewportHeight) {
    newPosition = position.replace('bottom', 'top') as DropdownPosition;
  } else if (position.startsWith('top') && triggerRect.top - dropdownRect.height - offset < 0) {
    newPosition = position.replace('top', 'bottom') as DropdownPosition;
  }
  
  // Check horizontal positions and flip if needed
  if (position.startsWith('left') && triggerRect.left - dropdownRect.width - offset < 0) {
    newPosition = position.replace('left', 'right') as DropdownPosition;
  } else if (position.startsWith('right') && triggerRect.right + dropdownRect.width + offset > viewportWidth) {
    newPosition = position.replace('right', 'left') as DropdownPosition;
  }
  
  // Check alignment for top/bottom positions
  if ((newPosition.startsWith('top') || newPosition.startsWith('bottom'))) {
    if (newPosition.endsWith('start') && triggerRect.left + dropdownRect.width > viewportWidth) {
      newPosition = newPosition.replace('start', 'end') as DropdownPosition;
    } else if (newPosition.endsWith('end') && triggerRect.right - dropdownRect.width < 0) {
      newPosition = newPosition.replace('end', 'start') as DropdownPosition;
    }
  }
  
  return newPosition;
};

/**
 * Calculate the position of the dropdown
 */
export const calculateDropdownPosition = (
  triggerRect: DOMRect,
  dropdownRect: DOMRect,
  position: DropdownPosition,
  offset: number
): { top: number; left: number } => {
  let top = 0;
  let left = 0;
  
  // Vertical positioning
  if (position.startsWith('bottom')) {
    top = triggerRect.bottom + offset;
  } else if (position.startsWith('top')) {
    top = triggerRect.top - dropdownRect.height - offset;
  } else if (position.startsWith('left') || position.startsWith('right')) {
    // Center vertically for side positions
    top = triggerRect.top + (triggerRect.height / 2) - (dropdownRect.height / 2);
  }
  
  // Horizontal positioning
  if (position.startsWith('left')) {
    left = triggerRect.left - dropdownRect.width - offset;
  } else if (position.startsWith('right')) {
    left = triggerRect.right + offset;
  } else if (position.endsWith('start')) {
    left = triggerRect.left;
  } else if (position.endsWith('end')) {
    left = triggerRect.right - dropdownRect.width;
  } else {
    // Center horizontally if no alignment specified
    left = triggerRect.left + (triggerRect.width / 2) - (dropdownRect.width / 2);
  }
  
  return { top, left };
};

/**
 * Set the position class on the dropdown element
 */
export const setPositionClass = (
  element: HTMLElement,
  position: DropdownPosition,
  isAuto: boolean
): void => {
  // Remove existing position classes
  element.classList.remove(
    'c-dropdown__menu-wrapper--bottom-start',
    'c-dropdown__menu-wrapper--bottom-end',
    'c-dropdown__menu-wrapper--top-start',
    'c-dropdown__menu-wrapper--top-end',
    'c-dropdown__menu-wrapper--left-start',
    'c-dropdown__menu-wrapper--left-end',
    'c-dropdown__menu-wrapper--right-start',
    'c-dropdown__menu-wrapper--right-end'
  );
  
  // Add the new position class
  element.classList.add(`c-dropdown__menu-wrapper--${position}`);
  
  // Add auto class if auto positioning is used
  if (isAuto) {
    element.classList.add('c-dropdown__menu-wrapper--auto');
  } else {
    element.classList.remove('c-dropdown__menu-wrapper--auto');
  }
};

/**
 * Handle keyboard navigation within the dropdown menu
 */
export const handleKeyboardNavigation = (
  event: KeyboardEvent,
  element: HTMLElement,
  close: () => void
): void => {
  const isOpen = element.classList.contains(DROPDOWN.CLASSES.IS_OPEN);
  if (!isOpen) return;
  
  const menuItems = Array.from(
    element.querySelectorAll(
      `${DROPDOWN.SELECTORS.MENU_ITEM}:not(.${DROPDOWN.CLASSES.IS_DISABLED})`
    ) as NodeListOf<HTMLElement>
  );
  
  if (menuItems.length === 0) return;
  
  const currentFocusedItem = document.activeElement as HTMLElement;
  const currentIndex = menuItems.indexOf(currentFocusedItem);
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (currentIndex < 0 || currentIndex === menuItems.length - 1) {
        menuItems[0].focus();
      } else {
        menuItems[currentIndex + 1].focus();
      }
      break;
    
    case 'ArrowUp':
      event.preventDefault();
      if (currentIndex <= 0) {
        menuItems[menuItems.length - 1].focus();
      } else {
        menuItems[currentIndex - 1].focus();
      }
      break;
    
    case 'Home':
      event.preventDefault();
      menuItems[0].focus();
      break;
    
    case 'End':
      event.preventDefault();
      menuItems[menuItems.length - 1].focus();
      break;
    
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (currentFocusedItem && menuItems.includes(currentFocusedItem)) {
        currentFocusedItem.click();
      }
      break;
    
    case 'Escape':
      event.preventDefault();
      close();
      break;
  }
}; 