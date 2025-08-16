import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from '../../lib/types/components';
import Chart from './Chart';

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

        // Calculate volume scale if needed
        const maxVolume = candlestickOptions.showVolume
          ? Math.max(...candlestickData.filter(d => d.volume).map(d => d.volume!))
          : 0;

        const xScale = (i: number) => {
          const baseX = padding.left + (i / (candlestickData.length - 1)) * innerWidth;
          return baseX * zoom.scale + zoom.translateX;
        };

        const priceScale = (price: number) => {
          const baseY =
            padding.top + chartHeight - ((price - minPrice) / (maxPrice - minPrice)) * chartHeight;
          return baseY * zoom.scale + zoom.translateY;
        };

        const volumeScale = (volume: number) => {
          return (
            chartHeight +
            padding.top +
            10 +
            ((maxVolume - volume) / maxVolume) * (volumeHeight - 20)
          );
        };

        const candleSpacing = innerWidth / candlestickData.length;
        const candleWidth = candleSpacing * candlestickOptions.candleWidth!;

        // Generate chart elements
        const chartElements = [];

        // Volume bars (if enabled)
        if (candlestickOptions.showVolume) {
          candlestickData.forEach((candle, i) => {
            if (!candle.volume) return;

            const x = xScale(i);
            const isBullish = candle.close >= candle.open;
            const volumeColor = isBullish
              ? candlestickOptions.bullishColor
              : candlestickOptions.bearishColor;

            chartElements.push(
              <rect
                key={`volume-${i}`}
                x={x - candleWidth / 4}
                y={volumeScale(candle.volume)}
                width={candleWidth / 2}
                height={
                  chartHeight + padding.top + 10 + volumeHeight - 20 - volumeScale(candle.volume)
                }
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

          chartElements.push(
            <g key={`candle-${i}`}>
              {/* High-Low line (wick) */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={candleColor}
                strokeWidth={isHovered ? 2 : 1}
              />

              {/* Candle body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(bodyHeight, 1)}
                fill={isBullish ? candleColor : candleColor}
                stroke={candleColor}
                strokeWidth={1}
                opacity={isBullish ? 0.8 : 1}
                style={{
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease-in-out',
                }}
                onMouseEnter={() => setHoveredCandle({ index: i, x, y: bodyTop, data: candle })}
                onMouseLeave={() => setHoveredCandle(null)}
                onClick={() => onDataPointClick?.(candle as any, 0, i)}
              />

              {/* Hover highlight */}
              {isHovered && (
                <rect
                  x={x - candleWidth / 2 - 2}
                  y={bodyTop - 2}
                  width={candleWidth + 4}
                  height={Math.max(bodyHeight + 4, 5)}
                  fill="none"
                  stroke={candleColor}
                  strokeWidth={2}
                  opacity={0.5}
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
                return i === 0 || isNaN(movingAverage[i - 1]) ? `M ${x},${y}` : `L ${x},${y}`;
              })
              .join(' ');

            chartElements.push(
              <path
                key={`ma-${period}`}
                d={pathData}
                stroke={color}
                fill="none"
                strokeWidth={2}
                opacity={0.8}
              />
            );
          });
        }

        // Crosshair
        if (crosshair && candlestickOptions.enableCrosshair) {
          chartElements.push(
            <g key="crosshair" style={{ pointerEvents: 'none' }}>
              <line
                x1={crosshair.x}
                y1={padding.top}
                x2={crosshair.x}
                y2={chartHeight + padding.top}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="4,4"
                opacity={0.7}
              />
              <line
                x1={padding.left}
                y1={crosshair.y}
                x2={width - padding.right}
                y2={crosshair.y}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="4,4"
                opacity={0.7}
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
                const price = minPrice + ((maxPrice - minPrice) * i) / 5;
                return (
                  <line
                    key={`price-grid-${i}`}
                    x1={padding.left}
                    y1={priceScale(price)}
                    x2={width - padding.right}
                    y2={priceScale(price)}
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
                return (
                  <line
                    key={`time-grid-${i}`}
                    x1={xScale(i)}
                    y1={padding.top}
                    x2={xScale(i)}
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
                const price = minPrice + ((maxPrice - minPrice) * i) / 5;
                return (
                  <g key={`price-axis-${i}`}>
                    <line
                      x1={padding.left - 5}
                      y1={priceScale(price)}
                      x2={padding.left}
                      y2={priceScale(price)}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                    />
                    <text
                      x={padding.left - 10}
                      y={priceScale(price)}
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
                return (
                  <g key={`time-axis-${i}`}>
                    <line
                      x1={xScale(i)}
                      y1={chartHeight + padding.top}
                      x2={xScale(i)}
                      y2={chartHeight + padding.top + 5}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                    />
                    <text
                      x={xScale(i)}
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
            {candlestickOptions.showVolume && (
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
                  const volume = (maxVolume * (i + 1)) / 3;
                  return (
                    <g key={`volume-axis-${i}`}>
                      <line
                        x1={width - padding.right}
                        y1={volumeScale(volume)}
                        x2={width - padding.right + 5}
                        y2={volumeScale(volume)}
                        stroke="#e5e7eb"
                        strokeWidth={1}
                      />
                      <text
                        x={width - padding.right + 10}
                        y={volumeScale(volume)}
                        textAnchor="start"
                        dominantBaseline="middle"
                        fontSize="10"
                        fill="#374151"
                      >
                        {volume > 1000000
                          ? `${(volume / 1000000).toFixed(1)}M`
                          : `${(volume / 1000).toFixed(0)}K`}
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

      // OHLC Tooltip
      const ohlcTooltip = useMemo(() => {
        if (!candlestickOptions.showOHLCTooltip || !hoveredCandle) return null;

        const { data, x, y } = hoveredCandle;
        const isBullish = data.close >= data.open;
        const change = data.close - data.open;
        const changePercent = (change / data.open) * 100;

        return (
          <div
            className="ohlc-tooltip"
            style={{
              position: 'absolute',
              left: x + 10,
              top: y - 10,
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              fontSize: '0.875rem',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.175)',
              zIndex: 1000,
              pointerEvents: 'none',
              minWidth: '200px',
            }}
          >
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
                borderTop: '1px solid #e5e7eb',
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
      }, [candlestickOptions, hoveredCandle, formatDate]);

      return (
        <Chart ref={ref} type="candlestick" datasets={[]} config={config} {...props}>
          <div className={CHART.CANVAS_CLASS} style={{ position: 'relative' }}>
            {chartContent}
            {ohlcTooltip}
          </div>
          {candlestickOptions.showMovingAverages && candlestickOptions.movingAveragePeriods && (
            <div
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
                    style={{
                      width: '12px',
                      height: '2px',
                      backgroundColor: candlestickOptions.movingAverageColors?.[i] || '#FFD93D',
                      marginRight: '0.25rem',
                    }}
                  />
                  <span>MA{period}</span>
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
