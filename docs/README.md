# Atomix Documentation

Welcome to the comprehensive documentation for the Atomix Design System. This documentation provides everything you need to build amazing, accessible, and consistent user interfaces.

## 🚀 Quick Navigation

### 🏁 [Getting Started](./getting-started/README.md)
Everything you need to get up and running with Atomix quickly.
- [Installation Guide](./getting-started/installation.md) - Complete setup instructions
- [Quick Start Tutorial](./getting-started/quick-start.md) - 5-minute tutorial

### 🎨 [Design Tokens](./design-tokens/README.md)
The foundation of the Atomix Design System - colors, spacing, typography, and more.
- [Colors](./design-tokens/colors.md) - Comprehensive color system
- [Spacing](./design-tokens/spacing.md) - Spacing and layout system
- [Typography](./design-tokens/typography.md) - Type system and scales
- [Elevation](./design-tokens/elevation.md) - Shadow and depth system

### 🏗️ [Styles System](./styles/README.md)
CSS architecture, utilities, and customization built on ITCSS methodology.
- [Architecture](./styles/architecture.md) - ITCSS structure and organization
- [Customization](./styles/customization.md) - Theming and brand integration
- [Utilities](./styles/utilities.md) - Complete utility class reference
- [API Reference](./styles/api-reference.md) - Complete technical reference

### 🏗️ [Layouts](./layouts/README.md)
Powerful layout system for creating responsive, flexible interfaces.
- [Grid System](./layouts/grid.md) - Comprehensive 12-column responsive grid
- [Masonry Grid](./layouts/masonry-grid.md) - Pinterest-style dynamic layouts
- [Responsive Patterns](./layouts/responsive-patterns.md) - Common layout solutions
- [Customization Guide](./layouts/customization.md) - Theming and advanced configuration
- [Performance Best Practices](./layouts/performance.md) - Optimization strategies

### 🧩 [Components](./components/README.md)
Comprehensive component library with React and vanilla JavaScript implementations.
- [Component Overview](./components/overview.md) - All available components
- [Component Guidelines](./components/guidelines.md) - Development standards
- [Individual Components](./components/) - Detailed component documentation

### 📚 [Guides](./guides/README.md)
In-depth guides and tutorials for mastering Atomix.
- [Theming Guide](./guides/theming.md) - Advanced theming techniques
- [Responsive Design](./guides/responsive-design.md) - Mobile-first patterns
- [Performance](./guides/performance.md) - Optimization strategies
- [Testing](./guides/testing.md) - Testing components and applications

### 🎯 [Examples](./examples/README.md)
Real-world examples and implementation patterns.
- [Common Patterns](./examples/common-patterns.md) - Frequently used UI patterns
- [Layout Examples](./examples/layouts.md) - Complete page layouts
- [Framework Integrations](./examples/integrations.md) - Integration examples

### 📖 [API Reference](./api/README.md)
Complete technical reference for all APIs.
- [React API](./api/react.md) - React component reference
- [JavaScript API](./api/javascript.md) - Vanilla JS class reference
- [CSS API](./api/css.md) - CSS classes and custom properties

### 📋 [Resources](./resources/README.md)
Additional resources, community, and project information.
- [Roadmap](./resources/roadmap.md) - Development roadmap
- [Contributing](./resources/contributing.md) - How to contribute
- [Support](./resources/support.md) - Getting help and support

## ⚡ Quick Start

### Installation

```bash
npm install @shohojdhara/atomix
# or
yarn add @shohojdhara/atomix
```

### Basic Usage

```jsx
import React from 'react';
import { Button, Card, Badge } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

function App() {
  return (
    <Card>
      <Card.Header>
        <h2>Welcome to Atomix</h2>
        <Badge variant="primary">New</Badge>
      </Card.Header>
      <Card.Body>
        <p>A modern design system for building amazing interfaces.</p>
        <Button variant="primary">Get Started</Button>
      </Card.Body>
    </Card>
  );
}
```

### Vanilla JavaScript

```html
<link rel="stylesheet" href="https://unpkg.com/@shohojdhara/atomix/css">
<script src="https://unpkg.com/@shohojdhara/atomix/js"></script>

<div class="c-card">
  <div class="c-card__header">
    <h2>Welcome to Atomix</h2>
    <span class="c-badge c-badge--primary">New</span>
  </div>
  <div class="c-card__body">
    <p>A modern design system for building amazing interfaces.</p>
    <button class="c-btn c-btn--primary">Get Started</button>
  </div>
</div>

<script>Atomix.init();</script>
```

## 🎯 Key Features

### 🎨 Design System Foundation
- **Design Tokens** - Consistent colors, spacing, typography
- **ITCSS Architecture** - Scalable CSS methodology
- **Accessibility First** - WCAG 2.1 AA compliance
- **Responsive Design** - Mobile-first approach

### 🏗️ Layout System Foundation
- **Grid System** - Flexible 12-column responsive layouts
- **Masonry Grids** - Pinterest-style dynamic positioning
- **Container Components** - Responsive content containers
- **Mobile-First Design** - Optimized for all screen sizes

### 🧩 Comprehensive Components
- **40+ Components** - From basic buttons to complex data tables
- **Dual Implementation** - React and vanilla JavaScript
- **Consistent API** - Predictable props and behavior
- **Customizable** - Easy theming and brand integration

### 🛠️ Developer Experience
- **TypeScript Support** - Full type definitions
- **Tree Shakeable** - Import only what you need
- **Modern CSS** - CSS custom properties and Grid/Flexbox
- **Performance Optimized** - Minimal bundle size

### 🌐 Framework Agnostic
- **React** - First-class React components
- **Vanilla JS** - Framework-independent classes
- **Vue/Angular** - Community integrations available
- **Static Sites** - Works with any HTML/CSS setup

## 📚 Documentation Structure

Our documentation is organized into logical sections for easy navigation:

### 🏁 Getting Started
Perfect for newcomers - installation, quick start, and migration guides.

### 🎨 Design Tokens
The foundation - colors, spacing, typography, and design principles.

### 🏗️ Layouts
Powerful layout system with grid, masonry, and responsive patterns.

### 🏗️ Styles System
CSS architecture, utilities, and customization using ITCSS methodology.

### 🧩 Components
Complete component library with examples and API documentation.

### 📚 Guides
In-depth tutorials for theming, responsive design, performance, and testing.

### 🎯 Examples
Real-world patterns, layouts, and framework integration examples.

### 📖 API Reference
Complete technical reference for React, JavaScript, and CSS APIs.

### 📋 Resources
Community resources, roadmap, contributing guidelines, and support.

## 🎨 Theming and Customization

### CSS Custom Properties
Easy runtime theming with CSS custom properties:

```css
:root {
  --atomix-primary: #your-brand-color;
  --atomix-border-radius: 0.5rem;
  --atomix-font-family-base: 'Your Font', sans-serif;
}

[data-theme="dark"] {
  --atomix-bg-primary: #1f2937;
  --atomix-text-primary: #f9fafb;
}
```

### SCSS Configuration
Build-time customization with SCSS variables:

```scss
@use '@shohojdhara/atomix/styles' with (
  $primary-6: #2563eb,
  $font-family-base: ('Inter', sans-serif),
  $border-radius: 0.375rem
);
```

### Component Theming
Customize individual components:

```css
.c-btn--custom {
  --atomix-btn-bg: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  --atomix-btn-color: white;
}
```

## 🚀 Learning Paths

### 👶 Beginner Path
1. [Installation Guide](./getting-started/installation.md) - Set up your environment
2. [Quick Start Tutorial](./getting-started/quick-start.md) - Build your first interface
3. [Component Overview](./components/overview.md) - Explore available components
4. [Basic Examples](./examples/common-patterns.md) - Learn common patterns

### 🧑‍💻 Intermediate Path
1. [Design Tokens](./design-tokens/README.md) - Understand the foundation
2. [Layout System](./layouts/README.md) - Master responsive layouts
3. [Theming Guide](./guides/theming.md) - Customize for your brand
4. [Responsive Patterns](./layouts/responsive-patterns.md) - Common layout solutions

### 🚀 Advanced Path
1. [Styles Architecture](./styles/architecture.md) - Master the CSS system
2. [Advanced Customization](./guides/advanced-customization.md) - Deep customization
3. [Performance Guide](./guides/performance.md) - Optimize your implementation
4. [Contributing](./resources/contributing.md) - Give back to the community

## 🌐 Community and Support

### 📞 Getting Help
- **[Documentation](./getting-started/README.md)** - Comprehensive guides and references
- **[GitHub Issues](https://github.com/shohojdhara/atomix/issues)** - Bug reports and feature requests
- **[Discussions](https://github.com/shohojdhara/atomix/discussions)** - Community Q&A
- **[Support Guide](./resources/support.md)** - All support options

### 🤝 Contributing
- **[Contributing Guide](./resources/contributing.md)** - How to contribute
- **[Code of Conduct](https://github.com/shohojdhara/atomix/blob/main/CODE_OF_CONDUCT.md)** - Community guidelines
- **[Roadmap](./resources/roadmap.md)** - Future development plans

### 🔗 Links
- **[GitHub Repository](https://github.com/shohojdhara/atomix)** - Source code
- **[NPM Package](https://www.npmjs.com/package/@shohojdhara/atomix)** - Package info
- **[Storybook](https://storybook.atomix.design)** - Interactive examples

## 🎯 Next Steps

### 🏁 Get Started
1. **[Install Atomix](./getting-started/installation.md)** - Set up your development environment
2. **[Quick Start Tutorial](./getting-started/quick-start.md)** - Build your first interface in 5 minutes
3. **[Explore Components](./components/README.md)** - Browse the component library

### 🎨 Learn the System
1. **[Design Tokens](./design-tokens/README.md)** - Understand the foundation
2. **[Layout System](./layouts/README.md)** - Master responsive layouts
3. **[Styles Architecture](./styles/architecture.md)** - Learn the CSS methodology
4. **[Theming Guide](./guides/theming.md)** - Customize for your brand

### 🚀 Build Something Amazing
1. **[Browse Examples](./examples/README.md)** - See real-world implementations
2. **[Follow Best Practices](./components/guidelines.md)** - Build with quality
3. **[Join the Community](https://github.com/shohojdhara/atomix/discussions)** - Connect with other developers

---

## 📊 Quick Stats

- **40+ Components** - Comprehensive component library
- **Complete Layout System** - Grid, masonry, and responsive patterns
- **500+ Utility Classes** - Complete utility system
- **200+ Design Tokens** - Consistent design foundation
- **~45KB Bundle** - Optimized for performance
- **WCAG 2.1 AA** - Accessibility compliant
- **TypeScript** - Full type support

---

**Welcome to Atomix!** We're excited to see what you'll build. Start with our [Getting Started Guide](./getting-started/README.md) and join our growing community of developers building amazing interfaces. 🚀

*Built with ❤️ by the Atomix team*
