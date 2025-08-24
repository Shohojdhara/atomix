import VideoPlayer from './index';

/**
 * VideoPlayer Interactions Handler
 * Manages keyboard shortcuts, touch gestures, and other user interactions
 */
export class VideoPlayerInteractions {
  private videoPlayer: VideoPlayer;
  private element: HTMLElement;
  private isDestroyed = false;

  constructor(videoPlayer: VideoPlayer) {
    this.videoPlayer = videoPlayer;
    this.element = (videoPlayer as any).container;
    this.init();
  }

  private init(): void {
    this.setupKeyboardShortcuts();
    this.setupTouchGestures();
    this.setupClickToPlay();
    this.setupDoubleClickFullscreen();
  }

  private setupKeyboardShortcuts(): void {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (this.isDestroyed) return;

      // Only handle shortcuts when the video player is focused or contains the active element
      if (
        !this.element.contains(document.activeElement) &&
        document.activeElement !== this.element
      ) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.videoPlayer.togglePlay();
          break;

        case 'ArrowLeft':
          e.preventDefault();
          this.skipBackward(e.shiftKey ? 30 : 10);
          break;

        case 'ArrowRight':
          e.preventDefault();
          this.skipForward(e.shiftKey ? 30 : 10);
          break;

        case 'ArrowUp':
          e.preventDefault();
          this.adjustVolume(0.1);
          break;

        case 'ArrowDown':
          e.preventDefault();
          this.adjustVolume(-0.1);
          break;

        case 'KeyM':
          e.preventDefault();
          this.videoPlayer.toggleMute();
          break;

        case 'KeyF':
          e.preventDefault();
          this.videoPlayer.toggleFullscreen();
          break;

        case 'KeyP':
          e.preventDefault();
          this.videoPlayer.togglePictureInPicture();
          break;

        case 'Escape':
          e.preventDefault();
          if ((this.videoPlayer as any).isFullscreen) {
            this.videoPlayer.toggleFullscreen();
          }
          break;

        // Number keys for seeking to percentage
        case 'Digit0':
        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4':
        case 'Digit5':
        case 'Digit6':
        case 'Digit7':
        case 'Digit8':
        case 'Digit9':
          e.preventDefault();
          const digit = parseInt(e.code.replace('Digit', ''));
          this.seekToPercentage(digit * 10);
          break;

        // Playback speed shortcuts
        case 'Comma':
          e.preventDefault();
          this.decreasePlaybackSpeed();
          break;

        case 'Period':
          e.preventDefault();
          this.increasePlaybackSpeed();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Store reference for cleanup
    (this as any).keydownHandler = handleKeyDown;
  }

  private setupTouchGestures(): void {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isSeeking = false;
    let isVolumeAdjusting = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (this.isDestroyed) return;

      const touch = e.touches[0];
      if (touch) {
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      }
      touchStartTime = Date.now();
      isSeeking = false;
      isVolumeAdjusting = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (this.isDestroyed) return;

      const touch = e.touches[0];
      if (!touch) return;
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determine gesture type based on movement
      if (absDeltaX > absDeltaY && absDeltaX > 20) {
        // Horizontal swipe - seeking
        if (!isSeeking) {
          isSeeking = true;
          e.preventDefault();
        }

        if (isSeeking) {
          const seekAmount =
            (deltaX / this.element.clientWidth) * (this.videoPlayer as any).duration;
          const currentTime = (this.videoPlayer as any).currentTime;
          const newTime = Math.max(
            0,
            Math.min(currentTime + seekAmount, (this.videoPlayer as any).duration)
          );
          this.showSeekPreview(newTime);
        }
      } else if (absDeltaY > absDeltaX && absDeltaY > 20) {
        // Vertical swipe - volume adjustment
        if (!isVolumeAdjusting) {
          isVolumeAdjusting = true;
          e.preventDefault();
        }

        if (isVolumeAdjusting) {
          const volumeChange = -(deltaY / this.element.clientHeight);
          const currentVolume = (this.videoPlayer as any).volume;
          const newVolume = Math.max(0, Math.min(1, currentVolume + volumeChange));
          this.videoPlayer.setVolume(newVolume);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (this.isDestroyed) return;

      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchStartTime;

      if (isSeeking) {
        // Apply the seek
        const touch = e.changedTouches[0];
        if (!touch) return;
        const deltaX = touch.clientX - touchStartX;
        const seekAmount = (deltaX / this.element.clientWidth) * (this.videoPlayer as any).duration;
        const currentTime = (this.videoPlayer as any).currentTime;
        const newTime = Math.max(
          0,
          Math.min(currentTime + seekAmount, (this.videoPlayer as any).duration)
        );
        this.videoPlayer.seek(newTime);
        this.hideSeekPreview();
      } else if (isVolumeAdjusting) {
        // Volume adjustment is already applied during move
      } else if (touchDuration < 300) {
        // Quick tap - toggle play/pause
        this.videoPlayer.togglePlay();
      }

      isSeeking = false;
      isVolumeAdjusting = false;
    };

    this.element.addEventListener('touchstart', handleTouchStart, { passive: false });
    this.element.addEventListener('touchmove', handleTouchMove, { passive: false });
    this.element.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Store references for cleanup
    (this as any).touchHandlers = { handleTouchStart, handleTouchMove, handleTouchEnd };
  }

  private setupClickToPlay(): void {
    const handleClick = (e: MouseEvent) => {
      if (this.isDestroyed) return;

      // Only toggle play if clicking on the video itself, not controls
      const target = e.target as HTMLElement;
      if (target.closest('.c-video-player__controls')) {
        return;
      }

      this.videoPlayer.togglePlay();
    };

    this.element.addEventListener('click', handleClick);
    (this as any).clickHandler = handleClick;
  }

  private setupDoubleClickFullscreen(): void {
    let clickCount = 0;
    let clickTimer: NodeJS.Timeout | null = null;

    const handleDoubleClick = (e: MouseEvent) => {
      if (this.isDestroyed) return;

      clickCount++;

      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 300);
      } else if (clickCount === 2) {
        if (clickTimer) {
          clearTimeout(clickTimer);
          clickTimer = null;
        }
        clickCount = 0;

        // Only toggle fullscreen if not clicking on controls
        const target = e.target as HTMLElement;
        if (!target.closest('.c-video-player__controls')) {
          this.videoPlayer.toggleFullscreen();
        }
      }
    };

    this.element.addEventListener('click', handleDoubleClick);
    (this as any).doubleClickHandler = handleDoubleClick;
  }

  private skipBackward(seconds: number): void {
    const currentTime = (this.videoPlayer as any).currentTime;
    this.videoPlayer.seek(Math.max(0, currentTime - seconds));
    this.showSkipIndicator(`-${seconds}s`);
  }

  private skipForward(seconds: number): void {
    const currentTime = (this.videoPlayer as any).currentTime;
    const duration = (this.videoPlayer as any).duration;
    this.videoPlayer.seek(Math.min(duration, currentTime + seconds));
    this.showSkipIndicator(`+${seconds}s`);
  }

  private adjustVolume(delta: number): void {
    const currentVolume = (this.videoPlayer as any).volume;
    const newVolume = Math.max(0, Math.min(1, currentVolume + delta));
    this.videoPlayer.setVolume(newVolume);
    this.showVolumeIndicator(newVolume);
  }

  private seekToPercentage(percentage: number): void {
    const duration = (this.videoPlayer as any).duration;
    const seekTime = (percentage / 100) * duration;
    this.videoPlayer.seek(seekTime);
    this.showSeekIndicator(`${percentage}%`);
  }

  private increasePlaybackSpeed(): void {
    const currentRate = (this.videoPlayer as any).playbackRate;
    const rates = (this.videoPlayer as any).options.playbackRates || [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(currentRate);
    const nextIndex = Math.min(currentIndex + 1, rates.length - 1);
    this.videoPlayer.setPlaybackRate(rates[nextIndex]);
    this.showSpeedIndicator(`${rates[nextIndex]}x`);
  }

  private decreasePlaybackSpeed(): void {
    const currentRate = (this.videoPlayer as any).playbackRate;
    const rates = (this.videoPlayer as any).options.playbackRates || [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(currentRate);
    const prevIndex = Math.max(currentIndex - 1, 0);
    this.videoPlayer.setPlaybackRate(rates[prevIndex]);
    this.showSpeedIndicator(`${rates[prevIndex]}x`);
  }

  // Visual feedback methods
  private showSkipIndicator(text: string): void {
    this.showIndicator(text, 'skip');
  }

  private showVolumeIndicator(volume: number): void {
    const percentage = Math.round(volume * 100);
    this.showIndicator(`${percentage}%`, 'volume');
  }

  private showSeekIndicator(text: string): void {
    this.showIndicator(text, 'seek');
  }

  private showSpeedIndicator(text: string): void {
    this.showIndicator(text, 'speed');
  }

  private showIndicator(text: string, type: string): void {
    // Remove existing indicators
    const existing = this.element.querySelector('.c-video-player__indicator');
    if (existing) existing.remove();

    const indicator = document.createElement('div');
    indicator.className = `c-video-player__indicator c-video-player__indicator--${type}`;
    indicator.textContent = text;
    indicator.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10;
      pointer-events: none;
      animation: fadeInOut 1s ease-in-out;
    `;

    // Add CSS animation if not already present
    if (!document.querySelector('#video-player-indicator-styles')) {
      const style = document.createElement('style');
      style.id = 'video-player-indicator-styles';
      style.textContent = `
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
      `;
      document.head.appendChild(style);
    }

    this.element.appendChild(indicator);

    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.remove();
      }
    }, 1000);
  }

  private showSeekPreview(time: number): void {
    // Implementation for seek preview (thumbnail, time display)
    // This would show a preview of the frame at the seek position
    console.log(`Seeking to: ${this.formatTime(time)}`);
  }

  private hideSeekPreview(): void {
    // Hide seek preview
  }

  private formatTime(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  public destroy(): void {
    this.isDestroyed = true;

    // Remove event listeners
    if ((this as any).keydownHandler) {
      document.removeEventListener('keydown', (this as any).keydownHandler);
    }

    if ((this as any).touchHandlers) {
      const { handleTouchStart, handleTouchMove, handleTouchEnd } = (this as any).touchHandlers;
      this.element.removeEventListener('touchstart', handleTouchStart);
      this.element.removeEventListener('touchmove', handleTouchMove);
      this.element.removeEventListener('touchend', handleTouchEnd);
    }

    if ((this as any).clickHandler) {
      this.element.removeEventListener('click', (this as any).clickHandler);
    }

    if ((this as any).doubleClickHandler) {
      this.element.removeEventListener('click', (this as any).doubleClickHandler);
    }
  }
}
