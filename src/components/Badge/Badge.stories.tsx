import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { BADGE, SIZES, THEME_COLORS } from '../../lib/constants/components';
import { Badge } from './Badge';

// Extract class names without the leading dots
const BADGE_CLASS = BADGE.BASE_CLASS;

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Badge component displays small pieces of information, status indicators, or labels. It supports multiple variants, sizes, and can include icons. Badges are ideal for highlighting important information or showing status.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'The visual style of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'The size of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the badge is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: 'object',
      description: 'Optional icon element to display in the badge',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    glass: {
      control: 'object',
      description: 'Enable glass morphism effect',
      table: {
        type: { summary: 'boolean | GlassConfig' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'The text content of the badge',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock icon component for stories
const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
    <path d="M12 8v8"></path>
    <path d="M8 12h8"></path>
  </svg>
);

/**
 * Basic badge usage with minimal props
 */
export const BasicUsage: Story = {
  args: {
    label: 'Badge',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Small size badge variant.
 */
export const Small: Story = {
  args: {
    label: 'Small',
    variant: 'primary',
    size: 'sm',
  },
};

/**
 * Medium size badge variant (default).
 */
export const Medium: Story = {
  args: {
    label: 'Medium',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Large size badge variant.
 */
export const Large: Story = {
  args: {
    label: 'Large',
    variant: 'primary',
    size: 'lg',
  },
};

/**
 * Shows all badge states (default, disabled)
 */
export const AllStates: Story = {
  args: {
    label: 'All States',
    variant: 'primary',
  },
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      <Badge label="Default" variant="primary" />
      <Badge label="Disabled" variant="primary" disabled={true} />
    </div>
  ),
};

/**
 * Shows badges with icons in different positions
 */
export const WithIcons: Story = {
  args: {
    label: 'With Icons',
    variant: 'primary',
  },
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      <Badge label="With Icon" variant="primary" icon={<Icon />} />
      <Badge label="Icon Only" variant="secondary" icon={<Icon />} />
    </div>
  ),
};

/**
 * Shows all available badge color variants
 */
export const AllVariants: Story = {
  args: {
    label: 'All Variants',
    variant: 'primary',
  },
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      {THEME_COLORS.map(color => (
        <Badge key={color} label={color} variant={color} />
      ))}
    </div>
  ),
};

/**
 * Shows all available badge sizes
 */
export const AllSizes: Story = {
  args: {
    label: 'All Sizes',
    variant: 'primary',
  },
  render: () => (
    <div className="u-flex u-items-center u-gap-2">
      <Badge label="Small" variant="primary" size="sm" />
      <Badge label="Medium" variant="primary" size="md" />
      <Badge label="Large" variant="primary" size="lg" />
    </div>
  ),
};

/**
 * Shows numeric badges commonly used for notifications
 */
export const NumericBadges: Story = {
  args: {
    label: 'Numeric Badges',
    variant: 'primary',
  },
  render: () => (
    <div className="u-flex u-gap-2">
      <Badge label="1" variant="primary" />
      <Badge label="2" variant="secondary" />
      <Badge label="9+" variant="success" />
      <Badge label="12" variant="error" />
      <Badge label="5" variant="warning" />
      <Badge label="42" variant="info" />
    </div>
  ),
};

/**
 * Shows status badges with different semantic meanings
 */
export const StatusBadges: Story = {
  args: {
    label: 'Status Badges',
    variant: 'primary',
  },
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      <Badge label="New" variant="primary" />
      <Badge label="Active" variant="success" />
      <Badge label="Pending" variant="warning" />
      <Badge label="Failed" variant="error" />
      <Badge label="Archived" variant="secondary" />
    </div>
  ),
};

/**
 * Real-world usage examples showing badges in navigation, cards, and lists.
 */
export const UsageExamples: Story = {
  args: {
    label: 'Usage examples',
  },
  parameters: {
    docs: {
      description: {
        story: 'Practical examples demonstrating how badges can be used in real-world scenarios such as navigation menus, product cards, and task lists.',
      },
    },
  },
  render: () => (
    <div className="u-flex u-flex-column u-gap-6 u-max-width-80">
      <div>
        <h3 className="u-mt-0 u-mb-2">In navigation</h3>
        <div className="u-flex u-gap-4">
          <div className="u-flex u-items-center u-gap-2">
            <span>Inbox</span>
            <Badge label="24" variant="error" size="sm" />
          </div>
          <div className="u-flex u-items-center u-gap-2">
            <span>Notifications</span>
            <Badge label="3" variant="primary" size="sm" />
          </div>
          <div className="u-flex u-items-center u-gap-2">
            <span>Messages</span>
            <Badge label="New" variant="success" size="sm" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="u-mt-0 u-mb-2">In cards</h3>
        <div className="u-p-4 u-rounded-lg u-shadow-md u-bg-white u-flex u-flex-column u-gap-2">
          <div className="u-flex u-justify-between">
            <h4 className="u-m-0">Product Title</h4>
            <Badge label="Sale" variant="error" />
          </div>
          <p className="u-my-2">This is a sample product description.</p>
          <div className="u-flex u-gap-2">
            <Badge label="In Stock" variant="success" size="sm" />
            <Badge label="Free Shipping" variant="info" size="sm" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="u-mt-0 u-mb-2">In lists</h3>
        <ul className="u-p-0 u-m-0 u-list-none">
          <li className="u-py-2 u-flex u-justify-between u-border-b u-border-gray-200">
            <span>Task 1</span>
            <Badge label="Completed" variant="success" size="sm" />
          </li>
          <li className="u-py-2 u-flex u-justify-between u-border-b u-border-gray-200">
            <span>Task 2</span>
            <Badge label="In Progress" variant="warning" size="sm" />
          </li>
          <li className="u-py-2 u-flex u-justify-between">
            <span>Task 3</span>
            <Badge label="Not Started" variant="secondary" size="sm" />
          </li>
        </ul>
      </div>
    </div>
  ),
};

/**
 * Shows badge accessibility features
 */
export const AccessibilityFeatures: Story = {
  args: {
    label: 'Accessibility Features',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of accessible badge implementations with proper ARIA labels and keyboard navigation support.',
      },
    },
  },
  render: () => (
    <div className="u-flex u-flex-column u-gap-4">
      <div>
        <h3 className="u-mt-0 u-mb-2">With ARIA Labels</h3>
        <div className="u-flex u-gap-2">
          <Badge label="Inbox" variant="primary" aria-label="3 new messages" />
          <Badge label="Alert" variant="error" aria-label="Critical notification" />
        </div>
      </div>
      
      <div>
        <h3 className="u-mt-0 u-mb-2">Interactive Badges</h3>
        <div className="u-flex u-gap-2">
          <Badge 
            label="Closable Tag" 
            variant="info" 
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Shows badges with glass effect enabled
 */
export const WithGlassEffect: Story = {
  args: {
    label: 'Glass Effect',
    variant: 'primary',
  },
  render: () => (
    <div className="u-bg-cover u-bg-center u-rounded-xl u-p-24" style={{backgroundImage: 'url(https://cdn.pixabay.com/photo/2023/07/07/20/42/grasshopper-8113345_1280.jpg)'}}>
      <div className="u-flex u-flex-wrap u-gap-2">
        {THEME_COLORS.map(color => (
          <Badge key={color} label={color} variant={color} glass={true} />
        ))}
      </div>
    </div>
  ),
};

/**
 * Shows badges with custom glass settings
 */
export const WithCustomGlassSettings: Story = {
  args: {
    label: 'Custom Glass',
    variant: 'primary',
    size: 'md',
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 1,
      cornerRadius: 16,
      mode: 'polar',
    },
  },
  decorators: [
    Story => (
      <div className="u-bg-cover u-bg-center u-rounded-xl u-p-24" style={{backgroundImage: 'url(https://cdn.pixabay.com/photo/2021/06/14/22/46/milky-way-6337038_1280.jpg)'}}>
        <Story />
      </div>
    ),
  ],
};
