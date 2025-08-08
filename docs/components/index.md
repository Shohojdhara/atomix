# Atomix Component Documentation

Welcome to the Atomix component documentation! This comprehensive guide covers all components available in the Atomix design system, providing detailed usage examples, API references, and best practices.

## Overview

Atomix provides a complete set of UI components built with React and TypeScript, following modern design principles and accessibility standards. Each component is designed to be flexible, customizable, and easy to integrate into your projects.

## Getting Started

Before diving into individual components, make sure you have Atomix installed and configured in your project:

```bash
npm install @shohojdhara/atomix
```

## Component Categories

### Core Components

#### [Button](./button.mdx)
Interactive button component with multiple variants, sizes, and states. Supports icons and can be rendered as different HTML elements.

**Key Features:**
- 8 color variants plus outline versions
- 3 sizes (sm, md, lg)
- Icon support
- Rounded styling option
- Accessible keyboard navigation

#### [Avatar](./avatar.mdx)
Display user profile images, initials, or icons with consistent sizing and fallback mechanisms.

**Key Features:**
- Multiple sizes (xs, sm, md, lg, xl)
- Automatic fallback system
- Circle and square shapes
- Avatar groups with stacking
- Interactive support

#### [Badge](./badge.mdx)
Compact UI element for displaying status indicators, counters, and labels.

**Key Features:**
- 8 color variants
- 3 sizes
- Icon support
- Perfect for notifications and tags

#### [Card](./card.mdx)
Flexible container component for organizing and displaying content in a structured format.

**Key Features:**
- Header, body, actions, and footer sections
- Image and icon support
- Row and column layouts
- Interactive states
- Highly customizable

### Form Components

#### [Input](./input.mdx)
Text input component with validation states and various input types.

#### [Select](./select.mdx)
Dropdown selection component with search and multi-select capabilities.

#### [Checkbox](./checkbox.mdx)
Checkbox input with custom styling and indeterminate states.

#### [Radio](./radio.mdx)
Radio button component for single-option selection from groups.

#### [Textarea](./textarea.mdx)
Multi-line text input with auto-resize capabilities.

#### [Form](./form.mdx)
Complete form component with validation and field management.

### Navigation Components

#### [Navbar](./navbar.mdx)
Main navigation component with responsive design and dropdown support.

#### [Breadcrumb](./breadcrumb.mdx)
Navigation breadcrumb component for showing page hierarchy.

#### [Pagination](./pagination.mdx)
Page navigation component for large data sets.

#### [Tab](./tab.mdx)
Tabbed interface component for organizing content into sections.

### Feedback Components

#### [Modal](./modal.mdx)
Overlay dialog component for focused interactions.

#### [Tooltip](./tooltip.mdx)
Contextual information display triggered on hover or focus.

#### [Popover](./popover.mdx)
Rich content overlay with positioning and interactive elements.

#### [Messages](./messages.mdx)
Alert and notification component for user feedback.

#### [Callout](./callout.mdx)
Highlighted content blocks for important information.

### Display Components

#### [List](./list.mdx)
Structured list component with various styling options.

#### [DataTable](./datatable.mdx)
Advanced table component with sorting, filtering, and pagination.

#### [Accordion](./accordion.mdx)
Collapsible content sections for space-efficient information display.

#### [Progress](./progress.mdx)
Progress indicator for showing completion states.

#### [Rating](./rating.mdx)
Star rating component for reviews and feedback.

#### [Countdown](./countdown.mdx)
Timer component for displaying time-based countdowns.

### Media Components

#### [PhotoViewer](./photo-viewer.mdx)
Image gallery and viewer component with zoom and navigation.

#### [Upload](./upload.mdx)
File upload component with drag-and-drop support.

#### [Icon](./icon.mdx)
Icon component using Phosphor React icons.

### Layout Components

#### [Hero](./hero.mdx)
Large banner component for landing pages and feature highlights.

#### [SectionIntro](./section-intro.mdx)
Section header component with title and description.

#### [EdgePanel](./edge-panel.mdx)
Side panel component for additional content and navigation.

### Utility Components

#### [Spinner](./spinner.mdx)
Loading indicator component with various sizes and styles.

#### [Toggle](./toggle.mdx)
Switch component for binary state controls.

#### [ColorModeToggle](./color-mode-toggle.mdx)
Theme switcher component for light/dark mode toggle.

#### [Steps](./steps.mdx)
Step-by-step progress indicator for multi-step processes.

### Specialized Components

#### [DatePicker](./date-picker.mdx)
Date selection component with calendar interface.

#### [Dropdown](./dropdown.mdx)
General-purpose dropdown component with custom triggers.

#### [ProductReview](./product-review.mdx)
Product review display component with ratings and comments.

#### [Testimonial](./testimonial.mdx)
Customer testimonial component for social proof.

#### [Todo](./todo.mdx)
Task management component with checkbox and editing capabilities.

#### [River](./river.mdx)
Timeline or activity feed component for displaying sequential information.

## Quick Reference

### Installation
```bash
npm install @shohojdhara/atomix
```

### Basic Import
```jsx
import { Button, Card, Avatar, Badge } from '@shohojdhara/atomix';
```

### CSS Import
```jsx
import '@shohojdhara/atomix/css';
```

### Common Patterns

#### Basic Layout
```jsx
import { Card, Button, Avatar } from '@shohojdhara/atomix';

function UserCard({ user }) {
  return (
    <Card
      title={user.name}
      text={user.bio}
      header={<Avatar src={user.avatar} circle />}
      actions={<Button label="View Profile" variant="primary" />}
    />
  );
}
```

#### Form Example
```jsx
import { Form, Input, Button } from '@shohojdhara/atomix';

function ContactForm() {
  return (
    <Form>
      <Input label="Name" required />
      <Input label="Email" type="email" required />
      <Button label="Submit" type="submit" variant="primary" />
    </Form>
  );
}
```

#### Navigation Example
```jsx
import { Navbar, Button, Badge } from '@shohojdhara/atomix';

function MainNavigation() {
  return (
    <Navbar>
      <Navbar.Brand>My App</Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Item href="/dashboard">Dashboard</Navbar.Item>
        <Navbar.Item href="/messages">
          Messages
          <Badge label="3" variant="error" size="sm" />
        </Navbar.Item>
      </Navbar.Menu>
    </Navbar>
  );
}
```

## Design Principles

### Consistency
All components follow consistent design patterns, naming conventions, and behavior standards.

### Accessibility
Every component is built with accessibility in mind, following WCAG 2.1 guidelines.

### Flexibility
Components are designed to be flexible and customizable while maintaining design consistency.

### Performance
Components are optimized for performance with minimal bundle impact and efficient rendering.

### Developer Experience
Clear APIs, comprehensive TypeScript support, and excellent documentation for ease of use.

## Theming

All components support the Atomix theming system with CSS custom properties:

```css
:root {
  --atomix-primary: #3366ff;
  --atomix-secondary: #64748b;
  --atomix-success: #10b981;
  --atomix-error: #ef4444;
  --atomix-warning: #f59e0b;
  --atomix-info: #3b82f6;
}
```

## Browser Support

All components support modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

Found an issue or want to contribute? Check out our [contributing guidelines](../../CONTRIBUTING.md) and [component development guide](../atomix-component-guidelines.mdx).

## Support

For questions, issues, or feature requests:
- [GitHub Issues](https://github.com/liimonx/atomix/issues)
- [Documentation Site](https://liimonx.github.io/atomix/)
- [Storybook Examples](https://atomix-storybook.netlify.app/)

---

*This documentation is automatically updated with each release. Last updated: ${new Date().toLocaleDateString()}*