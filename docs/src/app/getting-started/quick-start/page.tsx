'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import Link from 'next/link'

export default function QuickStartPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Quick Start</h1>
        <p>
          Get up and running with Atomix in your React project in minutes. This guide will help you
          set up Atomix and use its components in your application.
        </p>

        <h2>Prerequisites</h2>
        <p>Before you begin, make sure you have:</p>
        <ul>
          <li>A React project set up (Create React App, Next.js, Vite, etc.)</li>
          <li>Node.js 16.0 or higher</li>
          <li>npm, yarn, or pnpm for package management</li>
        </ul>

        <h2>Installation</h2>
        <p>
          If you haven't installed Atomix yet, follow the{' '}
          <Link href="/getting-started/installation" className="u-text-primary">
            installation guide
          </Link>
          .
        </p>

        <h2>Basic Usage</h2>
        <p>Once you have Atomix installed, you can start using its components in your application:</p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`import React from 'react';
import { Button, Card } from '@atomix/react';

// Import the Atomix CSS
import '@atomix/react/dist/atomix.css';

function App() {
  return (
    <div className="u-p-4">
      <Card className="u-mb-4">
        <Card.Header>
          <h2 className="u-fs-4">Welcome to Atomix</h2>
        </Card.Header>
        <Card.Body>
          <p>This is a simple example of using Atomix components.</p>
          <Button variant="primary" className="u-mt-4">Get Started</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;`}</code>
        </pre>

        <h2>Setting Up Theme Support</h2>
        <p>
          Atomix comes with built-in theme support, including dark mode. To enable theme support:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`import React from 'react';
import { ThemeProvider } from '@atomix/react';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      {/* Your application */}
    </ThemeProvider>
  );
}

export default App;`}</code>
        </pre>

        <p>
          You can also add a theme toggle component to allow users to switch between light and dark mode:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`import React from 'react';
import { ThemeProvider, ColorModeToggle } from '@atomix/react';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="u-p-4">
        <div className="u-d-flex u-justify-content-end u-mb-4">
          <ColorModeToggle />
        </div>
        {/* Your application */}
      </div>
    </ThemeProvider>
  );
}

export default App;`}</code>
        </pre>

        <h2>Using Utility Classes</h2>
        <p>
          Atomix includes a comprehensive set of utility classes for common styling needs:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`<div className="u-d-flex u-justify-content-between u-align-items-center u-p-4 u-mb-4 u-bg-primary-subtle u-rounded">
  <h2 className="u-fs-4 u-fw-bold u-text-primary u-mb-0">Dashboard</h2>
  <div className="u-d-flex u-gap-2">
    <Button variant="outline-primary" size="sm">Export</Button>
    <Button variant="primary" size="sm">Add New</Button>
  </div>
</div>`}</code>
        </pre>

        <p>
          This example uses utility classes for:
        </p>
        <ul>
          <li><code>u-d-flex</code> - Display flex</li>
          <li><code>u-justify-content-between</code> - Space items evenly</li>
          <li><code>u-align-items-center</code> - Center items vertically</li>
          <li><code>u-p-4</code> - Add padding (level 4)</li>
          <li><code>u-mb-4</code> - Add margin bottom (level 4)</li>
          <li><code>u-bg-primary-subtle</code> - Light primary background color</li>
          <li><code>u-rounded</code> - Add border radius</li>
        </ul>

        <p>
          For a complete list of utility classes, see the{' '}
          <Link href="/utilities/overview" className="u-text-primary">
            Utilities documentation
          </Link>
          .
        </p>

        <h2>Component Examples</h2>
        
        <h3>Form with Validation</h3>
        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`import React, { useState } from 'react';
import { Form, Button } from '@atomix/react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Handle form submission
    console.log('Form submitted:', { email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="u-mb-3">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={!!errors.email}
        />
        {errors.email && <Form.Feedback type="invalid">{errors.email}</Form.Feedback>}
      </Form.Group>

      <Form.Group className="u-mb-4">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={!!errors.password}
        />
        {errors.password && <Form.Feedback type="invalid">{errors.password}</Form.Feedback>}
      </Form.Group>

      <Button type="submit" variant="primary" className="u-w-100">
        Sign In
      </Button>
    </Form>
  );
}`}</code>
        </pre>

        <h3>Data Table with Pagination</h3>
        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`import React, { useState } from 'react';
import { DataTable, Pagination, Badge } from '@atomix/react';

function ProductsTable({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const columns = [
    { id: 'name', header: 'Product Name' },
    { id: 'category', header: 'Category' },
    { id: 'price', header: 'Price', cell: (row) => \`$\${row.price.toFixed(2)}\` },
    { 
      id: 'status', 
      header: 'Status',
      cell: (row) => (
        <Badge 
          variant={row.status === 'In Stock' ? 'success' : 'warning'}
        >
          {row.status}
        </Badge>
      )
    },
  ];

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div>
      <DataTable
        columns={columns}
        data={paginatedData}
        bordered
        striped
        hover
      />
      
      <div className="u-d-flex u-justify-content-end u-mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}`}</code>
        </pre>

        <h2>Next Steps</h2>
        <p>
          Now that you have Atomix set up and running, you can:
        </p>
        <ul>
          <li>
            <Link href="/components/button" className="u-text-primary">
              Explore all available components
            </Link>
          </li>
          <li>
            <Link href="/design-tokens/colors" className="u-text-primary">
              Learn about design tokens
            </Link>
          </li>
          <li>
            <Link href="/getting-started/theming" className="u-text-primary">
              Customize the theme to match your brand
            </Link>
          </li>
          <li>
            <Link href="/utilities/overview" className="u-text-primary">
              Master the utility classes
            </Link>
          </li>
        </ul>
      </div>
    </DocsLayout>
  )
}