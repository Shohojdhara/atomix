// Import component functionality
import { initializeButton } from './components/Button/scripts';
import { initializeAccordionsWithCustomBehavior } from './components/Accordion/scripts';
import { initializeTooltips as initTooltips } from './components/Tooltip/scripts';
import { initializeToggles } from './components/Toggle/scripts';
import { initializeTabs } from './components/Tab/scripts';
import { initializeSteps } from './components/Steps/scripts';
import { initializeSpinners } from './components/Spinner/scripts';
import { initializeTestimonials } from './components/Testimonial/scripts';
import { initializeSectionIntros } from './components/SectionIntro/scripts';
import { initializeRivers } from './components/River/scripts';
import { initializeUploads } from './components/Upload/scripts';

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
 * Initialize all Tooltip components in the document
 */
function initializeTooltips(): void {
  // Initialize tooltips with default settings
  initTooltips();
}

/**
 * Initialize all Toggle components in the document
 */
function initializeToggleComponents(): void {
  // Initialize toggles with default settings
  initializeToggles();
}

/**
 * Initialize all Tab components in the document
 */
function initializeTabComponents(): void {
  // Initialize tabs with default settings
  initializeTabs();
}

/**
 * Initialize all Steps components in the document
 */
function initializeStepComponents(): void {
  // Initialize steps with default settings
  initializeSteps();
}

/**
 * Initialize all Spinner components in the document
 */
function initializeSpinnerComponents(): void {
  // Initialize spinners with default settings
  initializeSpinners();
}

/**
 * Initialize all Testimonial components in the document
 */
function initializeTestimonialComponents(): void {
  // Initialize testimonials with default settings
  initializeTestimonials();
}

/**
 * Initialize all SectionIntro components in the document
 */
function initializeSectionIntroComponents(): void {
  // Initialize section intros with default settings
  initializeSectionIntros();
}

/**
 * Initialize all River components in the document
 */
function initializeRiverComponents(): void {
  // Initialize rivers with default settings
  initializeRivers();
}

/**
 * Initialize all Upload components in the document
 */
function initializeUploadComponents(): void {
  // Initialize uploads with default settings
  initializeUploads();
}

/**
 * Initialize all components
 */
function initializeComponents(): void {
  initializeButtons();
  initializeAccordions();
  initializeTooltips();
  initializeToggleComponents();
  initializeTabComponents();
  initializeStepComponents();
  initializeSpinnerComponents();
  initializeTestimonialComponents();
  initializeSectionIntroComponents();
  initializeRiverComponents();
  initializeUploadComponents();
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
