/**
 * Slider component exports
 * Following Atomix design system patterns
 */

export type {
  SliderProps,
  SliderRefs,
  SliderSlide,
  SliderState,
  SliderAutoplay,
  SliderPagination,
  SliderNavigation,
  SliderScrollbar,
  SliderEffect,
  SliderThumbs,
  SliderZoom,
  SliderLazy,
  SliderVirtual,
  SliderBreakpoint,
} from '../../lib/types/components';
export { Slider } from './Slider';
export { useSlider } from '../../lib/composables/useSlider';
export type { UseSliderOptions, UseSliderReturn } from '../../lib/composables/useSlider';