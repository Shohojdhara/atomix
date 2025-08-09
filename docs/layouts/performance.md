# Layout Performance Best Practices

This guide covers performance optimization strategies for Atomix Layout components, from basic optimization techniques to advanced performance monitoring and troubleshooting.

## Overview

Layout performance is crucial for user experience. Poor layout performance can cause:

- **Layout Shifts (CLS)** - Visual instability as content moves
- **Slow Rendering** - Delayed paint and layout operations  
- **Janky Animations** - Inconsistent frame rates
- **Memory Leaks** - Accumulating DOM nodes and event listeners
- **Bundle Bloat** - Unnecessary CSS and JavaScript

### Key Metrics

- **Cumulative Layout Shift (CLS)** - Visual stability score
- **First Contentful Paint (FCP)** - Time to first rendered content
- **Largest Contentful Paint (LCP)** - Time to largest content element
- **Time to Interactive (TTI)** - Time until page is fully interactive

## Grid System Performance

### Efficient Column Calculations

```jsx
// ❌ Avoid: Expensive calculations on every render
function SlowGrid({ items }) {
  const getColumnSize = (index) => {
    // Complex calculation on every render
    return Math.floor(12 / Math.sqrt(items.length)) || 1;
  };

  return (
    <Grid>
      {items.map((item, index) => (
        <GridCol key={item.id} md={getColumnSize(index)}>
          {item.content}
        </GridCol>
      ))}
    </Grid>
  );
}

// ✅ Better: Memoized calculations
function OptimizedGrid({ items }) {
  const columnSize = useMemo(() => {
    return Math.floor(12 / Math.sqrt(items.length)) || 1;
  }, [items.length]);

  return (
    <Grid>
      {items.map(item => (
        <GridCol key={item.id} md={columnSize}>
          {item.content}
        </GridCol>
      ))}
    </Grid>
  );
}
```

### Minimize DOM Nesting

```jsx
// ❌ Avoid: Unnecessary wrapper elements
function DeepGrid({ items }) {
  return (
    <Container>
      <div className="wrapper">
        <div className="inner-wrapper">
          <Grid>
            <div className="grid-wrapper">
              {items.map(item => (
                <GridCol key={item.id} md={4}>
                  <div className="item-wrapper">
                    <div className="content-wrapper">
                      {item.content}
                    </div>
                  </div>
                </GridCol>
              ))}
            </div>
          </Grid>
        </div>
      </div>
    </Container>
  );
}

// ✅ Better: Minimal DOM structure
function ShallowGrid({ items }) {
  return (
    <Container>
      <Grid>
        {items.map(item => (
          <GridCol key={item.id} md={4}>
            {item.content}
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
}
```

### CSS-First Approach

```scss
// Use CSS Grid for static layouts when possible
.static-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  
  // No JavaScript needed for basic responsive behavior
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## Masonry Grid Performance

### Efficient Layout Algorithms

```jsx
function OptimizedMasonryGrid({ children, columns = 3, gap = 16 }) {
  const containerRef = useRef();
  const itemRefs = useRef([]);
  const columnHeights = useRef([]);
  
  // Throttled layout calculation
  const calculateLayout = useCallback(
    throttle(() => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = (containerWidth - gap * (columns - 1)) / columns;
      
      // Reset column heights
      columnHeights.current = new Array(columns).fill(0);
      
      // Use DocumentFragment for batch DOM updates
      const fragment = document.createDocumentFragment();
      
      itemRefs.current.forEach((ref, index) => {
        if (!ref.current) return;
        
        // Find shortest column
        const shortestColIndex = columnHeights.current.indexOf(
          Math.min(...columnHeights.current)
        );
        
        const x = shortestColIndex * (itemWidth + gap);
        const y = columnHeights.current[shortestColIndex];
        
        // Batch style updates
        ref.current.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: ${itemWidth}px;
          transition: transform 0.3s ease;
        `;
        
        columnHeights.current[shortestColIndex] += 
          ref.current.offsetHeight + gap;
      });
      
      // Set container height
      const maxHeight = Math.max(...columnHeights.current);
      containerRef.current.style.height = `${maxHeight}px`;
    }, 16), // ~60fps throttling
    [columns, gap]
  );

  // Efficient resize handling
  useEffect(() => {
    const resizeObserver = new ResizeObserver(calculateLayout);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [calculateLayout]);

  return (
    <div ref={containerRef} className="optimized-masonry">
      {Children.map(children, (child, index) => {
        if (!itemRefs.current[index]) {
          itemRefs.current[index] = React.createRef();
        }
        
        return React.cloneElement(child, {
          ref: itemRefs.current[index],
          key: child.key || index
        });
      })}
    </div>
  );
}
```

### Virtual Scrolling for Large Lists

```jsx
import { FixedSizeGrid as Grid } from 'react-window';

function VirtualMasonryGrid({ items, itemHeight = 200, width = '100%' }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef();
  
  // Calculate columns based on container width
  const columns = Math.floor(containerWidth / 250) || 1;
  const rows = Math.ceil(items.length / columns);
  
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    // Use ResizeObserver for efficient resize detection
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    updateWidth();
    return () => resizeObserver.disconnect();
  }, []);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const itemIndex = rowIndex * columns + columnIndex;
    const item = items[itemIndex];
    
    if (!item) return null;
    
    return (
      <div style={{ ...style, padding: '8px' }}>
        <MasonryItem item={item} />
      </div>
    );
  };

  return (
    <div ref={containerRef} style={{ width, height: '600px' }}>
      {containerWidth > 0 && (
        <Grid
          columnCount={columns}
          columnWidth={Math.floor(containerWidth / columns)}
          height={600}
          rowCount={rows}
          rowHeight={itemHeight}
          width={containerWidth}
          overscanRowCount={2}
          overscanColumnCount={1}
        >
          {Cell}
        </Grid>
      )}
    </div>
  );
}
```

### Image Loading Optimization

```jsx
function OptimizedImageMasonry({ images }) {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [imageDimensions, setImageDimensions] = useState(new Map());
  
  // Pre-calculate aspect ratios to prevent layout shifts
  const preloadImage = useCallback((src, id) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setImageDimensions(prev => new Map(prev.set(id, aspectRatio)));
        setLoadedImages(prev => new Set(prev.add(id)));
        resolve({ width: img.width, height: img.height, aspectRatio });
      };
      
      img.onerror = reject;
      img.src = src;
    });
  }, []);
  
  // Batch preload images
  useEffect(() => {
    const preloadPromises = images.map(image => 
      preloadImage(image.src, image.id).catch(() => null)
    );
    
    Promise.allSettled(preloadPromises).then(() => {
      console.log('All images processed');
    });
  }, [images, preloadImage]);

  return (
    <MasonryGrid xs={1} sm={2} md={3} lg={4} gap={16}>
      {images.map(image => {
        const aspectRatio = imageDimensions.get(image.id) || 1;
        const isLoaded = loadedImages.has(image.id);
        
        return (
          <MasonryGridItem key={image.id}>
            <div 
              className="image-container"
              style={{ 
                aspectRatio,
                backgroundColor: isLoaded ? 'transparent' : '#f0f0f0'
              }}
            >
              {isLoaded ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div className="image-placeholder">
                  <Skeleton width="100%" height="100%" />
                </div>
              )}
            </div>
          </MasonryGridItem>
        );
      })}
    </MasonryGrid>
  );
}
```

## Memory Management

### Cleanup Event Listeners

```jsx
function ProperCleanupComponent() {
  const containerRef = useRef();
  const resizeObserver = useRef();
  const intersectionObserver = useRef();
  
  useEffect(() => {
    // Setup observers
    resizeObserver.current = new ResizeObserver(() => {
      // Handle resize
    });
    
    intersectionObserver.current = new IntersectionObserver(() => {
      // Handle intersection
    });
    
    if (containerRef.current) {
      resizeObserver.current.observe(containerRef.current);
      intersectionObserver.current.observe(containerRef.current);
    }
    
    // Cleanup function
    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, []);
  
  return <div ref={containerRef}>Content</div>;
}
```

### Avoid Memory Leaks in Dynamic Lists

```jsx
function DynamicGridList({ items }) {
  const itemRefs = useRef(new Map());
  const [visibleItems, setVisibleItems] = useState(new Set());
  
  // Clean up refs for removed items
  useEffect(() => {
    const currentItemIds = new Set(items.map(item => item.id));
    
    // Remove refs for items that no longer exist
    for (const [id, ref] of itemRefs.current) {
      if (!currentItemIds.has(id)) {
        itemRefs.current.delete(id);
      }
    }
  }, [items]);
  
  // Intersection observer with cleanup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems(prev => {
          const next = new Set(prev);
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              next.add(entry.target.dataset.itemId);
            } else {
              next.delete(entry.target.dataset.itemId);
            }
          });
          return next;
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe current items
    itemRefs.current.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });
    
    return () => observer.disconnect();
  }, [items]);

  return (
    <Grid>
      {items.map(item => {
        if (!itemRefs.current.has(item.id)) {
          itemRefs.current.set(item.id, React.createRef());
        }
        
        const isVisible = visibleItems.has(item.id);
        
        return (
          <GridCol key={item.id} md={4}>
            <div 
              ref={itemRefs.current.get(item.id)}
              data-item-id={item.id}
            >
              {isVisible ? (
                <ExpensiveItemComponent item={item} />
              ) : (
                <ItemPlaceholder />
              )}
            </div>
          </GridCol>
        );
      })}
    </Grid>
  );
}
```

## CSS Performance

### Efficient Selectors

```scss
// ❌ Avoid expensive selectors
.container * + * {
  margin-top: 1rem; // Expensive universal selector
}

.grid-item:nth-child(3n+1):not(:first-child) {
  clear: left; // Complex pseudo-selectors
}

// ✅ Use specific, shallow selectors
.grid-item + .grid-item {
  margin-top: 1rem;
}

.grid-item--new-row {
  clear: left;
}
```

### Minimize Reflows and Repaints

```scss
// Use transform and opacity for animations (GPU accelerated)
.grid-item {
  will-change: transform;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
  }
}

// Avoid animating layout properties
.grid-item--bad {
  transition: width 0.3s ease; // Causes layout
}

.grid-item--good {
  transition: transform 0.3s ease; // Composite only
}
```

### Optimize Container Queries

```scss
// Use container queries efficiently
.card-grid {
  container-type: inline-size;
  container-name: card-grid;
}

// Minimize container query usage
.card {
  @container card-grid (min-width: 400px) {
    display: flex;
    
    .card__image {
      width: 40%;
    }
    
    .card__content {
      width: 60%;
    }
  }
}
```

## Bundle Optimization

### Tree Shaking

```jsx
// ❌ Imports entire library
import * as Atomix from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <Atomix.Container>
      <Atomix.Grid>
        <Atomix.GridCol md={6}>Content</Atomix.GridCol>
      </Atomix.Grid>
    </Atomix.Container>
  );
}

// ✅ Import only what you need
import { Container, Grid, GridCol } from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <Container>
      <Grid>
        <GridCol md={6}>Content</GridCol>
      </Grid>
    </Container>
  );
}
```

### Dynamic Imports for Large Components

```jsx
// Lazy load heavy components
const MasonryGrid = lazy(() => import('@shohojdhara/atomix').then(module => ({
  default: module.MasonryGrid
})));

const PhotoGallery = lazy(() => import('./PhotoGallery'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Grid>
          <GridCol xs={12}>
            <MasonryGrid xs={1} sm={2} md={3}>
              <PhotoGallery />
            </MasonryGrid>
          </GridCol>
        </Grid>
      </Container>
    </Suspense>
  );
}
```

### CSS Splitting

```scss
// Critical CSS - inline in head
@use '@shohojdhara/atomix/styles/objects/container';
@use '@shohojdhara/atomix/styles/objects/grid';

// Non-critical CSS - load asynchronously
// masonry.scss
@use '@shohojdhara/atomix/styles/objects/masonry-grid';
```

## Performance Monitoring

### Layout Shift Monitoring

```jsx
function LayoutShiftMonitor({ children }) {
  useEffect(() => {
    if ('LayoutShift' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift') {
            console.warn('Layout shift detected:', {
              value: entry.value,
              hadRecentInput: entry.hadRecentInput,
              sources: entry.sources
            });
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      
      return () => observer.disconnect();
    }
  }, []);

  return children;
}
```

### Performance Metrics Collection

```jsx
function PerformanceMonitor() {
  useEffect(() => {
    const measureWebVitals = async () => {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    };

    measureWebVitals();
  }, []);

  return null;
}
```

### React DevTools Profiling

```jsx
// Add display names for easier profiling
Container.displayName = 'Container';
Grid.displayName = 'Grid';
GridCol.displayName = 'GridCol';
MasonryGrid.displayName = 'MasonryGrid';

// Use memo for expensive components
const ExpensiveGridItem = memo(({ item }) => {
  return (
    <div className="expensive-item">
      {/* Complex rendering logic */}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.item.id === nextProps.item.id &&
         prevProps.item.updatedAt === nextProps.item.updatedAt;
});
```

## Testing Performance

### Performance Tests

```javascript
// performance.test.js
describe('Layout Performance', () => {
  test('grid renders within performance budget', async () => {
    const start = performance.now();
    
    render(
      <Grid>
        {Array.from({ length: 100 }, (_, i) => (
          <GridCol key={i} md={3}>
            Item {i}
          </GridCol>
        ))}
      </Grid>
    );
    
    const end = performance.now();
    const renderTime = end - start;
    
    expect(renderTime).toBeLessThan(100); // 100ms budget
  });

  test('masonry handles large datasets efficiently', () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({ 
      id: i, 
      content: `Item ${i}` 
    }));
    
    const { rerender } = render(
      <MasonryGrid xs={1} sm={2} md={3}>
        {items.slice(0, 10).map(item => (
          <MasonryGridItem key={item.id}>
            {item.content}
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    );
    
    const start = performance.now();
    
    // Update with more items
    rerender(
      <MasonryGrid xs={1} sm={2} md={3}>
        {items.slice(0, 100).map(item => (
          <MasonryGridItem key={item.id}>
            {item.content}
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    );
    
    const end = performance.now();
    expect(end - start).toBeLessThan(50);
  });
});
```

### Lighthouse CI Integration

```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/grid-demo'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
      },
    },
  },
};
```

## Common Performance Pitfalls

### 1. Excessive Re-renders

```jsx
// ❌ Creates new object on every render
function BadGrid({ items }) {
  return (
    <Grid style={{ padding: '1rem' }}> {/* New object each render */}
      {items.map(item => (
        <GridCol key={item.id} md={4}>
          {item.content}
        </GridCol>
      ))}
    </Grid>
  );
}

// ✅ Stable references
const gridStyle = { padding: '1rem' };

function GoodGrid({ items }) {
  return (
    <Grid style={gridStyle}>
      {items.map(item => (
        <GridCol key={item.id} md={4}>
          {item.content}
        </GridCol>
      ))}
    </Grid>
  );
}
```

### 2. Expensive Layout Calculations

```jsx
// ❌ Expensive calculations in render
function SlowMasonry({ items }) {
  return (
    <MasonryGrid 
      xs={1} 
      sm={2} 
      md={calculateOptimalColumns(items)} // Expensive function
    >
      {items.map(item => (
        <MasonryGridItem key={item.id}>
          {item.content}
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}

// ✅ Memoized calculations
function FastMasonry({ items }) {
  const optimalColumns = useMemo(
    () => calculateOptimalColumns(items),
    [items.length] // Only recalculate when length changes
  );
  
  return (
    <MasonryGrid xs={1} sm={2} md={optimalColumns}>
      {items.map(item => (
        <MasonryGridItem key={item.id}>
          {item.content}
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}
```

### 3. Layout Thrashing

```jsx
// ❌ Causes multiple layout recalculations
function ThrashingGrid() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    // Adding items one by one causes layout thrashing
    data.forEach((item, index) => {
      setTimeout(() => {
        setItems(prev => [...prev, item]);
      }, index * 100);
    });
  }, []);
  
  return (
    <Grid>
      {items.map(item => (
        <GridCol key={item.id} md={4}>
          {item.content}
        </GridCol>
      ))}
    </Grid>
  );
}

// ✅ Batch updates
function BatchedGrid() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    // Load all items at once
    setItems(data);
  }, []);
  
  return (
    <Grid>
      {items.map(item => (
        <GridCol key={item.id} md={4}>
          {item.content}
        </GridCol>
      ))}
    </Grid>
  );
}
```

## Best Practices Checklist

### Development
- [ ] Use stable references for props and styles
- [ ] Implement proper key props for dynamic lists
- [ ] Minimize DOM depth and wrapper elements
- [ ] Use CSS-first solutions when possible
- [ ] Implement efficient event listener cleanup

### Images and Media
- [ ] Provide image dimensions to prevent layout shifts
- [ ] Use lazy loading for off-screen images
- [ ] Implement proper loading states and placeholders
- [ ] Optimize image formats and sizes

### Bundle and CSS
- [ ] Import only necessary components
- [ ] Use efficient CSS selectors
- [ ] Minimize CSS bundle size
- [ ] Implement critical CSS inlining

### Monitoring
- [ ] Set up Core Web Vitals monitoring
- [ ] Implement performance budgets
- [ ] Use React DevTools Profiler
- [ ] Test on various devices and networks

---

**Ready to optimize your layouts?** Start with the basic optimizations like stable references and proper cleanup, then gradually implement more advanced techniques like virtual scrolling and performance monitoring. 🚀

*Built with ❤️ by the Atomix team*