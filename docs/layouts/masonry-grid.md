# Masonry Grid

The Atomix Masonry Grid provides a dynamic, Pinterest-style layout that automatically positions items based on their height, creating an optimal grid with minimal gaps. Perfect for photo galleries, card collections, and content feeds with varying item heights.

## Overview

The Masonry Grid uses JavaScript to calculate optimal positioning for items of varying heights, creating a visually appealing layout that maximizes space usage. Items are positioned column by column, with each new item placed in the column with the shortest current height.

### Key Features

- **📐 Dynamic Positioning** - Automatic optimal item placement
- **📱 Responsive Design** - Configurable columns per breakpoint
- **🖼️ Image Loading Support** - Handles image loading and layout recalculation
- **⚡ Performance Optimized** - ResizeObserver and efficient algorithms
- **🎨 Smooth Animations** - Optional item transition animations
- **♿ Accessible** - Maintains semantic HTML structure

## Installation

```bash
npm install @shohojdhara/atomix
```

### Import Components

```jsx
import { MasonryGrid, MasonryGridItem } from '@shohojdhara/atomix';
```

### Import Styles

```css
@import '@shohojdhara/atomix/css';
```

Or import specific masonry styles:

```scss
@use '@shohojdhara/atomix/styles/objects/masonry-grid';
```

## Components

### MasonryGrid

The main container that manages item positioning and responsive behavior.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** MasonryGridItem components |
| `className` | `string` | `''` | Additional CSS classes |
| `xs` | `number` | `1` | Number of columns at xs breakpoint |
| `sm` | `number` | - | Number of columns at sm breakpoint |
| `md` | `number` | - | Number of columns at md breakpoint |
| `lg` | `number` | - | Number of columns at lg breakpoint |
| `xl` | `number` | - | Number of columns at xl breakpoint |
| `xxl` | `number` | - | Number of columns at xxl breakpoint |
| `gap` | `number` | `16` | Gap between items in pixels |
| `animate` | `boolean` | `true` | Enable smooth item transitions |
| `imagesLoaded` | `boolean` | `true` | Handle image loading for layout recalculation |
| `onLayoutComplete` | `() => void` | - | Callback when all images are loaded and layout is complete |
| `onImageLoad` | `(loaded: number, total: number) => void` | - | Callback for each image load event |

#### Examples

```jsx
// Basic masonry grid
<MasonryGrid xs={1} sm={2} md={3} lg={4}>
  {items.map(item => (
    <MasonryGridItem key={item.id}>
      <div className="card">
        <img src={item.image} alt={item.title} />
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </MasonryGridItem>
  ))}
</MasonryGrid>

// Custom configuration
<MasonryGrid
  xs={1}
  sm={2}
  md={3}
  lg={4}
  xl={5}
  gap={24}
  animate={true}
  imagesLoaded={true}
  onLayoutComplete={() => console.log('Layout complete!')}
  onImageLoad={(loaded, total) => console.log(`${loaded}/${total} images loaded`)}
>
  {content}
</MasonryGrid>
```

#### HTML/CSS

```html
<div class="o-masonry-grid">
  <div class="o-masonry-grid__item" style="position: absolute; left: 0px; top: 0px; width: 200px;">
    <div class="o-masonry-grid__item-inner">
      Item content
    </div>
  </div>
  <div class="o-masonry-grid__item" style="position: absolute; left: 216px; top: 0px; width: 200px;">
    <div class="o-masonry-grid__item-inner">
      Item content
    </div>
  </div>
</div>
```

### MasonryGridItem

Individual items within the masonry grid that get automatically positioned.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Item content |
| `className` | `string` | `''` | Additional CSS classes |

#### Examples

```jsx
// Simple item
<MasonryGridItem>
  <div className="card">Card content</div>
</MasonryGridItem>

// Item with custom styling
<MasonryGridItem className="custom-item">
  <article>
    <h2>Article Title</h2>
    <p>Article content...</p>
  </article>
</MasonryGridItem>

// Item with complex content
<MasonryGridItem>
  <div className="photo-card">
    <img src="photo.jpg" alt="Description" />
    <div className="photo-meta">
      <h3>Photo Title</h3>
      <p>Photo description and metadata</p>
      <div className="photo-actions">
        <button>Like</button>
        <button>Share</button>
      </div>
    </div>
  </div>
</MasonryGridItem>
```

## Responsive Configuration

### Breakpoint System

The Masonry Grid uses the same responsive breakpoints as the Grid System:

| Breakpoint | Min Width | Typical Usage |
|------------|-----------|---------------|
| `xs` | 0px | Mobile phones (1 column) |
| `sm` | 576px | Large phones (2 columns) |
| `md` | 768px | Tablets (3 columns) |
| `lg` | 992px | Laptops (4 columns) |
| `xl` | 1200px | Desktops (4-5 columns) |
| `xxl` | 1440px | Large screens (5-6 columns) |

### Common Column Configurations

```jsx
// Conservative approach - fewer columns
<MasonryGrid xs={1} sm={2} md={2} lg={3} xl={4}>

// Balanced approach - standard responsive
<MasonryGrid xs={1} sm={2} md={3} lg={4} xl={5}>

// Aggressive approach - more columns
<MasonryGrid xs={1} sm={2} md={3} lg={4} xl={5} xxl={6}>

// Content-specific - articles/blogs
<MasonryGrid xs={1} sm={1} md={2} lg={3} xl={3}>

// Image gallery - photos
<MasonryGrid xs={2} sm={3} md={4} lg={5} xl={6}>
```

## Use Cases and Examples

### Photo Gallery

```jsx
function PhotoGallery({ photos }) {
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  const handleImageLoad = (loaded, total) => {
    setLoadedCount(loaded);
  };

  const handleLayoutComplete = () => {
    setLoading(false);
  };

  return (
    <div>
      {loading && (
        <div className="loading-indicator">
          Loading images... {loadedCount}/{photos.length}
        </div>
      )}
      
      <MasonryGrid
        xs={2}
        sm={3}
        md={4}
        lg={5}
        xl={6}
        gap={16}
        imagesLoaded={true}
        onImageLoad={handleImageLoad}
        onLayoutComplete={handleLayoutComplete}
      >
        {photos.map(photo => (
          <MasonryGridItem key={photo.id}>
            <div className="photo-item">
              <img
                src={photo.url}
                alt={photo.alt}
                loading="lazy"
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="photo-overlay">
                <h3>{photo.title}</h3>
                <p>{photo.photographer}</p>
              </div>
            </div>
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    </div>
  );
}
```

### Blog Card Grid

```jsx
function BlogGrid({ posts }) {
  return (
    <MasonryGrid xs={1} sm={2} md={2} lg={3} xl={3} gap={24}>
      {posts.map(post => (
        <MasonryGridItem key={post.id}>
          <article className="blog-card">
            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="blog-card__image"
              />
            )}
            <div className="blog-card__content">
              <div className="blog-card__meta">
                <time dateTime={post.publishDate}>
                  {formatDate(post.publishDate)}
                </time>
                <span className="blog-card__category">
                  {post.category}
                </span>
              </div>
              <h2 className="blog-card__title">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h2>
              <p className="blog-card__excerpt">{post.excerpt}</p>
              <div className="blog-card__author">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="blog-card__avatar"
                />
                <span>{post.author.name}</span>
              </div>
            </div>
          </article>
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}
```

### Product Grid

```jsx
function ProductGrid({ products }) {
  return (
    <MasonryGrid xs={2} sm={3} md={4} lg={5} gap={20}>
      {products.map(product => (
        <MasonryGridItem key={product.id}>
          <div className="product-card">
            <div className="product-card__image">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
              />
              {product.badge && (
                <span className="product-card__badge">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="product-card__content">
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__price">
                {product.salePrice ? (
                  <>
                    <span className="price--sale">${product.salePrice}</span>
                    <span className="price--original">${product.price}</span>
                  </>
                ) : (
                  <span>${product.price}</span>
                )}
              </p>
              <div className="product-card__rating">
                <StarRating rating={product.rating} />
                <span>({product.reviewCount})</span>
              </div>
              <button className="product-card__action">
                Add to Cart
              </button>
            </div>
          </div>
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}
```

### Portfolio Grid

```jsx
function Portfolio({ projects }) {
  return (
    <MasonryGrid xs={1} sm={2} md={3} lg={3} xl={4} gap={30}>
      {projects.map(project => (
        <MasonryGridItem key={project.id}>
          <div className="portfolio-item">
            <div className="portfolio-item__image">
              <img
                src={project.thumbnail}
                alt={project.title}
                loading="lazy"
              />
              <div className="portfolio-item__overlay">
                <div className="portfolio-item__actions">
                  <a
                    href={project.liveUrl}
                    className="btn btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live
                  </a>
                  <a
                    href={project.githubUrl}
                    className="btn btn--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item__content">
              <h3 className="portfolio-item__title">{project.title}</h3>
              <p className="portfolio-item__description">
                {project.description}
              </p>
              <div className="portfolio-item__tech">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}
```

## Advanced Usage

### Infinite Scroll Integration

```jsx
function InfiniteMasonryGrid() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  const loadMore = async () => {
    if (loading) return;
    
    setLoading(true);
    const newItems = await fetchMoreItems();
    
    setItems(prev => [...prev, ...newItems]);
    setHasMore(newItems.length > 0);
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <>
      <MasonryGrid xs={1} sm={2} md={3} lg={4}>
        {items.map(item => (
          <MasonryGridItem key={item.id}>
            <ItemComponent item={item} />
          </MasonryGridItem>
        ))}
      </MasonryGrid>
      
      {hasMore && (
        <div ref={observerRef} className="loading-trigger">
          {loading && <Spinner />}
        </div>
      )}
    </>
  );
}
```

### Search and Filter Integration

```jsx
function FilterableMasonryGrid({ allItems }) {
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    let filtered = allItems;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, allItems]);

  return (
    <div>
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="photography">Photography</option>
        </select>
      </div>

      <MasonryGrid xs={1} sm={2} md={3} lg={4} key={`${searchTerm}-${selectedCategory}`}>
        {filteredItems.map(item => (
          <MasonryGridItem key={item.id}>
            <ItemCard item={item} />
          </MasonryGridItem>
        ))}
      </MasonryGrid>

      {filteredItems.length === 0 && (
        <div className="no-results">
          <p>No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
```

### Custom Item Heights and Spacing

```jsx
function VariableHeightGrid() {
  const items = [
    { id: 1, type: 'small', content: 'Short content' },
    { id: 2, type: 'medium', content: 'Medium length content...' },
    { id: 3, type: 'large', content: 'Much longer content...' },
    { id: 4, type: 'xl', content: 'Extra long content...' },
  ];

  return (
    <MasonryGrid xs={1} sm={2} md={3} gap={20}>
      {items.map(item => (
        <MasonryGridItem key={item.id}>
          <div className={`item item--${item.type}`}>
            <div className="item__content">
              {item.content}
            </div>
          </div>
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}

// CSS for variable heights
const itemStyles = `
  .item {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
  }

  .item--small { min-height: 150px; }
  .item--medium { min-height: 250px; }
  .item--large { min-height: 350px; }
  .item--xl { min-height: 450px; }
`;
```

## Image Loading and Performance

### Optimized Image Loading

```jsx
function OptimizedImageGrid({ images }) {
  const [imageLoadStates, setImageLoadStates] = useState({});
  
  const handleImageLoad = (imageId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [imageId]: 'loaded'
    }));
  };

  const handleImageError = (imageId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [imageId]: 'error'
    }));
  };

  return (
    <MasonryGrid
      xs={2}
      sm={3}
      md={4}
      lg={5}
      imagesLoaded={true}
      onLayoutComplete={() => console.log('All images loaded')}
    >
      {images.map(image => (
        <MasonryGridItem key={image.id}>
          <div className="image-item">
            {imageLoadStates[image.id] !== 'loaded' && (
              <div className="image-placeholder">
                <Spinner />
              </div>
            )}
            
            <img
              src={image.url}
              alt={image.alt}
              loading="lazy"
              onLoad={() => handleImageLoad(image.id)}
              onError={() => handleImageError(image.id)}
              style={{
                width: '100%',
                height: 'auto',
                opacity: imageLoadStates[image.id] === 'loaded' ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
            />
            
            {imageLoadStates[image.id] === 'error' && (
              <div className="image-error">
                <p>Failed to load image</p>
              </div>
            )}
          </div>
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}
```

### Progressive Loading

```jsx
function ProgressiveLoadingGrid({ items, itemsPerPage = 20 }) {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreItems = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(prev => Math.min(prev + itemsPerPage, items.length));
      setIsLoading(false);
    }, 500);
  };

  const hasMoreItems = visibleItems < items.length;

  return (
    <>
      <MasonryGrid xs={1} sm={2} md={3} lg={4}>
        {items.slice(0, visibleItems).map(item => (
          <MasonryGridItem key={item.id}>
            <ItemComponent item={item} />
          </MasonryGridItem>
        ))}
      </MasonryGrid>

      {hasMoreItems && (
        <div className="load-more-section">
          <button
            onClick={loadMoreItems}
            disabled={isLoading}
            className="btn btn--primary"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
}
```

## Styling and Customization

### CSS Custom Properties

```css
:root {
  /* Masonry grid variables */
  --atomix-masonry-gap: 1rem;
  --atomix-masonry-gap-sm: 0.75rem;
  --atomix-masonry-gap-lg: 1.5rem;
  
  /* Animation settings */
  --atomix-masonry-transition-duration: 0.3s;
  --atomix-masonry-transition-easing: ease-out;
  
  /* Loading states */
  --atomix-masonry-loading-opacity: 0.6;
  --atomix-masonry-loading-blur: 2px;
}
```

### SCSS Variables

```scss
// Masonry grid configuration
$masonry-gap: 1rem !default;
$masonry-gap-sm: 0.75rem !default;
$masonry-gap-lg: 1.5rem !default;

// Default column counts
$masonry-columns-xs: 1 !default;
$masonry-columns-sm: 2 !default;
$masonry-columns-md: 3 !default;
$masonry-columns-lg: 4 !default;
$masonry-columns-xl: 4 !default;
$masonry-columns-xxl: 5 !default;

// Animation settings
$masonry-transition-duration: 0.3s !default;
$masonry-transition-easing: ease-out !default;

// Enable/disable features
$enable-masonry-animations: true !default;
$enable-masonry-image-loading: true !default;
```

### Custom Item Animations

```css
/* Custom item entrance animation */
.o-masonry-grid__item {
  transition: all var(--atomix-masonry-transition-duration) var(--atomix-masonry-transition-easing);
}

.o-masonry-grid--animate .o-masonry-grid__item {
  transform: translateY(20px);
  opacity: 0;
}

.o-masonry-grid--animate .o-masonry-grid__item-loaded {
  transform: translateY(0);
  opacity: 1;
}

/* Custom hover effects */
.o-masonry-grid__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Loading state styling */
.o-masonry-grid--loading-images .o-masonry-grid__item-loading {
  opacity: var(--atomix-masonry-loading-opacity);
  filter: blur(var(--atomix-masonry-loading-blur));
}
```

### Theme Integration

```scss
// Custom theme integration
.theme-dark {
  --atomix-masonry-item-bg: #2a2a2a;
  --atomix-masonry-item-border: #444;
  --atomix-masonry-item-text: #fff;
}

.theme-light {
  --atomix-masonry-item-bg: #fff;
  --atomix-masonry-item-border: #ddd;
  --atomix-masonry-item-text: #333;
}

.masonry-item {
  background: var(--atomix-masonry-item-bg);
  border: 1px solid var(--atomix-masonry-item-border);
  color: var(--atomix-masonry-item-text);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}
```

## Accessibility

### Semantic HTML Structure

```jsx
// Good: Semantic structure maintained
<MasonryGrid xs={1} sm={2} md={3}>
  {articles.map(article => (
    <MasonryGridItem key={article.id}>
      <article>
        <header>
          <h2>{article.title}</h2>
          <time dateTime={article.publishDate}>
            {formatDate(article.publishDate)}
          </time>
        </header>
        <div>
          <p>{article.excerpt}</p>
        </div>
        <footer>
          <a href={`/articles/${article.slug}`}>Read more</a>
        </footer>
      </article>
    </MasonryGridItem>
  ))}
</MasonryGrid>
```

### Keyboard Navigation

```jsx
function AccessibleMasonryGrid({ items }) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemRefs = useRef([]);

  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = Math.min(index + 1, items.length - 1);
        setFocusedIndex(nextIndex);
        itemRefs.current[nextIndex]?.focus();
        break;
        
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = Math.max(index - 1, 0);
        setFocusedIndex(prevIndex);
        itemRefs.current[prevIndex]?.focus();
        break;
    }
  };

  return (
    <MasonryGrid xs={1} sm={2} md={3} role="grid">
      {items.map((item, index) => (
        <MasonryGridItem key={item.id} role="gridcell">
          <div
            ref={el => itemRefs.current[index] = el}
            tabIndex={index === focusedIndex ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="focusable-item"
            role="button"
            aria-label={`Item ${index + 1}: ${item.title}`}
          >
            <ItemContent item={item} />
          </div>
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}
```

### Screen Reader Support

```jsx
// Announce layout changes to screen readers
function AccessibleMasonryWithAnnouncements({ items }) {
  const [announcementText, setAnnouncementText] = useState('');

  const handleLayoutComplete = () => {
    setAnnouncementText(`Layout complete. ${items.length} items displayed in masonry grid.`);
  };

  const handleImageLoad = (loaded, total) => {
    if (loaded === total) {
      setAnnouncementText(`All ${total} images loaded successfully.`);
    }
  };

  return (
    <>
      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcementText}
      </div>

      <MasonryGrid
        xs={1}
        sm={2}
        md={3}
        onLayoutComplete={handleLayoutComplete}
        onImageLoad={handleImageLoad}
        role="grid"
        aria-label="Masonry grid layout"
      >
        {items.map((item, index) => (
          <MasonryGridItem key={item.id} role="gridcell">
            <div aria-posinset={index + 1} aria-setsize={items.length}>
              <ItemContent item={item} />
            </div>
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    </>
  );
}
```

## Performance Optimization

### Virtual Scrolling for Large Lists

```jsx
import { FixedSizeGrid as Grid } from 'react-window';

function VirtualizedMasonryGrid({ items, itemHeight = 200 }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef();
  
  const columns = Math.floor(containerWidth / 250); // 250px per column
  const rows = Math.ceil(items.length / columns);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const itemIndex = rowIndex * columns + columnIndex;
    const item = items[itemIndex];

    if (!item) return null;

    return (
      <div style={style}>
        <div style={{ padding: '8px' }}>
          <ItemComponent item={item} />
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} style={{ height: '600px', width: '100%' }}>
      {containerWidth > 0 && (
        <Grid
          columnCount={columns}
          columnWidth={Math.floor(containerWidth / columns)}
          height={600}
          rowCount={rows}
          rowHeight={itemHeight}
          width={containerWidth}
        >
          {Cell}
        </Grid>
      )}
    </div>
  );
}
```

### Lazy Loading Implementation

```jsx
function LazyMasonryGrid({ items }) {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.dataset.itemId;
            setVisibleItems(prev => new Set([...prev, itemId]));
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const observeItem = useCallback((node) => {
    if (observerRef.current && node) {
      observerRef.current.observe(node);
    }
  }, []);

  return (
    <MasonryGrid xs={1} sm={2} md={3} lg={4}>
      {items.map(item => (
        <MasonryGridItem key={item.id}>
          <div
            ref={observeItem}
            data-item-id={item.id}
            className="lazy-item"
          >
            {visibleItems.has(item.id) ? (
              <ItemComponent item={item} />
            ) : (
              <div className="lazy-placeholder" style={{ height: '200px' }}>
                <Spinner />
              </div>
            )}
          </div>
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}
```

### Memory Management

```jsx
function OptimizedMasonryGrid({ items }) {
  const masonryRef = useRef();
  
  // Clean up observers and event listeners
  useEffect(() => {
    return () => {
      if (masonryRef.current) {
        // Clean up any internal observers
        masonryRef.current.cleanup?.();
      }
    };
  }, []);

  // Throttle resize calculations
  const throttledResize = useCallback(
    throttle(() => {
      if (masonryRef.current) {
        masonryRef.current.recalculateLayout();
      }
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      throttledResize.cancel();
    };
  }, [throttledResize]);

  return (
    <MasonryGrid
      ref={masonryRef}
      xs={1}
      sm={2}
      md={3}
      lg={4}
      gap={16}
    >
      {items.map(item => (
        <MasonryGridItem key={item.id}>
          <ItemComponent item={item} />
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}
```

## Browser Support

The Masonry Grid component supports all modern browsers:

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+

### Feature Detection

```javascript
// Check for required features
const supportsIntersectionObserver = 'IntersectionObserver' in window;
const supportsResizeObserver = 'ResizeObserver' in window;

if (!supportsIntersectionObserver) {
  // Polyfill or fallback behavior
  console.warn('IntersectionObserver not supported, using fallback');
}
```

### Progressive Enhancement

```jsx
function ProgressiveEnhancementGrid({ items }) {
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    // Check for modern browser features
    const hasModernFeatures = 
      'IntersectionObserver' in window &&
      'ResizeObserver' in window &&
      CSS.supports('display', 'grid');

    setEnhanced(hasModernFeatures);
  }, []);

  if (!enhanced) {
    // Fallback to simple grid
    return (
      <div className="simple-grid">
        {items.map(item => (
          <div key={item.id} className="simple-grid__item">
            <ItemComponent item={item} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <MasonryGrid xs={1} sm={2} md={3} lg={4}>
      {items.map(item => (
        <MasonryGridItem key={item.id}>
          <ItemComponent item={item} />
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}
```

## Testing

### Unit Testing

```jsx
import { render, screen } from '@testing-library/react';
import { MasonryGrid, MasonryGridItem } from '@shohojdhara/atomix';

describe('MasonryGrid', () => {
  test('renders with correct number of items', () => {
    const items = [1, 2, 3, 4, 5];
    
    render(
      <MasonryGrid xs={2} sm={3}>
        {items.map(item => (
          <MasonryGridItem key={item} data-testid={`item-${item}`}>
            Item {item}
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    );

    items.forEach(item => {
      expect(screen.getByTestId(`item-${item}`)).toBeInTheDocument();
    });
  });

  test('applies correct responsive classes', () => {
    const { container } = render(
      <MasonryGrid xs={1} sm={2} md={3} className="test-grid">
        <MasonryGridItem>Item</MasonryGridItem>
      </MasonryGrid>
    );

    expect(container.firstChild).toHaveClass('o-masonry-grid', 'test-grid');
  });

  test('handles image loading callbacks', async () => {
    const onLayoutComplete = jest.fn();
    const onImageLoad = jest.fn();

    render(
      <MasonryGrid
        xs={2}
        onLayoutComplete={onLayoutComplete}
        onImageLoad={onImageLoad}
      >
        <MasonryGridItem>
          <img src="test.jpg" alt="Test" />
        </MasonryGridItem>
      </MasonryGrid>
    );

    // Simulate image load
    const img = screen.getByAltText('Test');
    fireEvent.load(img);

    expect(onImageLoad).toHaveBeenCalledWith(1, 1);
    expect(onLayoutComplete).toHaveBeenCalled();
  });
});
```

### Visual Regression Testing

```jsx
import { render } from '@testing-library/react';
import { MasonryGrid, MasonryGridItem } from '@shohojdhara/atomix';

describe('MasonryGrid Visual Tests', () => {
  const mockItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    content: `Item ${i + 1}`,
    height: Math.floor(Math.random() * 200) + 100
  }));

  test('matches snapshot for basic layout', () => {
    const { container } = render(
      <MasonryGrid xs={2} sm={3} md={4}>
        {mockItems.map(item => (
          <MasonryGridItem key={item.id}>
            <div style={{ height: item.height }}>
              {item.content}
            </div>
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    );

    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with custom gap', () => {
    const { container } = render(
      <MasonryGrid xs={2} gap={24}>
        {mockItems.slice(0, 6).map(item => (
          <MasonryGridItem key={item.id}>
            <div style={{ height: item.height }}>
              {item.content}
            </div>
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    );

    expect(container).toMatchSnapshot();
  });
});
```

### E2E Testing

```javascript
// cypress/integration/masonry-grid.spec.js
describe('Masonry Grid E2E', () => {
  beforeEach(() => {
    cy.visit('/masonry-grid-demo');
  });

  it('should load and display items correctly', () => {
    cy.get('[data-testid="masonry-grid"]').should('be.visible');
    cy.get('[data-testid="masonry-item"]').should('have.length.at.least', 1);
  });

  it('should be responsive', () => {
    // Test mobile view
    cy.viewport(375, 667);
    cy.get('[data-testid="masonry-grid"]').should('have.class', 'o-masonry-grid');
    
    // Test desktop view
    cy.viewport(1200, 800);
    cy.get('[data-testid="masonry-grid"]').should('have.class', 'o-masonry-grid');
  });

  it('should handle image loading', () => {
    cy.get('img').should('be.visible');
    cy.get('[data-testid="loading-indicator"]').should('not.exist');
  });

  it('should maintain focus order', () => {
    cy.get('[data-testid="masonry-item"]').first().focus();
    cy.focused().should('have.attr', 'data-testid', 'masonry-item');
    
    cy.focused().type('{downarrow}');
    // Test that focus moves to next logical item
  });
});
```

## Troubleshooting

### Common Issues

#### 1. Items Not Positioning Correctly

**Problem**: Items overlap or have incorrect positions.

**Solution**:
```jsx
// Ensure items have proper structure
<MasonryGrid xs={1} sm={2} md={3}>
  {items.map(item => (
    <MasonryGridItem key={item.id}> {/* Key is important */}
      <div style={{ width: '100%' }}> {/* Ensure proper width */}
        {item.content}
      </div>
    </MasonryGridItem>
  ))}
</MasonryGrid>
```

#### 2. Layout Not Updating on Image Load

**Problem**: Layout doesn't recalculate when images load.

**Solution**:
```jsx
// Enable image loading handling
<MasonryGrid
  xs={1}
  sm={2}
  md={3}
  imagesLoaded={true} // Enable image loading detection
  onLayoutComplete={() => console.log('Layout updated')}
>
  {items.map(item => (
    <MasonryGridItem key={item.id}>
      <img 
        src={item.image} 
        alt={item.alt}
        style={{ width: '100%', height: 'auto' }} // Proper sizing
      />
    </MasonryGridItem>
  ))}
</MasonryGrid>
```

#### 3. Performance Issues with Large Lists

**Problem**: Slow rendering with many items.

**Solution**:
```jsx
// Use virtualization for large lists
import { FixedSizeGrid } from 'react-window';

function VirtualMasonryGrid({ items }) {
  // Implementation using react-window
  return <FixedSizeGrid /* props */ />;
}

// Or implement progressive loading
function ProgressiveMasonryGrid({ items }) {
  const [visibleCount, setVisibleCount] = useState(20);
  
  return (
    <>
      <MasonryGrid xs={1} sm={2} md={3}>
        {items.slice(0, visibleCount).map(item => (
          <MasonryGridItem key={item.id}>
            <ItemComponent item={item} />
          </MasonryGridItem>
        ))}
      </MasonryGrid>
      
      {visibleCount < items.length && (
        <button onClick={() => setVisibleCount(prev => prev + 20)}>
          Load More
        </button>
      )}
    </>
  );
}
```

#### 4. Responsive Breakpoints Not Working

**Problem**: Grid doesn't respond to screen size changes.

**Solution**:
```jsx
// Ensure proper breakpoint configuration
<MasonryGrid
  xs={1}    // Mobile: 1 column
  sm={2}    // Small: 2 columns (576px+)
  md={3}    // Medium: 3 columns (768px+)
  lg={4}    // Large: 4 columns (992px+)
  xl={5}    // XL: 5 columns (1200px+)
  xxl={6}   // XXL: 6 columns (1440px+)
>
  {content}
</MasonryGrid>
```

### Debug Mode

```jsx
function DebugMasonryGrid({ items, debug = false }) {
  const [layoutInfo, setLayoutInfo] = useState(null);

  const handleLayoutComplete = () => {
    if (debug) {
      console.log('Layout completed:', {
        itemCount: items.length,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleImageLoad = (loaded, total) => {
    if (debug) {
      console.log(`Images loaded: ${loaded}/${total}`);
    }
  };

  return (
    <>
      {debug && (
        <div className="debug-panel">
          <h4>Debug Info</h4>
          <p>Items: {items.length}</p>
          <p>Layout: {layoutInfo ? 'Complete' : 'Loading'}</p>
        </div>
      )}
      
      <MasonryGrid
        xs={1}
        sm={2}
        md={3}
        onLayoutComplete={handleLayoutComplete}
        onImageLoad={handleImageLoad}
        className={debug ? 'debug-mode' : ''}
      >
        {items.map((item, index) => (
          <MasonryGridItem key={item.id}>
            {debug && <div className="debug-label">{index + 1}</div>}
            <ItemComponent item={item} />
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    </>
  );
}
```

## Migration Guide

### From React Masonry CSS

```jsx
// Before (react-masonry-css)
import Masonry from 'react-masonry-css';

<Masonry
  breakpointCols={{
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  }}
  className="masonry-grid"
  columnClassName="masonry-grid_column"
>
  {items.map(item => (
    <div key={item.id}>{item.content}</div>
  ))}
</Masonry>

// After (Atomix)
import { MasonryGrid, MasonryGridItem } from '@shohojdhara/atomix';

<MasonryGrid xs={1} sm={2} lg={3} xl={4}>
  {items.map(item => (
    <MasonryGridItem key={item.id}>
      {item.content}
    </MasonryGridItem>
  ))}
</MasonryGrid>
```

### From CSS-Only Masonry

```css
/* Before (CSS-only) */
.masonry {
  column-count: 4;
  column-gap: 1rem;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}
```

```jsx
// After (Atomix)
<MasonryGrid xs={1} sm={2} md={3} lg={4} gap={16}>
  {items.map(item => (
    <MasonryGridItem key={item.id}>
      {item.content}
    </MasonryGridItem>
  ))}
</MasonryGrid>
```

## Related Components

- **[Grid System](./grid.md)** - Traditional grid layouts
- **[Card](../components/card.md)** - Content cards for masonry layouts
- **[Image](../components/image.md)** - Optimized images with lazy loading
- **[Spinner](../components/spinner.md)** - Loading states
- **[Container](./grid.md#container)** - Layout containers

## Resources

### CodePen Examples
- [Photo Gallery](https://codepen.io/atomix-design/pen/masonry-photos)
- [Blog Cards](https://codepen.io/atomix-design/pen/masonry-blog)
- [Product Grid](https://codepen.io/atomix-design/pen/masonry-products)

### Storybook Documentation
Visit the Masonry Grid section in Storybook for interactive examples and API playground.

### Community Examples
- [Pinterest Clone Tutorial](https://github.com/atomix-examples/pinterest-clone)
- [Image Gallery App](https://github.com/atomix-examples/image-gallery)
- [Blog Layout Examples](https://github.com/atomix-examples/blog-layouts)

---

**Ready to create beautiful masonry layouts?** Start with a simple photo gallery and gradually add more advanced features like infinite scroll and filtering. For questions and support, visit our [GitHub Discussions](https://github.com/shohojdhara/atomix/discussions). 🎨

*Built with ❤️ by the Atomix team*