import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { BADGE } from '../../lib/constants/components';
import { THEME_COLORS, SIZES } from '../../lib/constants/components';

// Extract class names without the leading dots
const BADGE_CLASS = BADGE.BASE_CLASS;

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'The visual style of the badge'
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'The size of the badge'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the badge is disabled'
    },
    icon: {
      control: 'text',
      description: 'Optional icon element to display in the badge'
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock icon component for stories
const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
    <path d="M12 8v8"></path>
    <path d="M8 12h8"></path>
  </svg>
);

// Basic Badges
export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    variant: 'success',
    size: 'md',
  },
};

export const Info: Story = {
  args: {
    label: 'Info',
    variant: 'info',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning',
    variant: 'warning',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger',
    variant: 'danger',
    size: 'md',
  },
};

export const Light: Story = {
  args: {
    label: 'Light',
    variant: 'light',
    size: 'md',
  },
};

export const Dark: Story = {
  args: {
    label: 'Dark',
    variant: 'dark',
    size: 'md',
  },
};

// Badge Sizes
export const Small: Story = {
  args: {
    label: 'Small',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    variant: 'primary',
    size: 'lg',
  },
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

// With Icon
export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    variant: 'primary',
    size: 'md',
    icon: <Icon />,
  },
};

// Group of Badge Variants
export const AllVariants: Story = {
  args: {
    label: 'Badge',
    variant: 'primary',
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {THEME_COLORS.map((color) => (
        <Badge key={color} label={color} variant={color} />
      ))}
    </div>
  ),
};

// Group of Badge Sizes
export const AllSizes: Story = {
  args: {
    label: 'Badge',
    variant: 'primary',
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Badge label="Small" variant="primary" size="sm" />
      <Badge label="Medium" variant="primary" size="md" />
      <Badge label="Large" variant="primary" size="lg" />
    </div>
  ),
};

// With different content
export const WithDifferentContent: Story = {
  args: {
    label: 'Badge with different content',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Numeric Badges</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge label="1" variant="primary" />
          <Badge label="2" variant="secondary" />
          <Badge label="3" variant="success" />
          <Badge label="4" variant="danger" />
          <Badge label="5" variant="warning" />
          <Badge label="6" variant="info" />
        </div>
      </div>
      <div>
        <h3>Status Badges</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge label="New" variant="primary" />
          <Badge label="Active" variant="success" />
          <Badge label="Pending" variant="warning" />
          <Badge label="Failed" variant="danger" />
          <Badge label="Blocked" variant="secondary" />
        </div>
      </div>
      <div>
        <h3>Badges with Icons</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge label="Info" variant="info" icon={<Icon />} />
          <Badge label="Warning" variant="warning" icon={<Icon />} />
          <Badge label="Success" variant="success" icon={<Icon />} />
          <Badge label="Error" variant="danger" icon={<Icon />} />
        </div>
      </div>
    </div>
  ),
};

// Usage examples
export const UsageExamples: Story = {
  args: {
    label: 'Usage examples',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
      <div>
        <h3>In navigation</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Inbox</span>
            <Badge label="24" variant="danger" size="sm" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Notifications</span>
            <Badge label="3" variant="primary" size="sm" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Messages</span>
            <Badge label="New" variant="success" size="sm" />
          </div>
        </div>
      </div>
      
      <div>
        <h3>In cards</h3>
        <div style={{ 
          padding: '16px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '4px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4 style={{ margin: 0 }}>Product Title</h4>
            <Badge label="Sale" variant="danger" />
          </div>
          <p style={{ margin: '8px 0' }}>This is a sample product description.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Badge label="In Stock" variant="success" size="sm" />
            <Badge label="Free Shipping" variant="info" size="sm" />
          </div>
        </div>
      </div>
      
      <div>
        <h3>In lists</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ 
            padding: '8px 0', 
            borderBottom: '1px solid #e0e0e0', 
            display: 'flex', 
            justifyContent: 'space-between' 
          }}>
            <span>Task 1</span>
            <Badge label="Completed" variant="success" size="sm" />
          </li>
          <li style={{ 
            padding: '8px 0', 
            borderBottom: '1px solid #e0e0e0', 
            display: 'flex', 
            justifyContent: 'space-between' 
          }}>
            <span>Task 2</span>
            <Badge label="In Progress" variant="warning" size="sm" />
          </li>
          <li style={{ 
            padding: '8px 0', 
            display: 'flex', 
            justifyContent: 'space-between' 
          }}>
            <span>Task 3</span>
            <Badge label="Not Started" variant="secondary" size="sm" />
          </li>
        </ul>
      </div>
    </div>
  ),
}; 