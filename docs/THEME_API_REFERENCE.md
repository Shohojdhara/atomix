# Theme System API Reference

**Version:** 2.0  
**Last Updated:** 2024-12-19

---

## Table of Contents

1. [RTL Manager API](#rtl-manager-api)
2. [Component Override Manager API](#component-override-manager-api)
3. [White Label Manager API](#white-label-manager-api)
4. [Theme Analytics API](#theme-analytics-api)

---

## RTL Manager API

The RTL Manager provides comprehensive support for right-to-left languages and bidirectional text.

### Import

```typescript
import { RTLManager, createRTLManager } from '@shohojdhara/atomix/theme/i18n';
```

### RTLConfig Interface

```typescript
interface RTLConfig {
  /** Enable RTL support */
  enabled?: boolean;
  
  /** Initial text direction */
  direction?: 'ltr' | 'rtl' | 'auto';
  
  /** Auto-detect direction from locale */
  autoDetect?: boolean;
  
  /** Initial locale */
  locale?: string;
  
  /** CSS property mapping for RTL */
  propertyMap?: Record<string, string>;
  
  /** DOM attribute name for direction */
  domAttribute?: string;
  
  /** Callback when direction changes */
  onDirectionChange?: (direction: 'ltr' | 'rtl') => void;
}
```

### RTLManager Class

#### Constructor

```typescript
new RTLManager(config?: RTLConfig)
```

#### Methods

##### setDirection

Set the text direction explicitly.

```typescript
setDirection(direction: 'ltr' | 'rtl'): void
```

**Example:**
```typescript
rtlManager.setDirection('rtl');
```

##### getDirection

Get the current text direction.

```typescript
getDirection(): 'ltr' | 'rtl'
```

**Example:**
```typescript
const direction = rtlManager.getDirection(); // 'ltr' or 'rtl'
```

##### toggleDirection

Toggle between LTR and RTL.

```typescript
toggleDirection(): void
```

**Example:**
```typescript
rtlManager.toggleDirection(); // Switches from ltr to rtl or vice versa
```

##### setLocale

Set the locale and auto-detect direction if enabled.

```typescript
setLocale(locale: string): void
```

**Example:**
```typescript
rtlManager.setLocale('ar-SA'); // Sets to RTL for Arabic
rtlManager.setLocale('en-US'); // Sets to LTR for English
```

##### getValue

Get the appropriate CSS value based on current direction.

```typescript
getValue(ltrValue: string, rtlValue: string): string
```

**Example:**
```typescript
const margin = rtlManager.getValue('margin-left', 'margin-right');
// Returns 'margin-left' in LTR, 'margin-right' in RTL
```

##### mapProperty

Map a CSS property to its RTL equivalent.

```typescript
mapProperty(property: string): string
```

**Example:**
```typescript
const mappedProp = rtlManager.mapProperty('padding-left');
// Returns 'padding-right' in RTL mode
```

##### destroy

Clean up event listeners and resources.

```typescript
destroy(): void
```

### Helper Functions

#### isRTLLocale

Check if a locale is RTL.

```typescript
isRTLLocale(locale: string): boolean
```

**Example:**
```typescript
import { isRTLLocale } from '@shohojdhara/atomix/theme/i18n';

isRTLLocale('ar-SA'); // true
isRTLLocale('en-US'); // false
```

#### getDirectionFromLocale

Get direction from locale string.

```typescript
getDirectionFromLocale(locale: string): 'ltr' | 'rtl'
```

**Example:**
```typescript
import { getDirectionFromLocale } from '@shohojdhara/atomix/theme/i18n';

getDirectionFromLocale('he-IL'); // 'rtl'
getDirectionFromLocale('fr-FR'); // 'ltr'
```

#### rtlCSS

Get RTL-aware CSS value.

```typescript
rtlCSS(ltrCSS: string, rtlCSS: string, direction: 'ltr' | 'rtl'): string
```

**Example:**
```typescript
import { rtlCSS } from '@shohojdhara/atomix/theme/i18n';

const css = rtlCSS(
  'margin-left: 10px',
  'margin-right: 10px',
  'rtl'
); // Returns 'margin-right: 10px'
```

---

## Component Override Manager API

The Component Override Manager allows customization of component styles, props, and CSS variables at the theme level.

### Import

```typescript
import { 
  ComponentOverrideManager, 
  createComponentOverrideManager 
} from '@shohojdhara/atomix/theme/overrides';
```

### ComponentOverride Interface

```typescript
interface ComponentOverride {
  /** Style overrides as CSS properties */
  styleOverrides?: Record<string, string | number>;
  
  /** Default props overrides */
  defaultProps?: Record<string, any>;
  
  /** CSS class overrides */
  classOverrides?: string[];
  
  /** CSS variable overrides */
  cssVariableOverrides?: Record<string, string>;
  
  /** Variant-specific overrides */
  variants?: Record<string, ComponentOverride>;
}
```

### ComponentOverrideManager Class

#### Constructor

```typescript
new ComponentOverrideManager(baseTheme?: Theme)
```

#### Methods

##### addOverride

Add an override for a component.

```typescript
addOverride(
  componentName: string, 
  override: ComponentOverride
): void
```

**Example:**
```typescript
overrideManager.addOverride('Button', {
  styleOverrides: {
    borderRadius: '8px',
    padding: '12px 24px',
    fontWeight: '600',
  },
  cssVariableOverrides: {
    'button-primary-bg': '#7AFFD7',
    'button-hover-opacity': '0.8',
  },
  defaultProps: {
    size: 'lg',
    variant: 'primary',
  },
});
```

##### removeOverride

Remove an override for a component.

```typescript
removeOverride(componentName: string): void
```

**Example:**
```typescript
overrideManager.removeOverride('Button');
```

##### getOverride

Get override for a specific component.

```typescript
getOverride(componentName: string): ComponentOverride | undefined
```

**Example:**
```typescript
const buttonOverride = overrideManager.getOverride('Button');
```

##### getAllOverrides

Get all registered overrides.

```typescript
getAllOverrides(): Map<string, ComponentOverride>
```

**Example:**
```typescript
const allOverrides = overrideManager.getAllOverrides();
allOverrides.forEach((override, component) => {
  console.log(`${component}:`, override);
});
```

##### getThemeWithOverrides

Get theme object with overrides applied.

```typescript
getThemeWithOverrides(): Theme
```

**Example:**
```typescript
const themedTheme = overrideManager.getThemeWithOverrides();
```

##### exportOverrides

Export overrides as JSON string.

```typescript
exportOverrides(): string
```

**Example:**
```typescript
const json = overrideManager.exportOverrides();
localStorage.setItem('theme-overrides', json);
```

##### importOverrides

Import overrides from JSON string.

```typescript
importOverrides(json: string): void
```

**Example:**
```typescript
const saved = localStorage.getItem('theme-overrides');
if (saved) {
  overrideManager.importOverrides(saved);
}
```

##### reset

Reset all overrides.

```typescript
reset(): void
```

**Example:**
```typescript
overrideManager.reset();
```

### Helper Functions

#### createComponentOverride

Create a component override object.

```typescript
createComponentOverride(
  component: string, 
  override: ComponentOverride
): [string, ComponentOverride]
```

**Example:**
```typescript
const [name, override] = createComponentOverride('Card', {
  styleOverrides: {
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
});
```

---

## White Label Manager API

The White Label Manager enables brand customization and white-labeling of the application.

### Import

```typescript
import { 
  WhiteLabelManager, 
  createWhiteLabelManager 
} from '@shohojdhara/atomix/theme/whitelabel';
```

### WhiteLabelConfig Interface

```typescript
interface WhiteLabelConfig {
  /** Brand configuration */
  brand?: {
    /** Brand name */
    name?: string;
    
    /** Brand logo URL */
    logo?: string;
    
    /** Primary brand color */
    primaryColor?: string;
    
    /** Secondary brand color */
    secondaryColor?: string;
    
    /** Brand fonts */
    fonts?: {
      primary?: string;
      secondary?: string;
    };
    
    /** Favicon URL */
    favicon?: string;
    
    /** Custom CSS to inject */
    customCSS?: string;
    
    /** Meta tags to add/update */
    metaTags?: Record<string, string>;
  };
  
  /** Theme overrides */
  themeOverrides?: Partial<Theme>;
  
  /** Component overrides */
  componentOverrides?: Record<string, ComponentOverride>;
}
```

### WhiteLabelManager Class

#### Constructor

```typescript
new WhiteLabelManager(baseTheme?: Theme)
```

#### Methods

##### configure

Configure white label settings.

```typescript
configure(config: WhiteLabelConfig): void
```

**Example:**
```typescript
whiteLabelManager.configure({
  brand: {
    name: 'My Company',
    logo: '/assets/logo.png',
    primaryColor: '#FF5733',
    secondaryColor: '#33FF57',
    fonts: {
      primary: 'Montserrat, sans-serif',
      secondary: 'Roboto, sans-serif',
    },
    favicon: '/assets/favicon.ico',
    customCSS: `
      .header { background: linear-gradient(...); }
      .footer { border-top: 2px solid var(--primary); }
    `,
    metaTags: {
      'description': 'My Company - Leading solutions',
      'keywords': 'company, solutions, innovation',
      'author': 'My Company Inc.',
    },
  },
  themeOverrides: {
    palette: {
      primary: { main: '#FF5733' },
      secondary: { main: '#33FF57' },
    },
  },
});
```

##### applyBrand

Apply brand configuration to DOM.

```typescript
applyBrand(): void
```

**Example:**
```typescript
whiteLabelManager.applyBrand();
// Updates favicon, meta tags, injects CSS
```

##### getBrand

Get current brand configuration.

```typescript
getBrand(): WhiteLabelConfig['brand']
```

**Example:**
```typescript
const brand = whiteLabelManager.getBrand();
console.log('Brand name:', brand?.name);
```

##### getWhiteLabeledTheme

Get theme with white label overrides applied.

```typescript
getWhiteLabeledTheme(): Theme
```

**Example:**
```typescript
const brandedTheme = whiteLabelManager.getWhiteLabeledTheme();
```

##### updateFavicon

Update favicon dynamically.

```typescript
updateFavicon(url: string): void
```

**Example:**
```typescript
whiteLabelManager.updateFavicon('/new-favicon.ico');
```

##### updateMetaTags

Update meta tags.

```typescript
updateMetaTags(tags: Record<string, string>): void
```

**Example:**
```typescript
whiteLabelManager.updateMetaTags({
  'description': 'Updated description',
  'og:title': 'My Page Title',
});
```

##### injectCustomCSS

Inject custom CSS into the page.

```typescript
injectCustomCSS(css: string): void
```

**Example:**
```typescript
whiteLabelManager.injectCustomCSS(`
  body { font-family: 'Custom Font', sans-serif; }
`);
```

##### exportConfig

Export configuration as JSON.

```typescript
exportConfig(): string
```

**Example:**
```typescript
const config = whiteLabelManager.exportConfig();
```

##### importConfig

Import configuration from JSON.

```typescript
importConfig(json: string): void
```

**Example:**
```typescript
whiteLabelManager.importConfig(savedConfig);
```

##### reset

Reset to default configuration.

```typescript
reset(): void
```

---

## Theme Analytics API

The Theme Analytics system provides tracking and metrics for theme usage and performance.

### Import

```typescript
import { 
  ThemeAnalytics, 
  createThemeAnalytics,
  getGlobalAnalytics,
  setGlobalAnalytics 
} from '@shohojdhara/atomix/theme/monitoring';
```

### ThemeAnalyticsConfig Interface

```typescript
interface ThemeAnalyticsConfig {
  /** Enable analytics */
  enabled?: boolean;
  
  /** Track performance metrics */
  trackPerformance?: boolean;
  
  /** Track errors */
  trackErrors?: boolean;
  
  /** Buffer size for events */
  bufferSize?: number;
  
  /** Flush interval in ms */
  flushInterval?: number;
  
  /** Event callback */
  onEvent?: (event: ThemeAnalyticsEvent) => void;
  
  /** Performance callback */
  onPerformance?: (metric: PerformanceMetric) => void;
  
  /** Error callback */
  onError?: (error: Error, context?: any) => void;
}
```

### ThemeAnalyticsEvent Interface

```typescript
interface ThemeAnalyticsEvent {
  /** Event type */
  type: 'theme_load' | 'theme_switch' | 'theme_error' | 'custom';
  
  /** Event payload */
  payload: any;
  
  /** Timestamp */
  timestamp: number;
  
  /** Session ID */
  sessionId?: string;
  
  /** User ID */
  userId?: string;
  
  /** Additional metadata */
  metadata?: Record<string, any>;
}
```

### ThemeAnalytics Class

#### Constructor

```typescript
new ThemeAnalytics(config?: ThemeAnalyticsConfig)
```

#### Methods

##### trackThemeLoad

Track theme loading event.

```typescript
trackThemeLoad(
  themeName: string, 
  loadTime?: number,
  metadata?: Record<string, any>
): void
```

**Example:**
```typescript
analytics.trackThemeLoad('dark-theme', 150, {
  source: 'user-selection',
  previousTheme: 'light-theme',
});
```

##### trackThemeSwitch

Track theme switch event.

```typescript
trackThemeSwitch(
  fromTheme: string,
  toTheme: string,
  switchTime?: number,
  metadata?: Record<string, any>
): void
```

**Example:**
```typescript
analytics.trackThemeSwitch('light', 'dark', 200, {
  trigger: 'button-click',
  userPreference: true,
});
```

##### trackError

Track theme-related error.

```typescript
trackError(
  themeName: string,
  error: Error,
  context?: any
): void
```

**Example:**
```typescript
analytics.trackError('custom-theme', new Error('Load failed'), {
  attemptNumber: 3,
  fallbackUsed: true,
});
```

##### trackCustomEvent

Track custom event.

```typescript
trackCustomEvent(
  eventName: string,
  payload: any,
  metadata?: Record<string, any>
): void
```

**Example:**
```typescript
analytics.trackCustomEvent('theme-preview', {
  theme: 'new-theme',
  action: 'hover',
}, {
  duration: 500,
});
```

##### getEvents

Get tracked events.

```typescript
getEvents(filter?: {
  type?: string;
  startTime?: number;
  endTime?: number;
}): ThemeAnalyticsEvent[]
```

**Example:**
```typescript
const events = analytics.getEvents({
  type: 'theme_switch',
  startTime: Date.now() - 3600000, // Last hour
});
```

##### getMetrics

Get performance metrics.

```typescript
getMetrics(): Record<string, PerformanceMetric[]>
```

**Example:**
```typescript
const metrics = analytics.getMetrics();
console.log('Load times:', metrics.theme_load_time);
```

##### getAverageMetric

Get average value for a metric.

```typescript
getAverageMetric(metricName: string): number | null
```

**Example:**
```typescript
const avgLoadTime = analytics.getAverageMetric('theme_load_time');
console.log(`Average load time: ${avgLoadTime}ms`);
```

##### flush

Manually flush event buffer.

```typescript
flush(): void
```

**Example:**
```typescript
analytics.flush(); // Send all buffered events
```

##### reset

Reset all tracked data.

```typescript
reset(): void
```

##### destroy

Clean up resources.

```typescript
destroy(): void
```

### Global Analytics

#### getGlobalAnalytics

Get global analytics instance.

```typescript
getGlobalAnalytics(): ThemeAnalytics | null
```

**Example:**
```typescript
const globalAnalytics = getGlobalAnalytics();
if (globalAnalytics) {
  globalAnalytics.trackCustomEvent('page_view', { page: '/settings' });
}
```

#### setGlobalAnalytics

Set global analytics instance.

```typescript
setGlobalAnalytics(analytics: ThemeAnalytics): void
```

**Example:**
```typescript
const analytics = createThemeAnalytics({ enabled: true });
setGlobalAnalytics(analytics);
```

---

## Usage Examples

### Complete RTL Setup

```typescript
import { RTLManager } from '@shohojdhara/atomix/theme/i18n';
import { ThemeProvider } from '@shohojdhara/atomix/theme';

const rtlManager = new RTLManager({
  enabled: true,
  autoDetect: true,
  locale: navigator.language,
  onDirectionChange: (dir) => {
    console.log('Direction changed to:', dir);
  },
});

function App() {
  return (
    <ThemeProvider
      rtl={{
        enabled: true,
        autoDetect: true,
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### Component Customization

```typescript
import { ComponentOverrideManager } from '@shohojdhara/atomix/theme/overrides';
import { useTheme } from '@shohojdhara/atomix/theme';

function ThemeCustomizer() {
  const { activeTheme, setTheme } = useTheme();
  const overrideManager = new ComponentOverrideManager(activeTheme);
  
  const customizeButton = () => {
    overrideManager.addOverride('Button', {
      styleOverrides: {
        borderRadius: '12px',
        textTransform: 'uppercase',
      },
    });
    
    const customTheme = overrideManager.getThemeWithOverrides();
    setTheme(customTheme);
  };
  
  return (
    <button onClick={customizeButton}>
      Customize Buttons
    </button>
  );
}
```

### White Label Configuration

```typescript
import { WhiteLabelManager } from '@shohojdhara/atomix/theme/whitelabel';

const whiteLabelManager = new WhiteLabelManager();

// Configure for client
whiteLabelManager.configure({
  brand: {
    name: 'Client Corp',
    logo: '/client-logo.svg',
    primaryColor: '#007bff',
    favicon: '/client-favicon.ico',
  },
});

// Apply branding
whiteLabelManager.applyBrand();

// Get branded theme
const brandedTheme = whiteLabelManager.getWhiteLabeledTheme();
```

### Analytics Integration

```typescript
import { 
  createThemeAnalytics, 
  setGlobalAnalytics 
} from '@shohojdhara/atomix/theme/monitoring';

// Create analytics instance
const analytics = createThemeAnalytics({
  enabled: true,
  trackPerformance: true,
  onEvent: (event) => {
    // Send to your analytics service
    sendToAnalytics(event);
  },
  onPerformance: (metric) => {
    // Track performance
    console.log('Performance:', metric);
  },
});

// Set as global
setGlobalAnalytics(analytics);

// Use in theme manager
const themeManager = new ThemeManager({
  onThemeChange: (theme) => {
    analytics.trackThemeSwitch(
      previousTheme,
      theme,
      performance.now() - startTime
    );
  },
});
```

---

## TypeScript Support

All APIs are fully typed with TypeScript. Import types as needed:

```typescript
import type {
  RTLConfig,
  RTLDirection,
  ComponentOverride,
  WhiteLabelConfig,
  ThemeAnalyticsEvent,
} from '@shohojdhara/atomix/theme';
```

---

## Browser Support

All features support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

Some features have fallbacks for older browsers:
- RTL: Falls back to attribute selectors
- Analytics: Falls back to console logging
- White Label: Graceful degradation for meta tags

---

## Performance Considerations

### RTL Manager
- Minimal DOM updates on direction change
- Cached property mappings
- Debounced event handlers

### Component Overrides
- Lazy evaluation of overrides
- Memoized theme generation
- Efficient merge strategies

### White Label
- One-time CSS injection
- Cached brand configuration
- Optimized meta tag updates

### Analytics
- Buffered event batching
- Async event processing
- Automatic memory cleanup

---

## Migration Guide

### From v1.x to v2.0

#### RTL Support

Before:
```typescript
// Manual RTL handling
const dir = isArabic ? 'rtl' : 'ltr';
document.dir = dir;
```

After:
```typescript
// Automatic RTL with manager
const rtlManager = new RTLManager({
  autoDetect: true,
  locale: 'ar-SA',
});
```

#### Component Overrides

Before:
```typescript
// Manual theme modification
const customTheme = {
  ...baseTheme,
  components: {
    Button: { /* overrides */ },
  },
};
```

After:
```typescript
// Managed overrides
const manager = new ComponentOverrideManager(baseTheme);
manager.addOverride('Button', overrides);
const theme = manager.getThemeWithOverrides();
```

---

## Troubleshooting

### Common Issues

#### RTL Not Working

1. Check RTL is enabled in config
2. Verify locale is RTL
3. Check DOM attribute is set
4. Ensure CSS supports RTL

#### Overrides Not Applying

1. Verify component name matches
2. Check theme is re-applied after override
3. Ensure CSS specificity is sufficient
4. Check for conflicting styles

#### Analytics Not Tracking

1. Verify analytics is enabled
2. Check event callbacks are configured
3. Ensure buffer is flushing
4. Check browser console for errors

---

## Support

For issues or questions:
- GitHub Issues: [Create an issue](https://github.com/Shohojdhara/atomix/issues)
- Documentation: [Full Docs](./README.md)

---

**Last Updated:** 2024-12-19  
**Version:** 2.0
