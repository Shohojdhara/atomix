import { useEffect, useRef } from 'react';
import { HeroProps, HeroAlignment } from '../types/components';
import { HERO } from '../constants/components';
import { useHeroBackgroundSlider, UseHeroBackgroundSliderResult } from './useHeroBackgroundSlider';

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
  generateImageColClass: (size?: number, customClass?: string) => string;

  /**
   * Generate content column class based on size
   */
  generateContentColClass: (size?: number, customClass?: string) => string;

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
  heroRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Reference to the video element
   */
  videoRef: React.RefObject<HTMLVideoElement | null>;

  /**
   * Apply parallax effect
   */
  applyParallaxEffect: (element: HTMLElement, intensity: number) => void;

  /**
   * Remove parallax effect
   */
  removeParallaxEffect: (element: HTMLElement) => void;

  /**
   * Background slider hook result (if slider is enabled)
   */
  backgroundSlider?: UseHeroBackgroundSliderResult;

  /**
   * Whether background slider is enabled
   */
  hasBackgroundSlider: boolean;
}

/**
 * Hook for Hero component functionality
 * @param initialProps - Initial hero props
 * @returns Hero methods
 */
export function useHero(initialProps?: HeroProps): UseHeroResult {
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
    headingLevel: 'h1',
    reverseOnMobile: false,
    ...initialProps,
  };

  /**
   * Check if background slider is enabled
   */
  const hasBackgroundSlider = !!defaultProps.backgroundSlider;

  /**
   * Initialize background slider hook - always call hook, conditionally use result
   */
  const backgroundSliderResult = useHeroBackgroundSlider(
    defaultProps.backgroundSlider || {
      slides: [],
      autoplay: { delay: 5000, pauseOnHover: true },
      transition: 'fade',
      transitionDuration: 1000,
    }
  );

  const backgroundSlider =
    hasBackgroundSlider && defaultProps.backgroundSlider ? backgroundSliderResult : undefined;

  /**
   * Check if the hero has a background image
   * Slider takes precedence over single background image
   */
  const hasBackgroundImage = hasBackgroundSlider
    ? true
    : !!defaultProps.backgroundImageSrc || !!defaultProps.videoBackground;

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

  // Apply parallax effect if enabled (disabled when slider is active)
  useEffect(() => {
    const heroElement = heroRef.current;

    // Disable parallax when slider is active (conflicts with transitions)
    if (heroElement && defaultProps.parallax && hasBackgroundImage && !hasBackgroundSlider) {
      applyParallaxEffect(heroElement, defaultProps.parallaxIntensity);
    }

    return () => {
      if (heroElement && parallaxHandlerRef.current) {
        removeParallaxEffect(heroElement);
      }
    };
  }, [
    defaultProps.parallax,
    defaultProps.parallaxIntensity,
    hasBackgroundImage,
    hasBackgroundSlider,
  ]);

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
   * @param customClass - Optional custom class name
   * @returns Column class
   */
  const generateImageColClass = (
    size: number = defaultProps.imageColSize || 7,
    customClass?: string
  ): string => {
    const classes = [`o-grid__col o-grid__col--md-${size}`];

    // Add responsive margin if needed for mobile view
    if (defaultProps.alignment === 'left') {
      classes.push('u-mt-5 u-mt-md-0');
    }

    // Handle mobile stacking order
    if (defaultProps.reverseOnMobile) {
      if (defaultProps.alignment === 'right' || defaultProps.alignment === 'center') {
        classes.push('u-order-first u-order-md-last');
      } else {
        classes.push('u-order-last u-order-md-first');
      }
    }

    if (customClass) {
      classes.push(customClass);
    }

    return classes.join(' ');
  };

  /**
   * Generate content column class based on size
   * @param size - Column size (1-12)
   * @param customClass - Optional custom class name
   * @returns Column class
   */
  const generateContentColClass = (
    size: number = defaultProps.contentColSize || 5,
    customClass?: string
  ): string => {
    const classes = [`o-grid__col o-grid__col--md-${size}`];

    // Handle mobile stacking order
    if (defaultProps.reverseOnMobile) {
      if (defaultProps.alignment === 'right' || defaultProps.alignment === 'center') {
        classes.push('u-order-last u-order-md-first');
      } else {
        classes.push('u-order-first u-order-md-last');
      }
    }

    if (customClass) {
      classes.push(customClass);
    }

    return classes.join(' ');
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
    backgroundSlider,
    hasBackgroundSlider,
  };
}
