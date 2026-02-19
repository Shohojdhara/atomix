import { renderHook, act } from '@testing-library/react';
import { useAmbientMode } from '../useAmbientMode';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('useAmbientMode Performance', () => {
  let callbacks: FrameRequestCallback[] = [];
  let resizeObserverCallback: ResizeObserverCallback | null = null;
  let observeSpy: any;
  let disconnectSpy: any;

  beforeEach(() => {
    callbacks = [];
    resizeObserverCallback = null;

    // Mock requestAnimationFrame
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      callbacks.push(cb);
      return callbacks.length;
    });

    vi.stubGlobal('cancelAnimationFrame', () => {});

    // Mock ResizeObserver
    observeSpy = vi.fn();
    disconnectSpy = vi.fn();

    vi.stubGlobal('ResizeObserver', class {
      constructor(cb: ResizeObserverCallback) {
        resizeObserverCallback = cb;
      }
      observe = observeSpy;
      unobserve = vi.fn();
      disconnect = disconnectSpy;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should only resize canvas when dimensions change', () => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');

    // Mock getBoundingClientRect
    video.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    // Spy on canvas width setter
    let widthSetCount = 0;
    Object.defineProperty(canvas, 'width', {
      set: (val) => { widthSetCount++; },
      get: () => 100,
      configurable: true
    });

    // Mock getContext
    const ctx = {
        drawImage: vi.fn(),
        filter: '',
        globalAlpha: 1,
    };
    canvas.getContext = vi.fn().mockReturnValue(ctx);

    // Mock video play state
    Object.defineProperty(video, 'paused', { value: false });

    const { unmount } = renderHook(() => useAmbientMode({
      videoRef: { current: video },
      canvasRef: { current: canvas },
      enabled: true,
      scale: 1,
    }));

    // Helper to simulate rAF loop
    const runFrames = (count: number) => {
        for(let i=0; i<count; i++) {
            const currentCallbacks = [...callbacks];
            callbacks = []; // clear queue
            currentCallbacks.forEach(cb => cb(performance.now()));
        }
    }

    // Trigger initial resize via observer callback mock if available
    // (Simulating that ResizeObserver fires initially)
    if (resizeObserverCallback) {
        act(() => {
            resizeObserverCallback!([], {} as ResizeObserver);
        });
    }

    const initialCount = widthSetCount;
    // With current implementation, it sets width on every frame, so initialCount might be 0 or 1 depending on rAF calls so far.
    // Actually current implementation calls updateAmbientEffect() once on mount if playing.
    // So initialCount should be >= 1.

    // Run frames
    act(() => {
        runFrames(5);
    });

    // In current implementation, count increases on every frame
    // We expect this test to FAIL if we asserted count == initialCount
    // But for verification purpose, we assert failure or improvement.

    // If we want to assert the fix works, we expect:
    expect(widthSetCount).toBe(initialCount);

    unmount();
  });
});
