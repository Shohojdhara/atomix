/**
 * CSS Code Splitting Configuration
 * 
 * Generates per-component CSS files for better code splitting
 */

import postcss from 'rollup-plugin-postcss';
import { createStylesPostcssConfig } from './postcss.js';
import { cleanup } from '../plugins/cleanup.js';

/**
 * Creates a CSS build configuration for a specific component or group
 * 
 * @param {string} componentName - Name of the component or group
 * @param {string} inputPath - Path to the SCSS file
 * @param {boolean} minify - Whether to minify the output
 * @returns {Object} Rollup build configuration
 */
export function createComponentCSSBuild(componentName, inputPath, minify = false) {
  const outputFile = minify
    ? `dist/css/${componentName}.min.css`
    : `dist/css/${componentName}.css`;

  return {
    input: inputPath,
    output: {
      file: `dist/.${componentName}.css.tmp.js`,
      format: 'es',
    },
    plugins: [
      postcss(createStylesPostcssConfig(outputFile, minify)),
      cleanup(`dist/.${componentName}.css.tmp.js`),
    ],
  };
}

/**
 * CSS builds for component groups
 */
export const componentCSSBuilds = [
  // Charts CSS
  createComponentCSSBuild('charts', 'src/styles/06-components/_components.chart.scss', false),
  createComponentCSSBuild('charts', 'src/styles/06-components/_components.chart.scss', true),
  
  // Forms CSS
  createComponentCSSBuild('forms', 'src/styles/06-components/_components.form.scss', false),
  createComponentCSSBuild('forms', 'src/styles/06-components/_components.form.scss', true),
  
  // Layout CSS
  createComponentCSSBuild('layout', 'src/styles/05-objects/_objects.grid.scss', false),
  createComponentCSSBuild('layout', 'src/styles/05-objects/_objects.grid.scss', true),
];

/**
 * Critical CSS components (above-the-fold)
 */
export const criticalCSSComponents = [
  'button',
  'typography',
  'layout',
];

