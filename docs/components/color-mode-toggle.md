# ColorModeToggle

The ColorModeToggle component provides a button to switch between light and dark color modes. It automatically detects system preferences and persists user preferences in localStorage.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
  - [Basic Usage](#basic-usage)
  - [With Custom Styling](#with-custom-styling)

## Overview

The ColorModeToggle component allows users to switch between light and dark color modes in your application. It automatically respects system preferences and remembers user choices using localStorage.

## Features

- Light/dark mode toggle
- Automatic system preference detection
- User preference persistence with localStorage
- Responsive to system theme changes
- Accessible with proper ARIA attributes
- Customizable styling
- SVG icons for both modes

## Installation

```bash
npm install @shohojdhara/atomix
```

Import the component and styles:

```tsx
import { ColorModeToggle } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';
```

## Usage

```tsx
import { ColorModeToggle } from '@shohojdhara/atomix';

export function Header() {
  return (
    <header>
      <h1>My Website</h1>
      <ColorModeToggle />
    </header>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | `''` | Additional CSS class names |

## Examples

### Basic Usage

```tsx
import { ColorModeToggle } from '@shohojdhara/atomix';

export function BasicExample() {
  return (
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>
          <ColorModeToggle />
        </li>
      </ul>
    </nav>
  );
}
```

### With Custom Styling

```tsx
import { ColorModeToggle } from '@shohojdhara/atomix';

export function StyledExample() {
  return (
    <div className="theme-toggle-container">
      <span>Toggle theme:</span>
      <ColorModeToggle className="custom-theme-toggle" />
    </div>
  );
}
```

### Integration with Theme System

To fully utilize the ColorModeToggle, you should also implement CSS that responds to the color mode. The component sets a `data-atomix-color-mode` attribute on the document body.

```css
/* Light mode styles (default) */
body {
  --background-color: #ffffff;
  --text-color: #333333;
  --border-color: #e0e0e0;
}

/* Dark mode styles */
body[data-atomix-color-mode="dark"] {
  --background-color: #1a1a1a;
  --text-color: #ffffff;
  --border-color: #444444;
}

/* Apply variables to elements */
body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.card {
  border: 1px solid var(--border-color);
}
```

The ColorModeToggle component automatically:
1. Detects the user's system preference for dark/light mode
2. Checks for any previously saved preference in localStorage
3. Updates the `data-atomix-color-mode` attribute on the body element
4. Saves the user's preference to localStorage when changed
5. Responds to system theme changes if no explicit preference is set