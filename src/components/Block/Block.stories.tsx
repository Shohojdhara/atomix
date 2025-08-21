import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../../layouts/Grid/Grid';
import GridCol from '../../layouts/Grid/GridCol';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Block } from './Block';

const meta: Meta<typeof Block> = {
  title: 'Components/Block',
  component: Block,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Block component is a flexible layout container designed for creating consistent section layouts.
It provides standardized spacing, background variants, and container behavior for organizing content
into distinct sections or blocks.

## Key Features
- **Flexible spacing**: Multiple spacing sizes (xs, sm, md, lg, xl, none)
- **Background variants**: Transparent, subtle, muted, primary, secondary, accent
- **Container integration**: Built-in Container support for responsive layouts
- **Semantic HTML**: Configurable as section, div, article, aside, or main
- **Full-width support**: Option for edge-to-edge content

## Usage Guidelines
Use Block components to:
- Create consistent section spacing across pages
- Group related content with appropriate backgrounds
- Build hero sections, content areas, and feature blocks
- Maintain visual hierarchy and rhythm in layouts
        `,
      },
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['section', 'div', 'article', 'aside', 'main'],
      description: 'The HTML element to render as',
    },
    spacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'none'],
      description: 'Vertical padding size',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Enable full-width content',
    },
    children: {
      control: false,
      description: 'Content to render within the block',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    children: (
      <div>
        <h2>Default Block Section</h2>
        <p>
          This is a basic block component with default settings (medium spacing, transparent
          background).
        </p>
        <p>
          Use Block components to create consistent section layouts throughout your application.
        </p>
      </div>
    ),
  },
};

// Spacing variants
export const SpacingVariants: Story = {
  render: () => (
    <div>
      <Block background="primary" spacing="xs">
        <h3>Extra Small Spacing</h3>
        <p>This block has minimal vertical padding (xs).</p>
      </Block>

      <Block background="secondary" spacing="sm">
        <h3>Small Spacing</h3>
        <p>This block has small vertical padding (sm).</p>
      </Block>

      <Block background="tertiary" spacing="md">
        <h3>Medium Spacing</h3>
        <p>This block has medium vertical padding (md) - the default.</p>
      </Block>

      <Block background="brand" spacing="lg">
        <h3>Large Spacing</h3>
        <p>This block has large vertical padding (lg).</p>
      </Block>

      <Block background="success" spacing="xl">
        <h3>Extra Large Spacing</h3>
        <p>This block has extra large vertical padding (xl).</p>
      </Block>
    </div>
  ),
};

// Full-width hero section
export const HeroSection: Story = {
  render: () => (
    <Block background="success" spacing="xl" fullWidth>
      <div className="u-text-center">
        <h1>Welcome to Our Platform</h1>
        <p>Experience the power of modern web development with our comprehensive design system.</p>
        <Button size="lg" variant="secondary">
          Get Started
        </Button>
      </div>
    </Block>
  ),
};

// Content grid layout
export const ContentGrid: Story = {
  render: () => (
    <Block background="success" spacing="lg">
      <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Features</h2>
      <Grid>
        <GridCol xs={12} md={6} lg={4}>
          <Card>
            <h3>Responsive Design</h3>
            <p>Fully responsive components that work seamlessly across all devices.</p>
          </Card>
        </GridCol>
        <GridCol xs={12} md={6} lg={4}>
          <Card>
            <h3>TypeScript Support</h3>
            <p>Built with TypeScript for enhanced developer experience and type safety.</p>
          </Card>
        </GridCol>
        <GridCol xs={12} md={6} lg={4}>
          <Card>
            <h3>Accessibility First</h3>
            <p>WCAG 2.1 AA compliant components for inclusive user experiences.</p>
          </Card>
        </GridCol>
      </Grid>
    </Block>
  ),
};

// Article layout
export const ArticleLayout: Story = {
  render: () => (
    <div>
      <Block as="article" background="success" spacing="lg" container={{ type: 'md' }}>
        <header>
          <h1>Building Modern Web Applications</h1>
          <p>Published on March 15, 2024 • 5 min read</p>
        </header>

        <p>
          In today's fast-paced digital landscape, building modern web applications requires a
          thoughtful approach to design systems and component architecture. This article explores
          best practices for creating scalable, maintainable, and user-friendly web experiences.
        </p>

        <h2>Key Principles</h2>
        <p>
          Modern web development is built on several key principles that ensure both developer
          productivity and user satisfaction. These include responsive design, accessibility,
          performance optimization, and maintainable code architecture.
        </p>

        <p>
          By following established design systems like Atomix, development teams can focus on
          delivering value rather than reinventing common patterns and components.
        </p>
      </Block>

      <Block spacing="md" container={{ type: 'sm' }} background="secondary">
        <h3>Ready to get started?</h3>
        <p>Join thousands of developers building with our design system.</p>
        <Button variant="primary">Start Building</Button>
      </Block>
    </div>
  ),
};

// Stacked sections
export const StackedSections: Story = {
  render: () => (
    <div>
      <Block background="brand" spacing="xl" fullWidth>
        <h1 className="u-text-center">Page Header</h1>
      </Block>

      <Block background="success" spacing="lg">
        <h2>Main Content</h2>
        <p>This section contains the primary content of the page.</p>
      </Block>

      <Block background="warning" spacing="lg">
        <h2>Secondary Content</h2>
        <p>This section provides additional information or features.</p>
      </Block>

      <Block background="error" spacing="lg">
        <h2>Related Content</h2>
        <p>This section offers related articles or resources.</p>
      </Block>

      <Block background="info" spacing="xl" fullWidth>
        <h2 className="u-text-center">Footer Section</h2>
      </Block>
    </div>
  ),
};

// Playground for interactive testing
export const Playground: Story = {
  args: {
    as: 'section',
    spacing: 'md',
    background: 'transparent',
    fullWidth: false,
    children: (
      <div>
        <h2>Interactive Block</h2>
        <p>Adjust the controls above to see how the Block component responds to different props.</p>
        <p>This playground allows you to experiment with all available options.</p>
      </div>
    ),
  },
};

// Background variants showcase
export const BackgroundVariants: Story = {
  render: () => (
    <div>
      <Block background="primary" spacing="md">
        <h3>Primary Background</h3>
        <p>This block uses the primary background color from the design system.</p>
      </Block>

      <Block background="secondary" spacing="md">
        <h3>Secondary Background</h3>
        <p>This block uses the secondary background color from the design system.</p>
      </Block>

      <Block background="tertiary" spacing="md">
        <h3>Tertiary Background</h3>
        <p>This block uses the tertiary background color from the design system.</p>
      </Block>

      <Block background="invert" spacing="md">
        <h3 className="u-text-error">Invert Background</h3>
        <p className="u-text-error">
          This block uses the invert background color from the design system.
        </p>
      </Block>

      <Block background="brand" spacing="md">
        <h3>Brand Background</h3>
        <p>This block uses the brand background color from the design system.</p>
      </Block>

      <Block background="error" spacing="md">
        <h3>Error Background</h3>
        <p>This block uses the error background color from the design system.</p>
      </Block>

      <Block background="success" spacing="md">
        <h3>Success Background</h3>
        <p>This block uses the success background color from the design system.</p>
      </Block>

      <Block background="warning" spacing="md">
        <h3>Warning Background</h3>
        <p>This block uses the warning background color from the design system.</p>
      </Block>

      <Block background="info" spacing="md">
        <h3>Info Background</h3>
        <p>This block uses the info background color from the design system.</p>
      </Block>

      <Block background="light" spacing="md">
        <h3>Light Background</h3>
        <p>This block uses the light background color from the design system.</p>
      </Block>
    </div>
  ),
};

// Content preview with various components and utility classes
export const ContentPreview: Story = {
  render: () => (
    <div>
      <Block background="brand" spacing="lg" fullWidth>
        <div className="u-text-center">
          <h1 className=" u-mb-2">Welcome to Atomix Design System</h1>
          <p className="u-mb-4" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            A comprehensive design system with reusable components and consistent design patterns
          </p>
          <div className="u-mb-4">
            <Button size="lg" variant="secondary" className="u-me-2">
              Get Started
            </Button>
            <Button size="lg" variant="invert" className="u-ms-2">
              Learn More
            </Button>
          </div>
        </div>
      </Block>

      <Block spacing="lg">
        <h2 className="u-text-center u-mb-4">Our Core Components</h2>
        <Grid>
          <GridCol xs={12} md={6} lg={4}>
            <Card
              title="Buttons"
              text="Multiple variants and sizes for all use cases"
              actions={
                <div>
                  <Button variant="primary" size="sm" className="u-me-1">
                    Primary
                  </Button>
                  <Button variant="secondary" size="sm">
                    Secondary
                  </Button>
                </div>
              }
            />
          </GridCol>
          <GridCol xs={12} md={6} lg={4}>
            <Card
              title="Cards"
              text="Flexible content containers with multiple options"
              actions={<Button variant="primary">View Details</Button>}
            />
          </GridCol>
          <GridCol xs={12} md={6} lg={4}>
            <Card
              title="Blocks"
              text="Layout containers with consistent spacing and backgrounds"
              actions={<Button variant="primary">Learn More</Button>}
            />
          </GridCol>
        </Grid>
      </Block>

      <Block background="secondary" spacing="lg">
        <div className="u-text-center u-mb-4">
          <h2>Design System Benefits</h2>
          <p className="u-mb-0">Built with developers and designers in mind</p>
        </div>
        <Grid>
          <GridCol xs={12} md={6} lg={3}>
            <div className="u-text-center u-p-3">
              <h3 className="u-fs-h4">Consistency</h3>
              <p className="u-mb-0">Unified design language across all products</p>
            </div>
          </GridCol>
          <GridCol xs={12} md={6} lg={3}>
            <div className="u-text-center u-p-3">
              <h3 className="u-fs-h4">Accessibility</h3>
              <p className="u-mb-0">WCAG 2.1 AA compliant components</p>
            </div>
          </GridCol>
          <GridCol xs={12} md={6} lg={3}>
            <div className="u-text-center u-p-3">
              <h3 className="u-fs-h4">Responsive</h3>
              <p className="u-mb-0">Mobile-first approach for all devices</p>
            </div>
          </GridCol>
          <GridCol xs={12} md={6} lg={3}>
            <div className="u-text-center u-p-3">
              <h3 className="u-fs-h4">Customizable</h3>
              <p className="u-mb-0">Easily extend and modify components</p>
            </div>
          </GridCol>
        </Grid>
      </Block>

      <Block spacing="xl">
        <div className="u-d-flex u-flex-column u-align-items-center u-text-center">
          <h2 className="u-mb-3">Ready to Get Started?</h2>
          <p className="u-mb-4" style={{ maxWidth: '600px' }}>
            Join thousands of developers and designers building with Atomix Design System
          </p>
          <div>
            <Button size="lg" variant="primary" className="u-me-2">
              Documentation
            </Button>
            <Button size="lg" variant="secondary" className="u-ms-2">
              Examples
            </Button>
          </div>
        </div>
      </Block>
    </div>
  ),
};
