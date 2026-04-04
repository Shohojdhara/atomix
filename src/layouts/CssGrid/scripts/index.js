/**
 * @file CssGrid Scripts Index
 * @description Entry point for vanilla JavaScript CSS Grid implementation
 */

export * from './CssGrid.js';

/**
 * Initialize CSS Grid components on page load
 * @param {string} [selector='[data-css-grid]'] - CSS selector for CSS Grid elements
 * @param {Object} [defaultOptions={}] - Default CSS Grid options
 */
export function initCssGrids(selector = '[data-css-grid]', defaultOptions = {}) {
  const elements = document.querySelectorAll(selector);
  const grids = [];

  elements.forEach(element => {
    const options = {
      ...defaultOptions,
      ...(element.dataset.cssGridOptions ? JSON.parse(element.dataset.cssGridOptions) : {})
    };

    grids.push(CssGrid({ element, ...options }));
  });

  return {
    grids,
    destroy: () => {
      grids.forEach(instance => {
        if (instance && typeof instance.destroy === 'function') {
          instance.destroy();
        }
      });
    }
  };
}

// Auto-initialize when imported in browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initCssGrids();
  });
}