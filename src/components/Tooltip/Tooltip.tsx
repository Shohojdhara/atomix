import React, { ReactNode, useRef, useState } from 'react';
import { TOOLTIP } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { AtomixGlassProps } from '../../lib/types/components';

export interface TooltipProps {
  /**
   * Content to be displayed in the tooltip
   */
  content: ReactNode;

  /**
   * The element that will trigger the tooltip
   */
  children: ReactNode;

  /**
   * The position of the tooltip relative to the trigger
   */
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

  /**
   * How the tooltip is triggered
   */
  trigger?: 'hover' | 'click';

  /**
   * Additional CSS class for the tooltip
   */
  className?: string;

  /**
   * Inline style for the component
   */
  style?: React.CSSProperties;

  /**
   * Delay before showing the tooltip (in milliseconds)
   */
  delay?: number;

  /**
   * Offset from the trigger element (in pixels)
   */
  offset?: number;

  /**
   * Glass morphism effect for the tooltip
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = TOOLTIP.DEFAULTS.POSITION,
  trigger = TOOLTIP.DEFAULTS.TRIGGER,
  className = '',
  style,
  delay = TOOLTIP.DEFAULTS.DELAY,
  offset = TOOLTIP.DEFAULTS.OFFSET,
  glass,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
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
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const toggleTooltip = () => {
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  };

  const getTooltipPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'c-tooltip--top';
      case 'bottom':
        return 'c-tooltip--bottom';
      case 'left':
        return 'c-tooltip--left';
      case 'right':
        return 'c-tooltip--right';
      case 'top-left':
        return 'c-tooltip--top-left';
      case 'top-right':
        return 'c-tooltip--top-right';
      case 'bottom-left':
        return 'c-tooltip--bottom-left';
      case 'bottom-right':
        return 'c-tooltip--bottom-right';
      default:
        return 'c-tooltip--top';
    }
  };

  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {};

  if (trigger === 'hover') {
    triggerProps.onMouseEnter = showTooltip;
    triggerProps.onMouseLeave = hideTooltip;
  } else if (trigger === 'click') {
    triggerProps.onClick = toggleTooltip;
  }

  return (
    <div className="u-position-relative u-d-inline-block" style={style}>
      <div
        className={`${TOOLTIP.SELECTORS.TRIGGER.substring(1)}${className ? ` ${className}` : ''}`}
        {...triggerProps}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={`c-tooltip ${TOOLTIP.SELECTORS.TOOLTIP.substring(1)} ${getTooltipPositionClasses()} ${glass ? 'c-tooltip--glass' : ''}`}
          data-tooltip-position={position}
          data-tooltip-trigger={trigger}
        >
          {glass ? (
            // Default glass settings for tooltips
            (() => {
              const defaultGlassProps = {
                displacementScale: 40,
                blurAmount: 1,
                saturation: 160,
                aberrationIntensity: 0.3,
                cornerRadius: 6,
                mode: 'shader' as const,
              };

              const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

              return (
                <AtomixGlass {...glassProps}>
                  <div
                    className={`c-tooltip__content ${TOOLTIP.SELECTORS.CONTENT.substring(1)} ${isVisible && 'is-active'}`}
                  >
                    <span className={TOOLTIP.SELECTORS.ARROW.substring(1)}></span>
                    {content}
                  </div>
                </AtomixGlass>
              );
            })()
          ) : (
            <div
              className={`c-tooltip__content ${TOOLTIP.SELECTORS.CONTENT.substring(1)} ${isVisible && 'is-active'}`}
            >
              <span className={TOOLTIP.SELECTORS.ARROW.substring(1)}></span>
              {content}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
