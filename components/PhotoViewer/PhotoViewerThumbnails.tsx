import React from 'react';
import { ImageType } from '../../lib/types/components';
import { Button } from '../Button/Button';

/**
 * Props for the PhotoViewerThumbnails component
 */
export interface PhotoViewerThumbnailsProps {
  /** Array of images to display thumbnails for */
  images: ImageType[];
  /** Current active image index */
  currentIndex: number;
  /** Callback to navigate to a specific image */
  goToImage: (index: number) => void;
}

/**
 * PhotoViewerThumbnails component - displays thumbnail navigation for images
 *
 * @param props - PhotoViewerThumbnailsProps
 * @returns JSX.Element
 */
export const PhotoViewerThumbnails: React.FC<PhotoViewerThumbnailsProps> = ({
  images,
  currentIndex,
  goToImage,
}) => {
  if (images.length <= 1) return null;

  return (
    <div className="c-photo-viewer__thumbnails">
      <div className="c-photo-viewer__thumbnails-container">
        {images.map((image: ImageType, index: number) => {
          const thumbnailSrc = image.thumbnail || image.src;
          const isActive = index === currentIndex;

          return (
            <Button
              key={index}
              variant="ghost"
              className={`c-photo-viewer__thumbnail ${isActive ? 'is-active' : ''}`}
              onClick={() => goToImage(index)}
              aria-label={`View image ${index + 1}${image.title ? `: ${image.title}` : ''}`}
              aria-current={isActive}
            >
              <div className="c-photo-viewer__thumbnail-wrapper">
                <img
                  loading="lazy"
                  src={thumbnailSrc}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className="c-photo-viewer__thumbnail-img"
                />
                {isActive && <div className="c-photo-viewer__thumbnail-indicator" />}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoViewerThumbnails;
