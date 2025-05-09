import Pagination from './index';

// Export the main component class for potential direct instantiation
export { Pagination };

// Export the static initializer for convenience
export const initializeAllPaginators = Pagination.initializeAll;

// Assign to a global namespace if required by the project's conventions
// (e.g., for use in contexts without module loaders)
if (typeof window !== 'undefined') {
  (window as any).Atomix = (window as any).Atomix || {};
  (window as any).Atomix.Pagination = Pagination;
  (window as any).Atomix.initializeAllPaginators = initializeAllPaginators;
}
