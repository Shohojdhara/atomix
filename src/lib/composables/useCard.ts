import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { UseCardOptions, UseCardReturn } from '../types/components';
import { CARD } from '../constants/components';

/**
 * Hook for managing Card component state and behaviors
 * 
 * @param options - Configuration options for the card
 * @returns Card state and handlers
 */
export const useCard = (options: UseCardOptions = {}): UseCardReturn => {
  const {
    elevationEffect = false,
    elevationClass = CARD.CLASSES.ACTIVE,
    flipEffect = false,
    flipTrigger = 'click',
    focusEffect = false,
    clickable = false,
    onClick
  } = options;

  const cardRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const [isElevated, setIsElevated] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Handle click events
  const handleClick = useCallback((event: React.MouseEvent) => {
    if (flipEffect && flipTrigger === 'click') {
      setIsFlipped(prev => !prev);
    }

    if (onClick) {
      onClick(event);
    }
  }, [flipEffect, flipTrigger, onClick]);

  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      
      if (flipEffect && flipTrigger === 'click') {
        setIsFlipped(prev => !prev);
      }

      if (onClick) {
        onClick(event as unknown as React.MouseEvent);
      }
    }
  }, [flipEffect, flipTrigger, onClick]);

  // Handle mouse enter events
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    
    if (elevationEffect) {
      setIsElevated(true);
    }

    if (flipEffect && flipTrigger === 'hover') {
      setIsFlipped(true);
    }
  }, [elevationEffect, flipEffect, flipTrigger]);

  // Handle mouse leave events
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    
    if (elevationEffect) {
      setIsElevated(false);
    }

    if (flipEffect && flipTrigger === 'hover') {
      setIsFlipped(false);
    }
  }, [elevationEffect, flipEffect, flipTrigger]);

  // Handle focus events
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // Handle blur events
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // Get all card props combined
  const getCardProps = useCallback(() => {
    const className = [
      CARD.CLASSES.BASE,
      isElevated ? elevationClass : '',
      isFlipped ? CARD.CLASSES.FLIPPED : '',
      isFocused && focusEffect ? CARD.CLASSES.FOCUSED : '',
      clickable ? CARD.CLASSES.CLICKABLE : ''
    ].filter(Boolean).join(' ');

    return {
      className,
      ref: cardRef,
      tabxwIndex: clickable || flipEffect ? 0 : -1,
      role: clickable ? 'button' : undefined,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onClick: handleClick,
      onKeyDown: handleKeyDown
    };
  }, [isElevated, isFlipped, isFocused, elevationClass, focusEffect, clickable, handleMouseEnter, handleMouseLeave, handleFocus, handleBlur, handleClick, handleKeyDown, flipEffect]);

  return {
    cardRef,
    frontRef,
    backRef,
    isFlipped,
    isElevated,
    isFocused,
    isHovered,
    handleClick,
    handleKeyDown,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    getCardProps
  };
};