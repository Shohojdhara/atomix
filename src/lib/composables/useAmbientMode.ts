import { RefObject, useEffect, useRef } from 'react';

export interface UseAmbientModeOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  blur?: number;
  opacity?: number;
  scale?: number;
}

export function useAmbientMode({
  videoRef,
  canvasRef,
  enabled,
  blur = 60,
  opacity = 0.6,
  scale = 1.2,
}: UseAmbientModeOptions) {
  const animationFrameRef = useRef<number>(60);

  useEffect(() => {
    if (!enabled || !videoRef.current || !canvasRef.current) return undefined;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return undefined;

    const drawFrame = () => {
      if (!video || !canvas || !ctx) return;

      // Draw video frame to canvas
      ctx.filter = `blur(${blur}px)`;
      ctx.globalAlpha = opacity;

      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch (e) {
        // Handle CORS or other drawing errors silently
      }
    };

    // Use ResizeObserver to update canvas size only when video size changes
    const updateCanvasSize = () => {
      const rect = video.getBoundingClientRect();
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      // Redraw immediately after resize to prevent blank canvas if video is paused
      drawFrame();
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(video);

    // Initial size update
    updateCanvasSize();

    const updateAmbientEffect = () => {
      drawFrame();

      if (enabled) {
        animationFrameRef.current = requestAnimationFrame(updateAmbientEffect);
      }
    };

    // Start ambient effect when video plays
    const handlePlay = () => {
      if (enabled) {
        updateAmbientEffect();
      }
    };

    const handlePause = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handlePause);

    // Initial setup if video is already playing
    if (!video.paused) {
      handlePlay();
    }

    return () => {
      resizeObserver.disconnect();
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handlePause);
      resizeObserver.disconnect();

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, blur, opacity, scale, videoRef, canvasRef]);

  return {
    isActive: enabled,
  };
}
