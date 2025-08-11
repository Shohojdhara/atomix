import AtomixSlider from './index';

/**
 * Global registration for Atomix Slider
 * Following Atomix design system patterns
 */

// Auto-initialize sliders with data attributes
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('[data-slider], [data-atomix-slider]');
  
  sliders.forEach((element) => {
    const options = {
      // Basic options
      slidesToShow: parseInt(element.getAttribute('data-slides-to-show') || '1'),
      slidesToScroll: parseInt(element.getAttribute('data-slides-to-scroll') || '1'),
      spaceBetween: parseInt(element.getAttribute('data-space-between') || '0'),
      centeredSlides: element.hasAttribute('data-centered-slides'),
      loop: element.hasAttribute('data-loop'),
      initialSlide: parseInt(element.getAttribute('data-initial-slide') || '0'),
      direction: (element.getAttribute('data-direction') || 'horizontal') as 'horizontal' | 'vertical',
      speed: parseInt(element.getAttribute('data-speed') || '300'),
      
      // Interaction options
      allowTouchMove: !element.hasAttribute('data-no-touch'),
      threshold: parseInt(element.getAttribute('data-threshold') || '5'),
      mousewheel: element.hasAttribute('data-mousewheel'),
      keyboard: element.hasAttribute('data-keyboard'),
      grabCursor: element.hasAttribute('data-grab-cursor'),
      freeMode: element.hasAttribute('data-free-mode'),
      
      // Navigation
      navigation: element.hasAttribute('data-navigation') ? {
        enabled: true,
        hideOnClick: element.hasAttribute('data-navigation-hide-on-click'),
      } : false,
      
      // Pagination
      pagination: element.hasAttribute('data-pagination') ? {
        enabled: true,
        type: (element.getAttribute('data-pagination-type') || 'bullets') as 'bullets' | 'fraction' | 'progressbar',
        clickable: !element.hasAttribute('data-pagination-no-click'),
        hideOnClick: element.hasAttribute('data-pagination-hide-on-click'),
      } : false,
      
      // Scrollbar
      scrollbar: element.hasAttribute('data-scrollbar') ? {
        enabled: true,
        draggable: !element.hasAttribute('data-scrollbar-no-drag'),
        hide: element.hasAttribute('data-scrollbar-hide'),
      } : false,
      
      // Autoplay
      autoplay: element.hasAttribute('data-autoplay') ? {
        delay: parseInt(element.getAttribute('data-autoplay-delay') || '3000'),
        stopOnInteraction: !element.hasAttribute('data-autoplay-no-stop'),
        pauseOnHover: element.hasAttribute('data-autoplay-pause-on-hover'),
        reverseDirection: element.hasAttribute('data-autoplay-reverse'),
      } : false,
      
      // Effect
      effect: {
        type: (element.getAttribute('data-effect') || 'slide') as 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'cards' | 'creative',
      },
      
      // Lazy loading
      lazy: element.hasAttribute('data-lazy') ? {
        enabled: true,
        loadPrevNext: element.hasAttribute('data-lazy-prev-next'),
        loadPrevNextAmount: parseInt(element.getAttribute('data-lazy-amount') || '1'),
      } : { enabled: false },
      
      // Zoom
      zoom: element.hasAttribute('data-zoom') ? {
        enabled: true,
        maxRatio: parseFloat(element.getAttribute('data-zoom-max') || '3'),
        minRatio: parseFloat(element.getAttribute('data-zoom-min') || '1'),
        toggle: !element.hasAttribute('data-zoom-no-toggle'),
      } : { enabled: false },
      
      // Virtual slides
      virtual: element.hasAttribute('data-virtual') ? {
        enabled: true,
        cache: !element.hasAttribute('data-virtual-no-cache'),
        addSlidesBefore: parseInt(element.getAttribute('data-virtual-before') || '0'),
        addSlidesAfter: parseInt(element.getAttribute('data-virtual-after') || '0'),
      } : { enabled: false },
    };

    new AtomixSlider(element as HTMLElement, options);
  });
});

// Register on global Atomix object
declare global {
  interface Window {
    Atomix: {
      Slider: typeof AtomixSlider;
      [key: string]: any;
    };
  }
}

if (typeof window !== 'undefined') {
  window.Atomix = window.Atomix || {};
  window.Atomix.Slider = AtomixSlider;
}

export default AtomixSlider;