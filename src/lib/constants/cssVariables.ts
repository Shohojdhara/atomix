/**
 * CSS Variables Constants
 *
 * Comprehensive CSS custom property definitions for all components.
 * These provide type-safe access to component styling variables.
 */

/**
 * Button CSS Variables
 */
export const BUTTON_CSS_VARS = {
  // Base properties
  '--atomix-button-bg': 'background-color',
  '--atomix-button-color': 'text color',
  '--atomix-button-padding-x': 'horizontal padding',
  '--atomix-button-padding-y': 'vertical padding',
  '--atomix-button-border-radius': 'border radius',
  '--atomix-button-border-width': 'border width',
  '--atomix-button-border-color': 'border color',
  '--atomix-button-font-size': 'font size',
  '--atomix-button-font-weight': 'font weight',
  '--atomix-button-font-family': 'font family',
  '--atomix-button-line-height': 'line height',
  '--atomix-button-min-width': 'minimum width',
  '--atomix-button-min-height': 'minimum height',
  '--atomix-button-transition': 'transition',

  // State properties
  '--atomix-button-hover-bg': 'hover background',
  '--atomix-button-hover-color': 'hover text color',
  '--atomix-button-hover-border-color': 'hover border color',
  '--atomix-button-active-bg': 'active background',
  '--atomix-button-active-color': 'active text color',
  '--atomix-button-focus-ring-color': 'focus ring color',
  '--atomix-button-focus-ring-width': 'focus ring width',
  '--atomix-button-disabled-opacity': 'disabled opacity',
  '--atomix-button-disabled-bg': 'disabled background',

  // Part properties
  '--atomix-button-icon-size': 'icon size',
  '--atomix-button-icon-gap': 'icon spacing',
  '--atomix-button-spinner-size': 'spinner size',
  '--atomix-button-label-font-weight': 'label font weight',
} as const;

/**
 * Card CSS Variables
 */
export const CARD_CSS_VARS = {
  // Base properties
  '--atomix-card-bg': 'background color',
  '--atomix-card-color': 'text color',
  '--atomix-card-padding': 'padding',
  '--atomix-card-border-radius': 'border radius',
  '--atomix-card-border-width': 'border width',
  '--atomix-card-border-color': 'border color',
  '--atomix-card-box-shadow': 'box shadow',
  '--atomix-card-width': 'width',
  '--atomix-card-max-width': 'maximum width',

  // State properties
  '--atomix-card-hover-bg': 'hover background',
  '--atomix-card-hover-shadow': 'hover shadow',
  '--atomix-card-hover-transform': 'hover transform',

  // Part properties - Header
  '--atomix-card-header-padding': 'header padding',
  '--atomix-card-header-bg': 'header background',
  '--atomix-card-header-border-bottom': 'header border bottom',

  // Part properties - Body
  '--atomix-card-body-padding': 'body padding',
  '--atomix-card-body-font-size': 'body font size',

  // Part properties - Footer
  '--atomix-card-footer-padding': 'footer padding',
  '--atomix-card-footer-bg': 'footer background',
  '--atomix-card-footer-border-top': 'footer border top',

  // Part properties - Title
  '--atomix-card-title-font-size': 'title font size',
  '--atomix-card-title-font-weight': 'title font weight',
  '--atomix-card-title-color': 'title color',
  '--atomix-card-title-margin-bottom': 'title margin bottom',

  // Part properties - Image
  '--atomix-card-image-border-radius': 'image border radius',
  '--atomix-card-image-max-height': 'image max height',
} as const;

/**
 * Input CSS Variables
 */
export const INPUT_CSS_VARS = {
  // Base properties
  '--atomix-input-bg': 'background color',
  '--atomix-input-color': 'text color',
  '--atomix-input-padding-x': 'horizontal padding',
  '--atomix-input-padding-y': 'vertical padding',
  '--atomix-input-border-radius': 'border radius',
  '--atomix-input-border-width': 'border width',
  '--atomix-input-border-color': 'border color',
  '--atomix-input-font-size': 'font size',
  '--atomix-input-font-family': 'font family',
  '--atomix-input-line-height': 'line height',
  '--atomix-input-height': 'height',
  '--atomix-input-placeholder-color': 'placeholder color',

  // State properties
  '--atomix-input-hover-border-color': 'hover border color',
  '--atomix-input-focus-border-color': 'focus border color',
  '--atomix-input-focus-ring-color': 'focus ring color',
  '--atomix-input-focus-ring-width': 'focus ring width',
  '--atomix-input-disabled-bg': 'disabled background',
  '--atomix-input-disabled-opacity': 'disabled opacity',
  '--atomix-input-invalid-border-color': 'invalid border color',
  '--atomix-input-valid-border-color': 'valid border color',
} as const;

/**
 * Modal CSS Variables
 */
export const MODAL_CSS_VARS = {
  // Base properties
  '--atomix-modal-bg': 'background color',
  '--atomix-modal-color': 'text color',
  '--atomix-modal-padding': 'padding',
  '--atomix-modal-border-radius': 'border radius',
  '--atomix-modal-box-shadow': 'box shadow',
  '--atomix-modal-width': 'width',
  '--atomix-modal-max-width': 'maximum width',
  '--atomix-modal-max-height': 'maximum height',

  // Backdrop properties
  '--atomix-modal-backdrop-bg': 'backdrop background',
  '--atomix-modal-backdrop-opacity': 'backdrop opacity',
  '--atomix-modal-backdrop-blur': 'backdrop blur',

  // Part properties - Header
  '--atomix-modal-header-padding': 'header padding',
  '--atomix-modal-header-border-bottom': 'header border bottom',
  '--atomix-modal-title-font-size': 'title font size',
  '--atomix-modal-title-font-weight': 'title font weight',

  // Part properties - Body
  '--atomix-modal-body-padding': 'body padding',
  '--atomix-modal-body-font-size': 'body font size',

  // Part properties - Footer
  '--atomix-modal-footer-padding': 'footer padding',
  '--atomix-modal-footer-border-top': 'footer border top',
  '--atomix-modal-footer-gap': 'footer button gap',

  // Part properties - Close button
  '--atomix-modal-close-size': 'close button size',
  '--atomix-modal-close-color': 'close button color',
  '--atomix-modal-close-hover-color': 'close button hover color',
} as const;

/**
 * Dropdown CSS Variables
 */
export const DROPDOWN_CSS_VARS = {
  // Base properties
  '--atomix-dropdown-bg': 'background color',
  '--atomix-dropdown-color': 'text color',
  '--atomix-dropdown-border-radius': 'border radius',
  '--atomix-dropdown-border-width': 'border width',
  '--atomix-dropdown-border-color': 'border color',
  '--atomix-dropdown-box-shadow': 'box shadow',
  '--atomix-dropdown-min-width': 'minimum width',
  '--atomix-dropdown-max-height': 'maximum height',
  '--atomix-dropdown-padding': 'padding',

  // Part properties - Item
  '--atomix-dropdown-item-padding': 'item padding',
  '--atomix-dropdown-item-font-size': 'item font size',
  '--atomix-dropdown-item-hover-bg': 'item hover background',
  '--atomix-dropdown-item-hover-color': 'item hover color',
  '--atomix-dropdown-item-active-bg': 'item active background',
  '--atomix-dropdown-item-active-color': 'item active color',
  '--atomix-dropdown-item-disabled-opacity': 'item disabled opacity',

  // Part properties - Divider
  '--atomix-dropdown-divider-color': 'divider color',
  '--atomix-dropdown-divider-margin': 'divider margin',

  // Part properties - Header
  '--atomix-dropdown-header-padding': 'header padding',
  '--atomix-dropdown-header-font-size': 'header font size',
  '--atomix-dropdown-header-font-weight': 'header font weight',
  '--atomix-dropdown-header-color': 'header color',
} as const;

/**
 * Badge CSS Variables
 */
export const BADGE_CSS_VARS = {
  // Base properties
  '--atomix-badge-bg': 'background color',
  '--atomix-badge-color': 'text color',
  '--atomix-badge-padding-x': 'horizontal padding',
  '--atomix-badge-padding-y': 'vertical padding',
  '--atomix-badge-border-radius': 'border radius',
  '--atomix-badge-font-size': 'font size',
  '--atomix-badge-font-weight': 'font weight',
  '--atomix-badge-line-height': 'line height',

  // Part properties
  '--atomix-badge-icon-size': 'icon size',
  '--atomix-badge-icon-gap': 'icon spacing',
} as const;

/**
 * Tabs CSS Variables
 */
export const TABS_CSS_VARS = {
  // Base properties
  '--atomix-tabs-bg': 'background color',
  '--atomix-tabs-border-color': 'border color',
  '--atomix-tabs-border-width': 'border width',

  // Part properties - Nav
  '--atomix-tabs-nav-gap': 'nav gap',
  '--atomix-tabs-nav-padding': 'nav padding',

  // Part properties - Tab button
  '--atomix-tabs-btn-padding-x': 'button horizontal padding',
  '--atomix-tabs-btn-padding-y': 'button vertical padding',
  '--atomix-tabs-btn-color': 'button color',
  '--atomix-tabs-btn-font-size': 'button font size',
  '--atomix-tabs-btn-font-weight': 'button font weight',
  '--atomix-tabs-btn-hover-color': 'button hover color',
  '--atomix-tabs-btn-active-color': 'button active color',
  '--atomix-tabs-btn-active-border-color': 'button active border color',
  '--atomix-tabs-btn-active-border-width': 'button active border width',

  // Part properties - Panel
  '--atomix-tabs-panel-padding': 'panel padding',
  '--atomix-tabs-panel-bg': 'panel background',
} as const;

/**
 * Progress CSS Variables
 */
export const PROGRESS_CSS_VARS = {
  // Base properties
  '--atomix-progress-bg': 'background color',
  '--atomix-progress-height': 'height',
  '--atomix-progress-border-radius': 'border radius',

  // Part properties - Bar
  '--atomix-progress-bar-bg': 'bar background',
  '--atomix-progress-bar-transition': 'bar transition',
} as const;

/**
 * Tooltip CSS Variables
 */
export const TOOLTIP_CSS_VARS = {
  // Base properties
  '--atomix-tooltip-bg': 'background color',
  '--atomix-tooltip-color': 'text color',
  '--atomix-tooltip-padding-x': 'horizontal padding',
  '--atomix-tooltip-padding-y': 'vertical padding',
  '--atomix-tooltip-border-radius': 'border radius',
  '--atomix-tooltip-font-size': 'font size',
  '--atomix-tooltip-max-width': 'maximum width',
  '--atomix-tooltip-box-shadow': 'box shadow',
  '--atomix-tooltip-z-index': 'z-index',

  // Arrow properties
  '--atomix-tooltip-arrow-size': 'arrow size',
  '--atomix-tooltip-arrow-color': 'arrow color',
} as const;

/**
 * Checkbox CSS Variables
 */
export const CHECKBOX_CSS_VARS = {
  // Base properties
  '--atomix-checkbox-size': 'checkbox size',
  '--atomix-checkbox-bg': 'background color',
  '--atomix-checkbox-border-color': 'border color',
  '--atomix-checkbox-border-width': 'border width',
  '--atomix-checkbox-border-radius': 'border radius',
  '--atomix-checkbox-transition': 'transition',

  // State properties
  '--atomix-checkbox-checked-bg': 'checked background',
  '--atomix-checkbox-checked-border-color': 'checked border color',
  '--atomix-checkbox-hover-border-color': 'hover border color',
  '--atomix-checkbox-focus-ring-color': 'focus ring color',
  '--atomix-checkbox-focus-ring-width': 'focus ring width',
  '--atomix-checkbox-disabled-opacity': 'disabled opacity',
  '--atomix-checkbox-invalid-border-color': 'invalid border color',

  // Part properties
  '--atomix-checkbox-icon-size': 'icon size',
  '--atomix-checkbox-icon-color': 'icon color',
  '--atomix-checkbox-label-gap': 'label spacing',
  '--atomix-checkbox-label-font-size': 'label font size',
  '--atomix-checkbox-label-color': 'label color',
} as const;

/**
 * Radio CSS Variables
 */
export const RADIO_CSS_VARS = {
  // Base properties
  '--atomix-radio-size': 'radio size',
  '--atomix-radio-bg': 'background color',
  '--atomix-radio-border-color': 'border color',
  '--atomix-radio-border-width': 'border width',
  '--atomix-radio-transition': 'transition',

  // State properties
  '--atomix-radio-checked-bg': 'checked background',
  '--atomix-radio-checked-border-color': 'checked border color',
  '--atomix-radio-hover-border-color': 'hover border color',
  '--atomix-radio-focus-ring-color': 'focus ring color',
  '--atomix-radio-focus-ring-width': 'focus ring width',
  '--atomix-radio-disabled-opacity': 'disabled opacity',
  '--atomix-radio-invalid-border-color': 'invalid border color',

  // Part properties
  '--atomix-radio-dot-size': 'dot size',
  '--atomix-radio-dot-color': 'dot color',
  '--atomix-radio-label-gap': 'label spacing',
  '--atomix-radio-label-font-size': 'label font size',
  '--atomix-radio-label-color': 'label color',
} as const;

/**
 * All component CSS variables
 */
export const COMPONENT_CSS_VARS = {
  Button: BUTTON_CSS_VARS,
  Card: CARD_CSS_VARS,
  Input: INPUT_CSS_VARS,
  Modal: MODAL_CSS_VARS,
  Dropdown: DROPDOWN_CSS_VARS,
  Badge: BADGE_CSS_VARS,
  Tabs: TABS_CSS_VARS,
  Progress: PROGRESS_CSS_VARS,
  Tooltip: TOOLTIP_CSS_VARS,
  Checkbox: CHECKBOX_CSS_VARS,
  Radio: RADIO_CSS_VARS,
} as const;

/**
 * Type-safe CSS variable keys by component
 */
export type ButtonCSSVariable = keyof typeof BUTTON_CSS_VARS;
export type CardCSSVariable = keyof typeof CARD_CSS_VARS;
export type InputCSSVariable = keyof typeof INPUT_CSS_VARS;
export type ModalCSSVariable = keyof typeof MODAL_CSS_VARS;
export type DropdownCSSVariable = keyof typeof DROPDOWN_CSS_VARS;
export type BadgeCSSVariable = keyof typeof BADGE_CSS_VARS;
export type TabsCSSVariable = keyof typeof TABS_CSS_VARS;
export type ProgressCSSVariable = keyof typeof PROGRESS_CSS_VARS;
export type TooltipCSSVariable = keyof typeof TOOLTIP_CSS_VARS;
export type CheckboxCSSVariable = keyof typeof CHECKBOX_CSS_VARS;
export type RadioCSSVariable = keyof typeof RADIO_CSS_VARS;

/**
 * Component name to CSS variable type mapping
 */
export type ComponentCSSVariables = {
  Button: ButtonCSSVariable;
  Card: CardCSSVariable;
  Input: InputCSSVariable;
  Modal: ModalCSSVariable;
  Dropdown: DropdownCSSVariable;
  Badge: BadgeCSSVariable;
  Tabs: TabsCSSVariable;
  Progress: ProgressCSSVariable;
  Tooltip: TooltipCSSVariable;
  Checkbox: CheckboxCSSVariable;
  Radio: RadioCSSVariable;
};

/**
 * Get CSS variables for a component
 */
export function getComponentCSSVars<T extends keyof typeof COMPONENT_CSS_VARS>(
  component: T
): (typeof COMPONENT_CSS_VARS)[T] {
  return COMPONENT_CSS_VARS[component];
}
