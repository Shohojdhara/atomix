import { DataTable, DataTableColumn, DataTableOptions } from './index';

// Export for global usage
declare global {
  interface Window {
    AtomixDataTable: {
      DataTable: typeof DataTable;
      initializeAll: typeof DataTable.initializeAll;
      create: (element: string | HTMLElement, data?: any[], columns?: DataTableColumn[], options?: DataTableOptions) => DataTable;
    };
  }
}

// Create global API
window.AtomixDataTable = {
  DataTable,
  initializeAll: DataTable.initializeAll,
  create: (element, data = [], columns = [], options = {}) => {
    return new DataTable(element, data, columns, options);
  }
};

export default DataTable; 