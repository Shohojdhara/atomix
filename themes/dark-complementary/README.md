# dark-complementary Theme

## Description

The dark-complementary theme provides a modern dark theme with complementary colors optimized for low-light environments and reduced eye strain. This theme maintains excellent readability while providing a sophisticated dark aesthetic.

## Usage

### CSS Theme

```scss
@import 'themes/dark-complementary';
```

### JavaScript Theme

```typescript
import { darkComplementaryTheme } from './themes/dark-complementary';
import { ThemeProvider } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider theme={darkComplementaryTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Customization

Edit the theme variables in `index.scss` to customize colors, typography, spacing, and more. The theme uses CSS custom properties for easy customization.

### Color Customization

```scss
:root[data-theme='dark-complementary'] {
  --atomix-color-primary: #your-primary-color;
  --atomix-color-background: #your-background-color;
  // ... other variables
}
```

### Background Customization

For dark themes, consider the background hierarchy:

```scss
:root[data-theme='dark-complementary'] {
  --atomix-color-background: #1a1a1a; // Main background
  --atomix-color-background-paper: #2d2d2d; // Card/surface backgrounds
  --atomix-color-background-subtle: #404040; // Hover states, subtle elements
}
```

## Features

- **Dark Mode Optimized**: Reduced blue light for better eye comfort
- **High Contrast**: Maintained readability in low-light conditions
- **Complementary Colors**: Brighter, more vibrant color palette for dark backgrounds
- **Modern Design**: Clean aesthetic with enhanced shadows for depth
- **Accessible**: Meets WCAG 2.1 AA standards with proper contrast ratios

## Build

```bash
atomix build-theme themes/dark-complementary
```

## Color Palette

- **Primary**: Light Blue (#4dabf7) - Brighter blue for dark backgrounds
- **Secondary**: Light Gray (#868e96) - Muted for secondary elements
- **Success**: Bright Green (#51cf66) - Highly visible success states
- **Error**: Bright Red (#ff6b6b) - Attention-grabbing error states
- **Warning**: Bright Yellow (#ffd43b) - Noticeable warning states
- **Info**: Bright Cyan (#74c0fc) - Clear informational elements

## Typography

- **Base Font**: Inter (system font stack fallback)
- **Mono Font**: Fira Code (for code elements)
- **Font Sizes**: Responsive scale from xs to 5xl
- **Font Weights**: Light (300) to Extra Bold (800)
- **Text Colors**: White primary (#ffffff), Light gray secondary (#cccccc)

## Background Hierarchy

- **Main Background**: Dark gray (#1a1a1a)
- **Paper/Surface**: Medium dark gray (#2d2d2d)
- **Subtle Elements**: Light medium gray (#404040)

## Shadows

Enhanced shadow definitions for better depth perception in dark themes:

- Inner shadows use white tints for subtle highlights
- Outer shadows use increased opacity for better definition
