# Pagination Component

The Pagination component provides navigation controls for paginated content, allowing users to navigate through multiple pages of data. It supports various configurations including sibling page counts, first/last buttons, and different sizes.

## Overview

Pagination is essential for breaking large datasets into manageable chunks. The Atomix Pagination component offers intelligent page range calculation, accessibility features, and flexible configuration options to handle various pagination scenarios.

## Props API

### PaginationProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | **required** | Current active page (1-based) |
| `totalPages` | `number` | **required** | Total number of pages |
| `onPageChange` | `(page: number) => void` | **required** | Callback when page changes |
| `siblingCount` | `number` | `1` | Number of page links before/after current page |
| `showFirstLastButtons` | `boolean` | `true` | Show first/last page buttons |
| `showPrevNextButtons` | `boolean` | `true` | Show previous/next page buttons |
| `size` | `Size` | `'md'` | Pagination size variant |
| `className` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | `'Pagination'` | Accessible label for navigation |

### Size Options

- `sm` - Small pagination (compact spacing)
- `md` - Medium pagination (default)
- `lg` - Large pagination (generous spacing)

## Usage Examples

### Basic React Usage

```jsx
import React, { useState } from 'react';
import { Pagination } from '@shohojdhara/atomix';

function BasicPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
```

### Pagination Sizes

```jsx
function PaginationSizes() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="u-gap-6">
      {/* Small pagination */}
      <div>
        <h4>Small Pagination</h4>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          size="sm"
        />
      </div>

      {/* Medium pagination (default) */}
      <div>
        <h4>Medium Pagination</h4>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          size="md"
        />
      </div>

      {/* Large pagination */}
      <div>
        <h4>Large Pagination</h4>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          size="lg"
        />
      </div>
    </div>
  );
}
```

### Custom Configuration

```jsx
function CustomPagination() {
  const [currentPage, setCurrentPage] = useState(5);
  const totalPages = 20;

  return (
    <div className="u-gap-4">
      {/* Minimal pagination (no first/last buttons) */}
      <div>
        <h4>Minimal Pagination</h4>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showFirstLastButtons={false}
          siblingCount={1}
        />
      </div>

      {/* Extended pagination (more siblings) */}
      <div>
        <h4>Extended Pagination</h4>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          siblingCount={2}
        />
      </div>

      {/* Simple pagination (no nav buttons) */}
      <div>
        <h4>Simple Pagination</h4>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showFirstLastButtons={false}
          showPrevNextButtons={false}
          siblingCount={3}
        />
      </div>
    </div>
  );
}
```

### Data Table Integration

```jsx
function DataTableWithPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  
  // Mock data
  const allData = Array.from({ length: 95 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    category: `Category ${Math.floor(i / 10) + 1}`,
    status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending'
  }));

  const totalPages = Math.ceil(allData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = allData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="u-gap-4">
      {/* Data display */}
      <div className="u-border u-rounded">
        <table className="u-w-100">
          <thead>
            <tr className="u-bg-gray-50">
              <th className="u-p-3 u-text-left">ID</th>
              <th className="u-p-3 u-text-left">Name</th>
              <th className="u-p-3 u-text-left">Category</th>
              <th className="u-p-3 u-text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(item => (
              <tr key={item.id} className="u-border-t">
                <td className="u-p-3">{item.id}</td>
                <td className="u-p-3">{item.name}</td>
                <td className="u-p-3">{item.category}</td>
                <td className="u-p-3">
                  <span className={`u-px-2 u-py-1 u-rounded u-text-sm ${
                    item.status === 'Active' ? 'u-bg-green-100 u-text-green-800' :
                    item.status === 'Inactive' ? 'u-bg-red-100 u-text-red-800' :
                    'u-bg-yellow-100 u-text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination info */}
      <div className="u-flex u-justify-between u-items-center">
        <span className="u-text-sm u-text-secondary">
          Showing {startIndex + 1} to {Math.min(startIndex + pageSize, allData.length)} of {allData.length} entries
        </span>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          ariaLabel="Data table pagination"
        />
      </div>
    </div>
  );
}
```

### Search Results Pagination

```jsx
function SearchResultsPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock search results
  const allResults = Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    title: `Search Result ${i + 1}`,
    description: `This is the description for search result ${i + 1}`,
    url: `https://example.com/result-${i + 1}`
  }));

  const resultsPerPage = 10;
  const totalPages = Math.ceil(allResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const currentResults = allResults.slice(startIndex, startIndex + resultsPerPage);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="u-gap-4">
      {/* Search input */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="u-w-100 u-p-3 u-border u-rounded"
        />
      </div>

      {/* Results info */}
      <div className="u-text-sm u-text-secondary">
        About {allResults.length} results ({searchQuery ? `for "${searchQuery}"` : 'total'})
      </div>

      {/* Search results */}
      <div className="u-gap-4">
        {currentResults.map(result => (
          <div key={result.id} className="u-border-b u-pb-4">
            <h3 className="u-text-lg u-text-primary u-mb-1">
              <a href={result.url} className="u-text-decoration-none">
                {result.title}
              </a>
            </h3>
            <p className="u-text-secondary u-mb-1">{result.description}</p>
            <span className="u-text-sm u-text-success">{result.url}</span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="u-flex u-justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          ariaLabel="Search results pagination"
        />
      </div>
    </div>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Basic pagination
const pagination = new Atomix.Pagination('#my-pagination', {
  currentPage: 1,
  totalPages: 10,
  onPageChange: (page) => {
    console.log('Page changed to:', page);
    // Handle page change logic
  }
});

// Custom configuration
const customPagination = new Atomix.Pagination('#custom-pagination', {
  currentPage: 5,
  totalPages: 20,
  siblingCount: 2,
  showFirstLastButtons: true,
  showPrevNextButtons: true,
  size: 'lg',
  onPageChange: (page) => {
    // Update your data display
    loadPageData(page);
  }
});

// Minimal pagination
const minimalPagination = new Atomix.Pagination('#minimal-pagination', {
  currentPage: 1,
  totalPages: 5,
  showFirstLastButtons: false,
  showPrevNextButtons: false,
  siblingCount: 1
});

// Update pagination programmatically
pagination.updatePage(3);
pagination.updateTotalPages(15);

// Initialize from data attributes
Atomix.Pagination.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic pagination -->
<nav
  class="c-pagination"
  data-atomix="pagination"
  data-current-page="1"
  data-total-pages="10"
  data-sibling-count="1"
  data-show-first-last="true"
  data-show-prev-next="true"
  aria-label="Pagination">
</nav>

<!-- Custom pagination -->
<nav
  class="c-pagination c-pagination--lg"
  data-atomix="pagination"
  data-current-page="5"
  data-total-pages="20"
  data-sibling-count="2"
  data-size="lg"
  aria-label="Custom pagination">
</nav>

<!-- Minimal pagination -->
<nav
  class="c-pagination c-pagination--sm"
  data-atomix="pagination"
  data-current-page="1"
  data-total-pages="5"
  data-show-first-last="false"
  data-show-prev-next="false"
  data-size="sm">
</nav>
```

## Styling

### CSS Classes

The Pagination component uses the following CSS class structure:

```css
/* Base pagination */
.c-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-pagination__items {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: var(--pagination-gap);
}

.c-pagination__item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-pagination__link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--pagination-item-size);
  height: var(--pagination-item-size);
  padding: var(--pagination-item-padding);
  border: var(--pagination-border-width) solid var(--pagination-border-color);
  border-radius: var(--pagination-border-radius);
  background: var(--pagination-bg);
  color: var(--pagination-color);
  text-decoration: none;
  font-size: var(--pagination-font-size);
  font-weight: var(--pagination-font-weight);
  transition: all 0.2s ease;
  cursor: pointer;
}

.c-pagination__link:hover {
  background: var(--pagination-hover-bg);
  color: var(--pagination-hover-color);
  border-color: var(--pagination-hover-border-color);
}

.c-pagination__link:focus {
  outline: 2px solid var(--pagination-focus-color);
  outline-offset: 2px;
}

/* Active state */
.c-pagination__item.is-active .c-pagination__link {
  background: var(--pagination-active-bg);
  color: var(--pagination-active-color);
  border-color: var(--pagination-active-border-color);
  font-weight: var(--pagination-active-font-weight);
}

/* Disabled state */
.c-pagination__item.is-disabled .c-pagination__link {
  background: var(--pagination-disabled-bg);
  color: var(--pagination-disabled-color);
  border-color: var(--pagination-disabled-border-color);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Dots */
.c-pagination__item--dots {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--pagination-item-size);
  height: var(--pagination-item-size);
  color: var(--pagination-dots-color);
  font-weight: bold;
}

/* Size modifiers */
.c-pagination--sm {
  --pagination-item-size: 32px;
  --pagination-item-padding: 4px 8px;
  --pagination-font-size: 0.875rem;
  --pagination-gap: 4px;
}

.c-pagination--md {
  --pagination-item-size: 40px;
  --pagination-item-padding: 8px 12px;
  --pagination-font-size: 1rem;
  --pagination-gap: 6px;
}

.c-pagination--lg {
  --pagination-item-size: 48px;
  --pagination-item-padding: 12px 16px;
  --pagination-font-size: 1.125rem;
  --pagination-gap: 8px;
}
```

### Custom Styling

```css
/* Custom pagination variant */
.c-pagination--rounded .c-pagination__link {
  border-radius: 50%;
  min-width: var(--pagination-item-size);
  width: var(--pagination-item-size);
}

/* Minimal pagination */
.c-pagination--minimal .c-pagination__link {
  border: none;
  background: transparent;
  color: var(--color-primary);
}

.c-pagination--minimal .c-pagination__link:hover {
  background: var(--color-primary-50);
}

/* Outlined pagination */
.c-pagination--outlined .c-pagination__link {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.c-pagination--outlined .c-pagination__item.is-active .c-pagination__link {
  background: var(--color-primary);
  color: white;
}

/* Compact pagination */
.c-pagination--compact {
  --pagination-gap: 2px;
}

.c-pagination--compact .c-pagination__link {
  border-radius: 0;
  border-right: none;
}

.c-pagination--compact .c-pagination__item:first-child .c-pagination__link {
  border-top-left-radius: var(--border-radius-md);
  border-bottom-left-radius: var(--border-radius-md);
}

.c-pagination--compact .c-pagination__item:last-child .c-pagination__link {
  border-top-right-radius: var(--border-radius-md);
  border-bottom-right-radius: var(--border-radius-md);
  border-right: var(--pagination-border-width) solid var(--pagination-border-color);
}
```

## Accessibility

The Pagination component includes comprehensive accessibility features:

### ARIA Attributes

- `aria-label` - Provides accessible label for the navigation
- `aria-current="page"` - Applied to the current page button
- `aria-disabled` - Applied to disabled navigation buttons
- `aria-hidden` - Applied to decorative icons

### Keyboard Navigation

- **Tab** - Moves focus between pagination buttons
- **Enter/Space** - Activates focused pagination buttons
- **Arrow keys** - Navigate between page buttons (optional)

### Screen Reader Support

- Navigation landmark is properly labeled
- Current page is announced with `aria-current`
- Button states (disabled, active) are communicated
- Page numbers are clearly announced

## Best Practices

### Do's ✅

- Use appropriate sibling counts for your content
- Provide clear visual feedback for current page
- Include first/last buttons for large page counts
- Use consistent pagination across your application
- Provide loading states during page transitions

```jsx
// Good: Appropriate configuration for content
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  siblingCount={1}
  showFirstLastButtons={totalPages > 7}
  ariaLabel="Product list pagination"
/>

// Good: Loading state handling
function PaginationWithLoading() {
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (page) => {
    setLoading(true);
    try {
      await loadPageData(page);
      setCurrentPage(page);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

### Don'ts ❌

- Don't show pagination for single pages
- Don't use pagination without proper loading states
- Don't make pagination too complex with too many siblings
- Don't forget to handle edge cases (0 pages, 1 page)

```jsx
// Bad: Showing pagination for single page
{totalPages === 1 && (
  <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
)}

// Bad: Too many siblings making it cluttered
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  siblingCount={5} // Too many for most cases
/>

// Bad: No loading state
const handlePageChange = (page) => {
  setCurrentPage(page); // Immediate change without loading feedback
  loadPageData(page); // Async operation with no indication
};
```

## Common Patterns

### URL-Based Pagination

```jsx
import { useSearchParams } from 'react-router-dom';

function URLPagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = 20;

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      ariaLabel="URL-based pagination"
    />
  );
}
```

### Server-Side Pagination

```jsx
function ServerPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/data?page=${page}&limit=10`);
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Render data */}
          {data.map(item => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

### Responsive Pagination

```jsx
function ResponsivePagination({ currentPage, totalPages, onPageChange }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      siblingCount={isMobile ? 0 : 1}
      showFirstLastButtons={!isMobile}
      size={isMobile ? 'sm' : 'md'}
    />
  );
}
```

## Related Components

- **DataTable** - Often used together for data pagination
- **Button** - Pagination uses button-like elements
- **Icon** - Used for navigation arrows
- **Spinner** - Used for loading states during page changes

## Browser Support

The Pagination component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Considerations

- Pagination is lightweight and has minimal performance impact
- Use React.memo for pagination when props don't change frequently
- Consider virtual scrolling for very large datasets instead of pagination
- Optimize page change handlers to avoid unnecessary re-renders

```jsx
// Optimized pagination with memoization
const OptimizedPagination = React.memo(({
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) => {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      {...props}
    />
  );
});

// Debounced page changes for rapid clicking
function DebouncedPagination({ onPageChange, ...props }) {
  const debouncedPageChange = useCallback(
    debounce((page) => onPageChange(page), 300),
    [onPageChange]
  );

  return (
    <Pagination
      {...props}
      onPageChange={debouncedPageChange}
    />
  );
}
```

### Infinite Scroll Alternative

```jsx
function LoadMorePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedItems, setLoadedItems] = useState([]);
  const itemsPerPage = 10;
  const totalPages = 10;

  // Mock data loading
  const loadMoreItems = () => {
    const newItems = Array.from({ length: itemsPerPage }, (_, i) => ({
      id: (currentPage - 1) * itemsPerPage + i + 1,
      title: `Item ${(currentPage - 1) * itemsPerPage + i + 1}`,
      content: `Content for item ${(currentPage - 1) * itemsPerPage + i + 1}`
    }));
    
    setLoadedItems(prev => [...prev, ...newItems]);
    setCurrentPage(prev => prev + 1);
  };

  const hasMore = currentPage <= totalPages;

  return (
    <div className="u-gap-4">
      {/* Loaded items */}
      <div className="u-gap-3">
        {loadedItems.map(item => (
          <div key={item.id} className="u-p-4 u-border u-rounded">
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </div>
        ))}
      </div>

      {/* Load more or pagination */}
      <div className="u-text-center">
        {hasMore ? (
          <button 
            onClick={loadMoreItems}
            className="c-button c-button--primary"
          >
            Load More Items
          </button>
        ) : (
          <div>
            <p className="u-mb-4">All items loaded</p>
            <Pagination
              currentPage={Math.min(currentPage, totalPages)}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                // Reset and load items up to selected page
                const itemsToLoad = Array.from({ length: page * itemsPerPage }, (_, i) => ({
                  id: i + 1,
                  title: `Item ${i + 1}`,
                  content: `Content for item ${i + 1}`
                }));
                setLoadedItems(itemsToLoad);
              }}
              showFirstLastButtons={false}
              ariaLabel="Navigate loaded content"
            />
          </div>
        )}
      </div>
    </div>
  );
}
```
