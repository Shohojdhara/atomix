# Getting Started with Atomix

Welcome to Atomix! This section will help you get up and running with the Atomix Design System quickly and efficiently.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 16.0 or higher
- **npm** 7.0 or higher (or **yarn** 1.22+)
- Basic knowledge of **React** (for React components)
- Basic knowledge of **HTML/CSS** (for vanilla JS components)

## 🚀 Quick Navigation

### Essential Guides

1. **[Installation Guide](./installation.md)** - Complete setup and installation instructions
2. **[Quick Start Tutorial](./quick-start.md)** - Get started in 5 minutes
3. **[Migration Guide](./migration.md)** - Migrate from other design systems

## ⚡ 5-Minute Quick Start

### 1. Install Atomix

```bash
npm install @shohojdhara/atomix
# or
yarn add @shohojdhara/atomix
```

### 2. Import Styles

```jsx
// Import CSS in your main file
import '@shohojdhara/atomix/css';
```

### 3. Use Components

```jsx
import React from 'react';
import { Button, Card } from '@shohojdhara/atomix';

function App() {
  return (
    <Card>
      <Card.Header>
        <h2>Welcome to Atomix</h2>
      </Card.Header>
      <Card.Body>
        <p>Start building amazing interfaces!</p>
        <Button variant="primary">Get Started</Button>
      </Card.Body>
    </Card>
  );
}
```

## 🎯 What's Next?

After completing the quick start:

1. **Explore Components** - Check out the [Components Overview](../components/README.md)
2. **Learn Design Tokens** - Understand the [Design System Foundations](../design-tokens/README.md)
3. **Customize Styles** - Read the [Styles Documentation](../styles/README.md)
4. **Follow Best Practices** - Review our [Guidelines](../components/guidelines.md)

## 🛠️ Development Setup

### For Contributors

If you're planning to contribute to Atomix:

```bash
# Clone the repository
git clone https://github.com/shohojdhara/atomix.git
cd atomix

# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook
```

## 📚 Learning Path

### Beginner
1. [Installation Guide](./installation.md)
2. [Quick Start Tutorial](./quick-start.md)
3. [Components Overview](../components/README.md)

### Intermediate
1. [Design Tokens](../design-tokens/README.md)
2. [Customization Guide](../styles/customization.md)
3. [Component Guidelines](../components/guidelines.md)

### Advanced
1. [Architecture Guide](../styles/architecture.md)
2. [API Reference](../api/README.md)
3. [Contributing Guide](../resources/contributing.md)

## 🆘 Need Help?

- **Documentation Issues** - Check our [Support Guide](../resources/support.md)
- **Bug Reports** - Create an issue on [GitHub](https://github.com/shohojdhara/atomix/issues)
- **Questions** - Join our [Discussions](https://github.com/shohojdhara/atomix/discussions)

## 🔗 Quick Links

- [Components](../components/README.md) - All available components
- [Design Tokens](../design-tokens/README.md) - Colors, spacing, typography
- [Styles](../styles/README.md) - CSS architecture and utilities
- [Examples](../examples/README.md) - Real-world usage examples
- [API Reference](../api/README.md) - Complete API documentation

---

Ready to build something amazing? Let's get started! 🚀
