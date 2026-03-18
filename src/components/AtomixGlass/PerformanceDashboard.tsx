import React, { useMemo } from 'react';
import type { PerformanceMetrics } from '../../lib/composables/usePerformanceMonitor';

interface PerformanceDashboardProps {
  metrics: PerformanceMetrics;
  isVisible?: boolean;
  onClose?: () => void;
}

/**
 * PerformanceDashboard - Real-time performance monitoring overlay
 * 
 * Displays:
 * - Current FPS with color coding
 * - Frame time statistics
 * - Quality level indicator
 * - GPU memory usage (if available)
 * - Auto-scaling status
 */
export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  metrics,
  isVisible = true,
  onClose
}) => {
  // Get color for FPS display
  const getFpsColor = (fps: number): string => {
    if (fps >= 58) return '#4ade80'; // Green - good
    if (fps >= 45) return '#fbbf24'; // Yellow - warning
    return '#ef4444'; // Red - critical
  };

  // Get quality level badge color
  const getQualityColor = (quality: string): string => {
    switch (quality) {
      case 'high': return '#4ade80';
      case 'medium': return '#fbbf24';
      case 'low': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  // Dashboard styles
  const dashboardStyle: React.CSSProperties = useMemo(() => ({
    position: 'fixed',
    top: '16px',
    right: '16px',
    padding: '12px 16px',
    backgroundColor: 'rgba(17, 24, 39, 0.95)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#fff',
    zIndex: 9999,
    minWidth: '200px',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'opacity 0.3s ease',
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? 'auto' : 'none',
  }), [isVisible]);

  const headerStyle: React.CSSProperties = useMemo(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  }), []);

  const titleStyle: React.CSSProperties = useMemo(() => ({
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#fff',
  }), []);

  const closeButtonStyle: React.CSSProperties = useMemo(() => ({
    background: 'transparent',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
    lineHeight: '1',
  }), []);

  const metricRowStyle: React.CSSProperties = useMemo(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  }), []);

  const labelStyle: React.CSSProperties = useMemo(() => ({
    color: '#9ca3af',
    marginRight: '12px',
  }), []);

  const valueStyle: React.CSSProperties = useMemo(() => ({
    fontWeight: 'bold',
  }), []);

  if (!isVisible) return null;

  return (
    <div style={dashboardStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <span style={titleStyle}>Performance Monitor</span>
        {onClose && (
          <button 
            style={closeButtonStyle} 
            onClick={onClose}
            aria-label="Close performance dashboard"
          >
            ×
          </button>
        )}
      </div>

      {/* FPS Display */}
      <div style={metricRowStyle}>
        <span style={labelStyle}>FPS</span>
        <span 
          style={{
            ...valueStyle,
            color: getFpsColor(metrics.fps)
          }}
        >
          {Math.round(metrics.fps)}
        </span>
      </div>

      {/* Frame Time */}
      <div style={metricRowStyle}>
        <span style={labelStyle}>Frame Time</span>
        <span style={valueStyle}>
          {metrics.frameTime.toFixed(2)}ms
        </span>
      </div>

      {/* Quality Level */}
      <div style={metricRowStyle}>
        <span style={labelStyle}>Quality</span>
        <span 
          style={{
            ...valueStyle,
            color: getQualityColor(metrics.qualityLevel),
            textTransform: 'uppercase',
            fontSize: '11px',
          }}
        >
          {metrics.qualityLevel}
        </span>
      </div>

      {/* GPU Memory (if available) */}
      {metrics.gpuMemory && (
        <div style={metricRowStyle}>
          <span style={labelStyle}>GPU Memory</span>
          <span style={valueStyle}>
            ~{Math.round(metrics.gpuMemory / 1024)}MB
          </span>
        </div>
      )}

      {/* Auto-scaling Status */}
      {metrics.isAutoScaling && (
        <div style={{
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '10px',
          color: '#6b7280',
          textAlign: 'center',
        }}>
          Auto-scaling active
        </div>
      )}

      {/* Performance Status Indicator */}
      <div style={{
        marginTop: '8px',
        paddingTop: '8px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: getFpsColor(metrics.fps),
          animation: metrics.fps < 45 ? 'pulse 1s infinite' : 'none',
        }} />
        <span style={{
          fontSize: '10px',
          color: metrics.fps >= 58 ? '#4ade80' : metrics.fps >= 45 ? '#fbbf24' : '#ef4444',
        }}>
          {metrics.fps >= 58 ? 'Optimal' : metrics.fps >= 45 ? 'Warning' : 'Critical'}
        </span>
      </div>
    </div>
  );
};

// Add pulse animation for critical FPS
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  document.head.appendChild(styleSheet);
}
