/**
 * Theme Comparator Component
 * 
 * React component for comparing two themes side-by-side
 */

import React, { useMemo } from 'react';
import type { Theme } from '../types';

/**
 * Theme comparator props
 */
export interface ThemeComparatorProps {
  /** First theme to compare */
  themeA: Theme;
  /** Second theme to compare */
  themeB: Theme;
  /** Show only differences */
  showOnlyDifferences?: boolean;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

interface Difference {
  path: string;
  valueA: any;
  valueB: any;
  type: 'added' | 'removed' | 'changed';
}

/**
 * Theme Comparator Component
 * 
 * Compares two themes and highlights differences
 */
export const ThemeComparator: React.FC<ThemeComparatorProps> = ({
  themeA,
  themeB,
  showOnlyDifferences = false,
  className,
  style,
}) => {
  const differences = useMemo(() => {
    const diffs: Difference[] = [];
    
    const compareObjects = (objA: any, objB: any, path: string = '') => {
      const keysA = Object.keys(objA || {});
      const keysB = Object.keys(objB || {});
      const allKeys = new Set([...keysA, ...keysB]);

      for (const key of allKeys) {
        if (key === '__isJSTheme') continue;
        
        const currentPath = path ? `${path}.${key}` : key;
        const valueA = objA?.[key];
        const valueB = objB?.[key];

        if (valueA === undefined && valueB !== undefined) {
          diffs.push({
            path: currentPath,
            valueA: undefined,
            valueB,
            type: 'added',
          });
        } else if (valueA !== undefined && valueB === undefined) {
          diffs.push({
            path: currentPath,
            valueA,
            valueB: undefined,
            type: 'removed',
          });
        } else if (typeof valueA === 'object' && typeof valueB === 'object' && !Array.isArray(valueA) && !Array.isArray(valueB)) {
          compareObjects(valueA, valueB, currentPath);
        } else if (JSON.stringify(valueA) !== JSON.stringify(valueB)) {
          diffs.push({
            path: currentPath,
            valueA,
            valueB,
            type: 'changed',
          });
        }
      }
    };

    compareObjects(themeA, themeB);
    return diffs;
  }, [themeA, themeB]);

  const formatValue = (value: any): string => {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getTypeColor = (type: Difference['type']): string => {
    switch (type) {
      case 'added': return '#4caf50';
      case 'removed': return '#f44336';
      case 'changed': return '#ff9800';
      default: return '#666';
    }
  };

  return (
    <div className={`atomix-theme-comparator ${className || ''}`} style={style}>
      <div className="comparator-header">
        <div className="theme-column">
          <h3>{themeA.name}</h3>
          {themeA.version && <span className="version">v{themeA.version}</span>}
        </div>
        <div className="vs-divider">VS</div>
        <div className="theme-column">
          <h3>{themeB.name}</h3>
          {themeB.version && <span className="version">v{themeB.version}</span>}
        </div>
      </div>

      <div className="comparator-stats">
        <div className="stat">
          <span className="stat-value">{differences.length}</span>
          <span className="stat-label">Total Differences</span>
        </div>
        <div className="stat">
          <span className="stat-value" style={{ color: '#4caf50' }}>
            {differences.filter(d => d.type === 'added').length}
          </span>
          <span className="stat-label">Added</span>
        </div>
        <div className="stat">
          <span className="stat-value" style={{ color: '#f44336' }}>
            {differences.filter(d => d.type === 'removed').length}
          </span>
          <span className="stat-label">Removed</span>
        </div>
        <div className="stat">
          <span className="stat-value" style={{ color: '#ff9800' }}>
            {differences.filter(d => d.type === 'changed').length}
          </span>
          <span className="stat-label">Changed</span>
        </div>
      </div>

      {differences.length === 0 ? (
        <div className="no-differences">
          ✅ Themes are identical
        </div>
      ) : (
        <div className="differences-list">
          <h4>Differences</h4>
          {differences.map((diff, index) => (
            <div key={index} className="difference-item">
              <div className="difference-header">
                <span 
                  className="difference-type"
                  style={{ backgroundColor: getTypeColor(diff.type) }}
                >
                  {diff.type}
                </span>
                <code className="difference-path">{diff.path}</code>
              </div>
              <div className="difference-values">
                <div className="value-column">
                  <div className="value-label">{themeA.name}</div>
                  <pre className="value-content">
                    {formatValue(diff.valueA)}
                  </pre>
                </div>
                <div className="value-divider">→</div>
                <div className="value-column">
                  <div className="value-label">{themeB.name}</div>
                  <pre className="value-content">
                    {formatValue(diff.valueB)}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .atomix-theme-comparator {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 24px;
        }

        .comparator-header {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 24px;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 2px solid #e0e0e0;
        }

        .theme-column {
          text-align: center;
        }

        .theme-column h3 {
          margin: 0;
          font-size: 20px;
          color: #333;
        }

        .version {
          display: inline-block;
          margin-top: 4px;
          padding: 2px 8px;
          background: #e3f2fd;
          color: #1976d2;
          border-radius: 4px;
          font-size: 12px;
        }

        .vs-divider {
          font-weight: bold;
          font-size: 24px;
          color: #666;
        }

        .comparator-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat {
          text-align: center;
          padding: 16px;
          background: #f5f5f5;
          border-radius: 8px;
        }

        .stat-value {
          display: block;
          font-size: 32px;
          font-weight: bold;
          color: #2196f3;
        }

        .stat-label {
          display: block;
          font-size: 12px;
          color: #666;
          margin-top: 4px;
        }

        .no-differences {
          text-align: center;
          padding: 48px;
          font-size: 18px;
          color: #4caf50;
          background: #e8f5e9;
          border-radius: 8px;
        }

        .differences-list h4 {
          margin: 0 0 16px 0;
          font-size: 18px;
          color: #333;
        }

        .difference-item {
          margin-bottom: 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
        }

        .difference-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f5f5f5;
        }

        .difference-type {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          color: white;
          text-transform: uppercase;
        }

        .difference-path {
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 13px;
          color: #1976d2;
        }

        .difference-values {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px;
          padding: 16px;
          align-items: start;
        }

        .value-column {
          min-width: 0;
        }

        .value-label {
          font-size: 12px;
          font-weight: bold;
          color: #666;
          margin-bottom: 8px;
        }

        .value-content {
          margin: 0;
          padding: 12px;
          background: #f5f5f5;
          border-radius: 4px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 12px;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .value-divider {
          font-size: 20px;
          color: #666;
          align-self: center;
        }
      `}</style>
    </div>
  );
};

