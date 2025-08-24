import { BLOCK } from '../constants/components';

export interface UseBlockOptions {
  spacing?: (typeof BLOCK.SPACING.SIZES)[number];
  background?: string;
  fullWidth?: boolean;
  className?: string;
}

export interface UseBlockReturn {
  generateBlockClass: (options: UseBlockOptions) => string;
}

/**
 * useBlock composable for Block component
 * Provides utility functions for generating consistent block styling
 */
export const useBlock = (): UseBlockReturn => {
  const generateBlockClass = ({
    spacing = BLOCK.SPACING.DEFAULT,
    background = '',
    fullWidth = false,
    className = '',
  }: UseBlockOptions): string => {
    const classes: string[] = [BLOCK.BASE_CLASS];

    // Add spacing class
    if (spacing && spacing !== 'none') {
      classes.push(`${BLOCK.SPACING_PREFIX}${spacing}`);
    }

    // Add background class
    if (background) {
      const bgClass = BLOCK.CLASSES[`BG_${background.toUpperCase()}` as keyof typeof BLOCK.CLASSES];
      if (bgClass) {
        classes.push(bgClass);
      }
    }

    // Add full-width class
    if (fullWidth) {
      classes.push(BLOCK.CLASSES.FULL_WIDTH);
    }

    // Add custom className
    if (className) {
      classes.push(className);
    }

    return classes.filter(Boolean).join(' ');
  };

  return {
    generateBlockClass,
  };
};
