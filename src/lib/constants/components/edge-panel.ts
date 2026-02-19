export const EDGE_PANEL = {
  SELECTORS: {
    PANEL: '.c-edge-panel',
    BACKDROP: '.c-edge-panel__backdrop',
    CONTAINER: '.c-edge-panel__container',
    HEADER: '.c-edge-panel__header',
    BODY: '.c-edge-panel__body',
    CLOSE: '.c-edge-panel__close',
  },
  CLASSES: {
    BASE: 'c-edge-panel',
    START: 'c-edge-panel--start',
    END: 'c-edge-panel--end',
    TOP: 'c-edge-panel--top',
    BOTTOM: 'c-edge-panel--bottom',
    IS_OPEN: 'is-open',
  },
  TRANSFORM_VALUES: {
    start: 'translateX(-100%)',
    end: 'translateX(100%)',
    top: 'translateY(-100%)',
    bottom: 'translateY(100%)',
  },
  ANIMATION_DURATION: 300,
};
