import type { Meta, StoryObj } from '@storybook/react';
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

const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Modern chart library with 20+ chart types, real-time updates, animations, and advanced interactions.',
      },
      source: {
        code: `<Icon name="Rocket" /> Modern chart library with 20+ chart types, real-time updates, animations, and advanced interactions.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

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
  
  return days.map(day => 
    hours.map(hour => ({
      x: hour,
      y: day,
      value: Math.floor(Math.random() * 100),
    }))
  ).flat();
};

const datasets = [
  { label: 'Sales', data: generateData(), color: '#3b82f6' },
  { label: 'Revenue', data: generateData(), color: '#10b981' },
  { label: 'Profit', data: generateData(), color: '#f59e0b' },
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
      { label: 'Sales', data: generateData(dataPoints), color: '#3b82f6' },
      { label: 'Revenue', data: generateData(dataPoints), color: '#10b981' },
      { label: 'Profit', data: generateData(dataPoints), color: '#f59e0b' },
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
        <div className="u-d-flex u-gap-2 u-align-items-center u-flex-wrap u-mb-5">
          <div className="u-border-start u-ps-2 u-d-flex u-gap-2 u-align-items-center">
            {/* Data Points Control */}
            <div className="u-d-flex u-align-items-center u-gap-1">
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
              <PieChart datasets={[{ label: 'Distribution', data: generateData(6) }]} {...commonProps} />
            </div>
          );
        case 'donut':
          return (
            <div>
              {customToolbar}
              <DonutChart datasets={[{ label: 'Distribution', data: generateData(6) }]} {...commonProps} />
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
              <BubbleChart 
                bubbleData={generateBubbleData(dataPoints)} 
                {...commonProps} 
              />
            </div>
          );
        case 'gauge':
          return (
            <div>
              {customToolbar}
              <GaugeChart 
                value={75}
                max={100}
                {...commonProps}
              />
            </div>
          );
        case 'heatmap':
          return (
            <div>
              {customToolbar}
              <HeatmapChart 
                data={generateHeatmapData()} 
                {...commonProps}
              />
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
                funnelData={[
                  { label: 'Visitors', value: 1000 },
                  { label: 'Signups', value: 300 },
                  { label: 'Purchases', value: 150 },
                  { label: 'Repeat Customers', value: 60 },
                ]}
                {...commonProps}
              />
            </div>
          );
        case 'treemap':
          return (
            <div>
              {customToolbar}
              <TreemapChart
                data={Array.from({ length: dataPoints }, (_, i) => ({
                  id: `item-${i}`,
                  label: `Category ${String.fromCharCode(65 + i)}`,
                  value: Math.random() * 100 + 20,
                }))}
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
          <h1 className="u-mb-3 u-d-flex u-align-items-center u-justify-content-center u-gap-2">
            <Icon name="ChartBar" size="lg" />
            Atomix Chart Gallery
          </h1>
          <p className="u-mb-4 u-text-muted">
            Explore 20+ modern chart types with integrated toolbar controls
          </p>
          <div className="u-d-flex u-gap-2 u-justify-content-center u-flex-wrap">
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
                      <div className="u-d-flex u-align-items-center u-gap-2">
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
                { label: 'Sales', data: generateData(12), color: '#3b82f6' },
                { label: 'Revenue', data: generateData(12), color: '#10b981' },
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
                { label: 'Sales', data: generateData(8), color: '#3b82f6' },
                { label: 'Revenue', data: generateData(8), color: '#10b981' },
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
                      change: `${Math.floor(Math.random() * 10)}%`
                    }
                  })), 
                  color: '#3b82f6' 
                },
              ]}
              title="Tooltip Test Chart"
              config={{ 
                showLegend: true, 
                animate: true,
                showTooltips: true
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
