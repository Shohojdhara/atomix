import VideoPlayer, { VideoPlayerOptions } from './index';

// Global registration
declare global {
  interface Window {
    Atomix: {
      VideoPlayer: typeof VideoPlayer;
    };
  }
}

// Initialize Atomix namespace if it doesn't exist
if (typeof window !== 'undefined') {
  window.Atomix = window.Atomix || {};
  window.Atomix.VideoPlayer = VideoPlayer;
}

// Auto-initialize video players with data attributes
document.addEventListener('DOMContentLoaded', () => {
  const videoPlayers = document.querySelectorAll('[data-video-player]');

  videoPlayers.forEach(element => {
    const htmlElement = element as HTMLElement;

    // Parse options from data attributes
    const options: VideoPlayerOptions = {
      src: htmlElement.dataset.src || '',
      poster: htmlElement.dataset.poster,
      autoplay: htmlElement.dataset.autoplay === 'true',
      loop: htmlElement.dataset.loop === 'true',
      muted: htmlElement.dataset.muted === 'true',
      controls: htmlElement.dataset.controls !== 'false',
      preload: (htmlElement.dataset.preload as 'none' | 'metadata' | 'auto') || 'metadata',
      aspectRatio: htmlElement.dataset.aspectRatio || '16:9',
      showDownload: htmlElement.dataset.showDownload === 'true',
      showShare: htmlElement.dataset.showShare === 'true',
      showSettings: htmlElement.dataset.showSettings !== 'false',
    };

    // Parse playback rates
    if (htmlElement.dataset.playbackRates) {
      try {
        options.playbackRates = JSON.parse(htmlElement.dataset.playbackRates);
      } catch (e) {
        console.warn('Invalid playback rates JSON:', htmlElement.dataset.playbackRates);
      }
    }

    // Parse quality options
    if (htmlElement.dataset.quality) {
      try {
        options.quality = JSON.parse(htmlElement.dataset.quality);
      } catch (e) {
        console.warn('Invalid quality JSON:', htmlElement.dataset.quality);
      }
    }

    // Parse subtitles
    if (htmlElement.dataset.subtitles) {
      try {
        options.subtitles = JSON.parse(htmlElement.dataset.subtitles);
      } catch (e) {
        console.warn('Invalid subtitles JSON:', htmlElement.dataset.subtitles);
      }
    }

    // Initialize the video player
    try {
      new VideoPlayer(htmlElement, options);
    } catch (error) {
      console.error('Failed to initialize VideoPlayer:', error);
    }
  });
});

export default VideoPlayer;
export { VideoPlayerOptions };
