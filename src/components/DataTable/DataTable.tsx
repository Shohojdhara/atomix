import React, { useRef, memo, useState, useCallback, useEffect } from 'react';
import { DataTableProps, SelectionMode, ExportFormat } from '../../lib/types/components';
import { useDataTable } from '../../lib/composables/useDataTable';
import { DATA_TABLE_CLASSES } from '../../lib/constants/components';
import { Spinner } from '../Spinner/Spinner';
import { Icon } from '../Icon/Icon';
import { Pagination } from '../Pagination/Pagination';
import { Checkbox } from '../Form/Checkbox';
import { Dropdown, DropdownItem, DropdownDivider } from '../Dropdown/Dropdown';
import { exportData } from '../../lib/utils/dataTableExport';
import { Button } from '../Button/Button';
import { DataTableRow } from './DataTableRow';

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
 * DataTable - A flexible and accessible data table component with advanced features
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   sortable={true}
 *   selectionMode="multiple"
 *   onRowClick={handleRowClick}
 * />
 * ```
 */
export const DataTable: React.FC<DataTableProps> = memo(({
  data,
  columns,
  className,
  style,
  sortable = false,
  filterable = false,
  paginated = false,
  pageSize = 10,
  striped = false,
  bordered = false,
  dense = false,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  onSort,
  selectionMode = 'none',
  selectedRowIds: controlledSelectedRowIds,
  onSelectionChange,
  rowKey,
  resizable = false,
  reorderable = false,
  onColumnReorder,
  showColumnVisibility = false,
  onColumnVisibilityChange,
  stickyHeader = false,
  stickyHeaderOffset = '0px',
  virtualScrolling = false,
  estimatedRowHeight = 50,
  overscan = 5,
  exportable = false,
  exportFormats = ['csv', 'excel', 'json'],
  exportFilename = 'data-table',
  onExport,
  columnFilters = false,
  ...props
}) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const headerRef = useRef<HTMLTableSectionElement>(null);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const {
    displayData,
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
    visibleColumns,
    columnVisibility,
    handleColumnVisibilityToggle,
    columnFilterValues,
    handleColumnFilterChange,
    clearColumnFilters,
  } = useDataTable({
    data,
    columns,
    sortable,
    paginated,
    pageSize,
    onSort,
    selectionMode,
    selectedRowIds: controlledSelectedRowIds,
    onSelectionChange,
    rowKey,
    columnFilters,
    reorderable,
    onColumnReorder,
    onColumnVisibilityChange,
  });

  // Initialize column widths
  useEffect(() => {
    const widths: Record<string, number> = {};
    visibleColumns.forEach(col => {
      if (col.width) {
        const widthValue = parseInt(col.width, 10);
        if (!isNaN(widthValue)) {
          widths[col.key] = widthValue;
        }
      }
    });
    setColumnWidths(widths);
  }, [visibleColumns]);

  // Handle column resize start
  const handleResizeStart = useCallback((columnKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingColumn(columnKey);

    const startX = e.clientX;
    const startWidth = columnWidths[columnKey] || 100;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diff = moveEvent.clientX - startX;
      const newWidth = Math.max(50, startWidth + diff); // Minimum width of 50px

      setColumnWidths(prev => ({
        ...prev,
        [columnKey]: newWidth,
      }));
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [columnWidths]);

  // Handle column drag start
  const handleDragStart = useCallback((index: number) => {
    setDragStartIndex(index);
  }, []);

  // Handle column drag over
  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  // Handle column drop
  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (dragStartIndex !== null && dragStartIndex !== dropIndex && onColumnReorder) {
      const newOrder = [...visibleColumns.map(col => col.key)];
      const [removed] = newOrder.splice(dragStartIndex, 1);
      if (removed) {
        newOrder.splice(dropIndex, 0, removed);
        onColumnReorder(newOrder);
      }
    }
    setDragStartIndex(null);
    setDragOverIndex(null);
  }, [dragStartIndex, visibleColumns, onColumnReorder]);

  // Handle export
  const handleExport = useCallback((format: ExportFormat) => {
    if (onExport) {
      onExport(format, displayData);
    } else {
      exportData(format, displayData, visibleColumns, exportFilename);
    }
  }, [displayData, visibleColumns, exportFilename, onExport]);

  // Generate component classes
  const tableClass = [
    DATA_TABLE_CLASSES.base,
    striped && DATA_TABLE_CLASSES.striped,
    bordered && DATA_TABLE_CLASSES.bordered,
    dense && DATA_TABLE_CLASSES.dense,
    loading && DATA_TABLE_CLASSES.loading,
    stickyHeader && DATA_TABLE_CLASSES.stickyHeader,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle: React.CSSProperties = {
    ...style,
    ...(stickyHeader && {
      '--sticky-header-offset': stickyHeaderOffset,
    } as React.CSSProperties),
  };

  const renderSelectionHeader = () => {
    if (selectionMode === 'none') return null;

    return (
      <th
        className={`${DATA_TABLE_CLASSES.headerCell} ${DATA_TABLE_CLASSES.selectionCell}`}
        style={{ width: '48px' }}
      >
        {selectionMode === 'multiple' && (
          <Checkbox
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            onChange={(e) => handleSelectAll(e.target.checked)}
            aria-label="Select all rows"
          />
        )}
      </th>
    );
  };

  const renderHeader = () => {
    return (
      <thead
        ref={headerRef}
        className={DATA_TABLE_CLASSES.header}
        style={stickyHeader ? { position: 'sticky', top: stickyHeaderOffset, zIndex: 10 } : undefined}
      >
        <tr>
          {renderSelectionHeader()}
          {visibleColumns.map((column, index) => {
            const isDragging = dragStartIndex === index;
            const isDragOver = dragOverIndex === index;

            return (
              <th
                key={`header-${column.key}`}
                className={[
                  DATA_TABLE_CLASSES.headerCell,
                  column.sortable !== false && sortable ? DATA_TABLE_CLASSES.sortable : '',
                  isDragging ? DATA_TABLE_CLASSES.dragging : '',
                  isDragOver ? DATA_TABLE_CLASSES.dragOver : '',
                ].filter(Boolean).join(' ')}
                style={{
                  ...(columnWidths[column.key] && { width: `${columnWidths[column.key]}px` }),
                  ...(column.width && !columnWidths[column.key] && { width: column.width }),
                }}
                onClick={() => column.sortable !== false && sortable ? handleSort(column.key) : null}
                onDragStart={reorderable ? () => handleDragStart(index) : undefined}
                onDragOver={reorderable ? (e) => handleDragOver(e, index) : undefined}
                onDrop={reorderable ? (e) => handleDrop(e, index) : undefined}
                draggable={reorderable}
                aria-sort={
                  sortConfig?.key === column.key
                    ? sortConfig.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined
                }
              >
                <div className={DATA_TABLE_CLASSES.headerContent}>
                  <span>{column.title}</span>
                  <div className={DATA_TABLE_CLASSES.headerActions}>
                    {column.sortable !== false && sortable && (
                      <span className={DATA_TABLE_CLASSES.sortIcon}>
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <Icon name="CaretUp" size="sm" />
                          ) : (
                            <Icon name="CaretDown" size="sm" />
                          )
                        ) : null}
                      </span>
                    )}
                    {columnFilters && column.filterable !== false && (
                      <input
                        type="text"
                        className={DATA_TABLE_CLASSES.columnFilter}
                        placeholder="Filter..."
                        value={columnFilterValues[column.key] || ''}
                        onChange={(e) => handleColumnFilterChange(column.key, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Filter ${column.title}`}
                      />
                    )}
                  </div>
                </div>
                {resizable && (column.resizable !== false) && (
                  <div
                    className={DATA_TABLE_CLASSES.resizeHandle}
                    onMouseDown={(e) => handleResizeStart(column.key, e)}
                  />
                )}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const renderBody = () => {
    if (loading) {
      return (
        <tbody>
          <tr>
            <td colSpan={visibleColumns.length + (selectionMode !== 'none' ? 1 : 0)} className={DATA_TABLE_CLASSES.loadingCell}>
              <div className={DATA_TABLE_CLASSES.loadingIndicator}>
                <Spinner size="md" variant="primary" />
              </div>
            </td>
          </tr>
        </tbody>
      );
    }

    if (displayData.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={visibleColumns.length + (selectionMode !== 'none' ? 1 : 0)} className={DATA_TABLE_CLASSES.emptyCell}>
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {displayData.map((row: any, rowIndex: number) => {
          const rowId = getRowId(row, rowKey);
          const isSelected = selectedRowIds.includes(rowId);

          return (
            <DataTableRow
              key={`row-${rowId}`}
              row={row}
              rowIndex={rowIndex}
              rowId={rowId}
              isSelected={isSelected}
              visibleColumns={visibleColumns}
              columnWidths={columnWidths}
              selectionMode={selectionMode}
              onRowClick={onRowClick}
              onRowSelect={handleRowSelect}
            />
          );
        })}
      </tbody>
    );
  };

  const renderPagination = () => {
    if (!paginated || totalPages <= 1) return null;

    return (
      <div className={DATA_TABLE_CLASSES.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showFirstLastButtons={true}
          showPrevNextButtons={true}
          size="sm"
          aria-label="Data table pagination"
          className="c-data-table__pagination"
        />
      </div>
    );
  };

  const renderToolbar = () => {
    const hasToolbar = filterable || exportable || showColumnVisibility || columnFilters;
    if (!hasToolbar) return null;

    return (
      <div className={DATA_TABLE_CLASSES.toolbar}>
        <div className={DATA_TABLE_CLASSES.toolbarLeft}>
          {filterable && (
            <div className={DATA_TABLE_CLASSES.search}>
              <input
                type="text"
                placeholder="Search..."
                className={`${DATA_TABLE_CLASSES.searchInput} c-input`}
                onChange={e => handleSearch(e.target.value)}
                aria-label="Search table"
              />
            </div>
          )}
          {columnFilters && Object.keys(columnFilterValues).length > 0 && (
            <Button
              size="sm"
              variant="secondary"
              onClick={clearColumnFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
        <div className={DATA_TABLE_CLASSES.toolbarRight}>
          {showColumnVisibility && (
            <Dropdown
              trigger="click"
              placement="bottom-end"
              menu={
                <>
                  {columns.map((column) => (
                    <DropdownItem
                      key={column.key}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleColumnVisibilityToggle(column.key);
                      }}
                    >
                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: '100%' }}>
                        <Checkbox
                          checked={columnVisibility[column.key] !== false}
                          onChange={() => handleColumnVisibilityToggle(column.key)}
                          onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
                        />
                        <span style={{ marginLeft: '0.5rem' }}>{column.title}</span>
                      </label>
                    </DropdownItem>
                  ))}
                </>
              }
            >
              <Button size="sm" variant="secondary">
                <Icon name="Columns" size="sm" />
                Columns
              </Button>
            </Dropdown>
          )}
          {exportable && (
            <Dropdown
              trigger="click"
              placement="bottom-end"
              menu={
                <>
                  {exportFormats.includes('csv') && (
                    <DropdownItem onClick={() => handleExport('csv')}>
                      Export as CSV
                    </DropdownItem>
                  )}
                  {exportFormats.includes('excel') && (
                    <DropdownItem onClick={() => handleExport('excel')}>
                      Export as Excel
                    </DropdownItem>
                  )}
                  {exportFormats.includes('json') && (
                    <DropdownItem onClick={() => handleExport('json')}>
                      Export as JSON
                    </DropdownItem>
                  )}
                </>
              }
            >
              <Button size="sm" variant="secondary">
                <Icon name="Download" size="sm" />
                Export
              </Button>
            </Dropdown>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={DATA_TABLE_CLASSES.container} style={containerStyle} {...props}>
      {renderToolbar()}
      <div className={DATA_TABLE_CLASSES.tableWrapper}>
        <table ref={tableRef} className={tableClass}>
          {renderHeader()}
          {renderBody()}
        </table>
      </div>
      {renderPagination()}
    </div>
  );
});

export type { DataTableProps };

DataTable.displayName = 'DataTable';

export default DataTable;
