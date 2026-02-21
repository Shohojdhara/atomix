import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  filterComponents,
  removeAtomImports,
  shouldProcessFile,
  getAvailableThemes,
  createLogger,
  generateThemeModule,
  applyThemeToCSS,
} from '../utils.js';

describe('Shared Utilities (utils.js)', () => {
  describe('filterComponents', () => {
    const sampleCode = `
      import { Button, Card, Input } from '@shohojdhara/atomix/components';
      export default function App() {}
    `;

    it('should keep only selected components', () => {
      const result = filterComponents(sampleCode, ['Button'], false);
      expect(result).toContain('Button');
      expect(result).not.toContain('Card');
      expect(result).not.toContain('Input');
    });

    it('should keep Atom-prefixed imports when includeAtoms is true', () => {
      const code = `import { Button, AtomIcon } from '@shohojdhara/atomix/components';`;
      const result = filterComponents(code, ['Button'], true);
      expect(result).toContain('Button');
      expect(result).toContain('AtomIcon');
    });

    it('should return empty string when no components match', () => {
      const result = filterComponents(sampleCode, ['NonExistent'], false);
      expect(result).not.toContain('import');
      expect(result).not.toContain('Button');
    });

    it('should not modify non-Atomix imports', () => {
      const code = `import { useState } from 'react';`;
      const result = filterComponents(code, ['Button'], false);
      expect(result).toBe(code);
    });

    it('should handle multiple import statements', () => {
      const code = `
        import { Button } from '@shohojdhara/atomix/components';
        import { Card } from '@shohojdhara/atomix/components';
      `;
      const result = filterComponents(code, ['Button'], false);
      expect(result).toContain('Button');
      expect(result).not.toContain('Card');
    });
  });

  describe('removeAtomImports', () => {
    it('should remove atom imports', () => {
      const code = `
        import { Button } from '@shohojdhara/atomix/components';
        import { AtomButton } from '@shohojdhara/atomix/atoms';
      `;
      const result = removeAtomImports(code);
      expect(result).toContain('Button');
      expect(result).not.toContain('AtomButton');
    });

    it('should leave non-atom imports intact', () => {
      const code = `import { Button } from '@shohojdhara/atomix/components';`;
      const result = removeAtomImports(code);
      expect(result).toContain('Button');
    });
  });

  describe('shouldProcessFile', () => {
    it('should return true for files importing @shohojdhara/atomix', () => {
      expect(shouldProcessFile('/src/App.js', "import { Button } from '@shohojdhara/atomix';")).toBe(true);
    });

    it('should return true for files inside atomix node_modules', () => {
      expect(shouldProcessFile('/project/node_modules/@shohojdhara/atomix/Button.js', '')).toBe(true);
    });

    it('should return false for unrelated files', () => {
      expect(shouldProcessFile('/src/App.js', 'console.log("hello");')).toBe(false);
    });

    it('should NOT match files that merely contain "atomix" in their path', () => {
      // This was a bug in the old implementation
      expect(shouldProcessFile('/my-atomix-app/src/App.js', 'console.log("hello");')).toBe(false);
    });
  });

  describe('getAvailableThemes', () => {
    it('should return empty array when path is null', () => {
      expect(getAvailableThemes(null)).toEqual([]);
    });

    it('should return empty array when path is undefined', () => {
      expect(getAvailableThemes(undefined)).toEqual([]);
    });

    it('should return empty array for non-existent path', () => {
      expect(getAvailableThemes('/nonexistent/path')).toEqual([]);
    });
  });

  describe('createLogger', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = {
        log: vi.spyOn(console, 'log').mockImplementation(() => {}),
        warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
        error: vi.spyOn(console, 'error').mockImplementation(() => {}),
      };
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should log messages when verbose is true', () => {
      const log = createLogger('[Test]', true);
      log.log('hello');
      expect(consoleSpy.log).toHaveBeenCalledWith('[Test] hello');
    });

    it('should NOT log messages when verbose is false', () => {
      const log = createLogger('[Test]', false);
      log.log('hello');
      expect(consoleSpy.log).not.toHaveBeenCalled();
    });

    it('should always emit warnings regardless of verbose flag', () => {
      const log = createLogger('[Test]', false);
      log.warn('danger');
      expect(consoleSpy.warn).toHaveBeenCalledWith('[Test] danger');
    });

    it('should always emit errors regardless of verbose flag', () => {
      const log = createLogger('[Test]', false);
      log.error('failure');
      expect(consoleSpy.error).toHaveBeenCalled();
    });
  });

  describe('generateThemeModule', () => {
    it('should return error module when atomixRoot is null', () => {
      const result = generateThemeModule('dark', null);
      expect(result).toContain('Error generating theme module');
    });
  });

  describe('applyThemeToCSS', () => {
    it('should return comment fallback when theme cannot be loaded', () => {
      const result = applyThemeToCSS('body { color: red; }', 'missing', null);
      expect(result).toContain('Error loading theme CSS');
      expect(result).toContain('body { color: red; }');
    });
  });
});
