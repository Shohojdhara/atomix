import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { GridCol } from './GridCol';
import { Container } from './Container';
import { Row } from './Row';

const meta: Meta<typeof Grid> = {
  title: 'Layouts/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Demo box component that uses utility classes instead of inline styles
const DemoBox: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="u-p-4 u-mb-2 u-border u-text-center u-bg-primary">
    {children}
  </div>
);

/**
 * Basic grid layout with equal columns
 */
export const BasicGrid: Story = {
  render: () => (
    <Grid>
      <GridCol xs={12} sm={6} md={4} lg={3}>
        <DemoBox>
          <div>o-grid__col--12</div>
          <div>o-grid__col--sm-6</div>
          <div>o-grid__col--md-4</div>
          <div>o-grid__col--lg-3</div>
        </DemoBox>
      </GridCol>
      <GridCol xs={12} sm={6} md={4} lg={3}>
        <DemoBox>
          <div>o-grid__col--12</div>
          <div>o-grid__col--sm-6</div>
          <div>o-grid__col--md-4</div>
          <div>o-grid__col--lg-3</div>
        </DemoBox>
      </GridCol>
      <GridCol xs={12} sm={6} md={4} lg={3}>
        <DemoBox>
          <div>o-grid__col--12</div>
          <div>o-grid__col--sm-6</div>
          <div>o-grid__col--md-4</div>
          <div>o-grid__col--lg-3</div>
        </DemoBox>
      </GridCol>
      <GridCol xs={12} sm={6} md={4} lg={3}>
        <DemoBox>
          <div>o-grid__col--12</div>
          <div>o-grid__col--sm-6</div>
          <div>o-grid__col--md-4</div>
          <div>o-grid__col--lg-3</div>
        </DemoBox>
      </GridCol>
    </Grid>
  ),
};

/**
 * Grid with different column widths
 */
export const MixedColumnWidths: Story = {
  render: () => (
    <Grid>
      <GridCol xs={12} md={8}>
        <DemoBox>8 columns</DemoBox>
      </GridCol>
      <GridCol xs={12} md={4}>
        <DemoBox>4 columns</DemoBox>
      </GridCol>
      <GridCol xs={12} md={6}>
        <DemoBox>6 columns</DemoBox>
      </GridCol>
      <GridCol xs={12} md={6}>
        <DemoBox>6 columns</DemoBox>
      </GridCol>
    </Grid>
  ),
};

/**
 * Grid with column offsets
 */
export const ColumnOffsets: Story = {
  render: () => (
    <div>
      <h3 className="u-mb-4">Basic Offsets</h3>
      <Grid>
        <GridCol xs={12} md={4}>
          <DemoBox>
            <div>o-grid__col--12</div>
            <div>o-grid__col--md-4</div>
          </DemoBox>
        </GridCol>
        <GridCol xs={12} md={4} offsetMd={4}>
          <DemoBox>
            <div>o-grid__col--12</div>
            <div>o-grid__col--md-4</div>
            <div>o-grid__offset--md-4</div>
          </DemoBox>
        </GridCol>
      </Grid>
      
      <h3 className="u-mb-4">Multiple Offsets</h3>
      <Grid>
        <GridCol xs={12} md={3} offsetMd={3}>
          <DemoBox>
            <div>o-grid__col--12</div>
            <div>o-grid__col--md-3</div>
            <div>o-grid__offset--md-3</div>
          </DemoBox>
        </GridCol>
        <GridCol xs={12} md={3} offsetMd={3}>
          <DemoBox>
            <div>o-grid__col--12</div>
            <div>o-grid__col--md-3</div>
            <div>o-grid__offset--md-3</div>
          </DemoBox>
        </GridCol>
      </Grid>
      
      <h3 className="u-mb-4">Responsive Offsets</h3>
      <Grid>
        <GridCol xs={6} offsetXs={6} md={4} offsetMd={2} lg={3} offsetLg={3}>
          <DemoBox>
            <div>o-grid__col--6</div>
            <div>o-grid__offset--6</div>
            <div>o-grid__col--md-4</div>
            <div>o-grid__offset--md-2</div>
            <div>o-grid__col--lg-3</div>
            <div>o-grid__offset--lg-3</div>
          </DemoBox>
        </GridCol>
      </Grid>
    </div>
  ),
};

/**
 * Auto-width columns that take up available space
 */
export const AutoWidthColumns: Story = {
  render: () => (
    <div>
      <h3 className="u-mb-4">Default Auto Columns</h3>
      <Grid>
        <GridCol>
          <DemoBox>o-grid__col-auto</DemoBox>
        </GridCol>
        <GridCol>
          <DemoBox>o-grid__col-auto</DemoBox>
        </GridCol>
        <GridCol>
          <DemoBox>o-grid__col-auto</DemoBox>
        </GridCol>
      </Grid>
      
      <h3 className="u-mb-4">Mixed Auto and Fixed Columns</h3>
      <Grid>
        <GridCol xs={4}>
          <DemoBox>o-grid__col--4</DemoBox>
        </GridCol>
        <GridCol>
          <DemoBox>o-grid__col-auto</DemoBox>
        </GridCol>
        <GridCol>
          <DemoBox>o-grid__col-auto</DemoBox>
        </GridCol>
      </Grid>
      
      <h3 className="u-mb-4">Responsive Auto Columns</h3>
      <Grid>
        <GridCol xs={12} sm={6} md={4} lg="auto">
          <DemoBox>
            <div>o-grid__col--12</div>
            <div>o-grid__col--sm-6</div>
            <div>o-grid__col--md-4</div>
            <div>o-grid__col--lg-auto</div>
          </DemoBox>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg="auto">
          <DemoBox>
            <div>o-grid__col--12</div>
            <div>o-grid__col--sm-6</div>
            <div>o-grid__col--md-4</div>
            <div>o-grid__col--lg-auto</div>
          </DemoBox>
        </GridCol>
        <GridCol xs={12} sm={12} md={4} lg="auto">
          <DemoBox>
            <div>o-grid__col--12</div>
            <div>o-grid__col--sm-12</div>
            <div>o-grid__col--md-4</div>
            <div>o-grid__col--lg-auto</div>
          </DemoBox>
        </GridCol>
      </Grid>
    </div>
  ),
};

/**
 * Nested grids
 */
export const NestedGrids: Story = {
  render: () => (
    <Grid>
      <GridCol xs={12} md={6}>
        <div className="u-p-6 u-mb-2 u-border u-text-center u-bg-brand-subtle">
          <p className="u-mb-4">Outer column 1</p>
          <Grid>
            <GridCol xs={6}>
              <DemoBox>Nested 1</DemoBox>
            </GridCol>
            <GridCol xs={6}>
              <DemoBox>Nested 2</DemoBox>
            </GridCol>
          </Grid>
        </div>
      </GridCol>
      <GridCol xs={12} md={6}>
        <div className="u-p-6 u-mb-2 u-border u-text-center u-bg-brand-subtle">
          <p className="u-mb-4">Outer column 2</p>
          <Grid>
            <GridCol xs={6}>
              <DemoBox>Nested 1</DemoBox>
            </GridCol>
            <GridCol xs={6}>
              <DemoBox>Nested 2</DemoBox>
            </GridCol>
          </Grid>
        </div>
      </GridCol>
    </Grid>
  ),
};

// Container stories
export const Containers: Story = {
  render: () => (
    <div>
      <Container className="u-p-4 u-mb-8 u-border u-text-center u-bg-brand-subtle">
        <h3 className="u-mb-4">Default Container</h3>
        Default responsive container with max-width at each breakpoint
      </Container>
      
      <Container type="fluid" className="u-p-4 u-mb-8 u-border u-text-center u-bg-brand-subtle">
        <h3 className="u-mb-4">Fluid Container</h3>
        Full width fluid container
      </Container>
      
      <Container type="sm" className="u-p-4 u-mb-4 u-border u-text-center u-bg-brand-subtle">
        <h3 className="u-mb-4">Breakpoint Containers</h3>
        Container with max-width at SM breakpoint
      </Container>
      
      <Container type="md" className="u-p-4 u-mb-4 u-border u-text-center u-bg-brand-subtle">
        Container with max-width at MD breakpoint
      </Container>
      
      <Container type="lg" className="u-p-4 u-mb-4 u-border u-text-center u-bg-brand-subtle">
        Container with max-width at LG breakpoint
      </Container>
      
      <Container type="xl" className="u-p-4 u-mb-4 u-border u-text-center u-bg-brand-subtle">
        Container with max-width at XL breakpoint
      </Container>
      
      <Container type="xxl" className="u-p-4 u-mb-4 u-border u-text-center u-bg-brand-subtle">
        Container with max-width at XXL breakpoint
      </Container>
    </div>
  ),
};

/**
 * Grid inside containers
 */
export const GridWithContainer: Story = {
  render: () => (
    <div>
      <h3>Default Container with Grid</h3>
      <Container className="u-mb-8">
        <Grid>
          <GridCol xs={12} md={4}>
            <DemoBox>Column 1</DemoBox>
          </GridCol>
          <GridCol xs={12} md={4}>
            <DemoBox>Column 2</DemoBox>
          </GridCol>
          <GridCol xs={12} md={4}>
            <DemoBox>Column 3</DemoBox>
          </GridCol>
        </Grid>
      </Container>
      
      <h3>Fluid Container with Grid</h3>
      <Container type="fluid" className="u-mb-8">
        <Grid>
          <GridCol xs={12} md={4}>
            <DemoBox>Column 1</DemoBox>
          </GridCol>
          <GridCol xs={12} md={4}>
            <DemoBox>Column 2</DemoBox>
          </GridCol>
          <GridCol xs={12} md={4}>
            <DemoBox>Column 3</DemoBox>
          </GridCol>
        </Grid>
      </Container>
    </div>
  ),
};

/**
 * Responsive behavior visualization
 */
export const ResponsiveGrid: Story = {
  render: () => (
    <Grid>
      <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
        <DemoBox>
          <div>xs=12</div>
          <div>sm=6</div>
          <div>md=4</div>
          <div>lg=3</div>
          <div>xl=2</div>
        </DemoBox>
      </GridCol>
      <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
        <DemoBox>
          <div>xs=12</div>
          <div>sm=6</div>
          <div>md=4</div>
          <div>lg=3</div>
          <div>xl=2</div>
        </DemoBox>
      </GridCol>
      <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
        <DemoBox>
          <div>xs=12</div>
          <div>sm=6</div>
          <div>md=4</div>
          <div>lg=3</div>
          <div>xl=2</div>
        </DemoBox>
      </GridCol>
      <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
        <DemoBox>
          <div>xs=12</div>
          <div>sm=6</div>
          <div>md=4</div>
          <div>lg=3</div>
          <div>xl=2</div>
        </DemoBox>
      </GridCol>
      <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
        <DemoBox>
          <div>xs=12</div>
          <div>sm=6</div>
          <div>md=4</div>
          <div>lg=3</div>
          <div>xl=2</div>
        </DemoBox>
      </GridCol>
      <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
        <DemoBox>
          <div>xs=12</div>
          <div>sm=6</div>
          <div>md=4</div>
          <div>lg=3</div>
          <div>xl=2</div>
        </DemoBox>
      </GridCol>
    </Grid>
  ),
};

/**
 * Row component with alignment options
 */
export const RowAlignments: Story = {
  render: () => (
    <div>
      <Container className="u-mb-8">
        <h3 className="u-mb-4">Justify Content</h3>
        <Row justifyContent="start" className="u-mb-4">
          <GridCol xs={4}>
            <DemoBox>u-justify-content-start</DemoBox>
          </GridCol>
          <GridCol xs={4}>
            <DemoBox>Column</DemoBox>
          </GridCol>
        </Row>
        
        <Row justifyContent="center" className="u-mb-4">
          <GridCol xs={4}>
            <DemoBox>u-justify-content-center</DemoBox>
          </GridCol>
          <GridCol xs={4}>
            <DemoBox>Column</DemoBox>
          </GridCol>
        </Row>
        
        <Row justifyContent="end" className="u-mb-4">
          <GridCol xs={4}>
            <DemoBox>u-justify-content-end</DemoBox>
          </GridCol>
          <GridCol xs={4}>
            <DemoBox>Column</DemoBox>
          </GridCol>
        </Row>
        
        <Row justifyContent="between" className="u-mb-4">
          <GridCol xs={4}>
            <DemoBox>u-justify-content-between</DemoBox>
          </GridCol>
          <GridCol xs={4}>
            <DemoBox>Column</DemoBox>
          </GridCol>
        </Row>
        
        <Row justifyContent="around" className="u-mb-4">
          <GridCol xs={4}>
            <DemoBox>u-justify-content-around</DemoBox>
          </GridCol>
          <GridCol xs={4}>
            <DemoBox>Column</DemoBox>
          </GridCol>
        </Row>
      </Container>
      
      <Container className="u-mb-8">
        <h3 className="u-mb-4">Align Items</h3>
        <Row className="u-mb-4 u-bg-info-subtle" style={{ height: '150px' }}>
          <GridCol xs={4}>
            <DemoBox>Default (stretch)</DemoBox>
          </GridCol>
          <GridCol xs={4}>
            <div className="u-p-4 u-mb-2 u-border u-text-center u-bg-brand-subtle" style={{ height: '50px' }}>Short column</div>
          </GridCol>
          <GridCol xs={4}>
            <div className="u-p-4 u-mb-2 u-border u-text-center u-bg-brand-subtle" style={{ height: '100px' }}>Taller column</div>
          </GridCol>
        </Row>
        
        <Row alignItems="start" className="u-mb-4 u-bg-info-subtle" style={{ height: '150px' }}>
          <GridCol xs={4}>
            <DemoBox>u-align-items-start</DemoBox>
          </GridCol>
          <GridCol xs={4}>
            <div className="u-p-4 u-mb-2 u-border u-text-center u-bg-brand-subtle" style={{ height: '50px' }}>Short column</div>
          </GridCol>
          <GridCol xs={4}>
            <div className="u-p-4 u-mb-2 u-border u-text-center u-bg-brand-subtle" style={{ height: '100px' }}>Taller column</div>
          </GridCol>
        </Row>
        
        <Row alignItems="center" className="u-mb-4 u-bg-info-subtle" style={{ height: '150px' }}>
          <GridCol xs={4}>
            <DemoBox>u-align-items-center</DemoBox>
          </GridCol>
          <GridCol xs={4}>
            <div className="u-p-4 u-mb-2 u-border u-text-center u-bg-brand-subtle" style={{ height: '50px' }}>Short column</div>
          </GridCol>
          <GridCol xs={4}>
            <div className="u-p-4 u-mb-2 u-border u-text-center u-bg-brand-subtle" style={{ height: '100px' }}>Taller column</div>
          </GridCol>
        </Row>
        
        <Row alignItems="end" className="u-mb-4 u-bg-info-subtle" style={{ height: '150px' }}>
          <GridCol xs={4}>
            <DemoBox>u-align-items-end</DemoBox>
          </GridCol>
          <GridCol xs={4}>
            <div className="u-p-4 u-mb-2 u-border u-text-center u-bg-brand-subtle" style={{ height: '50px' }}>Short column</div>
          </GridCol>
          <GridCol xs={4}>
            <div className="u-p-4 u-mb-2 u-border u-text-center u-bg-brand-subtle" style={{ height: '100px' }}>Taller column</div>
          </GridCol>
        </Row>
      </Container>
      
      <Container className="u-mb-8">
        <h3 className="u-mb-4">No Gutters</h3>
        <Row className="u-mb-4">
          <GridCol xs={6}>
            <DemoBox>With gutters (default)</DemoBox>
          </GridCol>
          <GridCol xs={6}>
            <DemoBox>With gutters (default)</DemoBox>
          </GridCol>
        </Row>
        
        <Row noGutters className="u-mb-4">
          <GridCol xs={6}>
            <DemoBox>o-grid--no-gutters</DemoBox>
          </GridCol>
          <GridCol xs={6}>
            <DemoBox>o-grid--no-gutters</DemoBox>
          </GridCol>
        </Row>
      </Container>
    </div>
  ),
};
