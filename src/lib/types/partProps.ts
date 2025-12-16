/**
 * Part-Based Styling Props
 * 
 * Type definitions for styling individual component parts with className and style props.
 * This enables granular customization of component internals.
 */

import React from 'react';

/**
 * Style properties for a component part
 */
export interface PartStyleProps {
  /** Additional CSS class name for the part */
  className?: string;
  /** Inline styles for the part */
  style?: React.CSSProperties;
}

/**
 * Generic component parts type
 * T is a union of part names as strings
 */
export type ComponentParts<T extends string> = {
  [K in T]?: PartStyleProps;
};

/**
 * Button component parts
 */
export type ButtonParts = ComponentParts<'root' | 'icon' | 'label' | 'spinner'> & {
  /** Root button element */
  root?: PartStyleProps;
  /** Icon wrapper element */
  icon?: PartStyleProps;
  /** Label/text wrapper element */
  label?: PartStyleProps;
  /** Loading spinner element */
  spinner?: PartStyleProps;
};

/**
 * Card component parts
 */
export type CardParts = ComponentParts<
  'root' | 'header' | 'body' | 'footer' | 'title' | 'text' | 'image' | 'actions' | 'icon'
> & {
  /** Root card element */
  root?: PartStyleProps;
  /** Header section */
  header?: PartStyleProps;
  /** Body/content section */
  body?: PartStyleProps;
  /** Footer section */
  footer?: PartStyleProps;
  /** Title element */
  title?: PartStyleProps;
  /** Text/description element */
  text?: PartStyleProps;
  /** Image element */
  image?: PartStyleProps;
  /** Actions container */
  actions?: PartStyleProps;
  /** Icon element */
  icon?: PartStyleProps;
};

/**
 * Input component parts
 */
export type InputParts = ComponentParts<'root' | 'input' | 'wrapper' | 'prefix' | 'suffix'> & {
  /** Root container element */
  root?: PartStyleProps;
  /** Input element itself */
  input?: PartStyleProps;
  /** Input wrapper element */
  wrapper?: PartStyleProps;
  /** Prefix element (icon/text before input) */
  prefix?: PartStyleProps;
  /** Suffix element (icon/text after input) */
  suffix?: PartStyleProps;
};

/**
 * Modal component parts
 */
export type ModalParts = ComponentParts<
  'root' | 'backdrop' | 'dialog' | 'content' | 'header' | 'body' | 'footer' | 'close'
> & {
  /** Root modal container */
  root?: PartStyleProps;
  /** Backdrop overlay */
  backdrop?: PartStyleProps;
  /** Dialog container */
  dialog?: PartStyleProps;
  /** Content wrapper */
  content?: PartStyleProps;
  /** Header section */
  header?: PartStyleProps;
  /** Body section */
  body?: PartStyleProps;
  /** Footer section */
  footer?: PartStyleProps;
  /** Close button */
  close?: PartStyleProps;
};

/**
 * Dropdown component parts
 */
export type DropdownParts = ComponentParts<
  'root' | 'toggle' | 'menu' | 'menuWrapper' | 'item' | 'divider' | 'header'
> & {
  /** Root dropdown container */
  root?: PartStyleProps;
  /** Toggle/trigger element */
  toggle?: PartStyleProps;
  /** Menu container */
  menu?: PartStyleProps;
  /** Menu wrapper (positioning) */
  menuWrapper?: PartStyleProps;
  /** Menu item */
  item?: PartStyleProps;
  /** Divider element */
  divider?: PartStyleProps;
  /** Header element */
  header?: PartStyleProps;
};

/**
 * Badge component parts
 */
export type BadgeParts = ComponentParts<'root' | 'icon' | 'label'> & {
  /** Root badge element */
  root?: PartStyleProps;
  /** Icon element */
  icon?: PartStyleProps;
  /** Label/text element */
  label?: PartStyleProps;
};

/**
 * Tabs component parts
 */
export type TabsParts = ComponentParts<
  'root' | 'nav' | 'navItem' | 'navBtn' | 'panels' | 'panel' | 'panelBody'
> & {
  /** Root tabs container */
  root?: PartStyleProps;
  /** Navigation container */
  nav?: PartStyleProps;
  /** Navigation item wrapper */
  navItem?: PartStyleProps;
  /** Navigation button */
  navBtn?: PartStyleProps;
  /** Panels container */
  panels?: PartStyleProps;
  /** Individual panel */
  panel?: PartStyleProps;
  /** Panel body/content */
  panelBody?: PartStyleProps;
};

/**
 * Progress component parts
 */
export type ProgressParts = ComponentParts<'root' | 'bar' | 'label'> & {
  /** Root progress container */
  root?: PartStyleProps;
  /** Progress bar element */
  bar?: PartStyleProps;
  /** Label/text element */
  label?: PartStyleProps;
};

/**
 * Tooltip component parts
 */
export type TooltipParts = ComponentParts<'root' | 'trigger' | 'content' | 'arrow'> & {
  /** Root tooltip container */
  root?: PartStyleProps;
  /** Trigger element */
  trigger?: PartStyleProps;
  /** Tooltip content */
  content?: PartStyleProps;
  /** Arrow element */
  arrow?: PartStyleProps;
};

/**
 * Select component parts
 */
export type SelectParts = ComponentParts<'root' | 'select' | 'wrapper' | 'icon' | 'option'> & {
  /** Root container */
  root?: PartStyleProps;
  /** Select element */
  select?: PartStyleProps;
  /** Select wrapper */
  wrapper?: PartStyleProps;
  /** Dropdown icon */
  icon?: PartStyleProps;
  /** Option element */
  option?: PartStyleProps;
};

/**
 * Checkbox component parts
 */
export type CheckboxParts = ComponentParts<'root' | 'input' | 'box' | 'icon' | 'label'> & {
  /** Root container */
  root?: PartStyleProps;
  /** Input element */
  input?: PartStyleProps;
  /** Checkbox box */
  box?: PartStyleProps;
  /** Check icon */
  icon?: PartStyleProps;
  /** Label text */
  label?: PartStyleProps;
};

/**
 * Radio component parts
 */
export type RadioParts = ComponentParts<'root' | 'input' | 'circle' | 'dot' | 'label'> & {
  /** Root container */
  root?: PartStyleProps;
  /** Input element */
  input?: PartStyleProps;
  /** Radio circle */
  circle?: PartStyleProps;
  /** Inner dot */
  dot?: PartStyleProps;
  /** Label text */
  label?: PartStyleProps;
};

/**
 * Textarea component parts
 */
export type TextareaParts = ComponentParts<'root' | 'textarea' | 'wrapper'> & {
  /** Root container */
  root?: PartStyleProps;
  /** Textarea element */
  textarea?: PartStyleProps;
  /** Textarea wrapper */
  wrapper?: PartStyleProps;
};

/**
 * FormGroup component parts
 */
export type FormGroupParts = ComponentParts<'root' | 'label' | 'input' | 'helper' | 'error'> & {
  /** Root container */
  root?: PartStyleProps;
  /** Label element */
  label?: PartStyleProps;
  /** Input wrapper */
  input?: PartStyleProps;
  /** Helper text */
  helper?: PartStyleProps;
  /** Error message */
  error?: PartStyleProps;
};

/**
 * Navbar component parts
 */
export type NavbarParts = ComponentParts<
  'root' | 'container' | 'brand' | 'nav' | 'item' | 'link' | 'toggle'
> & {
  /** Root navbar */
  root?: PartStyleProps;
  /** Container */
  container?: PartStyleProps;
  /** Brand element */
  brand?: PartStyleProps;
  /** Navigation */
  nav?: PartStyleProps;
  /** Nav item */
  item?: PartStyleProps;
  /** Nav link */
  link?: PartStyleProps;
  /** Mobile toggle */
  toggle?: PartStyleProps;
};

/**
 * Accordion component parts
 */
export type AccordionParts = ComponentParts<
  'root' | 'item' | 'header' | 'trigger' | 'icon' | 'panel' | 'content'
> & {
  /** Root accordion */
  root?: PartStyleProps;
  /** Accordion item */
  item?: PartStyleProps;
  /** Item header */
  header?: PartStyleProps;
  /** Trigger button */
  trigger?: PartStyleProps;
  /** Expand icon */
  icon?: PartStyleProps;
  /** Content panel */
  panel?: PartStyleProps;
  /** Panel content */
  content?: PartStyleProps;
};

/**
 * DataTable component parts
 */
export type DataTableParts = ComponentParts<
  'root' | 'wrapper' | 'table' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'th' | 'td'
> & {
  /** Root container */
  root?: PartStyleProps;
  /** Table wrapper */
  wrapper?: PartStyleProps;
  /** Table element */
  table?: PartStyleProps;
  /** Table head */
  thead?: PartStyleProps;
  /** Table body */
  tbody?: PartStyleProps;
  /** Table foot */
  tfoot?: PartStyleProps;
  /** Table row */
  tr?: PartStyleProps;
  /** Table header cell */
  th?: PartStyleProps;
  /** Table data cell */
  td?: PartStyleProps;
};

/**
 * Avatar component parts
 */
export type AvatarParts = ComponentParts<'root' | 'image' | 'fallback' | 'badge'> & {
  /** Root avatar */
  root?: PartStyleProps;
  /** Image element */
  image?: PartStyleProps;
  /** Fallback element */
  fallback?: PartStyleProps;
  /** Status badge */
  badge?: PartStyleProps;
};

/**
 * List component parts
 */
export type ListParts = ComponentParts<
  'root' | 'item' | 'icon' | 'content' | 'title' | 'description'
> & {
  /** Root list */
  root?: PartStyleProps;
  /** List item */
  item?: PartStyleProps;
  /** Item icon */
  icon?: PartStyleProps;
  /** Item content */
  content?: PartStyleProps;
  /** Item title */
  title?: PartStyleProps;
  /** Item description */
  description?: PartStyleProps;
};

/**
 * Utility function to merge part styles
 */
export function mergePartStyles(
  base?: PartStyleProps,
  override?: PartStyleProps
): PartStyleProps | undefined {
  if (!base && !override) return undefined;
  if (!base) return override;
  if (!override) return base;

  return {
    className: [base.className, override.className].filter(Boolean).join(' '),
    style: { ...base.style, ...override.style },
  };
}

/**
 * Utility function to apply part styles to props
 */
export function applyPartStyles<T extends Record<string, any>>(
  props: T,
  part?: PartStyleProps
): T {
  if (!part) return props;

  return {
    ...props,
    className: [props.className, part.className].filter(Boolean).join(' '),
    style: { ...props.style, ...part.style },
  };
}

/**
 * Map of component names to their part types
 */
export type ComponentPartsMap = {
  Button: ButtonParts;
  Card: CardParts;
  Input: InputParts;
  Modal: ModalParts;
  Dropdown: DropdownParts;
  Badge: BadgeParts;
  Tabs: TabsParts;
  Progress: ProgressParts;
  Tooltip: TooltipParts;
  Select: SelectParts;
  Checkbox: CheckboxParts;
  Radio: RadioParts;
  Textarea: TextareaParts;
  FormGroup: FormGroupParts;
  Navbar: NavbarParts;
  Accordion: AccordionParts;
  DataTable: DataTableParts;
  Avatar: AvatarParts;
  List: ListParts;
};
