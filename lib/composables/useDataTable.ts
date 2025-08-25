import { useState, useEffect, useCallback, useMemo } from 'react';
import { DataTableColumn, SortConfig } from '../types/components';

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
}: UseDataTableProps): UseDataTableReturn {
  // Sort state
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialSortConfig || null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

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
      if (page < 1 || page > Math.ceil(data.length / pageSize)) return;
      setCurrentPage(page);
    },
    [data.length, pageSize]
  );

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    const lowercaseQuery = searchQuery.toLowerCase();

    return data.filter(row => {
      return columns.some(column => {
        const value = row[column.key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(lowercaseQuery);
      });
    });
  }, [data, columns, searchQuery]);

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

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Reset current page if it's out of bounds
  useEffect(() => {
    if (currentPage > totalPages) {
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
  };
}

export default useDataTable;
