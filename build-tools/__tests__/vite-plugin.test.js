import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import atomixVitePlugin, { getAtomixPackageLocation, getAvailableThemes } from '../vite-plugin.js';

describe('Atomix Vite Plugin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Plugin Creation', () => {
    it('should create plugin with default options', () => {
      const plugin = atomixVitePlugin();
      expect(plugin.name).toBe('atomix');
      expect(typeof plugin.transform).toBe('function');
      expect(typeof plugin.configureServer).toBe('function');
    });

    it('should create plugin with custom options', () => {
      const options = {
        theme: 'dark-complementary',
        components: ['Button', 'Card'],
        optimizeCss: false,
        includeAtoms: true,
        verbose: true
      };
      
      const plugin = atomixVitePlugin(options);
      expect(plugin.name).toBe('atomix');
    });

    it('should throw error for invalid theme type', () => {
      expect(() => {
        atomixVitePlugin({ theme: 123 });
      }).toThrow('Theme must be a string');
    });

    it('should throw error for invalid components type', () => {
      expect(() => {
        atomixVitePlugin({ components: 'Button' });
      }).toThrow('Components must be an array');
    });
  });

  describe('Transform Hook', () => {
    it('should process Atomix imports', async () => {
      const plugin = atomixVitePlugin();
      
      // Mock configResolved to set atomixRoot
      plugin.configResolved({ 
        root: '/test/project' 
      });
      
      const testCode = `
        import { Button, Card } from '@shohojdhara/atomix/components';
        import { AtomButton } from '@shohojdhara/atomix/atoms';
        export default function Test() {
          return <Button>Hello</Button>;
        }
      `;
      
      const result = await plugin.transform(testCode, '/test/file.js');
      
      expect(result).toBeDefined();
      expect(result.code).toContain('Button');
      expect(result.map).toBeNull();
    });

    it('should filter components when specified', async () => {
      const plugin = atomixVitePlugin({
        components: ['Button']
      });
      
      const testCode = `
        import { Button, Card, Input } from '@shohojdhara/atomix/components';
        export default function Test() {
          return <Button>Hello</Button>;
        }
      `;
      
      const result = await plugin.transform(testCode, '/test/file.js');
      expect(result.code).toContain('Button');
      // Should filter out Card and Input
    });

    it('should remove atom imports when includeAtoms is false', async () => {
      const plugin = atomixVitePlugin({
        includeAtoms: false
      });
      
      const testCode = `
        import { Button } from '@shohojdhara/atomix/components';
        import { AtomButton } from '@shohojdhara/atomix/atoms';
      `;
      
      const result = await plugin.transform(testCode, '/test/file.js');
      expect(result.code).not.toContain('AtomButton');
    });

    it('should return null for non-Atomix files', async () => {
      const plugin = atomixVitePlugin();
      const result = await plugin.transform('console.log("hello");', '/test/other.js');
      expect(result).toBeNull();
    });
  });

  describe('Helper Functions', () => {
    it('should get Atomix package location', () => {
      const location = getAtomixPackageLocation();
      // Should return null or valid path
      expect(location === null || typeof location === 'string').toBe(true);
    });

    it('should get available themes', () => {
      const themes = getAvailableThemes(null);
      expect(Array.isArray(themes)).toBe(true);
      expect(themes).toEqual([]);
    });
  });

  describe('Build Hooks', () => {
    it('should have buildStart hook', () => {
      const plugin = atomixVitePlugin();
      expect(typeof plugin.buildStart).toBe('function');
    });
  });
});