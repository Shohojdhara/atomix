import { Size, ThemeColor } from '../types/components';

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
  'dark',
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
 * Callout-specific constants
 */
export const CALLOUT = {
  BASE_CLASS: 'c-callout',
  CONTENT_CLASS: 'c-callout__content',
  ICON_CLASS: 'c-callout__icon',
  MESSAGE_CLASS: 'c-callout__message',
  TITLE_CLASS: 'c-callout__title',
  TEXT_CLASS: 'c-callout__text',
  ACTIONS_CLASS: 'c-callout__actions',
  CLOSE_BTN_CLASS: 'c-callout__close-btn',
  VARIANT_PREFIX: 'c-callout--',
  CLASSES: {
    ONELINE: 'c-callout--oneline',
    TOAST: 'c-callout--toast',
    HIDE: 'is-hide',
  },
};

/**
 * Accordion-specific constants
 */
export const ACCORDION = {
  SELECTORS: {
    ACCORDION: '.c-accordion',
    HEADER: '.c-accordion__header',
    PANEL: '.c-accordion__panel',
    BODY: '.c-accordion__body',
  },
  CLASSES: {
    IS_OPEN: 'is-open',
    IS_ANIMATING: 'is-animating',
    IS_DISABLED: 'is-disabled',
  },
  ATTRIBUTES: {
    ARIA_EXPANDED: 'aria-expanded',
    ARIA_CONTROLS: 'aria-controls',
    ARIA_HIDDEN: 'aria-hidden',
    ROLE: 'role',
  },
  CSS_VARS: {
    PANEL_HEIGHT: '--panel-height',
  },
};

/**
 * Badge-specific constants
 */
export const BADGE = {
  BASE_CLASS: 'c-badge',
  ICON_CLASS: 'c-badge__icon',
  VARIANT_PREFIX: 'c-badge--',
  SIZE_PREFIX: 'c-badge--',
};

/**
 * List-specific constants
 */
export const LIST = {
  BASE_CLASS: 'c-list',
  ITEM_CLASS: 'c-list__item',
  VARIANT_PREFIX: 'c-list--',
  SIZE_PREFIX: 'c-list--',
  CLASSES: {
    ORDERED: 'c-list--ordered',
    INLINE: 'c-list--inline',
  },
};

/**
 * List Group-specific constants
 */
export const LIST_GROUP = {
  BASE_CLASS: 'c-list-group',
  ITEM_CLASS: 'c-list-group__item',
  VARIANT_PREFIX: 'c-list-group--',
  SIZE_PREFIX: 'c-list-group--',
};

/**
 * Breadcrumb-specific constants
 */
export const BREADCRUMB = {
  SELECTORS: {
    BREADCRUMB: '.c-breadcrumb',
    ITEM: '.c-breadcrumb__item',
    LINK: '.c-breadcrumb__link',
  },
  CLASSES: {
    BASE: 'c-breadcrumb',
    ITEM: 'c-breadcrumb__item',
    LINK: 'c-breadcrumb__link',
    ACTIVE: 'is-active',
  },
  DEFAULTS: {
    DIVIDER: '›',
  },
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
    SEPARATOR: '.c-countdown__separator',
  },
  CLASSES: {
    BASE: 'c-countdown',
    FOCUSED: 'c-countdown--focused',
  },
  DEFAULTS: {
    SEPARATOR: ':',
    SHOW: ['days', 'hours', 'minutes', 'seconds'],
  },
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
    IMAGE_WRAPPER: '.c-hero__image-wrapper',
  },
  CLASSES: {
    CENTER: 'c-hero--center',
    RIGHT: 'c-hero--right',
    LEFT: 'c-hero--left',
    FULL_VH: 'c-hero--full-vh',
  },
};

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

/**
 * Toggle-specific constants
 */
export const TOGGLE = {
  SELECTORS: {
    TOGGLE: '.c-toggle',
  },
  CLASSES: {
    IS_ON: 'is-on',
  },
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
    PANEL_BODIES: '.c-tabs__panel-body',
  },
  CLASSES: {
    ACTIVE: 'is-active',
  },
  DEFAULTS: {
    ACTIVE_INDEX: 0,
  },
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
    TEXT: '.c-steps__text',
  },
  CLASSES: {
    ACTIVE: 'is-active',
    VERTICAL: 'c-steps--vertical',
    COMPLETED: 'is-completed',
  },
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
    AUTHOR_ROLE: '.c-testimonial__author-role',
  },
  CLASSES: {
    SMALL: 'c-testimonial--sm',
    LARGE: 'c-testimonial--lg',
  },
};

/**
 * Spinner-specific constants
 */
export const SPINNER = {
  SELECTORS: {
    SPINNER: '.c-spinner',
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
    LARGE: 'c-spinner--lg',
  },
  VISUALLY_HIDDEN: 'u-visually-hidden',
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
    ACTIONS: '.c-sectionintro__actions',
  },
  CLASSES: {
    CENTER: 'c-sectionintro--center',
    LARGE: 'c-sectionintro--lg',
    SMALL: 'c-sectionintro--sm',
  },
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
    OVERLAY: '.c-river__overlay',
  },
  CLASSES: {
    CENTER: 'c-river--center',
    BREAKOUT: 'c-river--breakout',
    REVERSE: 'c-river--reverse',
  },
  ATTRIBUTES: {
    CONTENT_WIDTH: '--river-content-width',
  },
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
    LOADER_CLOSE: '.c-upload__loader-close',
  },
  CLASSES: {
    DISABLED: 'c-upload--disabled',
    ERROR: 'c-upload--error',
    SUCCESS: 'c-upload--success',
    LOADING: 'c-upload--loading',
    DRAGGING: 'c-upload--dragging',
  },
  ATTRIBUTES: {
    PERCENTAGE: '--upload-loader-percentage',
  },
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
    ICON: '.c-nav__icon',
  },
  CLASSES: {
    END: 'c-nav--end',
    CENTER: 'c-nav--center',
    ACTIVE: 'is-active',
    DISABLED: 'is-disabled',
  },
};

/**
 * SideMenu-specific constants
 */
export const SIDE_MENU = {
  SELECTORS: {
    SIDE_MENU: '.c-side-menu',
    WRAPPER: '.c-side-menu__wrapper',
    INNER: '.c-side-menu__inner',
    TITLE: '.c-side-menu__title',
    TOGGLER: '.c-side-menu__toggler',
    TOGGLER_ICON: '.c-side-menu__toggler-icon',
    LIST: '.c-side-menu__list',
    ITEM: '.c-side-menu__item',
    LINK: '.c-side-menu__link',
    LINK_ICON: '.c-side-menu__link-icon',
    LINK_TEXT: '.c-side-menu__link-text',
  },
  CLASSES: {
    BASE: 'c-side-menu',
    WRAPPER: 'c-side-menu__wrapper',
    INNER: 'c-side-menu__inner',
    TITLE: 'c-side-menu__title',
    TOGGLER: 'c-side-menu__toggler',
    TOGGLER_ICON: 'c-side-menu__toggler-icon',
    LIST: 'c-side-menu__list',
    ITEM: 'c-side-menu__item',
    LINK: 'c-side-menu__link',
    LINK_ICON: 'c-side-menu__link-icon',
    LINK_TEXT: 'c-side-menu__link-text',
    IS_OPEN: 'is-open',
    ACTIVE: 'is-active',
    DISABLED: 'is-disabled',
  },
  ATTRIBUTES: {
    SIDE_MENU: 'data-side-menu',
    COLLAPSIBLE: 'data-collapsible',
    OPEN: 'data-open',
    TITLE: 'data-title',
  },
  DEFAULTS: {
    COLLAPSIBLE: true,
    OPEN: false,
    TOGGLE_ICON: '▶',
  },
};

/**
 * EdgePanel-specific constants
 */
/**
 * Rating-specific constants
 */
export const RATING = {
  SELECTORS: {
    RATING: '.c-rating',
    STAR: '.c-rating__star',
    STAR_FULL: '.c-rating__star-full',
    STAR_HALF: '.c-rating__star-half',
  },
  CLASSES: {
    FULL: 'c-rating__star--full',
    HALF: 'c-rating__star--half',
    SMALL: 'c-rating--sm',
    LARGE: 'c-rating--lg',
  },
  ATTRIBUTES: {
    READONLY: 'data-readonly',
    VALUE: 'data-value',
  },
};

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
    ADD_BUTTON: '.c-todo__add-btn',
  },
  CLASSES: {
    BASE: 'c-todo',
    ITEM: 'c-todo__item',
    COMPLETED: 'c-todo__item--completed',
    SMALL: 'c-todo--sm',
    LARGE: 'c-todo--lg',
  },
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
    REQUIRED: '.c-form-group__required',
  },
  CLASSES: {
    BASE: 'c-form',
    DISABLED: 'c-form--disabled',
  },
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
    REQUIRED: '.c-form-group__required',
  },
  CLASSES: {
    BASE: 'c-form-group',
    SMALL: 'c-form-group--sm',
    LARGE: 'c-form-group--lg',
    INVALID: 'c-form-group--invalid',
    VALID: 'c-form-group--valid',
    DISABLED: 'c-form-group--disabled',
  },
};

/**
 * Input-specific constants
 */
export const INPUT = {
  SELECTORS: {
    INPUT: '.c-input',
  },
  CLASSES: {
    BASE: 'c-input',
    SMALL: 'c-input--sm',
    LARGE: 'c-input--lg',
    INVALID: 'is-invalid',
    VALID: 'is-valid',
    DISABLED: 'is-disabled',
  },
};

/**
 * Radio-specific constants
 */
export const RADIO = {
  SELECTORS: {
    RADIO: '.c-radio',
    INPUT: '.c-radio__input',
    LABEL: '.c-radio__label',
  },
  CLASSES: {
    BASE: 'c-radio',
    INVALID: 'is-error',
    VALID: 'is-valid',
    DISABLED: 'is-disabled',
  },
};

/**
 * Checkbox-specific constants - extend existing checkbox constants
 */
// Update existing CHECKBOX constants if needed

/**
 * Card-specific constants
 */
export const CARD = {
  SELECTORS: {
    CARD: '.c-card',
    HEADER: '.c-card__header',
    BODY: '.c-card__body',
    IMAGE: '.c-card__image',
    TITLE: '.c-card__title',
    TEXT: '.c-card__text',
    ACTIONS: '.c-card__actions',
    ICON: '.c-card__icon',
    FOOTER: '.c-card__footer',
  },
  CLASSES: {
    BASE: 'c-card',
    ROW: 'c-card--row',
    FLAT: 'c-card--flat',
    ACTIVE: 'is-active',
    FLIPPED: 'is-flipped',
    FOCUSED: 'is-focused',
    CLICKABLE: 'is-clickable',
  },
  DEFAULTS: {
    HOVER: true,
  },
};

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
    OPTION: 'option',
  },
  CLASSES: {
    BASE: 'c-select',
    SELECTED: 'c-select__selected',
    SELECT_BODY: 'c-select__body',
    SELECT_PANEL: 'c-select__panel',
    SELECT_ITEMS: 'c-select__items',
    SELECT_ITEM: 'c-select__item',
    TOGGLE_ICON: 'c-select__toggle-icon',
    ICON_CARET: 'icon-atomix-caret-down',
    SMALL: 'c-select--sm',
    LARGE: 'c-select--lg',
    INVALID: 'is-invalid',
    VALID: 'is-valid',
    DISABLED: 'is-disabled',
    IS_OPEN: 'is-open',
  },
};

/**
 * Textarea-specific constants
 */
export const TEXTAREA = {
  SELECTORS: {
    TEXTAREA: '.c-textarea',
  },
  CLASSES: {
    BASE: 'c-input c-input--textarea',
    SMALL: 'c-input--sm',
    LARGE: 'c-input--lg',
    INVALID: 'is-invalid',
    VALID: 'is-valid',
    DISABLED: 'is-disabled',
  },
};

/**
 * Avatar-specific constants
 */
export const AVATAR = {
  SELECTORS: {
    AVATAR: '.c-avatar',
    IMAGE: '.c-avatar__image',
    INITIALS: '.c-avatar__initials',
    ICON: '.c-avatar__icon',
  },
  CLASSES: {
    BASE: 'c-avatar',
    XS: 'c-avatar--xs',
    SM: 'c-avatar--sm',
    MD: 'c-avatar--md',
    LG: 'c-avatar--lg',
    XL: 'c-avatar--xl',
    CIRCLE: 'c-avatar--circle',
  },
};

/**
 * Avatar Group-specific constants
 */
export const AVATAR_GROUP = {
  SELECTORS: {
    GROUP: '.c-avatar-group',
    MORE: '.c-avatar-group__more',
  },
  CLASSES: {
    BASE: 'c-avatar-group',
    STACKED: 'c-avatar-group--stacked',
    MORE: 'c-avatar-group__more',
  },
};

/**
 * Modal component constants
 */
export const MODAL = {
  SELECTORS: {
    MODAL: '.c-modal',
    OPEN_BUTTON: '.js-modal-open',
    CLOSE_BUTTONS: '.js-modal-close',
    DIALOG: '.c-modal__dialog',
    BACKDROP: '.c-modal__backdrop',
  },
  CLASSES: {
    IS_OPEN: 'is-open',
  },
  DEFAULT_OPTIONS: {
    openELm: '.js-modal-open',
    closeELms: '.js-modal-close',
    modalDialogELm: '.c-modal__dialog',
    backdropELm: '.c-modal__backdrop',
    backdrop: true,
    keyboard: true,
  },
};

/**
 * Messages-specific constants
 */
export const MESSAGES = {
  SELECTORS: {
    MESSAGES: '.c-messages',
    BODY: '.c-messages__body',
    CONTENT: '.c-messages__content',
    AVATAR: '.c-messages__avatar',
    ITEMS: '.c-messages__items',
    TEXT: '.c-messages__text',
    FILE: '.c-messages__file',
    IMAGE: '.c-messages__image',
    FORM: '.c-messages__form',
    INPUT: '.c-messages__input',
  },
  CLASSES: {
    BASE: 'c-messages',
    BODY: 'c-messages__body',
    CONTENT: 'c-messages__content',
    CONTENT_SELF: 'c-messages__content--self',
    AVATAR: 'c-messages__avatar',
    ITEMS: 'c-messages__items',
    NAME: 'c-messages__name',
    TEXT: 'c-messages__text',
    TIME: 'c-messages__time',
    FILE: 'c-messages__file',
    FILE_ICON: 'c-messages__file-icon',
    FILE_DETAILS: 'c-messages__file-details',
    FILE_NAME: 'c-messages__file-name',
    FILE_SIZE: 'c-messages__file-size',
    IMAGE: 'c-messages__image',
    FORM: 'c-messages__form',
    INPUT_GROUP: 'c-messages__input-group',
    INPUT: 'c-messages__input',
    OPTIONS: 'c-messages__options',
    OPTION: 'c-messages__option c-btn',
    OPTION_ICON: 'c-messages__option-icon',
    SUBMIT: 'c-messages__submit',
  },
};

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

/**
 * DatePicker-specific constants
 */
/**
 * Progress-specific constants
 */
export const PROGRESS = {
  SELECTORS: {
    PROGRESS: '.c-progress',
    BAR: '.c-progress__bar',
  },
  CLASSES: {
    BASE: 'c-progress',
    BAR: 'c-progress__bar',
    SM: 'c-progress--sm',
    MD: 'c-progress--md',
    LG: 'c-progress--lg',
  },
  ATTRIBUTES: {
    ARIA_VALUEMIN: 'aria-valuemin',
    ARIA_VALUEMAX: 'aria-valuemax',
    ARIA_VALUENOW: 'aria-valuenow',
    ARIA_LABEL: 'aria-label',
  },
  CSS_VARS: {
    PERCENTAGE: '--atomix-progress-percentage',
  },
  DEFAULTS: {
    ARIA_LABEL: 'Progress bar',
  },
};

export const DATEPICKER = {
  SELECTORS: {
    DATEPICKER: '.c-datepicker',
    INPUT: '.c-datepicker__input',
    CALENDAR: '.c-datepicker__calendar',
    DAY: '.c-datepicker__day',
    MONTH: '.c-datepicker__month',
    YEAR: '.c-datepicker__year',
    HEADER: '.c-datepicker__header',
    BODY: '.c-datepicker__body',
    FOOTER: '.c-datepicker__footer',
    WEEKDAYS: '.c-datepicker__weekdays',
    TODAY_BUTTON: '.c-datepicker__today-button',
    CLEAR_BUTTON: '.c-datepicker__clear-button',
    CLOSE_BUTTON: '.c-datepicker__close-button',
    NAV_BUTTON: '.c-datepicker__nav-button',
    VIEW_SWITCH: '.c-datepicker__view-switch',
  },
  CLASSES: {
    IS_OPEN: 'is-open',
    IS_DISABLED: 'is-disabled',
    IS_SELECTED: 'is-selected',
    IS_TODAY: 'is-today',
    INLINE: 'c-datepicker--inline',
  },
  ATTRIBUTES: {
    FORMAT: 'data-format',
    MIN_DATE: 'data-min-date',
    MAX_DATE: 'data-max-date',
    INLINE: 'data-inline',
    PLACEMENT: 'data-placement',
    CLEARABLE: 'data-clearable',
    SHOW_TODAY: 'data-show-today-button',
    SHOW_WEEK_NUMBERS: 'data-show-week-numbers',
  },
  DEFAULTS: {
    FORMAT: 'MM/dd/yyyy',
    PLACEMENT: 'bottom-start',
    CLEARABLE: true,
    SHOW_TODAY_BUTTON: true,
    SHOW_WEEK_NUMBERS: false,
    INLINE: false,
  },
};

/**
 * VideoPlayer component constants
 */
export const VIDEO_PLAYER = {
  SELECTORS: {
    VIDEO_PLAYER: '.c-video-player',
    VIDEO: '.c-video-player__video',
    CONTROLS: '.c-video-player__controls',
    PROGRESS: '.c-video-player__progress',
    VOLUME: '.c-video-player__volume',
    SETTINGS: '.c-video-player__settings',
  },
  CLASSES: {
    BASE: 'c-video-player',
    VIDEO: 'c-video-player__video',
    YOUTUBE: 'c-video-player--youtube',
    LOADING: 'c-video-player__loading',
    SPINNER: 'c-video-player__spinner',
    CONTROLS: 'c-video-player__controls',
    CONTROLS_VISIBLE: 'c-video-player__controls--visible',
    PROGRESS_CONTAINER: 'c-video-player__progress-container',
    PROGRESS_BAR: 'c-video-player__progress-bar',
    PROGRESS_BUFFERED: 'c-video-player__progress-buffered',
    PROGRESS_PLAYED: 'c-video-player__progress-played',
    PROGRESS_THUMB: 'c-video-player__progress-thumb',
    CONTROLS_ROW: 'c-video-player__controls-row',
    CONTROLS_LEFT: 'c-video-player__controls-left',
    CONTROLS_RIGHT: 'c-video-player__controls-right',
    CONTROL_BUTTON: 'c-video-player__control-button',
    VOLUME_CONTAINER: 'c-video-player__volume-container',
    VOLUME_SLIDER: 'c-video-player__volume-slider',
    VOLUME_BAR: 'c-video-player__volume-bar',
    VOLUME_FILL: 'c-video-player__volume-fill',
    TIME_DISPLAY: 'c-video-player__time-display',
    SETTINGS_CONTAINER: 'c-video-player__settings-container',
    SETTINGS_MENU: 'c-video-player__settings-menu',
    SETTINGS_TABS: 'c-video-player__settings-tabs',
    SETTINGS_TAB: 'c-video-player__settings-tab',
    SETTINGS_TAB_ACTIVE: 'c-video-player__settings-tab--active',
    SETTINGS_CONTENT: 'c-video-player__settings-content',
    SETTINGS_OPTIONS: 'c-video-player__settings-options',
    SETTINGS_OPTION: 'c-video-player__settings-option',
    SETTINGS_OPTION_ACTIVE: 'c-video-player__settings-option--active',
    AMBIENT: 'c-video-player--ambient',
    AMBIENT_CANVAS: 'c-video-player__ambient-canvas',
  },
  DEFAULTS: {
    CONTROLS_TIMEOUT: 3000,
    VOLUME: 1,
    PLAYBACK_RATE: 1,
    ASPECT_RATIO: '16:9',
  },
};

/**
 * PhotoViewer component constants
 */
export const PHOTOVIEWER = {
  SELECTOR: '.c-photo-viewer',
  CLASS: 'c-photo-viewer',
  DEFAULTS: {
    startIndex: 0,
    zoomLevel: 1,
    fullscreen: false,
  },
};

/**
 * Slider component constants
 */
export const sliderConstants = {
  classes: {
    container: 'c-slider',
    containerModifierClass: 'c-slider--',
    wrapper: 'c-slider__wrapper',
    slide: 'c-slider__slide',
    slideActive: 'c-slider__slide--active',
    slidePrev: 'c-slider__slide--prev',
    slideNext: 'c-slider__slide--next',
    slideDuplicate: 'c-slider__slide--duplicate',
    slideVisible: 'c-slider__slide--visible',
    pagination: 'c-slider__pagination',
    paginationBullet: 'c-slider__pagination-bullet',
    paginationBulletActive: 'c-slider__pagination-bullet--active',
    navigation: 'c-slider__navigation',
    navigationPrev: 'c-slider__navigation-prev',
    navigationNext: 'c-slider__navigation-next',
    navigationDisabled: 'c-slider__navigation--disabled',
    scrollbar: 'c-slider__scrollbar',
    scrollbarDrag: 'c-slider__scrollbar-drag',
    thumbs: 'c-slider__thumbs',
    thumbsWrapper: 'c-slider__thumbs-wrapper',
    thumbsSlide: 'c-slider__thumbs-slide',
    thumbsSlideActive: 'c-slider__thumbs-slide--active',
    zoomContainer: 'c-slider__zoom-container',
    lazyPreloader: 'c-slider__lazy-preloader',
  },
  defaults: {
    slidesToShow: 1,
    slidesToScroll: 1,
    spaceBetween: 0,
    centeredSlides: false,
    loop: false,
    initialSlide: 0,
    direction: 'horizontal' as const,
    speed: 300,
    easing: 'ease-out',
    allowTouchMove: true,
    threshold: 5,
    mousewheel: false,
    keyboard: false,
    grabCursor: false,
    freeMode: false,
    watchSlidesProgress: false,
    watchOverflow: true,
    resistanceRatio: 0.85,
    preventClicks: true,
    preventClicksPropagation: true,
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    touchMoveStopPropagation: true,
    touchStartPreventDefault: true,
    touchReleaseOnEdges: false,
    resistance: true,
    passiveListeners: true,
  },
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
  events: {
    init: 'slider:init',
    destroy: 'slider:destroy',
    slideChange: 'slider:slideChange',
    slideChangeTransitionStart: 'slider:slideChangeTransitionStart',
    slideChangeTransitionEnd: 'slider:slideChangeTransitionEnd',
    touchStart: 'slider:touchStart',
    touchMove: 'slider:touchMove',
    touchEnd: 'slider:touchEnd',
    reachBeginning: 'slider:reachBeginning',
    reachEnd: 'slider:reachEnd',
    progress: 'slider:progress',
    autoplayStart: 'slider:autoplayStart',
    autoplayStop: 'slider:autoplayStop',
    beforeResize: 'slider:beforeResize',
    resize: 'slider:resize',
  },
};

export const SLIDER = sliderConstants;

/**
 * Chart-specific constants
 */
export const CHART = {
  BASE_CLASS: 'c-chart',
  ROOT_CLASS: 'c-chart',
  HEADER_CLASS: 'c-chart__header',
  HEADER_CONTENT_CLASS: 'c-chart__header-content',
  TITLE_CLASS: 'c-chart__title',
  SUBTITLE_CLASS: 'c-chart__subtitle',
  TOOLBAR_CLASS: 'c-chart__toolbar',
  ACTION_CLASS: 'c-chart__action',
  EXPORT_GROUP_CLASS: 'c-chart__export-group',
  EXPORT_DROPDOWN_CLASS: 'c-chart__export-dropdown',
  EXPORT_OPTION_CLASS: 'c-chart__export-option',
  TOOLBAR_GROUP_CLASS: 'c-chart__toolbar-group',
  TOOLBAR_SEPARATOR_CLASS: 'c-chart__toolbar-separator',
  TOOLBAR_LABEL_CLASS: 'c-chart__toolbar-label',
  CONTENT_CLASS: 'c-chart__content',
  CANVAS_CLASS: 'c-chart__canvas',
  LEGEND_CLASS: 'c-chart__legend',
  LEGEND_ITEM_CLASS: 'c-chart__legend-item',
  LEGEND_LABEL_CLASS: 'c-chart__legend-label',
  LEGEND_COLOR_CLASS: 'c-chart__legend-color',
  TOOLTIP_CLASS: 'c-chart__tooltip',
  TOOLTIP_TITLE_CLASS: 'c-chart__tooltip-title',
  TOOLTIP_CONTENT_CLASS: 'c-chart__tooltip-content',
  TOOLTIP_ITEM_CLASS: 'c-chart__tooltip-item',
  TOOLTIP_LABEL_CLASS: 'c-chart__tooltip-label',
  TOOLTIP_VALUE_CLASS: 'c-chart__tooltip-value',
  AXIS_CLASS: 'c-chart__axis',
  AXIS_LABEL_CLASS: 'c-chart__axis-label',
  GRID_CLASS: 'c-chart__grid',
  DATA_POINT_CLASS: 'c-chart__data-point',
  CHART_SVG_CLASS: 'c-chart__svg',
  LOADING_CLASS: 'c-chart__loading',
  LOADING_SPINNER_CLASS: 'c-chart__loading-spinner',
  LOADING_TEXT_CLASS: 'c-chart__loading-text',
  ERROR_CLASS: 'c-chart__error',
  ERROR_ICON_CLASS: 'c-chart__error-icon',
  ERROR_CONTENT_CLASS: 'c-chart__error-content',
  ERROR_MESSAGE_CLASS: 'c-chart__error-message',
  ERROR_DETAILS_CLASS: 'c-chart__error-details',
  EMPTY_CLASS: 'c-chart__empty',
  EMPTY_ICON_CLASS: 'c-chart__empty-icon',
  EMPTY_MESSAGE_CLASS: 'c-chart__empty-message',
  EMPTY_DETAILS_CLASS: 'c-chart__empty-details',
  DEFAULT_WIDTH: 800,
  DEFAULT_HEIGHT: 400,
  PIE_RADIUS_RATIO: 0.8,
  DEFAULT_COLORS: [
    'var(--atomix-primary)',
    'var(--atomix-secondary)',
    'var(--atomix-success)',
    'var(--atomix-info)',
    'var(--atomix-warning)',
    'var(--atomix-error)',
    'var(--atomix-primary-5)',
    'var(--atomix-primary-7)',
    'var(--atomix-primary-3)',
    'var(--atomix-gray-6)',
    'var(--atomix-gray-8)',
    'var(--atomix-gray-4)',
  ],
  TYPE_PREFIX: 'c-chart--',
  SIZE_PREFIX: 'c-chart--',
  VARIANT_PREFIX: 'c-chart--',
  LOADING_STATE_CLASS: 'c-chart--loading',
  ERROR_STATE_CLASS: 'c-chart--error',
  CLASSES: {
    // Chart Types
    LINE: 'c-chart--line',
    AREA: 'c-chart--area',
    BAR: 'c-chart--bar',
    HORIZONTAL_BAR: 'c-chart--horizontal-bar',
    PIE: 'c-chart--pie',
    DONUT: 'c-chart--donut',
    DOUGHNUT: 'c-chart--doughnut',
    SCATTER: 'c-chart--scatter',
    RADAR: 'c-chart--radar',
    BUBBLE: 'c-chart--bubble',
    CANDLESTICK: 'c-chart--candlestick',
    GAUGE: 'c-chart--gauge',
    FUNNEL: 'c-chart--funnel',
    WATERFALL: 'c-chart--waterfall',
    HEATMAP: 'c-chart--heatmap',
    TREEMAP: 'c-chart--treemap',

    // Sizes
    SM: 'c-chart--sm',
    MD: 'c-chart--md',
    LG: 'c-chart--lg',
    XL: 'c-chart--xl',
    FULL: 'c-chart--full',

    // Variants
    PRIMARY: 'c-chart--primary',
    SECONDARY: 'c-chart--secondary',
    SUCCESS: 'c-chart--success',
    ERROR: 'c-chart--error',
    WARNING: 'c-chart--warning',
    INFO: 'c-chart--info',

    // States
    LOADING: 'c-chart--loading',
    INTERACTIVE: 'c-chart--interactive',
    DISABLED: 'c-chart--disabled',
    FULLSCREEN: 'c-chart--fullscreen',
    MINIMIZED: 'c-chart--minimized',

    // Legacy Support
    ADVANCED: 'c-chart--advanced',

    // Toolbar sizes
    TOOLBAR_SM: 'c-chart__toolbar--sm',
    TOOLBAR_MD: 'c-chart__toolbar--md',
    TOOLBAR_LG: 'c-chart__toolbar--lg',

    // Toolbar positions
    TOOLBAR_TOP: 'c-chart__toolbar--top',
    TOOLBAR_BOTTOM: 'c-chart__toolbar--bottom',
    TOOLBAR_LEFT: 'c-chart__toolbar--left',
    TOOLBAR_RIGHT: 'c-chart__toolbar--right',

    // Action states
    ACTION_ACTIVE: 'c-chart__action--active',
    ACTION_DISABLED: 'c-chart__action--disabled',
    ACTION_PRIMARY: 'c-chart__action--primary',
    ACTION_SECONDARY: 'c-chart__action--secondary',
    ACTION_SUCCESS: 'c-chart__action--success',
    ACTION_INFO: 'c-chart__action--info',
    ACTION_WARNING: 'c-chart__action--warning',
    ACTION_ERROR: 'c-chart__action--error',
  },

  // Toolbar configuration
  TOOLBAR: {
    SIZES: ['sm', 'md', 'lg'] as const,
    POSITIONS: ['top', 'bottom', 'left', 'right'] as const,
    ACTION_VARIANTS: ['primary', 'secondary', 'success', 'info', 'warning', 'error'] as const,
  },
};

/**
 * CodeSnippet-specific constants
 */
export const CODE_SNIPPET = {
  BASE_CLASS: 'c-code-snippet',
  CONTAINER_CLASS: 'c-code-snippet__container',
  HEADER_CLASS: 'c-code-snippet__header',
  LANGUAGE_CLASS: 'c-code-snippet__language',
  ACTIONS_CLASS: 'c-code-snippet__actions',
  ACTION_CLASS: 'c-code-snippet__action',
  CONTENT_CLASS: 'c-code-snippet__content',
  CODE_CLASS: 'c-code-snippet__content__code',
  LINE_NUMBER_CLASS: 'c-code-snippet__content__line-number',
  COPY_FEEDBACK_CLASS: 'c-code-snippet__copy-feedback',
  
  // Modifier classes
  MODIFIERS: {
    FULLSCREEN: 'c-code-snippet__container--fullscreen',
    WRAP: 'c-code-snippet__content--wrap',
    LIGHT: 'c-code-snippet__container--light',
    DARK: 'c-code-snippet__container--dark',
  },
  
  // Action states
  ACTION_STATES: {
    ACTIVE: 'c-code-snippet__action--active',
    DISABLED: 'c-code-snippet__action--disabled',
  },
  
  // Copy feedback states
  COPY_FEEDBACK_STATES: {
    VISIBLE: 'c-code-snippet__copy-feedback--visible',
  },
  
  // Theme variants
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto',
  } as const,
  
  // Default props
  DEFAULTS: {
    SHOW_LINE_NUMBERS: true,
    WRAP_LINES: false,
    ENABLE_FULLSCREEN: true,
    ENABLE_COPY: true,
    SHOW_TOOLBAR: true,
    THEME: 'light' as const,
  },
  
  // Accessibility
  ARIA_LABELS: {
    COPY: 'Copy code to clipboard',
    WRAP_LINES: 'Toggle line wrapping',
    FULLSCREEN: 'Toggle fullscreen mode',
    LANGUAGE: 'Code language',
  },
};

/**
 * Block-specific constants
 */
export const BLOCK = {
  BASE_CLASS: 'o-block',
  SPACING_PREFIX: 'o-block--',
  CLASSES: {
    SPACING_XS: 'o-block--xs',
    SPACING_SM: 'o-block--sm',
    SPACING_MD: 'o-block--md',
    SPACING_LG: 'o-block--lg',
    SPACING_XL: 'o-block--xl',
    SPACING_NONE: 'o-block--no-spacing',
    FULL_WIDTH: 'o-block--full-width',
    BG_PRIMARY: 'o-block--primary',
    BG_SECONDARY: 'o-block--secondary',
    BG_TERTIARY: 'o-block--tertiary',
    BG_INVERT: 'o-block--invert',
    BG_BRAND: 'o-block--brand',
    BG_ERROR: 'o-block--error',
    BG_SUCCESS: 'o-block--success',
    BG_WARNING: 'o-block--warning',
    BG_INFO: 'o-block--info',
    BG_LIGHT: 'o-block--light',
    BG_DARK: 'o-block--dark',
  },

  SPACING: {
    SIZES: ['xs', 'sm', 'md', 'lg', 'xl', 'none'] as const,
    DEFAULT: 'md' as const,
  },
};
