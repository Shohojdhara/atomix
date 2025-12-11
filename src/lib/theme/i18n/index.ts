/**
 * Internationalization (i18n) Module
 * 
 * Provides internationalization utilities for the theme system
 */

export * from './rtl';
export { RTLManager, createRTLManager, isRTLLocale, getDirectionFromLocale, rtlCSS } from './rtl';
export type { RTLConfig } from './rtl';
