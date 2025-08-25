import React, { useMemo, useEffect } from 'react';
import { PhotoViewerProps, ImageType } from '../../lib/types/components';
import { usePhotoViewer } from '../../lib/composables/usePhotoViewer';
import { PhotoViewerHeader } from './PhotoViewerHeader';
import { PhotoViewerNavigation } from './PhotoViewerNavigation';
import { PhotoViewerImage } from './PhotoViewerImage';
import { PhotoViewerThumbnails } from './PhotoViewerThumbnails';
import { PhotoViewerInfo } from './PhotoViewerInfo';

/**
 * PhotoViewer component - A comprehensive image viewer with zoom, pan, navigation, and metadata display
 *
 * Features:
 * - Image navigation with keyboard support
 * - Zoom and pan functionality
 * - Touch gestures for mobile devices
 * - Fullscreen mode
 * - Image rotation
 * - Download and share capabilities
 * - Thumbnail navigation
 * - Image metadata display
 * - Responsive design
 *
 * @param props - PhotoViewerProps
 * @returns JSX.Element
 */
export const PhotoViewer: React.FC<PhotoViewerProps> = ({
  images,
  startIndex = 0,
  className = '',
  disabled = false,
  enableKeyboardNavigation = true,
  enableGestures = true,
  enableFullscreen = true,
  thumbnailPosition = 'bottom',
  onImageChange,
  onClose,
}) => {
  // Use the external composable hook with enhanced features
  const {
    currentIndex,
    zoomLevel,
    imagePosition: dragPosition,
    isDragging,
    isFullscreen,
    rotationAngle,
    showInfo,
    imageRef,
    containerRef,
    isTransitioning,
    setZoomLevel,
    setImagePosition: setDragPosition,
    setIsDragging,
    setIsFullscreen,
    setRotationAngle,
    setShowInfo,
    closeModal,
    goToPrevious,
    goToNext,
    setCurrentIndex: goToImage,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDoubleClick,
    resetImageState,
  } = usePhotoViewer({
    images,
    startIndex,
    enableGestures,
    onImageChange,
    onClose: onClose || (() => {}),
  });

  // Process images to handle both string arrays and object arrays, ensuring ImageType structure
  const processedImages: ImageType[] = useMemo(() => {
    return images.map(img => (typeof img === 'string' ? { src: img } : img));
  }, [images]);

  // Current image object
  const currentImage: ImageType | undefined = processedImages[currentIndex];

  // Handle fullscreen toggle with bounds update
  const handleToggleFullscreen = () => {
    if (!enableFullscreen) return;

    if (!isFullscreen) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle image rotation with bounds update
  const handleRotate = () => {
    setRotationAngle((angle: number) => (angle + 90) % 360);
  };

  // Handle image download
  const handleDownload = () => {
    if (!currentImage?.src) return;

    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = currentImage.title || `image-${currentIndex + 1}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle image sharing
  const handleShare = async () => {
    if (!navigator.share || !currentImage?.src) return;

    try {
      await navigator.share({
        title: currentImage.title || 'Shared Image',
        text: currentImage.description || 'Check out this image',
        url: currentImage.src,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Memoize class names
  const photoViewerClasses = useMemo(
    () =>
      [
        'c-photo-viewer',
        `c-photo-viewer--thumbnails-${thumbnailPosition}`,
        isDragging ? 'c-photo-viewer--dragging' : '',
        isFullscreen ? 'c-photo-viewer--fullscreen' : '',
        showInfo ? 'c-photo-viewer--info-open' : '',
        disabled ? 'is-disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [isDragging, isFullscreen, showInfo, disabled, thumbnailPosition, className]
  );

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [setIsFullscreen]);

  // Add/remove is-open-photoviewer class on body
  useEffect(() => {
    document.body.classList.add('is-open-photoviewer');

    return () => {
      document.body.classList.remove('is-open-photoviewer');
    };
  }, []);

  // Early return for empty images array
  if (!images.length) return null;

  return (
    <div className={photoViewerClasses} role="dialog" aria-modal="true" aria-label="Photo viewer">
      <div className="c-photo-viewer__backdrop" onClick={closeModal} />
      <div className="c-photo-viewer__container">
        <PhotoViewerHeader
          currentIndex={currentIndex}
          imagesLength={images.length}
          onZoomOut={() => setZoomLevel((z: number) => Math.max(z - 0.25, 0.1))}
          onResetZoom={() => {
            resetImageState();
          }}
          onZoomIn={() => setZoomLevel((z: number) => Math.min(z + 0.25, 5))}
          onToggleFullscreen={handleToggleFullscreen}
          onClose={onClose || closeModal}
          isFullscreen={isFullscreen}
          zoomLevel={zoomLevel}
          onRotate={handleRotate}
          onDownload={handleDownload}
          onShare={handleShare}
          showInfo={showInfo}
          onToggleInfo={() => setShowInfo(!showInfo)}
          currentImage={currentImage}
        />
        <div className="c-photo-viewer__content">
          <PhotoViewerNavigation
            show={images.length > 1}
            onPrev={goToPrevious}
            onNext={goToNext}
            currentIndex={currentIndex}
            imagesLength={images.length}
            enableKeyboardNav={enableKeyboardNavigation}
            onClose={onClose || closeModal}
          />
          {currentImage?.src && (
            <PhotoViewerImage
              imageRef={imageRef}
              containerRef={containerRef}
              src={currentImage.src}
              alt={currentImage?.alt || `Image ${currentIndex + 1}`}
              zoomLevel={zoomLevel}
              dragPosition={dragPosition}
              isDragging={isDragging}
              rotationAngle={rotationAngle}
              isTransitioning={isTransitioning}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onDoubleClick={handleDoubleClick}
            />
          )}
        </div>
        {thumbnailPosition !== 'none' && (
          <PhotoViewerThumbnails
            images={processedImages}
            currentIndex={currentIndex}
            goToImage={goToImage}
          />
        )}
        <PhotoViewerInfo show={showInfo} image={currentImage} onClose={() => setShowInfo(false)} />
      </div>
    </div>
  );
};

export type { PhotoViewerProps };

PhotoViewer.displayName = 'PhotoViewer';

export default PhotoViewer;
