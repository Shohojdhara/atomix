import { VIDEO_PLAYER } from '../../../lib/constants/components';
import { VideoPlayerInteractions } from './VideoPlayerInteractions';

export interface VideoPlayerOptions {
  src: string;
  type?: 'video' | 'youtube';
  youtubeId?: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  aspectRatio?: string;
  playbackRates?: number[];
  quality?: Array<{ label: string; src: string; resolution?: string }>;
  subtitles?: Array<{ label: string; src: string; srcLang: string; default?: boolean }>;
  showDownload?: boolean;
  showShare?: boolean;
  showSettings?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onVolumeChange?: (volume: number) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  onError?: (error: Event) => void;
}

/**
 * Advanced Video Player - Vanilla JS Implementation
 */
export default class VideoPlayer {
  private element: HTMLElement;
  private options: VideoPlayerOptions;
  private video: HTMLVideoElement | null = null;
  private iframe: HTMLIFrameElement | null = null;
  private container: HTMLDivElement;
  private interactions: VideoPlayerInteractions;
  private controlsTimeout: NodeJS.Timeout | null = null;
  private isYouTube: boolean;
  private videoId: string | null = null;

  // State
  private isPlaying = false;
  private currentTime = 0;
  private duration = 0;
  private volume = 1;
  private isMuted = false;
  private isFullscreen = false;
  private isPictureInPicture = false;
  private isLoading = false;
  private playbackRate = 1;
  private currentQuality: { label: string; src: string; resolution?: string } | null = null;
  private showControls = true;

  constructor(element: string | HTMLElement, options: VideoPlayerOptions) {
    this.element = typeof element === 'string' ? document.querySelector(element)! : element;
    this.options = {
      controls: true,
      preload: 'metadata',
      aspectRatio: '16:9',
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
      ...options,
    };

    if (!this.element) {
      throw new Error('VideoPlayer: Element not found');
    }

    // Determine if this is a YouTube video
    this.isYouTube =
      this.options.type === 'youtube' ||
      !!this.options.youtubeId ||
      this.isYouTubeUrl(this.options.src);
    this.videoId =
      this.options.youtubeId || (this.isYouTube ? this.extractYouTubeId(this.options.src) : null);

    this.currentQuality = this.options.quality?.[0] || null;
    this.init();
  }

  private isYouTubeUrl(url: string): boolean {
    return /(?:youtube\.com|youtu\.be)/.test(url);
  }

  private extractYouTubeId(url: string): string | null {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  private init(): void {
    this.createStructure();
    this.interactions = new VideoPlayerInteractions(this);
    this.setupEventListeners();
    this.render();
  }

  private createStructure(): void {
    this.element.className =
      `${VIDEO_PLAYER.CLASSES.BASE} ${this.isYouTube ? VIDEO_PLAYER.CLASSES.YOUTUBE : ''} ${this.element.className}`.trim();

    if (this.options.aspectRatio) {
      this.element.style.aspectRatio = this.options.aspectRatio.replace(':', '/');
    }

    this.container = document.createElement('div');
    this.container.className = VIDEO_PLAYER.CLASSES.BASE;

    if (this.isYouTube && this.videoId) {
      // Create YouTube iframe
      this.iframe = document.createElement('iframe');
      this.iframe.className = VIDEO_PLAYER.CLASSES.VIDEO;

      const params = new URLSearchParams({
        autoplay: this.options.autoplay ? '1' : '0',
        loop: this.options.loop ? '1' : '0',
        mute: this.options.muted ? '1' : '0',
        controls: this.options.controls ? '1' : '0',
        modestbranding: '1',
        rel: '0',
        ...(this.options.loop && { playlist: this.videoId }),
      });

      this.iframe.src = `https://www.youtube.com/embed/${this.videoId}?${params.toString()}`;
      this.iframe.title = 'YouTube video player';
      this.iframe.frameBorder = '0';
      this.iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      this.iframe.allowFullscreen = true;

      this.container.appendChild(this.iframe);
    } else {
      // Create regular video element
      this.video = document.createElement('video');
      this.video.className = VIDEO_PLAYER.CLASSES.VIDEO;
      this.video.src = this.options.src;
      this.video.controls = false;

      if (this.options.poster) this.video.poster = this.options.poster;
      if (this.options.autoplay) this.video.autoplay = true;
      if (this.options.loop) this.video.loop = true;
      if (this.options.muted) this.video.muted = true;
      if (this.options.preload) this.video.preload = this.options.preload;

      this.container.appendChild(this.video);

      // Add subtitles
      if (this.options.subtitles) {
        this.options.subtitles.forEach(subtitle => {
          const track = document.createElement('track');
          track.kind = 'subtitles';
          track.src = subtitle.src;
          track.srclang = subtitle.srcLang;
          track.label = subtitle.label;
          if (subtitle.default) track.default = true;
          this.video!.appendChild(track);
        });
      }
    }

    this.element.appendChild(this.container);
  }

  private setupEventListeners(): void {
    // Only setup video events for regular videos (not YouTube)
    if (this.video && !this.isYouTube) {
      // Video events
      this.video.addEventListener('loadstart', () => this.setLoading(true));
      this.video.addEventListener('canplay', () => this.setLoading(false));
      this.video.addEventListener('loadedmetadata', () => {
        this.duration = this.video!.duration;
        this.volume = this.video!.volume;
        this.isMuted = this.video!.muted;
        this.render();
      });
      this.video.addEventListener('timeupdate', () => {
        this.currentTime = this.video!.currentTime;
        this.options.onTimeUpdate?.(this.currentTime);
        this.render();
      });
      this.video.addEventListener('play', () => {
        this.isPlaying = true;
        this.options.onPlay?.();
        this.render();
      });
      this.video.addEventListener('pause', () => {
        this.isPlaying = false;
        this.options.onPause?.();
        this.render();
      });
      this.video.addEventListener('ended', () => {
        this.isPlaying = false;
        this.options.onEnded?.();
        this.render();
      });
      this.video.addEventListener('volumechange', () => {
        this.volume = this.video!.volume;
        this.isMuted = this.video!.muted;
        this.options.onVolumeChange?.(this.volume);
        this.render();
      });
      this.video.addEventListener('error', e => {
        this.setLoading(false);
        this.options.onError?.(e);
      });
      this.video.addEventListener('enterpictureinpicture', () => {
        this.isPictureInPicture = true;
        this.render();
      });
      this.video.addEventListener('leavepictureinpicture', () => {
        this.isPictureInPicture = false;
        this.render();
      });

      // Mouse events for controls (only for regular videos)
      this.container.addEventListener('mousemove', () => this.resetControlsTimeout());
      this.container.addEventListener('mouseleave', () => {
        if (this.controlsTimeout) clearTimeout(this.controlsTimeout);
        if (this.isPlaying) this.showControls = false;
        this.render();
      });
    }

    // Fullscreen events (for both video types)
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
      this.options.onFullscreenChange?.(this.isFullscreen);
      this.render();
    });
  }

  private resetControlsTimeout(): void {
    if (this.controlsTimeout) clearTimeout(this.controlsTimeout);
    this.showControls = true;
    this.render();
    this.controlsTimeout = setTimeout(() => {
      if (this.isPlaying) {
        this.showControls = false;
        this.render();
      }
    }, 3000);
  }

  private setLoading(loading: boolean): void {
    this.isLoading = loading;
    this.render();
  }

  private render(): void {
    // Remove existing controls and loading
    const existingControls = this.container.querySelector(`.${VIDEO_PLAYER.CLASSES.CONTROLS}`);
    const existingLoading = this.container.querySelector(`.${VIDEO_PLAYER.CLASSES.LOADING}`);

    if (existingControls) existingControls.remove();
    if (existingLoading) existingLoading.remove();

    // Render loading
    if (this.isLoading) {
      const loading = document.createElement('div');
      loading.className = VIDEO_PLAYER.CLASSES.LOADING;
      loading.innerHTML = `<div class="${VIDEO_PLAYER.CLASSES.SPINNER}"></div>`;
      this.container.appendChild(loading);
    }

    // Render controls (only for regular videos, not YouTube)
    if (this.options.controls && !this.isYouTube) {
      this.renderControls();
    }
  }

  private renderControls(): void {
    const controls = document.createElement('div');
    controls.className = `${VIDEO_PLAYER.CLASSES.CONTROLS} ${this.showControls ? VIDEO_PLAYER.CLASSES.CONTROLS_VISIBLE : ''}`;

    // Progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = VIDEO_PLAYER.CLASSES.PROGRESS_CONTAINER;

    const progressBar = document.createElement('div');
    progressBar.className = VIDEO_PLAYER.CLASSES.PROGRESS_BAR;

    const buffered = document.createElement('div');
    buffered.className = VIDEO_PLAYER.CLASSES.PROGRESS_BUFFERED;
    buffered.style.width = `${this.getBufferedPercentage()}%`;

    const played = document.createElement('div');
    played.className = VIDEO_PLAYER.CLASSES.PROGRESS_PLAYED;
    played.style.width = `${this.getProgressPercentage()}%`;

    const thumb = document.createElement('div');
    thumb.className = VIDEO_PLAYER.CLASSES.PROGRESS_THUMB;
    thumb.style.left = `${this.getProgressPercentage()}%`;

    progressBar.appendChild(buffered);
    progressBar.appendChild(played);
    progressBar.appendChild(thumb);
    progressContainer.appendChild(progressBar);

    // Controls row
    const controlsRow = document.createElement('div');
    controlsRow.className = VIDEO_PLAYER.CLASSES.CONTROLS_ROW;

    // Left controls
    const leftControls = document.createElement('div');
    leftControls.className = VIDEO_PLAYER.CLASSES.CONTROLS_LEFT;

    // Play/pause button
    const playButton = this.createButton(
      this.isPlaying ? 'pause' : 'play',
      this.isPlaying ? 'Pause' : 'Play',
      () => this.togglePlay()
    );
    leftControls.appendChild(playButton);

    // Skip buttons
    const skipBackButton = this.createButton('skip-back', 'Skip back 10 seconds', () =>
      this.seek(this.currentTime - 10)
    );
    const skipForwardButton = this.createButton('skip-forward', 'Skip forward 10 seconds', () =>
      this.seek(this.currentTime + 10)
    );
    leftControls.appendChild(skipBackButton);
    leftControls.appendChild(skipForwardButton);

    // Volume control
    const volumeContainer = this.createVolumeControl();
    leftControls.appendChild(volumeContainer);

    // Time display
    const timeDisplay = document.createElement('div');
    timeDisplay.className = VIDEO_PLAYER.CLASSES.TIME_DISPLAY;
    timeDisplay.innerHTML = `
      <span>${this.formatTime(this.currentTime)}</span>
      <span>/</span>
      <span>${this.formatTime(this.duration)}</span>
    `;
    leftControls.appendChild(timeDisplay);

    // Right controls
    const rightControls = document.createElement('div');
    rightControls.className = VIDEO_PLAYER.CLASSES.CONTROLS_RIGHT;

    // Settings menu
    if (this.options.showSettings) {
      const settingsContainer = this.createSettingsMenu();
      rightControls.appendChild(settingsContainer);
    }

    // Download button
    if (this.options.showDownload) {
      const downloadButton = this.createButton('download', 'Download video', () => this.download());
      rightControls.appendChild(downloadButton);
    }

    // Share button
    if (this.options.showShare) {
      const shareButton = this.createButton('share', 'Share video', () => this.share());
      rightControls.appendChild(shareButton);
    }

    // Picture-in-picture button
    const pipButton = this.createButton('picture-in-picture', 'Picture in Picture', () =>
      this.togglePictureInPicture()
    );
    rightControls.appendChild(pipButton);

    // Fullscreen button
    const fullscreenButton = this.createButton(
      this.isFullscreen ? 'minimize' : 'maximize',
      this.isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen',
      () => this.toggleFullscreen()
    );
    rightControls.appendChild(fullscreenButton);

    controlsRow.appendChild(leftControls);
    controlsRow.appendChild(rightControls);

    controls.appendChild(progressContainer);
    controls.appendChild(controlsRow);

    this.container.appendChild(controls);

    // Add event listeners
    progressBar.addEventListener('click', e => this.handleProgressClick(e));
  }

  private createButton(icon: string, label: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = VIDEO_PLAYER.CLASSES.CONTROL_BUTTON;
    button.setAttribute('aria-label', label);
    button.innerHTML = this.getIconSVG(icon);
    button.addEventListener('click', onClick);
    return button;
  }

  private createVolumeControl(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = VIDEO_PLAYER.CLASSES.VOLUME_CONTAINER;

    const button = this.createButton(
      this.isMuted || this.volume === 0 ? 'volume-x' : 'volume-2',
      this.isMuted ? 'Unmute' : 'Mute',
      () => this.toggleMute()
    );

    const slider = document.createElement('div');
    slider.className = VIDEO_PLAYER.CLASSES.VOLUME_SLIDER;

    const bar = document.createElement('div');
    bar.className = VIDEO_PLAYER.CLASSES.VOLUME_BAR;

    const fill = document.createElement('div');
    fill.className = VIDEO_PLAYER.CLASSES.VOLUME_FILL;
    fill.style.width = `${this.volume * 100}%`;

    bar.appendChild(fill);
    slider.appendChild(bar);
    container.appendChild(button);
    container.appendChild(slider);

    bar.addEventListener('click', e => this.handleVolumeClick(e));

    return container;
  }

  private createSettingsMenu(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = VIDEO_PLAYER.CLASSES.SETTINGS_CONTAINER;

    const button = this.createButton('settings', 'Settings', () => {
      const menu = container.querySelector(`.${VIDEO_PLAYER.CLASSES.SETTINGS_MENU}`);
      if (menu) {
        menu.remove();
      } else {
        this.renderSettingsMenu(container);
      }
    });

    container.appendChild(button);
    return container;
  }

  private renderSettingsMenu(container: HTMLDivElement): void {
    const menu = document.createElement('div');
    menu.className = VIDEO_PLAYER.CLASSES.SETTINGS_MENU;

    // Settings content for speed
    const content = document.createElement('div');
    content.className = VIDEO_PLAYER.CLASSES.SETTINGS_CONTENT;

    const options = document.createElement('div');
    options.className = VIDEO_PLAYER.CLASSES.SETTINGS_OPTIONS;

    this.options.playbackRates?.forEach(rate => {
      const option = document.createElement('button');
      option.className = `${VIDEO_PLAYER.CLASSES.SETTINGS_OPTION} ${this.playbackRate === rate ? VIDEO_PLAYER.CLASSES.SETTINGS_OPTION_ACTIVE : ''}`;
      option.textContent = `${rate}x`;
      option.addEventListener('click', () => {
        this.setPlaybackRate(rate);
        menu.remove();
      });
      options.appendChild(option);
    });

    content.appendChild(options);
    menu.appendChild(content);
    container.appendChild(menu);
  }

  private getIconSVG(icon: string): string {
    const icons: Record<string, string> = {
      play: '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="m232.4 114.49-160-80A8 8 0 0 0 60 40v160a8 8 0 0 0 12.4 6.51l160-80a8 8 0 0 0 0-14.02Z"/></svg>',
      pause:
        '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M200 32h-24a8 8 0 0 0-8 8v176a8 8 0 0 0 8 8h24a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8ZM80 32H56a8 8 0 0 0-8 8v176a8 8 0 0 0 8 8h24a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Z"/></svg>',
      'skip-back':
        '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M200 32a8 8 0 0 0-8 8v69.23L60.48 34.88A15.91 15.91 0 0 0 36 48v160a16 16 0 0 0 24.48 13.12L192 146.77V216a8 8 0 0 0 16 0V40a8 8 0 0 0-8-8Z"/></svg>',
      'skip-forward':
        '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208 32a8 8 0 0 0-8 8v69.23L68.48 34.88A15.91 15.91 0 0 0 44 48v160a16 16 0 0 0 24.48 13.12L200 146.77V216a8 8 0 0 0 16 0V40a8 8 0 0 0-8-8Z"/></svg>',
      'volume-2':
        '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M155.51 24.81a8 8 0 0 0-8.42.88L77.25 80H32a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h45.25l69.84 54.31A8 8 0 0 0 160 224V32a8 8 0 0 0-4.49-7.19ZM32 96h40a8 8 0 0 0 4.91-1.69L144 64.46v127.08L76.91 161.69A8 8 0 0 0 72 160H32ZM208 128a39.93 39.93 0 0 1-10 26.46 8 8 0 0 1-12-10.58 24 24 0 0 0 0-31.72 8 8 0 1 1 12-10.58A40 40 0 0 1 208 128Z"/></svg>',
      'volume-x':
        '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M155.51 24.81a8 8 0 0 0-8.42.88L77.25 80H32a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h45.25l69.84 54.31A8 8 0 0 0 160 224V32a8 8 0 0 0-4.49-7.19ZM32 96h40a8 8 0 0 0 4.91-1.69L144 64.46v127.08L76.91 161.69A8 8 0 0 0 72 160H32Zm171.31 16a8 8 0 0 1 0 11.31L192 134.63l11.31 11.32a8 8 0 1 1-11.32 11.31L180.68 146l-11.31 11.31a8 8 0 0 1-11.32-11.31L169.37 134l-11.32-11.31a8 8 0 0 1 11.32-11.32L180.68 122.68l11.31-11.31a8 8 0 0 1 11.32 0Z"/></svg>',
      maximize:
        '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208 48H48a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16Zm0 144H48V64h160v128Z"/></svg>',
      minimize:
        '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208 48H48a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16Zm0 144H48V64h160v128Z"/></svg>',
      settings:
        '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="m229.94 218.06-50-50a88.05 88.05 0 1 0-11.31 11.31l50 50a8 8 0 0 0 11.32-11.31ZM40 112a72 72 0 1 1 72 72 72.08 72.08 0 0 1-72-72Z"/></svg>',
      download:
        '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M224 152v56a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-56a8 8 0 0 1 16 0v56h160v-56a8 8 0 0 1 16 0Zm-101.66 5.66a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.32L136 132.69V40a8 8 0 0 0-16 0v92.69l-26.34-26.35a8 8 0 0 0-11.32 11.32Z"/></svg>',
      share:
        '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66 109.66l-48 48a8 8 0 0 1-11.32-11.32L204.69 112H165a88 88 0 0 0-85.23 66.11 8 8 0 1 1-15.5-4.22A104 104 0 0 1 165 96h39.71L170.34 61.66a8 8 0 0 1 11.32-11.32l48 48a8 8 0 0 1 0 11.32Z"/></svg>',
      'picture-in-picture':
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/></svg>',
    };
    return icons[icon] || '';
  }

  // Public API methods
  public play(): Promise<void> | void {
    if (this.video && !this.isYouTube) {
      return this.video.play();
    }
    // YouTube videos are controlled by their own player
  }

  public pause(): void {
    if (this.video && !this.isYouTube) {
      this.video.pause();
    }
    // YouTube videos are controlled by their own player
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public seek(time: number): void {
    if (this.video && !this.isYouTube) {
      this.video.currentTime = Math.max(0, Math.min(time, this.duration));
    }
  }

  public setVolume(volume: number): void {
    if (this.video && !this.isYouTube) {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      this.video.volume = clampedVolume;
    }
  }

  public toggleMute(): void {
    if (this.video && !this.isYouTube) {
      this.video.muted = !this.video.muted;
    }
  }

  public async toggleFullscreen(): Promise<void> {
    if (!this.isFullscreen) {
      if (this.container.requestFullscreen) {
        await this.container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  }

  public async togglePictureInPicture(): Promise<void> {
    if (this.video && !this.isYouTube) {
      if (!this.isPictureInPicture) {
        if (this.video.requestPictureInPicture) {
          await this.video.requestPictureInPicture();
        }
      } else {
        if (document.exitPictureInPicture) {
          await document.exitPictureInPicture();
        }
      }
    }
  }

  public setPlaybackRate(rate: number): void {
    if (this.video && !this.isYouTube && this.options.playbackRates?.includes(rate)) {
      this.video.playbackRate = rate;
      this.playbackRate = rate;
      this.render();
    }
  }

  public setQuality(quality: { label: string; src: string; resolution?: string }): void {
    if (this.video && !this.isYouTube) {
      const currentTime = this.video.currentTime;
      const wasPlaying = !this.video.paused;

      this.video.src = quality.src;
      this.video.currentTime = currentTime;

      if (wasPlaying) {
        this.video.play();
      }

      this.currentQuality = quality;
    }
  }

  public destroy(): void {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }
    this.interactions?.destroy();
    this.element.innerHTML = '';
  }

  // Helper methods
  private formatTime(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private getProgressPercentage(): number {
    return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
  }

  private getBufferedPercentage(): number {
    if (this.video && !this.isYouTube && this.video.buffered.length > 0) {
      const buffered = this.video.buffered.end(this.video.buffered.length - 1);
      return this.duration > 0 ? (buffered / this.duration) * 100 : 0;
    }
    return 0;
  }

  private handleProgressClick(e: MouseEvent): void {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    this.seek(percent * this.duration);
  }

  private handleVolumeClick(e: MouseEvent): void {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    this.setVolume(percent);
  }

  private download(): void {
    const a = document.createElement('a');
    a.href = this.options.src;
    a.download = 'video';
    a.click();
  }

  private async share(): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Video',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  }
}
