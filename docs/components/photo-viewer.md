# PhotoViewer

The PhotoViewer component is a comprehensive image viewer with zoom, pan, navigation, and metadata display capabilities. It provides a rich user experience for viewing images with features like keyboard navigation, touch gestures, fullscreen mode, and more.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [With Image Objects](#with-image-objects)
- [Props](#props)
- [Examples](#examples)
  - [Simple Photo Viewer](#simple-photo-viewer)
  - [Advanced Photo Viewer](#advanced-photo-viewer)

## Overview

The PhotoViewer component provides a feature-rich image viewing experience with support for navigation, zooming, panning, and metadata display. It works with both simple image URLs and detailed image objects with metadata.

## Features

- Image navigation with keyboard support
- Zoom and pan functionality
- Touch gestures for mobile devices
- Fullscreen mode
- Image rotation
- Download and share capabilities
- Thumbnail navigation
- Image metadata display
- Responsive design
- Accessibility support

## Installation

```bash
npm install @shohojdhara/atomix
```

Import the component and styles:

```tsx
import { PhotoViewer } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';
```

## Usage

### Basic Usage

```tsx
import { PhotoViewer } from '@shohojdhara/atomix';

export function BasicPhotoViewer() {
  const images = [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo3.jpg',
  ];

  return (
    <PhotoViewer
      images={images}
      startIndex={0}
    />
  );
}
```

### With Image Objects

```tsx
import { PhotoViewer } from '@shohojdhara/atomix';

export function PhotoViewerWithMetadata() {
  const images = [
    {
      src: '/images/photo1.jpg',
      alt: 'Beautiful landscape',
      title: 'Mountain Landscape',
      description: 'A beautiful mountain landscape at sunset',
      date: '2023-05-15',
      author: 'John Doe',
      tags: ['landscape', 'mountain', 'sunset']
    },
    {
      src: '/images/photo2.jpg',
      alt: 'City skyline',
      title: 'City Skyline',
      description: 'Downtown city skyline at night',
      date: '2023-06-20',
      author: 'Jane Smith',
      tags: ['city', 'skyline', 'night']
    }
  ];

  return (
    <PhotoViewer
      images={images}
      startIndex={0}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images* | `(string \| [ImageType](#imagetype))[]` | `undefined` | Array of image URLs or image objects to display in the viewer |
| startIndex | `number` | `0` | Index of the image to show first |
| className | `string` | `''` | Additional className for the root element |
| disabled | `boolean` | `false` | Whether the viewer is disabled |
| enableKeyboardNavigation | `boolean` | `true` | Enable keyboard navigation (arrow keys, escape) |
| enableGestures | `boolean` | `true` | Enable touch gestures for mobile devices |
| enableFullscreen | `boolean` | `true` | Enable fullscreen mode |
| thumbnailPosition | `'bottom' \| 'top' \| 'left' \| 'right' \| 'none'` | `'bottom'` | Position of thumbnails |
| onImageChange | `(index: number) => void` | `undefined` | Callback when image changes |
| onClose | `() => void` | `undefined` | Callback when viewer is closed |

### ImageType

| Property | Type | Description |
|----------|------|-------------|
| src* | `string` | Image source URL |
| alt | `string` | Alternative text for the image |
| thumbnail | `string` | Thumbnail image URL |
| title | `string` | Image title |
| description | `string` | Image description |
| date | `string` | Date the image was taken |
| author | `string` | Author of the image |
| tags | `string[]` | Tags associated with the image |

## Examples

### Simple Photo Viewer

```tsx
import { PhotoViewer } from '@shohojdhara/atomix';
import { useState } from 'react';

export function SimpleExample() {
  const [showViewer, setShowViewer] = useState(false);
  const images = [
    '/images/gallery/image1.jpg',
    '/images/gallery/image2.jpg',
    '/images/gallery/image3.jpg',
    '/images/gallery/image4.jpg',
  ];

  return (
    <>
      <button onClick={() => setShowViewer(true)}>
        Open Photo Viewer
      </button>
      
      {showViewer && (
        <PhotoViewer
          images={images}
          onClose={() => setShowViewer(false)}
        />
      )}
    </>
  );
}
```

### Advanced Photo Viewer

```tsx
import { PhotoViewer } from '@shohojdhara/atomix';
import { useState } from 'react';

export function AdvancedExample() {
  const [showViewer, setShowViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      src: '/images/portfolio/project1.jpg',
      alt: 'Project 1',
      title: 'Modern Architecture',
      description: 'Contemporary building design with clean lines',
      date: '2023-07-15',
      author: 'Design Studio',
      tags: ['architecture', 'modern', 'building']
    },
    {
      src: '/images/portfolio/project2.jpg',
      alt: 'Project 2',
      title: 'Urban Landscape',
      description: 'Cityscape with mixed architectural styles',
      date: '2023-08-22',
      author: 'Design Studio',
      tags: ['urban', 'city', 'landscape']
    },
    {
      src: '/images/portfolio/project3.jpg',
      alt: 'Project 3',
      title: 'Natural Elements',
      description: 'Integration of architecture with natural surroundings',
      date: '2023-09-05',
      author: 'Design Studio',
      tags: ['nature', 'integration', 'sustainable']
    }
  ];

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
    console.log(`Viewing image ${index + 1}`);
  };

  return (
    <>
      <div className="image-gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            onClick={() => {
              setCurrentImageIndex(index);
              setShowViewer(true);
            }}
            className="gallery-thumbnail"
          />
        ))}
      </div>
      
      {showViewer && (
        <PhotoViewer
          images={images}
          startIndex={currentImageIndex}
          enableKeyboardNavigation
          enableGestures
          enableFullscreen
          thumbnailPosition="bottom"
          onImageChange={handleImageChange}
          onClose={() => setShowViewer(false)}
        />
      )}
    </>
  );
}
```