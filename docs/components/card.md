# Card Component

The Card component is a flexible container for displaying content in a structured, visually appealing way. It supports various layouts, interactive states, and can contain any type of content including images, text, actions, and other components.

## Overview

Cards are one of the most versatile components in the design system. They can be used for product listings, user profiles, articles, dashboards, and many other content types. The Atomix Card component provides a consistent structure while remaining highly customizable.

## Props API

### CardProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `ReactNode` | `undefined` | Content for the card header |
| `image` | `string` | `undefined` | Image URL for the card |
| `imageAlt` | `string` | `''` | Alt text for the image |
| `title` | `ReactNode` | `undefined` | Card title |
| `text` | `ReactNode` | `undefined` | Card body text |
| `actions` | `ReactNode` | `undefined` | Action buttons or links |
| `icon` | `ReactNode` | `undefined` | Icon for the header |
| `footer` | `ReactNode` | `undefined` | Footer content |
| `row` | `boolean` | `false` | Horizontal layout |
| `flat` | `boolean` | `false` | Remove padding from image container |
| `active` | `boolean` | `false` | Active/selected state |
| `children` | `ReactNode` | `undefined` | Custom body content |
| `onClick` | `(event: React.MouseEvent) => void` | `undefined` | Click handler for interactive cards |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable card interaction |

## Usage Examples

### Basic React Usage

```jsx
import React from 'react';
import { Card, Button } from '@shohojdhara/atomix';

function BasicCard() {
  return (
    <Card
      title="Product Name"
      text="This is a description of the product with key features and benefits."
      actions={
        <div>
          <Button label="Buy Now" variant="primary" />
          <Button label="Learn More" variant="link" />
        </div>
      }
    />
  );
}
```

### Card with Image

```jsx
function ImageCard() {
  return (
    <Card
      image="/product-image.jpg"
      imageAlt="Product showcase"
      title="Featured Product"
      text="Discover our latest innovation with cutting-edge technology."
      actions={<Button label="View Details" variant="primary" />}
    />
  );
}
```

### Horizontal Card Layout

```jsx
function HorizontalCard() {
  return (
    <Card
      row
      image="/article-thumbnail.jpg"
      imageAlt="Article thumbnail"
      title="How to Build Better UIs"
      text="Learn the fundamentals of creating user-friendly interfaces."
      footer={<span className="u-text-secondary">Published 2 days ago</span>}
    />
  );
}
```

### Interactive Card

```jsx
function InteractiveCard() {
  const handleCardClick = () => {
    console.log('Card clicked!');
  };

  return (
    <Card
      title="Clickable Card"
      text="This entire card is clickable and will trigger an action."
      onClick={handleCardClick}
      className="u-cursor-pointer"
    />
  );
}
```

### Card with Custom Header

```jsx
import { Avatar, Badge } from '@shohojdhara/atomix';

function UserCard() {
  return (
    <Card
      header={
        <div className="u-d-flex u-align-items-center u-justify-content-between">
          <div className="u-d-flex u-align-items-center u-gap-3">
            <Avatar src="/user-avatar.jpg" size="sm" />
            <div>
              <h4>John Doe</h4>
              <p className="u-fs-sm u-text-secondary">Software Engineer</p>
            </div>
          </div>
          <Badge label="Online" variant="success" />
        </div>
      }
      text="Passionate about creating amazing user experiences and building scalable applications."
      actions={
        <div>
          <Button label="Connect" variant="primary" size="sm" />
          <Button label="Message" variant="outline-primary" size="sm" />
        </div>
      }
    />
  );
}
```

### Card with Custom Content

```jsx
function CustomCard() {
  return (
    <Card>
      <div className="u-gap-4">
        <div className="u-d-flex u-align-items-center u-justify-content-between">
          <h3>Dashboard Stats</h3>
          <Badge label="Live" variant="success" />
        </div>
        
        <div className="u-d-grid u-grid-cols-2 u-gap-4">
          <div className="u-text-center">
            <div className="u-fs-2 u-fw-bold">1,234</div>
            <div className="u-fs-sm u-text-secondary">Users</div>
          </div>
          <div className="u-text-center">
            <div className="u-fs-2 u-fw-bold">5,678</div>
            <div className="u-fs-sm u-text-secondary">Orders</div>
          </div>
        </div>
        
        <Button label="View Details" variant="link" className="u-w-100" />
      </div>
    </Card>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Basic card
const card = new Atomix.Card('.my-card', {
  title: 'Card Title',
  text: 'Card content goes here',
  image: '/image.jpg'
});

// Interactive card with click handler
const interactiveCard = new Atomix.Card('.interactive-card', {
  title: 'Clickable Card',
  text: 'Click anywhere on this card',
  onClick: () => {
    console.log('Card clicked!');
  }
});

// Initialize from data attributes
Atomix.Card.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic card -->
<div class="c-card" data-atomix="card">
  <div class="c-card__header">
    <img src="/image.jpg" alt="Card image" class="c-card__image">
  </div>
  <div class="c-card__body">
    <h3 class="c-card__title">Card Title</h3>
    <p class="c-card__text">Card content goes here</p>
  </div>
  <div class="c-card__actions">
    <button class="c-button c-button--primary">Action</button>
  </div>
</div>

<!-- Horizontal card -->
<div class="c-card c-card--row" data-atomix="card">
  <div class="c-card__header">
    <img src="/thumbnail.jpg" alt="Thumbnail" class="c-card__image">
  </div>
  <div class="c-card__body">
    <h3 class="c-card__title">Horizontal Card</h3>
    <p class="c-card__text">This card uses a horizontal layout</p>
  </div>
</div>
```

## Advanced Features

### Elevation Card

The `ElevationCard` component provides hover elevation effects:

```jsx
import { ElevationCard } from '@shohojdhara/atomix';

function ElevatedCard() {
  return (
    <ElevationCard
      title="Hover for Effect"
      text="This card will elevate when you hover over it"
      elevationClass="u-shadow-lg"
    />
  );
}
```

### Card with useCard Hook

For advanced interactions, use the `useCard` hook:

```jsx
import { useCard } from '@shohojdhara/atomix';

function AdvancedCard() {
  const {
    cardRef,
    isElevated,
    isFlipped,
    handleClick,
    handleKeyDown,
    getCardProps
  } = useCard({
    elevationEffect: true,
    flipEffect: true,
    clickable: true,
    onClick: () => console.log('Card clicked!')
  });

  return (
    <div {...getCardProps()}>
      <div className="c-card__body">
        <h3>Interactive Card</h3>
        <p>This card has elevation and flip effects</p>
      </div>
    </div>
  );
}
```

## Styling

### CSS Classes

```css
/* Base card */
.c-card {
  /* Base card styles */
}

/* Layout modifiers */
.c-card--row { /* Horizontal layout */ }
.c-card--flat { /* No image padding */ }

/* State modifiers */
.c-card--active { /* Active/selected state */ }
.c-card--clickable { /* Clickable cursor */ }
.c-card--flipped { /* Flipped state */ }
.c-card--focused { /* Focused state */ }
.is-disabled { /* Disabled state */ }

/* Elements */
.c-card__header { /* Header container */ }
.c-card__image { /* Image element */ }
.c-card__icon { /* Icon container */ }
.c-card__body { /* Body container */ }
.c-card__title { /* Title element */ }
.c-card__text { /* Text content */ }
.c-card__actions { /* Actions container */ }
.c-card__footer { /* Footer container */ }
```

### Custom Styling

```css
/* Custom card variant */
.c-card--featured {
  border: 2px solid var(--color-primary);
  background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100));
}

/* Custom hover effects */
.c-card--hover-scale {
  transition: transform 0.2s ease;
}

.c-card--hover-scale:hover {
  transform: scale(1.02);
}

/* Custom card sizes */
.c-card--compact .c-card__body {
  padding: 0.75rem;
}

.c-card--spacious .c-card__body {
  padding: 2rem;
}
```

## Accessibility

### ARIA Attributes

- `role="button"` - Applied to clickable cards
- `tabindex="0"` - Makes cards keyboard focusable
- `aria-label` - Provides accessible labels for interactive cards
- `aria-disabled` - Indicates disabled state

### Keyboard Navigation

- **Enter/Space** - Activates clickable cards
- **Tab** - Moves focus between cards
- **Arrow keys** - Navigate between cards in groups

### Screen Reader Support

- Card titles are properly structured with heading elements
- Images include alt text
- Interactive cards announce their clickable nature
- Content hierarchy is preserved

## Best Practices

### Do's ✅

- Use consistent card layouts within the same context
- Provide meaningful alt text for images
- Keep card content scannable and concise
- Use appropriate heading levels for titles
- Group related actions together

```jsx
// Good: Consistent structure
<Card
  image="/product.jpg"
  imageAlt="Product name - front view"
  title="Product Name"
  text="Brief, scannable description"
  actions={<Button label="Add to Cart" variant="primary" />}
/>
```

### Don'ts ❌

- Don't overcrowd cards with too much content
- Don't use cards for single pieces of information
- Don't make entire cards clickable if they contain other interactive elements
- Don't forget alt text for images

```jsx
// Bad: Too much content
<Card
  title="Very Long Product Name That Takes Up Multiple Lines"
  text="This is an extremely long description that contains way too much information and makes the card difficult to scan and understand quickly..."
  actions={
    <div>
      <Button label="Buy" />
      <Button label="Compare" />
      <Button label="Wishlist" />
      <Button label="Share" />
      <Button label="Review" />
    </div>
  }
/>
```

## Common Patterns

### Product Cards

```jsx
function ProductCard({ product }) {
  return (
    <Card
      image={product.image}
      imageAlt={`${product.name} - product image`}
      title={product.name}
      text={`$${product.price}`}
      actions={
        <div className="u-d-flex u-gap-2">
          <Button label="Add to Cart" variant="primary" size="sm" />
          <Button label="♡" variant="outline-primary" size="sm" iconOnly />
        </div>
      }
    />
  );
}
```

### Article Cards

```jsx
function ArticleCard({ article }) {
  return (
    <Card
      image={article.thumbnail}
      imageAlt={article.title}
      title={article.title}
      text={article.excerpt}
      footer={
        <div className="u-d-flex u-justify-content-between u-fs-sm u-text-secondary">
          <span>By {article.author}</span>
          <span>{article.publishDate}</span>
        </div>
      }
      onClick={() => navigateToArticle(article.id)}
    />
  );
}
```

### Dashboard Cards

```jsx
function MetricCard({ title, value, change, icon }) {
  return (
    <Card
      header={
        <div className="u-d-flex u-align-items-center u-justify-content-between">
          <span className="u-text-secondary">{title}</span>
          {icon}
        </div>
      }
    >
      <div className="u-gap-2">
        <div className="u-fs-1 u-fw-bold">{value}</div>
        <div className={`u-fs-sm ${change >= 0 ? 'u-text-success' : 'u-text-error'}`}>
          {change >= 0 ? '↗' : '↘'} {Math.abs(change)}%
        </div>
      </div>
    </Card>
  );
}
```

## Related Components

- **Button** - Commonly used in card actions
- **Avatar** - Often used in card headers
- **Badge** - Used for status indicators
- **Icon** - Used for visual enhancement
- **Image** - Card images and thumbnails

## Performance Considerations

- Use lazy loading for card images in long lists
- Implement virtualization for large card grids
- Optimize images for different screen sizes
- Consider skeleton loading states

```jsx
// Lazy loading example
function LazyCard({ product }) {
  return (
    <Card
      image={product.image}
      imageAlt={product.name}
      title={product.name}
      text={product.description}
      loading="lazy" // Enable lazy loading
    />
  );
}
```

## Browser Support

The Card component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
