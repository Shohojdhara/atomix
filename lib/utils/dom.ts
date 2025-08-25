/**
 * Check if element has a specific class
 * @param element - DOM element to check
 * @param className - Class name to check for
 * @returns Whether element has the class
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * Add class to element if not already present
 * @param element - DOM element to modify
 * @param className - Class name to add
 */
export function addClass(element: HTMLElement, className: string): void {
  if (!hasClass(element, className)) {
    element.classList.add(className);
  }
}

/**
 * Remove class from element if present
 * @param element - DOM element to modify
 * @param className - Class name to remove
 */
export function removeClass(element: HTMLElement, className: string): void {
  if (hasClass(element, className)) {
    element.classList.remove(className);
  }
}

/**
 * Toggle class on element
 * @param element - DOM element to modify
 * @param className - Class name to toggle
 * @param force - If true, adds class; if false, removes class
 */
export function toggleClass(element: HTMLElement, className: string, force?: boolean): void {
  element.classList.toggle(className, force);
}
