/**
 * Theme Studio Component Integration Stories
 * 
 * Comprehensive Storybook stories demonstrating ThemeStudio integration
 * with Atomix components, showing how generated CSS tokens apply to components
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ThemeProvider,
  useTheme,
  createTheme,
  generateCSSVariables,
  removeInjectedCSS,
  ThemeStudio,
  type Theme,
  type ThemeOptions,
} from '../lib/theme';
import { Button } from '../components/Button/Button';
import { Badge } from '../components/Badge/Badge';
import { Card } from '../components/Card/Card';
import { Input } from '../components/Form/Input';
import { Icon } from '../components/Icon/Icon';

// Example theme metadata
const exampleThemes = {
  'boomdevs': {
    name: 'BoomDevs',
    description: 'BoomDevs theme',
    status: 'beta' as const,
  },
  'esrar': {
    name: 'Esrar',
    description: 'Esrar theme',
    status: 'beta' as const,
  },
};

// CSS injection style ID for ThemeStudio
const THEME_STUDIO_STYLE_ID = 'atomix-theme-studio-vars';

/**
 * Component Preview Component
 * 
 * Displays various Atomix components to demonstrate theme application
 */
interface ComponentPreviewProps {
  theme?: Theme;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ theme }) => {
  const [inputValue, setInputValue] = useState('Sample input text');

  return (
    <div style={{
      padding: '2rem',
      minHeight: '100%',
    }}>
      <h1 style={{
        marginTop: 0,
        marginBottom: '2rem',
      }}>
        Component Preview
      </h1>

      {/* Typography Section */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{
          marginBottom: '1rem',
        }}>
          Typography
        </h2>
        <h1 style={{ margin: '0.5rem 0' }}>
          Heading 1
        </h1>
        <h2 style={{ margin: '0.5rem 0' }}>
          Heading 2
        </h2>
        <h3 style={{ margin: '0.5rem 0' }}>
          Heading 3
        </h3>
        <p>
          Body text demonstrating typography styles. The font family, sizes, and weights are all controlled by theme variables injected into the document head.
        </p>
      </section>

      {/* Buttons Section */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{
          marginBottom: '1rem',
        }}>
          Buttons
        </h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button variant="primary" label="Primary" />
          <Button variant="secondary" label="Secondary" />
          <Button variant="success" label="Success" />
          <Button variant="error" label="Error" />
          <Button variant="warning" label="Warning" />
          <Button variant="info" label="Info" />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button variant="primary" size="sm" label="Small" />
          <Button variant="primary" size="md" label="Medium" />
          <Button variant="primary" size="lg" label="Large" />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button variant="primary" label="With Icon" iconName="Check" />
          <Button variant="primary" label="Loading" loading />
          <Button variant="primary" label="Disabled" disabled />
        </div>
      </section>

      {/* Badges Section */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{
          marginBottom: '1rem',
        }}>
          Badges
        </h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Badge variant="primary" label="Primary" />
          <Badge variant="secondary" label="Secondary" />
          <Badge variant="success" label="Success" />
          <Badge variant="error" label="Error" />
          <Badge variant="warning" label="Warning" />
          <Badge variant="info" label="Info" />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Badge variant="primary" size="sm" label="Small" />
          <Badge variant="primary" size="md" label="Medium" />
          <Badge variant="primary" size="lg" label="Large" />
        </div>
      </section>

      {/* Cards Section */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{
          marginBottom: '1rem',
        }}>
          Cards
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <Card
            title="Card Title"
            text="This card demonstrates how theme colors and styles are applied to card components."
            appearance="filled"
          />
          <Card
            title="Outlined Card"
            text="Cards can have different appearances like outlined, filled, or elevated."
            appearance="outlined"
          />
          <Card
            title="Elevated Card"
            text="Elevated cards have shadow effects that respond to theme shadow variables."
            appearance="elevated"
            elevation="md"
          />
        </div>
      </section>

      {/* Form Inputs Section */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{
          marginBottom: '1rem',
        }}>
          Form Inputs
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <Input
            placeholder="Default input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            placeholder="Valid input"
            value="Valid value"
            valid
          />
          <Input
            placeholder="Invalid input"
            value="Invalid value"
            invalid
          />
          <Input
            placeholder="Disabled input"
            value="Disabled"
            disabled
          />
        </div>
      </section>

      {/* Color Swatches Section */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{
          marginBottom: '1rem',
        }}>
          Theme Colors
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {(['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const).map((color) => (
            <div
              key={color}
              style={{
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '0.5rem',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '60px',
                  backgroundColor: theme?.palette[color]?.main || '#000000',
                  borderRadius: '0.25rem',
                  marginBottom: '0.5rem',
                }}
              />
              <div style={{ textTransform: 'capitalize', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {color}
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                {theme?.palette[color]?.main || 'N/A'}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/**
 * Theme Studio with Components Integration
 * 
 * Full integration demo showing ThemeStudio editor with live component preview
 */
const ThemeStudioWithComponents: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [showCSS, setShowCSS] = useState(true);
  const [showCode, setShowCode] = useState(false);

  // Generate initial theme
  const initialTheme = useMemo(() => createTheme({
    name: 'Custom Theme',
    palette: {
      primary: { main: '#7AFFD7', contrastText: '#000000' },
      secondary: { main: '#FF5733', contrastText: '#ffffff' },
      success: { main: '#4DFF9F', contrastText: '#000000' },
      error: { main: '#FF1A1A', contrastText: '#ffffff' },
      warning: { main: '#FFB800', contrastText: '#000000' },
      info: { main: '#00B8FF', contrastText: '#000000' },
    },
  }), []);

  // Handle theme changes from ThemeStudio
  const handleThemeChange = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    
    // Generate and inject CSS variables into document head
    generateCSSVariables(theme, {
      selector: ':root',
      prefix: 'atomix',
      inject: true,
      styleId: THEME_STUDIO_STYLE_ID,
    });
  }, []);

  // Initialize with default theme
  useEffect(() => {
    handleThemeChange(initialTheme);
  }, [initialTheme, handleThemeChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      removeInjectedCSS(THEME_STUDIO_STYLE_ID);
    };
  }, []);

  // Generate CSS output
  const cssOutput = useMemo(() => {
    if (!currentTheme) return '';
    return generateCSSVariables(currentTheme, {
      selector: ':root',
      prefix: 'atomix',
    });
  }, [currentTheme]);

  // Handle save
  const handleSave = useCallback((theme: Theme) => {
    try {
      const themeJson = JSON.stringify(theme, null, 2);
      const blob = new Blob([themeJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${theme.name || 'theme'}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Also save to localStorage
      localStorage.setItem('atomix-theme-studio-saved', themeJson);
      
      if (typeof window !== 'undefined') {
        alert('Theme saved! Check downloads folder and localStorage.');
      }
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, []);

  // Handle load from localStorage
  const handleLoadFromStorage = useCallback(() => {
    try {
      const savedThemeJson = localStorage.getItem('atomix-theme-studio-saved');
      if (savedThemeJson) {
        const themeOptions = JSON.parse(savedThemeJson) as ThemeOptions;
        const loadedTheme = createTheme(themeOptions);
        handleThemeChange(loadedTheme);
        if (typeof window !== 'undefined') {
          alert('Theme loaded from localStorage!');
        }
      } else {
        if (typeof window !== 'undefined') {
          alert('No saved theme found in localStorage.');
        }
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
      if (typeof window !== 'undefined') {
        alert('Failed to load theme from localStorage.');
      }
    }
  }, [handleThemeChange]);

  // Handle load from file
  const handleLoadFromFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const themeOptions = JSON.parse(e.target?.result as string) as ThemeOptions;
        const loadedTheme = createTheme(themeOptions);
        handleThemeChange(loadedTheme);
        if (typeof window !== 'undefined') {
          alert('Theme loaded from file!');
        }
      } catch (error) {
        console.error('Failed to load theme from file:', error);
        if (typeof window !== 'undefined') {
          alert('Failed to load theme. Please check the file format.');
        }
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  }, [handleThemeChange]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Theme Studio with Components</h1>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <label style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '0.5rem',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'inline-block',
          }}>
            <input
              type="file"
              accept=".json"
              onChange={handleLoadFromFile}
              style={{ display: 'none' }}
            />
            Load Theme
          </label>
          <button
            onClick={handleLoadFromStorage}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            Load from Storage
          </button>
          <button
            onClick={() => setShowCSS(!showCSS)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              backgroundColor: showCSS ? '#7AFFD7' : 'transparent',
              cursor: 'pointer',
            }}
          >
            {showCSS ? 'Hide' : 'Show'} CSS
          </button>
          <button
            onClick={() => setShowCode(!showCode)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              backgroundColor: showCode ? '#7AFFD7' : 'transparent',
              cursor: 'pointer',
            }}
          >
            {showCode ? 'Hide' : 'Show'} Code
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
      }}>
        {/* Left: ThemeStudio */}
        <div style={{
          width: '400px',
          borderRight: '1px solid #e0e0e0',
          overflowY: 'auto',
        }}>
          <ThemeStudio
            initialTheme={initialTheme}
            onThemeChange={handleThemeChange}
            onSave={handleSave}
            showPreview={false}
            showCSS={false}
            showCode={false}
          />
        </div>

        {/* Right: Component Preview */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
        }}>
          <ComponentPreview theme={currentTheme || initialTheme} />
        </div>
      </div>

      {/* Bottom: CSS/Code Output */}
      {(showCSS || showCode) && (
        <div style={{
          height: '300px',
          borderTop: '1px solid #e0e0e0',
          overflow: 'auto',
        }}>
          {showCSS && (
            <div style={{ padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>Generated CSS Variables</h3>
              <pre style={{
                backgroundColor: '#f5f5f5',
                padding: '1rem',
                borderRadius: '0.5rem',
                overflow: 'auto',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                margin: 0,
              }}>
                {cssOutput}
              </pre>
            </div>
          )}
          {showCode && currentTheme && (
            <div style={{ padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>Theme JSON</h3>
              <pre style={{
                backgroundColor: '#f5f5f5',
                padding: '1rem',
                borderRadius: '0.5rem',
                overflow: 'auto',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                margin: 0,
              }}>
                {JSON.stringify(currentTheme, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Component Showcase
 * 
 * Grid of all component variants with theme switcher
 */
const ComponentShowcase: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  // Create preset themes
  const presetThemes = useMemo(() => ({
    default: createTheme({
      name: 'Default',
      palette: {
        primary: { main: '#7AFFD7', contrastText: '#000000' },
        secondary: { main: '#FF5733', contrastText: '#ffffff' },
      },
    }),
    dark: createTheme({
      name: 'Dark',
      palette: {
        primary: { main: '#7AFFD7', contrastText: '#000000' },
        secondary: { main: '#FF5733', contrastText: '#ffffff' },
        background: {
          default: '#1a1a1a',
          paper: '#2a2a2a',
          subtle: '#333333',
        },
        text: {
          primary: '#ffffff',
          secondary: '#cccccc',
          disabled: '#888888',
        },
      },
    }),
    vibrant: createTheme({
      name: 'Vibrant',
      palette: {
        primary: { main: '#FF006E', contrastText: '#ffffff' },
        secondary: { main: '#8338EC', contrastText: '#ffffff' },
        success: { main: '#06FFA5', contrastText: '#000000' },
        error: { main: '#FF006E', contrastText: '#ffffff' },
        warning: { main: '#FFBE0B', contrastText: '#000000' },
        info: { main: '#3A86FF', contrastText: '#ffffff' },
      },
    }),
  }), []);

  // Apply theme
  const applyTheme = useCallback((themeToApply: Theme) => {
    setCurrentTheme(themeToApply);
    // Generate and inject CSS variables into document head
    generateCSSVariables(themeToApply, {
      selector: ':root',
      prefix: 'atomix',
      inject: true,
      styleId: THEME_STUDIO_STYLE_ID,
    });
  }, []);

  // Initialize with default theme
  useEffect(() => {
    applyTheme(presetThemes.default);
  }, [presetThemes.default, applyTheme]);

  // Cleanup
  useEffect(() => {
    return () => {
      removeInjectedCSS(THEME_STUDIO_STYLE_ID);
    };
  }, []);

  return (
    <div style={{
      padding: '2rem',
      minHeight: '100vh',
    }}>
      <div style={{
        marginBottom: '2rem',
        padding: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '0.75rem',
      }}>
        <h1 style={{ marginTop: 0 }}>Component Showcase</h1>
        <p>Switch between different themes to see how components adapt:</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {Object.entries(presetThemes).map(([key, themePreset]) => (
            <button
              key={key}
              onClick={() => applyTheme(themePreset)}
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.5rem',
                backgroundColor: currentTheme?.name === themePreset.name
                  ? '#7AFFD7'
                  : 'transparent',
                cursor: 'pointer',
                fontWeight: currentTheme?.name === themePreset.name ? 'bold' : 'normal',
              }}
            >
              {themePreset.name}
            </button>
          ))}
        </div>
      </div>

      <ComponentPreview theme={currentTheme || presetThemes.default} />
    </div>
  );
};

/**
 * Live Theme Editor
 * 
 * Simplified version focused on quick theme editing
 */
const LiveThemeEditor: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  const initialTheme = useMemo(() => createTheme({
    name: 'Quick Edit Theme',
    palette: {
      primary: { main: '#7AFFD7', contrastText: '#000000' },
      secondary: { main: '#FF5733', contrastText: '#ffffff' },
    },
  }), []);

  const handleThemeChange = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    // Generate and inject CSS variables into document head
    generateCSSVariables(theme, {
      selector: ':root',
      prefix: 'atomix',
      inject: true,
      styleId: THEME_STUDIO_STYLE_ID,
    });
  }, []);

  useEffect(() => {
    handleThemeChange(initialTheme);
  }, [initialTheme, handleThemeChange]);

  useEffect(() => {
    return () => {
      removeInjectedCSS(THEME_STUDIO_STYLE_ID);
    };
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '350px 1fr',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <div style={{
        borderRight: '1px solid #e0e0e0',
        overflowY: 'auto',
      }}>
        <div style={{ padding: '1rem' }}>
          <h2 style={{ marginTop: 0 }}>Quick Theme Editor</h2>
          <p style={{ fontSize: '0.875rem' }}>
            Edit colors and typography to see changes in real-time.
          </p>
        </div>
        <ThemeStudio
          initialTheme={initialTheme}
          onThemeChange={handleThemeChange}
          showPreview={false}
          showCSS={false}
          showCode={false}
        />
      </div>
      <div style={{ overflowY: 'auto' }}>
        <ComponentPreview theme={currentTheme || initialTheme} />
      </div>
    </div>
  );
};

// Meta configuration
const meta: Meta = {
  title: 'Theme System/Theme Studio Components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Theme Studio Component Integration

This story demonstrates how ThemeStudio integrates with Atomix components, showing how generated CSS tokens apply to components in real-time.

## Features

- **Live Theme Editing**: Edit theme colors and typography with instant visual feedback
- **Component Preview**: See how theme changes affect all Atomix components
- **CSS Variable Generation**: View the generated CSS custom properties
- **Theme Export**: Save and export your custom themes
- **Multiple Presets**: Switch between different theme presets

## Usage

1. Use the ThemeStudio editor to modify colors and typography
2. Watch components update in real-time as you make changes
3. View the generated CSS variables in the output panel
4. Export your theme for use in your projects
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider themes={exampleThemes}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeStudioWithComponents>;

// Stories
export const FullIntegration: Story = {
  name: 'Theme Studio with Components',
  render: () => <ThemeStudioWithComponents />,
};

export const Showcase: Story = {
  name: 'Component Showcase',
  render: () => <ComponentShowcase />,
};

export const LiveEditor: Story = {
  name: 'Live Theme Editor',
  render: () => <LiveThemeEditor />,
};


