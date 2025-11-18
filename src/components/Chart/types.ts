import React, { ReactNode } from 'react';
import { BaseComponentProps, Size, Variant, AtomixGlassProps } from '../../lib/types/components';

/**
 * Chart types - comprehensive list
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
 * Chart data point interface
 */
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

/**
 * Scatter chart data point interface
 */
export interface ScatterDataPoint extends ChartDataPoint {
  x: number;
  y: number;
  size?: number;
}

/**
 * Chart dataset interface
 */
export interface ChartDataset {
  label: string;
  data: ChartDataPoint[];
  color?: string;
  visible?: boolean;
}

/**
 * Chart axis configuration
 */
export interface ChartAxis {
  label?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  min?: number;
  max?: number;
  formatter?: (value: number) => string;
  ticks?: number;
}

/**
 * Chart configuration
 */
export interface ChartConfig {
  xAxis?: ChartAxis;
  yAxis?: ChartAxis;
  showLegend?: boolean;
  showTooltips?: boolean;
  animate?: boolean;
  animationDuration?: number;
}

/**
 * Extended chart size options
 */
export type ChartSize = Size | 'xl' | 'full';

/**
 * Comprehensive chart props interface
 */
export interface ChartProps extends BaseComponentProps {
  /**
   * Chart type
   */
  type?: ChartType;

  /**
   * Chart data (simplified)
   */
  data?: ChartDataPoint[];

  /**
   * Chart datasets (advanced)
   */
  datasets?: ChartDataset[];

  /**
   * Chart configuration
   */
  config?: ChartConfig;

  /**
   * Chart size
   */
  size?: ChartSize;

  /**
   * Chart variant
   */
  variant?: Variant;

  /**
   * Glass morphism effect
   * When true, applies default glass effect. When an object, allows custom glass configuration.
   */
  glass?: boolean | AtomixGlassProps;

  /**
   * Chart title
   */
  title?: string;

  /**
   * Chart subtitle
   */
  subtitle?: string;

  /**
   * Whether to show legend
   */
  showLegend?: boolean;

  /**
   * Whether chart is interactive
   */
  interactive?: boolean;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Fullscreen mode
   */
  fullscreen?: boolean;

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
   * Data point click handler
   */
  onDataPointClick?: (dataPoint: ChartDataPoint, datasetIndex: number, pointIndex: number) => void;

  /**
   * Legend item click handler
   */
  onLegendItemClick?: (datasetIndex: number, visible: boolean) => void;

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
   * Chart content for wrapper usage
   */
  children?: ReactNode;

  /**
   * Accessibility label
   */
  'aria-label'?: string;

  /**
   * Toolbar configuration
   */
  toolbarConfig?: {
    enableDefaults?: boolean;
    defaults?: {
      refresh?: boolean;
      export?: boolean;
      fullscreen?: boolean;
      settings?: boolean;
      zoom?: boolean;
      pan?: boolean;
      reset?: boolean;
      grid?: boolean;
      legend?: boolean;
      tooltips?: boolean;
      animations?: boolean;
    };
    handlers?: {
      onRefresh?: () => void;
      onExport?: (format: string) => Promise<void> | void;
      onFullscreen?: (isFullscreen: boolean) => void;
      onZoomIn?: () => void;
      onZoomOut?: () => void;
      onZoomReset?: () => void;
      onPanToggle?: (enabled: boolean) => void;
      onReset?: () => void;
      onGridToggle?: (show: boolean) => void;
      onLegendToggle?: (show: boolean) => void;
      onTooltipsToggle?: (show: boolean) => void;
      onAnimationsToggle?: (enabled: boolean) => void;
    };
  };

  /**
   * Custom toolbar actions
   */
  customToolbarActions?: Array<{
    id: string;
    label: string;
    icon: string;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
    variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
    tooltip?: string;
  }>;

  /**
   * Custom toolbar groups
   */
  customToolbarGroups?: Array<{
    id: string;
    label?: string;
    actions: Array<{
      id: string;
      label: string;
      icon: string;
      onClick: () => void;
      disabled?: boolean;
      active?: boolean;
      variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
      tooltip?: string;
    }>;
    separator?: boolean;
  }>;
}

/**
 * Chart scales interface
 * Imported from useChart for consistency
 */
export type { ChartScales } from '../../lib/composables/useChart';

/**
 * Chart interaction state
 */
export interface ChartInteraction {
  hoveredIndex: number | null;
  selectedIndex: number | null;
}

/**
 * Chart hovered point state
 */
export interface ChartHoveredPoint {
  datasetIndex: number;
  pointIndex: number;
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}

/**
 * Chart event handlers interface
 */
export interface ChartHandlers {
  onDataPointClick?: (dataPoint: ChartDataPoint, datasetIndex: number, pointIndex: number) => void;
  onPointHover: (
    datasetIndex: number,
    pointIndex: number,
    x: number,
    y: number,
    clientX: number,
    clientY: number
  ) => void;
  onPointLeave: () => void;
  onMouseMove: (event: React.MouseEvent<SVGSVGElement>) => void;
  onMouseDown: (event: React.MouseEvent<SVGSVGElement>) => void;
  onMouseUp: () => void;
  onWheel: (event: React.WheelEvent<SVGSVGElement>) => void;
}

/**
 * Chart accessibility interface
 */
export interface ChartAccessibility {
  announcement: string;
  focusedPoint: { datasetIndex: number; pointIndex: number };
  getAccessibleDescription: () => string;
}

/**
 * Chart toolbar state
 */
export interface ChartToolbarState {
  showTooltips?: boolean;
  showLegend?: boolean;
  animationsEnabled?: boolean;
  showGrid?: boolean;
}

/**
 * Chart render content parameters
 */
export interface ChartRenderContentParams {
  scales: ChartScales;
  colors: string[];
  datasets: ChartDataset[];
  interactionState?: ChartInteraction;
  handlers: ChartHandlers;
  accessibility: ChartAccessibility;
  hoveredPoint: ChartHoveredPoint | null;
  toolbarState?: ChartToolbarState;
  config?: ChartConfig;
}

/**
 * Chart toolbar configuration interface
 */
export interface ChartToolbarConfig {
  enableDefaults?: boolean;
  defaults?: {
    refresh?: boolean;
    export?: boolean;
    fullscreen?: boolean;
    settings?: boolean;
    zoom?: boolean;
    pan?: boolean;
    reset?: boolean;
    grid?: boolean;
    legend?: boolean;
    tooltips?: boolean;
    animations?: boolean;
  };
  exportFormats?: ('png' | 'svg' | 'csv' | 'json' | 'pdf')[];
  customActions?: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
    variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
    tooltip?: string;
  }>;
  customGroups?: Array<{
    id: string;
    label?: string;
    actions: Array<{
      id: string;
      label: string;
      icon: React.ReactNode;
      onClick: () => void;
      disabled?: boolean;
      active?: boolean;
      variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
      tooltip?: string;
    }>;
    separator?: boolean;
  }>;
}
