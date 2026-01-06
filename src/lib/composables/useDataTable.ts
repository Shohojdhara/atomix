import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DataTableColumn, SortConfig, SelectionMode } from '../types/components';

export interface UseDataTableProps {
  /**
   * Data array to display
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
   * Whether the table is paginated
   */
  paginated?: boolean;

  /**
   * Number of rows per page
   */
  pageSize?: number;

  /**
   * Callback when sorting changes
   */
  onSort?: (sortConfig: SortConfig) => void;

  /**
   * Initial sort configuration
   */
  initialSortConfig?: SortConfig;

  /**
   * Row selection mode
   */
  selectionMode?: SelectionMode;

  /**
   * Selected row IDs (controlled)
   */
  selectedRowIds?: (string | number)[];

  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedRows: any[], selectedIds: (string | number)[]) => void;

  /**
   * Key to use as unique identifier for rows
   */
  rowKey?: string | ((row: any) => string | number);

  /**
   * Column-specific filters
   */
  columnFilters?: boolean;

  /**
   * Whether columns can be reordered
   */
  reorderable?: boolean;

  /**
   * Callback when column order changes
   */
  onColumnReorder?: (columnKeys: string[]) => void;

  /**
   * Callback when column visibility changes
   */
  onColumnVisibilityChange?: (visibleColumns: string[]) => void;
}

export interface UseDataTableReturn {
  /**
   * Data to display (filtered, sorted, paginated)
   */
  displayData: any[];

  /**
   * Current sort configuration
   */
  sortConfig: SortConfig | null;

  /**
   * Current page number
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Handle sort column click
   */
  handleSort: (key: string) => void;

  /**
   * Handle page change
   */
  handlePageChange: (page: number) => void;

  /**
   * Handle search input
   */
  handleSearch: (query: string) => void;

  /**
   * Selected row IDs
   */
  selectedRowIds: (string | number)[];

  /**
   * Selected rows data
   */
  selectedRows: any[];

  /**
   * Handle row selection
   */
  handleRowSelect: (rowId: string | number, selected: boolean) => void;

  /**
   * Handle select all
   */
  handleSelectAll: (selected: boolean) => void;

  /**
   * Whether all rows are selected
   */
  isAllSelected: boolean;

  /**
   * Whether some rows are selected
   */
  isIndeterminate: boolean;

  /**
   * Column order
   */
  columnOrder: string[];

  /**
   * Visible columns
   */
  visibleColumns: DataTableColumn[];

  /**
   * Column visibility map
   */
  columnVisibility: Record<string, boolean>;

  /**
   * Handle column visibility toggle
   */
  handleColumnVisibilityToggle: (columnKey: string) => void;

  /**
   * Column-specific filter values
   */
  columnFilterValues: Record<string, string>;

  /**
   * Handle column filter change
   */
  handleColumnFilterChange: (columnKey: string, value: string) => void;

  /**
   * Clear all column filters
   */
  clearColumnFilters: () => void;
}

/**
 * Get unique row ID
 */
function getRowId(row: any, rowKey?: string | ((row: any) => string | number)): string | number {
  if (typeof rowKey === 'function') {
    return rowKey(row);
  }
  if (typeof rowKey === 'string') {
    return row[rowKey];
  }
  return row.id ?? row.key ?? JSON.stringify(row);
}

/**
 * Hook for managing DataTable state and behavior
 */
export function useDataTable({
  data = [],
  columns = [],
  sortable = false,
  paginated = false,
  pageSize = 10,
  onSort,
  initialSortConfig,
  selectionMode = 'none',
  selectedRowIds: controlledSelectedRowIds,
  onSelectionChange,
  rowKey,
  columnFilters = false,
  reorderable = false,
  onColumnReorder,
  onColumnVisibilityChange,
}: UseDataTableProps): UseDataTableReturn {
  // Sort state
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialSortConfig || null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selection state
  const [internalSelectedRowIds, setInternalSelectedRowIds] = useState<(string | number)[]>([]);
  const selectedRowIds = controlledSelectedRowIds ?? internalSelectedRowIds;

  // Column order state
  const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map(col => col.key));

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const visibility: Record<string, boolean> = {};
    columns.forEach(col => {
      visibility[col.key] = col.visible !== false;
    });
    return visibility;
  });

  // Column-specific filter values
  const [columnFilterValues, setColumnFilterValues] = useState<Record<string, string>>({});

  // Update column order when columns prop changes
  useEffect(() => {
    const newOrder = columns.map(col => col.key);
    const currentOrderSet = new Set(columnOrder);
    const newOrderSet = new Set(newOrder);

    // Only update if there are actual differences
    if (
      newOrder.length !== columnOrder.length ||
      !newOrder.every(key => currentOrderSet.has(key)) ||
      !columnOrder.every(key => newOrderSet.has(key))
    ) {
      setColumnOrder(newOrder);
    }
  }, [columns]);

  // Update column visibility when columns prop changes
  useEffect(() => {
    setColumnVisibility(prev => {
      const updated: Record<string, boolean> = { ...prev };
      columns.forEach(col => {
        if (!(col.key in updated)) {
          updated[col.key] = col.visible !== false;
        }
      });
      return updated;
    });
  }, [columns]);

  // Visible columns based on order and visibility
  const visibleColumns = useMemo(() => {
    return columnOrder
      .map(key => columns.find(col => col.key === key))
      .filter((col): col is DataTableColumn => col !== undefined && columnVisibility[col.key] !== false);
  }, [columns, columnOrder, columnVisibility]);

  // Handle sorting
  const handleSort = useCallback(
    (key: string) => {
      if (!sortable) return;

      let direction: 'asc' | 'desc' = 'asc';

      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }

      const newSortConfig = { key, direction };
      setSortConfig(newSortConfig);

      if (onSort) {
        onSort(newSortConfig);
      }
    },
    [sortable, sortConfig, onSort]
  );

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return;
      setCurrentPage(page);
    },
    []
  );

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Handle column filter change
  const handleColumnFilterChange = useCallback((columnKey: string, value: string) => {
    setColumnFilterValues(prev => ({
      ...prev,
      [columnKey]: value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Clear all column filters
  const clearColumnFilters = useCallback(() => {
    setColumnFilterValues({});
    setCurrentPage(1);
  }, []);

  // Filter data based on search query and column filters
  const filteredData = useMemo(() => {
    let result = data;

    // Apply global search
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      result = result.filter(row => {
        return visibleColumns.some(column => {
          const value = row[column.key];
          if (value == null) return false;
          return String(value).toLowerCase().includes(lowercaseQuery);
        });
      });
    }

    // Apply column-specific filters
    if (columnFilters) {
      result = result.filter(row => {
        return Object.entries(columnFilterValues).every(([columnKey, filterValue]) => {
          if (!filterValue) return true;

          const column = columns.find(col => col.key === columnKey);
          if (!column || !column.filterable) return true;

          const cellValue = row[columnKey];
          if (cellValue == null) return false;

          // Use custom filter function if provided
          if (column.filterFunction) {
            return column.filterFunction(cellValue, filterValue);
          }

          // Default text filter
          return String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
        });
      });
    }

    return result;
  }, [data, visibleColumns, searchQuery, columnFilterValues, columnFilters, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig || !sortable) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc' ? (aValue > bValue ? 1 : -1) : aValue > bValue ? -1 : 1;
    });
  }, [filteredData, sortConfig, sortable]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, paginated, currentPage, pageSize]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!paginated) return 1;
    return Math.max(1, Math.ceil(sortedData.length / pageSize));
  }, [sortedData.length, paginated, pageSize]);

  // Selected rows data
  const selectedRows = useMemo(() => {
    if (selectionMode === 'none' || selectedRowIds.length === 0) return [];
    return sortedData.filter(row => selectedRowIds.includes(getRowId(row, rowKey)));
  }, [sortedData, selectedRowIds, selectionMode, rowKey]);

  // Handle row selection
  const handleRowSelect = useCallback(
    (rowId: string | number, selected: boolean) => {
      if (selectionMode === 'none') return;

      let newSelectedIds: (string | number)[];

      if (selectionMode === 'single') {
        newSelectedIds = selected ? [rowId] : [];
      } else {
        // multiple
        if (selected) {
          newSelectedIds = [...selectedRowIds, rowId];
        } else {
          newSelectedIds = selectedRowIds.filter(id => id !== rowId);
        }
      }

      if (!controlledSelectedRowIds) {
        setInternalSelectedRowIds(newSelectedIds);
      }

      if (onSelectionChange) {
        const selectedRowsData = sortedData.filter(row => newSelectedIds.includes(getRowId(row, rowKey)));
        onSelectionChange(selectedRowsData, newSelectedIds);
      }
    },
    [selectionMode, selectedRowIds, controlledSelectedRowIds, onSelectionChange, sortedData, rowKey]
  );

  // Handle select all
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selectionMode !== 'multiple') return;

      const newSelectedIds = selected
        ? paginatedData.map(row => getRowId(row, rowKey))
        : [];

      if (!controlledSelectedRowIds) {
        setInternalSelectedRowIds(newSelectedIds);
      }

      if (onSelectionChange) {
        const selectedRowsData = sortedData.filter(row => newSelectedIds.includes(getRowId(row, rowKey)));
        onSelectionChange(selectedRowsData, newSelectedIds);
      }
    },
    [selectionMode, paginatedData, sortedData, controlledSelectedRowIds, onSelectionChange, rowKey]
  );

  // Check if all rows are selected
  const isAllSelected = useMemo(() => {
    if (selectionMode !== 'multiple' || paginatedData.length === 0) return false;
    return paginatedData.every(row => selectedRowIds.includes(getRowId(row, rowKey)));
  }, [selectionMode, paginatedData, selectedRowIds, rowKey]);

  // Check if some rows are selected (indeterminate)
  const isIndeterminate = useMemo(() => {
    if (selectionMode !== 'multiple' || paginatedData.length === 0) return false;
    const selectedCount = paginatedData.filter(row => selectedRowIds.includes(getRowId(row, rowKey))).length;
    return selectedCount > 0 && selectedCount < paginatedData.length;
  }, [selectionMode, paginatedData, selectedRowIds, rowKey]);

  // Handle column visibility toggle
  const handleColumnVisibilityToggle = useCallback(
    (columnKey: string) => {
      setColumnVisibility(prev => {
        const updated = { ...prev, [columnKey]: !prev[columnKey] };
        if (onColumnVisibilityChange) {
          const visibleKeys = Object.entries(updated)
            .filter(([, visible]) => visible)
            .map(([key]) => key);
          onColumnVisibilityChange(visibleKeys);
        }
        return updated;
      });
    },
    [onColumnVisibilityChange]
  );

  // Handle column reorder
  const handleColumnReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      const newOrder = [...columnOrder];
      const [removed] = newOrder.splice(fromIndex, 1);
      if (removed) {
        newOrder.splice(toIndex, 0, removed);
        setColumnOrder(newOrder);

        if (onColumnReorder) {
          onColumnReorder(newOrder);
        }
      }
    },
    [columnOrder, onColumnReorder]
  );

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Reset current page if it's out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  return {
    displayData: paginatedData,
    sortConfig,
    currentPage,
    totalPages,
    handleSort,
    handlePageChange,
    handleSearch,
    selectedRowIds,
    selectedRows,
    handleRowSelect,
    handleSelectAll,
    isAllSelected,
    isIndeterminate,
    columnOrder,
    visibleColumns,
    columnVisibility,
    handleColumnVisibilityToggle,
    columnFilterValues,
    handleColumnFilterChange,
    clearColumnFilters,
  };
}

export default useDataTable;
