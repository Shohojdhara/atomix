import React, { memo } from 'react';
import type { PerformanceMetrics } from '../../lib/composables/usePerformanceMonitor';

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

// Keyframes for pulse animation (injected via style tag)
const keyframesStyle = `
@keyframes perf-dashboard-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
`;

// Inject keyframes once
if (typeof document !== 'undefined') {
  const styleId = 'perf-dashboard-keyframes';
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = keyframesStyle;
    document.head.appendChild(styleEl);
  }
}

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
      <div
        className="c-perf-dashboard u-position-fixed u-top-4 u-end-4 u-p-3 u-px-4 u-text-xs u-font-mono u-text-white u-rounded-md u-border u-border-white-alpha-10 u-shadow-lg"
        style={{
          zIndex: 9999,
          minWidth: '12.5rem', // 200px
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(8px)',
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Header */}
        <div className="u-flex u-items-center u-justify-between u-mb-2 u-pb-2 u-border-b u-border-white-alpha-10">
          <span className="u-text-sm u-font-bold u-text-white">Performance Monitor</span>
          {onClose && (
            <button
              className="u-bg-transparent u-border-none u-p-0 u-line-height-1 u-text-base u-text-gray-400 u-cursor-pointer hover:u-text-white"
              onClick={onClose}
              aria-label="Close performance dashboard"
              style={{ transition: 'color 0.2s ease' }}
            >
              ×
            </button>
          )}
        </div>

        {/* FPS */}
        <div className="u-flex u-items-center u-justify-between u-mb-1-5">
          <span className="u-text-gray-400 u-me-3">FPS</span>
          <span className="u-font-bold" style={{ color: fpsColor }}>
            {Math.round(metrics.fps)}
          </span>
        </div>

        {/* Frame Time */}
        <div className="u-flex u-items-center u-justify-between u-mb-1-5">
          <span className="u-text-gray-400 u-me-3">Frame Time</span>
          <span className="u-font-bold">
            {metrics.frameTime.toFixed(2)}ms
          </span>
        </div>

        {/* Quality Level */}
        <div className="u-flex u-items-center u-justify-between u-mb-1-5">
          <span className="u-text-gray-400 u-me-3">Quality</span>
          <span
            className="u-font-bold u-text-uppercase"
            style={{ 
              fontSize: '0.6875rem', // 11px
              color: getQualityColor(metrics.qualityLevel) 
            }}
          >
            {metrics.qualityLevel}
          </span>
        </div>

        {/* GPU Memory (if available) */}
        {metrics.gpuMemory && (
          <div className="u-flex u-items-center u-justify-between u-mb-1-5">
            <span className="u-text-gray-400 u-me-3">GPU Memory</span>
            <span className="u-font-bold">
              ~{Math.round(metrics.gpuMemory / 1024)}MB
            </span>
          </div>
        )}

        {/* Auto-scaling notice */}
        {metrics.isAutoScaling && (
          <div
            className="u-mt-2 u-pt-2 u-border-t u-border-white-alpha-10 u-text-center"
            style={{ 
              fontSize: '0.625rem', // 10px
              color: '#6b7280',
            }}
          >
            Auto-scaling active
          </div>
        )}

        {/* Status indicator */}
        <div className="u-flex u-items-center u-gap-2 u-mt-2 u-pt-2 u-border-t u-border-white-alpha-10">
          <div
            className="u-rounded-full"
            style={{
              width: '0.5rem',
              height: '0.5rem',
              flexShrink: 0,
              backgroundColor: fpsColor,
              ...(isCritical && { animation: 'perf-dashboard-pulse 1s infinite' }),
            }}
          />
          <span
            className="u-text-xs"
            style={{ 
              fontSize: '0.625rem', // 10px
              color: fpsColor 
            }}
          >
            {getFpsLabel(metrics.fps)}
          </span>
        </div>
      </div>
    );
  }
);

PerformanceDashboard.displayName = 'PerformanceDashboard';
