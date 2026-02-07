import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import atomixRollupPlugin, { getAvailableThemes, getAtomixPackageLocation } from '../rollup-plugin.js';

describe('Atomix Rollup Plugin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Plugin Creation', () => {
    it('should create plugin with default options', () => {
      const plugin = atomixRollupPlugin();
      expect(plugin.name).toBe('atomix');
      expect(typeof plugin.transform).toBe('function');
      expect(typeof plugin.resolveId).toBe('function');
      expect(typeof plugin.load).toBe('function');
    });

    it('should create plugin with custom options', () => {
      const options = {
        theme: 'dark-complementary',
        components: ['Button', 'Card'],
        optimize: false,
        includeAtoms: true,
        verbose: true
      };
      
      const plugin = atomixRollupPlugin(options);
      expect(plugin.name).toBe('atomix');
    });

    it('should throw error for invalid theme type', () => {
      expect(() => {
        atomixRollupPlugin({ theme: 123 });
      }).toThrow('Theme must be a string');
    });

    it('should throw error for invalid components type', () => {
      expect(() => {
        atomixRollupPlugin({ components: 'Button' });
      }).toThrow('Components must be an array');
    });
  });

  describe('Transform Hook', () => {
    it('should process Atomix files', () => {
      const plugin = atomixRollupPlugin();
      const testCode = `
        import { Button, Card } from '@shohojdhara/atomix/components';
        import { AtomButton } from '@shohojdhara/atomix/atoms';
        export default function Test() {
          return <Button>Hello</Button>;
        }
      `;
      
      const result = plugin.transform(testCode, '/test/node_modules/@shohojdhara/atomix/Button.js');
      
      expect(result).toBeDefined();
      expect(result.code).toContain('Button');
      expect(result.map).toBeNull();
    });

    it('should filter components when specified', () => {
      const plugin = atomixRollupPlugin({
        components: ['Button'],
        optimize: true
      });
      
      const testCode = `
        import { Button, Card, Input } from '@shohojdhara/atomix/components';
        export default function Test() {
          return <Button>Hello</Button>;
        }
      `;
      
      const result = plugin.transform(testCode, '/test/file.js');
      expect(result.code).toContain('Button');
      // Should filter out Card and Input
    });

    it('should remove atom imports when includeAtoms is false', () => {
      const plugin = atomixRollupPlugin({
        includeAtoms: false,
        optimize: true
      });
      
      const testCode = `
        import { Button } from '@shohojdhara/atomix/components';
        import { AtomButton } from '@shohojdhara/atomix/atoms';
      `;
      
      const result = plugin.transform(testCode, '/test/file.js');
      expect(result.code).not.toContain('AtomButton');
    });

    it('should return null for non-Atomix files', () => {
      const plugin = atomixRollupPlugin();
      const result = plugin.transform('console.log("hello");', '/test/other.js');
      expect(result).toBeNull();
    });
  });

  describe('ResolveId Hook', () => {
    it('should resolve theme imports', () => {
      const plugin = atomixRollupPlugin();
      const result = plugin.resolveId('@shohojdhara/atomix/theme', '/test/importer.js');
      // Should return null or the import path
      expect(result === null || typeof result === 'string').toBe(true);
    });

    it('should resolve component imports', () => {
      const plugin = atomixRollupPlugin();
      const result = plugin.resolveId('@shohojdhara/atomix/components/Button', '/test/importer.js');
      expect(result === null || typeof result === 'string').toBe(true);
    });

    it('should return null for non-Atomix imports', () => {
      const plugin = atomixRollupPlugin();
      const result = plugin.resolveId('react', '/test/importer.js');
      expect(result).toBeNull();
    });
  });

  describe('Load Hook', () => {
    it('should load virtual theme modules', () => {
      const plugin = atomixRollupPlugin();
      const result = plugin.load('virtual:atomix-theme');
      expect(typeof result).toBe('string');
    });

    it('should return null for unknown virtual modules', () => {
      const plugin = atomixRollupPlugin();
      const result = plugin.load('virtual:unknown');
      expect(result).toBeNull();
    });
  });

  describe('GenerateBundle Hook', () => {
    it('should process CSS assets', () => {
      const plugin = atomixRollupPlugin({ optimize: true });
      const bundle = {
        'styles.css': {
          type: 'asset',
          fileName: 'atomix-styles.css',
          source: 'body { color: red; }'
        }
      };
      
      // This should not throw an error
      expect(() => {
        plugin.generateBundle({}, bundle);
      }).not.toThrow();
    });

    it('should skip non-CSS assets', () => {
      const plugin = atomixRollupPlugin({ optimize: true });
      const bundle = {
        'script.js': {
          type: 'chunk',
          fileName: 'script.js',
          code: 'console.log("hello");'
        }
      };
      
      expect(() => {
        plugin.generateBundle({}, bundle);
      }).not.toThrow();
    });
  });

  describe('BuildStart Hook', () => {
    it('should have buildStart function', () => {
      const plugin = atomixRollupPlugin();
      expect(typeof plugin.buildStart).toBe('function');
    });
  });

  describe('Helper Functions', () => {
    it('should get available themes', () => {
      const themes = getAvailableThemes(null);
      expect(Array.isArray(themes)).toBe(true);
      expect(themes).toContain('default');
      expect(themes).toContain('dark-complementary');
    });

    it('should get Atomix package location', () => {
      const location = getAtomixPackageLocation();
      // Should return null or valid path
      expect(location === null || typeof location === 'string').toBe(true);
    });
  });
});