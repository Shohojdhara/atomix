import Navbar from './index';
import { NAVBAR } from '../../../lib/constants/components';

/**
 * Parse data attributes from an element to create navbar options
 * @param element - The navbar element
 * @returns Parsed options object
 */
function parseDataAttributes(element: HTMLElement): any {
  const dataset = element.dataset;
  
  return {
    collapsible: dataset.collapsible !== 'false',
    expanded: dataset.expanded === 'true',
    position: dataset.position || 'static',
    backdrop: dataset.backdrop === 'true',
    keyboard: dataset.keyboard !== 'false',
    autoClose: dataset.autoClose !== 'false',
  };
}

/**
 * Initialize navbar components from data attributes
 * Finds all elements with [data-navbar] and creates Navbar instances
 * 
 * @example
 * ```html
 * <nav class="c-navbar" data-navbar data-collapsible="true" data-auto-close="true">
 *   <!-- navbar content -->
 * </nav>
 * ```
 * 
 * @returns Array of created Navbar instances
 */
export function initFromDataAttributes(): Navbar[] {
  const instances: Navbar[] = [];
  
  document.querySelectorAll('[data-navbar]').forEach(element => {
    const options = parseDataAttributes(element as HTMLElement);
    const instance = new Navbar(element as HTMLElement, options);
    instances.push(instance);
    
    // Store instance reference on the element for later retrieval
    (element as any)._navbarInstance = instance;
  });
  
  return instances;
}

/**
 * Get a navbar instance from an element
 * @param element - The navbar element or selector
 * @returns The Navbar instance or null if not found
 */
export function getInstance(element: string | HTMLElement): Navbar | null {
  const el = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element;
    
  if (!el) return null;
  
  return (el as any)._navbarInstance || null;
}

/**
 * Create a new navbar instance programmatically
 * @param element - The navbar element or selector
 * @param options - Configuration options
 * @returns New Navbar instance
 */
export function create(element: string | HTMLElement, options: any = {}): Navbar {
  const instance = new Navbar(element, options);
  
  // Store instance reference
  const el = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element;
    
  if (el) {
    (el as any)._navbarInstance = instance;
  }
  
  return instance;
}

/**
 * Dispose all navbar instances
 * Destroys all navbar instances and cleans up references
 */
export function disposeAll(): void {
  document.querySelectorAll(NAVBAR.SELECTORS.NAVBAR).forEach(element => {
    const instance = (element as any)._navbarInstance;
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
      delete (element as any)._navbarInstance;
    }
  });
}

/**
 * Expand all navbar instances
 */
export function expandAll(): void {
  document.querySelectorAll(NAVBAR.SELECTORS.NAVBAR).forEach(element => {
    const instance = (element as any)._navbarInstance;
    if (instance && typeof instance.expand === 'function') {
      instance.expand();
    }
  });
}

/**
 * Collapse all navbar instances
 */
export function collapseAll(): void {
  document.querySelectorAll(NAVBAR.SELECTORS.NAVBAR).forEach(element => {
    const instance = (element as any)._navbarInstance;
    if (instance && typeof instance.collapse === 'function') {
      instance.collapse();
    }
  });
}

/**
 * Toggle all navbar instances
 */
export function toggleAll(): void {
  document.querySelectorAll(NAVBAR.SELECTORS.NAVBAR).forEach(element => {
    const instance = (element as any)._navbarInstance;
    if (instance && typeof instance.toggle === 'function') {
      instance.toggle();
    }
  });
}

/**
 * Get all navbar instances
 * @returns Array of all Navbar instances
 */
export function getAllInstances(): Navbar[] {
  const instances: Navbar[] = [];
  
  document.querySelectorAll(NAVBAR.SELECTORS.NAVBAR).forEach(element => {
    const instance = (element as any)._navbarInstance;
    if (instance) {
      instances.push(instance);
    }
  });
  
  return instances;
}

/**
 * Event delegation helper for navbar toggle buttons
 * Handles clicks on navbar togglers throughout the document
 */
export function setupGlobalEventDelegation(): void {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const toggler = target.closest(NAVBAR.SELECTORS.TOGGLER);
    
    if (toggler) {
      const navbar = toggler.closest(NAVBAR.SELECTORS.NAVBAR);
      if (navbar) {
        const instance = getInstance(navbar as HTMLElement);
        if (instance) {
          event.preventDefault();
          instance.toggle();
        }
      }
    }
  });
}