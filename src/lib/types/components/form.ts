import type { SlotProps, CheckboxRootSlotProps, CheckboxInputSlotProps, CheckboxLabelSlotProps, RadioRootSlotProps, RadioInputSlotProps, RadioLabelSlotProps } from '../../patterns/slots';
import type { CheckboxParts, RadioParts } from '../partProps';
import type { CheckboxCSSVariable, RadioCSSVariable } from '../../constants/cssVariables';
import { Size, ThemeColor, BaseComponentProps } from './common';
import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';


/**
 * Form component properties
 */
export interface FormProps extends BaseComponentProps {
  /**
   * Form content
   */
  children: ReactNode;

  /**
   * Form submit handler
   */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;

  /**
   * Form reset handler
   */
  onReset?: (event: React.FormEvent<HTMLFormElement>) => void;

  /**
   * Form ID
   */
  id?: string;

  /**
   * Form method
   */
  method?: 'get' | 'post';

  /**
   * Form encoding type
   */
  encType?: string;

  /**
   * Whether to disable HTML5 validation
   */
  noValidate?: boolean;

  /**
   * Form autocomplete setting
   */
  autoComplete?: string;
}


/**
 * Form Group component properties
 */
export interface FormGroupProps extends BaseComponentProps {
  /**
   * Form control content
   */
  children: ReactNode;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: ReactNode;

  /**
   * ID of the form control this label is for
   */
  htmlFor?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Whether the field is invalid
   */
  invalid?: boolean;

  /**
   * Whether the field is valid
   */
  valid?: boolean;

  /**
   * Size variant
   */
  size?: Size;

  /**
   * Error message to display
   */
  errorMessage?: string;
}


/**
 * Input component properties
 */
export interface InputProps extends BaseComponentProps {
  /**
   * Input type
   * @default 'text'
   */
  type?: string;

  /**
   * Input value
   */
  value?: string | number;

  /**
   * Default value for uncontrolled input
   */
  defaultValue?: string | number;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether the input is required
   */
  required?: boolean;

  /**
   * Whether the input is read-only
   */
  readOnly?: boolean;

  /**
   * Input ID
   */
  id?: string;

  /**
   * Input name
   */
  name?: string;

  /**
   * Autocomplete attribute
   */
  autoComplete?: string;

  /**
   * Whether the input should receive focus on render
   */
  autoFocus?: boolean;

  /**
   * Size variant
   * @default 'md'
   */
  size?: Size;

  /**
   * Color variant
   */
  variant?: ThemeColor;

  /**
   * Whether the input is invalid
   */
  invalid?: boolean;

  /**
   * Whether the input is valid
   */
  valid?: boolean;

  /**
   * Maximum length
   */
  maxLength?: number;

  /**
   * Minimum length
   */
  minLength?: number;

  /**
   * Input pattern
   */
  pattern?: string;

  /**
   * Minimum value (for number inputs)
   */
  min?: number | string;

  /**
   * Maximum value (for number inputs)
   */
  max?: number | string;

  /**
   * Step value (for number inputs)
   */
  step?: number | string;

  /**
   * Accessible label (if no visible label)
   */
  'aria-label'?: string;

  /**
   * ID of element that describes this input
   */
  'aria-describedby'?: string;

  /**
   * Glass morphism effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;

  /**
   * Prefix icon (appears before the input)
   */
  prefixIcon?: React.ReactNode;

  /**
   * Suffix icon (appears after the input)
   */
  suffixIcon?: React.ReactNode;

  /**
   * Whether the input is clearable (shows clear button when value exists)
   */
  clearable?: boolean;

  /**
   * Handler for clear button click
   */
  onClear?: () => void;

  /**
   * Whether to show character counter
   */
  showCounter?: boolean;

  /**
   * Maximum character count for counter (uses maxLength if not provided)
   */
  maxCount?: number;

  /**
   * Whether password visibility toggle is enabled (for password inputs)
   */
  showPasswordToggle?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Whether the input should take full width
   */
  fullWidth?: boolean;
}


/**
 * Select option
 */
export interface SelectOption {
  /**
   * Option value
   */
  value: string;

  /**
   * Option display label
   */
  label: string;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}


/**
 * Select component properties
 */
export interface SelectProps extends BaseComponentProps {
  /**
   * Select options
   */
  options: SelectOption[];

  /**
   * Selected value(s)
   */
  value?: string | string[];

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;

  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether the select is required
   */
  required?: boolean;

  /**
   * Select ID
   */
  id?: string;

  /**
   * Select name
   */
  name?: string;

  /**
   * Size variant
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether the select is invalid
   */
  invalid?: boolean;

  /**
   * Whether the select is valid
   */
  valid?: boolean;

  /**
   * Whether multiple options can be selected
   */
  multiple?: boolean;

  /**
   * Accessible label (if no visible label)
   */
  'aria-label'?: string;

  /**
   * ID of element that describes this select
   */
  'aria-describedby'?: string;

  /**
   * Glass morphism effect for the select
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Whether the select should take full width
   */
  fullWidth?: boolean;
}


/**
 * Checkbox component properties
 */
export interface CheckboxProps extends BaseComponentProps {
  /**
   * Checkbox label
   */
  label?: ReactNode;

  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Whether the checkbox is required
   */
  required?: boolean;

  /**
   * Checkbox ID
   */
  id?: string;

  /**
   * Checkbox name
   */
  name?: string;

  /**
   * Checkbox value
   */
  value?: string;

  /**
   * Whether the checkbox is invalid
   */
  invalid?: boolean;

  /**
   * Whether the checkbox is valid
   */
  valid?: boolean;

  /**
   * Whether the checkbox is in indeterminate state
   */
  indeterminate?: boolean;

  /**
   * Accessible label (if no visible label)
   */
  'aria-label'?: string;

  /**
   * ID of element that describes this checkbox
   */
  'aria-describedby'?: string;

  /**
   * Glass morphism effect for the checkbox
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Part-based styling for granular customization
   * @example
   * parts={{
   *   root: { className: 'custom-checkbox', style: { margin: '8px' } },
   *   input: { style: { accentColor: '#7AFFD7' } },
   *   label: { className: 'checkbox-label' }
   * }}
   */
  parts?: CheckboxParts;

  /**
   * CSS variable overrides for runtime customization
   * @example
   * cssVars={{
   *   '--atomix-checkbox-size': '20px',
   *   '--atomix-checkbox-checked-bg': '#7AFFD7'
   * }}
   */
  cssVars?: Partial<Record<CheckboxCSSVariable, string | number>>;

  /**
   * Slot-based customization for complete control
   * @example
   * slots={{
   *   root: { render: (props) => <motion.div {...props} /> },
   *   input: { component: CustomInput },
   *   label: { component: CustomLabel }
   * }}
   */
  slots?: {
    root?: SlotProps<CheckboxRootSlotProps>;
    input?: SlotProps<CheckboxInputSlotProps>;
    label?: SlotProps<CheckboxLabelSlotProps>;
  };
}


/**
 * Radio component properties
 */
export interface RadioProps extends BaseComponentProps {
  /**
   * Radio label
   */
  label?: ReactNode;

  /**
   * Whether the radio is checked
   */
  checked?: boolean;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Whether the radio is required
   */
  required?: boolean;

  /**
   * Radio ID
   */
  id?: string;

  /**
   * Radio name
   */
  name?: string;

  /**
   * Radio value
   */
  value?: string;

  /**
   * Whether the radio is invalid
   */
  invalid?: boolean;

  /**
   * Whether the radio is valid
   */
  valid?: boolean;

  /**
   * Accessible label (if no visible label)
   */
  'aria-label'?: string;

  /**
   * ID of element that describes this radio
   */
  'aria-describedby'?: string;

  /**
   * Glass morphism effect for the radio button
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Part-based styling for granular customization
   * @example
   * parts={{
   *   root: { className: 'custom-radio', style: { margin: '8px' } },
   *   input: { style: { accentColor: '#7AFFD7' } },
   *   label: { className: 'radio-label' }
   * }}
   */
  parts?: RadioParts;

  /**
   * CSS variable overrides for runtime customization
   * @example
   * cssVars={{
   *   '--atomix-radio-size': '20px',
   *   '--atomix-radio-checked-bg': '#7AFFD7'
   * }}
   */
  cssVars?: Partial<Record<RadioCSSVariable, string | number>>;

  /**
   * Slot-based customization for complete control
   * @example
   * slots={{
   *   root: { render: (props) => <motion.div {...props} /> },
   *   input: { component: CustomInput },
   *   label: { component: CustomLabel }
   * }}
   */
  slots?: {
    root?: SlotProps<RadioRootSlotProps>;
    input?: SlotProps<RadioInputSlotProps>;
    label?: SlotProps<RadioLabelSlotProps>;
  };
}


/**
 * Textarea component properties
 */
export interface TextareaProps extends BaseComponentProps {
  /**
   * Textarea value
   */
  value?: string;

  /**
   * Default value for uncontrolled textarea
   */
  defaultValue?: string;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;

  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether the textarea is required
   */
  required?: boolean;

  /**
   * Whether the textarea is read-only
   */
  readOnly?: boolean;

  /**
   * Textarea ID
   */
  id?: string;

  /**
   * Textarea name
   */
  name?: string;

  /**
   * Number of rows
   * @default 4
   */
  rows?: number;

  /**
   * Number of columns
   */
  cols?: number;

  /**
   * Maximum length
   */
  maxLength?: number;

  /**
   * Minimum length
   */
  minLength?: number;

  /**
   * Size variant
   * @default 'md'
   */
  size?: Size;

  /**
   * Color variant
   */
  variant?: ThemeColor;

  /**
   * Whether the textarea is invalid
   */
  invalid?: boolean;

  /**
   * Whether the textarea is valid
   */
  valid?: boolean;

  /**
   * Whether the textarea should receive focus on render
   */
  autoFocus?: boolean;

  /**
   * Accessible label (if no visible label)
   */
  'aria-label'?: string;

  /**
   * ID of element that describes this textarea
   */
  'aria-describedby'?: string;

  /**
   * Glass morphism effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;

  /**
   * Whether to show character counter
   */
  showCounter?: boolean;

  /**
   * Maximum character count for counter (uses maxLength if not provided)
   */
  maxCount?: number;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Whether the textarea should take full width
   */
  fullWidth?: boolean;
}
