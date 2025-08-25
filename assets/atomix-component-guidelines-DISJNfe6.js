import{j as n}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as t}from"./index-DVlM3JHq.js";import"./index-BVDOR7y2.js";function s(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"atomix-component-development-guidelines",children:"Atomix Component Development Guidelines"}),`
`,n.jsx(e.p,{children:"This document outlines the approach and best practices for creating components in the Atomix design system. Follow these guidelines when developing new components to ensure consistency and quality."}),`
`,n.jsx(e.h2,{id:"component-structure",children:"Component Structure"}),`
`,n.jsx(e.h3,{id:"1-react-component-implementation",children:"1. React Component Implementation"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Create a dedicated directory under ",n.jsx(e.code,{children:"src/components/[ComponentName]/"})]}),`
`,n.jsxs(e.li,{children:["Implement these core files:",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"[ComponentName].tsx"}),": The React component with JSDoc comments"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"index.ts"}),": Export file that re-exports the component and its types"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"[ComponentName].stories.tsx"}),": Storybook examples showcasing all variants"]}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// index.ts example
export { default, [ComponentName] } from "./[ComponentName]";
export type { [ComponentName]Props } from "./[ComponentName]";
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// scripts/index.ts example (main component class)
export default class ComponentName {
  private element: HTMLElement;
  private options: any;

  constructor(element: string | HTMLElement, options: any = {}) {
    this.element =
      typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;
    this.options = { ...DEFAULTS, ...options };
    this._init();
  }

  private _init(): void {
    // Initialize component
  }

  // Public methods for external API
  public open(): void {}
  public close(): void {}
  public destroy(): void {}
}
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// scripts/[ComponentName]Interactions.ts example
import ComponentName from './index';

/**
 * Initialize components with data attributes
 */
export function initFromDataAttributes(): ComponentName[] {
  const instances: ComponentName[] = [];

  document.querySelectorAll('[data-component-name]').forEach(element => {
    const options = parseDataAttributes(element);
    const instance = new ComponentName(element as HTMLElement, options);
    instances.push(instance);
  });

  return instances;
}

/**
 * Get a component instance from an element
 */
export function getInstance(element: string | HTMLElement): ComponentName | null {
  // Implementation
}

/**
 * Dispose all component instances
 */
export function disposeAll(): void {
  // Implementation
}
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// scripts/bundle.ts example
import ComponentName from './index';
import { initFromDataAttributes, getInstance, disposeAll } from './[ComponentName]Interactions';

if (typeof window !== 'undefined') {
  // Initialize the Atomix global object if it doesn't exist
  (window as any).Atomix = (window as any).Atomix || {};

  // Add component to the global Atomix object
  (window as any).Atomix.ComponentName = {
    create: ComponentName,
    init: initFromDataAttributes,
    get: getInstance,
    disposeAll: disposeAll,
  };

  // Auto-initialize components when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initFromDataAttributes();
    });
  } else {
    initFromDataAttributes();
  }
}

// Export everything for module bundling
export { ComponentName as default, initFromDataAttributes, getInstance, disposeAll };
`})}),`
`,n.jsx(e.h3,{id:"3-type-definitions",children:"3. Type Definitions"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Define component props interface in ",n.jsx(e.code,{children:"src/lib/types/components.ts"})]}),`
`,n.jsx(e.li,{children:"Use descriptive JSDoc comments for each prop"}),`
`,n.jsx(e.li,{children:"Export interfaces for all component variants and options"}),`
`,n.jsx(e.li,{children:"Use TypeScript's utility types when appropriate (Partial, Pick, etc.)"}),`
`]}),`
`,n.jsx(e.h3,{id:"4-hooks-for-react",children:"4. Hooks (for React)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Create a dedicated hook in ",n.jsx(e.code,{children:"src/lib/composables/use[ComponentName].ts"})]}),`
`,n.jsx(e.li,{children:"Extract component logic for reusability and state management"}),`
`,n.jsx(e.li,{children:"Support both controlled and uncontrolled modes"}),`
`,n.jsx(e.li,{children:"Return all necessary state variables, refs, and handler functions"}),`
`]}),`
`,n.jsx(e.h3,{id:"5-styling",children:"5. Styling"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Add component-specific SCSS in ",n.jsx(e.code,{children:"src/styles/06-components/_components.[component-name].scss"})]}),`
`,n.jsxs(e.li,{children:["Define component variables in ",n.jsx(e.code,{children:"src/styles/01-settings/_settings.[component-name].scss"})]}),`
`,n.jsx(e.li,{children:"Use CSS custom properties with the established prefix pattern"}),`
`,n.jsx(e.li,{children:"Follow the ITCSS (Inverted Triangle CSS) architecture"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`// settings.[component-name].scss example
$component-size: 32px !default;
$component-size-sm: 16px !default;
$component-size-lg: 48px !default;
$component-color: var(--#{$prefix}primary) !default;
$component-spacing: 8px !default;

// components.[component-name].scss example
.c-component {
  $root: &;

  // CSS Variables
  --#{config.$prefix}component-size: #{$component-size};
  --#{config.$prefix}component-color: #{$component-color};
  --#{config.$prefix}component-spacing: #{rem($component-spacing)};

  // Component styles
  display: flex;
  gap: var(--#{config.$prefix}component-spacing);
}
`})}),`
`,n.jsx(e.h2,{id:"implementation-guidelines",children:"Implementation Guidelines"}),`
`,n.jsx(e.h2,{id:"constants--configuration",children:"Constants & Configuration"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Component Constants"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Add component-specific constants in ",n.jsx(e.code,{children:"src/lib/constants/components.ts"})]}),`
`,n.jsx(e.li,{children:"Define selectors, classes, and default values"}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Component Configuration in src/lib"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Types Definition"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Add component props interface in ",n.jsx(e.code,{children:"src/lib/types/components.ts"})]}),`
`,n.jsx(e.li,{children:"Define all possible component variants, states, and event handlers"}),`
`,n.jsx(e.li,{children:"Use descriptive JSDoc comments for each prop"}),`
`,n.jsx(e.li,{children:"Example:"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`export interface RatingProps {
  /**
   * The rating value (0-5)
   */
  value: number;

  /**
   * Maximum possible rating value
   */
  maxValue?: number;

  /**
   * Whether to allow half-star ratings
   */
  allowHalf?: boolean;

  /**
   * Callback when rating changes
   */
  onChange?: (value: number) => void;
}
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Composable Hooks"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Create a dedicated hook in ",n.jsx(e.code,{children:"src/lib/composables/use[ComponentName].ts"})]}),`
`,n.jsx(e.li,{children:"Extract component logic for reusability and state management"}),`
`,n.jsx(e.li,{children:"Implement both controlled and uncontrolled state handling"}),`
`,n.jsx(e.li,{children:"Return all necessary state variables and handlers"}),`
`,n.jsx(e.li,{children:"Example:"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`export function useRating({
  value: initialValue = 0,
  maxValue = 5,
  allowHalf = false,
  onChange,
  readOnly = false,
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(initialValue);

  // Determine if component is controlled or uncontrolled
  const isControlled = typeof onChange !== 'undefined';
  const value = isControlled ? initialValue : internalValue;

  const handleRatingChange = (newValue: number) => {
    if (readOnly) return;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  return {
    value,
    handleRatingChange,
    maxValue,
    allowHalf,
    readOnly,
  };
}
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Constants Definition"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Define component-specific constants in ",n.jsx(e.code,{children:"src/lib/constants/components.ts"})]}),`
`,n.jsx(e.li,{children:"Group related constants in a named export object"}),`
`,n.jsx(e.li,{children:"Include selectors, class names, attributes, and default values"}),`
`,n.jsx(e.li,{children:"Example:"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`export const RATING = {
  SELECTORS: {
    RATING: '.c-rating',
    STAR: '.c-rating__star',
    STAR_FULL: '.c-rating__star-full',
    STAR_HALF: '.c-rating__star-half',
  },
  CLASSES: {
    FULL: 'c-rating__star--full',
    HALF: 'c-rating__star--half',
    SMALL: 'c-rating--sm',
    LARGE: 'c-rating--lg',
  },
  ATTRIBUTES: {
    READONLY: 'data-readonly',
    VALUE: 'data-value',
  },
};
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Utility Functions"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Create component-specific utility functions in ",n.jsx(e.code,{children:"src/lib/utils/"})," when needed"]}),`
`,n.jsx(e.li,{children:"Keep functions pure and focused on a single responsibility"}),`
`,n.jsx(e.li,{children:"Export functions individually for better tree-shaking"}),`
`,n.jsx(e.li,{children:"Example:"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// src/lib/utils/rating.ts
export function calculateRoundedRating(value: number, allowHalf: boolean): number {
  return allowHalf ? Math.floor(value * 2) / 2 : Math.round(value);
}
`})}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h3,{id:"react-component",children:"React Component"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Props Interface"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Define a clear props interface with JSDoc comments for each prop"}),`
`,n.jsx(e.li,{children:"Use sensible defaults for optional props in component destructuring"}),`
`,n.jsxs(e.li,{children:["Include callback props for state changes (e.g., ",n.jsx(e.code,{children:"onOpenChange"}),", ",n.jsx(e.code,{children:"onChange"}),")"]}),`
`,n.jsxs(e.li,{children:["Extend from ",n.jsx(e.code,{children:"BaseComponentProps"})," for common props like ",n.jsx(e.code,{children:"className"})]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`export interface ButtonProps extends BaseComponentProps {
  /**
   * Button label text
   */
  label: string;

  /**
   * Click handler function
   */
  onClick?: () => void;

  /**
   * Button visual style variant
   */
  variant?: Variant;

  // Additional props...
}
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Component Structure"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Use ",n.jsx(e.code,{children:"forwardRef"})," for components that need ref forwarding"]}),`
`,n.jsx(e.li,{children:"Destructure props with default values"}),`
`,n.jsx(e.li,{children:"Use composable hooks for logic and state management"}),`
`,n.jsx(e.li,{children:"Implement clear return statements with proper JSX structure"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  // Additional props with defaults...
}, ref) => {
  const { generateButtonClass, handleClick } = useButton({
    variant, size, disabled
  });

  // Component implementation...

  return (
    <button
      ref={ref}
      className={buttonClass}
      onClick={handleClick(onClick)}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {/* Component content */}
    </button>
  );
});
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Controlled & Uncontrolled Modes"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Support both controlled mode (parent manages state) and uncontrolled mode"}),`
`,n.jsx(e.li,{children:"For controlled mode: Use props for state and callbacks for changes"}),`
`,n.jsx(e.li,{children:"For uncontrolled mode: Manage state internally with useState"}),`
`,n.jsx(e.li,{children:"Determine mode based on whether state-changing callbacks are provided"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// In hook implementation
const isControlled = typeof onChange !== 'undefined';
const value = isControlled ? externalValue : internalValue;

const handleChange = newValue => {
  if (!isControlled) {
    setInternalValue(newValue);
  }

  if (onChange) {
    onChange(newValue);
  }
};
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Accessibility"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Include proper ARIA attributes (roles, states, properties)"}),`
`,n.jsx(e.li,{children:"Ensure keyboard navigation works (tab order, key handlers)"}),`
`,n.jsx(e.li,{children:"Support screen readers with descriptive labels and announcements"}),`
`,n.jsx(e.li,{children:"Follow WCAG guidelines for color contrast and focus states"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// Accessibility example
<button
  aria-expanded={isOpen}
  aria-controls={contentId}
  aria-label={ariaLabel || label}
  tabIndex={0}
  onKeyDown={handleKeyDown}
>
  {label}
</button>
`})}),`
`]}),`
`]}),`
`,n.jsx(e.h3,{id:"vanilla-js-implementation",children:"Vanilla JS Implementation"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Class Structure"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Create a main class with clear constructor, private methods, and public API"}),`
`,n.jsx(e.li,{children:"Accept both element reference and configuration options"}),`
`,n.jsx(e.li,{children:"Use TypeScript for better type safety and documentation"}),`
`,n.jsx(e.li,{children:"Implement initialization, event binding, and cleanup methods"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`export default class ComponentName {
  element: HTMLElement;
  options: any;
  private _state: any;

  constructor(element: HTMLElement, options: any = {}) {
    this.element = element;
    this.options = { ...defaults, ...options };
    this._initialize();
  }

  private _initialize(): void {
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
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Event Handling"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Use proper event delegation for better performance"}),`
`,n.jsx(e.li,{children:"Bind event handlers to class instance with proper context"}),`
`,n.jsx(e.li,{children:"Clean up all event listeners in destroy method"}),`
`,n.jsx(e.li,{children:"Implement custom events for component state changes"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`private _bindEvents(): void {
  this._handleClick = this._handleClick.bind(this);
  this.element.addEventListener('click', this._handleClick);
}

private _handleClick(event: MouseEvent): void {
  // Event handling logic
}

public destroy(): void {
  this.element.removeEventListener('click', this._handleClick);
  // Clean up other resources
}
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"State Management"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Maintain internal state with proper getters and setters"}),`
`,n.jsx(e.li,{children:"Implement state change methods that update DOM accordingly"}),`
`,n.jsx(e.li,{children:"Support external state updates through public API"}),`
`,n.jsx(e.li,{children:"Dispatch custom events when state changes"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`private _setState(newState: Partial<State>): void {
  this._state = { ...this._state, ...newState };
  this._render();

  // Dispatch custom event
  const event = new CustomEvent('componentname:change', {
    detail: { state: this._state }
  });
  this.element.dispatchEvent(event);
}
`})}),`
`]}),`
`]}),`
`,n.jsx(e.h2,{id:"styling-architecture",children:"Styling Architecture"}),`
`,n.jsx(e.p,{children:"The Atomix design system follows the ITCSS (Inverted Triangle CSS) architecture, organizing styles in layers of increasing specificity:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`src/styles/
├── 01-settings/     # Variables, config
├── 02-tools/        # Mixins, functions
├── 03-generic/      # Reset, normalize
├── 04-elements/     # Bare HTML elements
├── 05-objects/      # Layout patterns
├── 06-components/   # UI components
└── 99-utilities/    # Helper classes
`})}),`
`,n.jsx(e.h3,{id:"1-settings-layer",children:"1. Settings Layer"}),`
`,n.jsxs(e.p,{children:["Each component should have its own settings file in ",n.jsx(e.code,{children:"01-settings/"})," that defines all variables used by the component:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`// _settings.component-name.scss
@use 'settings.config' as config;

// Define all component variables with !default flag for overriding
$component-size: 32px !default;
$component-size-sm: 16px !default;
$component-size-lg: 48px !default;
$component-color: var(--#{config.$prefix}primary) !default;
$component-bg: transparent !default;
$component-border-width: 1px !default;
$component-border-radius: var(--#{config.$prefix}border-radius) !default;
$component-spacing: 8px !default;
$component-transition: all 0.2s ease-in-out !default;

// Define dark mode variables if needed
$component-color-dark: var(--#{config.$prefix}primary-dark) !default;
$component-bg-dark: var(--#{config.$prefix}gray-9) !default;
`})}),`
`,n.jsx(e.h3,{id:"2-component-styling",children:"2. Component Styling"}),`
`,n.jsxs(e.p,{children:["Component styles should be defined in ",n.jsx(e.code,{children:"06-components/"})," following these guidelines:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`// _components.component-name.scss
@use '../01-settings/settings.config' as config;
@use '../01-settings/settings.component-name' as component;
@use '../01-settings/settings.colors' as *;
@use '../02-tools/tools.rem' as rem;
@use '../02-tools/tools.grid' as *;

.c-component {
  $root: &; // Store reference to component root for nesting

  // 1. CSS Custom Properties
  // Define all component-specific CSS variables
  --#{config.$prefix}component-size: #{component.$component-size};
  --#{config.$prefix}component-color: #{component.$component-color};
  --#{config.$prefix}component-bg: #{component.$component-bg};
  --#{config.$prefix}component-border-width: #{component.$component-border-width};
  --#{config.$prefix}component-border-radius: #{component.$component-border-radius};
  --#{config.$prefix}component-spacing: #{rem.rem(component.$component-spacing)};

  // 2. Base Component Styles
  display: flex;
  align-items: center;
  gap: var(--#{config.$prefix}component-spacing);
  color: var(--#{config.$prefix}component-color);
  background-color: var(--#{config.$prefix}component-bg);
  border: var(--#{config.$prefix}component-border-width) solid;
  border-radius: var(--#{config.$prefix}component-border-radius);
  transition: component.$component-transition;

  // 3. Element Styles (BEM Elements)
  &__element {
    // Element-specific styles
  }

  // 4. Modifier Styles (BEM Modifiers)
  &--modifier {
    // Modifier-specific styles
  }

  // 5. State Classes
  &.is-active {
    // Active state styles
  }

  &.has-icon {
    // Styles when component has an icon
  }

  // 6. Theme Variants
  @each $color, $value in $theme-colors {
    &--#{$color} {
      --#{config.$prefix}component-color: #{$value};
    }
  }

  // 7. Size Variants
  &--sm {
    --#{config.$prefix}component-size: #{component.$component-size-sm};
  }

  &--lg {
    --#{config.$prefix}component-size: #{component.$component-size-lg};
  }

  // 8. Responsive Styles
  @include media-breakpoint-up(md) {
    // Medium screen adjustments
  }

  @include media-breakpoint-up(lg) {
    // Large screen adjustments
  }

  // 9. Dark Mode Support
  .dark-mode & {
    --#{config.$prefix}component-color: #{component.$component-color-dark};
    --#{config.$prefix}component-bg: #{component.$component-bg-dark};
  }

  // 10. Accessibility Considerations
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
`})}),`
`,n.jsx(e.h2,{id:"styling-best-practices",children:"Styling Best Practices"}),`
`,n.jsx(e.h3,{id:"1-bem-methodology",children:"1. BEM Methodology"}),`
`,n.jsx(e.p,{children:"Follow Block-Element-Modifier naming convention for component classes:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`.c-component {
} // Block (with 'c-' prefix for component)
.c-component__element {
} // Element (double underscore)
.c-component--modifier {
} // Modifier (double dash)
`})}),`
`,n.jsx(e.p,{children:"Use state classes with appropriate prefixes:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`.c-component.is-active {
} // State class for active state
.c-component.has-icon {
} // Feature class for components with icons
`})}),`
`,n.jsx(e.h3,{id:"2-css-custom-properties",children:"2. CSS Custom Properties"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Define component-specific variables at the top of the component stylesheet"}),`
`,n.jsxs(e.li,{children:["Use the established prefix pattern: ",n.jsx(e.code,{children:"--#{$prefix}component-name-property"})]}),`
`,n.jsx(e.li,{children:"Reference SCSS variables from settings files as default values"}),`
`,n.jsx(e.li,{children:"Group related variables together for better organization"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`.c-component {
  // Primary variables
  --#{config.$prefix}component-color: #{$component-color};
  --#{config.$prefix}component-bg: #{$component-bg};

  // Size variables
  --#{config.$prefix}component-padding-x: #{rem.rem($component-padding-x)};
  --#{config.$prefix}component-padding-y: #{rem.rem($component-padding-y)};

  // Animation variables
  --#{config.$prefix}component-transition-duration: 0.2s;
  --#{config.$prefix}component-transition-easing: ease-in-out;
}
`})}),`
`,n.jsx(e.h3,{id:"3-responsive-design",children:"3. Responsive Design"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Use mobile-first approach with min-width media queries"}),`
`,n.jsx(e.li,{children:"Utilize the grid mixins and breakpoint functions consistently"}),`
`,n.jsx(e.li,{children:"Group responsive adjustments by component or element"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`.c-component {
  padding: rem.rem(16px);
  font-size: rem.rem(14px);

  @include media-breakpoint-up(md) {
    padding: rem.rem(24px);
    font-size: rem.rem(16px);
  }
}
`})}),`
`,n.jsx(e.h3,{id:"4-theme-support",children:"4. Theme Support"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Support both light and dark themes with appropriate color variables"}),`
`,n.jsx(e.li,{children:"Use CSS custom properties for theme-specific values"}),`
`,n.jsx(e.li,{children:"Define dark mode variables in settings files"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`// In settings file
$component-bg: $white !default;
$component-bg-dark: $gray-900 !default;

// In component file
.c-component {
  --#{config.$prefix}component-bg: #{$component-bg};
  background-color: var(--#{config.$prefix}component-bg);

  .dark-mode & {
    --#{config.$prefix}component-bg: #{$component-bg-dark};
  }
}
`})}),`
`,n.jsx(e.h3,{id:"5-performance-optimization",children:"5. Performance Optimization"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Use hardware-accelerated properties for animations (transform, opacity)"}),`
`,n.jsx(e.li,{children:"Minimize repaints and reflows by animating composite properties"}),`
`,n.jsx(e.li,{children:"Support reduced motion preferences for accessibility"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`.c-component {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &.is-entering {
    opacity: 0;
    transform: translateY(10px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
`})}),`
`,n.jsx(e.h3,{id:"6-utility-functions-and-mixins",children:"6. Utility Functions and Mixins"}),`
`,n.jsxs(e.p,{children:["Leverage the tools provided in the ",n.jsx(e.code,{children:"02-tools/"})," directory:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`// Using rem function for consistent sizing
padding: rem.rem(16px);

// Using media query mixins for responsive design
@include media-breakpoint-up(md) {
}

// Using color functions
@include color-mode-dark {
}

// Using spacing utilities
@include margin-x(auto);
`})}),`
`,n.jsx(e.h2,{id:"color-system--utilities",children:"Color System & Utilities"}),`
`,n.jsxs(e.p,{children:["The Atomix design system includes a comprehensive color system defined in ",n.jsx(e.code,{children:"src/styles/01-settings/_settings.colors.scss"}),". Understanding this system is essential for creating components that align with the design language."]}),`
`,n.jsx(e.h3,{id:"color-palette",children:"Color Palette"}),`
`,n.jsx(e.p,{children:"The color system is organized into several categories:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Primary Colors"}),": The main brand colors used throughout the interface"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`$primary-1: #f2e8fd !default; // Lightest
$primary-2: #e4d0fa !default;
$primary-3: #d0b2f5 !default;
$primary-4: #b88cef !default;
$primary-5: #9c63e9 !default;
$primary-6: #7c3aed !default; // Base primary purple
$primary-7: #6425ca !default;
$primary-8: #501ba6 !default;
$primary-9: #3c1583 !default;
$primary-10: #2a0e60 !default; // Darkest
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Semantic Colors"}),": Colors that convey specific meanings"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`// Success (Green)
$success: $green-6 !default;

// Warning (Yellow)
$warning: $yellow-6 !default;

// Danger (Red)
$danger: $red-6 !default;

// Info (Blue)
$info: $blue-6 !default;
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Neutral Colors"}),": Grayscale colors for text, backgrounds, and borders"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`$gray-1: #f9fafb !default; // Lightest
$gray-2: #f3f4f6 !default;
$gray-3: #e5e7eb !default;
$gray-4: #d1d5db !default;
$gray-5: #9ca3af !default;
$gray-6: #6b7280 !default;
$gray-7: #4b5563 !default;
$gray-8: #374151 !default;
$gray-9: #1f2937 !default;
$gray-10: #111827 !default; // Darkest
`})}),`
`]}),`
`]}),`
`,n.jsx(e.h3,{id:"using-colors-in-components",children:"Using Colors in Components"}),`
`,n.jsx(e.p,{children:"When creating components, reference the color system using CSS custom properties:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`.c-component {
  // Use theme colors
  color: var(--#{config.$prefix}primary);
  background-color: var(--#{config.$prefix}gray-1);
  border-color: var(--#{config.$prefix}gray-3);

  // Use semantic colors
  &--success {
    color: var(--#{config.$prefix}success);
  }

  &--danger {
    color: var(--#{config.$prefix}danger);
  }
}
`})}),`
`,n.jsx(e.h3,{id:"dark-mode-support",children:"Dark Mode Support"}),`
`,n.jsx(e.p,{children:"The color system includes dark mode variants for all colors. Use these variables when implementing dark mode support:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`.c-component {
  color: var(--#{config.$prefix}body-color);
  background-color: var(--#{config.$prefix}body-bg);
  border-color: var(--#{config.$prefix}border-color);

  // These variables automatically switch in dark mode
  // when the .dark-mode class is applied to the body
}
`})}),`
`,n.jsx(e.h3,{id:"color-utility-functions",children:"Color Utility Functions"}),`
`,n.jsx(e.p,{children:"The Atomix system provides several utility functions for working with colors:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`// Convert color to RGB format for use in rgba() functions
@use '../02-tools/tools.to-rgb' as *;
background-color: rgba(to-rgb($primary), 0.5);

// Lighten or darken colors
@use '../02-tools/tools.color-functions' as *;
$lighter-color: tint-color($primary, 20%);
$darker-color: shade-color($primary, 20%);
`})}),`
`,n.jsx(e.h2,{id:"testing--documentation",children:"Testing & Documentation"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Storybook Stories"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Create comprehensive stories for all variants"}),`
`,n.jsx(e.li,{children:"Add proper documentation with usage examples"}),`
`,n.jsx(e.li,{children:"Test edge cases and different prop combinations"}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Example Usage"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Provide clear examples of how to use the component in different scenarios"}),`
`,n.jsx(e.li,{children:"Include screenshots and code snippets"}),`
`,n.jsx(e.li,{children:"Document all available options and APIs"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h2,{id:"implementation-example-edgepanel",children:"Implementation Example (EdgePanel)"}),`
`,n.jsx(e.h3,{id:"react-component-1",children:"React Component"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Basic structure of React component
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
`})}),`
`,n.jsx(e.h3,{id:"vanilla-js-implementation-1",children:"Vanilla JS Implementation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`// Basic structure of vanilla JS class
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
`})}),`
`,n.jsx(e.h2,{id:"accessibility-checklist",children:"Accessibility Checklist"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"[ ] Keyboard navigation support"}),`
`,n.jsx(e.li,{children:"[ ] Proper focus management"}),`
`,n.jsx(e.li,{children:"[ ] ARIA roles and attributes"}),`
`,n.jsx(e.li,{children:"[ ] Color contrast compliance"}),`
`,n.jsx(e.li,{children:"[ ] Screen reader compatibility"}),`
`]}),`
`,n.jsx(e.h2,{id:"performance-considerations",children:"Performance Considerations"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Minimize DOM operations"}),`
`,n.jsx(e.li,{children:"Use efficient event handling"}),`
`,n.jsx(e.li,{children:"Clean up resources when components are destroyed"}),`
`,n.jsx(e.li,{children:"Implement lazy initialization where appropriate"}),`
`]}),`
`,n.jsx(e.p,{children:"By following these guidelines, you'll create components that integrate seamlessly with the Atomix design system and provide a consistent, high-quality user experience."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{})})]})}function c(i={}){const{wrapper:e}={...t(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}export{c as default};
