# Atomix Component Development Guidelines

This document outlines the approach and best practices for creating components in the Atomix design system. Follow these guidelines when developing new components to ensure consistency and quality.

## Component Structure

### 1. React Component Implementation

- Create a dedicated directory under `src/components/[ComponentName]/`
- Implement three core files:
  - `ComponentName.tsx`: The React component
  - `index.ts`: Export file
  - `ComponentName.stories.tsx`: Storybook examples

### 2. Vanilla JS Implementation

- Create a `scripts` subdirectory:
  - `index.ts`: Main component class
  - `componentInteractions.ts`: Event handlers and utilities
  - `bundle.ts`: Exports for global use
  - `./src/main.ts`: Entry point for initializing components

### 3. Type Definitions

- Define component props in `src/lib/types/components.ts`
- Export interfaces for all component variants and options

### 4. Hooks (for React)

- Create a dedicated hook in `src/lib/composables/use[ComponentName].ts`
- Extract component logic for reusability and state management

### 5. Styling

- Add component-specific SCSS in `src/styles/06-components/_components.[component-name].scss`
- Define component variables in `src/styles/01-settings/_settings.[component-name].scss`

## Implementation Guidelines

### React Component

1. **Props Interface**
   - Define a clear props interface with JSDoc comments
   - Use sensible defaults for optional props
   - Include callback props for state changes (e.g., `onOpenChange`)

2. **Controlled & Uncontrolled Modes**
   - Support both controlled mode (parent manages state) and uncontrolled mode
   - Example: `isOpen` prop with optional `onOpenChange` callback

3. **Accessibility**
   - Include proper ARIA attributes
   - Ensure keyboard navigation works
   - Support screen readers

### Vanilla JS Implementation

1. **Class Structure**
   - Create a main class with instance methods
   - Follow the initialization pattern with constructor, private methods, and public API
   - Support configuration via data attributes and constructor options

2. **Event Handling**
   - Use proper event delegation
   - Clean up event listeners in destroy method
   - Custom events for component state changes (e.g., 'componentname:open')

3. **Global API**
   - Export utility functions (initialize, open, close, etc.)
   - Bundle for global namespace usage

## Styling Approach

1. **BEM Methodology**
   - Follow Block-Element-Modifier naming: `.c-component-name__element--modifier`
   - Use the `c-` prefix for component classes

2. **CSS Custom Properties**
   - Define component-specific variables with fallbacks
   - Use the established prefix pattern: `--#{$prefix}component-name-property`

3. **Responsive Design**
   - Support mobile-first approach
   - Use responsive breakpoints consistently

4. **Animation & Transitions**
   - Use consistent animation durations
   - Follow the established animation patterns
   - Support animation disabling via mode options

## Constants & Configuration

1. **Component Constants**
   - Add component-specific constants in `src/lib/constants/components.ts`
   - Define selectors, classes, and default values

## Testing & Documentation

1. **Storybook Stories**
   - Create comprehensive stories for all variants
   - Add proper documentation with usage examples
   - Test edge cases and different prop combinations

2. **Example Usage**
   - Provide clear examples of how to use the component in different scenarios
   - Include screenshots and code snippets
   - Document all available options and APIs

## Implementation Example (EdgePanel)

### React Component

```tsx
// Basic structure of React component
export const EdgePanel: React.FC<EdgePanelProps> = ({
  title,
  children,
  position = 'start',
  mode = 'slide',
  isOpen = false,
  onOpenChange,
  backdrop = true,
  // ... other props
}) => {
  const {
    isOpen: isOpenState,
    containerRef,
    // ... other state
  } = useEdgePanel({
    position,
    mode,
    isOpen,
    onOpenChange,
    // ... other props
  });

  return (
    <div className={generateComponentClass()} data-position={position}>
      {/* Component structure */}
    </div>
  );
};
```

### Vanilla JS Implementation

```js
// Basic structure of vanilla JS class
class ComponentName {
  constructor(element, options = {}) {
    this.$element = typeof element === 'string' ? document.querySelector(element) : element;
    this.options = { ...defaults, ...options };
    this._initialize();
  }

  _initialize() {
    // Setup logic
  }

  // Public API methods
  open() {}
  close() {}
  destroy() {}

  // Static initialization method
  static initializeAll() {
    // Find and initialize all instances
  }
}
```

## Accessibility Checklist

- [ ] Keyboard navigation support
- [ ] Proper focus management
- [ ] ARIA roles and attributes
- [ ] Color contrast compliance
- [ ] Screen reader compatibility

## Performance Considerations

- Minimize DOM operations
- Use efficient event handling
- Clean up resources when components are destroyed
- Implement lazy initialization where appropriate

By following these guidelines, you'll create components that integrate seamlessly with the Atomix design system and provide a consistent, high-quality user experience. 