import React, { ReactNode, forwardRef, createContext } from 'react';
import { createPortal } from 'react-dom';
import { POPOVER } from '../../lib/constants/components';
import { usePopover } from '../../lib/composables/usePopover';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import type { PopoverProps, PopoverTriggerProps } from '../../lib/types/components';

// Context to share popover state between components
export const PopoverContext = createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  popoverId: string;
  triggerType: 'click' | 'hover';
}>({
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: { current: null },
  popoverId: '',
  triggerType: 'click',
});

/**
 * Popover component for displaying floating content
 */
export const Popover: React.FC<PopoverProps> = ({
  content,
  position = 'top',
  trigger = 'click',
  className = '',
  style,
  delay = 0,
  offset = 12,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  id,
  children,
  glass,
}) => {
  const {
    isOpen,
    setIsOpen,
    triggerRef,
    popoverRef,
    arrowRef,
    popoverId,
    currentPosition,
    updatePosition,
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
    id,
  });

  return (
    <PopoverContext.Provider
      value={{ isOpen, setIsOpen, triggerRef, popoverId, triggerType: trigger }}
    >
      {children}

      {typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={popoverRef}
            className={`c-popover c-popover--${currentPosition} ${isOpen ? POPOVER.CLASSES.IS_OPEN : ''} ${glass ? 'c-popover--glass' : ''} ${className}`}
            style={style}
            id={popoverId}
            role="tooltip"
            aria-hidden={!isOpen}
          >
            {glass ? (
              // Default glass settings for popovers
              (() => {
                const defaultGlassProps = {
                  displacementScale: 50,
                  blurAmount: 1,
                  saturation: 160,
                  aberrationIntensity: 0.5,
                  cornerRadius: 8,
                  mode: 'shader' as const,
                };

                const glassProps =
                  glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

                return (
                  <AtomixGlass {...glassProps}>
                    <div className="c-popover__content">
                      <div className="c-popover__content-inner">{content}</div>
                    </div>
                  </AtomixGlass>
                );
              })()
            ) : (
              <div className="c-popover__content">
                <div className="c-popover__content-inner">{content}</div>
              </div>
            )}
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
export const PopoverTrigger: React.FC<PopoverTriggerProps> = forwardRef<
  HTMLElement,
  PopoverTriggerProps
>(({ children, trigger: triggerProp }, ref) => {
  const { isOpen, setIsOpen, triggerRef, popoverId, triggerType } =
    React.useContext(PopoverContext);

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
    ref: ref || triggerRef,
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
});

export type { PopoverProps, PopoverTriggerProps };

Popover.displayName = 'Popover';

export default Popover;
