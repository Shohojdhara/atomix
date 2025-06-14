// Export all components individually for better tree-shaking
export * from './components';

// Export lib utilities
export * from './lib';

// Export layouts
export * from './layouts';

// Create a properly typed default export
const atomix = {
  // Re-export all components and utilities
  ...require('./components'),
  composables: require('./lib').composables,
  utils: require('./lib').utils,
  constants: require('./lib').constants,
  layouts: require('./layouts')
};

// Default export
export default atomix;
