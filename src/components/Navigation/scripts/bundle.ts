import Navbar from './index';
import { 
  initFromDataAttributes, 
  getInstance, 
  create,
  disposeAll,
  expandAll,
  collapseAll,
  toggleAll,
  getAllInstances,
  setupGlobalEventDelegation
} from './NavbarInteractions';

// Global registration for browser environments
if (typeof window !== 'undefined') {
  // Initialize the Atomix global object if it doesn't exist
  (window as any).Atomix = (window as any).Atomix || {};
  
  // Add Navbar to the global Atomix object
  (window as any).Atomix.Navbar = {
    create: create,
    init: initFromDataAttributes,
    get: getInstance,
    disposeAll: disposeAll,
    expandAll: expandAll,
    collapseAll: collapseAll,
    toggleAll: toggleAll,
    getAllInstances: getAllInstances,
    setupGlobalEventDelegation: setupGlobalEventDelegation,
    // Direct class access
    Navbar: Navbar
  };
  
  // Auto-initialize navbars when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initFromDataAttributes();
      setupGlobalEventDelegation();
    });
  } else {
    initFromDataAttributes();
    setupGlobalEventDelegation();
  }
}

// Export everything for module bundling
export { 
  Navbar as default,
  initFromDataAttributes,
  getInstance,
  create,
  disposeAll,
  expandAll,
  collapseAll,
  toggleAll,
  getAllInstances,
  setupGlobalEventDelegation
};