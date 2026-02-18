import { DataTableColumn, ExportFormat } from '../types/components';

/**
 * Sanitize cell content to prevent CSV injection
 */
function sanitizeCSVCell(cell: any): string {
  const sanitized = String(cell ?? '').replace(/[\r\n\t]/g, ' ').replace(/"/g, '""');
  // Prevent formula injection by prefixing dangerous characters
  const dangerous = /^[=+\-@]/;
  return dangerous.test(sanitized) ? `'${sanitized}` : sanitized;
}

/**
 * Export data as CSV
 */
export function exportToCSV(
  data: any[],
  columns: DataTableColumn[],
  filename: string = 'data-table.csv'
): void {
  if (!data.length || !columns.length) return;

  // Create headers
  const headers = columns.map(col => col.title || col.key);

  // Create rows
  const rows = data.map(row => {
    return columns.map(col => {
      const value = row[col.key];
      if (col.render) {
        // For rendered cells, try to extract text content
        // This is a simplified approach - in production you might want to handle React elements differently
        return value ?? '';
      }
      return value ?? '';
    });
  });

  // Convert to CSV string
  const csvContent = [
    headers.map(h => `"${sanitizeCSVCell(h)}"`).join(','),
    ...rows.map(row => row.map(cell => `"${sanitizeCSVCell(cell)}"`).join(',')),
  ].join('\n');

  // Download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Export data as JSON
 */
export function exportToJSON(
  data: any[],
  filename: string = 'data-table.json'
): void {
  if (!data.length) return;

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Export data as CSV but with .xlsx extension and Excel MIME type.
 *
 * @deprecated Use `exportToCsvWithXlsxExtension` instead.
 * This function is misleading as it does not produce a valid Excel file, but a CSV file.
 * This can cause warnings in Excel. Consider using `exportToCSV` or implementing a proper Excel export using a library.
 */
export function exportToExcel(
  data: any[],
  columns: DataTableColumn[],
  filename: string = 'data-table.xlsx'
): void {
  exportToCsvWithXlsxExtension(data, columns, filename);
}

/**
 * Export data as CSV but with .xlsx extension and Excel MIME type.
 *
 * @remarks
 * This function creates a CSV file but gives it an .xlsx extension and
 * application/vnd.openxmlformats-officedocument.spreadsheetml.sheet MIME type.
 * This trick allows opening the file in Excel, but Excel will warn about the file format mismatch.
 *
 * Ideally, this should be replaced with a proper Excel export using a library like `xlsx` or `exceljs`,
 * or simply use `exportToCSV`.
 */
export function exportToCsvWithXlsxExtension(
  data: any[],
  columns: DataTableColumn[],
  filename: string = 'data-table.xlsx'
): void {
  // For now, we'll export as CSV but with .xlsx extension
  // In a production environment, you'd want to use a library like 'xlsx' or 'exceljs'
  // to create a proper Excel file
  if (!data.length || !columns.length) return;

  // Create headers
  const headers = columns.map(col => col.title || col.key);

  // Create rows
  const rows = data.map(row => {
    return columns.map(col => {
      const value = row[col.key];
      return value ?? '';
    });
  });

  // Convert to CSV format (Excel can open CSV files)
  const csvContent = [
    headers.map(h => `"${sanitizeCSVCell(h)}"`).join(','),
    ...rows.map(row => row.map(cell => `"${sanitizeCSVCell(cell)}"`).join(',')),
  ].join('\n');

  // Download with .xlsx extension (though it's actually CSV)
  // In production, use a proper Excel library
  const blob = new Blob([csvContent], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Export data in the specified format
 */
export function exportData(
  format: ExportFormat,
  data: any[],
  columns: DataTableColumn[],
  filename?: string
): void {
  const defaultFilename = filename || 'data-table';

  switch (format) {
    case 'csv':
      exportToCSV(data, columns, defaultFilename);
      break;
    case 'excel':
      exportToCsvWithXlsxExtension(data, columns, defaultFilename);
      break;
    case 'json':
      exportToJSON(data, defaultFilename);
      break;
    default:
      console.warn(`Unsupported export format: ${format}`);
  }
}

