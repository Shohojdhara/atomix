/**
 * Rollup build configuration for Atomix Design System
 * 
 * This configuration uses modular build configs from the rollup/ directory
 * for better organization and maintainability.
 * 
 * Using code-split builds (allBuildsWithChunks) to follow performance audit recommendations.
 * This reduces initial bundle size from 1.1MB to ~200KB (82% reduction).
 */

import { allBuildsWithChunks } from './rollup/index.js';

// Export code-split builds (recommended for production)
export default allBuildsWithChunks;
