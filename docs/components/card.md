# Card

The Card component is a flexible container that displays content in a contained, structured format. It's perfect for showcasing information, creating dashboards, product listings, and organizing content into digestible sections.

## Overview

The Card component provides a clean, consistent way to present related information. It supports headers, images, titles, content, actions, and footers, making it highly versatile for various use cases from simple content cards to complex interactive elements.

## Installation

The Card component is included in the Atomix package. Import it in your React components:

```jsx
import { Card } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the card styles are available through CSS classes.

## Basic Usage

### React

```jsx
import { Card, Button } from '@shohojdhara/atomix';

function ProductCard() {
  return (
    <Card
      image="https://example.com/product.jpg"
      imageAlt="Product image"
      title="Amazing Product"
      text="This is a description of the amazing product that you might want to purchase."
      actions={
        <>
          <Button variant="primary" label="Buy Now" />
          <Button variant="outline-secondary" label="Learn More" />
        </>
      }
    />
  );
}
```

### HTML/CSS

```html
<div class="c-card">
  <div class="c-card__header">
    <img src="https://example.com/product.jpg" alt="Product image" class="c-card__image" />
  </div>
  <div class="c-card__body">
    <h3 class="c-card__title">Amazing Product</h3>
    <p class="c-card__text">This is a description of the amazing product that you might want to purchase.</p>
  </div>
  <div class="c-card__actions">
    <button class="c-button c-button--primary">Buy Now</button>
    <button class="c-button c-button--outline-secondary">Learn More</button>
  </div>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `ReactNode` | - | Custom header content |
| `image` | `string` | - | URL of the card image |
| `imageAlt` | `string` | `''` | Alt text for the card image |
| `title` | `ReactNode` | - | Card title content |
| `text` | `ReactNode` | - | Card text/description content |
| `actions` | `ReactNode` | - | Action buttons or interactive elements |
| `icon` | `ReactNode` | - | Icon to display in the header |
| `footer` | `ReactNode` | - | Footer content |
| `row` | `boolean` | `false` | Horizontal layout (image on left, content on right) |
| `flat` | `boolean` | `false` | Remove padding from image container |
| `active` | `boolean` | `false` | Apply active/selected styling |
| `children` | `ReactNode` | - | Custom content for the card body |
| `onClick` | `(event: MouseEvent) => void` | - | Click event handler |
| `className` | `string` | `''` | Additional CSS classes |

## Examples

### Basic Content Card

```jsx
<Card
  title="Getting Started"
  text="Learn how to use our platform with this comprehensive guide."
  actions={<Button variant="primary" label="Read Guide" />}
/>
```

### Image Card

```jsx
<Card
  image="https://example.com/landscape.jpg"
  imageAlt="Beautiful landscape"
  title="Nature Photography"
  text="Explore the beauty of nature through stunning photography."
/>
```

### Icon Card

```jsx
import { Icon } from '@shohojdhara/atomix';

<Card
  icon={<Icon name="Zap" size="lg" />}
  title="Fast Performance"
  text="Lightning-fast load times and optimal performance."
  actions={<Button variant="outline-primary" label="Learn More" />}
/>
```

### Row Layout Card

```jsx
<Card
  row
  image="https://example.com/product-thumb.jpg"
  imageAlt="Product thumbnail"
  title="Product Name"
  text="Short product description that fits nicely in a horizontal layout."
  actions={<Button variant="primary" label="View Details" />}
/>
```

### Custom Header Card

```jsx
<Card
  header={
    <div className="custom-header">
      <Avatar src="user.jpg" size="sm" circle />
      <div>
        <h4>John Doe</h4>
        <span className="text-muted">2 hours ago</span>
      </div>
    </div>
  }
  text="Just shared a new update about the project progress."
  actions={
    <>
      <Button variant="outline-primary" label="Like" size="sm" />
      <Button variant="outline-secondary" label="Comment" size="sm" />
    </>
  }
/>
```

### Interactive Cards

```jsx
function InteractiveCard() {
  const [isActive, setIsActive] = useState(false);

  return (
    <Card
      title="Selectable Card"
      text="Click this card to select it."
      active={isActive}
      onClick={() => setIsActive(!isActive)}
      className="cursor-pointer"
    />
  );
}
```

### Complex Card with Footer

```jsx
<Card
  image="https://example.com/event-banner.jpg"
  imageAlt="Event banner"
  title="Tech Conference 2024"
  text="Join us for the biggest tech conference of the year featuring industry leaders and innovative startups."
  actions={
    <>
      <Button variant="primary" label="Register Now" />
      <Button variant="outline-secondary" label="Add to Calendar" />
    </>
  }
  footer={
    <div className="event-details">
      <span>📅 March 15-17, 2024</span>
      <span>📍 San Francisco, CA</span>
      <span>👥 500+ Attendees</span>
    </div>
  }
/>
```

### Card with Custom Children

```jsx
<Card>
  <div className="custom-card-content">
    <div className="stats-grid">
      <div className="stat">
        <h3>1,234</h3>
        <p>Total Users</p>
      </div>
      <div className="stat">
        <h3>56</h3>
        <p>Active Projects</p>
      </div>
      <div className="stat">
        <h3>98%</h3>
        <p>Uptime</p>
      </div>
    </div>
  </div>
</Card>
```

## Accessibility

The Card component follows accessibility best practices:

### Keyboard Support

When interactive (with `onClick` prop):
- **Enter/Space**: Activates the card
- **Tab**: Moves focus to the card and interactive elements within
- **Shift + Tab**: Moves focus away from the card

### ARIA Support

- `role="button"` is applied when `onClick` is provided
- `tabIndex` is set appropriately for interactive cards
- Image alt text is properly handled

### Best Practices

1. **Provide meaningful alt text** for images:
   ```jsx
   <Card
     image="product.jpg"
     imageAlt="Red wireless headphones on white background"
   />
   ```

2. **Use semantic heading levels** for titles:
   ```jsx
   <Card title={<h2>Card Title</h2>} />
   ```

3. **Ensure sufficient color contrast** in card content

4. **Make interactive cards keyboard accessible**:
   ```jsx
   <Card
     onClick={handleCardClick}
     onKeyDown={(e) => {
       if (e.key === 'Enter' || e.key === ' ') {
         handleCardClick();
       }
     }}
   />
   ```

## Styling

### CSS Custom Properties

The Card component uses CSS custom properties for theming:

```css
:root {
  /* Card structure */
  --atomix-card-padding: 1.5rem;
  --atomix-card-border-radius: var(--atomix-border-radius);
  --atomix-card-border: 1px solid var(--atomix-border-color);
  --atomix-card-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Card colors */
  --atomix-card-bg: var(--atomix-white);
  --atomix-card-color: var(--atomix-body-color);

  /* Card header */
  --atomix-card-header-padding: 0 0 1rem 0;
  --atomix-card-header-border-bottom: 1px solid var(--atomix-border-color);

  /* Card image */
  --atomix-card-image-border-radius: var(--atomix-border-radius) var(--atomix-border-radius) 0 0;

  /* Card title */
  --atomix-card-title-font-size: 1.25rem;
  --atomix-card-title-font-weight: 600;
  --atomix-card-title-margin: 0 0 0.5rem 0;

  /* Card text */
  --atomix-card-text-color: var(--atomix-text-muted);
  --atomix-card-text-margin: 0 0 1rem 0;

  /* Card actions */
  --atomix-card-actions-padding: 1rem 0 0 0;
  --atomix-card-actions-border-top: 1px solid var(--atomix-border-color);
  --atomix-card-actions-gap: 0.5rem;

  /* Card footer */
  --atomix-card-footer-padding: 1rem 0 0 0;
  --atomix-card-footer-border-top: 1px solid var(--atomix-border-color);
  --atomix-card-footer-font-size: 0.875rem;
  --atomix-card-footer-color: var(--atomix-text-muted);
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base card class */
.c-card {
  display: flex;
  flex-direction: column;
  background: var(--atomix-card-bg);
  border: var(--atomix-card-border);
  border-radius: var(--atomix-card-border-radius);
  box-shadow: var(--atomix-card-box-shadow);
  overflow: hidden;
}

/* Card sections */
.c-card__header {
  padding: var(--atomix-card-header-padding);
}

.c-card__body {
  padding: var(--atomix-card-padding);
  flex-grow: 1;
}

.c-card__actions {
  padding: var(--atomix-card-actions-padding);
  border-top: var(--atomix-card-actions-border-top);
  display: flex;
  gap: var(--atomix-card-actions-gap);
  flex-wrap: wrap;
}

.c-card__footer {
  padding: var(--atomix-card-footer-padding);
  border-top: var(--atomix-card-footer-border-top);
  font-size: var(--atomix-card-footer-font-size);
  color: var(--atomix-card-footer-color);
}

/* Card elements */
.c-card__image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--atomix-card-image-border-radius);
}

.c-card__title {
  font-size: var(--atomix-card-title-font-size);
  font-weight: var(--atomix-card-title-font-weight);
  margin: var(--atomix-card-title-margin);
}

.c-card__text {
  color: var(--atomix-card-text-color);
  margin: var(--atomix-card-text-margin);
}

.c-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

/* Card modifiers */
.c-card--row {
  flex-direction: row;
  align-items: stretch;
}

.c-card--row .c-card__header {
  flex-shrink: 0;
  width: 200px;
}

.c-card--row .c-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--atomix-border-radius) 0 0 var(--atomix-border-radius);
}

.c-card--flat .c-card__header {
  padding: 0;
}

.c-card--active {
  border-color: var(--atomix-primary);
  box-shadow: 0 0 0 2px var(--atomix-primary-light);
}

/* Interactive cards */
.c-card[role="button"] {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.c-card[role="button"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.c-card[role="button"]:focus {
  outline: 2px solid var(--atomix-focus-color);
  outline-offset: 2px;
}
```

### Customization Examples

```css
/* Custom card variant */
.c-card--featured {
  border: 2px solid var(--atomix-primary);
  background: linear-gradient(135deg, var(--atomix-primary-light) 0%, var(--atomix-white) 100%);
}

/* Custom card hover effects */
.c-card--hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Compact card variant */
.c-card--compact {
  --atomix-card-padding: 1rem;
  --atomix-card-title-font-size: 1.125rem;
}

.c-card--compact .c-card__actions {
  --atomix-card-actions-padding: 0.75rem 0 0 0;
}

/* Dark card variant */
.c-card--dark {
  background: var(--atomix-dark);
  border-color: var(--atomix-gray-700);
  color: var(--atomix-white);
}

.c-card--dark .c-card__text {
  color: var(--atomix-gray-300);
}
```

## Common Patterns

### Product Card

```jsx
function ProductCard({ product }) {
  return (
    <Card
      image={product.image}
      imageAlt={product.name}
      title={product.name}
      text={product.description}
      actions={
        <>
          <Button variant="primary" label={`$${product.price}`} />
          <Button variant="outline-secondary" label="Add to Cart" />
        </>
      }
      footer={
        <div className="product-meta">
          <Rating value={product.rating} readonly />
          <span className="review-count">({product.reviewCount} reviews)</span>
        </div>
      }
    />
  );
}
```

### Blog Post Card

```jsx
function BlogPostCard({ post }) {
  return (
    <Card
      image={post.featuredImage}
      imageAlt={post.title}
      header={
        <div className="post-meta">
          <Avatar src={post.author.avatar} size="xs" circle />
          <span>{post.author.name}</span>
          <time>{post.publishedAt}</time>
        </div>
      }
      title={<Link to={`/posts/${post.slug}`}>{post.title}</Link>}
      text={post.excerpt}
      actions={
        <div className="post-actions">
          <Button variant="link" label="Read More" />
          <div className="post-stats">
            <span>❤️ {post.likes}</span>
            <span>💬 {post.comments}</span>
          </div>
        </div>
      }
    />
  );
}
```

### Dashboard Widget Card

```jsx
function StatsCard({ title, value, change, trend }) {
  return (
    <Card
      icon={
        <div className={`stat-icon stat-icon--${trend}`}>
          <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} />
        </div>
      }
      title={title}
      text={
        <div className="stat-content">
          <div className="stat-value">{value}</div>
          <div className={`stat-change stat-change--${trend}`}>
            {change > 0 ? '+' : ''}{change}%
          </div>
        </div>
      }
    />
  );
}
```

### User Profile Card

```jsx
function UserProfileCard({ user }) {
  return (
    <Card
      header={
        <div className="profile-header">
          <div className="cover-image" style={{ backgroundImage: `url(${user.coverImage})` }} />
          <Avatar
            src={user.avatar}
            size="lg"
            circle
            className="profile-avatar"
          />
        </div>
      }
      title={user.name}
      text={user.bio}
      actions={
        <>
          <Button variant="primary" label="Follow" />
          <Button variant="outline-secondary" label="Message" />
        </>
      }
      footer={
        <div className="profile-stats">
          <div className="stat">
            <strong>{user.followers}</strong>
            <span>Followers</span>
          </div>
          <div className="stat">
            <strong>{user.following}</strong>
            <span>Following</span>
          </div>
          <div className="stat">
            <strong>{user.posts}</strong>
            <span>Posts</span>
          </div>
        </div>
      }
    />
  );
}
```

### Pricing Card

```jsx
function PricingCard({ plan, isPopular = false }) {
  return (
    <Card
      className={isPopular ? 'c-card--featured' : ''}
      header={isPopular && <div className="popular-badge">Most Popular</div>}
      icon={<Icon name={plan.icon} size="lg" />}
      title={plan.name}
      text={
        <div className="pricing">
          <div className="price">
            <span className="currency">$</span>
            <span className="amount">{plan.price}</span>
            <span className="period">/{plan.period}</span>
          </div>
        </div>
      }
      actions={
        <Button
          variant={isPopular ? 'primary' : 'outline-primary'}
          label="Choose Plan"
        />
      }
      footer={
        <ul className="feature-list">
          {plan.features.map((feature, index) => (
            <li key={index}>✓ {feature}</li>
          ))}
        </ul>
      }
    />
  );
}
```

## Performance Considerations

1. **Image optimization**: Use appropriately sized images and modern formats
2. **Lazy loading**: Implement lazy loading for card images in long lists
3. **Virtual scrolling**: Consider virtual scrolling for large card lists
4. **Memoization**: Use React.memo for cards with expensive computations

```jsx
// Optimized card component
const ProductCard = memo(({ product }) => {
  return (
    <Card
      image={product.image}
      imageAlt={product.name}
      title={product.name}
      text={product.description}
      loading="lazy" // Enable lazy loading
    />
  );
});

// Optimized card list
function CardList({ items }) {
  return (
    <div className="card-grid">
      {items.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
```

## Grid Layouts

Cards work well in grid layouts:

```css
/* Responsive card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

/* Masonry-style layout */
.card-masonry {
  columns: 3;
  column-gap: 1.5rem;
  padding: 1.5rem;
}

.card-masonry .c-card {
  display: inline-block;
  width: 100%;
  margin-bottom: 1.5rem;
  break-inside: avoid;
}

/* Mobile-first responsive grid */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }

  .card-masonry {
    columns: 1;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .card-masonry {
    columns: 2;
  }
}
```

## Browser Support

The Card component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Button](./button.mdx)** - For card actions
- **[Avatar](./avatar.mdx)** - For user representation in cards
- **[Badge](./badge.mdx)** - For status indicators
- **[Icon](./icon.mdx)** - For visual enhancement
- **[Image](./image.mdx)** - For card images
- **[Modal](./modal.mdx)** - Often triggered from cards

## Migration Guide

### From v1.x to v2.x

```jsx
// v1.x (deprecated)
<Card
  header="Card Title"
  content="Card content goes here"
  action={<Button>Action</Button>}
/>

// v2.x (current)
<Card
  title="Card Title"
  text="Card content goes here"
  actions={<Button label="Action" />}
/>
```

### From Custom Implementation

```jsx
// Before (custom implementation)
<div className="custom-card">
  <div className="card-header">
    <img src="image.jpg" />
  </div>
  <div className="card-body">
    <h3>Title</h3>
    <p>Description</p>
  </div>
  <div className="card-footer">
    <button>Action</button>
  </div>
</div>

// After (Atomix Card)
<Card
  image="image.jpg"
  title="Title"
  text="Description"
  actions={<Button label="Action" />}
/>
```
