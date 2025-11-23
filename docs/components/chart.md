# Chart

The Chart component is a modern charting library with 20+ chart types, real-time updates, animations, and advanced interactions. It provides a unified API for creating various data visualizations with consistent styling and behavior.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Chart Types](#chart-types)
  - [Data Formats](#data-formats)
- [Props](#props)
- [Examples](#examples)
  - [Line Chart](#line-chart)
  - [Bar Chart](#bar-chart)
  - [Pie Chart](#pie-chart)
  - [Advanced Chart](#advanced-chart)

## Overview

The Chart component provides a comprehensive charting solution with support for multiple chart types including line, bar, pie, area, scatter, radar, bubble, and more. It includes built-in features like animations, tooltips, legends, and export capabilities.

## Features

- 20+ chart types including line, bar, pie, area, scatter, radar, and more
- Real-time data updates
- Smooth animations and transitions
- Interactive tooltips and legends
- Responsive design
- Export to multiple formats (PNG, SVG, CSV)
- Fullscreen mode
- Customizable styling and configuration
- Accessibility support

## Installation

```bash
npm install @shohojdhara/atomix
```

Import the component and styles:

```tsx
import { LineChart } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';
```

## Usage

### Basic Usage

```tsx
import { LineChart } from '@shohojdhara/atomix';

export function BasicChart() {
  const data = [
    { label: 'Jan', value: 40 },
    { label: 'Feb', value: 30 },
    { label: 'Mar', value: 20 },
    { label: 'Apr', value: 27 },
    { label: 'May', value: 90 },
    { label: 'Jun', value: 40 },
  ];

  return (
    <LineChart
      title="Sales Overview"
      data={data}
      config={{
        showLegend: true,
        showTooltips: true,
        animate: true,
      }}
    />
  );
}
```

### Chart Types

The Chart library provides various specialized components for different chart types:

- [LineChart](#line-chart) - For showing trends over time
- [AreaChart](#area-chart) - Filled line charts for cumulative data
- [BarChart](#bar-chart) - For comparing categories
- [PieChart](#pie-chart) - For showing part-to-whole relationships
- [DonutChart](#donut-chart) - Pie charts with a hole in the center
- [ScatterChart](#scatter-chart) - For showing data correlation
- [RadarChart](#radar-chart) - For multi-dimensional data
- [BubbleChart](#bubble-chart) - For 3D data visualization
- [GaugeChart](#gauge-chart) - For single metrics
- [HeatmapChart](#heatmap-chart) - For data density visualization
- [CandlestickChart](#candlestick-chart) - For financial data
- [WaterfallChart](#waterfall-chart) - For cumulative flow
- [FunnelChart](#funnel-chart) - For process stages
- [TreemapChart](#treemap-chart) - For hierarchical data
- [AnimatedChart](#animated-chart) - For motion graphics
- [RealTimeChart](#real-time-chart) - For live streaming data
- [MultiAxisChart](#multi-axis-chart) - For multiple scales
- [AdvancedChart](#advanced-chart) - For complex features

### Data Formats

The Chart component accepts data in two formats:

1. Simple data array:

```tsx
const data = [
  { label: 'Category A', value: 30 },
  { label: 'Category B', value: 45 },
  { label: 'Category C', value: 60 },
];
```

2. Dataset array (for multiple series):

```tsx
const datasets = [
  {
    label: 'Series 1',
    data: [
      { label: 'Jan', value: 40 },
      { label: 'Feb', value: 30 },
      { label: 'Mar', value: 20 },
    ],
    color: '#3b82f6'
  },
  {
    label: 'Series 2',
    data: [
      { label: 'Jan', value: 20 },
      { label: 'Feb', value: 35 },
      { label: 'Mar', value: 50 },
    ],
    color: '#10b981'
  }
];
```

## Props

### Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | [ChartType](#chart-types) | `'line'` | Chart type |
| title | `string` | `undefined` | Chart title |
| subtitle | `string` | `undefined` | Chart subtitle |
| size | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Chart size |
| variant | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Color variant |
| loading | `boolean` | `false` | Loading state |
| error | `string` | `undefined` | Error message |
| className | `string` | `''` | Additional CSS class names |
| 'aria-label' | `string` | `undefined` | Accessibility label |
| showToolbar | `boolean` | `false` | Show chart toolbar |
| enableFullscreen | `boolean` | `false` | Enable fullscreen button |
| enableExport | `boolean` | `false` | Enable export button |
| enableRefresh | `boolean` | `false` | Enable refresh button |
| exportFormats | `string[]` | `['png', 'svg', 'csv']` | Available export formats |
| interactive | `boolean` | `true` | Whether chart is interactive |
| showLegend | `boolean` | `true` | Whether to show legend |
| fullscreen | `boolean` | `false` | Fullscreen mode |
| children | `ReactNode` | `undefined` | Chart content for wrapper usage |
| glass | `boolean \| AtomixGlassProps` | `false` | Glass morphism effect for the chart |

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| data | [ChartDataPoint[]](#data-formats) | Simple data array |
| datasets | [ChartDataset[]](#data-formats) | Multiple datasets |
| config | [ChartConfig](#configuration-options) | Chart configuration |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onDataPointClick | `(dataPoint: ChartDataPoint, datasetIndex: number, pointIndex: number) => void` | Data point click handler |
| onLegendItemClick | `(datasetIndex: number, visible: boolean) => void` | Legend item click handler |
| onFullscreen | `(isFullscreen: boolean) => void` | Fullscreen state change handler |
| onExport | `(format: string) => Promise<void> \| void` | Export handler |
| onRefresh | `() => void` | Refresh handler |

### Toolbar Configuration

| Prop | Type | Description |
|------|------|-------------|
| toolbarConfig | `object` | Toolbar configuration |
| toolbarConfig.enableDefaults | `boolean` | Enable default toolbar items |
| toolbarConfig.defaults | `object` | Default toolbar item settings |
| toolbarConfig.defaults.refresh | `boolean` | Enable refresh button |
| toolbarConfig.defaults.export | `boolean` | Enable export button |
| toolbarConfig.defaults.fullscreen | `boolean` | Enable fullscreen button |
| toolbarConfig.defaults.settings | `boolean` | Enable settings button |
| toolbarConfig.defaults.zoom | `boolean` | Enable zoom controls |
| toolbarConfig.defaults.pan | `boolean` | Enable pan controls |
| toolbarConfig.defaults.reset | `boolean` | Enable reset button |
| toolbarConfig.defaults.grid | `boolean` | Enable grid toggle |
| toolbarConfig.defaults.legend | `boolean` | Enable legend toggle |
| toolbarConfig.defaults.tooltips | `boolean` | Enable tooltips toggle |
| toolbarConfig.defaults.animations | `boolean` | Enable animations toggle |
| toolbarConfig.handlers | `object` | Custom toolbar handlers |

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| xAxis | [ChartAxis](#axis-configuration) | `undefined` | X-axis configuration |
| yAxis | [ChartAxis](#axis-configuration) | `undefined` | Y-axis configuration |
| showLegend | `boolean` | `true` | Show legend |
| showTooltips | `boolean` | `true` | Show tooltips |
| animate | `boolean` | `true` | Enable animations |
| animationDuration | `number` | `300` | Animation duration in ms |

### Axis Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| label | `string` | `undefined` | Axis label |
| showGrid | `boolean` | `true` | Show grid lines |
| showLabels | `boolean` | `true` | Show axis labels |
| min | `number` | `undefined` | Minimum value |
| max | `number` | `undefined` | Maximum value |
| formatter | `(value: number) => string` | `undefined` | Value formatter |
| ticks | `number` | `undefined` | Number of ticks |

## Examples

### Line Chart

```tsx
import { LineChart } from '@shohojdhara/atomix';

export function SalesChart() {
  const data = [
    { label: 'Jan', value: 4000 },
    { label: 'Feb', value: 3000 },
    { label: 'Mar', value: 2000 },
    { label: 'Apr', value: 2780 },
    { label: 'May', value: 1890 },
    { label: 'Jun', value: 2390 },
    { label: 'Jul', value: 3490 },
  ];

  return (
    <LineChart
      title="Website Traffic"
      subtitle="Monthly visitors"
      data={data}
      config={{
        showLegend: true,
        showTooltips: true,
        animate: true,
        xAxis: {
          label: 'Months'
        },
        yAxis: {
          label: 'Visitors',
          formatter: (value) => `${value / 1000}k`
        }
      }}
      showToolbar
      enableFullscreen
      enableExport
    />
  );
}
```

### Bar Chart

```tsx
import { BarChart } from '@shohojdhara/atomix';

export function RevenueChart() {
  const datasets = [
    {
      label: 'Revenue',
      data: [
        { label: 'Q1', value: 4000 },
        { label: 'Q2', value: 3000 },
        { label: 'Q3', value: 2000 },
        { label: 'Q4', value: 2780 },
      ],
      color: '#3b82f6'
    },
    {
      label: 'Target',
      data: [
        { label: 'Q1', value: 3500 },
        { label: 'Q2', value: 3200 },
        { label: 'Q3', value: 2500 },
        { label: 'Q4', value: 3000 },
      ],
      color: '#10b981'
    }
  ];

  return (
    <BarChart
      title="Quarterly Revenue"
      datasets={datasets}
      config={{
        showLegend: true,
        showTooltips: true,
        animate: true
      }}
    />
  );
}
```

### Pie Chart

```tsx
import { PieChart } from '@shohojdhara/atomix';

export function MarketShareChart() {
  const data = [
    { label: 'Product A', value: 400 },
    { label: 'Product B', value: 300 },
    { label: 'Product C', value: 300 },
    { label: 'Product D', value: 200 },
  ];

  return (
    <PieChart
      title="Market Share"
      data={data}
      config={{
        showLegend: true,
        showTooltips: true,
        animate: true
      }}
    />
  );
}
```

### Advanced Chart

```tsx
import { AdvancedChart } from '@shohojdhara/atomix';

export function AdvancedAnalytics() {
  const datasets = [
    {
      label: 'Sales',
      data: [
        { label: 'Jan', value: 4000 },
        { label: 'Feb', value: 3000 },
        { label: 'Mar', value: 2000 },
        { label: 'Apr', value: 2780 },
      ],
      color: '#3b82f6'
    },
    {
      label: 'Revenue',
      data: [
        { label: 'Jan', value: 2400 },
        { label: 'Feb', value: 1398 },
        { label: 'Mar', value: 9800 },
        { label: 'Apr', value: 3908 },
      ],
      color: '#10b981'
    }
  ];

  return (
    <AdvancedChart
      title="Advanced Analytics Dashboard"
      subtitle="Comprehensive business metrics"
      datasets={datasets}
      config={{
        showLegend: true,
        showTooltips: true,
        animate: true,
        xAxis: {
          label: 'Time Period'
        },
        yAxis: {
          label: 'Value'
        }
      }}
      showToolbar
      enableFullscreen
      enableExport
      enableRefresh
      toolbarConfig={{
        enableDefaults: true,
        defaults: {
          refresh: true,
          export: true,
          fullscreen: true,
          settings: true,
          zoom: true,
          pan: true,
          reset: true,
          grid: true,
          legend: true,
          tooltips: true,
          animations: true
        }
      }}
      onRefresh={() => console.log('Refreshed chart data')}
      onDataPointClick={(dataPoint, datasetIndex, pointIndex) => {
        console.log('Clicked data point:', dataPoint, datasetIndex, pointIndex);
      }}
    />
  );
}
```