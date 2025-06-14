import { Dropdown, createDropdown, initializeDropdowns } from './index';
import type { DropdownOptions, DropdownPosition, DropdownTrigger } from './componentInteractions';

// Setup global namespace for Atomix components
if (typeof window !== 'undefined') {
  // Initialize Atomix namespace if it doesn't exist
  window.Atomix = window.Atomix || {};

  // Add Dropdown component to global Atomix namespace
  window.Atomix.Dropdown = {
    create: createDropdown,
    initialize: initializeDropdowns,
    Dropdown,
  };
}

export {
  Dropdown,
  createDropdown,
  initializeDropdowns,
  DropdownOptions,
  DropdownPosition,
  DropdownTrigger,
};
