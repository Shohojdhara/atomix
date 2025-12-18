import React, { ReactNode } from 'react';
import { TOOLTIP } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { AtomixGlassProps } from '../../lib/types/components';
import { useTooltip, type TooltipPosition, type TooltipTrigger } from '../../lib/composables/useTooltip';

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
  const {
    isVisible,
    isPositioned,
    tooltipId,
    triggerRef,
    tooltipRef,
    tooltipStyle,
    arrowStyle,
    triggerProps,
    wrapperProps,
  } = useTooltip({
    position: position as   TooltipPosition,
    trigger: trigger as TooltipTrigger,
    offset,
    delay,
  });

  const getTooltipPositionClasses = () => {
    const positionMap: Record<string, string> = {
      top: 'c-tooltip--top',
      bottom: 'c-tooltip--bottom',
      left: 'c-tooltip--left',
      right: 'c-tooltip--right',
      'top-left': 'c-tooltip--top-left',
      'top-right': 'c-tooltip--top-right',
      'bottom-left': 'c-tooltip--bottom-left',
      'bottom-right': 'c-tooltip--bottom-right',
    };
    return positionMap[position] || 'c-tooltip--top';
  };

  const renderContent = () => {
    const contentElement = (
      <div
        className={`c-tooltip__content ${TOOLTIP.SELECTORS.CONTENT.substring(1)} ${isVisible && isPositioned && 'is-active'}`}
      >
        <span 
          className={TOOLTIP.SELECTORS.ARROW.substring(1)}
          style={arrowStyle}
        ></span>
        {content}
      </div>
    );

    if (glass) {
      const defaultGlassProps = {
        displacementScale: 100,
        blurAmount: 3,
      };

      const glassProps =
        glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      return <AtomixGlass {...glassProps}>{contentElement}</AtomixGlass>;
    }

    return contentElement;
  };

  return (
    <div
      className="u-position-relative u-d-inline-block"
      style={style}
      {...wrapperProps}
    >
      <div
        ref={triggerRef}
        className={`${TOOLTIP.SELECTORS.TRIGGER.substring(1)}${className ? ` ${className}` : ''}`}
        {...triggerProps}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={`c-tooltip ${TOOLTIP.SELECTORS.TOOLTIP.substring(1)} ${getTooltipPositionClasses()} ${glass ? 'c-tooltip--glass' : ''}`}
          data-tooltip-position={position}
          data-tooltip-trigger={trigger}
          style={{
            ...tooltipStyle,
            // Position off-screen initially to prevent jump, then move to calculated position
            ...(isPositioned ? {} : { left: '-9999px', top: '-9999px' }),
          }}
        >
          {renderContent()}
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
