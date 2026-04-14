// 05-webpack-config.js
// ─────────────────────────────────────────────────────────────────────────────
// Webpack + sass-loader configuration for projects using Atomix SCSS.
// ─────────────────────────────────────────────────────────────────────────────
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                // Allows @use 'node_modules/...' without the full path
                loadPaths: [
                  path.resolve(__dirname, 'node_modules'),
                ],
              },
              // Inject token overrides into every SCSS file automatically.
              // Variables declared here override Atomix !default values.
              additionalData: `
                $primary: #6366f1;
                $font-family-base: 'Inter', sans-serif;
              `,
            },
          },
        ],
      },
    ],
  },
};

// ─── Usage in your SCSS files after this config ───────────────────────────────
//
// @use '@shohojdhara/atomix/src/styles/01-settings/index' as *;
// @use '@shohojdhara/atomix/src/styles/02-tools/index' as *;
// @use '@shohojdhara/atomix/src/styles/06-components/components.button' as *;
