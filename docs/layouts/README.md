# Atomix Layouts

Welcome to the comprehensive documentation for Atomix Layout components. The layout system provides powerful, flexible, and responsive layout solutions for building modern web interfaces.

## 🎯 Overview

Atomix Layouts offer a comprehensive set of components for creating responsive, accessible, and performant layouts. Built on modern CSS Grid and Flexbox technologies, these components provide both React and vanilla JavaScript implementations.

### Key Features

- **🎨 Responsive Design** - Mobile-first approach with flexible breakpoints
- **🧩 Modular Components** - Mix and match components for any layout need
- **♿ Accessibility First** - WCAG 2.1 AA compliant with proper semantic HTML
- **⚡ Performance Optimized** - Minimal CSS footprint with efficient rendering
- **🎛️ Highly Customizable** - CSS custom properties and SCSS variables
- **📱 Device Agnostic** - Works seamlessly across all devices and screen sizes

## 📦 Installation

The layout components are included in the main Atomix package:

```bash
npm install @shohojdhara/atomix
# or
yarn add @shohojdhara/atomix
```

### Import Styles

```css
@import '@shohojdhara/atomix/css';
```

Or import specific layout styles:

```scss
@use '@shohojdhara/atomix/styles/objects/container';
@use '@shohojdhara/atomix/styles/objects/grid';
@use '@shohojdhara/atomix/styles/objects/masonry-grid';
```

## 🧩 Available Layout Components

### Grid System
A flexible, responsive grid system based on CSS Grid and Flexbox.

- **[Container](./grid.md#container)** - Responsive container with configurable max-widths
- **[Grid](./grid.md#grid)** - Main grid container with alignment options
- **[Row](./grid.md#row)** - Row wrapper for grouping columns
- **[GridCol](./grid.md#gridcol)** - Responsive columns with sizing and offset options

### Masonry Grid
A dynamic masonry layout for Pinterest-style grids with items of varying heights.

- **[MasonryGrid](./masonry-grid.md#masonrygrid)** - Responsive masonry container
- **[MasonryGridItem](./masonry-grid.md#masonrygriditem)** - Individual masonry items

## 🚀 Quick Start

### Basic Grid Layout

```jsx
import { Container, Grid, GridCol } from '@shohojdhara/atomix';

function MyLayout() {
  return (
    <Container>
      <Grid>
        <GridCol xs={12} md={8}>
          <h1>Main Content</h1>
        </GridCol>
        <GridCol xs={12} md={4}>
          <aside>Sidebar</aside>
        </GridCol>
      </Grid>
    </Container>
  );
}
```

### Masonry Grid Layout

```jsx
import { MasonryGrid, MasonryGridItem } from '@shohojdhara/atomix';

function PhotoGallery() {
  return (
    <MasonryGrid xs={1} sm={2} md={3} lg={4} gap={16}>
      {photos.map(photo => (
        <MasonryGridItem key={photo.id}>
          <img src={photo.url} alt={photo.alt} />
        </MasonryGridItem>
      ))}
    </MasonryGrid>
  );
}
```

### Vanilla JavaScript

```html
<div class="o-container">
  <div class="o-grid">
    <div class="o-grid__col o-grid__col--12 o-grid__col--md-8">
      <h1>Main Content</h1>
    </div>
    <div class="o-grid__col o-grid__col--12 o-grid__col--md-4">
      <aside>Sidebar</aside>
    </div>
  </div>
</div>
```

## 📐 Responsive Breakpoints

All layout components use a consistent breakpoint system:

| Breakpoint | Min Width | Description |
|------------|-----------|-------------|
| `xs` | 0px | Extra small devices (default) |
| `sm` | 576px | Small devices (landscape phones) |
| `md` | 768px | Medium devices (tablets) |
| `lg` | 992px | Large devices (desktops) |
| `xl` | 1200px | Extra large devices (large desktops) |
| `xxl` | 1440px | Extra extra large devices (wide screens) |

## 🎨 Theming and Customization

### CSS Custom Properties

```css
:root {
  /* Container max-widths */
  --atomix-container-sm: 540px;
  --atomix-container-md: 720px;
  --atomix-container-lg: 960px;
  --atomix-container-xl: 1140px;
  --atomix-container-xxl: 1320px;
  
  /* Grid gutters */
  --atomix-grid-gutter-width: 1.5rem;
  --atomix-grid-gutter-width-sm: 1rem;
  
  /* Masonry grid gaps */
  --atomix-masonry-gap: 1rem;
}
```

### SCSS Configuration

```scss
@use '@shohojdhara/atomix/styles' with (
  $container-max-widths: (
    sm: 540px,
    md: 720px,
    lg: 960px,
    xl: 1140px,
    xxl: 1320px
  ),
  $grid-gutter-width: 1.5rem,
  $grid-columns: 12
);
```

## 📚 Layout Guides

### 🏗️ [Grid System Guide](./grid.md)
Complete guide to the flexible grid system including containers, rows, columns, and responsive design patterns.

### 🧱 [Masonry Grid Guide](./masonry-grid.md)
Comprehensive documentation for creating Pinterest-style masonry layouts with optimal item positioning.

### 📱 [Responsive Design Patterns](./responsive-patterns.md)
Common responsive layout patterns and best practices for different screen sizes.

### 🎨 [Customization Guide](./customization.md)
Advanced theming, SCSS configuration, and custom layout creation techniques.

### ⚡ [Performance Best Practices](./performance.md)
Optimization strategies for layout components and efficient rendering techniques.

## 🎯 Common Use Cases

### Dashboard Layout

```jsx
<Container type="fluid">
  <Grid>
    <GridCol xs={12}>
      <header>Navigation</header>
    </GridCol>
    <GridCol xs={12} lg={3}>
      <nav>Sidebar</nav>
    </GridCol>
    <GridCol xs={12} lg={9}>
      <main>Dashboard Content</main>
    </GridCol>
  </Grid>
</Container>
```

### Card Grid

```jsx
<Container>
  <Grid>
    {cards.map(card => (
      <GridCol key={card.id} xs={12} sm={6} lg={4}>
        <Card>{card.content}</Card>
      </GridCol>
    ))}
  </Grid>
</Container>
```

### Photo Gallery

```jsx
<MasonryGrid xs={1} sm={2} md={3} lg={4} xl={5}>
  {photos.map(photo => (
    <MasonryGridItem key={photo.id}>
      <img src={photo.url} alt={photo.alt} loading="lazy" />
    </MasonryGridItem>
  ))}
</MasonryGrid>
```

## ♿ Accessibility

All layout components follow WCAG accessibility guidelines:

### Semantic HTML
- Uses appropriate HTML5 semantic elements
- Maintains logical document structure
- Supports screen readers and assistive technologies

### Keyboard Navigation
- Preserves natural tab order
- No layout-related keyboard traps
- Maintains focus visibility

### Responsive Design
- Mobile-first approach ensures usability on all devices
- Flexible layouts adapt to user preferences
- Supports zoom up to 200% without horizontal scrolling

## 🌐 Browser Support

Layout components support all modern browsers:

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+

### Progressive Enhancement
- Graceful degradation for older browsers
- CSS Grid with Flexbox fallbacks where appropriate
- Feature detection for advanced capabilities

## 🎪 Interactive Examples

### Storybook
Explore interactive examples and component variations:

```bash
npm run storybook
```

Visit the **Layouts** section to see:
- Live component examples
- Interactive props playground  
- Responsive behavior testing
- Code snippets for all use cases

### CodePen Examples
- [Basic Grid Layout](https://codepen.io/atomix-design/pen/grid-basic)
- [Responsive Dashboard](https://codepen.io/atomix-design/pen/dashboard-responsive)
- [Masonry Photo Gallery](https://codepen.io/atomix-design/pen/masonry-gallery)

## 🔧 Development

### Contributing
Contributions to layout components are welcome! Please see our [Contributing Guide](../../CONTRIBUTING.md) for development setup and guidelines.

### Component Structure
```
src/layouts/
├── Grid/
│   ├── Container.tsx
│   ├── Grid.tsx
│   ├── GridCol.tsx
│   ├── Row.tsx
│   ├── Grid.stories.tsx
│   └── index.ts
└── MasonryGrid/
    ├── MasonryGrid.tsx
    ├── MasonryGridItem.tsx
    ├── MasonryGrid.stories.tsx
    └── index.ts
```

### Testing
```bash
npm run test:layouts
npm run test:visual
```

## 🔗 Related Documentation

- **[Design Tokens](../design-tokens/README.md)** - Spacing, breakpoints, and sizing tokens
- **[Components](../components/README.md)** - UI components that work with layouts
- **[Styles](../styles/README.md)** - CSS architecture and utility classes
- **[Examples](../examples/README.md)** - Real-world layout implementations

## 📋 Quick Reference

### Grid System
```jsx
// Import
import { Container, Grid, Row, GridCol } from '@shohojdhara/atomix';

// Basic Usage
<Container>
  <Grid>
    <GridCol xs={12} md={6}>Content</GridCol>
  </Grid>
</Container>
```

### Masonry Grid
```jsx
// Import
import { MasonryGrid, MasonryGridItem } from '@shohojdhara/atomix';

// Basic Usage
<MasonryGrid xs={1} sm={2} md={3}>
  <MasonryGridItem>Content</MasonryGridItem>
</MasonryGrid>
```

### CSS Classes
```html
<!-- Grid System -->
<div class="o-container">
  <div class="o-grid">
    <div class="o-grid__col o-grid__col--md-6">Content</div>
  </div>
</div>

<!-- Masonry Grid -->
<div class="o-masonry-grid">
  <div class="o-masonry-grid__item">Content</div>
</div>
```

---

**Ready to build amazing layouts?** Start with our [Grid System Guide](./grid.md) or jump into the [Masonry Grid documentation](./masonry-grid.md). For questions and support, visit our [GitHub Discussions](https://github.com/shohojdhara/atomix/discussions). 🚀

*Built with ❤️ by the Atomix team*