import { DataTable, DataTableColumn, DataTableOptions } from './index';

// Initialize global namespace if not exists
window.Atomix = window.Atomix || {};

// Add DataTable to global namespace
window.Atomix.DataTable = {
  DataTable,
  initializeAll: DataTable.initializeAll,
  create: (element: string | HTMLElement, data: any[] = [], columns: DataTableColumn[] = [], options: DataTableOptions = {}) => {
    return new DataTable(element, data, columns, options);
  }
};

export default DataTable; 