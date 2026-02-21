// Export all components individually for better tree-shaking
export * from './components';

// Export lib utilities
export * from './lib';

// Export theme tools for developer-friendly usage
export * from './lib/theme-tools';

// Export layouts
export * from './layouts';

// Export specific types that need to be named
export type { AnimatedChartProps } from './components/Chart/AnimatedChart';
export type { MultiAxisChartProps } from './components/Chart/MultiAxisChart';

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
};

// Default export
export default atomix;
