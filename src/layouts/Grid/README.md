# Grid System

A responsive grid system for Atomix based on the CSS grid classes defined in `_objects.grid.scss` and `_objects.container.scss`.

## Components

### Grid

The main container that creates a flex row layout. It can also be used with alignment options.

```tsx
import { Grid, GridCol } from '@/layouts/Grid';

<Grid>
  <GridCol xs={12} md={6} lg={4}>Column content</GridCol>
  <GridCol xs={12} md={6} lg={4}>Column content</GridCol>
  <GridCol xs={12} md={6} lg={4}>Column content</GridCol>
</Grid>

// With alignment options
<Grid justifyContent="between" alignItems="center">
  <GridCol xs={12} md={6}>Column content</GridCol>
  <GridCol xs={12} md={6}>Column content</GridCol>
</Grid>
```

#### Props

- `justifyContent`: Control horizontal alignment ('start', 'end', 'center', 'between', 'around', 'evenly')
  - Adds utility class `u-justify-content-[value]`
- `alignItems`: Control vertical alignment ('start', 'end', 'center', 'baseline', 'stretch')
  - Adds utility class `u-align-items-[value]`
- `noGutters`: Remove gutters between columns
  - Adds modifier class `o-grid--no-gutters`

### GridCol

Column component with responsive sizing options.

#### Props

- `xs`, `sm`, `md`, `lg`, `xl`, `xxl`: Number of columns to span at each breakpoint (1-12) or 'auto'
  - Adds classes like `o-grid__col-[number]` (for xs) or `o-grid__col--sm-[number]` (for other breakpoints)
- `offsetXs`, `offsetSm`, `offsetMd`, `offsetLg`, `offsetXl`, `offsetXxl`: Column offset at each breakpoint
  - Adds classes like `o-grid__offset-[number]` (for xs) or `o-grid__offset--sm-[number]` (for other breakpoints)

### Container

Container component with various width options.

```tsx
import { Container } from '@/layouts/Grid';

// Default responsive container
<Container>Content</Container>

// Full width container
<Container type="fluid">Content</Container>

// Container with max-width at specific breakpoint
<Container type="md">Content</Container>
```

#### Props

- `type`: Container type
  - `undefined`: responsive container with max-width at each breakpoint (`o-container` class)
  - `'fluid'`: full width container (`o-container-fluid` class)
  - `'sm'`, `'md'`, `'lg'`, `'xl'`, `'xxl'`: responsive container with max-width at specified breakpoint (`o-container-[breakpoint]` class)

### Row

A specialized component for creating rows within a Container. It has the same alignment options as Grid.

```tsx
import { Container, Row, GridCol } from '@/layouts/Grid';

<Container>
  <Row justifyContent="between" alignItems="center">
    <GridCol xs={12} md={6}>Column content</GridCol>
    <GridCol xs={12} md={6}>Column content</GridCol>
  </Row>
</Container>
```

#### Props

- `justifyContent`: Control horizontal alignment ('start', 'end', 'center', 'between', 'around', 'evenly')
  - Adds utility class `u-justify-content-[value]`
- `alignItems`: Control vertical alignment ('start', 'end', 'center', 'baseline', 'stretch')
  - Adds utility class `u-align-items-[value]`
- `noGutters`: Remove gutters between columns
  - Adds modifier class `o-grid--no-gutters`

## Breakpoints

The grid system uses the following breakpoints:

- `xs`: 0px and up
- `sm`: 576px and up
- `md`: 768px and up
- `lg`: 992px and up
- `xl`: 1200px and up
- `xxl`: 1440px and up

## Examples

See `Grid.stories.tsx` for usage examples.
