# ProductReview

The ProductReview component allows users to rate and provide feedback on products. It provides a complete form with rating controls and comment fields for collecting user reviews.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [With Product Image](#with-product-image)
- [Props](#props)
- [Examples](#examples)
  - [Simple Product Review](#simple-product-review)
  - [Advanced Product Review](#advanced-product-review)

## Overview

The ProductReview component provides a user-friendly interface for collecting product ratings and reviews. It includes a star rating system, comment field, and submission handling with success feedback.

## Features

- Star rating system with customizable max value
- Half-star rating support
- Product image display
- Comment text area
- Form validation
- Success feedback after submission
- Customizable rating colors
- Responsive design
- Accessibility support

## Installation

```bash
npm install @shohojdhara/atomix
```

Import the component and styles:

```tsx
import { ProductReview } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';
```

## Usage

### Basic Usage

```tsx
import { ProductReview } from '@shohojdhara/atomix';

export function BasicProductReview() {
  const handleSubmit = (rating: number, comment: string) => {
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    // Submit to your backend
  };

  return (
    <ProductReview
      productName="Premium Headphones"
      onSubmit={handleSubmit}
    />
  );
}
```

### With Product Image

```tsx
import { ProductReview } from '@shohojdhara/atomix';

export function ProductReviewWithImage() {
  const handleSubmit = (rating: number, comment: string) => {
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    // Submit to your backend
  };

  return (
    <ProductReview
      productName="Wireless Bluetooth Speaker"
      productImage="/images/products/speaker.jpg"
      initialRating={0}
      maxRating={5}
      allowHalf
      onSubmit={handleSubmit}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| productName* | `string` | `undefined` | Product name |
| productImage | `string` | `undefined` | Product image URL |
| initialRating | `number` | `0` | Initial rating value (0-5) |
| maxRating | `number` | `5` | Maximum possible rating value |
| allowHalf | `boolean` | `true` | Whether to allow half-star ratings |
| ratingColor | [ThemeColor](#themecolor) | `'warning'` | Color theme for the rating stars |
| onSubmit | `(rating: number, comment: string) => void` | `undefined` | Callback when review is submitted |
| className | `string` | `''` | Additional CSS class |

### ThemeColor

The ThemeColor type includes:
- `'primary'`
- `'secondary'`
- `'success'`
- `'warning'`
- `'error'`
- `'info'`
- `'light'`
- `'dark'`

## Examples

### Simple Product Review

```tsx
import { ProductReview } from '@shohojdhara/atomix';

export function SimpleExample() {
  const handleSubmit = (rating: number, comment: string) => {
    // Send data to your backend
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: '12345',
        rating,
        comment,
      }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Review submitted successfully');
        } else {
          console.error('Failed to submit review');
        }
      })
      .catch(error => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <ProductReview
      productName="Smart Watch Series 5"
      onSubmit={handleSubmit}
    />
  );
}
```

### Advanced Product Review

```tsx
import { ProductReview } from '@shohojdhara/atomix';
import { useState } from 'react';

export function AdvancedExample() {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmit = (rating: number, comment: string) => {
    // Create review object
    const newReview = {
      id: Date.now(),
      rating,
      comment,
      date: new Date().toISOString(),
    };

    // Update local state
    setReviews([...reviews, newReview]);
    
    // In a real app, you would also send to your backend
    console.log('New review:', newReview);
    
    // Hide form after submission
    setShowReviewForm(false);
  };

  return (
    <div className="product-review-section">
      <h2>Customer Reviews</h2>
      
      {reviews.length > 0 && (
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-rating">
                {'★'.repeat(Math.floor(review.rating))}
                {review.rating % 1 !== 0 && '½'}
                {'☆'.repeat(5 - Math.ceil(review.rating))}
              </div>
              <p className="review-comment">{review.comment}</p>
              <small className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
      
      {showReviewForm ? (
        <ProductReview
          productName="Premium Coffee Maker"
          productImage="/images/products/coffee-maker.jpg"
          initialRating={0}
          maxRating={5}
          allowHalf
          ratingColor="warning"
          onSubmit={handleSubmit}
        />
      ) : (
        <button 
          className="btn btn-primary"
          onClick={() => setShowReviewForm(true)}
        >
          Write a Review
        </button>
      )}
    </div>
  );
}
```