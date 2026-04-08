/**
 * Performance Monitor Utility
 * 
 * Provides performance monitoring and metrics collection for the Atomix theme system.
 * Used to measure and optimize performance of advanced visual effects.
 */

import React from 'react';

/**
 * Performance metrics collected by the monitor
 */
export interface PerformanceMetrics {
  /** Frames per second */
  fps: number;
  /** Average frame render time in ms */
  frameTime: number;
  /** Peak frame render time in ms */
  peakFrameTime: number;
  /** Memory usage statistics */
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
  /** Timestamp of measurement */
  timestamp: number;
  /** Whether performance is degrading */
  isDegraded: boolean;
}

/**
 * Performance monitor configuration
 */
export interface PerformanceMonitorConfig {
  /** Target FPS threshold (default: 60) */
  fpsTarget?: number;
  /** How frequently to sample (default: 500ms) */
  sampleInterval?: number;
  /** Callback for performance updates */
  onUpdate?: (metrics: PerformanceMetrics) => void;
  /** Callback when performance degrades */
  onDegraded?: (metrics: PerformanceMetrics) => void;
  /** Enable/disable memory monitoring */
  enableMemoryMonitoring?: boolean;
}

/**
 * Performance monitor class
 */
export class PerformanceMonitor {
  public config: Required<PerformanceMonitorConfig>;
  private frameCount: number = 0;
  private lastSampleTime: number = 0;
  private lastFpsUpdate: number = 0;
  private frameTimes: number[] = [];
  private animationFrameId: number | null = null;
  private isActive: boolean = false;
  private startTime: number = 0;
  
  /**
   * Create a new performance monitor
   * 
   * @param config Configuration options
   */
  constructor(config?: PerformanceMonitorConfig) {
    this.config = {
      fpsTarget: config?.fpsTarget ?? 60,
      sampleInterval: config?.sampleInterval ?? 500,
      onUpdate: config?.onUpdate ?? (() => {}),
      onDegraded: config?.onDegraded ?? (() => {}),
      enableMemoryMonitoring: config?.enableMemoryMonitoring ?? (typeof window !== 'undefined' && 
                              (window as any).performance &&
                              (window as any).performance.memory),
    };
  }
  
  /**
   * Start monitoring performance
   */
  public start(): void {
    if (this.isActive) return;
    
    this.isActive = true;
    this.frameCount = 0;
    this.lastSampleTime = performance.now();
    this.lastFpsUpdate = this.lastSampleTime;
    this.frameTimes = [];
    this.startTime = this.lastSampleTime;
    
    this.animationFrameId = requestAnimationFrame(this.onFrame.bind(this));
  }
  
  /**
   * Stop monitoring performance
   */
  public stop(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isActive = false;
  }
  
  /**
   * Get current performance metrics
   */
  public getMetrics(): PerformanceMetrics {
    const now = performance.now();
    const elapsed = now - this.lastFpsUpdate;
    const fps = elapsed > 0 ? Math.round((this.frameCount / elapsed) * 1000) : 0;
    
    // Calculate average frame time
    const avgFrameTime = this.frameTimes.length > 0 
      ? this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length 
      : 0;
    
    // Peak frame time
    const peakFrameTime = this.frameTimes.length > 0 
      ? Math.max(...this.frameTimes) 
      : 0;
    
    // Get memory stats if available
    let memory = undefined;
    if (this.config.enableMemoryMonitoring) {
      const perf = window.performance as any;
      if (perf && perf.memory) {
        memory = {
          usedJSHeapSize: perf.memory.usedJSHeapSize,
          totalJSHeapSize: perf.memory.totalJSHeapSize,
          jsHeapSizeLimit: perf.memory.jsHeapSizeLimit,
        };
      }
    }
    
    return {
      fps,
      frameTime: avgFrameTime,
      peakFrameTime,
      memory,
      timestamp: now,
      isDegraded: fps < (this.config.fpsTarget * 0.7), // Degraded if under 70% of target
    };
  }
  
  /**
   * Get the current FPS
   */
  public getFps(): number {
    return this.getMetrics().fps;
  }
  
  /**
   * Check if performance is degraded
   */
  public isPerformanceDegraded(): boolean {
    return this.getMetrics().isDegraded;
  }
  
  /**
   * Private method called on each animation frame
   */
  private onFrame(timestamp: number): void {
    if (!this.isActive) return;
    
    // Calculate frame time
    const frameTime = timestamp - this.lastSampleTime;
    this.frameTimes.push(frameTime);
    
    // Keep only the last 60 frame times for averaging
    if (this.frameTimes.length > 60) {
      this.frameTimes.shift();
    }
    
    this.frameCount++;
    this.lastSampleTime = timestamp;
    
    // Check if we need to update metrics
    if (timestamp - this.lastFpsUpdate >= this.config.sampleInterval) {
      const metrics = this.getMetrics();
      
      // Call update callback
      this.config.onUpdate(metrics);
      
      // Check for degradation
      if (metrics.isDegraded) {
        this.config.onDegraded(metrics);
      }
      
      // Reset counters
      this.frameCount = 0;
      this.lastFpsUpdate = timestamp;
    }
    
    this.animationFrameId = requestAnimationFrame(this.onFrame.bind(this));
  }
  
  /**
   * Run a performance test for a specific function
   * 
   * @param fn Function to test
   * @param iterations Number of iterations (default: 100)
   * @returns Average execution time in ms
   */
  public async testFunctionPerformance(
    fn: () => void, 
    iterations: number = 100
  ): Promise<number> {
    const times: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      fn();
      const end = performance.now();
      times.push(end - start);
    }
    
    return times.reduce((a, b) => a + b, 0) / times.length;
  }
}

/**
 * Create a performance monitor instance
 * 
 * @param config Configuration options
 * @returns PerformanceMonitor instance
 * 
 * @example
 * ```typescript
 * import { createPerformanceMonitor } from '@shohojdhara/atomix/theme';
 * 
 * const monitor = createPerformanceMonitor({
 *   fpsTarget: 60,
 *   onUpdate: (metrics) => console.log('FPS:', metrics.fps),
 *   onDegraded: (metrics) => console.warn('Performance degraded!', metrics),
 * });
 * 
 * monitor.start();
 * 
 * // Later...
 * monitor.stop();
 * ```
 */
export function createPerformanceMonitor(config?: PerformanceMonitorConfig): PerformanceMonitor {
  return new PerformanceMonitor(config);
}

/**
 * Hook for React components to monitor performance
 * 
 * @param config Configuration options
 * @returns Performance metrics and monitor controls
 * 
 * @example
 * ```typescript
 * import { usePerformanceMonitor } from '@shohojdhara/atomix/theme';
 * 
 * function MyComponent() {
 *   const { metrics, start, stop } = usePerformanceMonitor({ fpsTarget: 60 });
 *   
 *   useEffect(() => {
 *     start();
 *     return () => stop();
 *   }, []);
 *   
 *   return <div>FPS: {metrics.fps}</div>;
 * }
 * ```
 */
export function usePerformanceMonitor(config?: PerformanceMonitorConfig) {
  const [monitor] = React.useState(() => createPerformanceMonitor(config));
  const [metrics, setMetrics] = React.useState<PerformanceMetrics>(() => 
    typeof window !== 'undefined' ? monitor.getMetrics() : {
      fps: 0,
      frameTime: 0,
      peakFrameTime: 0,
      timestamp: 0,
      isDegraded: false,
    } as PerformanceMetrics
  );
  
  const start = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      monitor.start();
    }
  }, [monitor]);
  
  const stop = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      monitor.stop();
    }
  }, [monitor]);
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update metrics when monitor callbacks fire
    const originalOnUpdate = config?.onUpdate;
    monitor.config.onUpdate = (newMetrics: PerformanceMetrics) => {
      setMetrics(newMetrics);
      originalOnUpdate?.(newMetrics);
    };
    
    return () => {
      monitor.stop();
    };
  }, [monitor, config?.onUpdate]);
  
  return {
    metrics,
    start,
    stop,
  };
}

