import { useCallback, useMemo, useState } from 'react';
import { ChartDataset } from '../types/components';

/**
 * Bar chart specific options
 */
export interface BarChartOptions {
  /**
   * Whether bars are stacked
   */
  stacked?: boolean;

  /**
   * Whether to show values on bars
   */
  showValues?: boolean;

  /**
   * Corner radius for bars
   */
  cornerRadius?: number;

  /**
   * Padding between bar groups
   */
  groupPadding?: number;

  /**
   * Padding between individual bars
   */
  barPadding?: number;

  /**
   * Whether to enable animations
   */
  enableAnimations?: boolean;

  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;

  /**
   * Animation delay between bars
   */
  animationDelay?: number;

  /**
   * Whether to use gradients
   */
  useGradients?: boolean;

  /**
   * Whether to enable hover effects
   */
  enableHoverEffects?: boolean;

  /**
   * Whether to enable data labels
   */
  enableDataLabels?: boolean;

  /**
   * Data label position
   */
  dataLabelPosition?: 'inside' | 'outside' | 'center';

  /**
   * Value formatter function
   */
  valueFormatter?: (value: number) => string;

  /**
   * Minimum bar height
   */
  minBarHeight?: number;

  /**
   * Maximum bar width
   */
  maxBarWidth?: number;
}

/**
 * Bar dimensions interface
 */
export interface BarDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  datasetIndex: number;
  pointIndex: number;
}

/**
 * Hook for bar chart functionality
 */
export function useBarChart(datasets: ChartDataset[], options: BarChartOptions = {}) {
  const [hoveredBar, setHoveredBar] = useState<{
    datasetIndex: number;
    pointIndex: number;
    x: number;
    y: number;
  } | null>(null);

  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate bar dimensions
  const calculateBarDimensions = useCallback(
    (
      datasets: ChartDataset[],
      width: number,
      height: number,
      padding = { top: 20, right: 30, bottom: 40, left: 50 },
      horizontal = false
    ): BarDimensions[] => {
      if (!datasets.length) return [];

      const innerWidth = width - padding.left - padding.right;
      const innerHeight = height - padding.top - padding.bottom;
      const numCategories = datasets[0]?.data?.length || 0;
      const numDatasets = datasets.length;

      if (numCategories === 0) return [];

      // Calculate value bounds
      const allValues = datasets.flatMap(
        dataset => dataset.data?.map(d => d.value).filter(v => typeof v === 'number') || []
      );
      const minValue = Math.min(0, ...allValues);
      const maxValue = Math.max(...allValues);
      const valueRange = maxValue - minValue;

      const bars: BarDimensions[] = [];
      const stackedPositions = Array(numCategories).fill(0);

      datasets.forEach((dataset, datasetIndex) => {
        dataset.data?.forEach((point, categoryIndex) => {
          const value = typeof point.value === 'number' ? point.value : 0;
          if (isNaN(value) || !isFinite(value)) return;

          let barX, barY, barWidth, barHeight;

          if (horizontal) {
            const categoryHeight = innerHeight / numCategories;
            const availableHeight = categoryHeight * (1 - (options.groupPadding || 0.2));

            barHeight = options.stacked ? availableHeight : availableHeight / numDatasets;
            barY =
              padding.top + categoryIndex * categoryHeight + (categoryHeight - availableHeight) / 2;

            if (!options.stacked) {
              barY += datasetIndex * barHeight * (1 + (options.barPadding || 0.05));
            }

            barX = padding.left;
            barWidth = ((value - minValue) / valueRange) * innerWidth;

            if (options.stacked && datasetIndex > 0) {
              barX =
                padding.left +
                ((stackedPositions[categoryIndex] - minValue) / valueRange) * innerWidth;
              stackedPositions[categoryIndex] += value;
            } else if (options.stacked) {
              stackedPositions[categoryIndex] = value;
            }
          } else {
            const categoryWidth = innerWidth / numCategories;
            const availableWidth = categoryWidth * (1 - (options.groupPadding || 0.2));

            barWidth = options.stacked ? availableWidth : availableWidth / numDatasets;
            barX =
              padding.left + categoryIndex * categoryWidth + (categoryWidth - availableWidth) / 2;

            if (!options.stacked) {
              barX += datasetIndex * barWidth * (1 + (options.barPadding || 0.05));
            }

            barHeight = ((value - minValue) / valueRange) * innerHeight;
            barY = height - padding.bottom - barHeight;

            if (options.stacked && datasetIndex > 0) {
              const stackedHeight =
                ((stackedPositions[categoryIndex] - minValue) / valueRange) * innerHeight;
              barY = height - padding.bottom - stackedHeight - barHeight;
              stackedPositions[categoryIndex] += value;
            } else if (options.stacked) {
              stackedPositions[categoryIndex] = value;
            }
          }

          // Apply minimum bar height
          if (options.minBarHeight && (horizontal ? barWidth : barHeight) < options.minBarHeight) {
            if (horizontal) {
              barWidth = options.minBarHeight;
            } else {
              barHeight = options.minBarHeight;
              barY = height - padding.bottom - barHeight;
            }
          }

          // Apply maximum bar width
          if (options.maxBarWidth && (horizontal ? barHeight : barWidth) > options.maxBarWidth) {
            if (horizontal) {
              barHeight = options.maxBarWidth;
              barY =
                padding.top +
                categoryIndex * (innerHeight / numCategories) +
                (innerHeight / numCategories - barHeight) / 2;
            } else {
              barWidth = options.maxBarWidth;
              barX = padding.left + categoryIndex * categoryWidth + (categoryWidth - barWidth) / 2;
            }
          }

          bars.push({
            x: Math.max(barX, 0),
            y: Math.max(barY, 0),
            width: Math.max(barWidth, 0),
            height: Math.max(barHeight, 0),
            value,
            datasetIndex,
            pointIndex: categoryIndex,
          });
        });
      });

      return bars;
    },
    [
      options.stacked,
      options.groupPadding,
      options.barPadding,
      options.minBarHeight,
      options.maxBarWidth,
    ]
  );

  // Animation helpers
  const startAnimation = useCallback(() => {
    if (!options.enableAnimations) return;

    setIsAnimating(true);
    setAnimationProgress(0);

    const duration = options.animationDuration || 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [options.enableAnimations, options.animationDuration]);

  // Bar hover handlers
  const handleBarHover = useCallback(
    (datasetIndex: number, pointIndex: number, x: number, y: number) => {
      setHoveredBar({ datasetIndex, pointIndex, x, y });
    },
    []
  );

  const handleBarLeave = useCallback(() => {
    setHoveredBar(null);
  }, []);

  // Generate gradient definitions
  const generateGradients = useCallback(
    (datasets: ChartDataset[]) => {
      if (!options.useGradients) return [];

      return datasets.map((dataset, index) => {
        const baseColor = dataset.color || `var(--atomix-color-${index + 1})`;

        return {
          id: `bar-gradient-${index}`,
          stops: [
            { offset: '0%', color: baseColor, opacity: 0.8 },
            { offset: '100%', color: baseColor, opacity: 0.4 },
          ],
        };
      });
    },
    [options.useGradients]
  );

  // Format value for display
  const formatValue = useCallback(
    (value: number) => {
      if (options.valueFormatter) {
        return options.valueFormatter(value);
      }
      return value.toString();
    },
    [options.valueFormatter]
  );

  // Calculate data label position
  const getDataLabelPosition = useCallback(
    (bar: BarDimensions, horizontal = false) => {
      const { x, y, width, height } = bar;

      switch (options.dataLabelPosition) {
        case 'inside':
          return {
            x: horizontal ? x + width / 2 : x + width / 2,
            y: horizontal ? y + height / 2 : y + height / 2,
          };
        case 'outside':
          return {
            x: horizontal ? x + width + 5 : x + width / 2,
            y: horizontal ? y + height / 2 : y - 5,
          };
        case 'center':
        default:
          return {
            x: x + width / 2,
            y: y + height / 2,
          };
      }
    },
    [options.dataLabelPosition]
  );

  return {
    // State
    hoveredBar,
    animationProgress,
    isAnimating,

    // Calculations
    calculateBarDimensions,
    generateGradients,
    getDataLabelPosition,

    // Handlers
    handleBarHover,
    handleBarLeave,
    startAnimation,

    // Utilities
    formatValue,

    // State setters
    setHoveredBar,
    setAnimationProgress,
    setIsAnimating,
  };
}
