import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

const utilityBundles = [
  'src/styles/99-utilities/_index.scss',
  'src/styles/99-utilities/_index.core.scss',
  'src/styles/99-utilities/_index.grid.scss',
  'src/styles/99-utilities/_index.interaction.scss',
  'src/styles/99-utilities/_index.motion.scss',
] as const;

function compileUtilityBundle(entry: string): void {
  const tempDir = mkdtempSync(join(tmpdir(), 'atomix-utilities-'));
  const outputFile = join(tempDir, 'out.css');

  try {
    execSync(`npx sass "${entry}" "${outputFile}"`, {
      cwd: projectRoot,
      stdio: 'pipe',
      encoding: 'utf8',
    });
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

describe('utility SCSS bundles', () => {
  it.each(utilityBundles)('compiles %s without errors', (entry) => {
    expect(() => compileUtilityBundle(entry)).not.toThrow();
  });
});
