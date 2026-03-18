import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Performance metrics collected by the monitor
 */
export interface PerformanceMetrics {
  /** Frames per second (target: 60) */
  fps: number;
  
  /** Time to render last frame in milliseconds (target: <16ms) */
  frameTime: number;
  
  /** GPU memory usage in MB (if available, target: <50MB) */
  gpuMemory: number | null;
  
  /** Current quality level based on performance */
  qualityLevel: 'low' | 'medium' | 'high';
  
  /** Timestamp of last measurement */
  timestamp: number;
  
  /** Whether auto-scaling is active */
  isAutoScaling: boolean;
  
  /** Number of consecutive low-FPS frames */
  lowFpsCount: number;
}

/**
 * Configuration for performance monitor
 */
export interface PerformanceMonitorConfig {
  /** Enable/disable monitoring */
  enabled?: boolean;
  
  /** Target FPS for auto-scaling (default: 60) */
  targetFps?: number;
  
  /** Minimum acceptable FPS before scaling down (default: 45) */
  minFps?: number;
  
  /** FPS threshold to scale up (default: 58) */
  scaleUpThreshold?: number;
  
  /** Consecutive low-FPS frames before scaling down (default: 3) */
  lowFpsFrames?: number;
  
  /** Consecutive high-FPS frames before scaling up (default: 10) */
  highFpsFrames?: number;
  
  /** Enable debug logging */
  debug?: boolean;
  
  /** Show debug overlay on screen */
  showOverlay?: boolean;
}

/**
 * Return value from performance monitor hook
 */
export interface UsePerformanceMonitorReturn {
  /** Current performance metrics */
  metrics: PerformanceMetrics;
  
  /** Recommended quality level based on performance */
  recommendedQuality: 'low' | 'medium' | 'high';
  
  /** Whether performance is below target */
  isUnderperforming: boolean;
  
  /** Manually set quality level */
  setQualityLevel: (level: 'low' | 'medium' | 'high') => void;
  
  /** Reset auto-scaling state */
  resetAutoScaling: () => void;
  
  /** Toggle monitoring on/off */
  toggleMonitoring: () => void;
}

/**
 * Get GPU memory info if available (Chrome DevTools only)
 */
const getGpuMemoryInfo = (): Promise<number | null> => {
  return new Promise((resolve) => {
    // Check for WebGL debug renderer info
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (gl) {
          const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            // Note: Actual memory info is not directly available via WebGL
            // We estimate based on renderer
            const glContext = gl as WebGLRenderingContext;
            const renderer = glContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            
            // Rough estimation based on renderer type
            if (renderer?.includes('Integrated')) {
              resolve(256); // Integrated graphics typically share system RAM
            } else if (renderer?.includes('AMD') || renderer?.includes('NVIDIA')) {
              resolve(512); // Dedicated GPU
            } else {
              resolve(null); // Unknown
            }
            return;
          }
        }
      } catch (e) {
        // WebGL not available or error occurred
      }
    }
    resolve(null);
  });
};

/**
 * Calculate optimal quality level based on FPS
 */
const calculateQualityLevel = (fps: number, currentQuality: 'low' | 'medium' | 'high'): 'low' | 'medium' | 'high' => {
  if (fps >= 58) {
    return 'high';
  } else if (fps >= 45) {
    return currentQuality === 'high' ? 'high' : 'medium';
  } else {
    return 'low';
  }
};

/**
 * Performance Monitor Hook
 * 
 * Real-time performance tracking with automatic quality scaling.
 * Monitors FPS, frame time, and GPU memory to optimize glass effects.
 * 
 * Features:
 * - Real-time FPS measurement
 * - Frame timing analysis
 * - Automatic quality scaling
 * - Debug overlay option
 * - Manual override capability
 * 
 * @example
 * ```typescript
 * const { metrics, recommendedQuality, setQualityLevel } = usePerformanceMonitor({
 *   targetFps: 60,
 *   minFps: 45,
 *   debug: true,
 * });
 * ```
 * 
 * @param config Monitor configuration
 * @returns Performance metrics and controls
 */
export function usePerformanceMonitor(
  config: PerformanceMonitorConfig = {}
): UsePerformanceMonitorReturn {
  const {
    enabled = true,
    targetFps = 60,
    minFps = 45,
    scaleUpThreshold = 58,
    lowFpsFrames = 3,
    highFpsFrames = 10,
    debug = false,
    showOverlay = false,
  } = config;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    gpuMemory: null,
    qualityLevel: 'medium',
    timestamp: 0,
    isAutoScaling: true,
    lowFpsCount: 0,
  });

  const [manualOverride, setManualOverride] = useState(false);
  const [isEnabled, setIsEnabled] = useState(enabled);

  // Refs for frame tracking
  const frameCountRef = useRef(0);
  const lastFpsUpdateRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lowFpsCountRef = useRef(0);
  const highFpsCountRef = useRef(0);
  const qualityLevelRef = useRef<'low' | 'medium' | 'high'>('medium');

  /**
   * Update metrics state
   */
  const updateMetrics = useCallback((newMetrics: Partial<PerformanceMetrics>) => {
    setMetrics(prev => ({
      ...prev,
      ...newMetrics,
      timestamp: performance.now(),
    }));
  }, []);

  /**
   * Auto-scaling logic
   */
  const applyAutoScaling = useCallback((currentFps: number) => {
    if (manualOverride) return;

    const currentQuality = qualityLevelRef.current;

    // Check for low FPS
    if (currentFps < minFps) {
      lowFpsCountRef.current++;
      highFpsCountRef.current = 0;

      // Scale down after N consecutive low-FPS frames
      if (lowFpsCountRef.current >= lowFpsFrames && currentQuality !== 'low') {
        qualityLevelRef.current = 'low';
        updateMetrics({ qualityLevel: 'low', lowFpsCount: lowFpsCountRef.current });
        
        if (debug) {
          console.log('[PerformanceMonitor] Scaling down to LOW quality. FPS:', currentFps);
        }
      }
    } 
    // Check for high FPS
    else if (currentFps >= scaleUpThreshold) {
      highFpsCountRef.current++;
      lowFpsCountRef.current = 0;

      // Scale up after N consecutive high-FPS frames
      if (highFpsCountRef.current >= highFpsFrames) {
        const newQuality = currentQuality === 'low' ? 'medium' : 'high';
        qualityLevelRef.current = newQuality;
        updateMetrics({ qualityLevel: newQuality, lowFpsCount: 0 });
        
        if (debug) {
          console.log('[PerformanceMonitor] Scaling up to', newQuality.toUpperCase(), 'quality. FPS:', currentFps);
        }
        
        highFpsCountRef.current = 0;
      }
    } else {
      // FPS in normal range, reset counters
      lowFpsCountRef.current = 0;
      highFpsCountRef.current = 0;
    }
  }, [manualOverride, minFps, scaleUpThreshold, lowFpsFrames, highFpsFrames, debug, updateMetrics]);

  /**
   * Animation frame handler - measures performance
   */
  const measureFrame = useCallback((currentTime: number) => {
    if (!isEnabled) return;

    frameCountRef.current++;

    // Calculate frame time
    const frameTime = currentTime - lastFrameTimeRef.current;
    lastFrameTimeRef.current = currentTime;

    // Update FPS every 100ms for responsiveness
    if (currentTime - lastFpsUpdateRef.current >= 100) {
      const elapsed = currentTime - lastFpsUpdateRef.current;
      const fps = Math.round((frameCountRef.current * 1000) / elapsed);
      
      // Apply auto-scaling
      applyAutoScaling(fps);

      updateMetrics({
        fps,
        frameTime,
        qualityLevel: qualityLevelRef.current,
        lowFpsCount: lowFpsCountRef.current,
      });

      // Reset for next measurement period
      frameCountRef.current = 0;
      lastFpsUpdateRef.current = currentTime;
    }

    // Continue measurement loop
    animationFrameRef.current = requestAnimationFrame(measureFrame);
  }, [isEnabled, applyAutoScaling, updateMetrics]);

  /**
   * Initialize GPU memory tracking
   */
  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;

    let mounted = true;

    const initGpuMemory = async () => {
      const memory = await getGpuMemoryInfo();
      if (mounted) {
        updateMetrics({ gpuMemory: memory });
      }
    };

    initGpuMemory();

    return () => {
      mounted = false;
    };
  }, [isEnabled, updateMetrics]);

  /**
   * Start/stop monitoring based on enabled state
   */
  useEffect(() => {
    if (!isEnabled) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    // Initialize
    lastFpsUpdateRef.current = performance.now();
    lastFrameTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(measureFrame);

    // Cleanup
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]); // measureFrame is stable via useCallback, avoid re-creating RAF loop

  /**
   * Manually set quality level (disables auto-scaling)
   */
  const setQualityLevel = useCallback((level: 'low' | 'medium' | 'high') => {
    setManualOverride(true);
    qualityLevelRef.current = level;
    updateMetrics({ qualityLevel: level, isAutoScaling: false });
    
    if (debug) {
      console.log('[PerformanceMonitor] Manual quality override:', level);
    }
  }, [updateMetrics, debug]);

  /**
   * Reset to auto-scaling mode
   */
  const resetAutoScaling = useCallback(() => {
    setManualOverride(false);
    lowFpsCountRef.current = 0;
    highFpsCountRef.current = 0;
    updateMetrics({ isAutoScaling: true, lowFpsCount: 0 });
    
    if (debug) {
      console.log('[PerformanceMonitor] Auto-scaling reset');
    }
  }, [updateMetrics, debug]);

  /**
   * Toggle monitoring on/off
   */
  const toggleMonitoring = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  // Calculate derived values
  const recommendedQuality = calculateQualityLevel(metrics.fps, metrics.qualityLevel);
  const isUnderperforming = metrics.fps < minFps;

  return {
    metrics,
    recommendedQuality,
    isUnderperforming,
    setQualityLevel,
    resetAutoScaling,
    toggleMonitoring,
  };
}

/**
 * Debug Overlay Component (Optional)
 * 
 * Shows real-time performance metrics on screen.
 * Only rendered when showOverlay is enabled.
 */
export function PerformanceOverlay({ metrics }: { metrics: PerformanceMetrics }) {
  if (typeof window === 'undefined') return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: '12px',
    borderRadius: '4px',
    zIndex: 9999,
    pointerEvents: 'none',
    minWidth: '150px',
  };

  const getFpsColor = (fps: number) => {
    if (fps >= 58) return '#4ade80'; // Green
    if (fps >= 45) return '#fbbf24'; // Yellow
    return '#ef4444'; // Red
  };

  // Performance overlay removed - will be implemented as separate component
  return null;
}

/**
 * Utility to get quality multipliers for glass parameters
 */
export function getQualityMultipliers(quality: 'low' | 'medium' | 'high') {
  switch (quality) {
    case 'low':
      return {
        distortionOctaves: 2,
        displacementScale: 0.6,
        blurAmount: 0.7,
        animationSpeed: 0.8,
        chromaticIntensity: 0.5,
      };
    case 'medium':
      return {
        distortionOctaves: 4,
        displacementScale: 0.85,
        blurAmount: 0.9,
        animationSpeed: 0.95,
        chromaticIntensity: 0.75,
      };
    case 'high':
      return {
        distortionOctaves: 5,
        displacementScale: 1.0,
        blurAmount: 1.0,
        animationSpeed: 1.0,
        chromaticIntensity: 1.0,
      };
  }
}
