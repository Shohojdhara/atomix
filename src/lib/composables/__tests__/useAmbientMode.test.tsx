import { renderHook } from '@testing-library/react';
import { useAmbientMode } from '../useAmbientMode';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('useAmbientMode Performance', () => {
  let videoElement: HTMLVideoElement;
  let canvasElement: HTMLCanvasElement;
  let getBoundingClientRectSpy: any;
  let resizeCallback: any;
  let drawImageSpy: any;

  beforeEach(() => {
    resizeCallback = null;
    drawImageSpy = vi.fn();

    // Mock ResizeObserver
    global.ResizeObserver = class ResizeObserver {
      constructor(cb: any) {
        resizeCallback = cb;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;

    videoElement = document.createElement('video');
    canvasElement = document.createElement('canvas');

    // Mock getContext
    vi.spyOn(canvasElement, 'getContext').mockReturnValue({
      drawImage: drawImageSpy,
      filter: '',
      globalAlpha: 1,
    } as unknown as CanvasRenderingContext2D);

    getBoundingClientRectSpy = vi.spyOn(videoElement, 'getBoundingClientRect');
    getBoundingClientRectSpy.mockReturnValue({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should call getBoundingClientRect only on init and resize, but continue drawing frames', () => {
    const videoRef = { current: videoElement };
    const canvasRef = { current: canvasElement };
    const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame');

    // Simulate playing state
    Object.defineProperty(videoElement, 'paused', {
      value: false,
      writable: true
    });

    renderHook(() => useAmbientMode({
      videoRef,
      canvasRef,
      enabled: true,
      scale: 1.2,
    }));

    // Trigger play event to start the loop
    videoElement.dispatchEvent(new Event('play'));

    // Advance time by 100ms (approx 6 frames at 60fps)
    vi.advanceTimersByTime(100);

    // Ensure loop is running
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(requestAnimationFrameSpy.mock.calls.length).toBeGreaterThan(1);

    // Ensure drawImage is called repeatedly (once per frame)
    expect(drawImageSpy).toHaveBeenCalled();
    expect(drawImageSpy.mock.calls.length).toBeGreaterThan(1);

    // Should be called initially (1 time) for sizing
    expect(getBoundingClientRectSpy).toHaveBeenCalledTimes(1);

    // Ensure resizeCallback was captured
    expect(resizeCallback).toBeDefined();

    // Now trigger resize
    // Update mock return value for resize so getBoundingClientRect returns new size
    getBoundingClientRectSpy.mockReturnValue({
      width: 200,
      height: 200,
      top: 0,
      left: 0,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {}
    });

    // Trigger callback
    resizeCallback([{ contentRect: { width: 200, height: 200 } }]);

    // Should be called again (2 times total)
    expect(getBoundingClientRectSpy).toHaveBeenCalledTimes(2);

    // Canvas size should be updated
    expect(canvasElement.width).toBe(200 * 1.2);
    expect(canvasElement.height).toBe(200 * 1.2);

    // Capture call count before advancing time
    const drawCallsBefore = drawImageSpy.mock.calls.length;

    // Advance time again to ensure drawing continues with new size
    vi.advanceTimersByTime(100);

    // drawImage should continue being called
    expect(drawImageSpy.mock.calls.length).toBeGreaterThan(drawCallsBefore);

    // The arguments are (video, 0, 0, width, height).
    // The last call should have the new width/height.
    const lastCall = drawImageSpy.mock.calls[drawImageSpy.mock.calls.length - 1];
    expect(lastCall[3]).toBe(200 * 1.2); // width
    expect(lastCall[4]).toBe(200 * 1.2); // height
  });
});
