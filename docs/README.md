# Atomix Documentation

Welcome to the comprehensive documentation for the Atomix design system. This documentation provides everything you need to build amazing user interfaces with Atomix components.

## 📖 Documentation Overview

### Quick Start Guides

- **[Quick Reference](./quick-reference.md)** - Essential information for rapid development
- **[Implementation Guide](./implementation-guide.md)** - Setup, installation, and configuration
- **[Component Reference](./component-reference.md)** - Overview of all available components
- **[CSS Utilities](./css-utilities.md)** - Comprehensive utility class reference

### Detailed Component Documentation

#### Core Components
- **[Button Component](./components/button.md)** - Interactive buttons with variants, sizes, and states
- **[Card Component](./components/card.md)** - Flexible content containers with headers, actions, and layouts
- **[Avatar Components](./components/avatar.md)** - User profile images and avatar groups

#### Form System
- **[Form Components](./components/form.md)** - Complete form system including Form, FormGroup, Input, Select, Checkbox, Radio, and Textarea

#### Navigation
- **[Navigation Components](./components/navigation.md)** - Navbar, Nav, Menu, SideMenu, and Breadcrumb components

#### Interactive Elements
- **[Modal Component](./components/modal.md)** - Dialog overlays for focused interactions

### System Guides

- **[CSS Utilities](./css-utilities.md)** - Complete utility class system for rapid styling
- **[Component Guidelines](./atomix-component-guidelines.md)** - Development standards and best practices
- **[Theme System Guide](../src/docs/theme-system-guide.mdx)** - Customization and theming
- **[Roadmap](./atomix-roadmap.md)** - Future development plans

## 🚀 Getting Started

### Installation

```bash
npm install @shohojdhara/atomix
```

### Basic Usage

```jsx
import React from 'react';
import { Button, Card, Avatar, Badge } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

function App() {
  return (
    <div>
      <Card>
        <Card.Header>
          <Avatar src="/avatar.jpg" alt="User" />
          <Badge color="primary">New</Badge>
        </Card.Header>
        <Card.Body>
          <h3>Welcome to Atomix</h3>
          <p>A modern design system for React applications.</p>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary">Get Started</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
```

## 🧩 Component Categories

### Basic Components
Essential building blocks for any interface:
- **Button** - Interactive elements for user actions
- **Badge** - Small status indicators and labels
- **Icon** - Icon wrapper component
- **Spinner** - Loading indicators

### Layout Components
Structural elements for organizing content:
- **Card** - Flexible content containers
- **Hero** - Large promotional sections
- **River** - Content with image sections
- **SectionIntro** - Section introduction component

### Form Components
Complete form system with validation:
- **Form** - Form container with submission handling
- **FormGroup** - Field wrapper with labels and validation
- **Input** - Text input fields with various types
- **Select** - Dropdown selection controls
- **Checkbox** - Boolean input controls
- **Radio** - Single selection from groups
- **Textarea** - Multi-line text input

### Navigation Components
Comprehensive navigation solutions:
- **Navbar** - Main site navigation
- **Nav** - Navigation lists
- **Menu** - Menu containers
- **SideMenu** - Sidebar navigation
- **Breadcrumb** - Hierarchical navigation

### Interactive Components
Elements that respond to user interaction:
- **Accordion** - Collapsible content sections
- **Dropdown** - Dropdown menus
- **Modal** - Dialog overlays
- **Popover** - Contextual overlays
- **Tooltip** - Hover information
- **Tab** - Tabbed interfaces
- **Toggle** - Switch controls

### Data Display Components
Components for presenting information:
- **Avatar** - User profile images
- **AvatarGroup** - Multiple avatar display
- **List** - Ordered and unordered lists
- **ListGroup** - Styled list containers
- **DataTable** - Data tables with sorting and filtering
- **Pagination** - Page navigation
- **Progress** - Progress indicators
- **Rating** - Star ratings

### Specialized Components
Purpose-built components for specific use cases:
- **PhotoViewer** - Image gallery viewer
- **Messages** - Chat/messaging interface
- **Todo** - Task management
- **Countdown** - Timer and countdown display
- **DatePicker** - Date selection
- **Upload** - File upload interface
- **Steps** - Step-by-step processes
- **Testimonial** - Customer testimonials
- **ProductReview** - Product review display

### Utility Components
Helper components for enhanced functionality:
- **ColorModeToggle** - Dark/light mode switcher
- **EdgePanel** - Side panels and drawers
- **Callout** - Highlighted information blocks

## 🎨 Design System Features

### Dual Implementation
Every component provides both React and vanilla JavaScript implementations:

```jsx
// React usage
import { Button } from '@shohojdhara/atomix';
<Button onClick={handleClick}>Click me</Button>
```

```javascript
// Vanilla JS usage
const button = new Atomix.Button('.my-button', {
  onClick: handleClick
});
```

### ITCSS Architecture
Follows the Inverted Triangle CSS methodology for scalable styling:

```
Settings    → Global variables and config
Tools       → Mixins and functions
Generic     → Normalize, reset, box-sizing
Elements    → Bare HTML elements
Objects     → Layout patterns
Components  → UI components
Utilities   → Helper classes
```

### Accessibility First
All components include comprehensive accessibility features:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast support

### Responsive Design
Components are built mobile-first with responsive breakpoints:
- Mobile: 320px+
- Tablet: 640px+
- Desktop: 1024px+
- Large: 1280px+

## 🛠️ Development Workflow

### Component Structure
Each component follows a consistent structure:

```
src/components/ComponentName/
├── ComponentName.tsx              # React component
├── ComponentName.stories.tsx      # Storybook stories
├── index.ts                       # Exports
└── scripts/                       # Vanilla JS implementation
    ├── index.ts                   # Main component class
    ├── ComponentNameInteractions.ts # Event handlers
    └── bundle.ts                  # Global registration
```

### Best Practices

1. **Use semantic HTML** - Components render appropriate HTML elements
2. **Provide accessible labels** - Always include ARIA attributes and labels
3. **Handle loading states** - Use Spinner for async operations
4. **Validate forms properly** - Use FormGroup validation features
5. **Test with keyboard** - Ensure keyboard navigation works
6. **Check color contrast** - Verify combinations meet WCAG standards

### Testing Components

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@shohojdhara/atomix';

test('button handles click events', () => {
  const handleClick = jest.fn();
  render(<Button label="Click me" onClick={handleClick} />);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 📚 Learning Resources

### Interactive Examples
- **[Storybook](https://storybook.atomix.design)** - Live component examples and playground
- **Component Stories** - Each component includes comprehensive Storybook stories

### Code Examples
Every component documentation includes:
- Basic usage examples
- Advanced patterns
- Common use cases
- Accessibility examples
- Vanilla JavaScript usage

### Community
- **GitHub Issues** - Bug reports and feature requests
- **Discussions** - Community questions and sharing
- **Contributing Guide** - How to contribute to the project

## 🔧 Customization

### Theme System
Atomix provides a flexible theme system for customization:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --spacing-md: 1rem;
  --border-radius: 0.375rem;
}
```

### Custom Components
Build custom components using Atomix patterns:

```jsx
function CustomCard({ children, ...props }) {
  return (
    <Card className="custom-card" {...props}>
      {children}
    </Card>
  );
}
```

### CSS Customization
Override component styles using CSS custom properties:

```css
.c-button--custom {
  --button-bg: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  --button-color: white;
}
```

## 🚀 Performance

### Bundle Size
Atomix is optimized for minimal bundle impact:
- Tree-shakeable imports
- Modular CSS
- Optimized JavaScript
- No unnecessary dependencies

### Best Practices
- Import only needed components
- Use CSS custom properties for theming
- Implement proper loading states
- Optimize images and assets

## 🔗 Additional Resources

- **[GitHub Repository](https://github.com/shohojdhara/atomix)** - Source code and issues
- **[NPM Package](https://www.npmjs.com/package/@shohojdhara/atomix)** - Package information
- **[Changelog](../CHANGELOG.md)** - Version history and updates
- **[Contributing](../CONTRIBUTING.md)** - How to contribute to the project
- **[License](../LICENSE)** - MIT License information

## 📞 Support

Need help? Here are the best ways to get support:

1. **Documentation** - Check this documentation first
2. **Storybook** - Interactive examples and API reference
3. **GitHub Issues** - Bug reports and feature requests
4. **Discussions** - Community questions and help

## 🎯 Next Steps

1. **[Read the Quick Reference](./quick-reference.md)** for essential information
2. **[Follow the Implementation Guide](./implementation-guide.md)** to set up your project
3. **[Explore Component Documentation](./component-reference.md)** for detailed usage
4. **[Check out Storybook](https://storybook.atomix.design)** for interactive examples
5. **[Review the Theme Guide](../src/docs/theme-system-guide.mdx)** for customization

Welcome to Atomix! We're excited to see what you'll build. 🚀
