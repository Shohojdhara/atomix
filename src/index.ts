// Export components and utilities with namespaces to avoid conflicts
import * as components from './components';
import * as lib from './lib';

// Re-export with namespaces
export { components };
export { lib };

// Create a properly typed default export without spreading
// This avoids TypeScript errors with internal types like UseAccordionResult
const Atomix = {
  // Export components explicitly
  ...components,
  // Export lib utilities explicitly
  // We avoid spreading lib directly to prevent TypeScript errors with internal types
  composables: lib.composables,
  utils: lib.utils,
  types: lib.types,
  constants: lib.constants
};

export default Atomix;
