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
  'error',
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
 * Countdown-specific constants
 */
export const COUNTDOWN = {
  SELECTORS: {
    COUNTDOWN: '.c-countdown',
    TIME: '.c-countdown__time',
    TIME_COUNT: '.c-countdown__time-count',
    TIME_LABEL: '.c-countdown__time-label',
    SEPARATOR: '.c-countdown__separator'
  },
  CLASSES: {
    BASE: 'c-countdown',
    FOCUSED: 'c-countdown--focused'
  },
  DEFAULTS: {
    SEPARATOR: ':',
    SHOW: ['days', 'hours', 'minutes', 'seconds']
  }
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
  },
  VISUALLY_HIDDEN: 'u-visually-hidden'
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

/**
 * Navbar-specific constants
 */
export const NAVBAR = {
  SELECTORS: {
    NAVBAR: '.c-navbar',
    CONTAINER: '.c-navbar__container',
    BRAND: '.c-navbar__brand',
    COLLAPSE: '.c-navbar__collapse',
    TOGGLER: '.c-navbar__toggler'
  },
  CLASSES: {
    FIXED: 'c-navbar--fixed',
    FIXED_BOTTOM: 'c-navbar--fixed-bottom',
    EXPANDED: 'is-expanded'
  }
};

/**
 * Nav-specific constants
 */
export const NAV = {
  SELECTORS: {
    NAV: '.c-nav',
    ITEM: '.c-nav__item',
    LINK: '.c-nav__link',
    DROPDOWN: '.c-nav__item--dropdown',
    DROPDOWN_MENU: '.c-nav__dropdown-menu',
    MEGA_MENU: '.c-nav__mega-menu',
    ICON: '.c-nav__icon'
  },
  CLASSES: {
    END: 'c-nav--end',
    CENTER: 'c-nav--center',
    ACTIVE: 'is-active',
    DISABLED: 'is-disabled'
  }
};

/**
 * EdgePanel-specific constants
 */
export const EDGE_PANEL = {
  SELECTORS: {
    PANEL: '.c-edge-panel',
    BACKDROP: '.c-edge-panel__backdrop',
    CONTAINER: '.c-edge-panel__container',
    HEADER: '.c-edge-panel__header',
    BODY: '.c-edge-panel__body',
    CLOSE: '.c-edge-panel__close'
  },
  CLASSES: {
    BASE: 'c-edge-panel',
    START: 'c-edge-panel--start',
    END: 'c-edge-panel--end',
    TOP: 'c-edge-panel--top',
    BOTTOM: 'c-edge-panel--bottom',
    IS_OPEN: 'is-open'
  },
  TRANSFORM_VALUES: {
    start: 'translateX(-100%)',
    end: 'translateX(100%)',
    top: 'translateY(-100%)',
    bottom: 'translateY(100%)'
  },
  ANIMATION_DURATION: 300
};

/**
 * DataTable-specific constants
 */
export const DATA_TABLE_CLASSES = {
  base: 'c-data-table',
  container: 'c-data-table-container',
  tableWrapper: 'c-data-table-wrapper',
  header: 'c-data-table__header',
  headerCell: 'c-data-table__header-cell',
  headerContent: 'c-data-table__header-content',
  sortable: 'c-data-table__header-cell--sortable',
  sortIcon: 'c-data-table__sort-icon',
  row: 'c-data-table__row',
  cell: 'c-data-table__cell',
  loadingCell: 'c-data-table__loading-cell',
  loadingIndicator: 'c-data-table__loading-indicator',
  emptyCell: 'c-data-table__empty-cell',
  toolbar: 'c-data-table-toolbar',
  search: 'c-data-table-search',
  searchInput: 'c-data-table-search__input',
  pagination: 'c-data-table__pagination-container',
  striped: 'c-data-table--striped',
  bordered: 'c-data-table--bordered',
  dense: 'c-data-table--dense',
  loading: 'c-data-table--loading',
  open: 'is-open',
};

/**
 * DataTable-specific selectors
 */
export const DATA_TABLE_SELECTORS = {
  TABLE: '.c-data-table',
  HEADER: '.c-data-table__header',
  HEADER_CELL: '.c-data-table__header-cell',
  ROW: '.c-data-table__row',
  CELL: '.c-data-table__cell',
  PAGINATION: '.c-data-table__pagination',
  PAGINATION_BUTTON: '.c-data-table__pagination-button',
  SEARCH_INPUT: '.c-data-table__search-input',
};

/**
 * Pagination-specific constants
 */
export const PAGINATION_DEFAULTS = {
  currentPage: 1,
  totalPages: 1,
  siblingCount: 1,
  showFirstLastButtons: true,
  showPrevNextButtons: true,
  size: 'md' as Size,
};

/**
 * Todo-specific constants
 */
export const TODO = {
  SELECTORS: {
    TODO: '.c-todo',
    TITLE: '.c-todo__title',
    LIST: '.c-todo__list',
    ITEM: '.c-todo__item',
    ITEM_CONTENT: '.c-todo__item-content',
    ITEM_TEXT: '.c-todo__item-text',
    ITEM_ACTIONS: '.c-todo__item-actions',
    CHECKBOX: '.c-todo__checkbox',
    DELETE_BUTTON: '.c-todo__delete-btn',
    FORM: '.c-todo__form',
    INPUT: '.c-todo__input',
    ADD_BUTTON: '.c-todo__add-btn'
  },
  CLASSES: {
    BASE: 'c-todo',
    ITEM: 'c-todo__item',
    COMPLETED: 'c-todo__item--completed',
    SMALL: 'c-todo--sm',
    LARGE: 'c-todo--lg'
  }
};

/**
 * Form-specific constants
 */
export const FORM = {
  SELECTORS: {
    FORM: '.c-form',
    GROUP: '.c-form-group',
    LABEL: '.c-form-group__label',
    HELPER: '.c-form-group__helper',
    FIELD: '.c-form-group__field',
    REQUIRED: '.c-form-group__required'
  },
  CLASSES: {
    BASE: 'c-form',
    DISABLED: 'c-form--disabled'
  }
};

/**
 * Form Group-specific constants
 */
export const FORM_GROUP = {
  SELECTORS: {
    GROUP: '.c-form-group',
    LABEL: '.c-form-group__label',
    FIELD: '.c-form-group__field',
    HELPER: '.c-form-group__helper',
    REQUIRED: '.c-form-group__required'
  },
  CLASSES: {
    BASE: 'c-form-group',
    SMALL: 'c-form-group--sm',
    LARGE: 'c-form-group--lg',
    INVALID: 'c-form-group--invalid',
    VALID: 'c-form-group--valid',
    DISABLED: 'c-form-group--disabled'
  }
};

/**
 * Input-specific constants
 */
export const INPUT = {
  SELECTORS: {
    INPUT: '.c-input'
  },
  CLASSES: {
    BASE: 'c-input',
    SMALL: 'c-input--sm',
    LARGE: 'c-input--lg',
    INVALID: 'is-invalid',
    VALID: 'is-valid',
    DISABLED: 'is-disabled'
  }
};

/**
 * Radio-specific constants
 */
export const RADIO = {
  SELECTORS: {
    RADIO: '.c-radio',
    INPUT: '.c-radio__input',
    LABEL: '.c-radio__label'
  },
  CLASSES: {
    BASE: 'c-radio',
    INVALID: 'is-error',
    VALID: 'is-valid',
    DISABLED: 'is-disabled'
  }
};

/**
 * Checkbox-specific constants - extend existing checkbox constants
 */
// Update existing CHECKBOX constants if needed

/**
 * Select-specific constants
 */
export const SELECT = {
  SELECTORS: {
    SELECT: '.c-select',
    SELECTED: '.c-select__selected',
    SELECT_BODY: '.c-select__body',
    SELECT_PANEL: '.c-select__panel',
    SELECT_ITEMS: '.c-select__items',
    SELECT_ITEM: '.c-select__item',
    ITEM_LABEL: '.c-select__item-label',
    ITEM_INPUT: '.c-select__item-input',
    OPTION: 'option'
  },
  CLASSES: {
    BASE: 'c-select',
    SELECTED: 'c-select__selected',
    SELECT_BODY: 'c-select__body',
    SELECT_PANEL: 'c-select__panel',
    SELECT_ITEMS: 'c-select__items',
    SELECT_ITEM: 'c-select__item',
    TOGGLE_ICON: 'c-select__toggle-icon',
    ICON_CARET: 'icon-lux-caret-down',
    SMALL: 'c-select--sm',
    LARGE: 'c-select--lg',
    INVALID: 'is-invalid',
    VALID: 'is-valid',
    DISABLED: 'is-disabled',
    IS_OPEN: 'is-open'
  }
};

/**
 * Textarea-specific constants
 */
export const TEXTAREA = {
  SELECTORS: {
    TEXTAREA: '.c-textarea'
  },
  CLASSES: {
    BASE: 'c-input c-input--textarea',
    SMALL: 'c-input--sm',
    LARGE: 'c-input--lg',
    INVALID: 'is-invalid',
    VALID: 'is-valid',
    DISABLED: 'is-disabled'
  }
};
