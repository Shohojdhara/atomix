import React, { memo } from 'react';
import { DATA_TABLE_CLASSES } from '../../lib/constants/components';
import { Checkbox } from '../Form/Checkbox';
import { DataTableColumn, SelectionMode } from '../../lib/types/components';

interface DataTableRowProps {
  row: any;
  rowIndex: number;
  rowId: string | number;
  isSelected: boolean;
  visibleColumns: DataTableColumn[];
  columnWidths: Record<string, number>;
  selectionMode: SelectionMode;
  onRowClick?: (row: any) => void;
  onRowSelect: (rowId: string | number, selected: boolean) => void;
}

export const DataTableRow = memo(({
  row,
  rowIndex,
  rowId,
  isSelected,
  visibleColumns,
  columnWidths,
  selectionMode,
  onRowClick,
  onRowSelect,
}: DataTableRowProps) => {

  const handleRowClick = onRowClick ? () => onRowClick(row) : undefined;

  const handleMultipleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRowSelect(rowId, e.target.checked);
  };

  const handleSingleSelect = () => {
    onRowSelect(rowId, true);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <tr
      className={[
        DATA_TABLE_CLASSES.row,
        isSelected ? DATA_TABLE_CLASSES.rowSelected : '',
      ].filter(Boolean).join(' ')}
      onClick={handleRowClick}
      tabIndex={onRowClick ? 0 : undefined}
      role={onRowClick ? 'button' : undefined}
    >
      {selectionMode !== 'none' && (
        <td className={`${DATA_TABLE_CLASSES.cell} ${DATA_TABLE_CLASSES.selectionCell}`}>
          {selectionMode === 'multiple' ? (
            <Checkbox
              checked={isSelected}
              onChange={handleMultipleSelect}
              onClick={stopPropagation}
              aria-label={`Select row ${rowIndex + 1}`}
            />
          ) : (
            <input
              type="radio"
              checked={isSelected}
              onChange={handleSingleSelect}
              onClick={stopPropagation}
              name="data-table-row-selection"
              aria-label={`Select row ${rowIndex + 1}`}
              className="c-data-table__radio"
            />
          )}
        </td>
      )}
      {visibleColumns.map((column) => (
        <td
          key={`cell-${rowId}-${column.key}`}
          className={DATA_TABLE_CLASSES.cell}
          style={{
            ...(columnWidths[column.key] && { width: `${columnWidths[column.key]}px` }),
            ...(column.width && !columnWidths[column.key] && { width: column.width }),
          }}
        >
          {column.render ? column.render(row[column.key], row) : row[column.key]}
        </td>
      ))}
    </tr>
  );
});

DataTableRow.displayName = 'DataTableRow';
