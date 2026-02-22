import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useChart } from '../../lib/composables/useChart';
import { useChartToolbar } from '../../lib/composables/useChartToolbar';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from './types';
import ChartToolbar from './ChartToolbar';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import type { AtomixGlassProps } from '../../lib/types/components';

// Create a context to share chart state between Chart and its children
import { createContext, useContext } from 'react';

interface ChartContextValue {
  zoomLevel: number;
  panOffset: { x: number; y: number };
  panEnabled: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onPanToggle: (enabled: boolean) => void;
  onReset: () => void;
  setZoomLevel: (level: number) => void;
  setPanOffset: (offset: { x: number; y: number }) => void;
  setPanEnabled: (enabled: boolean) => void;
  toolbarState: {
    showTooltips?: boolean;
    showLegend?: boolean;
    animationsEnabled?: boolean;
    showGrid?: boolean;
  };
}

export const ChartContext = createContext<ChartContextValue | null>(null);

export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChartContext must be used within a Chart component');
  }
  return context;
};

const Chart = memo(
  forwardRef<HTMLDivElement, ChartProps>(
    (
      {
        children,
        type = 'line',
        size = 'md',
        variant = 'primary',
        title,
        subtitle,
        loading = false,
        error,
        className = '',
        'aria-label': ariaLabel,
        onFullscreen,
        onExport,
        onRefresh,
        showToolbar = false,
        enableFullscreen = false,
        enableExport = false,
        enableRefresh = false,
        exportFormats = ['png', 'svg', 'csv'],
        datasets,
        config,
        // Destructure non-DOM props to prevent passing to DOM element
        toolbarConfig,
        customToolbarActions,
        customToolbarGroups,
        data,
        showLegend,
        interactive,
        fullscreen,
        onDataPointClick,
        onLegendItemClick,
        glass,
        ...props
      },
      ref
    ) => {
      const [isFullscreen, setIsFullscreen] = useState(false);
      const [isExporting, setIsExporting] = useState(false);
      const chartContainerRef = useRef<HTMLDivElement>(null);

      // Internal zoom and pan state
      const [zoomLevel, setZoomLevel] = useState(1);
      const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
      const [panEnabled, setPanEnabled] = useState(false);

      // Memoize fullscreen handler
      const handleFullscreenChange = useCallback(
        (fullscreen: boolean) => {
          setIsFullscreen(fullscreen);
          onFullscreen?.(fullscreen);
        },
        [onFullscreen]
      );

      // Zoom and pan handlers
      const handleZoomIn = useCallback(() => {
        setZoomLevel(prev => Math.min(prev * 1.2, 5));
      }, []);

      const handleZoomOut = useCallback(() => {
        setZoomLevel(prev => Math.max(prev / 1.2, 0.2));
      }, []);

      const handleZoomReset = useCallback(() => {
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
      }, []);

      const handlePanToggle = useCallback((enabled: boolean) => {
        setPanEnabled(enabled);
      }, []);

      const handleReset = useCallback(() => {
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
        setPanEnabled(false);
      }, []);

      // Memoize toolbar handlers object to prevent unnecessary re-renders
      const toolbarHandlersConfig = useMemo(
        () => ({
          onRefresh,
          onExport,
          onFullscreen: handleFullscreenChange,
          onZoomIn: handleZoomIn,
          onZoomOut: handleZoomOut,
          onZoomReset: handleZoomReset,
          onPanToggle: handlePanToggle,
          onReset: handleReset,
        }),
        [
          onRefresh,
          onExport,
          handleFullscreenChange,
          handleZoomIn,
          handleZoomOut,
          handleZoomReset,
          handlePanToggle,
          handleReset,
        ]
      );

      // Enhanced toolbar with dynamic configuration
      const {
        state: toolbarState,
        handlers: toolbarHandlers,
        toolbarGroups,
      } = useChartToolbar(
        type,
        {
          enableDefaults: showToolbar,
          defaults: {
            refresh: enableRefresh,
            export: enableExport,
            fullscreen: enableFullscreen,
            // Let useChartToolbar determine zoom/pan/reset based on chart type
            grid: true, // Enable grid toggle by default
            legend: true, // Enable legend toggle by default
            tooltips: true, // Enable tooltips toggle by default
            animations: true, // Enable animations toggle by default
            settings: true, // Enable settings by default
          },
          exportFormats,
        },
        toolbarHandlersConfig
      );

      const chartResult = useChart({
        type,
        size,
        variant,
        loading,
        error,
      });

      // Sync toolbar state with internal state
      useEffect(() => {
        setZoomLevel(toolbarState.zoomLevel);
      }, [toolbarState.zoomLevel]);

      useEffect(() => {
        setPanEnabled(toolbarState.panEnabled);
      }, [toolbarState.panEnabled]);

      // Update toolbar state when internal state changes (for two-way binding)
      useEffect(() => {
        if (toolbarState.zoomLevel !== zoomLevel) {
          // Toolbar state is already managed by useChartToolbar
        }
      }, [zoomLevel, toolbarState.zoomLevel]);

      const chartClass = generateChartClass({
        type,
        size,
        variant,
        loading,
        error,
        className,
        interactive,
        panEnabled,
      });

      // Sync all toolbar state with component state
      useEffect(() => {
        setIsFullscreen(toolbarState.isFullscreen);
        setIsExporting(toolbarState.isExporting);
      }, [toolbarState.isFullscreen, toolbarState.isExporting]);

      // Render enhanced toolbar
      const renderToolbar = () => {
        if (!showToolbar) return null;

        // Only pass individual handlers if groups are not provided
        const shouldPassIndividualHandlers = !toolbarGroups || toolbarGroups.length === 0;

        return (
          <ChartToolbar
            chartType={type}
            groups={toolbarGroups}
            defaults={{
              refresh: enableRefresh,
              export: enableExport,
              fullscreen: enableFullscreen,
              zoom: toolbarState.zoomLevel !== undefined,
              pan: toolbarState.panEnabled !== undefined,
              reset: true,
              grid: true,
              legend: true,
              tooltips: true,
              animations: true,
              settings: true,
            }}
            exportFormats={exportFormats}
            state={{
              isFullscreen: toolbarState.isFullscreen,
              isExporting: toolbarState.isExporting,
              isRefreshing: toolbarState.isRefreshing,
              zoomLevel: zoomLevel, // Use internal state for accurate display
              panEnabled: panEnabled, // Use internal state for accurate display
              showGrid: toolbarState.showGrid,
              showLegend: toolbarState.showLegend,
              showTooltips: toolbarState.showTooltips,
              animationsEnabled: toolbarState.animationsEnabled,
            }}
            {...(shouldPassIndividualHandlers
              ? {
                  onRefresh: toolbarHandlers.onRefresh,
                  onExport: toolbarHandlers.onExport,
                  onFullscreen: toolbarHandlers.onFullscreen,
                  onZoomIn: handleZoomIn,
                  onZoomOut: handleZoomOut,
                  onZoomReset: handleZoomReset,
                  onPanToggle: handlePanToggle,
                  onReset: handleReset,
                  onSettings: toolbarHandlers.onSettings,
                  onGridToggle: toolbarHandlers.onGridToggle,
                  onLegendToggle: toolbarHandlers.onLegendToggle,
                  onTooltipsToggle: toolbarHandlers.onTooltipsToggle,
                  onAnimationsToggle: toolbarHandlers.onAnimationsToggle,
                }
              : {})}
          />
        );
      };

      const fullChartClass = `${chartClass}${isFullscreen ? ` ${CHART.CLASSES.FULLSCREEN}` : ''}${glass ? ` c-chart--glass` : ''}`;

      // Default glass settings optimized for charts
      const defaultChartGlassProps: Partial<AtomixGlassProps> = useMemo(
        () => ({
          displacementScale: 25,
          blurAmount: 0, // Charts need clarity, no blur
          saturation: 180,
          aberrationIntensity: 1.5,
          elasticity: 0, // No elastic effect for charts
          enableLiquidBlur: false, // Keep it simple
          enableBorderEffect: true,
          mode: 'standard' as const,
          mouseContainer: chartContainerRef,
          reducedMotion: false,
        }),
        []
      );

      // Determine glass props
      const glassProps = useMemo(() => {
        if (!glass) return null;
        if (glass === true) {
          return defaultChartGlassProps;
        }
        return { ...defaultChartGlassProps, ...glass };
      }, [glass, defaultChartGlassProps]);

      // Extract border-radius from chart styles (use design token)
      const chartBorderRadius = useMemo(() => {
        // Use chart border-radius design token (typically 12px from $border-radius-lg)
        // AtomixGlass will extract from children if not provided
        return glassProps?.cornerRadius || undefined;
      }, [glassProps?.cornerRadius]);

      // Create context value
      const chartContextValue = useMemo<ChartContextValue>(
        () => ({
          zoomLevel,
          panOffset,
          panEnabled,
          onZoomIn: handleZoomIn,
          onZoomOut: handleZoomOut,
          onZoomReset: handleZoomReset,
          onPanToggle: handlePanToggle,
          onReset: handleReset,
          setZoomLevel,
          setPanOffset,
          setPanEnabled,
          toolbarState: {
            showTooltips: toolbarState.showTooltips,
            showLegend: toolbarState.showLegend,
            animationsEnabled: toolbarState.animationsEnabled,
            showGrid: toolbarState.showGrid,
          },
        }),
        [
          zoomLevel,
          panOffset,
          panEnabled,
          handleZoomIn,
          handleZoomOut,
          handleZoomReset,
          handlePanToggle,
          handleReset,
          setPanEnabled,
          toolbarState.showTooltips,
          toolbarState.showLegend,
          toolbarState.animationsEnabled,
          toolbarState.showGrid,
        ]
      );

      // Chart content component
      const chartContent = (
        <div
          ref={chartContainerRef}
          className={fullChartClass}
          aria-label={ariaLabel || `${type} chart`}
          role="img"
          tabIndex={0}
          {...props}
        >
          {(title || subtitle || showToolbar) && (
            <div className={`${CHART.HEADER_CLASS} u-flex u-justify-between u-items-start u-gap-4`}>
              <div className={`${CHART.HEADER_CONTENT_CLASS} u-flex-1`}>
                {title && <h3 className={`${CHART.TITLE_CLASS} u-mb-1`}>{title}</h3>}
                {subtitle && <p className={`${CHART.SUBTITLE_CLASS} u-mb-0`}>{subtitle}</p>}
              </div>
              {renderToolbar()}
            </div>
          )}

          <div className={CHART.CONTENT_CLASS}>
            {loading && (
              <div className={CHART.LOADING_CLASS}>
                <div className={CHART.LOADING_SPINNER_CLASS}></div>
                <span className={CHART.LOADING_TEXT_CLASS}>
                  {toolbarState.isExporting
                    ? 'Exporting chart...'
                    : toolbarState.isRefreshing
                      ? 'Refreshing chart...'
                      : 'Loading chart...'}
                </span>
              </div>
            )}

            {error && (
              <div className={CHART.ERROR_CLASS}>
                <div className={CHART.ERROR_ICON_CLASS}>⚠</div>
                <div className={CHART.ERROR_CONTENT_CLASS}>
                  <div className={CHART.ERROR_MESSAGE_CLASS}>Chart Error</div>
                  <div className={CHART.ERROR_DETAILS_CLASS}>{error}</div>
                </div>
              </div>
            )}

            {!loading && !error && !children && (
              <div className={CHART.EMPTY_CLASS}>
                <div className={CHART.EMPTY_ICON_CLASS}>📊</div>
                <div className={CHART.EMPTY_MESSAGE_CLASS}>No data available</div>
                <div className={CHART.EMPTY_DETAILS_CLASS}>
                  Add data to your chart to see visualizations
                </div>
              </div>
            )}

            {!loading && !error && children && <div className={CHART.CANVAS_CLASS}>{children}</div>}
          </div>
        </div>
      );

      // Wrap with AtomixGlass if glass is enabled
      const wrappedChart = glassProps ? (
        <AtomixGlass
          {...glassProps}
          cornerRadius={chartBorderRadius}
          style={{
            width: '100%',
            height: '100%',
            ...glassProps.style,
          }}
        >
          {chartContent}
        </AtomixGlass>
      ) : (
        chartContent
      );

      return (
        <ChartContext.Provider value={chartContextValue}>
          <div ref={ref} style={{ width: '100%', height: '100%' }}>
            {wrappedChart}
          </div>
        </ChartContext.Provider>
      );
    }
  )
);

// Helper function to generate chart class names
const generateChartClass = ({
  type,
  size,
  variant,
  loading,
  error,
  className,
  interactive,
  panEnabled,
}: {
  type: ChartProps['type'];
  size: ChartProps['size'];
  variant: ChartProps['variant'];
  loading: ChartProps['loading'];
  error: ChartProps['error'];
  className: string;
  interactive?: boolean;
  panEnabled?: boolean;
}) => {
  const classes = [CHART.ROOT_CLASS];

  // Add type class
  if (type) {
    const typeKey = type.toUpperCase() as keyof typeof CHART.CLASSES;
    const typeClass = CHART.CLASSES[typeKey] || `${CHART.TYPE_PREFIX}${type}`;
    classes.push(typeClass);
  }

  // Add size class
  if (size) {
    const sizeKey = size.toUpperCase() as keyof typeof CHART.CLASSES;
    const sizeClass = CHART.CLASSES[sizeKey] || `${CHART.SIZE_PREFIX}${size}`;
    classes.push(sizeClass);
  }

  // Add variant class
  if (variant) {
    const variantKey = variant.toUpperCase() as keyof typeof CHART.CLASSES;
    const variantClass = CHART.CLASSES[variantKey] || `${CHART.VARIANT_PREFIX}${variant}`;
    classes.push(variantClass);
  }

  // Add interactive class
  if (interactive || panEnabled) {
    classes.push(CHART.CLASSES.INTERACTIVE);
  }

  // Add state classes
  if (loading) {
    classes.push(CHART.LOADING_STATE_CLASS);
  }
  if (error) {
    classes.push(CHART.ERROR_STATE_CLASS);
  }

  // Add custom className
  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

Chart.displayName = 'Chart';
export default Chart;
export type { ChartProps };
