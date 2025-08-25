import React from 'react';
import { ImageType } from '../../lib/types/components';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';

/**
 * Props for the PhotoViewerInfo component
 */
export interface PhotoViewerInfoProps {
  /** Whether to show the info panel */
  show: boolean;
  /** Image data to display */
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
      <div className="c-photo-viewer__info-header">
        <h4 className="c-photo-viewer__info-panel-title">Image Details</h4>
        <Button
          iconOnly
          size="sm"
          variant="ghost"
          rounded
          onClick={onClose}
          aria-label="Close info panel"
          className="c-photo-viewer__info-close"
          icon={<Icon name="X" size="sm" />}
        />
      </div>

      <div className="c-photo-viewer__info-content">
        {image.title && (
          <div className="c-photo-viewer__info-section">
            <h5 className="c-photo-viewer__info-title">{image.title}</h5>
          </div>
        )}

        {image.description && (
          <div className="c-photo-viewer__info-section">
            <p className="c-photo-viewer__info-description">{image.description}</p>
          </div>
        )}

        {(image.date || image.author) && (
          <div className="c-photo-viewer__info-section">
            <div className="c-photo-viewer__info-meta">
              {image.date && (
                <div className="c-photo-viewer__info-meta-item">
                  <Icon name="Calendar" size={14} />
                  <span>{image.date}</span>
                </div>
              )}
              {image.author && (
                <div className="c-photo-viewer__info-meta-item">
                  <Icon name="User" size={14} />
                  <span>{image.author}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {image.tags && image.tags.length > 0 && (
          <div className="c-photo-viewer__info-section">
            <h6 className="c-photo-viewer__info-section-title">Tags</h6>
            <div className="c-photo-viewer__info-tags">
              {image.tags.map((tag: string, index: number) => (
                <Badge key={index} label={tag} variant="secondary" size="sm" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoViewerInfo;
