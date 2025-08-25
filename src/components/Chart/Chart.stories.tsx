import type { Meta, StoryObj } from '@storybook/react';
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
  AdvancedChart,
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
  RealTimeChart,
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
      { key: 'realtime', icon: 'WifiHigh', label: 'Real-time', desc: 'Live streaming' },
      { key: 'multiaxis', icon: 'ChartLineUp', label: 'Multi-axis', desc: 'Multiple scales' },
      { key: 'advanced', icon: 'Rocket', label: 'Advanced', desc: 'Complex features' },
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
                datasets={[{ label: 'Data', data: generateData(dataPoints) }]}
                {...commonProps}
              />
            </div>
          );
        case 'donut':
          return (
            <div>
              {customToolbar}
              <DonutChart
                datasets={[{ label: 'Data', data: generateData(dataPoints) }]}
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
              <RadarChart datasets={[dynamicDatasets[0]]} {...commonProps} />
            </div>
          );
        case 'bubble':
          return (
            <div>
              {customToolbar}
              <BubbleChart
                bubbleData={Array.from({ length: dataPoints }, (_, i) => ({
                  label: `Point ${i + 1}`,
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  size: Math.random() * 50 + 20,
                  color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 4],
                }))}
                {...commonProps}
              />
            </div>
          );
        case 'gauge':
          return (
            <div>
              {customToolbar}
              <GaugeChart value={Math.min(dataPoints * 5, 100)} {...commonProps} />
            </div>
          );
        case 'heatmap':
          return (
            <div>
              {customToolbar}
              <HeatmapChart
                data={Array.from({ length: dataPoints * 4 }, (_, i) => ({
                  x: i % Math.ceil(Math.sqrt(dataPoints * 4)),
                  y: Math.floor(i / Math.ceil(Math.sqrt(dataPoints * 4))),
                  value: Math.random() * 100,
                  label: `${i}`,
                }))}
                {...commonProps}
              />
            </div>
          );
        case 'candlestick':
          return (
            <div>
              {customToolbar}
              <CandlestickChart
                candlestickData={Array.from({ length: dataPoints }, (_, i) => ({
                  date: new Date(2024, 0, i + 1).toISOString(),
                  open: 100 + Math.random() * 20,
                  high: 120 + Math.random() * 20,
                  low: 80 + Math.random() * 20,
                  close: 110 + Math.random() * 20,
                }))}
                {...commonProps}
              />
            </div>
          );
        case 'waterfall':
          return (
            <div>
              {customToolbar}
              <WaterfallChart
                waterfallData={Array.from({ length: Math.min(dataPoints, 8) }, (_, i) => {
                  if (i === 0) return { label: 'Start', value: 100, type: 'total' };
                  if (i === Math.min(dataPoints, 8) - 1)
                    return { label: 'End', value: 100 + (i - 1) * 5, type: 'total' };
                  return {
                    label: `Step ${i}`,
                    value: Math.random() > 0.5 ? Math.random() * 30 : -Math.random() * 20,
                    type: Math.random() > 0.5 ? 'positive' : 'negative',
                  };
                })}
                {...commonProps}
              />
            </div>
          );
        case 'funnel':
          return (
            <div>
              {customToolbar}
              <FunnelChart
                funnelData={Array.from({ length: Math.min(dataPoints, 8) }, (_, i) => ({
                  label: `Stage ${i + 1}`,
                  value: 1000 - i * 100 - Math.random() * 50,
                }))}
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
        case 'realtime':
          return (
            <div>
              {customToolbar}
              <RealTimeChart
                datasets={[]}
                dataSource={async () => [
                  { label: new Date().toLocaleTimeString(), value: Math.random() * 100 },
                ]}
                {...commonProps}
              />
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
        case 'advanced':
          return (
            <div>
              {customToolbar}
              <AdvancedChart datasets={dynamicDatasets} {...commonProps} />
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
                          {/* <small className="u-text-muted">{desc}</small> */}
                        </div>
                      </div>
                    </SideMenuItem>
                  ))}
                </SideMenuList>
              </SideMenu>
            </Card>
          </GridCol>

          <GridCol xs={9}>
            <Card className="u-p-4 u-min-h-600">{renderChart()}</Card>
          </GridCol>
        </Grid>
      </Container>
    );
  },
};

// Quick Examples
export const BasicCharts: Story = {
  render: () => (
    <Container className="u-py-4">
      <div
        className="u-d-grid u-gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}
      >
        <Card className="u-p-4">
          <LineChart
            title="Line Chart"
            datasets={[datasets[0]]}
            config={{ showLegend: false }}
            className="u-h-100"
          />
        </Card>

        <Card className="u-p-4">
          <BarChart
            title="Bar Chart"
            datasets={[datasets[1]]}
            config={{ showLegend: false }}
            className="u-h-100"
          />
        </Card>

        <Card className="u-p-4">
          <PieChart
            title="Pie Chart"
            datasets={[{ label: 'Data', data: generateData(4) }]}
            config={{ showLegend: true }}
            className="u-h-100"
          />
        </Card>

        <Card className="u-p-4">
          <DonutChart
            title="Donut Chart"
            datasets={[{ label: 'Data', data: generateData(4) }]}
            config={{ showLegend: true }}
            className="u-h-100"
          />
        </Card>
      </div>
    </Container>
  ),
};

// Advanced Features
export const AdvancedFeatures: Story = {
  render: () => (
    <Container className="u-py-4">
      <div
        className="u-d-grid u-gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))' }}
      >
        <Card className="u-p-4">
          <MultiAxisChart
            title="Multi-Axis Chart"
            datasets={datasets}
            yAxes={datasets.map((d, i) => ({
              id: `axis${i}`,
              position: i % 2 ? 'right' : 'left',
              label: d.label,
            }))}
            className="u-h-100"
          />
        </Card>

        <Card className="u-p-4">
          <AnimatedChart
            title="Animated Chart"
            datasets={datasets}
            animationConfig={{ duration: 2000, easing: 'bounce' }}
            className="u-h-100"
          />
        </Card>

        <Card className="u-p-4">
          <RealTimeChart
            title="Real-time Chart"
            datasets={[]}
            dataSource={async () => [
              {
                label: new Date().toLocaleTimeString(),
                value: Math.sin(Date.now() * 0.001) * 20 + 50,
              },
            ]}
            streamConfig={{ interval: 1000, maxDataPoints: 20, autoScroll: true }}
            className="u-h-100"
          />
        </Card>

        <Card className="u-p-4">
          <GaugeChart
            title="Gauge Chart"
            value={78}
            gaugeOptions={{
              colorZones: [
                { from: 0, to: 50, color: '#ef4444' },
                { from: 50, to: 80, color: '#f59e0b' },
                { from: 80, to: 100, color: '#10b981' },
              ],
            }}
            className="u-h-100"
          />
        </Card>
      </div>
    </Container>
  ),
};
