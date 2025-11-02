import { ReactNode } from 'react';
import { RIVER } from '../constants/components';

/**
 * River content column interface
 */
export interface RiverContentColumn {
  /**
   * Column type (title or text)
   */
  type: 'title' | 'text';

  /**
   * Content for the column
   */
  content: ReactNode;
}

/**
 * River properties interface
 */
export interface RiverProps {
  /**
   * Title of the river section
   */
  title?: ReactNode;

  /**
   * Text content (can be a string or array of paragraphs)
   */
  text?: string | string[];

  /**
   * Action buttons/links
   */
  actions?: ReactNode;

  /**
   * Image source URL
   */
  imageSrc?: string;

  /**
   * Image alt text
   */
  imageAlt?: string;

  /**
   * Whether to use the center layout
   */
  center?: boolean;

  /**
   * Whether to use the breakout layout
   */
  breakout?: boolean;

  /**
   * Whether to use the reverse layout (image on right)
   */
  reverse?: boolean;

  /**
   * Use content columns instead of simple title/text structure
   */
  contentColumns?: RiverContentColumn[];

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline style for the component
   */
  style?: React.CSSProperties;

  /**
   * Background image source
   */
  backgroundImageSrc?: string;

  /**
   * Whether to show the background overlay
   */
  showOverlay?: boolean;

  /**
   * Custom width for the river content
   */
  contentWidth?: string;
}

/**
 * River hook result interface
 */
interface UseRiverResult {
  /**
   * Generate river class names based on props
   */
  generateRiverClassNames: (baseClassName?: string) => string;

  /**
   * Generate content class names
   */
  generateContentClass: () => string;

  /**
   * Generate visual/image class names
   */
  generateVisualClass: () => string;

  /**
   * Determine if the river has a background image
   */
  hasBackgroundImage: boolean;

  /**
   * Determine if the river has a foreground image
   */
  hasForegroundImage: boolean;

  /**
   * Convert text to array if it's a string
   */
  textContent: string[];
}

/**
 * Hook for River component functionality
 * @param initialProps - Initial river props
 * @returns River methods and state
 */
export function useRiver(initialProps?: Partial<RiverProps>): UseRiverResult {
  const defaultProps: Partial<RiverProps> = {
    center: false,
    breakout: false,
    reverse: false,
    imageAlt: 'Image',
    showOverlay: true,
    ...initialProps,
  };

  /**
   * Check if the river has a background image
   */
  const hasBackgroundImage = !!defaultProps.backgroundImageSrc;

  /**
   * Check if the river has a foreground image
   */
  const hasForegroundImage = !!defaultProps.imageSrc;

  /**
   * Convert text to array if it's a string
   */
  const textContent =
    typeof defaultProps.text === 'string' ? [defaultProps.text] : defaultProps.text || [];

  /**
   * Generate river class names based on props
   * @param baseClassName - Additional class names
   * @returns Combined class names string
   */
  const generateRiverClassNames = (baseClassName: string = ''): string => {
    const classes = [RIVER.SELECTORS.RIVER.replace('.', '')];

    // Add layout classes
    if (defaultProps.center) {
      classes.push(RIVER.CLASSES.CENTER);
    }

    if (defaultProps.breakout) {
      classes.push(RIVER.CLASSES.BREAKOUT);
    }

    if (defaultProps.reverse) {
      classes.push(RIVER.CLASSES.REVERSE);
    }

    if (baseClassName) {
      classes.push(baseClassName);
    }

    return classes.join(' ');
  };

  /**
   * Generate content class names
   */
  const generateContentClass = (): string => {
    return RIVER.SELECTORS.CONTENT.replace('.', '');
  };

  /**
   * Generate visual/image class names
   */
  const generateVisualClass = (): string => {
    return RIVER.SELECTORS.VISUAL.replace('.', '');
  };

  return {
    generateRiverClassNames,
    generateContentClass,
    generateVisualClass,
    hasBackgroundImage,
    hasForegroundImage,
    textContent,
  };
}
