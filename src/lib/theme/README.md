# Theme System File Organization

## Directory Structure

The theme system is organized following senior developer best practices with clear separation of concerns and logical grouping:

```
theme/
├── index.ts                    # Main public API exports
├── README.md                   # This file
│
├── core/                       # Core theme engine
│   ├── index.ts
│   ├── createTheme.ts          # Main createTheme function (unified)
│   ├── createThemeObject.ts    # Theme object creation
│   ├── composeTheme.ts          # Theme composition and merging
│   └── ThemeRegistry.ts        # Theme registration and discovery
│
├── adapters/                   # Adapters and converters
│   ├── index.ts
│   ├── themeAdapter.ts         # Theme ↔ DesignTokens conversion
│   └── cssVariableMapper.ts    # CSS variable mapping utilities
│
├── generators/                 # Code generation
│   ├── index.ts
│   ├── generateCSS.ts          # CSS variable generation (simple)
│   ├── generateCSSVariables.ts # CSS variable generation (advanced)
│   └── cssFile.ts             # File operations (save CSS to disk)
│
├── runtime/                    # React runtime components
│   ├── index.ts
│   ├── ThemeProvider.tsx       # Main theme provider component
│   ├── ThemeApplicator.ts      # Theme application logic
│   ├── ThemeErrorBoundary.tsx  # Error boundary for themes
│   ├── ThemeContext.tsx        # React context for theme management
│   └── useTheme.ts            # React hook for theme access
│
├── config/                     # Configuration
│   ├── index.ts
│   ├── loader.ts               # Config file loader
│   ├── configLoader.ts         # Config loading from atomix.config.ts
│   ├── types.ts                # Config type definitions
│   └── validator.ts            # Config validation
│
├── utils/                      # Utilities
│   ├── index.ts
│   ├── themeHelpers.ts         # Type guards and DesignTokens utilities
│   ├── themeUtils.ts           # Theme value manipulation (colors, spacing)
│   ├── domUtils.ts             # DOM/browser utilities
│   └── injectCSS.ts            # CSS injection utilities
│
├── tokens/                     # Design tokens
│   ├── index.ts
│   └── tokens.ts               # Design tokens definitions
│
├── constants/                  # Constants
│   ├── index.ts
│   └── constants.ts            # System constants and default values
│
├── errors/                     # Error handling
│   ├── index.ts
│   └── errors.ts               # Error classes and error handling
│
├── devtools/                   # Development tools
│   ├── index.ts
│   ├── CLI.ts                  # Command-line interface
│   ├── Comparator.tsx          # Theme comparison
│   ├── Inspector.tsx           # Theme inspector
│   ├── LiveEditor.tsx          # Live theme editor
│   ├── Preview.tsx             # Theme preview
│   ├── ThemeValidator.tsx      # Theme validation component
│   └── README.md               # DevTools documentation
│
├── i18n/                       # Internationalization
│   ├── index.ts
│   └── rtl.ts                  # Right-to-left language support
│
└── types.ts                    # TypeScript type definitions (root level)
```

## Naming Conventions

### Files and Directories

1. **React Components**: Always use PascalCase (e.g., `ThemeProvider.tsx`)
2. **Feature Modules**: Use camelCase with descriptive names (e.g., `themeAdapter.ts`)
3. **Base Utilities**: Use lowercase for foundational utilities (e.g., `domUtils.ts`, `types.ts`)
4. **Directories**: Use lowercase, plural for collections (e.g., `utils/`, `adapters/`)
5. **Index Files**: Each subdirectory has an `index.ts` for clean exports

### Import Patterns

```typescript
// ✅ CORRECT - Import from organized directories
import { createTheme } from './core';
import { themeToDesignTokens } from './adapters';
import { generateCSSVariables } from './generators';
import { isDesignTokens } from './utils/themeHelpers';

// ❌ INCORRECT - Direct imports from root (old structure)
import { createTheme } from './core';
import { themeToDesignTokens } from './themeAdapter';
```

## File Organization Principles

1. **Separation of Concerns**: Each directory has a single, well-defined responsibility
2. **Logical Grouping**: Related functionality is grouped together
3. **Clear Entry Points**: Each directory has an `index.ts` for clean exports
4. **Consistent Naming**: Follow established naming conventions throughout
5. **Maintainability**: Structure makes it easy to find and modify code

## Directory Responsibilities

### `/core` - Core Theme Engine
- Theme creation and composition
- Theme registry and discovery
- Core theme logic

### `/adapters` - Adapters and Converters
- Convert between Theme objects and DesignTokens
- CSS variable mapping utilities
- Format transformations

### `/generators` - Code Generation
- CSS variable generation
- File operations (save CSS to disk)
- Code generation utilities

### `/runtime` - React Runtime
- React components (ThemeProvider, ThemeErrorBoundary)
- React hooks (useTheme)
- Theme application logic
- React context

### `/config` - Configuration
- Config file loading
- Config validation
- Configuration types

### `/utils` - Utilities
- Theme helpers and type guards
- Theme value manipulation
- DOM/browser utilities
- CSS injection

### `/tokens` - Design Tokens
- Design token definitions
- Token creation utilities

### `/constants` - Constants
- System constants
- Default values

### `/errors` - Error Handling
- Error classes
- Error handling utilities

### `/devtools` - Development Tools
- Development and debugging tools
- Theme inspection and validation
- Live editing capabilities

### `/i18n` - Internationalization
- RTL (Right-to-Left) support
- Internationalization utilities

## Best Practices

1. **Always use index files**: Import from directory index files when possible
2. **Group related functionality**: Keep related code together
3. **Maintain clear boundaries**: Don't mix concerns between directories
4. **Follow naming conventions**: Consistency is key
5. **Document changes**: Update this README when structure changes
