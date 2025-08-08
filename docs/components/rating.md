# Rating

The Rating component provides an interactive star rating system for collecting user feedback and displaying ratings. It supports customizable star counts, half-star precision, read-only mode, and various sizes and colors.

## Overview

The Rating component is perfect for product reviews, feedback forms, and displaying user ratings. It offers both interactive and display modes, with support for keyboard navigation, accessibility features, and smooth hover effects.

## Props API

### RatingProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `undefined` | Current rating value (controlled mode) |
| `defaultValue` | `number` | `0` | Default rating value (uncontrolled mode) |
| `maxValue` | `number` | `5` | Maximum number of stars |
| `allowHalf` | `boolean` | `false` | Whether to allow half-star ratings |
| `readOnly` | `boolean` | `false` | Whether the rating is read-only |
| `size` | `Size` | `'md'` | Size of the rating stars |
| `color` | `ThemeColor` | `undefined` | Color theme for the stars |
| `onChange` | `(value: number) => void` | `undefined` | Callback when rating changes |
| `label` | `string` | `undefined` | Accessible label for the rating |
| `id` | `string` | `undefined` | HTML id attribute |
| `useVanillaJS` | `boolean` | `false` | Use vanilla JS implementation |
| `className` | `string` | `''` | Additional CSS classes |

### Size Options

- `'sm'` - Small stars (16px)
- `'md'` - Medium stars (20px) - Default
- `'lg'` - Large stars (24px)

### Color Options

- `'primary'` - Primary theme color
- `'secondary'` - Secondary theme color
- `'warning'` - Warning/amber color (common for ratings)
- `'success'` - Success/green color
- `'error'` - Error/red color
- `'info'` - Info/blue color

## Usage Examples

### Basic React Usage

```jsx
import React, { useState } from 'react';
import { Rating } from '@shohojdhara/atomix';

function ProductReview() {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log('New rating:', newRating);
  };

  return (
    <div>
      <h3>Rate this product:</h3>
      <Rating
        value={rating}
        onChange={handleRatingChange}
        maxValue={5}
        size="lg"
      />
      <p>Your rating: {rating} stars</p>
    </div>
  );
}
```

### Read-only Rating Display

```jsx
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <div className="product-rating">
        <Rating
          value={product.averageRating}
          readOnly
          allowHalf
          color="warning"
          size="sm"
        />
        <span className="rating-count">
          ({product.reviewCount} reviews)
        </span>
      </div>
      <p className="product-price">${product.price}</p>
    </div>
  );
}
```

### Half-star Ratings

```jsx
function PreciseRating() {
  const [rating, setRating] = useState(3.5);

  return (
    <div>
      <h3>How would you rate our service?</h3>
      <Rating
        value={rating}
        onChange={setRating}
        allowHalf
        maxValue={5}
        size="lg"
        color="warning"
        label="Service rating"
      />
      <p>Rating: {rating} out of 5 stars</p>
    </div>
  );
}
```

### Uncontrolled Rating

```jsx
function FeedbackForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rating = formData.get('rating');
    console.log('Submitted rating:', rating);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Overall satisfaction:</label>
        <Rating
          name="rating"
          defaultValue={0}
          maxValue={5}
          size="md"
          color="primary"
        />
      </div>
      <button type="submit">Submit Feedback</button>
    </form>
  );
}
```

### Custom Maximum Value

```jsx
function TenStarRating() {
  const [rating, setRating] = useState(7);

  return (
    <div>
      <h3>Rate on a scale of 1-10:</h3>
      <Rating
        value={rating}
        onChange={setRating}
        maxValue={10}
        allowHalf
        size="md"
        color="info"
      />
      <p>Score: {rating}/10</p>
    </div>
  );
}
```

### Multiple Criteria Rating

```jsx
function ReviewForm() {
  const [ratings, setRatings] = useState({
    quality: 0,
    service: 0,
    value: 0,
    overall: 0
  });

  const updateRating = (criteria) => (value) => {
    setRatings(prev => ({
      ...prev,
      [criteria]: value
    }));
  };

  return (
    <div className="review-form">
      <h3>Rate Your Experience</h3>
      
      <div className="rating-group">
        <label>Product Quality:</label>
        <Rating
          value={ratings.quality}
          onChange={updateRating('quality')}
          color="warning"
          size="md"
        />
      </div>

      <div className="rating-group">
        <label>Customer Service:</label>
        <Rating
          value={ratings.service}
          onChange={updateRating('service')}
          color="warning"
          size="md"
        />
      </div>

      <div className="rating-group">
        <label>Value for Money:</label>
        <Rating
          value={ratings.value}
          onChange={updateRating('value')}
          color="warning"
          size="md"
        />
      </div>

      <div className="rating-group">
        <label>Overall Experience:</label>
        <Rating
          value={ratings.overall}
          onChange={updateRating('overall')}
          color="primary"
          size="lg"
        />
      </div>
    </div>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Initialize rating component
const ratingContainer = document.getElementById('product-rating');

const rating = new Atomix.Rating(ratingContainer, {
  value: 3.5,
  maxValue: 5,
  allowHalf: true,
  readOnly: false,
  size: 'lg',
  color: 'warning',
  onChange: (value) => {
    console.log('Rating changed to:', value);
    document.getElementById('rating-value').textContent = value;
  }
});

// Update rating programmatically
rating.setValue(4);

// Get current rating
const currentRating = rating.getValue();
```

### HTML with Data Attributes

```html
<!-- Interactive rating -->
<div 
  class="c-rating c-rating--lg" 
  data-atomix="rating"
  data-value="0"
  data-max-value="5"
  data-allow-half="false"
  data-color="warning"
  id="user-rating">
  
  <!-- Stars will be generated dynamically -->
  <div class="c-rating__star" data-value="1" role="button" tabindex="0">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path class="c-rating__star-outline" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      <path class="c-rating__star-full" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  </div>
  <!-- Additional stars... -->
</div>

<!-- Read-only rating display -->
<div 
  class="c-rating c-rating--sm" 
  data-atomix="rating"
  data-value="4.5"
  data-readonly="true"
  data-allow-half="true"
  data-color="warning">
  <!-- Stars with filled state -->
</div>
```

## Styling

### CSS Classes

The Rating component uses the following CSS class structure:

```css
/* Base rating container */
.c-rating {
  /* Rating container styles */
}

/* Size modifiers */
.c-rating--sm { /* Small rating */ }
.c-rating--md { /* Medium rating (default) */ }
.c-rating--lg { /* Large rating */ }

/* Color modifiers */
.c-rating--primary { /* Primary color theme */ }
.c-rating--warning { /* Warning/amber color */ }
.c-rating--success { /* Success/green color */ }

/* Individual star */
.c-rating__star {
  /* Star container styles */
}

.c-rating__star--focused {
  /* Focused star state */
}

/* Star states */
.c-rating__star-outline { /* Empty star outline */ }
.c-rating__star-full { /* Filled star */ }
.c-rating__star-half { /* Half-filled star */ }

/* State classes */
.c-rating__star--full { /* Full star modifier */ }
.c-rating__star--half { /* Half star modifier */ }

/* Read-only state */
.c-rating[data-readonly="true"] {
  /* Read-only rating styles */
}
```

### Custom Styling

```css
/* Custom rating colors */
.c-rating--custom {
  --rating-star-color: #ff6b6b;
  --rating-star-hover-color: #ff5252;
}

.c-rating--custom .c-rating__star-full {
  fill: var(--rating-star-color);
}

/* Animated hover effects */
.c-rating__star {
  transition: transform 0.2s ease, filter 0.2s ease;
}

.c-rating__star:hover {
  transform: scale(1.1);
  filter: brightness(1.1);
}

/* Custom star shapes (heart icons) */
.c-rating--hearts .c-rating__star svg {
  /* Custom heart-shaped rating */
}

/* Larger touch targets for mobile */
@media (max-width: 768px) {
  .c-rating__star {
    min-width: 44px;
    min-height: 44px;
  }
}

/* Focus indicators */
.c-rating__star:focus {
  outline: 2px solid var(--atomix-focus-color);
  outline-offset: 2px;
  border-radius: 4px;
}
```

## Accessibility

The Rating component includes comprehensive accessibility features:

### ARIA Attributes

- `role="radiogroup"` - For interactive ratings
- `role="img"` - For read-only ratings
- `aria-label` - Describes the rating component
- `aria-checked` - Indicates selected stars
- `aria-setsize` - Total number of stars
- `aria-posinset` - Position of current star

### Keyboard Navigation

- **Tab** - Navigate to the rating component
- **Arrow Keys** - Navigate between stars
- **Enter/Space** - Select a rating
- **Home** - Jump to first star
- **End** - Jump to last star

### Screen Reader Support

- Each star is properly labeled with its value
- Current rating is announced
- Changes are announced to screen readers
- Read-only ratings are identified as images

## Best Practices

### Do's ✅

- Use consistent star counts across your application
- Provide clear labels for rating criteria
- Use appropriate colors (warning/amber is common for ratings)
- Include the number of reviews alongside average ratings
- Make interactive ratings large enough for easy clicking

```jsx
// Good: Clear labeling and appropriate sizing
<div className="product-rating">
  <label id="rating-label">Rate this product:</label>
  <Rating
    value={rating}
    onChange={handleRatingChange}
    size="lg"
    color="warning"
    aria-labelledby="rating-label"
  />
  <span className="rating-summary">
    Average: {product.averageRating} ({product.reviewCount} reviews)
  </span>
</div>
```

### Don'ts ❌

- Don't use tiny stars that are hard to click
- Don't forget to include read-only indicators
- Don't use conflicting colors for different rating contexts
- Don't omit accessibility labels

```jsx
// Bad: Too small and missing labels
<Rating
  value={rating}
  onChange={handleRatingChange}
  size="xs"
/>
```

## Common Patterns

### Product Review Summary

```jsx
function ProductReviewSummary({ reviews }) {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="review-summary">
      <div className="overall-rating">
        <Rating
          value={averageRating}
          readOnly
          allowHalf
          size="lg"
          color="warning"
        />
        <span className="rating-text">
          {averageRating.toFixed(1)} out of 5 stars
        </span>
      </div>
      
      <div className="rating-breakdown">
        {[5, 4, 3, 2, 1].map(stars => {
          const count = reviews.filter(r => Math.floor(r.rating) === stars).length;
          const percentage = (count / reviews.length) * 100;
          
          return (
            <div key={stars} className="rating-bar">
              <span className="star-label">{stars} stars</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="count">({count})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

### Rating Input with Confirmation

```jsx
function RatingWithConfirmation() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      // Submit rating to API
      console.log('Submitting rating:', rating);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="rating-success">
        <h3>Thank you for your feedback!</h3>
        <Rating value={rating} readOnly color="success" />
        <p>Your {rating}-star rating has been recorded.</p>
      </div>
    );
  }

  return (
    <div className="rating-input">
      <h3>How was your experience?</h3>
      <Rating
        value={rating}
        onChange={setRating}
        size="lg"
        color="warning"
      />
      <div className="rating-actions">
        <button 
          onClick={handleSubmit} 
          disabled={rating === 0}
          className="submit-button"
        >
          Submit Rating
        </button>
        {rating > 0 && (
          <button 
            onClick={() => setRating(0)}
            className="clear-button"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
```

### Comparative Ratings

```jsx
function ComparisonRatings({ products }) {
  return (
    <div className="product-comparison">
      <h3>Compare Products</h3>
      <div className="comparison-table">
        {products.map(product => (
          <div key={product.id} className="product-row">
            <div className="product-name">{product.name}</div>
            <div className="product-rating">
              <Rating
                value={product.rating}
                readOnly
                allowHalf
                size="sm"
                color="warning"
              />
              <span className="rating-value">
                {product.rating} ({product.reviews})
              </span>
            </div>
            <div className="product-price">${product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Related Components

- **Icon** - Stars are implemented using SVG icons
- **Button** - Rating stars behave like interactive buttons
- **Form** - Often used within forms for feedback
- **Card** - Commonly displayed within product cards

## Browser Support

The Rating component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Migration Guide

### From v1.x to v2.x

```jsx
// v1.x
<Rating 
  stars={5}
  rating={3}
  onRatingChange={handleChange}
  readonly={false}
  halfStars={true}
/>

// v2.x
<Rating 
  maxValue={5}
  value={3}
  onChange={handleChange}
  readOnly={false}
  allowHalf={true}
/>
```

The main changes:
- `stars` prop renamed to `maxValue`
- `rating` prop renamed to `value`
- `onRatingChange` prop renamed to `onChange`
- `readonly` prop renamed to `readOnly`
- `halfStars` prop renamed to `allowHalf`
- Added `size` and `color` props
- Improved accessibility features