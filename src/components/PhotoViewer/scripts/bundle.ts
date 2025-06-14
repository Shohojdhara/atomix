import PhotoViewer from './index';
import {
  initFromDataAttributes,
  getInstance,
  createInstance,
  disposeInstance,
  disposeAll,
  openPhotoViewer,
  setupGallery,
  isSupported,
  getAllInstances,
  updateInstance,
} from './PhotoViewerInteractions';

if (typeof window !== 'undefined') {
  // Initialize the Atomix global object if it doesn't exist
  window.Atomix = window.Atomix || {};

  // Add PhotoViewer to the global Atomix object with comprehensive API
  window.Atomix.PhotoViewer = {
    // Core class
    create: PhotoViewer,

    // Initialization and lifecycle
    init: initFromDataAttributes,
    get: getInstance,
    createInstance: createInstance,
    disposeInstance: disposeInstance,
    disposeAll: disposeAll,

    // Utility methods
    open: openPhotoViewer,
    setupGallery: setupGallery,
    isSupported: isSupported,
    getAllInstances: getAllInstances,
    updateInstance: updateInstance,

    // Version info
    version: '1.0.0',
  };

  // Auto-initialize components when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (isSupported()) {
        initFromDataAttributes();
      }
    });
  } else {
    if (isSupported()) {
      initFromDataAttributes();
    }
  }

  // Handle page visibility changes to pause/resume if needed
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pause any active animations or processes if needed
    } else {
      // Resume if needed
    }
  });
}

// Export everything for module bundling
export {
  PhotoViewer as default,
  initFromDataAttributes,
  getInstance,
  createInstance,
  disposeInstance,
  disposeAll,
  openPhotoViewer,
  setupGallery,
  isSupported,
  getAllInstances,
  updateInstance,
};

// Note: Types would be exported from the main TypeScript definitions
// PhotoViewerOptions and ImageType interfaces are defined in the main class file
