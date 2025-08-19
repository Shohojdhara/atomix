import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { CHART } from '../../lib/constants/components';
import Chart from './Chart';
import ChartTooltip from './ChartTooltip';
import { ChartProps } from './types';

interface CandlestickDataPoint {
  /**
   * Date or timestamp
   */
  date: string | Date;

  /**
   * Opening price
   */
  open: number;

  /**
   * Highest price
   */
  high: number;

  /**
   * Lowest price
   */
  low: number;

  /**
   * Closing price
   */
  close: number;

  /**
   * Trading volume (optional)
   */
  volume?: number;

  /**
   * Additional metadata
   */
  metadata?: Record<string, any>;
}

interface CandlestickChartProps extends Omit<ChartProps, 'type' | 'datasets'> {
  /**
   * Candlestick chart data
   */
  candlestickData?: CandlestickDataPoint[];

  /**
   * Candlestick chart specific options
   */
  candlestickOptions?: {
    /**
     * Color for bullish (rising) candles
     */
    bullishColor?: string;

    /**
     * Color for bearish (falling) candles
     */
    bearishColor?: string;

    /**
     * Candle width as percentage of available space
     */
    candleWidth?: number;

    /**
     * Whether to show volume bars
     */
    showVolume?: boolean;

    /**
     * Volume bar height ratio
     */
    volumeHeightRatio?: number;

    /**
     * Whether to show moving averages
     */
    showMovingAverages?: boolean;

    /**
     * Moving average periods
     */
    movingAveragePeriods?: number[];

    /**
     * Moving average colors
     */
    movingAverageColors?: string[];

    /**
     * Whether to show trend lines
     */
    showTrendLines?: boolean;

    /**
     * Whether to enable crosshair
     */
    enableCrosshair?: boolean;

    /**
     * Whether to show OHLC tooltip
     */
    showOHLCTooltip?: boolean;

    /**
     * Date format for x-axis labels
     */
    dateFormat?: 'short' | 'medium' | 'long' | 'numeric';

    /**
     * Price precision (decimal places)
     */
    pricePrecision?: number;

    /**
     * Whether to enable zoom and pan
     */
    enableZoomPan?: boolean;
  };
}

const CandlestickChart = memo(
  forwardRef<HTMLDivElement, CandlestickChartProps>(
    (
      {
        candlestickData = [],
        config = {},
        candlestickOptions = {
          bullishColor: '#4DFF9F',
          bearishColor: '#FF6B6B',
          candleWidth: 0.8,
          showVolume: false,
          volumeHeightRatio: 0.3,
          showMovingAverages: false,
          movingAveragePeriods: [20, 50],
          movingAverageColors: ['#FFD93D', '#6BCF7F'],
          showTrendLines: false,
          enableCrosshair: true,
          showOHLCTooltip: true,
          dateFormat: 'short',
          pricePrecision: 2,
          enableZoomPan: false,
        },
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const [hoveredCandle, setHoveredCandle] = useState<{
        index: number;
        x: number;
        y: number;
        data: CandlestickDataPoint;
      } | null>(null);

      const [crosshair, setCrosshair] = useState<{ x: number; y: number } | null>(null);
      const [zoom, setZoom] = useState({ scale: 1, translateX: 0, translateY: 0 });

      // Calculate moving averages
      const calculateMovingAverage = useCallback((data: CandlestickDataPoint[], period: number) => {
        const result: number[] = [];

        for (let i = 0; i < data.length; i++) {
          if (i < period - 1) {
            result.push(NaN);
          } else {
            const sum = data
              .slice(i - period + 1, i + 1)
              .reduce((acc, candle) => acc + candle.close, 0);
            result.push(sum / period);
          }
        }

        return result;
      }, []);

      // Format date for display
      const formatDate = useCallback(
        (date: string | Date) => {
          const dateObj = typeof date === 'string' ? new Date(date) : date;

          switch (candlestickOptions.dateFormat) {
            case 'short':
              return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            case 'medium':
              return dateObj.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: '2-digit',
              });
            case 'long':
              return dateObj.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              });
            case 'numeric':
              return dateObj.toLocaleDateString('en-US');
            default:
              return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }
        },
        [candlestickOptions.dateFormat]
      );

      // Chart content calculation
      const chartContent = useMemo(() => {
        if (!candlestickData.length) return null;

        const width = 800;
        const height = candlestickOptions.showVolume ? 500 : 400;
        const padding = { top: 40, right: 70, bottom: 60, left: 70 };
        const chartHeight = candlestickOptions.showVolume
          ? height * (1 - candlestickOptions.volumeHeightRatio!)
          : height - padding.top - padding.bottom;
        const volumeHeight = candlestickOptions.showVolume
          ? height * candlestickOptions.volumeHeightRatio!
          : 0;
        const innerWidth = width - padding.left - padding.right;

        // Calculate price scales
        const allPrices = candlestickData.flatMap(candle => [
          candle.open,
          candle.high,
          candle.low,
          candle.close,
        ]);
        const minPrice = config.yAxis?.min ?? Math.min(...allPrices);
        const maxPrice = config.yAxis?.max ?? Math.max(...allPrices);

        // Handle case where all prices are the same to avoid division by zero
        const priceRange = maxPrice !== minPrice ? maxPrice - minPrice : 1;

        // Calculate volume scale if needed
        const candlesWithVolume = candlestickData.filter(d => d.volume);
        const maxVolume =
          candlestickOptions.showVolume && candlesWithVolume.length > 0
            ? Math.max(...candlesWithVolume.map(d => d.volume!))
            : 0;
        // Ensure maxVolume is at least 1 to avoid division by zero
        const safeMaxVolume = maxVolume > 0 ? maxVolume : 1;

        const xScale = (i: number) => {
          // Handle case where there's only one data point to avoid division by zero
          const denominator = candlestickData.length > 1 ? candlestickData.length - 1 : 1;
          const baseX = padding.left + (i / denominator) * innerWidth;
          return baseX * zoom.scale + zoom.translateX;
        };

        const priceScale = (price: number) => {
          const baseY = padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
          return baseY * zoom.scale + zoom.translateY;
        };

        const volumeScale = (volume: number) => {
          // Use safeMaxVolume to avoid division by zero
          return (
            chartHeight +
            padding.top +
            10 +
            ((safeMaxVolume - volume) / safeMaxVolume) * (volumeHeight - 20)
          );
        };

        // Ensure we have at least one data point to avoid division by zero
        const safeDataLength = Math.max(candlestickData.length, 1);
        const candleSpacing = innerWidth / safeDataLength;
        const candleWidth = candleSpacing * (candlestickOptions.candleWidth || 0.8);

        // Generate chart elements
        const chartElements = [];

        // Volume bars (if enabled)
        if (candlestickOptions.showVolume && candlesWithVolume.length > 0) {
          candlestickData.forEach((candle, i) => {
            if (!candle.volume) return;

            const x = xScale(i);
            const isBullish = candle.close >= candle.open;
            const volumeColor = isBullish
              ? candlestickOptions.bullishColor
              : candlestickOptions.bearishColor;

            // Ensure all values are valid numbers before creating the rect element
            const xPos = isNaN(x) ? 0 : x;
            const candleWidthQuarter = isNaN(candleWidth / 4) ? 0 : candleWidth / 4;
            const volScale = volumeScale(candle.volume);
            const volHeight = chartHeight + padding.top + 10 + volumeHeight - 20 - volScale;

            chartElements.push(
              <rect
                key={`volume-${i}`}
                x={xPos - candleWidthQuarter}
                y={isNaN(volScale) ? 0 : volScale}
                width={isNaN(candleWidth / 2) ? 0 : candleWidth / 2}
                height={isNaN(volHeight) ? 0 : volHeight}
                fill={volumeColor}
                opacity={0.3}
              />
            );
          });

          // Volume section separator
          chartElements.push(
            <line
              key="volume-separator"
              x1={padding.left}
              y1={chartHeight + padding.top + 5}
              x2={width - padding.right}
              y2={chartHeight + padding.top + 5}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          );
        }

        // Candlesticks
        candlestickData.forEach((candle, i) => {
          const x = xScale(i);
          const openY = priceScale(candle.open);
          const highY = priceScale(candle.high);
          const lowY = priceScale(candle.low);
          const closeY = priceScale(candle.close);

          const isBullish = candle.close >= candle.open;
          const candleColor = isBullish
            ? candlestickOptions.bullishColor
            : candlestickOptions.bearishColor;

          const bodyTop = Math.min(openY, closeY);
          const bodyBottom = Math.max(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY);

          const isHovered = hoveredCandle?.index === i;

          // Ensure all values are valid numbers before creating elements
          const xPos = isNaN(x) ? 0 : x;
          const candleWidthHalf = isNaN(candleWidth / 2) ? 0 : candleWidth / 2;
          const safeBodyTop = isNaN(bodyTop) ? 0 : bodyTop;
          const safeBodyHeight = isNaN(bodyHeight) || bodyHeight === 0 ? 1 : Math.abs(bodyHeight);

          chartElements.push(
            <g key={`candle-${i}`}>
              {/* High-Low line (wick) */}
              <line
                x1={isNaN(xPos) ? 0 : xPos}
                y1={isNaN(highY) ? 0 : highY}
                x2={isNaN(xPos) ? 0 : xPos}
                y2={isNaN(lowY) ? 0 : lowY}
                stroke={candleColor}
                className={`c-chart__wick ${isHovered ? 'c-chart__wick--hovered' : ''}`}
              />

              {/* Candle body */}
              <rect
                x={xPos - candleWidthHalf}
                y={safeBodyTop}
                width={isNaN(candleWidth) ? 0 : candleWidth}
                height={safeBodyHeight}
                fill={isBullish ? candleColor : candleColor}
                stroke={candleColor}
                className={`c-chart__candlestick ${isBullish ? 'c-chart__candlestick--bullish' : 'c-chart__candlestick--bearish'}`}
                onMouseEnter={e => {
                  const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const clientX = rect ? rect.left + xPos : e.clientX;
                  const clientY = rect ? rect.top + safeBodyTop : e.clientY;
                  setHoveredCandle({ index: i, x: clientX, y: clientY, data: candle });
                }}
                onMouseLeave={() => setHoveredCandle(null)}
                onClick={() => onDataPointClick?.(candle as any, 0, i)}
              />

              {/* Hover highlight */}
              {isHovered && (
                <rect
                  x={xPos - candleWidthHalf - 2}
                  y={safeBodyTop - 2}
                  width={isNaN(candleWidth + 4) ? 0 : candleWidth + 4}
                  height={isNaN(safeBodyHeight + 4) ? 5 : Math.max(safeBodyHeight + 4, 5)}
                  fill="none"
                  stroke={candleColor}
                  className="c-chart__candlestick-highlight"
                />
              )}
            </g>
          );
        });

        // Moving averages
        if (candlestickOptions.showMovingAverages && candlestickOptions.movingAveragePeriods) {
          candlestickOptions.movingAveragePeriods.forEach((period, periodIndex) => {
            const movingAverage = calculateMovingAverage(candlestickData, period);
            const color = candlestickOptions.movingAverageColors?.[periodIndex] || '#FFD93D';

            const pathData = movingAverage
              .map((value, i) => {
                if (isNaN(value)) return '';
                const x = xScale(i);
                const y = priceScale(value);
                if (i === 0) return `M ${isNaN(x) ? 0 : x},${isNaN(y) ? 0 : y}`;
                const prevValue = movingAverage[i - 1];
                return prevValue !== undefined && isNaN(prevValue)
                  ? `M ${isNaN(x) ? 0 : x},${isNaN(y) ? 0 : y}`
                  : `L ${isNaN(x) ? 0 : x},${isNaN(y) ? 0 : y}`;
              })
              .join(' ');

            chartElements.push(
              <path
                key={`ma-${period}`}
                d={pathData}
                stroke={color}
                fill="none"
                className="c-chart__moving-average"
              />
            );
          });
        }

        // Crosshair
        if (crosshair && candlestickOptions.enableCrosshair) {
          chartElements.push(
            <g key="crosshair" className="c-chart__crosshair">
              <line
                x1={isNaN(crosshair.x) ? 0 : crosshair.x}
                y1={padding.top}
                x2={isNaN(crosshair.x) ? 0 : crosshair.x}
                y2={chartHeight + padding.top}
                className="c-chart__crosshair-line c-chart__crosshair-line--vertical"
              />
              <line
                x1={padding.left}
                y1={isNaN(crosshair.y) ? 0 : crosshair.y}
                x2={width - padding.right}
                y2={isNaN(crosshair.y) ? 0 : crosshair.y}
                className="c-chart__crosshair-line c-chart__crosshair-line--horizontal"
              />
            </g>
          );
        }

        // Grid
        const grid = (
          <g className={CHART.GRID_CLASS}>
            {/* Horizontal price grid lines */}
            {config.yAxis?.showGrid &&
              Array.from({ length: 6 }).map((_, i) => {
                const price = minPrice + (priceRange * i) / 5;
                const yPos = priceScale(price);
                return (
                  <line
                    key={`price-grid-${i}`}
                    x1={padding.left}
                    y1={isNaN(yPos) ? 0 : yPos}
                    x2={width - padding.right}
                    y2={isNaN(yPos) ? 0 : yPos}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="2,2"
                    opacity={0.2}
                  />
                );
              })}

            {/* Vertical time grid lines */}
            {config.xAxis?.showGrid &&
              candlestickData.map((_, i) => {
                if (i % Math.ceil(candlestickData.length / 10) !== 0) return null;
                const xPos = xScale(i);
                return (
                  <line
                    key={`time-grid-${i}`}
                    x1={isNaN(xPos) ? 0 : xPos}
                    y1={padding.top}
                    x2={isNaN(xPos) ? 0 : xPos}
                    y2={chartHeight + padding.top}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="2,2"
                    opacity={0.2}
                  />
                );
              })}
          </g>
        );

        // Axes
        const axes = (
          <>
            {/* Price axis (Y-axis) */}
            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--y`}>
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={chartHeight + padding.top}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              {Array.from({ length: 6 }).map((_, i) => {
                const price = minPrice + (priceRange * i) / 5;
                const yPos = priceScale(price);
                return (
                  <g key={`price-axis-${i}`}>
                    <line
                      x1={padding.left - 5}
                      y1={isNaN(yPos) ? 0 : yPos}
                      x2={padding.left}
                      y2={isNaN(yPos) ? 0 : yPos}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                    />
                    <text
                      x={padding.left - 10}
                      y={isNaN(yPos) ? 0 : yPos}
                      textAnchor="end"
                      dominantBaseline="middle"
                      fontSize="12"
                      fill="#374151"
                    >
                      ${price.toFixed(candlestickOptions.pricePrecision)}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Time axis (X-axis) */}
            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--x`}>
              <line
                x1={padding.left}
                y1={chartHeight + padding.top}
                x2={width - padding.right}
                y2={chartHeight + padding.top}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              {candlestickData.map((candle, i) => {
                if (i % Math.ceil(candlestickData.length / 8) !== 0) return null;
                const xPos = xScale(i);
                return (
                  <g key={`time-axis-${i}`}>
                    <line
                      x1={isNaN(xPos) ? 0 : xPos}
                      y1={chartHeight + padding.top}
                      x2={isNaN(xPos) ? 0 : xPos}
                      y2={chartHeight + padding.top + 5}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                    />
                    <text
                      x={isNaN(xPos) ? 0 : xPos}
                      y={chartHeight + padding.top + 20}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#374151"
                    >
                      {formatDate(candle.date)}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Volume axis (if enabled) */}
            {candlestickOptions.showVolume && candlesWithVolume.length > 0 && (
              <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--volume`}>
                <line
                  x1={width - padding.right}
                  y1={chartHeight + padding.top + 10}
                  x2={width - padding.right}
                  y2={height - padding.bottom}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                />
                {Array.from({ length: 3 }).map((_, i) => {
                  const volume = (safeMaxVolume * (i + 1)) / 3;
                  const yPos = volumeScale(volume);
                  return (
                    <g key={`volume-axis-${i}`}>
                      <line
                        x1={width - padding.right}
                        y1={isNaN(yPos) ? 0 : yPos}
                        x2={width - padding.right + 5}
                        y2={isNaN(yPos) ? 0 : yPos}
                        stroke="#e5e7eb"
                        strokeWidth={1}
                      />
                      <text
                        x={width - padding.right + 10}
                        y={isNaN(yPos) ? 0 : yPos}
                        textAnchor="start"
                        dominantBaseline="middle"
                        fontSize="10"
                        fill="#374151"
                      >
                        {volume > 1000000
                          ? `${(volume / 1000000).toFixed(1)}M`
                          : volume > 1000
                            ? `${(volume / 1000).toFixed(0)}K`
                            : `${Math.round(volume)}`}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}
          </>
        );

        return (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            onMouseMove={e => {
              if (!candlestickOptions.enableCrosshair) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              setCrosshair({ x, y });
            }}
            onMouseLeave={() => setCrosshair(null)}
            style={{ cursor: 'crosshair' }}
          >
            {grid}
            {axes}
            {chartElements}
          </svg>
        );
      }, [
        candlestickData,
        config,
        candlestickOptions,
        hoveredCandle,
        crosshair,
        zoom,
        calculateMovingAverage,
        formatDate,
        onDataPointClick,
      ]);

      // OHLC Tooltip custom renderer
      const renderOHLCTooltip = useCallback(
        (dataPoint: any) => {
          if (!hoveredCandle) return null;

          const { data } = hoveredCandle;
          const isBullish = data.close >= data.open;
          const change = data.close - data.open;
          const changePercent = (change / data.open) * 100;

          return (
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {formatDate(data.date)}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                }}
              >
                <div>
                  Open: <strong>${data.open.toFixed(candlestickOptions.pricePrecision)}</strong>
                </div>
                <div>
                  High: <strong>${data.high.toFixed(candlestickOptions.pricePrecision)}</strong>
                </div>
                <div>
                  Low: <strong>${data.low.toFixed(candlestickOptions.pricePrecision)}</strong>
                </div>
                <div>
                  Close: <strong>${data.close.toFixed(candlestickOptions.pricePrecision)}</strong>
                </div>
              </div>
              <div
                style={{
                  marginTop: '0.5rem',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid var(--atomix-gray-3)',
                  color: isBullish
                    ? candlestickOptions.bullishColor
                    : candlestickOptions.bearishColor,
                  fontWeight: 'bold',
                }}
              >
                {isBullish ? '+' : ''}
                {change.toFixed(candlestickOptions.pricePrecision)} ({changePercent.toFixed(2)}%)
              </div>
              {data.volume && (
                <div style={{ marginTop: '0.25rem', fontSize: '0.75rem' }}>
                  Volume: {data.volume.toLocaleString()}
                </div>
              )}
            </div>
          );
        },
        [candlestickOptions, hoveredCandle, formatDate]
      );

      return (
        <Chart ref={ref} type="candlestick" datasets={[]} config={config} {...props}>
          {chartContent}
          {candlestickOptions.showOHLCTooltip && hoveredCandle && (
            <ChartTooltip
              dataPoint={{
                label: formatDate(hoveredCandle.data.date),
                value: hoveredCandle.data.close,
                metadata: {
                  open: hoveredCandle.data.open,
                  high: hoveredCandle.data.high,
                  low: hoveredCandle.data.low,
                  close: hoveredCandle.data.close,
                  volume: hoveredCandle.data.volume,
                },
              }}
              datasetLabel="OHLC"
              position={{ x: hoveredCandle.x, y: hoveredCandle.y }}
              visible={true}
              customRenderer={renderOHLCTooltip}
            />
          )}
          {candlestickOptions.showMovingAverages && candlestickOptions.movingAveragePeriods && (
            <div
              className={CHART.LEGEND_CLASS}
              style={{
                display: 'flex',
                gap: '0.75rem',
                marginTop: '0.5rem',
                fontSize: '0.875rem',
              }}
            >
              {candlestickOptions.movingAveragePeriods.map((period, i) => (
                <div key={period} style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    className={CHART.LEGEND_COLOR_CLASS}
                    style={{
                      width: '12px',
                      height: '2px',
                      backgroundColor: candlestickOptions.movingAverageColors?.[i] || '#FFD93D',
                      marginRight: '0.25rem',
                    }}
                  />
                  <span className={CHART.LEGEND_LABEL_CLASS}>MA{period}</span>
                </div>
              ))}
            </div>
          )}
        </Chart>
      );
    }
  )
);

CandlestickChart.displayName = 'CandlestickChart';
export default CandlestickChart;
export type { CandlestickChartProps, CandlestickDataPoint };
