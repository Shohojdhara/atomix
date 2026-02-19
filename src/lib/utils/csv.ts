/**
 * CSV Utility Functions
 */

/**
 * Sanitize cell content to prevent CSV injection
 *
 * Replaces newlines and tabs with spaces, escapes double quotes,
 * and prefixes dangerous characters (=, +, -, @) with a single quote
 * to prevent formula injection.
 */
export function sanitizeCSVCell(cell: any): string {
  const sanitized = String(cell ?? '').replace(/[\r\n\t]/g, ' ').replace(/"/g, '""');
  // Prevent formula injection by prefixing dangerous characters
  const dangerous = /^[=+\-@]/;
  return dangerous.test(sanitized) ? `'${sanitized}` : sanitized;
}
