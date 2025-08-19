import { forwardRef, memo, useCallback, useEffect, useState } from 'react';
import { useChart } from '../../lib/composables/useChart';
import { useChartToolbar } from '../../lib/composables/useChartToolbar';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from '../../lib/types/components';
import ChartToolbar from './ChartToolbar';

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
        toolbarConfig,
        customToolbarActions,
        customToolbarGroups,
        ...props
      },
      ref
    ) => {
      const [isFullscreen, setIsFullscreen] = useState(false);
      const [isExporting, setIsExporting] = useState(false);

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
            zoom: true, // Enable zoom by default
            pan: true,  // Enable pan by default
            reset: true, // Enable reset by default
            grid: true,  // Enable grid toggle by default
            legend: true, // Enable legend toggle by default
            tooltips: true, // Enable tooltips toggle by default
            animations: true, // Enable animations toggle by default
            settings: true, // Enable settings by default
            ...toolbarConfig?.defaults,
          },
          exportFormats,
          customActions: customToolbarActions,
          customGroups: customToolbarGroups,
          ...toolbarConfig,
        },
        {
          onRefresh,
          onExport,
          onFullscreen: (fullscreen) => {
            setIsFullscreen(fullscreen);
            onFullscreen?.(fullscreen);
          },
        }
      );

      const { generateChartClass, chartAttributes } = useChart({
        type,
        size,
        variant,
        loading,
        error,
      });

      const chartClass = generateChartClass({
        type,
        size,
        variant,
        loading,
        error,
        className,
      });

      // Legacy handlers for backward compatibility
      const handleFullscreen = useCallback(() => {
        toolbarHandlers.onFullscreen(!toolbarState.isFullscreen);
      }, [toolbarHandlers, toolbarState.isFullscreen]);

      const handleExport = useCallback(
        async (format: string) => {
          await toolbarHandlers.onExport(format);
        },
        [toolbarHandlers]
      );

      const handleRefresh = useCallback(() => {
        toolbarHandlers.onRefresh();
      }, [toolbarHandlers]);

      // Sync all toolbar state with component state
      useEffect(() => {
        setIsFullscreen(toolbarState.isFullscreen);
        setIsExporting(toolbarState.isExporting);
      }, [toolbarState.isFullscreen, toolbarState.isExporting]);

      // Render enhanced toolbar
      const renderToolbar = () => {
        if (!showToolbar) return null;
        
        console.log('Chart: Rendering toolbar with groups', toolbarGroups);
        console.log('Chart: Toolbar state', toolbarState);

        return (
          <ChartToolbar
            chartType={type}
            groups={toolbarGroups}
            enableDefaults={toolbarGroups.length === 0}
            exportFormats={exportFormats}
            state={{
              isFullscreen: toolbarState.isFullscreen,
              isExporting: toolbarState.isExporting,
              isRefreshing: toolbarState.isRefreshing,
              zoomLevel: toolbarState.zoomLevel,
              panEnabled: toolbarState.panEnabled,
              showGrid: toolbarState.showGrid,
              showLegend: toolbarState.showLegend,
              showTooltips: toolbarState.showTooltips,
              animationsEnabled: toolbarState.animationsEnabled,
            }}
            onRefresh={toolbarHandlers.onRefresh}
            onExport={toolbarHandlers.onExport}
            onFullscreen={toolbarHandlers.onFullscreen}
            onZoomIn={toolbarHandlers.onZoomIn}
            onZoomOut={toolbarHandlers.onZoomOut}
            onZoomReset={toolbarHandlers.onZoomReset}
            onPanToggle={toolbarHandlers.onPanToggle}
            onReset={toolbarHandlers.onReset}
            onSettings={toolbarHandlers.onSettings}
            onGridToggle={toolbarHandlers.onGridToggle}
            onLegendToggle={toolbarHandlers.onLegendToggle}
            onTooltipsToggle={toolbarHandlers.onTooltipsToggle}
            onAnimationsToggle={toolbarHandlers.onAnimationsToggle}
          />
        );
      };

      const fullChartClass = `${chartClass}${isFullscreen ? ` ${CHART.CLASSES.FULLSCREEN}` : ''}`;

      return (
        <div
          ref={ref}
          className={fullChartClass}
          aria-label={ariaLabel || `${type} chart`}
          role="img"
          tabIndex={0}
          {...chartAttributes}
          {...props}
        >
          {(title || subtitle || showToolbar) && (
            <div className={`${CHART.HEADER_CLASS} u-d-flex u-justify-between u-align-items-start u-gap-4`}>
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
                  {toolbarState.isExporting ? 'Exporting chart...' : toolbarState.isRefreshing ? 'Refreshing chart...' : 'Loading chart...'}
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
    }
  )
);

Chart.displayName = 'Chart';
export default Chart;
export type { ChartProps };
