import Dropdown, { initDropdowns } from './index';
import { DropdownPosition, DropdownTrigger, DropdownOptions } from './componentInteractions';

// Export for global use
if (typeof window !== 'undefined') {
  (window as any).Atomix = (window as any).Atomix || {};
  (window as any).Atomix.Dropdown = Dropdown;
  (window as any).Atomix.initDropdowns = initDropdowns;
}

export { Dropdown, initDropdowns };
export type { DropdownPosition, DropdownTrigger, DropdownOptions }; 