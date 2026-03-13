/**
 * Atomix CLI Validation Utilities
 */

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
