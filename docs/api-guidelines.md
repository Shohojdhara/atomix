# Component API Guidelines

This document establishes the standards and best practices for designing consistent, intuitive, and maintainable component APIs within the Atomix design system. Following these guidelines ensures that all components provide a predictable developer experience and maintain compatibility across the system.

## Core Principles

### 1. Consistency First
- All components must follow the same API patterns for similar functionality
- Use identical prop names for equivalent features across components
- Maintain consistent behavior for common interactions (click, focus, keyboard navigation)

### 2. Intuitive by Design
- API should be self-explanatory based on prop names
- Follow established conventions from popular component libraries
- Avoid complex or nested configuration objects when possible

### 3. Progressive Enhancement
- Support both basic and advanced usage patterns
- Enable simple use cases with minimal props
- Allow sophisticated configurations for complex scenarios

## Prop Naming Conventions

### Standard Prop Names
Use these standard prop names for common functionality:

| Purpose | Prop Name | Type | Notes |
|--------|-----------|------|-------|
| Visual style variant | `variant` | string | e.g., "primary", "secondary", "outline" |
| Size options | `size` | string | e.g., "sm", "md", "lg" |
| Disabled state | `disabled` | boolean | Applies consistent styling and behavior |
| Loading state | `loading` | boolean | Shows loading indicator and prevents interaction |
| Text alignment | `align` | "left" \| "center" \| "right" | For text-heavy components |
| Click handler | `onClick` | function | Standard React pattern |
| Change handler | `onChange` | function | For input-like components |
| Content override | `children` | React.ReactNode | For compound components |

### Boolean Props
- Use positive naming: `visible` instead of `invisible`, `checked` instead of `unchecked`
- Use descriptive prefixes when needed: `showHeader`, `enableAnimation`, `allowMultiple`

### Handler Props
- Use `on` prefix followed by capitalized event: `onSelect`, `onToggle`, `onSubmit`
- Pass meaningful arguments: event object, component state, custom data

### Accessibility Props
- `aria-label`: String label for screen readers
- `aria-labelledby`: ID reference to existing label
- `aria-describedby`: ID reference to description element
- `role`: Override default ARIA role if needed

## Component Composition Patterns

### 1. Compound Components
For complex components that need internal coordination:

```tsx
// Good example: Tabs component
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>
```

### 2. Controlled vs Uncontrolled
Support both patterns for stateful components:

```tsx
// Uncontrolled (internal state)
<Input defaultValue="initial value" />

// Controlled (external state)
<Input value={value} onChange={setValue} />
```

### 3. Render Props Pattern
For components that need to expose state to children:

```tsx
<Menu>
  {({ open }) => (
    <>
      <Menu.Button>{open ? 'Close' : 'Open'}</Menu.Button>
      <Menu.Items>
        <Menu.Item onSelect={() => {}}>Item 1</Menu.Item>
      </Menu.Items>
    </>
  )}
</Menu>
```

## API Design Patterns

### 1. Default Values
Provide sensible defaults that follow design system principles:

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const defaultProps = {
  variant: 'primary',  // Primary is the default action
  size: 'md',          // Medium is the standard size
  disabled: false,     // Components are enabled by default
};
```

### 2. Type Safety
Use strict typing with clear interfaces:

```tsx
interface ButtonProps extends BaseComponentProps {
  /**
   * The visual style variant of the button
   */
  variant?: ButtonVariant;
  
  /**
   * The size of the button
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Click event handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
```

### 3. Extensibility
Allow extending native element attributes:

```tsx
interface ButtonProps extends BaseComponentProps {
  // Component-specific props
  variant?: ButtonVariant;
  size?: ButtonSize;
  
  // Spread native button attributes
  [key: string]: any;
}

// Or more specifically:
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}
```

## Accessibility Requirements

Every component API must include provisions for:

### 1. WAI-ARIA Compliance
- Proper roles, states, and properties
- Dynamic updates to ARIA attributes based on state
- Keyboard navigation support

### 2. Focus Management
- Clear focus indicators
- Logical tab order
- Programmatic focus control when appropriate

### 3. Reduced Motion
- Respects user's `prefers-reduced-motion` setting
- Configurable animation disabling

## Backwards Compatibility

### Versioning Strategy
- Add new props as optional (non-breaking)
- Deprecate old props gradually with warnings
- Maintain old APIs during major version transitions

### Breaking Changes
When breaking changes are necessary:
1. Provide migration guide
2. Give advance notice in release notes
3. Offer codemod tools when possible

## Testing Considerations

### 1. API Completeness
Test that all documented props work as expected:
- Default values
- Different value types
- Handler functions
- Combinations of props

### 2. Accessibility Testing
Verify all accessibility props function correctly:
- ARIA attributes render properly
- Keyboard navigation works
- Screen reader announces correctly

### 3. Edge Cases
Test unusual prop combinations:
- Invalid prop values
- Conflicting props
- Rapid state changes

## Documentation Standards

### 1. Prop Documentation
Each prop should include:
- Clear description
- Type definition
- Default value
- Required vs optional status
- Possible values for enums
- Usage examples when not obvious

### 2. Examples
Provide examples for:
- Basic usage
- Multiple variants
- Complex configurations
- Accessibility implementations
- Common patterns

### 3. Storybook Integration
Stories should demonstrate:
- All available props
- Different states (loading, disabled, error)
- Responsive behavior
- Accessibility features

## Performance Considerations

### 1. Rendering Efficiency
- Use `React.memo` for components with stable props
- Memoize expensive calculations
- Avoid inline object/array creation in render

### 2. Bundle Size
- Export components individually for tree-shaking
- Split large components into smaller pieces
- Lazy-load non-critical features

## Validation and Error Handling

### 1. Prop Validation
- Use TypeScript for compile-time checks
- Implement runtime validation for critical props
- Provide helpful error messages

### 2. Error Boundaries
Consider wrapping complex components with error boundaries to prevent app crashes from component failures.

## Common Anti-Patterns to Avoid

1. **Prop Drilling**: Use context or compound components instead
2. **Overly Complex Props**: Break complex objects into simpler primitives
3. **Inconsistent Naming**: Always use the same prop name for the same concept
4. **Hidden Side Effects**: Avoid unexpected behavior changes based on prop combinations
5. **Overspecification**: Don't force consumers to provide unnecessary props

## Review Checklist

Before releasing a component, verify that:

- [ ] All props follow naming conventions
- [ ] Required props are truly necessary
- [ ] Default values are sensible
- [ ] Accessibility props are available
- [ ] Both controlled and uncontrolled patterns are supported where applicable
- [ ] API is consistent with similar components
- [ ] Type definitions are complete
- [ ] Documentation covers all props
- [ ] Examples demonstrate common use cases
- [ ] Performance implications are considered

Following these API guidelines will ensure that all components in the Atomix design system provide a cohesive, predictable, and delightful developer experience.