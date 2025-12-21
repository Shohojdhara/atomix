/**
 * Theme System Test Example
 * 
 * Example demonstrating the complete theme system functionality
 */

import React from 'react';
import { ThemeProvider, useTheme, createTheme } from '@shohojdhara/atomix/theme';

// Create a custom theme using createTheme
const customTheme = createTheme({
  name: 'Custom Test Theme',
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

// Theme switcher component
const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, availableThemes, isLoading, error } = useTheme();

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Theme Switcher</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {availableThemes.map((themeMetadata) => (
          <button
            key={themeMetadata.class || themeMetadata.name}
            onClick={() => setTheme(themeMetadata.class || themeMetadata.name)}
            disabled={isLoading}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: theme === (themeMetadata.class || themeMetadata.name) ? '#007bff' : 'white',
              color: theme === (themeMetadata.class || themeMetadata.name) ? 'white' : 'black',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {themeMetadata.name}
          </button>
        ))}
        <button
          onClick={() => setTheme(customTheme)}
          disabled={isLoading}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            color: 'black',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          Custom JS Theme
        </button>
      </div>

      {isLoading && <p>Loading theme...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      <div style={{ marginTop: '1rem' }}>
        <strong>Current Theme:</strong> {theme}
      </div>
    </div>
  );
};

// Sample components to demonstrate theming
const SampleComponents: React.FC = () => {
  return (
    <div>
      <h3>Sample Components</h3>

      {/* Buttons */}
      <div style={{ marginBottom: '1rem' }}>
        <h4>Buttons</h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--atomix-primary)',
              color: 'var(--atomix-primary-contrast-text, white)',
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
              backgroundColor: 'var(--atomix-secondary)',
              color: 'var(--atomix-secondary-contrast-text, white)',
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
            backgroundColor: 'var(--atomix-background-paper, white)',
            border: '1px solid var(--atomix-border-color, #e0e0e0)',
            borderRadius: 'var(--atomix-border-radius-lg, 8px)',
            boxShadow: 'var(--atomix-box-shadow-md, 0 2px 4px rgba(0,0,0,0.1))',
            maxWidth: '300px',
          }}
        >
          <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--atomix-text-primary)' }}>
            Card Title
          </h5>
          <p style={{
            margin: 0,
            color: 'var(--atomix-text-secondary)',
            fontSize: 'var(--atomix-font-size-sm, 14px)',
          }}>
            This is a sample card component demonstrating how CSS variables work with the theme system.
          </p>
        </div>
      </div>

      {/* Typography */}
      <div style={{ marginBottom: '1rem' }}>
        <h4>Typography</h4>
        <h1 style={{
          fontSize: 'var(--atomix-typography-h1-font-size, 2rem)',
          fontWeight: 'var(--atomix-typography-h1-font-weight, 700)',
          color: 'var(--atomix-text-primary)',
          margin: '0.5rem 0',
        }}>
          Heading 1
        </h1>
        <h2 style={{
          fontSize: 'var(--atomix-typography-h2-font-size, 1.5rem)',
          fontWeight: 'var(--atomix-typography-h2-font-weight, 600)',
          color: 'var(--atomix-text-primary)',
          margin: '0.5rem 0',
        }}>
          Heading 2
        </h2>
        <p style={{
          fontSize: 'var(--atomix-typography-body1-font-size, 1rem)',
          color: 'var(--atomix-text-primary)',
          lineHeight: 'var(--atomix-typography-body1-line-height, 1.5)',
        }}>
          Body text with theme typography styles applied.
        </p>
      </div>
    </div>
  );
};

// Main app component
const ThemeSystemTestApp: React.FC = () => {
  return (
    <ThemeProvider
      defaultTheme=""
      basePath="/themes"
    >
      <div style={{
        padding: '2rem',
        fontFamily: 'var(--atomix-font-family, Inter, sans-serif)',
        backgroundColor: 'var(--atomix-background-default, white)',
        color: 'var(--atomix-text-primary, black)',
        minHeight: '100vh',
      }}>
        <h1>Atomix Theme System Test</h1>
        <p>This example demonstrates the complete theme system functionality including:</p>
        <ul>
          <li>CSS theme loading and switching</li>
          <li>JavaScript theme creation with createTheme</li>
          <li>CSS variable generation and injection</li>
          <li>Theme persistence</li>
          <li>React hooks and context</li>
        </ul>

        <ThemeSwitcher />
        <SampleComponents />
      </div>
    </ThemeProvider>
  );
};

export default ThemeSystemTestApp;