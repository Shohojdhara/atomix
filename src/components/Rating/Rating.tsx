import React, { useRef, useEffect } from 'react';
import { THEME_COLORS, SIZES, RATING } from '../../lib/constants/components';

export interface RatingProps {
  /**
   * The rating value (0-5)
   */
  value: number;
  
  /**
   * Maximum possible rating value
   */
  maxValue?: number;
  
  /**
   * Whether to allow half-star ratings
   */
  allowHalf?: boolean;
  
  /**
   * Whether the rating is read-only
   */
  readOnly?: boolean;
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Color theme
   */
  color?: typeof THEME_COLORS[number];
  
  /**
   * Optional callback when rating changes
   */
  onChange?: (value: number) => void;
  
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Rating component for displaying and collecting star ratings
 */
export const Rating: React.FC<RatingProps> = ({
  value = 0,
  maxValue = 5,
  allowHalf = false,
  readOnly = false,
  size = 'md',
  color,
  onChange,
  className = '',
}) => {
  const ratingRef = useRef<HTMLDivElement>(null);
  const ratingInstance = useRef<any>(null);
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !ratingRef.current) return;

    // Dynamically import the rating script to avoid server-side rendering issues
    import('./scripts/bundle').then(({ default: RatingClass }) => {
      if (ratingRef.current) {
        ratingInstance.current = new RatingClass(ratingRef.current, {
          value,
          maxValue,
          allowHalf,
          readOnly,
          size,
          color,
          onChange
        });
      }
    });
    
    // Cleanup on unmount
    return () => {
      if (ratingInstance.current) {
        ratingInstance.current.destroy();
      }
    };
  }, [value, maxValue, allowHalf, readOnly, size, color, onChange]);
  
  // Determine CSS classes
  const ratingClasses = [
    'c-rating',
    size === 'sm' ? RATING.CLASSES.SMALL : '',
    size === 'lg' ? RATING.CLASSES.LARGE : '',
    color ? `c-rating--${color}` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Generate stars
  const renderStars = () => {
    const stars = [];
    const roundedValue = allowHalf ? Math.floor(value * 2) / 2 : Math.round(value);
    
    for (let i = 1; i <= maxValue; i++) {
      const starClass = [
        'c-rating__star',
        i <= roundedValue ? RATING.CLASSES.FULL : '',
        allowHalf && i - 0.5 === roundedValue ? RATING.CLASSES.HALF : '',
        color ? `c-rating__star--${color}` : ''
      ].filter(Boolean).join(' ');
      
      stars.push(
        <div 
          key={i} 
          className={starClass}
          data-value={i}
        >
          <svg 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id={`half-star-clip-${i}`}>
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <path 
              className="c-rating__star-full"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill="none"
              strokeWidth="1"
            />
            <g className="c-rating__star-half" clipPath={`url(#half-star-clip-${i})`}>
              <rect x="0" y="0" width="24" height="24" />
            </g>
          </svg>
        </div>
      );
    }
    
    return stars;
  };
  
  return (
    <div 
      className={ratingClasses} 
      ref={ratingRef}
      {...{[RATING.ATTRIBUTES.READONLY]: readOnly ? 'true' : 'false'}}
    >
      {renderStars()}
    </div>
  );
};

export default Rating;
