import type { Meta, StoryObj } from '@storybook/react';
import { DesignTokensCustomizer } from './DesignTokensCustomizer';
import { useState } from 'react';

// Enhanced preview components
const PreviewContainer = ({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="story-preview-container">
    {title && <h3 className="story-preview-title">{title}</h3>}
    {description && <p className="story-preview-description">{description}</p>}
    <div className="story-preview-content">{children}</div>
  </div>
);

const meta: Meta<typeof DesignTokensCustomizer> = {
  title: 'DevTools/DesignTokensCustomizer',
  component: DesignTokensCustomizer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive design tokens customization tool for real-time theme adjustments.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DesignTokensCustomizer>;

// Basic Usage
export const Default: Story = {
  render: () => (
    <PreviewContainer
      title="Design Tokens Customizer"
      description="Interactive tool for customizing design tokens in real-time"
    >
      <DesignTokensCustomizer />
    </PreviewContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The default design tokens customizer with all standard controls and features.',
      },
    },
  },
};

// With Custom Configuration
export const WithCustomConfig: Story = {
  render: () => {
    const customConfig = {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
      },
      spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
      },
    };

    return (
      <PreviewContainer
        title="Custom Configuration"
        description="Design tokens customizer with predefined custom configuration"
      >
        <DesignTokensCustomizer initialConfig={customConfig} />
      </PreviewContainer>
    );
  },
};

// Theme Preview Mode
export const ThemePreview: Story = {
  render: () => (
    <PreviewContainer
      title="Theme Preview Mode"
      description="Customizer with live theme preview components"
    >
      <div className="theme-preview-layout">
        <div className="customizer-panel">
          <DesignTokensCustomizer />
        </div>
        <div className="preview-panel">
          <div className="preview-components">
            <button className="preview-button">Primary Button</button>
            <button className="preview-button secondary">Secondary Button</button>
            <div className="preview-card">
              <h3>Preview Card</h3>
              <p>This card updates in real-time with your token changes.</p>
              <input className="preview-input" placeholder="Type to see styling" />
            </div>
            <div className="preview-colors">
              <div className="color-swatch primary"></div>
              <div className="color-swatch secondary"></div>
              <div className="color-swatch accent"></div>
            </div>
          </div>
        </div>
      </div>
    </PreviewContainer>
  ),
  parameters: {
    viewport: {
      viewports: {
        desktop: {
          name: 'Desktop',
          styles: { width: '1200px', height: '800px' },
        },
      },
      defaultViewport: 'desktop',
    },
  },
};

// Compact Mode
export const Compact: Story = {
  render: () => (
    <PreviewContainer
      title="Compact Mode"
      description="Space-efficient customizer for smaller screens"
    >
      <DesignTokensCustomizer compact={true} />
    </PreviewContainer>
  ),
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
      },
      defaultViewport: 'mobile',
    },
  },
};

// With Export Options
export const WithExport: Story = {
  render: () => {
    const [exportData, setExportData] = useState('');

    const handleExport = (tokens: any) => {
      setExportData(JSON.stringify(tokens, null, 2));
    };

    return (
      <PreviewContainer
        title="With Export Options"
        description="Customizer with export functionality for sharing themes"
      >
        <div className="export-workflow">
          <DesignTokensCustomizer onExport={handleExport} />
          {exportData && (
            <div className="export-output">
              <h4>Exported Theme Data:</h4>
              <pre>{exportData}</pre>
              <button
                onClick={() => navigator.clipboard.writeText(exportData)}
                className="copy-button"
              >
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </PreviewContainer>
    );
  },
};

// Interactive Tutorial
export const InteractiveTutorial: Story = {
  render: () => (
    <PreviewContainer
      title="Interactive Tutorial"
      description="Guided tour of the design tokens customizer features"
    >
      <div className="tutorial-container">
        <div className="tutorial-steps">
          <div className="tutorial-step active">
            <h4>Step 1: Explore Color Tokens</h4>
            <p>Click on the Colors section to customize your primary and secondary colors.</p>
          </div>
          <div className="tutorial-step">
            <h4>Step 2: Adjust Typography</h4>
            <p>Modify font sizes, weights, and line heights for better readability.</p>
          </div>
          <div className="tutorial-step">
            <h4>Step 3: Configure Spacing</h4>
            <p>Set consistent spacing values for margins and padding.</p>
          </div>
        </div>
        <DesignTokensCustomizer />
      </div>
    </PreviewContainer>
  ),
};
