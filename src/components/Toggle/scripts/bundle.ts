import Toggle from './index';
import { applyHoverEffect, applyFocusEffect, initializeToggle, initializeAllToggles } from './toggleInteractions';

// Expose to global scope
declare global {
  interface Window {
    Atomix: Record<string, any>;
  }
}

// Initialize global namespace if not exists
window.Atomix = window.Atomix || {};

// Add Toggle to global namespace
window.Atomix.Toggle = Toggle;
window.Atomix.applyToggleHoverEffect = applyHoverEffect;
window.Atomix.applyToggleFocusEffect = applyFocusEffect;
window.Atomix.initializeToggle = initializeToggle;
window.Atomix.initializeAllToggles = initializeAllToggles;

export default Toggle; 