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
    onSlideChange,
  } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const repositioningRef = useRef(false);

  const [realIndex, setRealIndex] = useState(initialSlide);
  const [internalIndex, setInternalIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerSize, setContainerSize] = useState(0);
  const [touching, setTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const slideWidth = useMemo(() => {
    if (containerSize === 0) return 0;
    return (containerSize - (spaceBetween * (slidesToShow - 1))) / slidesToShow;
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
        const size = direction === 'horizontal' 
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
  }, [realIndex, internalIndex, slides.length, slidesToShow, loop, isTransitioning, speed, onSlideChange, allSlides.length, loopedSlides]);

  const slidePrev = useCallback(() => {
    if (isTransitioning) return;
    
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
  }, [realIndex, internalIndex, slides.length, loop, isTransitioning, speed, onSlideChange, allSlides.length, loopedSlides]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === realIndex) return;
    
    setIsTransitioning(true);
    setDragOffset(0);
    
    setRealIndex(index);
    setInternalIndex(loop ? slides.length + index : index);
    
    setTimeout(() => {
      setIsTransitioning(false);
      onSlideChange?.(index);
    }, speed);
  }, [realIndex, isTransitioning, speed, onSlideChange, loop, loopedSlides]);

  const handleTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!allowTouchMove) return;
    
    const client = direction === 'horizontal'
      ? ('touches' in e ? e.touches[0].clientX : e.clientX)
      : ('touches' in e ? e.touches[0].clientY : e.clientY);
    setTouchStart(client);
    setTouching(true);
    setDragOffset(0);
  }, [allowTouchMove, direction]);

  const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!touching || !allowTouchMove) return;
    
    const client = direction === 'horizontal'
      ? ('touches' in e ? e.touches[0].clientX : e.clientX)
      : ('touches' in e ? e.touches[0].clientY : e.clientY);
    const diff = touchStart - client;
    
    if (Math.abs(diff) > 10) {
      e.preventDefault();
      setDragOffset(-diff * 0.5);
    }
  }, [touching, touchStart, allowTouchMove, direction]);

  const handleTouchEnd = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!touching || !allowTouchMove) return;
    
    const client = direction === 'horizontal'
      ? ('changedTouches' in e ? e.changedTouches[0].clientX : e.clientX)
      : ('changedTouches' in e ? e.changedTouches[0].clientY : e.clientY);
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
  }, [touching, touchStart, threshold, slideNext, slidePrev, allowTouchMove, direction]);

  const canSlideNext = loop || realIndex < slides.length - slidesToShow;
  const canSlidePrev = loop || realIndex > 0;

  return {
    activeIndex: realIndex,
    realIndex,
    isBeginning: !loop && realIndex === 0,
    isEnd: !loop && realIndex >= slides.length - slidesToShow,
    transitioning: isTransitioning,
    touching,
    slidesCount: slides.length,
    slidesPerView: slidesToShow,
    
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