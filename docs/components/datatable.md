# DataTable Component

The DataTable component provides a powerful, feature-rich table for displaying and manipulating tabular data. It includes sorting, filtering, pagination, and customizable rendering capabilities for building data-driven interfaces.

## Overview

DataTables are essential for displaying structured data in applications. The Atomix DataTable component offers comprehensive functionality including sorting, filtering, pagination, row selection, and custom cell rendering while maintaining accessibility and responsive design.

## Props API

### DataTableProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | **required** | Array of data objects |
| `columns` | `DataTableColumn[]` | **required** | Column definitions |
| `sortable` | `boolean` | `true` | Enable column sorting |
| `filterable` | `boolean` | `false` | Enable column filtering |
| `paginated` | `boolean` | `false` | Enable pagination |
| `pageSize` | `number` | `10` | Rows per page |
| `striped` | `boolean` | `false` | Alternating row colors |
| `bordered` | `boolean` | `false` | Table borders |
| `dense` | `boolean` | `false` | Compact row spacing |
| `loading` | `boolean` | `false` | Loading state |
| `emptyMessage` | `string` | `'No data available'` | Empty state message |
| `onRowClick` | `(row: any) => void` | `undefined` | Row click handler |
| `onSort` | `(sortConfig: SortConfig) => void` | `undefined` | Sort change handler |
| `className` | `string` | `''` | Additional CSS classes |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Glass morphism effect for the data table |

### DataTableColumn Interface

```typescript
interface DataTableColumn {
  key: string;                    // Unique column identifier
  title: string;                  // Column header text
  sortable?: boolean;             // Column is sortable
  filterable?: boolean;           // Column is filterable
  render?: (value: any, row: any) => ReactNode; // Custom cell renderer
  width?: string;                 // Column width (CSS value)
}
```

## Usage Examples

### Basic DataTable

```jsx
import React, { useState } from 'react';
import { DataTable, Button, Badge } from '@shohojdhara/atomix';

function BasicDataTable() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active' }
  ];

  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'role', title: 'Role', sortable: true },
    { 
      key: 'status', 
      title: 'Status', 
      sortable: true,
      render: (value) => (
        <Badge 
          label={value}
          variant={value === 'Active' ? 'success' : 'secondary'}
        />
      )
    }
  ];

  return (
    <DataTable 
      data={data}
      columns={columns}
      striped
      bordered
    />
  );
}
```

### Advanced DataTable with Actions

```jsx
function AdvancedDataTable() {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'Admin', 
      status: 'Active',
      lastLogin: '2024-01-15',
      avatar: '/john.jpg'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'User', 
      status: 'Active',
      lastLogin: '2024-01-14',
      avatar: '/jane.jpg'
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      role: 'User', 
      status: 'Inactive',
      lastLogin: '2024-01-10',
      avatar: '/bob.jpg'
    }
  ]);

  const handleEdit = (user) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (user) => {
    setUsers(prev => prev.filter(u => u.id !== user.id));
  };

  const columns = [
    {
      key: 'user',
      title: 'User',
      render: (_, row) => (
        <div className="u-flex u-items-center u-gap-3">
          <Avatar src={row.avatar} alt={row.name} size="sm" circle />
          <div>
            <div className="u-font-medium">{row.name}</div>
            <div className="u-text-sm u-text-secondary">{row.email}</div>
          </div>
        </div>
      ),
      width: '300px'
    },
    {
      key: 'role',
      title: 'Role',
      sortable: true,
      render: (value) => (
        <Badge 
          label={value}
          variant={value === 'Admin' ? 'error' : value === 'Moderator' ? 'info' : 'light'}
        />
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => (
        <div className="u-flex u-items-center u-gap-2">
          <div className={`w-2 h-2 rounded-full ${
            value === 'Active' ? 'bg-green-500' : 'bg-gray-400'
          }`} />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'lastLogin',
      title: 'Last Login',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="u-flex u-gap-2">
          <Button 
            icon={<Icon name="PencilSimple" />}
            iconOnly
            variant="link"
            size="sm"
            onClick={() => handleEdit(row)}
            aria-label="Edit user"
          />
          <Button 
            icon={<Icon name="Trash" />}
            iconOnly
            variant="link"
            size="sm"
            onClick={() => handleDelete(row)}
            aria-label="Delete user"
            className="u-text-error"
          />
        </div>
      ),
      width: '100px'
    }
  ];

  return (
    <DataTable 
      data={users}
      columns={columns}
      sortable
      striped
      onRowClick={(row) => console.log('Row clicked:', row)}
    />
  );
}
```

### Paginated DataTable

```jsx
function PaginatedDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  
  // Generate sample data
  const allData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    department: ['Engineering', 'Marketing', 'Sales', 'Support'][i % 4],
    salary: 50000 + (i * 1000),
    joinDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toISOString().split('T')[0]
  }));

  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'department', title: 'Department', sortable: true },
    { 
      key: 'salary', 
      title: 'Salary', 
      sortable: true,
      render: (value) => `$${value.toLocaleString()}`
    },
    { 
      key: 'joinDate', 
      title: 'Join Date', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  return (
    <div className="u-gap-4">
      <div className="u-flex u-justify-between u-items-center">
        <h3 className="u-text-lg u-font-semibold">Employee Directory</h3>
        <div className="u-flex u-items-center u-gap-2">
          <span className="u-text-sm">Rows per page:</span>
          <Select 
            options={[
              { value: '5', label: '5' },
              { value: '10', label: '10' },
              { value: '25', label: '25' },
              { value: '50', label: '50' }
            ]}
            value={pageSize.toString()}
            onChange={(e) => setPageSize(Number(e.target.value))}
          />
        </div>
      </div>

      <DataTable 
        data={allData}
        columns={columns}
        paginated
        pageSize={pageSize}
        striped
        bordered
      />
    </div>
  );
}
```

### Filterable DataTable

```jsx
function FilterableDataTable() {
  const [data] = useState([
    { id: 1, product: 'Laptop', category: 'Electronics', price: 999, stock: 15, rating: 4.5 },
    { id: 2, product: 'Smartphone', category: 'Electronics', price: 699, stock: 32, rating: 4.2 },
    { id: 3, product: 'Desk Chair', category: 'Furniture', price: 299, stock: 8, rating: 4.0 },
    { id: 4, product: 'Coffee Maker', category: 'Appliances', price: 149, stock: 22, rating: 4.3 },
    { id: 5, product: 'Bookshelf', category: 'Furniture', price: 199, stock: 5, rating: 3.8 }
  ]);

  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    inStock: false
  });

  const filteredData = data.filter(item => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (item.price < min || item.price > max) return false;
    }
    if (filters.inStock && item.stock === 0) return false;
    return true;
  });

  const columns = [
    { key: 'product', title: 'Product', sortable: true },
    { 
      key: 'category', 
      title: 'Category', 
      sortable: true,
      render: (value) => (
        <Badge label={value} variant="light" />
      )
    },
    { 
      key: 'price', 
      title: 'Price', 
      sortable: true,
      render: (value) => `$${value}`
    },
    { 
      key: 'stock', 
      title: 'Stock', 
      sortable: true,
      render: (value) => (
        <span className={value === 0 ? 'u-text-error' : value < 10 ? 'u-text-warning' : 'u-text-success'}>
          {value}
        </span>
      )
    },
    { 
      key: 'rating', 
      title: 'Rating', 
      sortable: true,
      render: (value) => (
        <div className="u-flex u-items-center u-gap-1">
          <Icon name="Star" className="u-text-warning" />
          <span>{value}</span>
        </div>
      )
    }
  ];

  return (
    <div className="u-gap-4">
      {/* Filters */}
      <Card>
        <div className="u-grid u-grid-cols-1 u-md-grid-cols-4 u-gap-4">
          <FormGroup label="Category">
            <Select 
              options={[
                { value: '', label: 'All Categories' },
                { value: 'Electronics', label: 'Electronics' },
                { value: 'Furniture', label: 'Furniture' },
                { value: 'Appliances', label: 'Appliances' }
              ]}
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            />
          </FormGroup>

          <FormGroup label="Price Range">
            <Select 
              options={[
                { value: '', label: 'All Prices' },
                { value: '0-200', label: '$0 - $200' },
                { value: '200-500', label: '$200 - $500' },
                { value: '500-1000', label: '$500 - $1000' }
              ]}
              value={filters.priceRange}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
            />
          </FormGroup>

          <FormGroup label="Availability">
            <Checkbox 
              label="In stock only"
              checked={filters.inStock}
              onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
            />
          </FormGroup>

          <FormGroup label="Actions">
            <Button 
              label="Clear Filters"
              variant="secondary"
              onClick={() => setFilters({ category: '', priceRange: '', inStock: false })}
            />
          </FormGroup>
        </div>
      </Card>

      {/* Results */}
      <div className="u-text-sm u-text-secondary">
        Showing {filteredData.length} of {data.length} products
      </div>

      <DataTable 
        data={filteredData}
        columns={columns}
        sortable
        striped
        emptyMessage="No products match your filters"
      />
    </div>
  );
}
```

### Loading and Empty States

```jsx
function LoadingDataTable() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' }
  ];

  const loadData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setData([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
    ]);
    setLoading(false);
  };

  const clearData = () => {
    setData([]);
  };

  return (
    <div className="u-gap-4">
      <div className="u-flex u-gap-3">
        <Button 
          label="Load Data" 
          variant="primary"
          onClick={loadData}
          disabled={loading}
        />
        <Button 
          label="Clear Data" 
          variant="secondary"
          onClick={clearData}
        />
      </div>

      <DataTable 
        data={data}
        columns={columns}
        loading={loading}
        emptyMessage="No users found. Click 'Load Data' to fetch users."
        striped
      />
    </div>
  );
}
```

## Vanilla JavaScript Usage

```
// Basic data table
const dataTable = new Atomix.DataTable('.my-table', {
  data: [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ],
  columns: [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true }
  ],
  sortable: true,
  striped: true
});

// Update data
dataTable.setData(newData);

// Add event listeners
dataTable.on('rowClick', (row) => {
  console.log('Row clicked:', row);
});

dataTable.on('sort', (sortConfig) => {
  console.log('Sort changed:', sortConfig);
});

// Initialize from data attributes
Atomix.DataTable.initFromDataAttributes();
```

## Styling

### CSS Classes

```
/* Base table */
.c-datatable {
  /* Table container */
}

.c-datatable__table {
  /* Table element */
}

/* Table variants */
.c-datatable--striped { /* Striped rows */ }
.c-datatable--bordered { /* Table borders */ }
.c-datatable--dense { /* Compact spacing */ }

/* Table elements */
.c-datatable__header { /* Table header */ }
.c-datatable__body { /* Table body */ }
.c-datatable__row { /* Table row */ }
.c-datatable__cell { /* Table cell */ }

/* Interactive elements */
.c-datatable__sort-button { /* Sort button */ }
.c-datatable__sort-icon { /* Sort icon */ }

/* States */
.c-datatable__row--clickable { /* Clickable row */ }
.c-datatable__row--selected { /* Selected row */ }
.c-datatable--loading { /* Loading state */ }
.c-datatable--empty { /* Empty state */ }
```

### Custom Styling

```
/* Custom table theme */
.c-datatable--custom {
  --table-border-color: #e5e7eb;
  --table-header-bg: #f9fafb;
  --table-row-hover-bg: #f3f4f6;
}

/* Responsive table */
@media (max-width: 768px) {
  .c-datatable__table {
    font-size: 0.875rem;
  }
  
  .c-datatable__cell {
    padding: 0.5rem;
  }
}

/* Custom row states */
.c-datatable__row--highlighted {
  background-color: #fef3c7;
}

.c-datatable__row--error {
  background-color: #fee2e2;
}
```

## Accessibility

### ARIA Attributes

- `role="table"` - Identifies table structure
- `aria-sort` - Indicates column sort state
- `aria-label` - Provides table description
- `aria-rowcount` - Total number of rows
- `aria-colcount` - Total number of columns

### Keyboard Navigation

- **Tab** - Navigate between interactive elements
- **Enter/Space** - Activate sort buttons and row actions
- **Arrow keys** - Navigate between cells (when implemented)

### Screen Reader Support

- Table structure is properly announced
- Column headers are associated with data cells
- Sort states are communicated
- Loading and empty states are announced

## Best Practices

### Do's ✅

- Use clear, descriptive column headers
- Provide loading states for async data
- Implement proper sorting and filtering
- Use consistent data formatting
- Handle empty states gracefully

```jsx
// Good: Clear structure and helpful features
<DataTable 
  data={users}
  columns={[
    { key: 'name', title: 'Full Name', sortable: true },
    { key: 'email', title: 'Email Address', sortable: true },
    { 
      key: 'status', 
      title: 'Account Status',
      render: (value) => <Badge label={value} variant={getStatusVariant(value)} />
    }
  ]}
  loading={loading}
  emptyMessage="No users found. Try adjusting your search criteria."
  striped
/>
```

### Don'ts ❌

- Don't put too many columns in a single table
- Don't forget to handle loading and error states
- Don't make tables non-responsive
- Don't use tables for layout purposes

## Common Patterns

### Master-Detail View

```jsx
function MasterDetailTable() {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="u-grid u-grid-cols-1 u-lg-grid-cols-2 u-gap-6">
      <div>
        <h3 className="u-font-semibold u-mb-4">Users</h3>
        <DataTable 
          data={users}
          columns={columns}
          onRowClick={setSelectedRow}
          striped
        />
      </div>
      
      <div>
        <h3 className="u-font-semibold u-mb-4">Details</h3>
        {selectedRow ? (
          <Card>
            <div className="u-gap-3">
              <div><strong>Name:</strong> {selectedRow.name}</div>
              <div><strong>Email:</strong> {selectedRow.email}</div>
              <div><strong>Role:</strong> {selectedRow.role}</div>
            </div>
          </Card>
        ) : (
          <div className="u-text-secondary">Select a user to view details</div>
        )}
      </div>
    </div>
  );
}
```

## Related Components

- **Pagination** - For paginated tables
- **Button** - For table actions
- **Badge** - For status indicators
- **Avatar** - For user representations
- **Card** - For table containers
- **Spinner** - For loading states

## Performance Considerations

- Use virtualization for large datasets
- Implement server-side sorting and filtering
- Optimize custom render functions
- Consider lazy loading for complex cell content

``jsx
// Virtual scrolling for large datasets
import { FixedSizeList as List } from 'react-window';

function VirtualizedTable({ data, columns }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {/* Render row content */}
    </div>
  );

  return (
    <List
      height={400}
      itemCount={data.length}
      itemSize={50}
    >
      {Row}
    </List>
  );
}
```

## Browser Support

The DataTable component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

All features including sorting and filtering work across supported browsers.
