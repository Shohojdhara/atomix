# PhotoViewer

The PhotoViewer component is a comprehensive image viewer with zoom, pan, navigation, and metadata display capabilities. It provides a professional-grade image viewing experience with support for touch gestures, keyboard navigation, fullscreen mode, and responsive design.

## Overview

The PhotoViewer component creates an immersive modal experience for viewing images with advanced features like zooming, panning, rotation, and thumbnail navigation. It's designed to handle both simple image galleries and complex image collections with metadata, providing an intuitive interface across desktop and mobile devices.

## Installation

The PhotoViewer component is included in the Atomix package. Import it in your React components:

```jsx
import { PhotoViewer } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the PhotoViewer functionality is available through the global API and CSS classes.

## Basic Usage

### React

```jsx
import { PhotoViewer } from '@shohojdhara/atomix';

function MyGallery() {
  const [viewerOpen, setViewerOpen] = useState(false);
  
  const images = [
    {
      src: 'https://example.com/image1.jpg',
      alt: 'Mountain landscape',
      title: 'Beautiful Mountain View',
      description: 'A stunning view of mountain peaks',
    },
    {
      src: 'https://example.com/image2.jpg',
      alt: 'Ocean sunset',
      title: 'Sunset Over Ocean',
      description: 'Golden hour at the beach',
    },
    // Can also use simple strings
    'https://example.com/image3.jpg'
  ];

  if (!viewerOpen) return null;

  return (
    <PhotoViewer
      images={images}
      startIndex={0}
      onClose={() => setViewerOpen(false)}
      onImageChange={(index) => console.log('Viewing image:', index)}
    />
  );
}
```

### Vanilla JavaScript

```html
<!-- HTML setup -->
<div id="photo-gallery">
  <img src="image1.jpg" alt="Image 1" data-title="First Image">
  <img src="image2.jpg" alt="Image 2" data-title="Second Image">
</div>

<script>
// Initialize PhotoViewer for gallery
Atomix.PhotoViewer.setupGallery('#photo-gallery', 'img');

// Or create programmatically
const viewer = new Atomix.PhotoViewer.create(document.body, {
  images: [
    { src: 'image1.jpg', title: 'Image 1' },
    { src: 'image2.jpg', title: 'Image 2' }
  ],
  startIndex: 0
});

// Open directly
Atomix.PhotoViewer.open([
  'image1.jpg',
  'image2.jpg'
], { startIndex: 1 });
</script>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `(string \| ImageType)[]` | `[]` | Array of image URLs or image objects |
| `startIndex` | `number` | `0` | Index of the image to show first |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Whether the viewer is disabled |
| `enableKeyboardNavigation` | `boolean` | `true` | Enable keyboard navigation (arrow keys, escape) |
| `enableGestures` | `boolean` | `true` | Enable touch gestures for mobile devices |
| `enableFullscreen` | `boolean` | `true` | Enable fullscreen mode |
| `thumbnailPosition` | `'bottom' \| 'top' \| 'left' \| 'right' \| 'none'` | `'bottom'` | Position of thumbnails |
| `onImageChange` | `(index: number) => void` | - | Callback when image changes |
| `onClose` | `() => void` | - | Callback when viewer is closed |

### ImageType Interface

```typescript
interface ImageType {
  /**
   * Image source URL
   */
  src: string;
  
  /**
   * Alternative text for accessibility
   */
  alt?: string;
  
  /**
   * Thumbnail image URL
   */
  thumbnail?: string;
  
  /**
   * Image title
   */
  title?: string;
  
  /**
   * Image description
   */
  description?: string;
  
  /**
   * Date when image was taken
   */
  date?: string;
  
  /**
   * Image author/photographer
   */
  author?: string;
  
  /**
   * Associated tags
   */
  tags?: string[];
}
```

## Examples

### Simple Image Gallery

```jsx
function SimpleGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  
  const images = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
  ];

  const handleImageClick = (index) => {
    setStartIndex(index);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            onClick={() => handleImageClick(index)}
            style={{ cursor: 'pointer', width: 200, height: 150 }}
          />
        ))}
      </div>
      
      {isOpen && (
        <PhotoViewer
          images={images}
          startIndex={startIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
```

### Advanced Gallery with Metadata

```jsx
function AdvancedGallery() {
  const [isOpen, setIsOpen] = useState(false);
  
  const images = [
    {
      src: 'https://example.com/photo1.jpg',
      thumbnail: 'https://example.com/thumb1.jpg',
      alt: 'Nature photography',
      title: 'Mountain Peak at Dawn',
      description: 'Captured during a hiking expedition in the Rocky Mountains',
      date: '2024-03-15',
      author: 'John Photographer',
      tags: ['nature', 'mountains', 'sunrise']
    },
    {
      src: 'https://example.com/photo2.jpg',
      thumbnail: 'https://example.com/thumb2.jpg',
      alt: 'Urban architecture',
      title: 'City Skyline',
      description: 'Modern architectural marvel in downtown',
      date: '2024-03-16',
      author: 'Jane Architect',
      tags: ['architecture', 'city', 'modern']
    }
  ];

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        View Gallery
      </Button>
      
      {isOpen && (
        <PhotoViewer
          images={images}
          enableFullscreen={true}
          thumbnailPosition="bottom"
          onClose={() => setIsOpen(false)}
          onImageChange={(index) => {
            console.log(`Viewing: ${images[index].title}`);
          }}
        />
      )}
    </div>
  );
}
```

### Mobile-Optimized Gallery

```jsx
function MobileGallery() {
  const [isOpen, setIsOpen] = useState(false);
  
  const images = [
    'https://example.com/mobile1.jpg',
    'https://example.com/mobile2.jpg',
    'https://example.com/mobile3.jpg',
  ];

  return (
    <div>
      <div className="mobile-gallery">
        {images.map((src, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => setIsOpen(true)}
          >
            <img src={src} alt={`Gallery image ${index + 1}`} />
          </div>
        ))}
      </div>
      
      {isOpen && (
        <PhotoViewer
          images={images}
          enableGestures={true}
          enableKeyboardNavigation={false} // Disabled for mobile
          thumbnailPosition="bottom"
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
```

### Custom Thumbnail Position

```jsx
function CustomThumbnailGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailPosition, setThumbnailPosition] = useState('bottom');
  
  const images = Array.from({ length: 6 }, (_, i) => 
    `https://picsum.photos/800/600?random=${i + 1}`
  );

  return (
    <div>
      <div className="controls">
        <label>
          Thumbnail Position:
          <select 
            value={thumbnailPosition}
            onChange={(e) => setThumbnailPosition(e.target.value)}
          >
            <option value="bottom">Bottom</option>
            <option value="top">Top</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="none">None</option>
          </select>
        </label>
        <Button onClick={() => setIsOpen(true)}>
          Open Gallery
        </Button>
      </div>
      
      {isOpen && (
        <PhotoViewer
          images={images}
          thumbnailPosition={thumbnailPosition}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
```

### Portfolio Showcase

```jsx
function PortfolioShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  
  const portfolioImages = [
    {
      src: 'https://example.com/portfolio1.jpg',
      title: 'Brand Identity Design',
      description: 'Complete brand package for tech startup',
      author: 'Design Studio',
      tags: ['branding', 'identity', 'logo'],
      category: 'branding'
    },
    {
      src: 'https://example.com/portfolio2.jpg',
      title: 'Web Application UI',
      description: 'Modern dashboard interface design',
      author: 'UI/UX Team',
      tags: ['web', 'ui', 'dashboard'],
      category: 'web'
    },
    {
      src: 'https://example.com/portfolio3.jpg',
      title: 'Mobile App Design',
      description: 'iOS app for fitness tracking',
      author: 'Mobile Team',
      tags: ['mobile', 'ios', 'fitness'],
      category: 'mobile'
    }
  ];

  const filteredImages = currentCategory === 'all' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === currentCategory);

  return (
    <div className="portfolio">
      <div className="portfolio-filters">
        <Button 
          variant={currentCategory === 'all' ? 'primary' : 'outline-secondary'}
          onClick={() => setCurrentCategory('all')}
        >
          All
        </Button>
        <Button 
          variant={currentCategory === 'branding' ? 'primary' : 'outline-secondary'}
          onClick={() => setCurrentCategory('branding')}
        >
          Branding
        </Button>
        <Button 
          variant={currentCategory === 'web' ? 'primary' : 'outline-secondary'}
          onClick={() => setCurrentCategory('web')}
        >
          Web
        </Button>
        <Button 
          variant={currentCategory === 'mobile' ? 'primary' : 'outline-secondary'}
          onClick={() => setCurrentCategory('mobile')}
        >
          Mobile
        </Button>
      </div>
      
      <div className="portfolio-grid">
        {filteredImages.map((image, index) => (
          <div 
            key={index}
            className="portfolio-item"
            onClick={() => setIsOpen(true)}
          >
            <img src={image.src} alt={image.title} />
            <div className="portfolio-overlay">
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {isOpen && (
        <PhotoViewer
          images={filteredImages}
          enableFullscreen={true}
          thumbnailPosition="bottom"
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
```

## Accessibility

### Keyboard Navigation

The PhotoViewer supports comprehensive keyboard navigation:

- **Arrow Keys**: Navigate between images
- **Escape**: Close the viewer
- **Tab**: Navigate through controls
- **Enter/Space**: Activate buttons
- **+/-**: Zoom in/out
- **0**: Reset zoom
- **F**: Toggle fullscreen

### Screen Reader Support

```jsx
function AccessiblePhotoViewer() {
  const images = [
    {
      src: 'https://example.com/accessible1.jpg',
      alt: 'A serene lake surrounded by pine trees during sunset',
      title: 'Lake Sunset',
      description: 'Peaceful evening scene at Mountain Lake Park'
    },
    {
      src: 'https://example.com/accessible2.jpg',
      alt: 'Modern glass building with geometric patterns',
      title: 'Architectural Study',
      description: 'Contemporary office building downtown'
    }
  ];

  return (
    <PhotoViewer
      images={images}
      aria-label="Image gallery viewer"
      onClose={() => setIsOpen(false)}
    />
  );
}
```

### Best Practices

- Always provide meaningful `alt` text for images
- Include descriptive titles and descriptions
- Use proper ARIA labels and roles
- Ensure keyboard navigation is enabled
- Test with screen readers
- Provide context for image content

## Styling

### CSS Custom Properties

```css
:root {
  /* PhotoViewer colors */
  --atomix-photo-viewer-bg: rgba(0, 0, 0, 0.9);
  --atomix-photo-viewer-text: #ffffff;
  --atomix-photo-viewer-border: rgba(255, 255, 255, 0.2);
  --atomix-photo-viewer-button-bg: rgba(255, 255, 255, 0.1);
  --atomix-photo-viewer-button-hover: rgba(255, 255, 255, 0.2);
  
  /* Animation timing */
  --atomix-photo-viewer-transition: 0.3s ease;
  --atomix-photo-viewer-zoom-transition: 0.2s ease;
  
  /* Z-index layers */
  --atomix-photo-viewer-z-index: 9999;
  --atomix-photo-viewer-backdrop-z: 9998;
  
  /* Thumbnail sizing */
  --atomix-photo-viewer-thumbnail-size: 80px;
  --atomix-photo-viewer-thumbnail-gap: 8px;
}
```

### CSS Classes

```css
/* Main PhotoViewer container */
.c-photo-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: var(--atomix-photo-viewer-z-index);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Backdrop */
.c-photo-viewer__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--atomix-photo-viewer-bg);
  z-index: var(--atomix-photo-viewer-backdrop-z);
}

/* Main content container */
.c-photo-viewer__container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: calc(var(--atomix-photo-viewer-z-index) + 1);
}

/* Header with controls */
.c-photo-viewer__header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    transparent
  );
  z-index: 2;
}

/* Image display area */
.c-photo-viewer__content {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Navigation buttons */
.c-photo-viewer__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--atomix-photo-viewer-button-bg);
  border: none;
  color: var(--atomix-photo-viewer-text);
  padding: 1rem;
  cursor: pointer;
  transition: var(--atomix-photo-viewer-transition);
  z-index: 3;
}

.c-photo-viewer__nav:hover {
  background: var(--atomix-photo-viewer-button-hover);
}

.c-photo-viewer__nav--prev {
  left: 1rem;
}

.c-photo-viewer__nav--next {
  right: 1rem;
}

/* Thumbnail container */
.c-photo-viewer__thumbnails {
  position: absolute;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    transparent
  );
  padding: 1rem;
  z-index: 2;
}

.c-photo-viewer--thumbnails-bottom .c-photo-viewer__thumbnails {
  bottom: 0;
  left: 0;
  right: 0;
}

.c-photo-viewer--thumbnails-top .c-photo-viewer__thumbnails {
  top: 0;
  left: 0;
  right: 0;
}

/* Individual thumbnails */
.c-photo-viewer__thumbnail {
  width: var(--atomix-photo-viewer-thumbnail-size);
  height: var(--atomix-photo-viewer-thumbnail-size);
  object-fit: cover;
  border: 2px solid transparent;
  cursor: pointer;
  transition: var(--atomix-photo-viewer-transition);
  margin-right: var(--atomix-photo-viewer-thumbnail-gap);
}

.c-photo-viewer__thumbnail--active {
  border-color: var(--atomix-photo-viewer-text);
}

.c-photo-viewer__thumbnail:hover {
  opacity: 0.8;
}

/* Fullscreen mode */
.c-photo-viewer--fullscreen {
  background: #000;
}

/* Info panel */
.c-photo-viewer__info {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 320px;
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  overflow-y: auto;
  transform: translateX(100%);
  transition: var(--atomix-photo-viewer-transition);
}

.c-photo-viewer--info-open .c-photo-viewer__info {
  transform: translateX(0);
}

/* Body class when PhotoViewer is open */
body.is-open-photoviewer {
  overflow: hidden;
}

/* Responsive design */
@media (max-width: 768px) {
  .c-photo-viewer__nav {
    padding: 0.5rem;
  }
  
  .c-photo-viewer__thumbnails {
    padding: 0.5rem;
  }
  
  .c-photo-viewer__thumbnail {
    width: 60px;
    height: 60px;
  }
  
  .c-photo-viewer__info {
    width: 280px;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .c-photo-viewer--thumbnails-left .c-photo-viewer__thumbnails,
  .c-photo-viewer--thumbnails-right .c-photo-viewer__thumbnails {
    display: none; /* Hide side thumbnails on very small screens */
  }
}
```

### Dark Mode Support

```css
@media (prefers-color-scheme: dark) {
  :root {
    --atomix-photo-viewer-bg: rgba(0, 0, 0, 0.95);
    --atomix-photo-viewer-text: #f7fafc;
    --atomix-photo-viewer-border: rgba(255, 255, 255, 0.3);
  }
}

/* Custom dark theme */
[data-theme="dark"] .c-photo-viewer {
  --atomix-photo-viewer-bg: #1a202c;
  --atomix-photo-viewer-text: #f7fafc;
}
```

## Common Patterns

### Gallery with Lightbox

```jsx
function LightboxGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const images = [
    'https://example.com/gallery1.jpg',
    'https://example.com/gallery2.jpg',
    'https://example.com/gallery3.jpg',
  ];

  const openLightbox = (index) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="lightbox-grid">
        {images.map((src, index) => (
          <div
            key={index}
            className="lightbox-item"
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openLightbox(index);
              }
            }}
          >
            <img src={src} alt={`Gallery image ${index + 1}`} />
            <div className="lightbox-overlay">
              <Icon name="Eye" size="lg" />
            </div>
          </div>
        ))}
      </div>
      
      {isOpen && (
        <PhotoViewer
          images={images}
          startIndex={selectedIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
```

### Product Image Gallery

```jsx
function ProductGallery({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const productImages = [
    {
      src: product.mainImage,
      alt: `${product.name} - main view`,
      title: product.name,
      description: product.description
    },
    ...product.additionalImages.map((img, index) => ({
      src: img,
      alt: `${product.name} - view ${index + 2}`,
      title: `${product.name} - Additional View`,
    }))
  ];

  return (
    <div className="product-gallery">
      <div className="product-main-image">
        <img
          src={product.mainImage}
          alt={product.name}
          onClick={() => setIsOpen(true)}
        />
        <Button
          className="zoom-button"
          onClick={() => setIsOpen(true)}
        >
          <Icon name="ZoomIn" /> View Gallery
        </Button>
      </div>
      
      <div className="product-thumbnails">
        {product.additionalImages.slice(0, 4).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.name} thumbnail ${index + 1}`}
            onClick={() => {
              setSelectedIndex(index + 1);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      
      {isOpen && (
        <PhotoViewer
          images={productImages}
          enableFullscreen={true}
          thumbnailPosition="bottom"
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
```

## Vanilla JavaScript API

### Global Methods

```javascript
// Initialize all PhotoViewers on page
const viewers = Atomix.PhotoViewer.init();

// Create specific instance
const viewer = new Atomix.PhotoViewer.create(element, {
  images: ['img1.jpg', 'img2.jpg'],
  startIndex: 0,
  enableKeyboardNavigation: true
});

// Open viewer programmatically
Atomix.PhotoViewer.open([
  { src: 'img1.jpg', title: 'Image 1' },
  { src: 'img2.jpg', title: 'Image 2' }
], {
  startIndex: 1,
  enableFullscreen: true
});

// Setup gallery click handlers
Atomix.PhotoViewer.setupGallery('.gallery', 'img');

// Get existing instance
const existingViewer = Atomix.PhotoViewer.get(element);

// Dispose all instances
Atomix.PhotoViewer.disposeAll();
```

### Data Attributes

```html
<div data-photoviewer 
     data-images='[{"src":"img1.jpg","title":"First"},{"src":"img2.jpg","title":"Second"}]'
     data-start-index="0"
     data-enable-keyboard-navigation="true"
     data-enable-gestures="true"
     data-thumbnail-position="bottom">
  <!-- PhotoViewer will be initialized here -->
</div>
```

### Instance Methods

```javascript
const viewer = Atomix.PhotoViewer.get(element);

// Navigation
viewer.next();
viewer.previous();
viewer.goTo(2);

// Controls
viewer.zoomIn();
viewer.zoomOut();
viewer.resetZoom();
viewer.rotate();
viewer.toggleFullscreen();

// State
viewer.getCurrentIndex();
viewer.getZoomLevel();
viewer.isFullscreen();

// Lifecycle
viewer.destroy();
```

## Performance Considerations

- **Image Preloading**: Adjacent images are preloaded for smooth navigation
- **Lazy Thumbnails**: Thumbnails are loaded on demand
- **Memory Management**: Proper cleanup prevents memory leaks
- **Touch Optimization**: Efficient gesture handling for mobile devices
- **CSS Animations**: Hardware-accelerated transitions for smooth performance

## Integration Examples

### With React Router

```jsx
import { useParams, useNavigate } from 'react-router-dom';

function GalleryPage() {
  const { imageIndex } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(!!imageIndex);
  
  const images = [/* your images */];

  useEffect(() => {
    if (imageIndex && !isOpen) {
      setIsOpen(true);
    }
  }, [imageIndex]);

  const handleClose = () => {
    setIsOpen(false);
    navigate('/gallery');
  };

  const handleImageChange = (index) => {
    navigate(`/gallery/${index}`);
  };

  return (
    <div>
      {/* Gallery grid */}
      {isOpen && (
        <PhotoViewer
          images={images}
          startIndex={parseInt(imageIndex) || 0}
          onClose={handleClose}
          onImageChange={handleImageChange}
        />
      )}
    </div>
  );
}
```

### With State Management

```jsx
import { useDispatch, useSelector } from 'react-redux';

function ConnectedGallery() {
  const dispatch = useDispatch();
  const { images, isViewerOpen, currentIndex } = useSelector(state => state.gallery);

  const handleImageChange = (index) => {
    dispatch({ type: 'SET_CURRENT_IMAGE', payload: index });
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_VIEWER' });
  };

  return isViewerOpen ? (
    <PhotoViewer
      images={images}
      startIndex={currentIndex}
      onClose={handleClose}
      onImageChange={handleImageChange}
    />
  ) : null;
}
```

## Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 74+, Safari 13+, Edge 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+, Samsung Internet 11+
- **Touch Gestures**: Full support on touch devices
- **Fullscreen API**: Graceful fallback when not supported
- **Keyboard Navigation**: Full support with focus management

## Related Components

- [Modal](./modal.md) - For other modal dialogs
- [Carousel](./carousel.md) - For slideshow functionality
- [Image](./image.md) - For basic image display
- [Gallery](./gallery.md) - For image grid layouts

## Migration Guide

### From Custom Image Viewer

```jsx
// Before - custom implementation
<div className="image-viewer">
  <img src={currentImage} />
  <button onClick={prevImage}>Previous</button>
  <button onClick={nextImage}>Next</button>
</div>

// After - PhotoViewer
<PhotoViewer
  images={images}
  startIndex={currentIndex}
  onImageChange={setCurrentIndex}
  onClose={closeViewer}
/>
```

### From Third-party Libraries

Most image viewer libraries can be replaced with PhotoViewer by:

1. Converting image data to the `ImageType` format
2. Replacing library-specific props with PhotoViewer props
3. Updating event handlers to use PhotoViewer callbacks
4. Removing third-party CSS and using PhotoViewer styling

The PhotoViewer component provides a complete, accessible, and performant solution for image viewing needs while maintaining consistency with the Atomix design system.