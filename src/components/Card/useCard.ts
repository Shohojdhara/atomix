import { useState, useRef, useEffect, RefObject } from 'react';

interface UseCardOptions {
  /**
   * Enable elevation effect on hover
   */
  elevationEffect?: boolean;
  
  /**
   * CSS class for elevation effect
   */
  elevationClass?: string;
  
  /**
   * Enable flip effect
   */
  flipEffect?: boolean;
  
  /**
   * Trigger for flip effect: 'click' or 'hover'
   */
  flipTrigger?: 'click' | 'hover';
  
  /**
   * Make card focusable and add focus effect
   */
  focusEffect?: boolean;
  
  /**
   * Make card clickable
   */
  clickable?: boolean;
  
  /**
   * Click handler for clickable card
   */
  onClick?: (event: React.MouseEvent) => void;
}

interface UseCardReturn {
  cardRef: RefObject<HTMLDivElement>;
  frontRef: RefObject<HTMLDivElement>;
  backRef: RefObject<HTMLDivElement>;
  isFlipped: boolean;
  isElevated: boolean;
  isFocused: boolean;
  isHovered: boolean;
  handleClick: (event: React.MouseEvent) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
  getCardProps: () => {
    ref: RefObject<HTMLDivElement>;
    tabIndex?: number;
    role?: string;
    onClick?: (event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    className: string;
  };
}

export const useCard = (options: UseCardOptions = {}): UseCardReturn => {
  const {
    elevationEffect = false,
    elevationClass = 'is-elevated',
    flipEffect = false,
    flipTrigger = 'click',
    focusEffect = false,
    clickable = false,
    onClick
  } = options;
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isElevated, setIsElevated] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  
  // Handle click for both clickable cards and flip effect
  const handleClick = (event: React.MouseEvent) => {
    if (clickable && onClick) {
      onClick(event);
    }
    
    if (flipEffect && flipTrigger === 'click') {
      setIsFlipped(!isFlipped);
    }
  };
  
  // Handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (clickable && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as unknown as React.MouseEvent);
    }
    
    if (flipEffect && flipTrigger === 'click' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };
  
  // Handle mouse enter for hover effects
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (elevationEffect) {
      setIsElevated(true);
    }
    
    if (flipEffect && flipTrigger === 'hover') {
      setIsFlipped(true);
    }
  };
  
  // Handle mouse leave for hover effects
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (elevationEffect) {
      setIsElevated(false);
    }
    
    if (flipEffect && flipTrigger === 'hover') {
      setIsFlipped(false);
    }
  };
  
  // Handle focus for focus effects
  const handleFocus = () => {
    if (focusEffect) {
      setIsFocused(true);
    }
  };
  
  // Handle blur for focus effects
  const handleBlur = () => {
    if (focusEffect) {
      setIsFocused(false);
    }
  };
  
  // Apply flip effect styles
  useEffect(() => {
    if (flipEffect && frontRef.current && backRef.current) {
      // Base styles for flip effect
      if (cardRef.current) {
        cardRef.current.style.perspective = '1000px';
        cardRef.current.style.transformStyle = 'preserve-3d';
      }
      
      // Common styles for front and back
      [frontRef.current, backRef.current].forEach(el => {
        if (el) {
          el.style.backfaceVisibility = 'hidden';
          el.style.position = 'absolute';
          el.style.top = '0';
          el.style.left = '0';
          el.style.width = '100%';
          el.style.height = '100%';
          el.style.transition = 'transform 0.6s';
        }
      });
      
      // Initial transform
      backRef.current.style.transform = 'rotateY(180deg)';
      
      // Apply flip transform based on state
      if (isFlipped) {
        frontRef.current.style.transform = 'rotateY(180deg)';
        backRef.current.style.transform = 'rotateY(0)';
      } else {
        frontRef.current.style.transform = 'rotateY(0)';
        backRef.current.style.transform = 'rotateY(180deg)';
      }
    }
  }, [flipEffect, isFlipped]);
  
  // Get all props for the card component
  const getCardProps = () => {
    const props: {
      ref: RefObject<HTMLDivElement>;
      tabIndex?: number;
      role?: string;
      onClick?: (event: React.MouseEvent) => void;
      onKeyDown?: (event: React.KeyboardEvent) => void;
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
      onFocus?: () => void;
      onBlur?: () => void;
      className: string;
    } = {
      ref: cardRef,
      className: [
        isElevated && elevationEffect ? elevationClass : '',
        isFlipped ? 'is-flipped' : '',
        isFocused ? 'is-focused' : '',
        isHovered ? 'is-hovered' : '',
      ].filter(Boolean).join(' ')
    };
    
    // Add clickable props
    if (clickable || (flipEffect && flipTrigger === 'click')) {
      props.tabIndex = 0;
      props.role = 'button';
      props.onClick = handleClick;
      props.onKeyDown = handleKeyDown;
    }
    
    // Add hover props
    if (elevationEffect || (flipEffect && flipTrigger === 'hover')) {
      props.onMouseEnter = handleMouseEnter;
      props.onMouseLeave = handleMouseLeave;
    }
    
    // Add focus props
    if (focusEffect) {
      props.onFocus = handleFocus;
      props.onBlur = handleBlur;
    }
    
    return props;
  };
  
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

export default useCard; 