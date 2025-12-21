/**
 * Terser configuration for code minification
 */

/**
 * Terser config for non-minified builds (ESM and CJS)
 * Removes console.log/debug but keeps code readable
 */
export const terserConfigNonMinified = {
  compress: {
    drop_console: ['log', 'debug'],
    pure_funcs: ['console.log', 'console.debug'],
    passes: 2,
  },
  mangle: false,
  format: {
    comments: 'all',
    beautify: true,
  },
};

/**
 * Terser config for production minified builds
 * Aggressive optimization with all console statements removed
 */
export const terserConfigMinified = {
  compress: {
    drop_console: true,
    pure_funcs: ['console.log', 'console.debug', 'console.info'],
    passes: 3,
    unsafe: true,
    unsafe_comps: true,
    warnings: false,
  },
  mangle: {
    safari10: true, // Fix Safari 10 bugs
  },
  format: {
    comments: false,
  },
};

