/**
 * Theme Cache
 * 
 * Performance caching layer for loaded themes (CSS and JS)
 */

import type { Theme } from '../types';
import { DEFAULT_CACHE_CONFIG } from '../constants';

/**
 * Cache entry for CSS theme
 */
interface CSSCacheEntry {
  type: 'css' | 'js';
  themeId: string;
  cssContent?: string;
  loaded: boolean;
  loading: Promise<void> | null;
  timestamp: number;
}

/**
 * Cache entry for JS theme
 */
interface JSCacheEntry {
  type: 'js';
  themeId: string;
  theme: Theme;
  loaded: boolean;
  timestamp: number;
}

type CacheEntry = CSSCacheEntry | JSCacheEntry;

/**
 * Theme cache configuration
 */
interface CacheConfig {
  /** Maximum cache size (number of themes) */
  maxSize?: number;
  /** Cache TTL in milliseconds (0 = no expiration) */
  ttl?: number;
  /** Enable cache */
  enabled?: boolean;
}

/**
 * Default cache configuration
 */
const DEFAULT_CONFIG: Required<CacheConfig> = {
  ...DEFAULT_CACHE_CONFIG,
  enabled: true,
};

/**
 * Theme Cache
 * 
 * Manages caching of loaded themes for performance optimization
 */
export class ThemeCache {
  private cache: Map<string, CacheEntry> = new Map();
  private config: Required<CacheConfig>;
  private accessOrder: string[] = []; // For LRU eviction

  constructor(config: CacheConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Get cached CSS theme
   */
  getCSS(themeId: string): CSSCacheEntry | null {
    if (!this.config.enabled) {
      return null;
    }

    const entry = this.cache.get(themeId);
    if (!entry || entry.type !== 'css') {
      return null;
    }

    // Check TTL
    if (this.config.ttl > 0) {
      const age = Date.now() - entry.timestamp;
      if (age > this.config.ttl) {
        this.cache.delete(themeId);
        this.removeFromAccessOrder(themeId);
        return null;
      }
    }

    // Update access order (LRU)
    this.updateAccessOrder(themeId);

    return entry;
  }

  /**
   * Get cached JS theme
   */
  getJS(themeId: string): JSCacheEntry | null {
    if (!this.config.enabled) {
      return null;
    }

    const entry = this.cache.get(themeId);
    if (!entry || entry.type !== 'js') {
      return null;
    }

    // Check TTL
    if (this.config.ttl > 0) {
      const age = Date.now() - entry.timestamp;
      if (age > this.config.ttl) {
        this.cache.delete(themeId);
        this.removeFromAccessOrder(themeId);
        return null;
      }
    }

    // Update access order (LRU)
    this.updateAccessOrder(themeId);

    return entry as JSCacheEntry;
  }

  /**
   * Set CSS theme cache entry
   */
  setCSS(themeId: string, entry: Partial<CSSCacheEntry>): void {
    if (!this.config.enabled) {
      return;
    }

    // Evict if needed
    this.evictIfNeeded();

    const existing = this.cache.get(themeId);
    const cacheEntry: CSSCacheEntry = {
      type: 'css',
      themeId,
      loaded: false,
      loading: null,
      timestamp: Date.now(),
      ...existing,
      ...entry,
    };

    this.cache.set(themeId, cacheEntry);
    this.updateAccessOrder(themeId);
  }

  /**
   * Set JS theme cache entry
   */
  setJS(themeId: string, theme: Theme): void {
    if (!this.config.enabled) {
      return;
    }

    // Evict if needed
    this.evictIfNeeded();

    const cacheEntry: JSCacheEntry = {
      type: 'js',
      themeId,
      theme,
      loaded: true,
      timestamp: Date.now(),
    };

    this.cache.set(themeId, cacheEntry);
    this.updateAccessOrder(themeId);
  }

  /**
   * Check if theme is cached
   */
  has(themeId: string): boolean {
    if (!this.config.enabled) {
      return false;
    }

    const entry = this.cache.get(themeId);
    if (!entry) {
      return false;
    }

    // Check TTL
    if (this.config.ttl > 0) {
      const age = Date.now() - entry.timestamp;
      if (age > this.config.ttl) {
        this.cache.delete(themeId);
        this.removeFromAccessOrder(themeId);
        return false;
      }
    }

    return true;
  }

  /**
   * Remove theme from cache
   */
  delete(themeId: string): boolean {
    const deleted = this.cache.delete(themeId);
    if (deleted) {
      this.removeFromAccessOrder(themeId);
    }
    return deleted;
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    cssThemes: number;
    jsThemes: number;
  } {
    let cssThemes = 0;
    let jsThemes = 0;

    for (const entry of this.cache.values()) {
      if (entry.type === 'css') {
        cssThemes++;
      } else {
        jsThemes++;
      }
    }

    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      cssThemes,
      jsThemes,
    };
  }

  /**
   * Update access order for LRU
   */
  private updateAccessOrder(themeId: string): void {
    this.removeFromAccessOrder(themeId);
    this.accessOrder.push(themeId);
  }

  /**
   * Remove from access order
   */
  private removeFromAccessOrder(themeId: string): void {
    const index = this.accessOrder.indexOf(themeId);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
  }

  /**
   * Evict least recently used entries if cache is full
   */
  private evictIfNeeded(): void {
    if (this.cache.size < this.config.maxSize) {
      return;
    }

    // Evict least recently used (first in access order)
    while (this.cache.size >= this.config.maxSize && this.accessOrder.length > 0) {
      const lruThemeId = this.accessOrder.shift();
      if (lruThemeId) {
        this.cache.delete(lruThemeId);
      }
    }
  }
}
