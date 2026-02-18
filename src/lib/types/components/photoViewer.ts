import { BaseComponentProps } from './common';


/**
 * PhotoViewer component properties
 */
/**
 * Interface for image objects used in PhotoViewer
 */
export interface ImageType {
  src: string;
  alt?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  tags?: string[];
}


export interface PhotoViewerProps extends BaseComponentProps {
  /**
   * Array of image URLs or image objects to display in the viewer
   */
  images: (string | ImageType)[];
  /**
   * Index of the image to show first
   * @default 0
   */
  startIndex?: number;
  /**
   * Additional className for the root element
   */
  className?: string;
  /**
   * Whether the viewer is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Enable keyboard navigation (arrow keys, escape)
   * @default true
   */
  enableKeyboardNavigation?: boolean;
  /**
   * Enable touch gestures for mobile devices
   * @default true
   */
  enableGestures?: boolean;
  /**
   * Enable fullscreen mode
   * @default true
   */
  enableFullscreen?: boolean;
  /**
   * Position of thumbnails
   * @default 'bottom'
   */
  thumbnailPosition?: 'bottom' | 'top' | 'left' | 'right' | 'none';
  /**
   * Callback when image changes
   */
  onImageChange?: (index: number) => void;
  /**
   * Callback when viewer is closed
   */
  onClose?: () => void;
}
