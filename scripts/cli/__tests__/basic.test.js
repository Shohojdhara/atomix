/**
 * Basic CLI Tests - Core Functionality
 */

import { describe, it, expect } from 'vitest';
import { 
  validatePath,
  validateComponentName,
  validateThemeName,
  sanitizeInput,
  AtomixCLIError
} from '../utils.js';

describe('CLI Core Utils', () => {
  describe('validatePath', () => {
    it('should accept valid relative paths', () => {
      const result = validatePath('./src/components', '/project');
      expect(result.isValid).toBe(true);
    });

    it('should reject paths outside project directory', () => {
      const result = validatePath('../../etc/passwd', '/project');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('outside the project directory');
    });

    it('should reject sensitive files', () => {
      const result = validatePath('.env', '/project');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('sensitive path');
    });
  });

  describe('validateComponentName', () => {
    it('should accept valid PascalCase names', () => {
      const validNames = ['Button', 'CardHeader', 'ModalDialog'];
      
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
      const reservedWords = ['Component', 'React', 'Fragment'];
      
      reservedWords.forEach(name => {
        const result = validateComponentName(name);
        expect(result.isValid).toBe(false);
      });
    });
  });

  describe('validateThemeName', () => {
    it('should accept valid kebab-case names', () => {
      const validNames = ['dark-theme', 'light', 'high-contrast'];
      
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
        'command | pipe'
      ];
      
      dangerousInputs.forEach(input => {
        const sanitized = sanitizeInput(input);
        expect(sanitized).not.toMatch(/[;&|`$<>]/);
      });
    });

    it('should preserve safe characters', () => {
      const safeInput = 'Button-Component_123';
      const sanitized = sanitizeInput(safeInput);
      expect(sanitized).toBe(safeInput);
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
