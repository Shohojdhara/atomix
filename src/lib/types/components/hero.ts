import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';
import { BaseComponentProps } from './common';


/**
 * Hero alignment options
 */
export type HeroAlignment = 'left' | 'center' | 'right';


/**
 * Hero background slide item
 */
export interface HeroBackgroundSlide {
  /**
   * Type of slide - image or video
   */
  type: 'image' | 'video';

  /**
   * Source URL for the image or video
   */
  src: string;

  /**
   * Alt text for images (optional)
   */
  alt?: string;

  /**
   * Video options (only used when type is 'video')
   */
  videoOptions?: {
    /**
     * Whether the video should autoplay
     */
    autoplay?: boolean;

    /**
     * Whether the video should loop
     */
    loop?: boolean;

    /**
     * Whether the video should be muted
     */
    muted?: boolean;

    /**
     * Poster image URL for the video
     */
    posterUrl?: string;
  };
}


/**
 * Hero background slider configuration
 */
export interface HeroBackgroundSliderConfig {
  /**
   * Array of slides (mixed images and videos)
   */
  slides: HeroBackgroundSlide[];

  /**
   * Autoplay configuration
   */
  autoplay?: {
    /**
     * Delay between transitions in milliseconds
     */
    delay: number;

    /**
     * Whether to pause autoplay on hover
     */
    pauseOnHover?: boolean;
  };

  /**
   * Whether to loop the slider infinitely
   */
  loop?: boolean;

  /**
   * Transition effect type
   */
  transition?: 'fade' | 'slide' | 'custom';

  /**
   * Transition duration in milliseconds
   */
  transitionDuration?: number;

  /**
   * Custom transition function (for custom transition type)
   * Returns CSS transition string or style object
   */
  customTransition?: (currentIndex: number, nextIndex: number) => string | React.CSSProperties;
}


/**
 * Hero component properties
 */
export interface HeroProps extends BaseComponentProps {
  /**
   * Hero title
   */
  title: string;

  /**
   * Hero subtitle
   */
  subtitle?: string;

  /**
   * Hero text content
   */
  text?: string;

  /**
   * Image source for the hero
   */
  imageSrc?: string;

  /**
   * Image alt text
   */
  imageAlt?: string;

  /**
   * Content alignment
   */
  alignment?: HeroAlignment;

  /**
   * Background image source
   */
  backgroundImageSrc?: string;

  /**
   * Whether to show the background overlay
   */
  showOverlay?: boolean;

  /**
   * Whether the hero should take full viewport height
   */
  fullViewportHeight?: boolean;

  /**
   * Actions to display in the hero
   */
  actions?: ReactNode;

  /**
   * Custom grid column size for image (default is 7)
   */
  imageColSize?: number;

  /**
   * Custom grid column size for content (default is 5)
   */
  contentColSize?: number;

  /**
   * Custom width for the hero content (overrides the default CSS variable)
   */
  contentWidth?: string;

  /**
   * Enable parallax effect on background image
   */
  parallax?: boolean;

  /**
   * Parallax effect intensity (0-1)
   */
  parallaxIntensity?: number;

  /**
   * Video background URL
   */
  videoBackground?: string;

  /**
   * Glass effect properties for content container
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Video background options
   */
  videoOptions?: {
    /**
     * Whether the video should autoplay
     */
    autoplay?: boolean;

    /**
     * Whether the video should loop
     */
    loop?: boolean;

    /**
     * Whether the video should be muted
     */
    muted?: boolean;

    /**
     * Poster image URL for the video
     */
    posterUrl?: string;
  };

  /**
   * Component children
   */
  children?: ReactNode;

  /**
   * Background slider configuration
   * When provided, enables background slider with multiple images/videos
   * Takes precedence over backgroundImageSrc and videoBackground props
   */
  backgroundSlider?: HeroBackgroundSliderConfig;
}
