/**
 * CLI Utilities Tests
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { 
  validatePath,
  validateComponentName,
  validateThemeName,
  sanitizeInput,
  fileExists,
  AtomixCLIError
} from '../utils.js';
import { mkdtemp, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

describe('CLI Utils', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'atomix-test-'));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('validatePath', () => {
    it('should accept valid relative paths', () => {
      const result = validatePath('./src/components', tempDir);
      expect(result.isValid).toBe(true);
      expect(result.safePath).toContain('src/components');
    });

    it('should reject paths outside project directory', () => {
      const result = validatePath('../../etc/passwd', tempDir);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('outside the project directory');
    });

    it('should reject sensitive files', () => {
      const result = validatePath('.env', tempDir);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('sensitive path');
    });

    it('should handle absolute paths within project', () => {
      const validPath = join(tempDir, 'src', 'components');
      const result = validatePath(validPath, tempDir);
      expect(result.isValid).toBe(true);
    });

    it('should normalize paths correctly', () => {
      const result = validatePath('./src/../src/components', tempDir);
      expect(result.isValid).toBe(true);
      expect(result.safePath).toContain('src/components');
    });
  });

  describe('validateComponentName', () => {
    it('should accept valid PascalCase names', () => {
      const validNames = ['Button', 'CardHeader', 'ModalDialog', 'FormInput'];
      
      validNames.forEach(name => {
        const result = validateComponentName(name);
        expect(result.isValid).toBe(true);
      });
    });

    it('should reject invalid names', () => {
      const invalidNames = ['button', 'button-primary', 'Button-Primary', '123Button', ''];
      
      invalidNames.forEach(name => {
        const result = validateComponentName(name);
        expect(result.isValid).toBe(false);
      });
    });

    it('should reject reserved words', () => {
      const reservedWords = ['Component', 'React', 'Fragment', 'Suspense'];
      
      reservedWords.forEach(name => {
        const result = validateComponentName(name);
        expect(result.isValid).toBe(false);
      });
    });
  });

  describe('validateThemeName', () => {
    it('should accept valid kebab-case names', () => {
      const validNames = ['dark-theme', 'light', 'high-contrast', 'custom-brand'];
      
      validNames.forEach(name => {
        const result = validateThemeName(name);
        expect(result.isValid).toBe(true);
      });
    });

    it('should reject invalid theme names', () => {
      const invalidNames = ['DarkTheme', 'theme_dark', 'Theme-Dark', '123theme', ''];
      
      invalidNames.forEach(name => {
        const result = validateThemeName(name);
        expect(result.isValid).toBe(false);
      });
    });
  });

  describe('sanitizeInput', () => {
    it('should remove dangerous shell characters', () => {
      const dangerousInputs = [
        'test; rm -rf /',
        'input && malicious-command',
        'command | pipe',
        '`substitution`',
        '$(command)',
        'input > /dev/null',
        '"quoted string"',
        "'single quoted'",
        'mixed "quotes\''
      ];
      
      dangerousInputs.forEach(input => {
        const sanitized = sanitizeInput(input);
        expect(sanitized).not.toMatch(/[;&|`$<>\\'"]/);
      });
    });

    it('should preserve safe characters', () => {
      const safeInput = 'Button-Component_123';
      const sanitized = sanitizeInput(safeInput);
      expect(sanitized).toBe(safeInput);
    });
  });

  describe('fileExists', () => {
    it('should return true for existing files', async () => {
      const testFile = join(tempDir, 'test.txt');
      await writeFile(testFile, 'test content');
      
      const exists = await fileExists(testFile);
      expect(exists).toBe(true);
    });

    it('should return false for non-existing files', async () => {
      const nonExistent = join(tempDir, 'nonexistent.txt');
      const exists = await fileExists(nonExistent);
      expect(exists).toBe(false);
    });
  });

  describe('AtomixCLIError', () => {
    it('should create error with code and suggestions', () => {
      const suggestions = ['Use PascalCase', 'Start with letter'];
      const error = new AtomixCLIError('Invalid name', 'INVALID_NAME', suggestions);
      
      expect(error.message).toBe('Invalid name');
      expect(error.code).toBe('INVALID_NAME');
      expect(error.suggestions).toEqual(suggestions);
      expect(error.name).toBe('AtomixCLIError');
    });
  });
});
