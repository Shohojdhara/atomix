/**
 * Main build configuration entry point
 * Exports all build configurations for use in rollup.config.js
 */

export { 
  allBuilds, 
  allBuildsWithChunks, // Recommended: Code-split builds following performance audit
  jsBuilds, 
  jsBuildsWithChunks, // Recommended: Code-split JS builds
  stylesBuilds,
  entryBuilds, // Entry point builds for code-split chunks
  entryJsBuilds, // JavaScript-only entry point builds (for parallel builds)
  entryTypesBuilds, // Type definition entry point builds (for parallel builds)
} from './config/builds.js';
export { esmBuild, cjsBuild, minifiedBuild, typesBuild, esmBuildChunked } from './config/builds.js';
export { stylesBuild, stylesMinifiedBuild } from './config/builds.js';

