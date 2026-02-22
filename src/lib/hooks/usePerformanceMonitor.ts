/**
 * Performance Monitoring Hook
 *
 * Tracks component render times and re-render counts
 * for performance analysis and optimization
 */

import { useEffect, useRef } from 'react';

export interface PerformanceMetrics {
  /**
   * Component name
   */
  componentName: string;
  /**
   * Number of renders
   */
  renderCount: number;
  /**
   * Average render time in milliseconds
   */
  averageRenderTime: number;
  /**
   * Total render time in milliseconds
   */
  totalRenderTime: number;
  /**
   * Maximum render time in milliseconds
   */
  maxRenderTime: number;
  /**
   * Minimum render time in milliseconds
   */
  minRenderTime: number;
}

/**
 * Options for performance monitoring
 */
export interface UsePerformanceMonitorOptions {
  /**
   * Component name to track
   */
  componentName: string;
  /**
   * Whether to log metrics to console (development only)
   */
  logToConsole?: boolean;
  /**
   * Threshold in milliseconds to warn about slow renders
   */
  warnThreshold?: number;
  /**
   * Callback to report metrics (e.g., to analytics)
   */
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

/**
 * Hook to monitor component performance
 *
 * @param options - Performance monitoring options
 * @returns Performance metrics
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   usePerformanceMonitor({
 *     componentName: 'MyComponent',
 *     warnThreshold: 16, // Warn if render takes > 16ms (1 frame)
 *   });
 *
 *   return <div>Content</div>;
 * }
 * ```
 */
export function usePerformanceMonitor(options: UsePerformanceMonitorOptions) {
  const {
    componentName,
    logToConsole = typeof process === 'undefined' || process.env?.NODE_ENV === 'development',
    warnThreshold = 16,
    onMetrics,
  } = options;

  const metricsRef = useRef<PerformanceMetrics>({
    componentName,
    renderCount: 0,
    averageRenderTime: 0,
    totalRenderTime: 0,
    maxRenderTime: 0,
    minRenderTime: Infinity,
  });

  const renderStartRef = useRef<number>(0);

  useEffect(() => {
    // Start timing the render
    renderStartRef.current = performance.now();
  });

  useEffect(() => {
    // Calculate render time
    const renderTime = performance.now() - renderStartRef.current;
    const metrics = metricsRef.current;

    // Update metrics
    metrics.renderCount += 1;
    metrics.totalRenderTime += renderTime;
    metrics.averageRenderTime = metrics.totalRenderTime / metrics.renderCount;
    metrics.maxRenderTime = Math.max(metrics.maxRenderTime, renderTime);
    metrics.minRenderTime = Math.min(metrics.minRenderTime, renderTime);

    // Warn if render is slow
    if (renderTime > warnThreshold && logToConsole) {
      console.warn(
        `[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms ` +
          `(threshold: ${warnThreshold}ms)`
      );
    }

    // Log metrics in development
    if (logToConsole && metrics.renderCount % 10 === 0) {
      console.log(`[Performance] ${componentName} metrics:`, {
        renderCount: metrics.renderCount,
        averageRenderTime: metrics.averageRenderTime.toFixed(2) + 'ms',
        maxRenderTime: metrics.maxRenderTime.toFixed(2) + 'ms',
        minRenderTime: metrics.minRenderTime.toFixed(2) + 'ms',
      });
    }

    // Report metrics via callback
    if (onMetrics) {
      onMetrics({ ...metrics });
    }
  });

  return metricsRef.current;
}

/**
 * Get all performance metrics for all monitored components
 * (useful for debugging and analytics)
 */
export function getPerformanceMetrics(): PerformanceMetrics[] {
  // This would need to be implemented with a global store
  // For now, this is a placeholder
  return [];
}
