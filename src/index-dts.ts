// Export all components individually for better tree-shaking
export * from './components';

// Export lib utilities
export * from './lib';

// Export layouts
export * from './layouts';

// Create a properly typed default export
import * as components from './components';
import { composables, utils, constants, types } from './lib';
import * as layouts from './layouts';

const atomix = {
  // Re-export all components and utilities
  ...components,
  composables,
  utils,
  constants,
  types,
  layouts,
};

// Default export
export default atomix;
