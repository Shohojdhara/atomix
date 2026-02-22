/**
 * Theme Preview Component
 *
 * React component for previewing themes in development
 * Enhanced with interactive components, viewport controls, and dark mode toggle
 */

import React, { useState, useEffect, useMemo } from 'react';
import type { Theme } from '../types';
import { generateCSSVariables } from '../generators/generateCSSVariables';

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
 * Viewport preset
 */
type ViewportPreset = 'mobile' | 'tablet' | 'desktop' | 'custom';

/**
 * Viewport configuration
 */
interface ViewportConfig {
  width: number;
  height: number;
  label: string;
}

const VIEWPORT_PRESETS: Record<ViewportPreset, ViewportConfig> = {
  mobile: { width: 375, height: 667, label: 'Mobile (375px)' },
  tablet: { width: 768, height: 1024, label: 'Tablet (768px)' },
  desktop: { width: 1280, height: 720, label: 'Desktop (1280px)' },
  custom: { width: 1280, height: 720, label: 'Custom' },
};

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
  const [darkMode, setDarkMode] = useState(false);
  const [viewportPreset, setViewportPreset] = useState<ViewportPreset>('desktop');
  const [customWidth, setCustomWidth] = useState(1280);
  const [customHeight, setCustomHeight] = useState(720);
  const [interactiveStates, setInteractiveStates] = useState<Record<string, boolean>>({});

  // Get current viewport dimensions
  const viewport = useMemo(() => {
    if (viewportPreset === 'custom') {
      return { width: customWidth, height: customHeight };
    }
    return VIEWPORT_PRESETS[viewportPreset];
  }, [viewportPreset, customWidth, customHeight]);

  // Generate theme with dark mode override if needed
  const previewTheme = useMemo(() => {
    if (!darkMode) return theme;

    // Create a dark mode variant (simplified - you might want more sophisticated logic)
    return {
      ...theme,
      palette: {
        ...theme.palette,
        background: {
          default: '#121212',
          subtle: '#1e1e1e',
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.8)',
          disabled: 'rgba(255, 255, 255, 0.5)',
        },
      },
    };
  }, [theme, darkMode]);

  useEffect(() => {
    // Generate CSS variables for the theme
    const css = generateCSSVariables(previewTheme as Theme, {
      selector: ':root',
      prefix: 'atomix-preview',
    });
    setCssVariables(css);
  }, [previewTheme]);

  const toggleInteractiveState = (id: string) => {
    setInteractiveStates(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleButtonClick = (id: string) => {
    toggleInteractiveState(id);
    // Reset after animation
    setTimeout(() => {
      setInteractiveStates(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 200);
  };

  return (
    <div className={`atomix-theme-preview ${className || ''}`} style={style}>
      {/* Preview Controls */}
      <div className="preview-controls">
        <div className="control-group">
          <label>Viewport:</label>
          <select
            value={viewportPreset}
            onChange={e => setViewportPreset(e.target.value as ViewportPreset)}
          >
            <option value="mobile">Mobile (375px)</option>
            <option value="tablet">Tablet (768px)</option>
            <option value="desktop">Desktop (1280px)</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {viewportPreset === 'custom' && (
          <>
            <div className="control-group">
              <label>Width:</label>
              <input
                type="number"
                value={customWidth}
                onChange={e => setCustomWidth(parseInt(e.target.value) || 1280)}
                min="320"
                max="3840"
              />
            </div>
            <div className="control-group">
              <label>Height:</label>
              <input
                type="number"
                value={customHeight}
                onChange={e => setCustomHeight(parseInt(e.target.value) || 720)}
                min="240"
                max="2160"
              />
            </div>
          </>
        )}

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={e => setDarkMode(e.target.checked)}
            />
            Dark Mode
          </label>
        </div>
      </div>

      {/* Viewport Wrapper */}
      <div
        className="viewport-wrapper"
        style={{
          width: `${viewport.width}px`,
          height: `${viewport.height}px`,
          maxWidth: '100%',
        }}
      >
        {/* Inject theme CSS variables */}
        <style>{cssVariables}</style>

        {/* Theme Details */}
        {showDetails && (
          <div className="theme-details">
            <h2>{previewTheme.name}</h2>
            {previewTheme.description && <p>{previewTheme.description}</p>}
            {previewTheme.author && (
              <p>
                <strong>Author:</strong> {previewTheme.author}
              </p>
            )}
            {previewTheme.version && (
              <p>
                <strong>Version:</strong> {previewTheme.version}
              </p>
            )}
            {previewTheme.status && (
              <p>
                <strong>Status:</strong> {previewTheme.status}
              </p>
            )}
            {previewTheme.tags && previewTheme.tags.length > 0 && (
              <p>
                <strong>Tags:</strong> {previewTheme.tags.join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Color Palette */}
        {showPalette && (
          <div className="theme-palette">
            <h3>Color Palette</h3>
            <div className="color-grid">
              {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map(colorName => {
                const color = previewTheme.palette[colorName as keyof typeof previewTheme.palette];
                if (!color || typeof color !== 'object' || !('main' in color)) return null;

                return (
                  <div key={colorName} className="color-item">
                    <div className="color-swatch" style={{ backgroundColor: color.main }} />
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
              {Object.entries(previewTheme.palette.background).map(([name, value]) => (
                <div key={name} className="color-item">
                  <div className="color-swatch" style={{ backgroundColor: value }} />
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
              {Object.entries(previewTheme.palette.text).map(([name, value]) => (
                <div key={name} className="color-item">
                  <div className="color-swatch" style={{ backgroundColor: value }} />
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
              <p>
                <strong>Font Family:</strong> <code>{previewTheme.typography.fontFamily}</code>
              </p>
              <p>
                <strong>Base Font Size:</strong> <code>{previewTheme.typography.fontSize}px</code>
              </p>
            </div>

            <div className="typography-samples">
              <h1
                style={{
                  fontSize: previewTheme.typography.h1.fontSize,
                  fontWeight: previewTheme.typography.h1.fontWeight,
                  lineHeight: previewTheme.typography.h1.lineHeight,
                }}
              >
                Heading 1
              </h1>
              <h2
                style={{
                  fontSize: previewTheme.typography.h2.fontSize,
                  fontWeight: previewTheme.typography.h2.fontWeight,
                  lineHeight: previewTheme.typography.h2.lineHeight,
                }}
              >
                Heading 2
              </h2>
              <h3
                style={{
                  fontSize: previewTheme.typography.h3.fontSize,
                  fontWeight: previewTheme.typography.h3.fontWeight,
                  lineHeight: previewTheme.typography.h3.lineHeight,
                }}
              >
                Heading 3
              </h3>
              <p
                style={{
                  fontSize: previewTheme.typography.body1.fontSize,
                  fontWeight: previewTheme.typography.body1.fontWeight,
                  lineHeight: previewTheme.typography.body1.lineHeight,
                }}
              >
                Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p
                style={{
                  fontSize: previewTheme.typography.body2.fontSize,
                  fontWeight: previewTheme.typography.body2.fontWeight,
                  lineHeight: previewTheme.typography.body2.lineHeight,
                }}
              >
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
              {[1, 2, 3, 4, 6, 8, 12].map(multiplier => (
                <div key={multiplier} className="spacing-item">
                  <div
                    className="spacing-box"
                    style={{
                      width: previewTheme.spacing(multiplier),
                      height: previewTheme.spacing(multiplier),
                      backgroundColor: previewTheme.palette.primary.main,
                    }}
                  />
                  <code>
                    {multiplier} = {previewTheme.spacing(multiplier)}
                  </code>
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
                className={`interactive-button ${interactiveStates['btn-primary'] ? 'active' : ''}`}
                onClick={() => handleButtonClick('btn-primary')}
                onMouseEnter={() =>
                  setInteractiveStates(prev => ({ ...prev, 'btn-primary-hover': true }))
                }
                onMouseLeave={() =>
                  setInteractiveStates(prev => {
                    const next = { ...prev };
                    delete next['btn-primary-hover'];
                    return next;
                  })
                }
                style={{
                  backgroundColor: interactiveStates['btn-primary-hover']
                    ? previewTheme.palette.primary.dark || previewTheme.palette.primary.main
                    : previewTheme.palette.primary.main,
                  color: previewTheme.palette.primary.contrastText,
                  border: 'none',
                  padding: previewTheme.spacing(1, 2),
                  borderRadius: previewTheme.borderRadius.base,
                  cursor: 'pointer',
                  transform: interactiveStates['btn-primary'] ? 'scale(0.95)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                }}
              >
                Primary Button
              </button>
              <button
                className={`interactive-button ${interactiveStates['btn-secondary'] ? 'active' : ''}`}
                onClick={() => handleButtonClick('btn-secondary')}
                onMouseEnter={() =>
                  setInteractiveStates(prev => ({ ...prev, 'btn-secondary-hover': true }))
                }
                onMouseLeave={() =>
                  setInteractiveStates(prev => {
                    const next = { ...prev };
                    delete next['btn-secondary-hover'];
                    return next;
                  })
                }
                style={{
                  backgroundColor: interactiveStates['btn-secondary-hover']
                    ? previewTheme.palette.secondary.dark || previewTheme.palette.secondary.main
                    : previewTheme.palette.secondary.main,
                  color: previewTheme.palette.secondary.contrastText,
                  border: 'none',
                  padding: previewTheme.spacing(1, 2),
                  borderRadius: previewTheme.borderRadius.base,
                  cursor: 'pointer',
                  transform: interactiveStates['btn-secondary'] ? 'scale(0.95)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                }}
              >
                Secondary Button
              </button>
              <button
                className={`interactive-button ${interactiveStates['btn-outline'] ? 'active' : ''}`}
                onClick={() => handleButtonClick('btn-outline')}
                onMouseEnter={() =>
                  setInteractiveStates(prev => ({ ...prev, 'btn-outline-hover': true }))
                }
                onMouseLeave={() =>
                  setInteractiveStates(prev => {
                    const next = { ...prev };
                    delete next['btn-outline-hover'];
                    return next;
                  })
                }
                onFocus={() =>
                  setInteractiveStates(prev => ({ ...prev, 'btn-outline-focus': true }))
                }
                onBlur={() =>
                  setInteractiveStates(prev => {
                    const next = { ...prev };
                    delete next['btn-outline-focus'];
                    return next;
                  })
                }
                style={{
                  backgroundColor: 'transparent',
                  color: previewTheme.palette.primary.main,
                  border: `2px solid ${interactiveStates['btn-outline-focus'] ? previewTheme.palette.primary.dark || previewTheme.palette.primary.main : previewTheme.palette.primary.main}`,
                  padding: previewTheme.spacing(1, 2),
                  borderRadius: previewTheme.borderRadius.base,
                  cursor: 'pointer',
                  transform: interactiveStates['btn-outline'] ? 'scale(0.95)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                  outline: interactiveStates['btn-outline-focus']
                    ? `2px solid ${previewTheme.palette.primary.main}`
                    : 'none',
                  outlineOffset: '2px',
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
              className="interactive-card"
              onMouseEnter={() => setInteractiveStates(prev => ({ ...prev, 'card-hover': true }))}
              onMouseLeave={() =>
                setInteractiveStates(prev => {
                  const next = { ...prev };
                  delete next['card-hover'];
                  return next;
                })
              }
              style={{
                backgroundColor: previewTheme.palette.background.subtle,
                border: `1px solid ${previewTheme.palette.text.disabled}`,
                borderRadius: previewTheme.borderRadius.lg,
                padding: previewTheme.spacing(3),
                boxShadow: interactiveStates['card-hover']
                  ? previewTheme.shadows.lg
                  : previewTheme.shadows.md,
                maxWidth: '300px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
            >
              <h5 style={{ margin: 0, marginBottom: previewTheme.spacing(1) }}>Card Title</h5>
              <p
                style={{
                  margin: 0,
                  color: previewTheme.palette.text.secondary,
                  fontSize: previewTheme.typography.body2.fontSize,
                }}
              >
                This is a sample card component showing how the theme colors and spacing work
                together.
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
      </div>

      <style>{`
        .atomix-theme-preview {
          padding: 24px;
          font-family: ${previewTheme.typography.fontFamily};
          color: ${previewTheme.palette.text.primary};
          background-color: ${previewTheme.palette.background.default};
        }

        .preview-controls {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 16px;
          background: ${previewTheme.palette.background.subtle};
          border-radius: ${previewTheme.borderRadius.md};
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .control-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .control-group label {
          font-size: 14px;
          color: ${previewTheme.palette.text.secondary};
        }

        .control-group select,
        .control-group input[type="number"] {
          padding: 6px 12px;
          border: 1px solid ${previewTheme.palette.text.disabled};
          border-radius: ${previewTheme.borderRadius.base};
          font-size: 14px;
          background: ${previewTheme.palette.background.default};
          color: ${previewTheme.palette.text.primary};
        }

        .control-group input[type="checkbox"] {
          margin-right: 4px;
        }

        .viewport-wrapper {
          border: 2px solid ${previewTheme.palette.text.disabled};
          border-radius: ${previewTheme.borderRadius.lg};
          overflow: auto;
          background: ${previewTheme.palette.background.default};
          margin: 0 auto;
          box-shadow: ${previewTheme.shadows.lg};
        }

        .theme-details {
          margin-bottom: 32px;
          padding: 16px;
          background-color: ${previewTheme.palette.background.subtle};
          border-radius: ${previewTheme.borderRadius.lg};
        }

        .theme-palette,
        .theme-typography,
        .theme-spacing,
        .theme-components {
          margin-bottom: 32px;
          padding: 16px;
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
          border-radius: ${previewTheme.borderRadius.base};
          border: 1px solid ${previewTheme.palette.text.disabled};
        }

        .color-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .color-info code {
          font-size: 12px;
          color: ${previewTheme.palette.text.secondary};
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
          border: 1px solid ${previewTheme.palette.text.disabled};
        }

        .component-group {
          margin-bottom: 24px;
        }

        .button-group {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .interactive-button {
          transition: all 0.2s ease;
        }

        .interactive-button:focus-visible {
          outline: 2px solid ${previewTheme.palette.primary.main};
          outline-offset: 2px;
        }

        .interactive-card {
          transition: all 0.2s ease;
        }

        h3 {
          color: ${previewTheme.palette.text.primary};
          border-bottom: 2px solid ${previewTheme.palette.primary.main};
          padding-bottom: 8px;
        }

        h4 {
          color: ${previewTheme.palette.text.primary};
          margin-top: 24px;
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
};
