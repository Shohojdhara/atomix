import postcss from 'rollup-plugin-postcss';
import { readFileSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Function to get all theme directories
function getThemeEntries() {
  const themesDir = path.resolve(__dirname, 'src/themes');
  const distDir = path.resolve(__dirname, 'dist/themes');
  
  try {
    const themes = readdirSync(themesDir).filter(file => 
      statSync(path.join(themesDir, file)).isDirectory()
    );
    
    const entries = [];
    
    // Add entries for each theme
    themes.forEach(theme => {
      const themeIndex = path.resolve(themesDir, theme, 'index.scss');
      const themeDist = path.resolve(distDir, `${theme}.css`);
      const themeMinDist = path.resolve(distDir, `${theme}.min.css`);
      
      // Regular theme build
      entries.push({
        input: themeIndex,
        output: {
          file: themeDist,
        },
        plugins: [
          postcss({
            ...basePostcssConfig,
            extract: true, // Let Rollup handle the output path
          }),
        ],
      });
      
      // Minified theme build
      entries.push({
        input: themeIndex,
        output: {
          file: themeMinDist,
        },
        plugins: [
          postcss({
            ...basePostcssConfig,
            extract: true, // Let Rollup handle the output path
            minimize: true,
          }),
        ],
      });
    });
    
    return entries;
  } catch (error) {
    console.warn('Could not read themes directory:', error.message);
    return [];
  }
}

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

// Theme configurations
const themeConfigs = getThemeEntries();

// Export all configurations
export default [...stylesConfigs, ...themeConfigs];