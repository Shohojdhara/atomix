import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Container } from './Container';
import { Grid } from './Grid';
import { GridCol } from './GridCol';
import { Row } from './Row';

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
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Modern demo components with better visual hierarchy
const DemoCard: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  height?: 'auto' | 'sm' | 'md' | 'lg';
}> = ({ children, variant = 'primary', height = 'auto' }) => {
  const heightStyles = {
    auto: '60px',
    sm: '50px',
    md: '75px',
    lg: '100px',
  };
  const variantClasses = {
    primary: 'u-bg-brand-subtle u-border-brand-subtle',
    secondary: 'u-bg-success-subtle u-border-success-subtle',
    accent: 'u-bg-info-subtle u-border-info-subtle',
  };
  const variantTextClasses = {
    primary: 'u-text-brand-emphasis',
    secondary: 'u-text-success-emphasis',
    accent: 'u-text-info-emphasis',
  };

  return (
    <div
      className={`u-p-4 u-rounded u-border u-text-center u-d-flex u-align-items-center u-justify-content-center ${variantClasses[variant]}`}
      style={{ minHeight: heightStyles[height] }}
    >
      <div className={`${variantTextClasses[variant]} u-fw-medium`}>{children}</div>
    </div>
  );
};

const CodeSnippet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre
    className="u-bg-dark-subtle u-text-error-emphasis u-p-3 u-rounded u-fs-sm u-fw-normal"
    style={{ fontFamily: 'monospace' }}
  >
    {children}
  </pre>
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
      <h2 className="u-mb-1 u-text-brand-emphasis">Basic Grid Layout</h2>
      <p className="u-mb-6 u-text-secondary-emphasis">
        Equal columns that stack on mobile and expand on larger screens:
      </p>

      <Grid className="u-mb-6">
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
  <GridCol xs={12} md={4}> Column 1 </GridCol>
  <GridCol xs={12} md={4}> Column 2 </GridCol>
  <GridCol xs={12} md={4}> Column 3 </GridCol>
</Grid>`}
      </CodeSnippet>

      <div className="u-mt-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Responsive Behavior</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Columns automatically adjust at different screen sizes:
        </p>

        <Grid className="u-mb-6">
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
      <h2 className="u-mb-6 u-text-brand-emphasis">Common Layout Patterns</h2>

      {/* Sidebar Layout */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Sidebar Layout</h3>
        <p className="u-mb-4">Perfect for dashboards and admin interfaces:</p>

        <Grid className="u-mb-6">
          <GridCol xs={12} md={3}>
            <DemoCard variant="accent" height="lg">
              <div>Sidebar</div>
              <div className="u-fs-sm ">Navigation, filters, etc.</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} md={9}>
            <DemoCard height="lg">
              <div>Main Content</div>
              <div className="u-fs-sm">Primary content area</div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Hero + Features */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Hero + Features</h3>
        <p className="u-mb-4 ">Landing page layout with hero section and feature cards:</p>

        <Grid className="u-mb-4">
          <GridCol xs={12}>
            <DemoCard variant="accent" height="md">
              <div>Hero Section</div>
              <div className="u-fs-sm">Full-width banner</div>
            </DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-6">
          <GridCol xs={12} sm={6} lg={4}>
            <DemoCard variant="secondary">Feature 1</DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} lg={4}>
            <DemoCard variant="secondary">Feature 2</DemoCard>
          </GridCol>
          <GridCol xs={12} sm={12} lg={4}>
            <DemoCard variant="secondary">Feature 3</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Article Layout */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Article Layout</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">Centered content with optional sidebar:</p>

        <Grid className="u-mb-6">
          <GridCol xs={12} md={8} offsetMd={2}>
            <DemoCard height="lg">
              <div>Article Content</div>
              <div className="u-fs-sm u-text-secondary-emphasis">Centered, readable width</div>
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
      <h2 className="u-mb-6 u-text-brand-emphasis">Column Sizing Options</h2>

      {/* Fixed Sizes */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Fixed Column Sizes</h3>
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

        <Grid className="u-mb-6">
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
        <h3 className="u-mb-1 u-text-brand-emphasis">Auto-Sizing Columns</h3>
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

        <Grid className="u-mb-6">
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
        <h3 className="u-mb-1 u-text-brand-emphasis">Mixed Sizing</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Combine fixed and auto sizing for flexible layouts:
        </p>

        <Grid className="u-mb-6">
          <GridCol xs={12} sm={6} md={4} lg="auto">
            <DemoCard variant="secondary">
              <div>Responsive</div>
              <div className="u-fs-sm">xs=12, sm=6, md=4, lg=auto</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} md={4} lg="auto">
            <DemoCard variant="secondary">
              <div>Responsive</div>
              <div className="u-fs-sm">xs=12, sm=6, md=4, lg=auto</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} sm={12} md={4} lg="auto">
            <DemoCard variant="secondary">
              <div>Responsive</div>
              <div className="u-fs-sm">xs=12, sm=12, md=4, lg=auto</div>
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
      <h2 className="u-mb-6 u-text-brand-emphasis">Column Offsets</h2>

      {/* Basic Offsets */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Basic Offsets</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">Push columns to the right using offsets:</p>

        <Grid className="u-mb-4">
          <GridCol xs={4}>
            <DemoCard variant="secondary">4 columns</DemoCard>
          </GridCol>
          <GridCol xs={4} offsetXs={4}>
            <DemoCard>4 columns, offset 4</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-6">
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
        <h3 className="u-mb-1 u-text-brand-emphasis">Centering Content</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">Center columns using equal offsets:</p>

        <Grid className="u-mb-4">
          <GridCol xs={6} offsetXs={3}>
            <DemoCard variant="accent">Centered (6 cols, offset 3)</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-6">
          <GridCol xs={8} offsetXs={2}>
            <DemoCard variant="accent">Centered (8 cols, offset 2)</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Responsive Offsets */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Responsive Offsets</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Different offsets at different screen sizes:
        </p>

        <Grid className="u-mb-6">
          <GridCol xs={12} sm={6} offsetSm={3} md={4} offsetMd={4} lg={3} offsetLg={3}>
            <DemoCard variant="secondary">
              <div>Responsive Offsets</div>
              <div className="u-fs-sm">Changes at each breakpoint</div>
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
      <h2 className="u-mb-6 u-text-brand-emphasis">Container Types</h2>

      {/* Default Container */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Default Container</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Responsive container with max-width at each breakpoint:
        </p>

        <Container className="u-mb-6">
          <DemoCard variant="accent" height="md">
            <div>Default Container</div>
            <div className="u-fs-sm u-text-secondary-emphasis">Responsive max-width, centered</div>
          </DemoCard>
        </Container>
      </div>

      {/* Fluid Container */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Fluid Container</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Full-width container that spans the entire viewport:
        </p>

        <Container type="fluid" className="u-mb-6">
          <DemoCard variant="secondary" height="md">
            <div>Fluid Container</div>
            <div className="u-fs-sm u-text-secondary-emphasis">Full viewport width</div>
          </DemoCard>
        </Container>
      </div>

      {/* Breakpoint Containers */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Breakpoint Containers</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Containers with max-width at specific breakpoints:
        </p>

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
        <h3 className="u-mb-1 u-text-brand-emphasis">Container with Grid</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Combine containers with grids for structured layouts:
        </p>

        <Container className="u-mb-6">
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
      <h2 className="u-mb-6 u-text-brand-emphasis">Alignment & Spacing</h2>

      {/* Horizontal Alignment */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Horizontal Alignment</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Control how columns are distributed horizontally:
        </p>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">justify-content="start"</h4>
          <Row justifyContent="start" className="u-mb-4">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">justify-content="center"</h4>
          <Row justifyContent="center" className="u-mb-4">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">
            justify-content="between"
          </h4>
          <Row justifyContent="between" className="u-mb-4">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-6">
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">justify-content="around"</h4>
          <Row justifyContent="around" className="u-mb-4">
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
        <h3 className="u-mb-1 u-text-brand-emphasis">Vertical Alignment</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Control how columns align vertically when they have different heights:
        </p>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">align-items="start"</h4>
          <Row
            alignItems="start"
            className="u-mb-4 u-bg-brand-subtle"
            style={{ minHeight: '150px' }}
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

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">align-items="center"</h4>
          <Row
            alignItems="center"
            className="u-mb-4 u-bg-brand-subtle"
            style={{ minHeight: '150px' }}
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
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">align-items="end"</h4>
          <Row alignItems="end" className="u-mb-4 u-bg-brand-subtle" style={{ minHeight: '150px' }}>
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
        <h3 className="u-mb-1 u-text-brand-emphasis">No Gutters</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">Remove spacing between columns:</p>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">With gutters (default)</h4>
          <Row className="u-mb-4">
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
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">No gutters</h4>
          <Row noGutters className="u-mb-4">
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
      <h2 className="u-mb-6 u-text-brand-emphasis">Nested Grids</h2>
      <p className="u-mb-6 u-text-secondary-emphasis">
        Create complex layouts by nesting grids within columns. Each nested grid starts fresh with
        12 columns.
      </p>

      <Grid>
        <GridCol xs={12} md={6}>
          <div className="u-p-4 u-border u-rounded u-bg-info-subtle u-mb-4">
            <h4 className="u-mb-4 u-text-info-emphasis">Left Section</h4>
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
          </div>
        </GridCol>

        <GridCol xs={12} md={6}>
          <div className="u-p-4 u-border u-rounded u-bg-success-subtle u-mb-4">
            <h4 className="u-mb-4 u-text-success-emphasis">Right Section</h4>
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
          </div>
        </GridCol>
      </Grid>

      <div className="u-mt-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Complex Nested Example</h3>
        <p className="u-mb-4 u-text-brand-emphasis">
          Dashboard-style layout with multiple levels of nesting:
        </p>

        <Grid>
          <GridCol xs={12}>
            <div className="u-p-4 u-border u-rounded u-bg-warning-subtle u-mb-4">
              <h4 className="u-mb-4 u-text-warning-emphasis">Header</h4>
              <Grid>
                <GridCol xs={12} sm={6} md={8}>
                  <DemoCard variant="secondary">Logo & Navigation</DemoCard>
                </GridCol>
                <GridCol xs={12} sm={6} md={4}>
                  <DemoCard variant="secondary">User Actions</DemoCard>
                </GridCol>
              </Grid>
            </div>
          </GridCol>

          <GridCol xs={12} md={3}>
            <div className="u-p-4 u-border u-rounded u-bg-info-subtle u-mb-4">
              <h4 className="u-mb-4 u-text-info-emphasis">Sidebar</h4>
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
            </div>
          </GridCol>

          <GridCol xs={12} md={9}>
            <div className="u-p-4 u-border u-rounded u-bg-success-subtle">
              <h4 className="u-mb-4 u-text-success-emphasis">Main Content</h4>
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
            </div>
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
      <h2 className="u-mb-6 u-text-brand-emphasis">Breakpoint Reference</h2>
      <p className="u-mb-6 u-text-secondary-emphasis">
        The grid system uses these breakpoints. Resize your browser to see how columns adapt.
      </p>

      <div className="u-mb-6 u-p-4 u-border u-rounded u-bg-brand-subtle">
        <h4 className="u-mb-4 u-text-brand-emphasis">Breakpoint Sizes</h4>
        <ul className="u-text-secondary-emphasis">
          <li>
            <strong>xs:</strong> 0px and up (all devices)
          </li>
          <li>
            <strong>sm:</strong> 576px and up (tablets)
          </li>
          <li>
            <strong>md:</strong> 768px and up (small laptops)
          </li>
          <li>
            <strong>lg:</strong> 992px and up (large laptops)
          </li>
          <li>
            <strong>xl:</strong> 1200px and up (desktops)
          </li>
          <li>
            <strong>xxl:</strong> 1440px and up (large desktops)
          </li>
        </ul>
      </div>

      <h3 className="u-mb-1 u-text-brand-emphasis">Responsive Behavior Demo</h3>
      <p className="u-mb-4 u-text-secondary-emphasis">
        These columns show different layouts at each breakpoint:
      </p>

      <Grid className="u-mb-6">
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 1</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 2</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 3</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 4</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 5</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 6</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
      </Grid>

      <div className="u-p-4 u-border u-rounded u-bg-warning-subtle">
        <h4 className="u-mb-3 u-text-brand-emphasis">Current Breakpoint</h4>
        <p className="u-text-secondary-emphasis u-mb-0">
          Resize your browser window to see how the columns above adapt to different screen sizes.
          The grid system automatically adjusts the layout based on the available space.
        </p>
      </div>
    </div>
  ),
};
