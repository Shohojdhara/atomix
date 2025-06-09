// Entry point for React components

// Export all components
export * from './components';

// Export utilities and hooks

// Import components and utilities for default export
import * as components from './components';
import * as utilities from './lib';

// Create a default export combining all features
const AtomixReact: Record<string, unknown> = {
  ...components,
  ...utilities,
};

export default AtomixReact;