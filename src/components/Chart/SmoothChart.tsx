import { forwardRef, memo, useCallback } from 'react';
import { ChartProps } from '../../lib/types/components';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';

interface SmoothChartProps extends Omit<ChartProps, 'type'> {
  smoothness?: number;
  enableSmartZoom?: boolean;
}

const SmoothChart = memo(
  forwardRef<HTMLDivElement, SmoothChartProps>(
    ({ datasets = [], config = {}, smoothness = 0.4, enableSmartZoom = true, ...props }, ref) => {
      const renderContent = useCallback(
        ({ scales, colors, datasets: renderedDatasets, handlers }) => {
          if (!renderedDatasets.length) return null;

          return renderedDatasets.map((dataset, datasetIndex) => {
            const color = dataset.color || colors[datasetIndex];
            const points =
              dataset.data?.map((point, i) => ({
                x: scales.xScale(i, dataset.data?.length),
                y: scales.yScale(point.value),
              })) || [];

            if (points.length < 2) return null;

            // Generate smooth path
            let path = `M ${points[0].x},${points[0].y}`;

            for (let i = 1; i < points.length; i++) {
              const prev = points[i - 1];
              const curr = points[i];
              const next = points[i + 1];

              if (i === 1) {
                const cp1x = prev.x + (curr.x - prev.x) * smoothness;
                const cp1y = prev.y + (curr.y - prev.y) * smoothness;
                path += ` Q ${cp1x},${cp1y} ${curr.x},${curr.y}`;
              } else if (i === points.length - 1) {
                const cp1x = prev.x + (curr.x - prev.x) * (1 - smoothness);
                const cp1y = prev.y + (curr.y - prev.y) * (1 - smoothness);
                path += ` Q ${cp1x},${cp1y} ${curr.x},${curr.y}`;
              } else {
                const cp1x = prev.x + (curr.x - prev.x) * smoothness;
                const cp1y = prev.y + (curr.y - prev.y) * smoothness;
                const cp2x = curr.x - (next.x - prev.x) * smoothness * 0.5;
                const cp2y = curr.y - (next.y - prev.y) * smoothness * 0.5;
                path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
              }
            }

            return (
              <g key={`smooth-dataset-${datasetIndex}`}>
                <path
                  d={path}
                  stroke={color}
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {dataset.data?.map((point, i) => {
                  const x = scales.xScale(i, dataset.data?.length);
                  const y = scales.yScale(point.value);

                  return (
                    <circle
                      key={`point-${i}`}
                      cx={x}
                      cy={y}
                      r="3"
                      fill={color}
                      stroke="white"
                      strokeWidth="1"
                      onClick={() => handlers.onDataPointClick?.(point, datasetIndex, i)}
                      style={{ cursor: 'pointer' }}
                    />
                  );
                })}
              </g>
            );
          });
        },
        [smoothness]
      );

      return (
        <Chart ref={ref} type="line" datasets={datasets} config={config} {...props}>
          <ChartRenderer
            datasets={datasets}
            config={config}
            renderContent={renderContent}
            interactive
            enableAccessibility
          />
        </Chart>
      );
    }
  )
);

SmoothChart.displayName = 'SmoothChart';
export default SmoothChart;
