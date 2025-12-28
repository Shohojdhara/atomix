/**
 * Theme Inspector Component
 * 
 * React component for inspecting and debugging themes
 * Enhanced with search/filter and copy path functionality
 */

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import type { Theme } from '../types';
import { generateCSSVariables } from '../generators/generateCSSVariables';
import { ThemeValidator } from './ThemeValidator';

/**
 * Theme inspector props
 */
export interface ThemeInspectorProps {
  /** Theme to inspect */
  theme: Theme;
  /** Show validation results */
  showValidation?: boolean;
  /** Show CSS variables */
  showCSSVariables?: boolean;
  /** Show theme structure */
  showStructure?: boolean;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Property path information
 */
interface PropertyPath {
  path: string;
  value: any;
  matches: boolean;
}

/**
 * Theme Inspector Component
 * 
 * Provides detailed inspection and debugging information for themes
 */
export const ThemeInspector: React.FC<ThemeInspectorProps> = ({
  theme,
  showValidation = true,
  showCSSVariables = true,
  showStructure = true,
  className,
  style,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'validation' | 'css' | 'structure'>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['palette']));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Debounce search query
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Validation results
  const validationResult = useMemo(() => {
    if (!showValidation) return null;
    try {
      const validator = new ThemeValidator();
      return validator.validate(theme);
    } catch (error) {
      console.error('Theme validation error:', error);
      return {
        valid: false,
        errors: ['Failed to validate theme: ' + (error instanceof Error ? error.message : String(error))],
        warnings: [],
        a11yIssues: [],
      };
    }
  }, [theme, showValidation]);

  // CSS variables
  const cssVariables = useMemo(() => {
    if (!showCSSVariables) return '';
    try {
      return generateCSSVariables(theme, {
        selector: ':root',
        prefix: 'atomix',
      });
    } catch (error) {
      console.error('CSS variable generation error:', error);
      return `/* Error generating CSS variables: ${error instanceof Error ? error.message : String(error)} */`;
    }
  }, [theme, showCSSVariables]);

  // Generate all property paths for search
  const allPropertyPaths = useMemo(() => {
    const paths: PropertyPath[] = [];
    
    const traverse = (obj: any, path: string = '', depth: number = 0): void => {
      if (depth > 10) return; // Prevent infinite recursion
      
      if (obj === null || obj === undefined) {
        paths.push({ path, value: obj, matches: false });
        return;
      }

      if (typeof obj === 'object' && !Array.isArray(obj)) {
        Object.entries(obj).forEach(([key, value]) => {
          if (key === '__isJSTheme') return;
          
          const currentPath = path ? `${path}.${key}` : key;
          const pathLower = currentPath.toLowerCase();
          const queryLower = debouncedSearchQuery.toLowerCase();
          const matches = debouncedSearchQuery ? pathLower.includes(queryLower) : true;
          
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            paths.push({ path: currentPath, value: null, matches });
            traverse(value, currentPath, depth + 1);
          } else {
            const valueStr = typeof value === 'string' ? value.toLowerCase() : String(value).toLowerCase();
            const valueMatches = debouncedSearchQuery ? valueStr.includes(queryLower) : true;
            paths.push({ 
              path: currentPath, 
              value, 
              matches: matches || valueMatches 
            });
          }
        });
      } else {
        const pathLower = path.toLowerCase();
        const queryLower = debouncedSearchQuery.toLowerCase();
        const matches = debouncedSearchQuery ? pathLower.includes(queryLower) : true;
        paths.push({ path, value: obj, matches });
      }
    };

    traverse(theme);
    return paths;
  }, [theme, debouncedSearchQuery]);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const copyPath = useCallback(async (path: string) => {
    try {
      await navigator.clipboard.writeText(path);
      setCopiedPath(path);
      setTimeout(() => setCopiedPath(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = path;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedPath(path);
        setTimeout(() => setCopiedPath(null), 2000);
      } catch {
        // Copy failed
      }
      document.body.removeChild(textArea);
    }
  }, []);

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="search-highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  const renderValue = (value: any, depth = 0, path = ''): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="value-null">null</span>;
    }

    if (typeof value === 'string') {
      return <span className="value-string">&quot;{highlightText(value, debouncedSearchQuery)}&quot;</span>;
    }

    if (typeof value === 'number') {
      return <span className="value-number">{value}</span>;
    }

    if (typeof value === 'boolean') {
      return <span className="value-boolean">{String(value)}</span>;
    }

    if (typeof value === 'function') {
      return <span className="value-function">function</span>;
    }

    if (Array.isArray(value)) {
      return (
        <div className="value-array">
          [{value.map((item, index) => (
            <div key={index} className="array-item">
              {renderValue(item, depth + 1, `${path}[${index}]`)}
              {index < value.length - 1 && ','}
            </div>
          ))}]
        </div>
      );
    }

    if (typeof value === 'object') {
      return (
        <div className="value-object" style={{ marginLeft: depth * 16 }}>
          {'{'}
          {Object.entries(value).map(([key, val]) => {
            const currentPath = path ? `${path}.${key}` : key;
            return (
              <div key={key} className="object-property">
                <span 
                  className="property-key clickable"
                  onClick={() => copyPath(currentPath)}
                  title={`Click to copy: ${currentPath}`}
                >
                  {highlightText(key, debouncedSearchQuery)}:
                </span>{' '}
                {renderValue(val, depth + 1, currentPath)}
                {copiedPath === currentPath && (
                  <span className="copy-feedback">✓ Copied!</span>
                )}
              </div>
            );
          })}
          {'}'}
        </div>
      );
    }

    return <span>{String(value)}</span>;
  };

  const renderOverview = () => (
    <div className="inspector-overview">
      <div className="theme-metadata">
        <h3>Theme Information</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Name:</strong></td>
              <td>{theme.name}</td>
            </tr>
            {theme.description && (
              <tr>
                <td><strong>Description:</strong></td>
                <td>{theme.description}</td>
              </tr>
            )}
            {theme.author && (
              <tr>
                <td><strong>Author:</strong></td>
                <td>{theme.author}</td>
              </tr>
            )}
            {theme.version && (
              <tr>
                <td><strong>Version:</strong></td>
                <td>{theme.version}</td>
              </tr>
            )}
            {theme.status && (
              <tr>
                <td><strong>Status:</strong></td>
                <td>
                  <span className={`status-badge status-${theme.status}`}>
                    {theme.status}
                  </span>
                </td>
              </tr>
            )}
            <tr>
              <td><strong>Dark Mode:</strong></td>
              <td>{theme.supportsDarkMode ? 'Yes' : 'No'}</td>
            </tr>
            {theme.tags && theme.tags.length > 0 && (
              <tr>
                <td><strong>Tags:</strong></td>
                <td>
                  {theme.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Stats */}
      <div className="theme-stats">
        <h3>Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{Object.keys(theme.palette).length}</div>
            <div className="stat-label">Palette Colors</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{Object.keys(theme.typography).length}</div>
            <div className="stat-label">Typography Variants</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{Object.keys(theme.shadows).length}</div>
            <div className="stat-label">Shadow Variants</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{Object.keys(theme.custom).length}</div>
            <div className="stat-label">Custom Properties</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderValidation = () => {
    if (!validationResult) return null;

    return (
      <div className="inspector-validation">
        <div className={`validation-status ${validationResult.valid ? 'valid' : 'invalid'}`}>
          {validationResult.valid ? '✅ Theme is valid' : '❌ Theme has issues'}
        </div>

        {validationResult.errors.length > 0 && (
          <div className="validation-section">
            <h3>Errors</h3>
            <ul className="validation-list error-list">
              {validationResult.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {validationResult.warnings.length > 0 && (
          <div className="validation-section">
            <h3>Warnings</h3>
            <ul className="validation-list warning-list">
              {validationResult.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {validationResult.a11yIssues.length > 0 && (
          <div className="validation-section">
            <h3>Accessibility Issues</h3>
            <ul className="validation-list a11y-list">
              {validationResult.a11yIssues.map((issue, index) => (
                <li key={index} className={`a11y-${issue.severity}`}>
                  <strong>{issue.type}:</strong> {issue.message}
                  {issue.property && <code>{issue.property}</code>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderCSSVariables = () => (
    <div className="inspector-css">
      <div className="css-header">
        <h3>Generated CSS Variables</h3>
        <button 
          onClick={() => navigator.clipboard?.writeText(cssVariables)}
          className="copy-button"
        >
          Copy to Clipboard
        </button>
      </div>
      <pre className="css-code">
        <code>{cssVariables}</code>
      </pre>
    </div>
  );

  const renderStructure = () => {
    const filteredPaths = debouncedSearchQuery
      ? allPropertyPaths.filter(p => p.matches)
      : allPropertyPaths;

    return (
      <div className="inspector-structure">
        <div className="structure-header-controls">
          <h3>Theme Structure</h3>
          <div className="search-controls">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ×
              </button>
            )}
            {debouncedSearchQuery && (
              <span className="search-results-count">
                {filteredPaths.length} result{filteredPaths.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {debouncedSearchQuery && filteredPaths.length === 0 && (
          <div className="no-results">
            No properties found matching &quot;{debouncedSearchQuery}&quot;
          </div>
        )}

        <div className="structure-tree">
          {Object.entries(theme).map(([key, value]) => {
            if (key === '__isJSTheme') return null;
            
            const isExpanded = expandedSections.has(key);
            const hasChildren = typeof value === 'object' && value !== null && !Array.isArray(value);
            const pathMatches = debouncedSearchQuery
              ? allPropertyPaths.some(p => p.path.startsWith(key) && p.matches)
              : true;

            if (debouncedSearchQuery && !pathMatches) return null;

            return (
              <div key={key} className="structure-node">
                <div 
                  className="structure-header"
                  onClick={() => hasChildren && toggleSection(key)}
                >
                  {hasChildren && (
                    <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                      ▶
                    </span>
                  )}
                  <span 
                    className="property-name clickable"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyPath(key);
                    }}
                    title={`Click to copy: ${key}`}
                  >
                    {highlightText(key, debouncedSearchQuery)}
                  </span>
                  {copiedPath === key && (
                    <span className="copy-feedback">✓ Copied!</span>
                  )}
                  <span className="property-type">
                    {Array.isArray(value) ? 'array' : typeof value}
                  </span>
                </div>
                {hasChildren && isExpanded && (
                  <div className="structure-children">
                    {renderValue(value, 0, key)}
                  </div>
                )}
                {!hasChildren && (
                  <div className="structure-value">
                    {renderValue(value, 0, key)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`atomix-theme-inspector ${className || ''}`} style={style}>
      {/* Tab Navigation */}
      <div className="inspector-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        {showValidation && (
          <button 
            className={`tab ${activeTab === 'validation' ? 'active' : ''}`}
            onClick={() => setActiveTab('validation')}
          >
            Validation
            {validationResult && !validationResult.valid && (
              <span className="tab-badge error">{validationResult.errors.length}</span>
            )}
          </button>
        )}
        {showCSSVariables && (
          <button 
            className={`tab ${activeTab === 'css' ? 'active' : ''}`}
            onClick={() => setActiveTab('css')}
          >
            CSS Variables
          </button>
        )}
        {showStructure && (
          <button 
            className={`tab ${activeTab === 'structure' ? 'active' : ''}`}
            onClick={() => setActiveTab('structure')}
          >
            Structure
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="inspector-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'validation' && renderValidation()}
        {activeTab === 'css' && renderCSSVariables()}
        {activeTab === 'structure' && renderStructure()}
      </div>

      <style>{`
        .atomix-theme-inspector {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .inspector-tabs {
          display: flex;
          border-bottom: 1px solid #e0e0e0;
          background: #f5f5f5;
          border-radius: 8px 8px 0 0;
        }

        .tab {
          padding: 12px 16px;
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          position: relative;
        }

        .tab:hover {
          background: #e0e0e0;
        }

        .tab.active {
          background: white;
          border-bottom-color: #2196f3;
        }

        .tab-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: #f44336;
          color: white;
          border-radius: 10px;
          padding: 2px 6px;
          font-size: 10px;
          min-width: 16px;
          text-align: center;
        }

        .inspector-content {
          padding: 16px;
          max-height: 600px;
          overflow-y: auto;
        }

        .theme-metadata table {
          width: 100%;
          border-collapse: collapse;
        }

        .theme-metadata td {
          padding: 8px;
          border-bottom: 1px solid #f0f0f0;
          vertical-align: top;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          text-transform: uppercase;
        }

        .status-stable { background: #e8f5e8; color: #2e7d32; }
        .status-beta { background: #fff3e0; color: #f57c00; }
        .status-experimental { background: #fce4ec; color: #c2185b; }
        .status-deprecated { background: #ffebee; color: #d32f2f; }

        .tag {
          display: inline-block;
          background: #e3f2fd;
          color: #1976d2;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          margin-right: 4px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }

        .stat-item {
          text-align: center;
          padding: 16px;
          background: #f5f5f5;
          border-radius: 8px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #2196f3;
        }

        .stat-label {
          font-size: 12px;
          color: #666;
          margin-top: 4px;
        }

        .validation-status {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-weight: bold;
        }

        .validation-status.valid {
          background: #e8f5e8;
          color: #2e7d32;
        }

        .validation-status.invalid {
          background: #ffebee;
          color: #d32f2f;
        }

        .validation-list {
          margin: 0;
          padding-left: 20px;
        }

        .validation-list li {
          margin-bottom: 8px;
        }

        .error-list li { color: #d32f2f; }
        .warning-list li { color: #f57c00; }
        .a11y-list li { color: #7b1fa2; }

        .css-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .copy-button {
          padding: 8px 16px;
          background: #2196f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .copy-button:hover {
          background: #1976d2;
        }

        .css-code {
          background: #f5f5f5;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 12px;
          line-height: 1.4;
        }

        .structure-header-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .structure-header-controls h3 {
          margin: 0;
        }

        .search-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .search-input {
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
          width: 250px;
        }

        .search-input:focus {
          outline: none;
          border-color: #2196f3;
        }

        .clear-search {
          background: #f44336;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          cursor: pointer;
          font-size: 18px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .clear-search:hover {
          background: #d32f2f;
        }

        .search-results-count {
          font-size: 12px;
          color: #666;
          padding: 4px 8px;
          background: #f5f5f5;
          border-radius: 4px;
        }

        .no-results {
          padding: 24px;
          text-align: center;
          color: #666;
          font-style: italic;
        }

        .search-highlight {
          background: #fff59d;
          padding: 2px 4px;
          border-radius: 2px;
        }

        .structure-node {
          margin-bottom: 8px;
        }

        .structure-header {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }

        .structure-header:hover {
          background: #f0f0f0;
        }

        .expand-icon {
          transition: transform 0.2s;
          font-size: 12px;
        }

        .expand-icon.expanded {
          transform: rotate(90deg);
        }

        .property-name {
          font-weight: bold;
          color: #1976d2;
        }

        .property-name.clickable {
          cursor: pointer;
          text-decoration: underline;
          text-decoration-style: dotted;
        }

        .property-name.clickable:hover {
          color: #0d47a1;
        }

        .copy-feedback {
          font-size: 12px;
          color: #4caf50;
          margin-left: 8px;
          font-weight: normal;
        }

        .property-type {
          font-size: 12px;
          color: #666;
          background: #f0f0f0;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .structure-children,
        .structure-value {
          margin-left: 24px;
          margin-top: 8px;
        }

        .value-string { color: #388e3c; }
        .value-number { color: #1976d2; }
        .value-boolean { color: #7b1fa2; }
        .value-null { color: #666; font-style: italic; }
        .value-function { color: #f57c00; font-style: italic; }

        .value-object {
          font-family: monospace;
          font-size: 12px;
        }

        .object-property {
          margin-left: 16px;
        }

        .property-key {
          color: #1976d2;
          font-weight: bold;
        }

        .property-key.clickable {
          cursor: pointer;
          text-decoration: underline;
          text-decoration-style: dotted;
        }

        .property-key.clickable:hover {
          color: #0d47a1;
        }
      `}</style>
    </div>
  );
};
