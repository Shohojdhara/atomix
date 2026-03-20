import React, { memo } from 'react';
import type { PerformanceMetrics } from '../../lib/composables/usePerformanceMonitor';
import './PerformanceDashboard.scss';

interface PerformanceDashboardProps {
  metrics: PerformanceMetrics;
  isVisible?: boolean;
  onClose?: () => void;
}

/** Map an FPS value to a semantic color token string. */
const getFpsColor = (fps: number): string => {
  if (fps >= 58) return 'var(--atomix-color-success, #4ade80)';
  if (fps >= 45) return 'var(--atomix-color-warning, #fbbf24)';
  return 'var(--atomix-color-danger, #ef4444)';
};

/** Map a quality level string to a semantic color token string. */
const getQualityColor = (quality: string): string => {
  switch (quality) {
    case 'high':   return 'var(--atomix-color-success, #4ade80)';
    case 'medium': return 'var(--atomix-color-warning, #fbbf24)';
    case 'low':    return 'var(--atomix-color-danger, #ef4444)';
    default:       return '#9ca3af';
  }
};

const getFpsLabel = (fps: number): string => {
  if (fps >= 58) return 'Optimal';
  if (fps >= 45) return 'Warning';
  return 'Critical';
};

/**
 * PerformanceDashboard - Real-time performance monitoring overlay.
 *
 * Displays FPS, frame time, quality level, GPU memory, and auto-scaling status.
 * Rendered only when `debugPerformance={true}` on the parent `AtomixGlass`.
 */
export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = memo(
  ({ metrics, isVisible = true, onClose }) => {
    if (!isVisible) return null;

    const fpsColor = getFpsColor(metrics.fps);
    const isCritical = metrics.fps < 45;

    return (
      <div className="c-perf-dashboard">
        {/* Header */}
        <div className="c-perf-dashboard__header">
          <span className="c-perf-dashboard__title">Performance Monitor</span>
          {onClose && (
            <button
              className="c-perf-dashboard__close-btn"
              onClick={onClose}
              aria-label="Close performance dashboard"
            >
              ×
            </button>
          )}
        </div>

        {/* FPS */}
        <div className="c-perf-dashboard__metric">
          <span className="c-perf-dashboard__metric-label">FPS</span>
          <span className="c-perf-dashboard__metric-value" style={{ color: fpsColor }}>
            {Math.round(metrics.fps)}
          </span>
        </div>

        {/* Frame Time */}
        <div className="c-perf-dashboard__metric">
          <span className="c-perf-dashboard__metric-label">Frame Time</span>
          <span className="c-perf-dashboard__metric-value">
            {metrics.frameTime.toFixed(2)}ms
          </span>
        </div>

        {/* Quality Level */}
        <div className="c-perf-dashboard__metric">
          <span className="c-perf-dashboard__metric-label">Quality</span>
          <span
            className="c-perf-dashboard__metric-value c-perf-dashboard__metric-value--quality"
            style={{ color: getQualityColor(metrics.qualityLevel) }}
          >
            {metrics.qualityLevel}
          </span>
        </div>

        {/* GPU Memory (if available) */}
        {metrics.gpuMemory && (
          <div className="c-perf-dashboard__metric">
            <span className="c-perf-dashboard__metric-label">GPU Memory</span>
            <span className="c-perf-dashboard__metric-value">
              ~{Math.round(metrics.gpuMemory / 1024)}MB
            </span>
          </div>
        )}

        {/* Auto-scaling notice */}
        {metrics.isAutoScaling && (
          <div className="c-perf-dashboard__section c-perf-dashboard__auto-scale">
            Auto-scaling active
          </div>
        )}

        {/* Status indicator */}
        <div className="c-perf-dashboard__section c-perf-dashboard__status">
          <div
            className={[
              'c-perf-dashboard__status-dot',
              isCritical && 'c-perf-dashboard__status-dot--pulse',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ backgroundColor: fpsColor }}
          />
          <span className="c-perf-dashboard__status-label" style={{ color: fpsColor }}>
            {getFpsLabel(metrics.fps)}
          </span>
        </div>
      </div>
    );
  }
);

PerformanceDashboard.displayName = 'PerformanceDashboard';
