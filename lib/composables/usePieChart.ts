import { useCallback, useMemo, useState } from 'react';
import { ChartDataPoint } from '../types/components';

/**
 * Pie chart specific options
 */
export interface PieChartOptions {
  /**
   * Inner radius for donut charts (0-1)
   */
  innerRadius?: number;

  /**
   * Whether to show labels
   */
  showLabels?: boolean;

  /**
   * Whether to show percentages
   */
  showPercentages?: boolean;

  /**
   * Whether to show values
   */
  showValues?: boolean;

  /**
   * Start angle in degrees
   */
  startAngle?: number;

  /**
   * Whether to sort slices by value
   */
  sortByValue?: boolean;

  /**
   * Padding angle between slices in degrees
   */
  padAngle?: number;

  /**
   * Whether to enable animations
   */
  enableAnimations?: boolean;

  /**
   * Whether to enable hover effects
   */
  enableHoverEffects?: boolean;

  /**
   * Whether to enable selection
   */
  enableSelection?: boolean;

  /**
   * Hover offset in pixels
   */
  hoverOffset?: number;

  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;

  /**
   * Label formatter function
   */
  labelFormatter?: (value: number, percentage: number, label: string) => string;
}

/**
 * Pie slice interface
 */
export interface PieSlice {
  dataPoint: ChartDataPoint;
  index: number;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  color: string;
  percentage: number;
  value: number;
  label: string;
  path: string;
  labelPosition: { x: number; y: number };
  clientX?: number;
  clientY?: number;
}

/**
 * Hook for pie chart functionality
 */
export function usePieChart(data: ChartDataPoint[], options: PieChartOptions = {}) {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [selectedSlices, setSelectedSlices] = useState<Set<number>>(new Set());
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Filter and sort data
  const processedData = useMemo(() => {
    // Filter out invalid data points
    const validData = data.filter(
      point =>
        typeof point.value === 'number' &&
        !isNaN(point.value) &&
        isFinite(point.value) &&
        point.value > 0
    );

    if (!validData.length) return [];

    // Sort by value if enabled
    if (options.sortByValue) {
      return [...validData].sort((a, b) => b.value - a.value);
    }

    return validData;
  }, [data, options.sortByValue]);

  // Calculate total value
  const totalValue = useMemo(() => {
    return processedData.reduce((sum, point) => sum + point.value, 0);
  }, [processedData]);

  // Generate pie slices
  const slices = useMemo(() => {
    if (!processedData.length || totalValue <= 0) return [];

    const centerX = 400; // Default center
    const centerY = 200;
    const outerRadius = 150;
    const innerRadius = outerRadius * (options.innerRadius || 0);

    const defaultColors = [
      '#7AFFD7',
      '#1AFFD2',
      '#00E6C3',
      '#4DFF9F',
      '#1AFF85',
      '#00E66B',
      '#DD6061',
      '#FF1A1A',
      '#E60000',
      '#FFCC00',
      '#E6B800',
      '#B38F00',
    ];

    let currentAngle = ((options.startAngle || 0) * Math.PI) / 180;
    const padAngleRad = ((options.padAngle || 1) * Math.PI) / 180;

    return processedData.map((point, i) => {
      const percentage = point.value / totalValue;
      const angle = percentage * 2 * Math.PI - padAngleRad;
      const endAngle = currentAngle + angle;
      const midAngle = currentAngle + angle / 2;

      // Calculate path
      const outerStartX = centerX + outerRadius * Math.cos(currentAngle);
      const outerStartY = centerY + outerRadius * Math.sin(currentAngle);
      const outerEndX = centerX + outerRadius * Math.cos(endAngle);
      const outerEndY = centerY + outerRadius * Math.sin(endAngle);

      const largeArcFlag = angle > Math.PI ? 1 : 0;

      let path: string;

      if (innerRadius > 0) {
        // Donut chart path
        const innerStartX = centerX + innerRadius * Math.cos(endAngle);
        const innerStartY = centerY + innerRadius * Math.sin(endAngle);
        const innerEndX = centerX + innerRadius * Math.cos(currentAngle);
        const innerEndY = centerY + innerRadius * Math.sin(currentAngle);

        path = [
          `M ${outerStartX},${outerStartY}`,
          `A ${outerRadius},${outerRadius} 0 ${largeArcFlag},1 ${outerEndX},${outerEndY}`,
          `L ${innerStartX},${innerStartY}`,
          `A ${innerRadius},${innerRadius} 0 ${largeArcFlag},0 ${innerEndX},${innerEndY}`,
          'Z',
        ].join(' ');
      } else {
        // Pie chart path
        path = [
          `M ${centerX},${centerY}`,
          `L ${outerStartX},${outerStartY}`,
          `A ${outerRadius},${outerRadius} 0 ${largeArcFlag},1 ${outerEndX},${outerEndY}`,
          'Z',
        ].join(' ');
      }

      // Calculate label position
      const labelRadius = (outerRadius + innerRadius) / 2 || outerRadius * 0.7;
      const labelX = centerX + labelRadius * Math.cos(midAngle);
      const labelY = centerY + labelRadius * Math.sin(midAngle);

      const slice: PieSlice = {
        dataPoint: point,
        index: i,
        startAngle: currentAngle,
        endAngle,
        midAngle,
        color: (point.color || defaultColors[i % defaultColors.length]) as string,
        percentage: percentage * 100,
        value: point.value,
        label: point.label,
        path,
        labelPosition: { x: labelX, y: labelY },
      };

      currentAngle = endAngle + padAngleRad;

      return slice;
    });
  }, [processedData, totalValue, options.innerRadius, options.startAngle, options.padAngle]);

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

  // Slice interaction handlers
  const handleSliceHover = useCallback(
    (index: number, clientX?: number, clientY?: number) => {
      if (!options.enableHoverEffects) return;
      setHoveredSlice(index);

      // Store client coordinates for tooltip positioning
      if (clientX !== undefined && clientY !== undefined && slices[index]) {
        slices[index].clientX = clientX;
        slices[index].clientY = clientY;
      }
    },
    [options.enableHoverEffects, slices]
  );

  const handleSliceLeave = useCallback(() => {
    setHoveredSlice(null);
  }, []);

  const handleSliceClick = useCallback(
    (index: number) => {
      if (!options.enableSelection) return;

      setSelectedSlices(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    },
    [options.enableSelection]
  );

  // Format label
  const formatLabel = useCallback(
    (slice: PieSlice) => {
      if (options.labelFormatter) {
        return options.labelFormatter(slice.value, slice.percentage, slice.label);
      }

      const parts = [];

      if (options.showLabels !== false) {
        parts.push(slice.label);
      }

      if (options.showPercentages) {
        parts.push(`${Math.round(slice.percentage)}%`);
      }

      if (options.showValues) {
        parts.push(slice.value.toString());
      }

      return parts.join(' - ');
    },
    [options.labelFormatter, options.showLabels, options.showPercentages, options.showValues]
  );

  // Get slice transform for hover effect
  const getSliceTransform = useCallback(
    (slice: PieSlice, isHovered: boolean) => {
      if (!isHovered || !options.enableHoverEffects || !options.hoverOffset) {
        return '';
      }

      const offsetX = Math.cos(slice.midAngle) * options.hoverOffset;
      const offsetY = Math.sin(slice.midAngle) * options.hoverOffset;

      return `translate(${offsetX}, ${offsetY})`;
    },
    [options.enableHoverEffects, options.hoverOffset]
  );

  // Check if slice is selected
  const isSliceSelected = useCallback(
    (index: number) => {
      return selectedSlices.has(index);
    },
    [selectedSlices]
  );

  return {
    // Data
    processedData,
    slices,
    totalValue,

    // State
    hoveredSlice,
    selectedSlices,
    animationProgress,
    isAnimating,

    // Handlers
    handleSliceHover,
    handleSliceLeave,
    handleSliceClick,
    startAnimation,

    // Utilities
    formatLabel,
    getSliceTransform,
    isSliceSelected,

    // State setters
    setHoveredSlice,
    setSelectedSlices,
    setAnimationProgress,
    setIsAnimating,
  };
}
