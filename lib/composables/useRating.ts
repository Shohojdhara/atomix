import { useState, useCallback } from 'react';
import type { RatingProps } from '../types/components';

/**
 * Props for the useRating hook
 */
export type UseRatingProps = Pick<
  RatingProps,
  'value' | 'maxValue' | 'allowHalf' | 'readOnly' | 'onChange'
>;

export interface UseRatingReturn {
  /**
   * Current rating value (controlled or uncontrolled)
   */
  currentValue: number;

  /**
   * Value being hovered over
   */
  hoverValue: number | null;

  /**
   * Currently focused star index
   */
  focusedIndex: number | null;

  /**
   * Handle mouse enter on a star
   */
  handleMouseEnter: (starValue: number) => void;

  /**
   * Handle mouse leave from rating component
   */
  handleMouseLeave: () => void;

  /**
   * Handle click on a star
   */
  handleClick: (newValue: number) => void;

  /**
   * Handle keyboard navigation
   */
  handleKeyDown: (e: React.KeyboardEvent, index: number) => void;

  /**
   * Set focus on a specific star
   */
  setFocused: (index: number | null) => void;

  /**
   * Set hover value directly
   */
  setHoverValue: (value: number | null) => void;

  /**
   * Whether the component is in controlled mode
   */
  isControlled: boolean;
}

/**
 * Hook for managing rating component state and interactions
 */
export const useRating = ({
  value = 0,
  maxValue = 5,
  allowHalf = false,
  readOnly = false,
  onChange,
}: UseRatingProps): UseRatingReturn => {
  // Determine if component is in controlled mode
  const isControlled = typeof onChange !== 'undefined';

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<number>(value);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Use controlled or uncontrolled value
  const currentValue = isControlled ? value : internalValue;

  // Handle mouse enter on star
  const handleMouseEnter = useCallback(
    (starValue: number) => {
      if (readOnly) return;
      setHoverValue(starValue);
    },
    [readOnly]
  );

  // Handle mouse leave from rating component
  const handleMouseLeave = useCallback(() => {
    if (readOnly) return;
    setHoverValue(null);
  }, [readOnly]);

  // Handle click on star
  const handleClick = useCallback(
    (newValue: number) => {
      if (readOnly) return;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    },
    [readOnly, onChange, isControlled]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (readOnly) return;

      const step = allowHalf ? 0.5 : 1;
      let newValue = currentValue;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(maxValue, currentValue + step);
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(0, currentValue - step);
          e.preventDefault();
          break;
        case 'Home':
          newValue = 0;
          e.preventDefault();
          break;
        case 'End':
          newValue = maxValue;
          e.preventDefault();
          break;
        case ' ':
        case 'Enter':
          newValue = index;
          e.preventDefault();
          break;
        default:
          return;
      }

      if (newValue !== currentValue) {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      }
    },
    [currentValue, maxValue, allowHalf, readOnly, onChange, isControlled]
  );

  return {
    currentValue,
    hoverValue,
    focusedIndex,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleKeyDown,
    setFocused: setFocusedIndex,
    setHoverValue,
    isControlled,
  };
};

export default useRating;
