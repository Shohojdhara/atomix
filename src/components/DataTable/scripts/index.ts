import { DATA_TABLE_SELECTORS } from '../../../lib/constants/components';
import { useDataTable } from '../../../lib/composables/useDataTable';

export { useDataTable };

/**
 * DataTable Column Definition
 */
export interface DataTableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: any) => string | HTMLElement;
  width?: string;
}

/**
 * DataTable Options
 */
export interface DataTableOptions {
  sortable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  striped?: boolean;
  bordered?: boolean;
  dense?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: any) => void;
  loading?: boolean;
}

/**
 * Sort Configuration
 */
interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

/**
 * DataTable Class
 * Vanilla JS implementation of the DataTable component
 */
export class DataTable {
  // Default configuration
  private static defaults: DataTableOptions = {
    sortable: false,
    filterable: false,
    paginated: false,
    pageSize: 10,
    striped: false,
    bordered: false,
    dense: false,
    emptyMessage: 'No data available'
  };
  
  // DOM elements
  private element: HTMLElement;
  private tableElement: HTMLTableElement | null = null;
  private searchInput: HTMLInputElement | null = null;
  private paginationElement: HTMLElement | null = null;
  
  // State
  private data: any[] = [];
  private columns: DataTableColumn[] = [];
  private sortConfig: SortConfig | null = null;
  private currentPage: number = 1;
  private searchQuery: string = '';
  
  // Configuration
  private options: DataTableOptions;
  
  /**
   * Constructor
   * @param element - DOM element or selector
   * @param data - Data array
   * @param columns - Column definitions
   * @param options - Configuration options
   */
  constructor(
    element: string | HTMLElement, 
    data: any[] = [], 
    columns: DataTableColumn[] = [],
    options: DataTableOptions = {}
  ) {
    // Get element reference
    this.element = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element;
    
    if (!this.element) {
      throw new Error('DataTable: Element not found');
    }
    
    // Store data and columns
    this.data = data;
    this.columns = columns;
    
    // Merge default options with provided options
    this.options = { ...DataTable.defaults, ...options };
    
    // Initialize the component
    this._initialize();
  }
  
  /**
   * Initialize the component
   * @private
   */
  private _initialize(): void {
    // Create container structure
    this._createStructure();
    
    // Render table
    this._renderTable();
    
    // Bind events
    this._bindEvents();
    
    // Add modifier classes
    this._addModifierClasses();
  }
  
  /**
   * Create container structure
   * @private
   */
  private _createStructure(): void {
    // Clear element
    this.element.innerHTML = '';
    
    // Add container class
    this.element.classList.add('c-data-table-container');
    
    // Create toolbar if filterable
    if (this.options.filterable) {
      const toolbar = document.createElement('div');
      toolbar.className = 'c-data-table-toolbar';
      
      const searchContainer = document.createElement('div');
      searchContainer.className = 'c-data-table-search';
      
      this.searchInput = document.createElement('input');
      this.searchInput.type = 'text';
      this.searchInput.placeholder = 'Search...';
      this.searchInput.className = 'c-data-table-search__input c-input';
      this.searchInput.setAttribute('aria-label', 'Search table');
      
      searchContainer.appendChild(this.searchInput);
      toolbar.appendChild(searchContainer);
      this.element.appendChild(toolbar);
    }
    
    // Create table wrapper
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'c-data-table-wrapper';
    
    // Create table
    this.tableElement = document.createElement('table');
    this.tableElement.className = 'c-data-table';
    
    tableWrapper.appendChild(this.tableElement);
    this.element.appendChild(tableWrapper);
    
    // Create pagination if needed
    if (this.options.paginated) {
      this.paginationElement = document.createElement('nav');
      this.paginationElement.className = 'c-pagination';
      this.paginationElement.setAttribute('aria-label', 'Data table pagination');
      this.element.appendChild(this.paginationElement);
    }
  }
  
  /**
   * Add modifier classes based on options
   * @private
   */
  private _addModifierClasses(): void {
    if (!this.tableElement) return;
    
    if (this.options.striped) {
      this.tableElement.classList.add('c-data-table--striped');
    }
    
    if (this.options.bordered) {
      this.tableElement.classList.add('c-data-table--bordered');
    }
    
    if (this.options.dense) {
      this.tableElement.classList.add('c-data-table--dense');
    }
  }
  
  /**
   * Bind event listeners
   * @private
   */
  private _bindEvents(): void {
    // Search input events
    if (this.searchInput) {
      this.searchInput.addEventListener('input', this._handleSearch.bind(this));
    }
    
    // Sort header click events
    if (this.options.sortable && this.tableElement) {
      const headerCells = this.tableElement.querySelectorAll(DATA_TABLE_SELECTORS.HEADER_CELL);
      headerCells.forEach(cell => {
        const columnKey = cell.getAttribute('data-column-key');
        if (columnKey) {
          const column = this.columns.find(col => col.key === columnKey);
          if (column && column.sortable !== false) {
            cell.addEventListener('click', () => this._handleSort(columnKey));
          }
        }
      });
    }
    
    // Row click events
    if (this.options.onRowClick && this.tableElement) {
      this.tableElement.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const row = target.closest(DATA_TABLE_SELECTORS.ROW) as HTMLElement;
        if (row) {
          const rowIndex = parseInt(row.getAttribute('data-row-index') || '-1', 10);
          if (rowIndex >= 0) {
            const rowData = this._getDisplayData()[rowIndex];
            if (rowData && this.options.onRowClick) {
              this.options.onRowClick(rowData);
            }
          }
        }
      });
    }
  }
  
  /**
   * Handle search input
   * @private
   */
  private _handleSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.currentPage = 1; // Reset to first page
    this._renderTable();
  }
  
  /**
   * Handle sort header click
   * @private
   */
  private _handleSort(key: string): void {
    if (!this.options.sortable) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    
    if (this.sortConfig && this.sortConfig.key === key) {
      direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    this.sortConfig = { key, direction };
    this._renderTable();
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('data-table:sort', {
      bubbles: true,
      detail: { sortConfig: this.sortConfig }
    }));
  }
  
  /**
   * Handle page change
   * @private
   */
  private _handlePageChange(page: number): void {
    if (page < 1 || page > this._getTotalPages()) return;
    
    this.currentPage = page;
    this._renderTable();
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('data-table:page', {
      bubbles: true,
      detail: { page: this.currentPage }
    }));
  }
  
  /**
   * Get filtered data based on search query
   * @private
   */
  private _getFilteredData(): any[] {
    if (!this.searchQuery) return this.data;
    
    const lowercaseQuery = this.searchQuery.toLowerCase();
    
    return this.data.filter(row => {
      return this.columns.some(column => {
        const value = row[column.key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(lowercaseQuery);
      });
    });
  }
  
  /**
   * Get sorted data
   * @private
   */
  private _getSortedData(): any[] {
    const filteredData = this._getFilteredData();
    
    if (!this.sortConfig || !this.options.sortable) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[this.sortConfig!.key];
      const bValue = b[this.sortConfig!.key];
      
      if (aValue == null) return this.sortConfig!.direction === 'asc' ? -1 : 1;
      if (bValue == null) return this.sortConfig!.direction === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortConfig!.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return this.sortConfig!.direction === 'asc' 
        ? (aValue > bValue ? 1 : -1) 
        : (aValue > bValue ? -1 : 1);
    });
  }
  
  /**
   * Get paginated data
   * @private
   */
  private _getPaginatedData(): any[] {
    const sortedData = this._getSortedData();
    
    if (!this.options.paginated) return sortedData;
    
    const startIndex = (this.currentPage - 1) * (this.options.pageSize || 10);
    return sortedData.slice(startIndex, startIndex + (this.options.pageSize || 10));
  }
  
  /**
   * Get display data (filtered, sorted, paginated)
   * @private
   */
  private _getDisplayData(): any[] {
    return this._getPaginatedData();
  }
  
  /**
   * Get total pages
   * @private
   */
  private _getTotalPages(): number {
    if (!this.options.paginated) return 1;
    
    const filteredData = this._getFilteredData();
    return Math.max(1, Math.ceil(filteredData.length / (this.options.pageSize || 10)));
  }
  
  /**
   * Render table
   * @private
   */
  private _renderTable(): void {
    if (!this.tableElement) return;
    
    // Clear table
    this.tableElement.innerHTML = '';
    
    // Render header
    this._renderHeader();
    
    // Check if loading
    if (this.options.loading) {
      const tbody = document.createElement('tbody');
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      
      td.className = 'c-data-table__loading-cell';
      td.colSpan = this.columns.length;
      
      const loadingContainer = document.createElement('div');
      loadingContainer.className = 'c-data-table__loading-indicator';
      
      loadingContainer.appendChild(this._createSpinner());
      
      td.appendChild(loadingContainer);
      tr.appendChild(td);
      tbody.appendChild(tr);
      this.tableElement.appendChild(tbody);
    } else {
      // Render body
      this._renderBody();
    }
    
    // Render pagination
    if (this.options.paginated) {
      this._renderPagination();
    }
  }
  
  /**
   * Render table header
   * @private
   */
  private _renderHeader(): void {
    if (!this.tableElement) return;
    
    const thead = document.createElement('thead');
    thead.className = 'c-data-table__header';
    
    const tr = document.createElement('tr');
    
    this.columns.forEach(column => {
      const th = document.createElement('th');
      th.className = 'c-data-table__header-cell';
      
      if (column.sortable !== false && this.options.sortable) {
        th.classList.add('c-data-table__header-cell--sortable');
        th.setAttribute('data-column-key', column.key);
        
        if (this.sortConfig && this.sortConfig.key === column.key) {
          th.setAttribute('aria-sort', this.sortConfig.direction === 'asc' ? 'ascending' : 'descending');
        }
      }
      
      if (column.width) {
        th.style.width = column.width;
      }
      
      const content = document.createElement('div');
      content.className = 'c-data-table__header-content';
      
      const title = document.createElement('span');
      title.textContent = column.title;
      content.appendChild(title);
      
      if (column.sortable !== false && this.options.sortable) {
        const sortIcon = document.createElement('span');
        sortIcon.className = 'c-data-table__sort-icon';
        
        if (this.sortConfig && this.sortConfig.key === column.key) {
          // Create SVG icon
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', '16');
          svg.setAttribute('height', '16');
          svg.setAttribute('viewBox', '0 0 256 256');
          
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          
          if (this.sortConfig.direction === 'asc') {
            // CaretUp icon
            path.setAttribute('d', 'M128 90.5L51.6 170l-6.5-5.4l76.4-79.5l6.5 5.4z');
            path.setAttribute('fill', 'currentColor');
            svg.appendChild(path);
            
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttribute('d', 'M128 90.5l76.4 79.5l-6.5 5.4l-76.4-79.5l6.5-5.4z');
            path2.setAttribute('fill', 'currentColor');
            svg.appendChild(path2);
          } else {
            // CaretDown icon
            path.setAttribute('d', 'M128 165.5L51.6 86l-6.5 5.4l76.4 79.5l6.5-5.4z');
            path.setAttribute('fill', 'currentColor');
            svg.appendChild(path);
            
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttribute('d', 'M128 165.5l76.4-79.5l-6.5-5.4l-76.4 79.5l6.5 5.4z');
            path2.setAttribute('fill', 'currentColor');
            svg.appendChild(path2);
          }
          
          sortIcon.appendChild(svg);
        }
        
        content.appendChild(sortIcon);
      }
      
      th.appendChild(content);
      tr.appendChild(th);
    });
    
    thead.appendChild(tr);
    this.tableElement.appendChild(thead);
  }
  
  /**
   * Render table body
   * @private
   */
  private _renderBody(): void {
    if (!this.tableElement) return;
    
    const tbody = document.createElement('tbody');
    const displayData = this._getDisplayData();
    
    if (displayData.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.className = 'c-data-table__empty-cell';
      td.colSpan = this.columns.length;
      td.textContent = this.options.emptyMessage || 'No data available';
      tr.appendChild(td);
      tbody.appendChild(tr);
    } else {
      displayData.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        tr.className = 'c-data-table__row';
        tr.setAttribute('data-row-index', rowIndex.toString());
        
        if (this.options.onRowClick) {
          tr.setAttribute('role', 'button');
          tr.tabIndex = 0;
        }
        
        this.columns.forEach(column => {
          const td = document.createElement('td');
          td.className = 'c-data-table__cell';
          
          const value = row[column.key];
          
          if (column.render) {
            const rendered = column.render(value, row);
            if (typeof rendered === 'string') {
              td.textContent = rendered;
            } else {
              td.appendChild(rendered);
            }
          } else {
            td.textContent = value != null ? String(value) : '';
          }
          
          tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
      });
    }
    
    this.tableElement.appendChild(tbody);
  }
  
  /**
   * Create loading spinner
   * @private
   */
  private _createSpinner(): HTMLElement {
    const spinner = document.createElement('div');
    spinner.className = 'c-spinner c-spinner--primary';
    spinner.setAttribute('role', 'status');
    
    const srText = document.createElement('span');
    srText.className = 'u-visually-hidden';
    srText.textContent = 'Loading...';
    
    spinner.appendChild(srText);
    return spinner;
  }
  
  /**
   * Render pagination
   * @private
   */
  private _renderPagination(): void {
    if (!this.paginationElement) return;
    
    // Clear pagination
    this.paginationElement.innerHTML = '';
    
    const totalPages = this._getTotalPages();
    
    if (totalPages <= 1) return;
    
    // Create ul element
    const ul = document.createElement('ul');
    ul.className = 'c-pagination__items';
    
    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = 'c-pagination__item';
    
    const prevButton = document.createElement('button');
    prevButton.className = `c-pagination__link ${this.currentPage === 1 ? 'is-disabled' : ''}`;
    prevButton.setAttribute('aria-label', 'Previous page');
    prevButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m168 200l-80-72l80-72"/></svg>';
    
    if (this.currentPage === 1) {
      prevButton.disabled = true;
    } else {
      prevButton.addEventListener('click', () => this._handlePageChange(this.currentPage - 1));
    }
    
    prevItem.appendChild(prevButton);
    ul.appendChild(prevItem);
    
    // First page
    const firstItem = document.createElement('li');
    firstItem.className = 'c-pagination__item';
    
    const firstButton = document.createElement('button');
    firstButton.className = `c-pagination__link ${this.currentPage === 1 ? 'is-active' : ''}`;
    firstButton.textContent = '1';
    firstButton.setAttribute('aria-label', 'Page 1');
    
    if (this.currentPage === 1) {
      firstButton.setAttribute('aria-current', 'page');
    } else {
      firstButton.addEventListener('click', () => this._handlePageChange(1));
    }
    
    firstItem.appendChild(firstButton);
    ul.appendChild(firstItem);
    
    // Ellipsis if needed
    if (this.currentPage > 3) {
      const ellipsisItem = document.createElement('li');
      ellipsisItem.className = 'c-pagination__item';
      
      const ellipsisSpan = document.createElement('span');
      ellipsisSpan.className = 'c-pagination__link';
      ellipsisSpan.textContent = '...';
      
      ellipsisItem.appendChild(ellipsisSpan);
      ul.appendChild(ellipsisItem);
    }
    
    // Previous page if not first or second
    if (this.currentPage > 2) {
      const prevPageItem = document.createElement('li');
      prevPageItem.className = 'c-pagination__item';
      
      const prevPageButton = document.createElement('button');
      prevPageButton.className = 'c-pagination__link';
      prevPageButton.textContent = String(this.currentPage - 1);
      prevPageButton.setAttribute('aria-label', `Page ${this.currentPage - 1}`);
      prevPageButton.addEventListener('click', () => this._handlePageChange(this.currentPage - 1));
      
      prevPageItem.appendChild(prevPageButton);
      ul.appendChild(prevPageItem);
    }
    
    // Current page if not first
    if (this.currentPage !== 1 && this.currentPage !== totalPages) {
      const currentItem = document.createElement('li');
      currentItem.className = 'c-pagination__item';
      
      const currentButton = document.createElement('button');
      currentButton.className = 'c-pagination__link is-active';
      currentButton.textContent = String(this.currentPage);
      currentButton.setAttribute('aria-label', `Page ${this.currentPage}`);
      currentButton.setAttribute('aria-current', 'page');
      
      currentItem.appendChild(currentButton);
      ul.appendChild(currentItem);
    }
    
    // Next page if not last or second-to-last
    if (this.currentPage < totalPages - 1) {
      const nextPageItem = document.createElement('li');
      nextPageItem.className = 'c-pagination__item';
      
      const nextPageButton = document.createElement('button');
      nextPageButton.className = 'c-pagination__link';
      nextPageButton.textContent = String(this.currentPage + 1);
      nextPageButton.setAttribute('aria-label', `Page ${this.currentPage + 1}`);
      nextPageButton.addEventListener('click', () => this._handlePageChange(this.currentPage + 1));
      
      nextPageItem.appendChild(nextPageButton);
      ul.appendChild(nextPageItem);
    }
    
    // Ellipsis if needed
    if (this.currentPage < totalPages - 2) {
      const ellipsisItem = document.createElement('li');
      ellipsisItem.className = 'c-pagination__item';
      
      const ellipsisSpan = document.createElement('span');
      ellipsisSpan.className = 'c-pagination__link';
      ellipsisSpan.textContent = '...';
      
      ellipsisItem.appendChild(ellipsisSpan);
      ul.appendChild(ellipsisItem);
    }
    
    // Last page if not first page
    if (totalPages > 1) {
      const lastItem = document.createElement('li');
      lastItem.className = 'c-pagination__item';
      
      const lastButton = document.createElement('button');
      lastButton.className = `c-pagination__link ${this.currentPage === totalPages ? 'is-active' : ''}`;
      lastButton.textContent = String(totalPages);
      lastButton.setAttribute('aria-label', `Page ${totalPages}`);
      
      if (this.currentPage === totalPages) {
        lastButton.setAttribute('aria-current', 'page');
      } else {
        lastButton.addEventListener('click', () => this._handlePageChange(totalPages));
      }
      
      lastItem.appendChild(lastButton);
      ul.appendChild(lastItem);
    }
    
    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = 'c-pagination__item';
    
    const nextButton = document.createElement('button');
    nextButton.className = `c-pagination__link ${this.currentPage === totalPages ? 'is-disabled' : ''}`;
    nextButton.setAttribute('aria-label', 'Next page');
    nextButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m96 200l80-72l-80-72"/></svg>';
    
    if (this.currentPage === totalPages) {
      nextButton.disabled = true;
    } else {
      nextButton.addEventListener('click', () => this._handlePageChange(this.currentPage + 1));
    }
    
    nextItem.appendChild(nextButton);
    ul.appendChild(nextItem);
    
    // Append ul to pagination element
    this.paginationElement.appendChild(ul);
  }
  
  /**
   * Update data
   * @public
   */
  public updateData(data: any[]): void {
    this.data = data;
    this.currentPage = 1; // Reset to first page
    this._renderTable();
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('data-table:update', {
      bubbles: true,
      detail: { data }
    }));
  }
  
  /**
   * Update columns
   * @public
   */
  public updateColumns(columns: DataTableColumn[]): void {
    this.columns = columns;
    this._renderTable();
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('data-table:update', {
      bubbles: true,
      detail: { columns }
    }));
  }
  
  /**
   * Sort by column
   * @public
   */
  public sortBy(key: string, direction: 'asc' | 'desc' = 'asc'): void {
    if (!this.options.sortable) return;
    
    this.sortConfig = { key, direction };
    this._renderTable();
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('data-table:sort', {
      bubbles: true,
      detail: { sortConfig: this.sortConfig }
    }));
  }
  
  /**
   * Set page
   * @public
   */
  public setPage(page: number): void {
    this._handlePageChange(page);
  }
  
  /**
   * Search
   * @public
   */
  public search(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1; // Reset to first page
    
    if (this.searchInput) {
      this.searchInput.value = query;
    }
    
    this._renderTable();
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('data-table:search', {
      bubbles: true,
      detail: { query }
    }));
  }
  
  /**
   * Destroy the component
   * @public
   */
  public destroy(): void {
    // Remove event listeners
    if (this.searchInput) {
      this.searchInput.removeEventListener('input', this._handleSearch.bind(this));
    }
    
    // Remove all elements
    this.element.innerHTML = '';
    
    // Remove classes
    this.element.classList.remove('c-data-table-container');
    
    // Reset state
    this.tableElement = null;
    this.searchInput = null;
    this.paginationElement = null;
  }
  
  /**
   * Initialize all DataTables on the page
   * @public
   * @static
   */
  public static initializeAll(selector = '.c-data-table-container', options = {}): DataTable[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => {
      // Try to get data from data attributes
      const dataAttr = element.getAttribute('data-table-data');
      const columnsAttr = element.getAttribute('data-table-columns');
      
      let data: any[] = [];
      let columns: DataTableColumn[] = [];
      
      try {
        if (dataAttr) data = JSON.parse(dataAttr);
        if (columnsAttr) columns = JSON.parse(columnsAttr);
      } catch (e) {
        console.error('Error parsing DataTable data attributes:', e);
      }
      
      return new DataTable(element as HTMLElement, data, columns, options);
    });
  }
} 