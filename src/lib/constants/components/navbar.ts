/**
 * Navbar-specific constants
 */
export const NAVBAR = {
  SELECTORS: {
    NAVBAR: '.c-navbar',
    CONTAINER: '.c-navbar__container',
    BRAND: '.c-navbar__brand',
    COLLAPSE: '.c-navbar__collapse',
    TOGGLER: '.c-navbar__toggler',
    TOGGLER_ICON: '.c-navbar__toggler-icon',
  },
  CLASSES: {
    BASE: 'c-navbar',
    CONTAINER: 'c-navbar__container',
    BRAND: 'c-navbar__brand',
    COLLAPSE: 'c-navbar__collapse',
    TOGGLER: 'c-navbar__toggler',
    TOGGLER_ICON: 'c-navbar__toggler-icon',
    FIXED: 'c-navbar--fixed',
    FIXED_BOTTOM: 'c-navbar--fixed-bottom',
    COLLAPSIBLE: 'c-navbar--collapsible',
    EXPANDED: 'is-expanded',
    BACKDROP: 'c-navbar__backdrop',
  },
  ATTRIBUTES: {
    NAVBAR: 'data-navbar',
    COLLAPSIBLE: 'data-collapsible',
    EXPANDED: 'data-expanded',
    POSITION: 'data-position',
    BACKDROP: 'data-backdrop',
    AUTO_CLOSE: 'data-auto-close',
    KEYBOARD: 'data-keyboard',
  },
  DEFAULTS: {
    POSITION: 'static',
    COLLAPSIBLE: true,
    EXPANDED: false,
    BACKDROP: false,
    AUTO_CLOSE: true,
    KEYBOARD: true,
    ARIA_LABEL: 'Main navigation',
  },
};
