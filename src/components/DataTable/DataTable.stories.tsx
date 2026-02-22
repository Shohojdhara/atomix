import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { DataTableColumn } from '../../lib/types/components';
import { DataTable } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DataTable

## Overview

DataTable provides a powerful and flexible way to display structured data in rows and columns. It supports sorting, filtering, pagination, selection, and various display options. DataTables are ideal for displaying large datasets, user lists, product catalogs, or any tabular information requiring advanced data manipulation.

## Features

- Sorting capability for columns
- Filtering functionality
- Pagination with configurable page size
- Row selection options
- Custom cell rendering
- Responsive design
- Loading states
- Empty state handling

## Accessibility

- Keyboard support: Navigate with arrow keys, select with Space/Enter
- Screen reader: Table headers and data cells announced properly
- ARIA support: Appropriate roles and properties for tables
- Focus management: Maintains focus within the table controls

## Usage Examples

### Basic Usage

\`\`\`tsx
<DataTable 
  data={data} 
  columns={columns} 
/>
\`\`\`

### With Pagination

\`\`\`tsx
<DataTable 
  data={data} 
  columns={columns} 
  paginated={true} 
  pageSize={10}
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| data | T[] | [] | Array of data objects to display |
| columns | DataTableColumn[] | [] | Column definitions for the table |
| sortable | boolean | false | Whether columns are sortable |
| filterable | boolean | false | Whether the table is filterable |
| paginated | boolean | false | Whether to enable pagination |
| pageSize | number | 10 | Number of rows per page |
| striped | boolean | false | Whether to apply striped row styling |
| bordered | boolean | false | Whether to show table borders |
| dense | boolean | false | Whether to use dense row spacing |
| loading | boolean | false | Whether the table is in loading state |
| emptyMessage | string | 'No records found' | Message to display when table is empty |
| onRowClick | (row: T) => void | - | Callback when a row is clicked |
| onSelectionChange | (selected: T[]) => void | - | Callback when selection changes |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data objects to display',
      table: {
        type: { summary: 'T[]' },
        defaultValue: { summary: '[]' },
      },
    },
    columns: {
      control: 'object',
      description: 'Column definitions for the table',
      table: {
        type: { summary: 'DataTableColumn[]' },
        defaultValue: { summary: '[]' },
      },
    },
    sortable: {
      control: 'boolean',
      description: 'Whether columns are sortable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    filterable: {
      control: 'boolean',
      description: 'Whether the table is filterable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    paginated: {
      control: 'boolean',
      description: 'Whether to enable pagination',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    pageSize: {
      control: 'number',
      description: 'Number of rows per page',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    striped: {
      control: 'boolean',
      description: 'Whether to apply striped row styling',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show table borders',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dense: {
      control: 'boolean',
      description: 'Whether to use dense row spacing',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the table is in loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to display when table is empty',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No records found' },
      },
    },
    onRowClick: {
      action: 'row clicked',
      description: 'Callback when a row is clicked',
    },
    onSelectionChange: {
      action: 'selection changed',
      description: 'Callback when selection changes',
    },
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
      let statusClass = '';
      switch (value) {
        case 'Active':
          statusClass = 'u-text-success';
          break;
        case 'Inactive':
          statusClass = 'u-text-error';
          break;
        case 'Pending':
          statusClass = 'u-text-warning';
          break;
        case 'Suspended':
          statusClass = 'u-text-gray';
          break;
        default:
          statusClass = 'u-text-gray';
      }
      return <span className={statusClass}>{value}</span>;
    },
  },
];

// ========================================
// BASIC USAGE STORIES
// ========================================

export const BasicUsage: Story = {
  args: {
    data: users,
    columns: columns,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic DataTable component with sample user data.',
      },
    },
  },
};

// ========================================
// VARIANTS & STATES STORIES
// ========================================

export const LoadingState: Story = {
  args: {
    data: users,
    columns,
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns,
    emptyMessage: 'No users found',
  },
};

export const WithStripedRows: Story = {
  args: {
    data: users,
    columns: columns,
    striped: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with striped row styling for improved readability.',
      },
    },
  },
};

export const WithBorderedTable: Story = {
  args: {
    data: users,
    columns,
    bordered: true,
  },
};

export const DenseSpacing: Story = {
  args: {
    data: users,
    columns,
    sortable: true,
    dense: true,
  },
};

// ========================================
// SORTING & FILTERING STORIES
// ========================================

export const WithSorting: Story = {
  args: {
    data: users,
    columns: columns,
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with column sorting functionality enabled.',
      },
    },
  },
};

export const WithFiltering: Story = {
  args: {
    data: users,
    columns,
    filterable: true,
  },
};

export const WithColumnFilters: Story = {
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
        story:
          'DataTable with column-specific filters. Each filterable column has its own filter input.',
      },
    },
  },
};

// ========================================
// ROW SELECTION STORIES
// ========================================

export const WithRowSelectionSingle: Story = {
  render: args => {
    const [selectedRow, setSelectedRow] = useState<any>(null);

    return (
      <div>
        <DataTable
          {...args}
          data={args.data || users}
          columns={args.columns || columns}
          selectionMode="single"
          onSelectionChange={rows => setSelectedRow(rows[0] || null)}
        />
        {selectedRow && (
          <div className="u-mt-4 u-p-4 u-bg-gray-100 u-rounded u-text-sm">
            <strong>Selected:</strong>
            <pre className="u-mt-2 u-text-xs">{JSON.stringify(selectedRow, null, 2)}</pre>
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

export const WithRowSelectionMultiple: Story = {
  render: args => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    return (
      <div>
        <DataTable
          {...args}
          data={args.data || users}
          columns={args.columns || columns}
          selectionMode="multiple"
          onSelectionChange={(rows, ids) => setSelectedRows(rows)}
        />
        {selectedRows.length > 0 && (
          <div className="u-mt-4 u-p-4 u-bg-gray-100 u-rounded u-text-sm">
            <strong>Selected: {selectedRows.length} row(s)</strong>
            <pre className="u-mt-2 u-text-xs">
              {JSON.stringify(
                selectedRows.map(r => r.name),
                null,
                2
              )}
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

// ========================================
// ADVANCED FEATURES STORIES
// ========================================

export const WithInteractiveRows: Story = {
  render: args => {
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const handleRowClick = (row: any) => {
      setSelectedUser(row);
    };

    return (
      <div>
        <DataTable
          {...args}
          data={args.data || users}
          columns={args.columns || columns}
          onRowClick={handleRowClick}
        />
        {selectedUser && (
          <div className="u-mt-4 u-p-4 u-border u-border-gray-300 u-rounded u-bg-white">
            <h3 className="u-m-0">Selected User:</h3>
            <pre className="u-m-0">{JSON.stringify(selectedUser, null, 2)}</pre>
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

// ========================================
// PAGINATION STORIES
// ========================================

export const WithPagination: Story = {
  args: {
    data: largeDataSet,
    columns: columns,
    paginated: true,
    pageSize: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with pagination enabled to handle large datasets.',
      },
    },
  },
};

export const WithPaginationLargeDataset: Story = {
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

// ========================================
// COLUMN CONFIGURATION STORIES
// ========================================

export const WithResizableColumns: Story = {
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

export const WithReorderableColumns: Story = {
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

export const WithColumnVisibilityToggle: Story = {
  args: {
    data: users,
    columns,
    showColumnVisibility: true,
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'DataTable with column visibility toggle. Use the Columns button to show/hide columns.',
      },
    },
  },
};

// ========================================
// EXPORT & CUSTOMIZATION STORIES
// ========================================

export const WithExportFunctionality: Story = {
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

export const WithStickyHeaders: Story = {
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

// ========================================
// COMPREHENSIVE EXAMPLES
// ========================================

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

export const AllAdvancedFeatures: Story = {
  render: args => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    return (
      <div>
        <DataTable
          {...args}
          data={args.data || largeDataSet}
          columns={args.columns || columns}
          selectionMode="multiple"
          onSelectionChange={rows => setSelectedRows(rows)}
        />
        {selectedRows.length > 0 && (
          <div className="u-mt-4 u-p-4 u-bg-gray-100 u-rounded">
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
        story:
          'DataTable with all advanced features enabled: selection, filtering, resizing, reordering, visibility toggle, export, and sticky headers.',
      },
    },
  },
};
