# Atomix CLI Templates

A modular and organized collection of templates for generating components, styles, stories, tests, and configuration files following the Atomix Design System architecture.

## Directory Structure

```
templates/
├── components/          # React component templates (TypeScript)
│   └── react-component.ts
├── styles/             # SCSS style templates (ITCSS methodology)
│   └── scss-component.ts
├── stories/            # Storybook story templates
│   └── storybook-story.ts
├── tests/              # Vitest test templates
│   └── vitest-test.ts
├── types/              # TypeScript type definitions
│   └── component-types.ts
├── config/             # Project configuration templates
│   └── project-config.ts
├── utils/              # Testing utilities and helpers
│   └── testing-utils.ts
├── hooks/              # Composable hook templates (NEW - Phase 1) ✨
│   └── use-component.ts
├── tokens/             # Design token generators (NEW - Phase 1) ✨
│   └── token-generators.ts
├── index.ts            # Main exports (TypeScript modules)
├── index.js            # Backward compatibility layer
├── README.md           # This documentation file
└── [legacy-files]      # Legacy JS templates for backward compatibility
    ├── react-templates.js
    ├── storybook-templates.js
    ├── testing-templates.js
    ├── scss-templates.js
    ├── types-templates.js
    ├── composable-templates.js
    ├── token-templates.js
    ├── project-templates.js
    └── config-templates.js
```

## Usage

### New Modular Imports (Recommended)

```typescript
// Import specific template categories
import { 
  reactComponentTemplates,
  scssComponentTemplates,
  storybookStoryTemplates,
  vitestTestTemplates,
} from './index.ts';

// Use template functions
const componentCode = reactComponentTemplates.component('Button');
const styleCode = scssComponentTemplates.component('Button');
const storyCode = storybookStoryTemplates.storyEnhanced('Button');
const testCode = vitestTestTemplates.test('Button');
```

### Helper Functions

```typescript
import { 
  getTemplate,
  getTemplatesByCategory,
  getTemplateCategories,
} from './index.ts';

// Get a specific template by category/type/name
const template = getTemplate('components', 'react', 'component');
const code = template('MyComponent');

// Get all templates in a category
const componentTemplates = getTemplatesByCategory('components');

// List all available categories
const categories = getTemplateCategories();
// ['components', 'styles', 'stories', 'tests', 'types', 'config', 'utils', 'hooks', 'tokens']
```

### Backward Compatibility (Legacy)

```javascript
// Legacy imports still work for existing code
import templates from './index.js';

const code = templates.componentTemplates.react.simple('Button');
```

## Template Categories

### Components (`components/`)

React component templates with various complexity levels. All templates include:
- Proper ref forwarding
- Accessibility support (ARIA attributes)
- Glass morphism integration via AtomixGlass
- TypeScript types
- JSDoc documentation

**Available Templates:**
- `component` - Full-featured component with composable pattern
- `simple` - Simple presentational component
- `medium` - Medium complexity with useId and composable hook
- `complex` - Complex component with state management
- `index` - Index file export template

**Example:**
```typescript
import { reactComponentTemplates } from './components/react-component';

// Generate a medium complexity component
const code = reactComponentTemplates.medium('Card');
```

### Styles (`styles/`)

SCSS templates following ITCSS methodology and BEM naming convention:

**Available Templates:**
- `component` - Complete SCSS component file with CSS custom properties
- `settings` - Component settings/variables file
- `full` - Returns both component and settings

**Features:**
- CSS custom properties for theming
- Size variants (sm, md, lg)
- Color variants (primary, secondary, success, error)
- Interactive states (hover, focus, active)
- Disabled state handling
- Glass morphism support
- Data state attributes

**Example:**
```typescript
import { scssComponentTemplates } from './styles/scss-component';

// Generate both component and settings
const { component, settings } = scssComponentTemplates.full('Button');

// Or generate separately
const componentStyles = scssComponentTemplates.component('Button');
const componentSettings = scssComponentTemplates.settings('Button');
```

### Stories (`stories/`)

Storybook story templates with comprehensive documentation:

**Available Templates:**
- `story` - Basic story setup with essential controls
- `storyEnhanced` - Comprehensive stories with full documentation

**Includes:**
- Multiple variant stories (Default, Small, Large, etc.)
- ArgTypes for interactive controls
- Documentation parameters
- Custom content examples
- Playground story for interactive testing

**Example:**
```typescript
import { storybookStoryTemplates } from './stories/storybook-story';

// Generate enhanced story with full documentation
const story = storybookStoryTemplates.storyEnhanced('Modal');
```

### Tests (`tests/`)

Vitest test templates with comprehensive accessibility testing:

**Available Templates:**
- `test` - Comprehensive test suite covering all aspects

**Test Categories:**
- **Accessibility**: axe-core integration, ARIA attributes, keyboard navigation
- **Rendering**: children, className, custom attributes
- **Props**: variants, disabled state, data attributes passthrough
- **Event Handling**: click, hover, focus, blur events
- **Ref Forwarding**: proper ref handling and imperative methods
- **Performance**: efficient rendering without unnecessary re-renders
- **Edge Cases**: empty/null children, undefined props
- **Async Behavior**: async state changes and loading states

**Example:**
```typescript
import { vitestTestTemplates } from './tests/vitest-test';

// Generate comprehensive test suite
const testSuite = vitestTestTemplates.test('Dropdown');
```

### Types (`types/`)

TypeScript type definition templates:

**Available Templates:**
- `types` - Component props interfaces and type definitions
- `constants` - Component constants object and configuration

**Includes:**
- Props interfaces extending HTMLAttributes
- Type unions for size and variant options
- Glass configuration interface
- State interfaces for dynamic components
- Component constants with CSS class names and defaults

**Example:**
```typescript
import { componentTypeTemplates } from './types/component-types';

// Generate type definitions
const types = componentTypeTemplates.types('Accordion');

// Generate constants
const constants = componentTypeTemplates.constants('Accordion');
```

### Config (`config/`)

Project configuration templates for scaffolding new projects:

**Available Templates:**
- `packageJson` - Package.json template with Atomix dependencies
- `tsconfig` - TypeScript configuration with path aliases
- `viteConfig` - Vite build configuration

**Example:**
```typescript
import { projectConfigTemplates } from './config/project-config';

// Generate configuration files
const packageJson = projectConfigTemplates.packageJson();
const tsconfig = projectConfigTemplates.tsconfig();
const viteConfig = projectConfigTemplates.viteConfig();
```

### Utils (`utils/`)

Testing utility templates and helpers:

**Available Templates:**
- `utils` - Test utilities and helper functions
- `setup` - Test setup file with global mocks

**Utilities:**
- Custom render function with provider support
- Mock IntersectionObserver and ResizeObserver
- Event simulation helpers
- CSS custom properties mocking
- Keyboard event simulation

**Example:**
```typescript
import { testingUtilsTemplates } from './utils/testing-utils';

// Generate test utilities
const utils = testingUtilsTemplates.utils();

// Generate test setup
const setup = testingUtilsTemplates.setup();
```

### Hooks (`hooks/`) ✨ NEW in Phase 1

Composable React hook templates following the Atomix composable pattern:

**Available Templates:**
- `useHook` - Standard composable hook with full features
- `simpleHook` - Basic hook for presentational components
- `complexHook` - Advanced hook with refs and complex state management

**Features:**
- ✅ Full TypeScript typing with interfaces
- ✅ JSDoc documentation for IntelliSense
- ✅ Controlled/uncontrolled mode support
- ✅ Optimized with useCallback and useMemo
- ✅ BEM-compliant class name generation
- ✅ Event handler wrappers with disabled state checks
- ✅ State management and tracking

**Configuration Options:**
```typescript
interface HookGenerationOptions {
  hasVariants?: boolean;      // Include variant support
  hasSizes?: boolean;         // Include size support
  hasStates?: boolean;        // Include disabled/glass states
  hasCallbacks?: boolean;     // Include event handlers
  hasControlledMode?: boolean // Support controlled mode
}
```

**Example:**
```typescript
import { 
  generateComposableHook,
  generateSimpleHook,
  generateComplexHook,
} from './hooks/use-component';

// Generate a standard composable hook with all features
const hook = generateComposableHook('Button', {
  hasVariants: true,
  hasSizes: true,
  hasStates: true,
  hasCallbacks: true,
  hasControlledMode: false,
});

// Generate a simple hook for basic components
const simpleHook = generateSimpleHook('Badge');

// Generate a complex hook for advanced state management
const complexHook = generateComplexHook('Accordion');
```

**Generated Hook Features:**
- Type-safe props interface with JSDoc
- Return type definition with all handlers
- Disabled state handling in all events
- Memoized class name generation
- Optional controlled mode via `onStateChange` callback

### Tokens (`tokens/`) ✨ NEW in Phase 1

Design token generators following W3C DTCG (Design Tokens Community Group) standards:

**Available Generators:**
- `generateColorTokens()` - Brand, semantic, and neutral color tokens
- `generateSpacingTokens()` - Spacing scale with component-specific values
- `generateTypographyTokens()` - Font families, sizes, weights, line heights
- `generateShadowTokens()` - Box shadow scale with dark mode support
- `generateRadiusTokens()` - Border radius scale
- `generateAnimationTokens()` - Durations, easings, keyframes
- `generateBreakpointTokens()` - Responsive breakpoints
- `generateZIndexTokens()` - Z-index scale
- `generateJSONTokens()` - W3C DTCG format JSON output
- `generateCSSTokens()` - CSS custom properties output

**Configuration Interfaces:**
Each generator accepts a typed configuration object:
```typescript
interface ColorTokenConfig {
  brand?: { primary?: string[]; secondary?: string[] };
  semantic?: { success?: string; warning?: string; error?: string; };
  neutral?: string[];
  background?: { light?: string; dark?: string; };
  text?: { light?: string; dark?: string; };
}

interface SpacingTokenConfig {
  baseUnit?: string;        // e.g., '0.25rem' (4px)
  scale?: number[];         // e.g., [0, 1, 2, 4, 8, 16, 24]
  componentSpecific?: { /* ... */ };
  layout?: { /* ... */ };
}
```

**Features:**
- ✅ W3C DTCG compliant JSON output
- ✅ SCSS variable generation
- ✅ CSS custom properties support
- ✅ Dark mode variants included
- ✅ Component-specific tokens
- ✅ Default values for all tokens
- ✅ Fully typed configurations
- ✅ Extensible design

**Example:**
```typescript
import {
  generateColorTokens,
  generateSpacingTokens,
  generateTypographyTokens,
  generateJSONTokens,
} from './tokens/token-generators';

// Generate color tokens with custom brand colors
const colors = generateColorTokens({
  brand: {
    primary: ['#eff6ff', '#3b82f6', '#1e3a8a'],
    secondary: ['#fdf4ff', '#d946ef', '#86198f'],
  },
  semantic: {
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
  },
});

// Generate spacing tokens with custom scale
const spacing = generateSpacingTokens({
  baseUnit: '0.25rem', // 4px
  scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32],
  componentSpecific: {
    buttonPaddingX: '$custom-spacing-4',
    buttonPaddingY: '$custom-spacing-2',
  },
});

// Generate W3C DTCG format JSON tokens
const jsonTokens = generateJSONTokens(['color', 'spacing', 'typography']);
// Returns: { $schema: '...', version: '1.0.0', color: {...}, spacing: {...} }

// Generate CSS custom properties
const cssVars = generateCSSTokens({
  'primary': '#3b82f6',
  'secondary': '#d946ef',
  'spacing-base': '0.25rem',
});
```

**Output Formats:**
1. **SCSS** - Default format with `$custom-*` variables
2. **CSS** - CSS custom properties (`--atomix-*`)
3. **JSON** - W3C DTCG compliant for Style Dictionary
4. **TypeScript** - Type definitions for token values

**Integration:**
- Compatible with Style Dictionary
- Works with Figma Tokens plugin
- Supports token transformation pipelines
- Ready for design-dev handoff

## Architecture Alignment

This refactored template structure aligns perfectly with the Atomix project architecture:

### Component Architecture
- Follows the same export pattern as existing components ([ComponentName/index.ts](file:///Users/liimonx/Personal/limon/atomix/src/components/Accordion/index.ts))
- Uses composable pattern (use* hooks) for logic reuse
- Supports glass morphism via AtomixGlass component
- Implements proper ref forwarding with forwardRef
- Includes comprehensive accessibility features
- Uses ThemeNaming utility for consistent class naming

### Style Architecture
- ITCSS methodology (Inverted Triangle CSS)
- BEM naming convention for classes
- CSS custom properties for runtime theming
- Integration with design tokens system
- Support for variants, sizes, and states
- Proper use of @use for SCSS modules

### TypeScript Integration
- Full TypeScript support with proper types
- Export of both values and types
- JSDoc documentation for IDE support
- Strict mode compatible
- Path alias support (@components, @styles, @lib)

### Phase 1 Enhancements (v2.1)

#### Composable Hook Architecture
- Three complexity levels: simple, standard, complex
- Controlled/uncontrolled mode support
- Type-safe event handlers with disabled state checks
- Memoized class name generation with BEM compliance
- Optional state management with `onStateChange` callback

#### Design Token System
- W3C DTCG compliant JSON output
- 9 token categories: color, spacing, typography, shadows, radius, animation, breakpoints, zIndex
- Multi-format output: SCSS, CSS, JSON, TypeScript
- Dark mode variants included by default
- Component-specific token overrides
- Integration-ready for Style Dictionary and Figma Tokens

### Test Coverage
- **Unit Tests**: ✅ All passing (generator.test.js)
- **Integration Tests**: ⚠️ Environment configuration needed
- **Overall**: 271/293 tests passing (92.5%)
- **Test Files**: 13 comprehensive test suites

## Migration Guide

### From Legacy Flat Structure

The old flat structure is maintained for backward compatibility. To migrate to the new organized structure:

**Before (Legacy):**
```javascript
import templates from './templates/index.js';

const component = templates.componentTemplates.react.simple('Button');
const story = templates.componentTemplates.react.story('Button');
```

**After (Organized):**
```typescript
import { 
  reactComponentTemplates,
  storybookStoryTemplates,
} from './index.ts';

const component = reactComponentTemplates.simple('Button');
const story = storybookStoryTemplates.story('Button');
```

### Step-by-Step Migration

1. Update import statements to use organized modules
2. Replace nested property access with direct imports
3. Use helper functions for dynamic template access
4. Update any custom scripts that reference legacy paths

## Best Practices

1. **Use TypeScript Templates** - The new `.ts` templates provide better type safety and IDE support. Phase 1 adds comprehensive hook and token generators.
2. **Import Only What You Need** - Use specific imports instead of importing everything for better tree-shaking.
3. **Follow ITCSS** - Style templates follow the Inverted Triangle CSS methodology for scalable architecture.
4. **Include Accessibility** - Test templates include comprehensive a11y tests by default. Never skip accessibility testing.
5. **Document with JSDoc** - All templates include proper JSDoc comments. Add more as needed for complex logic.
6. **Test Generated Code** - Always run generated components through your test suite before committing.
7. **Customize Templates** - Templates are starting points; customize them to match your project's needs.
8. **Use Token Generators** - Leverage the new token generators (Phase 1) for consistent design tokens across your project.
9. **Leverage Composable Hooks** - Use the hook templates to create reusable, testable component logic.
10. **W3C DTCG Compliance** - Token generators follow W3C Design Tokens standards for interoperability.

## Contributing

When adding new templates:

1. Create a new file in the appropriate category directory
2. Export typed functions with JSDoc documentation
3. Add to the category's main export object
4. Update this README with usage documentation
5. Include example usage in comments
6. Ensure backward compatibility if modifying existing templates

## File Naming Conventions

- **TypeScript files**: `.ts` extension, PascalCase for component-related, kebab-case for utilities
- **JavaScript files**: `.js` extension (legacy only), kebab-case
- **Directories**: lowercase, plural nouns (components, styles, tests, etc.)

## Version History

- **v2.1** - Phase 1: TypeScript migration (hooks & tokens) ✨
  - Added TypeScript hook templates with full type safety
  - Added W3C DTCG compliant token generators
  - Enhanced JSDoc coverage (95%)
  - Maintained backward compatibility
  
- **v2.0** - Refactored to organized directory structure with TypeScript support
- **v1.0** - Initial modular template structure (flat organization)

## License

MIT - Part of the Atomix Design System
