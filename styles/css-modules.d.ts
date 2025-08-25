// CSS Modules type definitions for Atomix components

// Global module declarations for CSS files
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// For regular CSS files (non-module)
declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '*.sass' {
  const content: string;
  export default content;
}

// Specific interface for Atomix CSS modules
export interface AtomixCSSModules {
  // Button classes
  'c-btn': string;
  'c-btn--primary': string;
  'c-btn--secondary': string;
  'c-btn--success': string;
  'c-btn--error': string;
  'c-btn--warning': string;
  'c-btn--info': string;
  'c-btn--light': string;
  'c-btn--dark': string;
  'c-btn--sm': string;
  'c-btn--lg': string;
  'c-btn--icon': string;
  'c-btn--rounded': string;
  'c-btn--disabled': string;

  // Card classes
  'c-card': string;
  'c-card__header': string;
  'c-card__body': string;
  'c-card__footer': string;
  'c-card__title': string;
  'c-card__text': string;
  'c-card__actions': string;
  'c-card__image': string;
  'c-card__icon': string;
  'c-card--row': string;
  'c-card--flat': string;
  'is-active': string;
  'is-flipped': string;
  'is-focused': string;
  'is-clickable': string;

  // Badge classes
  'c-badge': string;
  'c-badge--primary': string;
  'c-badge--secondary': string;
  'c-badge--success': string;
  'c-badge--error': string;
  'c-badge--warning': string;
  'c-badge--info': string;
  'c-badge--light': string;
  'c-badge--dark': string;
  'c-badge--sm': string;
  'c-badge--lg': string;
  'c-badge__icon': string;

  // Input classes
  'c-input': string;
  'c-input--sm': string;
  'c-input--lg': string;
  'c-input--textarea': string;
  'is-invalid': string;
  'is-valid': string;
  'is-disabled': string;

  // Modal classes
  'c-modal': string;
  'c-modal__dialog': string;
  'c-modal__backdrop': string;
  'c-modal__header': string;
  'c-modal__body': string;
  'c-modal__footer': string;
  'c-modal__title': string;
  'c-modal__close': string;
  'is-open': string;

  // Navigation classes
  'c-navbar': string;
  'c-navbar__container': string;
  'c-navbar__brand': string;
  'c-navbar__collapse': string;
  'c-navbar__toggler': string;
  'c-navbar__toggler-icon': string;
  'c-navbar--fixed': string;
  'c-navbar--fixed-bottom': string;
  'c-navbar--collapsible': string;
  'is-expanded': string;

  'c-nav': string;
  'c-nav__item': string;
  'c-nav__link': string;
  'c-nav__dropdown-menu': string;
  'c-nav__mega-menu': string;
  'c-nav__icon': string;
  'c-nav--end': string;
  'c-nav--center': string;

  // Form classes
  'c-form': string;
  'c-form--disabled': string;
  'c-form-group': string;
  'c-form-group__label': string;
  'c-form-group__field': string;
  'c-form-group__helper': string;
  'c-form-group__required': string;
  'c-form-group--sm': string;
  'c-form-group--lg': string;
  'c-form-group--invalid': string;
  'c-form-group--valid': string;
  'c-form-group--disabled': string;

  // Checkbox and Radio classes
  'c-checkbox': string;
  'c-checkbox__input': string;
  'c-checkbox__label': string;
  'c-checkbox--mixed': string;
  'is-error': string;

  'c-radio': string;
  'c-radio__input': string;
  'c-radio__label': string;

  // Select classes
  'c-select': string;
  'c-select__selected': string;
  'c-select__body': string;
  'c-select__panel': string;
  'c-select__items': string;
  'c-select__item': string;
  'c-select__item-label': string;
  'c-select__item-input': string;
  'c-select__toggle-icon': string;
  'c-select--sm': string;
  'c-select--lg': string;

  // Utility classes
  'u-visually-hidden': string;
  'u-text-center': string;
  'u-text-left': string;
  'u-text-right': string;
  'u-mb-0': string;
  'u-mb-1': string;
  'u-mb-2': string;
  'u-mb-3': string;
  'u-mb-4': string;
  'u-mb-5': string;
  'u-mt-0': string;
  'u-mt-1': string;
  'u-mt-2': string;
  'u-mt-3': string;
  'u-mt-4': string;
  'u-mt-5': string;
  'u-p-0': string;
  'u-p-1': string;
  'u-p-2': string;
  'u-p-3': string;
  'u-p-4': string;
  'u-p-5': string;

  // Layout classes
  'o-container': string;
  'o-grid': string;
  'o-grid__col': string;
  'o-grid__col--1': string;
  'o-grid__col--2': string;
  'o-grid__col--3': string;
  'o-grid__col--4': string;
  'o-grid__col--5': string;
  'o-grid__col--6': string;
  'o-grid__col--7': string;
  'o-grid__col--8': string;
  'o-grid__col--9': string;
  'o-grid__col--10': string;
  'o-grid__col--11': string;
  'o-grid__col--12': string;

  // Additional component classes that might be missing
  'c-accordion': string;
  'c-accordion__item': string;
  'c-accordion__header': string;
  'c-accordion__content': string;
  'c-accordion__toggle': string;

  'c-avatar': string;
  'c-avatar--sm': string;
  'c-avatar--lg': string;
  'c-avatar__image': string;
  'c-avatar__initials': string;

  'c-breadcrumb': string;
  'c-breadcrumb__item': string;
  'c-breadcrumb__link': string;
  'c-breadcrumb__separator': string;

  'c-countdown': string;
  'c-countdown__item': string;
  'c-countdown__number': string;
  'c-countdown__label': string;

  'c-data-table': string;
  'c-data-table__header': string;
  'c-data-table__body': string;
  'c-data-table__row': string;
  'c-data-table__cell': string;

  'c-datepicker': string;
  'c-datepicker__input': string;
  'c-datepicker__calendar': string;

  'c-dropdown': string;
  'c-dropdown__toggle': string;
  'c-dropdown__menu': string;
  'c-dropdown__item': string;

  'c-hero': string;
  'c-hero__content': string;
  'c-hero__title': string;
  'c-hero__subtitle': string;

  'c-list': string;
  'c-list__item': string;
  'c-list-group': string;
  'c-list-group__item': string;

  'c-messages': string;
  'c-messages__item': string;
  'c-messages--success': string;
  'c-messages--error': string;
  'c-messages--warning': string;
  'c-messages--info': string;

  'c-pagination': string;
  'c-pagination__item': string;
  'c-pagination__link': string;
  'c-pagination__prev': string;
  'c-pagination__next': string;

  'c-popover': string;
  'c-popover__content': string;
  'c-popover__arrow': string;

  'c-progress': string;
  'c-progress__bar': string;
  'c-progress__label': string;

  'c-rating': string;
  'c-rating__star': string;
  'c-rating__star--filled': string;

  'c-spinner': string;
  'c-spinner--sm': string;
  'c-spinner--lg': string;

  'c-steps': string;
  'c-steps__item': string;
  'c-steps__marker': string;
  'c-steps__content': string;

  'c-tab': string;
  'c-tab__nav': string;
  'c-tab__item': string;
  'c-tab__content': string;
  'c-tab__panel': string;

  'c-toggle': string;
  'c-toggle__input': string;
  'c-toggle__slider': string;

  'c-tooltip': string;
  'c-tooltip__content': string;
  'c-tooltip__arrow': string;

  'c-upload': string;
  'c-upload__area': string;
  'c-upload__input': string;
  'c-upload__preview': string;
}

// Export a default styles object for the main Atomix styles
declare const styles: AtomixCSSModules;
export default styles;
