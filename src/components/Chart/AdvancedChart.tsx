import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { CHART } from '../../lib/constants/components';
import Chart from './Chart';
import { ChartDataPoint, ChartProps } from './types';

interface AdvancedChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Advanced chart specific options
   */
  advancedOptions?: {
    /**
     * Chart type for advanced rendering
     */
    chartType?: 'line' | 'area' | 'bar' | 'mixed';

    /**
     * Whether to enable real-time updates
     */
    realTime?: boolean;

    /**
     * Update interval in milliseconds for real-time data
     */
    updateInterval?: number;

    /**
     * Whether to show advanced tooltips
     */
    advancedTooltips?: boolean;

    /**
     * Whether to enable data point selection
     */
    enableSelection?: boolean;

    /**
     * Maximum number of selected points
     */
    maxSelections?: number;

    /**
     * Whether to show trend lines
     */
    showTrendLines?: boolean;

    /**
     * Whether to show moving averages
     */
    showMovingAverages?: boolean;

    /**
     * Period for moving average calculation
     */
    movingAveragePeriod?: number;

    /**
     * Whether to enable data export
     */
    enableExport?: boolean;

    /**
     * Export formats
     */
    exportFormats?: ('png' | 'svg' | 'csv' | 'json')[];

    /**
     * Whether to show data table
     */
    showDataTable?: boolean;

    /**
     * Whether to enable annotations
     */
    enableAnnotations?: boolean;

    /**
     * Custom annotations
     */
    annotations?: Array<{
      x: number;
      y: number;
      label: string;
      color?: string;
      type?: 'point' | 'line' | 'area';
    }>;
  };
}

const AdvancedChart = memo(
  forwardRef<HTMLDivElement, AdvancedChartProps>(
    (
      {
        datasets = [],
        config = {},
        advancedOptions = {
          chartType: 'line',
          realTime: false,
          updateInterval: 1000,
          advancedTooltips: true,
          enableSelection: false,
          maxSelections: 5,
          showTrendLines: false,
          showMovingAverages: false,
          movingAveragePeriod: 7,
          enableExport: false,
          exportFormats: ['png', 'svg'],
          showDataTable: false,
          enableAnnotations: false,
          annotations: [],
        },
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const [selectedPoints, setSelectedPoints] = useState<Set<string>>(new Set());
      const [realTimeData, setRealTimeData] = useState(datasets);
      const [hoveredPoint, setHoveredPoint] = useState<{
        datasetIndex: number;
        pointIndex: number;
        x: number;
        y: number;
        value: number;
        label: string;
      } | null>(null);

      // Real-time data simulation
      useEffect(() => {
        if (!advancedOptions.realTime) return undefined;

        const interval = setInterval(() => {
          setRealTimeData(prevData =>
            prevData.map(dataset => ({
              ...dataset,
              data: dataset.data.map(point => ({
                ...point,
                value: point.value + (Math.random() - 0.5) * 10,
              })),
            }))
          );
        }, advancedOptions.updateInterval);

        return () => clearInterval(interval);
      }, [advancedOptions.realTime, advancedOptions.updateInterval]);

      // Calculate moving average
      const calculateMovingAverage = useCallback((data: ChartDataPoint[], period: number) => {
        const result: ChartDataPoint[] = [];

        for (let i = period - 1; i < data.length; i++) {
          const sum = data
            .slice(i - period + 1, i + 1)
            .reduce((acc, point) => acc + point.value, 0);
          const average = sum / period;

          const currentPoint = data[i];
          if (currentPoint) {
            result.push({
              label: currentPoint.label,
              value: average,
              color: 'rgba(255, 255, 255, 0.5)',
            });
          }
        }

        return result;
      }, []);

      // Handle point selection
      const handlePointSelect = useCallback(
        (datasetIndex: number, pointIndex: number) => {
          if (!advancedOptions.enableSelection) return;

          const pointKey = `${datasetIndex}-${pointIndex}`;
          const newSelectedPoints = new Set(selectedPoints);

          if (newSelectedPoints.has(pointKey)) {
            newSelectedPoints.delete(pointKey);
          } else {
            if (newSelectedPoints.size >= (advancedOptions.maxSelections || 5)) {
              const firstKey = newSelectedPoints.values().next().value;
              if (firstKey) {
                newSelectedPoints.delete(firstKey);
              }
            }
            newSelectedPoints.add(pointKey);
          }

          setSelectedPoints(newSelectedPoints);
        },
        [selectedPoints, advancedOptions.enableSelection, advancedOptions.maxSelections]
      );

      // Export chart data
      const exportChart = useCallback(
        (format: string) => {
          if (!advancedOptions.enableExport) return;

          const chartElement = document.querySelector('.c-chart__canvas svg') as SVGElement;
          if (!chartElement) return;

          switch (format) {
            case 'png':
              // Convert SVG to PNG
              const svgData = new XMLSerializer().serializeToString(chartElement);
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const img = new Image();

              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);

                const link = document.createElement('a');
                link.download = 'chart.png';
                link.href = canvas.toDataURL();
                link.click();
              };

              img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
              break;

            case 'svg':
              const svgBlob = new Blob([chartElement.outerHTML], { type: 'image/svg+xml' });
              const svgUrl = URL.createObjectURL(svgBlob);
              const svgLink = document.createElement('a');
              svgLink.href = svgUrl;
              svgLink.download = 'chart.svg';
              svgLink.click();
              break;

            case 'csv':
              const csvContent = datasets
                .map(dataset =>
                  dataset.data.map(point => `${point.label},${point.value}`).join('\n')
                )
                .join('\n');
              const csvBlob = new Blob([csvContent], { type: 'text/csv' });
              const csvUrl = URL.createObjectURL(csvBlob);
              const csvLink = document.createElement('a');
              csvLink.href = csvUrl;
              csvLink.download = 'chart-data.csv';
              csvLink.click();
              break;
          }
        },
        [datasets, advancedOptions.enableExport]
      );

      // Calculate chart content
      const chartContent = useMemo(() => {
        if (!realTimeData.length) return null;

        const width = 800;
        const height = 400;
        const padding = { top: 20, right: 30, bottom: 40, left: 50 };
        const innerWidth = width - padding.left - padding.right;
        const innerHeight = height - padding.top - padding.bottom;

        // Calculate scales
        const allValues = realTimeData.flatMap(dataset => dataset.data.map(d => d.value));
        const minValue = config.yAxis?.min ?? Math.min(0, ...allValues);
        const maxValue = config.yAxis?.max ?? Math.max(...allValues);

        const xScale = (i: number) => {
          const firstDataset = realTimeData[0];
          if (!firstDataset?.data?.length) return padding.left;
          return padding.left + (i / (firstDataset.data.length - 1)) * innerWidth;
        };
        const yScale = (value: number) =>
          padding.top + innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;

        // Generate chart elements based on type
        const chartElements = realTimeData.map((dataset, datasetIndex) => {
          const color = dataset.color || `var(--atomix-color-${datasetIndex + 1})`;
          const elements = [];

          // Main data line/area
          if (advancedOptions.chartType === 'line' || advancedOptions.chartType === 'area') {
            const points = dataset.data.map((point, i) => ({
              x: xScale(i),
              y: yScale(point.value),
            }));

            const pathData = points
              .map((point, i) => (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`))
              .join(' ');

            if (advancedOptions.chartType === 'area') {
              elements.push(
                <path
                  key={`area-${datasetIndex}`}
                  d={`${pathData} L ${xScale(dataset.data.length - 1)},${yScale(minValue)} L ${xScale(0)},${yScale(minValue)} Z`}
                  fill={color}
                  opacity={0.2}
                />
              );
            }

            elements.push(
              <path
                key={`line-${datasetIndex}`}
                d={pathData}
                stroke={color}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          }

          // Data points
          dataset.data.forEach((point, pointIndex) => {
            const x = xScale(pointIndex);
            const y = yScale(point.value);
            const pointKey = `${datasetIndex}-${pointIndex}`;
            const isSelected = selectedPoints.has(pointKey);
            const isHovered =
              hoveredPoint?.datasetIndex === datasetIndex &&
              hoveredPoint?.pointIndex === pointIndex;

            elements.push(
              <circle
                key={`point-${datasetIndex}-${pointIndex}`}
                cx={x}
                cy={y}
                r={isSelected ? 6 : isHovered ? 5 : 4}
                fill={isSelected ? 'var(--atomix-primary-500)' : color}
                stroke="#ffffff"
                strokeWidth={isSelected ? 3 : 2}
                className={CHART.DATA_POINT_CLASS}
                onClick={() => {
                  handlePointSelect(datasetIndex, pointIndex);
                  onDataPointClick?.(point, datasetIndex, pointIndex);
                }}
                onMouseEnter={() =>
                  setHoveredPoint({
                    datasetIndex,
                    pointIndex,
                    x,
                    y,
                    value: point.value,
                    label: point.label,
                  })
                }
                onMouseLeave={() => setHoveredPoint(null)}
                style={{
                  cursor: 'pointer',
                  transition: 'r 0.2s ease-in-out, fill 0.2s ease-in-out',
                }}
              />
            );
          });

          // Moving average line
          if (advancedOptions.showMovingAverages) {
            const movingAvgData = calculateMovingAverage(
              dataset.data,
              advancedOptions.movingAveragePeriod || 7
            );
            const movingAvgPoints = movingAvgData.map((point, i) => ({
              x: xScale(i + (advancedOptions.movingAveragePeriod || 7) - 1),
              y: yScale(point.value),
            }));

            const movingAvgPath = movingAvgPoints
              .map((point, i) => (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`))
              .join(' ');

            elements.push(
              <path
                key={`moving-avg-${datasetIndex}`}
                d={movingAvgPath}
                stroke={color}
                fill="none"
                strokeWidth={1}
                strokeDasharray="5,5"
                opacity={0.7}
              />
            );
          }

          return elements;
        });

        // Annotations
        const annotations =
          advancedOptions.annotations?.map((annotation, i) => (
            <g key={`annotation-${i}`}>
              <circle
                cx={xScale(annotation.x)}
                cy={yScale(annotation.y)}
                r={4}
                fill={annotation.color || '#ef4444'}
                stroke="#ffffff"
                strokeWidth={2}
              />
              <text
                x={xScale(annotation.x) + 10}
                y={yScale(annotation.y) - 10}
                fill="#111827"
                fontSize="12"
                fontWeight="bold"
              >
                {annotation.label}
              </text>
            </g>
          )) || [];

        return (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid */}
            <g className={CHART.GRID_CLASS}>
              {Array.from({ length: 5 }).map((_, i) => {
                const value = minValue + ((maxValue - minValue) * i) / 4;
                return (
                  <line
                    key={`grid-${i}`}
                    x1={padding.left}
                    y1={yScale(value)}
                    x2={width - padding.right}
                    y2={yScale(value)}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="4,4"
                    opacity={0.3}
                  />
                );
              })}
            </g>

            {/* Chart elements */}
            {chartElements.flat()}
            {annotations}

            {/* Axes */}
            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--x`}>
              {realTimeData[0]?.data?.map((point, i) => (
                <text
                  key={`x-label-${i}`}
                  x={xScale(i)}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#374151"
                >
                  {point.label}
                </text>
              ))}
            </g>

            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--y`}>
              {Array.from({ length: 5 }).map((_, i) => {
                const value = minValue + ((maxValue - minValue) * i) / 4;
                return (
                  <text
                    key={`y-label-${i}`}
                    x={padding.left - 10}
                    y={yScale(value)}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize="12"
                    fill="#374151"
                  >
                    {value.toFixed(value % 1 === 0 ? 0 : 1)}
                  </text>
                );
              })}
            </g>
          </svg>
        );
      }, [
        realTimeData,
        config,
        advancedOptions,
        selectedPoints,
        hoveredPoint,
        calculateMovingAverage,
        handlePointSelect,
        onDataPointClick,
      ]);

      // Advanced tooltip
      const advancedTooltip = useMemo(() => {
        if (!advancedOptions.advancedTooltips || !hoveredPoint) return null;

        return (
          <div
            className="advanced-tooltip"
            style={{
              position: 'absolute',
              left: hoveredPoint.x + 10,
              top: hoveredPoint.y - 10,
              background: 'var(--atomix-surface)',
              border: '1px solid #e5e7eb',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem',
              fontSize: 'var(--font-size-sm)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 1000,
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: 'var(--space-1)' }}>
              {hoveredPoint.label}
            </div>
            <div>Value: {hoveredPoint.value}</div>
            <div>Dataset: {realTimeData[hoveredPoint.datasetIndex]?.label}</div>
          </div>
        );
      }, [hoveredPoint, advancedOptions.advancedTooltips, realTimeData]);

      // Export controls
      const exportControls = useMemo(() => {
        if (!advancedOptions.enableExport) return null;

        return (
          <div className="chart-export-controls" style={{ marginTop: 'var(--space-3)' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {advancedOptions.exportFormats?.map(format => (
                <button
                  key={format}
                  onClick={() => exportChart(format)}
                  style={{
                    padding: 'var(--space-1) 0.5rem',
                    background: 'var(--atomix-surface)',
                    border: '1px solid #e5e7eb',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--font-size-sm)',
                    cursor: 'pointer',
                  }}
                >
                  Export {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        );
      }, [advancedOptions.enableExport, advancedOptions.exportFormats, exportChart]);

      // Data table
      const dataTable = useMemo(() => {
        if (!advancedOptions.showDataTable || !realTimeData.length) return null;

        return (
          <div className="chart-data-table" style={{ marginTop: 'var(--space-3)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th
                    style={{
                      padding: '0.5rem',
                      textAlign: 'left',
                      borderBottom: '1px solid #e5e7eb',
                    }}
                  >
                    Label
                  </th>
                  {realTimeData.map((dataset, i) => (
                    <th
                      key={i}
                      style={{
                        padding: '0.5rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #e5e7eb',
                      }}
                    >
                      {dataset.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {realTimeData[0]?.data?.map((_, pointIndex) => (
                  <tr key={pointIndex}>
                    <td
                      style={{
                        padding: '0.5rem',
                        borderBottom: '1px solid #e5e7eb',
                      }}
                    >
                      {realTimeData[0]?.data?.[pointIndex]?.label}
                    </td>
                    {realTimeData.map((dataset, datasetIndex) => (
                      <td
                        key={datasetIndex}
                        style={{
                          padding: '0.5rem',
                          borderBottom: '1px solid #e5e7eb',
                        }}
                      >
                        {dataset.data[pointIndex]?.value.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }, [advancedOptions.showDataTable, realTimeData]);

      return (
        <Chart ref={ref} type="advanced" datasets={realTimeData} config={config} {...props}>
          {chartContent}
          {advancedTooltip}
          {exportControls}
          {dataTable}
        </Chart>
      );
    }
  )
);

AdvancedChart.displayName = 'AdvancedChart';
export default AdvancedChart;
export type { AdvancedChartProps };
