import { forwardRef, memo, useCallback, useEffect, useState } from 'react';
import { useChart } from '../../lib/composables/useChart';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from '../../lib/types/components';

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
        ...props
      },
      ref
    ) => {
      const [isFullscreen, setIsFullscreen] = useState(false);
      const [isExporting, setIsExporting] = useState(false);

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

      // Enhanced fullscreen functionality
      const handleFullscreen = useCallback(() => {
        setIsFullscreen(!isFullscreen);
        onFullscreen?.(!isFullscreen);
      }, [isFullscreen, onFullscreen]);

      // Enhanced export functionality
      const handleExport = useCallback(
        async (format: string) => {
          setIsExporting(true);
          try {
            await onExport?.(format);
          } finally {
            setIsExporting(false);
          }
        },
        [onExport]
      );

      // Enhanced refresh functionality
      const handleRefresh = useCallback(() => {
        onRefresh?.();
      }, [onRefresh]);

      // Keyboard navigation support
      useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (!ref || typeof ref === 'function') return;

          const element = ref.current;
          if (!element || !element.contains(document.activeElement)) return;

          switch (event.key) {
            case 'f':
            case 'F':
              if (enableFullscreen && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                handleFullscreen();
              }
              break;
            case 'r':
            case 'R':
              if (enableRefresh && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                handleRefresh();
              }
              break;
            case 'e':
            case 'E':
              if (enableExport && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                handleExport('png');
              }
              break;
          }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [
        enableFullscreen,
        enableRefresh,
        enableExport,
        handleFullscreen,
        handleRefresh,
        handleExport,
        ref,
      ]);

      // Render toolbar if enabled
      const renderToolbar = () => {
        if (!showToolbar) return null;

        return (
          <div className={CHART.TOOLBAR_CLASS}>
            {enableRefresh && (
              <button
                className={CHART.ACTION_CLASS}
                onClick={handleRefresh}
                aria-label="Refresh chart data"
                title="Refresh (Ctrl+R)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
                </svg>
              </button>
            )}

            {enableExport && (
              <div className={CHART.EXPORT_GROUP_CLASS}>
                <button
                  className={CHART.ACTION_CLASS}
                  onClick={() => handleExport('png')}
                  disabled={isExporting}
                  aria-label="Export chart as PNG"
                  title="Export as PNG (Ctrl+E)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </button>

                {exportFormats.length > 1 && (
                  <div className={CHART.EXPORT_DROPDOWN_CLASS}>
                    {exportFormats.map(format => (
                      <button
                        key={format}
                        className={CHART.EXPORT_OPTION_CLASS}
                        onClick={() => handleExport(format)}
                        disabled={isExporting}
                      >
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {enableFullscreen && (
              <button
                className={CHART.ACTION_CLASS}
                onClick={handleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                title={`${isFullscreen ? 'Exit' : 'Enter'} fullscreen (Ctrl+F)`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  {isFullscreen ? (
                    <path d="M5,16H8V19H10V14H5M14,19H16V16H19V14H14M16,8V5H14V10H19V8M10,5V8H5V10H10V5Z" />
                  ) : (
                    <path d="M10,16V19H8V21H16V19H14V16M16,8V5H14V3H8V5H10V8M19,11V16H21V8H19V11M5,11V8H3V16H5V11Z" />
                  )}
                </svg>
              </button>
            )}
          </div>
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
            <div className={CHART.HEADER_CLASS}>
              <div className={CHART.HEADER_CONTENT_CLASS}>
                {title && <h3 className={CHART.TITLE_CLASS}>{title}</h3>}
                {subtitle && <p className={CHART.SUBTITLE_CLASS}>{subtitle}</p>}
              </div>
              {renderToolbar()}
            </div>
          )}

          <div className={CHART.CONTENT_CLASS}>
            {loading && (
              <div className={CHART.LOADING_CLASS}>
                <div className={CHART.LOADING_SPINNER_CLASS}></div>
                <span className={CHART.LOADING_TEXT_CLASS}>
                  {isExporting ? 'Exporting chart...' : 'Loading chart...'}
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
