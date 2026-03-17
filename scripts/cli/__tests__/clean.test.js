/**
 * Tests for Atomix CLI Clean Command
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { join } from 'path';
import { mkdtemp, writeFile, mkdir, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { cacheManager } from '../utils/cache-manager.js';

describe('cacheManager', () => {
  let testDir;

  beforeEach(async () => {
    // Create isolated temp directory for each test
    testDir = await mkdtemp(join(tmpdir(), 'atomix-clean-test-'));
    process.chdir(testDir);
  });

  afterEach(async () => {
    // Cleanup temp directory
    await rm(testDir, { recursive: true, force: true });
  });

  describe('identifyTargets', () => {
    it('should return empty array when no clean targets exist', async () => {
      const targets = await cacheManager.identifyTargets();
      expect(targets).toEqual([]);
    });

    it('should identify dist directory', async () => {
      await mkdir(join(testDir, 'dist'), { recursive: true });
      const targets = await cacheManager.identifyTargets();
      
      expect(targets.some(t => t.relativePath === 'dist')).toBe(true);
    });

    it('should identify .atomix directory', async () => {
      await mkdir(join(testDir, '.atomix'), { recursive: true });
      const targets = await cacheManager.identifyTargets();
      
      expect(targets.some(t => t.relativePath === '.atomix')).toBe(true);
    });

    it('should identify node_modules/.cache with --all flag', async () => {
      await mkdir(join(testDir, 'node_modules', '.cache'), { recursive: true });
      
      // Without --all flag, node_modules should not be included
      const targetsDefault = await cacheManager.identifyTargets();
      // Default targets don't include node_modules at all
      expect(targetsDefault.some(t => t.relativePath === 'node_modules')).toBe(false);
      
      // With --all flag, node_modules should be included
      const targetsAll = await cacheManager.identifyTargets({ all: true });
      expect(targetsAll.some(t => t.relativePath === 'node_modules')).toBe(true);
    });

    it('should only identify cache directories with --cache flag', async () => {
      await mkdir(join(testDir, 'dist'), { recursive: true });
      await mkdir(join(testDir, '.atomix'), { recursive: true });
      await mkdir(join(testDir, 'node_modules', '.cache'), { recursive: true });
      
      const targets = await cacheManager.identifyTargets({ cache: true });
      
      // Should include .atomix and node_modules/.cache but not log files
      expect(targets.some(t => t.relativePath === '.atomix')).toBe(true);
      expect(targets.some(t => t.relativePath.includes('node_modules'))).toBe(true);
    });
  });

  describe('getPathType', () => {
    it('should identify directory type', async () => {
      await mkdir(join(testDir, 'test-dir'), { recursive: true });
      const type = await cacheManager.getPathType(join(testDir, 'test-dir'));
      expect(type).toBe('directory');
    });

    it('should identify file type', async () => {
      await writeFile(join(testDir, 'test.txt'), 'content');
      const type = await cacheManager.getPathType(join(testDir, 'test.txt'));
      expect(type).toBe('file');
    });

    it('should return unknown for non-existent path', async () => {
      const type = await cacheManager.getPathType(join(testDir, 'nonexistent'));
      expect(type).toBe('unknown');
    });
  });

  describe('isProtected', () => {
    it('should protect JavaScript files', () => {
      expect(cacheManager.isProtected('file.js')).toBe(true);
      expect(cacheManager.isProtected('file.jsx')).toBe(true);
    });

    it('should protect TypeScript files', () => {
      expect(cacheManager.isProtected('file.ts')).toBe(true);
      expect(cacheManager.isProtected('file.tsx')).toBe(true);
    });

    it('should protect style files', () => {
      expect(cacheManager.isProtected('file.scss')).toBe(true);
      expect(cacheManager.isProtected('file.css')).toBe(true);
    });

    it('should allow deleting build artifacts', () => {
      expect(cacheManager.isProtected('file.map')).toBe(false);
      expect(cacheManager.isProtected('file.bundle')).toBe(false);
    });
  });

  describe('formatBytes', () => {
    it('should format zero bytes', () => {
      expect(cacheManager.formatBytes(0)).toBe('0 Bytes');
    });

    it('should format bytes to KB', () => {
      expect(cacheManager.formatBytes(1024)).toBe('1 KB');
    });

    it('should format bytes to MB', () => {
      expect(cacheManager.formatBytes(1048576)).toBe('1 MB');
    });

    it('should format large sizes', () => {
      expect(cacheManager.formatBytes(1073741824)).toBe('1 GB');
    });
  });

  describe('calculateSize', () => {
    it('should calculate total size of files', async () => {
      // Create test files
      await mkdir(join(testDir, 'dist'), { recursive: true });
      await writeFile(join(testDir, 'dist', 'file1.txt'), 'a'.repeat(100));
      await writeFile(join(testDir, 'dist', 'file2.txt'), 'b'.repeat(200));
      
      const targets = await cacheManager.identifyTargets();
      const size = await cacheManager.calculateSize(targets);
      
      expect(size).toBeGreaterThan(0);
    });
  });

  describe('deletePath', () => {
    it('should delete a directory in dry-run mode without actually deleting', async () => {
      process.env.ATOMIX_DRY_RUN = 'true';
      
      await mkdir(join(testDir, 'dist'), { recursive: true });
      await writeFile(join(testDir, 'dist', 'test.txt'), 'content');
      
      // Use base path as testDir since filesystem validates against cwd
      const result = await cacheManager.deletePath(join(testDir, 'dist'), { skipValidation: true });
      
      expect(result).toBe(true);
      
      // Verify directory still exists
      const exists = await cacheManager.getPathType(join(testDir, 'dist'));
      expect(exists).toBe('directory');
      
      delete process.env.ATOMIX_DRY_RUN;
    });

    it('should actually delete a directory when not in dry-run mode', async () => {
      await mkdir(join(testDir, 'dist'), { recursive: true });
      await writeFile(join(testDir, 'dist', 'test.txt'), 'content');
      
      const result = await cacheManager.deletePath(join(testDir, 'dist'), { skipValidation: true });
      
      expect(result).toBe(true);
      
      // Verify directory is deleted
      const exists = await cacheManager.getPathType(join(testDir, 'dist'));
      expect(exists).toBe('unknown');
    });

    it('should refuse to delete protected files', async () => {
      await writeFile(join(testDir, 'source.js'), 'console.log("hi")');
      
      await expect(
        cacheManager.deletePath(join(testDir, 'source.js'), { skipValidation: true })
      ).rejects.toThrow('Cannot delete protected source file');
    });
  });

  describe('displayDryRun', () => {
    it('should show message when nothing to clean', () => {
      // This is mainly a visual test, we just ensure it doesn't throw
      expect(() => {
        cacheManager.displayDryRun([]);
      }).not.toThrow();
    });

    it('should display list of files to be deleted', () => {
      const targets = [
        { relativePath: 'dist', type: 'directory' },
        { relativePath: '.atomix', type: 'directory' }
      ];
      
      expect(() => {
        cacheManager.displayDryRun(targets);
      }).not.toThrow();
    });
  });
});

describe('cleanAction', () => {
  let testDir;

  beforeEach(async () => {
    testDir = await mkdtemp(join(tmpdir(), 'atomix-action-test-'));
    process.chdir(testDir);
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  it('should handle empty state gracefully', async () => {
    const { cleanAction } = await import('../commands/clean.js');
    
    // Should not throw when nothing to clean
    await expect(cleanAction({})).resolves.not.toThrow();
  });

  it('should respect dry-run mode', async () => {
    const { cleanAction } = await import('../commands/clean.js');
    
    // Create test directory
    await mkdir(join(testDir, 'dist'), { recursive: true });
    
    // Run in dry-run mode
    process.env.ATOMIX_DRY_RUN = 'true';
    await cleanAction({ dryRun: true });
    
    // Verify dist still exists
    const exists = await cacheManager.getPathType(join(testDir, 'dist'));
    expect(exists).toBe('directory');
    
    delete process.env.ATOMIX_DRY_RUN;
  });

  it('should clean created directories', async () => {
    const { cleanAction } = await import('../commands/clean.js');
    
    // Create test directories
    await mkdir(join(testDir, 'dist'), { recursive: true });
    await mkdir(join(testDir, '.atomix'), { recursive: true });
    
    // Run clean
    await cleanAction({});
    
    // Verify directories are deleted
    const distExists = await cacheManager.getPathType(join(testDir, 'dist'));
    const atomixExists = await cacheManager.getPathType(join(testDir, '.atomix'));
    
    expect(distExists).toBe('unknown');
    expect(atomixExists).toBe('unknown');
  });

  it('should preserve source files', async () => {
    const { cleanAction } = await import('../commands/clean.js');
    
    // Create mix of source and build files
    await mkdir(join(testDir, 'dist'), { recursive: true });
    await writeFile(join(testDir, 'src.js'), 'console.log("source")');
    
    // Run clean
    await cleanAction({});
    
    // Verify source file preserved
    const srcExists = await cacheManager.getPathType(join(testDir, 'src.js'));
    expect(srcExists).toBe('file');
    
    // Verify build deleted
    const distExists = await cacheManager.getPathType(join(testDir, 'dist'));
    expect(distExists).toBe('unknown');
  });
});
