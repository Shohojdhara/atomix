# CSS Grid System

The Atomix CSS Grid System provides advanced two-dimensional layout capabilities using native CSS Grid. It's designed for complex layouts that require precise control over both rows and columns simultaneously.

## Overview

While the traditional Grid component uses Flexbox for one-dimensional layouts, the CSS Grid component leverages the full power of CSS Grid Layout for sophisticated two-dimensional designs. It's ideal for dashboard layouts, complex forms, magazine-style layouts, and any design requiring precise item placement.

### Key Features

- **🎯 Template Areas** - Define layout structure with named areas
- **✨ Auto-placement** - Automatic item positioning with intelligent packing
- **📱 Responsive Grids** - Dynamic templates that adapt to screen sizes
- **🎨 Advanced Alignment** - Granular control over grid item positioning
- **⚡ Performance** - Native CSS Grid for optimal performance
- **♿ Accessible** - Maintains accessibility while providing complex layouts

### When to Use CSS Grid vs Traditional Grid

| Feature | CSS Grid | Traditional Grid |
|---------|----------|-----------------|
| **Layout Type** | 2-dimensional (rows & columns) | 1-dimensional (columns only) |
| **Item Placement** | Precise grid line positioning | Sequential flow |
| **Template Areas** | ✅ Yes | ❌ No |
| **Auto-fit/Auto-fill** | ✅ Yes | ❌ No |
| **Dense Packing** | ✅ Yes | ❌ No |
| **Learning Curve** | Higher | Lower |

**Use CSS Grid when:** You need complex layouts, template areas, precise control over both dimensions, or magazine-style designs.
**Use Traditional Grid when:** You need simple column-based layouts, linear content flow, or browser support for older browsers.

## Installation

```bash
npm install @shohojdhara/atomix
```

### Import Component

```jsx
import { CssGrid } from '@shohojdhara/atomix';
```

### Vanilla JavaScript

```javascript
import { CssGrid } from '@shohojdhara/atomix/scripts';

// Or include via CDN
// <script src="https://unpkg.com/@shohojdhara/atomix/dist/scripts/css-grid.js"></script>
```

## Component

### CssGrid

The CssGrid component provides comprehensive CSS Grid functionality with TypeScript support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Grid items |
| `className` | `string` | `''` | Additional CSS classes |
| `columns` | `number` | - | Fixed number of columns |
| `templateColumns` | `string` | - | CSS grid-template-columns value |
| `templateRows` | `string` | - | CSS grid-template-rows value |
| `templateAreas` | `string` | - | CSS grid-template-areas value |
| `minColumnWidth` | `string` | - | Minimum column width for auto-fit |
| `gap` | `string` | `'0'` | Gap between grid items |
| `columnGap` | `string` | - | Column-specific gap |
| `rowGap` | `string` | - | Row-specific gap |
| `autoFlow` | `'row' \| 'column' \| 'dense' \| 'row dense' \| 'column dense'` | `'row'` | Auto-placement algorithm |
| `justifyItems` | `'start' \| 'end' \| 'center' \| 'stretch'` | - | Item alignment along row axis |
| `alignItems` | `'start' \| 'end' \| 'center' \| 'stretch' \| 'baseline'` | - | Item alignment along column axis |
| `justifyContent` | `'start' \| 'end' \| 'center' \| 'stretch' \| 'space-around' \| 'space-between' \| 'space-evenly'` | - | Grid alignment along row axis |
| `alignContent` | `'start' \| 'end' \| 'center' \| 'stretch' \| 'space-around' \| 'space-between' \| 'space-evenly'` | - | Grid alignment along column axis |

## Usage Examples

### Basic Grid with Fixed Columns

```jsx
<CssGrid columns={3} gap="1rem">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</CssGrid>
```

### Template Areas Layout

```jsx
<CssGrid 
  templateAreas={`
    "header header header"
    "sidebar content content"
    "footer footer footer"
  `}
  templateColumns="200px 1fr 1fr"
  templateRows="auto 1fr auto"
  gap="1rem"
>
  <div style={{ gridArea: "header" }}>
    Header Content
  </div>
  <div style={{ gridArea: "sidebar" }}>
    Sidebar Content
  </div>
  <div style={{ gridArea: "content" }}>
    Main Content
  </div>
  <div style={{ gridArea: "footer" }}>
    Footer Content
  </div>
</CssGrid>
```

### Auto-fit with Minimum Width

```jsx
<CssGrid minColumnWidth="200px" gap="1rem">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</CssGrid>
```

### Grid Line Positioning

```jsx
<CssGrid templateColumns="repeat(3, 1fr)" templateRows="repeat(3, 100px)" gap="0.5rem">
  <div style={{ gridColumn: "1 / 3", gridRow: "1 / 2" }}>
    Span 2 columns
  </div>
  <div style={{ gridColumn: "3 / 4", gridRow: "1 / 3" }}>
    Span 2 rows
  </div>
  <div style={{ gridColumn: "2 / 4", gridRow: "3 / 4" }}>
    Complex positioning
  </div>
</CssGrid>
```

### Responsive Template Areas

```jsx
<CssGrid 
  templateAreas={{
    xs: `"header" "main" "footer"`,
    md: `"header header" "sidebar main" "footer footer"`,
    lg: `"header header header" "sidebar main main" "footer footer footer"`
  }}
  templateColumns={{
    xs: "1fr",
    md: "200px 1fr",
    lg: "250px 1fr 1fr"
  }}
  gap="1rem"
>
  <div style={{ gridArea: "header" }}>Header</div>
  <div style={{ gridArea: "sidebar" }}>Sidebar</div>
  <div style={{ gridArea: "main" }}>Main Content</div>
  <div style={{ gridArea: "footer" }}>Footer</div>
</CssGrid>
```

## Advanced Layout Patterns

### Dashboard Layout

```jsx
<CssGrid 
  templateAreas={`
    "header header header"
    "sidebar charts charts"
    "sidebar stats stats"
    "footer footer footer"
  `}
  templateColumns="minmax(250px, 1fr) 2fr 1fr"
  templateRows="auto 1fr 1fr auto"
  gap="1rem"
  style={{ minHeight: '100vh' }}
>
  {/* Header */}
  <div style={{ 
    gridArea: "header", 
    background: "var(--atomix-color-primary)", 
    color: "white",
    padding: "1rem"
  }}>
    <h1>Dashboard</h1>
  </div>

  {/* Sidebar */}
  <nav style={{ 
    gridArea: "sidebar", 
    background: "var(--atomix-color-surface)",
    padding: "1rem"
  }}>
    <ul>
      <li>Overview</li>
      <li>Analytics</li>
      <li>Reports</li>
      <li>Settings</li>
    </ul>
  </nav>

  {/* Charts */}
  <section style={{ 
    gridArea: "charts", 
    background: "white",
    padding: "1rem",
    border: "1px solid var(--atomix-color-border)"
  }}>
    <h2>Charts & Analytics</h2>
    {/* Chart components */}
  </section>

  {/* Stats */}
  <section style={{ 
    gridArea: "stats", 
    background: "var(--atomix-color-surface)",
    padding: "1rem"
  }}>
    <h2>Quick Stats</h2>
    {/* Stats components */}
  </section>

  {/* Footer */}
  <footer style={{ 
    gridArea: "footer", 
    background: "var(--atomix-color-muted)",
    padding: "1rem",
    textAlign: "center"
  }}>
    <p>© 2025 Dashboard</p>
  </footer>
</CssGrid>
```

### Complex Form Layout

```jsx
<CssGrid 
  templateAreas={`
    "title title"
    "personal contact"
    "address address"
    "message message"
    "buttons buttons"
  `}
  templateColumns="1fr 1fr"
  gap="1.5rem"
>
  {/* Title */}
  <div style={{ gridArea: "title" }}>
    <h2>Contact Form</h2>
  </div>

  {/* Personal Information */}
  <div style={{ gridArea: "personal" }}>
    <label>First Name</label>
    <input type="text" />
    <label>Last Name</label>
    <input type="text" />
  </div>

  {/* Contact Information */}
  <div style={{ gridArea: "contact" }}>
    <label>Email</label>
    <input type="email" />
    <label>Phone</label>
    <input type="tel" />
  </div>

  {/* Address */}
  <div style={{ gridArea: "address" }}>
    <label>Address</label>
    <input type="text" />
  </div>

  {/* Message */}
  <div style={{ gridArea: "message" }}>
    <label>Message</label>
    <textarea rows={4} />
  </div>

  {/* Buttons */}
  <div style={{ gridArea: "buttons", textAlign: "center" }}>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </div>
</CssGrid>
```

### Magazine Style Layout

```jsx
<CssGrid 
  templateAreas={`
    "featured featured sidebar"
    "article1 article2 sidebar"
    "article3 article4 highlights"
  `}
  templateColumns="1fr 1fr 300px"
  templateRows="auto 1fr auto"
  gap="2rem"
>
  <article style={{ 
    gridArea: "featured",
    background: "white",
    padding: "2rem"
  }}>
    <h1>Featured Article</h1>
    <p>Main story content...</p>
  </article>

  <article style={{ gridArea: "article1" }}>
    <h3>Article 1</h3>
    <p>Content...</p>
  </article>

  <article style={{ gridArea: "article2" }}>
    <h3>Article 2</h3>
    <p>Content...</p>
  </article>

  <aside style={{ 
    gridArea: "sidebar",
    background: "var(--atomix-color-surface)",
    padding: "1rem"
  }}>
    <h3>Sidebar Content</h3>
  </aside>

  {/* More articles... */}
</CssGrid>
```

## Vanilla JavaScript Usage

### Basic Initialization

```javascript
// After DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const cssGrid = new CssGrid({
    element: document.getElementById('my-grid'),
    columns: 4,
    gap: '1rem'
  });
  
  cssGrid.initialize();
});
```

### Dynamic Template Updates

```javascript
const cssGrid = new CssGrid({
  element: document.getElementById('my-grid'),
  templateAreas: `
    "header header"
    "sidebar main"
  `
});

// Update template dynamically
cssGrid.updateTemplate({
  templateAreas: `
    "header header header"
    "sidebar main main"
  `,
  templateColumns: '200px 1fr 1fr'
});
```

### Grid Child Management

```javascript
const cssGrid = new CssGrid({
  element: document.getElementById('my-grid'),
  columns: 3
});

// Add items dynamically
cssGrid.addItem(document.createElement('div'), { gridArea: 'new-item' });

// Remove items
cssGrid.removeItem(document.querySelector('.item-to-remove'));

// Update item positioning
cssGrid.updateItemPosition(document.querySelector('.item'), { 
  gridColumn: '1 / 3',
  gridRow: '2 / 4'
});
```

## Responsive Design

### Breakpoint-based Templates

```jsx
<CssGrid 
  templateColumns={{
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
    xl: 'repeat(5, 1fr)'
  }}
  gap={{ xs: '0.5rem', md: '1rem', lg: '1.5rem' }}
>
  {/* Items that adapt to different column counts */}
  {items.map(item => (
    <div key={item.id}>{item.content}</div>
  ))}
</CssGrid>
```

### Media Query Fallbacks

```css
/* CSS fallback for older browsers */
.my-grid-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

@supports (display: grid) {
  .my-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
```

## Performance Optimization

### Container Queries for Dynamic Layouts

```jsx
<CssGrid 
  templateColumns="minmax(min-content, 200px) 1fr"
  containerType="inline-size"
>
  {/* Items will adapt based on container width */}
  <div>Sidebar</div>
  <div>Content</div>
</CssGrid>
```

### Optimized Re-renders

```jsx
import { useMemo } from 'react';

function OptimizedGrid({ items }) {
  const gridTemplate = useMemo(() => {
    return `repeat(auto-fit, minmax(${250 + items.length * 10}px, 1fr))`;
  }, [items.length]);

  return (
    <CssGrid 
      templateColumns={gridTemplate}
      gap="1rem"
    >
      {items.map(item => (
        <div key={item.id}>{item.content}</div>
      ))}
    </CssGrid>
  );
}
```

## Accessibility

### Screen Reader Support

```jsx
<CssGrid 
  role="grid"
  aria-label="Product grid"
  templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
>
  {products.map(product => (
    <div 
      key={product.id}
      role="gridcell"
      aria-label={product.name}
    >
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  ))}
</CssGrid>
```

### Focus Management

```jsx
<CssGrid 
  templateAreas={`
    "header"
    "main"
    "footer"
  `}
  onKeyDown={(e) => {
    // Custom keyboard navigation for complex layouts
    if (e.key === 'ArrowDown') {
      // Navigate to next section
    }
  }}
>
  {/* Content */}
</CssGrid>
```

## Common Patterns

### Photo Gallery

```jsx
<CssGrid 
  templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
  autoFlow="dense"
  gap="0.5rem"
>
  {photos.map(photo => (
    <div 
      key={photo.id}
      style={{
        width: '100%',
        aspectRatio: '1',
        backgroundImage: `url(${photo.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  ))}
</CssGrid>
```

### Card Grid

```jsx
<CssGrid 
  templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
  gap="1.5rem"
>
  {cards.map(card => (
    <Card key={card.id}>
      <Card.Header>
        <h3>{card.title}</h3>
      </Card.Header>
      <Card.Body>
        <p>{card.content}</p>
      </Card.Body>
      <Card.Footer>
        <Button>Learn More</Button>
      </Card.Footer>
    </Card>
  ))}
</CssGrid>
```

## Browser Support

- **Chrome** 57+
- **Firefox** 52+
- **Safari** 10.1+
- **Edge** 16+

### Fallback Strategies

```css
/* Modern browsers */
@supports (display: grid) {
  .modern-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* Legacy browsers */
.legacy-grid {
  display: flex;
  flex-wrap: wrap;
}

.legacy-grid > * {
  flex: 1 1 50%;
  max-width: 50%;
}
```

## Troubleshooting

### Common Issues

1. **Grid Items Not Aligning**
   - Check `justifyItems` and `alignItems` props
   - Verify item `width` and `height` aren't conflicting

2. **Responsive Issues**
   - Use explicit breakpoint values for templates
   - Test with container queries for complex responsiveness

3. **Performance Problems**
   - Avoid deeply nested grids
   - Use `auto-fit` instead of fixed column counts for dynamic content

### Debugging Tips

```css
/* Add debug borders to visualize grid */
.css-grid-debug * {
  border: 1px solid red !important;
}

/* Show grid lines */
.css-grid-debug {
  background-image: 
    linear-gradient(to right, #ccc 1px, transparent 1px),
    linear-gradient(to bottom, #ccc 1px, transparent 1px);
  background-size: 20px 20px;
}
```

## Related Components

- **[Grid](./grid.md)** - Traditional Flexbox-based grid system
- **[MasonryGrid](./masonry-grid.md)** - Pinterest-style layouts
- **[Container](./grid.md#container)** - Content containers
- **[Card](../components/card.md)** - Content cards for grid layouts

---

**Next Steps**: Explore the [Grid System](./grid.md) for traditional Flexbox layouts or dive into [Advanced Layout Patterns](./advanced-layouts.md) for complex design solutions.