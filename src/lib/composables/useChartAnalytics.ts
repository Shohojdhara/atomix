import { useCallback, useMemo, useState } from 'react';
import { ChartDataset, ChartDataPoint } from '../types/components';

export interface StatisticalAnalysis {
  mean: number;
  median: number;
  mode: number[];
  standardDeviation: number;
  variance: number;
  min: number;
  max: number;
  range: number;
  quartiles: {
    q1: number;
    q2: number;
    q3: number;
    iqr: number;
  };
  outliers: number[];
  skewness: number;
  kurtosis: number;
}

export interface TrendAnalysis {
  direction: 'increasing' | 'decreasing' | 'stable';
  strength: number; // 0-1
  correlation: number; // -1 to 1
  slope: number;
  intercept: number;
  rSquared: number;
  forecast: ChartDataPoint[];
}

export interface SeasonalityAnalysis {
  hasSeasonality: boolean;
  period: number;
  strength: number;
  peaks: number[];
  troughs: number[];
}

export interface AnomalyDetection {
  anomalies: Array<{
    index: number;
    value: number;
    severity: 'low' | 'medium' | 'high';
    type: 'outlier' | 'trend-break' | 'level-shift';
  }>;
  threshold: number;
  method: 'zscore' | 'iqr' | 'isolation-forest';
}

export interface CorrelationAnalysis {
  correlationMatrix: number[][];
  strongCorrelations: Array<{
    dataset1: number;
    dataset2: number;
    correlation: number;
    significance: number;
  }>;
}

/**
 * Hook for advanced chart data analytics and insights
 */
export function useChartAnalytics(datasets: ChartDataset[]) {
  const [analysisCache, setAnalysisCache] = useState<Map<string, any>>(new Map());

  // Helper function to extract numeric values from dataset
  const extractValues = useCallback((dataset: ChartDataset): number[] => {
    return dataset.data?.map(point => point.value).filter(v => typeof v === 'number') || [];
  }, []);

  // Statistical analysis for a single dataset
  const calculateStatistics = useCallback((values: number[]): StatisticalAnalysis => {
    if (values.length === 0) {
      return {
        mean: 0, median: 0, mode: [], standardDeviation: 0, variance: 0,
        min: 0, max: 0, range: 0,
        quartiles: { q1: 0, q2: 0, q3: 0, iqr: 0 },
        outliers: [], skewness: 0, kurtosis: 0
      };
    }

    const sorted = [...values].sort((a, b) => a - b);
    const n = values.length;
    
    // Basic statistics
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const median = n % 2 === 0 
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 
      : sorted[Math.floor(n / 2)];
    
    // Mode calculation
    const frequency: Record<number, number> = {};
    values.forEach(v => frequency[v] = (frequency[v] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency)
      .filter(k => frequency[Number(k)] === maxFreq)
      .map(Number);
    
    // Variance and standard deviation
    const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / n;
    const standardDeviation = Math.sqrt(variance);
    
    // Range
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    
    // Quartiles
    const q1Index = Math.floor(n * 0.25);
    const q3Index = Math.floor(n * 0.75);
    const q1 = sorted[q1Index];
    const q2 = median;
    const q3 = sorted[q3Index];
    const iqr = q3 - q1;
    
    // Outliers (using IQR method)
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    const outliers = values.filter(v => v < lowerBound || v > upperBound);
    
    // Skewness
    const skewness = values.reduce((acc, v) => acc + Math.pow((v - mean) / standardDeviation, 3), 0) / n;
    
    // Kurtosis
    const kurtosis = values.reduce((acc, v) => acc + Math.pow((v - mean) / standardDeviation, 4), 0) / n - 3;
    
    return {
      mean, median, mode, standardDeviation, variance, min, max, range,
      quartiles: { q1, q2, q3, iqr },
      outliers, skewness, kurtosis
    };
  }, []);

  // Trend analysis using linear regression
  const analyzeTrend = useCallback((values: number[]): TrendAnalysis => {
    if (values.length < 2) {
      return {
        direction: 'stable',
        strength: 0,
        correlation: 0,
        slope: 0,
        intercept: 0,
        rSquared: 0,
        forecast: []
      };
    }

    const n = values.length;
    const x = Array.from({ length: n }, (_, i) => i);
    
    // Linear regression calculations
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, xi, i) => acc + xi * values[i], 0);
    const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0);
    const sumYY = values.reduce((acc, yi) => acc + yi * yi, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Correlation coefficient
    const correlation = (n * sumXY - sumX * sumY) / 
      Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
    
    // R-squared
    const meanY = sumY / n;
    const ssRes = values.reduce((acc, yi, i) => acc + Math.pow(yi - (slope * i + intercept), 2), 0);
    const ssTot = values.reduce((acc, yi) => acc + Math.pow(yi - meanY, 2), 0);
    const rSquared = 1 - (ssRes / ssTot);
    
    // Determine trend direction and strength
    const direction = Math.abs(slope) < 0.01 ? 'stable' : slope > 0 ? 'increasing' : 'decreasing';
    const strength = Math.abs(correlation);
    
    // Generate forecast (next 5 points)
    const forecast: ChartDataPoint[] = Array.from({ length: 5 }, (_, i) => ({
      label: `Forecast ${i + 1}`,
      value: slope * (n + i) + intercept
    }));
    
    return {
      direction,
      strength,
      correlation,
      slope,
      intercept,
      rSquared,
      forecast
    };
  }, []);

  // Seasonality detection using autocorrelation
  const analyzeSeasonality = useCallback((values: number[]): SeasonalityAnalysis => {
    if (values.length < 12) {
      return {
        hasSeasonality: false,
        period: 0,
        strength: 0,
        peaks: [],
        troughs: []
      };
    }

    // Simple autocorrelation for different lags
    const maxLag = Math.min(Math.floor(values.length / 3), 24);
    const autocorrelations: number[] = [];
    
    for (let lag = 1; lag <= maxLag; lag++) {
      let sum = 0;
      let count = 0;
      
      for (let i = lag; i < values.length; i++) {
        sum += values[i] * values[i - lag];
        count++;
      }
      
      autocorrelations.push(count > 0 ? sum / count : 0);
    }
    
    // Find the lag with highest autocorrelation (potential period)
    const maxCorrelation = Math.max(...autocorrelations);
    const period = autocorrelations.indexOf(maxCorrelation) + 1;
    
    // Detect peaks and troughs
    const peaks: number[] = [];
    const troughs: number[] = [];
    
    for (let i = 1; i < values.length - 1; i++) {
      if (values[i] > values[i - 1] && values[i] > values[i + 1]) {
        peaks.push(i);
      } else if (values[i] < values[i - 1] && values[i] < values[i + 1]) {
        troughs.push(i);
      }
    }
    
    return {
      hasSeasonality: maxCorrelation > 0.3,
      period,
      strength: maxCorrelation,
      peaks,
      troughs
    };
  }, []);

  // Anomaly detection using Z-score method
  const detectAnomalies = useCallback((values: number[], threshold = 2.5): AnomalyDetection => {
    const stats = calculateStatistics(values);
    const anomalies: AnomalyDetection['anomalies'] = [];
    
    values.forEach((value, index) => {
      const zScore = Math.abs((value - stats.mean) / stats.standardDeviation);
      
      if (zScore > threshold) {
        let severity: 'low' | 'medium' | 'high' = 'low';
        if (zScore > threshold * 2) severity = 'high';
        else if (zScore > threshold * 1.5) severity = 'medium';
        
        anomalies.push({
          index,
          value,
          severity,
          type: 'outlier'
        });
      }
    });
    
    return {
      anomalies,
      threshold,
      method: 'zscore'
    };
  }, [calculateStatistics]);

  // Correlation analysis between datasets
  const analyzeCorrelations = useCallback((datasets: ChartDataset[]): CorrelationAnalysis => {
    const n = datasets.length;
    const correlationMatrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
    const strongCorrelations: CorrelationAnalysis['strongCorrelations'] = [];
    
    for (let i = 0; i < n; i++) {
      const values1 = extractValues(datasets[i]);
      
      for (let j = 0; j < n; j++) {
        if (i === j) {
          correlationMatrix[i][j] = 1;
          continue;
        }
        
        const values2 = extractValues(datasets[j]);
        const minLength = Math.min(values1.length, values2.length);
        
        if (minLength < 2) {
          correlationMatrix[i][j] = 0;
          continue;
        }
        
        // Calculate Pearson correlation
        const x = values1.slice(0, minLength);
        const y = values2.slice(0, minLength);
        
        const meanX = x.reduce((a, b) => a + b, 0) / minLength;
        const meanY = y.reduce((a, b) => a + b, 0) / minLength;
        
        const numerator = x.reduce((acc, xi, idx) => acc + (xi - meanX) * (y[idx] - meanY), 0);
        const denomX = Math.sqrt(x.reduce((acc, xi) => acc + Math.pow(xi - meanX, 2), 0));
        const denomY = Math.sqrt(y.reduce((acc, yi) => acc + Math.pow(yi - meanY, 2), 0));
        
        const correlation = denomX * denomY !== 0 ? numerator / (denomX * denomY) : 0;
        correlationMatrix[i][j] = correlation;
        
        // Track strong correlations
        if (Math.abs(correlation) > 0.7 && i < j) {
          strongCorrelations.push({
            dataset1: i,
            dataset2: j,
            correlation,
            significance: Math.abs(correlation)
          });
        }
      }
    }
    
    return {
      correlationMatrix,
      strongCorrelations: strongCorrelations.sort((a, b) => b.significance - a.significance)
    };
  }, [extractValues]);

  // Comprehensive analysis for all datasets
  const comprehensiveAnalysis = useMemo(() => {
    const cacheKey = JSON.stringify(datasets.map(d => ({ label: d.label, data: d.data })));
    
    if (analysisCache.has(cacheKey)) {
      return analysisCache.get(cacheKey);
    }
    
    const analysis = {
      statistics: datasets.map(dataset => ({
        dataset: dataset.label,
        stats: calculateStatistics(extractValues(dataset))
      })),
      trends: datasets.map(dataset => ({
        dataset: dataset.label,
        trend: analyzeTrend(extractValues(dataset))
      })),
      seasonality: datasets.map(dataset => ({
        dataset: dataset.label,
        seasonality: analyzeSeasonality(extractValues(dataset))
      })),
      anomalies: datasets.map(dataset => ({
        dataset: dataset.label,
        anomalies: detectAnomalies(extractValues(dataset))
      })),
      correlations: analyzeCorrelations(datasets),
      summary: {
        totalDataPoints: datasets.reduce((sum, d) => sum + (d.data?.length || 0), 0),
        dateRange: datasets[0]?.data?.length ? {
          start: datasets[0].data[0].label,
          end: datasets[0].data[datasets[0].data.length - 1].label
        } : null,
        hasAnomalies: datasets.some(d => detectAnomalies(extractValues(d)).anomalies.length > 0),
        hasSeasonality: datasets.some(d => analyzeSeasonality(extractValues(d)).hasSeasonality),
        strongestTrend: datasets.reduce((strongest, dataset, index) => {
          const trend = analyzeTrend(extractValues(dataset));
          return trend.strength > strongest.strength ? { index, ...trend } : strongest;
        }, { index: -1, strength: 0 })
      }
    };
    
    setAnalysisCache(prev => new Map(prev).set(cacheKey, analysis));
    return analysis;
  }, [datasets, analysisCache, calculateStatistics, extractValues, analyzeTrend, analyzeSeasonality, detectAnomalies, analyzeCorrelations]);

  // Generate insights and recommendations
  const generateInsights = useCallback(() => {
    const insights: string[] = [];
    const { statistics, trends, seasonality, anomalies, correlations, summary } = comprehensiveAnalysis;
    
    // Trend insights
    if (summary.strongestTrend.strength > 0.7) {
      const trendDataset = datasets[summary.strongestTrend.index];
      insights.push(
        `Strong ${summary.strongestTrend.direction} trend detected in "${trendDataset?.label}" (correlation: ${summary.strongestTrend.correlation.toFixed(2)})`
      );
    }
    
    // Seasonality insights
    const seasonalDatasets = seasonality.filter(s => s.seasonality.hasSeasonality);
    if (seasonalDatasets.length > 0) {
      insights.push(
        `Seasonal patterns detected in ${seasonalDatasets.length} dataset(s) with periods ranging from ${Math.min(...seasonalDatasets.map(s => s.seasonality.period))} to ${Math.max(...seasonalDatasets.map(s => s.seasonality.period))}`
      );
    }
    
    // Anomaly insights
    const totalAnomalies = anomalies.reduce((sum, a) => sum + a.anomalies.anomalies.length, 0);
    if (totalAnomalies > 0) {
      insights.push(`${totalAnomalies} anomalies detected across all datasets`);
    }
    
    // Correlation insights
    if (correlations.strongCorrelations.length > 0) {
      const strongest = correlations.strongCorrelations[0];
      insights.push(
        `Strong correlation (${strongest.correlation.toFixed(2)}) found between "${datasets[strongest.dataset1]?.label}" and "${datasets[strongest.dataset2]?.label}"`
      );
    }
    
    // Statistical insights
    const highVariability = statistics.filter(s => s.stats.standardDeviation / Math.abs(s.stats.mean) > 0.5);
    if (highVariability.length > 0) {
      insights.push(`High variability detected in ${highVariability.length} dataset(s)`);
    }
    
    return insights;
  }, [comprehensiveAnalysis, datasets]);

  return {
    // Individual analysis functions
    calculateStatistics,
    analyzeTrend,
    analyzeSeasonality,
    detectAnomalies,
    analyzeCorrelations,
    
    // Comprehensive analysis
    comprehensiveAnalysis,
    generateInsights,
    
    // Utility functions
    extractValues,
    
    // Cache management
    clearCache: () => setAnalysisCache(new Map()),
  };
}