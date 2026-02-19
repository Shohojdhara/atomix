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
