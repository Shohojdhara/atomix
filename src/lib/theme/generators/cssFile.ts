/**
 * CSS File Utilities
 * 
 * Save CSS to file system (Node.js only).
 */

/**
 * Save CSS to file
 * 
 * Writes CSS string to a file. Only works in Node.js environment.
 * 
 * @param css - CSS string to save
 * @param filePath - Output file path
 * @throws Error if called in browser environment
 * 
 * @example
 * ```typescript
 * const css = ':root { --atomix-color-primary: #7AFFD7; }';
 * await saveCSSFile(css, './themes/custom.css');
 * ```
 */
export async function saveCSSFile(
  css: string,
  filePath: string
): Promise<void> {
  // Check if in browser environment
  if (typeof window !== 'undefined') {
    throw new Error(
      'saveCSSFile can only be used in Node.js environment. ' +
      'Use injectCSS() for browser environments.'
    );
  }

  // Dynamic import to avoid bundling Node.js modules in browser builds
  const fs = await import('fs/promises');
  const path = await import('path');

  // Ensure directory exists
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });

  // Write file
  await fs.writeFile(filePath, css, 'utf8');
}

/**
 * Save CSS to file (synchronous version)
 * 
 * Synchronous version of saveCSSFile. Only works in Node.js environment.
 * 
 * @param css - CSS string to save
 * @param filePath - Output file path
 * @throws Error if called in browser environment
 */
export function saveCSSFileSync(css: string, filePath: string): void {
  // Check if in browser environment
  if (typeof window !== 'undefined') {
    throw new Error(
      'saveCSSFileSync can only be used in Node.js environment. ' +
      'Use injectCSS() for browser environments.'
    );
  }

  // Use require for synchronous file operations
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('path');

  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write file
  fs.writeFileSync(filePath, css, 'utf8');
}

