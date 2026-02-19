import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';
import { BaseComponentProps } from './common';


/**
 * DataTable column definition
 */
export interface DataTableColumn {
  /**
   * Unique identifier for the column
   */
  key: string;

  /**
   * Display title for the column
   */
  title: string;

  /**
   * Whether the column is sortable
   */
  sortable?: boolean;

  /**
   * Whether the column is filterable
   */
  filterable?: boolean;

  /**
   * Custom render function for the cell
   */
  render?: (value: any, row: any) => React.ReactNode;

  /**
   * Width of the column (CSS value)
   */
  width?: string;

  /**
   * Minimum width for resizable columns (CSS value)
   */
  minWidth?: string;

  /**
   * Maximum width for resizable columns (CSS value)
   */
  maxWidth?: string;

  /**
   * Whether the column is resizable
   */
  resizable?: boolean;

  /**
   * Whether the column is visible by default
   */
  visible?: boolean;

  /**
   * Whether the column can be reordered
   */
  reorderable?: boolean;

  /**
   * Custom filter function for column-specific filtering
   */
  filterFunction?: (value: any, filterValue: string) => boolean;

  /**
   * Filter type for column-specific filtering
   */
  filterType?: 'text' | 'select' | 'date' | 'number' | 'custom';

  /**
   * Options for select-type filters
   */
  filterOptions?: Array<{ label: string; value: any }>;
}


/**
 * Sort configuration
 */
export interface SortConfig {
  /**
   * Column key to sort by
   */
  key: string;

  /**
   * Sort direction
   */
  direction: 'asc' | 'desc';
}


/**
 * Row selection mode
 */
export type SelectionMode = 'single' | 'multiple' | 'none';


/**
 * Export format
 */
export type ExportFormat = 'csv' | 'excel' | 'json';


/**
 * DataTable component properties
 */
export interface DataTableProps extends BaseComponentProps {
  /**
   * Data array to display in the table
   */
  data: any[];

  /**
   * Column definitions
   */
  columns: DataTableColumn[];

  /**
   * Whether the table is sortable
   */
  sortable?: boolean;

  /**
   * Whether the table is filterable
   */
  filterable?: boolean;

  /**
   * Whether the table is paginated
   */
  paginated?: boolean;

  /**
   * Number of rows per page
   */
  pageSize?: number;

  /**
   * Whether to show alternating row colors
   */
  striped?: boolean;

  /**
   * Whether to show borders around cells
   */
  bordered?: boolean;

  /**
   * Whether to use compact styling
   */
  dense?: boolean;

  /**
   * Whether the table is in loading state
   */
  loading?: boolean;

  /**
   * Message to display when there is no data
   */
  emptyMessage?: string;

  /**
   * Callback when a row is clicked
   */
  onRowClick?: (row: any) => void;

  /**
   * Callback when sorting changes
   */
  onSort?: (sortConfig: SortConfig) => void;

  /**
   * Glass morphism effect for the data table
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Row selection mode ('single', 'multiple', or 'none')
   */
  selectionMode?: SelectionMode;

  /**
   * Selected row IDs (for controlled selection)
   */
  selectedRowIds?: (string | number)[];

  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedRows: any[], selectedIds: (string | number)[]) => void;

  /**
   * Key to use as unique identifier for rows (defaults to 'id')
   */
  rowKey?: string | ((row: any) => string | number);

  /**
   * Whether columns are resizable
   */
  resizable?: boolean;

  /**
   * Whether columns can be reordered
   */
  reorderable?: boolean;

  /**
   * Callback when column order changes
   */
  onColumnReorder?: (columnKeys: string[]) => void;

  /**
   * Whether to show column visibility toggle
   */
  showColumnVisibility?: boolean;

  /**
   * Callback when column visibility changes
   */
  onColumnVisibilityChange?: (visibleColumns: string[]) => void;

  /**
   * Whether to enable sticky headers
   */
  stickyHeader?: boolean;

  /**
   * Offset from top for sticky headers (CSS value)
   */
  stickyHeaderOffset?: string;

  /**
   * Whether to enable virtual scrolling for large datasets
   */
  virtualScrolling?: boolean;

  /**
   * Estimated row height for virtual scrolling (in pixels)
   */
  estimatedRowHeight?: number;

  /**
   * Number of rows to render outside visible area (overscan)
   */
  overscan?: number;

  /**
   * Whether to enable export functionality
   */
  exportable?: boolean;

  /**
   * Export formats available
   */
  exportFormats?: ExportFormat[];

  /**
   * Custom export filename
   */
  exportFilename?: string;

  /**
   * Callback for custom export logic
   */
  onExport?: (format: ExportFormat, data: any[]) => void;

  /**
   * Whether to show column-specific filters
   */
  columnFilters?: boolean;
}
