/**
 * Theme Studio Component
 * 
 * Visual theme editor and generator for creating and customizing themes
 */

import React, { useState, useCallback, useMemo } from 'react';
import type { Theme, ThemeOptions, PaletteOptions, TypographyOptions } from '../types';
import { createTheme } from '../createTheme';
import { generateCSSVariables } from '../generateCSSVariables';
import { getLogger } from '../errors';

/**
 * Theme Studio Props
 */
export interface ThemeStudioProps {
  /** Initial theme to edit */
  initialTheme?: Theme | ThemeOptions;
  /** Callback when theme changes */
  onThemeChange?: (theme: Theme) => void;
  /** Callback when theme is saved */
  onSave?: (theme: Theme) => void;
  /** Show preview */
  showPreview?: boolean;
  /** Show CSS output */
  showCSS?: boolean;
  /** Show code output */
  showCode?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Theme Studio Component
 * 
 * Visual editor for creating and customizing themes
 */
export const ThemeStudio: React.FC<ThemeStudioProps> = ({
  initialTheme,
  onThemeChange,
  onSave,
  showPreview = true,
  showCSS = true,
  showCode = false,
  className = '',
}) => {
  const logger = useMemo(() => getLogger(), []);

  const [themeOptions, setThemeOptions] = useState<ThemeOptions>(() => {
    if (initialTheme) {
      return initialTheme as ThemeOptions;
    }
    return {
      name: 'Custom Theme',
      palette: {
        primary: { main: '#7AFFD7' },
        secondary: { main: '#FF5733' },
      },
    };
  });

  // Generate theme from options
  const currentTheme = useMemo(() => {
    try {
      return createTheme(themeOptions);
    } catch (error) {
      logger.error(
        'Error creating theme',
        error instanceof Error ? error : new Error(String(error)),
        { themeOptions }
      );
      return createTheme({ name: 'Error Theme' });
    }
  }, [themeOptions, logger]);

  // Generate CSS variables
  const cssOutput = useMemo(() => {
    try {
      return generateCSSVariables(currentTheme, {
        selector: ':root',
        prefix: 'atomix',
      });
    } catch (error) {
      logger.error(
        'Error generating CSS',
        error instanceof Error ? error : new Error(String(error)),
        { theme: currentTheme.name }
      );
      return '';
    }
  }, [currentTheme, logger]);

  // Notify parent of theme changes
  React.useEffect(() => {
    onThemeChange?.(currentTheme);
  }, [currentTheme, onThemeChange]);

  // Update palette color
  const updatePaletteColor = useCallback((
    colorKey: keyof PaletteOptions,
    variant: 'main' | 'light' | 'dark' | 'contrastText',
    value: string
  ) => {
    setThemeOptions(prev => ({
      ...prev,
      palette: {
        ...prev.palette,
        [colorKey]: {
          ...(typeof prev.palette?.[colorKey] === 'object' && prev.palette[colorKey] !== null
            ? prev.palette[colorKey]
            : typeof prev.palette?.[colorKey] === 'string'
            ? { main: prev.palette[colorKey] as string }
            : {}),
          [variant]: value,
        },
      },
    }));
  }, []);

  // Update typography
  const updateTypography = useCallback((
    key: keyof TypographyOptions,
    value: any
  ) => {
    setThemeOptions(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value,
      },
    }));
  }, []);

  // Handle save
  const handleSave = useCallback(() => {
    onSave?.(currentTheme);
  }, [currentTheme, onSave]);

  return (
    <div className={`theme-studio ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
        <h2 style={{ margin: 0 }}>Theme Studio</h2>
        <button
          onClick={handleSave}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: currentTheme.palette.primary.main,
            color: currentTheme.palette.primary.contrastText,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save Theme
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem' }}>
        {/* Palette Editor */}
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Color Palette</h3>
          
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map(colorKey => {
            const color = currentTheme.palette[colorKey];
            return (
              <div key={colorKey} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'capitalize' }}>
                  {colorKey}
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {(['main', 'light', 'dark'] as const).map(variant => (
                    <div key={variant} style={{ flex: '1', minWidth: '100px' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', textTransform: 'capitalize' }}>
                        {variant}
                      </label>
                      <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                        <input
                          type="color"
                          value={color[variant] || '#000000'}
                          onChange={(e) => updatePaletteColor(colorKey, variant, e.target.value)}
                          style={{ width: '40px', height: '32px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                        />
                        <input
                          type="text"
                          value={color[variant] || ''}
                          onChange={(e) => updatePaletteColor(colorKey, variant, e.target.value)}
                          style={{ flex: 1, padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Typography Editor */}
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Typography</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Font Family
            </label>
            <input
              type="text"
              value={currentTheme.typography.fontFamily}
              onChange={(e) => updateTypography('fontFamily', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Base Font Size
            </label>
            <input
              type="number"
              value={currentTheme.typography.fontSize}
              onChange={(e) => updateTypography('fontSize', Number(e.target.value))}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              min="10"
              max="24"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem', margin: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Preview</h3>
          <div style={{
            padding: '1rem',
            backgroundColor: currentTheme.palette.background.paper,
            color: currentTheme.palette.text.primary,
            borderRadius: '8px',
          }}>
            <h1 style={{ color: currentTheme.palette.primary.main, margin: '0 0 1rem 0' }}>
              Heading 1
            </h1>
            <p style={{ margin: '0 0 1rem 0' }}>
              This is a preview of your theme. The colors, typography, and spacing will be applied throughout your application.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: currentTheme.palette.primary.main,
                color: currentTheme.palette.primary.contrastText,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
                Primary Button
              </button>
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: currentTheme.palette.secondary.main,
                color: currentTheme.palette.secondary.contrastText,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Output */}
      {showCSS && (
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem', margin: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Generated CSS</h3>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '300px',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
          }}>
            {cssOutput}
          </pre>
        </div>
      )}

      {/* Code Output */}
      {showCode && (
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem', margin: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Theme Code</h3>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '300px',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
          }}>
            {JSON.stringify(themeOptions, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ThemeStudio;
