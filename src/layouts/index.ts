// Export all layout components individually for better tree-shaking
export * from './Grid';
export * from './MasonryGrid';

// Also provide a default export for convenience
import * as Grid from './Grid';
import * as MasonryGrid from './MasonryGrid';

const layouts = {
  ...Grid,
  ...MasonryGrid,
};

export default layouts;
