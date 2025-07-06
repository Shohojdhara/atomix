import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
  useMemo,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
// Import styles for scoped CSS modules

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
  (
    {
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
    },
    ref
  ) => {
    // === REFS & STATE ===
    const [columns, setColumns] = useState(xs);
    const [positions, setPositions] = useState<ItemPosition[]>([]);
    const [layoutComplete, setLayoutComplete] = useState(false);
    const [loadingImages, setLoadingImages] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const columnHeights = useRef<number[]>([]);
    const imagesLoadedCount = useRef(0);
    const totalImagesCount = useRef(0);
    const imageElements = useRef<Map<HTMLImageElement, boolean>>(new Map());

    useEffect(() => {
      if (imagesLoaded) setLoadingImages(true);
      else setLoadingImages(false);
    }, [columns, imagesLoaded]);

    // Types
    type MasonryImageElement = HTMLImageElement & {
      _masonryLoadHandler?: EventListener;
    };

    // Forward ref for parent components
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    // === HANDLE RESPONSIVE COLUMNS ===
    const getResponsiveColumns = useCallback(() => {
      const width = window.innerWidth;
      if (width >= 1400 && xxl !== undefined) return xxl;
      if (width >= 1200 && xl !== undefined) return xl;
      if (width >= 992 && lg !== undefined) return lg;
      if (width >= 768 && md !== undefined) return md;
      if (width >= 576 && sm !== undefined) return sm;
      return xs;
    }, [xs, sm, md, lg, xl, xxl]);

    useEffect(() => {
      const handleResize = () => setColumns(getResponsiveColumns());
      handleResize(); // Set on mount
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [getResponsiveColumns]);

    // === PREPARE ITEMS WITH REFS ===
    const [items, setItems] = useState<MasonryItemData[]>([]);

    useEffect(() => {
      const newItems: MasonryItemData[] = [];
      Children.forEach(children, (child, index) => {
        if (!isValidElement(child)) return;
        newItems.push({
          id: child.key?.toString() || `masonry-item-${index}`,
          element: child,
          position: null,
          ref: React.createRef<HTMLDivElement>(),
        });
      });
      setItems(newItems);
    }, [children]);

    // === TRACK & MANAGE IMAGES ===

    const handleImageLoad = useCallback(
      (img: HTMLImageElement) => {
        if (imageElements.current.get(img)) return;
        imageElements.current.set(img, true);
        imagesLoadedCount.current += 1;
        // Add loaded class for animation
        if (containerRef.current && imagesLoaded) {
          const itemElement = img.closest('.o-masonry-grid > div');
          if (itemElement) {
            // FORCE a sync browser reflow so offsetHeight reflects the new image size before measuring Masonry
            void (itemElement as HTMLElement).offsetHeight;
            itemElement.classList.add('o-masonry-grid__item-loaded');
            itemElement.classList.remove('o-masonry-grid__item-loading');
          }
        }
        // Ensure layout is recalculated after DOM paints the item image (prevents overlap on slow/late image loads)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            calculateLayout();
          });
        });
        onImageLoad?.(imagesLoadedCount.current, totalImagesCount.current);

        // If all images have loaded, update loading state and complete layout
        if (imagesLoadedCount.current >= totalImagesCount.current && totalImagesCount.current > 0) {
          setLayoutComplete(true);
          setLoadingImages(false); // This ensures the loading class is removed *immediately* after images load
          // Force a double requestAnimationFrame for final layout calculation after all images are loaded (guarantees DOM paint)
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              calculateLayout();
              // As a failsafe, if still present for some render lag, force another setLoadingImages(false)
              setLoadingImages(false);
            });
          });
          onLayoutComplete?.();
        }
      },
      [onImageLoad, onLayoutComplete, imagesLoaded]
    );

    const trackImages = useCallback(() => {
      if (!imagesLoaded || !containerRef.current) return undefined;
      imageElements.current.clear();
      imagesLoadedCount.current = 0;
      const images = containerRef.current.querySelectorAll('img');
      totalImagesCount.current = images.length;
      if (images.length === 0) {
        setLayoutComplete(true);
        setLoadingImages(false);
        onLayoutComplete?.();
        return undefined;
      }
      setLoadingImages(true);
      images.forEach(img => {
        const masonryImg = img as MasonryImageElement;
        const itemElement = img.closest('.o-masonry-grid > div');
        if (itemElement) {
          itemElement.classList.add('o-masonry-grid__item-loading');
        }
        if (img.complete) {
          handleImageLoad(img);
        } else {
          const loadHandler = () => handleImageLoad(img);
          img.addEventListener('load', loadHandler);
          img.addEventListener('error', loadHandler);
          masonryImg._masonryLoadHandler = loadHandler;
        }
      });
      // Cleanup
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

    // === MANAGE ITEM LAYOUT ===
    const calculateLayout = useCallback(() => {
      if (!containerRef.current || items.length === 0) return;
      const containerWidth = containerRef.current.offsetWidth;
      const colWidth = (containerWidth - gap * (columns - 1)) / columns;
      columnHeights.current = Array(columns).fill(0);
      const newPositions: ItemPosition[] = [];
      items.forEach((item, index) => {
        if (item.ref.current) {
          // Find the shortest column
          const shortestCol = columnHeights.current.indexOf(Math.min(...columnHeights.current));
          const left = shortestCol * (colWidth + gap);
          const top = columnHeights.current[shortestCol] ?? 0;
          const height = item.ref.current.offsetHeight;
          columnHeights.current[shortestCol] = top + height + gap;
          newPositions[index] = {
            left,
            top,
            width: colWidth,
            height,
          };
        }
      });
      setPositions(newPositions);
    }, [items, columns, gap]);

    // === OBSERVE CONTAINER RESIZE ===
    useEffect(() => {
      if (!containerRef.current) return undefined;
      let animationFrame: ReturnType<typeof requestAnimationFrame> | null = null;
      const observer = new ResizeObserver(() => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => calculateLayout());
      });
      observer.observe(containerRef.current);
      return () => {
        observer.disconnect();
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    }, [calculateLayout]);

    // === LAYOUT EFFECT (REPLACES setTimeout) ===
    React.useLayoutEffect(() => {
      if (imagesLoaded) {
        const cleanup = trackImages();
        return cleanup;
      } else {
        calculateLayout();
        setLayoutComplete(true);
        setLoadingImages(false);
        return undefined;
      }
      // Only reset layoutComplete when items or columns change
    }, [items, columns, calculateLayout, imagesLoaded, trackImages]);

    // === NEW: Add ResizeObservers to all grid items for bulletproof image+content measurement ===
    React.useEffect(() => {
      // Clean up old observers if items ever change
      const observers: ResizeObserver[] = [];
      items.forEach(item => {
        if (item.ref.current) {
          const obs = new ResizeObserver(() => {
            // Double rAF: ensures layout only runs after DOM/paint/async renders
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                calculateLayout();
              });
            });
          });
          obs.observe(item.ref.current);
          observers.push(obs);
        }
      });
      return () => {
        observers.forEach(obs => obs.disconnect());
      };
    }, [items, calculateLayout]);

    // Ensure loadingImages state resets when items/columns/imagesLoaded change

    // === DETERMINE CONTAINER HEIGHT ===
    const containerHeight =
      columnHeights.current.length > 0 ? Math.max(...columnHeights.current) : 0;

    // === DETERMINE CLASSES ===
    const classes = [
      'o-masonry-grid',
      className,
      animate ? 'o-masonry-grid--animate' : '',
      loadingImages ? 'o-masonry-grid--loading-images' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // === RENDER ===

    return (
      <div
        ref={containerRef}
        className={classes}
        style={{
          position: 'relative',
          width: '100%',
          height: `${containerHeight}px`,
          ...props.style,
        }}
        {...props}
      >
        {items.map((item, index) => {
          const position = positions[index];
          if (!position) {
            return (
              <div key={item.id} ref={item.ref} style={{ opacity: 0, position: 'absolute' }}>
                {item.element}
              </div>
            );
          }
          return (
            <div
              key={item.id}
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

export default MasonryGrid;

// Ensure loadingImages state resets when items/columns/imagesLoaded change
