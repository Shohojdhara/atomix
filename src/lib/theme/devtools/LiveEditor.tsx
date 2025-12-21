/**
 * Theme Live Editor Component
 * 
 * React component for live editing themes in development
 */

import React, { useState, useCallback } from 'react';
import type { Theme } from '../types';
import { createTheme } from '../createTheme';
import { ThemePreview } from './Preview';

/**
 * Live editor props
 */
export interface ThemeLiveEditorProps {
  /** Initial theme */
  initialTheme: Theme;
  /** Callback when theme changes */
  onChange?: (theme: Theme) => void;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Theme Live Editor Component
 * 
 * Allows live editing of theme properties with instant preview
 */
export const ThemeLiveEditor: React.FC<ThemeLiveEditorProps> = ({
  initialTheme,
  onChange,
  className,
  style,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(initialTheme, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'visual' | 'json'>('visual');

  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    setJsonInput(JSON.stringify(newTheme, null, 2));
    onChange?.(newTheme);
    setError(null);
  }, [onChange]);

  const handleJsonChange = useCallback((value: string) => {
    setJsonInput(value);
    try {
      const parsed = JSON.parse(value);
      const newTheme = createTheme(parsed);
      setTheme(newTheme);
      onChange?.(newTheme);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  }, [onChange]);

  const handleColorChange = useCallback((path: string, value: string) => {
    const newTheme = { ...theme };
    const keys = path.split('.');
    let current: any = newTheme;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    updateTheme(createTheme(newTheme));
  }, [theme, updateTheme]);

  const exportTheme = useCallback(() => {
    const dataStr = JSON.stringify(theme, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [theme]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard?.writeText(jsonInput);
  }, [jsonInput]);

  return (
    <div className={`atomix-theme-live-editor ${className || ''}`} style={style}>
      <div className="editor-header">
        <h2>Live Theme Editor</h2>
        <div className="editor-controls">
          <button
            className={`mode-button ${editMode === 'visual' ? 'active' : ''}`}
            onClick={() => setEditMode('visual')}
          >
            Visual
          </button>
          <button
            className={`mode-button ${editMode === 'json' ? 'active' : ''}`}
            onClick={() => setEditMode('json')}
          >
            JSON
          </button>
          <button className="export-button" onClick={exportTheme}>
            Export
          </button>
          <button className="copy-button" onClick={copyToClipboard}>
            Copy JSON
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="editor-panel">
          {editMode === 'visual' ? (
            <div className="visual-editor">
              <h3>Colors</h3>
              
              {/* Primary Color */}
              <div className="editor-field">
                <label>Primary Color</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    value={theme.palette.primary.main}
                    onChange={(e) => handleColorChange('palette.primary.main', e.target.value)}
                  />
                  <input
                    type="text"
                    value={theme.palette.primary.main}
                    onChange={(e) => handleColorChange('palette.primary.main', e.target.value)}
                    placeholder="#7AFFD7"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div className="editor-field">
                <label>Secondary Color</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    value={theme.palette.secondary.main}
                    onChange={(e) => handleColorChange('palette.secondary.main', e.target.value)}
                  />
                  <input
                    type="text"
                    value={theme.palette.secondary.main}
                    onChange={(e) => handleColorChange('palette.secondary.main', e.target.value)}
                    placeholder="#FF5733"
                  />
                </div>
              </div>

              {/* Background Colors */}
              <h3>Background</h3>
              <div className="editor-field">
                <label>Default Background</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    value={theme.palette.background.default}
                    onChange={(e) => handleColorChange('palette.background.default', e.target.value)}
                  />
                  <input
                    type="text"
                    value={theme.palette.background.default}
                    onChange={(e) => handleColorChange('palette.background.default', e.target.value)}
                  />
                </div>
              </div>

              {/* Typography */}
              <h3>Typography</h3>
              <div className="editor-field">
                <label>Font Family</label>
                <input
                  type="text"
                  value={theme.typography.fontFamily}
                  onChange={(e) => handleColorChange('typography.fontFamily', e.target.value)}
                  placeholder="Inter, sans-serif"
                />
              </div>

              <div className="editor-field">
                <label>Base Font Size (px)</label>
                <input
                  type="number"
                  value={theme.typography.fontSize}
                  onChange={(e) => handleColorChange('typography.fontSize', parseInt(e.target.value))}
                  min="10"
                  max="24"
                />
              </div>
            </div>
          ) : (
            <div className="json-editor">
              <textarea
                value={jsonInput}
                onChange={(e) => handleJsonChange(e.target.value)}
                spellCheck={false}
              />
              {error && (
                <div className="error-message">
                  ❌ {error}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="preview-panel">
          <h3>Live Preview</h3>
          <ThemePreview
            theme={theme}
            showDetails={false}
            showPalette={true}
            showTypography={true}
          />
        </div>
      </div>

      <style>{`
        .atomix-theme-live-editor {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #e0e0e0;
          background: #f5f5f5;
          border-radius: 8px 8px 0 0;
        }

        .editor-header h2 {
          margin: 0;
          font-size: 20px;
          color: #333;
        }

        .editor-controls {
          display: flex;
          gap: 8px;
        }

        .mode-button,
        .export-button,
        .copy-button {
          padding: 8px 16px;
          border: 1px solid #e0e0e0;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .mode-button:hover,
        .export-button:hover,
        .copy-button:hover {
          background: #f5f5f5;
        }

        .mode-button.active {
          background: #2196f3;
          color: white;
          border-color: #2196f3;
        }

        .export-button {
          background: #4caf50;
          color: white;
          border-color: #4caf50;
        }

        .copy-button {
          background: #ff9800;
          color: white;
          border-color: #ff9800;
        }

        .editor-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 24px;
          min-height: 600px;
        }

        .editor-panel,
        .preview-panel {
          overflow-y: auto;
        }

        .editor-panel h3,
        .preview-panel h3 {
          margin: 0 0 16px 0;
          font-size: 16px;
          color: #333;
          border-bottom: 2px solid #2196f3;
          padding-bottom: 8px;
        }

        .visual-editor {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .editor-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .editor-field label {
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
        .editor-field input[type="text"],
        .editor-field input[type="number"] {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
          font-family: 'Monaco', 'Menlo', monospace;
        }

        .json-editor {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .json-editor textarea {
          flex: 1;
          padding: 16px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 12px;
          line-height: 1.5;
          resize: none;
        }

        .error-message {
          padding: 12px;
          background: #ffebee;
          color: #d32f2f;
          border-radius: 4px;
          margin-top: 8px;
          font-size: 14px;
        }

        .preview-panel {
          border-left: 1px solid #e0e0e0;
          padding-left: 24px;
        }
      `}</style>
    </div>
  );
};

