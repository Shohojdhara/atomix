# Atomix Implementation Guide

Welcome to the Atomix Implementation Guide! This beginner-friendly document will help you integrate and use the Atomix design system in your projects.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Basic Setup](#basic-setup)
4. [CSS Architecture](#css-architecture)
5. [Using Components](#using-components)
6. [Layout System](#layout-system)
7. [Utility Classes](#utility-classes)
8. [Theming and Customization](#theming-and-customization)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## Introduction

Atomix is a modern, component-based design system built with scalability and flexibility in mind. It follows the BEM methodology for CSS naming and uses an ITCSS architecture for organizing styles.

### Key Features

- **Component-based architecture**: Modular and reusable UI components
- **Responsive by default**: Mobile-first approach
- **Accessibility focused**: WCAG-compliant components
- **Customizable**: Extensive theming capabilities via CSS variables
- **Framework agnostic**: Can be used with React or vanilla HTML/CSS/JS

## Installation

### Peer Dependencies

Atomix requires the following peer dependencies:

- **React 16.8+** (Hooks support required)
- **React DOM 16.8+**
- **TypeScript 4.0+** (if using TypeScript)

### NPM/Yarn Installation

```bash
# Using npm
npm install @shohojdhara/atomix

# Using yarn
yarn add @shohojdhara/atomix
```

### Manual Installation

Alternatively, you can download and include the CSS and JavaScript files directly:

```html
<link rel="stylesheet" href="path/to/atomix/dist/css/atomix-0.1.0.styles.min.css">
<script src="path/to/atomix/dist/js/atomix-0.1.0.main.js"></script>
```

## Basic Setup

### React Projects

For React projects, import the main styles in your entry file:

```jsx
// In your index.js or App.js
import '@shohojdhara/atomix/css';

// Then import components as needed
import { Button, Card, Avatar } from '@shohojdhara/atomix';
```

### HTML/CSS/JS Projects

For projects without a module bundler, include the CSS and JS files in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Atomix Project</title>
  
  <!-- Atomix CSS -->
  <link rel="stylesheet" href="path/to/atomix/dist/css/atomix-0.1.0.styles.min.css">
</head>
<body>
  <!-- Your content here -->
  
  <!-- Atomix JS (optional, only if using JS components) -->
  <script src="path/to/atomix/dist/js/atomix-0.1.0.main.js"></script>
  
  <!-- Your scripts -->
  <script src="path/to/your-script.js"></script>
</body>
</html>
```

## CSS Architecture

Atomix follows the ITCSS (Inverted Triangle CSS) methodology combined with BEM (Block Element Modifier) naming conventions.

### Class Naming Conventions

- **Components**: `.c-component-name`
- **Elements**: `.c-component-name__element`
- **Modifiers**: `.c-component-name--modifier` or `.c-component-name__element--modifier`
- **Utilities**: `.u-utility-name`
- **Objects**: `.o-object-name` (layout primitives)

### Example

```html
<!-- Button component with primary modifier -->
<button class="c-button c-button--primary">
  Button Text
  
  <!-- An element within the button -->
  <span class="c-button__icon">
    <!-- Icon content -->
  </span>
</button>
```

## Using Components

### React Components

Import and use Atomix components in your React applications:

```jsx
import React from 'react';
import { Button, Card, Avatar, AvatarGroup } from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <div>
      {/* Basic Button */}
      <Button variant="primary">Click Me</Button>
      
      {/* Avatar component */}
      <Avatar 
        src="https://example.com/avatar.jpg" 
        size="md" 
        circle={true} 
        alt="User Avatar" 
      />
      
      {/* Card component */}
      <Card>
        <Card.Header>Card Title</Card.Header>
        <Card.Body>
          <p>This is a card content.</p>
          <Button variant="secondary">Read More</Button>
        </Card.Body>
        <Card.Footer>Footer information</Card.Footer>
      </Card>
      
      {/* Avatar Group example */}
      <AvatarGroup max={3}>
        <Avatar src="user1.jpg" size="md" circle={true} />
        <Avatar src="user2.jpg" size="md" circle={true} />
        <Avatar src="user3.jpg" size="md" circle={true} />
        <Avatar src="user4.jpg" size="md" circle={true} />
        <Avatar src="user5.jpg" size="md" circle={true} />
      </AvatarGroup>
    </div>
  );
}
```

### HTML/CSS Components

Use Atomix components directly in your HTML with the appropriate classes:

```html
<!-- Button component -->
<button class="c-button c-button--primary">Click Me</button>

<!-- Avatar component -->
<div class="c-avatar c-avatar--md c-avatar--circle">
  <img src="user.jpg" alt="User Avatar" class="c-avatar__image">
</div>

<!-- Card component -->
<div class="c-card">
  <div class="c-card__header">Card Title</div>
  <div class="c-card__body">
    <p>This is a card content.</p>
    <button class="c-button c-button--secondary">Read More</button>
  </div>
  <div class="c-card__footer">Footer information</div>
</div>

<!-- Avatar Group component -->
<div class="c-avatar-group">
  <div class="c-avatar c-avatar--md c-avatar--circle">
    <img src="user1.jpg" alt="User 1" class="c-avatar__image">
  </div>
  <div class="c-avatar c-avatar--md c-avatar--circle">
    <img src="user2.jpg" alt="User 2" class="c-avatar__image">
  </div>
  <div class="c-avatar c-avatar--md c-avatar--circle">
    <img src="user3.jpg" alt="User 3" class="c-avatar__image">
  </div>
  <!-- More indicator (shown when max is reached) -->
  <div class="c-avatar c-avatar--md c-avatar--circle c-avatar-group__more">+2</div>
</div>
```

### Form Components

Atomix provides various form components for creating accessible forms:

```html
<!-- Form Group -->
<div class="c-form-group">
  <label class="c-form-group__label" for="username">Username</label>
  <input type="text" id="username" class="c-input" placeholder="Enter username">
  <div class="c-form-group__helper">Enter your username or email</div>
</div>

<!-- Radio buttons -->
<div class="c-radio">
  <input type="radio" id="radio1" name="radio-group" class="c-radio__input">
  <label for="radio1" class="c-radio__label">Option 1</label>
</div>

<!-- Checkbox -->
<div class="c-checkbox">
  <input type="checkbox" id="checkbox1" class="c-checkbox__input">
  <label for="checkbox1" class="c-checkbox__label">Option 1</label>
</div>

<!-- Textarea -->
<textarea class="c-input c-input--textarea" rows="4" placeholder="Enter your message"></textarea>
```

## Layout System

### Grid System

Atomix includes a flexible 12-column grid system:

```html
<div class="o-container">
  <div class="o-row">
    <div class="o-col-12 o-col-md-6 o-col-lg-4">
      <!-- Content for first column -->
    </div>
    <div class="o-col-12 o-col-md-6 o-col-lg-4">
      <!-- Content for second column -->
    </div>
    <div class="o-col-12 o-col-md-12 o-col-lg-4">
      <!-- Content for third column -->
    </div>
  </div>
</div>
```

Key features:
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`
- 12-column layout
- Auto-layout options
- Nesting support
- Alignment controls

### Spacing System

Atomix uses a consistent spacing scale:

```html
<!-- Margin examples -->
<div class="u-mt-4">Margin top 4 (1rem)</div>
<div class="u-mb-8">Margin bottom 8 (2rem)</div>
<div class="u-mx-6">Margin left and right 6 (1.5rem)</div>

<!-- Padding examples -->
<div class="u-pt-4">Padding top 4 (1rem)</div>
<div class="u-pb-8">Padding bottom 8 (2rem)</div>
<div class="u-px-6">Padding left and right 6 (1.5rem)</div>

<!-- Gap examples for flex/grid layouts -->
<div class="u-flex u-gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

The spacing scale follows this pattern:
- `0`: 0
- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `3`: 0.75rem (12px)
- `4`: 1rem (16px)
- And so on...

## Utility Classes

Atomix includes a comprehensive set of utility classes for quick styling without writing custom CSS.

### Display Utilities

```html
<div class="u-block">Display block</div>
<div class="u-flex">Display flex</div>
<div class="u-grid">Display grid</div>
<div class="u-none u-md-block">Hidden on mobile, visible on medium screens and up</div>
```

### Flex Utilities

```html
<!-- Flex container with items aligned and justified -->
<div class="u-flex u-justify-between u-items-center">
  <div>Left content</div>
  <div>Right content</div>
</div>

<!-- Flex column layout with gap -->
<div class="u-flex u-flex-column u-gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Flex grow/shrink -->
<div class="u-flex">
  <div class="u-flex-grow-1">Grows to fill space</div>
  <div class="u-flex-shrink-0">Won't shrink</div>
</div>
```

### Text Utilities

```html
<p class="u-text-center">Centered text</p>
<p class="u-font-bold">Bold text</p>
<p class="u-text-4">Font size 4</p>
<p class="u-text-primary">Primary text color</p>
```

### Spacing Utilities

```html
<div class="u-p-4">Padding 4 on all sides</div>
<div class="u-m-4">Margin 4 on all sides</div>
```

### Responsive Utilities

Many utilities include responsive variants:

```html
<!-- Visible only on medium screens and up -->
<div class="u-none u-md-block">Shown on medium screens and up</div>

<!-- Different text alignment based on screen size -->
<p class="u-text-center u-text-md-start u-text-lg-end">
  Centered on mobile, left-aligned on medium, right-aligned on large screens
</p>

<!-- Responsive column widths -->
<div class="o-col-12 o-col-md-6 o-col-lg-4">
  Full width on mobile, half width on medium, one-third on large screens
</div>
```

## Theming and Customization

### Using CSS Variables

Atomix uses CSS variables (custom properties) for easy theming:

```css
/* In your custom CSS file */
:root {
  /* Primary colors */
  --atomix-primary-color: #3366ff; 
  --atomix-primary-hover: #2a52cc;
  
  /* Border radius */
  --atomix-border-radius: 4px;
  
  /* Font family */
  --atomix-font-family: 'Montserrat', sans-serif;
}
```

### Component-Specific Customization

You can also customize specific components:

```css
/* Custom button styles */
:root {
  --atomix-btn-border-radius: 8px;
  --atomix-btn-padding-x: 1.5rem;
  --atomix-btn-padding-y: 0.75rem;
}

/* Custom card styles */
:root {
  --atomix-card-border-radius: 12px;
  --atomix-card-box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

### Dark Mode Support

Atomix provides built-in dark mode support:

```html
<!-- Toggle between light and dark mode -->
<div class="c-color-mode-toggle">
  <button data-theme-mode="light">Light</button>
  <button data-theme-mode="dark">Dark</button>
</div>
```

You can also customize dark mode colors:

```css
[data-theme="dark"] {
  --atomix-primary-color: #5c8aff;
  --atomix-body-bg: #121212;
  --atomix-body-color: #f8f9fa;
}
```

## Best Practices

### Component Patterns

1. **Consistent Component Usage**:
   ```jsx
   // Good - using variants consistently
   <Button variant="primary" size="md">Primary Button</Button>
   <Button variant="secondary" size="md">Secondary Button</Button>
   
   // Avoid inconsistent naming
   <Button type="primary" btnSize="md">Inconsistent Button</Button>
   ```

2. **Composition over Configuration**:
   ```jsx
   // Compose simple components to create complex UIs
   <Card>
     <Card.Header>
       <Avatar src="user.jpg" size="sm" />
       <h4>User Profile</h4>
     </Card.Header>
     <Card.Body>
       {/* Card content */}
     </Card.Body>
   </Card>
   ```

3. **Use Utility Classes for Minor Adjustments**:
   ```jsx
   <Button className="u-mt-4 u-mb-2">With spacing adjustments</Button>
   <Card className="u-shadow-lg u-border-0">Enhanced card</Card>
   ```

### Accessibility

1. **Always provide alt text for images**:
   ```html
   <img src="image.jpg" alt="Descriptive text for the image">
   ```
   
   ```jsx
   <Avatar src="user.jpg" alt="User Profile" />
   ```

2. **Use semantic markup when possible**:
   ```jsx
   <Button as="a" href="https://example.com">Link Button</Button>
   ```

3. **Ensure sufficient color contrast** and don't rely solely on color to convey information.

4. **Support keyboard navigation** by preserving tab order and providing focus styles.

## Troubleshooting

### Common Issues

1. **Components don't display correctly**:
   - Check if you've imported the CSS file correctly
   - Verify you're using the right class names or component props
   - Check for console errors

2. **Responsive behavior issues**:
   - Ensure you've added the viewport meta tag
   - Verify you're using the correct responsive utility classes
   - Test on different screen sizes

3. **Styling conflicts**:
   - Check for CSS specificity issues with existing styles
   - Use Atomix's utility classes instead of custom CSS when possible
   - Consider using CSS modules or scoped styles in complex projects

### Getting Support

- Check the [Atomix documentation site](https://github.com/liimonx/atomix)
- Review component examples in Storybook
- Open an issue on GitHub for bugs or feature requests

---

This implementation guide provides a foundation for using Atomix in your projects. For more detailed information on specific components, refer to Storybook documentation or the component source code.