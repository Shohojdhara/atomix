/**
 * Interactive Customization Demo
 * 
 * Showcases all new customization features in action
 */

import React, { useState } from 'react';
import { Button, Card, Input, Badge, Progress } from '../src/components';
import { ThemeBuilder, ThemeProvider } from '../src/lib/theme';
import { motion } from 'framer-motion';

// ============================================================================
// Demo Theme
// ============================================================================

const demoTheme = new ThemeBuilder()
  .setName('demo-theme')
  .setPalette({
    primary: {
      500: '#7AFFD7',
      600: '#00E6C3',
      700: '#00B39A',
    }
  })
  .setTypography({
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  })
  .overrideComponent('Button', {
    cssVars: {
      '--atomix-button-border-radius': '12px',
      '--atomix-button-font-weight': '600',
    },
    variants: {
      primary: {
        cssVars: {
          '--atomix-button-bg': 'linear-gradient(135deg, #7AFFD7 0%, #00E6C3 100%)',
        }
      }
    }
  })
  .overrideComponent('Card', {
    cssVars: {
      '--atomix-card-border-radius': '16px',
      '--atomix-card-padding': '24px',
    }
  })
  .build();

// ============================================================================
// Demo Sections
// ============================================================================

function CSSVariablesDemo() {
  const [bgColor, setBgColor] = useState('#7AFFD7');
  const [borderRadius, setBorderRadius] = useState('12');

  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#7AFFD7' }}>
        1. CSS Variable Overrides
      </h2>
      <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
        Customize components at runtime with CSS variables
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px' }}>
            Background Color
          </label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ width: '100px', height: '40px', cursor: 'pointer' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px' }}>
            Border Radius: {borderRadius}px
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.value)}
            style={{ width: '200px' }}
          />
        </div>
      </div>

      <Button
        variant="primary"
        cssVars={{
          '--atomix-button-bg': bgColor,
          '--atomix-button-border-radius': `${borderRadius}px`,
          '--atomix-button-padding-x': '32px',
          '--atomix-button-padding-y': '12px',
        }}
      >
        Customized Button
      </Button>
    </section>
  );
}

function PartStylingDemo() {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#7AFFD7' }}>
        2. Part-Based Styling
      </h2>
      <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
        Style individual component parts independently
      </p>

      <Card
        parts={{
          root: {
            style: {
              maxWidth: '500px',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(122, 255, 215, 0.2)',
            }
          },
          header: {
            style: {
              background: 'linear-gradient(135deg, #7AFFD7 0%, #00E6C3 100%)',
              color: '#000',
              padding: '20px',
              borderRadius: '16px 16px 0 0',
              marginBottom: '16px',
            }
          },
          body: {
            style: {
              padding: '20px',
            }
          },
          footer: {
            style: {
              borderTop: '1px solid rgba(122, 255, 215, 0.2)',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
            }
          }
        }}
      >
        <Card.Header>
          <Card.Title>Beautiful Card</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Each part of this card has custom styling applied through the parts prop.
            The header has a gradient, the body has custom padding, and the footer has
            a border and flex layout.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="outline-secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Confirm</Button>
        </Card.Footer>
      </Card>
    </section>
  );
}

function RenderPropsDemo() {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#7AFFD7' }}>
        3. Render Props & Slots
      </h2>
      <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
        Complete control over component rendering with animations
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button
          variant="primary"
          slots={{
            root: {
              render: (props) => (
                <motion.button
                  {...props}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                />
              )
            }
          }}
        >
          🚀 Animated Button
        </Button>

        <Button
          variant="secondary"
          icon={<span>⭐</span>}
          slots={{
            icon: {
              render: (props) => (
                <motion.span
                  {...props}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              )
            }
          }}
        >
          Spinning Icon
        </Button>
      </div>
    </section>
  );
}

function CombinedFeaturesDemo() {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#7AFFD7' }}>
        4. Combined Features
      </h2>
      <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
        Mix CSS variables, part styling, and render props together
      </p>

      <Card
        cssVars={{
          '--atomix-card-bg': 'rgba(0, 0, 0, 0.8)',
          '--atomix-card-border-radius': '20px',
        }}
        parts={{
          root: {
            style: {
              maxWidth: '500px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }
          },
          header: {
            className: 'gradient-header',
            style: {
              background: 'linear-gradient(135deg, #7AFFD7 0%, #00E6C3 100%)',
              color: '#000',
            }
          }
        }}
        slots={{
          root: {
            render: (props) => (
              <motion.div
                {...props}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
            )
          }
        }}
      >
        <Card.Header>
          <Card.Title>Advanced Customization</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            This card combines:
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>CSS variable overrides (background, border-radius)</li>
              <li>Part-based styling (backdrop filter, border)</li>
              <li>Render props (entrance animation)</li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </section>
  );
}

function ThemeCustomizationDemo() {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#7AFFD7' }}>
        5. Theme-Level Customization
      </h2>
      <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
        These components inherit styles from the theme
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Badge variant="primary">Badge</Badge>
        <Badge variant="success">Success</Badge>
      </div>

      <div style={{ marginTop: '1rem', maxWidth: '400px' }}>
        <Progress value={75} variant="primary" />
      </div>

      <p style={{ marginTop: '1rem', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
        All components above use the theme configuration defined at the app level.
        Border radius, font weight, and gradient backgrounds are all from the theme.
      </p>
    </section>
  );
}

function InteractiveDemo() {
  const [inputValue, setInputValue] = useState('');

  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#7AFFD7' }}>
        6. Interactive Example
      </h2>
      <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
        Try the customized form components
      </p>

      <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          placeholder="Enter your email"
          type="email"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          cssVars={{
            '--atomix-input-border-radius': '12px',
            '--atomix-input-padding-x': '16px',
            '--atomix-input-padding-y': '12px',
            '--atomix-input-border-color': 'rgba(122, 255, 215, 0.3)',
            '--atomix-input-focus-border-color': '#7AFFD7',
          }}
        />

        <Button
          variant="primary"
          fullWidth
          disabled={!inputValue}
          cssVars={{
            '--atomix-button-padding-y': '12px',
          }}
        >
          {inputValue ? 'Submit' : 'Enter email to continue'}
        </Button>
      </div>
    </section>
  );
}

// ============================================================================
// Main Demo Component
// ============================================================================

export default function CustomizationDemo() {
  return (
    <ThemeProvider theme={demoTheme}>
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          color: '#FFFFFF',
          padding: '2rem',
        }}
      >
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #7AFFD7 0%, #00E6C3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Atomix Customization Demo
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)' }}>
            Explore the new flexibility features
          </p>
        </header>

        <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <CSSVariablesDemo />
          <PartStylingDemo />
          <RenderPropsDemo />
          <CombinedFeaturesDemo />
          <ThemeCustomizationDemo />
          <InteractiveDemo />
        </main>

        <footer
          style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <p>
            Built with Atomix Design System • All features are backward compatible
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '14px' }}>
            See <code>MIGRATION_GUIDE.md</code> for documentation
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

// Export individual demos for testing
export {
  CSSVariablesDemo,
  PartStylingDemo,
  RenderPropsDemo,
  CombinedFeaturesDemo,
  ThemeCustomizationDemo,
  InteractiveDemo,
};
