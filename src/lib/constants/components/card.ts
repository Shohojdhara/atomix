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
    // Size modifiers
    SM: 'c-card--sm',
    MD: 'c-card--md',
    LG: 'c-card--lg',
    // Layout modifiers
    ROW: 'c-card--row',
    FLAT: 'c-card--flat',
    // Appearance modifiers
    FILLED: 'c-card--filled',
    OUTLINED: 'c-card--outlined',
    GHOST: 'c-card--ghost',
    ELEVATED: 'c-card--elevated',
    // Elevation modifiers
    ELEVATION_NONE: 'c-card--elevation-none',
    ELEVATION_SM: 'c-card--elevation-sm',
    ELEVATION_MD: 'c-card--elevation-md',
    ELEVATION_LG: 'c-card--elevation-lg',
    ELEVATION_XL: 'c-card--elevation-xl',
    // State modifiers
    ACTIVE: 'is-active',
    DISABLED: 'c-card--disabled',
    LOADING: 'c-card--loading',
    SELECTED: 'c-card--selected',
    INTERACTIVE: 'c-card--interactive',
    // Other modifiers
    FLIPPED: 'is-flipped',
    FOCUSED: 'is-focused',
    CLICKABLE: 'is-clickable',
    GLASS: 'c-card--glass',
  },
  DEFAULTS: {
    HOVER: true,
    SIZE: 'md',
    VARIANT: 'primary',
    APPEARANCE: 'filled',
    ELEVATION: 'none',
  },
};
