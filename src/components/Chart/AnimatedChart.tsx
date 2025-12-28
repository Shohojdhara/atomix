import { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import BaseChart from './BaseChart';
import { ChartProps, ChartRenderContentParams } from './types';

export interface AnimatedChartProps extends Omit<ChartProps, 'type'> {
  chartType?: 'line' | 'bar' | 'area';
  animationConfig?: {
    duration?: number;
    easing?: 'ease-out' | 'bounce';
  };
  particleEffects?: {
    enabled: boolean;
    count: number;
    colors: string[];
    speed: number;
    size: number;
  };
}

const AnimatedChart = memo(
  forwardRef<HTMLDivElement, AnimatedChartProps>(
    (
      {
        datasets = [],
        config = {},
        chartType = 'line',
        particleEffects,
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const animationRef = useRef<number>(0);
      const timeRef = useRef(0);
      const particlesRef = useRef<
        Array<{
          x: number;
          y: number;
          vx: number;
          vy: number;
          life: number;
          size: number;
          color: string;
          dataIndex?: number;
        }>
      >([]);

      // Animation time tracking - moved outside callback
      useEffect(() => {
        const animateFrame = (timestamp: number) => {
          timeRef.current = timestamp;
          animationRef.current = requestAnimationFrame(animateFrame);
        };

        animationRef.current = requestAnimationFrame(animateFrame);

        return () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        };
      }, []);

      const renderContent = useCallback(
        ({
          scales,
          colors,
          datasets: chartDatasets,
          handlers,
          hoveredPoint,
          toolbarState,
          config: renderConfig,
        }: ChartRenderContentParams) => {
          const shouldAnimate = toolbarState?.animationsEnabled ?? renderConfig?.animate ?? true;

          if (!chartDatasets.length) return null;

          const padding = 40;
          const chartWidth = scales.width - padding * 2;
          const chartHeight = scales.height - padding * 2;

          // Create animated elements based on chart type
          const elements: React.ReactNode[] = [];

          chartDatasets.forEach((dataset: any, datasetIndex: number) => {
            const color = dataset.color || colors[datasetIndex % colors.length];

            switch (chartType) {
              case 'bar':
                // Create animated bars
                dataset.data.forEach((point: any, pointIndex: number) => {
                  const barWidth = (chartWidth / dataset.data.length) * 0.8;
                  const x =
                    padding +
                    pointIndex * (chartWidth / dataset.data.length) +
                    (chartWidth / dataset.data.length - barWidth) / 2;
                  const height = (point.value / 100) * chartHeight; // Assuming normalized values
                  const y = padding + chartHeight - height;

                  elements.push(
                    <rect
                      key={`bar-${datasetIndex}-${pointIndex}`}
                      x={x}
                      y={y}
                      width={barWidth}
                      height={height}
                      fill={color}
                      style={{
                        transform: `scaleY(${Math.sin(timeRef.current * 0.01 + pointIndex * 0.2) * 0.1 + 0.9})`,
                        transformOrigin: 'bottom',
                      }}
                      onClick={() => handlers.onDataPointClick?.(point, datasetIndex, pointIndex)}
                    />
                  );
                });
                break;

              case 'area':
              case 'line':
              default: {
                // Create animated line/area
                const points = dataset.data.map((point: any, pointIndex: number) => ({
                  x: padding + (pointIndex / (dataset.data.length - 1)) * chartWidth,
                  y: padding + chartHeight - (point.value / 100) * chartHeight, // Assuming normalized values
                }));

                if (points.length > 0) {
                  const linePath = `M ${points.map((p: any) => `${p.x},${p.y}`).join(' L ')}`;

                  // Area for area chart
                  if (chartType === 'area') {
                    const areaPath = `${linePath} L ${padding + chartWidth},${padding + chartHeight} L ${padding},${padding + chartHeight} Z`;
                    elements.push(
                      <path
                        key={`area-${datasetIndex}`}
                        d={areaPath}
                        fill={color}
                        fillOpacity="0.3"
                        style={{
                          transform: `translateY(${Math.sin(timeRef.current * 0.01) * 2}px)`,
                        }}
                      />
                    );
                  }

                  // Line
                  elements.push(
                    <path
                      key={`line-${datasetIndex}`}
                      d={linePath}
                      stroke={color}
                      fill="none"
                      className="c-chart__data-line"
                      style={{
                        transform: `translateY(${Math.sin(timeRef.current * 0.01) * 2}px)`,
                      }}
                    />
                  );

                  // Data points
                  points.forEach((point: any, pointIndex: number) => {
                    elements.push(
                      <circle
                        key={`point-${datasetIndex}-${pointIndex}`}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill={color}
                        style={{
                          transform: `scale(${1 + Math.sin(timeRef.current * 0.01 + pointIndex) * 0.2})`,
                        }}
                        onClick={() =>
                          handlers.onDataPointClick?.(
                            dataset.data[pointIndex],
                            datasetIndex,
                            pointIndex
                          )
                        }
                      />
                    );
                  });
                }
                break;
              }
            }
          });

          // Particle effects
          if (particleEffects?.enabled) {
            for (let i = 0; i < particleEffects.count; i++) {
              const particle = particlesRef.current[i];
              if (particle) {
                elements.push(
                  <circle
                    key={`particle-${i}`}
                    cx={particle.x}
                    cy={particle.y}
                    r={particle.size}
                    fill={particle.color}
                    style={{
                      opacity: particle.life,
                    }}
                  />
                );
              }
            }
          }

          return <g>{elements}</g>;
        },
        [chartType, particleEffects]
      );

      return (
        <BaseChart
          ref={ref}
          type="line"
          datasets={datasets}
          config={config}
          renderContent={renderContent}
          onDataPointClick={onDataPointClick}
          {...props}
        />
      );
    }
  )
);

AnimatedChart.displayName = 'AnimatedChart';
export default AnimatedChart;
