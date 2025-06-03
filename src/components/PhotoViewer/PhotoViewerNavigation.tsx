import React, { useEffect } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

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
    if (!enableKeyboardNav) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardNav, onPrev, onNext, onClose]);
  
  return show ? (
    <>
      <Button
        iconOnly
        size="md"
        variant="light"
        rounded
        onClick={onPrev}
        disabled={currentIndex === 0}
        aria-label="Previous image"
        icon={<Icon name="CaretLeft" size="md" />}
        className="c-photo-viewer__nav-button c-photo-viewer__nav-button--prev"
      />
      <Button
        iconOnly
        size="md"
        variant="light"
        rounded
        onClick={onNext}
        disabled={currentIndex === imagesLength - 1}
        aria-label="Next image"
        icon={<Icon name="CaretRight" size="md" />}
        className="c-photo-viewer__nav-button c-photo-viewer__nav-button--next"
      />
    </>
  ) : null;
};

export default PhotoViewerNavigation;