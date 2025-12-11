/**
 * Theme Analytics and Performance Monitoring
 * 
 * Tracks theme usage, performance metrics, and provides analytics
 */

import { getLogger } from '../errors';

/**
 * Theme analytics event types
 */
export type ThemeAnalyticsEvent = 
  | 'theme_load'
  | 'theme_switch'
  | 'theme_error'
  | 'theme_revert'
  | 'css_load'
  | 'performance_metric';

/**
 * Theme analytics event
 */
export interface ThemeAnalyticsEventData {
  /** Event type */
  type: ThemeAnalyticsEvent;
  /** Event timestamp */
  timestamp: number;
  /** Theme name */
  themeName?: string;
  /** Additional event data */
  data?: Record<string, any>;
}

/**
 * Performance metric
 */
export interface PerformanceMetric {
  /** Metric name */
  name: string;
  /** Metric value */
  value: number;
  /** Unit */
  unit: 'ms' | 'bytes' | 'count';
  /** Timestamp */
  timestamp: number;
}

/**
 * Analytics configuration
 */
export interface AnalyticsConfig {
  /** Enable analytics */
  enabled?: boolean;
  /** Enable performance tracking */
  trackPerformance?: boolean;
  /** Enable error tracking */
  trackErrors?: boolean;
  /** Custom event handler */
  onEvent?: (event: ThemeAnalyticsEventData) => void;
  /** Custom performance handler */
  onPerformance?: (metric: PerformanceMetric) => void;
  /** Buffer size for events */
  bufferSize?: number;
  /** Flush interval (ms) */
  flushInterval?: number;
}

/**
 * Default analytics configuration
 */
const DEFAULT_CONFIG: Required<Omit<AnalyticsConfig, 'onEvent' | 'onPerformance'>> = {
  enabled: true,
  trackPerformance: true,
  trackErrors: true,
  bufferSize: 100,
  flushInterval: 5000,
};

/**
 * Theme Analytics Manager
 * 
 * Tracks theme usage, performance, and errors
 */
export class ThemeAnalytics {
  private config: Required<Omit<AnalyticsConfig, 'onEvent' | 'onPerformance'>> & {
    onEvent?: AnalyticsConfig['onEvent'];
    onPerformance?: AnalyticsConfig['onPerformance'];
  };
  private events: ThemeAnalyticsEventData[] = [];
  private metrics: PerformanceMetric[] = [];
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  private logger = getLogger();

  constructor(config: AnalyticsConfig = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    if (this.config.enabled) {
      this.startFlushTimer();
    }
  }

  /**
   * Track theme load event
   */
  trackThemeLoad(themeName: string, loadTime?: number): void {
    if (!this.config.enabled) {
      return;
    }

    const event: ThemeAnalyticsEventData = {
      type: 'theme_load',
      timestamp: Date.now(),
      themeName,
      data: loadTime ? { loadTime } : undefined,
    };

    this.addEvent(event);

    if (loadTime !== undefined) {
      this.trackPerformance('theme_load_time', loadTime, 'ms');
    }
  }

  /**
   * Track theme switch event
   */
  trackThemeSwitch(fromTheme: string, toTheme: string, switchTime?: number): void {
    if (!this.config.enabled) {
      return;
    }

    const event: ThemeAnalyticsEventData = {
      type: 'theme_switch',
      timestamp: Date.now(),
      themeName: toTheme,
      data: {
        fromTheme,
        toTheme,
        ...(switchTime ? { switchTime } : {}),
      },
    };

    this.addEvent(event);

    if (switchTime !== undefined) {
      this.trackPerformance('theme_switch_time', switchTime, 'ms');
    }
  }

  /**
   * Track theme error
   */
  trackError(themeName: string, error: Error | string): void {
    if (!this.config.enabled || !this.config.trackErrors) {
      return;
    }

    const event: ThemeAnalyticsEventData = {
      type: 'theme_error',
      timestamp: Date.now(),
      themeName,
      data: {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
      },
    };

    this.addEvent(event);
  }

  /**
   * Track theme revert
   */
  trackThemeRevert(attemptedTheme: string, revertedToTheme: string | null, error: Error): void {
    if (!this.config.enabled || !this.config.trackErrors) {
      return;
    }

    const event: ThemeAnalyticsEventData = {
      type: 'theme_revert',
      timestamp: Date.now(),
      themeName: attemptedTheme,
      data: {
        attemptedTheme,
        revertedToTheme,
        error: error.message,
        stack: error.stack,
      },
    };

    this.addEvent(event);
  }

  /**
   * Track CSS load
   */
  trackCSSLoad(themeName: string, loadTime: number, size?: number): void {
    if (!this.config.enabled) {
      return;
    }

    const event: ThemeAnalyticsEventData = {
      type: 'css_load',
      timestamp: Date.now(),
      themeName,
      data: {
        loadTime,
        ...(size ? { size } : {}),
      },
    };

    this.addEvent(event);

    this.trackPerformance('css_load_time', loadTime, 'ms');
    if (size !== undefined) {
      this.trackPerformance('css_size', size, 'bytes');
    }
  }

  /**
   * Track performance metric
   */
  trackPerformance(name: string, value: number, unit: PerformanceMetric['unit'] = 'ms'): void {
    if (!this.config.enabled || !this.config.trackPerformance) {
      return;
    }

    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
    };

    this.metrics.push(metric);

    // Keep only last N metrics
    if (this.metrics.length > this.config.bufferSize) {
      this.metrics.shift();
    }

    // Notify handler
    if (this.config.onPerformance) {
      try {
        this.config.onPerformance(metric);
      } catch (error) {
        this.logger.error(
          'Error in performance handler',
          error instanceof Error ? error : new Error(String(error)),
          { metric }
        );
      }
    }
  }

  /**
   * Add event to buffer
   */
  private addEvent(event: ThemeAnalyticsEventData): void {
    this.events.push(event);

    // Keep only last N events
    if (this.events.length > this.config.bufferSize) {
      this.events.shift();
    }

    // Notify handler immediately
    if (this.config.onEvent) {
      try {
        this.config.onEvent(event);
      } catch (error) {
        this.logger.error(
          'Error in event handler',
          error instanceof Error ? error : new Error(String(error)),
          { event }
        );
      }
    }
  }

  /**
   * Get all events
   */
  getEvents(): ThemeAnalyticsEventData[] {
    return [...this.events];
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get events by type
   */
  getEventsByType(type: ThemeAnalyticsEvent): ThemeAnalyticsEventData[] {
    return this.events.filter(event => event.type === type);
  }

  /**
   * Get metrics by name
   */
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name);
  }

  /**
   * Get average performance metric
   */
  getAverageMetric(name: string): number | null {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) {
      return null;
    }

    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }

  /**
   * Clear all events and metrics
   */
  clear(): void {
    this.events = [];
    this.metrics = [];
  }

  /**
   * Start flush timer
   */
  private startFlushTimer(): void {
    if (this.flushTimer) {
      return;
    }

    this.flushTimer = setInterval(() => {
      // Auto-flush can be implemented here if needed
      // For now, events are sent immediately via onEvent callback
    }, this.config.flushInterval);
  }

  /**
   * Stop flush timer
   */
  private stopFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
  }

  /**
   * Enable analytics
   */
  enable(): void {
    this.config.enabled = true;
    this.startFlushTimer();
  }

  /**
   * Disable analytics
   */
  disable(): void {
    this.config.enabled = false;
    this.stopFlushTimer();
  }

  /**
   * Destroy analytics instance
   */
  destroy(): void {
    this.stopFlushTimer();
    this.clear();
  }
}

/**
 * Create theme analytics instance
 */
export function createThemeAnalytics(config?: AnalyticsConfig): ThemeAnalytics {
  return new ThemeAnalytics(config);
}

/**
 * Global analytics instance (optional)
 */
let globalAnalytics: ThemeAnalytics | null = null;

/**
 * Get or create global analytics instance
 */
export function getGlobalAnalytics(): ThemeAnalytics {
  if (!globalAnalytics) {
    globalAnalytics = createThemeAnalytics();
  }
  return globalAnalytics;
}

/**
 * Set global analytics instance
 */
export function setGlobalAnalytics(analytics: ThemeAnalytics): void {
  globalAnalytics = analytics;
}
