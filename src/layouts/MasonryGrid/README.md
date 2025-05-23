# Masonry Grid

A responsive masonry grid layout component for creating Pinterest-like grid layouts with items of varying heights.

## Usage

The MasonryGrid component creates a responsive grid layout that arranges items optimally based on their height, similar to Pinterest or other masonry-style layouts.

```jsx
import { MasonryGrid, MasonryGridItem } from './MasonryGrid';

<MasonryGrid xs={1} sm={2} md={3} lg={4}>
  <MasonryGridItem>
    <div>Item 1</div>
  </MasonryGridItem>
  <MasonryGridItem>
    <div>Item 2</div>
  </MasonryGridItem>
  <MasonryGridItem>
    <div>Item 3</div>
  </MasonryGridItem>
</MasonryGrid>
```

## Props

### MasonryGrid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `xs` | `number` | `1` | Number of columns at extra small breakpoint (default) |
| `sm` | `number` | - | Number of columns at small breakpoint |
| `md` | `number` | - | Number of columns at medium breakpoint |
| `lg` | `number` | - | Number of columns at large breakpoint |
| `xl` | `number` | - | Number of columns at extra large breakpoint |
| `xxl` | `number` | - | Number of columns at extra extra large breakpoint |
| `gap` | `number` | `16` | Gap between items (in pixels) |
| `className` | `string` | - | Additional CSS class names |

### MasonryGridItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS class names |

## Examples

### Basic Masonry Grid

```jsx
<MasonryGrid xs={1} sm={2} md={3} lg={4}>
  <MasonryGridItem>
    <div>Item 1</div>
  </MasonryGridItem>
  <MasonryGridItem>
    <div>Item 2</div>
  </MasonryGridItem>
  <MasonryGridItem>
    <div>Item 3</div>
  </MasonryGridItem>
</MasonryGrid>
```

### Custom Gap

```jsx
<MasonryGrid xs={1} sm={2} md={3} lg={4} gap={24}>
  <MasonryGridItem>
    <div>Item 1</div>
  </MasonryGridItem>
  <MasonryGridItem>
    <div>Item 2</div>
  </MasonryGridItem>
</MasonryGrid>
```

### Custom Column Configuration

```jsx
<MasonryGrid xs={1} sm={2} md={2} lg={3} xl={4} xxl={5}>
  <MasonryGridItem>
    <div>Item 1</div>
  </MasonryGridItem>
  <MasonryGridItem>
    <div>Item 2</div>
  </MasonryGridItem>
</MasonryGrid>
```

## Styling

The MasonryGrid component uses CSS Grid to create the masonry layout. You can customize the appearance by modifying the following SCSS variables:

```scss
// In your theme file or custom styles
$masonry-grid-gap: 16px;
$masonry-grid-gap-sm: 8px;
$masonry-grid-gap-lg: 24px;
$masonry-grid-columns-xs: 1;
$masonry-grid-columns-sm: 2;
$masonry-grid-columns-md: 3;
$masonry-grid-columns-lg: 4;
$masonry-grid-columns-xl: 4;
$masonry-grid-columns-xxl: 5;
```

## Accessibility

The MasonryGrid component is built with accessibility in mind:

- It uses semantic HTML elements
- It maintains proper focus management
- It ensures content is readable at various screen sizes

## Browser Support

The MasonryGrid component uses CSS Grid, which is supported in all modern browsers. For older browsers, it will gracefully degrade to a single-column layout.
