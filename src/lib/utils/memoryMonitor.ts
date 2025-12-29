/**
 * Memory Monitoring Utilities
 * 
 * Detects memory leaks and tracks component lifecycle memory usage
 * Only available in development mode
 */

/**
 * Memory snapshot for comparison
 */
export interface MemorySnapshot {
  /**
   * Used JavaScript heap size in bytes
   */
  usedJSHeapSize: number;
  /**
   * Total JavaScript heap size in bytes
   */
  totalJSHeapSize: number;
  /**
   * JavaScript heap size limit in bytes
   */
  jsHeapSizeLimit: number;
  /**
   * Timestamp of the snapshot
   */
  timestamp: number;
}

/**
 * Check if memory monitoring is available
 */
export function isMemoryMonitoringAvailable(): boolean {
  return (
    typeof performance !== 'undefined' &&
    'memory' in performance &&
    (typeof process === 'undefined' || process.env?.NODE_ENV === 'development')
  );
}

/**
 * Get current memory usage snapshot
 * 
 * @returns Memory snapshot or null if not available
 */
export function getMemorySnapshot(): MemorySnapshot | null {
  if (!isMemoryMonitoringAvailable()) {
    return null;
  }

  const memory = (performance as any).memory;

  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
    timestamp: performance.now(),
  };
}

/**
 * Format bytes to human-readable string
 * 
 * @param bytes - Number of bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Compare two memory snapshots and detect potential leaks
 * 
 * @param before - Snapshot before operation
 * @param after - Snapshot after operation
 * @param threshold - Threshold in bytes to consider a leak (default: 5MB)
 * @returns Object with leak detection results
 */
export function detectMemoryLeak(
  before: MemorySnapshot | null,
  after: MemorySnapshot | null,
  threshold: number = 5 * 1024 * 1024 // 5MB
): {
  hasLeak: boolean;
  memoryIncrease: number;
  formattedIncrease: string;
  percentageIncrease: number;
} {
  if (!before || !after) {
    return {
      hasLeak: false,
      memoryIncrease: 0,
      formattedIncrease: '0 Bytes',
      percentageIncrease: 0,
    };
  }

  const memoryIncrease = after.usedJSHeapSize - before.usedJSHeapSize;
  const percentageIncrease = (memoryIncrease / before.usedJSHeapSize) * 100;

  return {
    hasLeak: memoryIncrease > threshold,
    memoryIncrease,
    formattedIncrease: formatBytes(memoryIncrease),
    percentageIncrease,
  };
}

/**
 * Monitor memory usage over time
 * 
 * @param interval - Interval in milliseconds to check memory
 * @param callback - Callback function called with each snapshot
 * @returns Function to stop monitoring
 */
export function monitorMemoryUsage(
  interval: number = 5000,
  callback?: (snapshot: MemorySnapshot) => void
): () => void {
  if (!isMemoryMonitoringAvailable()) {
    console.warn('[Memory Monitor] Memory monitoring is not available');
    return () => {};
  }

  const checkMemory = () => {
    const snapshot = getMemorySnapshot();
    if (snapshot) {
      if (callback) {
        callback(snapshot);
      } else if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
        console.log('[Memory Monitor]', {
          used: formatBytes(snapshot.usedJSHeapSize),
          total: formatBytes(snapshot.totalJSHeapSize),
          limit: formatBytes(snapshot.jsHeapSizeLimit),
        });
      }
    }
  };

  const intervalId = setInterval(checkMemory, interval);

  // Initial check
  checkMemory();

  // Return cleanup function
  return () => {
    clearInterval(intervalId);
  };
}

/**
 * Track component lifecycle memory usage
 * 
 * @param componentName - Name of the component
 * @returns Object with start and end tracking functions
 */
export function trackComponentMemory(componentName: string) {
  const before = getMemorySnapshot();

  return {
    /**
     * Get memory snapshot at component mount
     */
    getBeforeSnapshot: () => before,
    /**
     * Get memory snapshot at component unmount and detect leaks
     */
    getAfterSnapshot: () => {
      const after = getMemorySnapshot();
      if (before && after) {
        const leakInfo = detectMemoryLeak(before, after);
        if (leakInfo.hasLeak && (typeof process === 'undefined' || process.env?.NODE_ENV === 'development')) {
          console.warn(
            `[Memory Monitor] Potential memory leak detected in ${componentName}:`,
            leakInfo
          );
        }
      }
      return after;
    },
  };
}

