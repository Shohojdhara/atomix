/**
 * Rollup build configuration for JavaScript builds only
 * Used for parallel builds
 */

import { esmBuild, cjsBuild, minifiedBuild, entryJsBuilds } from './rollup/index.js';

// Export JavaScript builds (ESM, CJS, minified, entry points)
// Note: typesBuild and entryTypesBuilds are excluded - they're built separately in rollup.config.types.js
export default [esmBuild, cjsBuild, minifiedBuild, ...entryJsBuilds];

