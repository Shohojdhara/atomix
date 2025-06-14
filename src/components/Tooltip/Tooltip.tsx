import React, { ReactNode, useRef, useEffect } from 'react';
import { TOOLTIP } from '../../lib/constants/components';
import { Tooltip as TooltipClass } from './scripts';

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
   * Delay before showing the tooltip (in milliseconds)
   */
  delay?: number;

  /**
   * Offset from the trigger element (in pixels)
   */
  offset?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = TOOLTIP.DEFAULTS.POSITION,
  trigger = TOOLTIP.DEFAULTS.TRIGGER,
  className = '',
  delay = TOOLTIP.DEFAULTS.DELAY,
  offset = TOOLTIP.DEFAULTS.OFFSET,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipInstance = useRef<any>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      // Initialize tooltip
      tooltipInstance.current = new TooltipClass(tooltipRef.current, {
        position,
        trigger,
        delay,
        offset,
      });
    }

    // Cleanup on unmount
    return () => {
      if (tooltipInstance.current) {
        tooltipInstance.current.destroy();
      }
    };
  }, [position, trigger, delay, offset]);

  return (
    <div className="u-position-relative u-d-inline-block">
      <div
        className={`${TOOLTIP.SELECTORS.TRIGGER.substring(1)}${className ? ` ${className}` : ''}`}
      >
        {children}
      </div>
      <div
        className={`c-tooltip ${TOOLTIP.SELECTORS.TOOLTIP.substring(1)}`}
        ref={tooltipRef}
        data-tooltip-position={position}
        data-tooltip-trigger={trigger}
      >
        <div className={`c-tooltip__content ${TOOLTIP.SELECTORS.CONTENT.substring(1)}`}>
          <span className={TOOLTIP.SELECTORS.ARROW.substring(1)}></span>
          {content}
        </div>
      </div>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
