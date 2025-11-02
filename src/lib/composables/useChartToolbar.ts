import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChartToolbarAction, ChartToolbarGroup } from '../../components/Chart/ChartToolbar';
import { ChartType } from '../../components/Chart/types';

export interface ChartToolbarState {
  isFullscreen: boolean;
  isExporting: boolean;
  isRefreshing: boolean;
  zoomLevel: number;
  panEnabled: boolean;
  showGrid: boolean;
  showLegend: boolean;
  showTooltips: boolean;
  animationsEnabled: boolean;
}

export interface ChartToolbarConfig {
  enableDefaults?: boolean;
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
  exportFormats?: ('png' | 'svg' | 'csv' | 'json' | 'pdf')[];
  customActions?: ChartToolbarAction[];
  customGroups?: ChartToolbarGroup[];
}

export interface ChartToolbarHandlers {
  onRefresh?: () => void;
  onExport?: (format: string) => Promise<void> | void;
  onFullscreen?: (isFullscreen: boolean) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
  onPanToggle?: (enabled: boolean) => void;
  onReset?: () => void;
  onGridToggle?: (show: boolean) => void;
  onLegendToggle?: (show: boolean) => void;
  onTooltipsToggle?: (show: boolean) => void;
  onAnimationsToggle?: (enabled: boolean) => void;
}

/**
 * Hook for managing chart toolbar state and generating chart-specific configurations
 */
export function useChartToolbar(
  chartType: ChartType,
  config: ChartToolbarConfig = {},
  handlers: ChartToolbarHandlers = {}
) {
  const [state, setState] = useState<ChartToolbarState>({
    isFullscreen: false,
    isExporting: false,
    isRefreshing: false,
    zoomLevel: 1,
    panEnabled: false,
    showGrid: true,
    showLegend: true,
    showTooltips: true,
    animationsEnabled: true,
  });

  const {
    enableDefaults = true,
    defaults = {},
    exportFormats = ['png', 'svg', 'csv'],
    customActions = [],
    customGroups = [],
  } = config;

  // Get chart-specific default configuration
  const getChartDefaults = useCallback(() => {
    const baseDefaults = {
      refresh: true,
      export: true,
      fullscreen: true,
      settings: true,
      grid: true,
      legend: true,
      tooltips: true,
      animations: true,
      zoom: false,
      pan: false,
      reset: false,
    };

    // Chart-specific configurations
    switch (chartType) {
      case 'interactive':
      case 'advanced':
        return {
          ...baseDefaults,
          zoom: true,
          pan: true,
          reset: true,
        };

      case 'line':
      case 'area':
      case 'bar':
      case 'horizontal-bar':
      case 'scatter':
      case 'bubble':
      case 'funnel':
      case 'waterfall':
      case 'candlestick':
        return {
          ...baseDefaults,
          zoom: true,
          pan: true,
          reset: true,
        };

      case 'realtime':
        return {
          ...baseDefaults,
          refresh: true,
          export: false, // Real-time data might not be suitable for static export
          animations: false, // Better performance for real-time
        };

      case 'pie':
      case 'donut':
      case 'gauge':
        return {
          ...baseDefaults,
          zoom: false,
          pan: false,
          grid: false,
        };

      default:
        return baseDefaults;
    }
  }, [chartType]);

  // Merge configurations with memoization
  const finalDefaults = useMemo(() => {
    return { ...getChartDefaults(), ...defaults };
  }, [getChartDefaults, defaults]);

  const enhancedHandlers = {
    onRefresh: useCallback(() => {
      setState(prev => ({ ...prev, isRefreshing: true }));
      handlers.onRefresh?.();
      setTimeout(() => {
        setState(prev => ({ ...prev, isRefreshing: false }));
      }, 1000);
    }, [handlers.onRefresh]),

    onExport: useCallback(
      async (format: string) => {
        setState(prev => ({ ...prev, isExporting: true }));
        try {
          await handlers.onExport?.(format);
        } finally {
          setState(prev => ({ ...prev, isExporting: false }));
        }
      },
      [handlers.onExport]
    ),

    onFullscreen: useCallback(
      (isFullscreen: boolean) => {
        setState(prev => ({ ...prev, isFullscreen }));
        handlers.onFullscreen?.(isFullscreen);
      },
      [handlers.onFullscreen]
    ),

    onZoomIn: useCallback(() => {
      setState(prev => ({ ...prev, zoomLevel: Math.min(prev.zoomLevel * 1.2, 5) }));
      handlers.onZoomIn?.();
    }, [handlers.onZoomIn]),

    onZoomOut: useCallback(() => {
      setState(prev => ({ ...prev, zoomLevel: Math.max(prev.zoomLevel / 1.2, 0.2) }));
      handlers.onZoomOut?.();
    }, [handlers.onZoomOut]),

    onZoomReset: useCallback(() => {
      setState(prev => ({ ...prev, zoomLevel: 1 }));
      handlers.onZoomReset?.();
    }, [handlers.onZoomReset]),

    onPanToggle: useCallback(
      (enabled: boolean) => {
        setState(prev => ({ ...prev, panEnabled: enabled }));
        handlers.onPanToggle?.(enabled);
      },
      [handlers.onPanToggle]
    ),

    onReset: useCallback(() => {
      setState(prev => ({
        ...prev,
        zoomLevel: 1,
        panEnabled: false,
      }));
      handlers.onReset?.();
    }, [handlers.onReset]),

    onGridToggle: useCallback(
      (show: boolean) => {
        setState(prev => ({ ...prev, showGrid: show }));
        handlers.onGridToggle?.(show);
      },
      [handlers.onGridToggle]
    ),

    onLegendToggle: useCallback(
      (show: boolean) => {
        setState(prev => ({ ...prev, showLegend: show }));
        handlers.onLegendToggle?.(show);
      },
      [handlers.onLegendToggle]
    ),

    onTooltipsToggle: useCallback(
      (show: boolean) => {
        setState(prev => ({ ...prev, showTooltips: show }));
        handlers.onTooltipsToggle?.(show);
      },
      [handlers.onTooltipsToggle]
    ),

    onAnimationsToggle: useCallback(
      (enabled: boolean) => {
        setState(prev => ({ ...prev, animationsEnabled: enabled }));
        handlers.onAnimationsToggle?.(enabled);
      },
      [handlers.onAnimationsToggle]
    ),

    onSettings: useCallback(() => {}, []),
  };

  // Generate chart-specific toolbar groups
  const generateToolbarGroups = useCallback((): ChartToolbarGroup[] => {
    const groups: ChartToolbarGroup[] = [];

    // Data actions group
    const dataActions: ChartToolbarAction[] = [];

    if (finalDefaults.refresh) {
      dataActions.push({
        id: 'refresh',
        label: 'Refresh',
        icon: 'ArrowClockwise',
        onClick: enhancedHandlers.onRefresh,
        disabled: state.isRefreshing,
        tooltip: 'Refresh chart data',
      });
    }

    if (finalDefaults.export) {
      dataActions.push({
        id: 'export',
        label: 'Export',
        icon: 'Download',
        onClick: () => enhancedHandlers.onExport('png'),
        disabled: state.isExporting,
        variant: 'primary',
        tooltip: 'Export chart',
      });
    }

    if (dataActions.length > 0) {
      groups.push({
        id: 'data-actions',
        label: 'Data',
        actions: dataActions,
        separator: true,
      });
    }

    // View actions group
    const viewActions: ChartToolbarAction[] = [];

    if (finalDefaults.zoom) {
      viewActions.push(
        {
          id: 'zoom-in',
          label: 'Zoom In',
          icon: 'MagnifyingGlassPlus',
          onClick: enhancedHandlers.onZoomIn,
          tooltip: 'Zoom in',
        },
        {
          id: 'zoom-out',
          label: 'Zoom Out',
          icon: 'MagnifyingGlassMinus',
          onClick: enhancedHandlers.onZoomOut,
          tooltip: 'Zoom out',
        }
      );
    }

    if (finalDefaults.pan) {
      viewActions.push({
        id: 'pan',
        label: 'Pan',
        icon: 'ArrowsOutCardinal',
        onClick: () => enhancedHandlers.onPanToggle(!state.panEnabled),
        active: state.panEnabled,
        tooltip: 'Toggle pan mode',
      });
    }

    if (finalDefaults.reset) {
      viewActions.push({
        id: 'reset',
        label: 'Reset',
        icon: 'ArrowCounterClockwise',
        onClick: enhancedHandlers.onReset,
        tooltip: 'Reset view',
      });
    }

    if (finalDefaults.fullscreen) {
      viewActions.push({
        id: 'fullscreen',
        label: state.isFullscreen ? 'Exit Fullscreen' : 'Fullscreen',
        icon: state.isFullscreen ? 'ArrowsIn' : 'ArrowsOut',
        onClick: () => enhancedHandlers.onFullscreen(!state.isFullscreen),
        variant: 'success',
        tooltip: `${state.isFullscreen ? 'Exit' : 'Enter'} fullscreen`,
      });
    }

    if (viewActions.length > 0) {
      groups.push({
        id: 'view-actions',
        label: 'View',
        actions: viewActions,
        separator: true,
      });
    }

    // Display options group
    const displayActions: ChartToolbarAction[] = [];

    if (finalDefaults.grid) {
      displayActions.push({
        id: 'grid',
        label: 'Grid',
        icon: 'GridFour',
        onClick: () => enhancedHandlers.onGridToggle(!state.showGrid),
        active: state.showGrid,
        tooltip: 'Toggle grid',
      });
    }

    if (finalDefaults.legend) {
      displayActions.push({
        id: 'legend',
        label: 'Legend',
        icon: 'List',
        onClick: () => enhancedHandlers.onLegendToggle(!state.showLegend),
        active: state.showLegend,
        tooltip: 'Toggle legend',
      });
    }

    if (finalDefaults.tooltips) {
      displayActions.push({
        id: 'tooltips',
        label: 'Tooltips',
        icon: 'ChatCircle',
        onClick: () => enhancedHandlers.onTooltipsToggle(!state.showTooltips),
        active: state.showTooltips,
        tooltip: 'Toggle tooltips',
      });
    }

    if (finalDefaults.animations) {
      displayActions.push({
        id: 'animations',
        label: 'Animations',
        icon: 'Play',
        onClick: () => enhancedHandlers.onAnimationsToggle(!state.animationsEnabled),
        active: state.animationsEnabled,
        tooltip: 'Toggle animations',
      });
    }

    if (displayActions.length > 0) {
      groups.push({
        id: 'display-actions',
        label: 'Display',
        actions: displayActions,
        separator: true,
      });
    }

    // Settings group
    if (finalDefaults.settings) {
      groups.push({
        id: 'settings-actions',
        label: 'Settings',
        actions: [
          {
            id: 'settings',
            label: 'Settings',
            icon: 'Gear',
            onClick: enhancedHandlers.onSettings,
            tooltip: 'Chart settings',
          },
        ],
      });
    }

    // Add custom groups
    groups.push(...customGroups);

    // Add custom actions to the last group or create a new one
    if (customActions.length > 0) {
      if (groups.length > 0) {
        if (groups.length > 0) {
          const lastGroup = groups[groups.length - 1];
          if (lastGroup) {
            lastGroup.actions.push(...customActions);
          }
        }
      } else {
        groups.push({
          id: 'custom-actions',
          label: 'Custom',
          actions: customActions,
        });
      }
    }

    return groups;
  }, [chartType, finalDefaults, state, enhancedHandlers, customActions, customGroups]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
          case 'r':
            if (finalDefaults.refresh) {
              event.preventDefault();
              enhancedHandlers.onRefresh();
            }
            break;
          case 'e':
            if (finalDefaults.export) {
              event.preventDefault();
              enhancedHandlers.onExport('png');
            }
            break;
          case 'f':
            if (finalDefaults.fullscreen) {
              event.preventDefault();
              enhancedHandlers.onFullscreen(!state.isFullscreen);
            }
            break;
        }
      } else {
        switch (event.key) {
          case '+':
          case '=':
            if (finalDefaults.zoom) {
              event.preventDefault();
              enhancedHandlers.onZoomIn();
            }
            break;
          case '-':
            if (finalDefaults.zoom) {
              event.preventDefault();
              enhancedHandlers.onZoomOut();
            }
            break;
          case 'r':
            if (finalDefaults.reset) {
              event.preventDefault();
              enhancedHandlers.onReset();
            }
            break;
          case ' ':
            if (finalDefaults.pan) {
              event.preventDefault();
              enhancedHandlers.onPanToggle(!state.panEnabled);
            }
            break;
          case 'F11':
            if (finalDefaults.fullscreen) {
              event.preventDefault();
              enhancedHandlers.onFullscreen(!state.isFullscreen);
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finalDefaults, state, enhancedHandlers]);

  return {
    state,
    setState,
    handlers: enhancedHandlers,
    toolbarGroups: generateToolbarGroups(),
    config: {
      enableDefaults,
      defaults: finalDefaults,
      exportFormats,
    },
  };
}
