# Component Library TypeScript Functionality

This directory contains TypeScript functionality for component behaviors, interactions, and utilities.

## Directory Structure

```
src/
├── components/          # UI Components
│   ├── ComponentName/   # Individual component folders
│   │   ├── scripts/     # Component-specific scripts
│   │   │   ├── index.ts               # Exports all component functionality
│   │   │   └── componentInteractions.ts # Component-specific interactions
│   │   ├── ComponentName.tsx          # Component React implementation
│   │   └── ComponentName.stories.tsx  # Storybook stories
│   └── ...
│
├── lib/                 # Shared functionality
│   ├── composables/     # Reusable component logic hooks
│   │   ├── index.ts     # Export all composables
│   │   └── useComponent.ts # Component-specific composable
│   │
│   ├── utils/           # Utility functions
│   │   ├── index.ts     # Export all utilities
│   │   └── dom.ts       # DOM manipulation utilities
│   │
│   ├── types/           # TypeScript type definitions
│   │   ├── index.ts     # Export all types
│   │   └── components.ts # Component-related type definitions
│   │
│   └── constants/       # Constant values
│       ├── index.ts     # Export all constants
│       └── components.ts # Component-related constants
│
└── main.ts              # Entry point that initializes components
```

## Usage

### Composables

Composables are reusable pieces of component logic that can be shared across components.

```typescript
import { useAccordion } from '../lib/composables/useAccordion';

// In your component
const { generateAccordionClass, handleToggle } = useAccordion();
```

### Component Interactions

Component scripts handle direct DOM interactions:

```typescript
import { initializeButton } from './components/Button/scripts';

// Initialize a button element
const buttonElement = document.querySelector('.c-btn');
if (buttonElement) {
  initializeButton(buttonElement);
}
```

### Utilities

Utility functions provide common functionality:

```typescript
import { addClass, removeClass } from '../lib/utils/dom';

// Add a class to an element
addClass(element, 'is-active');
```

## Adding New Component Functionality

1. Create composables for reusable logic 
2. Add component-specific scripts in the component folder
3. Define types in the types folder
4. Update main.ts to initialize your component

## Best Practices

- Keep functionality modular and focused
- Follow the established folder structure
- Document functions with JSDoc comments
- Use TypeScript types for better code completion
- Export components through index files 