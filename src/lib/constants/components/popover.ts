/**
 * Popover-specific constants
 */
export const POPOVER = {
  SELECTORS: {
    POPOVER: '.js-atomix-popover',
    TRIGGER: '.js-atomix-popover-trigger',
    CONTENT: '.js-atomix-popover-content',
    CONTENT_INNER: '.c-popover__content-inner',
    ARROW: '.c-popover__arrow',
  },
  CLASSES: {
    IS_OPEN: 'is-open',
    TOP: 'c-popover--top',
    BOTTOM: 'c-popover--bottom',
    LEFT: 'c-popover--left',
    RIGHT: 'c-popover--right',
    AUTO: 'c-popover--auto',
  },
  ATTRIBUTES: {
    POSITION: 'data-popover-position',
    TRIGGER: 'data-popover-trigger',
    CONTENT_ID: 'data-popover-id',
  },
  DEFAULTS: {
    TRIGGER: 'click',
    POSITION: 'top',
    OFFSET: 12,
    DELAY: 0,
  },
};
