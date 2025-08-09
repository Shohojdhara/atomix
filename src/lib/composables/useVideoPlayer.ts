import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { VideoQuality } from '../types/components';

export interface UseVideoPlayerOptions {
  videoRef: RefObject<HTMLVideoElement>;
  containerRef: RefObject<HTMLDivElement>;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onVolumeChange?: (volume: number) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  onError?: (error: Event) => void;
  playbackRates?: number[];
  quality?: VideoQuality[];
}

export function useVideoPlayer({
  videoRef,
  containerRef,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
  onFullscreenChange,
  onError,
  playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2],
  quality,
}: UseVideoPlayerOptions) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [currentQuality, setCurrentQuality] = useState<VideoQuality | null>(quality?.[0] || null);
  const [showControls, setShowControls] = useState(true);

  const controlsTimeoutRef = useRef<NodeJS.Timeout>(null);

  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  }, [isPlaying]);

  const play = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  }, [videoRef, onPlay]);

  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    }
  }, [videoRef, onPause]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback(
    (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(0, Math.min(time, duration));
      }
    },
    [videoRef, duration]
  );

  const setVolume = useCallback(
    (newVolume: number) => {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      if (videoRef.current) {
        videoRef.current.volume = clampedVolume;
        setVolumeState(clampedVolume);
        setIsMuted(clampedVolume === 0);
        onVolumeChange?.(clampedVolume);
      }
    },
    [videoRef, onVolumeChange]
  );

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  }, [videoRef, isMuted]);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [containerRef, isFullscreen]);

  const togglePictureInPicture = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      if (!isPictureInPicture) {
        if (videoRef.current.requestPictureInPicture) {
          await videoRef.current.requestPictureInPicture();
        }
      } else {
        if (document.exitPictureInPicture) {
          await document.exitPictureInPicture();
        }
      }
    } catch (error) {
      console.error('Picture-in-picture error:', error);
    }
  }, [videoRef, isPictureInPicture]);

  const setPlaybackRate = useCallback(
    (rate: number) => {
      if (videoRef.current && playbackRates.includes(rate)) {
        videoRef.current.playbackRate = rate;
        setPlaybackRateState(rate);
      }
    },
    [videoRef, playbackRates]
  );

  const setQuality = useCallback(
    (newQuality: VideoQuality) => {
      if (videoRef.current && quality) {
        const currentTime = videoRef.current.currentTime;
        const wasPlaying = !videoRef.current.paused;

        videoRef.current.src = newQuality.src;
        videoRef.current.currentTime = currentTime;

        if (wasPlaying) {
          videoRef.current.play();
        }

        setCurrentQuality(newQuality);
      }
    },
    [videoRef, quality]
  );

  const formatTime = useCallback((time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const getProgressPercentage = useCallback(() => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }, [currentTime, duration]);

  const getBufferedPercentage = useCallback(() => {
    return duration > 0 ? (buffered / duration) * 100 : 0;
  }, [buffered, duration]);

  // Event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setVolumeState(video.volume);
      setIsMuted(video.muted);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleVolumeChange = () => {
      setVolumeState(video.volume);
      setIsMuted(video.muted);
      onVolumeChange?.(video.volume);
    };

    const handleError = (e: Event) => {
      setIsLoading(false);
      onError?.(e);
    };

    const handleEnterpictureinpicture = () => setIsPictureInPicture(true);
    const handleLeavepictureinpicture = () => setIsPictureInPicture(false);

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('error', handleError);
    video.addEventListener('enterpictureinpicture', handleEnterpictureinpicture);
    video.addEventListener('leavepictureinpicture', handleLeavepictureinpicture);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('error', handleError);
      video.removeEventListener('enterpictureinpicture', handleEnterpictureinpicture);
      video.removeEventListener('leavepictureinpicture', handleLeavepictureinpicture);
    };
  }, [videoRef, onPlay, onPause, onEnded, onTimeUpdate, onVolumeChange, onError]);

  // Fullscreen event listeners
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      onFullscreenChange?.(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [onFullscreenChange]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(currentTime - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(currentTime + 10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    togglePlay,
    seek,
    currentTime,
    setVolume,
    volume,
    toggleMute,
    toggleFullscreen,
    containerRef,
  ]);

  // Mouse movement for controls
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = () => resetControlsTimeout();
    const handleMouseLeave = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (isPlaying) {
        setShowControls(false);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [containerRef, resetControlsTimeout, isPlaying]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isFullscreen,
    isPictureInPicture,
    isLoading,
    buffered,
    playbackRate,
    currentQuality,
    showControls,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    toggleFullscreen,
    togglePictureInPicture,
    setPlaybackRate,
    setQuality,
    formatTime,
    getProgressPercentage,
    getBufferedPercentage,
  };
}
