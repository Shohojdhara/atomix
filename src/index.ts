import './styles/index.scss';
// Export all components individually for better tree-shaking
export * from './components';

// Export lib utilities
export * from './lib';

// Export layouts
export * from './layouts';

// Export showcase

// Create a properly typed default export
import * as components from './components';
import * as layouts from './layouts';
import { composables, constants, types, utils } from './lib';
import type { AnimatedChartProps } from './components';

// Define a type for our main export
type AtomixType = typeof components &
  typeof layouts & {
    composables: typeof composables;
    utils: typeof utils;
    constants: typeof constants;
    types: typeof types;
  };

const atomix: AtomixType = {
  // Re-export all components and utilities
  ...components,
  composables,
  utils,
  constants,
  types,
  ...layouts,
};

// Default export
export default atomix;
