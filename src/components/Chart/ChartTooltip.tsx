import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChartDataPoint } from './types';

interface TooltipPosition {
  x: number;
  y: number;
}

interface ChartTooltipProps {
  dataPoint: ChartDataPoint;
  datasetLabel?: string;
  datasetColor?: string;
  position: TooltipPosition;
  visible: boolean;
  customRenderer?: (dataPoint: ChartDataPoint) => React.ReactNode;
}

const ChartTooltip = memo<ChartTooltipProps>(
  ({ dataPoint, datasetLabel, datasetColor, position, visible, customRenderer }) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    // Dynamic positioning to keep tooltip in viewport
    useEffect(() => {
      if (!visible || !tooltipRef.current) return;

      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // Start with the provided position
      let newX = position.x;
      let newY = position.y;

      // Adjust for tooltip size to keep it in view
      if (newX + rect.width > viewport.width - 16) {
        newX = position.x - rect.width - 12;
      } else {
        newX = position.x + 12;
      }

      if (newY + rect.height > viewport.height - 16) {
        newY = position.y - rect.height - 12;
      } else {
        newY = position.y - rect.height / 2;
      }

      // Ensure tooltip doesn't go off-screen
      newX = Math.max(16, Math.min(newX, viewport.width - rect.width - 16));
      newY = Math.max(16, Math.min(newY, viewport.height - rect.height - 16));

      setAdjustedPosition({ x: newX, y: newY });
    }, [position, visible]);

    if (!visible || !dataPoint) return null;

    return createPortal(
      <div
        ref={tooltipRef}
        className="c-chart__tooltip"
        style={{
          left: `${adjustedPosition.x}px`,
          top: `${adjustedPosition.y}px`,
          opacity: visible ? 1 : 0,
          visibility: visible ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          transform: 'translateZ(0)',
          position: 'fixed',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        {customRenderer ? (
          customRenderer(dataPoint)
        ) : (
          <>
            <div className="c-chart__tooltip-title">{dataPoint.label}</div>
            <div className="c-chart__tooltip-content">
              {datasetLabel && (
                <div className="c-chart__tooltip-dataset">
                  {datasetColor && (
                    <div
                      className="c-chart__tooltip-color-indicator"
                      style={{ backgroundColor: datasetColor }}
                    />
                  )}
                  <span className="c-chart__tooltip-dataset-label">{datasetLabel}:</span>
                  <span className="c-chart__tooltip-value">{dataPoint.value}</span>
                </div>
              )}
              {dataPoint.metadata && (
                <div className="c-chart__tooltip-metadata">
                  {Object.entries(dataPoint.metadata).map(([key, value]) => (
                    <div key={key} className="c-chart__tooltip-metadata-item">
                      <span className="c-chart__tooltip-metadata-key">{key}:</span>
                      <span className="c-chart__tooltip-metadata-value">{String(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>,
      document.body
    );
  }
);

ChartTooltip.displayName = 'ChartTooltip';
export default ChartTooltip;
export type { ChartTooltipProps, TooltipPosition };