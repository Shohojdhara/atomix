import React, { useRef, useEffect, useCallback, forwardRef } from 'react';
import { THEME_COLORS, SIZES, RATING } from '../../lib/constants/components';
import { useRating } from '../../lib/composables/useRating';
import type { RatingProps } from '../../lib/types/components';
import useForkRef from '../../lib/utils/useForkRef';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

/**
 * Rating component for displaying and collecting star ratings
 *
 * @example
 * // Basic usage
 * <Rating value={3} onChange={handleRatingChange} />
 *
 * @example
 * // Read-only with custom color
 * <Rating value={4.5} readOnly color="warning" />
 *
 * @example
 * // With half-star support
 * <Rating value={3.5} allowHalf maxValue={5} />
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value: valueProp = 0,
      defaultValue,
      maxValue = 5,
      allowHalf = false,
      readOnly = false,
      size = 'md',
      color,
      onChange,
      className = '',
      style,
      label,
      id,
      useVanillaJS = false,
      glass,
      ...restProps
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const ratingInstance = useRef<any>(null);

    // Use the rating hook for React-based implementation
    const { currentValue, hoverValue, focusedIndex, setHoverValue, setFocused, handleKeyDown } =
      useRating({
        value: valueProp !== undefined ? valueProp : defaultValue,
        maxValue,
        allowHalf,
        readOnly,
        onChange,
      });

    // Handle mouse enter on star with half-star support
    const handleMouseEnter = useCallback(
      (e: React.MouseEvent, starValue: number) => {
        if (readOnly) return;

        if (allowHalf) {
          // Get the star element's bounding rectangle
          const starRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          // Calculate the x position within the star
          const starCenterX = starRect.left + starRect.width / 2;
          // If mouse is on the left half of the star, use half value
          const isHalfStar = e.clientX < starCenterX;
          const adjustedValue = isHalfStar ? starValue - 0.5 : starValue;
          setHoverValue(Math.max(0.5, adjustedValue)); // Ensure minimum of 0.5
        } else {
          setHoverValue(starValue);
        }
      },
      [readOnly, allowHalf, setHoverValue]
    );

    // Handle mouse move on star for half-star precision
    const handleMouseMove = useCallback(
      (e: React.MouseEvent, starValue: number) => {
        if (readOnly || !allowHalf) return;

        // Get the star element's bounding rectangle
        const starRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        // Calculate the x position within the star
        const starCenterX = starRect.left + starRect.width / 2;
        // If mouse is on the left half of the star, use half value
        const isHalfStar = e.clientX < starCenterX;
        const adjustedValue = isHalfStar ? starValue - 0.5 : starValue;
        setHoverValue(Math.max(0.5, adjustedValue)); // Ensure minimum of 0.5
      },
      [readOnly, allowHalf, setHoverValue]
    );

    // Handle mouse leave from rating component
    const handleMouseLeave = useCallback(() => {
      if (readOnly) return;
      setHoverValue(null);
    }, [readOnly, setHoverValue]);

    // Handle click on star with half-star support
    const handleClick = useCallback(
      (e: React.MouseEvent, starValue: number) => {
        if (readOnly) return;

        let newValue = starValue;

        if (allowHalf) {
          // Get the star element's bounding rectangle
          const starRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          // Calculate the x position within the star
          const starCenterX = starRect.left + starRect.width / 2;
          // If click is on the left half of the star, use half value
          const isHalfStar = e.clientX < starCenterX;
          newValue = isHalfStar ? starValue - 0.5 : starValue;
          newValue = Math.max(0.5, newValue); // Ensure minimum of 0.5
        }

        onChange?.(newValue);
      },
      [readOnly, onChange, allowHalf]
    );

    // Use vanilla JS implementation if specified
    useEffect(() => {
      if (!useVanillaJS || typeof window === 'undefined' || !internalRef.current) return undefined;

      // Cleanup on unmount
      return () => {
        if (ratingInstance.current) {
          ratingInstance.current.destroy();
        }
      };
    }, [
      useVanillaJS,
      valueProp,
      defaultValue,
      maxValue,
      allowHalf,
      readOnly,
      size,
      color,
      onChange,
    ]);

    // Update vanilla JS implementation when props change
    useEffect(() => {
      if (!useVanillaJS || !ratingInstance.current) return undefined;

      ratingInstance.current.updateOptions({
        value: valueProp !== undefined ? valueProp : defaultValue,
        maxValue,
        allowHalf,
        readOnly,
        size,
        color,
      });
    }, [useVanillaJS, valueProp, defaultValue, maxValue, allowHalf, readOnly, size, color]);

    // Determine CSS classes
    const ratingClasses = [
      'c-rating',
      size === 'sm' ? RATING.CLASSES.SMALL : '',
      size === 'lg' ? RATING.CLASSES.LARGE : '',
      color ? `c-rating--${color}` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // If using vanilla JS, just render the container
    if (useVanillaJS) {
      return (
        <div className={ratingClasses} ref={useForkRef(internalRef, ref)} id={id} {...restProps}>
          {/* Stars will be generated by the vanilla JS implementation */}
        </div>
      );
    }

    // React-based implementation
    // Determine the effective value (either hovered or actual)
    const effectiveValue = hoverValue !== null ? hoverValue : currentValue;

    // Generate stars
    const renderStars = () => {
      const stars = [];
      const roundedValue = allowHalf
        ? Math.floor(effectiveValue * 2) / 2
        : Math.round(effectiveValue);
      const componentId = id || `rating-${Math.random().toString(36).substring(2, 9)}`;

      for (let i = 1; i <= maxValue; i++) {
        // For half-star support
        const isFullStar = i <= Math.floor(roundedValue);
        const isHalfStar = allowHalf && i - 0.5 === roundedValue;

        const starClass = [
          'c-rating__star',
          isFullStar ? RATING.CLASSES.FULL : '',
          isHalfStar ? RATING.CLASSES.HALF : '',
          color ? `c-rating__star--${color}` : '',
          focusedIndex === i ? 'c-rating__star--focused' : '',
        ]
          .filter(Boolean)
          .join(' ');

        const starId = `${componentId}-star-${i}`;

        stars.push(
          <div
            key={i}
            id={starId}
            className={starClass}
            data-value={i}
            role={readOnly ? 'presentation' : 'button'}
            tabIndex={readOnly ? -1 : 0}
            aria-label={`${i} ${i === 1 ? 'star' : 'stars'}`}
            aria-checked={i <= roundedValue}
            aria-setsize={maxValue}
            aria-posinset={i}
            onClick={e => handleClick(e, i)}
            onMouseEnter={e => handleMouseEnter(e, i)}
            onMouseMove={e => handleMouseMove(e, i)}
            onFocus={() => setFocused(i)}
            onBlur={() => setFocused(null)}
            onKeyDown={e => handleKeyDown(e, i)}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              {/* Empty star (outline) */}
              <path
                className="c-rating__star-outline"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                strokeWidth="1"
              />

              {/* Full star */}
              <path
                className="c-rating__star-full"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />

              {/* Half star with proper clipping */}
              <path
                className="c-rating__star-half"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                clipPath={`url(#half-star-clip-${componentId}-${i})`}
              />

              {/* Clipping path for half star */}
              <defs>
                <clipPath id={`half-star-clip-${componentId}-${i}`}>
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
            </svg>
          </div>
        );
      }

      return stars;
    };

    const ratingContent = (
      <div
        className={ratingClasses}
        ref={useForkRef(internalRef, ref)}
        id={id}
        style={style}
        data-readonly={readOnly ? 'true' : 'false'}
        onMouseLeave={handleMouseLeave}
        role={readOnly ? 'img' : 'radiogroup'}
        aria-label={label || `Rating: ${currentValue} out of ${maxValue} stars`}
        {...restProps}
      >
        {renderStars()}
      </div>
    );

    if (glass) {
      // Default glass settings for ratings
      const defaultGlassProps = {
        displacementScale: 60,
        blurAmount: 1,
        saturation: 160,
        aberrationIntensity: 0.5,
        cornerRadius: 8,
        mode: 'shader' as const,
      };

      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      return <AtomixGlass {...glassProps}>{ratingContent}</AtomixGlass>;
    }

    return ratingContent;
  }
);

Rating.displayName = 'Rating';

export type { RatingProps };

export default Rating;
