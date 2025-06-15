import SideMenu from './SideMenu';
import { 
  initFromDataAttributes, 
  getInstance, 
  create,
  disposeAll,
  openAll,
  closeAll,
  toggleAll,
  getAllInstances,
  setActiveByHref,
  setActiveByText,
  setupGlobalEventDelegation,
  autoSetActiveFromURL
} from './SideMenuInteractions';

// Global registration for browser environments
if (typeof window !== 'undefined') {
  // Initialize the Atomix global object if it doesn't exist
  (window as any).Atomix = (window as any).Atomix || {};
  
  // Add SideMenu to the global Atomix object
  (window as any).Atomix.SideMenu = {
    create: create,
    init: initFromDataAttributes,
    get: getInstance,
    disposeAll: disposeAll,
    openAll: openAll,
    closeAll: closeAll,
    toggleAll: toggleAll,
    getAllInstances: getAllInstances,
    setActiveByHref: setActiveByHref,
    setActiveByText: setActiveByText,
    setupGlobalEventDelegation: setupGlobalEventDelegation,
    autoSetActiveFromURL: autoSetActiveFromURL,
    // Direct class access
    SideMenu: SideMenu
  };
  
  // Auto-initialize side menus when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initFromDataAttributes();
      setupGlobalEventDelegation();
      autoSetActiveFromURL();
    });
  } else {
    initFromDataAttributes();
    setupGlobalEventDelegation();
    autoSetActiveFromURL();
  }
}

// Export everything for module bundling
export { 
  SideMenu as default,
  initFromDataAttributes,
  getInstance,
  create,
  disposeAll,
  openAll,
  closeAll,
  toggleAll,
  getAllInstances,
  setActiveByHref,
  setActiveByText,
  setupGlobalEventDelegation,
  autoSetActiveFromURL
};