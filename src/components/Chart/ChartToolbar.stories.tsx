import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Container, GridCol, Row } from '../../layouts/Grid';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import Chart from './Chart';
import ChartToolbar from './ChartToolbar';
import LineChart from './LineChart';
import BarChart from './BarChart';
import InteractiveChart from './InteractiveChart';
import { ChartToolbarAction, ChartToolbarGroup } from './ChartToolbar';

const meta: Meta<typeof ChartToolbar> = {
  title: 'Components/Chart/ChartToolbar',
  component: ChartToolbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Dynamic and flexible chart toolbar system that adapts to different chart types with contextual tools and actions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChartToolbar>;

// Sample data
const generateData = (points = 12) =>
  Array.from({ length: points }, (_, i) => ({
    label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i] || `Point ${i + 1}`,
    value: Math.floor(Math.random() * 100) + 20,
  }));

const sampleDatasets = [
  { label: 'Sales', data: generateData(), color: '#3b82f6' },
  { label: 'Revenue', data: generateData(), color: '#10b981' },
];

// Dynamic Toolbar Demo
export const DynamicToolbarDemo: Story = {
  render: () => {
    const [selectedChart, setSelectedChart] = useState<'line' | 'bar' | 'interactive'>('line');
    const [toolbarState, setToolbarState] = useState({
      showGrid: true,
      showLegend: true,
      showTooltips: true,
      animationsEnabled: true,
      zoomLevel: 1,
      panEnabled: false,
    });

    const chartTypes = [
      { key: 'line', label: 'Line Chart', desc: 'With zoom & pan tools' },
      { key: 'bar', label: 'Bar Chart', desc: 'With display controls' },
      { key: 'interactive', label: 'Interactive Chart', desc: 'Full toolbar suite' },
    ];

    const handleToolbarAction = (action: string, value?: any) => {
      console.log(`Toolbar action: ${action}`, value);
      
      switch (action) {
        case 'grid':
          setToolbarState(prev => ({ ...prev, showGrid: !prev.showGrid }));
          break;
        case 'legend':
          setToolbarState(prev => ({ ...prev, showLegend: !prev.showLegend }));
          break;
        case 'tooltips':
          setToolbarState(prev => ({ ...prev, showTooltips: !prev.showTooltips }));
          break;
        case 'animations':
          setToolbarState(prev => ({ ...prev, animationsEnabled: !prev.animationsEnabled }));
          break;
        case 'zoom-in':
          setToolbarState(prev => ({ ...prev, zoomLevel: Math.min(prev.zoomLevel * 1.2, 3) }));
          break;
        case 'zoom-out':
          setToolbarState(prev => ({ ...prev, zoomLevel: Math.max(prev.zoomLevel / 1.2, 0.5) }));
          break;
        case 'zoom-reset':
          setToolbarState(prev => ({ ...prev, zoomLevel: 1 }));
          break;
        case 'pan':
          setToolbarState(prev => ({ ...prev, panEnabled: !prev.panEnabled }));
          break;
        case 'reset':
          setToolbarState({
            showGrid: true,
            showLegend: true,
            showTooltips: true,
            animationsEnabled: true,
            zoomLevel: 1,
            panEnabled: false,
          });
          break;
      }
    };

    const renderChart = () => {
      const commonProps = {
        title: `${chartTypes.find(t => t.key === selectedChart)?.label}`,
        datasets: sampleDatasets,
        config: { 
          showLegend: toolbarState.showLegend,
          showGrid: toolbarState.showGrid,
          animate: toolbarState.animationsEnabled,
        },
        showToolbar: true,
        enableFullscreen: true,
        enableExport: true,
        enableRefresh: true,
        toolbarConfig: {
          handlers: {
            onGridToggle: (show: boolean) => handleToolbarAction('grid', show),
            onLegendToggle: (show: boolean) => handleToolbarAction('legend', show),
            onTooltipsToggle: (show: boolean) => handleToolbarAction('tooltips', show),
            onAnimationsToggle: (enabled: boolean) => handleToolbarAction('animations', enabled),
            onZoomIn: () => handleToolbarAction('zoom-in'),
            onZoomOut: () => handleToolbarAction('zoom-out'),
            onZoomReset: () => handleToolbarAction('zoom-reset'),
            onPanToggle: (enabled: boolean) => handleToolbarAction('pan', enabled),
            onReset: () => handleToolbarAction('reset'),
          },
        },
      };

      switch (selectedChart) {
        case 'line':
          return <LineChart {...commonProps} />;
        case 'bar':
          return <BarChart {...commonProps} />;
        case 'interactive':
          return <InteractiveChart {...commonProps} />;
        default:
          return <LineChart {...commonProps} />;
      }
    };

    return (
      <Container className="u-py-6">
        <Card className="u-mb-6 u-p-6 u-text-center">
          <h1 className="u-mb-3">Dynamic Chart Toolbar System</h1>
          <p className="u-mb-4 u-text-muted">
            Contextual toolbar tools that adapt to different chart types
          </p>
          <div className="u-d-flex u-gap-2 u-justify-content-center u-flex-wrap">
            <Badge label="Chart-Specific Tools" variant="primary" />
            <Badge label="Keyboard Shortcuts" variant="success" />
            <Badge label="State Management" variant="info" />
            <Badge label="Custom Actions" variant="warning" />
          </div>
        </Card>

        <Row>
          <GridCol xs={3}>
            <Card className="u-p-4">
              <h3 className="u-mb-4">Chart Types</h3>
              <div className="u-d-flex u-flex-column u-gap-2">
                {chartTypes.map(({ key, label, desc }) => (
                  <button
                    key={key}
                    className={`u-p-3 u-border u-border-radius u-text-start u-bg-transparent ${
                      selectedChart === key ? 'u-border-primary u-bg-primary-1' : 'u-border-gray-3'
                    }`}
                    onClick={() => setSelectedChart(key as any)}
                  >
                    <div className="u-fw-medium">{label}</div>
                    <small className="u-text-muted">{desc}</small>
                  </button>
                ))}
              </div>

              <div className="u-mt-4 u-pt-4 u-border-top">
                <h4 className="u-mb-3 u-text-sm">Current State</h4>
                <div className="u-d-flex u-flex-column u-gap-1 u-text-xs">
                  <div className="u-d-flex u-justify-between">
                    <span>Grid:</span>
                    <Badge label={toolbarState.showGrid ? 'On' : 'Off'} size="sm" variant={toolbarState.showGrid ? 'success' : 'secondary'} />
                  </div>
                  <div className="u-d-flex u-justify-between">
                    <span>Legend:</span>
                    <Badge label={toolbarState.showLegend ? 'On' : 'Off'} size="sm" variant={toolbarState.showLegend ? 'success' : 'secondary'} />
                  </div>
                  <div className="u-d-flex u-justify-between">
                    <span>Tooltips:</span>
                    <Badge label={toolbarState.showTooltips ? 'On' : 'Off'} size="sm" variant={toolbarState.showTooltips ? 'success' : 'secondary'} />
                  </div>
                  <div className="u-d-flex u-justify-between">
                    <span>Animations:</span>
                    <Badge label={toolbarState.animationsEnabled ? 'On' : 'Off'} size="sm" variant={toolbarState.animationsEnabled ? 'success' : 'secondary'} />
                  </div>
                  <div className="u-d-flex u-justify-between">
                    <span>Zoom:</span>
                    <Badge label={`${Math.round(toolbarState.zoomLevel * 100)}%`} size="sm" variant="info" />
                  </div>
                  <div className="u-d-flex u-justify-between">
                    <span>Pan:</span>
                    <Badge label={toolbarState.panEnabled ? 'On' : 'Off'} size="sm" variant={toolbarState.panEnabled ? 'success' : 'secondary'} />
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          <GridCol xs={9}>
            <Card className="u-p-4" style={{ minHeight: '600px' }}>
              {renderChart()}
            </Card>
          </GridCol>
        </Row>
      </Container>
    );
  },
};

// Custom Toolbar Actions
export const CustomToolbarActions: Story = {
  render: () => {
    const [customState, setCustomState] = useState({
      dataFilter: 'all',
      chartTheme: 'default',
      exportFormat: 'png',
    });

    const customActions: ChartToolbarAction[] = [
      {
        id: 'filter-all',
        label: 'All Data',
        icon: 'Funnel',
        onClick: () => setCustomState(prev => ({ ...prev, dataFilter: 'all' })),
        active: customState.dataFilter === 'all',
        tooltip: 'Show all data points',
      },
      {
        id: 'filter-recent',
        label: 'Recent',
        icon: 'Clock',
        onClick: () => setCustomState(prev => ({ ...prev, dataFilter: 'recent' })),
        active: customState.dataFilter === 'recent',
        tooltip: 'Show recent data only',
      },
    ];

    const customGroups: ChartToolbarGroup[] = [
      {
        id: 'data-filter',
        label: 'Filter',
        actions: customActions,
        separator: true,
      },
      {
        id: 'theme-actions',
        label: 'Theme',
        actions: [
          {
            id: 'theme-default',
            label: 'Default',
            icon: 'Sun',
            onClick: () => setCustomState(prev => ({ ...prev, chartTheme: 'default' })),
            active: customState.chartTheme === 'default',
            tooltip: 'Default theme',
          },
          {
            id: 'theme-dark',
            label: 'Dark',
            icon: 'Moon',
            onClick: () => setCustomState(prev => ({ ...prev, chartTheme: 'dark' })),
            active: customState.chartTheme === 'dark',
            tooltip: 'Dark theme',
          },
        ],
        separator: true,
      },
    ];

    return (
      <Container className="u-py-6">
        <Card className="u-p-6">
          <h2 className="u-mb-4">Custom Toolbar Actions</h2>
          <p className="u-mb-4 u-text-muted">
            Demonstrate custom toolbar groups and actions with state management
          </p>
          
          <div className="u-mb-4 u-p-3 u-bg-gray-1 u-border-radius">
            <div className="u-d-flex u-gap-4 u-text-sm">
              <div>
                <strong>Data Filter:</strong> {customState.dataFilter}
              </div>
              <div>
                <strong>Theme:</strong> {customState.chartTheme}
              </div>
              <div>
                <strong>Export Format:</strong> {customState.exportFormat}
              </div>
            </div>
          </div>

          <Chart
            type="line"
            title="Chart with Custom Toolbar"
            datasets={sampleDatasets}
            showToolbar={true}
            enableFullscreen={true}
            enableExport={true}
            enableRefresh={true}
            customToolbarGroups={customGroups}
            toolbarConfig={{
              defaults: {
                zoom: true,
                reset: true,
              },
            }}
          />
        </Card>
      </Container>
    );
  },
};

// Standalone Toolbar
export const StandaloneToolbar: Story = {
  render: () => {
    const [toolbarState, setToolbarState] = useState({
      isFullscreen: false,
      isExporting: false,
      zoomLevel: 1,
      panEnabled: false,
    });

    const handleAction = (action: string) => {
      console.log(`Action: ${action}`);
      
      switch (action) {
        case 'fullscreen':
          setToolbarState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
          break;
        case 'export':
          setToolbarState(prev => ({ ...prev, isExporting: true }));
          setTimeout(() => {
            setToolbarState(prev => ({ ...prev, isExporting: false }));
          }, 2000);
          break;
        case 'zoom-in':
          setToolbarState(prev => ({ ...prev, zoomLevel: Math.min(prev.zoomLevel * 1.2, 3) }));
          break;
        case 'zoom-out':
          setToolbarState(prev => ({ ...prev, zoomLevel: Math.max(prev.zoomLevel / 1.2, 0.5) }));
          break;
        case 'pan':
          setToolbarState(prev => ({ ...prev, panEnabled: !prev.panEnabled }));
          break;
        case 'reset':
          setToolbarState(prev => ({ ...prev, zoomLevel: 1, panEnabled: false }));
          break;
      }
    };

    return (
      <Container className="u-py-6">
        <Card className="u-p-6">
          <h2 className="u-mb-4">Standalone Chart Toolbar</h2>
          <p className="u-mb-4 u-text-muted">
            Use the toolbar component independently for custom chart implementations
          </p>

          <div className="u-mb-4">
            <ChartToolbar
              chartType="interactive"
              enableDefaults={true}
              defaults={{
                refresh: true,
                export: true,
                fullscreen: true,
                zoom: true,
                pan: true,
                reset: true,
              }}
              state={toolbarState}
              onRefresh={() => handleAction('refresh')}
              onExport={async (format) => {
                console.log(`Exporting as ${format}`);
                handleAction('export');
              }}
              onFullscreen={(isFullscreen) => {
                setToolbarState(prev => ({ ...prev, isFullscreen }));
              }}
              onZoomIn={() => handleAction('zoom-in')}
              onZoomOut={() => handleAction('zoom-out')}
              onZoomReset={() => handleAction('reset')}
              onPanToggle={(enabled) => {
                setToolbarState(prev => ({ ...prev, panEnabled: enabled }));
              }}
              onReset={() => handleAction('reset')}
            />
          </div>

          <div className="u-p-4 u-bg-gray-1 u-border-radius">
            <h4 className="u-mb-3">Current State</h4>
            <div className="u-d-grid u-gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div>
                <strong>Fullscreen:</strong> {toolbarState.isFullscreen ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Exporting:</strong> {toolbarState.isExporting ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Zoom Level:</strong> {Math.round(toolbarState.zoomLevel * 100)}%
              </div>
              <div>
                <strong>Pan Mode:</strong> {toolbarState.panEnabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </div>
        </Card>
      </Container>
    );
  },
};

// Default
export const Default: Story = {
  render: () => (
    <Container className="u-py-6">
      <Card className="u-p-6">
        <ChartToolbar
          chartType="line"
          enableDefaults={true}
          onRefresh={() => console.log('Refresh')}
          onExport={async (format) => console.log(`Export as ${format}`)}
          onFullscreen={(isFullscreen) => console.log(`Fullscreen: ${isFullscreen}`)}
        />
      </Card>
    </Container>
  ),
};