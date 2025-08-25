import React, { useEffect } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';

/**
 * Props for the PhotoViewerNavigation component
 */
export interface PhotoViewerNavigationProps {
  /** Whether to show navigation buttons */
  show: boolean;
  /** Callback to go to previous image */
  onPrev: () => void;
  /** Callback to go to next image */
  onNext: () => void;
  /** Current image index */
  currentIndex: number;
  /** Total number of images */
  imagesLength: number;
  /** Whether keyboard navigation is enabled */
  enableKeyboardNav: boolean;
  /** Callback to close the viewer */
  onClose: () => void;
}

/**
 * PhotoViewerNavigation component - handles navigation between images
 *
 * @param props - PhotoViewerNavigationProps
 * @returns JSX.Element
 */
export const PhotoViewerNavigation: React.FC<PhotoViewerNavigationProps> = ({
  show,
  onPrev,
  onNext,
  currentIndex,
  imagesLength,
  enableKeyboardNav,
  onClose,
}) => {
  // Add keyboard navigation
  useEffect(() => {
    if (!enableKeyboardNav) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardNav, onPrev, onNext, onClose]);

  if (!show) return null;

  return (
    <>
      <Button
        iconOnly
        size="md"
        variant="ghost"
        rounded
        onClick={onPrev}
        disabled={currentIndex === 0}
        aria-label="Previous image"
        className="c-photo-viewer__nav-button c-photo-viewer__nav-button--prev"
        icon={<Icon name="CaretLeft" size="md" />}
      />

      <Button
        iconOnly
        size="md"
        variant="ghost"
        rounded
        onClick={onNext}
        disabled={currentIndex === imagesLength - 1}
        aria-label="Next image"
        className="c-photo-viewer__nav-button c-photo-viewer__nav-button--next"
        icon={<Icon name="CaretRight" size="md" />}
      />
    </>
  );
};

export default PhotoViewerNavigation;
