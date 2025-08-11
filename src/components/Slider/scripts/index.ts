import { SliderSlide, SliderAutoplay, SliderPagination, SliderNavigation, SliderScrollbar, SliderEffect, SliderThumbs, SliderZoom, SliderLazy, SliderVirtual } from '../../../lib/types/components';
import { SliderInteractions } from './SliderInteractions';
import { sliderConstants } from '../../../lib/constants/components';

/**
 * Vanilla JS Slider implementation
 * World-class slider with comprehensive features rivaling Swiper.js
 */
export default class AtomixSlider {
  private element: HTMLElement;
  private wrapper: HTMLElement | null = null;
  private slides: SliderSlide[];
  private currentIndex: number = 0;
  private realIndex: number = 0;
  private isTransitioning: boolean = false;
  private autoplayTimer: number | null = null;
  private interactions: SliderInteractions | null = null;
  private resizeObserver: ResizeObserver | null = null;
  
  private options: {
    // Basic options
    slidesToShow: number;
    slidesToScroll: number;
    spaceBetween: number;
    centeredSlides: boolean;
    loop: boolean;
    initialSlide: number;
    direction: 'horizontal' | 'vertical';
    speed: number;
    easing: string;
    
    // Interaction options
    allowTouchMove: boolean;
    threshold: number;
    mousewheel: boolean | { forceToAxis?: boolean; sensitivity?: number; releaseOnEdges?: boolean };
    keyboard: boolean | { enabled?: boolean; onlyInViewport?: boolean; pageUpDown?: boolean };
    grabCursor: boolean;
    freeMode: boolean | { enabled?: boolean; sticky?: boolean };
    resistanceRatio: number;
    
    // Advanced features
    autoplay: SliderAutoplay | boolean | false;
    pagination: SliderPagination | boolean | false;
    navigation: SliderNavigation | boolean | false;
    scrollbar: SliderScrollbar | boolean | false;
    effect: SliderEffect;
    thumbs: SliderThumbs;
    zoom: SliderZoom;
    lazy: SliderLazy;
    virtual: SliderVirtual;
    
    // Responsive
    breakpoints: { [key: number]: any };
    
    // Touch settings
    simulateTouch: boolean;
    touchRatio: number;
    touchAngle: number;
    shortSwipes: boolean;
    longSwipes: boolean;
    longSwipesRatio: number;
    longSwipesMs: number;
    followFinger: boolean;
    touchMoveStopPropagation: boolean;
    touchStartPreventDefault: boolean;
    touchReleaseOnEdges: boolean;
    resistance: boolean;
    passiveListeners: boolean;
    
    // Accessibility
    a11y: boolean | { enabled?: boolean; prevSlideMessage?: string; nextSlideMessage?: string };
    
    // Performance
    watchSlidesProgress: boolean;
    watchOverflow: boolean;
    preloadImages: boolean;
    updateOnImagesReady: boolean;
    
    // CSS
    containerModifierClass: string;
    slideClass: string;
    slideActiveClass: string;
    slidePrevClass: string;
    slideNextClass: string;
    slideVisibleClass: string;
    slideDuplicateClass: string;
    wrapperClass: string;
  };

  // Public state for interactions
  public state = {
    activeIndex: 0,
    slidesCount: 0,
    touching: false,
    transitioning: false,
    translate: 0,
  };

  public config: any;

  constructor(element: string | HTMLElement, options: Partial<typeof AtomixSlider.prototype.options> = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element)! : element;
    
    if (!this.element) {
      throw new Error('Slider element not found');
    }

    // Merge with defaults from constants
    this.options = {
      // Basic options
      slidesToShow: sliderConstants.defaults.slidesToShow,
      slidesToScroll: sliderConstants.defaults.slidesToScroll,
      spaceBetween: sliderConstants.defaults.spaceBetween,
      centeredSlides: sliderConstants.defaults.centeredSlides,
      loop: sliderConstants.defaults.loop,
      initialSlide: sliderConstants.defaults.initialSlide,
      direction: sliderConstants.defaults.direction,
      speed: sliderConstants.defaults.speed,
      easing: sliderConstants.defaults.easing,
      
      // Interaction options
      allowTouchMove: sliderConstants.defaults.allowTouchMove,
      threshold: sliderConstants.defaults.threshold,
      mousewheel: sliderConstants.defaults.mousewheel,
      keyboard: sliderConstants.defaults.keyboard,
      grabCursor: sliderConstants.defaults.grabCursor,
      freeMode: sliderConstants.defaults.freeMode,
      resistanceRatio: sliderConstants.defaults.resistanceRatio,
      
      // Advanced features
      autoplay: false,
      pagination: { enabled: true, type: 'bullets', clickable: true },
      navigation: { enabled: true },
      scrollbar: { enabled: false },
      effect: { type: 'slide' },
      thumbs: { enabled: false },
      zoom: { enabled: false },
      lazy: { enabled: false },
      virtual: { enabled: false },
      
      // Responsive
      breakpoints: {},
      
      // Touch settings
      simulateTouch: sliderConstants.defaults.simulateTouch,
      touchRatio: sliderConstants.defaults.touchRatio,
      touchAngle: sliderConstants.defaults.touchAngle,
      shortSwipes: sliderConstants.defaults.shortSwipes,
      longSwipes: sliderConstants.defaults.longSwipes,
      longSwipesRatio: sliderConstants.defaults.longSwipesRatio,
      longSwipesMs: sliderConstants.defaults.longSwipesMs,
      followFinger: sliderConstants.defaults.followFinger,
      touchMoveStopPropagation: sliderConstants.defaults.touchMoveStopPropagation,
      touchStartPreventDefault: sliderConstants.defaults.touchStartPreventDefault,
      touchReleaseOnEdges: sliderConstants.defaults.touchReleaseOnEdges,
      resistance: sliderConstants.defaults.resistance,
      passiveListeners: sliderConstants.defaults.passiveListeners,
      
      // Accessibility
      a11y: { enabled: true },
      
      // Performance
      watchSlidesProgress: sliderConstants.defaults.watchSlidesProgress,
      watchOverflow: sliderConstants.defaults.watchOverflow,
      preloadImages: true,
      updateOnImagesReady: true,
      
      // CSS classes
      containerModifierClass: sliderConstants.classes.containerModifierClass,
      slideClass: sliderConstants.classes.slide,
      slideActiveClass: sliderConstants.classes.slideActive,
      slidePrevClass: sliderConstants.classes.slidePrev,
      slideNextClass: sliderConstants.classes.slideNext,
      slideVisibleClass: sliderConstants.classes.slideVisible,
      slideDuplicateClass: sliderConstants.classes.slideDuplicate,
      wrapperClass: sliderConstants.classes.wrapper,
      
      ...options,
    };

    this.config = this.options;
    this.currentIndex = this.options.initialSlide;
    this.realIndex = this.options.initialSlide;
    this.init();
  }

  private init(): void {
    this.element.classList.add('c-slider');
    this.parseSlides();
    this.render();
    this.setupInteractions();
    this.bindEvents();
    
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  private setupInteractions(): void {
    this.interactions = new SliderInteractions(this);
    
    if (this.options.allowTouchMove) {
      this.interactions.setupTouchEvents();
    }
    
    if (this.options.keyboard) {
      this.interactions.setupKeyboardEvents();
    }
  }

  private parseSlides(): void {
    const slideElements = this.element.querySelectorAll('[data-slide]');
    this.slides = Array.from(slideElements).map((el, index) => ({
      id: `slide-${index}`,
      content: el.innerHTML,
      title: el.getAttribute('data-title') || undefined,
      description: el.getAttribute('data-description') || undefined,
      image: el.getAttribute('data-image') || undefined,
      alt: el.getAttribute('data-alt') || undefined,
    }));
  }

  private render(): void {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'c-slider__wrapper';
    
    this.slides.forEach((slide, index) => {
      const slideEl = document.createElement('div');
      slideEl.className = `c-slider__slide ${index === 0 ? 'c-slider__slide--active' : ''}`;
      slideEl.innerHTML = slide.content;
      this.wrapper.appendChild(slideEl);
    });

    this.element.innerHTML = '';
    this.element.appendChild(this.wrapper);

    // Update state
    this.state.slidesCount = this.slides.length;
    this.updateClasses();

    if (this.options.navigation) {
      this.renderNavigation();
    }

    if (this.options.pagination) {
      this.renderPagination();
    }
  }

  private renderNavigation(): void {
    const nav = document.createElement('div');
    nav.className = 'c-slider__navigation';
    nav.innerHTML = `
      <button type="button" class="c-slider__navigation-prev" aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M165.66 202.34a8 8 0 0 1-11.32 11.32l-80-80a8 8 0 0 1 0-11.32l80-80a8 8 0 0 1 11.32 11.32L91.31 128Z"/></svg>
      </button>
      <button type="button" class="c-slider__navigation-next" aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="m181.66 133.66l-80 80a8 8 0 0 1-11.32-11.32L164.69 128L90.34 53.66a8 8 0 0 1 11.32-11.32l80 80a8 8 0 0 1 0 11.32Z"/></svg>
      </button>
    `;
    this.element.appendChild(nav);
  }

  private renderPagination(): void {
    const pagination = document.createElement('div');
    pagination.className = 'c-slider__pagination c-slider__pagination--bullets';
    
    this.slides.forEach((_, index) => {
      const bullet = document.createElement('button');
      bullet.type = 'button';
      bullet.className = `c-slider__pagination-bullet ${index === 0 ? 'c-slider__pagination-bullet--active' : ''}`;
      bullet.setAttribute('aria-label', `Go to slide ${index + 1}`);
      bullet.innerHTML = '<svg width="8" height="8" viewBox="0 0 256 256"><circle cx="128" cy="128" r="128" fill="currentColor"/></svg>';
      pagination.appendChild(bullet);
    });

    this.element.appendChild(pagination);
  }

  private bindEvents(): void {
    // Navigation
    const prevBtn = this.element.querySelector('.c-slider__navigation-prev');
    const nextBtn = this.element.querySelector('.c-slider__navigation-next');
    
    prevBtn?.addEventListener('click', () => this.prev());
    nextBtn?.addEventListener('click', () => this.next());

    // Pagination
    const bullets = this.element.querySelectorAll('.c-slider__pagination-bullet');
    bullets.forEach((bullet, index) => {
      bullet.addEventListener('click', () => this.goTo(index));
    });

    // Keyboard
    if (this.options.keyboard) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });
    }

    // Autoplay pause on hover
    if (this.options.autoplay && this.options.autoplay.pauseOnHover) {
      this.element.addEventListener('mouseenter', () => this.stopAutoplay());
      this.element.addEventListener('mouseleave', () => this.startAutoplay());
    }
  }

  public next(): void {
    if (this.isTransitioning) return;
    
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.slides.length) {
      nextIndex = this.options.loop ? 0 : this.currentIndex;
    }
    
    this.goToSlide(nextIndex);
  }

  public prev(): void {
    if (this.isTransitioning) return;
    
    let prevIndex = this.currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.options.loop ? this.slides.length - 1 : this.currentIndex;
    }
    
    this.goToSlide(prevIndex);
  }

  public goToSlide(index: number): void {
    if (this.isTransitioning || index === this.currentIndex) return;
    
    this.isTransitioning = true;
    this.state.transitioning = true;
    
    // Calculate translate value
    const slideSize = this.getSlideSize();
    const translate = -index * (slideSize + this.options.spaceBetween);
    
    // Apply transform
    if (this.wrapper) {
      const transform = this.options.direction === 'horizontal' 
        ? `translateX(${translate}px)` 
        : `translateY(${translate}px)`;
      
      this.wrapper.style.transform = transform;
      this.wrapper.style.transitionDuration = `${this.options.speed}ms`;
    }
    
    // Update slides
    const slides = this.element.querySelectorAll('.c-slider__slide');
    slides[this.currentIndex]?.classList.remove('c-slider__slide--active');
    slides[index]?.classList.add('c-slider__slide--active');
    
    // Update pagination
    const bullets = this.element.querySelectorAll('.c-slider__pagination-bullet');
    bullets[this.currentIndex]?.classList.remove('c-slider__pagination-bullet--active');
    bullets[index]?.classList.add('c-slider__pagination-bullet--active');
    
    this.currentIndex = index;
    this.state.activeIndex = index;
    this.state.translate = translate;
    
    setTimeout(() => {
      this.isTransitioning = false;
      this.state.transitioning = false;
    }, this.options.speed);
  }

  public goTo(index: number): void {
    this.goToSlide(index);
  }

  public getSlideSize(): number {
    if (!this.wrapper) return 300;
    const containerSize = this.options.direction === 'horizontal' 
      ? this.element.offsetWidth 
      : this.element.offsetHeight;
    return (containerSize - (this.options.spaceBetween * (this.options.slidesToShow - 1))) / this.options.slidesToShow;
  }

  public updateClasses(): void {
    const classes = ['c-slider'];
    
    if (this.options.grabCursor) classes.push('c-slider--grab-cursor');
    if (this.state.touching) classes.push('c-slider--grabbing');
    if (this.options.direction === 'vertical') classes.push('c-slider--vertical');
    
    this.element.className = classes.join(' ');
  }

  public slideNext(): void {
    this.next();
  }

  public slidePrev(): void {
    this.prev();
  }

  public emit(eventName: string, ...args: any[]): void {
    // Enhanced event emission with proper event system
    const event = new CustomEvent(eventName, { 
      detail: { 
        slider: this, 
        args,
        activeIndex: this.currentIndex,
        realIndex: this.realIndex,
        previousIndex: this.state.activeIndex || 0,
      } 
    });
    this.element.dispatchEvent(event);
    
    // Also emit on window for global listeners
    window.dispatchEvent(new CustomEvent(`atomix:${eventName}`, {
      detail: { slider: this, element: this.element }
    }));
  }

  public startAutoplay(): void {
    if (!this.options.autoplay || this.autoplayTimer) return;
    
    this.autoplayTimer = window.setInterval(() => {
      this.next();
    }, this.options.autoplay.delay);
  }

  public stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  // API Methods for comprehensive functionality
  public updateConfig(newOptions: Partial<typeof AtomixSlider.prototype.options>): void {
    this.options = { ...this.options, ...newOptions };
    this.config = this.options;
    this.update();
  }

  public getState(): any {
    return {
      activeIndex: this.currentIndex,
      realIndex: this.realIndex,
      isBeginning: this.currentIndex === 0,
      isEnd: this.currentIndex >= this.slides.length - this.options.slidesToShow,
      progress: this.slides.length > 0 ? (this.currentIndex + 1) / this.slides.length : 0,
      slidesCount: this.slides.length,
      transitioning: this.isTransitioning,
      touching: this.state.touching,
    };
  }

  public getConfig(): any {
    return this.config;
  }

  public update(): void {
    this.parseSlides();
    this.updateClasses();
    this.emit(sliderConstants.events.resize, this);
  }

  public enable(): void {
    this.element.classList.remove('c-slider--disabled');
  }

  public disable(): void {
    this.element.classList.add('c-slider--disabled');
  }

  public lock(): void {
    this.element.classList.add('c-slider--locked');
  }

  public unlock(): void {
    this.element.classList.remove('c-slider--locked');
  }

  public pauseAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.emit(sliderConstants.events.autoplayStop, this);
    }
  }

  public resumeAutoplay(): void {
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  public setProgress(progress: number): void {
    const targetIndex = Math.round((this.slides.length - 1) * progress);
    this.goToSlide(targetIndex);
  }

  public appendSlide(slide: SliderSlide | SliderSlide[]): void {
    const slidesToAdd = Array.isArray(slide) ? slide : [slide];
    this.slides.push(...slidesToAdd);
    this.update();
  }

  public prependSlide(slide: SliderSlide | SliderSlide[]): void {
    const slidesToAdd = Array.isArray(slide) ? slide : [slide];
    this.slides.unshift(...slidesToAdd);
    this.currentIndex += slidesToAdd.length;
    this.realIndex += slidesToAdd.length;
    this.update();
  }

  public removeSlide(index: number | number[]): void {
    const indicesToRemove = Array.isArray(index) ? index : [index];
    indicesToRemove.sort((a, b) => b - a); // Remove from highest index first
    
    indicesToRemove.forEach(i => {
      if (i >= 0 && i < this.slides.length) {
        this.slides.splice(i, 1);
        if (i < this.currentIndex) {
          this.currentIndex--;
          this.realIndex--;
        }
      }
    });
    
    this.update();
  }

  public removeAllSlides(): void {
    this.slides = [];
    this.currentIndex = 0;
    this.realIndex = 0;
    this.update();
  }

  public destroy(): void {
    this.stopAutoplay();
    this.interactions?.destroy();
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    // Remove event listeners
    this.element.removeEventListener('mouseenter', this.pauseAutoplay.bind(this));
    this.element.removeEventListener('mouseleave', this.resumeAutoplay.bind(this));
    
    // Clean up DOM
    this.element.innerHTML = '';
    this.element.classList.remove(sliderConstants.classes.container);
    
    this.emit(sliderConstants.events.destroy, this);
  }
}