import Rating from './index';
import { initFromDataAttributes, getInstance, disposeAll, enhanceWithKeyboardNavigation } from './ratingInteractions';

if (typeof window !== 'undefined') {
  // Initialize the Atomix global object if it doesn't exist
  (window as any).Atomix = (window as any).Atomix || {};
  
  // Add Rating to the global Atomix object
  (window as any).Atomix.Rating = {
    create: Rating,
    init: initFromDataAttributes,
    get: getInstance,
    disposeAll: disposeAll,
    enhanceKeyboardNavigation: enhanceWithKeyboardNavigation
  };
  
  // Auto-initialize ratings when DOM is ready
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
  Rating as default,
  initFromDataAttributes,
  getInstance,
  disposeAll,
  enhanceWithKeyboardNavigation
};
