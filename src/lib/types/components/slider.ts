import React, { ReactNode } from 'react';
import { Size, BaseComponentProps } from './common';


/**
 * Slider slide item interface
 */
export interface SliderSlide {
  /**
   * Unique identifier for the slide
   */
  id: string;

  /**
   * Slide content
   */
  content: ReactNode;

  /**
   * Optional image source
   */
  image?: string;

  /**
   * Optional image alt text
   */
  alt?: string;

  /**
   * Optional title
   */
  title?: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Optional link URL
   */
  href?: string;

  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * Custom CSS class for the slide
   */
  className?: string;

  /**
   * Custom data attributes
   */
  data?: Record<string, string>;

  /**
   * Lazy loading image source
   */
  dataSrc?: string;

  /**
   * Background image
   */
  backgroundImage?: string;

  /**
   * Video source for video slides
   */
  video?: {
    src: string;
    poster?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
}


/**
 * Slider breakpoint configuration
 */
export interface SliderBreakpoint {
  /**
   * Number of slides to show
   */
  slidesToShow?: number;

  /**
   * Slides per view
   */
  slidesPerView?: number | 'auto';

  /**
   * Number of slides to scroll
   */
  slidesToScroll?: number;

  /**
   * Slides per group
   */
  slidesPerGroup?: number;

  /**
   * Space between slides in pixels
   */
  spaceBetween?: number;

  /**
   * Whether to center slides
   */
  centeredSlides?: boolean;

  /**
   * Slides per column
   */
  slidesPerColumn?: number;

  /**
   * Slides per column fill
   */
  slidesPerColumnFill?: 'column' | 'row';

  /**
   * Direction
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Width
   */
  width?: number;

  /**
   * Height
   */
  height?: number;

  /**
   * Loop
   */
  loop?: boolean;

  /**
   * Loop additional slides
   */
  loopAdditionalSlides?: number;

  /**
   * Loop filled group with blank
   */
  loopFillGroupWithBlank?: boolean;

  /**
   * Free mode
   */
  freeMode?: boolean;

  /**
   * Speed
   */
  speed?: number;

  /**
   * Effect
   */
  effect?: string;

  /**
   * Autoplay
   */
  autoplay?: boolean | SliderAutoplay;

  /**
   * Navigation
   */
  navigation?: boolean | SliderNavigation;

  /**
   * Pagination
   */
  pagination?: boolean | SliderPagination;

  /**
   * Scrollbar
   */
  scrollbar?: boolean | SliderScrollbar;
}


/**
 * Slider autoplay configuration
 */
export interface SliderAutoplay {
  /**
   * Delay between transitions in milliseconds
   */
  delay: number;

  /**
   * Whether to stop autoplay on interaction
   */
  stopOnInteraction?: boolean;

  /**
   * Whether to disable autoplay on hover
   */
  pauseOnHover?: boolean;

  /**
   * Whether to reverse direction
   */
  reverseDirection?: boolean;

  /**
   * Disable on interaction
   */
  disableOnInteraction?: boolean;

  /**
   * Wait for transition
   */
  waitForTransition?: boolean;

  /**
   * Pause on mouse enter
   */
  pauseOnMouseEnter?: boolean;
}


/**
 * Slider pagination configuration
 */
export interface SliderPagination {
  /**
   * Whether pagination is enabled
   */
  enabled: boolean;

  /**
   * Pagination element selector
   */
  el?: string | HTMLElement;

  /**
   * Pagination type
   */
  type?: 'bullets' | 'fraction' | 'progressbar' | 'custom';

  /**
   * Whether pagination is clickable
   */
  clickable?: boolean;

  /**
   * Whether to hide pagination on single slide
   */
  hideOnClick?: boolean;

  /**
   * Dynamic bullets
   */
  dynamicBullets?: boolean;

  /**
   * Dynamic main bullets
   */
  dynamicMainBullets?: number;

  /**
   * Format fraction current
   */
  formatFractionCurrent?: (number: number) => string;

  /**
   * Format fraction total
   */
  formatFractionTotal?: (number: number) => string;

  /**
   * Render bullet
   */
  renderBullet?: (index: number, className: string) => string;

  /**
   * Render fraction
   */
  renderFraction?: (currentClass: string, totalClass: string) => string;

  /**
   * Render progressbar
   */
  renderProgressbar?: (progressbarFillClass: string) => string;

  /**
   * Render custom
   */
  renderCustom?: (swiper: any, current: number, total: number) => string;

  /**
   * Progressbar opposite
   */
  progressbarOpposite?: boolean;

  /**
   * Bullet class
   */
  bulletClass?: string;

  /**
   * Bullet active class
   */
  bulletActiveClass?: string;

  /**
   * Modifier class
   */
  modifierClass?: string;

  /**
   * Current class
   */
  currentClass?: string;

  /**
   * Total class
   */
  totalClass?: string;

  /**
   * Hidden class
   */
  hiddenClass?: string;

  /**
   * Progressbar fill class
   */
  progressbarFillClass?: string;

  /**
   * Progressbar opposite class
   */
  progressbarOppositeClass?: string;

  /**
   * Clickable class
   */
  clickableClass?: string;

  /**
   * Lock class
   */
  lockClass?: string;

  /**
   * Horizontal class
   */
  horizontalClass?: string;

  /**
   * Vertical class
   */
  verticalClass?: string;
}


/**
 * Slider navigation configuration
 */
export interface SliderNavigation {
  /**
   * Whether navigation is enabled
   */
  enabled: boolean;

  /**
   * Previous button element selector
   */
  prevEl?: string | HTMLElement | ReactNode;

  /**
   * Next button element selector
   */
  nextEl?: string | HTMLElement | ReactNode;

  /**
   * Whether to hide navigation on reach
   */
  hideOnClick?: boolean;

  /**
   * Disabled class
   */
  disabledClass?: string;

  /**
   * Hidden class
   */
  hiddenClass?: string;

  /**
   * Lock class
   */
  lockClass?: string;

  /**
   * Navigation wrapper class
   */
  navigationDisabledClass?: string;
}


/**
 * Slider scrollbar configuration
 */
export interface SliderScrollbar {
  /**
   * Whether scrollbar is enabled
   */
  enabled: boolean;

  /**
   * Scrollbar element selector
   */
  el?: string | HTMLElement;

  /**
   * Whether scrollbar is draggable
   */
  draggable?: boolean;

  /**
   * Whether to hide scrollbar automatically
   */
  hide?: boolean;

  /**
   * Scrollbar snap on release
   */
  snapOnRelease?: boolean;

  /**
   * Drag class
   */
  dragClass?: string;

  /**
   * Lock class
   */
  lockClass?: string;

  /**
   * Horizontal class
   */
  horizontalClass?: string;

  /**
   * Vertical class
   */
  verticalClass?: string;
}


/**
 * Slider effect configuration
 */
export interface SliderEffect {
  /**
   * Transition effect type
   */
  type: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'cards' | 'creative';

  /**
   * Fade effect options
   */
  fade?: {
    crossFade?: boolean;
  };

  /**
   * Cube effect options
   */
  cube?: {
    slideShadows?: boolean;
    shadow?: boolean;
    shadowOffset?: number;
    shadowScale?: number;
  };

  /**
   * Coverflow effect options
   */
  coverflow?: {
    rotate?: number;
    stretch?: number;
    depth?: number;
    modifier?: number;
    slideShadows?: boolean;
  };

  /**
   * Flip effect options
   */
  flip?: {
    slideShadows?: boolean;
    limitRotation?: boolean;
  };

  /**
   * Cards effect options
   */
  cards?: {
    perSlideOffset?: number;
    perSlideRotate?: number;
    rotate?: boolean;
    slideShadows?: boolean;
  };

  /**
   * Creative effect options
   */
  creative?: {
    prev?: {
      translate?: [number, number, number];
      rotate?: [number, number, number];
      opacity?: number;
      scale?: number;
    };
    next?: {
      translate?: [number, number, number];
      rotate?: [number, number, number];
      opacity?: number;
      scale?: number;
    };
    limitProgress?: number;
    shadowPerProgress?: boolean;
    progressMultiplier?: number;
  };
}


/**
 * Slider thumbs configuration
 */
export interface SliderThumbs {
  /**
   * Whether thumbs are enabled
   */
  enabled: boolean;

  /**
   * Swiper instance for thumbs
   */
  swiper?: any;

  /**
   * Thumbs slides data
   */
  slides?: SliderSlide[];

  /**
   * Number of thumbs to show
   */
  slidesToShow?: number;

  /**
   * Space between thumbs
   */
  spaceBetween?: number;

  /**
   * Thumbs direction
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Whether thumbs are clickable
   */
  clickable?: boolean;

  /**
   * Slide thumb active class
   */
  slideThumbActiveClass?: string;

  /**
   * Thumbs container class
   */
  thumbsContainerClass?: string;

  /**
   * Auto scroll offset
   */
  autoScrollOffset?: number;

  /**
   * Multiple active thumbs
   */
  multipleActiveThumbs?: boolean;
}


/**
 * Slider zoom configuration
 */
export interface SliderZoom {
  /**
   * Whether zoom is enabled
   */
  enabled: boolean;

  /**
   * Maximum zoom ratio
   */
  maxRatio?: number;

  /**
   * Minimum zoom ratio
   */
  minRatio?: number;

  /**
   * Whether to toggle zoom on double tap
   */
  toggle?: boolean;

  /**
   * Container selector for zoom
   */
  containerClass?: string;

  /**
   * Zoomed slide class
   */
  zoomedSlideClass?: string;

  /**
   * Zoom container class
   */
  zoomContainerClass?: string;
}


/**
 * Slider lazy loading configuration
 */
export interface SliderLazy {
  /**
   * Whether lazy loading is enabled
   */
  enabled: boolean;

  /**
   * Check in view
   */
  checkInView?: boolean;

  /**
   * Load on transition start
   */
  loadOnTransitionStart?: boolean;

  /**
   * Number of slides to preload
   */
  loadPrevNext?: boolean;

  /**
   * Number of slides to preload in each direction
   */
  loadPrevNextAmount?: number;

  /**
   * Loading element selector
   */
  loadingClass?: string;

  /**
   * Loaded element selector
   */
  loadedClass?: string;

  /**
   * Preloader element selector
   */
  preloaderClass?: string;

  /**
   * Element class
   */
  elementClass?: string;
}


/**
 * Slider virtual slides configuration
 */
export interface SliderVirtual {
  /**
   * Whether virtual slides are enabled
   */
  enabled: boolean;

  /**
   * Number of slides to render
   */
  slides?: SliderSlide[];

  /**
   * Cache rendered slides
   */
  cache?: boolean;

  /**
   * Render slide function
   */
  renderSlide?: (slide: SliderSlide, index: number) => string;

  /**
   * Render external function
   */
  renderExternal?: (data: any) => void;

  /**
   * Add slides before
   */
  addSlidesBefore?: number;

  /**
   * Add slides after
   */
  addSlidesAfter?: number;

  /**
   * Render external update
   */
  renderExternalUpdate?: boolean;
}


/**
 * Slider state interface
 */
export interface SliderState {
  /**
   * Current active slide index
   */
  activeIndex: number;

  /**
   * Real index (without loop duplicates)
   */
  realIndex: number;

  /**
   * Previous index
   */
  previousIndex: number;

  /**
   * Whether slider is at the beginning
   */
  isBeginning: boolean;

  /**
   * Whether slider is at the end
   */
  isEnd: boolean;

  /**
   * Current progress (0-1)
   */
  progress: number;

  /**
   * Whether autoplay is running
   */
  autoplayRunning: boolean;

  /**
   * Whether slider is transitioning
   */
  transitioning: boolean;

  /**
   * Whether touch is active
   */
  touching: boolean;

  /**
   * Current translate value
   */
  translate: number;

  /**
   * Slides per view
   */
  slidesPerView: number | 'auto';

  /**
   * Total slides count
   */
  slidesCount: number;

  /**
   * Whether slider is locked
   */
  isLocked: boolean;

  /**
   * Whether slider is destroyed
   */
  destroyed: boolean;

  /**
   * Current breakpoint
   */
  currentBreakpoint?: string;

  /**
   * Size
   */
  size: number;

  /**
   * Touches
   */
  touches: {
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    diff: number;
  };

  /**
   * Allow slide next
   */
  allowSlideNext: boolean;

  /**
   * Allow slide prev
   */
  allowSlidePrev: boolean;

  /**
   * Allow touch move
   */
  allowTouchMove: boolean;

  /**
   * Animating
   */
  animating: boolean;

  /**
   * Enabled
   */
  enabled: boolean;

  /**
   * Initialized
   */
  initialized: boolean;
}


/**
 * Slider element refs
 */
export interface SliderRefs {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  wrapperRef?: React.RefObject<HTMLDivElement | null>;
  paginationRef?: React.RefObject<HTMLDivElement | null>;
  navigationPrevRef?: React.RefObject<HTMLButtonElement | null>;
  navigationNextRef?: React.RefObject<HTMLButtonElement | null>;
}


/**
 * Slider component properties
 */
export interface SliderProps extends BaseComponentProps {
  /**
   * Array of slides to display
   */
  slides: SliderSlide[];

  /**
   * Number of slides to show at once
   */
  slidesToShow?: number;

  /**
   * Number of slides to scroll at once
   */
  slidesToScroll?: number;

  /**
   * Space between slides in pixels
   */
  spaceBetween?: number;

  /**
   * Whether to center slides
   */
  centeredSlides?: boolean;

  /**
   * Whether to loop slides infinitely
   */
  loop?: boolean;

  /**
   * Initial slide index
   */
  initialSlide?: number;

  /**
   * Slider direction
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Transition speed in milliseconds
   */
  speed?: number;

  /**
   * CSS easing function
   */
  easing?: string;

  /**
   * Whether to allow touch/swipe gestures
   */
  allowTouchMove?: boolean;

  /**
   * Touch threshold for swipe (default: 10px)
   */
  threshold?: number;

  /**
   * Whether to enable mouse wheel control
   */
  mousewheel?:
  | boolean
  | {
    forceToAxis?: boolean;
    sensitivity?: number;
    releaseOnEdges?: boolean;
  };

  /**
   * Whether to enable keyboard control
   */
  keyboard?:
  | boolean
  | {
    enabled?: boolean;
    onlyInViewport?: boolean;
    pageUpDown?: boolean;
  };

  /**
   * Whether to grab cursor on hover (default: true)
   */
  grabCursor?: boolean;

  /**
   * Autoplay configuration
   */
  autoplay?: SliderAutoplay | boolean;

  /**
   * Pagination configuration
   */
  pagination?: SliderPagination | boolean;

  /**
   * Navigation configuration
   */
  navigation?: SliderNavigation | boolean;

  /**
   * Scrollbar configuration
   */
  scrollbar?: SliderScrollbar | boolean;

  /**
   * Effect configuration
   */
  effect?: SliderEffect;

  /**
   * Thumbs configuration
   */
  thumbs?: SliderThumbs;

  /**
   * Zoom configuration
   */
  zoom?: SliderZoom;

  /**
   * Lazy loading configuration
   */
  lazy?: SliderLazy;

  /**
   * Virtual slides configuration
   */
  virtual?: SliderVirtual;

  /**
   * Responsive breakpoints
   */
  breakpoints?: {
    [key: number]: SliderBreakpoint;
  };

  /**
   * Whether to free mode (no snap to slides)
   */
  freeMode?:
  | boolean
  | {
    enabled?: boolean;
    sticky?: boolean;
    momentumRatio?: number;
    momentumVelocityRatio?: number;
    momentumBounce?: boolean;
    momentumBounceRatio?: number;
    minimumVelocity?: number;
  };

  /**
   * Whether to watch for slides and wrapper size changes
   */
  watchSlidesProgress?: boolean;

  /**
   * Whether to watch for overflow
   */
  watchOverflow?: boolean;

  /**
   * Resistance ratio for edges
   */
  resistanceRatio?: number;

  /**
   * Whether to prevent clicks during transition
   */
  preventClicks?: boolean;

  /**
   * Whether to prevent clicks propagation during transition
   */
  preventClicksPropagation?: boolean;

  /**
   * Parallax configuration
   */
  parallax?: boolean;

  /**
   * Hash navigation
   */
  hashNavigation?:
  | boolean
  | {
    watchState?: boolean;
    replaceState?: boolean;
  };

  /**
   * History navigation
   */
  history?:
  | boolean
  | {
    enabled?: boolean;
    root?: string;
    replaceState?: boolean;
    key?: string;
  };

  /**
   * Controller configuration
   */
  controller?: {
    control?: any;
    inverse?: boolean;
    by?: 'slide' | 'container';
  };

  /**
   * A11y configuration
   */
  a11y?:
  | boolean
  | {
    enabled?: boolean;
    prevSlideMessage?: string;
    nextSlideMessage?: string;
    firstSlideMessage?: string;
    lastSlideMessage?: string;
    paginationBulletMessage?: string;
    notificationClass?: string;
  };

  /**
   * Slide change callback
   */
  onSlideChange?: (swiper: any) => void;

  /**
   * Slide change transition start callback
   */
  onSlideChangeTransitionStart?: (swiper: any) => void;

  /**
   * Slide change transition end callback
   */
  onSlideChangeTransitionEnd?: (swiper: any) => void;

  /**
   * Slider initialization callback
   */
  onInit?: (swiper: any) => void;

  /**
   * Before destroy callback
   */
  onDestroy?: () => void;

  /**
   * Touch start callback
   */
  onTouchStart?: (swiper: any, event: TouchEvent) => void;

  /**
   * Touch move callback
   */
  onTouchMove?: (swiper: any, event: TouchEvent) => void;

  /**
   * Touch end callback
   */
  onTouchEnd?: (swiper: any, event: TouchEvent) => void;

  /**
   * Reach beginning callback
   */
  onReachBeginning?: (swiper: any) => void;

  /**
   * Reach end callback
   */
  onReachEnd?: (swiper: any) => void;

  /**
   * Progress change callback
   */
  onProgress?: (swiper: any, progress: number) => void;

  /**
   * Autoplay start callback
   */
  onAutoplayStart?: (swiper: any) => void;

  /**
   * Autoplay stop callback
   */
  onAutoplayStop?: (swiper: any) => void;

  /**
   * Before resize callback
   */
  onBeforeResize?: (swiper: any) => void;

  /**
   * After resize callback
   */
  onResize?: (swiper: any) => void;

  /**
   * Slider size
   */
  size?: Size;

  /**
   * Slider height (for horizontal sliders)
   */
  height?: string | number;

  /**
   * Slider width (for vertical sliders)
   */
  width?: string | number;

  /**
   * Custom container class
   */
  containerClass?: string;

  /**
   * Whether to use vanilla JS implementation
   */
  useVanillaJS?: boolean;

  /**
   * Modules to enable
   */
  modules?: string[];

  /**
   * Update on window resize
   */
  updateOnWindowResize?: boolean;

  /**
   * Resize observer
   */
  resizeObserver?: boolean;

  /**
   * Observer
   */
  observer?: boolean;

  /**
   * Observer parents
   */
  observeParents?: boolean;

  /**
   * Observer slide children
   */
  observeSlideChildren?: boolean;

  /**
   * Run callbacks on init
   */
  runCallbacksOnInit?: boolean;

  /**
   * Preload images
   */
  preloadImages?: boolean;

  /**
   * Update on images ready
   */
  updateOnImagesReady?: boolean;

  /**
   * CSS mode
   */
  cssMode?: boolean;

  /**
   * Simulate touch
   */
  simulateTouch?: boolean;

  /**
   * Touch ratio
   */
  touchRatio?: number;

  /**
   * Touch angle
   */
  touchAngle?: number;

  /**
   * Short swipes
   */
  shortSwipes?: boolean;

  /**
   * Long swipes
   */
  longSwipes?: boolean;

  /**
   * Long swipes ratio
   */
  longSwipesRatio?: number;

  /**
   * Long swipes ms
   */
  longSwipesMs?: number;

  /**
   * Follow finger
   */
  followFinger?: boolean;

  /**
   * Touch move stop propagation
   */
  touchMoveStopPropagation?: boolean;

  /**
   * Touch start prevent default
   */
  touchStartPreventDefault?: boolean;

  /**
   * Touch start force prevent default
   */
  touchStartForcePreventDefault?: boolean;

  /**
   * Touch release on edges
   */
  touchReleaseOnEdges?: boolean;

  /**
   * Unique nav elements
   */
  uniqueNavElements?: boolean;

  /**
   * Slides per group
   */
  slidesPerGroup?: number;

  /**
   * Slides per group skip
   */
  slidesPerGroupSkip?: number;

  /**
   * Slides per group auto
   */
  slidesPerGroupAuto?: boolean;

  /**
   * Centered slides bounds
   */
  centeredSlidesBounds?: boolean;

  /**
   * Slides grid
   */
  grid?: {
    rows?: number;
    fill?: 'row' | 'column';
  };

  /**
   * Set wrapper size
   */
  setWrapperSize?: boolean;

  /**
   * Virtual translate
   */
  virtualTranslate?: boolean;

  /**
   * Round lengths
   */
  roundLengths?: boolean;

  /**
   * Nested
   */
  nested?: boolean;

  /**
   * Focus on select
   */
  focusableElements?: string;

  /**
   * Release form elements
   */
  releaseFormElements?: boolean;

  /**
   * Auto height
   */
  autoHeight?: boolean;

  /**
   * Slides offset before
   */
  slidesOffsetBefore?: number;

  /**
   * Slides offset after
   */
  slidesOffsetAfter?: number;

  /**
   * Normalize slide index
   */
  normalizeSlideIndex?: boolean;

  /**
   * Center insufficient slides
   */
  centerInsufficientSlides?: boolean;

  /**
   * Watch slides visibility
   */
  watchSlidesVisibility?: boolean;

  /**
   * Max backface hidden slides
   */
  maxBackfaceHiddenSlides?: number;

  /**
   * Edge swipe detection
   */
  edgeSwipeDetection?: boolean | string;

  /**
   * Edge swipe threshold
   */
  edgeSwipeThreshold?: number;

  /**
   * Resistance
   */
  resistance?: boolean;

  /**
   * Passive listeners
   */
  passiveListeners?: boolean;

  /**
   * Container modifier class
   */
  containerModifierClass?: string;

  /**
   * Slide class
   */
  slideClass?: string;

  /**
   * Slide blank class
   */
  slideBlankClass?: string;

  /**
   * Slide active class
   */
  slideActiveClass?: string;

  /**
   * Slide duplicate active class
   */
  slideDuplicateActiveClass?: string;

  /**
   * Slide visible class
   */
  slideVisibleClass?: string;

  /**
   * Slide duplicate class
   */
  slideDuplicateClass?: string;

  /**
   * Slide next class
   */
  slideNextClass?: string;

  /**
   * Slide duplicate next class
   */
  slideDuplicateNextClass?: string;

  /**
   * Slide prev class
   */
  slidePrevClass?: string;

  /**
   * Slide duplicate prev class
   */
  slideDuplicatePrevClass?: string;

  /**
   * Wrapper class
   */
  wrapperClass?: string;

  /**
   * Lazy preloader class
   */
  lazyPreloaderClass?: string;

  /**
   * Lazy preloader custom
   */
  lazyPreloaderCustom?: string;

  /**
   * Init
   */
  init?: boolean;

  /**
   * On any
   */
  onAny?: (eventName: string, ...args: any[]) => void;

  /**
   * Before init
   */
  onBeforeInit?: (swiper: any) => void;

  /**
   * Slides length change
   */
  onSlidesLengthChange?: (swiper: any) => void;

  /**
   * Snap index change
   */
  onSnapIndexChange?: (swiper: any) => void;

  /**
   * Real index change
   */
  onRealIndexChange?: (swiper: any) => void;

  /**
   * Before loop fix
   */
  onBeforeLoopFix?: (swiper: any) => void;

  /**
   * Loop fix
   */
  onLoopFix?: (swiper: any) => void;

  /**
   * Before transition start
   */
  onBeforeTransitionStart?: (swiper: any, speed: number, internal: boolean) => void;

  /**
   * Transition start
   */
  onTransitionStart?: (swiper: any) => void;

  /**
   * Transition end
   */
  onTransitionEnd?: (swiper: any) => void;

  /**
   * Slider move
   */
  onSliderMove?: (swiper: any, event: TouchEvent | MouseEvent) => void;

  /**
   * Slider first move
   */
  onSliderFirstMove?: (swiper: any, event: TouchEvent | MouseEvent) => void;

  /**
   * Set translate
   */
  onSetTranslate?: (swiper: any, translate: number) => void;

  /**
   * Set transition
   */
  onSetTransition?: (swiper: any, duration: number) => void;

  /**
   * From edge
   */
  onFromEdge?: (swiper: any) => void;

  /**
   * To edge
   */
  onToEdge?: (swiper: any) => void;

  /**
   * Tap
   */
  onTap?: (swiper: any, event: TouchEvent | MouseEvent) => void;

  /**
   * Double tap
   */
  onDoubleTap?: (swiper: any, event: TouchEvent | MouseEvent) => void;

  /**
   * Images ready
   */
  onImagesReady?: (swiper: any) => void;

  /**
   * Lock
   */
  onLock?: (swiper: any) => void;

  /**
   * Unlock
   */
  onUnlock?: (swiper: any) => void;

  /**
   * Breakpoint
   */
  onBreakpoint?: (swiper: any, breakpointParams: any) => void;

  /**
   * Orientation change
   */
  onOrientationchange?: (swiper: any) => void;

  /**
   * Keyboard
   */
  onKeyPress?: (swiper: any, keyCode: string) => void;

  /**
   * Mousewheel
   */
  onScroll?: (swiper: any, event: WheelEvent) => void;

  /**
   * Navigation hide
   */
  onNavigationHide?: (swiper: any) => void;

  /**
   * Navigation show
   */
  onNavigationShow?: (swiper: any) => void;

  /**
   * Pagination hide
   */
  onPaginationHide?: (swiper: any) => void;

  /**
   * Pagination show
   */
  onPaginationShow?: (swiper: any) => void;

  /**
   * Pagination render
   */
  onPaginationRender?: (swiper: any, paginationEl: HTMLElement) => void;

  /**
   * Scrollbar drag start
   */
  onScrollbarDragStart?: (swiper: any, event: MouseEvent | TouchEvent) => void;

  /**
   * Scrollbar drag move
   */
  onScrollbarDragMove?: (swiper: any, event: MouseEvent | TouchEvent) => void;

  /**
   * Scrollbar drag end
   */
  onScrollbarDragEnd?: (swiper: any, event: MouseEvent | TouchEvent) => void;

  /**
   * Zoom change
   */
  onZoomChange?: (swiper: any, scale: number, imageEl: HTMLElement, slideEl: HTMLElement) => void;

  /**
   * Autoplay pause
   */
  onAutoplayPause?: (swiper: any) => void;

  /**
   * Autoplay resume
   */
  onAutoplayResume?: (swiper: any) => void;

  /**
   * Autoplay time left
   */
  onAutoplayTimeLeft?: (swiper: any, timeLeft: number, percentage: number) => void;
}
