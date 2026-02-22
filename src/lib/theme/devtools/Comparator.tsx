/**
 * Theme Comparator Component
 *
 * React component for comparing two themes side-by-side
 * Enhanced with search/filter and improved visual diff styling
 */

import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
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
  category?: string;
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'added' | 'removed' | 'changed'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
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

  const differences = useMemo(() => {
    const diffs: Difference[] = [];

    const getCategory = (path: string): string => {
      const firstSegment = path.split('.')[0];
      return firstSegment || 'other';
    };

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
            category: getCategory(currentPath),
          });
        } else if (valueA !== undefined && valueB === undefined) {
          diffs.push({
            path: currentPath,
            valueA,
            valueB: undefined,
            type: 'removed',
            category: getCategory(currentPath),
          });
        } else if (
          typeof valueA === 'object' &&
          typeof valueB === 'object' &&
          !Array.isArray(valueA) &&
          !Array.isArray(valueB)
        ) {
          compareObjects(valueA, valueB, currentPath);
        } else if (JSON.stringify(valueA) !== JSON.stringify(valueB)) {
          diffs.push({
            path: currentPath,
            valueA,
            valueB,
            type: 'changed',
            category: getCategory(currentPath),
          });
        }
      }
    };

    compareObjects(themeA, themeB);
    return diffs;
  }, [themeA, themeB]);

  // Filter differences
  const filteredDifferences = useMemo(() => {
    let filtered = differences;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(d => d.type === filterType);
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(d => d.category === filterCategory);
    }

    // Filter by search query
    if (debouncedSearchQuery) {
      const queryLower = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        d =>
          d.path.toLowerCase().includes(queryLower) ||
          String(d.valueA).toLowerCase().includes(queryLower) ||
          String(d.valueB).toLowerCase().includes(queryLower)
      );
    }

    return filtered;
  }, [differences, filterType, filterCategory, debouncedSearchQuery]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(differences.map(d => d.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [differences]);

  const formatValue = (value: any): string => {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getTypeColor = (type: Difference['type']): string => {
    switch (type) {
      case 'added':
        return '#4caf50';
      case 'removed':
        return '#f44336';
      case 'changed':
        return '#ff9800';
      default:
        return '#666';
    }
  };

  const getTypeBackground = (type: Difference['type']): string => {
    switch (type) {
      case 'added':
        return 'rgba(76, 175, 80, 0.1)';
      case 'removed':
        return 'rgba(244, 67, 54, 0.1)';
      case 'changed':
        return 'rgba(255, 152, 0, 0.1)';
      default:
        return 'transparent';
    }
  };

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="search-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const stats = useMemo(() => {
    return {
      total: differences.length,
      added: differences.filter(d => d.type === 'added').length,
      removed: differences.filter(d => d.type === 'removed').length,
      changed: differences.filter(d => d.type === 'changed').length,
      filtered: filteredDifferences.length,
    };
  }, [differences, filteredDifferences]);

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

      {/* Filter Controls */}
      <div className="filter-controls">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search differences..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
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
        </div>

        <div className="filter-group">
          <label>Type:</label>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="added">Added</option>
            <option value="removed">Removed</option>
            <option value="changed">Changed</option>
          </select>
        </div>

        {categories.length > 0 && (
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {(searchQuery || filterType !== 'all' || filterCategory !== 'all') && (
          <button
            className="clear-filters"
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
              setFilterCategory('all');
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="comparator-stats">
        <div className="stat">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Differences</span>
        </div>
        <div className="stat stat-added">
          <span className="stat-value" style={{ color: '#4caf50' }}>
            {stats.added}
          </span>
          <span className="stat-label">Added</span>
        </div>
        <div className="stat stat-removed">
          <span className="stat-value" style={{ color: '#f44336' }}>
            {stats.removed}
          </span>
          <span className="stat-label">Removed</span>
        </div>
        <div className="stat stat-changed">
          <span className="stat-value" style={{ color: '#ff9800' }}>
            {stats.changed}
          </span>
          <span className="stat-label">Changed</span>
        </div>
        {stats.filtered !== stats.total && (
          <div className="stat stat-filtered">
            <span className="stat-value" style={{ color: '#2196f3' }}>
              {stats.filtered}
            </span>
            <span className="stat-label">Filtered</span>
          </div>
        )}
      </div>

      {filteredDifferences.length === 0 ? (
        <div className="no-differences">
          {differences.length === 0 ? (
            <>✅ Themes are identical</>
          ) : (
            <>No differences match your filters. Try adjusting your search or filters.</>
          )}
        </div>
      ) : (
        <div className="differences-list">
          <h4>Differences ({filteredDifferences.length})</h4>
          {filteredDifferences.map((diff, index) => (
            <div
              key={index}
              className={`difference-item difference-${diff.type}`}
              style={{ backgroundColor: getTypeBackground(diff.type) }}
            >
              <div className="difference-header">
                <span
                  className="difference-type"
                  style={{ backgroundColor: getTypeColor(diff.type) }}
                >
                  {diff.type}
                </span>
                <code className="difference-path">
                  {highlightText(diff.path, debouncedSearchQuery)}
                </code>
                {diff.category && <span className="difference-category">{diff.category}</span>}
              </div>
              <div className="difference-values">
                <div className={`value-column value-${diff.type === 'added' ? 'empty' : 'filled'}`}>
                  <div className="value-label">{themeA.name}</div>
                  <pre className="value-content">
                    {diff.type === 'added' ? (
                      <span className="value-empty">—</span>
                    ) : (
                      highlightText(formatValue(diff.valueA), debouncedSearchQuery)
                    )}
                  </pre>
                </div>
                <div className="value-divider">→</div>
                <div
                  className={`value-column value-${diff.type === 'removed' ? 'empty' : 'filled'}`}
                >
                  <div className="value-label">{themeB.name}</div>
                  <pre className="value-content">
                    {diff.type === 'removed' ? (
                      <span className="value-empty">—</span>
                    ) : (
                      highlightText(formatValue(diff.valueB), debouncedSearchQuery)
                    )}
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

        .filter-controls {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 24px;
          padding: 16px;
          background: #f5f5f5;
          border-radius: 8px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-group label {
          font-size: 14px;
          font-weight: 500;
          color: #666;
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

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
          background: white;
          cursor: pointer;
        }

        .clear-filters {
          padding: 8px 16px;
          background: #666;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .clear-filters:hover {
          background: #555;
        }

        .search-highlight {
          background: #fff59d;
          padding: 2px 4px;
          border-radius: 2px;
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

        .stat-added {
          border-left: 4px solid #4caf50;
        }

        .stat-removed {
          border-left: 4px solid #f44336;
        }

        .stat-changed {
          border-left: 4px solid #ff9800;
        }

        .stat-filtered {
          border-left: 4px solid #2196f3;
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
          border: 2px solid;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .difference-added {
          border-color: #4caf50;
        }

        .difference-removed {
          border-color: #f44336;
        }

        .difference-changed {
          border-color: #ff9800;
        }

        .difference-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(0, 0, 0, 0.05);
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
          flex: 1;
        }

        .difference-category {
          font-size: 11px;
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          color: #666;
          text-transform: uppercase;
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

        .value-column.value-empty {
          opacity: 0.5;
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
          background: rgba(255, 255, 255, 0.7);
          border-radius: 4px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 12px;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .value-empty {
          color: #999;
          font-style: italic;
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
