// Export all components individually for better tree-shaking
export * from './components';

// Export lib utilities
export * from './lib';

// Export layouts
export * from './layouts';

// Create a properly typed default export
import * as components from './components';
import * as layouts from './layouts';
import { composables, constants, types, utils } from './lib';

// Create the default export with proper typing
const atomix = {
  // Re-export all components and utilities
  ...components,
  composables,
  utils,
  constants,
  types,
  layouts,
} as const;

// Default export
export default atomix;
