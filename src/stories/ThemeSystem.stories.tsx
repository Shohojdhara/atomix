/**
 * Theme System Stories
 *
 * Comprehensive Storybook stories demonstrating the Atomix Theme System
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ThemeProvider, useTheme, createTheme } from '../lib/theme';

// Example theme metadata
const exampleThemes = {};

// Basic Theme Switcher Component
const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, availableThemes, isLoading } = useTheme();

  const handleThemeChange = async (themeName: string) => {
    try {
      await setTheme(themeName);
    } catch (error) {
      console.error('Failed to switch theme:', error);
    }
  };

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '1rem',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Theme Switcher</h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {availableThemes.length > 0 ? (
          availableThemes.map(themeMetadata => (
            <button
              key={themeMetadata.class || themeMetadata.name}
              onClick={() => handleThemeChange(themeMetadata.class || themeMetadata.name)}
              disabled={isLoading}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor:
                  theme === (themeMetadata.class || themeMetadata.name) ? '#007bff' : 'white',
                color: theme === (themeMetadata.class || themeMetadata.name) ? 'white' : 'black',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {themeMetadata.name}
            </button>
          ))
        ) : (
          <p style={{ color: '#666', fontSize: '0.875rem' }}>No themes available</p>
        )}
      </div>
      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#666' }}>
        Current Theme: <strong>{String(theme || 'None')}</strong>
        {isLoading && ' (Loading...)'}
      </p>
    </div>
  );
};

// Component Preview
const ComponentPreview: React.FC = () => {
  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '1rem',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Component Preview</h3>

      {/* Buttons */}
      <div style={{ marginBottom: '1rem' }}>
        <h4>Buttons</h4>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--atomix-primary, #7AFFD7)',
              color: 'var(--atomix-primary-contrast-text, #000)',
              border: 'none',
              borderRadius: 'var(--atomix-border-radius, 4px)',
              cursor: 'pointer',
            }}
          >
            Primary Button
          </button>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--atomix-secondary, #FF5733)',
              color: 'var(--atomix-secondary-contrast-text, #fff)',
              border: 'none',
              borderRadius: 'var(--atomix-border-radius, 4px)',
              cursor: 'pointer',
            }}
          >
            Secondary Button
          </button>
        </div>
      </div>

      {/* Card */}
      <div style={{ marginBottom: '1rem' }}>
        <h4>Card</h4>
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--atomix-background-paper, #fff)',
            border: '1px solid var(--atomix-border-color, #e0e0e0)',
            borderRadius: 'var(--atomix-border-radius-lg, 8px)',
            boxShadow: 'var(--atomix-box-shadow-md, 0 2px 4px rgba(0,0,0,0.1))',
            maxWidth: '300px',
          }}
        >
          <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--atomix-text-primary, #000)' }}>
            Card Title
          </h5>
          <p
            style={{
              margin: 0,
              color: 'var(--atomix-text-secondary, #666)',
              fontSize: 'var(--atomix-font-size-sm, 14px)',
            }}
          >
            This card demonstrates theme variables in action.
          </p>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h4>Typography</h4>
        <h1
          style={{
            fontSize: 'var(--atomix-typography-h1-font-size, 2rem)',
            fontWeight: 'var(--atomix-typography-h1-font-weight, 700)',
            color: 'var(--atomix-text-primary, #000)',
            margin: '0.5rem 0',
          }}
        >
          Heading 1
        </h1>
        <h2
          style={{
            fontSize: 'var(--atomix-typography-h2-font-size, 1.5rem)',
            fontWeight: 'var(--atomix-typography-h2-font-weight, 600)',
            color: 'var(--atomix-text-primary, #000)',
            margin: '0.5rem 0',
          }}
        >
          Heading 2
        </h2>
        <p
          style={{
            fontSize: 'var(--atomix-typography-body1-font-size, 1rem)',
            color: 'var(--atomix-text-primary, #000)',
            lineHeight: 'var(--atomix-typography-body1-line-height, 1.5)',
          }}
        >
          Body text with theme typography styles applied.
        </p>
      </div>
    </div>
  );
};

// RTL Demo Component
const RTLDemo: React.FC = () => {
  const [rtlEnabled, setRTLEnabled] = useState(false);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  // Create RTL manager once and store in ref to prevent re-creation
  const rtlManagerRef = React.useRef<ReturnType<typeof createRTLManager> | null>(null);

  if (!rtlManagerRef.current) {
    rtlManagerRef.current = createRTLManager({
      enabled: false, // Start disabled, we'll control it manually
      direction: 'ltr',
      autoDetect: false,
    });
  }

  // Update direction when rtlEnabled changes, but don't include rtlManager in deps
  React.useEffect(() => {
    if (!rtlManagerRef.current) return;
    const newDirection = rtlEnabled ? 'rtl' : 'ltr';
    // Only update if direction actually changed
    if (rtlManagerRef.current.getDirection() !== newDirection) {
      rtlManagerRef.current.setDirection(newDirection);
    }
    // Update local state only if different
    setDirection(prev => (prev !== newDirection ? newDirection : prev));
  }, [rtlEnabled]); // Only depend on rtlEnabled

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (rtlManagerRef.current) {
        rtlManagerRef.current.destroy();
        rtlManagerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '1rem',
      }}
    >
      <h3 style={{ marginTop: 0 }}>RTL Support</h3>
      <button
        onClick={() => {
          setRTLEnabled(prev => !prev);
        }}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: rtlEnabled ? '#28a745' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        {rtlEnabled ? 'Disable RTL' : 'Enable RTL'}
      </button>
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          direction: direction,
        }}
      >
        <p style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}>
          This text will align based on the current direction setting.
          {direction === 'rtl' && ' (RTL Mode Active)'}
        </p>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: direction === 'rtl' ? 'flex-end' : 'flex-start',
          }}
        >
          <span>←</span>
          <span>Direction: {direction.toUpperCase()}</span>
          <span>→</span>
        </div>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#666' }}>
          Current Direction: <strong>{direction.toUpperCase()}</strong>
        </p>
      </div>
    </div>
  );
};

// Main Demo Component
const ThemeSystemDemo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'var(--atomix-font-family, Inter, sans-serif)',
        backgroundColor: 'var(--atomix-background-default, #fff)',
        color: 'var(--atomix-text-primary, #000)',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ marginTop: 0 }}>Atomix Theme System</h1>
      <p>Comprehensive theme management system with CSS and JavaScript theme support.</p>

      <ThemeSwitcher />
      <ComponentPreview />
      <RTLDemo />

      <div
        style={{
          padding: '1rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Current Theme Info</h3>
        <pre
          style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.875rem',
          }}
        >
          {JSON.stringify({ currentTheme: String(theme || 'Unknown') }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

// Meta configuration
const meta: Meta<typeof ThemeSystemDemo> = {
  title: 'Theme System/Overview',
  component: ThemeSystemDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Atomix Theme System

The Atomix Theme System provides comprehensive theming capabilities including:

- **CSS Theme Support**: Load themes from CSS files
- **JavaScript Theme Support**: Create themes programmatically
- **RTL Support**: Right-to-left language support
- **Component Overrides**: Component-level customization
- **White Labeling**: Brand customization
- **Analytics**: Performance monitoring

## Basic Usage

\`\`\`tsx
import { ThemeProvider, useTheme } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme('dark-theme')}>Switch Theme</button>;
}
\`\`\`

## Creating JavaScript Themes

\`\`\`tsx
import { createTheme } from '@shohojdhara/atomix/theme';

const customTheme = createTheme({
  palette: {
    primary: { main: '#7AFFD7' },
    secondary: { main: '#FF5733' },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});
\`\`\`
        `,
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider themes={exampleThemes} basePath="/themes">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeSystemDemo>;

// Stories
export const Default: Story = {
  name: 'Basic Theme System',
};

export const WithRTL: Story = {
  name: 'With RTL Support',
  decorators: [
    Story => {
      const [rtlEnabled, setRTLEnabled] = useState(false);
      const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

      // Create RTL manager once and store in ref to prevent re-creation
      const rtlManagerRef = React.useRef<ReturnType<typeof createRTLManager> | null>(null);

      if (!rtlManagerRef.current) {
        rtlManagerRef.current = createRTLManager({
          enabled: false,
          direction: 'ltr',
          autoDetect: false,
        });
      }

      // Update direction when rtlEnabled changes, but don't include rtlManager in deps
      React.useEffect(() => {
        if (!rtlManagerRef.current) return;
        const newDirection = rtlEnabled ? 'rtl' : 'ltr';
        // Only update if direction actually changed
        if (rtlManagerRef.current.getDirection() !== newDirection) {
          rtlManagerRef.current.setDirection(newDirection);
        }
        // Update local state only if different
        setDirection(prev => (prev !== newDirection ? newDirection : prev));
      }, [rtlEnabled]); // Only depend on rtlEnabled

      // Cleanup on unmount
      React.useEffect(() => {
        return () => {
          if (rtlManagerRef.current) {
            rtlManagerRef.current.destroy();
            rtlManagerRef.current = null;
          }
        };
      }, []);

      return (
        <ThemeProvider themes={exampleThemes}>
          <div>
            <div
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={rtlEnabled}
                  onChange={e => setRTLEnabled(e.target.checked)}
                />
                <span>Enable RTL Mode</span>
              </label>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#666' }}>
                Current Direction: <strong>{direction.toUpperCase()}</strong>
              </p>
            </div>
            <div style={{ direction: direction }}>
              <Story />
            </div>
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export const JavaScriptTheme: Story = {
  name: 'JavaScript Theme Example',
  render: () => {
    const jsTheme = createTheme({
      name: 'Custom JS Theme',
      palette: {
        primary: { main: '#7AFFD7' },
        secondary: { main: '#FF5733' },
        background: {
          default: '#FAFAFA',
          paper: '#FFFFFF',
          subtle: '#F5F5F5',
        },
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
      },
    });

    return (
      <ThemeProvider defaultTheme={jsTheme} themes={exampleThemes}>
        <ThemeSystemDemo />
      </ThemeProvider>
    );
  },
};
