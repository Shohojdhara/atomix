# ProductReview

The ProductReview component provides a comprehensive interface for collecting user ratings and feedback for products. It combines a rating system with a comment form to create a complete review experience for e-commerce and product-based applications.

## Overview

The ProductReview component integrates a star rating system with a text input for detailed feedback, creating a user-friendly interface for product reviews. It supports customizable rating scales, validation, and various submission workflows to fit different review collection needs.

## Installation

The ProductReview component is included in the Atomix package. Import it in your React components:

```jsx
import { ProductReview } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the product review styles and functionality are available through the CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { ProductReview } from '@shohojdhara/atomix';

function MyComponent() {
  const handleReviewSubmit = (rating, comment) => {
    console.log('Review submitted:', { rating, comment });
  };

  return (
    <ProductReview
      productName="Wireless Headphones"
      productImage="https://example.com/headphones.jpg"
      onSubmit={handleReviewSubmit}
    />
  );
}
```

### HTML/CSS

```html
<!-- Product review form -->
<div class="c-product-review">
  <div class="c-product-review__header">
    <img src="product.jpg" alt="Product" class="c-product-review__image" />
    <div class="c-product-review__product-info">
      <h3 class="c-product-review__product-name">Product Name</h3>
    </div>
  </div>
  
  <div class="c-product-review__rating-section">
    <label class="c-product-review__rating-label">Rate this product:</label>
    <div class="c-rating" data-rating="0" data-max="5">
      <span class="c-rating__star" data-value="1">★</span>
      <span class="c-rating__star" data-value="2">★</span>
      <span class="c-rating__star" data-value="3">★</span>
      <span class="c-rating__star" data-value="4">★</span>
      <span class="c-rating__star" data-value="5">★</span>
    </div>
  </div>
  
  <div class="c-product-review__comment-section">
    <label class="c-product-review__comment-label">Write your review:</label>
    <textarea 
      class="c-product-review__comment" 
      placeholder="Share your experience with this product..."
    ></textarea>
  </div>
  
  <div class="c-product-review__actions">
    <button class="c-btn c-btn--primary" type="submit">Submit Review</button>
  </div>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `productName` | `string` | - | **Required.** Name of the product being reviewed |
| `productImage` | `string` | - | URL of the product image |
| `initialRating` | `number` | `0` | Initial rating value (0-5) |
| `maxRating` | `number` | `5` | Maximum possible rating value |
| `allowHalf` | `boolean` | `false` | Whether to allow half-star ratings |
| `ratingColor` | `ThemeColor` | `'primary'` | Color theme for rating stars |
| `onSubmit` | `(rating: number, comment: string) => void` | - | Review submission callback |
| `className` | `string` | `''` | Additional CSS classes |

## Examples

### Basic Product Review

```jsx
function BasicProductReview() {
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (rating, comment) => {
    const newReview = {
      id: Date.now(),
      rating,
      comment,
      date: new Date().toISOString(),
      author: 'Current User'
    };
    setReviews(prev => [...prev, newReview]);
    alert('Review submitted successfully!');
  };

  return (
    <div className="review-container">
      <ProductReview
        productName="Bluetooth Speaker"
        productImage="https://example.com/speaker.jpg"
        onSubmit={handleSubmit}
      />
      
      <div className="existing-reviews">
        <h4>Customer Reviews ({reviews.length})</h4>
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-rating">
              <Rating value={review.rating} readonly />
            </div>
            <p className="review-comment">{review.comment}</p>
            <span className="review-date">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Customizable Rating Scale

```jsx
function CustomRatingReview() {
  return (
    <div className="custom-rating-examples">
      <ProductReview
        productName="Premium Coffee Beans"
        maxRating={10}
        ratingColor="warning"
        onSubmit={(rating, comment) => {
          console.log(`Rating: ${rating}/10`, comment);
        }}
      />
      
      <ProductReview
        productName="Artisan Chocolate"
        maxRating={5}
        allowHalf={true}
        ratingColor="success"
        onSubmit={(rating, comment) => {
          console.log(`Rating: ${rating}/5`, comment);
        }}
      />
    </div>
  );
}
```

### Review Form with Validation

```jsx
function ValidatedProductReview() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateReview = (rating, comment) => {
    const newErrors = {};
    
    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!comment.trim()) {
      newErrors.comment = 'Please write a review';
    } else if (comment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (rating, comment) => {
    if (!validateReview(rating, comment)) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Review submitted:', { rating, comment });
      setErrors({});
      alert('Thank you for your review!');
    } catch (error) {
      setErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="validated-review">
      <ProductReview
        productName="Smart Watch"
        productImage="https://example.com/watch.jpg"
        onSubmit={handleSubmit}
        className="validated-review-form"
      />
      
      {errors.rating && (
        <div className="error-message">{errors.rating}</div>
      )}
      {errors.comment && (
        <div className="error-message">{errors.comment}</div>
      )}
      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}
      
      {isSubmitting && (
        <div className="loading-overlay">
          <Spinner />
          <span>Submitting your review...</span>
        </div>
      )}
    </div>
  );
}
```

### Multi-Product Review

```jsx
function MultiProductReview() {
  const products = [
    {
      id: 1,
      name: 'Wireless Mouse',
      image: 'https://example.com/mouse.jpg'
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      image: 'https://example.com/keyboard.jpg'
    },
    {
      id: 3,
      name: 'Monitor Stand',
      image: 'https://example.com/stand.jpg'
    }
  ];

  const [reviews, setReviews] = useState({});

  const handleReviewSubmit = (productId) => (rating, comment) => {
    setReviews(prev => ({
      ...prev,
      [productId]: { rating, comment, submitted: true }
    }));
  };

  return (
    <div className="multi-product-review">
      <h2>Review Your Recent Purchases</h2>
      
      {products.map(product => (
        <div key={product.id} className="product-review-item">
          {reviews[product.id]?.submitted ? (
            <div className="review-completed">
              <h4>{product.name}</h4>
              <div className="completed-review">
                <Rating value={reviews[product.id].rating} readonly />
                <p>"{reviews[product.id].comment}"</p>
                <span className="review-status">✓ Review submitted</span>
              </div>
            </div>
          ) : (
            <ProductReview
              productName={product.name}
              productImage={product.image}
              onSubmit={handleReviewSubmit(product.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

### Review with Image Upload

```jsx
function ReviewWithImages() {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = (files) => {
    const imageUrls = Array.from(files).map(file => 
      URL.createObjectURL(file)
    );
    setUploadedImages(prev => [...prev, ...imageUrls]);
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (rating, comment) => {
    const reviewData = {
      rating,
      comment,
      images: uploadedImages
    };
    console.log('Review with images:', reviewData);
  };

  return (
    <div className="review-with-images">
      <ProductReview
        productName="Digital Camera"
        productImage="https://example.com/camera.jpg"
        onSubmit={handleSubmit}
      />
      
      <div className="image-upload-section">
        <label className="upload-label">
          Add photos to your review:
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            className="file-input"
          />
        </label>
        
        <div className="uploaded-images">
          {uploadedImages.map((url, index) => (
            <div key={index} className="uploaded-image">
              <img src={url} alt={`Upload ${index + 1}`} />
              <button 
                onClick={() => removeImage(index)}
                className="remove-image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Anonymous vs Authenticated Reviews

```jsx
function AuthenticatedReview({ user }) {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (rating, comment) => {
    const reviewData = {
      rating,
      comment,
      author: isAnonymous ? 'Anonymous' : user?.name,
      isVerifiedPurchase: user?.hasPurchased,
      date: new Date().toISOString()
    };
    console.log('Review data:', reviewData);
  };

  return (
    <div className="authenticated-review">
      <div className="review-header">
        <div className="user-info">
          {user ? (
            <div className="logged-in-user">
              <Avatar src={user.avatar} size="sm" />
              <span>Reviewing as {user.name}</span>
              {user.hasPurchased && (
                <Badge variant="success" size="sm">Verified Purchase</Badge>
              )}
            </div>
          ) : (
            <div className="anonymous-user">
              <Icon name="User" />
              <span>Reviewing as Guest</span>
            </div>
          )}
        </div>
        
        {user && (
          <label className="anonymous-option">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            Post anonymously
          </label>
        )}
      </div>
      
      <ProductReview
        productName="Premium Headphones"
        productImage="https://example.com/headphones.jpg"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

### Review Summary Display

```jsx
function ReviewSummary({ reviews }) {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingCounts = [1, 2, 3, 4, 5].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

  return (
    <div className="review-summary">
      <div className="summary-header">
        <div className="average-rating">
          <div className="rating-number">{averageRating.toFixed(1)}</div>
          <Rating value={averageRating} readonly />
          <div className="total-reviews">Based on {reviews.length} reviews</div>
        </div>
        
        <div className="rating-breakdown">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="rating-bar">
              <span className="rating-label">{rating} star</span>
              <div className="bar-container">
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${(ratingCounts[rating - 1] / reviews.length) * 100}%` 
                  }}
                />
              </div>
              <span className="rating-count">{ratingCounts[rating - 1]}</span>
            </div>
          ))}
        </div>
      </div>
      
      <ProductReview
        productName="Laptop Backpack"
        onSubmit={(rating, comment) => {
          // Add new review
        }}
      />
    </div>
  );
}
```

## Accessibility

The ProductReview component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Navigate through rating stars and form fields
- **Enter/Space**: Select rating stars and submit review
- **Arrow Keys**: Navigate between rating stars
- **Escape**: Clear current rating selection

### ARIA Attributes

- `role="radiogroup"` for the rating section
- `aria-label` for rating stars
- `aria-describedby` linking form fields to help text
- `aria-required` for required fields
- `aria-invalid` for validation errors

### Screen Reader Support

```jsx
function AccessibleProductReview() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="accessible-review">
      <fieldset className="rating-fieldset">
        <legend>Rate this product</legend>
        <div 
          role="radiogroup" 
          aria-label="Product rating"
          aria-describedby="rating-help"
        >
          <Rating 
            value={rating}
            onChange={setRating}
            aria-required="true"
          />
        </div>
        <div id="rating-help" className="sr-only">
          Use arrow keys to select a rating from 1 to 5 stars
        </div>
      </fieldset>
      
      <div className="comment-field">
        <label htmlFor="review-comment">
          Write your review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          aria-describedby="comment-help"
          aria-required="true"
        />
        <div id="comment-help">
          Share your experience with this product
        </div>
      </div>
    </div>
  );
}
```

### Best Practices

1. **Provide clear labels** for all form elements
2. **Include helpful instructions** for the rating system
3. **Announce validation errors** clearly
4. **Use semantic HTML** for form structure
5. **Ensure keyboard accessibility** for all interactions

## Styling

### CSS Custom Properties

The ProductReview component uses CSS custom properties for theming:

```css
:root {
  /* Container */
  --atomix-product-review-bg: var(--atomix-white);
  --atomix-product-review-border: 1px solid var(--atomix-border-color);
  --atomix-product-review-border-radius: var(--atomix-border-radius-lg);
  --atomix-product-review-padding: 1.5rem;
  --atomix-product-review-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  /* Product image */
  --atomix-product-review-image-size: 80px;
  --atomix-product-review-image-border-radius: var(--atomix-border-radius);

  /* Product name */
  --atomix-product-review-name-font-size: 1.25rem;
  --atomix-product-review-name-font-weight: 600;
  --atomix-product-review-name-color: var(--atomix-text-primary);

  /* Rating section */
  --atomix-product-review-rating-gap: 1rem;
  --atomix-product-review-star-size: 2rem;
  --atomix-product-review-star-color: var(--atomix-warning);

  /* Comment section */
  --atomix-product-review-comment-border: 1px solid var(--atomix-border-color);
  --atomix-product-review-comment-border-radius: var(--atomix-border-radius);
  --atomix-product-review-comment-padding: 0.75rem;
  --atomix-product-review-comment-min-height: 120px;

  /* Actions */
  --atomix-product-review-actions-gap: 1rem;
  --atomix-product-review-actions-margin-top: 1.5rem;
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base review component */
.c-product-review {
  background: var(--atomix-product-review-bg);
  border: var(--atomix-product-review-border);
  border-radius: var(--atomix-product-review-border-radius);
  padding: var(--atomix-product-review-padding);
  box-shadow: var(--atomix-product-review-shadow);
}

/* Header section */
.c-product-review__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.c-product-review__image {
  width: var(--atomix-product-review-image-size);
  height: var(--atomix-product-review-image-size);
  border-radius: var(--atomix-product-review-image-border-radius);
  object-fit: cover;
}

.c-product-review__product-name {
  font-size: var(--atomix-product-review-name-font-size);
  font-weight: var(--atomix-product-review-name-font-weight);
  color: var(--atomix-product-review-name-color);
  margin: 0;
}

/* Rating section */
.c-product-review__rating-section {
  margin-bottom: 1.5rem;
}

.c-product-review__rating-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--atomix-text-primary);
}

/* Comment section */
.c-product-review__comment-section {
  margin-bottom: 1.5rem;
}

.c-product-review__comment-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--atomix-text-primary);
}

.c-product-review__comment {
  width: 100%;
  min-height: var(--atomix-product-review-comment-min-height);
  padding: var(--atomix-product-review-comment-padding);
  border: var(--atomix-product-review-comment-border);
  border-radius: var(--atomix-product-review-comment-border-radius);
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
}

.c-product-review__comment:focus {
  outline: none;
  border-color: var(--atomix-primary);
  box-shadow: 0 0 0 3px var(--atomix-primary-alpha-20);
}

.c-product-review__comment::placeholder {
  color: var(--atomix-text-muted);
}

/* Actions section */
.c-product-review__actions {
  display: flex;
  gap: var(--atomix-product-review-actions-gap);
  margin-top: var(--atomix-product-review-actions-margin-top);
}

/* Error states */
.c-product-review__error {
  color: var(--atomix-error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.c-product-review__comment--error {
  border-color: var(--atomix-error);
}

.c-product-review__comment--error:focus {
  border-color: var(--atomix-error);
  box-shadow: 0 0 0 3px var(--atomix-error-alpha-20);
}
```

### Customization Examples

```css
/* Compact review variant */
.c-product-review--compact {
  --atomix-product-review-padding: 1rem;
  --atomix-product-review-image-size: 60px;
  --atomix-product-review-comment-min-height: 80px;
}

/* Large review variant */
.c-product-review--large {
  --atomix-product-review-padding: 2rem;
  --atomix-product-review-image-size: 120px;
  --atomix-product-review-comment-min-height: 150px;
  --atomix-product-review-star-size: 2.5rem;
}

/* Dark theme */
.c-product-review--dark {
  --atomix-product-review-bg: var(--atomix-gray-800);
  --atomix-product-review-border: 1px solid var(--atomix-gray-700);
  --atomix-product-review-name-color: var(--atomix-white);
  color: var(--atomix-white);
}

/* Minimal style */
.c-product-review--minimal {
  --atomix-product-review-border: none;
  --atomix-product-review-shadow: none;
  --atomix-product-review-bg: transparent;
}

/* Colorful rating */
.c-product-review--colorful .c-rating__star {
  transition: color 0.2s ease;
}

.c-product-review--colorful .c-rating__star:nth-child(1).is-active {
  color: #ef4444;
}

.c-product-review--colorful .c-rating__star:nth-child(2).is-active {
  color: #f97316;
}

.c-product-review--colorful .c-rating__star:nth-child(3).is-active {
  color: #eab308;
}

.c-product-review--colorful .c-rating__star:nth-child(4).is-active {
  color: #22c55e;
}

.c-product-review--colorful .c-rating__star:nth-child(5).is-active {
  color: #16a34a;
}
```

## Common Patterns

### E-commerce Product Page

```jsx
function ProductPageReview({ product }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  return (
    <div className="product-page-reviews">
      <div className="reviews-header">
        <h3>Customer Reviews</h3>
        <button 
          onClick={() => setShowReviewForm(true)}
          className="btn btn--primary"
        >
          Write a Review
        </button>
      </div>
      
      {showReviewForm && (
        <Modal onClose={() => setShowReviewForm(false)}>
          <ProductReview
            productName={product.name}
            productImage={product.image}
            onSubmit={(rating, comment) => {
              // Submit review
              setShowReviewForm(false);
            }}
          />
        </Modal>
      )}
      
      <div className="existing-reviews">
        {/* Display existing reviews */}
      </div>
    </div>
  );
}
```

### Order Confirmation Reviews

```jsx
function OrderConfirmationReviews({ orderItems }) {
  const [reviewedItems, setReviewedItems] = useState(new Set());

  return (
    <div className="order-reviews">
      <h3>How was your experience?</h3>
      <p>Help other customers by reviewing the products you purchased.</p>
      
      {orderItems.map(item => (
        <div key={item.id} className="order-item-review">
          {reviewedItems.has(item.id) ? (
            <div className="review-thankyou">
              <Icon name="CheckCircle" className="success-icon" />
              <span>Thank you for reviewing {item.name}!</span>
            </div>
          ) : (
            <ProductReview
              productName={item.name}
              productImage={item.image}
              onSubmit={(rating, comment) => {
                // Submit review
                setReviewedItems(prev => new Set([...prev, item.id]));
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

## Performance Considerations

1. **Image optimization**: Use appropriate image sizes and formats
2. **Form validation**: Debounce validation to avoid excessive re-renders
3. **Review submission**: Show loading states during API calls
4. **Large datasets**: Paginate reviews for better performance

```jsx
// Optimized product review with debounced validation
const OptimizedProductReview = ({ onSubmit, ...props }) => {
  const [comment, setComment] = useState('');
  const [isValid, setIsValid] = useState(false);

  const debouncedValidation = useMemo(
    () => debounce((text) => {
      setIsValid(text.trim().length >= 10);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedValidation(comment);
  }, [comment, debouncedValidation]);

  return (
    <ProductReview
      {...props}
      onSubmit={onSubmit}
      // Additional optimizations
    />
  );
};
```

## Integration Examples

### With Review APIs

```jsx
// Integration with review service
function APIIntegratedReview({ productId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitReview = async (rating, comment) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, comment }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      
      // Success handling
      toast.success('Review submitted successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-review-container">
      <ProductReview
        productName="API Product"
        onSubmit={submitReview}
        disabled={loading}
      />
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-indicator">Submitting...</div>}
    </div>
  );
}
```

### With Analytics

```jsx
// Review with analytics tracking
function AnalyticsReview({ product }) {
  const handleSubmit = (rating, comment) => {
    // Track review submission
    analytics.track('Review Submitted', {
      productId: product.id,
      productName: product.name,
      rating: rating,
      commentLength: comment.length,
      timestamp: new Date().toISOString()
    });
    
    // Submit review
    submitReview(rating, comment);
  };

  return (
    <ProductReview
      productName={product.name}
      productImage={product.image}
      onSubmit={handleSubmit}
    />
  );
}
```

## Browser Support

The ProductReview component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Rating](./rating.md)** - Used for the star rating system
- **[Button](./button.md)** - Used for form submission
- **[Modal](./modal.md)** - Often contains review forms
- **[Avatar](./avatar.md)** - Used for user identification
- **[Badge](./badge.md)** - Used for verified purchase indicators

## Migration Guide

### From Custom Review Form

```jsx
// Before (custom implementation)
<div className="review-form">
  <input type="text" placeholder="Product name" />
  <div className="stars">
    {[1,2,3,4,5].map(n => <span key={n}>⭐</span>)}
  </div>
  <textarea placeholder="Your review"></textarea>
  <button>Submit</button>
</div>

// After (Atomix ProductReview)
<ProductReview
  productName="Product Name"
  onSubmit={(rating, comment) => console.log(rating, comment)}
/>
```
