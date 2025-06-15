import SideMenu from './SideMenu';
import { SIDE_MENU } from '../../../lib/constants/components';

/**
 * Parse data attributes from an element to create side menu options
 * @param element - The side menu element
 * @returns Parsed options object
 */
function parseDataAttributes(element: HTMLElement): any {
  const dataset = element.dataset;

  return {
    collapsible: dataset.collapsible !== 'false',
    open: dataset.open === 'true',
    title: dataset.title || '',
    keyboard: dataset.keyboard !== 'false',
    autoOpen: dataset.autoOpen !== 'false',
  };
}

/**
 * Initialize side menu components from data attributes
 * Finds all elements with [data-side-menu] and creates SideMenu instances
 *
 * @example
 * ```html
 * <div class="c-side-menu" data-side-menu data-collapsible="true" data-auto-open="true">
 *   <div class="c-side-menu__toggler">
 *     <span class="c-side-menu__title">Navigation</span>
 *     <span class="c-side-menu__toggler-icon">▶</span>
 *   </div>
 *   <div class="c-side-menu__wrapper">
 *     <div class="c-side-menu__inner">
 *       <!-- menu content -->
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * @returns Array of created SideMenu instances
 */
export function initFromDataAttributes(): SideMenu[] {
  const instances: SideMenu[] = [];

  document.querySelectorAll('[data-side-menu]').forEach(element => {
    const options = parseDataAttributes(element as HTMLElement);
    const instance = new SideMenu(element as HTMLElement, options);
    instances.push(instance);

    // Store instance reference on the element for later retrieval
    (element as any)._sideMenuInstance = instance;
  });

  return instances;
}

/**
 * Get a side menu instance from an element
 * @param element - The side menu element or selector
 * @returns The SideMenu instance or null if not found
 */
export function getInstance(element: string | HTMLElement): SideMenu | null {
  const el =
    typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;

  if (!el) return null;

  return (el as any)._sideMenuInstance || null;
}

/**
 * Create a new side menu instance programmatically
 * @param element - The side menu element or selector
 * @param options - Configuration options
 * @returns New SideMenu instance
 */
export function create(element: string | HTMLElement, options: any = {}): SideMenu {
  const instance = new SideMenu(element, options);

  // Store instance reference
  const el =
    typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;

  if (el) {
    (el as any)._sideMenuInstance = instance;
  }

  return instance;
}

/**
 * Dispose all side menu instances
 * Destroys all side menu instances and cleans up references
 */
export function disposeAll(): void {
  document.querySelectorAll(SIDE_MENU.SELECTORS.SIDE_MENU).forEach(element => {
    const instance = (element as any)._sideMenuInstance;
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
      delete (element as any)._sideMenuInstance;
    }
  });
}

/**
 * Open all side menu instances
 */
export function openAll(): void {
  document.querySelectorAll(SIDE_MENU.SELECTORS.SIDE_MENU).forEach(element => {
    const instance = (element as any)._sideMenuInstance;
    if (instance && typeof instance.open === 'function') {
      instance.open();
    }
  });
}

/**
 * Close all side menu instances
 */
export function closeAll(): void {
  document.querySelectorAll(SIDE_MENU.SELECTORS.SIDE_MENU).forEach(element => {
    const instance = (element as any)._sideMenuInstance;
    if (instance && typeof instance.close === 'function') {
      instance.close();
    }
  });
}

/**
 * Toggle all side menu instances
 */
export function toggleAll(): void {
  document.querySelectorAll(SIDE_MENU.SELECTORS.SIDE_MENU).forEach(element => {
    const instance = (element as any)._sideMenuInstance;
    if (instance && typeof instance.toggle === 'function') {
      instance.toggle();
    }
  });
}

/**
 * Get all side menu instances
 * @returns Array of all SideMenu instances
 */
export function getAllInstances(): SideMenu[] {
  const instances: SideMenu[] = [];

  document.querySelectorAll(SIDE_MENU.SELECTORS.SIDE_MENU).forEach(element => {
    const instance = (element as any)._sideMenuInstance;
    if (instance) {
      instances.push(instance);
    }
  });

  return instances;
}

/**
 * Set active menu item across all side menus
 * @param href - The href to match for setting active state
 */
export function setActiveByHref(href: string): void {
  document.querySelectorAll(SIDE_MENU.SELECTORS.SIDE_MENU).forEach(element => {
    const instance = (element as any)._sideMenuInstance;
    if (instance && typeof instance.setActiveItem === 'function') {
      instance.setActiveItem(`[href="${href}"]`);
    }
  });
}

/**
 * Set active menu item by text content
 * @param text - The text content to match for setting active state
 */
export function setActiveByText(text: string): void {
  document.querySelectorAll(SIDE_MENU.SELECTORS.SIDE_MENU).forEach(element => {
    const links = element.querySelectorAll(SIDE_MENU.SELECTORS.LINK);

    // Remove active from all links
    links.forEach(link => {
      link.classList.remove(SIDE_MENU.CLASSES.ACTIVE);
      link.removeAttribute('aria-current');
    });

    // Find and activate matching link
    links.forEach(link => {
      if (link.textContent?.trim() === text) {
        link.classList.add(SIDE_MENU.CLASSES.ACTIVE);
        link.setAttribute('aria-current', 'page');
      }
    });
  });
}

/**
 * Event delegation helper for side menu togglers
 * Handles clicks on side menu togglers throughout the document
 */
export function setupGlobalEventDelegation(): void {
  document.addEventListener('click', event => {
    const target = event.target as HTMLElement;
    const toggler = target.closest(SIDE_MENU.SELECTORS.TOGGLER);

    if (toggler) {
      const sideMenu = toggler.closest(SIDE_MENU.SELECTORS.SIDE_MENU);
      if (sideMenu) {
        const instance = getInstance(sideMenu as HTMLElement);
        if (instance) {
          event.preventDefault();
          instance.toggle();
        }
      }
    }
  });

  // Handle keyboard events for togglers
  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      const toggler = target.closest(SIDE_MENU.SELECTORS.TOGGLER);

      if (toggler) {
        const sideMenu = toggler.closest(SIDE_MENU.SELECTORS.SIDE_MENU);
        if (sideMenu) {
          const instance = getInstance(sideMenu as HTMLElement);
          if (instance) {
            event.preventDefault();
            instance.toggle();
          }
        }
      }
    }
  });
}

/**
 * Auto-set active menu items based on current URL
 */
export function autoSetActiveFromURL(): void {
  const currentPath = window.location.pathname;
  const currentHref = window.location.href;

  // Try to match by full href first, then by pathname
  setActiveByHref(currentHref);

  // If no match found, try pathname
  if (!document.querySelector(`${SIDE_MENU.SELECTORS.LINK}.${SIDE_MENU.CLASSES.ACTIVE}`)) {
    setActiveByHref(currentPath);
  }
}
