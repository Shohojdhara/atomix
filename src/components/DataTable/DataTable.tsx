import React, { useRef, memo } from 'react';
import { DataTableProps } from '../../lib/types/components';
import { useDataTable } from '../../lib/composables/useDataTable';
import { DATA_TABLE_CLASSES } from '../../lib/constants/components';
import { Spinner } from '../Spinner/Spinner';
import { Icon } from '../Icon/Icon';
import { Pagination } from '../Pagination/Pagination';

/**
 * DataTable - A flexible and accessible data table component
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   sortable={true}
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
  ...props
}) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const {
    displayData,
    sortConfig,
    currentPage,
    totalPages,
    handleSort,
    handlePageChange,
    handleSearch,
  } = useDataTable({
    data,
    columns,
    sortable,
    paginated,
    pageSize,
    onSort,
  });

  // Generate component classes
  const tableClass = [
    DATA_TABLE_CLASSES.base,
    striped && DATA_TABLE_CLASSES.striped,
    bordered && DATA_TABLE_CLASSES.bordered,
    dense && DATA_TABLE_CLASSES.dense,
    loading && DATA_TABLE_CLASSES.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderHeader = () => {
    return (
      <thead className={DATA_TABLE_CLASSES.header}>
        <tr>
          {columns.map((column, index) => (
            <th
              key={`header-${index}`}
              className={`${DATA_TABLE_CLASSES.headerCell} ${column.sortable !== false && sortable ? DATA_TABLE_CLASSES.sortable : ''}`}
              onClick={() =>
                column.sortable !== false && sortable ? handleSort(column.key) : null
              }
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
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderBody = () => {
    if (loading) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length} className={DATA_TABLE_CLASSES.loadingCell}>
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
            <td colSpan={columns.length} className={DATA_TABLE_CLASSES.emptyCell}>
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {displayData.map((row: any, rowIndex: number) => (
          <tr
            key={`row-${rowIndex}`}
            className={DATA_TABLE_CLASSES.row}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            tabIndex={onRowClick ? 0 : undefined}
            role={onRowClick ? 'button' : undefined}
          >
            {columns.map((column, colIndex) => (
              <td key={`cell-${rowIndex}-${colIndex}`} className={DATA_TABLE_CLASSES.cell}>
                {column.render ? column.render(row[column.key], row) : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
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
          ariaLabel="Data table pagination"
          className="c-data-table__pagination"
        />
      </div>
    );
  };

  const renderToolbar = () => {
    if (!filterable) return null;

    return (
      <div className={DATA_TABLE_CLASSES.toolbar}>
        <div className={DATA_TABLE_CLASSES.search}>
          <input
            type="text"
            placeholder="Search..."
            className={`${DATA_TABLE_CLASSES.searchInput} c-input`}
            onChange={e => handleSearch(e.target.value)}
            aria-label="Search table"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={DATA_TABLE_CLASSES.container} style={style} {...props}>
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
