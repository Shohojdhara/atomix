# Layout Customization Guide

This comprehensive guide covers all aspects of customizing Atomix Layout components, from basic theming with CSS custom properties to advanced SCSS configuration and creating completely custom layout patterns.

## Overview

Atomix Layouts are built with customization in mind, offering multiple levels of configuration:

- **🎨 CSS Custom Properties** - Runtime theming and quick adjustments
- **⚙️ SCSS Variables** - Build-time configuration and deep customization
- **🎛️ Component Props** - Dynamic behavior and styling
- **🧩 Custom Components** - Extending and creating new layout patterns

## CSS Custom Properties

### Grid System Properties

```css
:root {
  /* Container widths */
  --atomix-container-sm: 540px;
  --atomix-container-md: 720px;
  --atomix-container-lg: 960px;
  --atomix-container-xl: 1140px;
  --atomix-container-xxl: 1320px;
  
  /* Container padding */
  --atomix-container-padding-x: 0.75rem;
  --atomix-container-padding-x-sm: 1rem;
  --atomix-container-padding-x-md: 1.5rem;
  
  /* Grid gutters */
  --atomix-grid-gutter-width: 1.5rem;
  --atomix-grid-gutter-width-sm: 1rem;
  --atomix-grid-gutter-width-lg: 2rem;
  
  /* Grid columns */
  --atomix-grid-columns: 12;
}
```

### Masonry Grid Properties

```css
:root {
  /* Masonry gaps */
  --atomix-masonry-gap: 1rem;
  --atomix-masonry-gap-sm: 0.75rem;
  --atomix-masonry-gap-lg: 1.5rem;
  
  /* Masonry animations */
  --atomix-masonry-transition-duration: 0.3s;
  --atomix-masonry-transition-easing: ease-out;
  --atomix-masonry-transition-delay: 0s;
  
  /* Loading states */
  --atomix-masonry-loading-opacity: 0.6;
  --atomix-masonry-loading-blur: 2px;
  --atomix-masonry-loading-scale: 0.95;
}
```

### Theme-Specific Customization

```css
/* Light theme */
.theme-light {
  --atomix-container-bg: #ffffff;
  --atomix-container-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --atomix-grid-border-color: #e5e5e5;
  --atomix-masonry-item-bg: #ffffff;
  --atomix-masonry-item-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Dark theme */
.theme-dark {
  --atomix-container-bg: #1a1a1a;
  --atomix-container-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  --atomix-grid-border-color: #333333;
  --atomix-masonry-item-bg: #2a2a2a;
  --atomix-masonry-item-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* High contrast theme */
.theme-high-contrast {
  --atomix-container-bg: #000000;
  --atomix-grid-border-color: #ffffff;
  --atomix-masonry-item-bg: #000000;
  --atomix-masonry-item-shadow: 0 0 0 2px #ffffff;
}
```

### Responsive Custom Properties

```css
/* Mobile-first responsive properties */
:root {
  --atomix-container-padding: 1rem;
  --atomix-grid-gap: 1rem;
  --atomix-masonry-columns: 1;
}

/* Tablet */
@media (min-width: 768px) {
  :root {
    --atomix-container-padding: 1.5rem;
    --atomix-grid-gap: 1.5rem;
    --atomix-masonry-columns: 2;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  :root {
    --atomix-container-padding: 2rem;
    --atomix-grid-gap: 2rem;
    --atomix-masonry-columns: 4;
  }
}
```

## SCSS Configuration

### Basic SCSS Setup

```scss
// _variables.scss
@use '@shohojdhara/atomix/styles/settings/breakpoints';
@use '@shohojdhara/atomix/styles/settings/containers';
@use '@shohojdhara/atomix/styles/settings/grid';

// Override default variables
$container-max-widths: (
  sm: 600px,
  md: 800px,
  lg: 1000px,
  xl: 1200px,
  xxl: 1400px
) !default;

$grid-columns: 16 !default;
$grid-gutter-width: 2rem !default;
$grid-row-columns: 8 !default;

// Import customized components
@use '@shohojdhara/atomix/styles/objects/container' with (
  $container-max-widths: $container-max-widths
);

@use '@shohojdhara/atomix/styles/objects/grid' with (
  $grid-columns: $grid-columns,
  $grid-gutter-width: $grid-gutter-width
);
```

### Advanced Grid Customization

```scss
// Custom grid system with different column counts
@use '@shohojdhara/atomix/styles' with (
  $grid-columns: 24,
  $grid-gutter-width: 1rem,
  $grid-breakpoints: (
    xs: 0,
    sm: 480px,    // Custom breakpoint
    md: 768px,
    lg: 1024px,   // Custom breakpoint
    xl: 1280px,   // Custom breakpoint
    xxl: 1600px   // Custom breakpoint
  ),
  $container-max-widths: (
    sm: 460px,
    md: 720px,
    lg: 960px,
    xl: 1200px,
    xxl: 1400px
  )
);
```

### Custom Breakpoint System

```scss
// Define custom breakpoints
$custom-breakpoints: (
  mobile: 0,
  tablet: 600px,
  laptop: 1024px,
  desktop: 1440px,
  wide: 1920px
) !default;

// Generate custom grid classes
@each $breakpoint, $size in $custom-breakpoints {
  @if $breakpoint == 'mobile' {
    // Base classes without prefix
    @for $i from 1 through 12 {
      .col-#{$i} {
        flex: 0 0 percentage($i / 12);
        max-width: percentage($i / 12);
      }
    }
  } @else {
    // Responsive classes with prefix
    @media (min-width: $size) {
      @for $i from 1 through 12 {
        .col-#{$breakpoint}-#{$i} {
          flex: 0 0 percentage($i / 12);
          max-width: percentage($i / 12);
        }
      }
    }
  }
}
```

### Masonry Grid SCSS Configuration

```scss
// Custom masonry configuration
@use '@shohojdhara/atomix/styles/objects/masonry-grid' with (
  $masonry-gap: 1.5rem,
  $masonry-gap-sm: 1rem,
  $masonry-gap-lg: 2rem,
  
  // Default column counts per breakpoint
  $masonry-columns: (
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    xxl: 6
  ),
  
  // Animation settings
  $masonry-transition-duration: 0.4s,
  $masonry-transition-easing: cubic-bezier(0.4, 0, 0.2, 1),
  
  // Enable/disable features
  $enable-masonry-animations: true,
  $enable-masonry-loading-states: true,
  $enable-masonry-hover-effects: true
);
```

## Component-Level Customization

### Custom Container Component

```jsx
import React, { forwardRef } from 'react';
import { Container as BaseContainer } from '@shohojdhara/atomix';

// Extended container with custom features
export const CustomContainer = forwardRef(({ 
  children, 
  maxWidth = 'xl',
  centered = true,
  gutters = true,
  ...props 
}, ref) => {
  const containerClasses = [
    'custom-container',
    `custom-container--max-${maxWidth}`,
    centered && 'custom-container--centered',
    !gutters && 'custom-container--no-gutters'
  ].filter(Boolean).join(' ');

  return (
    <BaseContainer 
      ref={ref}
      className={containerClasses}
      {...props}
    >
      {children}
    </BaseContainer>
  );
});

// CSS for custom container
const customContainerStyles = `
  .custom-container--max-sm { max-width: 600px; }
  .custom-container--max-md { max-width: 800px; }
  .custom-container--max-lg { max-width: 1000px; }
  .custom-container--max-xl { max-width: 1200px; }
  .custom-container--max-xxl { max-width: 1400px; }
  
  .custom-container--centered {
    margin-left: auto;
    margin-right: auto;
  }
  
  .custom-container--no-gutters {
    padding-left: 0;
    padding-right: 0;
  }
`;
```

### Enhanced Grid Component

```jsx
import React, { forwardRef } from 'react';
import { Grid as BaseGrid } from '@shohojdhara/atomix';

export const EnhancedGrid = forwardRef(({
  children,
  columns = 12,
  gap = 'md',
  verticalAlign = 'stretch',
  horizontalAlign = 'start',
  reverse = false,
  ...props
}, ref) => {
  const gridClasses = [
    'enhanced-grid',
    `enhanced-grid--columns-${columns}`,
    `enhanced-grid--gap-${gap}`,
    `enhanced-grid--v-align-${verticalAlign}`,
    `enhanced-grid--h-align-${horizontalAlign}`,
    reverse && 'enhanced-grid--reverse'
  ].filter(Boolean).join(' ');

  return (
    <BaseGrid
      ref={ref}
      className={gridClasses}
      alignItems={verticalAlign}
      justifyContent={horizontalAlign}
      {...props}
    >
      {children}
    </BaseGrid>
  );
});

// SCSS for enhanced grid
const enhancedGridStyles = `
  .enhanced-grid {
    --grid-columns: 12;
    --grid-gap: 1rem;
    
    display: flex;
    flex-wrap: wrap;
    margin: calc(var(--grid-gap) / -2);
    
    &--columns-16 { --grid-columns: 16; }
    &--columns-24 { --grid-columns: 24; }
    
    &--gap-sm { --grid-gap: 0.5rem; }
    &--gap-md { --grid-gap: 1rem; }
    &--gap-lg { --grid-gap: 2rem; }
    &--gap-xl { --grid-gap: 3rem; }
    
    &--reverse {
      flex-direction: row-reverse;
    }
  }
  
  .enhanced-grid > * {
    padding: calc(var(--grid-gap) / 2);
  }
`;
```

### Custom Masonry Implementation

```jsx
import React, { useState, useEffect, useRef, forwardRef } from 'react';

export const CustomMasonry = forwardRef(({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 16,
  itemSelector = '.masonry-item',
  animationDuration = 300,
  stagger = 50,
  ...props
}, ref) => {
  const containerRef = useRef();
  const [mounted, setMounted] = useState(false);
  const [currentColumns, setCurrentColumns] = useState(1);

  // Responsive column calculation
  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth;
      let cols = columns.xs || 1;
      
      if (width >= 1200 && columns.xl) cols = columns.xl;
      else if (width >= 992 && columns.lg) cols = columns.lg;
      else if (width >= 768 && columns.md) cols = columns.md;
      else if (width >= 576 && columns.sm) cols = columns.sm;
      
      setCurrentColumns(cols);
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, [columns]);

  // Custom layout algorithm
  const arrangeItems = useCallback(() => {
    if (!containerRef.current || !mounted) return;

    const container = containerRef.current;
    const items = container.querySelectorAll(itemSelector);
    const containerWidth = container.offsetWidth;
    const columnWidth = (containerWidth - gap * (currentColumns - 1)) / currentColumns;
    const columnHeights = new Array(currentColumns).fill(0);

    items.forEach((item, index) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      const x = shortestColumn * (columnWidth + gap);
      const y = columnHeights[shortestColumn];

      // Apply positioning with staggered animation
      const delay = (index % currentColumns) * stagger;
      
      item.style.position = 'absolute';
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.width = `${columnWidth}px`;
      item.style.transition = `all ${animationDuration}ms ease ${delay}ms`;

      columnHeights[shortestColumn] += item.offsetHeight + gap;
    });

    // Set container height
    container.style.height = `${Math.max(...columnHeights)}px`;
  }, [currentColumns, gap, itemSelector, animationDuration, stagger, mounted]);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      arrangeItems();
    }
  }, [mounted, arrangeItems]);

  return (
    <div
      ref={containerRef}
      className="custom-masonry"
      style={{ position: 'relative', width: '100%' }}
      {...props}
    >
      {children}
    </div>
  );
});
```

## Advanced Theming Patterns

### Dynamic Theme System

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children, defaultTheme = 'light' }) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [customProperties, setCustomProperties] = useState({});

  // Apply theme to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    
    // Base theme properties
    const themeProperties = {
      light: {
        '--atomix-container-bg': '#ffffff',
        '--atomix-grid-border-color': '#e5e5e5',
        '--atomix-masonry-item-bg': '#ffffff',
        '--atomix-masonry-item-shadow': '0 2px 8px rgba(0, 0, 0, 0.1)'
      },
      dark: {
        '--atomix-container-bg': '#1a1a1a',
        '--atomix-grid-border-color': '#333333',
        '--atomix-masonry-item-bg': '#2a2a2a',
        '--atomix-masonry-item-shadow': '0 2px 8px rgba(0, 0, 0, 0.3)'
      }
    };

    // Apply theme properties
    const properties = { ...themeProperties[theme], ...customProperties };
    Object.entries(properties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Add theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
  }, [theme, customProperties]);

  const updateCustomProperty = (property, value) => {
    setCustomProperties(prev => ({
      ...prev,
      [property]: value
    }));
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      customProperties,
      updateCustomProperty
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Usage example
function ThemedLayout({ children }) {
  const { theme, setTheme, updateCustomProperty } = useTheme();

  return (
    <Container>
      <Grid>
        <GridCol xs={12}>
          <div className="theme-controls">
            <button onClick={() => setTheme('light')}>Light</button>
            <button onClick={() => setTheme('dark')}>Dark</button>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              onChange={(e) => 
                updateCustomProperty('--atomix-grid-gap', `${e.target.value}rem`)
              }
            />
          </div>
        </GridCol>
        <GridCol xs={12}>
          {children}
        </GridCol>
      </Grid>
    </Container>
  );
}
```

### Brand-Specific Themes

```scss
// Brand theme mixins
@mixin brand-theme($primary-color, $secondary-color, $accent-color) {
  --atomix-brand-primary: #{$primary-color};
  --atomix-brand-secondary: #{$secondary-color};
  --atomix-brand-accent: #{$accent-color};
  
  // Container theming
  --atomix-container-border-color: #{lighten($primary-color, 30%)};
  --atomix-container-shadow: 0 4px 6px #{rgba($primary-color, 0.1)};
  
  // Grid theming
  --atomix-grid-hover-bg: #{rgba($accent-color, 0.1)};
  --atomix-grid-active-border: #{$accent-color};
  
  // Masonry theming
  --atomix-masonry-item-border: 1px solid #{lighten($primary-color, 20%)};
  --atomix-masonry-item-hover-shadow: 0 8px 25px #{rgba($primary-color, 0.15)};
}

// Generate brand themes
.theme-corporate {
  @include brand-theme(#2563eb, #64748b, #0ea5e9);
}

.theme-creative {
  @include brand-theme(#7c3aed, #ec4899, #f59e0b);
}

.theme-minimal {
  @include brand-theme(#374151, #6b7280, #9ca3af);
}

.theme-vibrant {
  @include brand-theme(#ef4444, #f97316, #eab308);
}
```

### Responsive Theme Switching

```jsx
function ResponsiveThemeProvider({ children }) {
  const [theme, setTheme] = useState('auto');
  const [systemTheme, setSystemTheme] = useState('light');

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e) => setSystemTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Determine effective theme
  const effectiveTheme = theme === 'auto' ? systemTheme : theme;

  // Apply responsive theme properties
  useEffect(() => {
    const updateTheme = () => {
      const root = document.documentElement;
      const width = window.innerWidth;
      
      // Mobile theme adjustments
      if (width < 768) {
        root.style.setProperty('--atomix-container-padding', '1rem');
        root.style.setProperty('--atomix-grid-gap', '1rem');
        root.style.setProperty('--atomix-masonry-gap', '0.75rem');
      }
      // Desktop theme adjustments
      else {
        root.style.setProperty('--atomix-container-padding', '2rem');
        root.style.setProperty('--atomix-grid-gap', '2rem');
        root.style.setProperty('--atomix-masonry-gap', '1.5rem');
      }
      
      // Apply theme class
      root.className = root.className.replace(/theme-\w+/g, '');
      root.classList.add(`theme-${effectiveTheme}`);
    };

    updateTheme();
    window.addEventListener('resize', updateTheme);
    return () => window.removeEventListener('resize', updateTheme);
  }, [effectiveTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## Custom Layout Components

### Flexible Section Component

```jsx
export const Section = forwardRef(({
  children,
  spacing = 'md',
  background = 'transparent',
  maxWidth = 'xl',
  as: Component = 'section',
  ...props
}, ref) => {
  const spacingMap = {
    sm: 'section--spacing-sm',
    md: 'section--spacing-md',
    lg: 'section--spacing-lg',
    xl: 'section--spacing-xl'
  };

  const backgroundMap = {
    transparent: '',
    subtle: 'section--bg-subtle',
    muted: 'section--bg-muted',
    primary: 'section--bg-primary',
    secondary: 'section--bg-secondary'
  };

  const className = [
    'section',
    spacingMap[spacing],
    backgroundMap[background],
    props.className
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={className} {...props}>
      <Container type={maxWidth === 'full' ? 'fluid' : undefined}>
        {children}
      </Container>
    </Component>
  );
});

// SCSS for Section component
const sectionStyles = `
  .section {
    &--spacing-sm { padding: 2rem 0; }
    &--spacing-md { padding: 4rem 0; }
    &--spacing-lg { padding: 6rem 0; }
    &--spacing-xl { padding: 8rem 0; }
    
    &--bg-subtle { background-color: var(--atomix-bg-subtle); }
    &--bg-muted { background-color: var(--atomix-bg-muted); }
    &--bg-primary { background-color: var(--atomix-primary); color: var(--atomix-primary-contrast); }
    &--bg-secondary { background-color: var(--atomix-secondary); color: var(--atomix-secondary-contrast); }
  }
`;
```

### Adaptive Grid Component

```jsx
export const AdaptiveGrid = ({ 
  children, 
  minItemWidth = 250,
  gap = 16,
  align = 'stretch',
  ...props 
}) => {
  const [columns, setColumns] = useState(1);
  const containerRef = useRef();

  useEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemsPerRow = Math.floor((containerWidth + gap) / (minItemWidth + gap));
        setColumns(Math.max(1, itemsPerRow));
      }
    };

    updateColumns();
    
    const resizeObserver = new ResizeObserver(updateColumns);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [minItemWidth, gap]);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    alignItems: align
  };

  return (
    <div 
      ref={containerRef} 
      className="adaptive-grid" 
      style={gridStyle}
      {...props}
    >
      {children}
    </div>
  );
};
```

### Layout Debugger Component

```jsx
export const LayoutDebugger = ({ 
  children, 
  enabled = process.env.NODE_ENV === 'development',
  showBreakpoints = true,
  showGrid = true,
  showSpacing = true 
}) => {
  if (!enabled) return children;

  return (
    <div className="layout-debugger">
      {showBreakpoints && <BreakpointIndicator />}
      {showGrid && <GridOverlay />}
      {showSpacing && <SpacingIndicator />}
      {children}
    </div>
  );
};

const BreakpointIndicator = () => (
  <div className="debug-breakpoint">
    <span className="d-block d-sm-none">XS</span>
    <span className="d-none d-sm-block d-md-none">SM</span>
    <span className="d-none d-md-block d-lg-none">MD</span>
    <span className="d-none d-lg-block d-xl-none">LG</span>
    <span className="d-none d-xl-block d-xxl-none">XL</span>
    <span className="d-none d-xxl-block">XXL</span>
  </div>
);

const GridOverlay = () => (
  <div className="debug-grid-overlay">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="debug-grid-column" />
    ))}
  </div>
);

// Debug styles
const debugStyles = `
  .layout-debugger {
    position: relative;
  }
  
  .debug-breakpoint {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    z-index: 9999;
  }
  
  .debug-grid-overlay {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: var(--atomix-container-xl);
    height: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--atomix-grid-gutter-width);
    pointer-events: none;
    z-index: 1000;
  }
  
  .debug-grid-column {
    background: rgba(255, 0, 0, 0.1);
    border: 1px solid rgba(255, 0, 0, 0.2);
  }
`;
```

## Testing Custom Layouts

### Customization Testing

```jsx
// test/layout-customization.test.js
import { render } from '@testing-library/react';
import { ThemeProvider, CustomContainer } from '../components';

describe('Layout Customization', () => {
  test('applies custom theme properties', () => {
    const { container } = render(
      <ThemeProvider defaultTheme="dark">
        <CustomContainer>Test content</CustomContainer>
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveClass('theme-dark');
    expect(container.firstChild).toHaveClass('custom-container');
  });

  test('responds to breakpoint changes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    const { rerender } = render(<AdaptiveGrid minItemWidth={250} />);
    
    // Change viewport size
    window.innerWidth = 400;
    window.dispatchEvent(new Event('resize'));
    
    // Test responsive behavior
    rerender(<AdaptiveGrid minItemWidth={250} />);
  });
});
```

## Performance Considerations

### Efficient Custom Properties

```css
/* Use CSS custom properties efficiently */
.optimized-grid {
  /* Define properties once */
  --grid-gap: 1rem;
  --grid-columns: 12;
  
  /* Use calculations sparingly */
  gap: var(--grid-gap);
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  
  /* Avoid complex calculations in frequently updated properties */
  /* ❌ Avoid: */
  /* margin: calc(var(--grid-gap) * var(--multiplier) + var(--offset)); */
  
  /* ✅ Better: */
  margin: var(--computed-margin);
}
```

### SCSS Build Optimization

```scss
// Optimize SCSS compilation
@use 'sass:map';
@use 'sass:math';

// Pre-calculate common values
$grid-percentages: ();
@for $i from 1 through 12 {
  $grid-percentages: map.set($grid-percentages, $i, math.percentage($i / 12));
}

// Generate optimized classes
@each $breakpoint, $size in $breakpoints {
  @if $breakpoint == 'xs' {
    @each $column, $percentage in $grid-percentages {
      .col-#{$column} {
        flex: 0 0 #{$percentage};
        max-width: #{$percentage};
      }
    }
  }
}
```

---

**Ready to customize your layouts?** Start with CSS custom properties for quick changes, then move to SCSS configuration for deeper customization. For advanced patterns, create custom components that extend the base layout system. 🎨

*Built with ❤️ by the Atomix team*