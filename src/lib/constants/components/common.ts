import { Size, ThemeColor } from '../../types/components';

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
