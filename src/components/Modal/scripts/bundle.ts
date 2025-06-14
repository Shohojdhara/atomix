import Modal, { initializeModals, getModalInstance } from './index';
import { setupModalEventDelegation } from './modalInteractions';

/**
 * Attach Modal to global window object for standalone usage
 */
if (typeof window !== 'undefined') {
  (window as any).Atomix = (window as any).Atomix || {};
  (window as any).Atomix.Modal = Modal;
  (window as any).Atomix.initializeModals = initializeModals;
  (window as any).Atomix.getModalInstance = getModalInstance;
  (window as any).Atomix.setupModalEventDelegation = setupModalEventDelegation;

  // Auto-initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    if ((window as any).Atomix.autoInitModals !== false) {
      initializeModals();
      setupModalEventDelegation();
    }
  });
}

export { Modal, initializeModals, getModalInstance, setupModalEventDelegation };
