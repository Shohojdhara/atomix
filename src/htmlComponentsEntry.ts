// Entry point for HTML components
import { initializeButton } from './components/Button/scripts';
import { initializeAccordionsWithCustomBehavior } from './components/Accordion/scripts';
import { initializeTooltipsWithCustomBehavior } from './components/Tooltip/scripts/tooltipInteractions';
import { initializeToggles } from './components/Toggle/scripts';
import { initializeTabs } from './components/Tab/scripts';
import { initializeSteps } from './components/Steps/scripts';
import { initializeTestimonials } from './components/Testimonial/scripts';
import { initializeRivers } from './components/River/scripts';
import { initializeUploads } from './components/Upload/scripts';
import { initializeEdgePanelsWithCustomBehavior } from './components/EdgePanel/scripts/edgePanelInteractions';
import { initializeModals } from './components/Modal/scripts/index';
import { setupModalEventDelegation } from './components/Modal/scripts/modalInteractions';
import { initializeHeroesWithCustomBehavior } from './components/Hero/scripts/heroInteractions';
import { Avatar } from './components/Avatar/scripts';
import Breadcrumb from './components/Breadcrumb/scripts';
import Card from './components/Card/scripts';
import Countdown from './components/Countdown/scripts';
import { Todo } from './components/Todo/scripts';
import Pagination from './components/Pagination/scripts';
import { DataTable } from './components/DataTable/scripts';
import { initFromDataAttributes as initializeDatePickers } from './components/DatePicker/scripts/componentInteractions';

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
  // Initialize tooltips with custom behavior
  initializeTooltipsWithCustomBehavior();
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
 * Initialize all Testimonial components in the document
 */
function initializeTestimonialComponents(): void {
  // Initialize testimonials with default settings
  initializeTestimonials();
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
 * Initialize all EdgePanel components in the document
 */
function initializeEdgePanels(): void {
  // Initialize edge panels with custom animations and behavior
  initializeEdgePanelsWithCustomBehavior();
}

/**
 * Initialize all Modal components in the document
 */
function initializeModalComponents(): void {
  // Initialize modals with default behavior
  initializeModals();
  setupModalEventDelegation();
}

/**
 * Initialize all Hero components in the document
 */
function initializeHeroComponents(): void {
  // Initialize heroes with custom behavior
  initializeHeroesWithCustomBehavior();
}

/**
 * Initialize all Avatar components in the document
 */
function initializeAvatarComponents(): void {
  // Initialize avatars with default settings
  Avatar.initializeAll();
}

/**
 * Initialize all Breadcrumb components in the document
 */
function initializeBreadcrumbComponents(): void {
  // Initialize breadcrumbs with default settings
  Breadcrumb.initializeAll();
}

/**
 * Initialize all Card components in the document
 */
function initializeCardComponents(): void {
  // Initialize cards with default settings
  Card.initializeAll();
}

/**
 * Initialize all Countdown components in the document
 */
function initializeCountdownComponents(): void {
  // Initialize countdowns with default settings
  Countdown.initializeAll();
}

/**
 * Initialize all Todo components in the document
 */
function initializeTodoComponents(): void {
  // Initialize todos with default settings
  Todo.initializeAll();
}

/**
 * Initialize all Pagination components in the document
 */
function initializePaginationComponents(): void {
  // Initialize pagination with default settings
  Pagination.initializeAll();
}

/**
 * Initialize all DataTable components in the document
 */
function initializeDataTableComponents(): void {
  // Initialize data tables with default settings
  DataTable.initializeAll();
}

/**
 * Initialize all DatePicker components in the document
 */
function initializeDatePickerComponents(): void {
  // Initialize date pickers with default settings
  initializeDatePickers();
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
  initializeTestimonialComponents();
  initializeRiverComponents();
  initializeUploadComponents();
  initializeEdgePanels();
  initializeModalComponents();
  initializeHeroComponents();
  initializeAvatarComponents();
  initializeBreadcrumbComponents();
  initializeCardComponents();
  initializeCountdownComponents();
  initializeTodoComponents();
  initializePaginationComponents();
  initializeDataTableComponents();
  initializeDatePickerComponents();
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

// Export the Atomix namespace for vanilla JS usage
const Atomix = {
  // Component initializers
  Button: {
    init: initializeButton,
    initializeAll: initializeButtons
  },
  Accordion: {
    init: initializeAccordionsWithCustomBehavior,
    initializeAll: initializeAccordions
  },
  Tooltip: {
    init: initializeTooltipsWithCustomBehavior,
    initializeAll: initializeTooltips
  },
  Toggle: {
    init: initializeToggles,
    initializeAll: initializeToggleComponents
  },
  Tab: {
    init: initializeTabs,
    initializeAll: initializeTabComponents
  },
  Steps: {
    init: initializeSteps,
    initializeAll: initializeStepComponents
  },
  Testimonial: {
    init: initializeTestimonials,
    initializeAll: initializeTestimonialComponents
  },
  River: {
    init: initializeRivers,
    initializeAll: initializeRiverComponents
  },
  Upload: {
    init: initializeUploads,
    initializeAll: initializeUploadComponents
  },
  EdgePanel: {
    init: initializeEdgePanelsWithCustomBehavior,
    initializeAll: initializeEdgePanels
  },
  Modal: {
    init: initializeModals,
    initializeAll: initializeModalComponents
  },
  Hero: {
    init: initializeHeroesWithCustomBehavior,
    initializeAll: initializeHeroComponents
  },
  Avatar: {
    init: Avatar.initializeAll,
    initializeAll: Avatar.initializeAll
  },
  Breadcrumb: {
    init: Breadcrumb.initializeAll,
    initializeAll: Breadcrumb.initializeAll
  },
  Card: {
    init: Card.initializeAll,
    initializeAll: Card.initializeAll
  },
  Countdown: {
    init: Countdown.initializeAll,
    initializeAll: Countdown.initializeAll
  },
  Todo: {
    init: Todo.initializeAll,
    initializeAll: Todo.initializeAll
  },
  Pagination: {
    init: Pagination.initializeAll,
    initializeAll: Pagination.initializeAll
  },
  DataTable: {
    init: DataTable.initializeAll,
    initializeAll: DataTable.initializeAll
  },
  DatePicker: {
    init: initializeDatePickers,
    initializeAll: initializeDatePickerComponents
  },
  // Global initialization
  initializeAll: initializeComponents
};

export default Atomix;