import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SliderProps, SliderSlide, SliderState } from '../types/components';

export interface UseSliderOptions extends Omit<SliderProps, 'slides' | 'children'> {
  slides: SliderSlide[];
}

export interface UseSliderReturn extends SliderState {
  slideNext: () => void;
  slidePrev: () => void;
  goToSlide: (index: number) => void;
  canSlideNext: boolean;
  canSlidePrev: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  handleTouchStart: (e: React.TouchEvent | React.MouseEvent) => void;
  handleTouchMove: (e: React.TouchEvent | React.MouseEvent) => void;
  handleTouchEnd: (e: React.TouchEvent | React.MouseEvent) => void;
  allSlides: SliderSlide[];
  translateValue: number;
  slideWidth: number;
  currentSlidesToShow: number;
  loopedSlides: number;
  repositioningRef: React.RefObject<boolean>;
}

export function useSlider(options: UseSliderOptions): UseSliderReturn {
  const {
    slides,
    slidesToShow = 1,
    spaceBetween = 0,
    loop = false,
    initialSlide = 0,
    direction = 'horizontal',
    speed = 300,
    allowTouchMove = true,
    threshold = 50,
    autoplay,
    onSlideChange,
  } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const repositioningRef = useRef(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [autoplayRunning, setAutoplayRunning] = useState(false);

  const [realIndex, setRealIndex] = useState(initialSlide);
  const [internalIndex, setInternalIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerSize, setContainerSize] = useState(0);
  const [touching, setTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const slideWidth = useMemo(() => {
    if (containerSize === 0) return 0;
    return (containerSize - spaceBetween * (slidesToShow - 1)) / slidesToShow;
  }, [containerSize, spaceBetween, slidesToShow]);

  const allSlides = useMemo(() => {
    if (!loop || slides.length === 0) return slides;

    // Create unique keys for each set
    const firstSet = slides.map((slide, i) => ({ ...slide, id: `set1-${slide.id || i}` }));
    const secondSet = slides.map((slide, i) => ({ ...slide, id: `set2-${slide.id || i}` }));
    const thirdSet = slides.map((slide, i) => ({ ...slide, id: `set3-${slide.id || i}` }));

    return [...firstSet, ...secondSet, ...thirdSet];
  }, [slides, loop]);

  const loopedSlides = slides.length;

  const translateValue = useMemo(() => {
    if (slideWidth === 0) return 0;
    return -(internalIndex * slideWidth) + dragOffset;
  }, [slideWidth, internalIndex, dragOffset]);

  // Autoplay effect
  useEffect(() => {
    if (!autoplay) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      setAutoplayRunning(false);
      return;
    }

    const autoplayParams = typeof autoplay === 'boolean' ? { delay: 3000 } : autoplay;
    const { delay = 3000, pauseOnMouseEnter = false, disableOnInteraction = false, reverseDirection = false } = autoplayParams;

    // Clear any existing interval
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    // Create new interval
    autoplayRef.current = setInterval(() => {
      // We need to use a functional update to get the latest values
      setRealIndex(prevRealIndex => {
        if (isTransitioning) return prevRealIndex;
        
        // Stop autoplay on interaction if disableOnInteraction is true
        if (disableOnInteraction && autoplayRef.current) {
          clearInterval(autoplayRef.current);
          autoplayRef.current = null;
          setAutoplayRunning(false);
        }

        let nextIndex;
        if (loop) {
          nextIndex = (prevRealIndex + 1) % slides.length;
        } else {
          nextIndex = Math.min(prevRealIndex + 1, slides.length - slidesToShow);
        }
        
        // Trigger the slide change
        if (reverseDirection) {
          // For reverse direction, we would go to previous slide
          const prevIndex = loop ? (prevRealIndex === 0 ? slides.length - 1 : prevRealIndex - 1) : Math.max(prevRealIndex - 1, 0);
          setInternalIndex(loop ? slides.length + prevIndex : prevIndex);
          setIsTransitioning(true);
          setDragOffset(0);

          setTimeout(() => {
            setIsTransitioning(false);
            onSlideChange?.(prevIndex);
          }, speed);
          
          return prevIndex;
        } else {
          // Normal direction
          setInternalIndex(loop ? slides.length + nextIndex : nextIndex);
          setIsTransitioning(true);
          setDragOffset(0);

          setTimeout(() => {
            setIsTransitioning(false);
            onSlideChange?.(nextIndex);
            
            // Reposition after transition ends for looped sliders
            if (loop && nextIndex >= slides.length * 2) {
              repositioningRef.current = true;
              setInternalIndex(slides.length + nextIndex);
              setTimeout(() => {
                repositioningRef.current = false;
              }, 0);
            }
          }, speed);
          
          return nextIndex;
        }
      });
    }, delay);
    
    setAutoplayRunning(true);

    // Handle pause on mouse enter/leave if enabled
    let containerElement: HTMLDivElement | null = null;
    const handleMouseEnter = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
        setAutoplayRunning(false);
      }
    };
    
    const handleMouseLeave = () => {
      // Restart autoplay
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
      
      autoplayRef.current = setInterval(() => {
        setRealIndex(prevRealIndex => {
          if (isTransitioning) return prevRealIndex;
          
          let nextIndex;
          if (loop) {
            nextIndex = (prevRealIndex + 1) % slides.length;
          } else {
            nextIndex = Math.min(prevRealIndex + 1, slides.length - slidesToShow);
          }
          
          setInternalIndex(loop ? slides.length + nextIndex : nextIndex);
          setIsTransitioning(true);
          setDragOffset(0);

          setTimeout(() => {
            setIsTransitioning(false);
            onSlideChange?.(nextIndex);
            
            if (loop) {
              // Reposition after transition ends
              if (nextIndex >= slides.length * 2) {
                repositioningRef.current = true;
                setInternalIndex(slides.length + nextIndex);
                setTimeout(() => {
                  repositioningRef.current = false;
                }, 0);
              }
            }
          }, speed);
          
          return nextIndex;
        });
      }, delay);
      
      setAutoplayRunning(true);
    };

    if (pauseOnMouseEnter && containerRef.current) {
      containerElement = containerRef.current;
      containerElement.addEventListener('mouseenter', handleMouseEnter);
      containerElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      if (containerElement) {
        containerElement.removeEventListener('mouseenter', handleMouseEnter);
        containerElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      setAutoplayRunning(false);
    };
  }, [autoplay, slides.length, loop, slidesToShow, isTransitioning, speed, onSlideChange, repositioningRef]);

  // Initialize
  useEffect(() => {
    if (loop) {
      setInternalIndex(slides.length + initialSlide); // Start in middle set
    } else {
      setInternalIndex(initialSlide);
    }
  }, [loop, slides.length, initialSlide]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const size =
          direction === 'horizontal'
            ? containerRef.current.offsetWidth
            : containerRef.current.offsetHeight;
        setContainerSize(size);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [direction]);

  const slideNext = useCallback(() => {
    if (isTransitioning) return;

    // Stop autoplay on interaction if disableOnInteraction is true
    if (autoplay && typeof autoplay === 'object' && autoplay.disableOnInteraction && autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
      setAutoplayRunning(false);
    }

    if (loop) {
      const nextRealIndex = (realIndex + 1) % slides.length;
      const nextInternalIndex = internalIndex + 1;

      setRealIndex(nextRealIndex);
      setInternalIndex(nextInternalIndex);
      setIsTransitioning(true);
      setDragOffset(0);

      setTimeout(() => {
        setIsTransitioning(false);
        onSlideChange?.(nextRealIndex);

        // Reposition after transition ends
        if (nextInternalIndex >= slides.length * 2) {
          repositioningRef.current = true;
          setInternalIndex(slides.length + nextRealIndex);
          setTimeout(() => {
            repositioningRef.current = false;
          }, 0);
        }
      }, speed);
    } else {
      const nextIndex = Math.min(realIndex + 1, slides.length - slidesToShow);
      setRealIndex(nextIndex);
      setInternalIndex(nextIndex);
      setIsTransitioning(true);
      setDragOffset(0);

      setTimeout(() => {
        setIsTransitioning(false);
        onSlideChange?.(nextIndex);
      }, speed);
    }
  }, [
    realIndex,
    internalIndex,
    slides.length,
    slidesToShow,
    loop,
    isTransitioning,
    speed,
    onSlideChange,
    allSlides.length,
    loopedSlides,
    autoplay
  ]);

  const slidePrev = useCallback(() => {
    if (isTransitioning) return;

    // Stop autoplay on interaction if disableOnInteraction is true
    if (autoplay && typeof autoplay === 'object' && autoplay.disableOnInteraction && autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
      setAutoplayRunning(false);
    }

    if (loop) {
      const prevRealIndex = realIndex === 0 ? slides.length - 1 : realIndex - 1;
      const prevInternalIndex = internalIndex - 1;

      setRealIndex(prevRealIndex);
      setInternalIndex(prevInternalIndex);
      setIsTransitioning(true);
      setDragOffset(0);

      setTimeout(() => {
        setIsTransitioning(false);
        onSlideChange?.(prevRealIndex);

        // Reposition after transition ends
        if (prevInternalIndex < slides.length) {
          repositioningRef.current = true;
          setInternalIndex(slides.length + prevRealIndex);
          setTimeout(() => {
            repositioningRef.current = false;
          }, 0);
        }
      }, speed);
    } else {
      const prevIndex = Math.max(realIndex - 1, 0);
      setRealIndex(prevIndex);
      setInternalIndex(prevIndex);
      setIsTransitioning(true);
      setDragOffset(0);

      setTimeout(() => {
        setIsTransitioning(false);
        onSlideChange?.(prevIndex);
      }, speed);
    }
  }, [
    realIndex,
    internalIndex,
    slides.length,
    loop,
    isTransitioning,
    speed,
    onSlideChange,
    allSlides.length,
    loopedSlides,
    autoplay
  ]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === realIndex) return;

      // Stop autoplay on interaction if disableOnInteraction is true
      if (autoplay && typeof autoplay === 'object' && autoplay.disableOnInteraction && autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
        setAutoplayRunning(false);
      }

      setIsTransitioning(true);
      setDragOffset(0);

      setRealIndex(index);
      setInternalIndex(loop ? slides.length + index : index);

      setTimeout(() => {
        setIsTransitioning(false);
        onSlideChange?.(index);
      }, speed);
    },
    [realIndex, isTransitioning, speed, onSlideChange, loop, loopedSlides, autoplay]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!allowTouchMove) return;

      // Stop autoplay on interaction if disableOnInteraction is true
      if (autoplay && typeof autoplay === 'object' && autoplay.disableOnInteraction && autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
        setAutoplayRunning(false);
      }

      const client =
        direction === 'horizontal'
          ? 'touches' in e
            ? e.touches[0]?.clientX || 0
            : e.clientX
          : 'touches' in e
            ? e.touches[0]?.clientY || 0
            : e.clientY;
      setTouchStart(client);
      setTouching(true);
      setDragOffset(0);
    },
    [allowTouchMove, direction, autoplay]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!touching || !allowTouchMove) return;

      const client =
        direction === 'horizontal'
          ? 'touches' in e
            ? e.touches[0]?.clientX || 0
            : e.clientX
          : 'touches' in e
            ? e.touches[0]?.clientY || 0
            : e.clientY;
      const diff = touchStart - client;

      if (Math.abs(diff) > 10) {
        e.preventDefault();
        setDragOffset(-diff * 0.5);
      }
    },
    [touching, touchStart, allowTouchMove, direction]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!touching || !allowTouchMove) return;

      const client =
        direction === 'horizontal'
          ? 'changedTouches' in e
            ? e.changedTouches[0]?.clientX || 0
            : e.clientX
          : 'changedTouches' in e
            ? e.changedTouches[0]?.clientY || 0
            : e.clientY;
      const diff = touchStart - client;

      setTouching(false);
      setDragOffset(0);

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          slideNext();
        } else {
          slidePrev();
        }
      }
    },
    [touching, touchStart, threshold, slideNext, slidePrev, allowTouchMove, direction]
  );

  const canSlideNext = loop || realIndex < slides.length - slidesToShow;
  const canSlidePrev = loop || realIndex > 0;

  return {
    activeIndex: realIndex,
    realIndex,
    previousIndex: realIndex,
    isBeginning: !loop && realIndex === 0,
    isEnd: !loop && realIndex >= slides.length - slidesToShow,
    progress: slides.length > 0 ? realIndex / (slides.length - 1) : 0,
    autoplayRunning,
    transitioning: isTransitioning,
    touching,
    translate: translateValue,
    slidesPerView: slidesToShow,
    slidesCount: slides.length,
    isLocked: false,
    destroyed: false,
    size: containerSize,
    touches: {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      diff: 0,
    },
    allowSlideNext: canSlideNext,
    allowSlidePrev: canSlidePrev,
    allowTouchMove,
    animating: isTransitioning,
    enabled: true,
    initialized: true,

    slideNext,
    slidePrev,
    goToSlide,
    canSlideNext,
    canSlidePrev,

    containerRef,
    wrapperRef,

    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,

    allSlides,
    translateValue,
    slideWidth,
    currentSlidesToShow: slidesToShow,
    loopedSlides,
    repositioningRef,
  };
}