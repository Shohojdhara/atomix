/**
 * Atomix CLI Security Utilities
 * Input sanitization and security-focused validation functions
 */

import { normalize, resolve, relative, isAbsolute } from 'path';
import { logger } from './logger.js';
import chalk from 'chalk';

export const SecurityError = {
  PATH_TRAVERSAL: 'PATH_TRAVERSAL',
  INVALID_INPUT: 'INVALID_INPUT',
  MALICIOUS_CONTENT: 'MALICIOUS_CONTENT',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED'
};

/**
 * Sanitizes user input to prevent injection attacks
 * @param {string} input - The user input to sanitize
 * @param {string} type - The type of input (filename, componentName, path, etc.)
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input, type = 'generic') {
  if (typeof input !== 'string') {
    throw new Error(`Input must be a string, received: ${typeof input}`);
  }

  // Remove null bytes and control characters
  let sanitized = input.replace(/[\x00-\x1F\x7F]/g, '');

  switch (type) {
    case 'filename':
      // Remove path traversal attempts and special characters
      sanitized = sanitized.replace(/\.\.\//g, '')
        .replace(/[<>:"|?*]/g, '')
        .replace(/\/+/g, '')
        .trim();
      break;

    case 'componentName':
      // Enforce PascalCase and remove non-alphanumeric characters
      sanitized = sanitized.replace(/[^a-zA-Z0-9]/g, '');
      if (sanitized.length > 0) {
        sanitized = sanitized.charAt(0).toUpperCase() + sanitized.slice(1);
      }
      break;

    case 'path':
      // Basic path sanitization - more comprehensive validation happens in validatePath
      sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '')
        .replace(/\/\//g, '/')
        .trim();
      break;

    case 'prompt':
      // For AI prompts, remove potentially malicious content but preserve most characters
      sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '')
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/data:/gi, '')
        .trim();
      break;

    default:
      // Generic sanitization
      sanitized = sanitized.trim();
  }

  if (sanitized.length === 0) {
    throw new Error(`Sanitized ${type} input is empty`);
  }

  return sanitized;
}

/**
 * Validates and secures file paths to prevent directory traversal attacks
 * @param {string} inputPath - The path to validate
 * @param {string} basePath - Base directory to resolve against
 * @returns {Object} { isValid: boolean, safePath: string, error?: string }
 */
export function validateSecurePath(inputPath, basePath = process.cwd()) {
  try {
    const normalizedBase = normalize(resolve(basePath));
    const normalizedInput = normalize(isAbsolute(inputPath)
      ? inputPath
      : resolve(basePath, inputPath));

    const relativePath = relative(normalizedBase, normalizedInput);

    // Check for path traversal attempts
    if (relativePath.startsWith('..') || 
        /\/\.\.\//.test(relativePath) ||
        relativePath.includes('..\\')) {
      return {
        isValid: false,
        safePath: '',
        error: 'Path traversal attempt detected'
      };
    }

    // Check for dangerous patterns
    const dangerousPatterns = [
      /\/etc\//,
      /\/proc\//,
      /\/dev\//,
      /\/sys\//,
      /\/root\//,
      /\/bin\//,
      /\/sbin\//,
      /\/usr\/bin\//,
      /\/usr\/sbin\//
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(normalizedInput)) {
        return {
          isValid: false,
          safePath: '',
          error: 'Access to system directories is not allowed'
        };
      }
    }

    return {
      isValid: true,
      safePath: normalizedInput
    };

  } catch (error) {
    return {
      isValid: false,
      safePath: '',
      error: `Path validation failed: ${error.message}`
    };
  }
}

/**
 * Validates component names with enhanced security checks
 * @param {string} name - The component name to validate
 * @returns {Object} { isValid: boolean, error?: string }
 */
export function validateComponentNameSecure(name) {
  try {
    const sanitized = sanitizeInput(name, 'componentName');
    
    if (!sanitized || sanitized.length < 2) {
      return {
        isValid: false,
        error: 'Component name must be at least 2 characters long'
      };
    }

    // Check PascalCase: starts with uppercase, only contains letters and numbers
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(sanitized)) {
      return {
        isValid: false,
        error: 'Component name must be in PascalCase (e.g., Button, CardHeader)'
      };
    }

    // Check for reserved words and potentially dangerous names
    const reservedWords = [
      'Component', 'React', 'Fragment', 'Suspense', 'StrictMode',
      'Error', 'Loading', 'App', 'Root', 'Document', 'Html',
      'Window', 'Document', 'Global', 'Process', 'Console',
      'Eval', 'Function', 'Script', 'Import', 'Require', 'Module'
    ];

    if (reservedWords.includes(sanitized)) {
      return {
        isValid: false,
        error: `"${sanitized}" is a reserved word. Please choose a different name.`
      };
    }

    // Check for potentially malicious patterns
    const maliciousPatterns = [
      /eval/i,
      /script/i,
      /javascript/i,
      /alert/i,
      /prompt/i,
      /confirm/i,
      /onload/i,
      /onerror/i,
      /onclick/i
    ];

    for (const pattern of maliciousPatterns) {
      if (pattern.test(sanitized)) {
        return {
          isValid: false,
          error: 'Component name contains potentially malicious patterns'
        };
      }
    }

    return { isValid: true };

  } catch (error) {
    return {
      isValid: false,
      error: `Component name validation failed: ${error.message}`
    };
  }
}

/**
 * Rate limiter for AI-based generation features
 */
export class RateLimiter {
  constructor(maxRequests = 10, timeWindow = 60000) { // 10 requests per minute
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = new Map();
  }

  checkLimit(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];

    // Remove old requests
    const recentRequests = userRequests.filter(time => now - time < this.timeWindow);
    
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }

    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    return true;
  }

  getRemaining(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    const recentRequests = userRequests.filter(time => now - time < this.timeWindow);
    return Math.max(0, this.maxRequests - recentRequests.length);
  }

  reset() {
    this.requests.clear();
  }
}

/**
 * Creates a backup of a file before overwriting
 * @param {string} filePath - Path to the file to backup
 * @param {string} backupDir - Directory to store backups
 * @returns {Promise<string>} - Path to the backup file
 */
export async function createBackup(filePath, backupDir = '.atomix/backups') {
  const { readFile, writeFile, mkdir } = await import('fs/promises');
  const { join } = await import('path');

  try {
    const content = await readFile(filePath, 'utf8');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `${filePath.split('/').pop()}.backup.${timestamp}`;
    const backupPath = join(backupDir, backupFileName);

    await mkdir(backupDir, { recursive: true });
    await writeFile(backupPath, content, 'utf8');

    logger.debug(`Created backup: ${backupPath}`);
    return backupPath;

  } catch (error) {
    logger.warn(`Failed to create backup for ${filePath}: ${error.message}`);
    throw error;
  }
}

/**
 * Retry mechanism with exponential backoff
 * @param {Function} operation - The async operation to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} initialDelay - Initial delay in ms
 * @returns {Promise<any>} - Result of the operation
 */
export async function retryWithBackoff(operation, maxRetries = 3, initialDelay = 100) {
  let retries = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      retries++;
      
      if (retries > maxRetries) {
        throw error;
      }

      logger.debug(`Retry ${retries}/${maxRetries} after ${delay}ms: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
}