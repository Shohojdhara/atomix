import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  validatePath,
  validateComponentName,
  validateThemeName,
  sanitizeInput,
  isValidColor,
  checkNodeVersion,
  formatFileSize
} from '../utils.js';
import { join, resolve } from 'path';

describe('CLI Utils', () => {
  describe('validatePath', () => {
    const basePath = '/home/user/project';

    it('should validate safe paths within project', () => {
      const result = validatePath('src/components', basePath);
      expect(result.isValid).toBe(true);
      expect(result.safePath).toBe(resolve(basePath, 'src/components'));
    });

    it('should reject paths outside project directory', () => {
      const result = validatePath('../../etc/passwd', basePath);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('outside the project directory');
    });

    it('should reject paths to sensitive files', () => {
      const sensitiveFiles = ['.env', '.git/config', 'private/key.pem', 'secret.key'];
      
      sensitiveFiles.forEach(file => {
        const result = validatePath(file, basePath);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('sensitive path');
      });
    });

    it('should handle absolute paths correctly', () => {
      const absolutePath = join(basePath, 'src/components');
      const result = validatePath(absolutePath, basePath);
      expect(result.isValid).toBe(true);
      expect(result.safePath).toBe(absolutePath);
    });
  });

  describe('validateComponentName', () => {
    it('should accept valid PascalCase names', () => {
      const validNames = ['Button', 'CardHeader', 'MyComponent123'];
      
      validNames.forEach(name => {
        const result = validateComponentName(name);
        expect(result.isValid).toBe(true);
      });
    });

    it('should reject invalid component names', () => {
      const invalidNames = [
        'button', // lowercase
        'Button-Test', // contains hyphen
        'Button_Test', // contains underscore
        '123Button', // starts with number
        'A', // too short
        '', // empty
      ];
      
      invalidNames.forEach(name => {
        const result = validateComponentName(name);
        expect(result.isValid).toBe(false);
      });
    });

    it('should reject reserved words', () => {
      const reserved = ['Component', 'React', 'Fragment'];
      
      reserved.forEach(name => {
        const result = validateComponentName(name);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('reserved word');
      });
    });
  });

  describe('validateThemeName', () => {
    it('should accept valid kebab-case names', () => {
      const validNames = ['dark-theme', 'light-mode', 'custom-theme-2'];
      
      validNames.forEach(name => {
        const result = validateThemeName(name);
        expect(result.isValid).toBe(true);
      });
    });

    it('should reject invalid theme names', () => {
      const invalidNames = [
        'DarkTheme', // PascalCase
        'dark_theme', // underscore
        '123-theme', // starts with number
        'theme-', // ends with hyphen
        'theme--dark', // consecutive hyphens
        '', // empty
      ];
      
      invalidNames.forEach(name => {
        const result = validateThemeName(name);
        expect(result.isValid).toBe(false);
      });
    });
  });

  describe('sanitizeInput', () => {
    it('should remove dangerous shell characters', () => {
      const dangerous = 'test; rm -rf /';
      const sanitized = sanitizeInput(dangerous);
      expect(sanitized).toBe('test rm -rf /');
      expect(sanitized).not.toContain(';');
    });

    it('should remove multiple dangerous characters', () => {
      const input = 'cmd1 && cmd2 | cmd3 `evil` $var > file < input \\ ';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe('cmd1  cmd2  cmd3 evil var  file  input');
    });

    it('should handle non-string inputs', () => {
      expect(sanitizeInput(123)).toBe('123');
      expect(sanitizeInput(null)).toBe('null');
      expect(sanitizeInput(undefined)).toBe('undefined');
    });
  });

  describe('isValidColor', () => {
    it('should validate hex colors', () => {
      const validHex = ['#FFF', '#FFFF', '#FFFFFF', '#FFFFFFFF', '#abc123'];
      
      validHex.forEach(color => {
        expect(isValidColor(color)).toBe(true);
      });
    });

    it('should validate CSS color functions', () => {
      const validFunctions = [
        'rgb(255, 255, 255)',
        'rgba(0, 0, 0, 0.5)',
        'hsl(120, 100%, 50%)',
        'hsla(240, 100%, 50%, 0.3)',
        'var(--atomix-color-primary)',
      ];
      
      validFunctions.forEach(color => {
        expect(isValidColor(color)).toBe(true);
      });
    });

    it('should reject invalid colors', () => {
      const invalid = ['#GGG', '#12', 'red', '255,255,255', 'notacolor'];
      
      invalid.forEach(color => {
        expect(isValidColor(color)).toBe(false);
      });
    });
  });

  describe('checkNodeVersion', () => {
    it('should check Node version compatibility', () => {
      const currentVersion = process.version.substring(1);
      const [major, minor, patch] = currentVersion.split('.').map(Number);
      
      // Should pass for current version
      const result1 = checkNodeVersion(currentVersion);
      expect(result1.compatible).toBe(true);
      
      // Should fail for higher version
      const higherVersion = `${major + 1}.0.0`;
      const result2 = checkNodeVersion(higherVersion);
      expect(result2.compatible).toBe(false);
      
      // Should pass for lower version
      if (major > 0) {
        const lowerVersion = `${major - 1}.0.0`;
        const result3 = checkNodeVersion(lowerVersion);
        expect(result3.compatible).toBe(true);
      }
    });
  });

  describe('formatFileSize', () => {
    it('should format file sizes correctly', () => {
      expect(formatFileSize(0)).toBe('0 B');
      expect(formatFileSize(512)).toBe('512.00 B');
      expect(formatFileSize(1024)).toBe('1.00 KB');
      expect(formatFileSize(1048576)).toBe('1.00 MB');
      expect(formatFileSize(1073741824)).toBe('1.00 GB');
    });

    it('should handle decimal values', () => {
      expect(formatFileSize(1536)).toBe('1.50 KB'); // 1.5 KB
      expect(formatFileSize(2621440)).toBe('2.50 MB'); // 2.5 MB
    });
  });
});
