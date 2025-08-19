import AdvancedChart from './AdvancedChart';
import AnimatedChart from './AnimatedChart';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import BubbleChart from './BubbleChart';
import CandlestickChart from './CandlestickChart';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';
import ChartTooltip from './ChartTooltip';
import ChartToolbar from './ChartToolbar';
import DonutChart from './DonutChart';
import FunnelChart from './FunnelChart';
import GaugeChart from './GaugeChart';
import HeatmapChart from './HeatmapChart';
import InteractiveChart from './InteractiveChart';
import LineChart from './LineChart';
import MultiAxisChart from './MultiAxisChart';
import PieChart from './PieChart';
import RadarChart from './RadarChart';
import RealTimeChart from './RealTimeChart';
import ScatterChart from './ScatterChart';
import SimpleBarChart from './SimpleBarChart';
import TreemapChart from './TreemapChart';
import WaterfallChart from './WaterfallChart';

// Export all chart components
export {
  AdvancedChart,
  AnimatedChart,
  AreaChart,
  BarChart,
  BubbleChart,
  CandlestickChart,
  Chart,
  ChartRenderer,
  ChartTooltip,
  ChartToolbar,
  DonutChart,
  FunnelChart,
  GaugeChart,
  HeatmapChart,
  InteractiveChart,
  LineChart,
  MultiAxisChart,
  PieChart,
  RadarChart,
  RealTimeChart,
  ScatterChart,
  SimpleBarChart,
  TreemapChart,
  WaterfallChart,
};

// Export chart hooks
export { useBarChart } from '../../lib/composables/useBarChart';
export {
  useChart,
  useChartAccessibility,
  useChartData,
  useChartPerformance,
} from '../../lib/composables/useChart';
export { useChartToolbar } from '../../lib/composables/useChartToolbar';
export { useChartAnalytics } from '../../lib/composables/useChartAnalytics';
export { useChartExport } from '../../lib/composables/useChartExport';
export { useLineChart } from '../../lib/composables/useLineChart';
export { usePieChart } from '../../lib/composables/usePieChart';

// Export chart component types
export type { AdvancedChartProps } from './AdvancedChart';
export type { AnimatedChartProps } from './AnimatedChart';
export type { AreaChartProps } from './AreaChart';
export type { BarChartProps } from './BarChart';
export type { BubbleChartProps, BubbleDataPoint } from './BubbleChart';
export type { CandlestickChartProps, CandlestickDataPoint } from './CandlestickChart';
export type { ChartTooltipProps, TooltipPosition } from './ChartTooltip';
export type { ChartToolbarProps, ChartToolbarAction, ChartToolbarGroup } from './ChartToolbar';
export type { DonutChartProps } from './DonutChart';
export type { FunnelChartProps, FunnelDataPoint } from './FunnelChart';
export type { GaugeChartProps } from './GaugeChart';
export type { HeatmapChartProps, HeatmapDataPoint } from './HeatmapChart';
export type { InteractiveChartProps } from './InteractiveChart';
export type { LineChartProps } from './LineChart';
export type { AxisConfig, MultiAxisChartProps, MultiAxisDataset } from './MultiAxisChart';
export type { PieChartProps } from './PieChart';
export type { RadarChartProps } from './RadarChart';
export type { RealTimeChartProps } from './RealTimeChart';
export type { ScatterChartProps, ScatterDataPoint } from './ScatterChart';
export type { SimpleBarChartProps } from './SimpleBarChart';
export type { TreemapChartProps, TreemapDataPoint, TreemapNode } from './TreemapChart';
export type { ChartConfig, ChartDataPoint, ChartDataset, ChartProps, ChartType, ChartToolbarConfig } from './types';
export type { WaterfallChartProps, WaterfallDataPoint } from './WaterfallChart';

// Export hook types
export type { BarChartOptions, BarDimensions } from '../../lib/composables/useBarChart';
export type { ChartInteractionState, ChartScales } from '../../lib/composables/useChart';
export type { ChartToolbarState, ChartToolbarConfig as ToolbarConfig, ChartToolbarHandlers } from '../../lib/composables/useChartToolbar';
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
