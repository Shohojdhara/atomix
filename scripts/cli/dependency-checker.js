/**
 * Dependency Checker
 * Validates required dependencies before CLI execution
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';


/**
 * Check if a command exists in PATH
 * @param {string} command - Command to check
 * @returns {boolean} Whether command exists
 */

/**
 * Get package version from node_modules
 * @param {string} packageName - Package name
 * @returns {string|null} Version string or null
 */
function getPackageVersion(packageName) {
  try {
    const packageJsonPath = join(process.cwd(), 'node_modules', packageName, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch {
    return null;
  }
}

/**
 * Compare semantic versions
 * @param {string} v1 - First version
 * @param {string} v2 - Second version
 * @returns {number} -1 if v1 < v2, 0 if equal, 1 if v1 > v2
 */
function compareVersions(v1, v2) {
  const parts1 = v1.replace(/^v/, '').split('.').map(Number);
  const parts2 = v2.replace(/^v/, '').split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    
    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }
  
  return 0;
}

/**
 * Validate Node.js version
 * @returns {Object} Validation result
 */
function validateNodeVersion() {
  const version = process.version;
  const minVersion = '18.0.0';
  
  const isValid = compareVersions(version, minVersion) >= 0;
  
  return {
    name: 'Node.js',
    version,
    required: `>= ${minVersion}`,
    valid: isValid,
    message: isValid 
      ? chalk.green(`✓ Node.js ${version} meets minimum requirement`)
      : chalk.red(`✗ Node.js ${version} is below minimum requirement (${minVersion})`)
  };
}

/**
 * Validate npm version
 * @returns {Object} Validation result
 */
function validateNpmVersion() {
  try {
    const version = execSync('npm --version', { encoding: 'utf8' }).trim();
    const minVersion = '8.0.0';
    
    const isValid = compareVersions(version, minVersion) >= 0;
    
    return {
      name: 'npm',
      version,
      required: `>= ${minVersion}`,
      valid: isValid,
      message: isValid
        ? chalk.green(`✓ npm ${version} meets minimum requirement`)
        : chalk.red(`✗ npm ${version} is below minimum requirement (${minVersion})`)
    };
  } catch (error) {
    return {
      name: 'npm',
      version: 'unknown',
      required: '>= 8.0.0',
      valid: false,
      message: chalk.red('✗ npm not found in PATH')
    };
  }
}

/**
 * Validate peer dependencies
 * @returns {Array} Array of validation results
 */
/**
 * Peer dependencies for Atomix CLI.
 * @phosphor-icons/react: minimum 2.0.0 (icons used by components). Exact version not required.
 */
function validatePeerDependencies() {
  const dependencies = [
    { name: 'react', minVersion: '18.0.0' },
    { name: 'react-dom', minVersion: '18.0.0' },
    { name: '@phosphor-icons/react', minVersion: '2.0.0' }
  ];
  
  return dependencies.map(dep => {
    const installedVersion = getPackageVersion(dep.name);
    
    if (!installedVersion) {
      return {
        name: dep.name,
        version: 'not installed',
        required: dep.exactVersion ? `=${dep.exactVersion}` : `>= ${dep.minVersion}`,
        valid: false,
        message: chalk.red(`✗ ${dep.name} not installed`)
      };
    }
    
    let isValid = true;
    let requirement = '';
    
    if (dep.exactVersion) {
      isValid = installedVersion === dep.exactVersion;
      requirement = `=${dep.exactVersion}`;
    } else {
      isValid = compareVersions(installedVersion, dep.minVersion) >= 0;
      requirement = `>= ${dep.minVersion}`;
    }
    
    return {
      name: dep.name,
      version: installedVersion,
      required: requirement,
      valid: isValid,
      message: isValid
        ? chalk.green(`✓ ${dep.name}@${installedVersion} satisfies requirement`)
        : chalk.red(`✗ ${dep.name}@${installedVersion} does not meet requirement (${requirement})`)
    };
  });
}

/**
 * Validate development dependencies
 * @returns {Array} Array of validation results
 */
function validateDevDependencies() {
  const dependencies = [
    { name: '@testing-library/react', optional: true },
    { name: 'vitest', optional: true },
    { name: 'sass', optional: true },
    { name: 'typescript', optional: true }
  ];
  
  return dependencies.map(dep => {
    const installedVersion = getPackageVersion(dep.name);
    
    if (!installedVersion) {
      return {
        name: dep.name,
        version: 'not installed',
        required: 'recommended',
        valid: dep.optional,
        message: dep.optional
          ? chalk.yellow(`⚠ ${dep.name} not installed (optional)`)
          : chalk.red(`✗ ${dep.name} not installed (recommended)`)
      };
    }
    
    return {
      name: dep.name,
      version: installedVersion,
      required: 'installed',
      valid: true,
      message: chalk.green(`✓ ${dep.name}@${installedVersion} installed`)
    };
  });
}

/**
 * Check project structure
 * @returns {Array} Array of validation results
 */
export function validateProjectStructure() {
  const recommendedDirs = [
    { path: 'src', description: 'Source directory', required: true },
    { path: 'src/components', description: 'Components directory', required: true },
    { path: 'src/styles', description: 'Styles directory', required: true },
    { path: 'src/lib/composables', description: 'Generated hooks directory', required: false },
    { path: 'src/lib/constants', description: 'Component constants directory', required: false },
    { path: 'src/lib/types', description: 'Type definitions directory', required: false },
    { path: 'src/styles/01-settings', description: 'Component settings directory', required: false },
    { path: 'src/styles/06-components', description: 'Component styles directory', required: false },
    { path: 'stories', description: 'Storybook stories directory', required: false },
    { path: 'tests', description: 'Test files directory', required: false }
  ];
  
  const results = [];
  
  recommendedDirs.forEach(dir => {
    const fullPath = join(process.cwd(), dir.path);
    const exists = existsSync(fullPath);
    
    results.push({
      name: dir.path,
      status: exists ? 'exists' : (dir.required ? 'missing' : 'recommended'),
      required: dir.required,
      valid: exists || !dir.required,
      message: exists
        ? chalk.green(`✓ ${dir.description} exists`)
        : (dir.required 
            ? chalk.red(`✗ ${dir.description} missing (required)`)
            : chalk.yellow(`⚠ ${dir.description} missing (recommended)`))
    });
  });
  
  return results;
}

/**
 * Validate framework-specific configuration
 * @returns {Array} Array of validation results
 */
export function validateFrameworkConfig() {
  const configs = [
    { 
      name: 'Next.js', 
      file: 'next.config.js',
      description: 'Next.js configuration'
    },
    { 
      name: 'Vite', 
      file: 'vite.config.ts',
      description: 'Vite configuration'
    },
    {
      name: 'Vite (JS)',
      file: 'vite.config.js',
      description: 'Vite configuration'
    }
  ];

  const results = [];
  let foundFramework = false;

  for (const config of configs) {
    if (existsSync(join(process.cwd(), config.file))) {
      foundFramework = true;
      results.push({
        name: config.name,
        status: 'found',
        valid: true,
        message: chalk.green(`✓ ${config.description} found (${config.file})`)
      });
    }
  }

  if (!foundFramework) {
    results.push({
      name: 'Framework',
      status: 'not_found',
      valid: true,
      message: chalk.gray('• No common framework configuration detected (Next.js/Vite)')
    });
  }

  return results;
}

/**
 * Perform all dependency checks
 * @returns {Object} Complete validation results
 */
export async function checkDependencies() {
  console.log(chalk.blue('🔍 Validating Atomix CLI dependencies...\n'));
  
  const results = {
    system: [
      validateNodeVersion(),
      validateNpmVersion()
    ],
    peerDependencies: validatePeerDependencies(),
    devDependencies: validateDevDependencies(),
    projectStructure: validateProjectStructure()
  };
  
  // Display results
  Object.entries(results).forEach(([category, checks]) => {
    if (checks.length > 0) {
      console.log(chalk.bold.underline(category.replace(/([A-Z])/g, ' $1').trim()));
      checks.forEach(check => {
        console.log(`  ${check.message}`);
      });
      console.log('');
    }
  });
  
  // Calculate overall status
  const allChecks = [].concat(...Object.values(results));
  const failedChecks = allChecks.filter(check => !check.valid);
  const warningChecks = allChecks.filter(check => check.valid === null || !check.valid && check.required === 'recommended');
  
  if (failedChecks.length === 0) {
    console.log(chalk.green.bold('✅ All required dependencies are satisfied!'));
    console.log(chalk.gray('You\'re ready to use the Atomix CLI.\n'));
    return { success: true, warnings: warningChecks.length };
  } else {
    console.log(chalk.red.bold(`❌ ${failedChecks.length} dependency issues found:`));
    failedChecks.forEach(check => {
      console.log(chalk.red(`   • ${check.name}: ${check.message.replace(/✗ /, '')}`));
    });
    
    console.log(chalk.yellow('\n💡 To fix these issues:'));
    console.log(chalk.gray('   Run: npm install react@^18.0.0 react-dom@^18.0.0'));
    console.log(chalk.gray('   See: docs/CLI_PEER_DEPENDENCIES.md\n'));
    
    return { success: false, errors: failedChecks.length, warnings: warningChecks.length };
  }
}

/**
 * Quick dependency check for CI/CD
 * @returns {boolean} Whether all dependencies are valid
 */
export async function quickDependencyCheck() {
  const nodeCheck = validateNodeVersion();
  const npmCheck = validateNpmVersion();
  const peerChecks = validatePeerDependencies();
  
  return nodeCheck.valid && npmCheck.valid && peerChecks.every(check => check.valid);
}

export default {
  checkDependencies,
  quickDependencyCheck,
  validateNodeVersion,
  validateNpmVersion,
  validatePeerDependencies,
  validateProjectStructure,
  validateFrameworkConfig
};
