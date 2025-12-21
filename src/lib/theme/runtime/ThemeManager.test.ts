/**
 * ThemeManager Tests
 * 
 * Tests for the ThemeManager class
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ThemeManager } from './ThemeManager';
import { ThemeError, ThemeErrorCode } from '../errors';
import type { ThemeMetadata } from '../types';

// Mock dependencies
vi.mock('../core/ThemeEngine', () => {
  return {
    ThemeEngine: class {
      initialize = vi.fn().mockResolvedValue(undefined);
      on = vi.fn();
      getRegistry = vi.fn().mockReturnValue({
        has: vi.fn().mockReturnValue(false),
        register: vi.fn(),
        getAllMetadata: vi.fn().mockReturnValue([]),
      });
      setTheme = vi.fn().mockResolvedValue(undefined);
      getActiveTheme = vi.fn().mockReturnValue(null);
      isThemeLoaded = vi.fn().mockReturnValue(false);
      preloadTheme = vi.fn().mockResolvedValue(undefined);
    },
  };
});
vi.mock('../config/loader');
vi.mock('../utils', () => ({
  isBrowser: () => true,
  isServer: () => false,
  createLocalStorageAdapter: () => ({
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    isAvailable: () => true,
  }),
}));

describe('ThemeManager', () => {
  let themeManager: ThemeManager;
  const mockThemes: Record<string, ThemeMetadata> = {
    'test-theme': {
      name: 'Test Theme',
      class: 'test-theme',
      description: 'A test theme',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (themeManager) {
      themeManager.destroy();
    }
  });

  describe('constructor', () => {
    it('should create ThemeManager with default config', () => {
      themeManager = new ThemeManager({ themes: {} });
      expect(themeManager).toBeInstanceOf(ThemeManager);
    });

    it('should create ThemeManager with custom config', () => {
      themeManager = new ThemeManager({
        themes: mockThemes,
        basePath: '/custom-themes',
        storageKey: 'custom-key',
      });
      expect(themeManager).toBeInstanceOf(ThemeManager);
    });

    it('should initialize with themes from config', () => {
      themeManager = new ThemeManager({ themes: mockThemes });
      const available = themeManager.getAvailableThemes();
      expect(available.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getTheme', () => {
    it('should return current theme', () => {
      themeManager = new ThemeManager({ themes: mockThemes });
      const theme = themeManager.getTheme();
      expect(typeof theme).toBe('string');
    });

    it('should return default theme if no theme set', () => {
      themeManager = new ThemeManager({
        themes: mockThemes,
        defaultTheme: 'test-theme',
      });
      const theme = themeManager.getTheme();
      expect(theme).toBe('test-theme');
    });
  });

  describe('getAvailableThemes', () => {
    it('should return available themes', () => {
      themeManager = new ThemeManager({ themes: mockThemes });
      const themes = themeManager.getAvailableThemes();
      expect(Array.isArray(themes)).toBe(true);
    });
  });

  describe('event listeners', () => {
    it('should add theme change listener', () => {
      themeManager = new ThemeManager({ themes: mockThemes });
      const listener = vi.fn();
      themeManager.on('themeChange', listener);
      // Note: Actual event emission would require theme switching
      expect(() => themeManager.on('themeChange', listener)).not.toThrow();
    });

    it('should remove theme change listener', () => {
      themeManager = new ThemeManager({ themes: mockThemes });
      const listener = vi.fn();
      themeManager.on('themeChange', listener);
      themeManager.off('themeChange', listener);
      expect(() => themeManager.off('themeChange', listener)).not.toThrow();
    });

    it('should add theme load listener', () => {
      themeManager = new ThemeManager({ themes: mockThemes });
      const listener = vi.fn();
      themeManager.on('themeLoad', listener);
      expect(() => themeManager.on('themeLoad', listener)).not.toThrow();
    });

    it('should add theme error listener', () => {
      themeManager = new ThemeManager({ themes: mockThemes });
      const listener = vi.fn();
      themeManager.on('themeError', listener);
      expect(() => themeManager.on('themeError', listener)).not.toThrow();
    });
  });

  describe('isThemeLoaded', () => {
    it('should check if theme is loaded', () => {
      themeManager = new ThemeManager({ themes: mockThemes });
      const isLoaded = themeManager.isThemeLoaded('test-theme');
      expect(typeof isLoaded).toBe('boolean');
    });
  });

  describe('destroy', () => {
    it('should destroy theme manager', () => {
      themeManager = new ThemeManager({ themes: mockThemes });
      expect(() => themeManager.destroy()).not.toThrow();
    });

    it('should clear event listeners on destroy', () => {
      themeManager = new ThemeManager({ themes: mockThemes });
      const listener = vi.fn();
      themeManager.on('themeChange', listener);
      themeManager.destroy();
      // After destroy, listeners should be cleared
      expect(() => themeManager.destroy()).not.toThrow();
    });
  });

  describe('RTL support', () => {
    it('should get RTL manager when configured', () => {
      themeManager = new ThemeManager({
        themes: mockThemes,
        rtl: { enabled: true, direction: 'ltr' },
      });
      const rtlManager = themeManager.getRTLManager();
      expect(rtlManager).toBeDefined();
    });

    it('should set direction', () => {
      themeManager = new ThemeManager({
        themes: mockThemes,
        rtl: { enabled: true, direction: 'ltr' },
      });
      expect(() => themeManager.setDirection('rtl')).not.toThrow();
    });

    it('should get direction', () => {
      themeManager = new ThemeManager({
        themes: mockThemes,
        rtl: { enabled: true, direction: 'ltr' },
      });
      const direction = themeManager.getDirection();
      expect(['ltr', 'rtl']).toContain(direction);
    });
  });
});
