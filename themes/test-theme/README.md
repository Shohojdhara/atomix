# test-theme Theme

## Description

A custom theme for Atomix Design System.

## Usage

### CSS Theme

```scss
@import 'themes/test-theme';
```

### JavaScript Theme

```typescript
import { testThemeTheme } from './themes/test-theme';
import { ThemeProvider } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider theme={testThemeTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Customization

Edit the theme variables in `index.scss` to customize colors, typography, spacing, and more.

## Build

```bash
atomix build-theme themes/test-theme
```
