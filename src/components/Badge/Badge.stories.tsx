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

export const error: Story = {
  args: {
    label: 'Error',
    variant: 'error',
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
    <div className="u-d-flex u-flex-wrap u-gap-2">
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
    <div className="u-d-flex u-align-items-center u-gap-2">
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
    <div className="u-d-flex u-flex-column u-gap-4">
      <div>
        <h3 className="u-mt-0 u-mb-2">Numeric Badges</h3>
        <div className="u-d-flex u-gap-2">
          <Badge label="1" variant="primary" />
          <Badge label="2" variant="secondary" />
          <Badge label="3" variant="success" />
          <Badge label="4" variant="error" />
          <Badge label="5" variant="warning" />
          <Badge label="6" variant="info" />
        </div>
      </div>
      <div>
        <h3 className="u-mt-0 u-mb-2">Status Badges</h3>
        <div className="u-d-flex u-gap-2">
          <Badge label="New" variant="primary" />
          <Badge label="Active" variant="success" />
          <Badge label="Pending" variant="warning" />
          <Badge label="Failed" variant="error" />
          <Badge label="Blocked" variant="secondary" />
        </div>
      </div>
      <div>
        <h3 className="u-mt-0 u-mb-2">Badges with Icons</h3>
        <div className="u-d-flex u-gap-2">
          <Badge label="Info" variant="info" icon={<Icon />} />
          <Badge label="Warning" variant="warning" icon={<Icon />} />
          <Badge label="Success" variant="success" icon={<Icon />} />
          <Badge label="Error" variant="error" icon={<Icon />} />
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
    <div className="u-d-flex u-flex-column u-gap-6 u-max-width-80">
      <div>
        <h3 className="u-mt-0 u-mb-2">In navigation</h3>
        <div className="u-d-flex u-gap-4">
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span>Inbox</span>
            <Badge label="24" variant="error" size="sm" />
          </div>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span>Notifications</span>
            <Badge label="3" variant="primary" size="sm" />
          </div>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span>Messages</span>
            <Badge label="New" variant="success" size="sm" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="u-mt-0 u-mb-2">In cards</h3>
        <div className="u-p-4 u-shadow u-d-flex u-flex-column u-gap-2">
          <div className="u-d-flex u-justify-content-between">
            <h4 className="u-m-0">Product Title</h4>
            <Badge label="Sale" variant="error" />
          </div>
          <p className="u-my-2">This is a sample product description.</p>
          <div className="u-d-flex u-gap-2">
            <Badge label="In Stock" variant="success" size="sm" />
            <Badge label="Free Shipping" variant="info" size="sm" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="u-mt-0 u-mb-2">In lists</h3>
        <ul className="u-p-0 u-m-0" style={{ listStyle: 'none' }}>
          <li className="u-py-2 u-d-flex u-justify-content-between" style={{ borderBottom: '1px solid #e0e0e0' }}>
            <span>Task 1</span>
            <Badge label="Completed" variant="success" size="sm" />
          </li>
          <li className="u-py-2 u-d-flex u-justify-content-between" style={{ borderBottom: '1px solid #e0e0e0' }}>
            <span>Task 2</span>
            <Badge label="In Progress" variant="warning" size="sm" />
          </li>
          <li className="u-py-2 u-d-flex u-justify-content-between">
            <span>Task 3</span>
            <Badge label="Not Started" variant="secondary" size="sm" />
          </li>
        </ul>
      </div>
    </div>
  ),
};

// Theme-aware demo showing badges in both light and dark mode side by side
export const ThemeAwareBadges: Story = {
  args: {
    label: 'Badge',
    variant: 'primary',
  },
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-6">
      <div>
        <h3 className="u-mt-0 u-mb-2">Theme Aware Badges</h3>
        <p className="u-mb-4">The badges below demonstrate how they adapt to different theme modes.</p>
        <div className="u-d-flex u-gap-5 u-mt-4">
          <div className="u-p-5 u-shadow u-flex-1">
            <h4 className="u-mt-0">Current Theme</h4>
            <div className="u-d-flex u-flex-wrap u-gap-2">
              {THEME_COLORS.map((color) => (
                <Badge key={color} label={color} variant={color} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="u-mt-2 u-mb-2">Accessibility Considerations</h3>
        <p className="u-mb-2">Our badges are designed to maintain proper contrast in both light and dark modes.</p>
        <div className="u-d-flex u-flex-column u-gap-2 u-mt-2">
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span className="u-d-inline-block" style={{ width: '120px' }}>Primary:</span>
            <Badge label="New Feature" variant="primary" />
          </div>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span className="u-d-inline-block" style={{ width: '120px' }}>Success:</span>
            <Badge label="Completed" variant="success" />
          </div>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span className="u-d-inline-block" style={{ width: '120px' }}>Warning:</span>
            <Badge label="In Progress" variant="warning" />
          </div>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span className="u-d-inline-block" style={{ width: '120px' }}>error:</span>
            <Badge label="Failed" variant="error" />
          </div>
        </div>
      </div>
      
      <div className="u-mt-4">
        <p>Use the Color Mode toggle in the Storybook toolbar to switch between light and dark mode!</p>
      </div>
    </div>
  ),
}; 