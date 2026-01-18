/**
 * Atomix CLI - Migration Mappings
 * Stores mappings for migrating from other frameworks to Atomix
 */

/**
 * Tailwind to Atomix mapping
 */
export const tailwindToAtomix = {
    // Layout
    'flex': 'c-flex',
    'grid': 'c-grid',
    'container': 'c-container',
    'hidden': 'u-hidden',
    'block': 'u-block',
    'inline-block': 'u-inline-block',
    'inline': 'u-inline',
    'items-center': 'u-items-center',
    'justify-center': 'u-justify-center',
    'justify-between': 'u-justify-between',
    'gap-1': 'u-gap-1',
    'gap-2': 'u-gap-2',
    'gap-4': 'u-gap-4',
    'flex-row': 'u-flex-row',
    'flex-col': 'u-flex-column',
    // Spacing
    'p-0': 'u-p-0',
    'p-1': 'u-p-1',
    'p-2': 'u-p-2',
    'p-3': 'u-p-3',
    'p-4': 'u-p-4',
    'p-5': 'u-p-5',
    'p-6': 'u-p-6',
    'p-8': 'u-p-8',
    'px-6': 'u-px-6',
    'my-8': 'u-my-8',
    'space-x-4': 'u-space-x-4',
    'm-0': 'u-m-0',
    'm-1': 'u-m-1',
    'm-2': 'u-m-2',
    'm-3': 'u-m-3',
    'm-4': 'u-m-4',
    'm-auto': 'u-m-auto',
    // Colors
    'text-gray-900': 'u-text-primary',
    'bg-blue-500': 'u-bg-primary',
    'border-red-600': 'u-border-error',
    'text-green-600': 'u-text-success',
    // Typography
    'text-xs': 'u-text-xs',
    'text-sm': 'u-text-sm',
    'text-base': 'u-text-base',
    'text-lg': 'u-text-lg',
    'text-xl': 'u-text-xl',
    'text-2xl': 'u-text-2xl',
    'font-bold': 'u-font-bold',
    'font-semibold': 'u-font-semibold',
    'font-normal': 'u-font-normal',
    'leading-tight': 'u-line-tight',
    'tracking-wide': 'u-letter-wide',
    // Border
    'border': 'u-border',
    'border-2': 'u-border-2',
    'rounded': 'u-radius',
    'rounded-md': 'u-radius-md',
    'rounded-lg': 'u-radius-lg',
    'rounded-full': 'u-radius-full',
};

/**
 * Bootstrap to Atomix mapping
 */
export const bootstrapToAtomix = {
    // Components
    'btn': 'c-button',
    'btn-primary': 'c-button c-button--primary',
    'btn-secondary': 'c-button c-button--secondary',
    'btn-success': 'c-button c-button--success',
    'btn-danger': 'c-button c-button--error',
    'btn-warning': 'c-button c-button--warning',
    'btn-info': 'c-button c-button--info',
    'btn-lg': 'c-button c-button--lg',
    'btn-sm': 'c-button c-button--sm',

    'card': 'c-card',
    'card-header': 'c-card__header',
    'card-body': 'c-card__body',
    'card-footer': 'c-card__footer',
    'card-title': 'c-card__title',
    'card-text': 'c-card__text',

    'alert': 'c-alert',
    'alert-primary': 'c-alert c-alert--primary',
    'alert-success': 'c-alert c-alert--success',
    'alert-danger': 'c-alert c-alert--error',
    'alert-warning': 'c-alert c-alert--warning',

    'badge': 'c-badge',
    'badge-primary': 'c-badge c-badge--primary',
    'badge-secondary': 'c-badge c-badge--secondary',

    'form-control': 'c-input',
    'form-select': 'c-select',
    'form-check': 'c-checkbox',
    'form-check-input': 'c-checkbox',
    'form-label': 'c-label',

    'modal': 'c-modal',
    'modal-dialog': 'c-modal__dialog',
    'modal-content': 'c-modal__content',
    'modal-header': 'c-modal__header',
    'modal-body': 'c-modal__body',
    'modal-footer': 'c-modal__footer',

    // Grid
    'container': 'c-container',
    'container-fluid': 'c-container c-container--fluid',
    'row': 'c-grid',
    'col': 'c-grid__item',
    'col-sm': 'c-grid__item',
    'col-md': 'c-grid__item',
    'col-lg': 'c-grid__item',
    'col-xl': 'c-grid__item',

    // Utilities
    'd-none': 'u-hidden',
    'd-block': 'u-block',
    'd-inline': 'u-inline',
    'd-inline-block': 'u-inline-block',
    'd-flex': 'c-flex',
    'd-grid': 'c-grid',

    'text-center': 'u-text-center',
    'text-left': 'u-text-left',
    'text-right': 'u-text-right',
    'text-justify': 'u-text-justify',

    'text-primary': 'u-text-primary',
    'text-success': 'u-text-success',
    'text-danger': 'u-text-error',
    'text-warning': 'u-text-warning',
    'text-muted': 'u-text-muted',

    'bg-primary': 'u-bg-primary',
    'bg-success': 'u-bg-success',
    'bg-danger': 'u-bg-error',
    'bg-warning': 'u-bg-warning',

    'p-0': 'u-p-0',
    'p-1': 'u-p-1',
    'p-2': 'u-p-2',
    'p-3': 'u-p-3',
    'p-4': 'u-p-4',
    'p-5': 'u-p-5',

    'm-0': 'u-m-0',
    'm-1': 'u-m-1',
    'm-2': 'u-m-2',
    'm-3': 'u-m-3',
    'm-4': 'u-m-4',
    'm-5': 'u-m-5',
    'm-auto': 'u-m-auto',

    'rounded': 'u-radius',
    'rounded-circle': 'u-radius-full',
    'border': 'u-border',

    'w-25': 'u-w-25',
    'w-50': 'u-w-50',
    'w-75': 'u-w-75',
    'w-100': 'u-w-100',
    'h-25': 'u-h-25',
    'h-50': 'u-h-50',
    'h-75': 'u-h-75',
    'h-100': 'u-h-100'
};

/**
 * SCSS Variable Migration
 */
export const scssVariableMigration = {
    // Colors
    '$primary': 'var(--atomix-color-primary)',
    '$secondary': 'var(--atomix-color-secondary)',
    '$success': 'var(--atomix-color-success)',
    '$danger': 'var(--atomix-color-error)',
    '$warning': 'var(--atomix-color-warning)',
    '$info': 'var(--atomix-color-info)',
    '$light': 'var(--atomix-color-light)',
    '$dark': 'var(--atomix-color-dark)',

    // Spacing
    '$spacer': 'var(--atomix-space-4)',
    '$spacing-xs': 'var(--atomix-space-1)',
    '$spacing-sm': 'var(--atomix-space-2)',
    '$spacing-md': 'var(--atomix-space-4)',
    '$spacing-lg': 'var(--atomix-space-6)',
    '$spacing-xl': 'var(--atomix-space-8)',

    // Typography
    '$font-family-base': 'var(--atomix-font-family-base)',
    '$font-size-base': 'var(--atomix-font-size-base)',
    '$font-weight-normal': 'var(--atomix-font-weight-normal)',
    '$font-weight-bold': 'var(--atomix-font-weight-bold)',
    '$line-height-base': 'var(--atomix-line-height-base)',

    // Border
    '$border-radius': 'var(--atomix-radius-md)',
    '$border-width': 'var(--atomix-border-width)',
    '$border-color': 'var(--atomix-color-border)'
};
