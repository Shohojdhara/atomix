import { forwardRef, memo, useCallback, useState } from 'react';
import { CHART } from '../../lib/constants/components';
import { Icon } from '../Icon';
import type { PhosphorIconsType } from '../Icon/Icon';
import { ChartType } from './types';

export interface ChartToolbarAction {
  id: string;
  label: string;
  icon: PhosphorIconsType;
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
    grid?: boolean;
    legend?: boolean;
    tooltips?: boolean;
    animations?: boolean;
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

      // Compute effective defaults based on provided groups
      const effectiveDefaults =
        groups && groups.length > 0
          ? {
              refresh: defaults.refresh ?? true,
              export: defaults.export ?? true,
              fullscreen: defaults.fullscreen ?? true,
              settings: defaults.settings ?? true,
              zoom: groups.some(group =>
                group.actions.some(action => action.id === 'zoom-in' || action.id === 'zoom-out')
              ),
              pan: groups.some(group => group.actions.some(action => action.id === 'pan')),
              reset: groups.some(group => group.actions.some(action => action.id === 'reset')),
              grid: defaults.grid ?? true,
              legend: defaults.legend ?? true,
              tooltips: defaults.tooltips ?? true,
              animations: defaults.animations ?? true,
            }
          : defaults;

      // Generate chart-specific default actions
      const getDefaultActions = useCallback((): ChartToolbarGroup[] => {
        const actions: ChartToolbarAction[] = [];

        // Refresh action
        if (effectiveDefaults.refresh && onRefresh) {
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
        if (effectiveDefaults.export && onExport) {
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
      }, [effectiveDefaults, onRefresh, onExport, state, showExportMenu]);

      // Generate chart-specific view actions
      const getViewActions = useCallback((): ChartToolbarGroup[] => {
        const actions: ChartToolbarAction[] = [];

        // Zoom actions (use configuration from props)
        if (effectiveDefaults.zoom && (onZoomIn || onZoomOut)) {
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

        // Pan toggle (use configuration from props)
        if (effectiveDefaults.pan && onPanToggle) {
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

        // Reset view (use configuration from props)
        if (effectiveDefaults.reset && (onZoomReset || onReset)) {
          actions.push({
            id: 'reset',
            label: 'Reset View',
            icon: 'ArrowCounterClockwise',
            onClick: () => {
              onZoomReset?.();
              onReset?.();
            },
            tooltip: 'Reset view (R)',
            shortcut: 'R',
          });
        }

        // Fullscreen (for all chart types that support it)
        if (effectiveDefaults.fullscreen && onFullscreen) {
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

        return actions.length > 0
          ? [
              {
                id: 'view-actions',
                label: 'View',
                actions,
                separator: true,
              },
            ]
          : [];
      }, [
        effectiveDefaults,
        onZoomIn,
        onZoomOut,
        onPanToggle,
        onZoomReset,
        onReset,
        onFullscreen,
        state,
      ]);

      // Generate chart-specific tool actions
      const getToolActions = useCallback((): ChartToolbarGroup[] => {
        const actions: ChartToolbarAction[] = [];

        // Settings
        if (effectiveDefaults.settings && onSettings) {
          actions.push({
            id: 'settings',
            label: 'Settings',
            icon: 'Gear',
            onClick: () => setShowSettingsMenu(!showSettingsMenu),
            tooltip: 'Chart settings',
          });
        }

        return actions.length > 0
          ? [
              {
                id: 'tool-actions',
                label: 'Tools',
                actions,
              },
            ]
          : [];
      }, [effectiveDefaults, onSettings, showSettingsMenu]);

      // Use provided groups if available, otherwise generate defaults
      const allGroups =
        groups && groups.length > 0
          ? groups
          : enableDefaults
            ? [...getDefaultActions(), ...getViewActions(), ...getToolActions()]
            : [];

      // Render action button
      const renderAction = (action: ChartToolbarAction) => {
        // Use the action's onClick handler if available
        const handleClick = () => {
          if (action.onClick) {
            action.onClick();
          } else {
            // Fallback for special cases that need custom handling
            if (action.id === 'export' && onExport) {
              setShowExportMenu(!showExportMenu);
            } else if (action.id === 'settings' && onSettings) {
              setShowSettingsMenu(!showSettingsMenu);
            } else {
              // Try to find the appropriate individual handler
              switch (action.id) {
                case 'zoom-in':
                  onZoomIn?.();
                  break;
                case 'zoom-out':
                  onZoomOut?.();
                  break;
                case 'pan':
                  onPanToggle?.(!state.panEnabled);
                  break;
                case 'reset':
                  onZoomReset?.();
                  onReset?.();
                  break;
                case 'fullscreen':
                  onFullscreen?.(!state.isFullscreen);
                  break;
                case 'refresh':
                  onRefresh?.();
                  break;
                default:
                  console.warn(`No handler found for action: ${String(action.id).replace(/[\r\n\t]/g, '')}`);
              }
            }
          }
        };

        return (
          <button
            key={action.id}
            className={`${CHART.ACTION_CLASS} ${action.variant ? `${CHART.ACTION_CLASS}--${action.variant}` : ''} ${action.active ? 'is-active' : ''}`}
            onClick={handleClick}
            disabled={action.disabled}
            title={action.tooltip}
            type="button"
            aria-label={action.label}
          >
            <Icon name={action.icon} size="sm" />
            {size === 'lg' && <span className={`${CHART.ACTION_CLASS}-label`}>{action.label}</span>}
          </button>
        );
      };

      // Render export menu
      const renderExportMenu = () => {
        if (!showExportMenu || !onExport) return null;

        return (
          <div className={`${CHART.EXPORT_DROPDOWN_CLASS}`}>
            <div className={`${CHART.EXPORT_DROPDOWN_CLASS}-title`}>Export Formats</div>
            {exportFormats.map(format => (
              <button
                key={format}
                className={`${CHART.EXPORT_OPTION_CLASS}`}
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
          <div className={`${CHART.SETTINGS_MENU_CLASS}`}>
            <div className={`${CHART.SETTINGS_MENU_CLASS}-title`}>Chart Settings</div>
            <div className={`${CHART.SETTINGS_MENU_CLASS}-content`}>
              {state.zoomLevel && (
                <div className={`${CHART.SETTINGS_MENU_CLASS}-item`}>
                  <span className={`${CHART.SETTINGS_MENU_CLASS}-label`}>Zoom Level</span>
                  <span className={`${CHART.SETTINGS_MENU_CLASS}-value`}>
                    {Math.round((state.zoomLevel || 1) * 100)}%
                  </span>
                </div>
              )}
              <div className={`${CHART.SETTINGS_MENU_CLASS}-item`}>
                <span className={`${CHART.SETTINGS_MENU_CLASS}-label`}>Chart Type</span>
                <span className={`${CHART.SETTINGS_MENU_CLASS}-value`}>{chartType}</span>
              </div>
            </div>
          </div>
        );
      };

      const toolbarClass =
        `${CHART.TOOLBAR_CLASS} ${CHART.TOOLBAR_CLASS}--${size} ${CHART.TOOLBAR_CLASS}--${position} ${className}`.trim();

      return (
        <div ref={ref} className={toolbarClass} {...props}>
          {allGroups.map((group, groupIndex) => (
            <div key={group.id} className={`${CHART.TOOLBAR_CLASS}-group`}>
              {group.separator && groupIndex > 0 && (
                <div className={`${CHART.TOOLBAR_CLASS}-separator`} />
              )}

              {group.label && size === 'lg' && (
                <span className={`${CHART.TOOLBAR_CLASS}-group-label`}>{group.label}</span>
              )}

              <div className={`${CHART.TOOLBAR_CLASS}-actions`}>
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
