import React, { ReactNode } from 'react';
import { BaseComponentProps } from './common';


/**
 * VideoPlayer component properties
 */
export interface VideoQuality {
  label: string;
  src: string;
  resolution?: string;
}


export interface VideoSubtitle {
  label: string;
  src: string;
  srcLang: string;
  default?: boolean;
}


export interface VideoChapter {
  title: string;
  startTime: number;
  endTime?: number;
}


export interface VideoPlayerProps extends BaseComponentProps {
  /**
   * Video source URL or YouTube video ID
   */
  src: string;

  /**
   * Video player type
   */
  type?: 'video' | 'youtube';

  /**
   * YouTube video ID (alternative to src for YouTube videos)
   */
  youtubeId?: string;

  /**
   * Poster image URL
   */
  poster?: string;

  /**
   * Whether video should autoplay
   */
  autoplay?: boolean;

  /**
   * Whether video should loop
   */
  loop?: boolean;

  /**
   * Whether video should be muted
   */
  muted?: boolean;

  /**
   * Whether to show custom controls
   */
  controls?: boolean;

  /**
   * Video preload setting
   */
  preload?: 'none' | 'metadata' | 'auto';

  /**
   * Video width
   */
  width?: string | number;

  /**
   * Video height
   */
  height?: string | number;

  /**
   * Aspect ratio (e.g., '16:9', '4:3')
   */
  aspectRatio?: string;

  /**
   * Available playback rates
   */
  playbackRates?: number[];

  /**
   * Available video qualities
   */
  quality?: VideoQuality[];

  /**
   * Available subtitles
   */
  subtitles?: VideoSubtitle[];

  /**
   * Video chapters for navigation
   */
  chapters?: VideoChapter[];

  /**
   * Thumbnail images for scrubbing
   */
  thumbnails?: string[];

  /**
   * Whether to show download button
   */
  showDownload?: boolean;

  /**
   * Whether to show share button
   */
  showShare?: boolean;

  /**
   * Whether to show settings menu
   */
  showSettings?: boolean;

  /**
   * Enable ambient mode (YouTube-like background glow)
   */
  ambientMode?: boolean;

  /**
   * Glass morphism variant configuration
   * - true: Enable with default settings
   * - false/undefined: Disable glass effect
   * - object: Custom glass configuration
   */
  glass?:
  | boolean
  | {
    displacementScale?: number;
    blurAmount?: number;
    saturation?: number;
    aberrationIntensity?: number;
    elasticity?: number;
    cornerRadius?: number;
    mode?: 'standard' | 'polar' | 'prominent' | 'shader';
    overLight?: boolean;
  };

  /**
   * Glass overlay opacity (0-1) when glass variant is enabled
   * @default 0.3
   */
  glassOpacity?: number;

  /**
   * Custom content to display over the glass layer
   */
  glassContent?: React.ReactNode;

  /**
   * Play event handler
   */
  onPlay?: () => void;

  /**
   * Pause event handler
   */
  onPause?: () => void;

  /**
   * Ended event handler
   */
  onEnded?: () => void;

  /**
   * Time update event handler
   */
  onTimeUpdate?: (currentTime: number) => void;

  /**
   * Volume change event handler
   */
  onVolumeChange?: (volume: number) => void;

  /**
   * Fullscreen change event handler
   */
  onFullscreenChange?: (isFullscreen: boolean) => void;

  /**
   * Error event handler
   */
  onError?: (error: Event) => void;
}
