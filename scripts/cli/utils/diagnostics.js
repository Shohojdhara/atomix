/**
 * Atomix CLI Diagnostics Utility
 * Shared logic for environment and project health checks
 */

import { execSync } from 'child_process';
import { existsSync, accessSync, constants, readdirSync } from 'fs';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { logger } from './logger.js';
import { configLoader } from '../internal/config-loader.js';

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
 * Check CLI plugins
 */
export async function checkPlugins() {
  const results = [];
  const config = await configLoader.load();
  
  if (!config.plugins || config.plugins.length === 0) {
    results.push({
      name: 'Plugins',
      status: 'pass',
      message: 'No plugins registered',
      suggestion: null
    });
    return results;
  }

  for (const pluginEntry of config.plugins) {
    const pluginName = typeof pluginEntry === 'string' ? pluginEntry : pluginEntry.name;
    
    try {
      // In a real scenario, we'd check if the module is resolvable
      // For now, we'll just report their presence
      results.push({
        name: `Plugin: ${pluginName}`,
        status: 'pass',
        message: 'Registered in configuration',
        suggestion: null
      });
    } catch (error) {
      results.push({
        name: `Plugin: ${pluginName}`,
        status: 'fail',
        message: `Error checking plugin: ${error.message}`,
        suggestion: 'Verify the plugin path or package name.'
      });
    }
  }

  return results;
}

/**
 * Check if running in the Atomix monorepo (internal development)
 */
async function isAtomixMonorepo(projectRoot) {
  try {
    const packageJsonPath = join(projectRoot, 'package.json');
    if (!existsSync(packageJsonPath)) return false;
    
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    // Check if this is the Atomix monorepo by package name or structure
    const packageName = packageJson.name || '';
    const isAtomixPackage = packageName.includes('atomix') && 
                           (packageName.startsWith('@shohojdhara/') || 
                            packageName.startsWith('@atomix/') ||
                            packageName === 'atomix');
    
    return isAtomixPackage || existsSync(join(projectRoot, 'packages'));
  } catch {
    return false;
  }
}

/**
 * Check project structure
 */
export async function checkProjectStructure(projectRoot = process.cwd()) {
  const results = [];
  const requiredDirs = ['src'];
  const recommendedDirs = ['themes', 'docs'];
  const internalDirs = ['scripts/cli']; // Only required for Atomix monorepo development
  
  const isMonorepo = await isAtomixMonorepo(projectRoot);

  // Check required directories (always checked)
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

  // Check internal directories (only for Atomix monorepo)
  for (const dir of internalDirs) {
    const dirPath = join(projectRoot, dir);
    const exists = existsSync(dirPath);
    
    if (isMonorepo) {
      // In monorepo, this is required
      results.push({
        name: `Directory: ${dir}`,
        status: exists ? 'pass' : 'fail',
        message: exists ? 'Exists' : 'Missing',
        suggestion: exists ? null : `Create the '${dir}' directory in your project root.`
      });
    } else {
      // In external projects, skip this check entirely (don't show as fail/warn/pass)
      // This directory is only needed for internal Atomix development
    }
  }

  // Check recommended directories
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
          name: 'Configuration',
          status: 'pass',
          message: `Found ${file} and readable`,
          suggestion: null
        });
      } catch (error) {
        results.push({
          name: 'Configuration',
          status: 'fail',
          message: `Error reading ${file}: ${error.message}`,
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
 * Check design tokens (01-settings). CLI discovers tokens from src/styles/01-settings/_settings.*.scss
 * and optionally from atomix.config tokenEngine / tokens entry.
 */
export async function checkTokens(projectRoot = process.cwd()) {
  const results = [];
  const settingsDir = join(projectRoot, 'src/styles/01-settings');

  if (!existsSync(settingsDir)) {
    results.push({
      name: 'Tokens',
      status: 'warn',
      message: 'None configured (optional)',
      suggestion: 'Add token files or a theme for design token support. Token discovery: src/styles/01-settings/_settings.*.scss. See Atomix token docs.'
    });
    return results;
  }

  try {
    const files = readdirSync(settingsDir);
    const tokenFiles = files.filter((f) => f.startsWith('_settings.') && f.endsWith('.scss'));
    const count = tokenFiles.length;
    results.push({
      name: 'Tokens',
      status: 'pass',
      message: count ? `Found ${count} token categor${count === 1 ? 'y' : 'ies'}` : 'None configured (optional)',
      suggestion: count ? null : 'Add _settings.*.scss in src/styles/01-settings for design tokens.'
    });
  } catch (error) {
    results.push({
      name: 'Tokens',
      status: 'warn',
      message: `Could not read 01-settings: ${error.message}`,
      suggestion: null
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
