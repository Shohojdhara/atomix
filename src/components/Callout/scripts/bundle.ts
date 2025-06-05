/**
 * Callout component bundle for vanilla JS usage
 */
import { Callout, CalloutInteractions } from './index';

// Export to global namespace when included directly via script tag
if (typeof window !== 'undefined') {
  // Create Atomix namespace if it doesn't exist
  window.Atomix = window.Atomix || {};
  
  // Add Callout to Atomix namespace
  window.Atomix.Callout = Callout;
  window.Atomix.CalloutInteractions = CalloutInteractions;
}

// Export for module usage
export { Callout, CalloutInteractions };

// Add type definitions for global namespace
declare global {
  interface Window {
    Atomix: {
      Callout: typeof Callout;
      CalloutInteractions: typeof CalloutInteractions;
      [key: string]: any;
    };
  }
}