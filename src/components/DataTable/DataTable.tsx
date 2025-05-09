import React, { useRef } from 'react';
import { DataTableProps } from '../../lib/types/components';
import { useDataTable } from './scripts';
import { DATA_TABLE_CLASSES } from '../../lib/constants/components';
import { Spinner } from '../Spinner';
import { Icon } from '../Icon';

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
export const DataTable: React.FC<DataTableProps> = ({
  data = [],
  columns = [],
  className,
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
    className
  ].filter(Boolean).join(' ');
  
  const renderHeader = () => {
    return (
      <thead className={DATA_TABLE_CLASSES.header}>
        <tr>
          {columns.map((column, index) => (
            <th 
              key={`header-${index}`}
              className={`${DATA_TABLE_CLASSES.headerCell} ${column.sortable !== false && sortable ? DATA_TABLE_CLASSES.sortable : ''}`}
              onClick={() => column.sortable !== false && sortable ? handleSort(column.key) : null}
              aria-sort={sortConfig?.key === column.key ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : undefined}
            >
              <div className={DATA_TABLE_CLASSES.headerContent}>
                <span>{column.title}</span>
                {column.sortable !== false && sortable && (
                  <span className={DATA_TABLE_CLASSES.sortIcon}>
                    {sortConfig?.key === column.key ? (
                      sortConfig.direction === 'asc' ? 
                        <Icon name="CaretUp" size="sm" /> : 
                        <Icon name="CaretDown" size="sm" />
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
            <td 
              colSpan={columns.length} 
              className={DATA_TABLE_CLASSES.loadingCell}
            >
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
            <td 
              colSpan={columns.length} 
              className={DATA_TABLE_CLASSES.emptyCell}
            >
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
              <td 
                key={`cell-${rowIndex}-${colIndex}`}
                className={DATA_TABLE_CLASSES.cell}
              >
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
      <nav className="c-pagination" aria-label="Data table pagination">
        <ul className="c-pagination__items">
          <li className="c-pagination__item">
            <button 
              className={`c-pagination__link ${currentPage === 1 ? 'is-disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <Icon name="CaretLeft" size="sm" />
            </button>
          </li>
          
          {/* First page */}
          <li className="c-pagination__item">
            <button 
              className={`c-pagination__link ${currentPage === 1 ? 'is-active' : ''}`}
              onClick={() => handlePageChange(1)}
              aria-label="Page 1"
              aria-current={currentPage === 1 ? 'page' : undefined}
            >
              1
            </button>
          </li>
          
          {/* Ellipsis if needed */}
          {currentPage > 3 && (
            <li className="c-pagination__item">
              <span className="c-pagination__link">...</span>
            </li>
          )}
          
          {/* Previous page if not first or second */}
          {currentPage > 2 && (
            <li className="c-pagination__item">
              <button 
                className="c-pagination__link"
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label={`Page ${currentPage - 1}`}
              >
                {currentPage - 1}
              </button>
            </li>
          )}
          
          {/* Current page if not first */}
          {currentPage !== 1 && currentPage !== totalPages && (
            <li className="c-pagination__item">
              <button 
                className="c-pagination__link is-active"
                onClick={() => handlePageChange(currentPage)}
                aria-label={`Page ${currentPage}`}
                aria-current="page"
              >
                {currentPage}
              </button>
            </li>
          )}
          
          {/* Next page if not last or second-to-last */}
          {currentPage < totalPages - 1 && (
            <li className="c-pagination__item">
              <button 
                className="c-pagination__link"
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label={`Page ${currentPage + 1}`}
              >
                {currentPage + 1}
              </button>
            </li>
          )}
          
          {/* Ellipsis if needed */}
          {currentPage < totalPages - 2 && (
            <li className="c-pagination__item">
              <span className="c-pagination__link">...</span>
            </li>
          )}
          
          {/* Last page if not first page */}
          {totalPages > 1 && (
            <li className="c-pagination__item">
              <button 
                className={`c-pagination__link ${currentPage === totalPages ? 'is-active' : ''}`}
                onClick={() => handlePageChange(totalPages)}
                aria-label={`Page ${totalPages}`}
                aria-current={currentPage === totalPages ? 'page' : undefined}
              >
                {totalPages}
              </button>
            </li>
          )}
          
          <li className="c-pagination__item">
            <button 
              className={`c-pagination__link ${currentPage === totalPages ? 'is-disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <Icon name="CaretRight" size="sm" />
            </button>
          </li>
        </ul>
      </nav>
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
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search table"
          />
        </div>
      </div>
    );
  };
  
  return (
    <div className={DATA_TABLE_CLASSES.container} {...props}>
      {renderToolbar()}
      <div className={DATA_TABLE_CLASSES.tableWrapper}>
        <table 
          ref={tableRef}
          className={tableClass}
        >
          {renderHeader()}
          {renderBody()}
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};

export default DataTable; 