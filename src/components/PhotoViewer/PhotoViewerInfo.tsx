import React from 'react';
import { ImageType } from '../../lib/types/components';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';

/**
 * Props for the PhotoViewerInfo component
 */
export interface PhotoViewerInfoProps {
  /** Whether to show the info panel */
  show: boolean;
  /** Image object to display info for */
  image?: ImageType;
  /** Callback to close the info panel */
  onClose: () => void;
}

/**
 * PhotoViewerInfo component - displays image metadata and information
 *
 * @param props - PhotoViewerInfoProps
 * @returns JSX.Element
 */
export const PhotoViewerInfo: React.FC<PhotoViewerInfoProps> = ({ show, image, onClose }) => {
  if (!show || !image) return null;

  return (
    <div className="c-photo-viewer__info-panel">
      <Button
        iconOnly
        size="sm"
        variant="light"
        rounded
        onClick={onClose}
        aria-label="Close info panel"
        icon={<Icon name="X" size="sm" />}
        className="c-photo-viewer__info-close"
      />
      <div className="c-photo-viewer__info-content">
        {image.title && <h3 className="c-photo-viewer__info-title">{image.title}</h3>}
        {image.description && (
          <p className="c-photo-viewer__info-description">{image.description}</p>
        )}
        {image.date && <p className="c-photo-viewer__info-meta">Date: {image.date}</p>}
        {image.author && <p className="c-photo-viewer__info-meta">By: {image.author}</p>}
        {image.tags && image.tags.length > 0 && (
          <div className="c-photo-viewer__info-tags">
            {image.tags.map((tag: string, index: number) => (
              <Badge
                key={index}
                label={tag}
                variant="light"
                size="sm"
                className="c-photo-viewer__info-tag"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoViewerInfo;
