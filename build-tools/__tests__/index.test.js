import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectBuildTool, getIntegration, initAutoIntegration } from '../index.js';
import fs from 'fs';

// Mock fs for detectBuildTool tests
vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      ...actual.default,
      existsSync: vi.fn(),
      readFileSync: vi.fn(),
    },
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  };
});

describe('Build-Tools Index (index.js)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('detectBuildTool', () => {
    it('should detect vite when it is in devDependencies', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify({
        devDependencies: { vite: '^5.0.0' },
      }));

      expect(detectBuildTool()).toBe('vite');
    });

    it('should detect webpack when it is in dependencies', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify({
        dependencies: { webpack: '^5.0.0' },
      }));

      expect(detectBuildTool()).toBe('webpack');
    });

    it('should detect rollup', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify({
        devDependencies: { rollup: '^4.0.0' },
      }));

      expect(detectBuildTool()).toBe('rollup');
    });

    it('should return null when no build tool is detected', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify({
        dependencies: { react: '^18.0.0' },
      }));

      expect(detectBuildTool()).toBeNull();
    });

    it('should return null when package.json does not exist', () => {
      fs.existsSync.mockReturnValue(false);

      expect(detectBuildTool()).toBeNull();
    });

    it('should prioritize vite over webpack when both exist', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify({
        devDependencies: { vite: '^5.0.0', webpack: '^5.0.0' },
      }));

      expect(detectBuildTool()).toBe('vite');
    });

    it('should handle malformed package.json gracefully', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue('not valid json');

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(detectBuildTool()).toBeNull();
      consoleSpy.mockRestore();
    });
  });

  describe('getIntegration', () => {
    it('should return a plugin object for "vite"', () => {
      const result = getIntegration('vite');
      expect(result).toBeDefined();
      expect(result.name).toBe('atomix');
    });

    it('should return a function for "webpack"', () => {
      const result = getIntegration('webpack');
      expect(typeof result).toBe('function');
    });

    it('should return a plugin object for "rollup"', () => {
      const result = getIntegration('rollup');
      expect(result).toBeDefined();
      expect(result.name).toBe('atomix');
    });

    it('should return null for unknown build tool', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const result = getIntegration('parcel');
      expect(result).toBeNull();
      consoleSpy.mockRestore();
    });

    it('should return null for null build tool', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const result = getIntegration(null);
      expect(result).toBeNull();
      consoleSpy.mockRestore();
    });

    it('should be case-insensitive', () => {
      const result = getIntegration('VITE');
      expect(result).toBeDefined();
      expect(result.name).toBe('atomix');
    });
  });

  describe('initAutoIntegration', () => {
    it('should return null when no build tool detected', () => {
      fs.existsSync.mockReturnValue(false);
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const result = initAutoIntegration();
      expect(result).toBeNull();

      warnSpy.mockRestore();
    });
  });
});
