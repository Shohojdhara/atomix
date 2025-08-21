import { BLOCK } from '../constants/components';

export interface UseBlockOptions {
  spacing?: (typeof BLOCK.SPACING.SIZES)[number];
  background?: string;
  fullWidth?: boolean;
  className?: string;
}

export function useBlock() {
  const generateBlockClass = (options: UseBlockOptions): string => {
    const { spacing = 'md', background = '', fullWidth = false, className = '' } = options;

    const spacingMap = {
      xs: BLOCK.CLASSES.SPACING_XS,
      sm: BLOCK.CLASSES.SPACING_SM,
      md: BLOCK.CLASSES.SPACING_MD,
      lg: BLOCK.CLASSES.SPACING_LG,
      xl: BLOCK.CLASSES.SPACING_XL,
      none: BLOCK.CLASSES.SPACING_NONE,
    };

    const bgMap = {
      primary: BLOCK.CLASSES.BG_PRIMARY,
      secondary: BLOCK.CLASSES.BG_SECONDARY,
      tertiary: BLOCK.CLASSES.BG_TERTIARY,
      invert: BLOCK.CLASSES.BG_INVERT,
      brand: BLOCK.CLASSES.BG_BRAND,
      error: BLOCK.CLASSES.BG_ERROR,
      success: BLOCK.CLASSES.BG_SUCCESS,
      warning: BLOCK.CLASSES.BG_WARNING,
      info: BLOCK.CLASSES.BG_INFO,
      light: BLOCK.CLASSES.BG_LIGHT,
      dark: BLOCK.CLASSES.BG_DARK,
    };

    return [
      BLOCK.BASE_CLASS,
      bgMap[background as keyof typeof bgMap],
      spacingMap[spacing],
      fullWidth && BLOCK.CLASSES.FULL_WIDTH,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  };

  return {
    generateBlockClass,
  };
}