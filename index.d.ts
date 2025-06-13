// Type definitions for @shohojdhara/atomix
// Export component types as namespace
import * as components from './dist/types/components';
export { components };

// Export utility types as namespace
import * as lib from './dist/types/lib';
export { lib };

// Define the type for the default export
declare const Atomix: {
  // Include all components
  [key: string]: any;
  // Explicitly include lib namespaces to match implementation
  composables: typeof lib.composables;
  utils: typeof lib.utils;
  types: typeof lib.types;
  constants: typeof lib.constants;
};

export default Atomix;
