import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { HeroBackgroundSliderConfig } from '../types/components';

/**
 * Hook result interface for hero background slider
 */
export interface UseHeroBackgroundSliderResult {
  /**
   * Current active slide index
   */
  currentIndex: number;

  /**
   * Whether a transition is currently in progress
   */
  isTransitioning: boolean;

  /**
   * Array of refs for slide container elements
   */
  slideRefs: React.RefObject<HTMLDivElement>[];

  /**
   * Array of refs for video elements
   */
  videoRefs: React.RefObject<HTMLVideoElement>[];

  /**
   * Handle slide transition to next index
   */
  handleSlideTransition: (nextIndex: number) => void;

  /**
   * Pause autoplay
   */
  pauseAutoplay: () => void;

  /**
   * Resume autoplay
   */
  resumeAutoplay: () => void;
}

/**
 * Hook for Hero background slider functionality
 * @param config - Background slider configuration
 * @returns Slider state and methods
 */
export function useHeroBackgroundSlider(
  config: HeroBackgroundSliderConfig
): UseHeroBackgroundSliderResult {
  const {
    slides,
    autoplay,
    loop = true,
    transition = 'fade',
    transitionDuration = 1000,
  } = config;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  // Create refs for slide containers
  const slideRefs = useMemo(
    () => slides.map(() => React.createRef<HTMLDivElement>()),
    [slides.length]
  );

  // Create refs for video elements
  const videoRefs = useMemo(
    () => slides.map(() => React.createRef<HTMLVideoElement>()),
    [slides.length]
  );

  /**
   * Handle slide transition
   */
  const handleSlideTransition = useCallback(
    (nextIndex: number) => {
      if (nextIndex === currentIndex || isTransitioning) return;
      if (nextIndex < 0 || nextIndex >= slides.length) return;

      setIsTransitioning(true);

      // Update current index
      setCurrentIndex(nextIndex);

      // Play video if it's a video slide
      const currentVideo = videoRefs[nextIndex]?.current;
      if (currentVideo && slides[nextIndex].type === 'video') {
        const videoOptions = slides[nextIndex].videoOptions || {};
        if (videoOptions.autoplay !== false) {
          currentVideo.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      }

      // Pause previous video if it exists
      const prevVideo = videoRefs[currentIndex]?.current;
      if (prevVideo && slides[currentIndex].type === 'video') {
        prevVideo.pause();
      }

      // Reset transitioning state after transition duration
      setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);
    },
    [currentIndex, isTransitioning, slides, videoRefs, transitionDuration]
  );

  /**
   * Move to next slide
   */
  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;

    let nextIndex: number;
    if (loop) {
      nextIndex = (currentIndex + 1) % slides.length;
    } else {
      nextIndex = Math.min(currentIndex + 1, slides.length - 1);
    }

    handleSlideTransition(nextIndex);
  }, [currentIndex, slides.length, loop, handleSlideTransition]);

  /**
   * Pause autoplay
   */
  const pauseAutoplay = useCallback(() => {
    isPausedRef.current = true;
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  /**
   * Resume autoplay
   */
  const resumeAutoplay = useCallback(() => {
    if (isPausedRef.current && autoplay && slides.length > 1) {
      isPausedRef.current = false;
      const delay = typeof autoplay === 'object' ? autoplay.delay : 3000;
      
      // Restart autoplay
      if (!autoplayRef.current) {
        autoplayRef.current = setInterval(() => {
          if (!isPausedRef.current && !isTransitioning) {
            nextSlide();
          }
        }, delay);
      }
    }
  }, [autoplay, slides.length, nextSlide, isTransitioning]);

  // Autoplay effect
  useEffect(() => {
    if (!autoplay || slides.length <= 1) {
      return;
    }

    const delay = typeof autoplay === 'object' ? autoplay.delay : 3000;
    const pauseOnHover = typeof autoplay === 'object' ? autoplay.pauseOnHover : false;

    // Clear any existing interval
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }

    // Start autoplay if not paused
    if (!isPausedRef.current) {
      autoplayRef.current = setInterval(() => {
        if (!isPausedRef.current && !isTransitioning) {
          nextSlide();
        }
      }, delay);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [autoplay, slides.length, nextSlide, isTransitioning]);

  // Initialize first video if needed
  useEffect(() => {
    if (slides.length > 0 && slides[currentIndex]?.type === 'video') {
      const video = videoRefs[currentIndex]?.current;
      if (video) {
        const videoOptions = slides[currentIndex].videoOptions || {};
        if (videoOptions.autoplay !== false) {
          video.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      }
    }
  }, [currentIndex, slides, videoRefs]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, []);

  return {
    currentIndex,
    isTransitioning,
    slideRefs,
    videoRefs,
    handleSlideTransition,
    pauseAutoplay,
    resumeAutoplay,
  };
}

