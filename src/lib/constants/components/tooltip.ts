/**
 * Tooltip-specific constants
 */
export const TOOLTIP = {
  SELECTORS: {
    TOOLTIP: '.js-atomix-tooltip',
    TRIGGER: '.js-atomix-tooltip-trigger',
    CONTENT: '.js-atomix-tooltip-content',
    ARROW: '.c-tooltip__arrow',
  },
  CLASSES: {
    IS_ACTIVE: 'is-active',
    TOP: 'c-tooltip--top',
    BOTTOM: 'c-tooltip--bottom',
    LEFT: 'c-tooltip--left',
    RIGHT: 'c-tooltip--right',
    TOP_LEFT: 'c-tooltip--top-left',
    TOP_RIGHT: 'c-tooltip--top-right',
    BOTTOM_LEFT: 'c-tooltip--bottom-left',
    BOTTOM_RIGHT: 'c-tooltip--bottom-right',
  },
  ATTRIBUTES: {
    POSITION: 'data-tooltip-position',
    TRIGGER: 'data-tooltip-trigger',
    CONTENT_ID: 'data-tooltip-id',
  },
  DEFAULTS: {
    TRIGGER: 'hover',
    POSITION: 'top',
    OFFSET: 10,
    DELAY: 200,
  },
};
