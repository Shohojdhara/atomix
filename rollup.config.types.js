/**
 * Rollup build configuration for TypeScript declaration builds only
 * Used for parallel builds
 */

import { typesBuild, entryTypesBuilds } from './rollup/index.js';

// Export type declaration builds (main index.d.ts + all entry point .d.ts files)
export default [typesBuild, ...entryTypesBuilds];

