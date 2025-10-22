import AnimatedChart from './AnimatedChart';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import BaseChart from './BaseChart';
import BubbleChart from './BubbleChart';
import CandlestickChart from './CandlestickChart';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';
import ChartToolbar from './ChartToolbar';
import ChartTooltip from './ChartTooltip';
import DonutChart from './DonutChart';
import FunnelChart from './FunnelChart';
import GaugeChart from './GaugeChart';
import HeatmapChart from './HeatmapChart';
import LineChart from './LineChart';
import MultiAxisChart from './MultiAxisChart';
import PieChart from './PieChart';
import RadarChart from './RadarChart';
import ScatterChart from './ScatterChart';

import TreemapChart from './TreemapChart';
import WaterfallChart from './WaterfallChart';
import * as ChartUtils from './utils';

// Export all chart components
export {
  AnimatedChart,
  AreaChart,
  BarChart,
  BaseChart,
  BubbleChart,
  CandlestickChart,
  Chart,
  ChartRenderer,
  ChartToolbar,
  ChartTooltip,
  DonutChart,
  FunnelChart,
  GaugeChart,
  HeatmapChart,
  LineChart,
  MultiAxisChart,
  PieChart,
  RadarChart,
  ScatterChart,
  TreemapChart,
  WaterfallChart,
  ChartUtils,
};

// Export chart context
export { ChartContext, useChartContext } from './Chart';

// Export chart hooks
export { useBarChart } from '../../lib/composables/useBarChart';
export {
  useChart,
  useChartAccessibility,
  useChartData,
  useChartPerformance,
} from '../../lib/composables/useChart';
export { useChartAnalytics } from '../../lib/composables/useChartAnalytics';
export { useChartExport } from '../../lib/composables/useChartExport';
export { useChartToolbar } from '../../lib/composables/useChartToolbar';
export { useLineChart } from '../../lib/composables/useLineChart';
export { usePieChart } from '../../lib/composables/usePieChart';

// Export chart component types
export type { AreaChartProps } from './AreaChart';
export type { BarChartProps } from './BarChart';
export type { BaseChartProps } from './BaseChart';
export type { BubbleChartProps, BubbleDataPoint } from './BubbleChart';
export type { CandlestickChartProps, CandlestickDataPoint } from './CandlestickChart';
export type { ChartToolbarAction, ChartToolbarGroup, ChartToolbarProps } from './ChartToolbar';
export type { ChartTooltipProps, TooltipPosition } from './ChartTooltip';
export type { DonutChartProps } from './DonutChart';
export type { FunnelChartProps, FunnelDataPoint } from './FunnelChart';
export type { GaugeChartProps } from './GaugeChart';
export type { HeatmapChartProps, HeatmapDataPoint } from './HeatmapChart';
export type { LineChartProps } from './LineChart';
export type { MultiAxisChartProps } from './MultiAxisChart';
export type { PieChartProps } from './PieChart';
export type { RadarChartProps } from './RadarChart';
export type { ScatterChartProps, ScatterDataPoint } from './ScatterChart';

export type { TreemapChartProps, TreemapDataPoint, TreemapNode } from './TreemapChart';
export type {
  ChartConfig,
  ChartDataPoint,
  ChartDataset,
  ChartProps,
  ChartToolbarConfig,
  ChartType,
} from './types';
export type { WaterfallChartProps, WaterfallDataPoint } from './WaterfallChart';

// Export hook types
export type { BarChartOptions, BarDimensions } from '../../lib/composables/useBarChart';
export type { ChartInteractionState, ChartScales } from '../../lib/composables/useChart';
export type {
  ChartToolbarHandlers,
  ChartToolbarState,
  ChartToolbarConfig as ToolbarConfig,
} from '../../lib/composables/useChartToolbar';
export type { LineChartOptions } from '../../lib/composables/useLineChart';
export type { PieChartOptions, PieSlice } from '../../lib/composables/usePieChart';

// Export additional chart hook types

export type {
  AnomalyDetection,
  CorrelationAnalysis,
  SeasonalityAnalysis,
  StatisticalAnalysis,
  TrendAnalysis,
} from '../../lib/composables/useChartAnalytics';
export type { ExportOptions, ShareOptions } from '../../lib/composables/useChartExport';

// Default export
export default Chart;
