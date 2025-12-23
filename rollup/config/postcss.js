/**
 * PostCSS configuration for Rollup builds
 */

import postcssImport from 'postcss-import';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

/**
 * PostCSS config for JavaScript builds (no CSS extraction)
 * Used when processing JS/TS files that may import CSS
 */
export const jsPostcssConfig = {
  extract: false,
  minimize: false,
  sourceMap: true,
  use: {
    sass: {
      api: 'modern',
      silenceDeprecations: ['legacy-js-api'],
      sourceMap: true,
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
    minimize: false, // We'll use cssnano plugin instead for better control
    sourceMap: true,
    use: {
      sass: {
        api: 'modern',
        silenceDeprecations: ['legacy-js-api'],
        sourceMap: true,
      },
    },
    plugins: [
      postcssImport(),
      postcssFlexbugsFixes(),
      postcssPresetEnv({
        autoprefixer: {
          flexbox: 'no-2009',
          grid: 'autoplace',
        },
        stage: 3,
        features: {
          'custom-properties': false, // We use CSS custom properties, don't transform them
          'nesting-rules': true,
        },
      }),
      autoprefixer(),
      ...(minimize
        ? [
            cssnano({
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                  normalizeWhitespace: false,
                },
              ],
            }),
          ]
        : []),
    ],
    extensions: ['.css', '.scss', '.sass'],
  };
};

