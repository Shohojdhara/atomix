/**
 * CLI Utility Functions
 * Provides common utilities for the Atomix CLI including security, validation, and helpers
 */

import { resolve, relative, isAbsolute, normalize } from 'path';
import { access } from 'fs/promises';

/**
 * Enhanced Error Class for CLI
 */
export class AtomixCLIError extends Error {
  constructor(message, code, suggestions = []) {
    super(message);
    this.name = 'AtomixCLIError';
    this.code = code;
    this.suggestions = suggestions;
  }
}

/**
 * Validates and sanitizes file paths to prevent directory traversal attacks
 * @param {string} inputPath - The path to validate
 * @param {string} basePath - The base directory (defaults to process.cwd())
 * @returns {Object} { isValid: boolean, safePath: string, error?: string }
 */
export function validatePath(inputPath, basePath = process.cwd()) {
  try {
    // Normalize the paths to remove any '..' or '.' segments
    const normalizedBase = normalize(resolve(basePath));
    const normalizedInput = normalize(isAbsolute(inputPath)
      ? inputPath
      : resolve(basePath, inputPath));

    // Check if the resolved path is within the base directory
    const relativePath = relative(normalizedBase, normalizedInput);

    // If the relative path starts with '..', it's outside the base directory
    if (relativePath.startsWith('..')) {
      return {
        isValid: false,
        safePath: null,
        error: 'Path is outside the project directory'
      };
    }

    // Additional checks for sensitive paths
    const sensitivePatterns = [
      /^\.git/,
      /node_modules/,
      /^\.env/,
      /\.pem$/,
      /\.key$/,
      /private/i,
      /secret/i
    ];

    for (const pattern of sensitivePatterns) {
      if (pattern.test(relativePath)) {
        return {
          isValid: false,
          safePath: null,
          error: `Access to sensitive path is restricted: ${pattern}`
        };
      }
    }

    return {
      isValid: true,
      safePath: normalizedInput,
      error: null
    };
  } catch (error) {
    return {
      isValid: false,
      safePath: null,
      error: `Invalid path: ${error.message}`
    };
  }
}

/**
 * Validates component names according to PascalCase convention
 * @param {string} name - The component name to validate
 * @returns {Object} { isValid: boolean, error?: string }
 */
export function validateComponentName(name) {
  if (!name || typeof name !== 'string') {
    return {
      isValid: false,
      error: 'Component name must be a non-empty string'
    };
  }

  // Check PascalCase: starts with uppercase, only contains letters and numbers
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
    return {
      isValid: false,
      error: 'Component name must be in PascalCase (e.g., Button, CardHeader)'
    };
  }

  // Check for reserved words
  const reservedWords = [
    'Component', 'React', 'Fragment', 'Suspense', 'StrictMode',
    'Error', 'Loading', 'App', 'Root', 'Document', 'Html'
  ];

  if (reservedWords.includes(name)) {
    return {
      isValid: false,
      error: `"${name}" is a reserved word. Please choose a different name.`
    };
  }

  // Check minimum length
  if (name.length < 2) {
    return {
      isValid: false,
      error: 'Component name must be at least 2 characters long'
    };
  }

  return { isValid: true };
}

/**
 * Validates theme names according to kebab-case convention
 * @param {string} name - The theme name to validate
 * @returns {Object} { isValid: boolean, error?: string }
 */
export function validateThemeName(name) {
  if (!name || typeof name !== 'string') {
    return {
      isValid: false,
      error: 'Theme name must be a non-empty string'
    };
  }

  // Check kebab-case: lowercase letters, numbers, and hyphens
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    return {
      isValid: false,
      error: 'Theme name must be lowercase and use hyphens (e.g., dark-theme)'
    };
  }

  // Check for consecutive hyphens
  if (/--/.test(name)) {
    return {
      isValid: false,
      error: 'Theme name cannot contain consecutive hyphens'
    };
  }

  // Check for trailing hyphen
  if (name.endsWith('-')) {
    return {
      isValid: false,
      error: 'Theme name cannot end with a hyphen'
    };
  }

  return { isValid: true };
}

/**
 * Sanitizes user input to prevent injection attacks
 * @param {string} input - The user input to sanitize
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return String(input);
  }

  // Remove any shell metacharacters that could be dangerous
  // Added single and double quotes to the blacklist to prevent shell injection
  return input
    .replace(/[;&|`$<>\\'"]/g, '')
    .replace(/\0/g, '') // Remove null bytes
    .trim();
}

/**
 * Checks if a file exists and is accessible
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>}
 */
export async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if running in CI environment
 * @returns {boolean}
 */
export function isCI() {
  return !!(
    process.env.CI ||
    process.env.CONTINUOUS_INTEGRATION ||
    process.env.GITHUB_ACTIONS ||
    process.env.GITLAB_CI ||
    process.env.CIRCLECI ||
    process.env.TRAVIS ||
    process.env.JENKINS_URL
  );
}

/**
 * Checks if running in debug mode
 * @returns {boolean}
 */
export function isDebug() {
  return process.env.ATOMIX_DEBUG === 'true' ||
    process.argv.includes('--debug') ||
    process.argv.includes('-d');
}

/**
 * Formats file size in human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size
 */
export function formatFileSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Debounce function for watch mode
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Creates a safe file path for cross-platform compatibility
 * @param {...string} segments - Path segments
 * @returns {string} Safe file path
 */
export function safePath(...segments) {
  // Filter out empty segments and join with proper separator
  return segments
    .filter(Boolean)
    .join('/')
    .replace(/\/+/g, '/') // Remove duplicate slashes
    .replace(/\\/g, '/'); // Convert Windows backslashes
}

/**
 * Validates SCSS/CSS color values
 * @param {string} color - Color value to validate
 * @returns {boolean}
 */
export function isValidColor(color) {
  const patterns = [
    /^#[0-9A-F]{3}$/i,        // #RGB
    /^#[0-9A-F]{4}$/i,        // #RGBA
    /^#[0-9A-F]{6}$/i,        // #RRGGBB
    /^#[0-9A-F]{8}$/i,        // #RRGGBBAA
    /^rgb\(/i,                 // rgb()
    /^rgba\(/i,                // rgba()
    /^hsl\(/i,                 // hsl()
    /^hsla\(/i,                // hsla()
    /^var\(--/                 // CSS custom property
  ];

  return patterns.some(pattern => pattern.test(color));
}

/**
 * Extracts and validates npm scripts from package.json
 * @param {Object} packageJson - Parsed package.json content
 * @param {Array<string>} requiredScripts - List of required script names
 * @returns {Object} { valid: boolean, missing: Array<string> }
 */
export function validateNpmScripts(packageJson, requiredScripts = []) {
  const scripts = packageJson.scripts || {};
  const missing = requiredScripts.filter(script => !scripts[script]);

  return {
    valid: missing.length === 0,
    missing
  };
}

/**
 * Generates a unique ID for components/themes
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
export function generateId(prefix = 'atomix') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Checks Node.js version compatibility
 * @param {string} requiredVersion - Minimum required version (e.g., '18.0.0')
 * @returns {Object} { compatible: boolean, current: string, required: string }
 */
export function checkNodeVersion(requiredVersion = '18.0.0') {
  const currentVersion = process.version.substring(1); // Remove 'v' prefix
  const current = currentVersion.split('.').map(Number);
  const required = requiredVersion.split('.').map(Number);

  let compatible = true;
  for (let i = 0; i < required.length; i++) {
    if (current[i] < required[i]) {
      compatible = false;
      break;
    } else if (current[i] > required[i]) {
      break;
    }
  }

  return {
    compatible,
    current: currentVersion,
    required: requiredVersion
  };
}

export default {
  validatePath,
  validateComponentName,
  validateThemeName,
  sanitizeInput,
  fileExists,
  isCI,
  isDebug,
  formatFileSize,
  debounce,
  safePath,
  isValidColor,
  validateNpmScripts,
  generateId,
  checkNodeVersion
};
