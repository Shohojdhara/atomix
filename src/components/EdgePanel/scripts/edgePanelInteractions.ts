import EdgePanel, { initializeEdgePanels } from './index';
import { EDGE_PANEL } from '../../../lib/constants/components';
import { addClass, removeClass } from '../../../lib/utils/dom';

/**
 * Apply custom animation effects for EdgePanel
 * @param panel - Edge panel element
 */
export function applyCustomAnimations(panel: HTMLElement): void {
  const container = panel.querySelector(EDGE_PANEL.SELECTORS.CONTAINER) as HTMLElement;
  const backdrop = panel.querySelector(EDGE_PANEL.SELECTORS.BACKDROP) as HTMLElement;

  if (!container) return;

  // Custom panel opening animation
  panel.addEventListener('edgepanel:open', () => {
    // Force a reflow before adding animation classes
    container.offsetHeight;

    addClass(container, 'is-animating');

    if (backdrop) {
      addClass(backdrop, 'is-animating');
    }

    setTimeout(() => {
      removeClass(container, 'is-animating');

      if (backdrop) {
        removeClass(backdrop, 'is-animating');
      }
    }, EDGE_PANEL.ANIMATION_DURATION);
  });

  // Custom panel closing animation
  panel.addEventListener('edgepanel:close', () => {
    // Force a reflow before adding animation classes
    container.offsetHeight;

    addClass(container, 'is-animating-out');

    if (backdrop) {
      addClass(backdrop, 'is-animating-out');
    }

    setTimeout(() => {
      removeClass(container, 'is-animating-out');

      if (backdrop) {
        removeClass(backdrop, 'is-animating-out');
      }
    }, EDGE_PANEL.ANIMATION_DURATION);
  });
}

/**
 * Initialize edge panels with custom behavior
 * @returns Array of edge panel instances
 */
export function initializeEdgePanelsWithCustomBehavior(): EdgePanel[] {
  const instances = initializeEdgePanels() as EdgePanel[];

  // Get all panel elements
  const panels = document.querySelectorAll<HTMLElement>(EDGE_PANEL.SELECTORS.PANEL);

  // Apply custom animations to each panel
  panels.forEach(panel => {
    applyCustomAnimations(panel);
    applyResponsiveHandling(panel);
  });

  return instances;
}

/**
 * Apply responsive behavior based on breakpoints
 * @param panel - Edge panel element
 */
export function applyResponsiveHandling(panel: HTMLElement): void {
  // Check for responsive data attribute
  const responsiveBreakpoint = panel.dataset.responsiveBreakpoint;

  if (!responsiveBreakpoint) return;

  // Function to check if the breakpoint is triggered
  const checkBreakpoint = () => {
    // Get the panel instance
    const instance = (panel as any).edgePanelInstance as EdgePanel;
    if (!instance) return;

    // Check appropriate breakpoint based on the value
    let breakpointTriggered = false;

    switch (responsiveBreakpoint) {
      case 'sm':
        breakpointTriggered = window.innerWidth <= 576;
        break;
      case 'md':
        breakpointTriggered = window.innerWidth <= 768;
        break;
      case 'lg':
        breakpointTriggered = window.innerWidth <= 992;
        break;
      case 'xl':
        breakpointTriggered = window.innerWidth <= 1200;
        break;
      default:
        // If it's a number
        if (!isNaN(Number(responsiveBreakpoint))) {
          breakpointTriggered = window.innerWidth <= Number(responsiveBreakpoint);
        }
    }

    // Apply the appropriately class based on breakpoint
    if (breakpointTriggered) {
      panel.classList.add('is-responsive-active');
    } else {
      panel.classList.remove('is-responsive-active');
    }
  };

  // Initial check
  checkBreakpoint();

  // Check on resize
  window.addEventListener('resize', checkBreakpoint);
}

/**
 * Open a specific edge panel by selector or ID
 * @param selector - CSS selector or ID of the panel to open
 */
export function openEdgePanel(selector: string): void {
  const isIdSelector = selector.startsWith('#');
  const panel = document.querySelector<HTMLElement>(isIdSelector ? selector : `#${selector}`);

  if (panel) {
    const instance = (panel as any).edgePanelInstance as EdgePanel;
    if (instance) {
      instance.openPanel();
    } else {
      // Try to initialize if not already
      const newInstance = new EdgePanel(panel);
      (panel as any).edgePanelInstance = newInstance;
      newInstance.openPanel();
    }
  } else {
    console.warn(`EdgePanel: No panel found with selector ${selector}`);
  }
}

/**
 * Close a specific edge panel by selector or ID
 * @param selector - CSS selector or ID of the panel to close
 */
export function closeEdgePanel(selector: string): void {
  const isIdSelector = selector.startsWith('#');
  const panel = document.querySelector<HTMLElement>(isIdSelector ? selector : `#${selector}`);

  if (panel) {
    const instance = (panel as any).edgePanelInstance as EdgePanel;
    if (instance) {
      instance.closePanel();
    }
  }
}

/**
 * Close all edge panels on the page
 */
export function closeAllEdgePanels(): void {
  const panels = document.querySelectorAll<HTMLElement>(EDGE_PANEL.SELECTORS.PANEL);

  panels.forEach(panel => {
    const instance = (panel as any).edgePanelInstance as EdgePanel;
    if (instance) {
      instance.closePanel();
    }
  });
}

/**
 * Toggle a specific edge panel by selector or ID
 * @param selector - CSS selector or ID of the panel to toggle
 */
export function toggleEdgePanel(selector: string): void {
  const isIdSelector = selector.startsWith('#');
  const panel = document.querySelector<HTMLElement>(isIdSelector ? selector : `#${selector}`);

  if (panel) {
    const instance = (panel as any).edgePanelInstance as EdgePanel;
    if (instance) {
      // Check if it's open
      if (panel.classList.contains(EDGE_PANEL.CLASSES.IS_OPEN)) {
        instance.closePanel();
      } else {
        instance.openPanel();
      }
    } else {
      // Initialize and open if not already initialized
      const newInstance = new EdgePanel(panel);
      (panel as any).edgePanelInstance = newInstance;
      newInstance.openPanel();
    }
  }
}
