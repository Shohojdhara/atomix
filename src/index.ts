// Re-export with namespaces for backwards compatibility
import * as components from './components';
import * as lib from './lib';
import * as layouts from './layouts';

// Create a properly typed default export
const atomix = {
  // Export components
  ...components,
  // Export lib utilities
  composables: lib.composables,
  utils: lib.utils,
  constants: lib.constants,
  layouts: layouts
};


export default atomix;
