import React, { useRef, useEffect, useState } from 'react';

/**
 * Props for the PhotoViewerImage component
 */
export interface PhotoViewerImageProps {
  /** Ref to the image element */
  imageRef: React.RefObject<HTMLImageElement>;
  /** Ref to the container element */
  containerRef?: React.RefObject<HTMLDivElement>;
  /** Image source URL */
  src: string;
  /** Image alt text */
  alt?: string;
  /** Current zoom level */
  zoomLevel: number;
  /** Current drag position */
  dragPosition: { x: number; y: number };
  /** Whether image is being dragged */
  isDragging: boolean;
  /** Current rotation angle in degrees */
  rotationAngle: number;
  /** Whether image is transitioning */
  isTransitioning?: boolean;
  /** Mouse down event handler */
  onMouseDown: (event: React.MouseEvent<HTMLDivElement | HTMLImageElement, MouseEvent>) => void;
  /** Mouse move event handler */
  onMouseMove: (event: React.MouseEvent<HTMLDivElement | HTMLImageElement, MouseEvent>) => void;
  /** Mouse up event handler */
  onMouseUp: (event: React.MouseEvent<HTMLDivElement | HTMLImageElement, MouseEvent>) => void;
  /** Wheel event handler for zoom */
  onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
  /** Touch start event handler */
  onTouchStart: (event: React.TouchEvent<HTMLDivElement | HTMLImageElement>) => void;
  /** Touch move event handler */
  onTouchMove: (event: React.TouchEvent<HTMLDivElement | HTMLImageElement>) => void;
  /** Touch end event handler */
  onTouchEnd: (event: React.TouchEvent<HTMLDivElement | HTMLImageElement>) => void;
  /** Double click event handler */
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement | HTMLImageElement, MouseEvent>) => void;
}

/**
 * PhotoViewerImage component - displays the main image with zoom and pan capabilities
 *
 * @param props - PhotoViewerImageProps
 * @returns JSX.Element
 */
export const PhotoViewerImage: React.FC<PhotoViewerImageProps> = ({
  imageRef,
  containerRef,
  src,
  alt,
  zoomLevel,
  dragPosition,
  isDragging,
  rotationAngle,
  isTransitioning = false,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onWheel,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onDoubleClick,
}) => {
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const effectiveContainerRef = containerRef || internalContainerRef;
  const [isMounted, setIsMounted] = useState(false);

  // Track mounting state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Add double-click to zoom
  const handleDoubleClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLImageElement, MouseEvent>
  ) => {
    if (isMounted && onDoubleClick) onDoubleClick(e);
  };

  // Add non-passive event listeners to prevent page scrolling/zooming
  useEffect(() => {
    const container = effectiveContainerRef.current;
    if (!container) return undefined;

    const handleWheelEvent = (e: WheelEvent) => {
      // Only call if mounted and handler exists
      if (isMounted && container && onWheel) {
        onWheel(e as unknown as React.WheelEvent<HTMLDivElement>);
      }
    };

    const handleTouchStartEvent = (e: TouchEvent) => {
      // Only call if mounted and handler exists
      if (isMounted && container && onTouchStart) {
        onTouchStart(e as unknown as React.TouchEvent<HTMLDivElement>);
      }
    };

    const handleTouchMoveEvent = (e: TouchEvent) => {
      // Only call if mounted and handler exists
      if (isMounted && container && onTouchMove) {
        onTouchMove(e as unknown as React.TouchEvent<HTMLDivElement>);
      }
    };

    const handleTouchEndEvent = (e: TouchEvent) => {
      // Only call if mounted and handler exists
      if (isMounted && container && onTouchEnd) {
        onTouchEnd(e as unknown as React.TouchEvent<HTMLDivElement>);
      }
    };

    // Only add event listeners if mounted
    if (isMounted) {
      container.addEventListener('wheel', handleWheelEvent, { passive: false });
      container.addEventListener('touchstart', handleTouchStartEvent, { passive: false });
      container.addEventListener('touchmove', handleTouchMoveEvent, { passive: false });
      container.addEventListener('touchend', handleTouchEndEvent, { passive: false });
    }

    // Clean up
    return () => {
      container.removeEventListener('wheel', handleWheelEvent);
      container.removeEventListener('touchstart', handleTouchStartEvent);
      container.removeEventListener('touchmove', handleTouchMoveEvent);
      container.removeEventListener('touchend', handleTouchEndEvent);
    };
  }, [isMounted, onWheel, onTouchStart, onTouchMove, onTouchEnd, effectiveContainerRef]);

  return (
    <div
      ref={effectiveContainerRef}
      className={`c-photo-viewer__image-container ${isTransitioning ? 'is-transitioning' : ''}`}
      style={{
        cursor: isDragging ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'default',
        opacity: isTransitioning ? 0.7 : 1,
        touchAction: 'none', // Prevent browser touch behaviors
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onDoubleClick={handleDoubleClick}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="c-photo-viewer__image"
        style={{
          transform: `scale(${zoomLevel}) translate(${dragPosition.x}px, ${dragPosition.y}px) rotate(${rotationAngle}deg)`,
          transition: isDragging
            ? 'none'
            : isTransitioning
              ? 'opacity 0.15s ease-out'
              : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transformOrigin: 'center center',
          willChange: isDragging ? 'transform' : 'auto',
          touchAction: 'none', // Prevent image-specific touch behaviors
        }}
        draggable={false}
        onContextMenu={e => e.preventDefault()} // Prevent context menu on long press
      />
    </div>
  );
};

export default PhotoViewerImage;
