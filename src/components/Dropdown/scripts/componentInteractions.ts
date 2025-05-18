import { DROPDOWN } from '../../../lib/constants/components';

/**
 * Dropdown position types
 */
export type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

/**
 * Dropdown trigger types
 */
export type DropdownTrigger = 'click' | 'hover';

/**
 * Dropdown options interface
 */
export interface DropdownOptions {
  placement?: DropdownPosition;
  trigger?: DropdownTrigger;
  offset?: number;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  minWidth?: string | number;
  maxHeight?: string;
}

/**
 * Timer reference interface for hover delay
 */
export interface TimerRef {
  current: number | null;
} 