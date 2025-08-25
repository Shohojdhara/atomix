import { useState, useRef, useEffect, RefObject } from 'react';

type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
type PopoverTrigger = 'click' | 'hover';

interface UsePopoverProps {
  position?: PopoverPosition | 'auto';
  trigger?: PopoverTrigger;
  offset?: number;
  delay?: number;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  id?: string;
}

interface UsePopoverResult {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  popoverRef: RefObject<HTMLDivElement | null>;
  arrowRef: RefObject<HTMLDivElement | null>;
  popoverId: string;
  currentPosition: PopoverPosition;
  updatePosition: () => void;
}

/**
 * Hook for managing popover state and positioning logic
 */
export const usePopover = ({
  position = 'top',
  trigger = 'click',
  offset = 12,
  delay = 0,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  id,
}: UsePopoverProps): UsePopoverResult => {
  const [isOpen, setIsOpenState] = useState(defaultOpen);
  const [currentPosition, setCurrentPosition] = useState<PopoverPosition>(
    position === 'auto' ? 'top' : (position as PopoverPosition)
  );
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popoverId = id || `popover-${Math.random().toString(36).slice(2, 11)}`;

  // Use controlled state if provided
  const isControlled = controlledIsOpen !== undefined;
  const isOpenState = isControlled ? controlledIsOpen : isOpen;

  // Define setIsOpen function before using it in useEffect
  const setIsOpen = (newIsOpen: boolean) => {
    if (!isControlled) {
      setIsOpenState(newIsOpen);
    }
    if (onOpenChange) {
      onOpenChange(newIsOpen);
    }
  };

  // Handle hover events if trigger is hover
  useEffect(() => {
    if (trigger !== 'hover' || !triggerRef.current || !popoverRef.current) return undefined;

    const handleTriggerMouseEnter = () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setIsOpen(true);
        }, delay);
      } else {
        setIsOpen(true);
      }
    };

    const handleTriggerMouseLeave = () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      timeoutRef.current = setTimeout(() => {
        if (!popoverRef.current?.matches(':hover')) {
          setIsOpen(false);
        }
      }, 100);
    };

    const handlePopoverMouseEnter = () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handlePopoverMouseLeave = () => {
      setIsOpen(false);
    };

    // Add hover event listeners
    triggerRef.current.addEventListener('mouseenter', handleTriggerMouseEnter);
    triggerRef.current.addEventListener('mouseleave', handleTriggerMouseLeave);
    popoverRef.current.addEventListener('mouseenter', handlePopoverMouseEnter);
    popoverRef.current.addEventListener('mouseleave', handlePopoverMouseLeave);

    return () => {
      if (triggerRef.current) {
        triggerRef.current.removeEventListener('mouseenter', handleTriggerMouseEnter);
        triggerRef.current.removeEventListener('mouseleave', handleTriggerMouseLeave);
      }
      if (popoverRef.current) {
        popoverRef.current.removeEventListener('mouseenter', handlePopoverMouseEnter);
        popoverRef.current.removeEventListener('mouseleave', handlePopoverMouseLeave);
      }
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, delay, isOpenState]);

  const updatePosition = (event?: Event) => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check if the trigger is near viewport edges
    const isNearViewportEdge =
      triggerRect.top < 50 ||
      triggerRect.bottom > viewportHeight - 50 ||
      triggerRect.left < 50 ||
      triggerRect.right > viewportWidth - 50;

    // If this is a scroll update and trigger isn't near edges, skip repositioning
    if (event?.type === 'scroll' && !isNearViewportEdge) {
      return;
    }

    // Calculate space available in each direction
    const spaceTop = triggerRect.top;
    const spaceBottom = viewportHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = viewportWidth - triggerRect.right;

    // Determine best position based on available space
    let bestPosition: PopoverPosition = position === 'auto' ? 'top' : (position as PopoverPosition);

    // If specified position is 'auto', find the position with most space
    if (position === 'auto') {
      const spaces = [
        { position: 'top', space: spaceTop },
        { position: 'right', space: spaceRight },
        { position: 'bottom', space: spaceBottom },
        { position: 'left', space: spaceLeft },
      ];

      // Sort by available space (descending)
      spaces.sort((a, b) => b.space - a.space);

      // Select position with most space
      bestPosition = spaces[0]?.position as PopoverPosition;
    } else {
      // Check if the preferred position has enough space
      const needsFlip =
        (position === 'top' &&
          spaceTop < popoverRect.height + offset &&
          spaceBottom >= popoverRect.height + offset) ||
        (position === 'bottom' &&
          spaceBottom < popoverRect.height + offset &&
          spaceTop >= popoverRect.height + offset) ||
        (position === 'left' &&
          spaceLeft < popoverRect.width + offset &&
          spaceRight >= popoverRect.width + offset) ||
        (position === 'right' &&
          spaceRight < popoverRect.width + offset &&
          spaceLeft >= popoverRect.width + offset);

      if (needsFlip) {
        // Flip to the opposite side
        const oppositePositions: Record<PopoverPosition | 'auto', PopoverPosition> = {
          top: 'bottom',
          bottom: 'top',
          left: 'right',
          right: 'left',
          auto: 'bottom',
        };
        bestPosition = oppositePositions[position as PopoverPosition | 'auto'];
      }
    }

    setCurrentPosition(bestPosition);

    // Calculate position based on the determined best position
    let top = 0;
    let left = 0;

    // Calculate viewport-relative position
    switch (bestPosition) {
      case 'top':
        top = triggerRect.top - popoverRect.height - offset;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.left - popoverRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.right + offset;
        break;
    }

    // Constrain to viewport boundaries
    if (left < 0) {
      left = 5;
    } else if (left + popoverRect.width > viewportWidth) {
      left = viewportWidth - popoverRect.width - 5;
    }

    if (top < 0) {
      top = 5;
    } else if (top + popoverRect.height > viewportHeight) {
      top = viewportHeight - popoverRect.height - 5;
    }

    // Add scroll position to convert viewport coordinates to absolute position
    const absoluteTop = top + window.scrollY;
    const absoluteLeft = left + window.scrollX;

    // Apply position using absolute positioning to follow when scrolling
    popoverRef.current.style.position = 'absolute';
    popoverRef.current.style.top = `${absoluteTop}px`;
    popoverRef.current.style.left = `${absoluteLeft}px`;
  };

  // Position the popover
  useEffect(() => {
    if (!isOpenState || !triggerRef.current || !popoverRef.current) return undefined;

    // Initial positioning
    updatePosition();

    // Update position on resize
    window.addEventListener('resize', updatePosition);

    // Update position on scroll, but throttled for performance
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = (e: Event) => {
      if (scrollTimeout) {
        return;
      }

      scrollTimeout = setTimeout(() => {
        updatePosition(e);
        scrollTimeout = null;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Update position less frequently to handle content changes
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      updatePosition();
    }, 500);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      clearInterval(intervalId);
    };
  }, [isOpenState, position, offset]);

  // Handle click outside to close popover
  useEffect(() => {
    if (!isOpenState || !closeOnClickOutside) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenState, closeOnClickOutside]);

  // Handle escape key to close popover
  useEffect(() => {
    if (!isOpenState || !closeOnEscape) return undefined;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpenState, closeOnEscape]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isOpen: isOpenState,
    setIsOpen,
    triggerRef,
    popoverRef,
    arrowRef,
    popoverId,
    currentPosition,
    updatePosition,
  };
};

export default usePopover;
