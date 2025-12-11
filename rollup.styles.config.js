import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

// Base PostCSS configuration
const basePostcssConfig = {
  extract: true,
  use: {
    sass: {
      api: 'modern',
      silenceDeprecations: ['legacy-js-api'],
    },
  },
  extensions: ['.css', '.scss', '.sass'],
};

// Main styles configurations
const stylesConfigs = [
  // Main styles build
  {
    input: 'src/styles/index.scss',
    output: {
      file: 'dist/atomix.css',
    },
    plugins: [
      postcss({
        ...basePostcssConfig,
        extract: true, // Let Rollup handle the output path
      }),
    ],
  },
  // Minified main styles build
  {
    input: 'src/styles/index.scss',
    output: {
      file: 'dist/atomix.min.css',
    },
    plugins: [
      postcss({
        ...basePostcssConfig,
        extract: true, // Let Rollup handle the output path
        minimize: true,
      }),
    ],
  },
];

// Export styles configurations
export default stylesConfigs;