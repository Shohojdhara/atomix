/**
 * ThemeEngine Tests
 * 
 * Tests for the ThemeEngine class
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ThemeEngine } from './ThemeEngine';
import { ThemeError, ThemeErrorCode } from '../errors';

// Mock dependencies
vi.mock('./ThemeRegistry');
vi.mock('./ThemeCache');
vi.mock('./ThemeValidator');
vi.mock('../utils', () => ({
  isBrowser: () => true,
  isServer: () => false,
  loadThemeCSS: vi.fn().mockResolvedValue(undefined),
  removeThemeCSS: vi.fn(),
  applyThemeAttributes: vi.fn(),
}));
vi.mock('../generateCSSVariables', () => ({
  generateCSSVariables: vi.fn().mockReturnValue(':root { --test: value; }'),
  injectCSS: vi.fn(),
  removeInjectedCSS: vi.fn(),
}));

describe('ThemeEngine', () => {
  let engine: ThemeEngine;

  beforeEach(() => {
    vi.clearAllMocks();
    engine = new ThemeEngine({
      basePath: '/themes',
      dataAttribute: 'data-theme',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create ThemeEngine with default config', () => {
      const defaultEngine = new ThemeEngine();
      expect(defaultEngine).toBeInstanceOf(ThemeEngine);
    });

    it('should create ThemeEngine with custom config', () => {
      const customEngine = new ThemeEngine({
        basePath: '/custom',
        useMinified: true,
        enableCache: false,
      });
      expect(customEngine).toBeInstanceOf(ThemeEngine);
    });
  });

  describe('initialize', () => {
    it('should initialize engine', async () => {
      await expect(engine.initialize()).resolves.not.toThrow();
    });
  });

  describe('getCurrentTheme', () => {
    it('should return null when no theme is set', () => {
      expect(engine.getCurrentTheme()).toBeNull();
    });
  });

  describe('getActiveTheme', () => {
    it('should return null when no theme is active', () => {
      expect(engine.getActiveTheme()).toBeNull();
    });
  });

  describe('isThemeLoaded', () => {
    it('should return false for unloaded theme', () => {
      expect(engine.isThemeLoaded('non-existent')).toBe(false);
    });
  });

  describe('event listeners', () => {
    it('should add change listener', () => {
      const listener = vi.fn();
      engine.on('change', listener);
      expect(() => engine.on('change', listener)).not.toThrow();
    });

    it('should remove change listener', () => {
      const listener = vi.fn();
      engine.on('change', listener);
      engine.off('change', listener);
      expect(() => engine.off('change', listener)).not.toThrow();
    });

    it('should add load listener', () => {
      const listener = vi.fn();
      engine.on('load', listener);
      expect(() => engine.on('load', listener)).not.toThrow();
    });

    it('should add error listener', () => {
      const listener = vi.fn();
      engine.on('error', listener);
      expect(() => engine.on('error', listener)).not.toThrow();
    });

    it('should add revert listener', () => {
      const listener = vi.fn();
      engine.on('revert', listener);
      expect(() => engine.on('revert', listener)).not.toThrow();
    });
  });

  describe('failed themes tracking', () => {
    it('should clear failed themes', () => {
      engine.clearFailedThemes();
      expect(() => engine.clearFailedThemes()).not.toThrow();
    });

    it('should clear specific failed theme', () => {
      engine.clearFailedTheme('test-theme');
      expect(() => engine.clearFailedTheme('test-theme')).not.toThrow();
    });

    it('should check if theme has failed', () => {
      const hasFailed = engine.hasFailedTheme('test-theme');
      expect(typeof hasFailed).toBe('boolean');
    });
  });

  describe('getRegistry', () => {
    it('should return registry instance', () => {
      const registry = engine.getRegistry();
      expect(registry).toBeDefined();
    });
  });

  describe('getCache', () => {
    it('should return cache instance', () => {
      const cache = engine.getCache();
      expect(cache).toBeDefined();
    });
  });
});
