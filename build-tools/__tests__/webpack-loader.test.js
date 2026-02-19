import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import atomixLoader, { pitch, getAtomixConfig, getAvailableThemes } from '../webpack-loader.js';

// Mock Webpack loader context
const createMockContext = (options = {}, resourcePath = '/test/file.js') => {
  return {
    getOptions: () => options,
    resourcePath: resourcePath,
    async: () => (err, result) => {
      if (err) throw err;
      return result;
    }
  };
};

describe('Atomix Webpack Loader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Loader Function', () => {
    it('should process files with Atomix imports', () => {
      const context = createMockContext({}, '/test/component.js');
      const source = `
        import { Button, Card } from '@shohojdhara/atomix/components';
        export default function Test() {
          return <Button>Test</Button>;
        }
      `;
      
      const result = atomixLoader.call(context, source);
      
      expect(result).toContain('Button');
      expect(result).toContain('Card');
    });

    it('should filter components when specified', () => {
      const context = createMockContext({
        components: ['Button']
      }, '/test/component.js');
      
      const source = `
        import { Button, Card, Input } from '@shohojdhara/atomix/components';
        export default function Test() {
          return <Button>Test</Button>;
        }
      `;
      
      const result = atomixLoader.call(context, source);
      
      expect(result).toContain('Button');
      expect(result).not.toContain('Card');
      expect(result).not.toContain('Input');
    });

    it('should remove atom imports when includeAtoms is false', () => {
      const context = createMockContext({
        includeAtoms: false
      }, '/test/component.js');
      
      const source = `
        import { Button } from '@shohojdhara/atomix/components';
        import { AtomButton } from '@shohojdhara/atomix/atoms';
        export default function Test() {
          return <Button>Test</Button>;
        }
      `;
      
      const result = atomixLoader.call(context, source);
      
      expect(result).toContain('Button');
      expect(result).not.toContain('AtomButton');
    });

    it('should keep atom imports when includeAtoms is true', () => {
      const context = createMockContext({
        includeAtoms: true
      }, '/test/component.js');
      
      const source = `
        import { Button } from '@shohojdhara/atomix/components';
        import { AtomButton } from '@shohojdhara/atomix/atoms';
        export default function Test() {
          return <Button>Test</Button>;
        }
      `;
      
      const result = atomixLoader.call(context, source);
      
      expect(result).toContain('Button');
      expect(result).toContain('AtomButton');
    });

    it('should return source unchanged for non-Atomix files', () => {
      const context = createMockContext({}, '/test/regular.js');
      const source = 'console.log("hello world");';
      
      const result = atomixLoader.call(context, source);
      
      expect(result).toBe(source);
    });

    it('should throw error for invalid components type', () => {
      const context = createMockContext({
        components: 'Button' // Should be array
      }, '/test/component.js');
      
      const source = 'import { Button } from "@shohojdhara/atomix/components";';
      
      expect(() => {
        atomixLoader.call(context, source);
      }).toThrow('Components must be an array');
    });

    it('should handle verbose logging', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const context = createMockContext({
        verbose: true,
        components: ['Button']
      }, '/test/component.js');
      
      const source = `
        import { Button, Card } from '@shohojdhara/atomix/components';
        export default function Test() {
          return <Button>Test</Button>;
        }
      `;
      
      atomixLoader.call(context, source);
      
      expect(consoleSpy).toHaveBeenCalledWith('[Atomix Webpack Loader] Processing: /test/component.js');
      expect(consoleSpy).toHaveBeenCalledWith('[Atomix Webpack Loader] Selected components: Button');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Pitch Function', () => {
    it('should process Atomix files in pitch phase', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const context = createMockContext({
        verbose: true
      }, '/project/node_modules/@shohojdhara/atomix/Button.js');
      
      pitch.call(context);
      
      expect(consoleSpy).toHaveBeenCalledWith('[Atomix Webpack Loader - Pitch] Will process: /project/node_modules/@shohojdhara/atomix/Button.js');
      
      consoleSpy.mockRestore();
    });

    it('should skip non-Atomix files in pitch phase', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const context = createMockContext({
        verbose: true
      }, '/project/src/App.js');
      
      const result = pitch.call(context);
      
      expect(result).toBeUndefined();
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Helper Functions', () => {
    it('should get Atomix configuration with defaults', () => {
      const config = getAtomixConfig('/test/project');
      
      expect(config).toEqual({
        theme: 'default',
        optimize: true,
        includeAtoms: false,
        components: []
      });
    });

    it('should get available themes', () => {
      const themes = getAvailableThemes('/test/project');
      
      expect(Array.isArray(themes)).toBe(true);
      expect(themes).toEqual([]);
    });
  });
});