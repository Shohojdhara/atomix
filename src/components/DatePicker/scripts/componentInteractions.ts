import DatePicker from './index';

/**
 * Event handlers and utility functions for DatePicker component
 */

/**
 * Handle keyboard navigation for date grid
 * @param event Keyboard event
 * @param datepicker DatePicker instance
 */
export function handleDateGridKeyboardNavigation(
  event: KeyboardEvent,
  container: HTMLElement
): void {
  if (!container) return;

  const focusableItems = container.querySelectorAll<HTMLElement>(
    '[role="gridcell"]:not([disabled])'
  );
  if (!focusableItems.length) return;

  const currentIndex = Array.from(focusableItems).findIndex(
    item => item === document.activeElement
  );
  let nextIndex = -1;

  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault();
      nextIndex = currentIndex < focusableItems.length - 1 ? currentIndex + 1 : 0;
      break;

    case 'ArrowLeft':
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableItems.length - 1;
      break;

    case 'ArrowDown': {
      event.preventDefault();
      // Move down a row (7 cells for days, 3 for months, 4 for years)
      const rowSize = container.classList.contains('c-datepicker__days')
        ? 7
        : container.classList.contains('c-datepicker__months')
          ? 3
          : 4;
      nextIndex = currentIndex + rowSize;
      if (nextIndex >= focusableItems.length) {
        nextIndex = nextIndex % focusableItems.length;
      }
      break;
    }

    case 'ArrowUp': {
      event.preventDefault();
      // Move up a row (7 cells for days, 3 for months, 4 for years)
      const rowSizeUp = container.classList.contains('c-datepicker__days')
        ? 7
        : container.classList.contains('c-datepicker__months')
          ? 3
          : 4;
      nextIndex = currentIndex - rowSizeUp;
      if (nextIndex < 0) {
        nextIndex = focusableItems.length + nextIndex;
      }
      break;
    }

    case 'Home':
      event.preventDefault();
      nextIndex = 0;
      break;

    case 'End':
      event.preventDefault();
      nextIndex = focusableItems.length - 1;
      break;

    case 'PageUp': {
      event.preventDefault();
      // Trigger month navigation in day view
      const prevMonthButton = container
        .closest('.c-datepicker__calendar')
        ?.querySelector<HTMLElement>('.c-datepicker__nav-button--prev-month');
      if (prevMonthButton) {
        prevMonthButton.click();
      }
      break;
    }

    case 'PageDown': {
      event.preventDefault();
      // Trigger month navigation in day view
      const nextMonthButton = container
        .closest('.c-datepicker__calendar')
        ?.querySelector<HTMLElement>('.c-datepicker__nav-button--next-month');
      if (nextMonthButton) {
        nextMonthButton.click();
      }
      break;
    }
  }

  if (nextIndex >= 0) {
    focusableItems[nextIndex].focus();
  }
}

/**
 * Enhance a datepicker with keyboard navigation
 * @param datepicker DatePicker instance
 */
export function enhanceWithKeyboardNavigation(datepicker: DatePicker): void {
  const calendar = datepicker['calendar'] as HTMLElement | null;
  if (!calendar) return;

  calendar.addEventListener('keydown', (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;

    // Handle keyboard navigation in grid
    if (target.closest('.c-datepicker__days')) {
      handleDateGridKeyboardNavigation(
        e,
        calendar.querySelector('.c-datepicker__days') as HTMLElement
      );
    } else if (target.closest('.c-datepicker__months')) {
      handleDateGridKeyboardNavigation(
        e,
        calendar.querySelector('.c-datepicker__months') as HTMLElement
      );
    } else if (target.closest('.c-datepicker__years')) {
      handleDateGridKeyboardNavigation(
        e,
        calendar.querySelector('.c-datepicker__years') as HTMLElement
      );
    }

    // Handle Escape to close datepicker
    if (e.key === 'Escape' && !datepicker['options'].inline) {
      datepicker.close();
    }
  });
}

/**
 * Initialize datepickers with data attributes
 */
export function initFromDataAttributes(): DatePicker[] {
  const instances: DatePicker[] = [];

  document.querySelectorAll('[data-datepicker]').forEach(element => {
    const el = element as HTMLElement;

    // Parse options from data attributes
    const options: Record<string, any> = {};

    // Format
    if (el.dataset.format) {
      options.format = el.dataset.format;
    }

    // Min date
    if (el.dataset.minDate) {
      options.minDate = new Date(el.dataset.minDate);
    }

    // Max date
    if (el.dataset.maxDate) {
      options.maxDate = new Date(el.dataset.maxDate);
    }

    // Clearable
    if (el.dataset.clearable !== undefined) {
      options.clearable = el.dataset.clearable !== 'false';
    }

    // Show today button
    if (el.dataset.showTodayButton !== undefined) {
      options.showTodayButton = el.dataset.showTodayButton !== 'false';
    }

    // Show week numbers
    if (el.dataset.showWeekNumbers !== undefined) {
      options.showWeekNumbers = el.dataset.showWeekNumbers === 'true';
    }

    // Inline
    if (el.dataset.inline !== undefined) {
      options.inline = el.dataset.inline === 'true';
    }

    // Placement
    if (el.dataset.placement) {
      options.placement = el.dataset.placement;
    }

    const instance = new DatePicker(el, options);
    instances.push(instance);

    // Enhance with keyboard navigation
    enhanceWithKeyboardNavigation(instance);
  });

  return instances;
}

/**
 * Get a DatePicker instance from an element
 * @param element Element or selector
 */
export function getInstance(element: string | HTMLElement): DatePicker | null {
  const el = typeof element === 'string' ? document.querySelector(element) : element;

  if (!el) return null;

  // Use a stored reference if exists
  return (el as any)._datepicker || null;
}

/**
 * Dispose all DatePicker instances
 */
export function disposeAll(): void {
  document.querySelectorAll('[data-datepicker]').forEach(element => {
    const instance = getInstance(element as HTMLElement);
    if (instance) {
      instance.destroy();
    }
  });
}
