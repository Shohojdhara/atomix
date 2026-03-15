# Responsive Layout Guidelines with Atomix Components

This guide explains how to create responsive, accessible, and performant layouts using Atomix Components utility classes and design system patterns.

## 📱 Mobile-First Strategy

Atomix follows a **mobile-first** approach. This means styles are written for mobile devices first and then enhanced for larger screens using `min-width` media queries.

- **Start Small**: Design and implement the mobile view first.
- **Enhance Gradually**: Use responsive utility classes to adjust layouts as the viewport grows.
- **Maintain Consistency**: Ensure that spacing, typography, and alignment remain consistent across breakpoints.

---

## 🎯 Breakpoint Management

Atomix provides six default breakpoints to handle various screen sizes. These are consistent across both CSS utilities and React components.

| Breakpoint | Prefix | Min Width | Typical Device |
|------------|--------|-----------|----------------|
| Extra Small| `xs`   | `0px`     | Small phones   |
| Small      | `sm`   | `576px`   | Large phones   |
| Medium     | `md`   | `768px`   | Tablets        |
| Large      | `lg`   | `992px`   | Laptops        |
| Extra Large| `xl`   | `1200px`  | Desktops       |
| 2XL        | `xxl`  | `1440px`  | Large screens  |

### Media Query Usage (SCSS)

```scss
@use 'atomix/styles/tools/breakpoints' as *;

.my-element {
  // Mobile styles (xs)
  padding: 1rem;

  // Tablet styles and up (md)
  @include media-breakpoint-up(md) {
    padding: 2rem;
  }

  // Desktop styles and up (lg)
  @include media-breakpoint-up(lg) {
    padding: 3rem;
  }
}
```

---

## 🛠️ Responsive Utility Classes

Atomix utilities follow a predictable naming convention:
`.u-{property}-{breakpoint}-{value}`

### 1. Spacing Utilities

Responsive spacing allows you to adjust margins and padding for different screen sizes.

| Property | Description |
|----------|-------------|
| `m`      | Margin (all sides) |
| `mt`, `mb`, `ms`, `me` | Margin Top, Bottom, Start (Left), End (Right) |
| `mx`, `my` | Margin Horizontal (Left/Right), Vertical (Top/Bottom) |
| `p`      | Padding (all sides) |
| `pt`, `pb`, `ps`, `pe` | Padding Top, Bottom, Start (Left), End (Right) |
| `px`, `py` | Padding Horizontal (Left/Right), Vertical (Top/Bottom) |

**Examples:**
- `.u-m-4`: Margin 1rem on all sides (all screen sizes).
- `.u-p-md-6`: Padding 1.5rem on all sides starting from `md` (768px) and up.
- `.u-mb-sm-2 u-mb-lg-4`: Margin bottom 0.5rem on `sm` and up, then 1rem on `lg` and up.

### 2. Typography Utilities

Adjust text alignment and visibility responsively.

- `.u-text-center`, `.u-text-md-left`, `.u-text-lg-right`
- `.u-text-nowrap`, `.u-text-md-wrap`

### 3. Layout & Flexbox Utilities

Control display and flex behavior across breakpoints.

- **Display**: `.u-none`, `.u-md-block`, `.u-lg-flex`.
- **Flex Direction**: `.u-flex-column`, `.u-flex-md-row`.
- **Justify Content**: `.u-justify-center`, `.u-justify-lg-between`.
- **Align Items**: `.u-items-center`, `.u-items-md-start`.
- **Positioning**: `.u-relative`, `.u-absolute`, `.u-top-md-0`, `.u-start-lg-50`.

### 4. Grid Utilities

Control grid columns and gaps responsively.

- **Grid Columns**: `.u-grid-cols-1`, `.u-grid-cols-md-2`, `.u-grid-cols-lg-4`.
- **Gap**: `.u-gap-2`, `.u-gap-md-4`.
- **Row/Column Gap**: `.u-row-gap-md-2`, `.u-column-gap-lg-4`.

### 5. Advanced Typography Utilities

In addition to alignment, you can control font size and line height. Note that font sizes in Atomix use RFS (Responsive Font Size) to scale automatically, so they do not require responsive breakpoint prefixes.

- **Font Size**: `.u-text-xs`, `.u-text-sm`, `.u-text-base`, `.u-text-lg`, `.u-text-xl`, `.u-text-2xl`.
- **Font Weight**: `.u-font-normal`, `.u-font-md-bold`.
- **Line Height**: `.u-leading-tight`, `.u-leading-md-normal`.

---

## 🏗️ Responsive Layout Patterns

### 1. Sidebar Layout (Responsive)

A common pattern for documentation or admin dashboards.

```jsx
import { Container, Grid, GridCol } from '@shohojdhara/atomix';

function ResponsiveSidebar({ sidebar, content }) {
  return (
    <Container>
      <Grid>
        {/* Sidebar - Hidden on mobile, visible on lg+ */}
        <GridCol xs={12} lg={3} className="u-none u-lg-block">
          <aside>{sidebar}</aside>
        </GridCol>
        
        {/* Main Content - Full width on mobile, 9/12 on lg+ */}
        <GridCol xs={12} lg={9}>
          <main>{content}</main>
        </GridCol>
      </Grid>
    </Container>
  );
}
```

### 2. Holy Grail Layout

Header, Footer, and three columns that stack on mobile.

```jsx
<Container type="fluid">
  <Row>
    <GridCol xs={12}><Header /></GridCol>
  </Row>
  <Row>
    <GridCol xs={12} lg={3}><LeftSidebar /></GridCol>
    <GridCol xs={12} lg={6}><MainContent /></GridCol>
    <GridCol xs={12} lg={3}><RightSidebar /></GridCol>
  </Row>
  <Row>
    <GridCol xs={12}><Footer /></GridCol>
  </Row>
</Container>
```

---

## ♿ Accessibility Considerations

Responsive layouts must remain accessible across all devices.

- **Visual Hidden**: Use `.u-visually-hidden` to hide elements from visual display while keeping them available for screen readers. Useful for mobile-only labels.
- **Touch Targets**: Ensure buttons and links have a minimum touch target size of 44x44px on mobile.
- **Focus States**: Never remove focus outlines; ensure they are visible on all screen sizes.
- **Logical Order**: Maintain a logical DOM order, especially when using flex-direction or grid-area to reorder elements visually.

---

## ⚡ Performance Optimization

- **Minimize DOM Nesting**: Keep the HTML structure shallow to reduce layout recalculation costs.
- **CSS-First**: Prefer CSS utilities over JavaScript-based responsive logic for initial paint performance.
- **Lazy Loading**: Use responsive images (e.g., `<picture>` or `srcset`) to serve smaller assets to mobile devices.
- **Throttling**: If using JavaScript for responsive behavior (e.g., resize listeners), always use throttling or `ResizeObserver` for better performance.

---

## 🧪 Testing Requirements

Verify responsive behavior across the following:

1. **Devices**:
   - iOS (Safari/Chrome)
   - Android (Chrome/Samsung Internet)
   - Desktop (Chrome, Firefox, Safari, Edge)
2. **Viewports**:
   - Mobile: 320px, 375px, 414px
   - Tablet: 768px, 1024px
   - Desktop: 1200px, 1440px, 1920px
3. **Orientation**:
   - Test both Portrait and Landscape on mobile/tablet.

---

## 🔍 Troubleshooting

- **Overflow Issues**: Check for fixed-width elements that might be wider than the viewport. Use `u-max-w-100` to ensure images/containers don't overflow.
- **Specificity Conflicts**: If a utility isn't applying, ensure it's not being overridden by a more specific CSS selector.
- **Breakpoint Gaps**: Ensure you're using `min-width` (up) or `max-width` (down) consistently to avoid "dead zones" between breakpoints.
- **Flexbox Alignment**: Remember that `justify-content` and `align-items` depend on the `flex-direction`.
