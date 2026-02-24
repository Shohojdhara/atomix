import { renderHook, act } from '@testing-library/react';
import { useHeroBackgroundSlider } from '../useHeroBackgroundSlider';
import { HeroBackgroundSliderConfig } from '../../types/components';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('useHeroBackgroundSlider Performance', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should not reset interval frequently during autoplay', () => {
    const config: HeroBackgroundSliderConfig = {
      slides: [
        { type: 'image', src: 'slide1.jpg' },
        { type: 'image', src: 'slide2.jpg' },
        { type: 'image', src: 'slide3.jpg' },
      ],
      autoplay: {
        delay: 3000,
      },
      transitionDuration: 1000,
    };

    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

    const { result } = renderHook(() => useHeroBackgroundSlider(config));

    // Reset call count after initial render
    clearIntervalSpy.mockClear();

    // 1st Transition
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // 2nd Transition
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    console.log(`clearInterval calls: ${clearIntervalSpy.mock.calls.length}`);

    // With optimization, the interval should persist and not be cleared during transitions
    expect(clearIntervalSpy).toHaveBeenCalledTimes(0);
  });
});
