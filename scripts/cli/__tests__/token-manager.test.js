/**
 * Token Manager Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  listTokens,
  validateTokens,
  exportTokens,
  importTokens,
  fixTokens,
  setProjectRoot
} from '../token-manager.js';
import { mkdtemp, rm, writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

// Mock dependencies
vi.mock('ora', () => ({
  default: vi.fn(() => ({
    start: vi.fn(() => ({
      succeed: vi.fn(),
      fail: vi.fn(),
      text: ''
    }))
  }))
}));

vi.mock('chalk', () => ({
  default: {
    green: vi.fn((text) => text),
    red: vi.fn((text) => text),
    yellow: vi.fn((text) => text),
    cyan: vi.fn((text) => text),
    gray: vi.fn((text) => text),
    bold: vi.fn((obj) => obj)
  }
}));

describe('Token Manager', () => {
  let tempDir;
  let tokenDir;

  beforeEach(async () => {
    const tmp = await mkdtemp(join(tmpdir(), 'atomix-test-'));
    // Ensure absolute path
    // On some systems/configs tmpdir might return symlinked path or weirdness
    const { resolve } = await import('path');
    tempDir = resolve(tmp);
    
    tokenDir = join(tempDir, 'src', 'styles', '01-settings');
    await mkdir(tokenDir, { recursive: true });
    setProjectRoot(tempDir);
  });

  afterEach(async () => {
    setProjectRoot('');
    await rm(tempDir, { recursive: true, force: true });
    vi.clearAllMocks();
  });

  describe('listTokens', () => {
    it('should list tokens from valid files', async () => {
      // Create test token files
      await writeFile(join(tokenDir, '_settings.colors.scss'), `
$primary-500: #7AFFD7 !default;
$secondary-500: #FF5733 !default;
--atomix-color-primary: #7AFFD7;
--atomix-color-secondary: #FF5733;
      `);

      const result = await listTokens();
      
      expect(result.tokens).toHaveProperty('colors');
      // Check keys inside the category object
      const colorTokens = result.tokens.colors.tokens;
      expect(colorTokens).toHaveProperty('$primary-500');
      expect(colorTokens).toHaveProperty('--atomix-color-primary');
    });

    it('should handle missing files gracefully', async () => {
      const result = await listTokens();
      expect(result.tokens).toEqual({});
      expect(result.categoryCount).toBe(0);
    });
  });

  describe('validateTokens', () => {
    it('should detect hardcoded colors', async () => {
      await writeFile(join(tokenDir, '_settings.colors.scss'), `
$primary: #ffffff !default;
$secondary: #000000 !default;
background: #ff0000; // Hardcoded color
      `);

      const result = await validateTokens();
      
      expect(result.warnings).toContainEqual(
        expect.objectContaining({
          category: 'hardcoded-value',
          file: expect.stringContaining('_settings.colors.scss')
        })
      );
    });

    it('should detect missing !default flags', async () => {
      await writeFile(join(tokenDir, '_settings.colors.scss'), `
$primary: #7AFFD7; // Missing !default
$secondary: #FF5733 !default;
      `);

      const result = await validateTokens();
      
      expect(result.issues).toContainEqual(
        expect.objectContaining({
          category: 'missing-default',
          file: expect.stringContaining('_settings.colors.scss')
        })
      );
    });

    it('should validate naming conventions', async () => {
      await writeFile(join(tokenDir, '_settings.colors.scss'), `
$Invalid-Name: #7AFFD7 !default;
$valid_name: #FF5733 !default;
      `);

      const result = await validateTokens();
      
      expect(result.issues).toContainEqual(
        expect.objectContaining({
          category: 'naming-convention',
          file: expect.stringContaining('_settings.colors.scss')
        })
      );
    });
  });

  describe('exportTokens', () => {
    it('should export tokens as JSON', async () => {
      await writeFile(join(tokenDir, '_settings.colors.scss'), `
$primary-500: #7AFFD7 !default;
--atomix-color-primary: #7AFFD7;
      `);

      const outputPath = join(tempDir, 'tokens.json');
      await exportTokens('json', outputPath);

      const exported = JSON.parse(await readFile(outputPath, 'utf8'));
      expect(exported).toHaveProperty('colors');
      expect(exported.colors).toHaveProperty('$primary-500');
    });

    it('should export tokens as CSS custom properties', async () => {
      await writeFile(join(tokenDir, '_settings.colors.scss'), `
$primary-500: #7AFFD7 !default;
--atomix-color-primary: #7AFFD7;
      `);

      const outputPath = join(tempDir, 'tokens.css');
      await exportTokens('css', outputPath);

      const css = await readFile(outputPath, 'utf8');
      expect(css).toContain('--atomix-color-primary: #7AFFD7');
    });

    it('should export tokens as TypeScript', async () => {
      await writeFile(join(tokenDir, '_settings.colors.scss'), `
$primary-500: #7AFFD7 !default;
--atomix-color-primary: #7AFFD7;
      `);

      const outputPath = join(tempDir, 'tokens.ts');
      await exportTokens('ts', outputPath);

      const ts = await readFile(outputPath, 'utf8');
      expect(ts).toContain('export interface');
      expect(ts).toContain('AtomixTokens');
    });
  });

  describe('importTokens', () => {
    it('should import tokens from JSON', async () => {
      const jsonPath = join(tempDir, 'tokens.json');
      await writeFile(jsonPath, JSON.stringify({
        colors: {
          '$primary-500': '#7AFFD7',
          '--atomix-color-primary': '#7AFFD7'
        }
      }));

      await importTokens(jsonPath);

      // Verify the tokens were written to SCSS files
      const colorsFile = await readFile(join(tokenDir, '_settings.colors.scss'), 'utf8');
      expect(colorsFile).toContain('$primary-500: #7AFFD7 !default');
      expect(colorsFile).toContain('--atomix-color-primary: #7AFFD7');
    });

    it('should import tokens from JavaScript', async () => {
      const jsPath = join(tempDir, 'tokens.js');
      await writeFile(jsPath, `
export const tokens = {
  colors: {
    '$primary-500': '#7AFFD7',
    '--atomix-color-primary': '#7AFFD7'
  }
};
      `);

      await importTokens(jsPath);

      const colorsFile = await readFile(join(tokenDir, '_settings.colors.scss'), 'utf8');
      expect(colorsFile).toContain('$primary-500: #7AFFD7 !default');
    });

    it('should handle malformed JSON gracefully', async () => {
      const jsonPath = join(tempDir, 'invalid.json');
      await writeFile(jsonPath, '{ invalid json }');

      await expect(importTokens(jsonPath)).rejects.toThrow();
    });
  });

  describe('fixTokens', () => {
    it('should add missing !default flags', async () => {
      await writeFile(join(tokenDir, '_settings.colors.scss'), `
$primary: #7AFFD7;
$secondary: #FF5733 !default;
      `);

      await fixTokens();

      const content = await readFile(join(tokenDir, '_settings.colors.scss'), 'utf8');
      expect(content).toContain('$primary: var(--atomix-color-primary) !default');
    });

    it('should convert hardcoded colors to variables', async () => {
      await writeFile(join(tokenDir, '_settings.colors.scss'), `
$primary: #7AFFD7 !default;
background: #ffffff;
      `);

      await fixTokens();

      const content = await readFile(join(tokenDir, '_settings.colors.scss'), 'utf8');
      // Should replace hardcoded colors with variables
      expect(content).toContain('var(--atomix-color-text)');
    });
  });
});
