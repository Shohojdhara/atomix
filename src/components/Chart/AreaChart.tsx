import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from '../../lib/types/components';
import Chart from './Chart';

interface AreaChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Area chart specific options
   */
  areaOptions?: {
    /**
     * Whether to stack areas on top of each other
     */
    stacked?: boolean;

    /**
     * Whether to normalize stacked values to percentages
     */
    stackedNormalized?: boolean;

    /**
     * Whether to show data points
     */
    showDataPoints?: boolean;

    /**
     * Whether to smooth the line
     */
    smooth?: boolean;

    /**
     * Line tension for curve smoothing (0-1)
     */
    tension?: number;

    /**
     * Opacity of the area fill (0-1)
     */
    fillOpacity?: number;

    /**
     * Whether to use gradient fill
     */
    useGradient?: boolean;

    /**
     * Gradient direction for area fill
     */
    gradientDirection?: 'vertical' | 'horizontal' | 'radial';

    /**
     * Whether to show area border
     */
    showBorder?: boolean;

    /**
     * Border width for area
     */
    borderWidth?: number;

    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;

    /**
     * Whether to enable hover effects
     */
    enableHover?: boolean;

    /**
     * Whether to enable area selection
     */
    enableSelection?: boolean;

    /**
     * Whether to show negative values below zero
     */
    showNegativeValues?: boolean;

    /**
     * Zero baseline offset
     */
    zeroBaseline?: number;
  };

  /**
   * Area selection handler
   */
  onAreaSelect?: (datasetIndex: number, selected: boolean) => void;

  /**
   * Area hover handler
   */
  onAreaHover?: (datasetIndex: number, hovered: boolean) => void;
}

const AreaChart = memo(
  forwardRef<HTMLDivElement, AreaChartProps>(
    (
      {
        datasets = [],
        config = {},
        areaOptions = {
          stacked: false,
          stackedNormalized: false,
          showDataPoints: false,
          smooth: true,
          tension: 0.4,
          fillOpacity: 0.7,
          useGradient: true,
          gradientDirection: 'vertical',
          showBorder: true,
          borderWidth: 2,
          animationDuration: 1000,
          enableHover: true,
          enableSelection: false,
          showNegativeValues: true,
          zeroBaseline: 0,
        },
        onDataPointClick,
        onAreaSelect,
        onAreaHover,
        ...props
      },
      ref
    ) => {
      const [hoveredArea, setHoveredArea] = useState<number | null>(null);
      const [selectedAreas, setSelectedAreas] = useState<Set<number>>(new Set());
      const [animationProgress, setAnimationProgress] = useState(1);

      // Animation effect
      useEffect(() => {
        setAnimationProgress(0);
        const duration = areaOptions.animationDuration || 1000;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setAnimationProgress(progress);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }, [datasets, areaOptions.animationDuration]);

      // Handle area interactions
      const handleAreaHover = useCallback(
        (datasetIndex: number, hovered: boolean) => {
          if (!areaOptions.enableHover) return;
          setHoveredArea(hovered ? datasetIndex : null);
          onAreaHover?.(datasetIndex, hovered);
        },
        [areaOptions.enableHover, onAreaHover]
      );

      const handleAreaSelect = useCallback(
        (datasetIndex: number) => {
          if (!areaOptions.enableSelection) return;
          const newSelection = new Set(selectedAreas);
          if (newSelection.has(datasetIndex)) {
            newSelection.delete(datasetIndex);
          } else {
            newSelection.add(datasetIndex);
          }
          setSelectedAreas(newSelection);
          onAreaSelect?.(datasetIndex, newSelection.has(datasetIndex));
        },
        [areaOptions.enableSelection, selectedAreas, onAreaSelect]
      );

      // Generate smooth curve path
      const generateSmoothPath = useCallback(
        (points: Array<{ x: number; y: number }>, baseline?: number) => {
          if (points.length < 2) return '';

          if (!areaOptions.smooth) {
            const path = points
              .map((point, i) => (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`))
              .join(' ');

            if (baseline !== undefined) {
              const lastPoint = points[points.length - 1];
              const firstPoint = points[0];
              return `${path} L ${lastPoint?.x},${baseline} L ${firstPoint?.x},${baseline} Z`;
            }
            return path;
          }

          // Smooth curves
          const tension = areaOptions.tension || 0.4;
          const firstPoint = points[0];
          if (!firstPoint) return '';
          let path = `M ${firstPoint.x},${firstPoint.y}`;

          for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            const prev = i > 0 ? points[i - 1] : current;
            const nextNext = i < points.length - 2 ? points[i + 2] : next;

            if (!current || !next || !prev || !nextNext) continue;

            const cp1x = current.x + ((next.x - prev.x) * tension) / 6;
            const cp1y = current.y + ((next.y - prev.y) * tension) / 6;
            const cp2x = next.x - ((nextNext.x - current.x) * tension) / 6;
            const cp2y = next.y - ((nextNext.y - current.y) * tension) / 6;

            path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
          }

          if (baseline !== undefined) {
            const lastPoint = points[points.length - 1];
            const firstPoint = points[0];
            path += ` L ${lastPoint?.x},${baseline} L ${firstPoint?.x},${baseline} Z`;
          }

          return path;
        },
        [areaOptions.smooth, areaOptions.tension]
      );

      // Chart content
      const chartContent = useMemo(() => {
        if (!datasets.length) return null;

        const width = 800;
        const height = 400;
        const padding = { top: 40, right: 50, bottom: 60, left: 70 };
        const innerWidth = width - padding.left - padding.right;
        const innerHeight = height - padding.top - padding.bottom;

        // Calculate scales
        const allValues = datasets.flatMap(dataset =>
          dataset.data.map(d => d.value * animationProgress)
        );
        const minValue = config.yAxis?.min ?? Math.min(0, ...allValues);
        const maxValue = config.yAxis?.max ?? Math.max(...allValues);

        const zeroBaseline = areaOptions.zeroBaseline || 0;

        const xScale = (i: number) => {
          const dataLength = datasets[0]?.data?.length || 1;
          return padding.left + (i / Math.max(dataLength - 1, 1)) * innerWidth;
        };

        const yScale = (value: number) => {
          return (
            padding.top + innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight
          );
        };

        const zeroY = yScale(zeroBaseline);
        const defaultColors = ['#7AFFD7', '#1AFFD2', '#00E6C3', '#4DFF9F', '#1AFF85', '#00E66B'];

        // Create gradients
        const gradients = datasets.map((dataset, i) => {
          const baseColor = dataset.color || defaultColors[i % defaultColors.length];
          const gradientId = `area-gradient-${i}`;

          if (!areaOptions.useGradient) return null;

          return (
            <defs key={gradientId}>
              <linearGradient
                id={gradientId}
                x1={areaOptions.gradientDirection === 'horizontal' ? '0%' : '50%'}
                y1={areaOptions.gradientDirection === 'horizontal' ? '50%' : '0%'}
                x2={areaOptions.gradientDirection === 'horizontal' ? '100%' : '50%'}
                y2={areaOptions.gradientDirection === 'horizontal' ? '50%' : '100%'}
              >
                <stop
                  offset="0%"
                  stopColor={baseColor}
                  stopOpacity={areaOptions.fillOpacity || 0.7}
                />
                <stop
                  offset="100%"
                  stopColor={baseColor}
                  stopOpacity={(areaOptions.fillOpacity || 0.7) * 0.3}
                />
              </linearGradient>
            </defs>
          );
        });

        // Generate areas
        const areas = datasets.map((dataset, datasetIndex) => {
          const color = dataset.color || defaultColors[datasetIndex % defaultColors.length];
          const isHovered = hoveredArea === datasetIndex;
          const isSelected = selectedAreas.has(datasetIndex);

          const points = dataset.data.map((point, i) => ({
            x: xScale(i),
            y: yScale(point.value * animationProgress),
          }));

          const areaPath = generateSmoothPath(points, zeroY);
          const fillOpacity = areaOptions.fillOpacity || 0.7;
          const adjustedOpacity = isHovered ? fillOpacity * 0.8 : fillOpacity;

          return (
            <g key={datasetIndex}>
              <path
                d={areaPath}
                fill={areaOptions.useGradient ? `url(#area-gradient-${datasetIndex})` : color}
                fillOpacity={adjustedOpacity}
                stroke={areaOptions.showBorder ? color : 'none'}
                strokeWidth={areaOptions.borderWidth || 2}
                className={`${CHART.DATA_POINT_CLASS} ${isSelected ? 'selected' : ''}`}
                style={{
                  cursor: areaOptions.enableSelection ? 'pointer' : 'default',
                  filter: isHovered ? 'brightness(1.1)' : 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={() => handleAreaHover(datasetIndex, true)}
                onMouseLeave={() => handleAreaHover(datasetIndex, false)}
                onClick={() => handleAreaSelect(datasetIndex)}
              />

              {/* Data points */}
              {areaOptions.showDataPoints &&
                points.map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r={4}
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth={2}
                    className={CHART.DATA_POINT_CLASS}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const dataPoint = dataset.data[i];
                      if (dataPoint) {
                        onDataPointClick?.(dataPoint, datasetIndex, i);
                      }
                    }}
                  />
                ))}
            </g>
          );
        });

        return (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {gradients}
            {areas}
          </svg>
        );
      }, [
        datasets,
        config,
        areaOptions,
        hoveredArea,
        selectedAreas,
        animationProgress,
        generateSmoothPath,
        handleAreaHover,
        handleAreaSelect,
        onDataPointClick,
      ]);

      return (
        <Chart ref={ref} type="area" datasets={datasets} config={config} {...props}>
          <div className={CHART.CANVAS_CLASS} style={{ position: 'relative' }}>
            {chartContent}
            {animationProgress < 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '11px',
                  color: '#6b7280',
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  pointerEvents: 'none',
                }}
              >
                Loading... {Math.round(animationProgress * 100)}%
              </div>
            )}
          </div>
        </Chart>
      );
    }
  )
);

AreaChart.displayName = 'AreaChart';
export default AreaChart;
export type { AreaChartProps };
