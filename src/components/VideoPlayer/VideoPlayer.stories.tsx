import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { VideoPlayerProps } from '../../lib/types/components';
import { VideoPlayer } from './VideoPlayer';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        component: `
# VideoPlayer Component

An advanced, modern video player with custom controls, keyboard shortcuts, picture-in-picture support, fullscreen capabilities, and comprehensive accessibility features. Now supports both regular video files and YouTube embeds.

## Features

- **Dual Video Support**: Regular video files and YouTube embeds
- **Custom Controls**: Play/pause, seek, volume, fullscreen, picture-in-picture (for regular videos)
- **YouTube Integration**: Seamless YouTube video embedding with native controls
- **Keyboard Shortcuts**: Space (play/pause), arrows (seek/volume), M (mute), F (fullscreen)
- **Quality Selection**: Multiple video quality options
- **Playback Speed**: Adjustable playback rates
- **Subtitles Support**: Multiple subtitle tracks
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Full ARIA support and keyboard navigation
- **Modern UI**: Sleek, customizable interface

## YouTube Support

- **Multiple Input Methods**: Use \`youtubeId\` prop, \`type="youtube"\`, or YouTube URLs in \`src\`
- **Auto-Detection**: Automatically detects YouTube URLs and switches to embed mode
- **Native Controls**: Uses YouTube's native player controls for optimal experience
- **All YouTube Features**: Supports autoplay, muting, looping, and fullscreen

## Keyboard Shortcuts (Regular Videos)

- **Space**: Play/Pause
- **Left/Right Arrow**: Seek backward/forward 10 seconds
- **Up/Down Arrow**: Volume up/down
- **M**: Toggle mute
- **F**: Toggle fullscreen
        `,
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Video source URL or YouTube URL',
    },
    type: {
      control: 'select',
      options: ['video', 'youtube'],
      description: 'Video player type',
    },
    youtubeId: {
      control: 'text',
      description: 'YouTube video ID (alternative to src for YouTube videos)',
    },
    poster: {
      control: 'text',
      description: 'Poster image URL',
    },
    autoplay: {
      control: 'boolean',
      description: 'Whether video should autoplay',
    },
    loop: {
      control: 'boolean',
      description: 'Whether video should loop',
    },
    muted: {
      control: 'boolean',
      description: 'Whether video should be muted',
    },
    controls: {
      control: 'boolean',
      description: 'Whether to show custom controls',
    },
    aspectRatio: {
      control: 'select',
      options: ['16:9', '4:3', '21:9', '1:1'],
      description: 'Video aspect ratio',
    },
    showDownload: {
      control: 'boolean',
      description: 'Whether to show download button',
    },
    showShare: {
      control: 'boolean',
      description: 'Whether to show share button',
    },
    showSettings: {
      control: 'boolean',
      description: 'Whether to show settings menu',
    },
    ambientMode: {
      control: 'boolean',
      description: 'Enable ambient mode (YouTube-like background glow)',
    },
  },
};

export default meta;
type Story = StoryObj<VideoPlayerProps>;

// Sample video URLs (using Sintel - open source test video with subtitles)
const sampleVideo = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4';
const samplePoster =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg';

const sampleQualities = [
  {
    label: '1080p',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    resolution: '1920x1080',
  },
  {
    label: '720p',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    resolution: '1280x720',
  },
  {
    label: '480p',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    resolution: '854x480',
  },
];

const sampleSubtitles = [
  {
    label: 'English',
    src: 'data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApTaW50ZWwgLSBBbiBvcGVuIHNvdXJjZSBhbmltYXRlZCBzaG9ydCBmaWxtCgowMDowMDowNS4wMDAgLS0+IDAwOjAwOjEwLjAwMApCeSB0aGUgQmxlbmRlciBGb3VuZGF0aW9uCgowMDowMDoxMC4wMDAgLS0+IDAwOjAwOjE1LjAwMApUaGlzIGlzIGEgZGVtb25zdHJhdGlvbiBvZiBzdWJ0aXRsZXMKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwCllvdSBjYW4gc3dpdGNoIGJldHdlZW4gbGFuZ3VhZ2VzCgowMDowMDoyMC4wMDAgLS0+IDAwOjAwOjI1LjAwMApVc2luZyB0aGUgc2V0dGluZ3MgbWVudQ==',
    srcLang: 'en',
    default: true,
  },
  {
    label: 'Spanish',
    src: 'data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApTaW50ZWwgLSBVbiBjb3J0b21ldHJhamUgYW5pbWFkbyBkZSBjw7NkaWdvIGFiaWVydG8KCjAwOjAwOjA1LjAwMCAtLT4gMDA6MDA6MTAuMDAwClBvciBsYSBGdW5kYWNpw7NuIEJsZW5kZXIKCjAwOjAwOjEwLjAwMCAtLT4gMDA6MDA6MTUuMDAwCkVzdGEgZXMgdW5hIGRlbW9zdHJhY2nDs24gZGUgc3VidMOtdHVsb3MKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwClB1ZWRlcyBjYW1iaWFyIGVudHJlIGlkaW9tYXMKCjAwOjAwOjIwLjAwMCAtLT4gMDA6MDA6MjUuMDAwClVzYW5kbyBlbCBtZW7DuiBkZSBjb25maWd1cmFjacOzbg==',
    srcLang: 'es',
  },
  {
    label: 'বাংলা',
    src: 'data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApzaW50ZWwgLSDgpI/gppXgpp/gpr8g4KST4KSq4KWH4KSoIOCmuOCni+CmsOCnjeCmuCDgpI/gp43gpq/gpr/gpq7gp4fgpp/gp4fgpqEg4KaV4KaX4Ka/4KaoCgowMDowMDowNS4wMDAgLS0+IDAwOjAwOjEwLjAwMApgpqzgp43gpqzgp4fgpqjgp43gpqHgpr7gprAg4Kar4Ka+4KaJ4KaP4KaH4Ka24KaoIOCmr+CmvuCmsOCmvwowMDowMDoxMC4wMDAgLS0+IDAwOjAwOjE1LjAwMApgpqHgpr/gpp/gpr8g4Ka44Ka+4KaW4KaX4Ka/4KaX4KaC4KaXIOCmj+CmsOCmvuCmqOCmvuCmrOCmvuCmsCDgpqjgpr/gpqbgprDgp43gprbgpqgKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwCuCmhuCmquCmqOCmvuCmsOCmviDgpq3gpr7gprfgpr7gprAg4Kau4Kav4KaX4KWHIOCmquCmsOCmv+CmrOCmsOCnjeCmpOCmqCDgppXgprDgpqTgp4cg4Kaq4Ka+4Kaw4KasCgowMDowMDoyMC4wMDAgLS0+IDAwOjAwOjI1LjAwMApgprjgp4fgpp/gpr/gppngprgg4Kau4KeH4Kao4KeB4KaXIOCmrOCnjeCmr+CmreCmvuCmsOCmviDgppXgprDgp4fgpqQ=',
    srcLang: 'bn',
  },
];

export const Default: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const WithAllFeatures: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    showDownload: true,
    showShare: true,
    showSettings: true,
    quality: sampleQualities,
    subtitles: sampleSubtitles,
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const AutoplayMuted: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    autoplay: true,
    muted: true,
    width: '600px',
    height: '338px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const NoControls: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    controls: false,
    width: '600px',
    height: '338px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const SquareAspectRatio: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    aspectRatio: '1:1',
    width: '400px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const UltraWideAspectRatio: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    aspectRatio: '21:9',
    width: '800px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const ResponsivePlayer: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '100%',
    aspectRatio: '16:9',
    showDownload: true,
    showShare: true,
    quality: sampleQualities,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
  decorators: [
    Story => (
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithCustomPlaybackRates: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '700px',
    height: '394px',
    playbackRates: [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4],
    showSettings: true,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const MinimalPlayer: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '400px',
    height: '225px',
    showDownload: false,
    showShare: false,
    showSettings: false,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const LoopingVideo: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    loop: true,
    autoplay: true,
    muted: true,
    width: '500px',
    height: '281px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

// Interactive story with event handlers
export const WithEventHandlers: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '700px',
    height: '394px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const AmbientMode: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    ambientMode: true,
    autoplay: true,
    muted: true,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    Story => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const YouTubeEmbed: Story = {
  args: {
    type: 'youtube',
    youtubeId: 'dQw4w9WgXcQ',
    width: '800px',
    height: '450px',
    autoplay: false,
    muted: false,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const YouTubeURL: Story = {
  args: {
    src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    width: '800px',
    height: '450px',
    autoplay: false,
    muted: false,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const YouTubeAutoplay: Story = {
  args: {
    type: 'youtube',
    youtubeId: 'dQw4w9WgXcQ',
    width: '800px',
    height: '450px',
    autoplay: true,
    muted: true,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const WithSubtitles: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    subtitles: sampleSubtitles,
    showSettings: true,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};

export const WithBengaliSubtitles: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    subtitles: [
      {
        label: 'বাংলা',
        src: 'data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApzaW50ZWwgLSDgpI/gppXgpp/gpr8g4KST4KSq4KWH4KSoIOCmuOCni+CmsOCnjeCmuCDgpI/gp43gpq/gpr/gpq7gp4fgpp/gp4fgpqEg4KaV4KaX4Ka/4KaoCgowMDowMDowNS4wMDAgLS0+IDAwOjAwOjEwLjAwMApgpqzgp43gpqzgp4fgpqjgp43gpqHgpr7gprAg4Kar4Ka+4KaJ4KaP4KaH4Ka24KaoIOCmr+CmvuCmsOCmvwowMDowMDoxMC4wMDAgLS0+IDAwOjAwOjE1LjAwMApgpqHgpr/gpp/gpr8g4Ka44Ka+4KaW4KaX4Ka/4KaX4KaC4KaXIOCmj+CmsOCmvuCmqOCmvuCmrOCmvuCmsCDgpqjgpr/gpqbgprDgp43gprbgpqgKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwCuCmhuCmquCmqOCmvuCmsOCmviDgpq3gpr7gprfgpr7gprAg4Kau4Kav4KaX4KWHIOCmquCmsOCmv+CmrOCmsOCnjeCmpOCmqCDgppXgprDgpqTgp4cg4Kaq4Ka+4Kaw4KasCgowMDowMDoyMC4wMDAgLS0+IDAwOjAwOjI1LjAwMApgprjgp4fgpp/gpr/gppngprgg4Kau4KeH4Kao4KeB4KaXIOCmrOCnjeCmr+CmreCmvuCmsOCmviDgppXgprDgp4fgpqQ=',
        srcLang: 'bn',
        default: true,
      },
    ],
    showSettings: true,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
};
