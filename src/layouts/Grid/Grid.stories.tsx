import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Container } from './Container';
import { Grid } from './Grid';
import { GridCol } from './GridCol';
import { Row } from './Row';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Callout } from '../../components/Callout';

const meta: Meta<typeof Grid> = {
  title: 'Layouts/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive grid system for creating flexible layouts. Based on a 12-column system with responsive breakpoints.',
      },
    },
  },
  decorators: [
    Story => (
      <div className="u-p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Modern demo components with better visual hierarchy using Atomix components
const DemoCard: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  height?: 'auto' | 'sm' | 'md' | 'lg';
}> = ({ children, variant = 'primary', height = 'auto' }) => {
  const heightStyles = {
    auto: undefined,
    sm: '80px',
    md: '120px',
    lg: '160px',
  };

  const variantMap = {
    primary: { cardVariant: 'default' as const, badgeVariant: 'primary' as const },
    secondary: { cardVariant: 'success' as const, badgeVariant: 'success' as const },
    accent: { cardVariant: 'info' as const, badgeVariant: 'info' as const },
  };

  const { cardVariant, badgeVariant } = variantMap[variant];

  return (
    <Card
      className={`u-h-100 ${variant === 'primary' ? 'u-bg-brand-subtle' : ''} ${
        variant === 'secondary' ? 'u-bg-success-subtle' : ''
      } ${variant === 'accent' ? 'u-bg-info-subtle' : ''}`}
    >
      <div className="u-flex u-flex-column u-h-100" style={{ minHeight: heightStyles[height] }}>
        <div className="u-flex-grow-1 u-flex u-items-center u-justify-center">
          <div className="u-text-center">{children}</div>
        </div>
      </div>
    </Card>
  );
};

const CodeSnippet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Card className="u-mb-4">
    <pre
      className="u-bg-dark u-text-light u-p-3 u-rounded u-text-sm u-font-normal u-overflow-auto"
      style={{ fontFamily: 'monospace' }}
    >
      {children}
    </pre>
  </Card>
);

/**
 * ## Getting Started
 *
 * The Grid system uses a 12-column layout with responsive breakpoints.
 * Start with these basic examples to understand the fundamentals.
 */
export const GettingStarted: Story = {
  render: () => (
    <div className="u-mb-8">
      <div className="u-mb-6">
        <h1 className="u-mb-3 u-text-brand-emphasis">Grid System</h1>
        <p className="u-mb-4 u-text-secondary-emphasis u-text-lg">
          A responsive 12-column grid system for creating flexible layouts.
        </p>
        <Callout variant="info" className="u-mb-4">
          Resize your browser window to see how the columns adapt to different screen sizes.
        </Callout>
      </div>

      <h2 className="u-mb-4 u-text-brand-emphasis u-border-bottom u-pb-2">Basic Grid Layout</h2>
      <p className="u-mb-4 u-text-secondary-emphasis">
        Equal columns that stack on mobile and expand on larger screens:
      </p>

      <Grid className="u-mb-4">
        <GridCol xs={12} md={4}>
          <DemoCard>Column 1</DemoCard>
        </GridCol>
        <GridCol xs={12} md={4}>
          <DemoCard>Column 2</DemoCard>
        </GridCol>
        <GridCol xs={12} md={4}>
          <DemoCard>Column 3</DemoCard>
        </GridCol>
      </Grid>

      <CodeSnippet>
        {`<Grid>
  <GridCol xs={12} md={4}>Column 1</GridCol>
  <GridCol xs={12} md={4}>Column 2</GridCol>
  <GridCol xs={12} md={4}>Column 3</GridCol>
</Grid>`}
      </CodeSnippet>

      <div className="u-mt-6">
        <h3 className="u-mb-4 u-text-brand-emphasis">Responsive Behavior</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Columns automatically adjust at different screen sizes:
        </p>

        <Grid className="u-mb-4">
          <GridCol xs={12} sm={6} md={4} lg={3}>
            <DemoCard variant="secondary">
              <div>Mobile: Full width</div>
              <div>Tablet: Half width</div>
              <div>Desktop: 1/3 width</div>
              <div>Large: 1/4 width</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} md={4} lg={3}>
            <DemoCard variant="secondary">Responsive</DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} md={4} lg={3}>
            <DemoCard variant="secondary">Columns</DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} md={4} lg={3}>
            <DemoCard variant="secondary">Example</DemoCard>
          </GridCol>
        </Grid>

        <CodeSnippet>
          {`<GridCol xs={12} sm={6} md={4} lg={3}>
  Responsive column
</GridCol>`}
        </CodeSnippet>
      </div>
    </div>
  ),
};

/**
 * ## Layout Patterns
 *
 * Common layout patterns for real-world applications.
 */
export const LayoutPatterns: Story = {
  render: () => (
    <div className="u-mb-8">
      <h1 className="u-mb-6 u-text-brand-emphasis u-border-bottom u-pb-2">
        Common Layout Patterns
      </h1>

      {/* Sidebar Layout */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Sidebar Layout</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Perfect for dashboards and admin interfaces:
        </p>

        <Grid className="u-mb-4">
          <GridCol xs={12} md={3}>
            <DemoCard variant="accent" height="lg">
              <div className="u-text-lg u-font-bold">Sidebar</div>
              <div className="u-text-sm u-mt-2">Navigation, filters, etc.</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} md={9}>
            <DemoCard height="lg">
              <div className="u-text-lg u-font-bold">Main Content</div>
              <div className="u-text-sm u-mt-2">Primary content area</div>
            </DemoCard>
          </GridCol>
        </Grid>

        <Card className="u-mb-6">
          <div className="u-flex u-flex-wrap u-gap-2">
            <Button variant="primary">Save Changes</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </Card>
      </div>

      {/* Hero + Features */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Hero + Features</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Landing page layout with hero section and feature cards:
        </p>

        <Grid className="u-mb-4">
          <GridCol xs={12}>
            <DemoCard variant="accent" height="md">
              <div className="u-text-lg u-font-bold">Hero Section</div>
              <div className="u-text-sm u-mt-2">Full-width banner</div>
            </DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-4">
          <GridCol xs={12} sm={6} lg={4}>
            <DemoCard variant="secondary">
              <div className="u-text-md u-font-bold">Feature 1</div>
              <div className="u-text-sm u-mt-2">Description of feature 1</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} lg={4}>
            <DemoCard variant="secondary">
              <div className="u-text-md u-font-bold">Feature 2</div>
              <div className="u-text-sm u-mt-2">Description of feature 2</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} sm={12} lg={4}>
            <DemoCard variant="secondary">
              <div className="u-text-md u-font-bold">Feature 3</div>
              <div className="u-text-sm u-mt-2">Description of feature 3</div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Article Layout */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Article Layout</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">Centered content with optional sidebar:</p>

        <Grid className="u-mb-4">
          <GridCol xs={12} md={8} offsetMd={2}>
            <DemoCard height="lg">
              <div className="u-text-lg u-font-bold">Article Content</div>
              <div className="u-text-sm u-text-secondary-emphasis u-mt-2">
                Centered, readable width
              </div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * ## Column Sizing
 *
 * Flexible column sizing options for different content needs.
 */
export const ColumnSizing: Story = {
  render: () => (
    <div className="u-mb-8">
      <h1 className="u-mb-6 u-text-brand-emphasis u-border-bottom u-pb-2">Column Sizing Options</h1>

      {/* Fixed Sizes */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Fixed Column Sizes</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">Specify exact column widths (1-12):</p>

        <Grid className="u-mb-4">
          <GridCol xs={2}>
            <DemoCard variant="secondary">2 cols</DemoCard>
          </GridCol>
          <GridCol xs={10}>
            <DemoCard>10 cols</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-4">
          <GridCol xs={4}>
            <DemoCard variant="secondary">4 cols</DemoCard>
          </GridCol>
          <GridCol xs={8}>
            <DemoCard>8 cols</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-4">
          <GridCol xs={6}>
            <DemoCard variant="secondary">6 cols</DemoCard>
          </GridCol>
          <GridCol xs={6}>
            <DemoCard>6 cols</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Auto Sizing */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Auto-Sizing Columns</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Columns that automatically size based on content:
        </p>

        <Grid className="u-mb-4">
          <GridCol>
            <DemoCard variant="accent">Auto</DemoCard>
          </GridCol>
          <GridCol>
            <DemoCard variant="accent">Auto Width</DemoCard>
          </GridCol>
          <GridCol>
            <DemoCard variant="accent">Auto</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-4">
          <GridCol xs={4}>
            <DemoCard variant="secondary">Fixed (4 cols)</DemoCard>
          </GridCol>
          <GridCol>
            <DemoCard variant="accent">Auto (fills remaining)</DemoCard>
          </GridCol>
          <GridCol>
            <DemoCard variant="accent">Auto</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Mixed Sizes */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Mixed Sizing</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Combine fixed and auto sizing for flexible layouts:
        </p>

        <Grid className="u-mb-4">
          <GridCol xs={12} sm={6} md={4} lg="auto">
            <DemoCard variant="secondary">
              <div>Responsive</div>
              <div className="u-text-sm u-mt-2">xs=12, sm=6, md=4, lg=auto</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} md={4} lg="auto">
            <DemoCard variant="secondary">
              <div>Responsive</div>
              <div className="u-text-sm u-mt-2">xs=12, sm=6, md=4, lg=auto</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} sm={12} md={4} lg="auto">
            <DemoCard variant="secondary">
              <div>Responsive</div>
              <div className="u-text-sm u-mt-2">xs=12, sm=12, md=4, lg=auto</div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * ## Column Offsets
 *
 * Create spacing and alignment using column offsets.
 */
export const ColumnOffsets: Story = {
  render: () => (
    <div className="u-mb-8">
      <h1 className="u-mb-6 u-text-brand-emphasis u-border-bottom u-pb-2">Column Offsets</h1>

      {/* Basic Offsets */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Basic Offsets</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">Push columns to the right using offsets:</p>

        <Grid className="u-mb-4">
          <GridCol xs={4}>
            <DemoCard variant="secondary">4 columns</DemoCard>
          </GridCol>
          <GridCol xs={4} offsetXs={4}>
            <DemoCard>4 columns, offset 4</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-4">
          <GridCol xs={3} offsetXs={3}>
            <DemoCard variant="secondary">3 cols, offset 3</DemoCard>
          </GridCol>
          <GridCol xs={3} offsetXs={3}>
            <DemoCard>3 cols, offset 3</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Centering */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Centering Content</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">Center columns using equal offsets:</p>

        <Grid className="u-mb-4">
          <GridCol xs={6} offsetXs={3}>
            <DemoCard variant="accent">Centered (6 cols, offset 3)</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-4">
          <GridCol xs={8} offsetXs={2}>
            <DemoCard variant="accent">Centered (8 cols, offset 2)</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Responsive Offsets */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Responsive Offsets</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Different offsets at different screen sizes:
        </p>

        <Grid className="u-mb-4">
          <GridCol xs={12} sm={6} offsetSm={3} md={4} offsetMd={4} lg={3} offsetLg={3}>
            <DemoCard variant="secondary">
              <div className="u-text-md u-font-bold">Responsive Offsets</div>
              <div className="u-text-sm u-mt-2">Changes at each breakpoint</div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * ## Containers
 *
 * Container components for controlling max-width and centering content.
 */
export const Containers: Story = {
  render: () => (
    <div className="u-mb-8">
      <h1 className="u-mb-6 u-text-brand-emphasis u-border-bottom u-pb-2">Container Types</h1>

      {/* Default Container */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Default Container</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Responsive container with max-width at each breakpoint:
        </p>

        <Container className="u-mb-4">
          <DemoCard variant="accent" height="md">
            <div className="u-text-lg u-font-bold">Default Container</div>
            <div className="u-text-sm u-text-secondary-emphasis u-mt-2">
              Responsive max-width, centered
            </div>
          </DemoCard>
        </Container>
      </div>

      {/* Fluid Container */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Fluid Container</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Full-width container that spans the entire viewport:
        </p>

        <Container type="fluid" className="u-mb-4">
          <DemoCard variant="secondary" height="md">
            <div className="u-text-lg u-font-bold">Fluid Container</div>
            <div className="u-text-sm u-text-secondary-emphasis u-mt-2">Full viewport width</div>
          </DemoCard>
        </Container>
      </div>

      {/* Breakpoint Containers */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Breakpoint Containers</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Containers with max-width at specific breakpoints:
        </p>

        <div className="u-mb-4">
          <Callout variant="info" className="u-mb-4">
            Each container below has a different max-width based on its type.
          </Callout>
        </div>

        <Container type="sm" className="u-mb-4">
          <DemoCard variant="secondary">Small Container (max-width: sm)</DemoCard>
        </Container>

        <Container type="md" className="u-mb-4">
          <DemoCard variant="secondary">Medium Container (max-width: md)</DemoCard>
        </Container>

        <Container type="lg" className="u-mb-4">
          <DemoCard variant="secondary">Large Container (max-width: lg)</DemoCard>
        </Container>
      </div>

      {/* Container with Grid */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Container with Grid</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Combine containers with grids for structured layouts:
        </p>

        <Container className="u-mb-4">
          <Grid>
            <GridCol xs={12} md={4}>
              <DemoCard>Column 1</DemoCard>
            </GridCol>
            <GridCol xs={12} md={4}>
              <DemoCard>Column 2</DemoCard>
            </GridCol>
            <GridCol xs={12} md={4}>
              <DemoCard>Column 3</DemoCard>
            </GridCol>
          </Grid>
        </Container>
      </div>
    </div>
  ),
};

/**
 * ## Alignment & Spacing
 *
 * Control alignment and spacing within grids and rows.
 */
export const AlignmentAndSpacing: Story = {
  render: () => (
    <div className="u-mb-8">
      <h1 className="u-mb-6 u-text-brand-emphasis u-border-bottom u-pb-2">Alignment & Spacing</h1>

      {/* Horizontal Alignment */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Horizontal Alignment</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Control how columns are distributed horizontally:
        </p>

        <div className="u-mb-6">
          <h3 className="u-mb-3 u-text-secondary-emphasis u-font-medium">
            justify-content="start"
          </h3>
          <Row justifyContent="start" className="u-mb-4 u-p-3 u-bg-brand-subtle u-rounded">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-6">
          <h3 className="u-mb-3 u-text-secondary-emphasis u-font-medium">
            justify-content="center"
          </h3>
          <Row justifyContent="center" className="u-mb-4 u-p-3 u-bg-brand-subtle u-rounded">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-6">
          <h3 className="u-mb-3 u-text-secondary-emphasis u-font-medium">
            justify-content="between"
          </h3>
          <Row justifyContent="between" className="u-mb-4 u-p-3 u-bg-brand-subtle u-rounded">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-6">
          <h3 className="u-mb-3 u-text-secondary-emphasis u-font-medium">
            justify-content="around"
          </h3>
          <Row justifyContent="around" className="u-mb-4 u-p-3 u-bg-brand-subtle u-rounded">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>
      </div>

      {/* Vertical Alignment */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Vertical Alignment</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Control how columns align vertically when they have different heights:
        </p>

        <div className="u-mb-6">
          <h3 className="u-mb-3 u-text-secondary-emphasis u-font-medium">align-items="start"</h3>
          <Row
            alignItems="start"
            className="u-mb-4 u-bg-brand-subtle u-rounded u-p-3"
            style={{ minHeight: '180px' }}
          >
            <GridCol xs={4}>
              <DemoCard height="sm">Short</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="md">Medium</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="lg">Tall</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-6">
          <h3 className="u-mb-3 u-text-secondary-emphasis u-font-medium">align-items="center"</h3>
          <Row
            alignItems="center"
            className="u-mb-4 u-bg-brand-subtle u-rounded u-p-3"
            style={{ minHeight: '180px' }}
          >
            <GridCol xs={4}>
              <DemoCard height="sm">Short</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="md">Medium</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="lg">Tall</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-6">
          <h3 className="u-mb-3 u-text-secondary-emphasis u-font-medium">align-items="end"</h3>
          <Row
            alignItems="end"
            className="u-mb-4 u-bg-brand-subtle u-rounded u-p-3"
            style={{ minHeight: '180px' }}
          >
            <GridCol xs={4}>
              <DemoCard height="sm">Short</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="md">Medium</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="lg">Tall</DemoCard>
            </GridCol>
          </Row>
        </div>
      </div>

      {/* No Gutters */}
      <div className="u-mb-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">No Gutters</h2>
        <p className="u-mb-4 u-text-secondary-emphasis">Remove spacing between columns:</p>

        <div className="u-mb-6">
          <h3 className="u-mb-3 u-text-secondary-emphasis u-font-medium">With gutters (default)</h3>
          <Row className="u-mb-4 u-p-3 u-bg-brand-subtle u-rounded">
            <GridCol xs={4}>
              <DemoCard variant="secondary">Column 1</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard variant="secondary">Column 2</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard variant="secondary">Column 3</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-6">
          <h3 className="u-mb-3 u-text-secondary-emphasis u-font-medium">No gutters</h3>
          <Row noGutters className="u-mb-4 u-p-3 u-bg-brand-subtle u-rounded">
            <GridCol xs={4}>
              <DemoCard variant="accent">Column 1</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard variant="accent">Column 2</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard variant="accent">Column 3</DemoCard>
            </GridCol>
          </Row>
        </div>
      </div>
    </div>
  ),
};

/**
 * ## Nested Grids
 *
 * Create complex layouts by nesting grids within columns.
 */
export const NestedGrids: Story = {
  render: () => (
    <div className="u-mb-8">
      <h1 className="u-mb-6 u-text-brand-emphasis u-border-bottom u-pb-2">Nested Grids</h1>
      <p className="u-mb-6 u-text-secondary-emphasis">
        Create complex layouts by nesting grids within columns. Each nested grid starts fresh with
        12 columns.
      </p>

      <Grid className="u-mb-6">
        <GridCol xs={12} md={6}>
          <Card className="u-mb-4 u-bg-info-subtle">
            <h3 className="u-mb-4 u-text-info-emphasis">Left Section</h3>
            <Grid>
              <GridCol xs={12} className="u-mb-4">
                <DemoCard variant="secondary">Nested Full Width</DemoCard>
              </GridCol>
              <GridCol xs={6}>
                <DemoCard variant="secondary">Nested 1/2</DemoCard>
              </GridCol>
              <GridCol xs={6}>
                <DemoCard variant="secondary">Nested 1/2</DemoCard>
              </GridCol>
            </Grid>
          </Card>
        </GridCol>

        <GridCol xs={12} md={6}>
          <Card className="u-mb-4 u-bg-success-subtle">
            <h3 className="u-mb-4 u-text-success-emphasis">Right Section</h3>
            <Grid>
              <GridCol xs={4}>
                <DemoCard variant="accent">1/3</DemoCard>
              </GridCol>
              <GridCol xs={4}>
                <DemoCard variant="accent">1/3</DemoCard>
              </GridCol>
              <GridCol xs={4}>
                <DemoCard variant="accent">1/3</DemoCard>
              </GridCol>
            </Grid>
          </Card>
        </GridCol>
      </Grid>

      <div className="u-mt-8">
        <h2 className="u-mb-4 u-text-brand-emphasis">Complex Nested Example</h2>
        <p className="u-mb-4 u-text-brand-emphasis">
          Dashboard-style layout with multiple levels of nesting:
        </p>

        <Grid>
          <GridCol xs={12}>
            <Card className="u-mb-4 u-bg-warning-subtle">
              <h3 className="u-mb-4 u-text-warning-emphasis">Header</h3>
              <Grid>
                <GridCol xs={12} sm={6} md={8}>
                  <DemoCard variant="secondary">Logo & Navigation</DemoCard>
                </GridCol>
                <GridCol xs={12} sm={6} md={4}>
                  <DemoCard variant="secondary">User Actions</DemoCard>
                </GridCol>
              </Grid>
            </Card>
          </GridCol>

          <GridCol xs={12} md={3}>
            <Card className="u-mb-4 u-bg-info-subtle">
              <h3 className="u-mb-4 u-text-info-emphasis">Sidebar</h3>
              <Grid>
                <GridCol xs={12} className="u-mb-2">
                  <DemoCard variant="accent" height="sm">
                    Menu Item 1
                  </DemoCard>
                </GridCol>
                <GridCol xs={12} className="u-mb-2">
                  <DemoCard variant="accent" height="sm">
                    Menu Item 2
                  </DemoCard>
                </GridCol>
                <GridCol xs={12}>
                  <DemoCard variant="accent" height="sm">
                    Menu Item 3
                  </DemoCard>
                </GridCol>
              </Grid>
            </Card>
          </GridCol>

          <GridCol xs={12} md={9}>
            <Card className="u-bg-success-subtle">
              <h3 className="u-mb-4 u-text-success-emphasis">Main Content</h3>
              <Grid>
                <GridCol xs={12} className="u-mb-4">
                  <DemoCard height="sm">Content Header</DemoCard>
                </GridCol>
                <GridCol xs={12} sm={6} lg={4}>
                  <DemoCard variant="secondary">Widget 1</DemoCard>
                </GridCol>
                <GridCol xs={12} sm={6} lg={4}>
                  <DemoCard variant="secondary">Widget 2</DemoCard>
                </GridCol>
                <GridCol xs={12} sm={12} lg={4}>
                  <DemoCard variant="secondary">Widget 3</DemoCard>
                </GridCol>
              </Grid>
            </Card>
          </GridCol>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * ## Breakpoint Reference
 *
 * Visual reference for how the grid system responds at different screen sizes.
 */
export const BreakpointReference: Story = {
  render: () => (
    <div className="u-mb-8">
      <h1 className="u-mb-6 u-text-brand-emphasis u-border-bottom u-pb-2">Breakpoint Reference</h1>
      <p className="u-mb-6 u-text-secondary-emphasis">
        The grid system uses these breakpoints. Resize your browser to see how columns adapt.
      </p>

      <Card className="u-mb-6">
        <h3 className="u-mb-4 u-text-brand-emphasis">Breakpoint Sizes</h3>
        <ul className="u-text-secondary-emphasis">
          <li className="u-mb-2">
            <strong>xs:</strong> 0px and up (all devices)
          </li>
          <li className="u-mb-2">
            <strong>sm:</strong> 576px and up (tablets)
          </li>
          <li className="u-mb-2">
            <strong>md:</strong> 768px and up (small laptops)
          </li>
          <li className="u-mb-2">
            <strong>lg:</strong> 992px and up (large laptops)
          </li>
          <li className="u-mb-2">
            <strong>xl:</strong> 1200px and up (desktops)
          </li>
          <li>
            <strong>xxl:</strong> 1440px and up (large desktops)
          </li>
        </ul>
      </Card>

      <h2 className="u-mb-4 u-text-brand-emphasis">Responsive Behavior Demo</h2>
      <p className="u-mb-4 u-text-secondary-emphasis">
        These columns show different layouts at each breakpoint:
      </p>

      <Grid className="u-mb-6">
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-font-bold">Column 1</div>
            <div className="u-text-sm u-mt-2">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-font-bold">Column 2</div>
            <div className="u-text-sm u-mt-2">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-font-bold">Column 3</div>
            <div className="u-text-sm u-mt-2">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-font-bold">Column 4</div>
            <div className="u-text-sm u-mt-2">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-font-bold">Column 5</div>
            <div className="u-text-sm u-mt-2">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-font-bold">Column 6</div>
            <div className="u-text-sm u-mt-2">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
      </Grid>

      <Card>
        <h3 className="u-mb-3 u-text-brand-emphasis">Current Breakpoint</h3>
        <p className="u-text-secondary-emphasis u-mb-0">
          Resize your browser window to see how the columns above adapt to different screen sizes.
          The grid system automatically adjusts the layout based on the available space.
        </p>
      </Card>
    </div>
  ),
};
