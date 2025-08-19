import { forwardRef, memo, useState } from 'react';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from './types';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';
import ChartTooltip from './ChartTooltip';

export interface ScatterDataPoint {
  label: string;
  value: number;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
}

interface ScatterChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Scatter chart specific options
   */
  scatterOptions?: {
    /**
     * Point radius
     */
    pointRadius?: number;
    
    /**
     * Whether to show point labels
     */
    showLabels?: boolean;
    
    /**
     * Enable hover effects
     */
    enableHoverEffects?: boolean;
  };
}

const ScatterChart = memo(
  forwardRef<HTMLDivElement, ScatterChartProps>(
    (
      {
        datasets = [],
        config = {},
        scatterOptions = {
          pointRadius: 4,
          showLabels: false,
          enableHoverEffects: true,
        },
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const [hoveredPoint, setHoveredPoint] = useState<{
        datasetIndex: number;
        pointIndex: number;
        clientX: number;
        clientY: number;
      } | null>(null);
      return (
        <Chart
          ref={ref}
          type="scatter"
          datasets={datasets}
          config={config}
          {...props}
        >
          <ChartRenderer
            datasets={datasets}
            config={config}
            interactive={scatterOptions.enableHoverEffects}
            renderContent={({ scales, colors, datasets: renderedDatasets }) => {
              if (!renderedDatasets.length) return null;

              const points = [];

              renderedDatasets.forEach((dataset, datasetIndex) => {
                const color = dataset.color || colors[datasetIndex % colors.length];

                dataset.data?.forEach((point, pointIndex) => {
                  const x = point.x !== undefined 
                    ? scales.padding.left + (point.x / 100) * scales.innerWidth
                    : scales.xScale(pointIndex, dataset.data?.length);
                  
                  const y = point.y !== undefined
                    ? scales.padding.top + scales.innerHeight - (point.y / 100) * scales.innerHeight
                    : scales.yScale(point.value);

                  points.push(
                    <g key={`point-${datasetIndex}-${pointIndex}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r={point.size || scatterOptions.pointRadius || 4}
                        fill={point.color || color}
                        className="c-chart__scatter-point"
                        onClick={() => onDataPointClick?.(point, datasetIndex, pointIndex)}
                        onMouseEnter={(e) => {
                          if (scatterOptions.enableHoverEffects) {
                            e.currentTarget.setAttribute('r', String((point.size || scatterOptions.pointRadius || 4) * 1.5));
                            const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                            const clientX = rect ? rect.left + x : e.clientX;
                            const clientY = rect ? rect.top + y : e.clientY;
                            setHoveredPoint({ datasetIndex, pointIndex, clientX, clientY });
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.setAttribute('r', String(point.size || scatterOptions.pointRadius || 4));
                          setHoveredPoint(null);
                        }}
                      />
                      
                      {scatterOptions.showLabels && (
                        <text
                          x={x}
                          y={y - (scatterOptions.pointRadius || 4) - 5}
                          textAnchor="middle"
                          className="c-chart__scatter-label"
                        >
                          {point.label}
                        </text>
                      )}
                    </g>
                  );
                });
              });

              return <>{points}</>;
            }}
          />
          {hoveredPoint && (
            <ChartTooltip
              dataPoint={datasets[hoveredPoint.datasetIndex]?.data?.[hoveredPoint.pointIndex]}
              datasetLabel={datasets[hoveredPoint.datasetIndex]?.label}
              datasetColor={datasets[hoveredPoint.datasetIndex]?.color}
              position={{ x: hoveredPoint.clientX, y: hoveredPoint.clientY }}
              visible={true}
            />
          )}
        </Chart>
      );
    }
  )
);

ScatterChart.displayName = 'ScatterChart';
export default ScatterChart;
export type { ScatterChartProps, ScatterDataPoint };