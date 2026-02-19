/**
 * Dropdown-specific constants
 */
export const DROPDOWN = {
  SELECTORS: {
    DROPDOWN: '.c-dropdown',
    TOGGLE: '.c-dropdown__toggle',
    MENU: '.c-dropdown__menu',
    MENU_WRAPPER: '.c-dropdown__menu-wrapper',
    MENU_INNER: '.c-dropdown__menu-inner',
    MENU_ITEM: '.c-dropdown__menu-item',
    DIVIDER: '.c-dropdown__divider',
    HEADER: '.c-dropdown__header',
  },
  CLASSES: {
    IS_OPEN: 'is-open',
    IS_ACTIVE: 'is-active',
    IS_DISABLED: 'is-disabled',
  },
  DEFAULTS: {
    PLACEMENT: 'bottom-start',
    TRIGGER: 'click',
    OFFSET: 4,
    MIN_WIDTH: 180,
    ANIMATION_DURATION: '0.25s',
    ANIMATION_TIMING: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
};
