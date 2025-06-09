// Entry point for React components

// Export all React components
export * from './components';

// Export utilities and types
export * from './lib';

// Create a default export for UMD build
const AtomixReact = {
  // Re-export all components
  ...require('./components'),
  // Re-export utilities and types
  ...require('./lib')
};

export default AtomixReact;