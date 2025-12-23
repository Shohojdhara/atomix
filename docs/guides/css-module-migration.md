# CSS Module Migration Guide

This guide explains how to migrate Atomix components from global SCSS classes to CSS modules, following the design system's best practices.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Migration Process](#step-by-step-migration-process)
4. [Migration Checklist](#migration-checklist)
5. [Common Patterns](#common-patterns)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## Introduction

### Why Migrate to CSS Modules?

CSS modules provide several benefits over global SCSS classes:

- **Style Isolation**: Component styles are scoped, preventing class name collisions
- **Tree Shaking**: Unused styles can be eliminated from the final bundle
- **Type Safety**: TypeScript can provide autocomplete for class names
- **Better Maintainability**: Styles are co-located with components
- **Improved Developer Experience**: Easier to find and modify component styles

### When to Migrate

- ✅ **Migrate**: New components, components being refactored, components with style conflicts
- ⏳ **Consider**: Components with many dependencies, components in active development
- ❌ **Defer**: Legacy components with complex global dependencies, components being deprecated

---

## Prerequisites

Before migrating, ensure you understand:

1. **BEM Methodology**: Block-Element-Modifier naming convention
2. **Design Tokens**: CSS custom properties (`--atomix-*` variables)
3. **SCSS Basics**: Variables, mixins, nesting, `@use` and `@forward`
4. **TypeScript**: Type definitions and module imports

---

## Step-by-Step Migration Process

### Before: Global SCSS Pattern

**Component File (`Badge.tsx`):**
```tsx
import React from 'react';

export interface BadgeProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ size = 'md', color = 'secondary', children, className = '' }: BadgeProps) {
  const classes = [
    'c-badge',
    size === 'sm' ? 'c-badge--sm' : '',
    size === 'md' ? 'c-badge--md' : '',
    size === 'lg' ? 'c-badge--lg' : '',
    color ? `c-badge--${color}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
```

**Global SCSS File (`_components.badge.scss`):**
```scss
@use '../../01-settings/index' as *;
@use '../../02-tools/index' as *;

.c-badge {
  @include component-base;
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  padding: var(--atomix-spacing-2) var(--atomix-spacing-3);
  border-radius: var(--atomix-border-radius-md);
  font-size: var(--atomix-font-size-sm);
  font-weight: var(--atomix-font-weight-medium);
  
  // Default appearance
  background-color: var(--atomix-secondary-bg-subtle);
  color: var(--atomix-secondary-text-emphasis);
  border: 1px solid var(--atomix-secondary-border-subtle);
  
  transition: all var(--atomix-transition-base);
}

// Size modifiers
.c-badge--sm {
  font-size: var(--atomix-font-size-xs);
  padding: calc(var(--atomix-spacing-1) + 1px) calc(var(--atomix-spacing-2) + 2px);
}

.c-badge--md {
  font-size: var(--atomix-font-size-sm);
  padding: var(--atomix-spacing-2) var(--atomix-spacing-3);
}

.c-badge--lg {
  font-size: var(--atomix-font-size-md);
  padding: var(--atomix-spacing-3) var(--atomix-spacing-4);
}

// Color modifiers
.c-badge--primary {
  background-color: var(--atomix-primary-bg-subtle);
  color: var(--atomix-primary-text-emphasis);
  border-color: var(--atomix-primary-border-subtle);
}

.c-badge--secondary {
  background-color: var(--atomix-secondary-bg-subtle);
  color: var(--atomix-secondary-text-emphasis);
  border-color: var(--atomix-secondary-border-subtle);
}

.c-badge--success {
  background-color: var(--atomix-success-bg-subtle);
  color: var(--atomix-success-text-emphasis);
  border-color: var(--atomix-success-border-subtle);
}

.c-badge--error {
  background-color: var(--atomix-error-bg-subtle);
  color: var(--atomix-error-text-emphasis);
  border-color: var(--atomix-error-border-subtle);
}

// Accessibility
.c-badge {
  &:focus-visible {
    @include focus-ring;
  }
}

@media (prefers-reduced-motion: reduce) {
  .c-badge {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .c-badge {
    border-width: 2px;
  }
}
```

### After: CSS Module Pattern

**Component File (`Badge.tsx`):**
```tsx
import React from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ size = 'md', color = 'secondary', children, className = '' }: BadgeProps) {
  const classes = [
    styles.badge,
    styles[`badge--${size}`],
    color && styles[`badge--${color}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
```

**CSS Module File (`Badge.module.scss`):**
```scss
// Component: Badge
// =============================================================================

@import '../../styles/01-settings/index';
@import '../../styles/02-tools/index';

// Block: Base component
// =============================================================================
.badge {
  @include component-base;
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  padding: var(--atomix-spacing-2) var(--atomix-spacing-3);
  border-radius: var(--atomix-border-radius-md);
  font-size: var(--atomix-font-size-sm);
  font-weight: var(--atomix-font-weight-medium);
  
  // Default appearance
  background-color: var(--atomix-secondary-bg-subtle);
  color: var(--atomix-secondary-text-emphasis);
  border: 1px solid var(--atomix-secondary-border-subtle);
  
  transition: all var(--atomix-transition-base);
}

// Size Modifiers
// =============================================================================
.badge--sm {
  font-size: var(--atomix-font-size-xs);
  padding: calc(var(--atomix-spacing-1) + 1px) calc(var(--atomix-spacing-2) + 2px);
}

.badge--md {
  font-size: var(--atomix-font-size-sm);
  padding: var(--atomix-spacing-2) var(--atomix-spacing-3);
}

.badge--lg {
  font-size: var(--atomix-font-size-md);
  padding: var(--atomix-spacing-3) var(--atomix-spacing-4);
}

// Color Modifiers
// =============================================================================
.badge--primary {
  background-color: var(--atomix-primary-bg-subtle);
  color: var(--atomix-primary-text-emphasis);
  border-color: var(--atomix-primary-border-subtle);
}

.badge--secondary {
  background-color: var(--atomix-secondary-bg-subtle);
  color: var(--atomix-secondary-text-emphasis);
  border-color: var(--atomix-secondary-border-subtle);
}

.badge--success {
  background-color: var(--atomix-success-bg-subtle);
  color: var(--atomix-success-text-emphasis);
  border-color: var(--atomix-success-border-subtle);
}

.badge--error {
  background-color: var(--atomix-error-bg-subtle);
  color: var(--atomix-error-text-emphasis);
  border-color: var(--atomix-error-border-subtle);
}

// Accessibility Enhancements
// =============================================================================
.badge {
  &:focus-visible {
    @include focus-ring;
  }
}

@media (prefers-reduced-motion: reduce) {
  .badge {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .badge {
    border-width: 2px;
  }
}
```

### Key Changes

1. **Import Statement**: Changed from global class names to CSS module import
   ```tsx
   // Before
   // No import needed (global classes)
   
   // After
   import styles from './Badge.module.scss';
   ```

2. **Class Name Building**: Changed from string concatenation to object property access
   ```tsx
   // Before
   `c-badge c-badge--${size} c-badge--${color}`
   
   // After
   styles.badge
   styles[`badge--${size}`]
   styles[`badge--${color}`]
   ```

3. **SCSS File Naming**: Changed from `_components.badge.scss` to `Badge.module.scss`
   - Removed `_` prefix (not needed for CSS modules)
   - Added `.module` suffix (required for CSS module processing)
   - Moved to component directory (co-located with component)

4. **Class Names**: Changed from `.c-badge` to `.badge`
   - Removed `c-` prefix (CSS modules provide scoping)
   - Kept BEM methodology within the module

5. **Import Paths**: Updated to use relative paths to styles directory
   ```scss
   // Before
   @use '../../01-settings/index' as *;
   
   // After
   @import '../../styles/01-settings/index';
   ```

---

## Migration Checklist

Use this checklist when migrating a component:

- [ ] **Create `.module.scss` file**
  - [ ] Copy styles from global SCSS file
  - [ ] Update import paths to use `../../styles/` instead of `../../`
  - [ ] Remove `c-` prefix from class names (keep BEM structure)
  - [ ] Ensure all design tokens are used (`--atomix-*` variables)

- [ ] **Update component TypeScript file**
  - [ ] Add CSS module import: `import styles from './ComponentName.module.scss'`
  - [ ] Update className building logic to use `styles` object
  - [ ] Handle dynamic class names with bracket notation: `styles[`class--${variant}`]`
  - [ ] Test that all variants still work

- [ ] **Update component exports**
  - [ ] Ensure component still exports correctly
  - [ ] Check that TypeScript types are preserved
  - [ ] Verify prop interfaces are unchanged

- [ ] **Test component**
  - [ ] Test all size variants (sm, md, lg)
  - [ ] Test all color variants (primary, secondary, etc.)
  - [ ] Test all state variants (active, disabled, etc.)
  - [ ] Test dark mode (if applicable)
  - [ ] Test responsive behavior
  - [ ] Test accessibility (keyboard navigation, screen readers)

- [ ] **Update Storybook stories**
  - [ ] Verify all stories still render correctly
  - [ ] Check that controls work as expected
  - [ ] Test interactive examples

- [ ] **Remove old global SCSS file**
  - [ ] Remove `_components.componentname.scss` from `src/styles/06-components/`
  - [ ] Remove import from `_index.scss` if present
  - [ ] Verify no other components depend on the global class

- [ ] **Verify build**
  - [ ] Run `npm run build` and check for errors
  - [ ] Verify CSS is generated correctly
  - [ ] Check bundle size (should be similar or smaller)

---

## Common Patterns

### Dynamic Class Names

**Pattern 1: Template Literal with Bracket Notation**
```tsx
const classes = [
  styles.badge,
  styles[`badge--${size}`],
  color && styles[`badge--${color}`],
  className,
].filter(Boolean).join(' ');
```

**Pattern 2: Conditional Object**
```tsx
const classes = [
  styles.badge,
  {
    [styles['badge--sm']]: size === 'sm',
    [styles['badge--md']]: size === 'md',
    [styles['badge--lg']]: size === 'lg',
    [styles['badge--primary']]: color === 'primary',
  },
  className,
]
  .filter(Boolean)
  .join(' ');
```

**Pattern 3: Helper Function**
```tsx
function buildClasses(base: string, modifiers: Record<string, boolean>): string {
  const classes = [base];
  Object.entries(modifiers).forEach(([key, condition]) => {
    if (condition) {
      classes.push(styles[key]);
    }
  });
  return classes.join(' ');
}

// Usage
const classes = buildClasses(styles.badge, {
  'badge--sm': size === 'sm',
  'badge--primary': color === 'primary',
});
```

### Combining with External className

Always allow external className to override or extend:
```tsx
const classes = [
  styles.badge,
  styles[`badge--${size}`],
  className, // External className comes last
].filter(Boolean).join(' ');
```

### TypeScript with CSS Modules

CSS modules provide type safety. Ensure your `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

Type definitions are automatically generated by the build system.

### Testing CSS Module Components

**Unit Tests:**
```tsx
import { render } from '@testing-library/react';
import { Badge } from './Badge';
import styles from './Badge.module.scss';

test('applies correct classes', () => {
  const { container } = render(<Badge size="sm" color="primary">Test</Badge>);
  const badge = container.firstChild;
  
  expect(badge).toHaveClass(styles.badge);
  expect(badge).toHaveClass(styles['badge--sm']);
  expect(badge).toHaveClass(styles['badge--primary']);
});
```

**Visual Regression Tests:**
- Use Storybook's visual regression testing
- Compare screenshots before and after migration
- Ensure no visual changes

---

## Troubleshooting

### Import Path Issues

**Problem:** `Cannot find module './ComponentName.module.scss'`

**Solutions:**
1. Verify file exists: `src/components/ComponentName/ComponentName.module.scss`
2. Check file extension: Must be `.module.scss` (not `.scss`)
3. Verify import path is relative to component file
4. Ensure build system is configured for CSS modules

### Class Name Not Found

**Problem:** `styles['badge--primary']` is `undefined`

**Solutions:**
1. Check SCSS file has the class: `.badge--primary { ... }`
2. Verify class name matches exactly (case-sensitive)
3. Check for typos in class names
4. Ensure build system processes CSS modules correctly
5. Try using bracket notation: `styles['badge--primary']` instead of `styles.badgePrimary`

### Global Styles Leaking

**Problem:** Global styles affecting CSS module component

**Solutions:**
1. Ensure CSS module file doesn't use `:global()` unless necessary
2. Check that design tokens are imported correctly
3. Verify no global class names are used in component
4. Use CSS module class names exclusively

### Build Configuration Issues

**Problem:** CSS modules not being processed

**Solutions:**
1. Verify PostCSS is configured for CSS modules
2. Check `rollup.config.js` includes CSS module support
3. Ensure `.module.scss` files are recognized
4. Check build logs for CSS module processing errors

### TypeScript Errors

**Problem:** TypeScript can't find CSS module types

**Solutions:**
1. Ensure `css-modules.d.ts` exists in `src/styles/`
2. Check `tsconfig.json` includes type definitions
3. Restart TypeScript server in your IDE
4. Run `npm run typecheck` to verify types

---

## Best Practices

### 1. Keep BEM Methodology

Even with CSS modules, maintain BEM naming:
```scss
// ✅ Good: BEM within module
.badge { }           // Block
.badge--sm { }       // Modifier
.badge__icon { }     // Element
.badge__icon--left { } // Element modifier

// ❌ Bad: Non-BEM naming
.badgeSmall { }
.badgeIconLeft { }
```

### 2. Continue Using Design Tokens

Always use design tokens for consistency:
```scss
// ✅ Good: Uses design tokens
.badge {
  padding: var(--atomix-spacing-2);
  color: var(--atomix-primary-text-emphasis);
}

// ❌ Bad: Hardcoded values
.badge {
  padding: 8px;
  color: #3b82f6;
}
```

### 3. Maintain Accessibility Features

Keep all accessibility enhancements:
```scss
.badge {
  &:focus-visible {
    @include focus-ring;
  }
}

@media (prefers-reduced-motion: reduce) {
  .badge {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .badge {
    border-width: 2px;
  }
}
```

### 4. Document Component-Specific Tokens

If a component uses custom CSS variables, document them:
```scss
// Component: Badge
// =============================================================================
// Custom CSS Variables:
// --badge-custom-spacing: Custom spacing override
// --badge-custom-color: Custom color override
```

### 5. Co-locate Styles with Components

Keep CSS module files in the same directory as components:
```
src/components/Badge/
├── Badge.tsx
├── Badge.module.scss
├── Badge.stories.tsx
└── index.ts
```

### 6. Use Consistent Import Patterns

Standardize how you import and use styles:
```tsx
// Standard pattern
import styles from './ComponentName.module.scss';

const classes = [
  styles.componentName,
  styles[`componentName--${variant}`],
  className,
].filter(Boolean).join(' ');
```

### 7. Handle Edge Cases

Consider edge cases in class name building:
```tsx
// Handle undefined/null values
const classes = [
  styles.badge,
  size && styles[`badge--${size}`],
  color && styles[`badge--${color}`],
  className,
].filter(Boolean).join(' ');

// Handle invalid variant values
const sizeClass = ['sm', 'md', 'lg'].includes(size) 
  ? styles[`badge--${size}`] 
  : '';
```

---

## Reference Implementation

The **Badge component** serves as the reference implementation for CSS module migration. Once migrated, it demonstrates:

- ✅ Proper CSS module structure
- ✅ BEM methodology within modules
- ✅ Design token usage
- ✅ Accessibility features
- ✅ TypeScript integration
- ✅ Dynamic class name handling

Refer to `src/components/Badge/` for the complete reference implementation.

---

## Additional Resources

- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [BEM Methodology](http://getbem.com/)
- [Design Tokens Guide](../design-tokens/README.md)
- [Component Development Guide](../../CONTRIBUTING.md)

---

## Questions?

If you encounter issues during migration:

1. Check this guide's troubleshooting section
2. Review the Badge component reference implementation
3. Consult the design system documentation
4. Ask in the project's discussion forum

---

**Last Updated:** December 23, 2025  
**Version:** 1.0.0

