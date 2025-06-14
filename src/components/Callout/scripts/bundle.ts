/**
 * Callout component bundle for vanilla JS usage
 */
import { Callout, CalloutInteractions } from './index';

// Export to global namespace when included directly via script tag
if (typeof window !== 'undefined') {
  // Create Atomix namespace if it doesn't exist
  window.Atomix = window.Atomix || {};

  // Add Callout to Atomix namespace
  // @ts-ignore - Ignore type mismatch between React component and vanilla JS class
  window.Atomix.Callout = Callout;
  window.Atomix.CalloutInteractions = CalloutInteractions;
}

// Export for module usage
export { Callout, CalloutInteractions };
