import { useState, useRef, useEffect, RefObject, useCallback } from 'react';

export type TooltipPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type TooltipTrigger = 'click' | 'hover';

interface UseTooltipProps {
  position?: TooltipPosition;
  trigger?: TooltipTrigger;
  offset?: number;
  delay?: number;
}

interface TooltipStyles {
  tooltip: React.CSSProperties;
  arrow: React.CSSProperties;
}

interface UseTooltipResult {
  isVisible: boolean;
  isPositioned: boolean;
  tooltipId: string;
  triggerRef: RefObject<HTMLDivElement>;
  tooltipRef: RefObject<HTMLDivElement>;
  tooltipStyle: React.CSSProperties;
  arrowStyle: React.CSSProperties;
  showTooltip: () => void;
  hideTooltip: () => void;
  toggleTooltip: () => void;
  triggerProps: React.HTMLAttributes<HTMLDivElement>;
  wrapperProps: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * Calculate tooltip and arrow positions based on trigger and tooltip dimensions
 */
const calculateTooltipPosition = (
  position: TooltipPosition,
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  wrapperRect: DOMRect,
  offset: number,
  arrowSize: number
): TooltipStyles => {
  const tooltipWidth = tooltipRect.width || 0;
  const tooltipHeight = tooltipRect.height || 0;
  const triggerWidth = triggerRect.width;
  const triggerHeight = triggerRect.height;

  const tooltipStyle: React.CSSProperties = {
    '--atomix-tooltip-offset': `${offset}px`,
  } as React.CSSProperties;

  const arrowStyle: React.CSSProperties = {};

  switch (position) {
    case 'top':
      tooltipStyle.top = `${triggerRect.top - wrapperRect.top - tooltipHeight - offset}px`;
      tooltipStyle.left = `${triggerRect.left - wrapperRect.left + triggerWidth / 2 - tooltipWidth / 2}px`;
      arrowStyle.bottom = `${arrowSize / -2}px`;
      arrowStyle.left = `${tooltipWidth / 2 - arrowSize / 2}px`;
      break;

    case 'bottom':
      tooltipStyle.top = `${triggerRect.bottom - wrapperRect.top + offset}px`;
      tooltipStyle.left = `${triggerRect.left - wrapperRect.left + triggerWidth / 2 - tooltipWidth / 2}px`;
      arrowStyle.top = `${arrowSize / -2}px`;
      arrowStyle.left = `${tooltipWidth / 2 - arrowSize / 2}px`;
      break;

    case 'left':
      tooltipStyle.right = `${wrapperRect.right - triggerRect.left + offset}px`;
      tooltipStyle.top = `${triggerRect.top - wrapperRect.top + triggerHeight / 2 - tooltipHeight / 2}px`;
      arrowStyle.right = `${arrowSize / -2}px`;
      arrowStyle.top = `${tooltipHeight / 2 - arrowSize / 2}px`;
      break;

    case 'right':
      tooltipStyle.left = `${triggerRect.right - wrapperRect.left + offset}px`;
      tooltipStyle.top = `${triggerRect.top - wrapperRect.top + triggerHeight / 2 - tooltipHeight / 2}px`;
      arrowStyle.left = `${arrowSize / -2}px`;
      arrowStyle.top = `${tooltipHeight / 2 - arrowSize / 2}px`;
      break;

    case 'top-left':
      tooltipStyle.bottom = `${wrapperRect.bottom - triggerRect.top + offset}px`;
      tooltipStyle.left = `${triggerRect.left - wrapperRect.left}px`;
      arrowStyle.bottom = `${arrowSize / -2}px`;
      arrowStyle.left = `${arrowSize}px`;
      break;

    case 'top-right':
      tooltipStyle.bottom = `${wrapperRect.bottom - triggerRect.top + offset}px`;
      tooltipStyle.right = `${wrapperRect.right - triggerRect.right}px`;
      arrowStyle.bottom = `${arrowSize / -2}px`;
      arrowStyle.right = `${arrowSize}px`;
      break;

    case 'bottom-left':
      tooltipStyle.top = `${triggerRect.bottom - wrapperRect.top + offset}px`;
      tooltipStyle.left = `${triggerRect.left - wrapperRect.left}px`;
      arrowStyle.top = `${arrowSize / -2}px`;
      arrowStyle.left = `${arrowSize}px`;
      break;

    case 'bottom-right':
      tooltipStyle.top = `${triggerRect.bottom - wrapperRect.top + offset}px`;
      tooltipStyle.right = `${wrapperRect.right - triggerRect.right}px`;
      arrowStyle.top = `${arrowSize / -2}px`;
      arrowStyle.right = `${arrowSize}px`;
      break;
  }

  return { tooltip: tooltipStyle, arrow: arrowStyle };
};

/**
 * Get arrow size from CSS custom property
 */
const getArrowSize = (element: HTMLElement): number => {
  const arrowSizeValue = getComputedStyle(element)
    .getPropertyValue('--atomix-tooltip-arrow-size')
    .trim();

  if (!arrowSizeValue) return 8; // Default fallback

  // Try to parse as rem (e.g., "0.5rem")
  const remMatch = arrowSizeValue.match(/([\d.]+)rem/);
  if (remMatch?.[1]) {
    return parseFloat(remMatch[1]) * 16; // Convert rem to px
  }

  // Try to parse as px (e.g., "8px")
  const pxMatch = arrowSizeValue.match(/([\d.]+)px/);
  if (pxMatch?.[1]) {
    return parseFloat(pxMatch[1]);
  }

  return 8; // Default fallback
};

/**
 * Hook for managing tooltip state and positioning logic
 */
export const useTooltip = ({
  position = 'top',
  trigger = 'hover',
  offset = 10,
  delay = 200,
}: UseTooltipProps): UseTooltipResult => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipId = `tooltip-${Math.random().toString(36).slice(2, 11)}`;

  const showTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
    setIsPositioned(false);
  }, []);

  const toggleTooltip = useCallback(() => {
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  }, [isVisible, showTooltip, hideTooltip]);

  // Calculate and update tooltip position
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const wrapperElement = triggerRef.current.parentElement;

    if (!wrapperElement) return;

    const wrapperRect = wrapperElement.getBoundingClientRect();
    const arrowSize = getArrowSize(tooltipRef.current);

    const styles = calculateTooltipPosition(
      position,
      triggerRect,
      tooltipRect,
      wrapperRect,
      offset,
      arrowSize
    );

    setTooltipStyle(styles.tooltip);
    setArrowStyle(styles.arrow);
    setIsPositioned(true);
  }, [position, offset]);

  // Position tooltip when visible
  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) {
      return;
    }

    // Use single RAF to ensure tooltip is rendered before calculating
    const rafId = requestAnimationFrame(() => {
      updatePosition();
    });

    // Recalculate on window resize and scroll
    const handleUpdate = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
    };
  }, [isVisible, updatePosition]);

  // Setup trigger props
  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {
    'aria-describedby': isVisible ? tooltipId : undefined,
  };

  const wrapperProps: React.HTMLAttributes<HTMLDivElement> = {};

  if (trigger === 'hover') {
    wrapperProps.onMouseEnter = showTooltip;
    wrapperProps.onMouseLeave = hideTooltip;
    triggerProps.onFocus = showTooltip;
    triggerProps.onBlur = hideTooltip;
  } else if (trigger === 'click') {
    triggerProps.onClick = toggleTooltip;
  }

  return {
    isVisible,
    isPositioned,
    tooltipId,
    triggerRef,
    tooltipRef,
    tooltipStyle,
    arrowStyle,
    showTooltip,
    hideTooltip,
    toggleTooltip,
    triggerProps,
    wrapperProps,
  };
};

export default useTooltip;
