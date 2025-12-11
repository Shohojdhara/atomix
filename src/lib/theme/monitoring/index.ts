/**
 * Theme Monitoring and Analytics Module
 */

export * from './ThemeAnalytics';
export {
  ThemeAnalytics,
  createThemeAnalytics,
  getGlobalAnalytics,
  setGlobalAnalytics,
} from './ThemeAnalytics';
export type {
  ThemeAnalyticsEvent,
  ThemeAnalyticsEventData,
  PerformanceMetric,
  AnalyticsConfig,
} from './ThemeAnalytics';
