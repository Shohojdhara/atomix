import { RefObject, useEffect, useRef } from 'react';

export interface UseAmbientModeOptions {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
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
    if (!enabled || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const updateAmbientEffect = () => {
      if (!video || !canvas || !ctx) return;

      // Set canvas size to match container
      const rect = video.getBoundingClientRect();
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;

      // Draw video frame to canvas
      ctx.filter = `blur(${blur}px)`;
      ctx.globalAlpha = opacity;

      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch (e) {
        // Handle CORS or other drawing errors silently
      }

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
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handlePause);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, blur, opacity, scale, videoRef, canvasRef]);

  return {
    isActive: enabled,
  };
}
