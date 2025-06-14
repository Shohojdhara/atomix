import { useState, useRef, useEffect, useCallback } from 'react';
import { DROPDOWN } from '../constants/components';
import type { DropdownPlacement, DropdownTrigger } from '../types/components';

interface UseDropdownProps {
  placement?: DropdownPlacement;
  trigger?: DropdownTrigger;
  offset?: number;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  id?: string;
}

interface UseDropdownReturn {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
  menuRef: React.RefObject<HTMLElement>;
  dropdownId: string;
  currentPlacement: DropdownPlacement;
  updatePosition: () => void;
}

/**
 * Hook for managing dropdown state and position
 */
export const useDropdown = ({
  placement = DROPDOWN.DEFAULTS.PLACEMENT as DropdownPlacement,
  trigger = DROPDOWN.DEFAULTS.TRIGGER as DropdownTrigger,
  offset = DROPDOWN.DEFAULTS.OFFSET,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  id
}: UseDropdownProps): UseDropdownReturn => {
  // Generate unique ID for the dropdown menu
  const uniqueId = useRef(`dropdown-${id || Math.random().toString(36).substring(2, 9)}`);

  // Setup controlled vs uncontrolled state
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);

  // Use either controlled or uncontrolled state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;

  // Callback to update open state with notification to parent
  const setIsOpen = useCallback((nextIsOpen: boolean) => {
    if (controlledIsOpen === undefined) {
      setUncontrolledIsOpen(nextIsOpen);
    }

    if (onOpenChange) {
      onOpenChange(nextIsOpen);
    }
  }, [controlledIsOpen, onOpenChange]);

  // Refs for trigger and dropdown menu elements
  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  // Current placement state
  const [currentPlacement, setCurrentPlacement] = useState(placement);

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnClickOutside, setIsOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return undefined;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, closeOnEscape, setIsOpen]);

  // Helper function to get the flipped placement if needed
  const getFlippedPlacement = useCallback((
    placement: DropdownPlacement, 
    triggerRect: DOMRect, 
    menuRect: DOMRect, 
    offset: number
  ): DropdownPlacement => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Start with the requested placement
    let newPlacement = placement;

    // Flip vertical placement if needed
    if (placement.startsWith('bottom') && triggerRect.bottom + menuRect.height + offset > viewportHeight) {
      newPlacement = placement.replace('bottom', 'top') as DropdownPlacement;
    } else if (placement.startsWith('top') && triggerRect.top - menuRect.height - offset < 0) {
      newPlacement = placement.replace('top', 'bottom') as DropdownPlacement;
    }

    // Flip horizontal placement if needed
    if (placement.startsWith('left') && triggerRect.left - menuRect.width - offset < 0) {
      newPlacement = placement.replace('left', 'right') as DropdownPlacement;
    } else if (placement.startsWith('right') && triggerRect.right + menuRect.width + offset > viewportWidth) {
      newPlacement = placement.replace('right', 'left') as DropdownPlacement;
    }

    // Adjust alignment for top/bottom placements
    if ((newPlacement.startsWith('top') || newPlacement.startsWith('bottom'))) {
      if (newPlacement.endsWith('start') && triggerRect.left + menuRect.width > viewportWidth) {
        newPlacement = newPlacement.replace('start', 'end') as DropdownPlacement;
      } else if (newPlacement.endsWith('end') && triggerRect.right - menuRect.width < 0) {
        newPlacement = newPlacement.replace('end', 'start') as DropdownPlacement;
      }
    }

    return newPlacement;
  }, []);

  // Helper function to calculate position based on placement
  const calculatePosition = useCallback((
    placement: DropdownPlacement, 
    triggerRect: DOMRect, 
    menuRect: DOMRect, 
    offset: number
  ): { top: number; left: number } => {
    let top = 0;
    let left = 0;

    // Vertical positioning
    if (placement.startsWith('bottom')) {
      top = triggerRect.height + offset;
    } else if (placement.startsWith('top')) {
      top = -menuRect.height - offset;
    } else if (placement.startsWith('left') || placement.startsWith('right')) {
      top = (triggerRect.height / 2) - (menuRect.height / 2);
    }

    // Horizontal positioning
    if (placement.startsWith('left')) {
      left = -menuRect.width - offset;
    } else if (placement.startsWith('right')) {
      left = triggerRect.width + offset;
    } else if (placement.endsWith('start')) {
      left = 0;
    } else if (placement.endsWith('end')) {
      left = triggerRect.width - menuRect.width;
    } else {
      left = (triggerRect.width / 2) - (menuRect.width / 2);
    }

    return { top, left };
  }, []);

  // Calculate and update dropdown position
  const updatePosition = useCallback(() => {
    if (!isOpen || !triggerRef.current || !menuRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();

    // Get the optimal placement
    const newPlacement = getFlippedPlacement(placement, triggerRect, menuRect, offset);

    // Calculate position based on the new placement
    const { top, left } = calculatePosition(newPlacement, triggerRect, menuRect, offset);

    // Apply position
    menuRef.current.style.position = 'absolute';
    menuRef.current.style.top = `${top}px`;
    menuRef.current.style.left = `${left}px`;

    // Update placement state if it changed
    if (newPlacement !== currentPlacement) {
      setCurrentPlacement(newPlacement);
    }
  }, [isOpen, offset, placement, currentPlacement, getFlippedPlacement, calculatePosition]);

  // Update position when menu is opened
  useEffect(() => {
    if (!isOpen) return undefined;

    // Initial position update
    updatePosition();

    // Use ResizeObserver to detect size changes in the menu
    let resizeObserver: ResizeObserver | null = null;
    if (menuRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(updatePosition);
      });
      resizeObserver.observe(menuRef.current);
    }

    // Update position on resize/scroll
    const handleResize = () => {
      requestAnimationFrame(updatePosition);
    };

    const handleScroll = () => {
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Fallback for browsers without ResizeObserver or for dynamic content changes
    // Use a less frequent interval (500ms instead of 200ms)
    const intervalId = window.setInterval(updatePosition, 500);

    return () => {
      if (resizeObserver && menuRef.current) {
        resizeObserver.unobserve(menuRef.current);
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.clearInterval(intervalId);
    };
  }, [isOpen, updatePosition]);

  return {
    isOpen,
    setIsOpen,
    triggerRef,
    menuRef,
    dropdownId: uniqueId.current,
    currentPlacement,
    updatePosition
  };
}; 
