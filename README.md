# Atomix Design System

Atomix is a modern, flexible design system that provides both React components and vanilla JavaScript functionality for building beautiful web applications.

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
import { Button, Modal, Tooltip } from 'atomix';
// or import from the React-specific entry point
import { Button, Modal, Tooltip } from 'atomix/react';

// Import the CSS
import 'atomix/css';

function App() {
  return (
    <div>
      <Button variant="primary" size="md">Click Me</Button>
      <Tooltip content="This is a tooltip">Hover me</Tooltip>
    </div>
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

## Available Components

Atomix includes the following components:

- Accordion
- Avatar
- Badge
- Breadcrumb
- Button
- Callout
- Card
- ColorModeToggle
- Countdown
- DataTable
- DatePicker
- Dropdown
- EdgePanel
- Form components
- Hero
- Icon
- List
- Messages
- Modal
- Navbar
- Pagination
- PhotoViewer
- Popover
- ProductReview
- Progress
- Rating
- River
- SectionIntro
- Spinner
- Steps
- Tab
- Testimonial
- Todo
- Toggle
- Tooltip
- Upload

## Documentation

For detailed documentation and examples, visit our [documentation site](https://github.com/liimonx/atomix).

## License

MIT
