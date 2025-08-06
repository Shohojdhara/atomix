# Contributing to Atomix

Thank you for your interest in contributing to the Atomix Design System! This guide will help you get started with contributing code, documentation, design assets, and more.

## 🤝 Ways to Contribute

### Code Contributions
- **Bug fixes** - Help us fix issues and improve stability
- **New components** - Add new components to the library
- **Feature enhancements** - Improve existing functionality
- **Performance optimizations** - Make Atomix faster and more efficient
- **Accessibility improvements** - Enhance accessibility compliance

### Documentation
- **API documentation** - Improve component documentation
- **Guides and tutorials** - Write helpful guides
- **Examples** - Create real-world usage examples
- **Translations** - Help translate documentation

### Design
- **Design tokens** - Improve the design system foundation
- **Component designs** - Design new components
- **Design assets** - Create Figma/Sketch libraries
- **Icons** - Contribute to the icon library

### Community
- **Issue triage** - Help categorize and prioritize issues
- **Code reviews** - Review pull requests
- **Community support** - Help answer questions
- **Testing** - Test new features and report bugs

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.0 or higher
- **npm** 7.0 or higher (or **yarn** 1.22+)
- **Git** for version control
- Basic knowledge of **React**, **TypeScript**, and **SCSS**

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/atomix.git
   cd atomix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run Storybook**
   ```bash
   npm run storybook
   ```

5. **Run tests**
   ```bash
   npm test
   ```

### Project Structure

```
atomix/
├── src/
│   ├── components/          # React components
│   ├── styles/             # SCSS styles and design tokens
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript type definitions
├── docs/                   # Documentation
├── stories/                # Storybook stories
├── tests/                  # Test files
├── tools/                  # Build and development tools
└── examples/               # Usage examples
```

## 📝 Contribution Guidelines

### Code Standards

#### TypeScript
- Use TypeScript for all new code
- Provide proper type definitions
- Use strict mode settings
- Document complex types

```typescript
// Good: Proper interface definition
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Good: Generic component with constraints
interface SelectProps<T extends string | number> {
  value?: T;
  options: Array<{ value: T; label: string }>;
  onChange?: (value: T) => void;
}
```

#### React Components
- Use functional components with hooks
- Follow React best practices
- Implement proper prop validation
- Support ref forwarding

```jsx
// Good: Functional component with forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`c-btn c-btn--${variant} c-btn--${size}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

#### SCSS/CSS
- Follow ITCSS methodology
- Use BEM naming convention
- Leverage CSS custom properties
- Write mobile-first responsive code

```scss
// Good: BEM naming and CSS custom properties
.c-btn {
  --btn-padding-x: #{map.get($spacing-sizes, 4)};
  --btn-padding-y: #{map.get($spacing-sizes, 3)};
  --btn-bg: var(--atomix-primary);
  --btn-color: var(--atomix-white);
  
  display: inline-flex;
  align-items: center;
  padding: var(--btn-padding-y) var(--btn-padding-x);
  background-color: var(--btn-bg);
  color: var(--btn-color);
  
  &--sm {
    --btn-padding-x: #{map.get($spacing-sizes, 3)};
    --btn-padding-y: #{map.get($spacing-sizes, 2)};
  }
  
  &--lg {
    --btn-padding-x: #{map.get($spacing-sizes, 6)};
    --btn-padding-y: #{map.get($spacing-sizes, 4)};
  }
}
```

### Accessibility Requirements

All components must meet **WCAG 2.1 AA** standards:

- **Keyboard navigation** - All interactive elements must be keyboard accessible
- **Screen reader support** - Proper ARIA attributes and semantic HTML
- **Color contrast** - Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus management** - Visible focus indicators and logical tab order

```jsx
// Good: Accessible component
const Modal = ({ isOpen, onClose, children, ...props }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);
  
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
};
```

### Testing Requirements

- **Unit tests** - Test component logic and behavior
- **Integration tests** - Test component interactions
- **Accessibility tests** - Automated accessibility testing
- **Visual regression tests** - Prevent visual regressions

```javascript
// Good: Comprehensive component test
describe('Button', () => {
  test('renders with correct variant class', () => {
    render(<Button variant="primary">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('c-btn--primary');
  });
  
  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('is accessible', async () => {
    const { container } = render(<Button>Test</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('supports keyboard navigation', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    
    button.focus();
    expect(button).toHaveFocus();
    
    fireEvent.keyDown(button, { key: 'Enter' });
    // Assert expected behavior
  });
});
```

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Create feature branch
git checkout -b feature/new-component-name

# Create bugfix branch
git checkout -b fix/issue-description

# Create documentation branch
git checkout -b docs/update-guide
```

### 2. Make Changes

- Write code following our standards
- Add or update tests
- Update documentation
- Add Storybook stories for new components

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run accessibility tests
npm run test:a11y

# Run visual regression tests
npm run test:visual

# Lint code
npm run lint

# Type check
npm run type-check
```

### 4. Create Pull Request

- Write a clear title and description
- Reference related issues
- Include screenshots for UI changes
- Add breaking change notes if applicable

#### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Accessibility tests pass
- [ ] Visual regression tests pass
- [ ] Manual testing completed

## Screenshots
Include screenshots for UI changes

## Breaking Changes
List any breaking changes

## Related Issues
Closes #123
```

## 📋 Component Development Guide

### Creating a New Component

1. **Create component directory**
   ```
   src/components/NewComponent/
   ├── index.ts
   ├── NewComponent.tsx
   ├── NewComponent.test.tsx
   ├── NewComponent.stories.tsx
   └── _new-component.scss
   ```

2. **Implement the component**
   ```tsx
   // NewComponent.tsx
   import React from 'react';
   import './new-component.scss';
   
   export interface NewComponentProps {
     variant?: 'default' | 'primary';
     children: React.ReactNode;
   }
   
   export const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
     ({ variant = 'default', children, ...props }, ref) => {
       return (
         <div
           ref={ref}
           className={`c-new-component c-new-component--${variant}`}
           {...props}
         >
           {children}
         </div>
       );
     }
   );
   
   NewComponent.displayName = 'NewComponent';
   ```

3. **Add styles**
   ```scss
   // _new-component.scss
   .c-new-component {
     --new-component-bg: var(--atomix-bg-primary);
     --new-component-color: var(--atomix-text-primary);
     
     background-color: var(--new-component-bg);
     color: var(--new-component-color);
     
     &--primary {
       --new-component-bg: var(--atomix-primary);
       --new-component-color: var(--atomix-white);
     }
   }
   ```

4. **Write tests**
   ```tsx
   // NewComponent.test.tsx
   import { render, screen } from '@testing-library/react';
   import { NewComponent } from './NewComponent';
   
   describe('NewComponent', () => {
     test('renders children', () => {
       render(<NewComponent>Test content</NewComponent>);
       expect(screen.getByText('Test content')).toBeInTheDocument();
     });
     
     test('applies variant class', () => {
       render(<NewComponent variant="primary">Test</NewComponent>);
       expect(screen.getByText('Test')).toHaveClass('c-new-component--primary');
     });
   });
   ```

5. **Create Storybook stories**
   ```tsx
   // NewComponent.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { NewComponent } from './NewComponent';
   
   const meta: Meta<typeof NewComponent> = {
     title: 'Components/NewComponent',
     component: NewComponent,
     parameters: {
       docs: {
         description: {
           component: 'A new component for the Atomix design system.'
         }
       }
     }
   };
   
   export default meta;
   type Story = StoryObj<typeof NewComponent>;
   
   export const Default: Story = {
     args: {
       children: 'Default new component'
     }
   };
   
   export const Primary: Story = {
     args: {
       variant: 'primary',
       children: 'Primary new component'
     }
   };
   ```

## 🐛 Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Environment details** (OS, browser, Node version)
- **Code examples** or minimal reproduction
- **Screenshots** if applicable

## 💡 Feature Requests

For feature requests, please provide:

- **Use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives considered** - Other approaches you've thought about
- **Additional context** - Any other relevant information

## 📞 Getting Help

- **GitHub Discussions** - Ask questions and share ideas
- **Discord** - Real-time chat with the community
- **GitHub Issues** - Report bugs and request features
- **Email** - Contact the maintainers directly

## 🏆 Recognition

Contributors are recognized in multiple ways:

### All Contributors
We use the [All Contributors](https://allcontributors.org/) specification to recognize all types of contributions:

- **Code** 💻 - Code contributions
- **Design** 🎨 - Design and visual contributions
- **Documentation** 📖 - Documentation improvements
- **Ideas** 🤔 - Ideas, planning, and feedback
- **Bug Reports** 🐛 - Bug reports and testing
- **Maintenance** 🚧 - Repository maintenance
- **Reviews** 👀 - Code reviews
- **Tutorials** ✅ - Tutorials and examples

### Adding Contributors

To add a new contributor, comment on any issue or PR:

```
@all-contributors please add @username for code, design, doc
```

Available contribution types:
- `code` - Code contributions
- `design` - Design work
- `doc` - Documentation
- `ideas` - Ideas and planning
- `bug` - Bug reports
- `maintenance` - Maintenance work
- `review` - Code reviews
- `tutorial` - Tutorials
- `test` - Testing
- `infra` - Infrastructure
- `translation` - Translation work

### Other Recognition

- **Changelog** - Credited for contributions in release notes
- **Release notes** - Highlighted for major contributions
- **Community** - Featured in community highlights
- **Social media** - Shared on project social accounts

## 📄 License

By contributing to Atomix, you agree that your contributions will be licensed under the Apache License 2.0.

---

Thank you for contributing to Atomix! Together, we're building an amazing design system. 🚀
