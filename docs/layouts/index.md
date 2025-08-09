# Layouts Index

Quick navigation index for all Atomix Layout documentation.

## Core Documentation

- [**Layouts Overview**](./README.md) - Complete introduction to the layout system
- [**Grid System**](./grid.md) - Comprehensive grid documentation
- [**Masonry Grid**](./masonry-grid.md) - Pinterest-style layouts
- [**Responsive Patterns**](./responsive-patterns.md) - Common layout solutions
- [**Customization Guide**](./customization.md) - Theming and configuration
- [**Performance Best Practices**](./performance.md) - Optimization strategies

## Quick Reference

### Grid System Components
- [Container](./grid.md#container) - Responsive content containers
- [Grid](./grid.md#grid) - Main grid container
- [Row](./grid.md#row) - Row wrapper component
- [GridCol](./grid.md#gridcol) - Responsive columns

### Masonry Grid Components  
- [MasonryGrid](./masonry-grid.md#masonrygrid) - Dynamic masonry container
- [MasonryGridItem](./masonry-grid.md#masonrygriditem) - Individual masonry items

### Common Patterns
- [Sidebar Layout](./responsive-patterns.md#sidebar-layout) - Side navigation layouts
- [Holy Grail Layout](./responsive-patterns.md#holy-grail-layout) - Three-column layouts
- [Dashboard Layout](./responsive-patterns.md#dashboard-layout) - Data-heavy interfaces
- [Card Grid Layout](./responsive-patterns.md#card-grid-layout) - Content discovery grids
- [Hero Section Patterns](./responsive-patterns.md#hero-section-patterns) - Landing page heroes

## Getting Started

### Installation
```bash
npm install @shohojdhara/atomix
```

### Basic Grid Example
```jsx
import { Container, Grid, GridCol } from '@shohojdhara/atomix';

<Container>
  <Grid>
    <GridCol xs={12} md={6}>Content</GridCol>
    <GridCol xs={12} md={6}>Content</GridCol>
  </Grid>
</Container>
```

### Basic Masonry Example
```jsx
import { MasonryGrid, MasonryGridItem } from '@shohojdhara/atomix';

<MasonryGrid xs={1} sm={2} md={3} lg={4}>
  <MasonryGridItem>Item 1</MasonryGridItem>
  <MasonryGridItem>Item 2</MasonryGridItem>
</MasonryGrid>
```

## Troubleshooting

### Common Issues
- [Items Not Positioning Correctly](./masonry-grid.md#items-not-positioning-correctly)
- [Layout Not Updating on Image Load](./masonry-grid.md#layout-not-updating-on-image-load)
- [Performance Issues with Large Lists](./masonry-grid.md#performance-issues-with-large-lists)
- [Responsive Breakpoints Not Working](./masonry-grid.md#responsive-breakpoints-not-working)

### Performance Issues
- [Memory Leaks](./performance.md#memory-management)
- [Layout Shifts](./performance.md#layout-shift-monitoring)
- [Bundle Size](./performance.md#bundle-optimization)

## External Links

- [GitHub Repository](https://github.com/shohojdhara/atomix)
- [Storybook Examples](https://storybook.atomix.design)
- [NPM Package](https://www.npmjs.com/package/@shohojdhara/atomix)
- [Community Discussions](https://github.com/shohojdhara/atomix/discussions)

---

*Need help? Visit our [support documentation](../resources/support.md) or join our [community discussions](https://github.com/shohojdhara/atomix/discussions).*