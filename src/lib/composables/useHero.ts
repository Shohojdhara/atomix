import { HeroProps, HeroAlignment } from '../types/components';
import { HERO } from '../constants/components';

/**
 * Hero hook result interface
 */
interface UseHeroResult {
  /**
   * Generate hero class names based on props
   */
  generateHeroClassNames: (baseClassName?: string) => string;
  
  /**
   * Generate image column class based on size
   */
  generateImageColClass: (size?: number) => string;
  
  /**
   * Generate content column class based on size
   */
  generateContentColClass: (size?: number) => string;
  
  /**
   * Determine if the hero has a background image
   */
  hasBackgroundImage: boolean;
  
  /**
   * Determine if the hero has a foreground image
   */
  hasForegroundImage: boolean;
  
  /**
   * Determine if content should be displayed in a grid
   */
  useGridLayout: boolean;
}

/**
 * Hook for Hero component functionality
 * @param initialProps - Initial hero props
 * @returns Hero methods
 */
export function useHero(initialProps?: Partial<HeroProps>): UseHeroResult {
  const defaultProps: Partial<HeroProps> = {
    alignment: 'left',
    imageColSize: 7,
    contentColSize: 5,
    imageAlt: 'Hero image',
    showOverlay: true,
    fullViewportHeight: false,
    contentWidth: undefined,
    ...initialProps
  };

  /**
   * Check if the hero has a background image
   */
  const hasBackgroundImage = !!defaultProps.backgroundImageSrc;
  
  /**
   * Check if the hero has a foreground image
   */
  const hasForegroundImage = !!defaultProps.imageSrc;
  
  /**
   * Check if content should be displayed in a grid
   */
  const useGridLayout = hasForegroundImage && defaultProps.alignment !== 'center';

  /**
   * Generate hero class names based on props
   * @param baseClassName - Additional class names
   * @returns Combined class names string
   */
  const generateHeroClassNames = (baseClassName: string = ''): string => {
    const classes = [
      HERO.SELECTORS.HERO.replace('.', '')
    ];

    // Add alignment class
    if (defaultProps.alignment === 'center') {
      classes.push(HERO.CLASSES.CENTER);
    } else if (defaultProps.alignment === 'right') {
      classes.push(HERO.CLASSES.RIGHT);
    } else if (defaultProps.alignment === 'left') {
      classes.push(HERO.CLASSES.LEFT);
    }
    
    // Add full viewport height class if needed
    if (defaultProps.fullViewportHeight) {
      classes.push(HERO.CLASSES.FULL_VH);
    }

    if (baseClassName) {
      classes.push(baseClassName);
    }

    return classes.join(' ');
  };

  /**
   * Determine content column order based on alignment
   */
  const contentFirst = defaultProps.alignment === 'left';

  /**
   * Generate image column class based on size
   * @param size - Column size (1-12)
   * @returns Column class
   */
  const generateImageColClass = (size: number = defaultProps.imageColSize || 7): string => {
    const classes = [`o-grid__col o-grid__col--md-${size}`];
    
    // Add responsive margin if needed for mobile view
    if (defaultProps.alignment === 'left') {
      classes.push('u-mt-5 u-mt-md-0');
    }
    
    return classes.join(' ');
  };

  /**
   * Generate content column class based on size
   * @param size - Column size (1-12)
   * @returns Column class
   */
  const generateContentColClass = (size: number = defaultProps.contentColSize || 5): string => {
    return `o-grid__col o-grid__col--md-${size}`;
  };

  return {
    generateHeroClassNames,
    generateImageColClass,
    generateContentColClass,
    hasBackgroundImage,
    hasForegroundImage,
    useGridLayout
  };
} 