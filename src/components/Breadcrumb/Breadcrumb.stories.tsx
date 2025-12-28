import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Breadcrumb component provides navigation context by showing the current page location within a site hierarchy. It helps users understand where they are and provides quick navigation to parent pages. Breadcrumbs support custom dividers, icons, and are fully accessible.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    divider: { control: 'text' },
    className: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Breadcrumb
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Category', href: '/products/category' },
      { label: 'Product Name', active: true },
    ],
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
};

// Breadcrumb with Custom Divider
export const CustomDivider: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Category', href: '/products/category' },
      { label: 'Product Name', active: true },
    ],
    divider: '/',
  },
};

// Breadcrumb with Click Handlers
export const WithClickHandlers: Story = {
  args: {
    items: [
      {
        label: 'Home',
        href: '/',
        onClick: e => {
          e.preventDefault();
          alert('Home clicked');
        },
      },
      {
        label: 'Products',
        href: '/products',
        onClick: e => {
          e.preventDefault();
          alert('Products clicked');
        },
      },
      {
        label: 'Category',
        href: '/products/category',
        onClick: e => {
          e.preventDefault();
          alert('Category clicked');
        },
      },
      { label: 'Product Name', active: true },
    ],
  },
};
