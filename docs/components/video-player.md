# VideoPlayer

The VideoPlayer component is an advanced video player with support for both regular video files and YouTube videos. It provides a customizable interface with features like playback controls, fullscreen mode, ambient mode, and more.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [YouTube Videos](#youtube-videos)
  - [Custom Controls](#custom-controls)
- [Props](#props)
- [Examples](#examples)
  - [Basic Video Player](#basic-video-player)
  - [YouTube Player](#youtube-player)
  - [Advanced Configuration](#advanced-configuration)

## Overview

The VideoPlayer component offers a comprehensive solution for embedding videos in your application. It supports both regular video files and YouTube videos with a consistent interface and customizable controls.

## Features

- Support for regular video files and YouTube videos
- Customizable playback controls
- Fullscreen mode
- Picture-in-Picture support
- Ambient mode (YouTube-like background glow)
- Playback rate controls
- Volume controls
- Download and share options
- Subtitles support
- Quality selection
- Responsive design
- Keyboard navigation
- Accessibility support

## Installation

```bash
npm install @shohojdhara/atomix
```

Import the component and styles:

```tsx
import { VideoPlayer } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';
```

## Usage

### Basic Usage

```tsx
import { VideoPlayer } from '@shohojdhara/atomix';

export function BasicVideoPlayer() {
  return (
    <VideoPlayer
      src="/path/to/video.mp4"
      poster="/path/to/poster.jpg"
      width="100%"
      height="auto"
    />
  );
}
```

### YouTube Videos

```tsx
import { VideoPlayer } from '@shohojdhara/atomix';

export function YouTubePlayer() {
  return (
    <VideoPlayer
      src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      type="youtube"
      width="100%"
      height="auto"
    />
  );
}
```

### Custom Controls

```tsx
import { VideoPlayer } from '@shohojdhara/atomix';

export function CustomVideoPlayer() {
  return (
    <VideoPlayer
      src="/path/to/video.mp4"
      poster="/path/to/poster.jpg"
      controls
      showDownload
      showShare
      showSettings
      ambientMode
      playbackRates={[0.5, 0.75, 1, 1.25, 1.5, 2]}
      width="100%"
      height="auto"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src* | `string` | `undefined` | Video source URL or YouTube video ID |
| type | `'video' \| 'youtube'` | `'video'` | Video player type |
| youtubeId | `string` | `undefined` | YouTube video ID (alternative to src for YouTube videos) |
| poster | `string` | `undefined` | Poster image URL |
| autoplay | `boolean` | `false` | Whether video should autoplay |
| loop | `boolean` | `false` | Whether video should loop |
| muted | `boolean` | `false` | Whether video should be muted |
| controls | `boolean` | `true` | Whether to show custom controls |
| preload | `'none' \| 'metadata' \| 'auto'` | `'metadata'` | Video preload setting |
| width | `string \| number` | `undefined` | Video width |
| height | `string \| number` | `undefined` | Video height |
| aspectRatio | `string` | `'16:9'` | Aspect ratio (e.g., '16:9', '4:3') |
| playbackRates | `number[]` | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | Available playback rates |
| quality | [VideoQuality[]](#videoquality) | `undefined` | Available video qualities |
| subtitles | [VideoSubtitle[]](#videosubtitle) | `undefined` | Available subtitles |
| chapters | [VideoChapter[]](#videochapter) | `undefined` | Video chapters for navigation |
| thumbnails | `string[]` | `undefined` | Thumbnail images for scrubbing |
| showDownload | `boolean` | `false` | Whether to show download button |
| showShare | `boolean` | `false` | Whether to show share button |
| showSettings | `boolean` | `true` | Whether to show settings menu |
| ambientMode | `boolean` | `false` | Enable ambient mode (YouTube-like background glow) |
| className | `string` | `''` | Additional CSS class names |

### Event Handlers

| Prop | Type | Description |
|------|------|-------------|
| onPlay | `() => void` | Play event handler |
| onPause | `() => void` | Pause event handler |
| onEnded | `() => void` | Ended event handler |
| onTimeUpdate | `(currentTime: number) => void` | Time update event handler |
| onVolumeChange | `(volume: number) => void` | Volume change event handler |
| onFullscreenChange | `(isFullscreen: boolean) => void` | Fullscreen change event handler |
| onError | `(error: Event) => void` | Error event handler |

### VideoQuality

| Property | Type | Description |
|----------|------|-------------|
| label | `string` | Quality label (e.g., "1080p") |
| src | `string` | Source URL for this quality |
| resolution | `string` | Resolution information (e.g., "1920x1080") |

### VideoSubtitle

| Property | Type | Description |
|----------|------|-------------|
| label | `string` | Subtitle label (e.g., "English") |
| src | `string` | Source URL for subtitle file |
| srcLang | `string` | Language code (e.g., "en") |
| default | `boolean` | Whether this is the default subtitle track |

### VideoChapter

| Property | Type | Description |
|----------|------|-------------|
| title | `string` | Chapter title |
| startTime | `number` | Start time in seconds |
| endTime | `number` | End time in seconds |

## Examples

### Basic Video Player

```tsx
import { VideoPlayer } from '@shohojdhara/atomix';

export function BasicExample() {
  return (
    <VideoPlayer
      src="/videos/sample-video.mp4"
      poster="/images/video-poster.jpg"
      width="100%"
      height="auto"
      controls
      preload="metadata"
    />
  );
}
```

### YouTube Player

```tsx
import { VideoPlayer } from '@shohojdhara/atomix';

export function YouTubeExample() {
  return (
    <VideoPlayer
      src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      type="youtube"
      width="100%"
      height="auto"
      controls
      ambientMode
    />
  );
}
```

### Advanced Configuration

```tsx
import { VideoPlayer } from '@shohojdhara/atomix';

export function AdvancedExample() {
  const subtitles = [
    { label: 'English', srcLang: 'en', src: '/subtitles/en.vtt', default: true },
    { label: 'Spanish', srcLang: 'es', src: '/subtitles/es.vtt' },
  ];

  const quality = [
    { label: '1080p', src: '/videos/sample-video-1080.mp4', resolution: '1920x1080' },
    { label: '720p', src: '/videos/sample-video-720.mp4', resolution: '1280x720' },
    { label: '480p', src: '/videos/sample-video-480.mp4', resolution: '854x480' },
  ];

  const chapters = [
    { title: 'Introduction', startTime: 0, endTime: 30 },
    { title: 'Main Content', startTime: 30, endTime: 120 },
    { title: 'Conclusion', startTime: 120, endTime: 180 },
  ];

  return (
    <VideoPlayer
      src="/videos/sample-video.mp4"
      poster="/images/video-poster.jpg"
      width="100%"
      height="auto"
      controls
      showDownload
      showShare
      showSettings
      ambientMode
      autoplay={false}
      loop={false}
      muted={false}
      preload="metadata"
      playbackRates={[0.5, 0.75, 1, 1.25, 1.5, 2]}
      subtitles={subtitles}
      quality={quality}
      chapters={chapters}
      onPlay={() => console.log('Video playing')}
      onPause={() => console.log('Video paused')}
      onEnded={() => console.log('Video ended')}
      onTimeUpdate={(time) => console.log('Current time:', time)}
    />
  );
}
```