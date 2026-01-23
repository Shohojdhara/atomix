# Guides

Comprehensive guides and tutorials for mastering the Atomix Design System. Learn best practices, advanced techniques, and real-world implementation strategies.

## 📚 Available Guides

### 🎨 [Theming Guide](./theming.md)
Master the Atomix theming system for brand customization and multi-theme support.

**What you'll learn:**
- CSS custom property theming
- Creating custom themes
- Dark mode implementation
- Brand integration strategies
- Runtime theme switching

### 📱 [Responsive Design Guide](./responsive-design.md)
Build responsive interfaces that work beautifully across all devices.

**What you'll learn:**
- Mobile-first methodology
- Breakpoint strategies
- Responsive component patterns
- Flexible layouts
- Performance optimization

### ⚡ [Performance Guide](./performance.md)
Optimize your Atomix implementation for maximum performance.

**What you'll learn:**
- Bundle size optimization
- Tree shaking strategies
- CSS performance
- Runtime optimization
- Loading strategies

### 🧪 [Testing Guide](./testing.md)
Comprehensive testing strategies for Atomix components and applications.

**What you'll learn:**
- Unit testing components
- Integration testing
- Accessibility testing
- Visual regression testing
- E2E testing patterns

### 🔧 [Advanced Customization](./advanced-customization.md)
Deep dive into advanced customization techniques and patterns.

**What you'll learn:**
- Custom component creation
- SCSS advanced patterns
- CSS architecture
- Plugin development
- Build system integration


**What you'll learn:**
- Migrating from Bootstrap
- Migrating from Material-UI
- Migrating from Tailwind CSS
- Migration strategies
- Compatibility layers

## 🎯 Learning Paths

### Beginner Path
1. [Getting Started](../getting-started/README.md)
2. [Components Overview](../components/README.md)
3. [Basic Theming](./theming.md#basic-theming)
4. [Responsive Basics](./responsive-design.md#fundamentals)

### Intermediate Path
1. [Design Tokens](../design-tokens/README.md)
2. [Advanced Theming](./theming.md#advanced-theming)
3. [Performance Optimization](./performance.md)
4. [Testing Strategies](./testing.md)

### Advanced Path
1. [Styles Architecture](../styles/architecture.md)
2. [Advanced Customization](./advanced-customization.md)
3. [Custom Components](./advanced-customization.md#custom-components)
4. [Build Integration](./advanced-customization.md#build-integration)

## 🛠️ Quick Reference

### Common Tasks

#### Setting up Dark Mode
```css
[data-theme="dark"] {
  --atomix-bg-primary: #1f2937;
  --atomix-text-primary: #f9fafb;
}
```

#### Creating Responsive Layouts
```jsx
<div className="u-flex u-flex-column u-flex-md-row u-gap-4">
  <div className="u-flex-1">Main content</div>
  <div className="u-w-md-25">Sidebar</div>
</div>
```

#### Optimizing Bundle Size
```javascript
// Import only what you need
import { Button, Card } from '@shohojdhara/atomix';
// Instead of
import * from '@shohojdhara/atomix';
```

#### Testing Components
```jsx
import { render, screen } from '@testing-library/react';
import { Button } from '@shohojdhara/atomix';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

## 🎨 Best Practices

### Design Consistency
- Use design tokens consistently
- Follow component guidelines
- Maintain visual hierarchy
- Ensure accessibility compliance

### Performance
- Import components selectively
- Use CSS custom properties for theming
- Optimize images and assets
- Implement proper loading states

### Maintainability
- Follow naming conventions
- Document custom components
- Use semantic HTML
- Keep styles modular

### Accessibility
- Test with screen readers
- Ensure keyboard navigation
- Maintain color contrast
- Provide alternative text

## 🔗 Related Documentation

- [Getting Started](../getting-started/README.md) - Installation and setup
- [Components](../components/README.md) - Component library
- [Design Tokens](../design-tokens/README.md) - Design system foundation
- [Styles](../styles/README.md) - CSS architecture
- [Examples](../examples/README.md) - Real-world examples
- [API Reference](../api/README.md) - Complete API documentation

## 🆘 Need Help?

- **Documentation** - Check the relevant guide sections
- **Examples** - Browse [real-world examples](../examples/README.md)
- **Community** - Join our [GitHub Discussions](https://github.com/shohojdhara/atomix/discussions)
- **Issues** - Report bugs on [GitHub Issues](https://github.com/shohojdhara/atomix/issues)

## 🚀 Contributing

Want to contribute to the guides?

1. **Identify gaps** - What's missing from the documentation?
2. **Share knowledge** - Write about your experiences
3. **Improve existing** - Update outdated information
4. **Add examples** - Provide real-world use cases

See our [Contributing Guide](../resources/contributing.md) for more details.

---

Master Atomix with these comprehensive guides! 📚
