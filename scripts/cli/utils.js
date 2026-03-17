/**
 * Atomix CLI Utils Barrel
 * Re-exports for tests and backward compatibility. Prefer importing from utils/*.js in command code.
 */

import { validateSecurePath, validateComponentNameSecure } from './utils/security.js';
import { validateThemeName } from './utils/validation.js';
import { sanitizeInput, fileExists } from './utils/helpers.js';
import { AtomixCLIError, ErrorCategory } from './utils/error.js';
import { resolve, normalize } from 'path';

/**
 * Validates path: security check and sensitive file check.
 * @param {string} inputPath - Path to validate
 * @param {string} basePath - Base directory (defaults to process.cwd())
 * @returns {{ isValid: boolean, error?: string, safePath?: string }}
 */
function validatePath(inputPath, basePath = process.cwd()) {
  const normalized = normalize(resolve(basePath, inputPath));
  const sensitive = ['.env', '.npmrc', '.env.local', '.env.production', 'id_rsa', '.ssh'];
  if (sensitive.some(s => normalized.includes(s))) {
    return { isValid: false, error: 'Path targets a sensitive path and is not allowed.' };
  }
  const result = validateSecurePath(inputPath, basePath);
  const error = result.error === 'Path traversal attempt detected'
    ? 'Path is outside the project directory.'
    : (result.error || null);
  return {
    isValid: result.isValid,
    error,
    safePath: result.safePath || null
  };
}

/** Sync component name validation (PascalCase, reserved words). Use validation.validateComponentName for async. */
const validateComponentName = validateComponentNameSecure;

export {
  validatePath,
  validateComponentName,
  validateThemeName,
  sanitizeInput,
  fileExists,
  AtomixCLIError,
  ErrorCategory
};
