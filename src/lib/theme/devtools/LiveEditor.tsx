/**
 * Theme Live Editor Component
 * 
 * React component for live editing themes in development
 * Enhanced with undo/redo, keyboard shortcuts, resizable layout, and better color pickers
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { Theme } from '../types';
import { createThemeObject } from '../core/createThemeObject';
import { ThemePreview } from './Preview';
import { useHistory } from './useHistory';

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
 * Color format type
 */
type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

/**
 * Convert color to different formats
 */
function convertColorFormat(color: string, format: ColorFormat): string {
  // Remove whitespace
  color = color.trim();
  
  // If already in target format, return as is
  if (format === 'hex' && color.startsWith('#')) return color;
  if (format === 'rgb' && color.startsWith('rgb(')) return color;
  if (format === 'rgba' && color.startsWith('rgba(')) return color;
  if (format === 'hsl' && color.startsWith('hsl(')) return color;
  if (format === 'hsla' && color.startsWith('hsla(')) return color;

  // Create a temporary element to parse color
  const temp = document.createElement('div');
  temp.style.color = color;
  document.body.appendChild(temp);
  const computed = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);

  // Parse rgb values
  const rgbMatch = computed.match(/\d+/g);
  if (!rgbMatch || rgbMatch.length < 3) return color;

  const r = parseInt(rgbMatch[0], 10);
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
    case 'hsla': {
      // Convert RGB to HSL (simplified)
      const hsl = rgbToHsl(r, g, b);
      return format === 'hsl' 
        ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
        : `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${a})`;
    }
    default:
      return color;
  }
}

/**
 * Convert RGB to HSL
 */
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
  const {
    state: theme,
    setState: setThemeHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory<Theme>({
    initialState: initialTheme,
    maxHistorySize: 50,
  });

  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(initialTheme, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'visual' | 'json'>('visual');
  const [colorFormat, setColorFormat] = useState<ColorFormat>('hex');
  const [resizerPosition, setResizerPosition] = useState<number>(50); // Percentage
  const [isResizing, setIsResizing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Load saved layout preference
  useEffect(() => {
    const saved = localStorage.getItem('atomix-editor-layout');
    if (saved) {
      const position = parseFloat(saved);
      if (!isNaN(position) && position > 0 && position < 100) {
        setResizerPosition(position);
      }
    }
  }, []);

  // Save layout preference
  useEffect(() => {
    localStorage.setItem('atomix-editor-layout', resizerPosition.toString());
  }, [resizerPosition]);

  const updateTheme = useCallback((newTheme: Theme, addToHistory = true) => {
    if (addToHistory) {
      setThemeHistory(newTheme);
    } else {
      // Direct update without history (for JSON editor typing)
      setJsonInput(JSON.stringify(newTheme, null, 2));
    }
    onChange?.(newTheme);
    setError(null);
  }, [onChange, setThemeHistory]);

  // Sync JSON input with theme history
  useEffect(() => {
    setJsonInput(JSON.stringify(theme, null, 2));
  }, [theme]);

  const handleJsonChange = useCallback((value: string) => {
    setJsonInput(value);
    try {
      const parsed = JSON.parse(value);
      const newTheme = createThemeObject(parsed);
      updateTheme(newTheme, false); // Don't add to history on every keystroke
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  }, [updateTheme]);

  // Debounced JSON update to history
  const jsonUpdateTimeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (error) return;
    
    try {
      const parsed = JSON.parse(jsonInput);
      const newTheme = createThemeObject(parsed);
      
      // Clear existing timeout
      if (jsonUpdateTimeoutRef.current) {
        clearTimeout(jsonUpdateTimeoutRef.current);
      }
      
      // Add to history after 1 second of no typing
      jsonUpdateTimeoutRef.current = setTimeout(() => {
        setThemeHistory(newTheme);
      }, 1000);
    } catch {
      // Invalid JSON, don't update
    }

    return () => {
      if (jsonUpdateTimeoutRef.current) {
        clearTimeout(jsonUpdateTimeoutRef.current);
      }
    };
  }, [jsonInput, error, setThemeHistory]);

  const handleColorChange = useCallback((path: string, value: string | number) => {
    const newTheme = { ...theme };
    const keys = path.split('.');
    let current: any = newTheme;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (key && !current[key]) {
        current[key] = {};
      }
      if (key) {
        current = current[key];
      }
    }
    
    const lastKey = keys[keys.length - 1];
    if (lastKey) {
      current[lastKey] = value;
    }
    updateTheme(createThemeObject(newTheme));
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      if (ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) undo();
      } else if (ctrlKey && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        if (canRedo) redo();
      } else if (ctrlKey && e.key === 's') {
        e.preventDefault();
        exportTheme();
      } else if (ctrlKey && e.key === '/') {
        e.preventDefault();
        setEditMode(prev => prev === 'visual' ? 'json' : 'visual');
      } else if (e.key === 'Escape') {
        setError(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo, exportTheme]);

  // Resizer handlers
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!editorRef.current || !previewRef.current) return;
      
      const container = editorRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Constrain between 20% and 80%
      const constrainedPosition = Math.max(20, Math.min(80, newPosition));
      setResizerPosition(constrainedPosition);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const getColorValue = useCallback((color: string): string => {
    return convertColorFormat(color, colorFormat);
  }, [colorFormat]);

  return (
    <div className={`atomix-theme-live-editor ${className || ''}`} style={style}>
      <div className="editor-header">
        <h2>Live Theme Editor</h2>
        <div className="editor-controls">
          <div className="history-controls">
            <button
              className="history-button"
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
            >
              ↶ Undo
            </button>
            <button
              className="history-button"
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Ctrl+Shift+Z)"
            >
              ↷ Redo
            </button>
          </div>
          <div className="mode-controls">
            <button
              className={`mode-button ${editMode === 'visual' ? 'active' : ''}`}
              onClick={() => setEditMode('visual')}
              title="Visual Editor (Ctrl+/)"
            >
              Visual
            </button>
            <button
              className={`mode-button ${editMode === 'json' ? 'active' : ''}`}
              onClick={() => setEditMode('json')}
              title="JSON Editor (Ctrl+/)"
            >
              JSON
            </button>
          </div>
          <div className="action-controls">
            <button className="export-button" onClick={exportTheme} title="Export (Ctrl+S)">
              Export
            </button>
            <button className="copy-button" onClick={copyToClipboard} title="Copy JSON">
              Copy JSON
            </button>
          </div>
        </div>
      </div>

      <div className="editor-content" ref={editorRef}>
        <div 
          className="editor-panel"
          style={{ width: `${resizerPosition}%` }}
        >
          {editMode === 'visual' ? (
            <div className="visual-editor">
              <div className="editor-section">
                <h3>Colors</h3>
                <div className="color-format-selector">
                  <label>Color Format:</label>
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
                </div>
                
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
                      value={getColorValue(theme.palette.primary.main)}
                      onChange={(e) => {
                        const converted = convertColorFormat(e.target.value, 'hex');
                        handleColorChange('palette.primary.main', converted);
                      }}
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
                      value={getColorValue(theme.palette.secondary.main)}
                      onChange={(e) => {
                        const converted = convertColorFormat(e.target.value, 'hex');
                        handleColorChange('palette.secondary.main', converted);
                      }}
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
                      value={getColorValue(theme.palette.background.default)}
                      onChange={(e) => {
                        const converted = convertColorFormat(e.target.value, 'hex');
                        handleColorChange('palette.background.default', converted);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="editor-section">
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
                  <button className="error-dismiss" onClick={() => setError(null)}>×</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div 
          className={`resizer ${isResizing ? 'resizing' : ''}`}
          onMouseDown={handleResizeStart}
        />

        <div 
          className="preview-panel"
          ref={previewRef}
          style={{ width: `${100 - resizerPosition}%` }}
        >
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
          gap: 12px;
          align-items: center;
        }

        .history-controls,
        .mode-controls,
        .action-controls {
          display: flex;
          gap: 8px;
        }

        .history-button,
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

        .history-button:hover:not(:disabled),
        .mode-button:hover,
        .export-button:hover,
        .copy-button:hover {
          background: #f5f5f5;
        }

        .history-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
          display: flex;
          position: relative;
          min-height: 600px;
        }

        .editor-panel,
        .preview-panel {
          overflow-y: auto;
          padding: 24px;
        }

        .resizer {
          width: 4px;
          background: #e0e0e0;
          cursor: col-resize;
          position: relative;
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .resizer:hover,
        .resizer.resizing {
          background: #2196f3;
        }

        .resizer::before {
          content: '';
          position: absolute;
          left: -2px;
          right: -2px;
          top: 0;
          bottom: 0;
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
          gap: 24px;
        }

        .editor-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .color-format-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .color-format-selector label {
          font-size: 14px;
          font-weight: 500;
          color: #666;
        }

        .color-format-selector select {
          padding: 6px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
          background: white;
          cursor: pointer;
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
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .error-dismiss {
          background: none;
          border: none;
          color: #d32f2f;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-dismiss:hover {
          background: rgba(211, 47, 47, 0.1);
          border-radius: 50%;
        }

        .preview-panel {
          border-left: 1px solid #e0e0e0;
        }
      `}</style>
    </div>
  );
};
