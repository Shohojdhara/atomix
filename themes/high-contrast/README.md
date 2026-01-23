# high-contrast Theme

## Description

The high-contrast theme provides maximum visibility and readability for users with visual impairments or those requiring enhanced accessibility. This theme uses pure black and white backgrounds with bright, high-contrast accent colors and thicker borders.

## Usage

### CSS Theme

```scss
@import 'themes/high-contrast';
```

### JavaScript Theme

```typescript
import { highContrastTheme } from './themes/high-contrast';
import { ThemeProvider } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider theme={highContrastTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Customization

Edit the theme variables in `index.scss` to customize colors, typography, spacing, and more. The theme uses CSS custom properties for easy customization.

### Color Customization

For high-contrast themes, maintain maximum contrast ratios:

```scss
:root[data-theme='high-contrast'] {
  --atomix-color-primary: #your-high-contrast-color;
  --atomix-color-background: #ffffff; // Keep pure white
  --atomix-color-text: #000000; // Keep pure black
  // ... other variables
}
```

### Border Customization

High-contrast themes benefit from thicker borders:

```scss
:root[data-theme='high-contrast'] {
  --atomix-color-border: #000000; // Pure black borders
  // Component-specific border widths can be adjusted in overrides
}
```

## Features

- **Maximum Accessibility**: Meets WCAG 2.1 AAA standards for color contrast
- **Visual Impairment Support**: Optimized for users with low vision
- **Clear Visual Hierarchy**: Thick borders and high contrast ensure clarity
- **Reduced Motion**: Faster transitions for users sensitive to animation
- **Bold Typography**: Heavier font weights and larger sizes for better readability

## Build

```bash
atomix build-theme themes/high-contrast
```

## Color Palette

- **Primary**: Bright Blue (#0066cc) - High contrast for primary actions
- **Secondary**: Medium Gray (#666666) - For secondary elements
- **Success**: Pure Green (#008000) - Maximum visibility for success states
- **Error**: Bright Red (#cc0000) - Highly visible error states
- **Warning**: Bright Yellow (#ffcc00) - Noticeable warning states
- **Info**: Bright Cyan (#0099cc) - Clear informational elements

## Typography

- **Base Font**: Arial/Helvetica (highly readable system fonts)
- **Mono Font**: Courier New (for code elements)
- **Font Sizes**: Larger scale starting from 0.875rem for better readability
- **Font Weights**: No light weights (minimum 400), emphasizing bold (700-900)
- **Text Colors**: Pure black (#000000) on pure white (#ffffff)

## Accessibility Features

- **Thick Borders**: 2-3px borders for maximum visibility
- **High Contrast Focus Rings**: 4px thick focus indicators
- **Bold Text**: Minimum font-weight of 400, recommended 600-700
- **Minimal Animations**: Reduced motion for users with vestibular disorders
- **Clear Visual States**: Distinct hover, focus, and active states

## Component Overrides

- **Buttons**: Thick black borders, bold text, clear state changes
- **Cards**: 3px borders, enhanced focus states, high contrast backgrounds
- **Focus Management**: Thick outline rings for keyboard navigation

## Browser Support

This theme is designed to work in all modern browsers and provides fallback support for older browsers through the use of standard CSS properties.
