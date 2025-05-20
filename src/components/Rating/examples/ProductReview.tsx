import React, { useState } from 'react';
import { Rating } from '../Rating';
import { Button } from '../../Button';

export interface ProductReviewProps {
  /**
   * Product name
   */
  productName: string;
  
  /**
   * Product image URL
   */
  productImage?: string;
  
  /**
   * Initial rating value (0-5)
   */
  initialRating?: number;
  
  /**
   * Callback when review is submitted
   */
  onSubmit?: (rating: number, comment: string) => void;
  
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * ProductReview component for collecting user ratings and feedback
 */
export const ProductReview: React.FC<ProductReviewProps> = ({
  productName,
  productImage,
  initialRating = 0,
  onSubmit,
  className = '',
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit(rating, comment);
    }
    
    setSubmitted(true);
  };
  
  const containerClasses = ['c-product-review', className].filter(Boolean).join(' ');
  
  if (submitted) {
    return (
      <div className={containerClasses}>
        <div className="c-product-review__success">
          <h3>Thank you for your review!</h3>
          <p>Your feedback helps us improve our products.</p>
          <Button 
            variant="secondary" 
            label="Write another review"
            onClick={() => {
              setSubmitted(false);
              setRating(0);
              setComment('');
            }}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className={containerClasses}>
      <div className="c-product-review__header">
        <h3 className="c-product-review__title">Review {productName}</h3>
        {productImage && (
          <div className="c-product-review__image-wrapper">
            <img 
              src={productImage} 
              alt={productName} 
              className="c-product-review__image" 
            />
          </div>
        )}
      </div>
      
      <form className="c-product-review__form" onSubmit={handleSubmit}>
        <div className="c-product-review__rating-container">
          <label className="c-product-review__label">Your Rating</label>
          <Rating 
            value={rating} 
            onChange={setRating} 
            allowHalf={true}
            size="lg"
            color="warning"
          />
          <span className="c-product-review__rating-value">
            {rating > 0 ? rating.toFixed(1) : 'Select a rating'}
          </span>
        </div>
        
        <div className="c-product-review__comment-container">
          <label htmlFor="review-comment" className="c-product-review__label">
            Your Review
          </label>
          <textarea
            id="review-comment"
            className="c-product-review__textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={5}
          />
        </div>
        
        <div className="c-product-review__actions">
          <Button 
            variant="primary" 
            label="Submit Review"
            disabled={rating === 0}
            onClick={() => handleSubmit(new Event('click') as unknown as React.FormEvent)}
          />
        </div>
      </form>
    </div>
  );
};

export default ProductReview;
