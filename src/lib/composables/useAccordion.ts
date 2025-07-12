import { AccordionProps, AccordionState, IconPosition, ElementRefs } from '../types/components';
import { useState, useEffect, useRef } from 'react';
import { ACCORDION } from '../constants/components';

/**
 * Accordion functionality hook result
 */
interface UseAccordionResult {
  /** Current accordion state */
  state: AccordionState;
  /** Toggle the accordion open/closed */
  toggle: () => void;
  /** Update the panel height based on content */
  updatePanelHeight: () => void;
  /** Reference to the panel element */
  panelRef: React.RefObject<HTMLDivElement | null>;
  /** Reference to the content element */
  contentRef: React.RefObject<HTMLDivElement | null>;
  /** Generate accordion class names based on state */
  generateClassNames: (baseClassName?: string) => string;
  /** Generate header class names */
  generateHeaderClassNames: () => string;
}

/**
 * Accordion functionality hook
 * @param initialProps - Initial accordion properties
 * @returns Accordion state and methods
 */
export function useAccordion(
  initialProps?: Partial<AccordionProps> & {
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
): UseAccordionResult {
  // Default accordion properties
  const defaultProps: Partial<AccordionProps> & {
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  } = {
    defaultOpen: false,
    disabled: false,
    iconPosition: 'right' as IconPosition,
    ...initialProps,
  };

  // Controlled/uncontrolled open state
  const isControlled = typeof defaultProps.isOpen === 'boolean';
  const [internalOpen, setInternalOpen] = useState(defaultProps.defaultOpen || false);
  const isOpen = isControlled ? defaultProps.isOpen! : internalOpen;

  const [panelHeight, setPanelHeight] = useState<string>(isOpen ? 'auto' : '0px');

  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /**
   * Toggle accordion open/closed state
   */
  const toggle = (): void => {
    if (!defaultProps.disabled) {
      if (isControlled) {
        defaultProps.onOpenChange && defaultProps.onOpenChange(!isOpen);
      } else {
        setInternalOpen(prev => !prev);
      }
    }
  };

  /**
   * Update panel height based on content
   */
  const updatePanelHeight = (): void => {
    if (contentRef.current && panelRef.current) {
      const height = isOpen ? `${contentRef.current.clientHeight}px` : '0px';
      panelRef.current.style.setProperty(ACCORDION.CSS_VARS.PANEL_HEIGHT, height);
      setPanelHeight(height);
    }
  };

  /**
   * Effect to update panel height when open state changes
   */
  useEffect(() => {
    updatePanelHeight();
  }, [isOpen]);

  /**
   * Effect to handle window resize and update panel height
   */
  useEffect(() => {
    const handleResize = (): void => {
      if (isOpen) {
        updatePanelHeight();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  /**
   * Generate accordion class names based on state
   */
  const generateClassNames = (baseClassName: string = ''): string => {
    const openClass = isOpen ? ACCORDION.CLASSES.IS_OPEN : '';
    const disabledClass = defaultProps.disabled ? ACCORDION.CLASSES.IS_DISABLED : '';
    return `c-accordion ${openClass} ${disabledClass} ${baseClassName}`.trim();
  };

  /**
   * Generate header class names
   */
  const generateHeaderClassNames = (): string => {
    const iconPositionClass =
      defaultProps.iconPosition === 'left' ? 'c-accordion__header--icon-left' : '';
    return `c-accordion__header ${iconPositionClass}`.trim();
  };

  return {
    state: { isOpen, panelHeight },
    toggle,
    updatePanelHeight,
    panelRef,
    contentRef,
    generateClassNames,
    generateHeaderClassNames,
  };
}
