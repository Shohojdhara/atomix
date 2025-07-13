// Export DOM utilities
export * from './dom';

// Export other utilities as needed

// Export icon utilities
export * from './icons';

// Export theme utilities
export * from './theme-manager';

/**
 * Generate a UUID v4 compatible string without relying on Node.js crypto
 * This is a browser-compatible alternative to the uuid package
 * @returns A UUID v4 compatible string
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
