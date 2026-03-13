/**
 * Atomix CLI Helper Utilities
 */

/**
 * Sanitizes user input to prevent injection attacks
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return String(input);
  return input.replace(/[;&|`$<>\\"']/g, '').replace(/\0/g, '').trim();
}

/**
 * Checks Node.js version compatibility
 */
export function checkNodeVersion(requiredVersion = '18.0.0') {
  const currentVersion = process.version.substring(1);
  const current = currentVersion.split('.').map(Number);
  const required = requiredVersion.split('.').map(Number);

  for (let i = 0; i < required.length; i++) {
    if (current[i] < required[i]) return { compatible: false, current: currentVersion, required: requiredVersion };
    if (current[i] > required[i]) break;
  }
  return { compatible: true, current: currentVersion, required: requiredVersion };
}

/**
 * Formats file size
 */
export function formatFileSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Checks if running in CI environment
 */
export function isCI() {
  return !!(process.env.CI || process.env.GITHUB_ACTIONS || process.env.JENKINS_URL);
}
