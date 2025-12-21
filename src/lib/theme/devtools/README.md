# Theme DevTools

Developer tools for theme management, debugging, and visualization in the Atomix Design System.

## Overview

The Theme DevTools provide a comprehensive suite of tools for working with themes during development:

- **CLI Tools** - Command-line interface for theme operations
- **Inspector** - Detailed theme inspection and validation
- **Preview** - Live theme preview with sample components
- **Comparator** - Side-by-side theme comparison
- **Live Editor** - Real-time theme editing with instant preview

---

## CLI Tools

### Installation

```bash
npm install @shohojdhara/atomix
```

### Usage

```bash
# Validate theme configuration
atomix-theme validate

# List all available themes
atomix-theme list

# Inspect a specific theme
atomix-theme inspect --theme my-theme

# Compare two themes
atomix-theme compare --theme1 light --theme2 dark

# Export theme to JSON
atomix-theme export --theme my-theme --output theme.json

# Show help
atomix-theme help
```

### Available Commands

| Command | Description | Options |
|---------|-------------|---------|
| `validate` | Validate theme configuration | `--config`, `--strict` |
| `list` | List all available themes | - |
| `inspect` | Inspect a specific theme | `--theme`, `--json` |
| `compare` | Compare two themes | `--theme1`, `--theme2` |
| `export` | Export theme to JSON | `--theme`, `--output` |
| `help` | Show help information | - |

---

## React Components

### ThemeInspector

Detailed inspection and debugging information for themes.

```tsx
import { ThemeInspector } from '@shohojdhara/atomix/theme/devtools';
import { createTheme } from '@shohojdhara/atomix/theme';

const theme = createTheme({ palette: { primary: { main: '#7AFFD7' } } });

function App() {
  return (
    <ThemeInspector
      theme={theme}
      showValidation={true}
      showCSSVariables={true}
      showStructure={true}
    />
  );
}
```

**Features:**
- Theme metadata and statistics
- Validation with error/warning reporting
- Accessibility issue detection
- CSS variable generation
- Theme structure visualization

**Props:**
- `theme` (required) - Theme to inspect
- `showValidation` (boolean) - Show validation results
- `showCSSVariables` (boolean) - Show generated CSS variables
- `showStructure` (boolean) - Show theme structure tree
- `className` (string) - Custom CSS class
- `style` (object) - Inline styles

### ThemePreview

Live preview of themes with sample components.

```tsx
import { ThemePreview } from '@shohojdhara/atomix/theme/devtools';

function App() {
  return (
    <ThemePreview
      theme={theme}
      showDetails={true}
      showPalette={true}
      showTypography={true}
      showSpacing={false}
    >
      {/* Custom components to preview */}
      <MyCustomComponent />
    </ThemePreview>
  );
}
```

**Features:**
- Theme details display
- Color palette visualization
- Typography samples
- Spacing scale visualization
- Sample component rendering
- Custom component preview

**Props:**
- `theme` (required) - Theme to preview
- `showDetails` (boolean) - Show theme metadata
- `showPalette` (boolean) - Show color palette
- `showTypography` (boolean) - Show typography samples
- `showSpacing` (boolean) - Show spacing scale
- `children` (ReactNode) - Custom components to render
- `className` (string) - Custom CSS class
- `style` (object) - Inline styles

### ThemeComparator

Side-by-side comparison of two themes.

```tsx
import { ThemeComparator } from '@shohojdhara/atomix/theme/devtools';

function App() {
  return (
    <ThemeComparator
      themeA={lightTheme}
      themeB={darkTheme}
      showOnlyDifferences={false}
    />
  );
}
```

**Features:**
- Side-by-side theme comparison
- Difference highlighting (added/removed/changed)
- Statistics dashboard
- Detailed value comparison
- Path-based difference tracking

**Props:**
- `themeA` (required) - First theme to compare
- `themeB` (required) - Second theme to compare
- `showOnlyDifferences` (boolean) - Show only differences
- `className` (string) - Custom CSS class
- `style` (object) - Inline styles

### ThemeLiveEditor

Real-time theme editing with instant preview.

```tsx
import { ThemeLiveEditor } from '@shohojdhara/atomix/theme/devtools';

function App() {
  const handleThemeChange = (newTheme) => {
    console.log('Theme updated:', newTheme);
  };

  return (
    <ThemeLiveEditor
      initialTheme={theme}
      onChange={handleThemeChange}
    />
  );
}
```

**Features:**
- Visual editor for common properties
- JSON editor for advanced editing
- Live preview with instant updates
- Export theme to JSON file
- Copy theme JSON to clipboard
- Syntax validation

**Props:**
- `initialTheme` (required) - Initial theme to edit
- `onChange` (function) - Callback when theme changes
- `className` (string) - Custom CSS class
- `style` (object) - Inline styles

---

## Usage Examples

### Development Workflow

```tsx
import { 
  ThemeInspector, 
  ThemePreview, 
  ThemeComparator,
  ThemeLiveEditor 
} from '@shohojdhara/atomix/theme/devtools';
import { createTheme } from '@shohojdhara/atomix/theme';

// Create themes
const lightTheme = createTheme({
  name: 'Light Theme',
  palette: {
    primary: { main: '#2196f3' },
    background: { default: '#ffffff' },
  },
});

const darkTheme = createTheme({
  name: 'Dark Theme',
  palette: {
    primary: { main: '#90caf9' },
    background: { default: '#121212' },
  },
});

// Development dashboard
function ThemeDashboard() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  return (
    <div>
      {/* Inspect current theme */}
      <ThemeInspector theme={currentTheme} />

      {/* Preview theme */}
      <ThemePreview theme={currentTheme} />

      {/* Compare themes */}
      <ThemeComparator themeA={lightTheme} themeB={darkTheme} />

      {/* Edit theme live */}
      <ThemeLiveEditor
        initialTheme={currentTheme}
        onChange={setCurrentTheme}
      />
    </div>
  );
}
```

### Storybook Integration

```tsx
// .storybook/preview.tsx
import { ThemePreview } from '@shohojdhara/atomix/theme/devtools';

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme;
    
    return (
      <ThemePreview theme={theme}>
        <Story />
      </ThemePreview>
    );
  },
];
```

### Testing Themes

```tsx
import { ThemeInspector } from '@shohojdhara/atomix/theme/devtools';

describe('Theme Validation', () => {
  it('should validate theme structure', () => {
    const theme = createTheme({
      palette: { primary: { main: '#7AFFD7' } },
    });

    // Use inspector programmatically
    const validator = new ThemeValidator();
    const result = validator.validate(theme);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
```

---

## Best Practices

### 1. Use Inspector During Development

Always inspect themes during development to catch issues early:

```tsx
<ThemeInspector
  theme={myTheme}
  showValidation={true}
  showCSSVariables={true}
/>
```

### 2. Compare Before Releasing

Compare theme versions before releasing updates:

```tsx
<ThemeComparator
  themeA={currentVersion}
  themeB={newVersion}
/>
```

### 3. Preview with Real Components

Test themes with actual components:

```tsx
<ThemePreview theme={myTheme}>
  <Button>Test Button</Button>
  <Card>Test Card</Card>
</ThemePreview>
```

### 4. Validate Accessibility

Always check accessibility issues:

```tsx
// Inspector automatically checks contrast ratios
// and reports accessibility issues
<ThemeInspector theme={myTheme} showValidation={true} />
```

### 5. Export for Sharing

Export themes for team collaboration:

```bash
atomix-theme export --theme my-theme --output shared-theme.json
```

---

## Performance Considerations

- **Inspector**: Validation runs once on mount, memoized for performance
- **Preview**: CSS variables generated once, cached
- **Comparator**: Differences calculated once, memoized
- **Live Editor**: Debounced updates for smooth editing

---

## Browser Support

All devtools components support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

---

## Troubleshooting

### Inspector Not Showing Validation

Ensure `ThemeValidator` is available:

```tsx
import { ThemeValidator } from '@shohojdhara/atomix/theme';
```

### Preview Not Rendering

Check that theme has required properties:

```tsx
const theme = createTheme({
  palette: { primary: { main: '#7AFFD7' } }, // Required
  typography: { fontFamily: 'Inter' }, // Required
});
```

### CLI Commands Not Working

Ensure theme configuration exists:

```bash
# Check if atomix.config.ts exists in project root
ls atomix.config.ts
```

---

## Contributing

To add new devtools:

1. Create component in `src/lib/theme/devtools/`
2. Export from `index.ts`
3. Add documentation to this README
4. Add tests if applicable

---

## Related Documentation

- [Theme System Guide](../../../../docs/THEME_SYSTEM.md)
- [Getting Started - Theme System](../../../../docs/getting-started/theme-system.md)
- [Theme System Guide](../../../../docs/THEME_SYSTEM.md)

---

**Last Updated:** 2025-01-27

