# Atomix Design System - AI Agent Guidelines

## Project Overview

You are working on **Atomix**, a modern React component library and design system built with TypeScript, SCSS, and Storybook. This is a comprehensive UI component library that provides both React components and vanilla JavaScript implementations.

## Key Project Structure

- **Components**: Located in `src/components/[ComponentName]/`
- **Styles**: ITCSS architecture in `src/styles/` with SCSS
- **Library utilities**: `src/lib/` contains composables, utils, types, and constants
- **Layouts**: Grid and layout components in `src/layouts/`
- **Documentation**: Storybook stories and MDX documentation

## Development Standards

### Component Development

1. **Dual Implementation Required**:

   - React component in `[ComponentName].tsx`
   - Vanilla JS implementation in `scripts/` subdirectory
   - Both implementations must have feature parity

2. **File Structure Pattern**:

   ```
   src/components/ComponentName/
   ├── ComponentName.tsx              # React component
   ├── ComponentName.stories.tsx      # Storybook stories
   ├── index.ts                       # Exports
   └── scripts/                       # Vanilla JS implementation
       ├── index.ts                   # Main component class
       ├── ComponentNameInteractions.ts # Event handlers & utilities
       └── bundle.ts                  # Global registration
   ```

3. **TypeScript Requirements**:
   - All components must be fully typed
   - Props interfaces defined in `src/lib/types/components.ts`
   - Use JSDoc comments for all public APIs
   - Export both component and type definitions

### Styling Guidelines

1. **ITCSS Architecture**:

   - Settings: `src/styles/01-settings/_settings.[component].scss`
   - Components: `src/styles/06-components/_components.[component].scss`
   - Use CSS custom properties with `--atomix-` prefix

2. **SCSS Conventions**:
   - Use BEM methodology for class names
   - Component root class: `.c-component-name`
   - Define variables with `!default` flag
   - Use `rem()` function for spacing values

### Code Quality Standards

1. **ESLint Configuration**: Follow the project's ESLint rules
2. **TypeScript**: Strict mode enabled, no implicit any
3. **Testing**: Use Vitest for unit tests
4. **Accessibility**: WCAG 2.1 AA compliance required

## AI Agent Instructions

### When Creating New Components:

1. **Always follow the dual implementation pattern** (React + Vanilla JS)
2. **Create comprehensive Storybook stories** showing all variants
3. **Add proper TypeScript definitions** in the appropriate files
4. **Include SCSS styling** following ITCSS architecture
5. **Create composable hooks** in `src/lib/composables/`
6. **Add constants** to `src/lib/constants/components.ts`

### When Modifying Existing Components:

1. **Check both React and vanilla JS implementations**
2. **Update corresponding stories** if behavior changes
3. **Maintain backward compatibility** unless explicitly breaking change
4. **Update type definitions** if props change
5. **Test accessibility** with screen readers

### Code Generation Best Practices:

1. **Use existing component patterns** as templates
2. **Follow established naming conventions**
3. **Include proper JSDoc documentation**
4. **Add error handling and validation**
5. **Consider responsive design** and mobile-first approach

### File Operations:

1. **Always check existing files** before creating new ones
2. **Use search tools** to understand current implementations
3. **Follow the project's export patterns**
4. **Update index files** when adding new components
5. **Maintain consistent code formatting**

### Dependencies and Imports:

1. **Use existing dependencies** when possible
2. **Import from proper paths** using the established aliases
3. **Follow the component export pattern**
4. **Use phosphor-react** for icons
5. **Import React types** from appropriate packages

### Testing and Validation:

1. **Write unit tests** for complex logic
2. **Test component variants** thoroughly
3. **Validate accessibility** features
4. **Check responsive behavior**
5. **Test both React and vanilla JS** implementations

### Documentation:

1. **Update Storybook stories** with new features
2. **Add MDX documentation** for complex components
3. **Include usage examples** in stories
4. **Document props and events** thoroughly
5. **Add migration guides** for breaking changes

## Specific Component Guidelines

### React Components:

- Use functional components with hooks
- Implement forwardRef for DOM elements
- Support both controlled and uncontrolled modes
- Use proper TypeScript generics for flexible APIs
- Handle edge cases gracefully

### Vanilla JS Components:

- Use ES6 classes with private methods
- Implement proper event handling and cleanup
- Support data attribute initialization
- Provide public API methods (open, close, destroy)
- Register components globally on window.Atomix

### Styling:

- Mobile-first responsive design
- Support for dark/light themes
- Use CSS custom properties for theming
- Implement proper focus states
- Consider reduced motion preferences

## Common Patterns to Follow

### Component Props Interface:

```typescript
export interface ComponentProps {
  /**
   * Brief description of the prop
   */
  propName: string;

  /**
   * Optional prop with default value
   */
  optional?: boolean;

  /**
   * Event handler
   */
  onEvent?: (data: EventData) => void;
}
```

### Component Hook Pattern:

```typescript
export function useComponent(props: ComponentProps) {
  // State management
  // Event handlers
  // Return state and handlers
}
```

### Vanilla JS Component Pattern:

```typescript
export default class Component {
  private element: HTMLElement;
  private options: ComponentOptions;

  constructor(element: string | HTMLElement, options: ComponentOptions = {}) {
    // Initialize component
  }

  // Public API methods
  public open(): void {}
  public close(): void {}
  public destroy(): void {}
}
```

## Error Handling

- Always validate props and parameters
- Provide meaningful error messages
- Handle edge cases gracefully
- Use TypeScript for compile-time safety
- Implement proper cleanup in destroy methods

## Performance Considerations

- Use React.memo for expensive components
- Implement proper event listener cleanup
- Optimize re-renders with useCallback/useMemo
- Consider lazy loading for large components
- Use CSS transforms for animations

## Accessibility Requirements

- Support keyboard navigation
- Provide ARIA labels and roles
- Ensure proper focus management
- Support screen readers
- Test with assistive technologies

## Browser Support

- Modern browsers (ES2020+)
- React 18+ support
- Node.js 16+ for development
- Progressive enhancement approach

Remember: Always prioritize code quality, accessibility, and maintainability. When in doubt, follow existing patterns in the codebase and ask for clarification on complex requirements.
