# Templates Directory

This directory contains modular templates for the Atomix CLI. The templates have been split into separate files for better maintainability and organization.

## File Structure

```
templates/
├── README.md                 # This documentation file
├── index.js                 # Main export file that aggregates all templates
├── react-templates.js       # React component templates (simple, medium, complex)
├── storybook-templates.js   # Storybook story templates
├── testing-templates.js     # Vitest testing templates
├── scss-templates.js       # SCSS styling templates
├── types-templates.js      # TypeScript definition templates
├── composable-templates.js # Custom hook templates
├── token-templates.js      # Design system token generation functions
├── project-templates.js    # Project scaffolding templates
└── config-templates.js     # Configuration file templates
```

## Template Categories

### React Templates (`react-templates.js`)
- **simple**: Basic presentational components with minimal state
- **medium**: Components with state management and interactions  
- **complex**: Advanced components with validation and accessibility
- **component**: Default template (backward compatibility)

### Storybook Templates (`storybook-templates.js`)
- **story**: Basic Storybook story with essential controls
- **storyEnhanced**: Enhanced story with detailed documentation and examples

### Testing Templates (`testing-templates.js`)
- **test**: Vitest test template for React components

### SCSS Templates (`scss-templates.js`)
- **scss**: Main SCSS component styles with CSS custom properties
- **scssSettings**: SCSS settings file with component-specific variables
- **scssModule**: Empty (CSS modules are not used by default)

### TypeScript Templates (`types-templates.js`)
- **types**: TypeScript interface definitions for component props
- **constants**: Component constants and selectors
- **index**: Index file for component exports

### Composable Templates (`composable-templates.js`)
- **hook**: Custom React hook template with state management and accessibility

### Token Templates (`token-templates.js`)
Design system token generation functions:
- **generateColorTokens**: Color palette tokens
- **generateSpacingTokens**: Spacing scale tokens
- **generateTypographyTokens**: Typography scale tokens
- **generateShadowTokens**: Box shadow tokens
- **generateRadiusTokens**: Border radius tokens
- **generateAnimationTokens**: Animation and transition tokens

### Project Templates (`project-templates.js`)
- **react**: React + Vite project setup
- **nextjs**: Next.js project setup
- **vanilla**: Vanilla TypeScript project setup

### Config Templates (`config-templates.js`)
- **basic**: Simple JSON configuration
- **advanced**: Advanced JavaScript configuration with all options

## Usage

Templates are imported through the main `index.js` file, which maintains backward compatibility with the original `templates.js` structure.

```javascript
import templates from './templates/index.js';

// Access React templates
const simpleTemplate = templates.componentTemplates.react.simple('MyComponent');

// Access token generators
const colorTokens = templates.generateColorTokens();

// Access project templates
const reactProject = templates.projectTemplates.react;
```

## Migration from Single File

The original `templates.js` file has been split for better maintainability:

1. **Backup**: Original file saved as `templates-original-backup.js`
2. **New structure**: Templates organized by category in separate files
3. **Compatibility**: All existing imports continue to work through `index.js`
4. **Benefits**: 
   - Easier to locate and edit specific templates
   - Reduced file size for better editor performance
   - Clear separation of concerns
   - Better testability of individual template modules

## Adding New Templates

1. Choose the appropriate category file or create a new one
2. Add your template function following the existing pattern
3. Export it in the category's export object
4. Update `index.js` if you created a new category

Example of adding a new React template:

```javascript
// In react-templates.js
export const customTemplate = (name) => `// Your custom template code`;

// Update the export object
export const reactTemplates = {
  simple: simpleTemplate,
  medium: mediumTemplate,
  complex: complexTemplate,
  component: defaultTemplate,
  custom: customTemplate, // New template
};
```

## Backward Compatibility

The modular structure maintains 100% backward compatibility. All existing imports and usage patterns continue to work exactly as before. The main `templates.js` file now imports from the modular structure, ensuring no breaking changes.