# PhotoViewer Component - Refactoring Documentation

## Overview

The PhotoViewer component has been comprehensively refactored to follow Atomix design system guidelines. This document outlines the changes made, the new structure, and how to use the component.

## What Was Refactored

### 1. Component Structure
- **Before**: Single large file with inline sub-components
- **After**: Modular structure with separate files for each sub-component

### 2. File Organization
```
src/components/PhotoViewer/
├── PhotoViewer.tsx              # Main component
├── PhotoViewerHeader.tsx        # Header with controls
├── PhotoViewerNavigation.tsx    # Navigation buttons
├── PhotoViewerImage.tsx         # Image display with gestures
├── PhotoViewerThumbnails.tsx    # Thumbnail navigation
├── PhotoViewerInfo.tsx          # Image metadata panel
├── PhotoViewer.stories.tsx      # Storybook examples
├── index.ts                     # Component exports
├── examples/                    # Usage examples
│   ├── ImageGallery.tsx
│   └── SimpleGallery.tsx
└── scripts/                     # Vanilla JS implementation
    ├── index.ts                 # Main PhotoViewer class
    ├── PhotoViewerInteractions.ts # Event handlers & utilities
    └── bundle.ts                # Global registration
```

### 3. New Features
- **Body Class Toggle**: Adds `is-open-photoviewer` class to body element when PhotoViewer is open
- **Per-Image State Management**: Each image maintains its own zoom, rotation, and position state
- **Smart Dragging Limits**: Dragging is constrained to image boundaries based on zoom level and rotation
- **Enhanced Touch Gestures**: Improved pinch-to-zoom and pan gestures for mobile devices
- **Smooth Transitions**: Enhanced animations for image navigation and state changes
- **Smart Zoom Levels**: Intelligent zoom presets (1x, 2x, 4x) with double-click support

### 4. Type Definitions
- **ImageType** interface moved to `src/lib/types/components.ts`
- All component props properly documented with JSDoc
- Comprehensive TypeScript support

### 4. Vanilla JS Implementation
- Complete rewrite of the vanilla JS version
- Full feature parity with React component
- Proper event handling and lifecycle management
- Global API registration under `window.Atomix.PhotoViewer`

### 5. Hook Improvements
- Added missing `imageRef` to `usePhotoViewer` hook
- Better TypeScript types
- Enhanced gesture handling
- Fixed infinite re-render issues
- Added comprehensive null safety checks
- Improved performance with optimized dependencies

### 6. Error Handling & Stability
- **Null Safety**: Comprehensive checks for DOM element availability
- **Mount State Tracking**: Prevents premature calculations
- **Graceful Degradation**: Fallbacks for missing image dimensions
- **Error Boundaries**: Try-catch blocks for critical operations
- **Performance Guards**: Prevents unnecessary re-renders

## Component Features

## Core Features
- ✅ Image navigation with keyboard support
- ✅ Zoom and pan functionality with edge constraints
- ✅ Touch gestures for mobile devices
- ✅ Fullscreen mode
- ✅ Image rotation
- ✅ Download and share capabilities
- ✅ Thumbnail navigation
- ✅ Image metadata display
- ✅ Responsive design
- ✅ Accessibility support (ARIA, keyboard navigation)
- ✅ Body class toggle for styling (`is-open-photoviewer` class)
- ✅ Per-image state persistence (zoom, pan, rotation)
- ✅ Smart boundary detection and constraint enforcement
- ✅ Smooth transitions and animations
- ✅ Error handling and null safety
- ✅ Per-image state persistence (zoom, rotation, position)
- ✅ Smart dragging boundaries
- ✅ Enhanced gesture recognition
- ✅ Smooth image transitions
- ✅ Intelligent zoom controls

### New Capabilities
- **Enhanced Type Safety**: All components properly typed
- **Modular Architecture**: Each sub-component can be used independently
- **Vanilla JS API**: Complete JavaScript implementation for non-React projects
- **Improved Performance**: Better event handling and optimizations
- **Better Error Handling**: Graceful handling of edge cases and null safety
- **Per-Image State Management**: Individual zoom, pan, and rotation states preserved
- **Advanced Boundary System**: Dynamic edge constraints based on zoom/rotation
- **Smooth UX**: Professional-grade animations and transitions
- **Mobile Excellence**: Native-like touch interactions and gestures
- **Per-Image State Management**: Each image remembers its zoom, rotation, and position
- **Smart Boundary Detection**: Dragging is intelligently constrained to image edges
- **Enhanced Mobile Experience**: Improved touch gestures and responsive design
- **Smooth Animations**: Fluid transitions between images and states
- **Advanced UX Features**: Per-image state, smart boundaries, enhanced gestures
- **Mobile-First Design**: Optimized touch interactions and responsive behavior

## Usage Examples

### React Component

```tsx
import { PhotoViewer } from '@/components/PhotoViewer';

const images = [
  {
    src: 'https://example.com/image1.jpg',
    alt: 'Image 1',
    title: 'Beautiful Landscape',
    description: 'A stunning mountain landscape',
    tags: ['nature', 'mountains']
  },
  'https://example.com/image2.jpg' // Simple string format also supported
];

function MyComponent() {
  return (
    <PhotoViewer
      images={images}
      startIndex={0}
      enableKeyboardNavigation={true}
      enableGestures={true}
      enableFullscreen={true}
      thumbnailPosition="bottom"
      onImageChange={(index) => console.log('Changed to image:', index)}
      onClose={() => console.log('Viewer closed')}
    />
  );
}

// Note: When PhotoViewer is open, an 'is-open-photoviewer' class
// is automatically added to the body element for styling purposes
```

### Vanilla JavaScript

```javascript
// Initialize from data attributes
const viewers = Atomix.PhotoViewer.init();

// Create programmatically
const viewer = new Atomix.PhotoViewer.create(document.getElementById('viewer'), {
  images: [
    { src: 'image1.jpg', title: 'Image 1' },
    { src: 'image2.jpg', title: 'Image 2' }
  ],
  startIndex: 0,
  enableKeyboardNavigation: true
});

// Open viewer programmatically
Atomix.PhotoViewer.open([
  'image1.jpg',
  'image2.jpg'
], { startIndex: 1 });

// Setup gallery
Atomix.PhotoViewer.setupGallery('.gallery', 'img');
```

### HTML Data Attributes

```html
<div data-photoviewer 
     data-images='[{"src":"image1.jpg","title":"Image 1"},{"src":"image2.jpg","title":"Image 2"}]'
     data-start-index="0"
     data-enable-keyboard-navigation="true">
  <!-- Content will be replaced by PhotoViewer -->
</div>
```

## API Reference

### React Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `(string \| ImageType)[]` | `[]` | Array of image URLs or objects |
| `startIndex` | `number` | `0` | Initial image index |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable all interactions |
| `enableKeyboardNavigation` | `boolean` | `true` | Enable arrow key navigation |
| `enableGestures` | `boolean` | `true` | Enable touch gestures |
| `enableFullscreen` | `boolean` | `true` | Enable fullscreen mode |
| `thumbnailPosition` | `'bottom' \| 'top' \| 'left' \| 'right' \| 'none'` | `'bottom'` | Thumbnail position |
| `onImageChange` | `(index: number) => void` | - | Image change callback |
| `onClose` | `() => void` | - | Close callback |

### Vanilla JS API

| Method | Description |
|--------|-------------|
| `Atomix.PhotoViewer.create(element, options)` | Create new instance |
| `Atomix.PhotoViewer.init()` | Initialize from data attributes |
| `Atomix.PhotoViewer.get(element)` | Get existing instance |
| `Atomix.PhotoViewer.open(images, options)` | Open viewer programmatically |
| `Atomix.PhotoViewer.setupGallery(selector)` | Setup gallery click handlers |
| `Atomix.PhotoViewer.disposeAll()` | Dispose all instances |

### ImageType Interface

```typescript
interface ImageType {
  src: string;
  alt?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  tags?: string[];
}
```

### Accessibility Features

- **ARIA Support**: Proper roles and labels
- **Keyboard Navigation**: Arrow keys, Escape, Tab navigation
- **Screen Reader**: Descriptive alt text and announcements
- **Focus Management**: Proper focus handling in modal state
- **High Contrast**: Works with high contrast modes
- **Reduced Motion**: Respects `prefers-reduced-motion`

## Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 74+, Safari 13+, Edge 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+
- **Touch Gestures**: Full support on touch devices
- **Fullscreen API**: Where supported by browser

## Performance Optimizations

- **Lazy Loading**: Thumbnails loaded on demand
- **Event Delegation**: Efficient event handling
- **Memory Management**: Proper cleanup on destroy
- **Image Preloading**: Smart preloading of adjacent images
- **CSS Optimizations**: Hardware acceleration for smooth animations

## Migration Guide

### From Previous Version

1. **Import Changes**:
   ```tsx
   // Old
   import { PhotoViewer, ImageType } from './PhotoViewer';
   
   // New
   import { PhotoViewer, ImageType } from './PhotoViewer';
   // ImageType now imported from types
   import { ImageType } from '../../lib/types/components';
   ```

2. **No Breaking Changes**: All existing props and functionality preserved

3. **New Features**: Additional capabilities available without migration

### Vanilla JS Migration

If migrating from a custom implementation:

1. Replace custom initialization with `Atomix.PhotoViewer.init()`
2. Use data attributes for configuration
3. Leverage built-in gallery setup with `setupGallery()`

## Troubleshooting

### Common Issues

1. **Navigator.share not available**: Gracefully handled, button hidden when unsupported
2. **Touch events**: Properly handles passive/active listeners
3. **Fullscreen API**: Falls back gracefully when not supported
4. **Image loading errors**: Shows placeholder and continues to work
5. **Body styling**: Uses `is-open-photoviewer` class on body element for additional styling
6. **getBoundingClientRect errors**: Fixed with comprehensive null checks and mount state tracking
7. **Infinite re-renders**: Resolved with optimized useEffect dependencies
8. **Performance issues**: Mitigated with proper state management and bounds calculation

### Fixed Issues (v1.1.0)

- ✅ **Fixed**: `Cannot read properties of null (reading 'getBoundingClientRect')` error
- ✅ **Fixed**: Maximum update depth exceeded warnings
- ✅ **Fixed**: Infinite re-render loops in usePhotoViewer hook
- ✅ **Fixed**: Memory leaks from improper cleanup
- ✅ **Fixed**: Race conditions with DOM element initialization
- ✅ **Fixed**: Touch gesture conflicts with browser behaviors

### CSS Styling Hook

```css
/* Example of using the body class to style other elements when PhotoViewer is open */
body.is-open-photoviewer .site-header {
  z-index: 0; /* Lower z-index when PhotoViewer is open */
}

body.is-open-photoviewer {
  overflow: hidden; /* Prevent background scrolling */
}
```

### Debug Mode

```javascript
// Enable debug logging
window.Atomix.PhotoViewer.debug = true;
```

## Recent Updates (v1.1.0)

### 🐛 Bug Fixes
- Fixed critical `getBoundingClientRect` null reference errors
- Resolved infinite re-render issues in React hook
- Added comprehensive null safety checks throughout
- Improved DOM element initialization handling
- Fixed memory leaks and performance issues

### 🚀 Performance Improvements
- Optimized useEffect dependencies to prevent unnecessary re-renders
- Added mount state tracking for better initialization
- Improved bounds calculation efficiency
- Enhanced error handling with try-catch blocks
- Better state management for per-image persistence

### ✨ UX Enhancements
- Smoother image transitions with loading states
- Enhanced touch gesture recognition
- Better boundary constraint system
- Improved mobile experience
- Professional-grade animations and easing

## Future Enhancements

- **Virtual Scrolling**: For large image sets
- **Image Comparison**: Side-by-side comparison mode
- **Video Support**: Extend to support video files
- **Advanced Filters**: Built-in image filters
- **Cloud Integration**: Direct integration with cloud storage APIs
- **AI Features**: Smart cropping and enhancement suggestions

## Contributing

When contributing to PhotoViewer:

1. Follow Atomix component guidelines
2. Maintain feature parity between React and Vanilla JS versions
3. Add comprehensive tests for new features
4. Update documentation and examples
5. Ensure accessibility compliance