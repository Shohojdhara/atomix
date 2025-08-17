import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  AdvancedChart,
  AreaChart,
  BarChart,
  CandlestickChart,
  Chart,
  DonutChart,
  InteractiveChart,
  LineChart,
  PieChart,
  ScatterChart,
} from './index';

const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Chart Component Library

A comprehensive collection of customizable chart components built for modern data visualization needs.

## Features

- **Multiple Chart Types**: Line, Area, Bar, Pie, Donut, Scatter, Candlestick, and Advanced Interactive charts
- **Responsive Design**: Automatically adapts to container size with mobile-first approach
- **Accessibility**: Full WCAG 2.1 AA compliance with keyboard navigation and screen reader support
- **Performance Optimized**: Efficient rendering with virtualization for large datasets
- **Theme Support**: Works seamlessly with dark/light themes and custom color schemes
- **Interactive Features**: Tooltips, zoom, pan, crosshair, and keyboard navigation
- **Real-time Updates**: Support for live data streaming and automatic updates
- **Export Capabilities**: Export charts as PNG, SVG, or CSV formats

## Chart Types Overview

- **LineChart**: Ideal for trends over time
- **AreaChart**: Line charts with filled areas, great for cumulative data
- **BarChart**: Perfect for comparing categories (vertical and horizontal)
- **PieChart**: Shows parts of a whole
- **DonutChart**: Pie chart with center space for additional content
- **ScatterChart**: Displays relationships between two variables
- **CandlestickChart**: Financial data visualization (OHLC)
- **InteractiveChart**: Enhanced charts with advanced interaction features
- **AdvancedChart**: Full-featured charts with real-time updates and export options

## Accessibility Features

All charts include:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences
- Focus management
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'line',
        'area',
        'bar',
        'horizontal-bar',
        'pie',
        'donut',
        'scatter',
        'interactive',
        'advanced',
      ],
      defaultValue: 'line',
      description: 'The type of chart to render',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
      description: 'Chart size variant',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info'],
      defaultValue: 'primary',
      description: 'Chart color theme variant',
    },
    title: {
      control: 'text',
      description: 'Chart title displayed at the top',
    },
    subtitle: {
      control: 'text',
      description: 'Chart subtitle displayed below the title',
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
      description: 'Shows loading spinner when true',
    },
    error: {
      control: 'text',
      description: 'Error message to display when chart fails to load',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

// ============================================================================
// COMPREHENSIVE DATA SAMPLES
// ============================================================================

// Financial Performance Data (12 months)
const financialData = {
  revenue: {
    label: 'Revenue',
    data: [
      { label: 'Jan', value: 485000, metadata: { target: 450000, previousYear: 380000 } },
      { label: 'Feb', value: 520000, metadata: { target: 500000, previousYear: 420000 } },
      { label: 'Mar', value: 495000, metadata: { target: 480000, previousYear: 410000 } },
      { label: 'Apr', value: 612000, metadata: { target: 550000, previousYear: 480000 } },
      { label: 'May', value: 680000, metadata: { target: 620000, previousYear: 520000 } },
      { label: 'Jun', value: 645000, metadata: { target: 600000, previousYear: 510000 } },
      { label: 'Jul', value: 720000, metadata: { target: 650000, previousYear: 580000 } },
      { label: 'Aug', value: 760000, metadata: { target: 700000, previousYear: 620000 } },
      { label: 'Sep', value: 695000, metadata: { target: 680000, previousYear: 590000 } },
      { label: 'Oct', value: 750000, metadata: { target: 720000, previousYear: 640000 } },
      { label: 'Nov', value: 820000, metadata: { target: 780000, previousYear: 690000 } },
      { label: 'Dec', value: 890000, metadata: { target: 850000, previousYear: 750000 } },
    ],
    color: 'var(--atomix-success)',
  },
  expenses: {
    label: 'Operating Expenses',
    data: [
      { label: 'Jan', value: 280000, metadata: { category: 'operations' } },
      { label: 'Feb', value: 295000, metadata: { category: 'operations' } },
      { label: 'Mar', value: 315000, metadata: { category: 'operations' } },
      { label: 'Apr', value: 340000, metadata: { category: 'operations' } },
      { label: 'May', value: 365000, metadata: { category: 'operations' } },
      { label: 'Jun', value: 350000, metadata: { category: 'operations' } },
      { label: 'Jul', value: 380000, metadata: { category: 'operations' } },
      { label: 'Aug', value: 395000, metadata: { category: 'operations' } },
      { label: 'Sep', value: 375000, metadata: { category: 'operations' } },
      { label: 'Oct', value: 410000, metadata: { category: 'operations' } },
      { label: 'Nov', value: 430000, metadata: { category: 'operations' } },
      { label: 'Dec', value: 455000, metadata: { category: 'operations' } },
    ],
    color: 'var(--atomix-error)',
  },
  profit: {
    label: 'Net Profit',
    data: [
      { label: 'Jan', value: 205000 },
      { label: 'Feb', value: 225000 },
      { label: 'Mar', value: 180000 },
      { label: 'Apr', value: 272000 },
      { label: 'May', value: 315000 },
      { label: 'Jun', value: 295000 },
      { label: 'Jul', value: 340000 },
      { label: 'Aug', value: 365000 },
      { label: 'Sep', value: 320000 },
      { label: 'Oct', value: 340000 },
      { label: 'Nov', value: 390000 },
      { label: 'Dec', value: 435000 },
    ],
    color: 'var(--atomix-primary)',
  },
};

// User Analytics Data
const userAnalyticsData = [
  {
    label: 'Active Users',
    data: [
      { label: 'Mon', value: 12450 },
      { label: 'Tue', value: 15300 },
      { label: 'Wed', value: 18200 },
      { label: 'Thu', value: 16800 },
      { label: 'Fri', value: 22100 },
      { label: 'Sat', value: 19500 },
      { label: 'Sun', value: 14200 },
    ],
    color: 'var(--atomix-primary)',
  },
  {
    label: 'New Signups',
    data: [
      { label: 'Mon', value: 850 },
      { label: 'Tue', value: 920 },
      { label: 'Wed', value: 1100 },
      { label: 'Thu', value: 980 },
      { label: 'Fri', value: 1340 },
      { label: 'Sat', value: 1150 },
      { label: 'Sun', value: 680 },
    ],
    color: 'var(--atomix-success)',
  },
  {
    label: 'Session Duration (min)',
    data: [
      { label: 'Mon', value: 24 },
      { label: 'Tue', value: 28 },
      { label: 'Wed', value: 31 },
      { label: 'Thu', value: 27 },
      { label: 'Fri', value: 35 },
      { label: 'Sat', value: 42 },
      { label: 'Sun', value: 38 },
    ],
    color: 'var(--atomix-warning)',
  },
];

// Market Share Data
const marketShareData = {
  label: 'Market Share Q4 2024',
  data: [
    { label: 'Our Company', value: 28.5, color: 'var(--atomix-primary)' },
    { label: 'Competitor A', value: 24.2, color: 'var(--atomix-error)' },
    { label: 'Competitor B', value: 18.7, color: 'var(--atomix-warning)' },
    { label: 'Competitor C', value: 15.1, color: 'var(--atomix-info)' },
    { label: 'Others', value: 13.5, color: 'var(--atomix-success)' },
  ],
};

// Product Performance Data
const productPerformanceData = [
  {
    label: 'Product A',
    data: [
      { label: 'Q1', value: 145000, metadata: { units: 2800, rating: 4.2 } },
      { label: 'Q2', value: 162000, metadata: { units: 3100, rating: 4.3 } },
      { label: 'Q3', value: 178000, metadata: { units: 3400, rating: 4.5 } },
      { label: 'Q4', value: 195000, metadata: { units: 3750, rating: 4.6 } },
    ],
    color: 'var(--atomix-primary)',
  },
  {
    label: 'Product B',
    data: [
      { label: 'Q1', value: 128000, metadata: { units: 2200, rating: 3.9 } },
      { label: 'Q2', value: 142000, metadata: { units: 2450, rating: 4.1 } },
      { label: 'Q3', value: 156000, metadata: { units: 2700, rating: 4.2 } },
      { label: 'Q4', value: 171000, metadata: { units: 2950, rating: 4.3 } },
    ],
    color: 'var(--atomix-success)',
  },
  {
    label: 'Product C',
    data: [
      { label: 'Q1', value: 89000, metadata: { units: 1500, rating: 4.0 } },
      { label: 'Q2', value: 95000, metadata: { units: 1620, rating: 4.1 } },
      { label: 'Q3', value: 108000, metadata: { units: 1840, rating: 4.4 } },
      { label: 'Q4', value: 124000, metadata: { units: 2100, rating: 4.5 } },
    ],
    color: 'var(--atomix-warning)',
  },
];

// Performance Metrics Scatter Data
const performanceScatterData = [
  {
    label: 'Team Performance',
    data: [
      {
        label: 'Development',
        x: 88,
        y: 145000,
        value: 145000,
        size: 12,
        shape: 'circle' as const,
        metadata: { efficiency: 'high' },
      },
      {
        label: 'Marketing',
        x: 92,
        y: 185000,
        value: 185000,
        size: 15,
        shape: 'square' as const,
        metadata: { efficiency: 'very high' },
      },
      {
        label: 'Sales',
        x: 95,
        y: 210000,
        value: 210000,
        size: 18,
        shape: 'diamond' as const,
        metadata: { efficiency: 'excellent' },
      },
      {
        label: 'Support',
        x: 85,
        y: 95000,
        value: 95000,
        size: 10,
        shape: 'triangle' as const,
        metadata: { efficiency: 'good' },
      },
      {
        label: 'Operations',
        x: 78,
        y: 125000,
        value: 125000,
        size: 8,
        shape: 'circle' as const,
        metadata: { efficiency: 'moderate' },
      },
      {
        label: 'HR',
        x: 82,
        y: 85000,
        value: 85000,
        size: 6,
        shape: 'cross' as const,
        metadata: { efficiency: 'improving' },
      },
      {
        label: 'Finance',
        x: 90,
        y: 165000,
        value: 165000,
        size: 14,
        shape: 'square' as const,
        metadata: { efficiency: 'high' },
      },
      {
        label: 'Product',
        x: 87,
        y: 155000,
        value: 155000,
        size: 13,
        shape: 'circle' as const,
        metadata: { efficiency: 'high' },
      },
    ],
    color: 'var(--atomix-primary)',
  },
];

// Large Dataset for Performance Testing
const generateLargeDataset = (points: number = 1000) => ({
  label: `Large Dataset (${points} points)`,
  data: Array.from({ length: points }, (_, i) => ({
    label: `Point ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 100 + Math.sin(i * 0.1) * 200,
    metadata: {
      timestamp: new Date(Date.now() - (points - i) * 86400000).toISOString(),
      category: ['A', 'B', 'C', 'D'][i % 4],
    },
  })),
  color: 'var(--atomix-primary)',
});

// Real-time Data Simulation
const generateRealTimeData = () => {
  const now = new Date();
  return {
    label: 'Real-time Metrics',
    data: Array.from({ length: 24 }, (_, i) => {
      const time = new Date(now.getTime() - (23 - i) * 3600000);
      return {
        label: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        value: Math.floor(Math.random() * 100) + 50 + Math.sin(i * 0.5) * 20,
        metadata: {
          timestamp: time.toISOString(),
          isLive: i === 23,
        },
      };
    }),
    color: 'var(--atomix-success)',
  };
};

// Financial Candlestick Data
const financialCandlestickData = [
  { date: '2024-01-01', open: 145.5, high: 148.25, low: 143.75, close: 147.8, volume: 2150000 },
  { date: '2024-01-02', open: 147.8, high: 152.4, low: 146.9, close: 151.2, volume: 1950000 },
  { date: '2024-01-03', open: 151.2, high: 153.8, low: 149.3, close: 150.45, volume: 1780000 },
  { date: '2024-01-04', open: 150.45, high: 151.6, low: 147.2, close: 148.9, volume: 2040000 },
  { date: '2024-01-05', open: 148.9, high: 155.7, low: 148.1, close: 154.3, volume: 2580000 },
  { date: '2024-01-08', open: 154.3, high: 158.95, low: 152.8, close: 157.65, volume: 2350000 },
  { date: '2024-01-09', open: 157.65, high: 159.4, low: 155.2, close: 156.8, volume: 1890000 },
  { date: '2024-01-10', open: 156.8, high: 158.15, low: 153.45, close: 154.9, volume: 2120000 },
  { date: '2024-01-11', open: 154.9, high: 160.25, low: 154.1, close: 159.4, volume: 2890000 },
  { date: '2024-01-12', open: 159.4, high: 162.8, low: 158.9, close: 161.55, volume: 2460000 },
  { date: '2024-01-16', open: 161.55, high: 163.2, low: 159.75, close: 160.85, volume: 1950000 },
  { date: '2024-01-17', open: 160.85, high: 165.4, low: 160.2, close: 164.7, volume: 2780000 },
  { date: '2024-01-18', open: 164.7, high: 166.9, low: 162.3, close: 163.95, volume: 2340000 },
  { date: '2024-01-19', open: 163.95, high: 165.8, low: 161.4, close: 162.2, volume: 2150000 },
  { date: '2024-01-22', open: 162.2, high: 168.5, low: 161.8, close: 167.25, volume: 3120000 },
];

// ============================================================================
// SECTION 1: BASIC CHART STATES
// ============================================================================

export const BaseChart: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Basic chart wrapper component that provides the foundation for all chart types.
Includes title, subtitle, and content areas with consistent styling and accessibility features.
        `,
      },
    },
  },
  args: {
    title: 'Basic Chart Container',
    subtitle: 'Foundation component for all chart types',
    size: 'md',
    variant: 'primary',
    loading: false,
    'aria-label': 'Basic chart example showing container structure',
    children: (
      <div
        style={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(122, 255, 215, 0.05)',
          border: '2px dashed var(--atomix-border-primary-subtle)',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '18px', marginBottom: '8px' }}>Chart Content Area</div>
        <div style={{ fontSize: '14px', opacity: 0.7 }}>
          This is where chart visualizations are rendered
        </div>
      </div>
    ),
  },
};

export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Loading state shows a spinner and loading message while chart data is being fetched.
Includes proper ARIA attributes for accessibility and screen reader support.
        `,
      },
    },
  },
  args: {
    title: 'Loading Chart Data',
    subtitle: 'Please wait while we fetch the latest metrics',
    size: 'md',
    variant: 'primary',
    loading: true,
    'aria-label': 'Chart is loading data, please wait',
  },
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Error state displays when chart data fails to load or when there's a rendering error.
Provides clear error messaging and maintains accessibility standards.
        `,
      },
    },
  },
  args: {
    title: 'Chart Error Example',
    subtitle: 'Demonstration of error handling',
    size: 'md',
    variant: 'error',
    error: 'Failed to load chart data. Please check your connection and try again.',
    'aria-label': 'Chart failed to load due to connection error',
  },
};

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Empty state for when no data is available to display.
Provides helpful guidance and maintains consistent styling.
        `,
      },
    },
  },
  args: {
    title: 'No Data Available',
    subtitle: 'Connect your data source to see visualizations',
    size: 'md',
    variant: 'secondary',
    'aria-label': 'No chart data available',
    children: (
      <div
        style={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px',
          color: 'var(--atomix-secondary-text-emphasis)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>📊</div>
        <div style={{ fontSize: '18px', marginBottom: '8px' }}>No Data to Display</div>
        <div style={{ fontSize: '14px', opacity: 0.7 }}>
          Add data to your dashboard to see beautiful charts here
        </div>
      </div>
    ),
  },
};

// ============================================================================
// SECTION 2: LINE CHARTS
// ============================================================================

export const LineChartBasic: StoryObj<typeof LineChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Basic line chart showing revenue trends over a 12-month period.
Perfect for displaying time-series data with clear trend visualization.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <LineChart
        {...args}
        title="Annual Revenue Trend"
        subtitle="Financial performance over 12 months with targets and year-over-year comparison"
        datasets={[financialData.revenue]}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Month',
          },
          yAxis: {
            showGrid: true,
            label: 'Revenue ($)',
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        }}
        aria-label="Line chart showing monthly revenue from January to December"
      />
    </div>
  ),
};

export const LineChartMultiple: StoryObj<typeof LineChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Multi-line chart comparing three key financial metrics.
Demonstrates how multiple datasets can tell a comprehensive story.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <LineChart
        {...args}
        title="Financial Performance Overview"
        subtitle="Revenue, expenses, and profit trends with detailed analysis"
        datasets={[financialData.revenue, financialData.expenses, financialData.profit]}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Month',
          },
          yAxis: {
            showGrid: true,
            label: 'Amount ($)',
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        }}
        lineOptions={{
          showDataPoints: true,
          pointRadius: 4,
          lineWidth: 3,
          smooth: false,
        }}
        aria-label="Multi-line chart comparing revenue, expenses, and profit over 12 months"
      />
    </div>
  ),
};

export const LineChartSmooth: StoryObj<typeof LineChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Smooth line chart with curved connections and enhanced visual appeal.
Uses bezier curves for a more polished, professional appearance.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <LineChart
        {...args}
        title="User Analytics Trends"
        subtitle="Weekly active users, new signups, and session duration"
        datasets={userAnalyticsData}
        lineOptions={{
          smooth: true,
          tension: 0.4,
          showDataPoints: true,
          pointRadius: 6,
          lineWidth: 3,
          showPointLabels: false,
          animationDuration: 1000,
        }}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Day of Week',
          },
          yAxis: {
            showGrid: true,
            label: 'Count / Duration',
          },
        }}
        aria-label="Smooth line chart showing user analytics for each day of the week"
      />
    </div>
  ),
};

// ============================================================================
// SECTION 3: AREA CHARTS
// ============================================================================

export const AreaChartBasic: StoryObj<typeof AreaChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Basic area chart with filled regions under the line.
Ideal for showing cumulative data or emphasizing volume over time.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <AreaChart
        {...args}
        title="Revenue Growth Visualization"
        subtitle="Annual revenue with area fill to emphasize growth"
        datasets={[financialData.revenue]}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Month',
          },
          yAxis: {
            showGrid: true,
            label: 'Revenue ($)',
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        }}
        areaOptions={{
          fillOpacity: 0.3,
          showBorder: true,
          borderWidth: 2,
          useGradient: true,
        }}
        aria-label="Area chart showing revenue growth throughout the year"
      />
    </div>
  ),
};

export const AreaChartStacked: StoryObj<typeof AreaChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Stacked area chart showing multiple datasets as cumulative layers.
Perfect for showing part-to-whole relationships over time.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <AreaChart
        {...args}
        title="Product Performance Stack"
        subtitle="Cumulative product revenue showing market composition"
        datasets={productPerformanceData}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Quarter',
          },
          yAxis: {
            showGrid: true,
            label: 'Revenue ($)',
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        }}
        areaOptions={{
          fillOpacity: 0.7,
          showBorder: true,
          borderWidth: 1,
          // stacked: true, // Property not yet implemented in AreaChart type
        }}
        aria-label="Stacked area chart showing cumulative product revenue by quarter"
      />
    </div>
  ),
};

export const AreaChartGradient: StoryObj<typeof AreaChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Area chart with beautiful gradient fills and smooth curves.
Enhanced visual appeal with modern gradient effects.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <AreaChart
        {...args}
        title="User Engagement Metrics"
        subtitle="Weekly analytics with gradient visualization"
        datasets={userAnalyticsData}
        areaOptions={{
          smooth: true,
          tension: 0.3,
          useGradient: true,
          gradientDirection: 'vertical',
          fillOpacity: 0.4,
          showBorder: true,
          borderWidth: 2,
        }}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Day of Week',
          },
          yAxis: {
            showGrid: true,
            label: 'Metrics',
          },
        }}
        aria-label="Gradient area chart showing user engagement metrics by day"
      />
    </div>
  ),
};

// ============================================================================
// SECTION 4: BAR CHARTS
// ============================================================================

export const BarChartBasic: StoryObj<typeof BarChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Basic vertical bar chart for comparing discrete categories.
Perfect for showing comparisons between different groups or time periods.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <BarChart
        {...args}
        title="Quarterly Product Performance"
        subtitle="Revenue comparison across product lines"
        datasets={productPerformanceData}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: false,
            label: 'Quarter',
          },
          yAxis: {
            showGrid: true,
            label: 'Revenue ($)',
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        }}
        barOptions={{
          showValues: false,
          cornerRadius: 4,
          groupPadding: 0.1,
          barPadding: 0.05,
        }}
        aria-label="Bar chart comparing quarterly revenue across three product lines"
      />
    </div>
  ),
};

export const BarChartStacked: StoryObj<typeof BarChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Stacked bar chart showing component parts of a whole.
Ideal for displaying both total values and individual contributions.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <BarChart
        {...args}
        title="Financial Breakdown by Month"
        subtitle="Stacked view of revenue, expenses, and profit"
        datasets={[financialData.revenue, financialData.expenses]}
        barOptions={{
          stacked: true,
          showValues: true,
          cornerRadius: 6,
          valueFormatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
        }}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: false,
            label: 'Month',
          },
          yAxis: {
            showGrid: true,
            label: 'Amount ($)',
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        }}
        aria-label="Stacked bar chart showing monthly financial breakdown"
      />
    </div>
  ),
};

export const BarChartHorizontal: StoryObj<typeof BarChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Horizontal bar chart for better readability with long category names.
Especially useful when category labels are lengthy or numerous.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <BarChart
        {...args}
        title="Team Performance Metrics"
        subtitle="Revenue generation by department (horizontal layout)"
        datasets={[
          {
            label: 'Annual Revenue',
            data: performanceScatterData[0].data.map(point => ({
              label: point.label,
              value: point.y,
            })),
            color: 'var(--atomix-primary)',
          },
        ]}
        horizontal={true}
        barOptions={{
          showValues: true,
          cornerRadius: 4,
          valueFormatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
        }}
        config={{
          showLegend: false,
          xAxis: {
            showGrid: true,
            label: 'Revenue ($)',
          },
          yAxis: {
            showGrid: false,
            label: 'Department',
          },
        }}
        aria-label="Horizontal bar chart showing revenue by department"
      />
    </div>
  ),
};

export const BarChartAnimated: StoryObj<typeof BarChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Animated bar chart with hover effects and smooth transitions.
Enhanced user experience with modern animation patterns.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <BarChart
        {...args}
        title="Weekly User Engagement"
        subtitle="Interactive analytics with hover effects"
        datasets={userAnalyticsData.slice(0, 2)}
        barOptions={{
          enableAnimations: true,
          animationDuration: 800,
          animationDelay: 100,
          enableHoverEffects: true,
          useGradients: true,
          showLabelsInside: false,
          cornerRadius: 8,
        }}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: false,
            label: 'Day of Week',
          },
          yAxis: {
            showGrid: true,
            label: 'Count',
          },
        }}
        aria-label="Animated bar chart showing weekly user engagement metrics"
      />
    </div>
  ),
};

// ============================================================================
// SECTION 5: PIE & DONUT CHARTS
// ============================================================================

export const PieChartBasic: StoryObj<typeof PieChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Basic pie chart showing parts of a whole with clear segment visualization.
Perfect for displaying market share, budget allocation, or categorical distributions.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <PieChart
        {...args}
        title="Market Share Analysis"
        subtitle="Q4 2024 distribution by company"
        datasets={[marketShareData]}
        config={{
          showLegend: true,
        }}
        pieOptions={{
          showValues: true,
          showPercentages: true,
          // enableHoverEffects: true, // Property not yet implemented in PieChart type
          // hoverExpansion: 10, // Property not yet implemented in PieChart type
        }}
        aria-label="Pie chart showing market share distribution across companies"
      />
    </div>
  ),
};

export const DonutChartBasic: StoryObj<typeof DonutChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Donut chart with center content area for additional information.
Ideal for displaying totals, summaries, or key metrics in the center.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <DonutChart
        {...args}
        title="Revenue Distribution"
        subtitle="Sales channels with total revenue in center"
        datasets={[marketShareData]}
        config={{
          showLegend: true,
        }}
        donutOptions={{
          innerRadiusRatio: 0.6,
          showTotal: true,
          centerLabel: 'Total Revenue',
          centerValue: '$2.4M',
          // showPercentages: true, // Property not yet implemented in DonutChart type
        }}
        aria-label="Donut chart showing revenue distribution by sales channel"
      />
    </div>
  ),
};

export const DonutChartMultiple: StoryObj<typeof DonutChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Multiple donut charts for comparing different metrics side by side.
Useful for dashboards showing related categorical data.
        `,
      },
    },
  },
  render: args => (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      className="o-container-md"
    >
      <div style={{ height: '400px' }}>
        <DonutChart
          title="Q3 Market Share"
          datasets={[
            {
              label: 'Q3 Market Share',
              data: marketShareData.data.map(item => ({
                ...item,
                value: item.value * 0.95 + Math.random() * 5,
              })),
            },
          ]}
          donutOptions={{
            innerRadiusRatio: 0.65,
            showTotal: true,
            centerLabel: 'Q3',
            // showPercentages: false, // Property not yet implemented in DonutChart type
          }}
          config={{ showLegend: false }}
          aria-label="Q3 market share donut chart"
        />
      </div>
      <div style={{ height: '400px' }}>
        <DonutChart
          title="Q4 Market Share"
          datasets={[marketShareData]}
          donutOptions={{
            innerRadiusRatio: 0.65,
            showTotal: true,
            centerLabel: 'Q4',
            // showPercentages: false, // Property not yet implemented in DonutChart type
          }}
          config={{ showLegend: false }}
          aria-label="Q4 market share donut chart"
        />
      </div>
    </div>
  ),
};

// ============================================================================
// SECTION 6: SCATTER CHARTS
// ============================================================================

export const ScatterChartBasic: StoryObj<typeof ScatterChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Scatter plot showing relationships between two variables.
Each point represents a data item with X and Y coordinates, perfect for correlation analysis.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <ScatterChart
        {...args}
        title="Team Performance Analysis"
        subtitle="Efficiency score vs. revenue generation by department"
        scatterDatasets={performanceScatterData}
        scatterOptions={{
          showRegressionLine: true,
          enableSelection: true,
          showQuadrants: false,
          enableClustering: false,
        }}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Efficiency Score (%)',
          },
          yAxis: {
            showGrid: true,
            label: 'Revenue ($)',
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        }}
        aria-label="Scatter plot showing correlation between team efficiency and revenue"
      />
    </div>
  ),
};

export const ScatterChartAdvanced: StoryObj<typeof ScatterChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Advanced scatter chart with quadrants, clustering, and interactive features.
Includes regression analysis and performance quadrants for strategic insights.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-sm">
      <ScatterChart
        {...args}
        title="Strategic Performance Matrix"
        subtitle="Department analysis with performance quadrants and trends"
        scatterDatasets={performanceScatterData}
        scatterOptions={{
          showRegressionLine: true,
          enableSelection: true,
          showQuadrants: true,
          quadrantCenter: { x: 85, y: 125000 },
          enableClustering: true,
          // quadrantLabels: {
          //   topLeft: 'Low Efficiency, High Revenue',
          //   topRight: 'High Efficiency, High Revenue',
          //   bottomLeft: 'Low Efficiency, Low Revenue',
          //   bottomRight: 'High Efficiency, Low Revenue',
          // }, // Property not yet implemented in ScatterChart type
        }}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Efficiency Score (%)',
          },
          yAxis: {
            showGrid: true,
            label: 'Revenue ($)',
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        }}
        aria-label="Advanced scatter plot with performance quadrants and clustering analysis"
      />
    </div>
  ),
};

// ============================================================================
// SECTION 7: RESPONSIVE & ACCESSIBILITY
// ============================================================================

export const ResponsiveCharts: StoryObj<typeof LineChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Responsive charts that adapt to different container sizes.
Demonstrates mobile-first design with automatic scaling and layout adjustments.
        `,
      },
    },
  },
  render: () => (
    <div className="o-container">
      <div style={{ marginBottom: '24px' }}>
        <h3>Desktop View (full)</h3>
        <div
          style={{
            width: '100%',
            height: 'auto',
            border: '1px solid var(--atomix-primary-border-subtle)',
            borderRadius: '4px',
          }}
        >
          <LineChart
            title="Desktop Responsive Chart"
            subtitle="Optimized for large screens"
            datasets={[financialData.revenue]}
            config={{
              showLegend: true,
              xAxis: { showGrid: true },
              yAxis: {
                showGrid: true,
                formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
              },
            }}
            aria-label="Desktop-optimized responsive line chart"
          />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3>Tablet View (600px)</h3>
        <div
          style={{
            width: '600px',
            height: 'auto',
            border: '1px solid var(--atomix-primary-border-subtle)',
            borderRadius: '4px',
          }}
        >
          <LineChart
            title="Tablet Responsive Chart"
            subtitle="Medium screen optimization"
            datasets={[financialData.revenue]}
            config={{
              showLegend: true,
              xAxis: { showGrid: true },
              yAxis: {
                showGrid: true,
                formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
              },
            }}
            aria-label="Tablet-optimized responsive line chart"
          />
        </div>
      </div>

      <div>
        <h3>Mobile View (350px)</h3>
        <div
          style={{
            width: '350px',
            height: 'auto',
            border: '1px solid var(--atomix-primary-border-subtle)',
            borderRadius: '4px',
          }}
        >
          <LineChart
            title="Mobile Chart"
            subtitle="Compact mobile view"
            datasets={[financialData.revenue]}
            config={{
              showLegend: false,
              xAxis: { showGrid: false },
              yAxis: {
                showGrid: true,
                formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
              },
            }}
            size="sm"
            aria-label="Mobile-optimized responsive line chart"
          />
        </div>
      </div>
    </div>
  ),
};

export const AccessibilityFocused: StoryObj<typeof LineChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Chart designed with accessibility as a priority.
Includes comprehensive ARIA labels, keyboard navigation, high contrast colors, and screen reader support.
        `,
      },
    },
  },
  render: () => (
    <div className="o-container-md">
      <LineChart
        title="Accessibility-First Chart Design"
        subtitle="Revenue trends with full accessibility support and keyboard navigation"
        datasets={[financialData.revenue]}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Month (January through December)',
          },
          yAxis: {
            showGrid: true,
            label: 'Revenue in US Dollars',
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        }}
        lineOptions={{
          showDataPoints: true,
          pointRadius: 6,
          lineWidth: 4,
          // enableKeyboardNavigation: true, // Property not yet implemented in LineChart type
        }}
        aria-label="Line chart showing monthly revenue from January to December 2024, with values ranging from $485,000 to $890,000"
        aria-describedby="chart-description"
        // role="img" // Custom props not supported on chart components
        // tabIndex={0}
        // style={{
        //   outline: '2px solid transparent',
        //   outlineOffset: '2px',
        // }}
        // onFocus={() => console.log('Chart focused - screen reader can now navigate data points')}
        // onKeyDown={(e: React.KeyboardEvent) => {
        //   if (e.key === 'Enter' || e.key === ' ') {
        //     console.log('Chart activated - showing detailed data');
        //   }
        // }}
      />
      <div
        id="chart-description"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        This chart shows steady revenue growth throughout 2024, starting at $485,000 in January and
        reaching $890,000 in December, representing an 83% increase over the year.
      </div>
    </div>
  ),
};

// ============================================================================
// SECTION 8: PERFORMANCE & OPTIMIZATION
// ============================================================================

export const PerformanceLargeDataset: StoryObj<typeof LineChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Performance-optimized chart handling large datasets efficiently.
Demonstrates virtualization and optimization techniques for thousands of data points.
        `,
      },
    },
  },
  render: () => (
    <div className="o-container-md">
      <LineChart
        title="Large Dataset Performance Test"
        subtitle={`Rendering ${generateLargeDataset(2000).data.length} data points with optimizations`}
        datasets={[generateLargeDataset(2000)]}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Data Points',
          },
          yAxis: {
            showGrid: true,
            label: 'Values',
          },
        }}
        lineOptions={{
          showDataPoints: false,
          lineWidth: 2,
          // enableVirtualization: true, // Property not yet implemented in LineChart type
          // performanceMode: true, // Property not yet implemented in LineChart type
        }}
        aria-label="High-performance line chart displaying 2000 data points"
      />
    </div>
  ),
};

export const RealTimeUpdates: StoryObj<typeof LineChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Real-time chart that updates dynamically with live data simulation.
Demonstrates streaming data visualization with smooth animations.
        `,
      },
    },
  },
  render: () => {
    const [data, setData] = React.useState(generateRealTimeData());

    React.useEffect(() => {
      const interval = setInterval(() => {
        setData(generateRealTimeData());
      }, 3000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="o-container-md">
        <LineChart
          title="Real-Time Metrics Dashboard"
          subtitle="Live data updates every 3 seconds"
          datasets={[data]}
          config={{
            showLegend: true,
            xAxis: {
              showGrid: true,
              label: 'Time (24-hour period)',
            },
            yAxis: {
              showGrid: true,
              label: 'Metric Value',
            },
          }}
          lineOptions={{
            showDataPoints: true,
            pointRadius: 4,
            lineWidth: 3,
            animationDuration: 500,
            // enableRealTimeUpdates: true, // Property not yet implemented in LineChart type
          }}
          aria-label="Real-time line chart showing live metrics over 24 hours"
          aria-live="polite"
        />
      </div>
    );
  },
};

// ============================================================================
// SECTION 9: ADVANCED FEATURES
// ============================================================================

export const AdvancedInteractiveChart: StoryObj<typeof InteractiveChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Advanced interactive chart with full feature set.
Includes tooltips, crosshair, zoom, pan, and keyboard navigation.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <InteractiveChart
        {...args}
        title="Advanced Interactive Analytics"
        subtitle="Full-featured chart with rich interactions and advanced tooltips"
        datasets={[financialData.revenue, financialData.expenses, financialData.profit]}
        interactiveOptions={{
          richTooltips: true,
          showCrosshair: true,
          highlightOnHover: true,
          enableKeyboardNavigation: true,
          showDataLabels: true,
          // enableZoom: true, // Property not yet implemented in InteractiveChart type
          // enablePan: true, // Property not yet implemented in InteractiveChart type
          // tooltipFormatter: (point: any) => `
          //   <strong>${point.label}</strong><br/>
          //   ${point.dataset}: $${(point.value / 1000).toFixed(0)}K<br/>
          //   <em>Target: $${(point.metadata?.target / 1000 || 0).toFixed(0)}K</em>
          // `, // Property not yet implemented in InteractiveChart type
        }}
        config={{
          showLegend: false,
          xAxis: {
            showGrid: true,
            label: 'Month',
          },
          yAxis: {
            showGrid: true,
            label: 'Amount ($)',
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        }}
        aria-label="Interactive chart with zoom, pan, and rich tooltips"
      />
    </div>
  ),
};

export const CandlestickFinancial: StoryObj<typeof CandlestickChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Professional financial candlestick chart for OHLC (Open, High, Low, Close) data.
Includes volume indicators, moving averages, and technical analysis features.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container-md">
      <CandlestickChart
        {...args}
        title="Stock Price Technical Analysis"
        subtitle="OHLC data with volume, moving averages, and technical indicators"
        candlestickData={financialCandlestickData}
        candlestickOptions={{
          showVolume: true,
          showMovingAverages: true,
          movingAveragePeriods: [5, 10, 20],
          enableCrosshair: true,
          showOHLCTooltip: true,
          dateFormat: 'short',
          pricePrecision: 2,
          volumeHeightRatio: 0.3,
          // candleColors: {
          //   up: 'var(--atomix-success)',
          //   down: 'var(--atomix-error)',
          //   wick: 'var(--atomix-primary-text-emphasis)',
          // }, // Property not yet implemented in CandlestickChart type
        }}
        config={{
          showLegend: true,
          xAxis: {
            showGrid: true,
            label: 'Date',
          },
          yAxis: {
            showGrid: true,
            label: 'Price ($)',
          },
        }}
        aria-label="Candlestick chart showing stock price movement with volume and moving averages"
      />
    </div>
  ),
};

export const AdvancedAnalyticsDashboard: StoryObj<typeof AdvancedChart> = {
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive analytics dashboard showcasing all chart types.
Real-world example of how different chart types work together in a business intelligence context.
        `,
      },
    },
  },
  render: args => (
    <div className="o-container">
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Executive Analytics Dashboard</h2>
        <p style={{ margin: '0', color: 'var(--atomix-secondary-text-emphasis)' }}>
          Comprehensive view of company performance across all key metrics
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '24px',
        }}
      >
        {/* Primary Revenue Chart */}
        <div>
          <LineChart
            title="Revenue & Profit Trends"
            subtitle="12-month financial performance"
            datasets={[financialData.revenue, financialData.profit]}
            lineOptions={{ smooth: true, showDataPoints: true, pointRadius: 4 }}
            config={{
              showLegend: true,
              xAxis: { showGrid: true, label: 'Month' },
              yAxis: {
                showGrid: true,
                formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
              },
            }}
            aria-label="Primary dashboard chart showing revenue and profit trends"
          />
        </div>

        {/* Market Share Donut */}
        <div style={{ height: '350px' }}>
          <DonutChart
            title="Market Position"
            subtitle="Q4 market share"
            datasets={[marketShareData]}
            donutOptions={{
              innerRadiusRatio: 0.6,
              showTotal: true,
              centerLabel: 'Market Share',
              centerValue: '28.5%',
            }}
            config={{ showLegend: true }}
            aria-label="Market share donut chart"
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {/* Product Performance */}
        <div>
          <BarChart
            title="Product Performance"
            subtitle="Quarterly revenue"
            datasets={productPerformanceData}
            barOptions={{ cornerRadius: 4, showValues: false }}
            config={{
              showLegend: false,
              xAxis: { showGrid: false },
              yAxis: {
                showGrid: true,
                formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
              },
            }}
            size="sm"
            aria-label="Product performance bar chart"
          />
        </div>

        {/* User Analytics */}
        <div>
          <AreaChart
            title="User Engagement"
            subtitle="Weekly analytics"
            datasets={userAnalyticsData.slice(0, 2)}
            areaOptions={{ fillOpacity: 0.3, smooth: true }}
            config={{
              showLegend: true,
              xAxis: { showGrid: false },
              yAxis: { showGrid: true },
            }}
            size="sm"
            aria-label="User engagement area chart"
          />
        </div>

        {/* Performance Matrix */}
        <div>
          <ScatterChart
            title="Team Performance"
            subtitle="Efficiency vs. output"
            scatterDatasets={performanceScatterData}
            scatterOptions={{
              showRegressionLine: false,
              enableSelection: false,
            }}
            config={{
              showLegend: false,
              xAxis: { showGrid: true, label: 'Efficiency' },
              yAxis: { showGrid: true, label: 'Revenue' },
            }}
            size="sm"
            aria-label="Team performance scatter plot"
          />
        </div>
      </div>
    </div>
  ),
};
