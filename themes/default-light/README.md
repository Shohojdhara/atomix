# default-light Theme

## Description

The default-light theme provides a clean, modern light theme with a blue primary color scheme. This theme is optimized for readability and provides excellent contrast ratios for accessibility.

## Usage

### CSS Theme

```scss
@import 'themes/default-light';
```

### JavaScript Theme

```typescript
import { defaultLightTheme } from './themes/default-light';
import { ThemeProvider } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider theme={defaultLightTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Customization

Edit the theme variables in `index.scss` to customize colors, typography, spacing, and more. The theme uses CSS custom properties for easy customization.

### Color Customization

```scss
:root[data-theme='default-light'] {
  --atomix-color-primary: #your-primary-color;
  --atomix-color-background: #your-background-color;
  // ... other variables
}
```

### Typography Customization

```scss
:root[data-theme='default-light'] {
  --atomix-font-family-base: 'Your Font', sans-serif;
  --atomix-font-size-base: 1rem;
  // ... other typography variables
}
```

## Features

- **High Contrast**: Excellent readability with proper contrast ratios
- **Modern Design**: Clean, minimal aesthetic with subtle shadows
- **Responsive**: Scales well across all device sizes
- **Accessible**: Meets WCAG 2.1 AA standards for color contrast

## Build

```bash
atomix build-theme themes/default-light
```

## Color Palette

- **Primary**: Blue (#007bff) - Used for primary actions and links
- **Secondary**: Gray (#6c757d) - Used for secondary elements
- **Success**: Green (#28a745) - Used for success states
- **Error**: Red (#dc3545) - Used for error states
- **Warning**: Yellow (#ffc107) - Used for warning states
- **Info**: Cyan (#17a2b8) - Used for informational elements

## Typography

- **Base Font**: Inter (system font stack fallback)
- **Mono Font**: Fira Code (for code elements)
- **Font Sizes**: Responsive scale from xs to 5xl
- **Font Weights**: Light (300) to Extra Bold (800)
