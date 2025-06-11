import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { POPOVER } from '../../lib/constants/components';
import { usePopover } from '../../lib/composables/usePopover';
import type { PopoverProps, PopoverTriggerProps } from '../../lib/types/components';

// Context to share popover state between components
const PopoverContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
  popoverId: string;
  triggerType: 'click' | 'hover';
}>({
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: { current: null },
  popoverId: '',
  triggerType: 'click'
});

/**
 * Popover component for displaying floating content
 */
 const Popover: React.FC<PopoverProps> = ({
  content,
  position = 'top',
  trigger = 'click',
  className = '',
  delay = 0,
  offset = 12,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  id,
  children,
}) => {
  const {
    isOpen,
    setIsOpen,
    triggerRef,
    popoverRef,
    arrowRef,
    popoverId,
    currentPosition,
    updatePosition
  } = usePopover({
    position,
    trigger,
    offset,
    delay,
    defaultOpen,
    isOpen: controlledIsOpen,
    onOpenChange,
    closeOnClickOutside,
    closeOnEscape,
    id
  });
  
  return (
    <PopoverContext.Provider
      value={{ isOpen, setIsOpen, triggerRef, popoverId, triggerType: trigger }}
    >
      {children}
      
      {typeof document !== 'undefined' && createPortal(
        <div
          ref={popoverRef}
          className={`c-popover c-popover--${currentPosition} ${isOpen ? POPOVER.CLASSES.IS_OPEN : ''} ${className}`}
          id={popoverId}
          role="tooltip"
          aria-hidden={!isOpen}
        >
          <div className="c-popover__content">
            <div className="c-popover__content-inner">
              {content}
            </div>
          </div>
          <div ref={arrowRef} className="c-popover__arrow"></div>
        </div>,
        document.body
      )}
    </PopoverContext.Provider>
  );
};

/**
 * PopoverTrigger component to wrap the element that triggers the popover
 */
export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  children,
  trigger: triggerProp,
}) => {
  const { isOpen, setIsOpen, triggerRef, popoverId, triggerType } = React.useContext(PopoverContext);
  
  // Determine which trigger type to use - prop from PopoverTrigger or from context
  const effectiveTrigger = triggerProp || triggerType;
  
  // Handle trigger events
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  
  const handleMouseEnter = () => {
    setIsOpen(true);
  };
  
  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  
  // Clone the children element with additional props
  const child = React.Children.only(children) as React.ReactElement;
  
  const triggerProps: any = {
    ref: triggerRef,
    'aria-describedby': popoverId,
    'aria-expanded': isOpen,
  };
  
  if (effectiveTrigger === 'click') {
    triggerProps.onClick = handleClick;
  } else if (effectiveTrigger === 'hover') {
    triggerProps.onMouseEnter = handleMouseEnter;
    triggerProps.onMouseLeave = handleMouseLeave;
  }
  
  return React.cloneElement(child, triggerProps);
}; 

export type { PopoverProps, PopoverTriggerProps };

// Set display name for debugging
Popover.displayName = 'Popover';

// Default export (primary)
export default Popover;

// Named export for compatibility
export { Popover };