/**
 * PostCSS configuration for Rollup builds
 */

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
  // Use the full path for extract to ensure CSS files are generated
  // in the correct output directory (e.g., 'dist/atomix.css')
  return {
    extract: outputFile, // Extract to the specified output file path
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

