import './styles/index.scss';

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

// Define a type for our main export
type AtomixType = typeof components & {
  composables: typeof composables;
  utils: typeof utils;
  constants: typeof constants;
  types: typeof types;
} & typeof layouts;

const atomix: AtomixType = {
  // Re-export all components and utilities
  ...components,
  ...layouts,
  composables,
  utils,
  constants,
  types,
} as const;

// Default export
export default atomix;
