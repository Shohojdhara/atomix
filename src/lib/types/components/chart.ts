import React, { ReactNode } from 'react';
import { Size, Variant, BaseComponentProps } from './common';


// ============================================================================
// CHART COMPONENT TYPES
// ============================================================================

/**
 * Chart type options
 */
export type ChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'horizontal-bar'
  | 'pie'
  | 'donut'
  | 'doughnut'
  | 'scatter'
  | 'radar'
  | 'bubble'
  | 'candlestick'
  | 'interactive'
  | 'advanced'
  | 'gauge'
  | 'funnel'
  | 'waterfall'
  | 'heatmap'
  | 'treemap'
  | 'realtime';


/**
 * Extended size options for charts
 */
export type ChartSize = Size | 'xl' | 'full';


/**
 * Chart data point interface
 */
export interface ChartDataPoint {
  /**
   * Data point label
   */
  label: string;

  /**
   * Data point value
   */
  value: number;

  /**
   * Optional color for this data point
   */
  color?: string;

  /**
   * Optional metadata
   */
  metadata?: Record<string, any>;
}


/**
 * Chart dataset interface
 */
export interface ChartDataset {
  /**
   * Dataset label
   */
  label: string;

  /**
   * Dataset data points
   */
  data: ChartDataPoint[];

  /**
   * Dataset color
   */
  color?: string;

  /**
   * Whether this dataset is visible
   */
  visible?: boolean;
}


/**
 * Chart axis configuration
 */
export interface ChartAxis {
  /**
   * Axis label
   */
  label?: string;

  /**
   * Whether to show grid lines
   */
  showGrid?: boolean;

  /**
   * Whether to show axis labels
   */
  showLabels?: boolean;

  /**
   * Minimum value
   */
  min?: number;

  /**
   * Maximum value
   */
  max?: number;

  /**
   * Value formatter function
   */
  formatter?: (value: number) => string;

  /**
   * Number of ticks
   */
  ticks?: number;
}


/**
 * Chart configuration
 */
export interface ChartConfig {
  /**
   * X-axis configuration
   */
  xAxis?: ChartAxis;

  /**
   * Y-axis configuration
   */
  yAxis?: ChartAxis;

  /**
   * Whether to show legend
   */
  showLegend?: boolean;

  /**
   * Whether to show tooltips
   */
  showTooltips?: boolean;

  /**
   * Whether to animate the chart
   */
  animate?: boolean;

  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;
}


/**
 * Chart component properties
 */
export interface ChartProps extends BaseComponentProps {
  /**
   * Chart type
   */
  type?: ChartType;

  /**
   * Chart datasets
   */
  datasets?: ChartDataset[];

  /**
   * Chart configuration
   */
  config?: ChartConfig;

  /**
   * Chart title
   */
  title?: string;

  /**
   * Chart subtitle
   */
  subtitle?: string;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Chart size
   */
  size?: ChartSize;

  /**
   * Chart variant
   */
  variant?: Variant;

  /**
   * Chart content (for wrapper chart component)
   */
  children?: React.ReactNode;

  /**
   * Click handler for data points
   */
  onDataPointClick?: (dataPoint: ChartDataPoint, datasetIndex: number, pointIndex: number) => void;

  /**
   * Legend item click handler
   */
  onLegendItemClick?: (datasetIndex: number, visible: boolean) => void;

  /**
   * Interactive mode - enables hover/click effects
   */
  interactive?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Fullscreen mode
   */
  fullscreen?: boolean;

  /**
   * Minimized mode
   */
  minimized?: boolean;

  /**
   * Show toolbar with actions
   */
  showToolbar?: boolean;

  /**
   * Enable fullscreen functionality
   */
  enableFullscreen?: boolean;

  /**
   * Enable export functionality
   */
  enableExport?: boolean;

  /**
   * Enable refresh functionality
   */
  enableRefresh?: boolean;

  /**
   * Available export formats
   */
  exportFormats?: ('png' | 'svg' | 'csv' | 'json')[];

  /**
   * Fullscreen state change handler
   */
  onFullscreen?: (isFullscreen: boolean) => void;

  /**
   * Export handler
   */
  onExport?: (format: string) => Promise<void> | void;

  /**
   * Refresh handler
   */
  onRefresh?: () => void;

  /**
   * Custom toolbar actions
   */
  toolbarActions?: React.ReactNode;

  /**
   * Empty state configuration
   */
  emptyState?: {
    message?: string;
    icon?: React.ReactNode;
  };

  /**
   * Accessibility label
   */
  'aria-label'?: string;
}
