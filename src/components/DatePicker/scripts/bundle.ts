import DatePicker from './index';
import {
  initFromDataAttributes,
  getInstance,
  disposeAll,
  enhanceWithKeyboardNavigation,
} from './componentInteractions';

if (typeof window !== 'undefined') {
  // Initialize the Atomix global object if it doesn't exist
  (window as any).Atomix = (window as any).Atomix || {};

  // Add DatePicker to the global Atomix object
  (window as any).Atomix.DatePicker = {
    create: DatePicker,
    init: initFromDataAttributes,
    get: getInstance,
    disposeAll: disposeAll,
    enhanceKeyboardNavigation: enhanceWithKeyboardNavigation,
  };

  // Auto-initialize datepickers when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initFromDataAttributes();
    });
  } else {
    initFromDataAttributes();
  }
}

// Export everything for module bundling
export {
  DatePicker as default,
  initFromDataAttributes,
  getInstance,
  disposeAll,
  enhanceWithKeyboardNavigation,
};
