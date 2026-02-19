import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataTable } from './DataTable';
import { DataTableColumn } from '../../lib/types/components';

// Mock dependencies
vi.mock('../AtomixGlass/AtomixGlass', () => ({
  AtomixGlass: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('../Spinner/Spinner', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock('../Icon/Icon', () => ({
  Icon: ({ name }: any) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

vi.mock('../Pagination/Pagination', () => ({
  Pagination: ({ currentPage, totalPages, onPageChange }: any) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  ),
}));

vi.mock('../Form/Checkbox', () => ({
  Checkbox: ({ checked, onChange, label, ...props }: any) => (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        data-testid={props['data-testid'] || 'checkbox'}
        {...props}
      />
      {label}
    </label>
  ),
}));

vi.mock('../Dropdown/Dropdown', () => ({
  Dropdown: ({ children, menu, trigger }: any) => (
    <div data-testid="dropdown">
      {children}
      {trigger === 'click' && <div data-testid="dropdown-menu">{menu}</div>}
    </div>
  ),
  DropdownItem: ({ children, onClick }: any) => (
    <div data-testid="dropdown-item" onClick={onClick}>
      {children}
    </div>
  ),
  DropdownDivider: () => <hr data-testid="dropdown-divider" />,
}));

vi.mock('../Button/Button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

// Sample data and columns
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Active' },
];

const sampleColumns: DataTableColumn[] = [
  { key: 'id', title: 'ID', sortable: true },
  { key: 'name', title: 'Name', sortable: true, filterable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'role', title: 'Role', sortable: true, filterable: true },
  { key: 'status', title: 'Status', sortable: true },
];

describe('DataTable Component', () => {
  describe('Basic Rendering', () => {
    it('renders table with data', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('renders column headers', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);

      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('displays empty message when no data', () => {
      render(
        <DataTable
          data={[]}
          columns={sampleColumns}
          emptyMessage="No records found"
        />
      );

      expect(screen.getByText('No records found')).toBeInTheDocument();
    });

    it('displays loading state', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          loading={true}
        />
      );

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    it('renders sortable columns when sortable is enabled', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          sortable={true}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toHaveClass('c-data-table__header-cell--sortable');
    });

    it('calls onSort when column header is clicked', () => {
      const handleSort = vi.fn();
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          sortable={true}
          onSort={handleSort}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      fireEvent.click(nameHeader!);

      expect(handleSort).toHaveBeenCalledWith(
        expect.objectContaining({
          key: 'name',
          direction: 'asc',
        })
      );
    });
  });

  describe('Filtering', () => {
    it('renders search input when filterable is enabled', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          filterable={true}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toBeInTheDocument();
    });

    it('filters data when search query is entered', async () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          filterable={true}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'John' } });

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      });
    });

    it('renders column filters when columnFilters is enabled', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          columnFilters={true}
        />
      );

      const columnFilters = screen.getAllByPlaceholderText('Filter...');
      expect(columnFilters.length).toBeGreaterThan(0);
    });
  });

  describe('Pagination', () => {
    it('renders pagination when paginated is enabled', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          paginated={true}
          pageSize={2}
        />
      );

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('does not render pagination when paginated is false', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          paginated={false}
        />
      );

      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });
  });

  describe('Row Selection', () => {
    it('renders selection checkboxes when selectionMode is multiple', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          selectionMode="multiple"
        />
      );

      const checkboxes = screen.getAllByTestId('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('renders select all checkbox in header for multiple selection', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          selectionMode="multiple"
        />
      );

      const checkboxes = screen.getAllByTestId('checkbox');
      // Should have at least one checkbox (select all)
      expect(checkboxes.length).toBeGreaterThanOrEqual(1);
    });

    it('calls onSelectionChange when row is selected', () => {
      const handleSelectionChange = vi.fn();
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          selectionMode="multiple"
          onSelectionChange={handleSelectionChange}
        />
      );

      const checkboxes = screen.getAllByTestId('checkbox');
      // Click the first row checkbox (skip select all if present)
      const rowCheckbox = checkboxes[checkboxes.length > sampleData.length ? 1 : 0];
      fireEvent.change(rowCheckbox, { target: { checked: true } });

      expect(handleSelectionChange).toHaveBeenCalled();
    });
  });

  describe('Row Click', () => {
    it('calls onRowClick when row is clicked', () => {
      const handleRowClick = vi.fn();
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          onRowClick={handleRowClick}
        />
      );

      const row = screen.getByText('John Doe').closest('tr');
      fireEvent.click(row!);

      expect(handleRowClick).toHaveBeenCalledWith(sampleData[0]);
    });
  });

  describe('Export Functionality', () => {
    it('renders export dropdown when exportable is enabled', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          exportable={true}
        />
      );

      const exportButton = screen.getByText('Export');
      expect(exportButton).toBeInTheDocument();
    });

    it('does not render export when exportable is false', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          exportable={false}
        />
      );

      expect(screen.queryByText('Export')).not.toBeInTheDocument();
    });
  });

  describe('Column Visibility', () => {
    it('renders column visibility dropdown when showColumnVisibility is enabled', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          showColumnVisibility={true}
        />
      );

      const columnsButton = screen.getByText('Columns');
      expect(columnsButton).toBeInTheDocument();
    });
  });

  describe('Styling Variants', () => {
    it('applies striped class when striped is enabled', () => {
      const { container } = render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          striped={true}
        />
      );

      const table = container.querySelector('.c-data-table');
      expect(table).toHaveClass('c-data-table--striped');
    });

    it('applies bordered class when bordered is enabled', () => {
      const { container } = render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          bordered={true}
        />
      );

      const table = container.querySelector('.c-data-table');
      expect(table).toHaveClass('c-data-table--bordered');
    });

    it('applies dense class when dense is enabled', () => {
      const { container } = render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          dense={true}
        />
      );

      const table = container.querySelector('.c-data-table');
      expect(table).toHaveClass('c-data-table--dense');
    });

    it('applies sticky header class when stickyHeader is enabled', () => {
      const { container } = render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          stickyHeader={true}
        />
      );

      const table = container.querySelector('.c-data-table');
      expect(table).toHaveClass('c-data-table--sticky-header');
    });
  });

  describe('Custom Rendering', () => {
    it('uses custom render function for cells', () => {
      const columnsWithRender: DataTableColumn[] = [
        {
          key: 'name',
          title: 'Name',
          render: (value) => <strong>{value}</strong>,
        },
      ];

      render(
        <DataTable
          data={[{ name: 'John Doe' }]}
          columns={columnsWithRender}
        />
      );

      const strongElement = screen.getByText('John Doe').closest('strong');
      expect(strongElement).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('applies correct ARIA attributes for sortable columns', () => {
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          sortable={true}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toHaveAttribute('aria-sort');
    });

    it('applies role="button" to clickable rows', () => {
      const handleRowClick = vi.fn();
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          onRowClick={handleRowClick}
        />
      );

      const row = screen.getByText('John Doe').closest('tr');
      expect(row).toHaveAttribute('role', 'button');
    });
  });
});

