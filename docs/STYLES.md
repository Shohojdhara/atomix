# Importing Styles

Atomix provides multiple ways to import styles depending on your build setup and preferences.

## CSS Import (Recommended)

Import the compiled CSS file in your main application file:

```javascript
// Import the complete CSS bundle
import '@shohojdhara/atomix/styles';
// or
import '@shohojdhara/atomix/dist/index.css';
```

## SCSS Import (Advanced)

If you're using Sass/SCSS in your project, you can import the source SCSS files for more customization:

```scss
// Import the complete SCSS bundle
@import '@shohojdhara/atomix/scss';
// or
@import '@shohojdhara/atomix/src/styles/index.scss';
```

## HTML Link Tag

You can also include the CSS via a link tag in your HTML:

```html
<link rel="stylesheet" href="node_modules/@shohojdhara/atomix/dist/index.css">
```

## Build Tool Configuration

### Webpack
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

### Vite
```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@shohojdhara/atomix/scss';`
      }
    }
  }
};
```

### Next.js
```javascript
// next.config.js
module.exports = {
  transpilePackages: ['@shohojdhara/atomix']
};

// In your _app.js or layout
import '@shohojdhara/atomix/styles';
```

## Available Style Files

- `dist/index.css` - Complete compiled CSS (235.9kB)
- `dist/index.min.css` - Minified CSS
- `src/styles/index.scss` - Source SCSS files for customization

## Customization

When importing SCSS files, you can override variables before importing:

```scss
// Define your custom variables
$atomix-primary: #your-color;
$atomix-border-radius: 8px;

// Then import Atomix styles
@import '@shohojdhara/atomix/scss';
```