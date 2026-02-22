import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Icon } from '../Icon';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Breadcrumb Component

The Breadcrumb component provides navigation context by showing the current page location within a site hierarchy. It helps users understand where they are and provides quick navigation to parent pages. Breadcrumbs support custom dividers, icons, and are fully accessible.

## Features
- Clear hierarchical navigation
- Support for custom dividers
- Icon integration
- Keyboard navigation support
- Full accessibility compliance
- Responsive design

## Accessibility
- Semantic navigation landmark with aria-label
- Proper heading order
- Keyboard navigation support (Tab, Enter, Space)
- Screen reader friendly markup
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with label, href, and optional properties',
      table: {
        type: { summary: 'BreadcrumbItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    divider: {
      control: 'text',
      description: 'Custom divider character or component between breadcrumb items',
      table: {
        type: { summary: 'string | ReactNode' },
        defaultValue: { summary: '>' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Label for the navigation landmark',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Breadcrumb' },
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Breadcrumb
export const BasicUsage: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Category', href: '/products/category' },
      { label: 'Product Name', active: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple breadcrumb with basic text links showing site hierarchy.',
      },
    },
  },
};

// Breadcrumb with Icons
export const WithIcons: Story = {
  args: {
    items: [
      {
        label: 'Home',
        href: '/',
        icon: <Icon name="House" size="sm" />,
      },
      {
        label: 'Products',
        href: '/products',
        icon: <Icon name="Package" size="sm" />,
      },
      {
        label: 'Category',
        href: '/products/category',
        icon: <Icon name="Folder" size="sm" />,
      },
      {
        label: 'Product Name',
        active: true,
        icon: <Icon name="Tag" size="sm" />,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with icons for each item to enhance visual recognition.',
      },
    },
  },
};

// Breadcrumb with Custom Divider
export const WithCustomDivider: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Category', href: '/products/category' },
      { label: 'Product Name', active: true },
    ],
    divider: '/',
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with custom divider character instead of the default arrow.',
      },
    },
  },
};

// Breadcrumb with Click Handlers
export const WithClickHandlers: Story = {
  args: {
    items: [
      {
        label: 'Home',
        href: '/',
        onClick: fn(),
      },
      {
        label: 'Products',
        href: '/products',
        onClick: fn(),
      },
      {
        label: 'Category',
        href: '/products/category',
        onClick: fn(),
      },
      { label: 'Product Name', active: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with click handlers to demonstrate client-side navigation.',
      },
    },
  },
};

// Breadcrumb with Mixed Interactions
export const WithMixedInteractions: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      {
        label: 'Products',
        onClick: fn(),
        // Simulating client-side navigation
      },
      {
        label: 'Category',
        href: '/products/category',
        icon: <Icon name="Folder" size="sm" />,
      },
      {
        label: 'Product Name',
        active: true,
        icon: <Icon name="Tag" size="sm" />,
      },
    ],
    divider: '|',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb combining both traditional link navigation and client-side interactions.',
      },
    },
  },
};

// Long Breadcrumb Path
export const LongBreadcrumbPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Computers', href: '/products/electronics/computers' },
      { label: 'Laptops', href: '/products/electronics/computers/laptops' },
      { label: 'Gaming Laptops', href: '/products/electronics/computers/laptops/gaming' },
      { label: 'Current Product', active: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Long breadcrumb path demonstrating responsive behavior with many levels.',
      },
    },
  },
};
