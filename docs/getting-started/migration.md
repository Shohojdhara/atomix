# Migration Guide

This guide helps you migrate from other design systems and CSS frameworks to Atomix. We provide step-by-step instructions, mapping tables, and automated tools to make the transition smooth.

## 🎯 Migration Overview

### Why Migrate to Atomix?

- **Modern Architecture** - ITCSS methodology and CSS custom properties
- **Better Performance** - Smaller bundle size and optimized CSS
- **Enhanced Accessibility** - WCAG 2.1 AA compliance built-in
- **Developer Experience** - Better TypeScript support and documentation
- **Flexibility** - Easy theming and customization

### Migration Strategy

1. **Assess Current Usage** - Audit your existing components and styles
2. **Plan the Migration** - Prioritize components and create timeline
3. **Set Up Atomix** - Install and configure alongside existing system
4. **Migrate Incrementally** - Replace components one by one
5. **Clean Up** - Remove old dependencies and unused code

## 🔄 From Bootstrap

### Class Mapping

| Bootstrap | Atomix | Notes |
|-----------|--------|-------|
| `.btn` | `.c-btn` | Component prefix changed |
| `.btn-primary` | `.c-btn--primary` | BEM modifier syntax |
| `.btn-lg` | `.c-btn--lg` | Size variants |
| `.card` | `.c-card` | Component prefix |
| `.card-header` | `.c-card__header` | BEM element syntax |
| `.container` | `.o-container` | Object prefix |
| `.row` | `.o-grid` | Grid system updated |
| `.col-6` | `.o-grid__item--span-6` | Grid item syntax |
| `.d-flex` | `.u-d-flex` | Utility prefix |
| `.justify-content-center` | `.u-justify-content-center` | Utility prefix |
| `.text-center` | `.u-text-center` | Utility prefix |
| `.mb-4` | `.u-mb-4` | Utility prefix |
| `.p-3` | `.u-p-3` | Utility prefix |

### Component Migration

```jsx
// Bootstrap
<div className="card">
  <div className="card-header">
    <h5 className="card-title">Title</h5>
  </div>
  <div className="card-body">
    <p className="card-text">Content</p>
    <button className="btn btn-primary">Action</button>
  </div>
</div>

// Atomix
<Card>
  <Card.Header>
    <h5>Title</h5>
  </Card.Header>
  <Card.Body>
    <p>Content</p>
    <Button variant="primary">Action</Button>
  </Card.Body>
</Card>
```

### SCSS Variables

```scss
// Bootstrap variables to Atomix
@use '@shohojdhara/atomix/styles' with (
  $primary-6: $blue,                    // $primary
  $font-family-base: $font-family-sans-serif,
  $font-size-base: $font-size-base,
  $line-height-base: $line-height-base,
  $border-radius: $border-radius,
  $spacer: $spacer
);
```

### Automated Migration

```bash
# Install migration tool
npm install -g @atomix/migrate-bootstrap

# Run migration
atomix-migrate bootstrap ./src --output ./src-atomix
```

## 🎨 From Material-UI

### Component Mapping

| Material-UI | Atomix | Notes |
|-------------|--------|-------|
| `<Button>` | `<Button>` | Similar API |
| `<Card>` | `<Card>` | Nested structure |
| `<TextField>` | `<Input>` | Form components |
| `<Dialog>` | `<Modal>` | Modal dialogs |
| `<AppBar>` | `<Navbar>` | Navigation |
| `<Drawer>` | `<EdgePanel>` | Side panels |
| `<Chip>` | `<Badge>` | Small indicators |
| `<Avatar>` | `<Avatar>` | User images |

### Theme Migration

```jsx
// Material-UI theme
const muiTheme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  },
  typography: {
    fontFamily: 'Roboto'
  }
});

// Atomix theme
const atomixTheme = {
  '--atomix-primary': '#1976d2',
  '--atomix-secondary': '#dc004e',
  '--atomix-font-family-base': 'Roboto, sans-serif'
};
```

### Component Migration

```jsx
// Material-UI
import { Button, Card, CardContent, CardActions } from '@mui/material';

<Card>
  <CardContent>
    <Typography variant="h5">Title</Typography>
    <Typography variant="body2">Content</Typography>
  </CardContent>
  <CardActions>
    <Button variant="contained" color="primary">
      Action
    </Button>
  </CardActions>
</Card>

// Atomix
import { Button, Card } from '@shohojdhara/atomix';

<Card>
  <Card.Body>
    <h5>Title</h5>
    <p>Content</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="primary">Action</Button>
  </Card.Footer>
</Card>
```

## 🌊 From Tailwind CSS

### Utility Mapping

| Tailwind | Atomix | Notes |
|----------|--------|-------|
| `.bg-blue-500` | `.u-bg-primary` | Semantic colors |
| `.text-gray-900` | `.u-text-primary` | Text colors |
| `.p-4` | `.u-p-4` | Same spacing scale |
| `.mb-6` | `.u-mb-6` | Same spacing scale |
| `.flex` | `.u-d-flex` | Display utilities |
| `.justify-center` | `.u-justify-content-center` | Flexbox utilities |
| `.items-center` | `.u-align-items-center` | Flexbox utilities |
| `.rounded-lg` | `.u-rounded-lg` | Border radius |
| `.shadow-md` | `.u-shadow-md` | Shadows |
| `.hidden` | `.u-d-none` | Visibility |
| `.block` | `.u-d-block` | Display |

### Color Migration

```css
/* Tailwind colors to Atomix semantic colors */
.bg-blue-500 → .u-bg-primary
.bg-red-500 → .u-bg-error
.bg-green-500 → .u-bg-success
.bg-yellow-500 → .u-bg-warning
.bg-gray-100 → .u-bg-secondary

/* Or use CSS custom properties */
:root {
  --atomix-blue-500: #3b82f6;
  --atomix-red-500: #ef4444;
  --atomix-green-500: #22c55e;
}
```

### Component Approach

```jsx
// Tailwind (utility-first)
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-semibold mb-4">Title</h2>
  <p className="text-gray-600 mb-4">Content</p>
  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    Action
  </button>
</div>

// Atomix (component-first with utilities)
<Card>
  <Card.Body>
    <h2 className="u-fs-xl u-fw-semibold u-mb-4">Title</h2>
    <p className="u-text-secondary u-mb-4">Content</p>
    <Button variant="primary">Action</Button>
  </Card.Body>
</Card>
```

## 🔧 Migration Tools

### Automated Code Transformation

```bash
# Install Atomix CLI
npm install -g @atomix/cli

# Run codemod for Bootstrap
atomix codemod bootstrap-to-atomix ./src

# Run codemod for Material-UI
atomix codemod mui-to-atomix ./src

# Run codemod for Tailwind
atomix codemod tailwind-to-atomix ./src
```

### VS Code Extension

Install the Atomix VS Code extension for:
- Automatic class name suggestions
- Migration hints and warnings
- Quick fixes for common patterns
- Snippet conversion

### ESLint Plugin

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['@atomix/migration'],
  rules: {
    '@atomix/migration/no-bootstrap-classes': 'warn',
    '@atomix/migration/prefer-atomix-components': 'warn',
    '@atomix/migration/use-semantic-colors': 'warn'
  }
};
```

## 📋 Migration Checklist

### Pre-Migration
- [ ] Audit current component usage
- [ ] Identify custom styles and overrides
- [ ] Plan migration timeline
- [ ] Set up development environment
- [ ] Install Atomix alongside existing system

### During Migration
- [ ] Start with leaf components (no dependencies)
- [ ] Migrate one component type at a time
- [ ] Update tests for migrated components
- [ ] Verify accessibility compliance
- [ ] Test responsive behavior

### Post-Migration
- [ ] Remove old dependencies
- [ ] Clean up unused CSS
- [ ] Update documentation
- [ ] Train team on new patterns
- [ ] Monitor bundle size and performance

## 🚨 Common Issues

### Specificity Conflicts

```css
/* Problem: Old styles overriding Atomix */
.legacy-button {
  background: red !important; /* Too specific */
}

/* Solution: Use CSS custom properties */
.legacy-button {
  --atomix-btn-bg: red;
}
```

### Missing Components

```jsx
// Problem: Component doesn't exist in Atomix
<BootstrapSpinner />

// Solution: Use closest equivalent or create custom
<Spinner /> // Use Atomix spinner
// or
<div className="custom-spinner">...</div> // Create custom
```

### Different API Patterns

```jsx
// Problem: Different prop names
<MuiButton color="primary" variant="contained">

// Solution: Map to Atomix API
<Button variant="primary">
```

## 🎯 Best Practices

### Incremental Migration
- Migrate one page/component at a time
- Keep both systems running during transition
- Use feature flags for gradual rollout

### Testing Strategy
- Maintain visual regression tests
- Test accessibility after migration
- Verify responsive behavior
- Check keyboard navigation

### Team Training
- Document new patterns and conventions
- Provide migration examples
- Set up code review guidelines
- Create internal style guide

## 🔗 Related Resources

- [Getting Started](./installation.md) - Installation and setup
- [Component Guidelines](../components/guidelines.md) - Best practices
- [Theming Guide](../guides/theming.md) - Customization
- [API Reference](../api/README.md) - Complete API documentation

---

Need help with migration? Check our [Support Guide](../resources/support.md) or join our [Community Discussions](https://github.com/shohojdhara/atomix/discussions).
