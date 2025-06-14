// Type definitions for @shohojdhara/atomix

// Import component types
import * as components from './dist/types/components/index';
import * as lib from './dist/types/lib/index';
import * as layouts from './dist/types/layouts/index';

// Define the type for the default export
declare const Atomix: {
  // Export all components
  [key: string]: any;
  
  // Explicitly include lib namespaces
  composables: typeof lib.composables;
  utils: typeof lib.utils;
  constants: typeof lib.constants;
  layouts: typeof layouts;
} & typeof components;

// Export all components individually
export * from './dist/types/components/index';

// Export lib utilities
export * from './dist/types/lib/index';

// Export layouts
export * from './dist/types/layouts/index';

// Default export
export default Atomix;
