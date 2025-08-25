import React from 'react';
import { ImageType } from '../../lib/types/components';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';

/**
 * Props for the PhotoViewerHeader component
 */
export interface PhotoViewerHeaderProps {
  /** Current image index */
  currentIndex: number;
  /** Total number of images */
  imagesLength: number;
  /** Callback to zoom out */
  onZoomOut: () => void;
  /** Callback to reset zoom */
  onResetZoom: () => void;
  /** Callback to zoom in */
  onZoomIn: () => void;
  /** Callback to toggle fullscreen */
  onToggleFullscreen: () => void;
  /** Callback to close the viewer */
  onClose: () => void;
  /** Whether fullscreen is active */
  isFullscreen: boolean;
  /** Current zoom level */
  zoomLevel: number;
  /** Callback to rotate image */
  onRotate: () => void;
  /** Callback to download image */
  onDownload: () => void;
  /** Callback to share image */
  onShare: () => void;
  /** Whether info panel is shown */
  showInfo: boolean;
  /** Callback to toggle info panel */
  onToggleInfo: () => void;
  /** Current image object */
  currentImage?: ImageType;
}

/**
 * PhotoViewerHeader component - displays controls and counter for the photo viewer
 *
 * @param props - PhotoViewerHeaderProps
 * @returns JSX.Element
 */
export const PhotoViewerHeader: React.FC<PhotoViewerHeaderProps> = ({
  currentIndex,
  imagesLength,
  onZoomOut,
  onResetZoom,
  onZoomIn,
  onToggleFullscreen,
  onClose,
  isFullscreen,
  zoomLevel,
  onRotate,
  onDownload,
  onShare,
  showInfo,
  onToggleInfo,
  currentImage,
}) => (
  <div className="c-photo-viewer__header">
    <div className="c-photo-viewer__header-left">
      <Badge label={`${currentIndex + 1} / ${imagesLength}`} variant="primary" size="sm" />
      {currentImage?.title && <h3 className="c-photo-viewer__image-title">{currentImage.title}</h3>}
    </div>

    <div className="c-photo-viewer__actions">
      <Button
        iconOnly
        size="sm"
        variant="ghost"
        rounded
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.1}
        aria-label="Zoom out"
        className="c-photo-viewer__action-button"
        icon={<Icon name="Minus" size="sm" />}
      />

      <Button
        iconOnly
        size="sm"
        variant="ghost"
        rounded
        onClick={onResetZoom}
        disabled={zoomLevel === 1}
        aria-label="Reset zoom"
        className="c-photo-viewer__action-button"
        icon={<Icon name="MagnifyingGlass" size="sm" />}
      />

      <Button
        iconOnly
        size="sm"
        variant="ghost"
        rounded
        onClick={onZoomIn}
        disabled={zoomLevel >= 5}
        aria-label="Zoom in"
        className="c-photo-viewer__action-button"
        icon={<Icon name="Plus" size="sm" />}
      />

      <div className="c-photo-viewer__divider" />

      <Button
        iconOnly
        size="sm"
        variant="ghost"
        rounded
        onClick={onRotate}
        aria-label="Rotate image"
        className="c-photo-viewer__action-button"
        icon={<Icon name="ArrowsClockwise" size="sm" />}
      />

      <Button
        iconOnly
        size="sm"
        variant="ghost"
        rounded
        onClick={onDownload}
        aria-label="Download image"
        className="c-photo-viewer__action-button"
        icon={<Icon name="Download" size="sm" />}
      />

      {'share' in navigator && typeof navigator.share === 'function' && (
        <Button
          iconOnly
          size="sm"
          variant="ghost"
          rounded
          onClick={onShare}
          aria-label="Share image"
          className="c-photo-viewer__action-button"
          icon={<Icon name="Share" size="sm" />}
        />
      )}

      <Button
        iconOnly
        size="sm"
        variant="ghost"
        rounded
        onClick={onToggleInfo}
        aria-label="Toggle info panel"
        className={`c-photo-viewer__action-button ${showInfo ? 'is-active' : ''}`}
        icon={<Icon name="Info" size="sm" />}
      />

      <div className="c-photo-viewer__divider" />

      <Button
        iconOnly
        size="sm"
        variant="ghost"
        rounded
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        className="c-photo-viewer__action-button"
        icon={<Icon name={isFullscreen ? 'ArrowsIn' : 'ArrowsOut'} size="sm" />}
      />

      <Button
        iconOnly
        size="sm"
        variant="ghost"
        rounded
        onClick={onClose}
        aria-label="Close viewer"
        className="c-photo-viewer__action-button c-photo-viewer__close-button"
        icon={<Icon name="X" size="sm" />}
      />
    </div>
  </div>
);

export default PhotoViewerHeader;
