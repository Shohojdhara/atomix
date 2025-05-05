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

/**
 * Badge-specific constants
 */
export const BADGE = {
  BASE_CLASS: 'c-badge',
  ICON_CLASS: 'c-badge__icon',
  VARIANT_PREFIX: 'c-badge--',
  SIZE_PREFIX: 'c-badge--'
};

/**
 * Hero-specific constants
 */
export const HERO = {
  SELECTORS: {
    HERO: '.c-hero',
    CONTAINER: '.c-hero__container',
    GRID: '.c-hero__grid',
    CONTENT: '.c-hero__content',
    SUBTITLE: '.c-hero__subtitle',
    TITLE: '.c-hero__title',
    TEXT: '.c-hero__text',
    ACTIONS: '.c-hero__actions',
    IMAGE: '.c-hero__image',
    BG: '.c-hero__bg',
    BG_IMAGE: '.c-hero__bg-image',
    OVERLAY: '.c-hero__overlay',
    IMAGE_WRAPPER: '.c-hero__image-wrapper'
  },
  CLASSES: {
    CENTER: 'c-hero--center',
    RIGHT: 'c-hero--right',
    LEFT: 'c-hero--left',
    FULL_VH: 'c-hero--full-vh'
  }
};

/**
 * Tooltip-specific constants
 */
export const TOOLTIP = {
  SELECTORS: {
    TOOLTIP: '.js-lux-tooltip',
    TRIGGER: '.js-lux-tooltip-trigger',
    CONTENT: '.js-lux-tooltip-content',
    ARROW: '.c-tooltip__arrow'
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
    BOTTOM_RIGHT: 'c-tooltip--bottom-right'
  },
  ATTRIBUTES: {
    POSITION: 'data-tooltip-position',
    TRIGGER: 'data-tooltip-trigger',
    CONTENT_ID: 'data-tooltip-id'
  },
  DEFAULTS: {
    TRIGGER: 'hover',
    POSITION: 'top',
    OFFSET: 10,
    DELAY: 200
  }
};

/**
 * Toggle-specific constants
 */
export const TOGGLE = {
  SELECTORS: {
    TOGGLE: '.c-toggle'
  },
  CLASSES: {
    IS_ON: 'is-on'
  }
};

/**
 * Tab-specific constants
 */
export const TAB = {
  SELECTORS: {
    TAB: '.js-atomix-tab',
    NAV_ITEMS: '.c-tabs__nav-item',
    NAV_BTN: '.c-tabs__nav-btn',
    PANELS: '.c-tabs__panel',
    PANEL_BODIES: '.c-tabs__panel-body'
  },
  CLASSES: {
    ACTIVE: 'is-active'
  },
  DEFAULTS: {
    ACTIVE_INDEX: 0
  }
};

/**
 * Steps-specific constants
 */
export const STEPS = {
  SELECTORS: {
    STEPS: '.c-steps',
    ITEM: '.c-steps__item',
    LINE: '.c-steps__line',
    CONTENT: '.c-steps__content',
    NUMBER: '.c-steps__number',
    TEXT: '.c-steps__text'
  },
  CLASSES: {
    ACTIVE: 'is-active',
    VERTICAL: 'c-steps--vertical',
    COMPLETED: 'is-completed'
  }
};

/**
 * Testimonial-specific constants
 */
export const TESTIMONIAL = {
  SELECTORS: {
    TESTIMONIAL: '.c-testimonial',
    QUOTE: '.c-testimonial__quote',
    AUTHOR: '.c-testimonial__author',
    AUTHOR_AVATAR: '.c-testimonial__author-avatar',
    AUTHOR_INFO: '.c-testimonial__info',
    AUTHOR_NAME: '.c-testimonial__author-name',
    AUTHOR_ROLE: '.c-testimonial__author-role'
  },
  CLASSES: {
    SMALL: 'c-testimonial--sm',
    LARGE: 'c-testimonial--lg'
  }
};

/**
 * Spinner-specific constants
 */
export const SPINNER = {
  SELECTORS: {
    SPINNER: '.c-spinner'
  },
  CLASSES: {
    PRIMARY: 'c-spinner--primary',
    SECONDARY: 'c-spinner--secondary',
    SUCCESS: 'c-spinner--success',
    INFO: 'c-spinner--info',
    WARNING: 'c-spinner--warning',
    DANGER: 'c-spinner--danger',
    LIGHT: 'c-spinner--light',
    DARK: 'c-spinner--dark',
    SMALL: 'c-spinner--sm',
    LARGE: 'c-spinner--lg'
  }
};

/**
 * SectionIntro-specific constants
 */
export const SECTION_INTRO = {
  SELECTORS: {
    SECTION_INTRO: '.c-sectionintro',
    LABEL: '.c-sectionintro__label',
    TITLE: '.c-sectionintro__title',
    TEXT: '.c-sectionintro__text',
    ACTIONS: '.c-sectionintro__actions'
  },
  CLASSES: {
    CENTER: 'c-sectionintro--center',
    LARGE: 'c-sectionintro--lg',
    SMALL: 'c-sectionintro--sm'
  }
};

/**
 * River-specific constants
 */
export const RIVER = {
  SELECTORS: {
    RIVER: '.c-river',
    CONTAINER: '.c-river__container',
    ROW: '.c-river__row',
    CONTENT: '.c-river__content',
    CONTENT_COL: '.c-river__content-col',
    CONTENT_COL_TITLE: '.c-river__content-col--title',
    CONTENT_COL_TEXT: '.c-river__content-col--text',
    TITLE: '.c-river__title',
    TEXT: '.c-river__text',
    ACTIONS: '.c-river__actions',
    VISUAL: '.c-river__visual',
    IMAGE_WRAPPER: '.c-river__image-wrapper',
    IMAGE: '.c-river__image',
    BG: '.c-river__bg',
    BG_IMAGE: '.c-river__bg-image',
    OVERLAY: '.c-river__overlay'
  },
  CLASSES: {
    CENTER: 'c-river--center',
    BREAKOUT: 'c-river--breakout',
    REVERSE: 'c-river--reverse'
  },
  ATTRIBUTES: {
    CONTENT_WIDTH: '--river-content-width'
  }
};

/**
 * Upload-specific constants
 */
export const UPLOAD = {
  SELECTORS: {
    UPLOAD: '.c-upload',
    INNER: '.c-upload__inner',
    ICON: '.c-upload__icon',
    TITLE: '.c-upload__title',
    TEXT: '.c-upload__text',
    BUTTON: '.c-upload__btn',
    HELPER_TEXT: '.c-upload__helper-text',
    LOADER: '.c-upload__loader',
    LOADER_STATUS: '.c-upload__loader-status',
    LOADER_TITLE: '.c-upload__loader-title',
    LOADER_PROGRESS: '.c-upload__loader-progress',
    LOADER_PAR: '.c-upload__loader-par',
    LOADER_TIME: '.c-upload__loader-time',
    LOADER_CONTROL: '.c-upload__loader-control',
    LOADER_BAR: '.c-upload__loader-bar',
    LOADER_CLOSE: '.c-upload__loader-close'
  },
  CLASSES: {
    DISABLED: 'c-upload--disabled',
    ERROR: 'c-upload--error',
    SUCCESS: 'c-upload--success',
    LOADING: 'c-upload--loading',
    DRAGGING: 'c-upload--dragging'
  },
  ATTRIBUTES: {
    PERCENTAGE: '--upload-loader-percentage'
  }
}; 