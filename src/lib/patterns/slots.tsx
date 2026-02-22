/**
 * Slot Pattern System
 *
 * Provides render props and slot-based customization for components.
 * Allows complete control over component rendering and structure.
 */

import React from 'react';

/**
 * Slot configuration with multiple rendering options
 */
export interface SlotProps<T = any> {
  /** Static children to render */
  children?: React.ReactNode;
  /** Render function with access to slot props */
  render?: (props: T) => React.ReactNode;
  /** Custom component to render */
  component?: React.ComponentType<T>;
}

/**
 * Render a slot with the given props
 *
 * Priority order:
 * 1. render function
 * 2. component
 * 3. children
 * 4. fallback
 *
 * @example
 * renderSlot(
 *   { render: (props) => <CustomButton {...props} /> },
 *   { onClick: handleClick, children: 'Click me' }
 * )
 */
export function renderSlot<T>(
  slot: SlotProps<T> | React.ReactNode | undefined,
  props: T,
  fallback?: React.ReactNode
): React.ReactNode {
  // No slot provided, use fallback
  if (!slot) return fallback;

  // Slot is a plain React node
  if (React.isValidElement(slot) || typeof slot === 'string' || typeof slot === 'number') {
    return slot;
  }

  // Slot is an object with rendering options
  if (typeof slot === 'object' && slot !== null) {
    const slotObj = slot as SlotProps<T>;

    // Priority 1: render function
    if (slotObj.render && typeof slotObj.render === 'function') {
      return slotObj.render(props);
    }

    // Priority 2: component
    if (slotObj.component) {
      const Component = slotObj.component;
      return <Component {...(props as any)} />;
    }

    // Priority 3: children
    if (slotObj.children !== undefined) {
      return slotObj.children;
    }
  }

  // Fallback
  return fallback;
}

/**
 * Check if a value is a slot configuration
 */
export function isSlot<T>(value: any): value is SlotProps<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    ('render' in value || 'component' in value || 'children' in value)
  );
}

/**
 * Merge multiple slot configurations
 * Later slots override earlier ones
 */
export function mergeSlots<T>(...slots: Array<SlotProps<T> | undefined>): SlotProps<T> | undefined {
  const filtered = slots.filter((s): s is SlotProps<T> => s !== undefined);

  if (filtered.length === 0) return undefined;
  if (filtered.length === 1) return filtered[0];

  return filtered.reduce((acc, slot) => ({
    ...acc,
    ...slot,
  }));
}

/**
 * Create a slot wrapper component
 *
 * @example
 * const ButtonSlot = createSlotComponent<ButtonSlotProps>('button')
 *
 * <ButtonSlot slot={customSlot} {...props}>
 *   Default content
 * </ButtonSlot>
 */
export function createSlotComponent<T>(
  defaultElement: keyof JSX.IntrinsicElements | React.ComponentType<T> = 'div'
) {
  return function SlotComponent({
    slot,
    children,
    ...props
  }: T & {
    slot?: SlotProps<T>;
    children?: React.ReactNode;
  }) {
    const slotProps = props as T;

    if (slot) {
      return <>{renderSlot(slot, slotProps, children)}</>;
    }

    if (typeof defaultElement === 'string') {
      const Element = defaultElement;
      return <Element {...(props as any)}>{children}</Element>;
    }

    const Component = defaultElement as React.ComponentType<any>;
    return <Component {...slotProps}>{children}</Component>;
  };
}

/**
 * Slot props for Button component
 */
export interface ButtonRootSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-disabled'?: boolean;
  'aria-busy'?: boolean;
}

export interface ButtonIconSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export interface ButtonLabelSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface ButtonSpinnerSlotProps {
  className: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
  variant?: string;
}

/**
 * Slot props for Card component
 */
export interface CardRootSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  role?: string;
  'aria-label'?: string;
}

export interface CardHeaderSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface CardBodySlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  scrollable?: boolean;
  maxHeight?: string | number;
}

export interface CardFooterSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end' | 'between';
}

/**
 * Slot props for Modal component
 */
export interface ModalRootSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  role: string;
  'aria-modal': boolean;
  'aria-hidden': boolean;
}

export interface ModalBackdropSlotProps {
  className: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface ModalDialogSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface ModalContentSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Slot props for Input component
 */
export interface InputRootSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface InputElementSlotProps {
  className: string;
  style?: React.CSSProperties;
  type?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  'aria-label'?: string;
  'aria-invalid'?: boolean;
}

/**
 * Slot props for Dropdown component
 */
export interface DropdownRootSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface DropdownToggleSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  'aria-haspopup': string;
  'aria-expanded': boolean;
  'aria-controls': string;
  tabIndex: number;
}

export interface DropdownMenuSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  role: string;
  'aria-orientation': string;
  'aria-hidden': boolean;
}

/**
 * Slot props for Badge component
 */
export interface BadgeRootSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  role?: string;
  'aria-label'?: string;
}

export interface BadgeIconSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface BadgeLabelSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Slot props for Progress component
 */
export interface ProgressRootSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  role: string;
  'aria-valuenow': number;
  'aria-valuemin': number;
  'aria-valuemax': number;
  'aria-label'?: string;
}

export interface ProgressBarSlotProps {
  className: string;
  style?: React.CSSProperties;
}

/**
 * Slot props for Checkbox component
 */
export interface CheckboxRootSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface CheckboxInputSlotProps {
  className: string;
  style?: React.CSSProperties;
  type: 'checkbox';
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  value?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

export interface CheckboxLabelSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  htmlFor?: string;
}

/**
 * Slot props for Radio component
 */
export interface RadioRootSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface RadioInputSlotProps {
  className: string;
  style?: React.CSSProperties;
  type: 'radio';
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  value?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

export interface RadioLabelSlotProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  htmlFor?: string;
}

/**
 * Utility to create typed slot props
 */
export function createSlotProps<T>(props: T): T {
  return props;
}

/**
 * Hook to manage slot rendering
 */
export function useSlot<T>(
  slot: SlotProps<T> | React.ReactNode | undefined,
  props: T,
  fallback?: React.ReactNode
): React.ReactNode {
  return React.useMemo(() => renderSlot(slot, props, fallback), [slot, props, fallback]);
}
