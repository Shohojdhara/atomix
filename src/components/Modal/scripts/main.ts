/**
 * Main export file for Modal component
 * Used for importing in the main application entry point
 */
import { initializeModals } from './index';
import { setupModalEventDelegation } from './modalInteractions';

/**
 * Initialize all modals with default behavior
 */
export function initializeModalsWithDefaults(): void {
  // Initialize all modals on the page
  initializeModals();
  
  // Setup event delegation for dynamically added modals
  setupModalEventDelegation();
}

/**
 * Initialize modals with custom options
 * @param selector - CSS selector for modals
 * @param options - Custom options
 */
export function initializeModalsWithOptions(selector?: string, options?: any): void {
  initializeModals(selector, options);
}

export { 
  initializeModals,
  setupModalEventDelegation 
}; 