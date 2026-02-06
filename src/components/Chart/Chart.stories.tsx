import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { useState } from 'react';
import { Container, Grid, GridCol } from '../../layouts/Grid';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Icon } from '../Icon';
import { SideMenu } from '../index';
import { SideMenuItem } from '../Navigation/SideMenu/SideMenuItem';
import { SideMenuList } from '../Navigation/SideMenu/SideMenuList';

import {
  AnimatedChart,
  AreaChart,
  BarChart,
  BubbleChart,
  CandlestickChart,
  Chart,
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
} from './index';

const meta = {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Chart

## Overview

Charts provide a comprehensive charting library with 20+ chart types including line, bar, pie, area, and more. Charts support real-time data updates, animations, interactive tooltips, and advanced customization options. Ideal for dashboards, analytics, data visualization, and any application requiring graphical data representation.

## Features

- Multiple chart types (Line, Bar, Pie, Area, etc.)
- Real-time data updates
- Interactive tooltips and annotations
- Animation capabilities
- Glass morphism effects
- Toolbar with export options
- Multi-axis support
- Advanced analytics integration

## Accessibility

- Keyboard support: Charts can be navigated using Tab key and arrow keys
- Screen reader: Data points and chart information announced appropriately
- ARIA support: Roles and properties ensure chart accessibility
- Focus management: Maintains focus on interactive chart elements

## Usage Examples

### Basic Usage

\`\`\`tsx
<LineChart 
  title="Sales Performance" 
  datasets={[{ label: 'Sales', data: data, color: 'var(--atomix-primary)' }]} 
/>
\`\`\`

### With Glass Effect

\`\`\`tsx
<BarChart 
  title="Revenue by Month" 
  datasets={datasets}
  glass={true}
  showToolbar={true}
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | string | - | Title of the chart |
| subtitle | string | - | Subtitle of the chart |
| datasets | Dataset[] | [] | Array of datasets to plot |
| width | string \\| number | 100% | Width of the chart |
| height | string \\| number | 400px | Height of the chart |
| glass | boolean | false | Whether to apply glass effect |
| showToolbar | boolean | false | Whether to show the toolbar |
| config | ChartConfig | {} | Additional configuration options |
| onPointClick | (point) => void | - | Callback when a data point is clicked |
| onPointHover | (point) => void | - | Callback when hovering over a data point |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the chart',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle of the chart',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the chart',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '100%' },
      },
    },
    height: {
      control: 'text',
      description: 'Height of the chart',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '400px' },
      },
    },
    glass: {
      control: 'boolean',
      description: 'Whether to apply glass effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showToolbar: {
      control: 'boolean',
      description: 'Whether to show the toolbar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    config: {
      control: 'object',
      description: 'Additional configuration options',
      table: {
        type: { summary: 'ChartConfig' },
        defaultValue: { summary: '{}' },
      },
    },
    onPointClick: {
      action: 'point clicked',
      description: 'Callback when a data point is clicked',
    },
    onPointHover: {
      action: 'point hovered',
      description: 'Callback when hovering over a data point',
    },
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Glass Variant Story
export const GlassVariant: Story = {
  render: (args) => {
    const sampleData = [
      { label: 'Jan', value: 65 },
      { label: 'Feb', value: 78 },
      { label: 'Mar', value: 90 },
      { label: 'Apr', value: 81 },
      { label: 'May', value: 56 },
      { label: 'Jun', value: 55 },
      { label: 'Jul', value: 40 },
    ];

    const datasets = [
      {
        label: 'Sales',
        data: sampleData,
        color: 'var(--atomix-primary)',
      },
    ];

    return (
      <div
        style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
        }}
      >
        <Container>
          <Grid>
            <GridCol col={12}>
              <h2 style={{ color: 'white', marginBottom: '2rem' }}>Chart Glass Variant</h2>
            </GridCol>
            <GridCol col={12} md={6}>
              <LineChart
                {...args}
                title="Sales Performance"
                subtitle="Monthly revenue data"
                datasets={datasets}
                glass={true}
                showToolbar={true}
                config={{
                  showTooltips: true,
                  animate: true,
                }}
              />
            </GridCol>
            <GridCol col={12} md={6}>
              <BarChart
                {...args}
                title="Revenue by Month"
                subtitle="Q1-Q2 comparison"
                datasets={datasets}
                glass={true}
                showToolbar={true}
                config={{
                  showTooltips: true,
                  animate: true,
                }}
              />
            </GridCol>
            <GridCol col={12} md={6}>
              <PieChart
                title="Market Share"
                data={sampleData}
                glass={true}
                showToolbar={true}
              />
            </GridCol>
            <GridCol col={12} md={6}>
              <AreaChart
                title="Growth Trend"
                subtitle="Year over year"
                datasets={datasets}
                glass={{
                  blurAmount: 0,
                  saturation: 180,
                  enableBorderEffect: true,
                }}
                showToolbar={true}
              />
            </GridCol>
          </Grid>
        </Container>
      </div>
    );
  },
  args: {
    onPointClick: fn(),
    onPointHover: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart with glass effect applied to demonstrate aesthetic enhancement.',
      },
    },
  },
};

// Data generators
const generateData = (points = 20) =>
  Array.from({ length: points }, (_, i) => ({
    label:
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i] ||
      `Point ${i + 1}`,
    value: Math.floor(Math.random() * 100) + 20,
  }));

const generateTimeSeriesData = (points = 20) =>
  Array.from({ length: points }, (_, i) => ({
    label: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    value: Math.floor(Math.random() * 1000) + 500,
  }));

const generateCandlestickData = (points = 20) =>
  Array.from({ length: points }, (_, i) => {
    const open = Math.floor(Math.random() * 100) + 50;
    const close = Math.floor(Math.random() * 100) + 50;
    const high = Math.max(open, close) + Math.floor(Math.random() * 20);
    const low = Math.min(open, close) - Math.floor(Math.random() * 20);
    return {
      date: `Day ${i + 1}`,
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 10000) + 1000,
    };
  });

const generateBubbleData = (points = 15) =>
  Array.from({ length: points }, (_, i) => ({
    label: `Point ${i + 1}`,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    size: Math.floor(Math.random() * 50) + 10,
    value: Math.floor(Math.random() * 1000),
  }));

const generateHeatmapData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  return days
    .map(day =>
      hours.map(hour => ({
        x: hour,
        y: day,
        value: Math.floor(Math.random() * 100),
      }))
    )
    .flat();
};

const generateTreemapData = (count = 12) => {
  const categories = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Energy',
    'Transport',
    'Media',
    'Real Estate',
    'Consulting',
    'Food & Beverage',
    'Sports',
    'Entertainment',
    'Travel',
    'Automotive',
    'Fashion',
    'Telecom',
    'Agriculture',
    'Construction',
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `category-${i}`,
    label: categories[i % categories.length] || `Category ${i + 1}`,
    value: Math.floor(Math.random() * 500) + 50,
    metadata: {
      growth: `${(Math.random() * 20 - 10).toFixed(1)}%`,
      revenue: `$${(Math.random() * 1000 + 100).toFixed(0)}K`,
    },
  }));
};

const generateFunnelData = () => {
  const stages = [
    { label: 'Awareness', value: 10000 },
    { label: 'Interest', value: 5000 },
    { label: 'Consideration', value: 2500 },
    { label: 'Intent', value: 1200 },
    { label: 'Evaluation', value: 600 },
    { label: 'Purchase', value: 300 },
  ];
  
  return stages.map(stage => ({
    ...stage,
    percentage: ((stage.value / stages[0].value) * 100).toFixed(1),
  }));
};

const datasets = [
  { label: 'Sales', data: generateData(), color: 'var(--atomix-primary)' },
  { label: 'Revenue', data: generateData(), color: 'var(--atomix-success)' },
  { label: 'Profit', data: generateData(), color: 'var(--atomix-warning)' },
];

// Modern Chart Gallery
export const ChartGallery: Story = {
  render: () => {
    const [selectedType, setSelectedType] = useState('line');
    const [animated, setAnimated] = useState(true);
    const [showLegend, setShowLegend] = useState(true);
    const [dataPoints, setDataPoints] = useState(12);

    const chartTypes = [
      { key: 'line', icon: 'TrendUp', label: 'Line', desc: 'Trends over time' },
      { key: 'area', icon: 'ChartBar', label: 'Area', desc: 'Filled line charts' },
      { key: 'bar', icon: 'ChartBar', label: 'Bar', desc: 'Compare categories' },
      { key: 'pie', icon: 'ChartPie', label: 'Pie', desc: 'Part-to-whole' },
      { key: 'donut', icon: 'ChartDonut', label: 'Donut', desc: 'Pie with center' },
      { key: 'scatter', icon: 'ChartScatter', label: 'Scatter', desc: 'Data correlation' },
      { key: 'radar', icon: 'Target', label: 'Radar', desc: 'Multi-dimensional' },
      { key: 'bubble', icon: 'Sphere', label: 'Bubble', desc: '3D data points' },
      { key: 'gauge', icon: 'Gauge', label: 'Gauge', desc: 'Single metrics' },
      { key: 'heatmap', icon: 'Fire', label: 'Heatmap', desc: 'Data density' },
      {
        key: 'candlestick',
        icon: 'ChartLine',
        label: 'Candlestick',
        desc: 'Financial data',
      },
      { key: 'waterfall', icon: 'Drop', label: 'Waterfall', desc: 'Cumulative flow' },
      { key: 'funnel', icon: 'Funnel', label: 'Funnel', desc: 'Process stages' },
      { key: 'treemap', icon: 'Tree', label: 'Treemap', desc: 'Hierarchical data' },
      { key: 'animated', icon: 'Sparkle', label: 'Animated', desc: 'Motion graphics' },
      { key: 'multiaxis', icon: 'ChartLineUp', label: 'Multi-axis', desc: 'Multiple scales' },
    ];

    // Generate dynamic data based on dataPoints
    const dynamicDatasets = [
      { label: 'Sales', data: generateData(dataPoints), color: 'var(--atomix-primary)' },
      { label: 'Revenue', data: generateData(dataPoints), color: 'var(--atomix-success)' },
      { label: 'Profit', data: generateData(dataPoints), color: 'var(--atomix-warning)' },
    ];

    const renderChart = () => {
      const commonProps = {
        title: `${chartTypes.find(t => t.key === selectedType)?.label} Chart`,
        config: { showLegend, animate: animated },
        showToolbar: true,
        enableFullscreen: true,
        enableExport: true,
        enableRefresh: true,
        onRefresh: () => console.log('Story: Refresh clicked'),
        onExport: (format: string) => console.log('Story: Export clicked', format),
        onFullscreen: (isFullscreen: boolean) =>
          console.log('Story: Fullscreen toggled', isFullscreen),
      };

      // Custom toolbar with chart controls
      const customToolbar = (
        <div className="u-flex u-gap-2 u-items-center u-flex-wrap u-mb-5">
          <div className="u-border-start u-ps-2 u-flex u-gap-2 u-items-center">
            {/* Data Points Control */}
            <div className="u-flex u-items-center u-gap-1">
              <Icon name="Database" size="sm" />
              <input
                type="range"
                min="4"
                max="20"
                value={dataPoints}
                onChange={e => setDataPoints(Number(e.target.value))}
                className="u-w-16"
                title="Adjust data points"
              />
              <Badge label={dataPoints.toString()} variant="info" size="sm" />
            </div>

            {/* Legend Toggle */}
            <Button
              size="sm"
              variant={showLegend ? 'info' : 'secondary'}
              onClick={() => setShowLegend(!showLegend)}
              icon={<Icon name="List" />}
              label={`${showLegend ? 'Hide' : 'Show'} legend`}
            />

            {/* Animation Toggle */}
            <Button
              size="sm"
              variant={animated ? 'success' : 'secondary'}
              onClick={() => setAnimated(!animated)}
              icon={<Icon name="Sparkle" />}
              label={`${animated ? 'Disable' : 'Enable'} animations`}
            />
          </div>
        </div>
      );

      switch (selectedType) {
        case 'line':
          return (
            <div>
              {customToolbar}
              <LineChart datasets={dynamicDatasets} {...commonProps} />
            </div>
          );
        case 'area':
          return (
            <div>
              {customToolbar}
              <AreaChart datasets={dynamicDatasets} {...commonProps} />
            </div>
          );
        case 'bar':
          return (
            <div>
              {customToolbar}
              <BarChart datasets={dynamicDatasets} {...commonProps} />
            </div>
          );
        case 'pie':
          return (
            <div>
              {customToolbar}
              <PieChart
                datasets={[{ label: 'Distribution', data: generateData(6) }]}
                {...commonProps}
              />
            </div>
          );
        case 'donut':
          return (
            <div>
              {customToolbar}
              <DonutChart
                datasets={[{ label: 'Distribution', data: generateData(6) }]}
                {...commonProps}
              />
            </div>
          );
        case 'scatter':
          return (
            <div>
              {customToolbar}
              <ScatterChart datasets={dynamicDatasets} {...commonProps} />
            </div>
          );
        case 'radar':
          return (
            <div>
              {customToolbar}
              <RadarChart datasets={dynamicDatasets} {...commonProps} />
            </div>
          );
        case 'bubble':
          return (
            <div>
              {customToolbar}
              <BubbleChart bubbleData={generateBubbleData(dataPoints)} {...commonProps} />
            </div>
          );
        case 'gauge':
          return (
            <div>
              {customToolbar}
              <GaugeChart value={75} max={100} {...commonProps} />
            </div>
          );
        case 'heatmap':
          return (
            <div>
              {customToolbar}
              <HeatmapChart data={generateHeatmapData()} {...commonProps} />
            </div>
          );
        case 'candlestick':
          return (
            <div>
              {customToolbar}
              <CandlestickChart
                candlestickData={generateCandlestickData(dataPoints)}
                {...commonProps}
              />
            </div>
          );
        case 'waterfall':
          return (
            <div>
              {customToolbar}
              <WaterfallChart
                waterfallData={[
                  { label: 'Starting Balance', value: 1000, type: 'subtotal' },
                  { label: 'Sales', value: 500, type: 'positive' },
                  { label: 'Expenses', value: -200, type: 'negative' },
                  { label: 'Taxes', value: -100, type: 'negative' },
                  { label: 'Net Profit', value: 200, type: 'subtotal' },
                ]}
                {...commonProps}
              />
            </div>
          );
        case 'funnel':
          return (
            <div>
              {customToolbar}
              <FunnelChart
                funnelData={generateFunnelData()}
                funnelOptions={{
                  showLabels: true,
                  showValues: true,
                  showPercentages: true,
                  showConversionRates: true,
                  useGradient: true,
                  animate: animated,
                }}
                {...commonProps}
              />
            </div>
          );
        case 'treemap':
          return (
            <div>
              {customToolbar}
              <TreemapChart
                data={generateTreemapData(Math.min(dataPoints, 20))}
                algorithm="squarified"
                colorConfig={{ scheme: 'category' }}
                labelConfig={{
                  showLabels: true,
                  minSize: 500,
                  fontSize: 12,
                  textColor: 'var(--atomix-text-primary)',
                }}
                {...commonProps}
              />
            </div>
          );
        case 'animated':
          return (
            <div>
              {customToolbar}
              <AnimatedChart datasets={dynamicDatasets} {...commonProps} />
            </div>
          );
        case 'multiaxis':
          return (
            <div>
              {customToolbar}
              <MultiAxisChart
                datasets={dynamicDatasets.map((d, i) => ({ ...d, yAxisId: `axis${i}` }))}
                yAxes={dynamicDatasets.map((d, i) => ({
                  id: `axis${i}`,
                  position: i % 2 ? 'right' : 'left',
                  label: d.label,
                }))}
                {...commonProps}
              />
            </div>
          );
        default:
          return (
            <div>
              {customToolbar}
              <LineChart datasets={dynamicDatasets} {...commonProps} />
            </div>
          );
      }
    };

    return (
      <Container className="u-py-6">
        <Card className="u-mb-6 u-p-6 u-text-center">
          <h1 className="u-mb-3 u-flex u-items-center u-justify-center u-gap-2">
            <Icon name="ChartBar" size="lg" />
            Atomix Chart Gallery
          </h1>
          <p className="u-mb-4 u-text-muted">
            Explore 20+ modern chart types with integrated toolbar controls
          </p>
          <div className="u-flex u-gap-2 u-justify-center u-flex-wrap">
            <Badge label="20+ Types" variant="primary" />
            <Badge label="Real-time" variant="success" />
            <Badge label="Interactive" variant="info" />
            <Badge label="Animated" variant="warning" />
          </div>
        </Card>

        <Grid>
          <GridCol xs={3}>
            <Card className="u-p-4 u-h-100">
              <h3 className="u-mb-4">Chart Types</h3>
              <SideMenu title="Chart Types">
                <SideMenuList>
                  {chartTypes.map(({ key, icon, label, desc }) => (
                    <SideMenuItem
                      key={key}
                      onClick={() => setSelectedType(key)}
                      active={selectedType === key}
                    >
                      <div className="u-flex u-items-center u-gap-2">
                        <Icon name={icon as any} size="sm" />
                        <div>
                          <div>{label}</div>
                          <small className="u-text-muted">{desc}</small>
                        </div>
                      </div>
                    </SideMenuItem>
                  ))}
                </SideMenuList>
              </SideMenu>
            </Card>
          </GridCol>
          <GridCol xs={9}>
            <Card className="u-p-0 u-overflow-hidden">
              <div className="u-h-100 u-min-h-100 u-overflow-auto">{renderChart()}</div>
            </Card>
          </GridCol>
        </Grid>
      </Container>
    );
  },
};

// Individual chart stories for documentation
export const LineChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <LineChart
              datasets={[
                { label: 'Sales', data: generateData(12), color: 'var(--atomix-primary)' },
                { label: 'Revenue', data: generateData(12), color: 'var(--atomix-success)' },
              ]}
              title="Line Chart Example"
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Line Chart',
};

export const BarChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <BarChart
              datasets={[
                { label: 'Sales', data: generateData(8), color: 'var(--atomix-primary)' },
                { label: 'Revenue', data: generateData(8), color: 'var(--atomix-success)' },
              ]}
              title="Bar Chart Example"
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Bar Chart',
};

export const PieChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <PieChart
              datasets={[{ label: 'Market Share', data: generateData(6) }]}
              title="Pie Chart Example"
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Pie Chart',
};

export const DonutChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <DonutChart
              datasets={[{ label: 'Market Share', data: generateData(6) }]}
              title="Donut Chart Example"
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Donut Chart',
};

export const CandlestickChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <CandlestickChart
              candlestickData={generateCandlestickData(20)}
              title="Candlestick Chart Example"
              config={{ showLegend: true, animate: true, showTooltips: true }}
              candlestickOptions={{ showTooltips: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Candlestick Chart',
};

export const TreemapChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <TreemapChart
              data={generateTreemapData(15)}
              title="Treemap Chart Example"
              algorithm="squarified"
              colorConfig={{ scheme: 'category' }}
              labelConfig={{
                showLabels: true,
                minSize: 500,
                fontSize: 12,
                textColor: 'var(--atomix-text-primary)',
              }}
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Treemap Chart',
};

export const FunnelChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <FunnelChart
              funnelData={generateFunnelData()}
              title="Funnel Chart Example"
              funnelOptions={{
                showLabels: true,
                showValues: true,
                showPercentages: true,
                showConversionRates: true,
                useGradient: true,
                animate: true,
              }}
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Funnel Chart',
};

export const HeatmapChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <HeatmapChart
              data={generateHeatmapData()}
              title="Heatmap Chart Example"
              colorScale={{
                scheme: 'viridis',
                steps: 9,
              }}
              cellConfig={{
                width: 30,
                height: 30,
                spacing: 2,
                borderRadius: 4,
                showLabels: false,
              }}
              showColorLegend={true}
              showGrid={true}
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Heatmap Chart',
};

export const ScatterChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <ScatterChart
              datasets={[
                { label: 'Sales', data: generateData(15), color: 'var(--atomix-primary)' },
                { label: 'Revenue', data: generateData(15), color: 'var(--atomix-success)' },
              ]}
              title="Scatter Chart Example"
              scatterOptions={{
                pointRadius: 5,
                showLabels: false,
                enableHoverEffects: true,
              }}
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Scatter Chart',
};

export const BubbleChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <BubbleChart
              bubbleData={generateBubbleData(20)}
              title="Bubble Chart Example"
              bubbleOptions={{
                minBubbleSize: 10,
                maxBubbleSize: 60,
                bubbleOpacity: 0.7,
                showLabels: true,
                enableAnimations: true,
              }}
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Bubble Chart',
};

export const RadarChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <RadarChart
              datasets={[
                { label: 'Performance', data: generateData(8), color: 'var(--atomix-primary)' },
                { label: 'Target', data: generateData(8), color: 'var(--atomix-success)' },
              ]}
              title="Radar Chart Example"
              radarOptions={{
                gridLevels: 5,
                showGrid: true,
                showAxisLabels: true,
                fillArea: true,
                fillOpacity: 0.3,
                showDataPoints: true,
                pointRadius: 4,
                lineWidth: 2,
              }}
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Radar Chart',
};

export const WaterfallChartStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <WaterfallChart
              waterfallData={[
                { label: 'Starting Balance', value: 1000, type: 'subtotal' },
                { label: 'Sales', value: 500, type: 'positive' },
                { label: 'Investment', value: 200, type: 'positive' },
                { label: 'Expenses', value: -200, type: 'negative' },
                { label: 'Taxes', value: -100, type: 'negative' },
                { label: 'Fees', value: -50, type: 'negative' },
                { label: 'Ending Balance', value: 1350, type: 'total' },
              ]}
              title="Waterfall Chart Example"
              waterfallOptions={{
                showConnectors: true,
                showValues: true,
                showBaseline: true,
                animate: true,
              }}
              config={{ showLegend: true, animate: true }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Waterfall Chart',
};

export const TooltipTestStory: Story = {
  render: () => (
    <Container className="u-py-6">
      <Grid>
        <GridCol xs={12}>
          <Card className="u-p-6">
            <LineChart
              datasets={[
                {
                  label: 'Sales',
                  data: generateData(12).map((d, i) => ({
                    ...d,
                    metadata: {
                      trend: i % 2 === 0 ? 'Up' : 'Down',
                      change: `${Math.floor(Math.random() * 10)}%`,
                    },
                  })),
                  color: 'var(--atomix-primary)',
                },
              ]}
              title="Tooltip Test Chart"
              config={{
                showLegend: true,
                animate: true,
                showTooltips: true,
              }}
              showToolbar
            />
          </Card>
        </GridCol>
      </Grid>
    </Container>
  ),
  name: 'Tooltip Test',
};
