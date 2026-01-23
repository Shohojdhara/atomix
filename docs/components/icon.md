# Icon Component

The Icon component provides a consistent way to display icons throughout your application using the Phosphor Icons library. It supports multiple sizes, weights, colors, and includes built-in accessibility features.

## Overview

Icons are essential visual elements that help users understand functionality and navigate interfaces. The Atomix Icon component provides access to the complete Phosphor Icons library with a simple, consistent API and automatic accessibility features.

## Props API

### IconProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `PhosphorIconsType` | **required** | Icon name from Phosphor Icons library |
| `size` | `IconSize \| number` | `'md'` | Icon size (preset or custom pixel value) |
| `weight` | `IconWeight` | `'regular'` | Icon weight/style variant |
| `color` | `string` | `undefined` | Icon color (CSS color value) |
| `className` | `string` | `''` | Additional CSS classes |
| `alt` | `string` | `undefined` | Alt text for accessibility |

### Size Options

- `xs` - Extra small (16px)
- `sm` - Small (20px)
- `md` - Medium (24px) - default
- `lg` - Large (32px)
- `xl` - Extra large (40px)
- Custom number - Any pixel value

### Weight Options

- `thin` - Thinnest stroke weight
- `light` - Light stroke weight
- `regular` - Regular stroke weight (default)
- `bold` - Bold stroke weight
- `fill` - Filled icon variant
- `duotone` - Two-tone icon variant

## Usage Examples

### Basic React Usage

```jsx
import React from 'react';
import { Icon } from '@shohojdhara/atomix';

function BasicIcons() {
  return (
    <div className="u-flex u-gap-4 u-items-center">
      {/* Basic icon */}
      <Icon name="Heart" />
      
      {/* Icon with custom size */}
      <Icon name="Star" size="lg" />
      
      {/* Icon with custom color */}
      <Icon name="CheckCircle" color="#22c55e" />
      
      {/* Icon with weight variant */}
      <Icon name="User" weight="bold" />
      
      {/* Icon with accessibility text */}
      <Icon name="Info" alt="Information" />
    </div>
  );
}
```

### Icon Sizes

```jsx
function IconSizes() {
  return (
    <div className="u-flex u-gap-4 u-items-center">
      <Icon name="Heart" size="xs" />
      <Icon name="Heart" size="sm" />
      <Icon name="Heart" size="md" />
      <Icon name="Heart" size="lg" />
      <Icon name="Heart" size="xl" />
      
      {/* Custom pixel size */}
      <Icon name="Heart" size={48} />
    </div>
  );
}
```

### Icon Weights

```jsx
function IconWeights() {
  return (
    <div className="u-flex u-gap-4 u-items-center">
      <Icon name="Star" weight="thin" />
      <Icon name="Star" weight="light" />
      <Icon name="Star" weight="regular" />
      <Icon name="Star" weight="bold" />
      <Icon name="Star" weight="fill" />
      <Icon name="Star" weight="duotone" />
    </div>
  );
}
```

### Colored Icons

```jsx
function ColoredIcons() {
  return (
    <div className="u-flex u-gap-4 u-items-center">
      {/* CSS color values */}
      <Icon name="Heart" color="#ef4444" />
      <Icon name="CheckCircle" color="#22c55e" />
      <Icon name="Warning" color="#f59e0b" />
      
      {/* CSS variables */}
      <Icon name="Info" color="var(--color-primary)" />
      
      {/* Current color (inherits from parent) */}
      <div style={{ color: '#8b5cf6' }}>
        <Icon name="Star" color="currentColor" />
      </div>
    </div>
  );
}
```

### Interactive Icons

```jsx
function InteractiveIcons() {
  const [liked, setLiked] = useState(false);
  
  return (
    <div className="u-flex u-gap-4">
      {/* Clickable icon */}
      <button 
        className="u-btn-reset u-cursor-pointer"
        onClick={() => setLiked(!liked)}
        aria-label={liked ? "Unlike" : "Like"}
      >
        <Icon 
          name="Heart" 
          weight={liked ? "fill" : "regular"}
          color={liked ? "#ef4444" : "currentColor"}
        />
      </button>
      
      {/* Icon with hover effect */}
      <div className="u-cursor-pointer hover:u-text-primary">
        <Icon name="Star" />
      </div>
    </div>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Basic icon creation
const icon = new Atomix.Icon('.my-icon', {
  name: 'Heart',
  size: 'md',
  weight: 'regular',
  color: '#ef4444'
});

// Icon with custom size
const largeIcon = new Atomix.Icon('.large-icon', {
  name: 'Star',
  size: 32,
  weight: 'fill'
});

// Initialize from data attributes
Atomix.Icon.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic icon -->
<span 
  class="c-icon c-icon--md" 
  data-atomix="icon"
  data-name="Heart"
  data-size="md"
  data-weight="regular">
</span>

<!-- Icon with custom properties -->
<span 
  class="c-icon c-icon--lg" 
  data-atomix="icon"
  data-name="Star"
  data-size="lg"
  data-weight="fill"
  data-color="#f59e0b"
  aria-label="Favorite">
</span>
```

## Styling

### CSS Classes

The Icon component uses the following CSS class structure:

```css
/* Base icon */
.c-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
}

/* Size modifiers */
.c-icon--xs { width: 16px; height: 16px; }
.c-icon--sm { width: 20px; height: 20px; }
.c-icon--md { width: 24px; height: 24px; }
.c-icon--lg { width: 32px; height: 32px; }
.c-icon--xl { width: 40px; height: 40px; }

/* Color modifiers */
.c-icon--primary { color: var(--color-primary); }
.c-icon--secondary { color: var(--color-secondary); }
.c-icon--success { color: var(--color-success); }
.c-icon--error { color: var(--color-error); }
.c-icon--warning { color: var(--color-warning); }
.c-icon--info { color: var(--color-info); }
.c-icon--current { color: currentColor; }
```

### Custom Styling

```css
/* Custom icon colors */
.c-icon--brand {
  color: #6366f1;
}

/* Icon hover effects */
.c-icon--interactive {
  cursor: pointer;
  transition: color 0.2s ease;
}

.c-icon--interactive:hover {
  color: var(--color-primary);
}

/* Icon animations */
.c-icon--spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

## Accessibility

The Icon component includes comprehensive accessibility features:

### ARIA Attributes

- `aria-hidden="true"` - Applied when no alt text is provided (decorative icons)
- `aria-label` - Used when alt text is provided for meaningful icons
- `title` - Provides tooltip text for additional context

### Screen Reader Support

- Decorative icons are hidden from screen readers
- Meaningful icons include accessible labels
- Icon context is preserved in interactive elements

### Best Practices for Accessibility

```jsx
// Decorative icon (hidden from screen readers)
<Icon name="Heart" />

// Meaningful icon (announced by screen readers)
<Icon name="CheckCircle" alt="Task completed" />

// Interactive icon with proper labeling
<button aria-label="Add to favorites">
  <Icon name="Heart" />
</button>
```

## Best Practices

### Do's ✅

- Use consistent icon sizes within the same context
- Provide alt text for meaningful icons
- Use appropriate weights for visual hierarchy
- Choose icons that clearly represent their function
- Use color purposefully to convey meaning

```jsx
// Good: Consistent sizing and meaningful alt text
<div className="toolbar">
  <Icon name="FloppyDisk" size="sm" alt="Save" />
  <Icon name="Printer" size="sm" alt="Print" />
  <Icon name="Share" size="sm" alt="Share" />
</div>

// Good: Appropriate weight for emphasis
<Icon name="Warning" weight="fill" color="#f59e0b" alt="Warning" />
```

### Don'ts ❌

- Don't use too many different sizes in one interface
- Don't rely solely on color to convey meaning
- Don't use icons without clear meaning
- Don't forget alt text for functional icons

```jsx
// Bad: Inconsistent sizes
<div>
  <Icon name="Save" size="xs" />
  <Icon name="Print" size="lg" />
  <Icon name="Share" size="md" />
</div>

// Bad: No alt text for functional icon
<button>
  <Icon name="Trash" /> {/* Missing alt text */}
</button>
```

## Common Patterns

### Icon with Text

```jsx
function IconWithText() {
  return (
    <div className="u-flex u-items-center u-gap-2">
      <Icon name="CheckCircle" color="#22c55e" />
      <span>Task completed successfully</span>
    </div>
  );
}
```

### Loading Spinner

```jsx
function LoadingSpinner() {
  return (
    <Icon
      name="CircleNotch"
      className="c-icon--spin"
      alt="Loading..."
    />
  );
}
```

### Status Indicators

```jsx
function StatusIndicators() {
  return (
    <div className="u-flex u-gap-4">
      <div className="u-flex u-items-center u-gap-1">
        <Icon name="CheckCircle" color="#22c55e" size="sm" />
        <span>Online</span>
      </div>

      <div className="u-flex u-items-center u-gap-1">
        <Icon name="Warning" color="#f59e0b" size="sm" />
        <span>Warning</span>
      </div>

      <div className="u-flex u-items-center u-gap-1">
        <Icon name="XCircle" color="#ef4444" size="sm" />
        <span>Error</span>
      </div>
    </div>
  );
}
```

### Icon Buttons

```jsx
function IconButtons() {
  return (
    <div className="u-flex u-gap-2">
      <button
        className="u-btn-reset u-p-2 u-rounded hover:u-bg-gray-100"
        aria-label="Edit"
      >
        <Icon name="PencilSimple" />
      </button>

      <button
        className="u-btn-reset u-p-2 u-rounded hover:u-bg-gray-100"
        aria-label="Delete"
      >
        <Icon name="Trash" />
      </button>

      <button
        className="u-btn-reset u-p-2 u-rounded hover:u-bg-gray-100"
        aria-label="Share"
      >
        <Icon name="Share" />
      </button>
    </div>
  );
}
```

## Available Icons

The Icon component uses the Phosphor Icons library, which provides over 1,200 icons. Some commonly used icons include:

### Interface Icons
- `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`
- `X`, `Plus`, `Minus`, `Check`
- `CaretDown`, `CaretUp`, `CaretLeft`, `CaretRight`
- `DotsThree`, `DotsThreeVertical`

### Action Icons
- `PencilSimple`, `Trash`, `Copy`, `Share`
- `FloppyDisk`, `Download`, `Upload`
- `MagnifyingGlass`, `Funnel`, `SortAscending`

### Status Icons
- `CheckCircle`, `XCircle`, `Warning`, `Info`
- `Bell`, `BellRinging`, `Eye`, `EyeSlash`
- `Lock`, `LockOpen`, `Shield`, `ShieldCheck`

### Content Icons
- `Image`, `File`, `Folder`, `Link`
- `Calendar`, `Clock`, `MapPin`, `Tag`
- `User`, `Users`, `Heart`, `Star`

For a complete list of available icons, visit [Phosphor Icons](https://phosphoricons.com/).

## Related Components

- **Button** - Often uses icons for visual enhancement
- **Badge** - Can include icons for status indication
- **Navigation** - Uses icons for menu items and navigation
- **Form** - Icons used in inputs and validation messages

## Browser Support

The Icon component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Considerations

- Icons are rendered as SVG elements for crisp display at any size
- The Phosphor Icons library is tree-shakeable when using named imports
- Consider using icon sprites for large applications with many icons
- Icons inherit color from parent elements when possible to reduce CSS

```jsx
// Tree-shakeable import (recommended)
import { Heart, Star, CheckCircle } from 'phosphor-react';

// Use with Icon component
<Icon name="Heart" />
```
