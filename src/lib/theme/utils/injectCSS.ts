/**
 * CSS Injection Utilities
 *
 * Inject CSS into HTML head via <style> element.
 */

/**
 * Check if running in browser environment
 */
function isBrowser(): boolean {
  return typeof document !== 'undefined';
}

/**
 * Inject CSS into HTML head via <style> element
 *
 * Creates or updates a style element in the document head.
 * If an element with the same ID exists, it will be updated.
 *
 * @param css - CSS string to inject
 * @param id - Style element ID (default: 'atomix-theme')
 *
 * @example
 * ```typescript
 * const css = ':root { --atomix-color-primary: #7AFFD7; }';
 * injectCSS(css);
 *
 * // With custom ID
 * injectCSS(css, 'my-custom-theme');
 * ```
 */
export function injectCSS(css: string, id: string = 'atomix-theme'): void {
  if (!isBrowser()) {
    return;
  }

  let styleElement = document.getElementById(id) as HTMLStyleElement | null;

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = id;
    styleElement.setAttribute('data-atomix-theme', 'true');
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = css;
}

/**
 * Remove injected CSS from DOM
 *
 * Removes the style element with the given ID from the document head.
 *
 * @param id - Style element ID to remove (default: 'atomix-theme')
 *
 * @example
 * ```typescript
 * removeCSS(); // Removes default 'atomix-theme'
 * removeCSS('my-custom-theme'); // Removes custom ID
 * ```
 */
export function removeCSS(id: string = 'atomix-theme'): void {
  if (!isBrowser()) {
    return;
  }

  const styleElement = document.getElementById(id);
  if (styleElement) {
    styleElement.remove();
  }
}

/**
 * Check if CSS is already injected
 *
 * @param id - Style element ID to check (default: 'atomix-theme')
 * @returns True if style element exists
 */
export function isCSSInjected(id: string = 'atomix-theme'): boolean {
  if (!isBrowser()) {
    return false;
  }

  return document.getElementById(id) !== null;
}
