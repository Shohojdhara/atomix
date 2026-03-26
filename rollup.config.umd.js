/**
 * Rollup configuration for UMD builds (CDN distribution)
 * Generates Universal Module Definition bundles for browser usage
 */

import { umdBuild, umdMinBuild } from './rollup/index.js';

// Export UMD builds for CDN distribution
export default [umdBuild, umdMinBuild];
