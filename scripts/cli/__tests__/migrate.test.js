/**
 * Migrate Command Unit Tests
 * Tests ensureSourceIsDirectory behavior and migrate error paths
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtemp, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { migrateAction } from '../commands/migrate.js';
import { AtomixCLIError, ErrorCategory } from '../utils/error.js';

describe('Migrate Command', () => {
  let tempDir;
  let originalCwd;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'atomix-migrate-test-'));
    originalCwd = process.cwd();
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await rm(tempDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  describe('ensureSourceIsDirectory (via migrateAction)', () => {
    it('should throw INVALID_PATH when source does not exist', async () => {
      await expect(
        migrateAction('tailwind', './nonexistent-dir-xyz-123')
      ).rejects.toThrow(AtomixCLIError);

      try {
        await migrateAction('tailwind', './nonexistent-dir-xyz-123');
      } catch (err) {
        expect(err.code).toBe(ErrorCategory.INVALID_PATH);
        expect(err.message).toContain('Source not found');
      }
    });

    it('should throw INVALID_PATH when source is a file not a directory', async () => {
      const filePath = join(tempDir, 'package.json');
      await writeFile(filePath, '{}');
      const relativeFile = 'package.json';

      await expect(
        migrateAction('tailwind', relativeFile)
      ).rejects.toThrow(AtomixCLIError);

      try {
        await migrateAction('tailwind', relativeFile);
      } catch (err) {
        expect(err.code).toBe(ErrorCategory.INVALID_PATH);
        expect(err.message).toContain('not a directory');
      }
    });

    it('should throw when migration type is unsupported', async () => {
      let threw = false;
      try {
        await migrateAction('unknown-framework', '.');
      } catch (err) {
        threw = true;
        if (err instanceof AtomixCLIError) {
          expect(err.code).toBe(ErrorCategory.VALIDATION);
          expect(err.message).toContain('Unsupported migration type');
        }
      }
      expect(threw).toBe(true);
    });
  });
});
