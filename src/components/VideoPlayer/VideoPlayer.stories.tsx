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

import { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import React from 'react';
import { fn } from '@storybook/test';
import { VideoPlayerProps } from '../../lib/types/components';
import { VideoPlayer } from './VideoPlayer';
import type { RefObject } from 'react';

/**
 * Storybook meta configuration for VideoPlayer component
 *
 * This defines the component's metadata, documentation, and controls
 * for the Storybook interface.
 */
const meta: Meta<typeof VideoPlayer> = {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# VideoPlayer Component

An advanced, modern video player with comprehensive features, accessibility support, and optional glass morphism effects. Supports both regular video files and YouTube embeds with seamless integration.

## Key Features

### 🎥 **Dual Video Support**
- **Regular Videos**: Native HTML5 video with custom controls
- **YouTube Integration**: Seamless YouTube embedding with auto-detection

### ✨ **Glass Morphism Effects**
- **Configurable Glass Overlay**: Optional frosted glass effects with AtomixGlass integration
- **Custom Content Support**: Interactive overlays and call-to-action elements
- **Multiple Glass Modes**: Standard, polar, prominent, and shader effects

### 🎛️ **Advanced Controls**
- **Custom UI**: Modern, responsive control interface
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
- **Performance**: Optimized for smooth playback and effects
        `,
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
};

export default meta;
type Story = StoryObj<VideoPlayerProps>;

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

const backgroundImages = [
  // 0: Tech gradient - modern, professional
  'https://images.unsplash.com/photo-1636690636968-4568d7e94fe7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 1: Purple cosmic - entertainment focused
  'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop',
  // 2: Cinematic landscape - movie/video theme
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
  // 3: Abstract waves - fluid, dynamic
  'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?q=80&w=2070&auto=format&fit=crop',
  // 4: Gaming/streaming setup
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop',
];

const BackgroundWrapper = ({
  children,
  backgroundImage,
  backgroundIndex,
  overlay = false,
  overlayColor = 'rgba(0,0,0,0)',
  overlayOpacity = 0,
  height = '90vh',
  width = '90vw',
  borderRadius = '12px',
  padding = '24px',
  className = '',
  style = {},
}: BackgroundWrapperProps) => {
  const bgImage = backgroundIndex !== undefined ? backgroundImages[backgroundIndex] : backgroundImage;
  const finalOverlayColor = overlay ? 'rgba(0,0,0,0.5)' : overlayColor;
  const finalOverlayOpacity = overlay ? 0.5 : overlayOpacity;

  return (
    <div
      className={`atomix-video-background ${className}`}
      style={{
        position: 'relative',
        width: width,
        minHeight: height,
        height: '100%',
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundColor: !bgImage ? '#0f0f23' : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius,
        padding: padding,
        ...style,
      }}
    >
      {finalOverlayOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: finalOverlayColor,
            opacity: finalOverlayOpacity,
            zIndex: 1,
          }}
        />
      )}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Sample video URLs and configurations
 */
const sampleVideo = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4';
const samplePoster = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg';

const sampleQualities = [
  {
    label: '1080p HD',
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
 * Default VideoPlayer showcase
 *
 * Demonstrates the component with balanced settings suitable for most use cases.
 * Features clean, modern controls and responsive design.
 */
export const Default: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    controls: true,
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
      <BackgroundWrapper
        backgroundIndex={0}
        height="70vh"
        width="90vw"
        overlayOpacity={0.1}
        overlayColor="rgba(0,0,0,0.3)"
      >
        <Story />
      </BackgroundWrapper>
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
 * YouTube Integration Examples
 */
export const YouTubeEmbed: Story = {
  args: {
    type: 'youtube',
    youtubeId: 'eIho2S0ZahI',
    width: '800px',
    height: '450px',
    autoplay: false,
    muted: false,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundIndex={1}
        height="60vh"
        width="85vw"
        overlayOpacity={0.2}
      >
        <Story />
      </BackgroundWrapper>
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
    width: '800px',
    height: '450px',
    autoplay: false,
    muted: false,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundIndex={1}
        height="60vh"
        width="85vw"
        overlayOpacity={0.2}
      >
        <Story />
      </BackgroundWrapper>
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
 * Advanced Features Showcase
 */
export const AdvancedFeatures: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '900px',
    height: '506px',
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
      <BackgroundWrapper
        backgroundIndex={0}
        height="75vh"
        width="95vw"
        overlayOpacity={0.15}
      >
        <Story />
      </BackgroundWrapper>
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
 * Ambient Mode Example
 */
export const AmbientMode: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
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
      <BackgroundWrapper
        backgroundIndex={2}
        height="80vh"
        width="95vw"
        overlayOpacity={0.6}
        overlayColor="rgba(0,0,0,0.7)"
        padding="60px"
      >
        <Story />
      </BackgroundWrapper>
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
 * Glass Morphism Variants
 */
export const GlassEffect: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
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
      <BackgroundWrapper
        backgroundIndex={3}
        height="70vh"
        width="90vw"
        overlayOpacity={0.1}
      >
        <Story />
      </BackgroundWrapper>
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
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
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
      <BackgroundWrapper
        style={{
          background: 'radial-gradient(circle at 50% 50%, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
        }}
        height="75vh"
        width="90vw"
        padding="60px"
      >
        <Story />
      </BackgroundWrapper>
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
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showOverlay, setShowOverlay] = useState(true);
    
    return (
      <BackgroundWrapper
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        }}
        height="80vh"
        width="90vw"
        padding="60px"
      >
        <VideoPlayer
          {...args}
          glassContent={
            showOverlay ? (
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                maxWidth: '500px',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
              }}>
                <h2 style={{ 
                  margin: '0 0 20px 0', 
                  color: 'white',
                  fontSize: '28px',
                  fontWeight: '600',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                }}>
                  🎬 Premium Cinema Experience
                </h2>
                <p style={{ 
                  margin: '0 0 30px 0', 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  fontSize: '18px',
                  lineHeight: '1.6',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
                }}>
                  Immerse yourself in a cinematic journey with our advanced glass morphism effects, 
                  premium video quality, and interactive features designed for the ultimate viewing experience.
                </p>
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                  <button
                    onClick={() => setShowOverlay(false)}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      borderRadius: '14px',
                      color: 'white',
                      padding: '14px 28px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                      transform: 'translateY(0)',
                    }}
                    onMouseOver={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25))';
                      target.style.transform = 'translateY(-2px)';
                      target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))';
                      target.style.transform = 'translateY(0)';
                      target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    ▶ Start Watching
                  </button>
                  <button
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '14px',
                      color: 'white',
                      padding: '14px 28px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    }}
                    onMouseOver={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.background = 'rgba(255, 255, 255, 0.2)';
                      target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.background = 'rgba(255, 255, 255, 0.1)';
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
      </BackgroundWrapper>
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
 * Responsive and Layout Examples
 */
export const ResponsivePlayer: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
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
      <div style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '20px',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        borderRadius: '16px',
      }}>
        <div style={{
          marginBottom: '20px',
          textAlign: 'center',
          color: 'white',
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: '600' }}>
            Responsive Video Player
          </h3>
          <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
            Adapts to any screen size with fluid width and maintained aspect ratio
          </p>
        </div>
        <Story />
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
    src: sampleVideo,
    poster: samplePoster,
    aspectRatio: '1:1',
    width: '500px',
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
      <BackgroundWrapper
        backgroundIndex={4}
        height="60vh"
        width="80vw"
        overlayOpacity={0.3}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '22px', fontWeight: '600' }}>
            Square Format Video
          </h3>
          <p style={{ margin: '0 0 30px 0', fontSize: '16px', opacity: 0.9 }}>
            Perfect for social media content and mobile-first designs
          </p>
          <Story />
        </div>
      </BackgroundWrapper>
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
    src: sampleVideo,
    poster: samplePoster,
    aspectRatio: '9:16',
    width: '360px',
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
      <BackgroundWrapper
        backgroundIndex={1}
        height="90vh"
        width="70vw"
        overlayOpacity={0.2}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '22px', fontWeight: '600' }}>
            Vertical/Portrait Format
          </h3>
          <p style={{ margin: '0 0 30px 0', fontSize: '16px', opacity: 0.9 }}>
            Optimized for mobile viewing and story-style content
          </p>
          <Story />
        </div>
      </BackgroundWrapper>
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
 * Specialized Configurations
 */
export const MinimalPlayer: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '600px',
    height: '338px',
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
      <BackgroundWrapper
        backgroundIndex={0}
        height="60vh"
        width="80vw"
        overlayOpacity={0.1}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '22px', fontWeight: '600' }}>
            Minimal Configuration
          </h3>
          <p style={{ margin: '0 0 30px 0', fontSize: '16px', opacity: 0.9 }}>
            Clean, distraction-free video playback with essential controls only
          </p>
          <Story />
        </div>
      </BackgroundWrapper>
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
    src: sampleVideo,
    poster: samplePoster,
    autoplay: true,
    muted: true,
    loop: true,
    width: '700px',
    height: '394px',
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
      <BackgroundWrapper
        backgroundIndex={2}
        height="60vh"
        width="85vw"
        overlayOpacity={0.2}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '22px', fontWeight: '600' }}>
            Autoplay & Loop Configuration
          </h3>
          <p style={{ margin: '0 0 30px 0', fontSize: '16px', opacity: 0.9 }}>
            Perfect for background videos and promotional content
          </p>
          <Story />
        </div>
      </BackgroundWrapper>
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
 * Accessibility and Internationalization
 */
export const WithSubtitles: Story = {
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
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
      <BackgroundWrapper
        backgroundIndex={3}
        height="70vh"
        width="90vw"
        overlayOpacity={0.15}
      >
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '22px', fontWeight: '600' }}>
            Multi-Language Subtitles
          </h3>
          <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
            Accessibility support with English, Spanish, and Bengali subtitle options
          </p>
        </div>
        <Story />
      </BackgroundWrapper>
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
 * Interactive Playground with Dynamic Controls
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
      backgroundIndex: 0,
    });

    const handleChange = (property: string, value: any) => {
      setSettings(prev => ({
        ...prev,
        [property]: value,
      }));
    };

    const aspectRatios = ['16:9', '4:3', '21:9', '1:1', '9:16'] as const;

    return (
      <BackgroundWrapper
        backgroundIndex={settings.backgroundIndex}
        height="90vh"
        width="95vw"
        style={{ position: 'relative' }}
      >
        {/* Control Panel */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '300px',
          padding: '20px',
          borderRadius: '12px',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '14px',
          zIndex: 10,
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', textAlign: 'center' }}>
            VideoPlayer Controls
          </h3>

          {/* Aspect Ratio */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
              Aspect Ratio
            </label>
            <select
              value={settings.aspectRatio}
              onChange={(e) => handleChange('aspectRatio', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
              }}
            >
              {aspectRatios.map(ratio => (
                <option key={ratio} value={ratio} style={{ backgroundColor: '#333' }}>
                  {ratio}
                </option>
              ))}
            </select>
          </div>

          {/* Background */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
              Background ({settings.backgroundIndex + 1}/5)
            </label>
            <input
              type="range"
              min="0"
              max="4"
              value={settings.backgroundIndex}
              onChange={(e) => handleChange('backgroundIndex', parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#6366f1' }}
            />
          </div>

          {/* Glass Opacity */}
          {settings.glass && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                Glass Opacity ({settings.glassOpacity})
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.glassOpacity}
                onChange={(e) => handleChange('glassOpacity', parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1' }}
              />
            </div>
          )}

          {/* Checkboxes */}
          {[
            { key: 'autoplay', label: 'Autoplay' },
            { key: 'muted', label: 'Muted' },
            { key: 'loop', label: 'Loop' },
            { key: 'controls', label: 'Controls' },
            { key: 'showDownload', label: 'Download Button' },
            { key: 'showShare', label: 'Share Button' },
            { key: 'showSettings', label: 'Settings Menu' },
            { key: 'ambientMode', label: 'Ambient Mode' },
            { key: 'glass', label: 'Glass Effect' },
          ].map(({ key, label }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '8px' }}>
              <input
                type="checkbox"
                id={key}
                checked={settings[key as keyof typeof settings] as boolean}
                onChange={(e) => handleChange(key, e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              <label htmlFor={key} style={{ fontSize: '13px' }}>{label}</label>
            </div>
          ))}
        </div>

        {/* Video Player */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          paddingLeft: '340px',
        }}>
          <VideoPlayer
            src={sampleVideo}
            poster={samplePoster}
            width="700px"
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
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground allowing real-time experimentation with all VideoPlayer properties. Use the control panel to adjust settings and see how they affect the player appearance and behavior.',
      },
    },
  },
};