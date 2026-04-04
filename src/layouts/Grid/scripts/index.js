/**
 * @file Grid Scripts Index
 * @description Entry point for vanilla JavaScript grid implementations
 */

export * from './Grid.js';
export * from './GridCol.js';
export * from './Row.js';

/**
 * Combine grid components for easy initialization
 * @param {Object} options - Global initialization options
 * @param {string} [options.gridSelector='[data-grid]'] - Grid element selector
 * @param {string} [options.colSelector='[data-grid-col]'] - Grid column selector
 * @param {string} [options.rowSelector='[data-row]'] - Row element selector
 * @returns {Object} Grid instances by type
 */
export function initGridComponents(options = {}) {
  const { 
    gridSelector = '[data-grid]', 
    colSelector = '[data-grid-col]', 
    rowSelector = '[data-row]' 
  } = options;

  const grids = typeof initGrids === 'function' ? initGrids(gridSelector) : [];
  const columns = typeof initGridCols === 'function' ? initGridCols(colSelector) : [];
  const rows = typeof initRows === 'function' ? initRows(rowSelector) : [];

  return {
    grids,
    columns,
    rows,
    destroy: () => {
      [...grids, ...columns, ...rows].forEach(instance => {
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
    initGridComponents();
  });
}