import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from './Dropdown';
import type { 
  DropdownProps, 
  DropdownItemProps, 
  DropdownDividerProps,
  DropdownHeaderProps
} from '../../lib/types/components';

// Export React components
export { Dropdown, DropdownItem, DropdownDivider, DropdownHeader };

// Export types for React components
export type { 
  DropdownProps, 
  DropdownItemProps, 
  DropdownDividerProps,
  DropdownHeaderProps
}; 

// Re-export Vanilla JS implementation
export * from './scripts'; 