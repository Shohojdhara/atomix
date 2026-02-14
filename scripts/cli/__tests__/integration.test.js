/**
 * CLI Integration Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtemp, rm, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';
import { execSync } from 'child_process';

// Mock console to avoid noise in tests
const originalConsole = global.console;

describe('CLI Integration Tests', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'atomix-cli-test-'));
    
    // Create project structure
    await mkdir(join(tempDir, 'src/styles/01-settings'), { recursive: true });
    await mkdir(join(tempDir, 'src/lib/composables'), { recursive: true });
    await mkdir(join(tempDir, 'src/lib/types'), { recursive: true });
    
    // Mock console methods
    global.console = {
      ...originalConsole,
      log: vi.fn(),
      error: vi.fn(),
      warn: vi.fn()
    };
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
    global.console = originalConsole;
    vi.clearAllMocks();
  });

  describe('atomix generate component', () => {
    it('should generate a basic component', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      execSync(`node ${cliPath} generate component TestButton`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        stdio: 'pipe'
      });

      const componentDir = join(tempDir, 'src', 'components', 'TestButton');
      expect(existsSync(join(componentDir, 'TestButton.tsx'))).toBe(true);
      expect(existsSync(join(componentDir, 'index.ts'))).toBe(true);
    });

    it('should generate component with stories', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      execSync(`node ${cliPath} generate component StoryCard --story`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        stdio: 'pipe'
      });

      const storyFile = join(tempDir, 'src', 'components', 'StoryCard', 'StoryCard.stories.tsx');
      expect(existsSync(storyFile)).toBe(true);
    });

    it('should generate component with test file', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      execSync(`node ${cliPath} generate component TestComponent --test`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        stdio: 'pipe'
      });

      const testFile = join(tempDir, 'src', 'components', 'TestComponent', 'TestComponent.test.tsx');
      expect(existsSync(testFile)).toBe(true);
    });

    it('should reject invalid component names', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      expect(() => {
        execSync(`node ${cliPath} generate component invalid-name`, {
          cwd: tempDir,
          env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
          stdio: 'pipe'
        });
      }).toThrow();
    });

    it('should handle existing component without force flag', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      // Generate component first time
      execSync(`node ${cliPath} generate component DuplicateButton`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        stdio: 'pipe'
      });

      // Try to generate again without force
      expect(() => {
        execSync(`node ${cliPath} generate component DuplicateButton`, {
          cwd: tempDir,
          env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
          stdio: 'pipe'
        });
      }).toThrow();
    });

    it('should overwrite existing component with force flag', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      // Generate component first time
      execSync(`node ${cliPath} generate component ForceButton`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        stdio: 'pipe'
      });

      // Generate again with force
      execSync(`node ${cliPath} generate component ForceButton --force`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        stdio: 'pipe'
      });

      const componentFile = join(tempDir, 'src', 'components', 'ForceButton', 'ForceButton.tsx');
      expect(existsSync(componentFile)).toBe(true);
    });
  });

  describe('atomix generate token', () => {
    it('should generate color tokens', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      execSync(`node ${cliPath} generate token colors`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        stdio: 'pipe'
      });

      const tokenFile = join(tempDir, 'src', 'styles', '01-settings', '_settings.colors.custom.scss');
      expect(existsSync(tokenFile)).toBe(true);
    });

    it('should generate spacing tokens', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      execSync(`node ${cliPath} generate token spacing`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        stdio: 'pipe'
      });

      const tokenFile = join(tempDir, 'src', 'styles', '01-settings', '_settings.spacing.custom.scss');
      expect(existsSync(tokenFile)).toBe(true);
    });

    it('should generate all token categories', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      const categories = ['colors', 'spacing', 'typography', 'shadows', 'radius', 'animations'];
      
      categories.forEach(category => {
        execSync(`node ${cliPath} generate token ${category}`, {
          cwd: tempDir,
          env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
          stdio: 'pipe'
        });
      });

      categories.forEach(category => {
        let filename;
        switch (category) {
          case 'colors':
            filename = '_settings.colors.custom.scss';
            break;
          case 'spacing':
            filename = '_settings.spacing.custom.scss';
            break;
          case 'typography':
            filename = '_settings.typography.custom.scss';
            break;
          case 'shadows':
            filename = '_settings.box-shadow.custom.scss';
            break;
          case 'radius':
            filename = '_settings.border-radius.custom.scss';
            break;
          case 'animations':
            filename = '_settings.animations.custom.scss';
            break;
        }
        
        const tokenFile = join(tempDir, 'src', 'styles', '01-settings', filename);
        expect(existsSync(tokenFile)).toBe(true);
      });
    });

    it('should reject invalid token categories', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      expect(() => {
        execSync(`node ${cliPath} generate token invalid-category`, {
          cwd: tempDir,
          env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
          stdio: 'pipe'
        });
      }).toThrow();
    });
  });

  describe('atomix validate', () => {
    beforeEach(async () => {
      // Create some token files for validation
      const stylesDir = join(tempDir, 'src', 'styles', '01-settings');
      await mkdir(stylesDir, { recursive: true });
      
      await writeFile(join(stylesDir, '_settings.colors.scss'), `
$primary: blue !default;
$secondary: red !default;
--atomix-color-primary: blue;
--atomix-color-secondary: red;
`);
      
      await writeFile(join(stylesDir, '_settings.typography.scss'), '$font-base: sans-serif !default;');
      await writeFile(join(stylesDir, '_settings.spacing.scss'), '$spacing-unit: 8px !default;');
      await writeFile(join(stylesDir, '_settings.radius.scss'), '$radius-base: 4px !default;');
    });

    it('should validate tokens', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      const result = execSync(`node ${cliPath} validate --tokens`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        encoding: 'utf8',
        stdio: 'pipe'
      });

      expect(result).toContain('All validations passed');
    });

    it('should detect validation issues', async () => {
      // Create problematic token file
      const stylesDir = join(tempDir, 'src', 'styles', '01-settings');
      await writeFile(join(stylesDir, '_settings.colors.scss'), `
$primary: #ffffff; // Hardcoded color and missing !default
background: #ff0000; // Another hardcoded color
      `);

      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      try {
        const result = execSync(`node ${cliPath} validate --tokens`, {
          cwd: tempDir,
          env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
          encoding: 'utf8',
          stdio: 'pipe'
        });
        expect(result).toContain('issues found');
      } catch (error) {
        const output = error.stdout ? error.stdout.toString() : error.message;
        expect(output).toContain('issues found');
      }
    });
  });

  describe('atomix doctor', () => {
    it('should run system diagnostics', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      const result = execSync(`node ${cliPath} doctor`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        encoding: 'utf8',
        stdio: 'pipe'
      });

      expect(result).toContain('Atomix Doctor');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing command gracefully', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      expect(() => {
        execSync(`node ${cliPath} non-existent-command`, {
          cwd: tempDir,
          env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
          stdio: 'pipe'
        });
      }).toThrow();
    });

    it('should show help for --help flag', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      const result = execSync(`node ${cliPath} --help`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        encoding: 'utf8',
        stdio: 'pipe'
      });

      expect(result).toContain('Atomix Design System CLI');
      expect(result).toContain('Commands:');
    });

    it('should show version for --version flag', () => {
      const cliPath = resolve(__dirname, '../../atomix-cli.js');
      
      const result = execSync(`node ${cliPath} --version`, {
        cwd: tempDir,
        env: { ...process.env, ATOMIX_SKIP_DEP_CHECK: 'true' },
        encoding: 'utf8',
        stdio: 'pipe'
      });

      expect(result).toMatch(/\d+\.\d+\.\d+/);
    });
  });
});
