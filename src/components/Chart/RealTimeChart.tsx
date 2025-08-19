import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { ChartProps } from '../../lib/types/components';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';

interface RealTimeChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Data stream configuration
   */
  streamConfig?: {
    /**
     * Update interval in milliseconds
     */
    interval: number;
    /**
     * Maximum number of data points to keep
     */
    maxDataPoints: number;
    /**
     * Whether to auto-scroll to latest data
     */
    autoScroll: boolean;
    /**
     * Buffer size for smooth updates
     */
    bufferSize?: number;
  };

  /**
   * Data source function that returns new data points
   */
  dataSource?: () => Promise<{ label: string; value: number; timestamp?: number }[]>;

  /**
   * WebSocket URL for real-time data
   */
  websocketUrl?: string;

  /**
   * Callback when new data arrives
   */
  onDataUpdate?: (newData: any[]) => void;

  /**
   * Performance monitoring
   */
  enablePerformanceMonitoring?: boolean;
}

const RealTimeChart = memo(
  forwardRef<HTMLDivElement, RealTimeChartProps>(
    (
      {
        datasets = [],
        config = {},
        streamConfig = {
          interval: 1000,
          maxDataPoints: 100,
          autoScroll: true,
          bufferSize: 10,
        },
        dataSource,
        websocketUrl,
        onDataUpdate,
        enablePerformanceMonitoring = false,
        ...props
      },
      ref
    ) => {
      const [realTimeData, setRealTimeData] = useState(datasets);
      const [isStreaming, setIsStreaming] = useState(false);
      const [performanceMetrics, setPerformanceMetrics] = useState({
        fps: 0,
        updateTime: 0,
        dataPoints: 0,
      });

      const intervalRef = useRef<NodeJS.Timeout | null>(null);
      const websocketRef = useRef<WebSocket | null>(null);
      const frameCountRef = useRef(0);
      const lastFrameTimeRef = useRef(Date.now());
      const dataBufferRef = useRef<any[]>([]);

      // Performance monitoring
      const updatePerformanceMetrics = useCallback(() => {
        if (!enablePerformanceMonitoring) return;

        const now = Date.now();
        const deltaTime = now - lastFrameTimeRef.current;

        if (deltaTime >= 1000) {
          const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
          setPerformanceMetrics(prev => ({
            ...prev,
            fps,
            dataPoints: realTimeData.reduce((sum, dataset) => sum + (dataset.data?.length || 0), 0),
          }));

          frameCountRef.current = 0;
          lastFrameTimeRef.current = now;
        }

        frameCountRef.current++;
      }, [enablePerformanceMonitoring, realTimeData]);

      // Data buffer management for smooth updates
      const processDataBuffer = useCallback(() => {
        if (dataBufferRef.current.length === 0) return;

        const startTime = performance.now();

        setRealTimeData(prevData => {
          const newData = [...prevData];

          // Process buffered data points
          dataBufferRef.current.forEach(newPoints => {
            newPoints.forEach((point: any, datasetIndex: number) => {
              if (!newData[datasetIndex]) {
                newData[datasetIndex] = {
                  label: `Dataset ${datasetIndex + 1}`,
                  data: [],
                  color: `hsl(${datasetIndex * 60}, 70%, 50%)`,
                };
              }

              const dataset = newData[datasetIndex];
              const currentData = dataset.data || [];

              // Add new point with timestamp
              const newPoint = {
                ...point,
                timestamp: point.timestamp || Date.now(),
              };

              currentData.push(newPoint);

              // Maintain max data points
              if (currentData.length > streamConfig.maxDataPoints) {
                currentData.splice(0, currentData.length - streamConfig.maxDataPoints);
              }

              dataset.data = currentData;
            });
          });

          return newData;
        });

        // Clear buffer
        dataBufferRef.current = [];

        const endTime = performance.now();
        setPerformanceMetrics(prev => ({
          ...prev,
          updateTime: endTime - startTime,
        }));

        onDataUpdate?.(realTimeData);
        updatePerformanceMetrics();
      }, [streamConfig.maxDataPoints, onDataUpdate, realTimeData, updatePerformanceMetrics]);

      // WebSocket connection
      const connectWebSocket = useCallback(() => {
        if (!websocketUrl) return;

        try {
          websocketRef.current = new WebSocket(websocketUrl);

          websocketRef.current.onopen = () => {
            setIsStreaming(true);
          };

          websocketRef.current.onmessage = event => {
            try {
              const data = JSON.parse(event.data);
              dataBufferRef.current.push(Array.isArray(data) ? data : [data]);
            } catch (error) {
              console.error('Error parsing WebSocket data:', error);
            }
          };

          websocketRef.current.onclose = () => {
            setIsStreaming(false);
          };

          websocketRef.current.onerror = error => {
            console.error('WebSocket error:', error);
            setIsStreaming(false);
          };
        } catch (error) {
          console.error('Error connecting to WebSocket:', error);
        }
      }, [websocketUrl]);

      // Polling data source
      const startPolling = useCallback(() => {
        if (!dataSource) return;

        intervalRef.current = setInterval(async () => {
          try {
            const newData = await dataSource();
            if (newData && newData.length > 0) {
              dataBufferRef.current.push(newData);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }, streamConfig.interval);

        setIsStreaming(true);
      }, [dataSource, streamConfig.interval]);

      // Start streaming
      const startStreaming = useCallback(() => {
        if (websocketUrl) {
          connectWebSocket();
        } else if (dataSource) {
          startPolling();
        }
      }, [websocketUrl, dataSource, connectWebSocket, startPolling]);

      // Stop streaming
      const stopStreaming = useCallback(() => {
        setIsStreaming(false);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        if (websocketRef.current) {
          websocketRef.current.close();
          websocketRef.current = null;
        }
      }, []);

      // Process buffer at regular intervals
      useEffect(() => {
        const bufferInterval = setInterval(processDataBuffer, streamConfig.interval / 4);
        return () => clearInterval(bufferInterval);
      }, [processDataBuffer, streamConfig.interval]);

      // Auto-start streaming
      useEffect(() => {
        if (dataSource || websocketUrl) {
          startStreaming();
        }

        return () => {
          stopStreaming();
        };
      }, [dataSource, websocketUrl, startStreaming, stopStreaming]);

      // Render content with real-time optimizations
      const renderContent = useCallback(
        ({ scales, colors, datasets: renderedDatasets, handlers }) => {
          if (!renderedDatasets.length) return null;

          return renderedDatasets.map((dataset, datasetIndex) => {
            const color = dataset.color || colors[datasetIndex];
            const points =
              dataset.data?.map((point, i) => ({
                x: scales.xScale(i, dataset.data?.length),
                y: scales.yScale(point.value),
                timestamp: point.timestamp,
              })) || [];

            // Generate path with performance optimization
            const path =
              points.length > 1 ? `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}` : '';

            return (
              <g key={`realtime-dataset-${datasetIndex}`}>
                {/* Animated line with gradient */}
                <defs>
                  <linearGradient id={`gradient-${datasetIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.1" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Main line */}
                <path
                  d={path}
                  stroke={`url(#gradient-${datasetIndex})`}
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data points with pulse animation for latest */}
                {dataset.data?.map((point, i) => {
                  const x = scales.xScale(i, dataset.data?.length);
                  const y = scales.yScale(point.value);
                  const isLatest = i === (dataset.data?.length || 0) - 1;

                  return (
                    <g key={`point-${i}`}>
                      {isLatest && (
                        <circle cx={x} cy={y} r="8" fill={color} opacity="0.3">
                          <animate
                            attributeName="r"
                            values="4;12;4"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.8;0.1;0.8"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r="3"
                        fill={color}
                        stroke="white"
                        strokeWidth="1"
                        onClick={() => handlers.onDataPointClick?.(point, datasetIndex, i)}
                        style={{ cursor: 'pointer' }}
                      />
                    </g>
                  );
                })}
              </g>
            );
          });
        },
        []
      );

      return (
        <Chart
          ref={ref}
          type="line"
          datasets={realTimeData}
          config={config}
          title={`Real-time Chart ${isStreaming ? '🔴 LIVE' : '⏸️ PAUSED'}`}
          showToolbar
          enableRefresh
          onRefresh={startStreaming}
          {...props}
        >
          <ChartRenderer
            datasets={realTimeData}
            config={config}
            renderContent={renderContent}
            enableRealTime
            enablePerformanceOptimization
          />

          {/* Performance overlay */}
          {enablePerformanceMonitoring && (
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace',
              }}
            >
              <div>FPS: {performanceMetrics.fps}</div>
              <div>Update: {performanceMetrics.updateTime.toFixed(2)}ms</div>
              <div>Points: {performanceMetrics.dataPoints}</div>
              <div>Status: {isStreaming ? 'STREAMING' : 'STOPPED'}</div>
            </div>
          )}

          {/* Streaming controls */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              display: 'flex',
              gap: '8px',
            }}
          >
            <button
              onClick={isStreaming ? stopStreaming : startStreaming}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                background: isStreaming ? '#ef4444' : '#10b981',
                color: 'white',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {isStreaming ? 'Stop' : 'Start'}
            </button>

            <button
              onClick={() => setRealTimeData([])}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                background: '#6b7280',
                color: 'white',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Clear
            </button>
          </div>
        </Chart>
      );
    }
  )
);

RealTimeChart.displayName = 'RealTimeChart';
export default RealTimeChart;
export type { RealTimeChartProps };
