# Breadcrumb Component

The Breadcrumb component provides hierarchical navigation that helps users understand their current location within a website or application structure. It displays a trail of links showing the path from the root to the current page.

## Overview

Breadcrumbs are a secondary navigation aid that helps users understand where they are in the site hierarchy and provides a way to navigate back to parent pages. The Atomix Breadcrumb component supports icons, custom dividers, and flexible link handling.

## Props API

### BreadcrumbProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | **required** | Array of breadcrumb items |
| `divider` | `ReactNode` | `'/'` | Custom divider character or element |
| `className` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | `'Breadcrumb'` | Accessible label for navigation |
| `LinkComponent` | `React.ElementType` | `undefined` | Custom link component (e.g., React Router Link) |
| `style` | `React.CSSProperties` | `undefined` | Custom styles object |

### BreadcrumbItem Interface

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | **required** | Text to display for the item |
| `href` | `string` | `undefined` | URL for the breadcrumb item |
| `active` | `boolean` | `false` | Whether this item is active (current page) |
| `icon` | `ReactNode` | `undefined` | Optional icon to display before the label |
| `onClick` | `(event: React.MouseEvent) => void` | `undefined` | Optional click handler |

## Usage Examples

### Basic React Usage

```jsx
import React from 'react';
import { Breadcrumb } from '@shohojdhara/atomix';

function BasicBreadcrumb() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Product Name', active: true }
  ];

  return <Breadcrumb items={items} />;
}
```

### Breadcrumb with Icons

```jsx
import { Icon } from '@shohojdhara/atomix';

function IconBreadcrumb() {
  const items = [
    { 
      label: 'Home', 
      href: '/', 
      icon: <Icon name="House" size="sm" />
    },
    { 
      label: 'Products', 
      href: '/products',
      icon: <Icon name="Package" size="sm" />
    },
    { 
      label: 'Electronics', 
      href: '/products/electronics',
      icon: <Icon name="DeviceMobile" size="sm" />
    },
    { 
      label: 'Smartphone', 
      active: true,
      icon: <Icon name="DeviceMobile" size="sm" />
    }
  ];

  return <Breadcrumb items={items} />;
}
```

### Custom Divider

```jsx
function CustomDividerBreadcrumb() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Article Title', active: true }
  ];

  return (
    <div className="u-gap-4">
      {/* Arrow divider */}
      <Breadcrumb items={items} divider="→" />
      
      {/* Icon divider */}
      <Breadcrumb 
        items={items} 
        divider={<Icon name="CaretRight" size="xs" />} 
      />
      
      {/* Custom element divider */}
      <Breadcrumb 
        items={items} 
        divider={<span className="u-text-secondary">|</span>} 
      />
    </div>
  );
}
```

### With Click Handlers

```jsx
function InteractiveBreadcrumb() {
  const navigate = (path) => {
    console.log('Navigating to:', path);
    // Your navigation logic here
  };

  const items = [
    { 
      label: 'Dashboard', 
      href: '/dashboard',
      onClick: (e) => {
        e.preventDefault();
        navigate('/dashboard');
      }
    },
    { 
      label: 'Users', 
      href: '/users',
      onClick: (e) => {
        e.preventDefault();
        navigate('/users');
      }
    },
    { 
      label: 'User Profile', 
      active: true 
    }
  ];

  return <Breadcrumb items={items} />;
}
```

### With React Router

```jsx
import { Link } from 'react-router-dom';

function RouterBreadcrumb() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Product Details', active: true }
  ];

  return (
    <Breadcrumb 
      items={items} 
      LinkComponent={Link}
      ariaLabel="Page navigation"
    />
  );
}
```

### Dynamic Breadcrumbs

```jsx
function DynamicBreadcrumb({ currentPath }) {
  const generateBreadcrumbs = (path) => {
    const segments = path.split('/').filter(Boolean);
    const items = [{ label: 'Home', href: '/' }];
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      items.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : currentPath,
        active: isLast
      });
    });
    
    return items;
  };

  return <Breadcrumb items={generateBreadcrumbs(currentPath)} />;
}
```

### Vanilla JavaScript Usage

```javascript
// Basic breadcrumb
const breadcrumb = new Atomix.Breadcrumb('#my-breadcrumb', {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Product Name', active: true }
  ]
});

// Breadcrumb with icons and custom divider
const iconBreadcrumb = new Atomix.Breadcrumb('#icon-breadcrumb', {
  items: [
    { label: 'Home', href: '/', icon: 'House' },
    { label: 'Products', href: '/products', icon: 'Package' },
    { label: 'Current Page', active: true, icon: 'Tag' }
  ],
  divider: '→'
});

// With click handlers
const interactiveBreadcrumb = new Atomix.Breadcrumb('#interactive-breadcrumb', {
  items: [
    { 
      label: 'Home', 
      href: '/',
      onClick: (e) => {
        e.preventDefault();
        console.log('Navigate to home');
      }
    },
    { label: 'Current Page', active: true }
  ]
});

// Initialize from data attributes
Atomix.Breadcrumb.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic breadcrumb -->
<nav 
  class="c-breadcrumb" 
  data-atomix="breadcrumb"
  data-items='[
    {"label": "Home", "href": "/"},
    {"label": "Products", "href": "/products"},
    {"label": "Current Page", "active": true}
  ]'
  aria-label="Breadcrumb">
</nav>

<!-- Breadcrumb with custom divider -->
<nav 
  class="c-breadcrumb" 
  data-atomix="breadcrumb"
  data-divider="→"
  data-items='[
    {"label": "Home", "href": "/"},
    {"label": "Blog", "href": "/blog"},
    {"label": "Article", "active": true}
  ]'>
</nav>
```

## Styling

### CSS Classes

The Breadcrumb component uses the following CSS class structure:

```css
/* Base breadcrumb */
.c-breadcrumb {
  display: flex;
  gap: var(--breadcrumb-items-gap);
  list-style: none;
  padding-left: 0;
  margin-bottom: var(--breadcrumb-margin-bottom);
}

/* Breadcrumb item */
.c-breadcrumb__item {
  display: flex;
  align-items: center;
  gap: var(--breadcrumb-items-gap);
}

/* Divider (automatically added) */
.c-breadcrumb__item + .c-breadcrumb__item::before {
  content: '/';
  color: var(--breadcrumb-divider-color);
  margin-right: var(--breadcrumb-divider-gap);
}

/* Active item */
.c-breadcrumb__item.is-active {
  color: var(--breadcrumb-active-color);
  font-weight: medium;
}

/* Links */
.c-breadcrumb__link {
  display: flex;
  align-items: center;
  gap: calc(var(--breadcrumb-items-gap) / 2);
  color: var(--breadcrumb-color);
  padding: var(--breadcrumb-link-padding-y) var(--breadcrumb-link-padding-x);
  transition: color 0.2s ease;
}

.c-breadcrumb__link:hover {
  color: var(--breadcrumb-hover-color);
}

/* Icon */
.c-breadcrumb__icon {
  display: inline-flex;
  align-items: center;
}
```

### Custom Styling

```css
/* Custom breadcrumb variant */
.c-breadcrumb--compact {
  --breadcrumb-items-gap: 8px;
  --breadcrumb-link-padding-y: 2px;
  font-size: 0.875rem;
}

/* Breadcrumb with background */
.c-breadcrumb--card {
  background: var(--color-gray-50);
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-gray-200);
}

/* Custom divider styles */
.c-breadcrumb--arrow .c-breadcrumb__item + .c-breadcrumb__item::before {
  content: '→';
  font-size: 0.875rem;
}

.c-breadcrumb--dot .c-breadcrumb__item + .c-breadcrumb__item::before {
  content: '•';
  font-weight: bold;
}
```

## Accessibility

The Breadcrumb component includes comprehensive accessibility features:

### ARIA Attributes

- `aria-label` - Provides accessible label for the navigation
- `aria-current="page"` - Applied to the current/active page item
- `role="navigation"` - Implicit role for nav element

### Keyboard Navigation

- **Tab** - Moves focus between breadcrumb links
- **Enter/Space** - Activates focused links
- **Disabled items** - Removed from tab order

### Screen Reader Support

- Navigation landmark is properly labeled
- Current page is announced with `aria-current`
- Link relationships are preserved
- Icons include appropriate alt text when needed

## Best Practices

### Do's ✅

- Keep breadcrumb labels concise and descriptive
- Use consistent capitalization throughout
- Provide meaningful icons that enhance understanding
- Make the current page non-clickable
- Use breadcrumbs for hierarchical navigation only

```jsx
// Good: Clear, hierarchical structure
const items = [
  { label: 'Home', href: '/' },
  { label: 'Electronics', href: '/electronics' },
  { label: 'Smartphones', href: '/electronics/smartphones' },
  { label: 'iPhone 15 Pro', active: true }
];

// Good: Meaningful icons
const itemsWithIcons = [
  { label: 'Home', href: '/', icon: <Icon name="House" /> },
  { label: 'Products', href: '/products', icon: <Icon name="Package" /> },
  { label: 'Current Item', active: true }
];
```

### Don'ts ❌

- Don't use breadcrumbs for single-level navigation
- Don't make breadcrumbs too long (max 5-7 items)
- Don't use breadcrumbs as primary navigation
- Don't include the current page as a clickable link

```jsx
// Bad: Too many levels
const tooManyLevels = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Subcategory', href: '/category/sub' },
  { label: 'Sub-subcategory', href: '/category/sub/subsub' },
  { label: 'Item Type', href: '/category/sub/subsub/type' },
  { label: 'Specific Item', href: '/category/sub/subsub/type/item' },
  { label: 'Current Page', active: true }
];

// Bad: Current page as clickable link
const badCurrentPage = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current Page', href: '/current', active: true } // Don't do this
];
```

## Common Patterns

### E-commerce Breadcrumbs

```jsx
function EcommerceBreadcrumb({ category, subcategory, product }) {
  const items = [
    { label: 'Home', href: '/', icon: <Icon name="House" /> },
    { label: 'Shop', href: '/shop' }
  ];

  if (category) {
    items.push({ label: category.name, href: `/shop/${category.slug}` });
  }

  if (subcategory) {
    items.push({
      label: subcategory.name,
      href: `/shop/${category.slug}/${subcategory.slug}`
    });
  }

  if (product) {
    items.push({ label: product.name, active: true });
  }

  return <Breadcrumb items={items} />;
}
```

### Documentation Breadcrumbs

```jsx
function DocsBreadcrumb({ section, page }) {
  const items = [
    { label: 'Documentation', href: '/docs', icon: <Icon name="Book" /> },
    { label: section.title, href: `/docs/${section.slug}` },
    { label: page.title, active: true }
  ];

  return <Breadcrumb items={items} divider="/" />;
}
```

### Admin Dashboard Breadcrumbs

```jsx
function AdminBreadcrumb({ module, action, item }) {
  const items = [
    { label: 'Dashboard', href: '/admin', icon: <Icon name="Gauge" /> },
    { label: module.name, href: `/admin/${module.slug}` }
  ];

  if (action) {
    items.push({ label: action.name, href: `/admin/${module.slug}/${action.slug}` });
  }

  if (item) {
    items.push({ label: item.name, active: true });
  }

  return <Breadcrumb items={items} />;
}
```

### Responsive Breadcrumbs

```jsx
function ResponsiveBreadcrumb({ items }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayItems = isCollapsed && items.length > 3
    ? [
        items[0],
        { label: '...', href: undefined },
        items[items.length - 1]
      ]
    : items;

  return <Breadcrumb items={displayItems} />;
}
```

## Related Components

- **Navigation** - Primary navigation components
- **Icon** - Used for breadcrumb item icons
- **Button** - Can be used for breadcrumb actions
- **Link** - Custom link components for routing

## Browser Support

The Breadcrumb component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Considerations

- Breadcrumbs are lightweight and have minimal performance impact
- Use React.memo for breadcrumb items that don't change frequently
- Consider lazy loading for dynamic breadcrumb generation
- Optimize icon rendering for better performance

```jsx
// Optimized breadcrumb with memoization
const OptimizedBreadcrumb = React.memo(({ items }) => {
  return <Breadcrumb items={items} />;
});
```
