import { forwardRef, memo, useCallback, useState } from 'react';
import { CHART } from '../../lib/constants/components';
import { Icon } from '../Icon';
import { ChartType } from './types';

export interface ChartToolbarAction {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
  tooltip?: string;
  shortcut?: string;
}

export interface ChartToolbarGroup {
  id: string;
  label?: string;
  actions: ChartToolbarAction[];
  separator?: boolean;
}

export interface ChartToolbarProps {
  /**
   * Chart type for context-specific tools
   */
  chartType?: ChartType;

  /**
   * Custom toolbar groups
   */
  groups?: ChartToolbarGroup[];

  /**
   * Enable default toolbar actions
   */
  enableDefaults?: boolean;

  /**
   * Default actions configuration
   */
  defaults?: {
    refresh?: boolean;
    export?: boolean;
    fullscreen?: boolean;
    settings?: boolean;
    zoom?: boolean;
    pan?: boolean;
    reset?: boolean;
  };

  /**
   * Export formats available
   */
  exportFormats?: ('png' | 'svg' | 'csv' | 'json' | 'pdf')[];

  /**
   * Toolbar size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Toolbar position
   */
  position?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Event handlers
   */
  onRefresh?: () => void;
  onExport?: (format: string) => Promise<void> | void;
  onFullscreen?: (isFullscreen: boolean) => void;
  onSettings?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
  onPanToggle?: (enabled: boolean) => void;
  onReset?: () => void;
  onGridToggle?: (show: boolean) => void;
  onLegendToggle?: (show: boolean) => void;
  onTooltipsToggle?: (show: boolean) => void;
  onAnimationsToggle?: (enabled: boolean) => void;

  /**
   * Current state
   */
  state?: {
    isFullscreen?: boolean;
    isExporting?: boolean;
    isRefreshing?: boolean;
    zoomLevel?: number;
    panEnabled?: boolean;
    showGrid?: boolean;
    showLegend?: boolean;
    showTooltips?: boolean;
    animationsEnabled?: boolean;
  };

  /**
   * Additional CSS classes
   */
  className?: string;
}

const ChartToolbar = memo(
  forwardRef<HTMLDivElement, ChartToolbarProps>(
    (
      {
        chartType = 'line',
        groups = [],
        enableDefaults = true,
        defaults = {
          refresh: true,
          export: true,
          fullscreen: true,
          settings: true,
          zoom: true,
          pan: true,
          reset: true,
        },
        exportFormats = ['png', 'svg', 'csv'],
        size = 'md',
        position = 'top',
        onRefresh,
        onExport,
        onFullscreen,
        onSettings,
        onZoomIn,
        onZoomOut,
        onZoomReset,
        onPanToggle,
        onReset,
        onGridToggle,
        onLegendToggle,
        onTooltipsToggle,
        onAnimationsToggle,
        state = {},
        className = '',
        ...props
      },
      ref
    ) => {
      const [showExportMenu, setShowExportMenu] = useState(false);
      const [showSettingsMenu, setShowSettingsMenu] = useState(false);

      // Generate chart-specific default actions
      const getDefaultActions = useCallback((): ChartToolbarGroup[] => {
        const actions: ChartToolbarAction[] = [];

        // Refresh action
        if (defaults.refresh && onRefresh) {
          actions.push({
            id: 'refresh',
            label: 'Refresh',
            icon: 'ArrowClockwise',
            onClick: onRefresh,
            disabled: state.isRefreshing,
            tooltip: 'Refresh chart data (Ctrl+R)',
            shortcut: 'Ctrl+R',
          });
        }

        // Export actions
        if (defaults.export && onExport) {
          actions.push({
            id: 'export',
            label: 'Export',
            icon: 'Download',
            onClick: () => setShowExportMenu(!showExportMenu),
            disabled: state.isExporting,
            variant: 'primary',
            tooltip: 'Export chart (Ctrl+E)',
            shortcut: 'Ctrl+E',
          });
        }

        return [
          {
            id: 'data-actions',
            label: 'Data',
            actions,
            separator: true,
          },
        ];
      }, [defaults, onRefresh, onExport, state, showExportMenu]);

      // Generate chart-specific view actions
      const getViewActions = useCallback((): ChartToolbarGroup[] => {
        const actions: ChartToolbarAction[] = [];

        // Zoom actions (for interactive charts)
        if (defaults.zoom && (chartType === 'interactive' || chartType === 'line' || chartType === 'area' || chartType === 'bar')) {
          actions.push(
            {
              id: 'zoom-in',
              label: 'Zoom In',
              icon: 'MagnifyingGlassPlus',
              onClick: () => onZoomIn?.(),
              tooltip: 'Zoom in (+)',
              shortcut: '+',
            },
            {
              id: 'zoom-out',
              label: 'Zoom Out',
              icon: 'MagnifyingGlassMinus',
              onClick: () => onZoomOut?.(),
              tooltip: 'Zoom out (-)',
              shortcut: '-',
            }
          );
        }

        // Pan toggle (for interactive charts)
        if (defaults.pan && (chartType === 'interactive' || chartType === 'line' || chartType === 'area')) {
          actions.push({
            id: 'pan',
            label: 'Pan',
            icon: 'ArrowsOutCardinal',
            onClick: () => onPanToggle?.(!state.panEnabled),
            active: state.panEnabled,
            tooltip: 'Toggle pan mode (Space)',
            shortcut: 'Space',
          });
        }

        // Reset view
        if (defaults.reset && (onZoomReset || onReset)) {
          actions.push({
            id: 'reset',
            label: 'Reset View',
            icon: 'ArrowCounterClockwise',
            onClick: () => onZoomReset?.() || onReset?.(),
            tooltip: 'Reset view (R)',
            shortcut: 'R',
          });
        }

        // Fullscreen
        if (defaults.fullscreen && onFullscreen) {
          actions.push({
            id: 'fullscreen',
            label: state.isFullscreen ? 'Exit Fullscreen' : 'Fullscreen',
            icon: state.isFullscreen ? 'ArrowsIn' : 'ArrowsOut',
            onClick: () => onFullscreen?.(!state.isFullscreen),
            variant: 'success',
            tooltip: `${state.isFullscreen ? 'Exit' : 'Enter'} fullscreen (F11)`,
            shortcut: 'F11',
          });
        }

        return actions.length > 0 ? [
          {
            id: 'view-actions',
            label: 'View',
            actions,
            separator: true,
          },
        ] : [];
      }, [defaults, chartType, onZoomIn, onZoomOut, onPanToggle, onZoomReset, onReset, onFullscreen, state]);

      // Generate chart-specific tool actions
      const getToolActions = useCallback((): ChartToolbarGroup[] => {
        const actions: ChartToolbarAction[] = [];

        // Settings
        if (defaults.settings && onSettings) {
          actions.push({
            id: 'settings',
            label: 'Settings',
            icon: 'Gear',
            onClick: () => setShowSettingsMenu(!showSettingsMenu),
            tooltip: 'Chart settings',
          });
        }

        return actions.length > 0 ? [
          {
            id: 'tool-actions',
            label: 'Tools',
            actions,
          },
        ] : [];
      }, [defaults, onSettings, showSettingsMenu]);

      // Always use provided groups if available, otherwise generate defaults
      const allGroups = groups && groups.length > 0 ? groups : [
        ...(enableDefaults ? getDefaultActions() : []),
        ...(enableDefaults ? getViewActions() : []),
        ...(enableDefaults ? getToolActions() : []),
      ];
      
      console.log('ChartToolbar: All groups', allGroups);
      console.log('ChartToolbar: Groups provided', groups);
      console.log('ChartToolbar: Enable defaults', enableDefaults);

      // Render action button
      const renderAction = (action: ChartToolbarAction) => {
        console.log('ChartToolbar: Rendering action', action.id, action);
        return (
          <button
            key={action.id}
            className={`${CHART.ACTION_CLASS} ${action.variant ? `${CHART.ACTION_CLASS}--${action.variant}` : ''} ${action.active ? 'is-active' : ''} u-d-inline-flex u-align-items-center u-gap-1`}
            onClick={() => {
              console.log('ChartToolbar: Action clicked', action.id);
              action.onClick();
            }}
            disabled={action.disabled}
            title={action.tooltip}
            type="button"
            aria-label={action.label}
          >
            <Icon name={action.icon} size="sm" />
            {size === 'lg' && <span className="u-text-xs">{action.label}</span>}
          </button>
        );
      };

      // Render export menu
      const renderExportMenu = () => {
        if (!showExportMenu || !onExport) return null;

        return (
          <div className={`${CHART.EXPORT_DROPDOWN_CLASS} u-position-absolute u-bg-white u-border u-border-radius u-shadow u-p-2 u-z-10`}>
            <div className="u-mb-2 u-text-xs u-text-muted u-fw-medium">Export Formats</div>
            {exportFormats.map(format => (
              <button
                key={format}
                className={`${CHART.EXPORT_OPTION_CLASS} u-d-block u-w-full u-text-start u-p-1 u-border-0 u-bg-transparent u-text-decoration-none u-border-radius-sm`}
                onClick={() => {
                  onExport(format);
                  setShowExportMenu(false);
                }}
                disabled={state.isExporting}
                type="button"
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        );
      };

      // Render settings menu
      const renderSettingsMenu = () => {
        if (!showSettingsMenu) return null;

        return (
          <div className="u-position-absolute u-bg-white u-border u-border-radius u-shadow u-p-3 u-z-10" style={{ minWidth: '200px' }}>
            <div className="u-mb-2 u-text-xs u-text-muted u-fw-medium">Chart Settings</div>
            <div className="u-d-flex u-flex-column u-gap-2">
              {state.zoomLevel && (
                <div className="u-d-flex u-justify-between u-align-items-center">
                  <span className="u-text-sm">Zoom Level</span>
                  <span className="u-text-sm u-text-muted">{Math.round((state.zoomLevel || 1) * 100)}%</span>
                </div>
              )}
              <div className="u-d-flex u-justify-between u-align-items-center">
                <span className="u-text-sm">Chart Type</span>
                <span className="u-text-sm u-text-muted u-text-capitalize">{chartType}</span>
              </div>
            </div>
          </div>
        );
      };

      const toolbarClass = `${CHART.TOOLBAR_CLASS} ${CHART.TOOLBAR_CLASS}--${size} ${CHART.TOOLBAR_CLASS}--${position} u-d-flex u-align-items-center u-gap-2 ${className}`.trim();

      return (
        <div ref={ref} className={toolbarClass} {...props}>
          {allGroups.map((group, groupIndex) => (
            <div key={group.id} className="u-d-flex u-align-items-center u-gap-1">
              {group.separator && groupIndex > 0 && (
                <div className="u-border-start u-h-4 u-mx-1 u-opacity-25" />
              )}
              
              {group.label && size === 'lg' && (
                <span className="u-text-xs u-text-muted u-me-1">{group.label}</span>
              )}
              
              <div className="u-d-flex u-align-items-center u-gap-1 u-position-relative">
                {group.actions.map(renderAction)}
                
                {/* Render contextual menus */}
                {group.actions.some(a => a.id === 'export') && renderExportMenu()}
                {group.actions.some(a => a.id === 'settings') && renderSettingsMenu()}
              </div>
            </div>
          ))}
        </div>
      );
    }
  )
);

ChartToolbar.displayName = 'ChartToolbar';
export default ChartToolbar;
export type { ChartToolbarProps, ChartToolbarAction, ChartToolbarGroup };