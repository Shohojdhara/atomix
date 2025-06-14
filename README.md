# Atomix Design System

Atomix is a modern component library for React web applications.

## Installation

```bash
npm install @shohojdhara/atomix
```

## Usage

### Importing Components

```tsx
// Import specific components
import { Button, Card } from '@shohojdhara/atomix';

// Or import the default export
import Atomix from '@shohojdhara/atomix';
const { Button, Card } = Atomix;
```

### Importing Types

```tsx
// Import component props types directly
import { ButtonProps, CardProps } from '@shohojdhara/atomix';

// Import specific types
import { Size, ThemeColor } from '@shohojdhara/atomix/types/common';
import { CardProps } from '@shohojdhara/atomix/types/components';

// Import all common types
import * as AtomixTypes from '@shohojdhara/atomix/types';
```

### CSS Styles

```tsx
// Import default CSS
import '@shohojdhara/atomix/css';

// Or minified CSS
import '@shohojdhara/atomix/css/min';

// Or import SCSS for customization
import '@shohojdhara/atomix/scss';
```

## Documentation

For full documentation, visit [our Storybook](https://liimonx.github.io/atomix).
Atomix is a modern, flexible design system that provides both React components and vanilla JavaScript functionality for building beautiful web applications.

## NPM Package

The Atomix npm package now includes source files and configuration files, allowing for more customization options. See [NPM_PUBLISHING.md](./NPM_PUBLISHING.md) for more details on how to use these files.

## Installation

```bash
npm install atomix
# or
yarn add atomix
```

## Usage

### React Components

```jsx
import React from 'react';
import { Button, Modal, Tooltip } from '@shohojdhara/atomix';
// or import directly
import { Button, Modal, Tooltip } from '@shohojdhara/atomix';

// Import the CSS
import '@shohojdhara/atomix/css';

function App() {
  return (
    <div>
      <Button variant="primary" size="md">Click Me</Button>
      <Tooltip content="This is a tooltip">Hover me</Tooltip>
    </div>
  );
}
```

### TypeScript Support

Atomix includes comprehensive TypeScript declarations for all components and utilities:

```tsx
import React from 'react';
import { Button, Card, useColorMode } from '@shohojdhara/atomix';

// Component props are fully typed
const MyComponent: React.FC = () => {
  // Typed hooks
  const { colorMode, setColorMode } = useColorMode();
  
  return (
    <Card title="TypeScript Example" className="my-card">
      <Button 
        variant="primary" 
        size="md"
        onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
      >
        Toggle Theme
      </Button>
    </Card>
  );
}
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>Atomix Example</title>
  <!-- Include the CSS -->
  <link rel="stylesheet" href="node_modules/atomix/dist/css/atomix-0.1.0.styles.css">
</head>
<body>
  <!-- Button component -->
  <button class="c-btn c-btn--primary c-btn--md">Click Me</button>
  
  <!-- Tooltip component -->
  <div class="c-tooltip" data-tooltip="This is a tooltip">
    <span class="c-tooltip__trigger">Hover me</span>
  </div>

  <!-- Include the JavaScript -->
  <script src="node_modules/atomix/dist/js/atomix-0.1.0.vanilla.js"></script>
  <script>
    // Initialize all components
    document.addEventListener('DOMContentLoaded', function() {
      // Atomix is available as a global variable
      Atomix.initializeAll();
      
      // Or initialize specific components
      // Atomix.Button.initializeAll();
      // Atomix.Tooltip.initializeAll();
    });
  </script>
</body>
</html>
```

Alternatively, you can import the vanilla JS version in your JavaScript files:

```js
// Import the vanilla JS version
import Atomix from 'atomix/vanilla';

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
  Atomix.initializeAll();
});
```


## Documentation

For detailed documentation and examples, visit our [documentation site](https://github.com/liimonx/atomix).

## License

MIT
