import { forwardRef, memo, useState } from 'react';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { ChartProps } from './types';

export interface BubbleDataPoint {
  label: string;
  x: number;
  y: number;
  size: number;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

export interface BubbleChartProps extends Omit<ChartProps, 'type' | 'datasets'> {
  /**
   * Bubble chart data
   */
  bubbleData: BubbleDataPoint[];

  /**
   * Bubble chart specific options
   */
  bubbleOptions?: {
    /**
     * Minimum bubble size
     */
    minBubbleSize?: number;
    /**
     * Maximum bubble size
     */
    maxBubbleSize?: number;
    /**
     * Bubble opacity
     */
    bubbleOpacity?: number;
    /**
     * Whether to show bubble labels
     */
    showLabels?: boolean;
    /**
     * Label position relative to bubble
     */
    labelPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
    /**
     * Whether to enable bubble animations
     */
    enableAnimations?: boolean;
    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;
    /**
     * Whether to show size legend
     */
    showSizeLegend?: boolean;
    /**
     * Size legend title
     */
    sizeLegendTitle?: string;
    /**
     * Color scheme for bubbles
     */
    colorScheme?: string[];
    /**
     * Whether to use size-based coloring
     */
    sizeBasedColoring?: boolean;
  };
}

const BubbleChart = memo(
  forwardRef<HTMLDivElement, BubbleChartProps>(
    ({ bubbleData = [], config = {}, bubbleOptions = {}, onDataPointClick, ...props }, ref) => {
      const {
        minBubbleSize = 5,
        maxBubbleSize = 50,
        bubbleOpacity = 0.7,
        showLabels = true,
        labelPosition = 'center',
        enableAnimations = true,
        animationDuration = 1000,
        showSizeLegend = true,
        sizeLegendTitle = 'Size',
        colorScheme = [
          'var(--atomix-primary)',
          'var(--atomix-secondary)',
          'var(--atomix-success)',
          'var(--atomix-warning)',
          'var(--atomix-error)',
          'var(--atomix-info)',
        ],
        sizeBasedColoring = false,
      } = bubbleOptions;

      const datasets = [
        {
          label: 'Bubbles',
          data: bubbleData,
        },
      ];

      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
        toolbarState,
        config: renderConfig,
      }: any) => {
        if (!bubbleData.length) return null;

        // Use toolbar state if available, fallback to config for backward compatibility
        const showTooltips = toolbarState?.showTooltips ?? renderConfig?.showTooltips ?? true;

        // Calculate bubble sizes based on data
        const sizeValues = bubbleData.map(b => b.size);
        const minSize = Math.min(...sizeValues);
        const maxSize = Math.max(...sizeValues);
        const sizeRange = maxSize - minSize || 1; // Avoid division by zero

        const bubbles = bubbleData.map((bubble, index) => {
          // Calculate scaled size
          const scaledSize =
            minBubbleSize + ((bubble.size - minSize) / sizeRange) * (maxBubbleSize - minBubbleSize);

          // Calculate position
          const x = scales.padding.left + (bubble.x / 100) * scales.innerWidth;
          const y = scales.padding.top + scales.innerHeight - (bubble.y / 100) * scales.innerHeight;

          // Determine color
          let bubbleColor = bubble.color;
          if (!bubbleColor) {
            if (sizeBasedColoring) {
              // Color based on size
              const colorIndex = Math.floor(
                (colorScheme.length - 1) * ((bubble.size - minSize) / sizeRange)
              );
              bubbleColor = colorScheme[colorIndex];
            } else {
              // Use color scheme cyclically
              bubbleColor = colorScheme[index % colorScheme.length];
            }
          }

          const isHovered = hoveredPoint?.pointIndex === index;

          return (
            <g key={`bubble-${index}`}>
              <circle
                cx={x}
                cy={y}
                r={scaledSize}
                fill={bubbleColor}
                opacity={bubbleOpacity}
                className={`c-chart__bubble ${isHovered ? 'c-chart__bubble--hovered' : ''}`}
                style={enableAnimations ? { transition: `all ${animationDuration}ms ease` } : {}}
                onClick={() => handlers.onDataPointClick?.(bubble, 0, index)}
                onMouseEnter={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handlers.onPointHover(
                    0,
                    index,
                    x,
                    y,
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2
                  );
                }}
                onMouseLeave={handlers.onPointLeave}
              />
              {showLabels && (
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline={
                    labelPosition === 'center'
                      ? 'middle'
                      : labelPosition === 'top'
                        ? 'text-before-edge'
                        : 'text-after-edge'
                  }
                  className="c-chart__bubble-label"
                >
                  {bubble.label}
                </text>
              )}
            </g>
          );
        });

        return (
          <>
            {bubbles}
            {showTooltips &&
              hoveredPoint &&
              hoveredPoint.pointIndex < bubbleData.length &&
              bubbleData[hoveredPoint.pointIndex] && (
                <ChartTooltip
                  dataPoint={bubbleData[hoveredPoint.pointIndex]!}
                  datasetLabel="Bubbles"
                  datasetColor={
                    bubbleData[hoveredPoint.pointIndex]?.color ||
                    colorScheme[hoveredPoint.pointIndex % colorScheme.length]
                  }
                  position={{
                    x: hoveredPoint.clientX,
                    y: hoveredPoint.clientY,
                  }}
                  visible={true}
                />
              )}
          </>
        );
      };

      return (
        <BaseChart
          ref={ref}
          type="bubble"
          datasets={datasets as any}
          config={config}
          renderContent={renderContent}
          onDataPointClick={onDataPointClick}
          {...props}
        />
      );
    }
  )
);

BubbleChart.displayName = 'BubbleChart';
export default BubbleChart;
