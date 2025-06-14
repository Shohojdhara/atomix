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
}) =>
  images.length > 1 ? (
    <div className="c-photo-viewer__thumbnails">
      {images.map((image: ImageType, index: number) => {
        const thumbnailSrc = image.thumbnail || image.src;
        return (
          <Button
            key={index}
            variant="light"
            className={`c-photo-viewer__thumbnail ${index === currentIndex ? 'is-active' : ''}`}
            onClick={() => goToImage(index)}
            aria-label={`View image ${index + 1}`}
            aria-current={index === currentIndex}
          >
            <img
              loading="lazy"
              src={thumbnailSrc}
              alt={image.alt || `Thumbnail ${index + 1}`}
              className="c-photo-viewer__thumbnail-img"
            />
          </Button>
        );
      })}
    </div>
  ) : null;

export default PhotoViewerThumbnails;
