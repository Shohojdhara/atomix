# Atomix CDN Distribution Guide

This guide explains how to use Atomix Design System directly in the browser via CDN, without any build tools.

## Quick Start

### 1. Load Dependencies

Atomix requires React, ReactDOM, and Phosphor Icons to be loaded first:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atomix CDN Example</title>
  
  <!-- Load Atomix CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.min.css">
</head>
<body>
  <div id="root"></div>

  <!-- Load React and ReactDOM (development versions) -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  
  <!-- Load Phosphor Icons -->
  <script src="https://unpkg.com/@phosphor-icons/react@2.1.10/umd/index.js"></script>
  
  <!-- Load Atomix -->
  <script src="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.umd.min.js"></script>
  
  <script>
    // Access Atomix components via the global Atomix object
    const { Button, ThemeProvider, Card } = Atomix;
    
    function App() {
      return React.createElement(
        ThemeProvider,
        { theme: 'default-light' },
        React.createElement(
          'div',
          { style: { padding: '20px' } },
          React.createElement(Button, { children: 'Click Me' })
        )
      );
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(App));
  </script>
</body>
</html>
```

## CDN Providers

### jsDelivr (Recommended)
```html
<script src="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.umd.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.min.css">
```

### unpkg
```html
<script src="https://unpkg.com/@shohojdhara/atomix@0.5.1/dist/atomix.umd.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@shohojdhara/atomix@0.5.1/dist/atomix.min.css">
```

## Available Components

All Atomix components are available under the global `Atomix` object:

```javascript
// Destructure components you need
const {
  // Layout
  Grid, MasonryGrid, Container,
  
  // Basic Components
  Button, Badge, Card, Icon, Avatar,
  
  // Forms
  Form, Input, Select, Checkbox, Radio, Toggle,
  
  // Navigation
  Navigation, Breadcrumb, Pagination, Tabs,
  
  // Feedback
  Alert, Modal, Spinner, Progress, Toast,
  
  // Data Display
  Table, DataTable, Chart, List,
  
  // Media
  VideoPlayer, PhotoViewer,
  
  // Advanced
  AtomixGlass, EdgePanel, Callout,
  
  // Utilities
  ThemeProvider, useTheme, createTheme
} = Atomix;
```

## Usage with JSX (via Babel Standalone)

For a more React-like experience, you can use Babel standalone to write JSX:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Atomix with JSX</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.min.css">
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>

  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@phosphor-icons/react@2.1.10/umd/index.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.umd.min.js"></script>
  
  <script type="text/babel">
    const { Button, Card, ThemeProvider } = Atomix;
    
    function App() {
      return (
        <ThemeProvider theme="default-light">
          <div style={{ padding: '20px' }}>
            <h1>Welcome to Atomix</h1>
            <Card>
              <p>This is a card component</p>
              <Button variant="primary">Click Me</Button>
            </Card>
          </div>
        </ThemeProvider>
      );
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

## Version Pinning

Always pin to specific versions in production:

```html
<!-- ✅ Good: Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.umd.min.js"></script>

<!-- ⚠️ Use with caution: Latest version (may break) -->
<script src="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix/dist/atomix.umd.min.js"></script>
```

## Performance Optimization

### Load from Multiple CDNs

For better reliability, you can use different CDNs for different resources:

```html
<!-- React from unpkg -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>

<!-- Atomix from jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.umd.min.js"></script>
```

### Use Production Versions

For production, always use minified versions:

```html
<!-- ✅ Production -->
<script src="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.umd.min.js"></script>

<!-- ❌ Development (larger file size) -->
<script src="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.umd.js"></script>
```

## Limitations

When using Atomix via CDN:

1. **No Tree-shaking**: All components are loaded, even if you only use a few
2. **Global Namespace**: All components are under the `Atomix` global object
3. **CSS Required**: You must manually include the CSS file
4. **No SCSS Customization**: Cannot customize via SCSS variables (use CSS custom properties instead)

## Alternative: Modern Bundlers

For production applications, we recommend using a bundler (Vite, Webpack, etc.):

```bash
npm install @shohojdhara/atomix
```

```jsx
import { Button, ThemeProvider } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';
```

This provides better performance, tree-shaking, and TypeScript support.

## Troubleshooting

### "Atomix is not defined"

Make sure the script tags are in the correct order and all dependencies are loaded:

```html
<!-- 1. React first -->
<script src=".../react/umd/react.production.min.js"></script>

<!-- 2. ReactDOM -->
<script src=".../react-dom/umd/react-dom.production.min.js"></script>

<!-- 3. Phosphor Icons -->
<script src=".../@phosphor-icons/react/umd/index.js"></script>

<!-- 4. Atomix last -->
<script src=".../atomix/dist/atomix.umd.min.js"></script>
```

### Components Not Styling Correctly

Ensure the CSS file is loaded:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shohojdhara/atomix@0.5.1/dist/atomix.min.css">
```

### Version Mismatch Errors

Check that all Atomix packages use the same version:

```html
<!-- ✅ Same version everywhere -->
<link rel="stylesheet" href=".../atomix@0.5.1/dist/atomix.min.css">
<script src=".../atomix@0.5.1/dist/atomix.umd.min.js"></script>
```

## Examples

See the `/examples` directory in the repository for complete working examples:
- `gap-utilities-example.html` - Pure HTML/CSS example
- `astro-example/` - Astro framework integration
- `GapUtilitiesDemo.tsx` - React component example

## Support

For issues or questions:
- GitHub Issues: https://github.com/Shohojdhara/atomix/issues
- Documentation: https://github.com/Shohojdhara/atomix#readme
