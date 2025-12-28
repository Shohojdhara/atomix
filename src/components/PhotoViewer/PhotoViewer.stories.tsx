import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ImageType } from '../../lib/types/components';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { PhotoViewer } from './PhotoViewer';

const meta = {
  title: 'Components/PhotoViewer',
  component: PhotoViewer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The PhotoViewer component provides a modern, fully-featured image viewing experience with zoom, pan, navigation, and metadata display. It supports image galleries, keyboard navigation, touch gestures, and fullscreen mode. Ideal for photo galleries, media libraries, or any application requiring detailed image viewing capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    thumbnailPosition: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right', 'none'],
      description: 'Position of the thumbnail navigation',
    },
    enableKeyboardNavigation: {
      control: 'boolean',
      description: 'Whether to enable keyboard navigation',
    },
    enableGestures: {
      control: 'boolean',
      description: 'Whether to enable touch gestures',
    },
    enableFullscreen: {
      control: 'boolean',
      description: 'Whether to enable fullscreen mode',
    },
  },
} satisfies Meta<typeof PhotoViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images with rich metadata
const sampleImages: ImageType[] = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop',
    alt: 'Mountain landscape at sunset',
    title: 'Mountain Sunset',
    description:
      'A breathtaking view of mountain peaks bathed in golden sunset light, showcasing the natural beauty of the wilderness.',
    author: 'John Photographer',
    date: '2024-01-15',
    tags: ['landscape', 'mountains', 'sunset', 'nature'],
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop',
    alt: 'Forest path in autumn',
    title: 'Autumn Forest Path',
    description:
      'A winding forest path surrounded by vibrant autumn foliage, creating a peaceful and contemplative scene.',
    author: 'Jane Nature',
    date: '2024-01-10',
    tags: ['forest', 'autumn', 'path', 'trees'],
  },
  {
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=150&fit=crop',
    alt: 'Ocean waves on beach',
    title: 'Ocean Waves',
    description:
      'Powerful ocean waves crashing against the shore, demonstrating the raw energy and beauty of the sea.',
    author: 'Mike Ocean',
    date: '2024-01-05',
    tags: ['ocean', 'waves', 'beach', 'water'],
  },
  {
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=150&fit=crop',
    alt: 'City skyline at night',
    title: 'City Lights',
    description:
      'A stunning nighttime cityscape with illuminated skyscrapers reflecting in the water below.',
    author: 'Sarah City',
    date: '2024-01-01',
    tags: ['city', 'night', 'lights', 'skyline'],
  },
];

// Interactive demo component
const PhotoViewerDemo: React.FC<{ images: ImageType[]; startIndex?: number }> = ({
  images,
  startIndex = 0,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(startIndex);

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="u-p-6">
      <div className="u-mb-6">
        <h2 className="u-mb-4 u-text-primary">Photo Gallery</h2>
        <p className="u-mb-4 u-text-secondary">
          Click on any image to open the PhotoViewer with full functionality.
        </p>
        <div className="u-d-flex u-gap-4 u-mb-4">
          <Badge variant="primary" label="Zoom & Pan" />
          <Badge variant="secondary" label="Keyboard Navigation" />
          <Badge variant="success" label="Touch Gestures" />
          <Badge variant="info" label="Fullscreen Mode" />
        </div>
      </div>

      <div
        className="u-d-grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}
      >
        {images.map((image, index) => (
          <div key={index} className="u-position-relative u-overflow-hidden u-rounded u-shadow-sm">
            <img
              src={image.thumbnail || image.src}
              alt={image.alt}
              className="u-w-100 u-h-auto"
              style={{ aspectRatio: '4/3', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => openViewer(index)}
            />
            <div className="u-position-absolute u-bottom-0 u-start-0 u-end-0 u-bg-dark u-bg-opacity-75 u-p-3">
              <h4 className="u-text-white u-fs-sm u-fw-medium u-mb-1">{image.title}</h4>
              <p className="u-text-white u-fs-xs u-opacity-75 u-mb-0">{image.author}</p>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <PhotoViewer
          images={images}
          startIndex={currentIndex}
          enableKeyboardNavigation={true}
          enableGestures={true}
          enableFullscreen={true}
          thumbnailPosition="bottom"
          onImageChange={setCurrentIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

/**
 * ## Default PhotoViewer
 *
 * The PhotoViewer component with all features enabled, showcasing the modern design
 * with proper Button, Badge, and Icon components from the Atomix design system.
 */
export const Default: Story = {
  render: () => <PhotoViewerDemo images={sampleImages} />,
};

/**
 * ## Simple Images
 *
 * PhotoViewer with simple image URLs (no metadata).
 */
export const SimpleImages: Story = {
  render: () => {
    const simpleImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop',
    ];

    return <PhotoViewerDemo images={simpleImages as unknown as ImageType[]} />;
  },
};

/**
 * ## Rich Metadata
 *
 * PhotoViewer showcasing rich image metadata including titles, descriptions,
 * authors, dates, and tags.
 */
export const RichMetadata: Story = {
  render: () => {
    const richImages: ImageType[] = [
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        thumbnail:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop',
        alt: 'Mountain landscape at sunset',
        title: 'Majestic Mountain Sunset',
        description:
          'This stunning photograph captures the serene beauty of mountain peaks bathed in the warm, golden light of a setting sun. The image showcases the dramatic contrast between the dark silhouettes of the mountains and the vibrant colors of the sky, creating a truly breathtaking scene that speaks to the power and majesty of nature.',
        author: 'Alexandra Mountain',
        date: '2024-01-15',
        tags: [
          'landscape',
          'mountains',
          'sunset',
          'nature',
          'photography',
          'golden hour',
          'scenic',
        ],
      },
      {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
        thumbnail:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop',
        alt: 'Forest path in autumn',
        title: 'Enchanted Forest Trail',
        description:
          'A magical forest path winds through a canopy of autumn leaves, creating a tunnel of warm colors that seems to glow with inner light. This peaceful scene invites contemplation and represents the perfect harmony between human-made paths and natural beauty.',
        author: 'Robert Forest',
        date: '2024-01-10',
        tags: ['forest', 'autumn', 'path', 'trees', 'nature', 'hiking', 'peaceful'],
      },
    ];

    return <PhotoViewerDemo images={richImages} />;
  },
};

/**
 * ## Thumbnail Positions
 *
 * Demonstrates different thumbnail positioning options.
 */
export const ThumbnailPositions: Story = {
  render: () => {
    const [position, setPosition] = React.useState<'bottom' | 'top' | 'left' | 'right' | 'none'>(
      'bottom'
    );
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="u-p-6">
        <div className="u-mb-6">
          <h2 className="u-mb-4 u-text-primary">Thumbnail Positions</h2>
          <p className="u-mb-4 u-text-secondary">
            Choose a thumbnail position and click "Open Viewer" to see the layout.
          </p>

          <div className="u-d-flex u-gap-3 u-mb-4">
            {(['bottom', 'top', 'left', 'right', 'none'] as const).map(pos => (
              <Button
                key={pos}
                variant={position === pos ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setPosition(pos)}
              >
                {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </Button>
            ))}
          </div>

          <Button onClick={() => setIsOpen(true)}>Open Viewer</Button>
        </div>

        {isOpen && (
          <PhotoViewer
            images={sampleImages}
            thumbnailPosition={position}
            enableKeyboardNavigation={true}
            enableGestures={true}
            enableFullscreen={true}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  },
};

/**
 * ## Feature Controls
 *
 * Interactive demo showing different feature combinations.
 */
export const FeatureControls: Story = {
  render: () => {
    const [features, setFeatures] = React.useState({
      keyboard: true,
      gestures: true,
      fullscreen: true,
    });
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleFeature = (feature: keyof typeof features) => {
      setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
    };

    return (
      <div className="u-p-6">
        <div className="u-mb-6">
          <h2 className="u-mb-4 u-text-primary">Feature Controls</h2>
          <p className="u-mb-4 u-text-secondary">
            Toggle features on/off to see how they affect the PhotoViewer behavior.
          </p>

          <div className="u-d-flex u-gap-4 u-mb-4">
            <label className="u-d-flex u-align-items-center u-gap-2">
              <input
                type="checkbox"
                checked={features.keyboard}
                onChange={() => toggleFeature('keyboard')}
              />
              <span>Keyboard Navigation</span>
            </label>
            <label className="u-d-flex u-align-items-center u-gap-2">
              <input
                type="checkbox"
                checked={features.gestures}
                onChange={() => toggleFeature('gestures')}
              />
              <span>Touch Gestures</span>
            </label>
            <label className="u-d-flex u-align-items-center u-gap-2">
              <input
                type="checkbox"
                checked={features.fullscreen}
                onChange={() => toggleFeature('fullscreen')}
              />
              <span>Fullscreen Mode</span>
            </label>
          </div>

          <Button onClick={() => setIsOpen(true)}>Open Viewer</Button>
        </div>

        {isOpen && (
          <PhotoViewer
            images={sampleImages}
            enableKeyboardNavigation={features.keyboard}
            enableGestures={features.gestures}
            enableFullscreen={features.fullscreen}
            thumbnailPosition="bottom"
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  },
};

/**
 * ## Single Image
 *
 * PhotoViewer with a single image (no thumbnails or navigation).
 */
export const SingleImage: Story = {
  render: () => {
    const singleImage = [sampleImages[0]];
    return (
      <div className="u-w-50 u-h-50">
        <PhotoViewerDemo images={singleImage} />
      </div>
    );
  },
};

/**
 * ## Mobile Optimized
 *
 * Shows how the PhotoViewer adapts to mobile screens with touch gestures.
 */
export const MobileOptimized: Story = {
  render: () => (
    <div className="u-p-6">
      <div className="u-mb-6">
        <h2 className="u-mb-4 u-text-primary">Mobile Optimized</h2>
        <p className="u-mb-4 u-text-secondary">
          The PhotoViewer is fully responsive and optimized for mobile devices with:
        </p>
        <ul className="u-mb-4">
          <li>Touch gestures for zoom and pan</li>
          <li>Swipe navigation between images</li>
          <li>Responsive controls and thumbnails</li>
          <li>Full-screen info panel on mobile</li>
        </ul>
        <p className="u-text-tertiary u-fs-sm">
          Try this on a mobile device or use browser dev tools to simulate mobile viewport.
        </p>
      </div>

      <PhotoViewerDemo images={sampleImages} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
