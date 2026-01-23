/**
 * Design Tokens Customizer Component
 *
 * Interactive theme customizer that allows real-time editing of DesignTokens
 * with live preview and export functionality.
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { DesignTokens } from '../tokens/tokens';
import { defaultTokens, createTokens } from '../tokens/tokens';
import { createTheme } from '../core/createTheme';
import { createThemeObject } from '../core/createThemeObject';
import { generateCSSVariables } from '../generators/generateCSSVariables';
import { ThemePreview } from './Preview';

/**
 * Customizer props
 */
export interface DesignTokensCustomizerProps {
  /** Initial DesignTokens to customize */
  initialTokens?: Partial<DesignTokens>;
  /** Callback when tokens change */
  onTokensChange?: (tokens: DesignTokens) => void;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Color format type
 */
type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

/**
 * Token category for organization
 */
type TokenCategory = 'colors' | 'typography' | 'spacing' | 'shadows' | 'borders' | 'transitions' | 'zindex' | 'breakpoints';

/**
 * Design Tokens Customizer Component
 */
export const DesignTokensCustomizer: React.FC<DesignTokensCustomizerProps> = ({
  initialTokens = {},
  onTokensChange,
  className,
  style,
}) => {
  // Current tokens state
  const [tokens, setTokens] = useState<DesignTokens>(() => createTokens(initialTokens));
  const [colorFormat, setColorFormat] = useState<ColorFormat>('hex');
  const [activeCategory, setActiveCategory] = useState<TokenCategory>('colors');
  const [cssPreview, setCssPreview] = useState<string>('');

  // Generate CSS when tokens change
  useEffect(() => {
    const css = createTheme(tokens, { selector: ':root', prefix: 'atomix-preview' });
    setCssPreview(css);
    onTokensChange?.(tokens);
  }, [tokens, onTokensChange]);

  // Create theme object for preview
  const previewTheme = useMemo(() => {
    return createThemeObject({
      palette: {
        primary: { main: tokens['primary'] },
        secondary: { main: tokens['secondary'] },
        error: { main: tokens['error'] },
        warning: { main: tokens['warning'] },
        info: { main: tokens['info'] },
        success: { main: tokens['success'] },
        background: {
          default: '#ffffff',
          subtle: tokens['secondary-bg-subtle'] || '#f3f4f6',
        },
        text: {
          primary: tokens['primary-text-emphasis'] || '#111827',
          secondary: tokens['secondary-text-emphasis'] || '#374151',
          disabled: tokens['disabled-text-emphasis'] || '#9ca3af',
        },
      },
      typography: {
        fontFamily: tokens['body-font-family'] || '"Roboto", sans-serif',
        fontSize: parseInt(tokens['body-font-size'] || '16'),
      },
      spacing: (factor: number) => `${0.25 * factor}rem`, // Simplified spacing
    });
  }, [tokens]);

  // Update token value
  const updateToken = useCallback((key: keyof DesignTokens, value: string) => {
    setTokens(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Convert color format
  const convertColorFormat = useCallback((color: string, format: ColorFormat): string => {
    // Parse current color
    const temp = document.createElement('div');
    temp.style.color = color;
    document.body.appendChild(temp);
    const computed = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);

    const rgbMatch = computed.match(/\d+/g);
    if (!rgbMatch || rgbMatch.length < 3) return color;

    const r = parseInt(rgbMatch[0] || '0', 10);
    const g = parseInt(rgbMatch[1] || '0', 10);
    const b = parseInt(rgbMatch[2] || '0', 10);
    const a = rgbMatch[3] ? parseFloat(rgbMatch[3]) : 1;

    switch (format) {
      case 'hex':
        return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
      case 'rgb':
        return `rgb(${r}, ${g}, ${b})`;
      case 'rgba':
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      case 'hsl':
      case 'hsla':
        {
        const hsl = rgbToHsl(r, g, b);
        return format === 'hsl'
          ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
          : `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${a})`;
        }
      default:
        return color;
    }
  }, []);

  // RGB to HSL conversion
  function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  // Export functions
  const exportTokens = useCallback(() => {
    const dataStr = JSON.stringify(tokens, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'design-tokens.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [tokens]);

  const exportTheme = useCallback(() => {
    const themeCss = createTheme(tokens);
    const dataUri = 'data:text/css;charset=utf-8,' + encodeURIComponent(themeCss);
    const exportFileDefaultName = 'theme.css';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [tokens]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard?.writeText(JSON.stringify(tokens, null, 2));
  }, [tokens]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setTokens(defaultTokens);
  }, []);

  // Load tokens from file
  const loadTokensFromFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedTokens = JSON.parse(content);
        const mergedTokens = createTokens(parsedTokens);
        setTokens(mergedTokens);
      } catch (error) {
        console.error('Failed to load tokens:', error);
        alert('Invalid JSON file. Please select a valid design tokens JSON file.');
      }
    };
    reader.readAsText(file);
  }, []);

  // Token categories with their keys
  const tokenCategories = {
    colors: {
      label: 'Colors',
      tokens: [
        // Base colors
        'primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark',
        // RGB versions
        'primary-rgb', 'secondary-rgb', 'success-rgb', 'info-rgb', 'warning-rgb', 'error-rgb', 'light-rgb', 'dark-rgb',
        // Gray scale
        'gray-1', 'gray-2', 'gray-3', 'gray-4', 'gray-5', 'gray-6', 'gray-7', 'gray-8', 'gray-9', 'gray-10',
        // Primary scale
        'primary-1', 'primary-2', 'primary-3', 'primary-4', 'primary-5', 'primary-6', 'primary-7', 'primary-8', 'primary-9', 'primary-10',
        // Text emphasis
        'primary-text-emphasis', 'secondary-text-emphasis', 'tertiary-text-emphasis', 'disabled-text-emphasis',
        'invert-text-emphasis', 'brand-text-emphasis', 'error-text-emphasis', 'success-text-emphasis',
        'warning-text-emphasis', 'info-text-emphasis', 'light-text-emphasis', 'dark-text-emphasis',
        // Background subtle
        'primary-bg-subtle', 'secondary-bg-subtle', 'tertiary-bg-subtle', 'invert-bg-subtle',
        'brand-bg-subtle', 'error-bg-subtle', 'success-bg-subtle', 'warning-bg-subtle', 'info-bg-subtle',
        'light-bg-subtle', 'dark-bg-subtle',
        // Border subtle
        'primary-border-subtle', 'secondary-border-subtle', 'success-border-subtle', 'error-border-subtle',
        'warning-border-subtle', 'info-border-subtle', 'brand-border-subtle', 'light-border-subtle', 'dark-border-subtle',
        // Hover states
        'primary-hover', 'secondary-hover', 'light-hover', 'dark-hover', 'error-hover', 'success-hover',
        'warning-hover', 'info-hover',
        // Gradients
        'primary-gradient', 'secondary-gradient', 'light-gradient', 'dark-gradient', 'success-gradient',
        'info-gradient', 'warning-gradient', 'error-gradient', 'gradient',
      ],
    },
    typography: {
      label: 'Typography',
      tokens: [
        'font-sans-serif', 'font-monospace', 'body-font-family', 'body-font-size', 'body-font-weight',
        'body-line-height', 'body-color', 'body-bg', 'heading-color',
        'font-size-xl', 'font-size-2xl', 'display-1',
        'font-weight-light', 'font-weight-normal', 'font-weight-medium', 'font-weight-semibold',
        'font-weight-bold', 'font-weight-heavy', 'font-weight-black',
        'line-height-base', 'line-height-sm', 'line-height-lg',
        'letter-spacing-h1', 'letter-spacing-h2', 'letter-spacing-h3', 'letter-spacing-h4',
        'letter-spacing-h5', 'letter-spacing-h6',
        'link-color', 'link-color-rgb', 'link-decoration', 'link-hover-color', 'link-hover-color-rgb',
        'highlight-bg', 'code-color',
      ],
    },
    spacing: {
      label: 'Spacing',
      tokens: [
        'spacing-0', 'spacing-1', 'spacing-px-6', 'spacing-2', 'spacing-px-10', 'spacing-3', 'spacing-px-14',
        'spacing-4', 'spacing-5', 'spacing-px-22', 'spacing-6', 'spacing-7', 'spacing-px-30', 'spacing-8',
        'spacing-9', 'spacing-10', 'spacing-11', 'spacing-12', 'spacing-14', 'spacing-16', 'spacing-20',
        'spacing-24', 'spacing-28', 'spacing-32', 'spacing-36', 'spacing-40', 'spacing-44', 'spacing-48',
        'spacing-52', 'spacing-56', 'spacing-60', 'spacing-64', 'spacing-72', 'spacing-80', 'spacing-90', 'spacing-200',
      ],
    },
    shadows: {
      label: 'Shadows',
      tokens: [
        'box-shadow', 'box-shadow-xs', 'box-shadow-sm', 'box-shadow-lg', 'box-shadow-xl', 'box-shadow-inset',
      ],
    },
    borders: {
      label: 'Borders',
      tokens: [
        'border-width', 'border-style', 'border-color', 'border-color-translucent',
        'border-radius', 'border-radius-sm', 'border-radius-lg', 'border-radius-xl', 'border-radius-xxl',
        'border-radius-2xl', 'border-radius-3xl', 'border-radius-4xl', 'border-radius-pill',
        'focus-border-color', 'focus-ring-width', 'focus-ring-offset', 'focus-ring-opacity',
        'form-valid-color', 'form-valid-border-color', 'form-invalid-color', 'form-invalid-border-color',
      ],
    },
    transitions: {
      label: 'Transitions',
      tokens: [
        'transition-duration-fast', 'transition-duration-base', 'transition-duration-slow', 'transition-duration-slower',
        'easing-base', 'easing-ease-in-out', 'easing-ease-out', 'easing-ease-in', 'easing-ease-linear',
        'transition-fast', 'transition-base', 'transition-slow',
      ],
    },
    zindex: {
      label: 'Z-Index',
      tokens: [
        'z-n1', 'z-0', 'z-1', 'z-2', 'z-3', 'z-4', 'z-5', 'z-dropdown', 'z-sticky', 'z-fixed',
        'z-modal', 'z-popover', 'z-tooltip', 'z-drawer',
      ],
    },
    breakpoints: {
      label: 'Breakpoints',
      tokens: [
        'breakpoint-xs', 'breakpoint-sm', 'breakpoint-md', 'breakpoint-lg', 'breakpoint-xl', 'breakpoint-xxl',
      ],
    },
  };

  return (
    <div className={`design-tokens-customizer ${className || ''}`} style={style}>
      <div className="customizer-header">
        <h2>Interactive Theme Customizer</h2>
        <div className="customizer-controls">
          <select
            value={colorFormat}
            onChange={(e) => setColorFormat(e.target.value as ColorFormat)}
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="rgba">RGBA</option>
            <option value="hsl">HSL</option>
            <option value="hsla">HSLA</option>
          </select>
          <button onClick={resetToDefaults}>Reset to Defaults</button>
          <label className="file-input-button">
            Load Tokens
            <input
              type="file"
              accept=".json"
              onChange={loadTokensFromFile}
              style={{ display: 'none' }}
            />
          </label>
          <button onClick={copyToClipboard}>Copy Tokens</button>
          <button onClick={exportTokens}>Export Tokens</button>
          <button onClick={exportTheme}>Export Theme CSS</button>
        </div>
      </div>

      <div className="customizer-content">
        <div className="customizer-sidebar">
          {Object.entries(tokenCategories).map(([key, category]) => (
            <button
              key={key}
              className={`category-button ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key as TokenCategory)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="customizer-editor">
          <h3>{tokenCategories[activeCategory].label}</h3>
          <div className="tokens-grid">
            {tokenCategories[activeCategory].tokens.map((tokenKey) => {
              const value = tokens[tokenKey as keyof DesignTokens] || '';
              const isColor = tokenKey.includes('color') || tokenKey.includes('bg') || tokenKey.includes('gradient') ||
                             ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark'].includes(tokenKey) ||
                             tokenKey.match(/^(gray|primary|red|green|blue|yellow)-\d+$/);

              return (
                <div key={tokenKey} className="token-item">
                  <label>{tokenKey}</label>
                  {isColor ? (
                    <div className="color-input-group">
                      <input
                        type="color"
                        value={value.startsWith('#') ? value : convertColorFormat(value, 'hex')}
                        onChange={(e) => updateToken(tokenKey as keyof DesignTokens, e.target.value)}
                      />
                      <input
                        type="text"
                        value={convertColorFormat(value, colorFormat)}
                        onChange={(e) => {
                          const converted = convertColorFormat(e.target.value, 'hex');
                          updateToken(tokenKey as keyof DesignTokens, converted);
                        }}
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateToken(tokenKey as keyof DesignTokens, e.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="customizer-preview">
          <h3>Live Preview</h3>
          <style>{cssPreview}</style>
          <ThemePreview
            theme={previewTheme}
            showDetails={false}
            showPalette={true}
            showTypography={true}
            showSpacing={true}
          />
        </div>
      </div>

      <style>{`
        .design-tokens-customizer {
          display: flex;
          flex-direction: column;
          height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .customizer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #e0e0e0;
          background: #f5f5f5;
        }

        .customizer-header h2 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }

        .customizer-controls {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .customizer-controls select,
        .customizer-controls button {
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background: white;
          cursor: pointer;
        }

        .customizer-controls button:hover,
        .file-input-button:hover {
          background: #f0f0f0;
        }

        .file-input-button {
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          font-size: 14px;
          display: inline-block;
        }

        .customizer-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .customizer-sidebar {
          width: 200px;
          border-right: 1px solid #e0e0e0;
          padding: 16px;
          background: #fafafa;
          overflow-y: auto;
        }

        .category-button {
          display: block;
          width: 100%;
          padding: 12px;
          margin-bottom: 8px;
          border: none;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          font-size: 14px;
        }

        .category-button:hover,
        .category-button.active {
          background: #e0e0e0;
        }

        .customizer-editor {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
        }

        .customizer-editor h3 {
          margin-top: 0;
          margin-bottom: 16px;
          color: #333;
        }

        .tokens-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        .token-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .token-item label {
          font-size: 14px;
          font-weight: 500;
          color: #666;
        }

        .color-input-group {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .color-input-group input[type="color"] {
          width: 50px;
          height: 40px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          cursor: pointer;
        }

        .color-input-group input[type="text"],
        .token-item input[type="text"] {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
          font-family: 'Monaco', 'Menlo', monospace;
        }

        .customizer-preview {
          width: 400px;
          border-left: 1px solid #e0e0e0;
          padding: 24px;
          overflow-y: auto;
          background: #fafafa;
        }

        .customizer-preview h3 {
          margin-top: 0;
          margin-bottom: 16px;
          color: #333;
        }
      `}</style>
    </div>
  );
};