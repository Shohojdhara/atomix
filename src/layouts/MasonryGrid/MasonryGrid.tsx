import React, { forwardRef, HTMLAttributes, ReactNode, useEffect, useImperativeHandle, useRef, useState, useCallback, Children, cloneElement, isValidElement } from 'react';

export interface MasonryGridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered within the masonry grid
   */
  children: ReactNode;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Number of columns at extra small breakpoint (default)
   */
  xs?: number;
  /**
   * Number of columns at small breakpoint
   */
  sm?: number;
  /**
   * Number of columns at medium breakpoint
   */
  md?: number;
  /**
   * Number of columns at large breakpoint
   */
  lg?: number;
  /**
   * Number of columns at extra large breakpoint
   */
  xl?: number;
  /**
   * Number of columns at extra extra large breakpoint
   */
  xxl?: number;
  /**
   * Gap between items (in pixels)
   */
  gap?: number;
  /**
   * Whether to animate item transitions
   */
  animate?: boolean;
  /**
   * Whether to handle image loading to prevent layout shifts
   * When true, items will be shown immediately and positions updated as images load
   */
  imagesLoaded?: boolean;
  /**
   * Callback fired when all images are loaded and layout is complete
   */
  onLayoutComplete?: () => void;
  /**
   * Callback fired each time an image loads and layout is updated
   */
  onImageLoad?: (loadedCount: number, totalCount: number) => void;
}

interface ItemPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface MasonryItemData {
  element: React.ReactElement;
  position: ItemPosition | null;
  ref: React.RefObject<HTMLDivElement>;
  id: string;
  imageLoaded?: boolean;
}

/**
 * MasonryGrid component for creating a responsive masonry layout.
 * Uses JavaScript to position items optimally based on available vertical space,
 * similar to how a mason fits stones in a wall.
 *
 * @example
 * ```tsx
 * <MasonryGrid xs={1} sm={2} md={3} lg={4}>
 *   <MasonryGridItem>Item 1</MasonryGridItem>
 *   <MasonryGridItem>Item 2</MasonryGridItem>
 *   <MasonryGridItem>Item 3</MasonryGridItem>
 * </MasonryGrid>
 * ```
 */
export const MasonryGrid = forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ 
    children, 
    className = '', 
    xs = 1,
    sm,
    md,
    lg,
    xl,
    xxl,
    gap = 16,
    animate = true,
    imagesLoaded = true,
    onLayoutComplete,
    onImageLoad,
    ...props 
  }, ref) => {
    const [columns, setColumns] = useState(xs);
    const [containerWidth, setContainerWidth] = useState(0);
    const [items, setItems] = useState<MasonryItemData[]>([]);
    const [positions, setPositions] = useState<ItemPosition[]>([]);
    const [layoutComplete, setLayoutComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const resizeObserver = useRef<ResizeObserver | null>(null);
    const animationFrame = useRef<number | null>(null);
    const columnHeights = useRef<number[]>([]);
    const imagesLoadedCount = useRef<number>(0);
    const totalImagesCount = useRef<number>(0);
    const imageElements = useRef<Map<HTMLImageElement, boolean>>(new Map());
    
    // Define a custom type for HTMLImageElement with our added property
    type MasonryImageElement = HTMLImageElement & {
      _masonryLoadHandler?: EventListener;
    };
    
    // Forward the ref to parent components
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
    
    // Update column count based on breakpoints
    const updateColumns = useCallback(() => {
      const width = window.innerWidth;
      
      // Use the same breakpoints as defined in the grid system
      if (width >= 1400 && xxl !== undefined) {
        setColumns(xxl);
      } else if (width >= 1200 && xl !== undefined) {
        setColumns(xl);
      } else if (width >= 992 && lg !== undefined) {
        setColumns(lg);
      } else if (width >= 768 && md !== undefined) {
        setColumns(md);
      } else if (width >= 576 && sm !== undefined) {
        setColumns(sm);
      } else {
        setColumns(xs);
      }
    }, [xs, sm, md, lg, xl, xxl]);
    
    // Process children into items with refs
    useEffect(() => {
      const newItems: MasonryItemData[] = [];
      
      // Process children to extract item data
      React.Children.forEach(children, (child, index) => {
        if (!React.isValidElement(child)) return;
        
        newItems.push({
          id: child.key?.toString() || `masonry-item-${index}`,
          element: child,
          position: null,
          ref: React.createRef<HTMLDivElement>()
        });
      });
      
      setItems(newItems);
      
      // Reset layout completion state when items change
      if (imagesLoaded && newItems.length > 0) {
        setLayoutComplete(false);
      }
    }, [children, imagesLoaded]);
    
    // Handle individual image loading
    const handleImageLoad = useCallback((img: HTMLImageElement) => {
      // Skip if this image was already processed
      if (imageElements.current.get(img)) return;
      
      // Mark this image as loaded
      imageElements.current.set(img, true);
      imagesLoadedCount.current += 1;
      
      // Find the item containing this image and mark it as loaded
      if (containerRef.current && imagesLoaded) {
        // Find the closest parent item (direct child of masonry grid)
        let itemElement = img.closest('.o-masonry-grid > div');
        if (itemElement) {
          // Add a class to the item to show it's loaded
          itemElement.classList.add('o-masonry-grid__item-loaded');
          itemElement.classList.remove('o-masonry-grid__item-loading');
        }
      }
      
      // Recalculate layout immediately when an image loads
      calculateLayout();
      
      // Notify about progress
      if (onImageLoad) {
        onImageLoad(imagesLoadedCount.current, totalImagesCount.current);
      }
      
      // Check if all images are loaded
      if (imagesLoadedCount.current >= totalImagesCount.current && !layoutComplete) {
        setLayoutComplete(true);
        if (onLayoutComplete) {
          onLayoutComplete();
        }
      }
    }, [onImageLoad, onLayoutComplete, layoutComplete, imagesLoaded]);
    
    // Find and track all images within the grid items
    const trackImages = useCallback(() => {
      if (!imagesLoaded || !containerRef.current) return;
      
      // Reset tracking
      imageElements.current.clear();
      imagesLoadedCount.current = 0;
      
      // Find all images in the container
      const images = containerRef.current.querySelectorAll('img');
      totalImagesCount.current = images.length;
      
      if (images.length === 0) {
        // No images to load, calculate layout immediately
        setLayoutComplete(true);
        if (onLayoutComplete) {
          onLayoutComplete();
        }
        return;
      }
      
      // Track load events for all images
      images.forEach(img => {
        const masonryImg = img as MasonryImageElement;
        
        // Find the parent item and add loading class
        const itemElement = img.closest('.o-masonry-grid > div');
        if (itemElement) {
          itemElement.classList.add('o-masonry-grid__item-loading');
        }
        
        if (img.complete) {
          // Image already loaded
          handleImageLoad(img);
        } else {
          // Add load event listener
          const loadHandler = () => handleImageLoad(img);
          img.addEventListener('load', loadHandler);
          img.addEventListener('error', loadHandler); // Count errors as loaded to prevent hanging
          
          // Store event handlers for cleanup
          masonryImg._masonryLoadHandler = loadHandler;
        }
      });
      
      // Cleanup function to remove event listeners
      return () => {
        images.forEach(img => {
          const masonryImg = img as MasonryImageElement;
          if (masonryImg._masonryLoadHandler) {
            img.removeEventListener('load', masonryImg._masonryLoadHandler);
            img.removeEventListener('error', masonryImg._masonryLoadHandler);
            delete masonryImg._masonryLoadHandler;
          }
        });
      };
    }, [imagesLoaded, handleImageLoad, onLayoutComplete]);
    
    // Calculate positions of items
    const calculateLayout = useCallback(() => {
      if (!containerRef.current || items.length === 0) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const colWidth = (containerWidth - (gap * (columns - 1))) / columns;
      
      // Initialize column heights
      columnHeights.current = Array(columns).fill(0);
      
      const newPositions: ItemPosition[] = [];
      
      // Position each item
      items.forEach((item, index) => {
        if (item.ref.current) {
          // Find the shortest column
          const shortestColIndex = columnHeights.current.indexOf(
            Math.min(...columnHeights.current)
          );
          
          const left = shortestColIndex * (colWidth + gap);
          const top = columnHeights.current[shortestColIndex];
          
          // Get the height of the current item
          const height = item.ref.current.offsetHeight;
          
          // Update the height of the shortest column
          columnHeights.current[shortestColIndex] = top + height + gap;
          
          // Store the position
          newPositions[index] = {
            left,
            top,
            width: colWidth,
            height
          };
        }
      });
      
      setPositions(newPositions);
      setContainerWidth(containerWidth);
    }, [items, columns, gap]);
    
    // Set up resize observer and event listeners
    useEffect(() => {
      updateColumns();
      
      // Create ResizeObserver to watch container size changes
      resizeObserver.current = new ResizeObserver(() => {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
        
        animationFrame.current = requestAnimationFrame(() => {
          calculateLayout();
        });
      });
      
      if (containerRef.current) {
        resizeObserver.current.observe(containerRef.current);
      }
      
      // Update on window resize
      window.addEventListener('resize', updateColumns);
      
      return () => {
        if (resizeObserver.current) {
          resizeObserver.current.disconnect();
        }
        
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
        
        window.removeEventListener('resize', updateColumns);
      };
    }, [updateColumns, calculateLayout]);
    
    // Recalculate layout when items or columns change
    useEffect(() => {
      // Wait for the next frame to ensure refs are populated
      setTimeout(() => {
        if (imagesLoaded) {
          // If waiting for images, trackImages will trigger layout when ready
          trackImages();
        } else {
          // Otherwise calculate layout immediately
          calculateLayout();
        }
      }, 0);
    }, [items, columns, calculateLayout, imagesLoaded, trackImages]);
    
    // Calculate container height based on the tallest column
    const containerHeight = columnHeights.current.length > 0 
      ? Math.max(...columnHeights.current) 
      : 0;
    
    const classes = ['o-masonry-grid'];
    
    if (className) {
      classes.push(className);
    }
    
    if (animate) {
      classes.push('o-masonry-grid--animate');
    }
    
    // Add a class to indicate images are still loading
    if (imagesLoaded && totalImagesCount.current > 0 && !layoutComplete) {
      classes.push('o-masonry-grid--loading-images');
    }
    
    return (
      <div 
        ref={containerRef}
        className={classes.join(' ')} 
        style={{ 
          position: 'relative',
          width: '100%',
          height: `${containerHeight}px`,
          ...props.style 
        }}
        {...props}
      >
        {items.map((item, index) => {
          const position = positions[index];
          
          if (!position) {
            return (
              <div 
                key={index} 
                ref={item.ref} 
                style={{ opacity: 0, position: 'absolute' }}
              >
                {item.element}
              </div>
            );
          }
          
          return (
            <div 
              key={index} 
              ref={item.ref} 
              className="o-masonry-grid__item"
              style={{
                position: 'absolute',
                left: `${position.left}px`,
                top: `${position.top}px`,
                width: `${position.width}px`,
                opacity: 1,
              }}
            >
              {item.element}
            </div>
          );
        })}
      </div>
    );
  }
);

MasonryGrid.displayName = 'MasonryGrid';
