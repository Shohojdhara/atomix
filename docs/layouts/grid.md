# Grid System

The Atomix Grid System provides a powerful, flexible, and responsive layout solution built on modern CSS Grid and Flexbox technologies. It offers a complete set of components for creating any layout from simple columns to complex dashboard interfaces.

## Overview

The Grid System is based on a 12-column layout with responsive breakpoints and flexible alignment options. It follows the ITCSS architecture and uses semantic class names for maximum clarity and maintainability.

### Key Features

- **📐 12-Column System** - Flexible column-based layouts
- **📱 Mobile-First** - Responsive design with 6 breakpoints
- **🎯 Semantic Classes** - Clear, predictable class names
- **⚡ Flexbox & CSS Grid** - Modern CSS technologies
- **♿ Accessible** - WCAG 2.1 AA compliant
- **🎨 Customizable** - CSS custom properties and SCSS variables

## Installation

```bash
npm install @shohojdhara/atomix
```

### Import Components

```jsx
import { Container, Grid, Row, GridCol } from '@shohojdhara/atomix';
```

### Import Styles

```css
@import '@shohojdhara/atomix/css';
```

Or import specific grid styles:

```scss
@use '@shohojdhara/atomix/styles/objects/container';
@use '@shohojdhara/atomix/styles/objects/grid';
```

## Components

### Container

The Container component provides responsive max-widths and centering for your content.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Content to be contained |
| `className` | `string` | `''` | Additional CSS classes |
| `type` | `ContainerType` | - | Container width behavior |

#### Container Types

| Type | Class | Behavior |
|------|-------|----------|
| `undefined` | `o-container` | Responsive max-widths at each breakpoint |
| `'fluid'` | `o-container-fluid` | Full width (100%) at all breakpoints |
| `'sm'` | `o-container-sm` | Max-width only at sm breakpoint and up |
| `'md'` | `o-container-md` | Max-width only at md breakpoint and up |
| `'lg'` | `o-container-lg` | Max-width only at lg breakpoint and up |
| `'xl'` | `o-container-xl` | Max-width only at xl breakpoint and up |
| `'xxl'` | `o-container-xxl` | Max-width only at xxl breakpoint and up |

#### Examples

```jsx
// Default responsive container
<Container>
  <p>Content with responsive max-widths</p>
</Container>

// Full width container
<Container type="fluid">
  <p>Full width content</p>
</Container>

// Container with max-width from medium breakpoint up
<Container type="md">
  <p>Constrained from md breakpoint up</p>
</Container>
```

#### HTML/CSS

```html
<!-- Default responsive container -->
<div class="o-container">
  <p>Content with responsive max-widths</p>
</div>

<!-- Full width container -->
<div class="o-container-fluid">
  <p>Full width content</p>
</div>

<!-- Container with max-width from medium breakpoint up -->
<div class="o-container-md">
  <p>Constrained from md breakpoint up</p>
</div>
```

### Grid

The Grid component creates a flex container for organizing columns with optional alignment controls.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** GridCol components |
| `className` | `string` | `''` | Additional CSS classes |
| `justifyContent` | `JustifyContent` | - | Horizontal alignment of columns |
| `alignItems` | `AlignItems` | - | Vertical alignment of columns |
| `noGutters` | `boolean` | `false` | Remove spacing between columns |

#### Alignment Options

**Justify Content (Horizontal)**
- `'start'` - Align to start of container
- `'end'` - Align to end of container
- `'center'` - Center align
- `'between'` - Space between columns
- `'around'` - Space around columns
- `'evenly'` - Even space distribution

**Align Items (Vertical)**
- `'start'` - Align to top
- `'end'` - Align to bottom
- `'center'` - Center vertically
- `'baseline'` - Align to text baseline
- `'stretch'` - Stretch to fill height

#### Examples

```jsx
// Basic grid
<Grid>
  <GridCol xs={12} md={6}>Column 1</GridCol>
  <GridCol xs={12} md={6}>Column 2</GridCol>
</Grid>

// Grid with alignment
<Grid justifyContent="between" alignItems="center">
  <GridCol xs={12} md={6}>Left Column</GridCol>
  <GridCol xs={12} md={6}>Right Column</GridCol>
</Grid>

// Grid without gutters
<Grid noGutters>
  <GridCol xs={6}>No gutter left</GridCol>
  <GridCol xs={6}>No gutter right</GridCol>
</Grid>
```

#### HTML/CSS

```html
<!-- Basic grid -->
<div class="o-grid">
  <div class="o-grid__col o-grid__col--12 o-grid__col--md-6">Column 1</div>
  <div class="o-grid__col o-grid__col--12 o-grid__col--md-6">Column 2</div>
</div>

<!-- Grid with alignment -->
<div class="o-grid u-justify-between u-items-center">
  <div class="o-grid__col o-grid__col--12 o-grid__col--md-6">Left Column</div>
  <div class="o-grid__col o-grid__col--12 o-grid__col--md-6">Right Column</div>
</div>

<!-- Grid without gutters -->
<div class="o-grid o-grid--no-gutters">
  <div class="o-grid__col o-grid__col--6">No gutter left</div>
  <div class="o-grid__col o-grid__col--6">No gutter right</div>
</div>
```

### Row

The Row component is identical to Grid but semantically represents a row within a Container. Use Row when you want to be explicit about creating rows within a container structure.

#### Props

Same as Grid component.

#### Examples

```jsx
<Container>
  <Row>
    <GridCol xs={12} md={8}>Main Content</GridCol>
    <GridCol xs={12} md={4}>Sidebar</GridCol>
  </Row>
  <Row>
    <GridCol xs={12}>Footer Content</GridCol>
  </Row>
</Container>
```

### GridCol

The GridCol component creates responsive columns with sizing and offset options.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Column content |
| `className` | `string` | `''` | Additional CSS classes |

#### Column Sizing

| Prop | Type | Description |
|------|------|-------------|
| `xs` | `number \| 'auto'` | Columns at xs breakpoint (0px+) |
| `sm` | `number \| 'auto'` | Columns at sm breakpoint (576px+) |
| `md` | `number \| 'auto'` | Columns at md breakpoint (768px+) |
| `lg` | `number \| 'auto'` | Columns at lg breakpoint (992px+) |
| `xl` | `number \| 'auto'` | Columns at xl breakpoint (1200px+) |
| `xxl` | `number \| 'auto'` | Columns at xxl breakpoint (1440px+) |

#### Column Offsets

| Prop | Type | Description |
|------|------|-------------|
| `offsetXs` | `number` | Offset columns at xs breakpoint |
| `offsetSm` | `number` | Offset columns at sm breakpoint |
| `offsetMd` | `number` | Offset columns at md breakpoint |
| `offsetLg` | `number` | Offset columns at lg breakpoint |
| `offsetXl` | `number` | Offset columns at xl breakpoint |
| `offsetXxl` | `number` | Offset columns at xxl breakpoint |

#### Examples

```jsx
// Basic responsive columns
<Grid>
  <GridCol xs={12} sm={6} md={4} lg={3}>
    Quarter on large screens, half on small screens, full on mobile
  </GridCol>
  <GridCol xs={12} sm={6} md={4} lg={3}>
    Quarter on large screens, half on small screens, full on mobile
  </GridCol>
  <GridCol xs={12} sm={6} md={4} lg={3}>
    Quarter on large screens, half on small screens, full on mobile
  </GridCol>
  <GridCol xs={12} sm={6} md={4} lg={3}>
    Quarter on large screens, half on small screens, full on mobile
  </GridCol>
</Grid>

// Auto-sizing columns
<Grid>
  <GridCol xs="auto">Auto width based on content</GridCol>
  <GridCol xs={6}>Fixed 6 columns</GridCol>
  <GridCol xs="auto">Auto width based on content</GridCol>
</Grid>

// Columns with offsets
<Grid>
  <GridCol xs={8} offsetXs={2}>
    Centered column with 2-column offset on each side
  </GridCol>
</Grid>

// Complex responsive behavior
<Grid>
  <GridCol
    xs={12}
    sm={6}
    md={4}
    lg={3}
    offsetMd={2}
    offsetLg={0}
  >
    Complex responsive column
  </GridCol>
</Grid>
```

#### HTML/CSS

```html
<!-- Basic responsive columns -->
<div class="o-grid">
  <div class="o-grid__col o-grid__col--12 o-grid__col--sm-6 o-grid__col--md-4 o-grid__col--lg-3">
    Quarter on large screens, half on small screens, full on mobile
  </div>
</div>

<!-- Auto-sizing columns -->
<div class="o-grid">
  <div class="o-grid__col o-grid__col--auto">Auto width based on content</div>
  <div class="o-grid__col o-grid__col--6">Fixed 6 columns</div>
  <div class="o-grid__col o-grid__col--auto">Auto width based on content</div>
</div>

<!-- Columns with offsets -->
<div class="o-grid">
  <div class="o-grid__col o-grid__col--8 o-grid__offset--2">
    Centered column with 2-column offset on each side
  </div>
</div>
```

## Responsive Breakpoints

The grid system uses six responsive breakpoints:

| Breakpoint | Min Width | Container Max Width | Description |
|------------|-----------|-------------------|-------------|
| `xs` | 0px | None (auto) | Extra small devices |
| `sm` | 576px | 540px | Small devices (landscape phones) |
| `md` | 768px | 720px | Medium devices (tablets) |
| `lg` | 992px | 960px | Large devices (desktops) |
| `xl` | 1200px | 1140px | Extra large devices |
| `xxl` | 1440px | 1320px | Extra extra large devices |

### Breakpoint Behavior

- **Mobile First**: Design for the smallest screen first, then scale up
- **Progressive Enhancement**: Each breakpoint builds upon the previous one
- **Flexible**: Mix and match breakpoints for complex layouts

## Layout Examples

### Two-Column Layout

```jsx
<Container>
  <Grid>
    <GridCol xs={12} md={8}>
      <main>
        <h1>Main Content Area</h1>
        <p>This is the primary content area...</p>
      </main>
    </GridCol>
    <GridCol xs={12} md={4}>
      <aside>
        <h2>Sidebar</h2>
        <p>This is the sidebar content...</p>
      </aside>
    </GridCol>
  </Grid>
</Container>
```

### Three-Column Layout

```jsx
<Container>
  <Grid>
    <GridCol xs={12} lg={3}>
      <nav>Navigation</nav>
    </GridCol>
    <GridCol xs={12} lg={6}>
      <main>Main Content</main>
    </GridCol>
    <GridCol xs={12} lg={3}>
      <aside>Sidebar</aside>
    </GridCol>
  </Grid>
</Container>
```

### Dashboard Layout

```jsx
<Container type="fluid">
  <Grid>
    {/* Header */}
    <GridCol xs={12}>
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
    </GridCol>

    {/* Sidebar */}
    <GridCol xs={12} lg={3}>
      <nav className="dashboard-nav">
        <ul>
          <li>Overview</li>
          <li>Analytics</li>
          <li>Reports</li>
        </ul>
      </nav>
    </GridCol>

    {/* Main Content */}
    <GridCol xs={12} lg={9}>
      <main className="dashboard-main">
        <Grid>
          <GridCol xs={12} xl={8}>
            <section>Charts and Graphs</section>
          </GridCol>
          <GridCol xs={12} xl={4}>
            <section>Quick Stats</section>
          </GridCol>
        </Grid>
      </main>
    </GridCol>
  </Grid>
</Container>
```

### Card Grid

```jsx
<Container>
  <Grid>
    {cards.map((card, index) => (
      <GridCol key={index} xs={12} sm={6} lg={4} xl={3}>
        <div className="card">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      </GridCol>
    ))}
  </Grid>
</Container>
```

### Hero Section with Centered Content

```jsx
<Container>
  <Grid justifyContent="center" alignItems="center" style={{ minHeight: '50vh' }}>
    <GridCol xs={12} md={8} lg={6}>
      <div className="text-center">
        <h1>Welcome to Our Platform</h1>
        <p>Build amazing experiences with our design system.</p>
        <button>Get Started</button>
      </div>
    </GridCol>
  </Grid>
</Container>
```

### Form Layout

```jsx
<Container>
  <Grid>
    <GridCol xs={12} md={8} offsetMd={2}>
      <form>
        <Grid>
          <GridCol xs={12} sm={6}>
            <input type="text" placeholder="First Name" />
          </GridCol>
          <GridCol xs={12} sm={6}>
            <input type="text" placeholder="Last Name" />
          </GridCol>
          <GridCol xs={12}>
            <input type="email" placeholder="Email Address" />
          </GridCol>
          <GridCol xs={12}>
            <textarea placeholder="Message"></textarea>
          </GridCol>
          <GridCol xs={12} sm={6} offsetSm={3}>
            <button type="submit">Submit</button>
          </GridCol>
        </Grid>
      </form>
    </GridCol>
  </Grid>
</Container>
```

## Advanced Usage

### Nested Grids

You can nest Grid components for complex layouts:

```jsx
<Container>
  <Grid>
    <GridCol xs={12} md={8}>
      <h2>Main Section</h2>
      <Grid>
        <GridCol xs={12} lg={6}>
          <p>Nested column 1</p>
        </GridCol>
        <GridCol xs={12} lg={6}>
          <p>Nested column 2</p>
        </GridCol>
      </Grid>
    </GridCol>
    <GridCol xs={12} md={4}>
      <aside>Sidebar</aside>
    </GridCol>
  </Grid>
</Container>
```

### Mixed Column Sizes

```jsx
<Grid>
  <GridCol xs={12}>Full width on mobile</GridCol>
  <GridCol xs={6}>Half width on mobile</GridCol>
  <GridCol xs={6}>Half width on mobile</GridCol>
  <GridCol xs={4}>Third width on mobile</GridCol>
  <GridCol xs={4}>Third width on mobile</GridCol>
  <GridCol xs={4}>Third width on mobile</GridCol>
</Grid>
```

### Variable Width Content

```jsx
<Grid>
  <GridCol xs="auto">
    <img src="logo.png" alt="Logo" />
  </GridCol>
  <GridCol xs>
    <h1>Flexible width title that takes remaining space</h1>
  </GridCol>
  <GridCol xs="auto">
    <button>Action</button>
  </GridCol>
</Grid>
```

## Customization

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

  /* Grid columns */
  --atomix-grid-columns: 12;
}
```

### SCSS Variables

```scss
// Container breakpoints and max-widths
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px
) !default;

// Grid configuration
$grid-columns: 12 !default;
$grid-gutter-width: 1.5rem !default;
$grid-row-columns: 6 !default;

// Enable/disable grid classes
$enable-grid-classes: true !default;
$enable-container-classes: true !default;
```

### Custom Container Sizes

```scss
@use '@shohojdhara/atomix/styles' with (
  $container-max-widths: (
    sm: 600px,
    md: 800px,
    lg: 1000px,
    xl: 1200px,
    xxl: 1400px
  )
);
```

### Custom Grid Gutters

```css
.custom-grid {
  --atomix-grid-gutter-width: 2rem;
}

.no-gutters-mobile {
  --atomix-grid-gutter-width: 0;
}

@media (min-width: 768px) {
  .no-gutters-mobile {
    --atomix-grid-gutter-width: 1.5rem;
  }
}
```

## Accessibility

The Grid System follows WCAG 2.1 AA accessibility guidelines:

### Semantic HTML

```jsx
// Use semantic HTML elements
<Container>
  <Grid>
    <GridCol xs={12} md={8}>
      <main>
        <h1>Main Content</h1>
        <article>Article content...</article>
      </main>
    </GridCol>
    <GridCol xs={12} md={4}>
      <aside>
        <nav>
          <h2>Navigation</h2>
          <ul>...</ul>
        </nav>
      </aside>
    </GridCol>
  </Grid>
</Container>
```

### Screen Reader Support

- Grid components use proper semantic markup
- Content maintains logical reading order
- No layout-specific ARIA attributes needed

### Keyboard Navigation

- Layout doesn't interfere with natural tab order
- Focus management remains with content elements
- No keyboard traps created by layout structure

### Responsive Design

- Mobile-first approach ensures baseline accessibility
- Content remains usable at all screen sizes
- Supports zoom up to 200% without horizontal scrolling

## Performance

### Optimization Tips

1. **Use Appropriate Container Types**
   ```jsx
   // For full-width sections
   <Container type="fluid">

   // For content-focused sections
   <Container>
   ```

2. **Minimize Nested Grids**
   ```jsx
   // Better: Use offsets instead of nesting when possible
   <GridCol xs={8} offsetXs={2}>Content</GridCol>

   // Instead of:
   <GridCol xs={12}>
     <Grid>
       <GridCol xs={8} offsetXs={2}>Content</GridCol>
     </Grid>
   </GridCol>
   ```

3. **Use Semantic Elements**
   ```jsx
   // Good: Semantic and accessible
   <Container as="section">
     <Grid as="div">
       <GridCol xs={12} as="header">
         <h1>Page Title</h1>
       </GridCol>
     </Grid>
   </Container>
   ```

### Bundle Size

- Base grid CSS: ~2KB gzipped
- Component JavaScript: ~1KB gzipped
- Full grid system: ~3KB gzipped total

## Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+

### Fallbacks

The grid system uses progressive enhancement:

1. **Flexbox** - Primary layout method
2. **CSS Grid** - Enhanced alignment and spacing
3. **Float** - Legacy fallback (if needed)

## Migration Guide

### From Bootstrap

```jsx
// Bootstrap
<div className="container">
  <div className="row">
    <div className="col-md-8">Main</div>
    <div className="col-md-4">Sidebar</div>
  </div>
</div>

// Atomix
<Container>
  <Grid>
    <GridCol md={8}>Main</GridCol>
    <GridCol md={4}>Sidebar</GridCol>
  </Grid>
</Container>
```

### From CSS Grid

```jsx
// CSS Grid
<div className="grid-container">
  <div className="main">Main</div>
  <div className="sidebar">Sidebar</div>
</div>

// Atomix Grid
<Container>
  <Grid>
    <GridCol xs={12} md={8}>Main</GridCol>
    <GridCol xs={12} md={4}>Sidebar</GridCol>
  </Grid>
</Container>
```

## Troubleshooting

### Common Issues

1. **Columns Not Wrapping**
   ```jsx
   // Problem: Missing Grid wrapper
   <Container>
     <GridCol xs={6}>Column 1</GridCol>
     <GridCol xs={6}>Column 2</GridCol>
   </Container>

   // Solution: Add Grid wrapper
   <Container>
     <Grid>
       <GridCol xs={6}>Column 1</GridCol>
       <GridCol xs={6}>Column 2</GridCol>
     </Grid>
   </Container>
   ```

2. **Unexpected Spacing**
   ```jsx
   // Problem: Custom margins conflicting with gutters
   <GridCol xs={6} className="my-custom-margin">

   // Solution: Use padding or nested elements
   <GridCol xs={6}>
     <div className="my-custom-margin">Content</div>
   </GridCol>
   ```

3. **Content Overflow**
   ```jsx
   // Problem: Fixed width content in flexible column
   <GridCol xs={12} md={6}>
     <div style={{ width: '800px' }}>Wide content</div>
   </GridCol>

   // Solution: Use max-width and overflow
   <GridCol xs={12} md={6}>
     <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
       Wide content
     </div>
   </GridCol>
   ```

## Related Components

- **[Container](./grid.md#container)** - Responsive content containers
- **[MasonryGrid](./masonry-grid.md)** - Pinterest-style grid layouts
- **[Card](../components/card.md)** - Content cards for grid layouts
- **[Navigation](../components/navigation.md)** - Navigation components

---

**Next Steps**: Explore the [Masonry Grid documentation](./masonry-grid.md) for Pinterest-style layouts, or check out [Responsive Design Patterns](./responsive-patterns.md) for common layout solutions.
