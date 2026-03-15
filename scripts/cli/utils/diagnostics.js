/**
 * Atomix CLI Diagnostics Utility
 * Shared logic for environment and project health checks
 */

import { execSync } from 'child_process';
import { existsSync, accessSync, constants } from 'fs';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { logger } from './logger.js';

/**
 * Check Node.js and NPM versions
 */
export async function checkRuntimes() {
  const results = [];
  
  // Node.js version check
  const nodeVersion = process.version;
  const minNodeVersion = 'v18.0.0';
  const nodeOk = parseInt(nodeVersion.slice(1)) >= 18;
  
  results.push({
    name: 'Node.js',
    status: nodeOk ? 'pass' : 'fail',
    message: `Current: ${nodeVersion}, Required: >=${minNodeVersion}`,
    suggestion: nodeOk ? null : 'Please upgrade Node.js to version 18 or higher.'
  });

  // NPM version check
  try {
    const npmVersion = execSync('npm -v').toString().trim();
    const npmOk = parseInt(npmVersion.split('.')[0]) >= 8;
    results.push({
      name: 'NPM',
      status: npmOk ? 'pass' : 'fail',
      message: `Current: ${npmVersion}, Required: >=8.0.0`,
      suggestion: npmOk ? null : 'Please upgrade NPM to version 8 or higher.'
    });
  } catch (error) {
    results.push({
      name: 'NPM',
      status: 'fail',
      message: 'NPM not found in system path',
      suggestion: 'Please install NPM (comes with Node.js).'
    });
  }

  return results;
}

/**
 * Check project structure
 */
export async function checkProjectStructure(projectRoot = process.cwd()) {
  const results = [];
  const requiredDirs = ['src', 'scripts/cli'];
  const recommendedDirs = ['themes', 'docs'];

  for (const dir of requiredDirs) {
    const dirPath = join(projectRoot, dir);
    const exists = existsSync(dirPath);
    results.push({
      name: `Directory: ${dir}`,
      status: exists ? 'pass' : 'fail',
      message: exists ? 'Exists' : 'Missing',
      suggestion: exists ? null : `Create the '${dir}' directory in your project root.`
    });
  }

  for (const dir of recommendedDirs) {
    const dirPath = join(projectRoot, dir);
    const exists = existsSync(dirPath);
    results.push({
      name: `Directory: ${dir} (Recommended)`,
      status: exists ? 'pass' : 'warn',
      message: exists ? 'Exists' : 'Missing',
      suggestion: exists ? null : `Consider creating a '${dir}' directory for better organization.`
    });
  }

  return results;
}

/**
 * Check configuration file
 */
export async function checkConfig(projectRoot = process.cwd()) {
  const results = [];
  const configFiles = ['atomix.config.ts', 'atomix.config.js'];
  let found = false;

  for (const file of configFiles) {
    const configPath = join(projectRoot, file);
    if (existsSync(configPath)) {
      found = true;
      try {
        // Simple syntax check by reading it
        await readFile(configPath, 'utf8');
        results.push({
          name: `Config: ${file}`,
          status: 'pass',
          message: 'Found and readable',
          suggestion: null
        });
      } catch (error) {
        results.push({
          name: `Config: ${file}`,
          status: 'fail',
          message: `Error reading config: ${error.message}`,
          suggestion: 'Check file permissions and syntax.'
        });
      }
      break;
    }
  }

  if (!found) {
    results.push({
      name: 'Configuration',
      status: 'warn',
      message: 'No atomix.config.ts or atomix.config.js found',
      suggestion: 'Run `atomix init` to create a default configuration.'
    });
  }

  return results;
}

/**
 * Check directory permissions
 */
export async function checkPermissions(projectRoot = process.cwd()) {
  const results = [];
  const dirsToCheck = ['.', 'src'];

  for (const dir of dirsToCheck) {
    const dirPath = join(projectRoot, dir);
    if (!existsSync(dirPath)) continue;

    try {
      accessSync(dirPath, constants.R_OK | constants.W_OK);
      results.push({
        name: `Permissions: ${dir}`,
        status: 'pass',
        message: 'Read/Write access granted',
        suggestion: null
      });
    } catch (error) {
      results.push({
        name: `Permissions: ${dir}`,
        status: 'fail',
        message: 'Insufficient permissions',
        suggestion: `Grant read/write permissions to the '${dir}' directory.`
      });
    }
  }

  return results;
}
