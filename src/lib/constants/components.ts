import { ThemeColor, Size } from '../types/components';

/**
 * Default theme colors for components
 */
export const THEME_COLORS: ThemeColor[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'dark'
];

/**
 * Default sizes for components
 */
export const SIZES: Size[] = ['sm', 'md', 'lg'];

/**
 * CSS class prefixes
 */
export const CLASS_PREFIX = {
  COMPONENT: 'c-',
  UTILITY: 'u-',
  LAYOUT: 'l-',
  OBJECT: 'o-',
};

/**
 * Button-specific constants
 */
export const BUTTON = {
  BASE_CLASS: 'c-btn',
  ICON_CLASS: 'c-btn__icon',
  VARIANT_PREFIX: 'c-btn--',
};

/**
 * Accordion-specific constants
 */
export const ACCORDION = {
  SELECTORS: {
    ACCORDION: '.c-accordion',
    HEADER: '.c-accordion__header',
    PANEL: '.c-accordion__panel',
    BODY: '.c-accordion__body'
  },
  CLASSES: {
    IS_OPEN: 'is-open',
    IS_ANIMATING: 'is-animating',
    IS_DISABLED: 'is-disabled'
  },
  ATTRIBUTES: {
    ARIA_EXPANDED: 'aria-expanded',
    ARIA_CONTROLS: 'aria-controls',
    ARIA_HIDDEN: 'aria-hidden',
    ROLE: 'role'
  },
  CSS_VARS: {
    PANEL_HEIGHT: '--panel-height'
  }
}; 