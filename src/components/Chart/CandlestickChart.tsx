import { forwardRef, memo } from 'react';
import { CHART } from '../../lib/constants/components';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { ChartProps, ChartDataPoint, ChartRenderContentParams } from './types';

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

interface CandlestickChartProps extends Omit<ChartProps, 'type' | 'datasets' | 'data'> {
  /**
   * Candlestick chart data
   */
  candlestickData?: CandlestickDataPoint[];

  /**
   * Candlestick chart specific options
   */
  candlestickOptions?: {
    /**
     * Whether to show volume bars
     */
    showVolume?: boolean;
    /**
     * Volume bar height ratio (0-1)
     */
    volumeHeightRatio?: number;
    /**
     * Up color (when close > open)
     */
    upColor?: string;
    /**
     * Down color (when close < open)
     */
    downColor?: string;
    /**
     * Wick color
     */
    wickColor?: string;
    /**
     * Border color
     */
    borderColor?: string;
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
     * Date format
     */
    dateFormat?: 'short' | 'medium' | 'long' | 'numeric' | 'custom';
    /**
     * Custom date formatter function
     */
    dateFormatter?: (date: string | Date) => string;
    /**
     * Whether to show grid lines
     */
    showGrid?: boolean;
    /**
     * Grid color
     */
    gridColor?: string;
    /**
     * Whether to show tooltips
     */
    showTooltips?: boolean;
  };
}

const CandlestickChart = memo(
  forwardRef<HTMLDivElement, CandlestickChartProps>(
    (
      { candlestickData = [], config = {}, candlestickOptions = {}, onDataPointClick, ...props },
      ref
    ) => {
      const {
        showVolume = true,
        volumeHeightRatio = 0.2,
        upColor = 'var(--atomix-success-bg-subtle)',
        downColor = 'var(--atomix-error-bg-subtle)',
        wickColor = 'var(--atomix-brand-border-subtle)',
        borderColor = 'var(--atomix-primary-border-subtle)',
        showMovingAverages = false,
        movingAveragePeriods = [7, 21],
        movingAverageColors = ['var(--atomix-warning-bg-subtle)', 'var(--atomix-warning-border-subtle)'],
        dateFormat = 'short',
        dateFormatter,
        showGrid = true,
        gridColor = 'var(--atomix-brand-text-emphasis)',
        showTooltips = true,
      } = candlestickOptions;

      // Calculate moving averages
      const calculateMovingAverage = (data: CandlestickDataPoint[], period: number): number[] => {
        const result: number[] = [];
        for (let i = 0; i < data.length; i++) {
          if (i < period - 1) {
            result.push(NaN);
            continue;
          }

          const sum = data.slice(i - period + 1, i + 1).reduce((acc, item) => acc + item.close, 0);
          result.push(sum / period);
        }
        return result;
      };

      // Format date for display
      const formatDate = (date: string | Date) => {
        if (dateFormatter) {
          return dateFormatter(date);
        }

        const dateObj = typeof date === 'string' ? new Date(date) : date;

        switch (dateFormat) {
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
      };

      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
        toolbarState,
        config: renderConfig,
      }: ChartRenderContentParams) => {
        if (!candlestickData.length) return null;

        const showTooltips = toolbarState?.showTooltips ?? renderConfig?.showTooltips ?? candlestickOptions.showTooltips ?? true;

        const padding = 40;
        const chartWidth = scales.width - padding * 2;
        const chartHeight = scales.height - padding * 2;
        const volumeHeight = showVolume ? chartHeight * volumeHeightRatio : 0;
        const priceHeight = chartHeight - volumeHeight;

        // Calculate price scale
        const allHighs = candlestickData.map(d => d.high);
        const allLows = candlestickData.map(d => d.low);
        const priceMin = Math.min(...allLows);
        const priceMax = Math.max(...allHighs);
        const priceRange = priceMax - priceMin || 1;

        // Calculate volume scale
        const volumes = candlestickData.map(d => d.volume || 0);
        const volumeMax = Math.max(...volumes);
        const volumeRange = volumeMax || 1;

        // Draw grid
        const gridLines: React.ReactNode[] = [];
        if (showGrid) {
          // Horizontal grid lines for price
          for (let i = 0; i <= 5; i++) {
            const y = padding + (i / 5) * priceHeight;
            gridLines.push(
              <line
                key={`price-grid-${i}`}
                x1={padding}
                y1={y}
                x2={padding + chartWidth}
                y2={y}
                stroke={gridColor}
                strokeWidth="0.5"
                strokeDasharray="4 2"
              />
            );
          }

          // Vertical grid lines for time
          const step = Math.max(1, Math.floor(candlestickData.length / 10));
          for (let i = 0; i < candlestickData.length; i += step) {
            const x = padding + (i / (candlestickData.length - 1)) * chartWidth;
            gridLines.push(
              <line
                key={`time-grid-${i}`}
                x1={x}
                y1={padding}
                x2={x}
                y2={padding + priceHeight}
                stroke={gridColor}
                strokeWidth="0.5"
                strokeDasharray="4 2"
              />
            );
          }
        }

        // Draw candles
        const candles = candlestickData.map((candle, index) => {
          const isUp = candle.close >= candle.open;
          const color = isUp ? upColor : downColor;

          // Calculate coordinates
          const x = padding + (index / (candlestickData.length - 1)) * chartWidth;
          const highY = padding + ((priceMax - candle.high) / priceRange) * priceHeight;
          const lowY = padding + ((priceMax - candle.low) / priceRange) * priceHeight;
          const openY = padding + ((priceMax - candle.open) / priceRange) * priceHeight;
          const closeY = padding + ((priceMax - candle.close) / priceRange) * priceHeight;

          const candleTop = Math.min(openY, closeY);
          const candleHeight = Math.abs(openY - closeY);
          const candleWidth = Math.max(1, (chartWidth / candlestickData.length) * 0.8);

          return (
            <g key={`candle-${index}`}>
              {/* Wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={wickColor}
                strokeWidth="1"
                className="c-chart__candlestick-wick"
              />
              {/* Candle body */}
              <rect
                x={x - candleWidth / 2}
                y={candleTop}
                width={candleWidth}
                height={candleHeight || 1}
                fill={color}
                stroke={borderColor}
                strokeWidth="1"
                className="c-chart__candlestick-candle"
                onMouseEnter={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handlers.onPointHover(
                    0,
                    index,
                    x,
                    highY,
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2
                  );
                }}
                onMouseLeave={handlers.onPointLeave}
                onClick={() => handlers.onDataPointClick?.(candle as unknown as ChartDataPoint, 0, index)}
              />
            </g>
          );
        });

        // Draw volume bars
        const volumeBars: React.ReactNode[] = [];
        if (showVolume) {
          const volumeY = padding + priceHeight + 20;

          candlestickData.forEach((candle, index) => {
            if (!candle.volume) return;

            const isUp = candle.close >= candle.open;
            const color = isUp ? upColor : downColor;

            const x = padding + (index / (candlestickData.length - 1)) * chartWidth;
            const barHeight = (candle.volume / volumeRange) * (volumeHeight - 20);
            const barWidth = Math.max(1, (chartWidth / candlestickData.length) * 0.6);

            volumeBars.push(
              <rect
                key={`volume-${index}`}
                x={x - barWidth / 2}
                y={volumeY + volumeHeight - barHeight}
                width={barWidth}
                height={barHeight}
                fill={color}
                fillOpacity="0.7"
                className="c-chart__candlestick-volume"
              />
            );
          });
        }

        // Draw moving averages
        const movingAverages: React.ReactNode[] = [];
        if (showMovingAverages) {
          movingAveragePeriods.forEach((period, periodIndex) => {
            const movingAverage = calculateMovingAverage(candlestickData, period);
            const color = movingAverageColors?.[periodIndex] || 'var(--atomix-warning)';

            const points = movingAverage
              .map((value, i) => {
                if (isNaN(value)) return null;
                const x = padding + (i / (candlestickData.length - 1)) * chartWidth;
                const y = padding + ((priceMax - value) / priceRange) * priceHeight;
                return { x, y };
              })
              .filter(Boolean) as { x: number; y: number }[];

            if (points.length > 1) {
              const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
              movingAverages.push(
                <path
                  key={`ma-${period}`}
                  d={path}
                  stroke={color}
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="5,5"
                />
              );
            }
          });
        }

        return (
          <>
            {gridLines}
            {candles}
            {volumeBars}
            {movingAverages}
            {showTooltips &&
              hoveredPoint &&
              candlestickData[hoveredPoint.pointIndex] && (
                <ChartTooltip
                  dataPoint={candlestickData[hoveredPoint.pointIndex] as unknown as ChartDataPoint}
                  datasetLabel="Candlestick"
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
          type="candlestick"
          datasets={[
            {
              label: 'Candlestick Data',
              data: candlestickData.map(candle => ({
                label: candle.date.toString(),
                value: candle.close,
                metadata: {
                  open: candle.open,
                  high: candle.high,
                  low: candle.low,
                  close: candle.close,
                  volume: candle.volume,
                },
              })),
            },
          ]}
          config={config}
          renderContent={renderContent}
          onDataPointClick={onDataPointClick}
          {...props}
        />
      );
    }
  )
);

CandlestickChart.displayName = 'CandlestickChart';
export default CandlestickChart;
export type { CandlestickChartProps, CandlestickDataPoint };
