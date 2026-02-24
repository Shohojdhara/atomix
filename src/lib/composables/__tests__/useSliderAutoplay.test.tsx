import { renderHook, act } from '@testing-library/react';
import { useSlider } from '../useSlider';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SliderSlide } from '../../types/components';

describe('useSlider Autoplay Optimization', () => {
  const slides: SliderSlide[] = [
    { id: '1', content: 'Slide 1' },
    { id: '2', content: 'Slide 2' },
    { id: '3', content: 'Slide 3' },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should not reset interval when transitioning state changes', () => {
    const setIntervalSpy = vi.spyOn(global, 'setInterval');
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

    const autoplayConfig = { delay: 1000 };

    const { result } = renderHook(() =>
      useSlider({
        slides,
        autoplay: autoplayConfig,
        speed: 300,
        slidesToShow: 1,
      })
    );

    // Initial render should set interval.
    // Note: It might be called more than once due to initial state updates (like internalIndex setting)
    // causing re-renders if dependencies are unstable, though refs should be stable.
    // However, strictly, we want to verify it doesn't reset DURING autoplay cycle.

    // Let's clear mocks after initial render is done.
    setIntervalSpy.mockClear();
    clearIntervalSpy.mockClear();

    // Fast-forward to trigger autoplay
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Check if transition started
    expect(result.current.transitioning).toBe(true);

    // At this point, in the buggy version, transitioning becoming true triggers the effect cleanup and re-setup.
    // So we expect setInterval/clearInterval to have been called.

    // Let's see what happens after transition ends
    act(() => {
        vi.advanceTimersByTime(300); // speed is 300
    });

    expect(result.current.transitioning).toBe(false);

    // In the optimized version, these should be 0 because the interval persists.
    expect(setIntervalSpy).toHaveBeenCalledTimes(0);
    expect(clearIntervalSpy).toHaveBeenCalledTimes(0);
  });
});
