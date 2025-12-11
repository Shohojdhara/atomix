/**
 * Theme Preview Component
 * 
 * React component for previewing themes in development
 */

import React, { useState, useEffect } from 'react';
import type { Theme } from '../types';
import { generateCSSVariables } from '../generateCSSVariables';

/**
 * Theme preview props
 */
export interface ThemePreviewProps {
  /** Theme to preview */
  theme: Theme;
  /** Show theme details */
  showDetails?: boolean;
  /** Show color palette */
  showPalette?: boolean;
  /** Show typography */
  showTypography?: boolean;
  /** Show spacing */
  showSpacing?: boolean;
  /** Custom components to render */
  children?: React.ReactNode;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Theme Preview Component
 * 
 * Renders a preview of a theme with sample components
 */
export const ThemePreview: React.FC<ThemePreviewProps> = ({
  theme,
  showDetails = true,
  showPalette = true,
  showTypography = true,
  showSpacing = false,
  children,
  className,
  style,
}) => {
  const [cssVariables, setCssVariables] = useState<string>('');

  useEffect(() => {
    // Generate CSS variables for the theme
    const css = generateCSSVariables(theme, {
      selector: ':root',
      prefix: 'atomix-preview',
    });
    setCssVariables(css);
  }, [theme]);

  return (
    <div className={`atomix-theme-preview ${className || ''}`} style={style}>
      {/* Inject theme CSS variables */}
      <style>{cssVariables}</style>
      
      {/* Theme Details */}
      {showDetails && (
        <div className="theme-details">
          <h2>{theme.name}</h2>
          {theme.description && <p>{theme.description}</p>}
          {theme.author && <p><strong>Author:</strong> {theme.author}</p>}
          {theme.version && <p><strong>Version:</strong> {theme.version}</p>}
          {theme.status && <p><strong>Status:</strong> {theme.status}</p>}
          {theme.tags && theme.tags.length > 0 && (
            <p><strong>Tags:</strong> {theme.tags.join(', ')}</p>
          )}
        </div>
      )}

      {/* Color Palette */}
      {showPalette && (
        <div className="theme-palette">
          <h3>Color Palette</h3>
          <div className="color-grid">
            {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map((colorName) => {
              const color = theme.palette[colorName as keyof typeof theme.palette];
              if (!color || typeof color !== 'object' || !('main' in color)) return null;
              
              return (
                <div key={colorName} className="color-item">
                  <div 
                    className="color-swatch"
                    style={{ backgroundColor: color.main }}
                  />
                  <div className="color-info">
                    <strong>{colorName}</strong>
                    <code>{color.main}</code>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Background Colors */}
          <h4>Background</h4>
          <div className="color-grid">
            {Object.entries(theme.palette.background).map(([name, value]) => (
              <div key={name} className="color-item">
                <div 
                  className="color-swatch"
                  style={{ backgroundColor: value }}
                />
                <div className="color-info">
                  <strong>{name}</strong>
                  <code>{value}</code>
                </div>
              </div>
            ))}
          </div>

          {/* Text Colors */}
          <h4>Text</h4>
          <div className="color-grid">
            {Object.entries(theme.palette.text).map(([name, value]) => (
              <div key={name} className="color-item">
                <div 
                  className="color-swatch"
                  style={{ backgroundColor: value }}
                />
                <div className="color-info">
                  <strong>{name}</strong>
                  <code>{value}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Typography */}
      {showTypography && (
        <div className="theme-typography">
          <h3>Typography</h3>
          <div className="typography-info">
            <p><strong>Font Family:</strong> <code>{theme.typography.fontFamily}</code></p>
            <p><strong>Base Font Size:</strong> <code>{theme.typography.fontSize}px</code></p>
          </div>
          
          <div className="typography-samples">
            <h1 style={{ 
              fontSize: theme.typography.h1.fontSize,
              fontWeight: theme.typography.h1.fontWeight,
              lineHeight: theme.typography.h1.lineHeight,
            }}>
              Heading 1
            </h1>
            <h2 style={{ 
              fontSize: theme.typography.h2.fontSize,
              fontWeight: theme.typography.h2.fontWeight,
              lineHeight: theme.typography.h2.lineHeight,
            }}>
              Heading 2
            </h2>
            <h3 style={{ 
              fontSize: theme.typography.h3.fontSize,
              fontWeight: theme.typography.h3.fontWeight,
              lineHeight: theme.typography.h3.lineHeight,
            }}>
              Heading 3
            </h3>
            <p style={{ 
              fontSize: theme.typography.body1.fontSize,
              fontWeight: theme.typography.body1.fontWeight,
              lineHeight: theme.typography.body1.lineHeight,
            }}>
              Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p style={{ 
              fontSize: theme.typography.body2.fontSize,
              fontWeight: theme.typography.body2.fontWeight,
              lineHeight: theme.typography.body2.lineHeight,
            }}>
              Body 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      )}

      {/* Spacing */}
      {showSpacing && (
        <div className="theme-spacing">
          <h3>Spacing</h3>
          <div className="spacing-samples">
            {[1, 2, 3, 4, 6, 8, 12].map((multiplier) => (
              <div key={multiplier} className="spacing-item">
                <div 
                  className="spacing-box"
                  style={{ 
                    width: theme.spacing(multiplier),
                    height: theme.spacing(multiplier),
                    backgroundColor: theme.palette.primary.main,
                  }}
                />
                <code>{multiplier} = {theme.spacing(multiplier)}</code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Components */}
      <div className="theme-components">
        <h3>Sample Components</h3>
        
        {/* Buttons */}
        <div className="component-group">
          <h4>Buttons</h4>
          <div className="button-group">
            <button 
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                border: 'none',
                padding: theme.spacing(1, 2),
                borderRadius: theme.borderRadius.base,
                cursor: 'pointer',
              }}
            >
              Primary Button
            </button>
            <button 
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                border: 'none',
                padding: theme.spacing(1, 2),
                borderRadius: theme.borderRadius.base,
                cursor: 'pointer',
              }}
            >
              Secondary Button
            </button>
            <button 
              style={{
                backgroundColor: 'transparent',
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.main}`,
                padding: theme.spacing(1, 2),
                borderRadius: theme.borderRadius.base,
                cursor: 'pointer',
              }}
            >
              Outline Button
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="component-group">
          <h4>Card</h4>
          <div 
            style={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.text.disabled}`,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing(3),
              boxShadow: theme.shadows.md,
              maxWidth: '300px',
            }}
          >
            <h5 style={{ margin: 0, marginBottom: theme.spacing(1) }}>Card Title</h5>
            <p style={{ 
              margin: 0, 
              color: theme.palette.text.secondary,
              fontSize: theme.typography.body2.fontSize,
            }}>
              This is a sample card component showing how the theme colors and spacing work together.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Children */}
      {children && (
        <div className="theme-custom">
          <h3>Custom Components</h3>
          {children}
        </div>
      )}

      <style >{`
        .atomix-theme-preview {
          padding: 24px;
          font-family: ${theme.typography.fontFamily};
          color: ${theme.palette.text.primary};
          background-color: ${theme.palette.background.default};
        }

        .theme-details {
          margin-bottom: 32px;
          padding: 16px;
          background-color: ${theme.palette.background.paper};
          border-radius: ${theme.borderRadius.lg};
        }

        .theme-palette,
        .theme-typography,
        .theme-spacing,
        .theme-components {
          margin-bottom: 32px;
        }

        .color-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .color-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .color-swatch {
          width: 40px;
          height: 40px;
          border-radius: ${theme.borderRadius.base};
          border: 1px solid ${theme.palette.text.disabled};
        }

        .color-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .color-info code {
          font-size: 12px;
          color: ${theme.palette.text.secondary};
        }

        .typography-samples {
          margin-top: 16px;
        }

        .typography-samples > * {
          margin: 8px 0;
        }

        .spacing-samples {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .spacing-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .spacing-box {
          border: 1px solid ${theme.palette.text.disabled};
        }

        .component-group {
          margin-bottom: 24px;
        }

        .button-group {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        h3 {
          color: ${theme.palette.text.primary};
          border-bottom: 2px solid ${theme.palette.primary.main};
          padding-bottom: 8px;
        }

        h4 {
          color: ${theme.palette.text.primary};
          margin-top: 24px;
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
};