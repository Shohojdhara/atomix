/**
 * Modal interactions and utilities
 */
import { MODAL } from '../../../lib/constants/components';
import { getModalInstance } from './index';

/**
 * Handle click events for modal open buttons
 * @param event - Click event
 * @param modalSelector - Modal selector to open
 */
export function handleModalOpenClick(event: MouseEvent, modalSelector: string): void {
  event.preventDefault();

  const modalElement = document.querySelector(modalSelector) as HTMLElement;
  if (!modalElement) return;

  // Get modal instance or apply basic open logic
  const instance = getModalInstance(modalElement);
  if (instance) {
    instance.open();
  } else {
    modalElement.style.display = 'block';
    requestAnimationFrame(() => {
      modalElement.classList.add(MODAL.CLASSES.IS_OPEN);
    });
  }
}

/**
 * Handle click events for modal close buttons
 * @param event - Click event
 * @param modal - Modal element to close
 */
export function handleModalCloseClick(event: MouseEvent, modal: HTMLElement): void {
  event.preventDefault();

  const instance = getModalInstance(modal);
  if (instance) {
    instance.close();
  } else {
    modal.classList.remove(MODAL.CLASSES.IS_OPEN);

    // Listen for transition end to hide the modal
    const backdrop = modal.querySelector(MODAL.SELECTORS.BACKDROP);
    if (backdrop) {
      const transitionEndHandler = () => {
        modal.style.display = 'none';
        backdrop.removeEventListener('transitionend', transitionEndHandler);
      };

      backdrop.addEventListener('transitionend', transitionEndHandler);
    } else {
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300); // Fallback timing
    }
  }
}

/**
 * Handle keydown events for Escape key
 * @param event - Keyboard event
 */
export function handleModalKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    const openModals = document.querySelectorAll(
      `${MODAL.SELECTORS.MODAL}.${MODAL.CLASSES.IS_OPEN}`
    );

    openModals.forEach(modal => {
      const instance = getModalInstance(modal as HTMLElement);
      if (instance) {
        instance.close();
      } else {
        handleModalCloseClick(new MouseEvent('click'), modal as HTMLElement);
      }
    });
  }
}

/**
 * Handle clicks on modal backdrop
 * @param event - Click event
 * @param modal - Modal element
 */
export function handleBackdropClick(event: MouseEvent, modal: HTMLElement): void {
  const backdrop = modal.querySelector(MODAL.SELECTORS.BACKDROP);

  if (backdrop && event.target === backdrop) {
    const instance = getModalInstance(modal);
    if (instance) {
      instance.close();
    } else {
      handleModalCloseClick(event, modal);
    }
  }
}

/**
 * Delegate event handling for modals using data attributes
 * This is useful for dynamically added modals
 */
export function setupModalEventDelegation(): void {
  // Document click handler for delegation
  document.addEventListener('click', event => {
    const target = event.target as HTMLElement;

    // Handle open button clicks
    const openButton = target.closest('[data-modal-open]');
    if (openButton) {
      const modalId = openButton.getAttribute('data-modal-open');
      if (modalId) {
        handleModalOpenClick(event, modalId.startsWith('#') ? modalId : `#${modalId}`);
      }
      return;
    }

    // Handle close button clicks
    const closeButton = target.closest('[data-modal-close]');
    if (closeButton) {
      const modal = closeButton.closest(MODAL.SELECTORS.MODAL);
      if (modal) {
        handleModalCloseClick(event, modal as HTMLElement);
      }
      return;
    }

    // Handle backdrop clicks
    const backdrop = target.closest(MODAL.SELECTORS.BACKDROP);
    if (backdrop) {
      const modal = backdrop.closest(MODAL.SELECTORS.MODAL);
      if (modal) {
        handleBackdropClick(event, modal as HTMLElement);
      }
    }
  });

  // Global escape key handler
  document.addEventListener('keydown', handleModalKeydown);
}
