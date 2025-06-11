// Export all components explicitly
export * from './components';


// Default export for backward compatibility
import * as components from './components';
import * as utilities from './lib';

const Atomix = {
  ...components,
  ...utilities,
} as any;

export default Atomix;