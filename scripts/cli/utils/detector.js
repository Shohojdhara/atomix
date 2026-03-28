/**
 * Atomix CLI Project Detector
 * Automatically detects the framework environment (React, Next.js, Vanilla)
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const NEXT_CONFIG_FILES = [
  'next.config.js',
  'next.config.mjs',
  'next.config.ts',
  'next.config.cjs'
];

const VITE_CONFIG_FILES = [
  'vite.config.js',
  'vite.config.mjs',
  'vite.config.ts',
  'vite.config.cjs'
];

function hasFileInRoot(projectRoot, filenames) {
  return filenames.some((name) => existsSync(join(projectRoot, name)));
}

function hasNextSignals(projectRoot, allDeps) {
  if (allDeps.next) return true;
  return hasFileInRoot(projectRoot, NEXT_CONFIG_FILES);
}

function hasViteSignals(projectRoot, allDeps) {
  if (allDeps.vite) return true;
  return hasFileInRoot(projectRoot, VITE_CONFIG_FILES);
}

/**
 * Detect the framework from package.json and project structure
 * @param {string} projectRoot - The root directory of the project
 * @param {{ framework?: string }} [options] - Optional override: 'react' | 'next' | 'vanilla'
 * @returns {Promise<'react' | 'next' | 'vanilla'>}
 */
export async function detectFramework(projectRoot = process.cwd(), options = {}) {
  const override = options.framework;
  if (override) {
    const o = String(override).toLowerCase();
    if (o === 'react' || o === 'next' || o === 'vanilla') {
      return o;
    }
  }

  try {
    const packageJsonPath = join(projectRoot, 'package.json');

    if (!existsSync(packageJsonPath)) {
      return 'vanilla';
    }

    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    const allDeps = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {})
    };

    if (hasNextSignals(projectRoot, allDeps)) {
      return 'next';
    }

    const hasReact = Boolean(allDeps.react);

    if (hasViteSignals(projectRoot, allDeps) && hasReact) {
      return 'react';
    }

    if (hasReact) {
      return 'react';
    }

    return 'vanilla';
  } catch (error) {
    return 'vanilla';
  }
}
