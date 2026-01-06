import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTableColumn } from '../../lib/types/components';
import { DataTable } from './DataTable';

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The DataTable component provides a powerful and flexible way to display structured data in rows and columns. It supports sorting, filtering, pagination, selection, and various display options. DataTables are ideal for displaying large datasets, user lists, product catalogs, or any tabular information requiring advanced data manipulation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object', description: 'Array of data objects to display' },
    columns: { control: 'object', description: 'Column definitions for the table' },
    sortable: { control: 'boolean', description: 'Whether columns are sortable' },
    filterable: { control: 'boolean', description: 'Whether the table is filterable' },
    paginated: { control: 'boolean', description: 'Whether to enable pagination' },
    pageSize: { control: 'number', description: 'Number of rows per page' },
    striped: { control: 'boolean', description: 'Whether to apply striped row styling' },
    bordered: { control: 'boolean', description: 'Whether to show table borders' },
    dense: { control: 'boolean', description: 'Whether to use dense row spacing' },
    loading: { control: 'boolean', description: 'Whether the table is in loading state' },
    emptyMessage: { control: 'text', description: 'Message to display when table is empty' },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate more sample data for better pagination testing
const generateUsers = (count: number) => {
  const roles = ['Admin', 'User', 'Editor', 'Manager', 'Guest'];
  const statuses = ['Active', 'Inactive', 'Pending', 'Suspended'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Pending' },
  { id: 6, name: 'Eva Wilson', email: 'eva@example.com', role: 'Admin', status: 'Active' },
  { id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'Inactive' },
  { id: 8, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active' },
  { id: 9, name: 'Henry Clark', email: 'henry@example.com', role: 'User', status: 'Pending' },
  { id: 10, name: 'Ivy Martin', email: 'ivy@example.com', role: 'Admin', status: 'Active' },
  { id: 11, name: 'Jack Wilson', email: 'jack@example.com', role: 'User', status: 'Inactive' },
  { id: 12, name: 'Karen Brown', email: 'karen@example.com', role: 'Editor', status: 'Active' },
];

// Large data set for pagination examples
const largeDataSet = generateUsers(100);

// Column definitions
const columns: DataTableColumn[] = [
  { key: 'id', title: 'ID', width: '80px' },
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'role', title: 'Role', sortable: true },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    render: (value, row) => {
      let color = '';
      switch (value) {
        case 'Active':
          color = 'green';
          break;
        case 'Inactive':
          color = 'red';
          break;
        case 'Pending':
          color = 'orange';
          break;
        case 'Suspended':
          color = 'gray';
          break;
      }
      return <span style={{ color }}>{value}</span>;
    },
  },
];

// Basic example
export const Basic: Story = {
  args: {
    data: users,
    columns,
  },
};

// Sortable example
export const Sortable: Story = {
  args: {
    data: users,
    columns,
    sortable: true,
  },
};

// Filterable example
export const Filterable: Story = {
  args: {
    data: users,
    columns,
    filterable: true,
  },
};

// Paginated example
export const Paginated: Story = {
  args: {
    data: users,
    columns,
    paginated: true,
    pageSize: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'A paginated table with standard pagination controls below the table.',
      },
    },
  },
};

// Paginated with larger dataset
export const PaginatedLargeDataset: Story = {
  args: {
    data: largeDataSet,
    columns,
    paginated: true,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pagination with a large dataset (100 items) demonstrating first/last buttons and ellipsis.',
      },
    },
  },
};

// Complete example with all features
export const CompleteFeatures: Story = {
  args: {
    data: largeDataSet,
    columns,
    sortable: true,
    filterable: true,
    paginated: true,
    pageSize: 10,
    striped: true,
    bordered: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete data table with sorting, filtering, and pagination enabled.',
      },
    },
  },
};

// Styled example
export const Styled: Story = {
  args: {
    data: users,
    columns,
    sortable: true,
    striped: true,
    bordered: true,
  },
};

// Dense example
export const Dense: Story = {
  args: {
    data: users,
    columns,
    sortable: true,
    dense: true,
  },
};

// Empty example
export const Empty: Story = {
  args: {
    data: [],
    columns,
    emptyMessage: 'No users found',
  },
};

// Loading example
export const Loading: Story = {
  args: {
    data: users,
    columns,
    loading: true,
  },
};

// Interactive example with row click handler
export const Interactive: Story = {
  render: args => {
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const handleRowClick = (row: any) => {
      setSelectedUser(row);
    };

    return (
      <div>
        <DataTable {...args} onRowClick={handleRowClick} />
        {selectedUser && (
          <div
            style={{
              marginTop: '1rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <h3>Selected User:</h3>
            <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  },
  args: {
    data: users,
    columns,
    sortable: true,
  },
};

// Row selection - multiple
export const RowSelectionMultiple: Story = {
  render: args => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    return (
      <div>
        <DataTable
          {...args}
          selectionMode="multiple"
          onSelectionChange={(rows, ids) => setSelectedRows(rows)}
        />
        {selectedRows.length > 0 && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
            <strong>Selected: {selectedRows.length} row(s)</strong>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              {JSON.stringify(selectedRows.map(r => r.name), null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  },
  args: {
    data: users,
    columns,
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with multiple row selection enabled. Select rows using checkboxes.',
      },
    },
  },
};

// Row selection - single
export const RowSelectionSingle: Story = {
  render: args => {
    const [selectedRow, setSelectedRow] = useState<any>(null);

    return (
      <div>
        <DataTable
          {...args}
          selectionMode="single"
          onSelectionChange={(rows) => setSelectedRow(rows[0] || null)}
        />
        {selectedRow && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
            <strong>Selected:</strong>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              {JSON.stringify(selectedRow, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  },
  args: {
    data: users,
    columns,
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with single row selection enabled. Select a row using radio buttons.',
      },
    },
  },
};

// Column-specific filtering
export const ColumnFilters: Story = {
  args: {
    data: users,
    columns: columns.map(col => ({
      ...col,
      filterable: ['name', 'role', 'email'].includes(col.key),
    })),
    columnFilters: true,
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with column-specific filters. Each filterable column has its own filter input.',
      },
    },
  },
};

// Column resizing
export const ResizableColumns: Story = {
  args: {
    data: users,
    columns: columns.map(col => ({
      ...col,
      resizable: true,
      minWidth: '100px',
    })),
    resizable: true,
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with resizable columns. Drag the right edge of column headers to resize.',
      },
    },
  },
};

// Column reordering
export const ReorderableColumns: Story = {
  args: {
    data: users,
    columns,
    reorderable: true,
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with reorderable columns. Drag column headers to reorder them.',
      },
    },
  },
};

// Column visibility toggle
export const ColumnVisibility: Story = {
  args: {
    data: users,
    columns,
    showColumnVisibility: true,
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with column visibility toggle. Use the Columns button to show/hide columns.',
      },
    },
  },
};

// Export functionality
export const Exportable: Story = {
  args: {
    data: users,
    columns,
    exportable: true,
    exportFormats: ['csv', 'excel', 'json'],
    exportFilename: 'users',
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with export functionality. Export data as CSV, Excel, or JSON.',
      },
    },
  },
};

// Sticky headers
export const StickyHeaders: Story = {
  args: {
    data: largeDataSet,
    columns,
    stickyHeader: true,
    stickyHeaderOffset: '0px',
    sortable: true,
    paginated: true,
    pageSize: 20,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with sticky headers. Headers remain visible when scrolling.',
      },
    },
  },
};

// All advanced features
export const AllAdvancedFeatures: Story = {
  render: args => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    return (
      <div>
        <DataTable
          {...args}
          selectionMode="multiple"
          onSelectionChange={(rows) => setSelectedRows(rows)}
        />
        {selectedRows.length > 0 && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
            <strong>Selected: {selectedRows.length} row(s)</strong>
          </div>
        )}
      </div>
    );
  },
  args: {
    data: largeDataSet,
    columns: columns.map(col => ({
      ...col,
      filterable: ['name', 'role'].includes(col.key),
      resizable: true,
    })),
    sortable: true,
    filterable: true,
    columnFilters: true,
    paginated: true,
    pageSize: 10,
    striped: true,
    bordered: true,
    resizable: true,
    reorderable: true,
    showColumnVisibility: true,
    exportable: true,
    exportFormats: ['csv', 'excel', 'json'],
    stickyHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with all advanced features enabled: selection, filtering, resizing, reordering, visibility toggle, export, and sticky headers.',
      },
    },
  },
};
