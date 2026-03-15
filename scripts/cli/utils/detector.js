/**
 * Atomix CLI Project Detector
 * Automatically detects the framework environment (React, Next.js, Vanilla)
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * Detect the framework from package.json and project structure
 * @param {string} projectRoot - The root directory of the project
 * @returns {Promise<'react' | 'next' | 'vanilla'>}
 */
export async function detectFramework(projectRoot = process.cwd()) {
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

    if (allDeps.next) {
      return 'next';
    }

    if (allDeps.react) {
      return 'react';
    }

    // Check for framework specific files
    if (existsSync(join(projectRoot, 'next.config.js')) || existsSync(join(projectRoot, 'next.config.mjs'))) {
      return 'next';
    }

    return 'vanilla';
  } catch (error) {
    return 'vanilla';
  }
}
