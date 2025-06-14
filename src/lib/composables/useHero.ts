import { useEffect, useRef } from 'react';
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

  /**
   * Reference to the hero element
   */
  heroRef: React.RefObject<HTMLDivElement>;

  /**
   * Reference to the video element
   */
  videoRef: React.RefObject<HTMLVideoElement>;

  /**
   * Apply parallax effect
   */
  applyParallaxEffect: (element: HTMLElement, intensity: number) => void;

  /**
   * Remove parallax effect
   */
  removeParallaxEffect: (element: HTMLElement) => void;
}

/**
 * Hook for Hero component functionality
 * @param initialProps - Initial hero props
 * @returns Hero methods
 */
export function useHero(initialProps?: Partial<HeroProps>): UseHeroResult {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxHandlerRef = useRef<((event: Event) => void) | null>(null);

  const defaultProps: Partial<HeroProps> = {
    alignment: 'left',
    imageColSize: 7,
    contentColSize: 5,
    imageAlt: 'Hero image',
    showOverlay: true,
    fullViewportHeight: false,
    contentWidth: undefined,
    parallax: false,
    parallaxIntensity: 0.5,
    ...initialProps,
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
   * Apply parallax effect to hero background
   */
  const applyParallaxEffect = (element: HTMLElement, intensity: number = 0.5): void => {
    if (!element) return;

    // Ensure intensity is between 0 and 1
    const safeIntensity = Math.max(0, Math.min(1, intensity));

    // Add parallax class
    element.classList.add('c-hero--parallax');

    // Handle scroll event
    const handleScroll = (): void => {
      const scrollPosition = window.pageYOffset;
      const offset = scrollPosition * safeIntensity;

      // Apply transform to background
      const bgElement = element.querySelector(HERO.SELECTORS.BG);
      if (bgElement) {
        (bgElement as HTMLElement).style.transform = `translateY(${offset}px)`;
      }
    };

    // Store the handler for cleanup
    parallaxHandlerRef.current = handleScroll;

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Initial call
    handleScroll();
  };

  /**
   * Remove parallax effect from hero
   */
  const removeParallaxEffect = (element: HTMLElement): void => {
    if (!element) return;

    // Remove class
    element.classList.remove('c-hero--parallax');

    // Remove transform
    const bgElement = element.querySelector(HERO.SELECTORS.BG);
    if (bgElement) {
      (bgElement as HTMLElement).style.transform = '';
    }

    // Remove event listener
    if (parallaxHandlerRef.current) {
      window.removeEventListener('scroll', parallaxHandlerRef.current);
      parallaxHandlerRef.current = null;
    }
  };

  // Apply parallax effect if enabled
  useEffect(() => {
    const heroElement = heroRef.current;

    if (heroElement && defaultProps.parallax && hasBackgroundImage) {
      applyParallaxEffect(heroElement, defaultProps.parallaxIntensity);
    }

    return () => {
      if (heroElement && parallaxHandlerRef.current) {
        removeParallaxEffect(heroElement);
      }
    };
  }, [defaultProps.parallax, defaultProps.parallaxIntensity, hasBackgroundImage]);

  /**
   * Generate hero class names based on props
   * @param baseClassName - Additional class names
   * @returns Combined class names string
   */
  const generateHeroClassNames = (baseClassName: string = ''): string => {
    const classes = [HERO.SELECTORS.HERO.replace('.', '')];

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

    // Add parallax class if enabled
    if (defaultProps.parallax) {
      classes.push('c-hero--parallax');
    }

    // Add video background class if provided
    if (defaultProps.videoBackground) {
      classes.push('c-hero--video');
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
    useGridLayout,
    heroRef,
    videoRef,
    applyParallaxEffect,
    removeParallaxEffect,
  };
}
