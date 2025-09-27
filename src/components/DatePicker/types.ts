import React from 'react';
import { AtomixGlassProps } from '../../lib/types/components';

export type DatePickerViewMode = 'days' | 'months' | 'years';

export type DatePickerPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

export type DatePickerSize = 'sm' | 'md' | 'lg';

export type DatePickerSelectionMode = 'single' | 'range';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DatePickerProps {
  /**
   * The currently selected date value
   */
  value?: Date | null;

  /**
   * Callback function when date is changed
   */
  onChange?: (date: Date | null) => void;

  /**
   * Selection mode - single date or date range
   * @default "single"
   */
  selectionMode?: DatePickerSelectionMode;

  /**
   * The start date of the range (only used when selectionMode is "range")
   */
  startDate?: Date | null;

  /**
   * The end date of the range (only used when selectionMode is "range")
   */
  endDate?: Date | null;

  /**
   * Callback function when date range is changed
   */
  onRangeChange?: (range: DateRange) => void;

  /**
   * Format for the date display (follows Intl.DateTimeFormat patterns)
   * @default "MM/dd/yyyy"
   */
  format?: string;

  /**
   * Minimum selectable date
   */
  minDate?: Date;

  /**
   * Maximum selectable date
   */
  maxDate?: Date;

  /**
   * Placeholder text for the input
   * @default "Select date..."
   */
  placeholder?: string;

  /**
   * Whether the datepicker is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the datepicker is read-only
   * @default false
   */
  readOnly?: boolean;

  /**
   * Whether to show a clear button
   * @default true
   */
  clearable?: boolean;

  /**
   * Whether to show the "Today" button
   * @default true
   */
  showTodayButton?: boolean;

  /**
   * Whether to show week numbers
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Whether to display the datepicker inline (always visible)
   * @default false
   */
  inline?: boolean;

  /**
   * ID for the input element
   */
  id?: string;

  /**
   * Name for the input element
   */
  name?: string;

  /**
   * Additional class name for the datepicker component
   */
  className?: string;

  /**
   * Placement of the dropdown calendar
   * @default "bottom-start"
   */
  placement?: DatePickerPlacement;

  /**
   * Additional class name for the input element
   */
  inputClassName?: string;

  /**
   * Size of the input field
   * @default "md"
   */
  size?: DatePickerSize;

  /**
   * Applies a glass morphism effect to the calendar dropdown.
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect.
   * @default false
   */
  glass?: boolean | AtomixGlassProps;
}

export interface DatePickerRef {
  /**
   * Open the datepicker
   */
  open: () => void;

  /**
   * Close the datepicker
   */
  close: () => void;

  /**
   * Clear the selected date
   */
  clear: () => void;

  /**
   * Set focus on the input element
   */
  focus: () => void;
}
