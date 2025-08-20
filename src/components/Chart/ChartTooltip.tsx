import { memo, useEffect, useRef, useState } from 'react';
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

      let newX = position.x + 8;
      let newY = position.y - rect.height;

      // Adjust horizontal position
      if (newX + rect.width > viewport.width - 16) {
        newX = position.x - rect.width - 8;
      }

      // Adjust vertical position
      if (newY < 8) {
        newY = position.y + 8;
      }

      // Ensure tooltip doesn't go off-screen
      newX = Math.max(8, Math.min(newX, viewport.width - rect.width - 8));
      newY = Math.max(8, Math.min(newY, viewport.height - rect.height - 8));

      setAdjustedPosition({ x: newX, y: newY });
    }, [position, visible]);

    if (!visible) return null;

    return (
      <div
        ref={tooltipRef}
        className="c-chart__tooltip"
        style={{
          left: adjustedPosition.x,
          top: adjustedPosition.y,
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
                  <div
                    className="c-chart__tooltip-color-indicator"
                    style={{ backgroundColor: datasetColor }}
                  />
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
      </div>
    );
  }
);

ChartTooltip.displayName = 'ChartTooltip';
export default ChartTooltip;
export type { ChartTooltipProps, TooltipPosition };
