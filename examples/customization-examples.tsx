/**
 * Atomix Customization Examples
 * 
 * Comprehensive examples demonstrating all new customization features
 */

import React from 'react';
import { Button, Card, Input, Modal } from '@shohojdhara/atomix';
import { ThemeProvider, ThemeBuilder } from '@shohojdhara/atomix';
import { motion } from 'framer-motion'; // Optional: for animation examples

// ============================================================================
// Example 1: Basic CSS Variable Override
// ============================================================================

export function BasicCSSVariableExample() {
  return (
    <Button
      variant="primary"
      cssVars={{
        '--atomix-button-bg': '#FF0000',
        '--atomix-button-border-radius': '20px',
        '--atomix-button-padding-x': '32px',
        '--atomix-button-font-weight': '700',
      }}
    >
      Custom Styled Button
    </Button>
  );
}


// ============================================================================
// Example 2: Render Props Pattern
// ============================================================================

export function RenderPropsExample() {
  return (
    <Button
      variant="primary"
      slots={{
        root: {
          render: ({ className, children, ...props }) => (
            <motion.button
              className={className}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              {...props}
            >
              {children}
            </motion.button>
          )
        }
      }}
    >
      Animated Button
    </Button>
  );
}

// ============================================================================
// Example 3: Custom Icon Component
// ============================================================================

function CustomAnimatedIcon({ size, children }: any) {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      {children}
    </motion.span>
  );
}

export function CustomIconExample() {
  return (
    <Button
      icon={<span>🚀</span>}
      slots={{
        icon: {
          component: CustomAnimatedIcon
        }
      }}
    >
      Launch
    </Button>
  );
}

// ============================================================================
// Example 4: Theme-Level Customization
// ============================================================================

const customTheme = new ThemeBuilder()
  .setName('my-brand')
  .setPalette({
    primary: {
      50: '#E6FFF9',
      100: '#B3FFE8',
      200: '#80FFD7',
      300: '#4DFFC6',
      400: '#1AFFB5',
      500: '#00E6A0',
      600: '#00B380',
      700: '#008060',
      800: '#004D40',
      900: '#001A20',
    }
  })
  .setTypography({
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
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
      '--atomix-button-padding-x': '24px',
      '--atomix-button-padding-y': '12px',
    },
    variants: {
      primary: {
        cssVars: {
          '--atomix-button-bg': 'linear-gradient(135deg, #7AFFD7 0%, #00E6C3 100%)',
          '--atomix-button-hover-bg': 'linear-gradient(135deg, #00E6C3 0%, #7AFFD7 100%)',
        }
      }
    },
    parts: {
      icon: {
        className: 'custom-button-icon',
      }
    }
  })
  .overrideComponent('Card', {
    cssVars: {
      '--atomix-card-border-radius': '16px',
      '--atomix-card-padding': '24px',
    },
    defaultProps: {
      elevation: 'md',
      hoverable: true,
    }
  })
  .build();

export function ThemeLevelExample() {
  return (
    <ThemeProvider theme={customTheme}>
      <div style={{ padding: '2rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <Button variant="primary">Themed Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        
        <Card>
          <Card.Header>
            <Card.Title>Themed Card</Card.Title>
          </Card.Header>
          <Card.Body>
            All components inherit theme customizations automatically.
          </Card.Body>
        </Card>
      </div>
    </ThemeProvider>
  );
}

// ============================================================================
// Example 5: Combining Features
// ============================================================================

export function CombinedFeaturesExample() {
  return (
    <Card
      cssVars={{
        '--atomix-card-bg': 'rgba(0, 0, 0, 0.8)',
        '--atomix-card-border-radius': '20px',
      }}
      slots={{
        root: {
          render: ({ className, children, ...props }) => (
            <motion.div
              className={className}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              {...props}
            >
              {children}
            </motion.div>
          )
        }
      }}
    >
      <Card.Header>
        <Card.Title>Advanced Card</Card.Title>
      </Card.Header>
      <Card.Body>
        This card combines CSS variables, part styling, and render props!
      </Card.Body>
    </Card>
  );
}

// ============================================================================
// Example 7: Responsive Customization
// ============================================================================

export function ResponsiveExample() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Button
      cssVars={{
        '--atomix-button-padding-x': isMobile ? '16px' : '32px',
        '--atomix-button-font-size': isMobile ? '14px' : '16px',
      }}
      parts={{
        root: {
          style: {
            width: isMobile ? '100%' : 'auto',
          }
        }
      }}
    >
      Responsive Button
    </Button>
  );
}

// ============================================================================
// Example 8: Dynamic Theme Switching
// ============================================================================

export function DynamicThemeExample() {
  const [isDark, setIsDark] = React.useState(true);

  const theme = React.useMemo(() => {
    return new ThemeBuilder()
      .setName(isDark ? 'dark' : 'light')
      .setCSSVars({
        '--atomix-bg': isDark ? '#000000' : '#FFFFFF',
        '--atomix-text': isDark ? '#FFFFFF' : '#000000',
      })
      .overrideComponent('Button', {
        cssVars: {
          '--atomix-button-bg': isDark ? '#FFFFFF' : '#000000',
          '--atomix-button-color': isDark ? '#000000' : '#FFFFFF',
        }
      })
      .build();
  }, [isDark]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ 
        background: 'var(--atomix-bg)', 
        color: 'var(--atomix-text)',
        padding: '2rem',
        minHeight: '200px',
      }}>
        <Button onClick={() => setIsDark(!isDark)}>
          Toggle Theme
        </Button>
        <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
      </div>
    </ThemeProvider>
  );
}

// ============================================================================
// Example 9: Form with Consistent Styling
// ============================================================================

const formTheme = new ThemeBuilder()
  .setName('form-theme')
  .overrideComponent('Input', {
    cssVars: {
      '--atomix-input-border-radius': '8px',
      '--atomix-input-padding-x': '16px',
      '--atomix-input-padding-y': '12px',
      '--atomix-input-border-color': 'rgba(255, 255, 255, 0.2)',
      '--atomix-input-focus-border-color': '#7AFFD7',
    }
  })
  .overrideComponent('Button', {
    cssVars: {
      '--atomix-button-border-radius': '8px',
    }
  })
  .build();

export function FormExample() {
  return (
    <ThemeProvider theme={formTheme}>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </form>
    </ThemeProvider>
  );
}

// ============================================================================
// Example 10: Modal with Custom Styling
// ============================================================================

export function ModalExample() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Custom Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cssVars={{
          '--atomix-modal-border-radius': '20px',
          '--atomix-modal-backdrop-blur': '10px',
        }}
        parts={{
          dialog: {
            style: {
              maxWidth: '600px',
            }
          },
          header: {
            style: {
              background: 'linear-gradient(135deg, #7AFFD7 0%, #00E6C3 100%)',
              color: '#000',
            }
          }
        }}
        title="Custom Modal"
      >
        <p>This modal has custom styling applied via cssVars and parts!</p>
      </Modal>
    </>
  );
}

// ============================================================================
// Export All Examples
// ============================================================================

export default function AllExamples() {
  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <section>
        <h2>1. Basic CSS Variable Override</h2>
        <BasicCSSVariableExample />
      </section>

      <section>
        <h2>2. Part-Based Styling</h2>
        <PartBasedStylingExample />
      </section>

      <section>
        <h2>3. Render Props Pattern</h2>
        <RenderPropsExample />
      </section>

      <section>
        <h2>4. Custom Icon Component</h2>
        <CustomIconExample />
      </section>

      <section>
        <h2>5. Theme-Level Customization</h2>
        <ThemeLevelExample />
      </section>

      <section>
        <h2>6. Combining Features</h2>
        <CombinedFeaturesExample />
      </section>

      <section>
        <h2>7. Responsive Customization</h2>
        <ResponsiveExample />
      </section>

      <section>
        <h2>8. Dynamic Theme Switching</h2>
        <DynamicThemeExample />
      </section>

      <section>
        <h2>9. Form with Consistent Styling</h2>
        <FormExample />
      </section>

      <section>
        <h2>10. Modal with Custom Styling</h2>
        <ModalExample />
      </section>
    </div>
  );
}
