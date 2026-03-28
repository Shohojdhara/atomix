import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { detectFramework } from '../utils/detector.js';

function writePackage(root, deps = {}, devDeps = {}) {
  writeFileSync(
    join(root, 'package.json'),
    JSON.stringify({ name: 'fixture', dependencies: deps, devDependencies: devDeps }, null, 2)
  );
}

describe('detectFramework', () => {
  let dir;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'atomix-det-'));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('returns vanilla without package.json', async () => {
    expect(await detectFramework(join(dir, 'empty'))).toBe('vanilla');
  });

  it('next dependency wins over react', async () => {
    writePackage(dir, { react: '^18', next: '^14' });
    expect(await detectFramework(dir)).toBe('next');
  });

  it('vite + react is react (not next) when next.config absent', async () => {
    writePackage(dir, { react: '^18', vite: '^5' });
    writeFileSync(join(dir, 'vite.config.ts'), 'export default {}');
    expect(await detectFramework(dir)).toBe('react');
  });

  it('next.config.ts implies next without next in deps', async () => {
    writePackage(dir, { react: '^18' });
    writeFileSync(join(dir, 'next.config.ts'), 'export default {}');
    expect(await detectFramework(dir)).toBe('next');
  });

  it('respects framework override', async () => {
    writePackage(dir, { react: '^18', next: '^14' });
    expect(await detectFramework(dir, { framework: 'react' })).toBe('react');
  });
});
