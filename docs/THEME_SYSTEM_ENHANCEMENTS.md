# Theme System Enhancements

This document outlines the major enhancements made to the Atomix theme system to align with the roadmap requirements.

## Overview

The theme system has been significantly enhanced with enterprise-grade features including RTL support, visual theme editing, component overrides, white labeling, and comprehensive analytics.

## New Features

### 1. RTL (Right-to-Left) Support ✅

**Location:** `src/lib/theme/i18n/rtl.ts`

**Features:**
- Automatic locale detection for RTL languages (Arabic, Hebrew, Persian, etc.)
- Manual direction control
- CSS property mapping for RTL-aware styles
- DOM attribute management
- Event listeners for direction changes

**Usage:**
```typescript
import { RTLManager, createRTLManager } from '@shohojdhara/atomix/theme';

// Create RTL manager
const rtlManager = createRTLManager({
  enabled: true,
  autoDetect: true,
  locale: 'ar', // Arabic
});

// Set direction
rtlManager.setDirection('rtl');

// Toggle direction
rtlManager.toggleDirection();

// Get RTL-aware values
const margin = rtlManager.getValue('margin-left', 'margin-right');
```

**Integration:**
- Integrated into `ThemeManager` via `rtl` configuration option
- Automatically applies direction to DOM
- Supports CSS custom properties

### 2. Theme Studio (Visual Theme Editor) ✅

**Location:** `src/lib/theme/studio/ThemeStudio.tsx`

**Features:**
- Visual color palette editor
- Typography customization
- Real-time preview
- CSS variable generation
- Theme code export
- Save/load functionality

**Usage:**
```tsx
import { ThemeStudio } from '@shohojdhara/atomix/theme';

<ThemeStudio
  initialTheme={myTheme}
  onThemeChange={(theme) => console.log('Theme changed:', theme)}
  onSave={(theme) => console.log('Theme saved:', theme)}
  showPreview={true}
  showCSS={true}
  showCode={true}
/>
```

**Features:**
- Interactive color pickers for all palette colors
- Typography controls
- Live preview of theme changes
- Generated CSS output
- JSON export for theme configuration

### 3. Component Override System ✅

**Location:** `src/lib/theme/overrides/ComponentOverrides.ts`

**Features:**
- Component-level style overrides
- Default props customization
- CSS class overrides
- CSS variable overrides
- Import/export functionality

**Usage:**
```typescript
import { ComponentOverrideManager, createComponentOverrideManager } from '@shohojdhara/atomix/theme';

const overrideManager = createComponentOverrideManager(theme);

// Add override
overrideManager.addOverride('Button', {
  styleOverrides: {
    borderRadius: '8px',
    padding: '12px 24px',
  },
  cssVariableOverrides: {
    'button-primary-bg': 'var(--atomix-primary)',
  },
});

// Get theme with overrides
const themedTheme = overrideManager.getThemeWithOverrides();

// Export/import
const json = overrideManager.exportOverrides();
overrideManager.importOverrides(json);
```

### 4. White Labeling ✅

**Location:** `src/lib/theme/whitelabel/WhiteLabelManager.ts`

**Features:**
- Brand customization (name, logo, colors)
- Automatic favicon management
- Meta tag customization
- Custom CSS injection
- Theme overrides
- Export/import configuration

**Usage:**
```typescript
import { WhiteLabelManager, createWhiteLabelManager } from '@shohojdhara/atomix/theme';

const whiteLabelManager = createWhiteLabelManager(baseTheme);

whiteLabelManager.configure({
  brand: {
    name: 'My Brand',
    logo: '/logo.png',
    primaryColor: '#7AFFD7',
    secondaryColor: '#FF5733',
    fonts: {
      primary: 'Inter, sans-serif',
    },
    favicon: '/favicon.ico',
    customCSS: '.custom-style { color: red; }',
    metaTags: {
      'description': 'My brand description',
    },
  },
  themeOverrides: {
    palette: {
      primary: { main: '#7AFFD7' },
    },
  },
});

// Get white labeled theme
const brandedTheme = whiteLabelManager.getWhiteLabeledTheme();
```

### 5. Analytics and Performance Monitoring ✅

**Location:** `src/lib/theme/monitoring/ThemeAnalytics.ts`

**Features:**
- Theme load tracking
- Theme switch tracking
- Error tracking
- Performance metrics
- CSS load time tracking
- Event buffering
- Custom event handlers

**Usage:**
```typescript
import { ThemeAnalytics, createThemeAnalytics } from '@shohojdhara/atomix/theme';

const analytics = createThemeAnalytics({
  enabled: true,
  trackPerformance: true,
  trackErrors: true,
  onEvent: (event) => {
    console.log('Theme event:', event);
    // Send to analytics service
  },
  onPerformance: (metric) => {
    console.log('Performance:', metric);
  },
});

// Track events
analytics.trackThemeLoad('my-theme', 150);
analytics.trackThemeSwitch('theme-a', 'theme-b', 200);
analytics.trackError('my-theme', new Error('Load failed'));

// Get metrics
const events = analytics.getEvents();
const metrics = analytics.getMetrics();
const avgLoadTime = analytics.getAverageMetric('theme_load_time');
```

## Integration Points

### ThemeManager Integration

The `ThemeManager` now supports RTL configuration:

```typescript
const themeManager = new ThemeManager({
  defaultTheme: 'shaj-default',
  rtl: {
    enabled: true,
    autoDetect: true,
    locale: 'ar',
  },
});

// Access RTL manager
const rtlManager = themeManager.getRTLManager();
rtlManager?.setDirection('rtl');
```

### ThemeProvider Integration

The `ThemeProvider` supports RTL configuration:

```tsx
<ThemeProvider
  defaultTheme="shaj-default"
  rtl={{
    enabled: true,
    autoDetect: true,
  }}
>
  <App />
</ThemeProvider>
```

## Examples

See `examples/theme-system-enhanced.tsx` for a complete example demonstrating all new features.

## Roadmap Alignment

These enhancements address the following roadmap items:

- ✅ **RTL Support** - Full RTL infrastructure with locale detection
- ✅ **Theme Editor and Generator** - Visual Theme Studio component
- ✅ **White Labeling** - Complete white label management system
- ✅ **Component Override System** - Comprehensive override API
- ✅ **Performance Monitoring** - Analytics and performance tracking
- ✅ **Dynamic Theming at Runtime** - Enhanced with all new features

## Next Steps

Remaining roadmap items to implement:

- [ ] **Internationalization Helpers** - Translation management utilities
- [ ] **Cultural Adaptation Tools** - Locale-specific adaptations
- [ ] **Design Token System Integration** - Enhanced token validation
- [ ] **Low-code Customization Tools** - Drag-and-drop theme builder

## Migration Guide

### For Existing Users

1. **RTL Support**: Add `rtl` configuration to `ThemeManager` or `ThemeProvider`
2. **Analytics**: Create analytics instance and track events manually
3. **Component Overrides**: Use `ComponentOverrideManager` for component customization
4. **White Labeling**: Use `WhiteLabelManager` for brand customization

### Breaking Changes

None. All new features are additive and backward compatible.

## API Reference

### RTL Manager

- `RTLManager` - Main RTL management class
- `createRTLManager(config?)` - Factory function
- `isRTLLocale(locale)` - Check if locale is RTL
- `getDirectionFromLocale(locale)` - Get direction from locale
- `rtlCSS(ltrCSS, rtlCSS, direction)` - Get RTL-aware CSS

### Theme Studio

- `ThemeStudio` - React component for visual theme editing
- Props: `initialTheme`, `onThemeChange`, `onSave`, `showPreview`, `showCSS`, `showCode`

### Component Overrides

- `ComponentOverrideManager` - Component override management
- `createComponentOverrideManager(theme?)` - Factory function
- `createComponentOverride(component, override)` - Helper function

### White Label

- `WhiteLabelManager` - White label management
- `createWhiteLabelManager(baseTheme?)` - Factory function

### Analytics

- `ThemeAnalytics` - Analytics tracking
- `createThemeAnalytics(config?)` - Factory function
- `getGlobalAnalytics()` - Get global instance
- `setGlobalAnalytics(analytics)` - Set global instance

## Performance Considerations

- Analytics events are buffered to prevent performance impact
- RTL direction changes are optimized with minimal DOM updates
- Component overrides are applied lazily
- White label CSS is injected once and cached

## Browser Support

All features support:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript
- React 18+

## TypeScript Support

All new features are fully typed with comprehensive TypeScript definitions.
