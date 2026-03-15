/**
 * Security-focused tests for Atomix CLI
 * Tests path traversal prevention, input sanitization, and security features
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  sanitizeInput, 
  validateSecurePath, 
  validateComponentNameSecure,
  SecurityError,
  RateLimiter
} from '../utils/security.js';
import { filesystem } from '../internal/filesystem.js';

// Mock filesystem operations to avoid actual file I/O
vi.mock('../internal/filesystem.js', () => ({
  filesystem: {
    writeFile: vi.fn(),
    exists: vi.fn()
  }
}));

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('should sanitize filename inputs', () => {
      const malicious = '../../etc/passwd';
      const sanitized = sanitizeInput(malicious, 'filename');
      expect(sanitized).not.toContain('..');
      expect(sanitized).not.toContain('/');
    });

    it('should sanitize component names', () => {
      const malicious = 'Button<script>alert(1)</script>';
      const sanitized = sanitizeInput(malicious, 'componentName');
      expect(sanitized).toBe('ButtonScriptAlert1Script');
      expect(sanitized).toMatch(/^[A-Z][a-zA-Z0-9]*$/);
    });

    it('should sanitize AI prompts', () => {
      const malicious = 'Create a component that executes <script>malicious()</script>';
      const sanitized = sanitizeInput(malicious, 'prompt');
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('</script>');
    });

    it('should handle empty inputs', () => {
      expect(() => sanitizeInput('', 'filename')).toThrow();
    });
  });

  describe('validateSecurePath', () => {
    it('should prevent path traversal attacks', () => {
      const result = validateSecurePath('../../etc/passwd', '/safe/dir');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Path traversal');
    });

    it('should prevent access to system directories', () => {
      const result = validateSecurePath('/etc/passwd', '/safe/dir');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('system directories');
    });

    it('should allow valid relative paths', () => {
      const result = validateSecurePath('./src/components', process.cwd());
      expect(result.isValid).toBe(true);
    });

    it('should allow valid absolute paths within project', () => {
      const result = validateSecurePath(process.cwd() + '/src/components', process.cwd());
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateComponentNameSecure', () => {
    it('should reject malicious component names', () => {
      const maliciousNames = [
        'eval',
        'script',
        'javascript',
        'onload',
        'onerror',
        'Button<script>'
      ];

      maliciousNames.forEach(name => {
        const result = validateComponentNameSecure(name);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('malicious');
      });
    });

    it('should accept valid component names', () => {
      const validNames = [
        'Button',
        'CardHeader',
        'ModalDialog',
        'AccordionItem'
      ];

      validNames.forEach(name => {
        const result = validateComponentNameSecure(name);
        expect(result.isValid).toBe(true);
      });
    });

    it('should reject reserved words', () => {
      const reservedNames = ['Component', 'React', 'Fragment', 'Window'];
      reservedNames.forEach(name => {
        const result = validateComponentNameSecure(name);
        expect(result.isValid).toBe(false);
      });
    });
  });

  describe('RateLimiter', () => {
    let rateLimiter;

    beforeEach(() => {
      rateLimiter = new RateLimiter(2, 1000); // 2 requests per second
    });

    it('should enforce rate limits', () => {
      expect(rateLimiter.checkLimit('user1')).toBe(true);
      expect(rateLimiter.checkLimit('user1')).toBe(true);
      expect(rateLimiter.checkLimit('user1')).toBe(false); // Third request should be blocked
    });

    it('should track different users separately', () => {
      expect(rateLimiter.checkLimit('user1')).toBe(true);
      expect(rateLimiter.checkLimit('user2')).toBe(true);
      expect(rateLimiter.checkLimit('user1')).toBe(true);
      expect(rateLimiter.checkLimit('user2')).toBe(true);
      expect(rateLimiter.checkLimit('user1')).toBe(false);
      expect(rateLimiter.checkLimit('user2')).toBe(false);
    });

    it('should reset after time window', async () => {
      expect(rateLimiter.checkLimit('user1')).toBe(true);
      expect(rateLimiter.checkLimit('user1')).toBe(true);
      expect(rateLimiter.checkLimit('user1')).toBe(false);

      await new Promise(resolve => setTimeout(resolve, 1100)); // Wait longer than time window
      
      expect(rateLimiter.checkLimit('user1')).toBe(true); // Should work again
    });
  });

  describe('Filesystem Security', () => {
    it('should prevent writing to dangerous locations', async () => {
      const dangerousPaths = [
        '/etc/passwd',
        '../../etc/passwd',
        '/root/.ssh/config',
        '../../../../Windows/System32/drivers/etc/hosts'
      ];

      for (const path of dangerousPaths) {
        await expect(filesystem.writeFile(path, 'malicious content'))
          .rejects
          .toThrow(/Security validation failed/);
      }
    });
  });
});

describe('Path Traversal Prevention', () => {
  const testCases = [
    { input: '../../etc/passwd', expected: false },
    { input: '/etc/passwd', expected: false },
    { input: '..\\Windows\\System32', expected: false },
    { input: 'normal/path', expected: true },
    { input: './src/components', expected: true },
    { input: 'src/components/Button', expected: true },
    { input: '../' + process.cwd() + '/src', expected: false }, // Relative traversal
    { input: process.cwd() + '/../../etc', expected: false }, // Absolute traversal
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should ${expected ? 'allow' : 'block'} path: ${input}`, () => {
      const result = validateSecurePath(input, process.cwd());
      expect(result.isValid).toBe(expected);
      
      if (!expected) {
        expect(result.error).toBeDefined();
      }
    });
  });
});

describe('Input Sanitization Edge Cases', () => {
  const edgeCases = [
    { input: null, type: 'filename', shouldThrow: true },
    { input: undefined, type: 'filename', shouldThrow: true },
    { input: '', type: 'filename', shouldThrow: true },
    { input: '   ', type: 'filename', shouldThrow: true },
    { input: 'normal', type: 'filename', expected: 'normal' },
    { input: 'file\x00name', type: 'filename', expected: 'filename' },
    { input: 'file\nname', type: 'filename', expected: 'filename' },
    { input: 'file<script>', type: 'filename', expected: 'filescript' },
  ];

  edgeCases.forEach(({ input, type, expected, shouldThrow }) => {
    it(`should handle ${JSON.stringify(input)} for ${type}`, () => {
      if (shouldThrow) {
        expect(() => sanitizeInput(input, type)).toThrow();
      } else {
        const result = sanitizeInput(input, type);
        expect(result).toBe(expected);
      }
    });
  });
});