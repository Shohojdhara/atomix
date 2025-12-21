/**
 * PostCSS configuration for Rollup builds
 */

import { basename } from 'path';

/**
 * PostCSS config for JavaScript builds (no CSS extraction)
 * Used when processing JS/TS files that may import CSS
 */
export const jsPostcssConfig = {
  extract: false,
  minimize: false,
  use: {
    sass: {
      api: 'modern',
      silenceDeprecations: ['legacy-js-api'],
    },
  },
  extensions: ['.css', '.scss', '.sass'],
};

/**
 * Creates PostCSS config for styles builds (with CSS extraction)
 * @param {string} outputFile - Path to the output CSS file (relative to project root)
 * @param {boolean} minimize - Whether to minimize the CSS
 * @returns {object} PostCSS configuration
 */
export const createStylesPostcssConfig = (outputFile, minimize = false) => {
  // Extract path should be relative to the output file's directory
  // Since output is in dist/, we need to extract to the same directory
  // So we use just the filename from the full path
  const filename = basename(outputFile);
  
  return {
    extract: filename, // Extract to same directory as output file
    minimize,
    use: {
      sass: {
        api: 'modern',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
    extensions: ['.css', '.scss', '.sass'],
  };
};

