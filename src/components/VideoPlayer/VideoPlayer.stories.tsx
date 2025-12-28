/**
 * VideoPlayer.stories.tsx
 *
 * Comprehensive Storybook stories for the VideoPlayer component, showcasing
 * various configurations, use cases, and best practices. The stories demonstrate
 * the component's versatility across different video types, layouts, and features.
 *
 * @package Atomix
 * @component VideoPlayer
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import React from 'react';
import { VideoPlayerProps } from '../../lib/types/components';
import { VideoPlayer } from './VideoPlayer';
import type { RefObject } from 'react';

/**
 * Storybook meta configuration for VideoPlayer component
 *
 * This defines the component's metadata, documentation, and controls
 * for the Storybook interface.
 */
const meta = {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The VideoPlayer component provides an advanced, modern video player with comprehensive features including custom controls, YouTube integration, glass morphism effects, and full accessibility support. It supports both regular video files and YouTube embeds with seamless auto-detection and provides a rich, interactive viewing experience.

- **Quality Selection**: Multiple video resolution options
- **Playback Speed**: Adjustable speed controls (0.25x to 4x)
- **Subtitle Support**: Multi-language subtitle tracks with WebVTT

### ⌨️ **Keyboard Shortcuts**
- **Space/K**: Play/Pause
- **Left/Right Arrows**: Seek ±10 seconds
- **Up/Down Arrows**: Volume control
- **M**: Toggle mute
- **F**: Toggle fullscreen

### 🌟 **Premium Features**
- **Ambient Mode**: YouTube-style background glow effect
- **Picture-in-Picture**: Native PiP support for regular videos
- **Download & Share**: Built-in download and sharing capabilities
- **Responsive Design**: Adapts to any screen size
- **Accessibility**: Full ARIA support and screen reader compatibility

### 📱 **Multi-Platform**
- **Cross-Browser**: Works on all modern browsers
- **Mobile Optimized**: Touch-friendly controls and responsive layout
- **Performance**: Optimized for smooth playback and effects`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Video source URL or YouTube URL',
    },
    type: {
      control: 'select',
      options: ['video', 'youtube'],
      description: 'Video player type - automatically detected for YouTube URLs',
    },
    youtubeId: {
      control: 'text',
      description: 'YouTube video ID (alternative to src for YouTube videos)',
    },
    poster: {
      control: 'text',
      description: 'Poster image URL for video thumbnail',
    },
    autoplay: {
      control: 'boolean',
      description: 'Auto-start video playback (requires muted for most browsers)',
    },
    loop: {
      control: 'boolean',
      description: 'Loop video playback infinitely',
    },
    muted: {
      control: 'boolean',
      description: 'Start video in muted state',
    },
    controls: {
      control: 'boolean',
      description: 'Show custom video controls (not applicable to YouTube)',
    },
    preload: {
      control: 'select',
      options: ['none', 'metadata', 'auto'],
      description: 'Video preload strategy',
    },
    width: {
      control: 'text',
      description: 'Player width (CSS value)',
    },
    height: {
      control: 'text',
      description: 'Player height (CSS value)',
    },
    aspectRatio: {
      control: 'select',
      options: ['16:9', '4:3', '21:9', '1:1', '9:16'],
      description: 'Video aspect ratio',
    },
    showDownload: {
      control: 'boolean',
      description: 'Show download button (regular videos only)',
    },
    showShare: {
      control: 'boolean',
      description: 'Show share button',
    },
    showSettings: {
      control: 'boolean',
      description: 'Show settings menu with quality, speed, and subtitle options',
    },
    playbackRates: {
      control: 'object',
      description: 'Available playback speed options',
    },
    ambientMode: {
      control: 'boolean',
      description: 'Enable ambient mode with background glow effect',
    },
    glass: {
      control: 'object',
      description: 'Glass morphism configuration (boolean or AtomixGlass config object)',
    },
    glassOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Glass overlay opacity (0-1)',
    },
    glassContent: {
      control: 'text',
      description: 'Custom React content to display over the glass layer',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Background Wrapper Component
 *
 * Provides consistent background styling for video player stories
 */
interface BackgroundWrapperProps {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundIndex?: number;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  height?: string;
  width?: string;
  borderRadius?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
}

/**
 * Sample video URLs and configurations
 */
// Different video sources for various stories
const videoSources = {
  sintel: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
  },
  bigBuckBunny: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  },
  elephantsDream: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
  },
  forBiggerBlazes: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
  },
  tearsOfSteel: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
  },
  subaru: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
  },
  volks: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg',
  },
  weAreGoingOnBullrun: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg',
  },
  snow: {
    src: 'https://cdn.pixabay.com/video/2025/10/22/311442_large.mp4',
    poster: 'https://cdn.pixabay.com/video/2025/10/22/311442_large.jpg',
  },
};

const sampleVideo = videoSources.sintel.src;
const samplePoster = videoSources.sintel.poster;

const sampleQualities = [
  {
    label: '1080p HD',
    src: videoSources.sintel.src,
    resolution: '1920x1080',
  },
  {
    label: '720p',
    src: videoSources.sintel.src,
    resolution: '1280x720',
  },
  {
    label: '480p',
    src: videoSources.sintel.src,
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
    label: 'Español',
    src: 'data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApTaW50ZWwgLSBVbiBjb3J0b21ldHJhamUgYW5pbWFkbyBkZSBjw7NkaWdvIGFiaWVydG8KCjAwOjAwOjA1LjAwMCAtLT4gMDA6MDA6MTAuMDAwClBvciBsYSBGdW5kYWNpw7NuIEJsZW5kZXIKCjAwOjAwOjEwLjAwMCAtLT4gMDA6MDA6MTUuMDAwCkVzdGEgZXMgdW5hIGRlbW9zdHJhY2nDs24gZGUgc3VidMOtdHVsb3MKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwClB1ZWRlcyBjYW1iaWFyIGVudHJlIGlkaW9tYXMKCjAwOjAwOjIwLjAwMCAtLT4gMDA:MDA6MjUuMDAwClVzYW5kbyBlbCBtZW7DuiBkZSBjb25maWd1cmFjacOzbg==',
    srcLang: 'es',
  },
  {
    label: 'বাংলা',
    src: 'data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApzaW50ZWwgLSDgpI/gppXgpp/gpr8g4KST4KSq4KWH4KSoIOCmuOCni+CmsOCnjeCmuCDgpI/gp43gpq/gpr/gpq7gp4fgpp/gp4fgpqEg4KaV4KaX4Ka/4KaoCgowMDowMDowNS4wMDAgLS0+IDAwOjAwOjEwLjAwMApgpqzgp43gpqzgp4fgpqjgp43gpqHgpr7gprAg4Kar4Ka+4KaJ4KaP4KaH4Ka24KaoIOCmr+CmvuCmsOCmvwowMDowMDoxMC4wMDAgLS0+IDAwOjAwOjE1LjAwMApgpqHgpr/gpp/gpr8g4Ka44Ka+4KaW4KaX4Ka/4KaX4KaC4KaXIOCmj+CmsOCmvuCmqOCmvuCmrOCmvuCmsCDgpqjgpr/gpqbgprDgp43gprbgpqgKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwCuCmhuCmquCmqOCmvuCmsOCmviDgpq3gpr7gprfgpr7gprAg4Kau4Kav4KaX4KWHIOCmquCmsOCmv+CmrOCmsOCnjeCmpOCmqCDgppXgprDgpqTgp4cg4Kaq4Ka+4Kaw4KasCgowMDowMDoyMC4wMDAgLS0+IDAwOjAwOjI1LjAwMApgprjgp4fgpp/gpr/gppngprgg4Kau4KeH4Kao4KeB4KaXIOCmrOCnjeCmr+CmreCmvuCmsOCmviDgppXgprDgp4fgpqQ=',
    srcLang: 'bn',
  },
];

/**
 * 🎬 Hero Showcase - Default VideoPlayer
 *
 * A stunning showcase of the VideoPlayer component with premium design.
 * Demonstrates the component with balanced settings suitable for most use cases.
 * Features clean, modern controls and responsive design.
 */
export const Default: Story = {
  args: {
    src: videoSources.sintel.src,
    poster: videoSources.sintel.poster,
    width: '900px',
    height: '506px',
    controls: true,
    showSettings: true,
    showDownload: true,
    showShare: true,
    quality: sampleQualities,
    subtitles: sampleSubtitles,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h1
            style={{
              margin: '0 0 16px 0',
              fontSize: '48px',
              fontWeight: '700',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em',
            }}
          >
            🎥 VideoPlayer
          </h1>
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: '20px',
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              fontWeight: '400',
            }}
          >
            Premium video player with advanced features
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: 'rgba(255,255,255,0.7)',
              textShadow: '0 1px 5px rgba(0,0,0,0.3)',
            }}
          >
            Modern controls • Quality selection • Multi-language subtitles • Glass effects
          </p>
        </div>
        <div
          style={{
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'The default VideoPlayer configuration with modern controls, quality selection, and responsive design. Perfect for most video playback scenarios with a clean, professional interface.',
      },
    },
  },
};

/**
 * 📺 YouTube Integration - ID Method
 *
 * Seamless YouTube integration using the youtubeId prop.
 * Automatically uses YouTube's native player with all standard features.
 */
export const YouTubeEmbed: Story = {
  args: {
    type: 'youtube',
    youtubeId: 'eIho2S0ZahI',
    width: '900px',
    height: '506px',
    autoplay: false,
    muted: false,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
  },
  decorators: [
    Story => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              margin: '0 0 12px 0',
              fontSize: '36px',
              fontWeight: '700',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            📺 YouTube Integration
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: '18px',
              color: 'rgba(255,255,255,0.85)',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            Native YouTube player with seamless embedding
          </p>
        </div>
        <div
          style={{
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "YouTube video integration using the youtubeId prop. Automatically uses YouTube's native player with all standard features including fullscreen, quality selection, and captions.",
      },
    },
  },
};

export const YouTubeURL: Story = {
  args: {
    src: 'https://www.youtube.com/watch?v=eIho2S0ZahI',
    width: '900px',
    height: '506px',
    autoplay: false,
    muted: false,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
  },
  decorators: [
    Story => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              margin: '0 0 12px 0',
              fontSize: '36px',
              fontWeight: '700',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            🔗 YouTube URL Detection
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: '18px',
              color: 'rgba(255,255,255,0.85)',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            Automatic YouTube URL detection and embedding
          </p>
        </div>
        <div
          style={{
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'YouTube video using a standard YouTube URL in the src prop. The component automatically detects YouTube URLs and switches to embed mode for optimal experience.',
      },
    },
  },
};

/**
 * ⚡ Advanced Features Showcase
 *
 * Complete showcase of all VideoPlayer features including quality selection,
 * subtitles, playback speed controls, download/share buttons, and comprehensive settings menu.
 */
export const AdvancedFeatures: Story = {
  args: {
    src: videoSources.bigBuckBunny.src,
    poster: videoSources.bigBuckBunny.poster,
    width: '1000px',
    height: '562px',
    controls: true,
    showDownload: true,
    showShare: true,
    showSettings: true,
    quality: sampleQualities,
    subtitles: sampleSubtitles,
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3],
    ambientMode: false,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '900px' }}>
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '42px',
              fontWeight: '700',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            ⚡ Advanced Features
          </h2>
          <p
            style={{
              margin: '0 0 12px 0',
              fontSize: '20px',
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              fontWeight: '500',
            }}
          >
            Everything you need for professional video playback
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {[
              'Quality Selection',
              'Multi-language Subtitles',
              'Playback Speed Control',
              'Download & Share',
              'Settings Menu',
              'Keyboard Shortcuts',
            ].map(feature => (
              <span
                key={feature}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  color: 'white',
                  fontWeight: '500',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                ✨ {feature}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            borderRadius: '20px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.15)',
            transform: 'perspective(1000px) rotateX(2deg)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Complete showcase of all VideoPlayer features including quality selection, subtitles, playback speed controls, download/share buttons, and comprehensive settings menu. Demonstrates the full capability of the component.',
      },
    },
  },
};

/**
 * 🌈 Ambient Mode - YouTube-Style Glow
 *
 * Ambient mode creates a YouTube-style background glow effect that extends
 * the video colors beyond the player boundaries, creating an immersive viewing experience.
 */
export const AmbientMode: Story = {
  args: {
    src: videoSources.elephantsDream.src,
    poster: samplePoster,
    width: '900px',
    height: '506px',
    ambientMode: true,
    autoplay: true,
    muted: true,
    controls: true,
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
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px',
            width: '100%',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '800px' }}>
            <h2
              style={{
                margin: '0 0 16px 0',
                fontSize: '42px',
                fontWeight: '700',
                color: 'white',
                textShadow: '0 4px 20px rgba(0,0,0,0.7)',
              }}
            >
              🌈 Ambient Mode
            </h2>
            <p
              style={{
                margin: '0 0 8px 0',
                fontSize: '20px',
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                fontWeight: '500',
              }}
            >
              YouTube-style immersive viewing experience
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '16px',
                color: 'rgba(255,255,255,0.75)',
                textShadow: '0 1px 5px rgba(0,0,0,0.4)',
              }}
            >
              Watch how the video colors extend beyond the player boundaries
            </p>
          </div>
          <div
            style={{
              borderRadius: '20px',
              boxShadow: '0 30px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Ambient mode creates a YouTube-style background glow effect that extends the video colors beyond the player boundaries, creating an immersive viewing experience perfect for entertainment content.',
      },
    },
  },
};

/**
 * ✨ Glass Morphism Effect
 *
 * VideoPlayer with glass morphism effects overlay. The translucent glass layer
 * adds visual depth and modern aesthetics while maintaining full functionality.
 */
export const GlassEffect: Story = {
  args: {
    src: videoSources.forBiggerBlazes.src,
    poster: videoSources.forBiggerBlazes.poster,
    width: '900px',
    height: '506px',
    glass: true,
    glassOpacity: 0.4,
    controls: true,
    showDownload: true,
    showShare: true,
    showSettings: true,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '42px',
              fontWeight: '700',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            ✨ Glass Morphism
          </h2>
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: '20px',
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              fontWeight: '500',
            }}
          >
            Modern frosted glass effect overlay
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: 'rgba(255,255,255,0.75)',
              textShadow: '0 1px 5px rgba(0,0,0,0.4)',
            }}
          >
            Translucent glass layer with blur and depth effects
          </p>
        </div>
        <div
          style={{
            borderRadius: '20px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'VideoPlayer with glass morphism effects overlay. The translucent glass layer adds visual depth and modern aesthetics while maintaining full functionality of video controls.',
      },
    },
  },
};

export const GlassCustom: Story = {
  args: {
    src: videoSources.tearsOfSteel.src,
    poster: videoSources.tearsOfSteel.poster,
    width: '900px',
    height: '506px',
    glass: {
      displacementScale: 35,
      blurAmount: 0.25,
      saturation: 180,
      aberrationIntensity: 2.5,
      elasticity: 0.4,
      cornerRadius: 20,
      mode: 'prominent',
      overLight: false,
    },
    glassOpacity: 0.5,
    controls: true,
    showDownload: true,
    showShare: true,
    showSettings: true,
    quality: sampleQualities,
    subtitles: sampleSubtitles,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '42px',
              fontWeight: '700',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.7)',
            }}
          >
            🎨 Custom Glass Configuration
          </h2>
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: '20px',
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              fontWeight: '500',
            }}
          >
            Fully customizable glass morphism effects
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: 'rgba(255,255,255,0.85)',
              textShadow: '0 1px 5px rgba(0,0,0,0.4)',
            }}
          >
            Advanced displacement, blur, saturation, and aberration settings
          </p>
        </div>
        <div
          style={{
            borderRadius: '20px',
            boxShadow: '0 30px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.2)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Advanced glass morphism configuration with custom displacement, blur, and saturation settings. Demonstrates the full customization potential of the glass effect overlay.',
      },
    },
  },
};

export const GlassWithInteractiveContent: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showOverlay, setShowOverlay] = useState(true);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '42px',
              fontWeight: '700',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.7)',
            }}
          >
            🎭 Interactive Glass Content
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: '18px',
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Custom interactive overlays with call-to-action elements
          </p>
        </div>
        <div
          style={{
            borderRadius: '20px',
            boxShadow: '0 30px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.2)',
          }}
        >
          <VideoPlayer
            {...args}
            glassContent={
              showOverlay ? (
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '50px',
                    textAlign: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    maxWidth: '550px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <h2
                    style={{
                      margin: '0 0 24px 0',
                      color: 'white',
                      fontSize: '32px',
                      fontWeight: '700',
                      textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    🎬 Premium Cinema Experience
                  </h2>
                  <p
                    style={{
                      margin: '0 0 36px 0',
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '18px',
                      lineHeight: '1.7',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    Immerse yourself in a cinematic journey with our advanced glass morphism
                    effects, premium video quality, and interactive features designed for the
                    ultimate viewing experience.
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <button
                      onClick={() => setShowOverlay(false)}
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '16px',
                        color: 'white',
                        padding: '16px 32px',
                        cursor: 'pointer',
                        fontSize: '17px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                        transform: 'translateY(0)',
                      }}
                      onMouseOver={e => {
                        const target = e.target as HTMLButtonElement;
                        target.style.background =
                          'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))';
                        target.style.transform = 'translateY(-3px)';
                        target.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.4)';
                      }}
                      onMouseOut={e => {
                        const target = e.target as HTMLButtonElement;
                        target.style.background =
                          'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))';
                        target.style.transform = 'translateY(0)';
                        target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                      }}
                    >
                      ▶ Start Watching
                    </button>
                    <button
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        borderRadius: '16px',
                        color: 'white',
                        padding: '16px 32px',
                        cursor: 'pointer',
                        fontSize: '17px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                      }}
                      onMouseOver={e => {
                        const target = e.target as HTMLButtonElement;
                        target.style.background = 'rgba(255, 255, 255, 0.25)';
                        target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={e => {
                        const target = e.target as HTMLButtonElement;
                        target.style.background = 'rgba(255, 255, 255, 0.15)';
                        target.style.transform = 'translateY(0)';
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ) : null
            }
          />
        </div>
      </div>
    );
  },
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    glass: {
      displacementScale: 30,
      blurAmount: 0.2,
      saturation: 170,
      aberrationIntensity: 2,
      elasticity: 0.3,
      cornerRadius: 15,
      mode: 'standard',
    },
    glassOpacity: 0.6,
    controls: true,
    showDownload: true,
    showShare: true,
    showSettings: true,
    quality: sampleQualities,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive content overlay demonstration with call-to-action elements. Shows how to create engaging pre-roll content that can be dismissed to reveal the video player underneath.',
      },
    },
  },
};

/**
 * 📱 Responsive Player - Fluid Layout
 *
 * Fully responsive video player that adapts to container width while maintaining aspect ratio.
 * Perfect for content management systems and responsive layouts.
 */
export const ResponsivePlayer: Story = {
  args: {
    src: videoSources.volks.src,
    poster: videoSources.volks.poster,
    width: '100%',
    aspectRatio: '16:9',
    controls: true,
    showDownload: true,
    showShare: true,
    showSettings: true,
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
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px',
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            marginBottom: '30px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h2
            style={{
              margin: '0 0 12px 0',
              fontSize: '36px',
              fontWeight: '700',
              textShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            📱 Responsive Video Player
          </h2>
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: '18px',
              opacity: 0.95,
              textShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }}
          >
            Adapts to any screen size with fluid width and maintained aspect ratio
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              opacity: 0.8,
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            Resize your browser window to see the responsive behavior
          </p>
        </div>
        <div
          style={{
            borderRadius: '16px',
            boxShadow: '0 15px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Fully responsive video player that adapts to container width while maintaining aspect ratio. Perfect for content management systems and responsive layouts.',
      },
    },
  },
};

export const SquareFormat: Story = {
  args: {
    src: videoSources.weAreGoingOnBullrun.src,
    poster: videoSources.weAreGoingOnBullrun.poster,
    aspectRatio: '1:1',
    width: '600px',
    controls: true,
    showSettings: true,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '36px',
              fontWeight: '700',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            ⬜ Square Format
          </h2>
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: '18px',
              opacity: 0.95,
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              fontWeight: '500',
            }}
          >
            Perfect for social media content and mobile-first designs
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              opacity: 0.8,
              textShadow: '0 1px 5px rgba(0,0,0,0.3)',
            }}
          >
            Instagram-style videos optimized for mobile viewing
          </p>
        </div>
        <div
          style={{
            borderRadius: '20px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Square aspect ratio (1:1) configuration ideal for social media content, Instagram-style videos, and mobile-optimized layouts.',
      },
    },
  },
};

export const VerticalFormat: Story = {
  args: {
    src: videoSources.bigBuckBunny.src,
    poster: videoSources.bigBuckBunny.poster,
    aspectRatio: '9:16',
    width: '400px',
    controls: true,
    showSettings: true,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '36px',
              fontWeight: '700',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            📱 Vertical/Portrait Format
          </h2>
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: '18px',
              opacity: 0.95,
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              fontWeight: '500',
            }}
          >
            Optimized for mobile viewing and story-style content
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              opacity: 0.8,
              textShadow: '0 1px 5px rgba(0,0,0,0.3)',
            }}
          >
            TikTok-style videos and story formats
          </p>
        </div>
        <div
          style={{
            borderRadius: '20px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Vertical/portrait format (9:16) perfect for mobile-first content, TikTok-style videos, and story formats. Optimized for portrait viewing experiences.',
      },
    },
  },
};

/**
 * 🎯 Specialized Configurations
 */
export const MinimalPlayer: Story = {
  args: {
    src: videoSources.elephantsDream.src,
    poster: videoSources.elephantsDream.poster,
    width: '700px',
    height: '394px',
    controls: true,
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
  decorators: [
    Story => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '36px',
              fontWeight: '700',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            🎯 Minimal Configuration
          </h2>
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: '18px',
              opacity: 0.95,
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              fontWeight: '500',
            }}
          >
            Clean, distraction-free video playback with essential controls only
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              opacity: 0.8,
              textShadow: '0 1px 5px rgba(0,0,0,0.3)',
            }}
          >
            Perfect for situations where simplicity and focus are priorities
          </p>
        </div>
        <div
          style={{
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Minimal video player configuration with only essential playback controls. Perfect for situations where simplicity and focus on content are priorities.',
      },
    },
  },
};

export const AutoplayMuted: Story = {
  args: {
    src: videoSources.forBiggerBlazes.src,
    poster: videoSources.forBiggerBlazes.poster,
    autoplay: true,
    muted: true,
    loop: true,
    width: '800px',
    height: '450px',
    controls: true,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '36px',
              fontWeight: '700',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            🔄 Autoplay & Loop
          </h2>
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: '18px',
              opacity: 0.95,
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              fontWeight: '500',
            }}
          >
            Perfect for background videos and promotional content
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              opacity: 0.8,
              textShadow: '0 1px 5px rgba(0,0,0,0.3)',
            }}
          >
            Ideal for hero sections and promotional displays
          </p>
        </div>
        <div
          style={{
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Autoplay configuration with muted audio and loop enabled. Ideal for background videos, hero sections, and promotional content that needs to play automatically.',
      },
    },
  },
};

/**
 * 🌍 Accessibility and Internationalization
 */
export const WithSubtitles: Story = {
  args: {
    src: videoSources.tearsOfSteel.src,
    poster: videoSources.tearsOfSteel.poster,
    width: '900px',
    height: '506px',
    subtitles: sampleSubtitles,
    controls: true,
    showSettings: true,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', color: 'white', maxWidth: '800px' }}>
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '36px',
              fontWeight: '700',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            🌍 Multi-Language Subtitles
          </h2>
          <p
            style={{
              margin: '0 0 12px 0',
              fontSize: '18px',
              opacity: 0.95,
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              fontWeight: '500',
            }}
          >
            Accessibility support with multiple language options
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              marginTop: '16px',
            }}
          >
            {['English', 'Español', 'বাংলা'].map(lang => (
              <span
                key={lang}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '6px 14px',
                  fontSize: '13px',
                  color: 'white',
                  fontWeight: '500',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            borderRadius: '20px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Multi-language subtitle support demonstration with WebVTT files. Users can switch between English, Spanish, and Bengali subtitles using the settings menu, enhancing accessibility and international reach.',
      },
    },
  },
};

/**
 * 🎮 Interactive Playground - Live Customization
 *
 * Interactive playground allowing real-time experimentation with all VideoPlayer properties.
 * Use the control panel to adjust settings and see how they affect the player appearance and behavior.
 */
export const InteractivePlayground: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [settings, setSettings] = useState({
      aspectRatio: '16:9' as const,
      autoplay: false,
      muted: false,
      loop: false,
      controls: true,
      showDownload: true,
      showShare: true,
      showSettings: true,
      ambientMode: false,
      glass: false,
      glassOpacity: 0.4,
    });

    const handleChange = (property: string, value: any) => {
      setSettings(prev => ({
        ...prev,
        [property]: value,
      }));
    };

    const aspectRatios = ['16:9', '4:3', '21:9', '1:1', '9:16'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '80px' }}>
        {/* Control Panel */}
        <div
          style={{
            width: '320px',
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'white',
            fontSize: '14px',
            zIndex: 10,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <h3
            style={{
              margin: '0 0 24px 0',
              fontSize: '20px',
              textAlign: 'center',
              fontWeight: '700',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            🎮 Live Controls
          </h3>

          {/* Aspect Ratio */}
          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                opacity: 0.9,
              }}
            >
              📐 Aspect Ratio
            </label>
            <select
              value={settings.aspectRatio}
              onChange={e => handleChange('aspectRatio', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              }}
            >
              {aspectRatios.map(ratio => (
                <option
                  key={ratio}
                  value={ratio}
                  style={{ backgroundColor: '#1a1a2e', color: 'white' }}
                >
                  {ratio}
                </option>
              ))}
            </select>
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.15)',
              margin: '20px 0',
            }}
          />

          {/* Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { key: 'autoplay', label: '▶️ Autoplay', emoji: '▶️' },
              { key: 'muted', label: '🔇 Muted', emoji: '🔇' },
              { key: 'loop', label: '🔁 Loop', emoji: '🔁' },
              { key: 'controls', label: '🎛️ Controls', emoji: '🎛️' },
              { key: 'showDownload', label: '⬇️ Download Button', emoji: '⬇️' },
              { key: 'showShare', label: '🔗 Share Button', emoji: '🔗' },
              { key: 'showSettings', label: '⚙️ Settings Menu', emoji: '⚙️' },
              { key: 'ambientMode', label: '🌈 Ambient Mode', emoji: '🌈' },
              { key: 'glass', label: '✨ Glass Effect', emoji: '✨' },
            ].map(({ key, label }) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'background 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <input
                  type="checkbox"
                  id={key}
                  checked={settings[key as keyof typeof settings] as boolean}
                  onChange={e => handleChange(key, e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#7AFFD7',
                  }}
                />
                <label
                  htmlFor={key}
                  style={{
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    flex: 1,
                  }}
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Video Player */}
        <div>
          <VideoPlayer
            src={videoSources.snow.src}
            poster={videoSources.snow.poster}
            width="800px"
            aspectRatio={settings.aspectRatio}
            autoplay={settings.autoplay}
            muted={settings.muted}
            loop={settings.loop}
            controls={settings.controls}
            showDownload={settings.showDownload}
            showShare={settings.showShare}
            showSettings={settings.showSettings}
            ambientMode={settings.ambientMode}
            glass={settings.glass}
            glassOpacity={settings.glassOpacity}
            quality={sampleQualities}
            subtitles={sampleSubtitles}
            onPlay={fn()}
            onPause={fn()}
            onEnded={fn()}
            onTimeUpdate={fn()}
            onVolumeChange={fn()}
            onFullscreenChange={fn()}
            onError={fn()}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground allowing real-time experimentation with all VideoPlayer properties. Use the control panel to adjust settings and see how they affect the player appearance and behavior. Perfect for developers to explore all features and configurations.',
      },
    },
  },
};
