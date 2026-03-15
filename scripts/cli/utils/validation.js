/**
 * Atomix CLI Validation Utilities
 */

/**
 * Validates component names according to PascalCase convention
 * @param {string} name - The component name to validate
 * @returns {Object} { isValid: boolean, error?: string }
 */
export async function validateComponentName(name) {
  // Use the enhanced security validation
  const { validateComponentNameSecure } = await import('./security.js');
  return validateComponentNameSecure(name);
}

/**
 * Validates theme names according to kebab-case convention
 */
export function validateThemeName(name) {
  if (!name || typeof name !== 'string') return { isValid: false, error: 'Theme name must be a string' };
  if (!/^[a-z][a-z0-9-]*$/.test(name)) return { isValid: false, error: 'Theme name must be kebab-case' };
  if (/--/.test(name)) return { isValid: false, error: 'Cannot contain consecutive hyphens' };
  if (name.endsWith('-')) return { isValid: false, error: 'Cannot end with a hyphen' };
  return { isValid: true };
}

/**
 * Validates SCSS/CSS color values
 */
export function isValidColor(color) {
  const patterns = [
    /^#[0-9A-F]{3,8}$/i,
    /^(rgb|rgba|hsl|hsla)\(/i,
    /^var\(--/
  ];
  return patterns.some(pattern => pattern.test(color));
}
