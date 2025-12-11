/**
 * RTL (Right-to-Left) Support Utilities
 * 
 * Provides utilities for managing RTL text direction in themes
 */

import { getLogger } from '../errors';

/**
 * RTL configuration options
 */
export interface RTLConfig {
  /** Enable RTL mode */
  enabled: boolean;
  /** Current direction ('ltr' | 'rtl') */
  direction: 'ltr' | 'rtl';
  /** Data attribute name for direction */
  dataAttribute?: string;
  /** Auto-detect from locale */
  autoDetect?: boolean;
  /** Locale code (e.g., 'ar', 'he', 'fa') */
  locale?: string;
}

/**
 * RTL-aware locales (languages that use RTL)
 */
const RTL_LOCALES = new Set([
  'ar', // Arabic
  'he', // Hebrew
  'fa', // Persian/Farsi
  'ur', // Urdu
  'yi', // Yiddish
  'ji', // Yiddish (alternative)
  'iw', // Hebrew (old code)
  'ku', // Kurdish
  'ps', // Pashto
  'sd', // Sindhi
]);

/**
 * Default RTL configuration
 */
const DEFAULT_RTL_CONFIG: Required<Omit<RTLConfig, 'locale'>> & { locale?: string } = {
  enabled: false,
  direction: 'ltr',
  dataAttribute: 'data-direction',
  autoDetect: false,
  locale: undefined,
};

/**
 * RTL Manager
 * 
 * Manages RTL text direction for the theme system
 */
export class RTLManager {
  private config: Required<Omit<RTLConfig, 'locale'>> & { locale?: string };
  private listeners: Set<(direction: 'ltr' | 'rtl') => void> = new Set();

  constructor(config: Partial<RTLConfig> = {}) {
    this.config = {
      ...DEFAULT_RTL_CONFIG,
      ...config,
      locale: config.locale,
    };

    // Auto-detect if enabled
    if (this.config.autoDetect && !this.config.locale) {
      this.config.locale = this.detectLocale();
    }

    // Determine direction
    if (this.config.enabled) {
      if (this.config.locale && RTL_LOCALES.has(this.config.locale.toLowerCase())) {
        this.config.direction = 'rtl';
      }
    }

    // Apply initial direction
    if (this.config.enabled && typeof document !== 'undefined') {
      this.applyDirection(this.config.direction);
    }
  }

  /**
   * Detect locale from browser
   */
  private detectLocale(): string {
    if (typeof navigator === 'undefined') {
      return 'en';
    }

    // Try navigator.language first
    const lang: string = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    return String(lang).split('-')[0].toLowerCase();
  }

  /**
   * Check if locale is RTL
   */
  isRTLLocale(locale: string): boolean {
    return RTL_LOCALES.has(locale.toLowerCase());
  }

  /**
   * Get current direction
   */
  getDirection(): 'ltr' | 'rtl' {
    return this.config.direction;
  }

  /**
   * Check if RTL is enabled
   */
  isEnabled(): boolean {
    return this.config.enabled;
  }

  /**
   * Set direction
   */
  setDirection(direction: 'ltr' | 'rtl'): void {
    if (this.config.direction === direction) {
      return;
    }

    this.config.direction = direction;
    this.applyDirection(direction);
    this.notifyListeners(direction);
  }

  /**
   * Toggle direction
   */
  toggleDirection(): 'ltr' | 'rtl' {
    const newDirection = this.config.direction === 'ltr' ? 'rtl' : 'ltr';
    this.setDirection(newDirection);
    return newDirection;
  }

  /**
   * Enable RTL
   */
  enable(): void {
    if (this.config.enabled) {
      return;
    }

    this.config.enabled = true;
    this.applyDirection(this.config.direction);
  }

  /**
   * Disable RTL
   */
  disable(): void {
    if (!this.config.enabled) {
      return;
    }

    this.config.enabled = false;
    this.applyDirection('ltr');
  }

  /**
   * Set locale and auto-adjust direction
   */
  setLocale(locale: string): void {
    this.config.locale = locale.toLowerCase();
    
    if (this.config.autoDetect) {
      const isRTL = this.isRTLLocale(locale);
      this.setDirection(isRTL ? 'rtl' : 'ltr');
    }
  }

  /**
   * Get current locale
   */
  getLocale(): string | undefined {
    return this.config.locale;
  }

  /**
   * Apply direction to DOM
   */
  private applyDirection(direction: 'ltr' | 'rtl'): void {
    if (typeof document === 'undefined') {
      return;
    }

    const html = document.documentElement;
    const body = document.body;

    // Set dir attribute
    html.setAttribute('dir', direction);
    body?.setAttribute('dir', direction);

    // Set data attribute
    if (this.config.dataAttribute) {
      html.setAttribute(this.config.dataAttribute, direction);
      body?.setAttribute(this.config.dataAttribute, direction);
    }

    // Set CSS custom property
    html.style.setProperty('--atomix-direction', direction);
    html.style.setProperty('--atomix-text-direction', direction);
  }

  /**
   * Add direction change listener
   */
  onDirectionChange(callback: (direction: 'ltr' | 'rtl') => void): () => void {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Notify listeners of direction change
   */
  private notifyListeners(direction: 'ltr' | 'rtl'): void {
    this.listeners.forEach(callback => {
      try {
        callback(direction);
      } catch (error) {
        const logger = getLogger();
        logger.error(
          'Error in RTL direction change listener',
          error instanceof Error ? error : new Error(String(error)),
          { direction }
        );
      }
    });
  }

  /**
   * Get RTL-aware value
   * 
   * Returns different values based on direction
   */
  getValue<T>(ltrValue: T, rtlValue: T): T {
    return this.config.direction === 'rtl' ? rtlValue : ltrValue;
  }

  /**
   * Get RTL-aware CSS property
   * 
   * Returns appropriate CSS property based on direction
   */
  getCSSProperty(property: string): string {
    if (this.config.direction === 'rtl') {
      // Map common LTR properties to RTL equivalents
      const rtlMap: Record<string, string> = {
        'left': 'right',
        'right': 'left',
        'margin-left': 'margin-right',
        'margin-right': 'margin-left',
        'padding-left': 'padding-right',
        'padding-right': 'padding-left',
        'border-left': 'border-right',
        'border-right': 'border-left',
        'border-left-width': 'border-right-width',
        'border-right-width': 'border-left-width',
        'text-align: left': 'text-align: right',
        'text-align: right': 'text-align: left',
      };

      return rtlMap[property] || property;
    }

    return property;
  }

  /**
   * Destroy RTL manager
   */
  destroy(): void {
    this.listeners.clear();
    
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      const body = document.body;
      
      html.removeAttribute('dir');
      html.removeAttribute(this.config.dataAttribute);
      body?.removeAttribute('dir');
      body?.removeAttribute(this.config.dataAttribute);
    }
  }
}

/**
 * Create RTL manager instance
 */
export function createRTLManager(config?: RTLConfig): RTLManager {
  return new RTLManager(config);
}

/**
 * Check if locale is RTL
 */
export function isRTLLocale(locale: string): boolean {
  return RTL_LOCALES.has(locale.toLowerCase());
}

/**
 * Get direction from locale
 */
export function getDirectionFromLocale(locale: string): 'ltr' | 'rtl' {
  return isRTLLocale(locale) ? 'rtl' : 'ltr';
}

/**
 * RTL-aware CSS helper
 * 
 * Returns appropriate CSS based on direction
 */
export function rtlCSS(ltrCSS: string, rtlCSS: string, direction: 'ltr' | 'rtl' = 'ltr'): string {
  return direction === 'rtl' ? rtlCSS : ltrCSS;
}
