/*!
 * Theme Showcase Stories
 * Comprehensive demonstration of all Shaj themes across Atomix components
 * Shows theme switching capabilities and component theming integration
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Import components for showcase
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

// Simple theme showcase component
const ThemeShowcase: React.FC = () => {
  return (
    <div className="theme-showcase" style={{ padding: '2rem', minHeight: '100vh' }}>
      {/* Header Section */}
      <section className="showcase-header" style={{ marginBottom: '3rem' }}>
        <h1
          style={{
            fontSize: 'var(--shaj-font-size-3xl, 1.875rem)',
            fontWeight: '700',
            color: 'var(--shaj-neutral-900, #171717)',
            marginBottom: '1rem',
          }}
        >
          Shaj Theme System Showcase
        </h1>
        <p
          style={{
            fontSize: 'var(--shaj-font-size-lg, 1.125rem)',
            color: 'var(--shaj-neutral-700, #404040)',
            marginBottom: '2rem',
          }}
        >
          Explore all Shaj themes and see how they transform the entire component library. Use the
          theme selector in the Storybook toolbar to switch between themes.
        </p>
      </section>

      {/* Button Showcase */}
      <section className="showcase-buttons" style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: 'var(--shaj-font-size-2xl, 1.5rem)',
            fontWeight: '600',
            color: 'var(--shaj-neutral-900, #171717)',
            marginBottom: '1rem',
          }}
        >
          Button Variants
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success">Success</Button>
          <Button variant="error">Error</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Card and Content */}
      <section className="showcase-cards" style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: 'var(--shaj-font-size-2xl, 1.5rem)',
            fontWeight: '600',
            color: 'var(--shaj-neutral-900, #171717)',
            marginBottom: '1rem',
          }}
        >
          Cards and Content
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <Card
            title="Theme Information"
            text="This card demonstrates how theme colors are applied to components."
          >
            <div style={{ marginTop: '1rem' }}>
              <p>
                Primary Color:{' '}
                <span
                  style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'var(--shaj-primary-500)',
                    borderRadius: '4px',
                    verticalAlign: 'middle',
                    marginLeft: '8px',
                  }}
                ></span>
              </p>
              <div style={{ marginTop: '1rem' }}>
                <Badge variant="primary" label="Primary" />
                <Badge variant="secondary" label="Secondary" />
                <Badge variant="success" label="Success" />
              </div>
            </div>
          </Card>

          <Card
            title="Dynamic Theming"
            text="All components automatically adapt to theme changes using CSS custom properties."
          >
            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: 'var(--shaj-neutral-600)' }}>
                Switch themes using the Storybook toolbar to see live updates.
              </p>
              <div style={{ marginTop: '1rem' }}>
                <Badge variant="info" label="Live Updates" />
              </div>
            </div>
          </Card>

          <Card title="Theme Features" text="Comprehensive theming system with multiple variants.">
            <div style={{ marginTop: '1rem' }}>
              <ul style={{ color: 'var(--shaj-neutral-700)', paddingLeft: '1.5rem' }}>
                <li>6 Complete Themes</li>
                <li>Runtime Theme Switching</li>
                <li>Component Integration</li>
                <li>Accessibility Compliant</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* Color Showcase */}
      <section className="showcase-colors" style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: 'var(--shaj-font-size-2xl, 1.5rem)',
            fontWeight: '600',
            color: 'var(--shaj-neutral-900, #171717)',
            marginBottom: '1rem',
          }}
        >
          Theme Colors
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Primary Colors */}
          <div>
            <h3
              style={{
                fontSize: 'var(--shaj-font-size-lg, 1.125rem)',
                color: 'var(--shaj-neutral-800)',
                marginBottom: '0.5rem',
              }}
            >
              Primary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem' }}>
              {['300', '500', '700'].map(shade => (
                <div
                  key={shade}
                  style={{
                    backgroundColor: `var(--shaj-primary-${shade})`,
                    height: '3rem',
                    borderRadius: 'var(--shaj-border-radius-base, 0.5rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: parseInt(shade) >= 500 ? 'white' : 'var(--shaj-neutral-900)',
                  }}
                >
                  {shade}
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Colors */}
          <div>
            <h3
              style={{
                fontSize: 'var(--shaj-font-size-lg, 1.125rem)',
                color: 'var(--shaj-neutral-800)',
                marginBottom: '0.5rem',
              }}
            >
              Secondary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem' }}>
              {['300', '500', '700'].map(shade => (
                <div
                  key={shade}
                  style={{
                    backgroundColor: `var(--shaj-secondary-${shade})`,
                    height: '3rem',
                    borderRadius: 'var(--shaj-border-radius-base, 0.5rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: parseInt(shade) >= 500 ? 'white' : 'var(--shaj-neutral-900)',
                  }}
                >
                  {shade}
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <h3
              style={{
                fontSize: 'var(--shaj-font-size-lg, 1.125rem)',
                color: 'var(--shaj-neutral-800)',
                marginBottom: '0.5rem',
              }}
            >
              Semantic
            </h3>
            <div style={{ display: 'grid', gap: '0.25rem' }}>
              {[
                { name: 'Success', var: '--shaj-success' },
                { name: 'Warning', var: '--shaj-warning' },
                { name: 'Error', var: '--shaj-error' },
                { name: 'Info', var: '--shaj-info' },
              ].map(color => (
                <div
                  key={color.name}
                  style={{
                    backgroundColor: `var(${color.var})`,
                    height: '2rem',
                    borderRadius: 'var(--shaj-border-radius-base, 0.5rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'white',
                  }}
                >
                  {color.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Storybook configuration
const meta: Meta<typeof ThemeShowcase> = {
  title: 'Design Tokens/Theme Showcase',
  component: ThemeShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Shaj Theme System Showcase

This comprehensive showcase demonstrates all Shaj themes across the Atomix component library.

## Available Themes

- **🔵 Shaj Default**: Clean, modern, professional with vibrant blue
- **🌊 Shaj Ocean**: Calm, serene, aquatic with ocean blue
- **🌅 Shaj Sunset**: Warm, energetic, creative with sunset orange  
- **🌲 Shaj Forest**: Natural, organic with forest green
- **🌙 Shaj Midnight**: Dark, sophisticated with deep purple
- **🌸 Shaj Pastel**: Soft, gentle with pastel pink

## Features

- **Runtime Theme Switching**: Change themes instantly without page reload
- **Component Integration**: All components automatically adapt to theme changes
- **CSS Custom Properties**: Modern CSS variables for optimal performance
- **Accessibility**: WCAG 2.1 AA compliant color contrasts
- **Responsive Design**: Themes work across all screen sizes
- **Dark Mode Support**: Automatic and manual dark mode variants

## Usage

Use the theme selector in the Storybook toolbar to switch between themes and see how they transform the entire interface.
        `,
      },
    },
  },
  argTypes: {
    // No args needed for this showcase
  },
};

export default meta;
type Story = StoryObj<typeof ThemeShowcase>;

// Main showcase story
export const AllThemes: Story = {
  name: 'Complete Theme Showcase',
  render: () => <ThemeShowcase />,
  parameters: {
    docs: {
      description: {
        story:
          'Complete showcase of all Shaj themes across Atomix components. Use the theme toolbar to switch between themes.',
      },
    },
  },
};

// Individual component showcases
export const ButtonsShowcase: Story = {
  name: 'Buttons Across Themes',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', color: 'var(--shaj-neutral-900)' }}>
        Button Variants Across Themes
      </h2>
      <div style={{ display: 'grid', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--shaj-neutral-800)' }}>
            Primary Actions
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="error">Error</Button>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--shaj-neutral-800)' }}>
            Secondary Actions
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--shaj-neutral-800)' }}>Sizes</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Focused showcase of button variants across different themes.',
      },
    },
  },
};

export const CardsShowcase: Story = {
  name: 'Cards and Content Across Themes',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', color: 'var(--shaj-neutral-900)' }}>
        Cards and Content Across Themes
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <Card title="Theme Statistics" text="Overview of the Shaj theme system capabilities.">
          <div style={{ marginTop: '1rem' }}>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}
            >
              <span>Active Themes</span>
              <Badge variant="primary" label="6" />
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}
            >
              <span>Components</span>
              <Badge variant="secondary" label="25+" />
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}
            >
              <span>CSS Variables</span>
              <Badge variant="success" label="100+" />
            </div>
          </div>
        </Card>

        <Card title="Theme Features" text="Key features of the Shaj theming system.">
          <div style={{ marginTop: '1rem' }}>
            <ul style={{ color: 'var(--shaj-neutral-700)', paddingLeft: '1.5rem' }}>
              <li>Runtime theme switching</li>
              <li>Component integration</li>
              <li>Accessibility compliance</li>
              <li>Responsive design</li>
            </ul>
          </div>
        </Card>

        <Card title="Getting Started" text="How to use the Shaj theme system in your projects.">
          <div style={{ marginTop: '1rem' }}>
            <p style={{ color: 'var(--shaj-neutral-600)', fontSize: '0.875rem' }}>
              Use the theme selector in the Storybook toolbar to switch between themes and see live
              updates.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Badge variant="info" label="Try It Now" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of cards and content components across themes.',
      },
    },
  },
};
