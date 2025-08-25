import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTableColumn } from '../../lib/types/components';
import { DataTable } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'object' },
    sortable: { control: 'boolean' },
    filterable: { control: 'boolean' },
    paginated: { control: 'boolean' },
    pageSize: { control: 'number' },
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    dense: { control: 'boolean' },
    loading: { control: 'boolean' },
    emptyMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

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
