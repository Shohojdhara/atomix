import Accordion, { initializeAccordions, openAllAccordions, closeAllAccordions } from './index';

if (typeof window !== 'undefined') {
  (window as any).Atomix = (window as any).Atomix || {};

  (window as any).Atomix.Accordion = {
    create: Accordion,
    init: initializeAccordions,
    openAll: openAllAccordions,
    closeAll: closeAllAccordions,
  };

  // Auto-initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeAccordions();
    });
  } else {
    initializeAccordions();
  }
}

// Export for module bundling
export { Accordion as default, initializeAccordions, openAllAccordions, closeAllAccordions }; 