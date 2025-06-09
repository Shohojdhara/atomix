// Entry point for React components

// Export all components
export * from './components';

// Export utilities and hooks

// Export type definitions
export type {
  ButtonProps,
  CardProps,
  // Add all component prop types here for better TypeScript support
} from './lib';

// Import components and utilities for default export
import * as components from './components';
import * as utilities from './lib';

// Create a default export combining all features
const AtomixReact: Record<string, unknown> = {
  ...components,
  ...utilities,
};

export default AtomixReact;