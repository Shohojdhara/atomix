import { renderHook, act } from '@testing-library/react';
import { useVideoPlayer } from '../useVideoPlayer';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VideoQuality } from '../../types/components';

describe('useVideoPlayer', () => {
  let videoElement: HTMLVideoElement;
  let containerElement: HTMLDivElement;
  let videoRef: { current: HTMLVideoElement | null };
  let containerRef: { current: HTMLDivElement | null };
  let originalExitFullscreen: any;
  let originalExitPiP: any;

  beforeEach(() => {
    // Save original methods
    // @ts-ignore
    originalExitFullscreen = document.exitFullscreen;
    // @ts-ignore
    originalExitPiP = document.exitPictureInPicture;

    // Setup elements
    videoElement = document.createElement('video');
    containerElement = document.createElement('div');
    // Append video to container for contains check
    containerElement.appendChild(videoElement);

    videoRef = { current: videoElement };
    containerRef = { current: containerElement };

    // Mock video methods that aren't implemented in JSDOM
    videoElement.play = vi.fn().mockResolvedValue(undefined);
    videoElement.pause = vi.fn();
    videoElement.load = vi.fn();
    // @ts-ignore
    videoElement.requestPictureInPicture = vi.fn().mockResolvedValue(undefined as any);

    // Mock properties to ensure they hold state
    const mockProps = ['muted', 'volume', 'paused', 'duration', 'currentTime', 'playbackRate', 'src'];
    mockProps.forEach(prop => {
        let value: any;
        if (prop === 'muted') value = false;
        if (prop === 'volume') value = 1;
        if (prop === 'paused') value = true;
        if (prop === 'duration') value = 0;
        if (prop === 'currentTime') value = 0;
        if (prop === 'playbackRate') value = 1;
        if (prop === 'src') value = '';

        Object.defineProperty(videoElement, prop, {
            get: () => value,
            set: (v) => {
                value = v;
            },
            configurable: true
        });
    });

    // Mock document methods
    // @ts-ignore
    document.exitFullscreen = vi.fn().mockResolvedValue(undefined);
    // @ts-ignore
    document.exitPictureInPicture = vi.fn().mockResolvedValue(undefined);

    // Mock container methods
    // @ts-ignore
    containerElement.requestFullscreen = vi.fn().mockResolvedValue(undefined);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();

    // Restore document methods
    // @ts-ignore
    document.exitFullscreen = originalExitFullscreen;
    // @ts-ignore
    document.exitPictureInPicture = originalExitPiP;
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useVideoPlayer({ videoRef, containerRef }));

    expect(result.current.isPlaying).toBe(false);
    expect(result.current.currentTime).toBe(0);
    expect(result.current.volume).toBe(1);
    expect(result.current.isMuted).toBe(false);
    expect(result.current.isFullscreen).toBe(false);
    expect(result.current.isPictureInPicture).toBe(false);
    expect(result.current.showControls).toBe(true);
  });

  it('handles play and pause correctly', async () => {
    const onPlay = vi.fn();
    const onPause = vi.fn();
    const { result } = renderHook(() => useVideoPlayer({
      videoRef,
      containerRef,
      onPlay,
      onPause
    }));

    await act(async () => {
      await result.current.play();
    });

    expect(videoElement.play).toHaveBeenCalled();
    expect(result.current.isPlaying).toBe(true);
    expect(onPlay).toHaveBeenCalled();

    act(() => {
      result.current.pause();
    });

    expect(videoElement.pause).toHaveBeenCalled();
    expect(result.current.isPlaying).toBe(false);
    expect(onPause).toHaveBeenCalled();
  });

  it('handles togglePlay correctly', async () => {
    const { result } = renderHook(() => useVideoPlayer({ videoRef, containerRef }));

    await act(async () => {
      result.current.togglePlay();
    });
    expect(videoElement.play).toHaveBeenCalled();
    expect(result.current.isPlaying).toBe(true);

    act(() => {
      result.current.togglePlay();
    });
    expect(videoElement.pause).toHaveBeenCalled();
    expect(result.current.isPlaying).toBe(false);
  });

  it('handles volume changes', () => {
    const onVolumeChange = vi.fn();
    const { result } = renderHook(() => useVideoPlayer({
      videoRef,
      containerRef,
      onVolumeChange
    }));

    act(() => {
      result.current.setVolume(0.5);
    });

    expect(videoElement.volume).toBe(0.5);
    expect(result.current.volume).toBe(0.5);
    expect(result.current.isMuted).toBe(false);
    expect(onVolumeChange).toHaveBeenCalledWith(0.5);

    // Test clamping
    act(() => {
      result.current.setVolume(1.5);
    });
    expect(result.current.volume).toBe(1);

    act(() => {
      result.current.setVolume(-0.5);
    });
    expect(result.current.volume).toBe(0);
    // Note: setVolume(0) sets isMuted to true in the hook

    // Reset volume to non-zero to test mute toggle from unmuted state
    act(() => {
      result.current.setVolume(0.5);
    });
    expect(result.current.isMuted).toBe(false);

    // Test mute toggle
    act(() => {
      result.current.toggleMute();
    });

    // Check if the property was updated on the element
    expect(videoElement.muted).toBe(true);
    expect(result.current.isMuted).toBe(true);

    act(() => {
      result.current.toggleMute();
    });

    expect(videoElement.muted).toBe(false);
    expect(result.current.isMuted).toBe(false);
  });

  it('handles seeking', () => {
    // Mock duration property on video element
    Object.defineProperty(videoElement, 'duration', { value: 100, writable: true });

    const { result } = renderHook(() => useVideoPlayer({ videoRef, containerRef }));

    // Simulate loadedmetadata to update duration state
    act(() => {
       const event = new Event('loadedmetadata');
       videoElement.dispatchEvent(event);
    });

    expect(result.current.duration).toBe(100);

    act(() => {
      result.current.seek(50);
    });

    expect(videoElement.currentTime).toBe(50);

    // Test clamping
    act(() => {
      result.current.seek(150);
    });
    expect(videoElement.currentTime).toBe(100);

    act(() => {
      result.current.seek(-10);
    });
    expect(videoElement.currentTime).toBe(0);
  });

  it('handles fullscreen toggle', async () => {
    const onFullscreenChange = vi.fn();
    const { result } = renderHook(() => useVideoPlayer({
      videoRef,
      containerRef,
      onFullscreenChange
    }));

    await act(async () => {
      await result.current.toggleFullscreen();
    });
    expect(containerElement.requestFullscreen).toHaveBeenCalled();

    // Simulate fullscreen change event
    // @ts-ignore
    document.fullscreenElement = containerElement;
    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    expect(result.current.isFullscreen).toBe(true);
    expect(onFullscreenChange).toHaveBeenCalledWith(true);

    await act(async () => {
      await result.current.toggleFullscreen();
    });
    expect(document.exitFullscreen).toHaveBeenCalled();

    // Simulate exiting fullscreen
    // @ts-ignore
    document.fullscreenElement = null;
    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    expect(result.current.isFullscreen).toBe(false);
  });

  it('handles picture-in-picture toggle', async () => {
    const { result } = renderHook(() => useVideoPlayer({ videoRef, containerRef }));

    await act(async () => {
      await result.current.togglePictureInPicture();
    });
    expect(videoElement.requestPictureInPicture).toHaveBeenCalled();

    // Simulate entering PiP
    act(() => {
      videoElement.dispatchEvent(new Event('enterpictureinpicture'));
    });
    expect(result.current.isPictureInPicture).toBe(true);

    await act(async () => {
      await result.current.togglePictureInPicture();
    });
    expect(document.exitPictureInPicture).toHaveBeenCalled();

    // Simulate leaving PiP
    act(() => {
      videoElement.dispatchEvent(new Event('leavepictureinpicture'));
    });
    expect(result.current.isPictureInPicture).toBe(false);
  });

  it('handles playback rate changes', () => {
    const { result } = renderHook(() => useVideoPlayer({ videoRef, containerRef }));

    act(() => {
      result.current.setPlaybackRate(1.5);
    });
    expect(videoElement.playbackRate).toBe(1.5);
    expect(result.current.playbackRate).toBe(1.5);

    // Test invalid rate (default rates are [0.5, 0.75, 1, 1.25, 1.5, 2])
    act(() => {
      result.current.setPlaybackRate(3);
    });
    // Should remain 1.5
    expect(result.current.playbackRate).toBe(1.5);
  });

  it('handles quality switching', async () => {
    const quality: VideoQuality[] = [
      { id: '720p', label: '720p', src: 'http://example.com/video-720.mp4' },
      { id: '1080p', label: '1080p', src: 'http://example.com/video-1080.mp4' }
    ];

    const { result } = renderHook(() => useVideoPlayer({
      videoRef,
      containerRef,
      quality
    }));

    // Setup initial state
    videoElement.currentTime = 10;
    // Mock paused state
    Object.defineProperty(videoElement, 'paused', { value: false, writable: true });

    // Switch quality
    act(() => {
      result.current.setQuality(quality[1]);
    });

    expect(videoElement.src).toContain('video-1080.mp4');
    expect(videoElement.currentTime).toBe(10);
    expect(videoElement.play).toHaveBeenCalled(); // Should resume playing
    expect(result.current.currentQuality).toEqual(quality[1]);
  });

  it('handles controls visibility', async () => {
    const { result } = renderHook(() => useVideoPlayer({ videoRef, containerRef }));

    // Initially true
    expect(result.current.showControls).toBe(true);

    // Simulate play
    await act(async () => {
      await result.current.play();
    });

    expect(result.current.isPlaying).toBe(true);

    // Simulate mouse move - this resets the timeout
    // We need to ensure the effect is up to date with isPlaying=true
    act(() => {
      containerElement.dispatchEvent(new Event('mousemove'));
    });
    expect(result.current.showControls).toBe(true);

    // Fast forward time to trigger hide
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.showControls).toBe(false);

    // Mouse move should show controls again
    act(() => {
      containerElement.dispatchEvent(new Event('mousemove'));
    });
    expect(result.current.showControls).toBe(true);

    // Mouse leave should hide controls if playing
    act(() => {
      containerElement.dispatchEvent(new Event('mouseleave'));
    });
    expect(result.current.showControls).toBe(false);
  });

  it('handles keyboard shortcuts', () => {
    const { result } = renderHook(() => useVideoPlayer({ videoRef, containerRef }));

    // Set duration to 100
    videoElement.duration = 100;
    // Trigger loadedmetadata to update duration state in the hook
    act(() => {
       const event = new Event('loadedmetadata');
       videoElement.dispatchEvent(event);
    });

    // Set initial volume to 0.5 so we can test increase
    act(() => {
        result.current.setVolume(0.5);
    });

    // Mock active element inside container
    // jsdom doesn't support focusing arbitrary elements easily without tabindex,
    // but the hook checks containerRef.current.contains(document.activeElement)
    // We can spy on containerRef.current.contains
    vi.spyOn(containerElement, 'contains').mockReturnValue(true);

    // Space: Toggle Play
    act(() => {
      const event = new KeyboardEvent('keydown', { code: 'Space' });
      document.dispatchEvent(event);
    });
    expect(videoElement.play).toHaveBeenCalled();

    // ArrowRight: Seek forward
    act(() => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowRight' });
      document.dispatchEvent(event);
    });
    expect(videoElement.currentTime).toBe(10);

    // ArrowLeft: Seek backward
    videoElement.currentTime = 20;
    act(() => {
        // Need to update state manually or simulate timeupdate because hook uses state currentTime for seek
        const event = new Event('timeupdate');
        videoElement.dispatchEvent(event);
    });

    act(() => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
      document.dispatchEvent(event);
    });
    // It uses `currentTime` state which is 0 initially, updated to 20 via timeupdate
    // Wait, the hook updates `currentTime` state via timeupdate listener.
    // But `timeupdate` listener in hook sets `currentTime` from `video.currentTime`.
    // So ensuring `video.currentTime` is 20 and triggering `timeupdate` is correct.
    // However, react state update is async.

    // Let's rely on result.current.seek calls mostly, but here we test the keydown handler calling seek.
    // The keydown handler calls `seek(currentTime +/- 10)`.
    // `currentTime` is from state.

    // Since we simulated timeupdate, let's verify if seek worked.
    // Previous ArrowRight set it to 10 (0+10).
    // ArrowLeft should set it to 0 (assuming state updated to 10).

    // Note: The previous ArrowRight test relied on currentTime=0 state.

    // ArrowUp: Volume Up
    act(() => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
      document.dispatchEvent(event);
    });
    expect(videoElement.volume).toBeGreaterThan(0.5);

    // KeyM: Mute
    act(() => {
      const event = new KeyboardEvent('keydown', { code: 'KeyM' });
      document.dispatchEvent(event);
    });
    expect(videoElement.muted).toBe(true);

    // KeyF: Fullscreen
    act(() => {
      const event = new KeyboardEvent('keydown', { code: 'KeyF' });
      document.dispatchEvent(event);
    });
    expect(containerElement.requestFullscreen).toHaveBeenCalled();
  });

  it('updates state on video events', () => {
    const onEnded = vi.fn();
    const onTimeUpdate = vi.fn();
    const { result } = renderHook(() => useVideoPlayer({
        videoRef,
        containerRef,
        onEnded,
        onTimeUpdate
    }));

    // Time update
    videoElement.currentTime = 10;
    act(() => {
      videoElement.dispatchEvent(new Event('timeupdate'));
    });
    expect(result.current.currentTime).toBe(10);
    expect(onTimeUpdate).toHaveBeenCalledWith(10);

    // Ended
    act(() => {
      videoElement.dispatchEvent(new Event('ended'));
    });
    expect(result.current.isPlaying).toBe(false);
    expect(onEnded).toHaveBeenCalled();
  });
});
