// Import component functionality
import { initializeButton } from './components/Button/scripts';
import { initializeAccordionsWithCustomBehavior } from './components/Accordion/scripts';

/**
 * Initialize all Button components in the document
 */
function initializeButtons(): void {
  // Select all button elements with the c-btn class
  const buttons = document.querySelectorAll<HTMLButtonElement>('.c-btn');
  
  // Initialize each button with default functionality
  buttons.forEach(button => {
    initializeButton(button);
  });
}

/**
 * Initialize all Accordion components in the document
 */
function initializeAccordions(): void {
  // Initialize accordions with custom animations and behavior
  initializeAccordionsWithCustomBehavior();
}

/**
 * Initialize all components
 */
function initializeComponents(): void {
  initializeButtons();
  initializeAccordions();
  // Add other component initializations as needed
}

/**
 * DOM ready function
 * @param callback - Function to call when DOM is ready
 */
function onDomReady(callback: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

// Initialize all components when the DOM is ready
onDomReady(initializeComponents);
