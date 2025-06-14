import React from 'react';
import { ImageType } from '../../lib/types/components';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';

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
    <Badge
      label={`${currentIndex + 1} / ${imagesLength}`}
      variant="light"
      size="sm"
      className="c-photo-viewer__counter-badge"
    />
    <div className="c-photo-viewer__actions">
      <Button
        iconOnly
        size="sm"
        variant="light"
        rounded
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.1}
        aria-label="Zoom out"
        icon={<Icon name="Minus" size="sm" />}
        className="c-photo-viewer__action-button"
      />
      <Button
        iconOnly
        size="sm"
        variant="light"
        rounded
        onClick={onResetZoom}
        disabled={zoomLevel === 1}
        aria-label="Reset zoom"
        icon={<Icon name="MagnifyingGlass" size="sm" />}
        className="c-photo-viewer__action-button"
      />
      <Button
        iconOnly
        size="sm"
        variant="light"
        rounded
        onClick={onZoomIn}
        disabled={zoomLevel >= 5}
        aria-label="Zoom in"
        icon={<Icon name="Plus" size="sm" />}
        className="c-photo-viewer__action-button"
      />
      <Button
        iconOnly
        size="sm"
        variant="light"
        rounded
        onClick={onRotate}
        aria-label="Rotate image"
        icon={<Icon name="ArrowsClockwise" size="sm" />}
        className="c-photo-viewer__action-button"
      />
      {currentImage?.src && (
        <Button
          iconOnly
          size="sm"
          variant="light"
          rounded
          onClick={onDownload}
          aria-label="Download image"
          icon={<Icon name="DownloadSimple" size="sm" />}
          className="c-photo-viewer__action-button"
        />
      )}
      {currentImage?.src && typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button
          iconOnly
          size="sm"
          variant="light"
          rounded
          onClick={onShare}
          aria-label="Share image"
          icon={<Icon name="ShareNetwork" size="sm" />}
          className="c-photo-viewer__action-button"
        />
      )}
      <Button
        iconOnly
        size="sm"
        variant="light"
        rounded
        onClick={onToggleInfo}
        aria-label={showInfo ? 'Hide info' : 'Show info'}
        icon={<Icon name="Info" size="sm" />}
        className="c-photo-viewer__action-button"
      />
      <Button
        iconOnly
        size="sm"
        variant="light"
        rounded
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        icon={
          isFullscreen ? <Icon name="ArrowsIn" size="sm" /> : <Icon name="ArrowsOut" size="sm" />
        }
        className="c-photo-viewer__action-button"
      />
      <Button
        iconOnly
        size="sm"
        variant="light"
        rounded
        onClick={onClose}
        aria-label="Close photo viewer"
        icon={<Icon name="X" size="sm" />}
        className="c-photo-viewer__action-button c-photo-viewer__close"
      />
    </div>
  </div>
);

export default PhotoViewerHeader;
